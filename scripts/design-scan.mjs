// 設計值掃描器：D-T1 盤點（audit-design-values.mjs）、試點守門（test-pilot-token-consumption.mjs）
// 與 G-11 設計一致性關卡（gates.mjs）共用同一份。只依賴 node 內建模組，才能隨匯出站一起出貨。
// 掃描範圍是「主題相關的字面值」：色碼、rgb()/hsl() 系列、white/black（限顏色屬性）、寫死的字族／圓角／陰影。
import {readFileSync,readdirSync,statSync,existsSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';

const HEX=/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])/g;
const FUNC_CALL=/\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch)\(([^()]*)\)/gi;
const NAMED=/(?<![\w-])(?:white|black)(?![\w-])/gi;
const COLOR_PROPS=/^(?:color|background(?:-color|-image)?|border(?:-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|fill|stroke|stop-color|caret-color|accent-color|text-decoration(?:-color)?|box-shadow|text-shadow|column-rule(?:-color)?)$/;
export const FIXED_REASONS=['brand-logo','third-party-embed','illustration','page-custom'];

const lineOf=(text,index)=>text.slice(0,index).split('\n').length;
const blank=s=>s.replace(/[^\n]/g,' ');
const count=(re,s)=>(s.match(re)||[]).length;

// 半透明純黑／純白疊色（陰影、遮罩）不是主題色：#0003、#00000033、rgb(0 0 0 / .1)、rgba(255,255,255,.5)
export function isNeutralOverlayHex(h){
 h=h.slice(1).toLowerCase();
 if(h.length===4)return (h.slice(0,3)==='000'||h.slice(0,3)==='fff')&&h[3]!=='f';
 if(h.length===8)return (h.slice(0,6)==='000000'||h.slice(0,6)==='ffffff')&&h.slice(6)!=='ff';
 return false;
}
function isNeutralOverlayFunc(name,args){
 if(!/^rgba?$/i.test(name))return false;
 const p=args.trim().split(/[\s,\/]+/).filter(Boolean);
 if(p.length<4)return false;
 const ch=p.slice(0,3).map(x=>parseFloat(x));
 const alpha=p[3].endsWith('%')?parseFloat(p[3])/100:parseFloat(p[3]);
 return ch.every(Number.isFinite)&&(ch.every(c=>c===0)||ch.every(c=>c===255))&&alpha<1;
}
// 只算「會讓換色漏掉」的字面色；回傳 {colors:[…], neutral:n}
export function themeColors(value,{named=false}={}){
 const colors=[];let neutral=0;
 for(const h of value.match(HEX)||[]){if(isNeutralOverlayHex(h))neutral++;else colors.push(h.toLowerCase());}
 for(const m of value.matchAll(FUNC_CALL)){if(isNeutralOverlayFunc(m[1],m[2]))neutral++;else colors.push(m[0].toLowerCase());}
 // 含 var() 的函式（rgb(from var(--x) …)）內有括號，不會被 FUNC_CALL 吃到：它沒有字面色，不算
 if(named)for(const n of value.match(NAMED)||[])colors.push(n.toLowerCase());
 return {colors,neutral};
}

// 取出 CSS 片段：.css 整檔；.astro 取 <style> 區塊、style="" 屬性與 SVG 顏色屬性。startLine 是片段第一行在檔案中的行號。
export function extractCss(file,text){
 if(file.endsWith('.css'))return [{kind:'css',text,startLine:1}];
 const parts=[];
 for(const m of text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi))parts.push({kind:'style-block',text:m[1],startLine:lineOf(text,m.index+m[0].indexOf(m[1]))});
 const noStyle=text.replace(/<style\b[\s\S]*?<\/style>/gi,x=>blank(x));
 for(const m of noStyle.matchAll(/\bstyle=(?:"([^"]*)"|'([^']*)')/g))parts.push({kind:'inline-style',text:'x{'+(m[1]??m[2])+'}',startLine:lineOf(noStyle,m.index)});
 for(const m of noStyle.matchAll(/\b(fill|stroke|stop-color)=["'](#[0-9a-fA-F]{3,8})["']/g))parts.push({kind:'svg-attr',text:'x{'+m[1]+':'+m[2]+'}',startLine:lineOf(noStyle,m.index)});
 return parts;
}

const stripFallbacks=v=>{ // var(--x, fallback)：fallback 內的字面值另計
 const fb=[];
 const out=v.replace(/var\(\s*--[\w-]+\s*,((?:[^()]|\([^()]*\))*)\)/g,(_,f)=>{fb.push(f);return 'var(--fb)';});
 return {value:out,fallbacks:fb};
};
function nsOf(name){
 if(/^--(brand|ed|chrome)-/.test(name))return name.match(/^--(brand|ed|chrome)-/)[1]+'-*';
 if(/^--(color|font|radius|space|width|shadow)-|^--image-filter$/.test(name))return 'global';
 if(/^--(bg|ink|line|accent|heading|text|surface|muted|radius|brand)$/.test(name))return 'global';
 const m=name.match(/^--([a-z]+)-/);return m?'local:'+m[1]+'-*':'other';
}

// 註記 /* design-fixed: <原因> */ 豁免緊接在後面的第一條宣告；原因必須在 FIXED_REASONS 內，否則不豁免並列入 badAnnotations。
export function scanCss(css){
 const r={colorLiteralInUse:[],colorLiteralInLocalToken:[],colorFallback:0,fontLiteral:[],radiusLiteral:[],shadowLiteral:[],
  exempted:[],badAnnotations:[],neutralOverlays:0,varRefs:{},localTokenDefs:{},declarations:0};
 const notes=[];
 const clean=css.replace(/\/\*([\s\S]*?)\*\//g,(all,body,idx)=>{
  const a=body.match(/design-fixed\s*:\s*([\w-]+)/);
  if(a)notes.push({end:idx+all.length,reason:a[1],line:lineOf(css,idx)});
  return blank(all);
 });
 const re=/([a-zA-Z-]+)\s*:\s*([^;{}]*?)\s*(?=[;}])/g;
 let m,noteIdx=0;
 while((m=re.exec(clean))){
  const prop=m[1].toLowerCase();
  const raw=m[2];
  if(!raw||/^[\d.]+$/.test(raw)&&!prop.startsWith('--'))continue;
  r.declarations++;
  let exemptReason=null;
  if(noteIdx<notes.length&&notes[noteIdx].end<=m.index){
   const n=notes[noteIdx++];
   if(FIXED_REASONS.includes(n.reason))exemptReason=n.reason;else r.badAnnotations.push({line:n.line,reason:n.reason});
  }
  // 字串內容（content:"#2026"）與 url(#id) 不是顏色，先拿掉再數字面值
  const {value,fallbacks}=stripFallbacks(raw.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,'""').replace(/url\([^)]*\)/g,'url()'));
  const line=lineOf(clean,m.index);
  const isLocalToken=prop.startsWith('--');
  const fbColors=fallbacks.flatMap(f=>themeColors(f).colors);
  const own=themeColors(value,{named:isLocalToken||COLOR_PROPS.test(prop)});
  r.neutralOverlays+=own.neutral;
  if(exemptReason){
   const n=own.colors.length+fbColors.length;
   if(n)r.exempted.push({prop,value:raw.slice(0,60),line,n,reason:exemptReason});
  }else r.colorFallback+=fbColors.length;
  for(const v of value.matchAll(/var\(\s*(--[\w-]+)/g)){const ns=nsOf(v[1]);r.varRefs[ns]=(r.varRefs[ns]||0)+1;}
  const hasVar=/var\(/.test(value);
  const nColor=exemptReason?0:own.colors.length;
  if(fbColors.length&&!exemptReason)r.fallbackItems=[...(r.fallbackItems||[]),{prop,value:raw.slice(0,60),line,n:fbColors.length,colors:fbColors}];
  if(isLocalToken){
   const ns=nsOf(prop);r.localTokenDefs[ns]=(r.localTokenDefs[ns]||0)+1;
   if(nColor)r.colorLiteralInLocalToken.push({prop,value:raw.slice(0,60),line,n:nColor,colors:own.colors});
  }else if(nColor)r.colorLiteralInUse.push({prop,value:raw.slice(0,60),line,n:nColor,colors:own.colors});
  if(!isLocalToken){
   if((prop==='font-family'||prop==='font')&&!hasVar)r.fontLiteral.push({prop,value:raw.slice(0,60),line});
   if(/^border(-(top|bottom)-(left|right))?-radius$/.test(prop)&&!hasVar&&!/^(0|0px|inherit|0 0 0 0)$/.test(raw)&&!raw.includes('%'))r.radiusLiteral.push({prop,value:raw.slice(0,40),line});
   if(/^(box|text)-shadow$/.test(prop)&&!hasVar&&raw!=='none'&&!own.neutral)r.shadowLiteral.push({prop,value:raw.slice(0,60),line});
  }
 }
 return r;
}

// ---- 掃描整個學員站（G-11 用） ----
const walk=(abs,rel,out=[])=>{
 if(!existsSync(abs))return out;
 for(const f of readdirSync(abs).sort()){
  if(['node_modules','dist','.astro','.git','qa-artifacts'].includes(f))continue;
  const a=join(abs,f),r=rel?rel+'/'+f:f;
  if(statSync(a).isDirectory())walk(a,r,out);else if(/\.(astro|css)$/.test(f))out.push(r);
 }
 return out;
};
const allowed=(rel,item,allowlist)=>allowlist.some(a=>a.reason&&a.file&&(a.file.endsWith('*')?rel.startsWith(a.file.slice(0,-1)):a.file===rel)&&(!a.match||item.value.includes(a.match)));

// 回傳 {files:{相對路徑:{count,items,exempted,badAnnotations}},total,scanned}
// 每筆 item：{line,prop,value,n}；count 是該檔字面色個數（直接使用＋區域 Token 內＋後備值）。
export function scanSourceTree(root,{dirs=['src','public'],exclude=['public/tokens.css','public/theme.css'],allowlist=[]}={}){
 const files={};let total=0,scanned=0;
 for(const d of dirs)for(const rel of walk(join(root,d),d)){
  if(exclude.includes(rel))continue;
  scanned++;
  const text=readFileSync(join(root,rel),'utf8');
  const items=[],exempted=[],badAnnotations=[];
  for(const part of extractCss(rel,text)){
   const r=scanCss(part.text);
   const abs=l=>part.startLine+l-1;
   for(const x of [...r.colorLiteralInUse,...r.colorLiteralInLocalToken,...(r.fallbackItems||[])]){
    const it={line:abs(x.line),prop:x.prop,value:x.value,n:x.n};
    if(allowed(rel,it,allowlist))exempted.push({...it,reason:'allowlist'});else items.push(it);
   }
   for(const x of r.exempted)exempted.push({...x,line:abs(x.line)});
   for(const x of r.badAnnotations)badAnnotations.push({line:abs(x.line),reason:x.reason});
  }
  const n=items.reduce((a,b)=>a+b.n,0);
  if(n||exempted.length||badAnnotations.length)files[rel]={count:n,items,exempted,badAnnotations};
  total+=n;
 }
 return {files,total,scanned};
}

export const BASELINE_FILE='design-baseline.json';
export function readDesignBaseline(root){
 const p=join(root,BASELINE_FILE);
 if(!existsSync(p))return null;
 try{const b=JSON.parse(readFileSync(p,'utf8'));return b&&typeof b.files==='object'?b:null;}catch{return null;}
}
// 匯出時記下「出廠時每個檔案的字面色數量」。之後新增的字面色才算違規；出廠既有的只告知，不擋。
export function writeDesignBaseline(root,opts={}){
 const r=scanSourceTree(root,opts);
 const files=Object.fromEntries(Object.entries(r.files).filter(([,v])=>v.count>0).map(([k,v])=>[k,v.count]));
 writeFileSync(join(root,BASELINE_FILE),JSON.stringify({version:1,note:'出廠時各檔案的寫死色數量；G-11 只把超出這個數量的新增字面色視為違規。轉換成讀 Token 後，請以 node scripts/gates.mjs --write-design-baseline 更新。',total:r.total,files},null,2)+'\n');
 return {total:r.total,files};
}
// baseline=null 代表不採棘輪（嚴格：任何字面色都違規）
export function compareToBaseline(findings,baseline){
 const violations=[],legacy=[];
 for(const [rel,f] of Object.entries(findings.files)){
  if(!f.count)continue;
  const base=baseline?(baseline.files[rel]||0):0;
  if(f.count>base)violations.push({file:rel,count:f.count,baseline:base,items:f.items});
  else legacy.push({file:rel,count:f.count,baseline:base});
 }
 return {violations,legacy};
}
