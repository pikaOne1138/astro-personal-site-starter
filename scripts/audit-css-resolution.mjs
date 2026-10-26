// CSS 結算層級稽核：抓「上層需求改了、某處因 CSS 結算層級沒跟著改」這一整類問題。
//
// 背景（ATP 殼階段 2）：殼的 `--line` 宣告在 :root，公式吃的 --ink／--bg 卻由 <body style> 注入；
// 自訂屬性在「宣告它的元素」就結算並以結算後的值往下繼承，:root 看不到 body 上的變數，
// 所以 --line 一直是用 site.css 寫死的預設值算出來的，換色票時凍結不動。
//
// 兩部分，可重跑：
//   靜態  staticFindings(corpus)       公式型自訂屬性（值含 var()／color-mix()）的宣告層，是否高於任一原料變數的注入／覆寫層。
//   動態  dynamicFindings(distA,distB) 同站以不同色票建置後，凡是「勝出規則的值含 var()（直接或經派生源自 Token）」、
//                                      算出的可見顏色卻跨色票不變的元素屬性，列為嫌疑。
// 兩者的輸出都要逐項分類（見 css-resolution-classification.json）：真漏（必須修，不得留在清單）／刻意固定／裝飾不存在；
// 後兩類必須附理由與追蹤編號，沒有預設放行。
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join,resolve,sep} from 'node:path';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';

// ---------- 共用：CSS 語料 ----------
const walk=(dir,out=[])=>{for(const f of readdirSync(dir)){const p=join(dir,f);statSync(p).isDirectory()?walk(p,out):out.push(p);}return out;};

// 建置後 dist 的全部 CSS（含 tokens.css／theme.css）。每筆 {file,text,scope}；scope 只對行內 style 有意義：html／body／element。
export function corpusFromDist(dist){
  const corpus=[];
  for(const html of walk(dist).filter(f=>f.endsWith('.html'))){
    const t=readFileSync(html,'utf8'),rel=html.slice(dist.length+1);
    if(rel.startsWith('pagefind'))continue;
    for(const m of t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))corpus.push({file:rel+'<style>',text:m[1]});
    for(const m of t.matchAll(/<(html|body|[a-z][a-z0-9-]*)\b[^>]*?\sstyle="([^"]*)"/g)){
      const tag=m[1];corpus.push({file:rel+'<'+tag+' style>',text:m[2],inlineScope:tag==='html'?'html':tag==='body'?'body':'element'});
    }
    for(const m of t.matchAll(/href="([^"]+\.css)"/g)){
      const cand=[join(dist,m[1].replace(/^\//,''))];
      const hit=cand.find(existsSync);
      if(hit)corpus.push({file:m[1],text:readFileSync(hit,'utf8')});
    }
  }
  const seen=new Set();return corpus.filter(c=>{const k=c.file+'\0'+c.text;if(seen.has(k))return false;seen.add(k);return true;});
}

// ---------- 靜態 ----------
// 選擇器對應的「元素層級」：0＝:root／html，1＝body（含其屬性選擇器），2＝其他（版型／元件／樣板容器內的元素）。
export function levelOf(selector){
  const s=selector.trim();
  if(/^(:root|html)(\[[^\]]*\]|:[a-z-]+(\([^)]*\))?|\.[\w-]+)*$/.test(s))return 0;
  if(/^body(\[[^\]]*\]|:[a-z-]+(\([^)]*\))?|\.[\w-]+)*$/.test(s))return 1;
  return 2;
}
const LEVEL_NAME=['root','body','element'];

// 切出頂層規則（展開 @media／@supports／@layer／@container）。回傳 [{selector,body}]
export function rulesOf(css){
  const out=[];const n=css.length;
  const block=start=>{let d=0;for(let j=start;j<n;j++){if(css[j]==='{')d++;else if(css[j]==='}'&&--d===0)return j;}return n-1;};
  let i=0;
  while(i<n){
    const open=css.indexOf('{',i);if(open<0)break;
    const head=css.slice(i,open).replace(/\/\*[\s\S]*?\*\//g,'').trim(),close=block(open);
    if(/^@(media|supports|layer|container|document)/.test(head))out.push(...rulesOf(css.slice(open+1,close)));
    else if(!head.startsWith('@'))out.push({selector:head,body:css.slice(open+1,close)});
    i=close+1;
  }
  return out;
}
// 宣告切分（括號內的 ; 不切）
export function declsOf(body){
  const out=[];let depth=0,cur='';
  for(const ch of body){
    if(ch==='('||ch==='[')depth++;else if(ch===')'||ch===']')depth--;
    if(ch===';'&&depth===0){out.push(cur);cur='';}else cur+=ch;
  }
  if(cur.trim())out.push(cur);
  return out.map(d=>{const k=d.indexOf(':');return k<0?null:{prop:d.slice(0,k).trim(),value:d.slice(k+1).trim()};}).filter(Boolean);
}
// 取出 value 內所有 var() 呼叫（含巢狀）。回傳 [{name,fallback}]；fallback 是第一個逗號之後的原文（可能含巢狀 var()）。
export function varCalls(value){
  const out=[];
  for(let i=0;i<value.length;i++){
    if(!value.startsWith('var(',i)||(i>0&&/[\w-]/.test(value[i-1])))continue;
    let depth=0,j=i+3;
    for(;j<value.length;j++){if(value[j]==='(')depth++;else if(value[j]===')'&&--depth===0)break;}
    const inner=value.slice(i+4,j),comma=inner.indexOf(',');
    const name=(comma<0?inner:inner.slice(0,comma)).trim();
    if(name.startsWith('--'))out.push({name,fallback:comma<0?'':inner.slice(comma+1)});
    i=j; // 巢狀的 var() 由 fallback 的遞迴處理，不在這層重複計入
  }
  return out;
}
export const isFormula=v=>/var\(|color-mix\(/.test(v);
// 原料變數。後備值裡的變數只有在「前導變數在公式的宣告層或更高層沒有任何宣告」時才算原料（否則後備值不可達，不影響結果）。
export function ingredientsOf(value,declaredAtOrAbove=()=>false){
  const out=new Set();
  const visit=v=>{for(const c of varCalls(v)){out.add(c.name);if(c.fallback&&!declaredAtOrAbove(c.name))visit(c.fallback);}};
  visit(value);
  return [...out];
}

// 全部自訂屬性宣告：{name,value,selector,level,file}
export function customPropertyDeclarations(corpus){
  const out=[];
  for(const c of corpus){
    if(c.inlineScope){
      const level=c.inlineScope==='html'?0:c.inlineScope==='body'?1:2;
      for(const d of declsOf(c.text))if(d.prop.startsWith('--'))out.push({name:d.prop,value:d.value,selector:'['+c.file.split('<')[1].replace(' style>','')+' style=""]',level,file:c.file});
      continue;
    }
    for(const r of rulesOf(c.text))for(const sel of r.selector.split(',')){
      for(const d of declsOf(r.body))if(d.prop.startsWith('--'))out.push({name:d.prop,value:d.value,selector:sel.trim(),level:levelOf(sel),file:c.file});
    }
  }
  return out;
}

// 靜態嫌疑：公式的宣告層高於任一原料變數的（注入／覆寫）層。
export function staticFindings(corpus){
  const decls=customPropertyDeclarations(corpus);
  const byName=new Map();for(const d of decls){if(!byName.has(d.name))byName.set(d.name,[]);byName.get(d.name).push(d);}
  const found=new Map();
  for(const f of decls){
    if(!isFormula(f.value))continue;
    const above=name=>(byName.get(name)??[]).some(o=>o.level<=f.level);
    for(const ing of ingredientsOf(f.value,above)){
      for(const o of byName.get(ing)??[]){
        if(o.level<=f.level)continue;
        const key=[f.name,f.selector,ing,o.selector].join(' ⟵ ');
        if(!found.has(key))found.set(key,{kind:'static',formula:f.name,formulaSelector:f.selector,formulaLevel:LEVEL_NAME[f.level],formulaValue:f.value,formulaFile:f.file,
          ingredient:ing,overrideSelector:o.selector,overrideLevel:LEVEL_NAME[o.level],overrideFile:o.file,key:f.name+'|'+ing+'|'+o.selector});
      }
    }
  }
  return [...found.values()].sort((a,b)=>a.key.localeCompare(b.key));
}

// ---------- 動態 ----------
const MIME={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.json':'application/json'};
async function serve(dist){
  const root=resolve(dist);
  const server=createServer((q,res)=>{
    let f=resolve(root,'.'+decodeURIComponent(q.url.split('?')[0]));
    if(f!==root&&!f.startsWith(root+sep)){res.statusCode=403;return res.end();}
    if(existsSync(f)&&statSync(f).isDirectory())f=join(f,'index.html');
    if(!existsSync(f)){res.statusCode=404;return res.end();}
    res.setHeader('content-type',MIME[f.slice(f.lastIndexOf('.'))]||'application/octet-stream');res.end(readFileSync(f));
  });
  await new Promise(r=>server.listen(0,r));
  return {server,port:server.address().port,root};
}
export const routesOf=(dist,max=12)=>{
  const root=resolve(dist);
  const all=walk(root).filter(f=>f.endsWith('/index.html')).map(f=>f.slice(root.length+1,-'index.html'.length)).filter(r=>!r.startsWith('_astro')&&!r.startsWith('pagefind'));
  // 首頁、各一層頁面、再補較深的頁面，上限 max
  return [...all].sort((a,b)=>a.split('/').length-b.split('/').length||a.localeCompare(b)).slice(0,max);
};

// 在瀏覽器內執行：回傳每個元素（含 ::before／::after）各顏色屬性的算出值，以及「匹配的規則裡有宣告到該屬性且值含 var()」的清單。
function pageProbe(){
  const SIDES=['Top','Right','Bottom','Left'];
  const neutral=v=>/^(rgba?\(0, 0, 0, 0\)|rgb\(0, 0, 0\)|rgb\(255, 255, 255\)|transparent|color\(srgb 0 0 0\)|color\(srgb 1 1 1\))$/.test(v);
  const NAMES={ // 屬性 → 可能宣告它的名稱（含簡寫）
    color:['color'],
    backgroundColor:['background-color','background'],
    borderTopColor:['border-top-color','border-top','border-color','border','border-block','border-block-start','border-block-color'],
    borderRightColor:['border-right-color','border-right','border-color','border','border-inline','border-inline-end','border-inline-color'],
    borderBottomColor:['border-bottom-color','border-bottom','border-color','border','border-block','border-block-end','border-block-color'],
    borderLeftColor:['border-left-color','border-left','border-color','border','border-inline','border-inline-start','border-inline-color'],
  };
  const rules=[];
  const collect=list=>{for(const r of list){try{
    if(r.cssRules&&!r.selectorText){if(r.media&&!matchMedia(r.media.mediaText).matches)continue;collect(r.cssRules);continue;}
    if(r.selectorText&&r.style)rules.push(r);
  }catch(e){}}};
  for(const s of document.styleSheets){try{collect(s.cssRules)}catch(e){}}
  // 規則的原文宣告（簡寫保留原樣）
  const declOf=(r,name)=>{const m=r.style.cssText.match(new RegExp('(?:^|;|\\s)'+name.replace(/-/g,'\\-')+'\\s*:\\s*([^;]*)'));return m?m[1].trim():null;};
  const matches=(el,sel,pseudo)=>{
    // 偽元素規則：選擇器以 ::before／::after 結尾才可能匹配該偽元素
    return sel.split(',').some(s=>{
      s=s.trim();const m=s.match(/::?(before|after)$/);
      if(pseudo){if(!m||'::'+m[1]!==pseudo)return false;s=s.slice(0,m.index)||'*';}
      else if(m||/::[a-z-]+$/.test(s))return false;
      try{return el.matches(s)}catch(e){return false}
    });
  };
  const out=[];
  const els=[...document.querySelectorAll('body, body *')];
  els.forEach((el,i)=>{
    if(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE'].includes(el.tagName))return;
    const base=getComputedStyle(el);
    if(base.display==='none'||base.visibility==='hidden')return;
    const tag=el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\s+/).slice(0,2).join('.'):'');
    for(const pseudo of ['','::before','::after']){
      const cs=pseudo?getComputedStyle(el,pseudo):base;
      if(pseudo&&(!cs.content||cs.content==='none'||cs.content==='normal'))continue;
      const props={};
      const hasText=pseudo?cs.content!=='""':[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
      const test=(prop,visible)=>{
        if(!visible)return;
        const v=cs[prop];if(!v||neutral(v))return;
        const hits=[];
        for(const r of rules){
          if(!matches(el,r.selectorText,pseudo))continue;
          for(const name of NAMES[prop]){const d=declOf(r,name);if(d&&/var\(/.test(d))hits.push([r.selectorText+' { '+name+': '+d+' }',d]);}
        }
        if(!pseudo&&/var\(/.test(el.getAttribute('style')||''))hits.push(['[style=""] '+el.getAttribute('style'),el.getAttribute('style')]);
        const seen=new Set();props[prop]={v,hits:hits.filter(h=>!seen.has(h[0])&&seen.add(h[0]))};
      };
      test('color',hasText);
      test('backgroundColor',cs.backgroundColor!=='rgba(0, 0, 0, 0)');
      for(const s of SIDES)test('border'+s+'Color',parseFloat(cs['border'+s+'Width'])>0&&cs['border'+s+'Style']!=='none');
      if(Object.keys(props).length)out.push({i,pseudo,tag:tag+pseudo,props});
    }
  });
  // 站上宣告過的全部自訂屬性，在 :root 與 body 的算出值（用來判斷哪些變數會隨色票改變）
  const names=new Set();
  for(const r of rules)for(const p of r.style)if(p.startsWith('--'))names.add(p);
  for(const el of [document.documentElement,document.body])for(const p of el.style)if(p.startsWith('--'))names.add(p);
  const vars={};
  for(const n of names)vars[n]=[getComputedStyle(document.documentElement).getPropertyValue(n).trim(),getComputedStyle(document.body).getPropertyValue(n).trim()];
  return {count:els.length,rows:out,vars};
}

// 兩個 dist（同站、不同色票）逐頁比對。回傳依「勝出規則＋屬性」聚合的嫌疑。
export async function dynamicFindings(distA,distB,{max=10,widths=[1440,390]}={}){
  const {chromium}=await import('playwright');
  const a=await serve(distA),b=await serve(distB);
  const browser=await chromium.launch({headless:true});
  const candidates=new Map();let compared=0,pages=0;const skipped=[];
  const varies=new Set(); // 兩個色票版本的 :root／body 算出值不同的自訂屬性＝會隨色票改變的變數
  try{
    const routes=routesOf(distA,max);
    for(const route of routes)for(const width of widths){
      const pa=await browser.newPage({viewport:{width,height:900}}),pb=await browser.newPage({viewport:{width,height:900}});
      await pa.goto('http://localhost:'+a.port+'/'+route,{waitUntil:'networkidle'});await pb.goto('http://localhost:'+b.port+'/'+route,{waitUntil:'networkidle'});
      const [ra,rb]=await Promise.all([pa.evaluate(pageProbe),pb.evaluate(pageProbe)]);
      await pa.close();await pb.close();pages++;
      for(const [n,v] of Object.entries(ra.vars)){const w=rb.vars[n];if(!w||v[0]!==w[0]||v[1]!==w[1])varies.add(n);}
      if(ra.count!==rb.count){skipped.push('/'+route);continue;} // 站內搜尋等頁面會在載入後由腳本插入內容，兩次載入的元素數不同；無法逐元素對齊，列入 skipped 不假裝比對過
      const mapB=new Map(rb.rows.map(r=>[r.i+r.pseudo,r]));
      for(const row of ra.rows){
        const other=mapB.get(row.i+row.pseudo);if(!other)continue;
        for(const [prop,info] of Object.entries(row.props)){
          compared++;
          const o=other.props[prop];if(!o||o.v!==info.v)continue; // 有隨色票改變 → 正常
          if(!info.hits.length)continue; // 勝出者不是 var() 派生（字面值／繼承）；字面值由殘留偵測與 G-11 負責
          for(const [text,value] of info.hits){
            const key=text+' ⟶ '+prop;
            const e=candidates.get(key)??{rule:text,value:info.v,declared:value,prop,elements:new Set(),routes:new Set()};
            e.elements.add(row.tag);e.routes.add('/'+route);candidates.set(key,e);
          }
        }
      }
    }
  }finally{await browser.close();a.server.close();b.server.close();}
  // 「源自色票 Token」：該宣告的 var() 鏈（經自訂屬性的各個宣告往下展開）必須碰到至少一個會隨色票改變的變數。
  // 不經過任何會變的變數的（例如 currentColor 派生、第三方程式碼高亮主題自己的前景色）不是色票衍生，不列。
  const decls=customPropertyDeclarations(corpusFromDist(distA));
  const ingredients=new Map();for(const d of decls){const s=ingredients.get(d.name)??new Set();for(const i of ingredientsOf(d.value))s.add(i);ingredients.set(d.name,s);}
  const reachesPalette=value=>{
    const seen=new Set(),todo=ingredientsOf(value);
    while(todo.length){const n=todo.pop();if(seen.has(n))continue;seen.add(n);if(varies.has(n))return true;for(const i of ingredients.get(n)??[])todo.push(i);}
    return false;
  };
  const findings=[...candidates.values()].filter(e=>reachesPalette(e.declared)).map(e=>({kind:'dynamic',rule:e.rule,prop:e.prop,value:e.value,elements:[...e.elements].slice(0,4),routes:[...e.routes].slice(0,4),key:e.rule+' ⟶ '+e.prop})).sort((x,y)=>x.key.localeCompare(y.key));
  return {pages,compared,skipped:[...new Set(skipped)],notPaletteDerived:[...candidates.values()].filter(e=>!reachesPalette(e.declared)).map(e=>e.rule+' ⟶ '+e.prop),findings};
}

// ---------- 分類 ----------
// 每個嫌疑必須被分類。分類檔 scripts/css-resolution-classification.json：
//   {"entries":[{"match":"<key 的子字串>","class":"intentional-fixed|decoration-absent","reason":"…","tracking":"pikaOne1138/ai-workbench#NN"}]}
// 真漏不得留在分類檔（要修）；沒有被任何 entry 涵蓋的嫌疑 → 失敗。
export function loadClassification(path){
  const j=JSON.parse(readFileSync(path,'utf8'));
  for(const e of j.entries){
    assert.ok(['intentional-fixed','decoration-absent'].includes(e.class),'分類只能是 intentional-fixed／decoration-absent（真漏必須修，不得登記）：'+JSON.stringify(e));
    assert.ok(e.reason&&e.reason.length>=10,'分類必須有理由：'+e.match);
    assert.match(e.tracking||'',/^pikaOne1138\/ai-workbench#\d+$/,'分類必須附追蹤編號：'+e.match);
    assert.ok(e.match,'分類缺 match');
  }
  return j.entries;
}
export function unclassified(findings,entries){
  return findings.filter(f=>!entries.some(e=>f.key.includes(e.match)));
}
export function staleEntries(allFindings,entries){
  return entries.filter(e=>!allFindings.some(f=>f.key.includes(e.match)));
}
export function describe(f){
  return f.kind==='static'
    ?`[靜態] ${f.formula}（${f.formulaSelector}，${f.formulaLevel}層）= ${f.formulaValue}；原料 ${f.ingredient} 在 ${f.overrideSelector}（${f.overrideLevel}層，${f.overrideFile}）另有宣告`
    :`[動態] ${f.rule} 的 ${f.prop} 跨色票不變（${f.value}）；元素：${f.elements.join('、')}；頁面：${f.routes.join('、')}`;
}

// ---------- 整站稽核（FULL 用）與自我測試 ----------
import {cpSync,rmSync,symlinkSync,writeFileSync,mkdtempSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
export const CLASSIFICATION=fileURLToPathSafe(new URL('./css-resolution-classification.json',import.meta.url));
function fileURLToPathSafe(u){return decodeURIComponent(u.pathname);}
// 與預設色票（A）每個角色都不同的第二組色票；同站換色票重建後，凡源自色票的可見顏色都該跟著變。
export const ALT_PALETTE={primary:'#B0127A',secondary:'#D45FA8',accent:'#F0A33C',background:'#FDEFF8',text:'#3A0D2B'};

// site：已建置好的匯出站（有 dist、node_modules）。複製一份、換色票、重建，再做靜態＋動態稽核。
export async function auditSite(site,{label=site,classification=CLASSIFICATION,keep=false}={}){
  const entries=loadClassification(classification);
  const staticList=staticFindings(corpusFromDist(join(site,'dist')));
  const alt=site+'-alt-palette';
  rmSync(alt,{recursive:true,force:true});
  cpSync(site,alt,{recursive:true,filter:s=>!/[\\/](node_modules|dist|\.astro|\.git)([\\/]|$)/.test(s)});
  symlinkSync(resolve(site,'node_modules'),join(alt,'node_modules'),'dir');
  const cfgFile=join(alt,'site.config.json'),cfg=JSON.parse(readFileSync(cfgFile,'utf8'));
  cfg.brand={...cfg.brand,primaryColor:ALT_PALETTE.primary,palette:ALT_PALETTE};writeFileSync(cfgFile,JSON.stringify(cfg,null,2));
  execFileSync(process.execPath,['scripts/theme-css.mjs'],{cwd:alt,stdio:'pipe'});
  execFileSync(join(alt,'node_modules/.bin/astro'),['build'],{cwd:alt,stdio:'pipe'});
  let dyn;
  try{dyn=await dynamicFindings(join(site,'dist'),join(alt,'dist'));}
  finally{if(!keep)rmSync(alt,{recursive:true,force:true});}
  const all=[...staticList,...dyn.findings];
  const bad=unclassified(all,entries);
  for(const f of all)REPORT.push({label,classified:!bad.includes(f),...f});
  return {label,static:staticList,dynamic:dyn,unclassified:bad};
}
// 整輪（FULL）先收集所有站的結果，最後一次列出完整清單；任何未分類的嫌疑都讓整輪失敗。
const REPORT=[];
export function assertCssResolutionClean({reportFile}={}){
  if(reportFile)writeFileSync(reportFile,JSON.stringify(REPORT,null,1));
  const bad=REPORT.filter(f=>!f.classified);
  const byKey=new Map();for(const f of bad){const e=byKey.get(f.key)??{f,labels:[]};e.labels.push(f.label);byKey.set(f.key,e);}
  assert.deepEqual([...byKey.values()].map(e=>describe(e.f)+'  ← '+e.labels.join('、')),[],'CSS 結算層級稽核有未分類的嫌疑（共 '+byKey.size+' 項；真漏必須修；刻意固定／裝飾不存在要登記理由與追蹤編號）');
  return REPORT.length;
}

// 檢查器自己的對照組（需要瀏覽器）：殼階段 1 的 --line 缺陷必須被抓到；修好的寫法必須通過。
export async function selfTestCssResolution(){
  const dirs=[];
  const mk=(css,bodyStyle='')=>{
    const d=mkdtempSync(join(tmpdir(),'css-res-'));dirs.push(d);
    writeFileSync(join(d,'site.css'),css);
    writeFileSync(join(d,'index.html'),`<!doctype html><html><head><link rel="stylesheet" href="/site.css"></head><body${bodyStyle?` style="${bodyStyle}"`:''}><main><p class="rule">text</p></main></body></html>`);
    return d;
  };
  try{
    // 缺陷：公式在 :root，原料由 <body style> 注入（色票隨站變，公式卻用 :root 的預設值結算）
    const FROZEN=':root{--ink:#242a24;--bg:#f4f1e8;--line:color-mix(in srgb,var(--ink) 25%,var(--bg))}.rule{border-top:1px solid var(--line);color:var(--ink);background:var(--bg)}';
    const a=mk(FROZEN,'--ink:#1f2924;--bg:#f7f8f4'),b=mk(FROZEN,'--ink:#3a0d2b;--bg:#fdeff8');
    const st=staticFindings(corpusFromDist(a));
    assert.ok(st.some(f=>f.formula==='--line'&&f.ingredient==='--ink')&&st.some(f=>f.formula==='--line'&&f.ingredient==='--bg'),'自我測試：凍結的 --line（:root 公式＋body 注入原料）沒被靜態抓到');
    const dyn=await dynamicFindings(a,b,{max:2,widths:[800]});
    assert.ok(dyn.findings.some(f=>f.prop==='borderTopColor'&&/var\(--line\)/.test(f.rule)),'自我測試：跨色票不變的 var(--line) 邊線沒被動態抓到');
    assert.ok(!dyn.findings.some(f=>f.prop==='color'||f.prop==='backgroundColor'),'自我測試：有隨色票改變的顏色不該被列為嫌疑');
    // 修好：公式與原料同層（都在 :root），色票由 :root 注入
    const FIXED=p=>`:root{--p-text:${p.text};--p-bg:${p.bg};--line:color-mix(in srgb,var(--p-text) 25%,var(--p-bg))}.rule{border-top:1px solid var(--line);color:var(--p-text);background:var(--p-bg)}`;
    const c=mk(FIXED({text:'#1f2924',bg:'#f7f8f4'})),d=mk(FIXED({text:'#3a0d2b',bg:'#fdeff8'}));
    assert.deepEqual(staticFindings(corpusFromDist(c)),[],'自我測試：公式與原料同層不該有靜態嫌疑');
    const ok=await dynamicFindings(c,d,{max:2,widths:[800]});
    assert.deepEqual(ok.findings,[],'自我測試：隨色票變化的邊線不該有動態嫌疑');
    assert.ok(ok.compared>0,'自我測試：動態稽核沒有比對任何屬性');
    // 非色票衍生：var() 鏈只到 currentColor（例如第三方程式碼高亮主題自己的前景色）→ 即使跨色票不變也不列；
    // 同一頁有隨色票改變的變數（--p-text）不能讓它被誤判
    const CODE=p=>`:root{--p-text:${p.text};--p-bg:${p.bg}}.frame{--sr:color-mix(in srgb,currentColor 25%,transparent)}pre{color:#e1e4e8;background:#24292e;border:1px solid var(--sr)}.rule{color:var(--p-text);background:var(--p-bg)}`;
    const mkc=css=>{const d=mkdtempSync(join(tmpdir(),'css-res-'));dirs.push(d);writeFileSync(join(d,'site.css'),css);writeFileSync(join(d,'index.html'),'<!doctype html><html><head><link rel="stylesheet" href="/site.css"></head><body><main class="frame"><p class="rule">x</p><pre>code</pre></main></body></html>');return d;};
    const e=mkc(CODE({text:'#1f2924',bg:'#f7f8f4'})),f=mkc(CODE({text:'#3a0d2b',bg:'#fdeff8'}));
    const cc=await dynamicFindings(e,f,{max:2,widths:[800]});
    assert.deepEqual(cc.findings,[],'自我測試：currentColor 派生（非色票衍生）的邊線不該被列為嫌疑');
    assert.ok(cc.notPaletteDerived.some(x=>/var\(--sr\)/.test(x)),'自我測試：非色票衍生的候選應被記錄在 notPaletteDerived');
  }finally{for(const d of dirs)rmSync(d,{recursive:true,force:true});}
}
