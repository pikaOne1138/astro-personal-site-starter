// 殼版型的 CSS 變數引用掃描。
// 對「實際會載入、會用到」的 CSS（建置後 dist 的所有 html 內嵌 <style>、style=""、連結的 css，不含 tokens.css／theme.css）
// 掃出全部 var(--*) 引用，對照宿主自己定義的變數（site.css、component-contract.css、版型與樣板容器的區域變數），
// 再對照 tokens.css／theme.css 定義的變數，分成三類：
//   A 引用 Token：有引用、宿主沒定義、tokens／theme 有定義。階段 2 起殼以 L1 Token 為來源，所以這是正常狀態，只列出不當缺陷
//     （階段 1 時它是「休眠啟用」缺陷，那時殼不依賴 Token）。
//   B 同名碰撞：宿主與 tokens／theme 都有宣告 → 沒有白名單，必須為空（舊名別名已拆到 legacy-aliases.css，殼不連結，見 ai-workbench#22）。
//   C 仍未定義：引用在載入 Token 後依然沒有定義 → 只准白名單內的「有後備值的選用參數」。
// 這是靜態、以名稱為單位的檢查；作用域層級（區域變數在子樹外被引用，例如舊的 :root --line 引用 body 才有的變數）由 cmp 逐元素算出值比對補上，見階段 2 報告。
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';

// B（宿主與 Token 同名）不再有白名單：舊名別名已拆到 legacy-aliases.css，殼不連結它（ai-workbench#22），
// 所以 tokens.css 在殼上只新增 L1 名稱；殼自己的 --brand／--ink／--bg／--accent／--line 不會再與 Token 同名。任何 B 都是缺陷。

// C：沒有宿主定義、也不由 Token 提供的名稱。必須是「元素行內才會提供」且引用處有後備值的選用參數。
export const OPTIONAL_C={
  '--owner-fit':'OwnerImage 的選用參數，引用處 var(--owner-fit,cover)',
  '--owner-position':'OwnerImage 的選用參數，引用處 var(--owner-position,center)',
  '--owner-filter':'OwnerImage 的選用參數，引用處有後備值',
};

const DECL=/(?<![a-zA-Z0-9-])(--[a-zA-Z0-9-]+)\s*:/g;
const REF=/var\(\s*(--[a-zA-Z0-9-]+)\s*(,)?/g;
export const declaredIn=text=>new Set([...text.matchAll(DECL)].map(m=>m[1]));
export function referencesIn(text){const out=new Map();for(const m of text.matchAll(REF)){const e=out.get(m[1])??{fallback:true};if(!m[2])e.fallback=false;out.set(m[1],e);}return out;}

const walk=(dir,out=[])=>{for(const f of readdirSync(dir)){const p=join(dir,f);statSync(p).isDirectory()?walk(p,out):out.push(p);}return out;};
// 建置後 dist 的 CSS 語料（不含 tokens.css／theme.css）
export function corpusFromDist(dist){
  const corpus=[];
  for(const html of walk(dist).filter(f=>f.endsWith('.html'))){
    const t=readFileSync(html,'utf8'),rel=html.slice(dist.length+1);
    for(const m of t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))corpus.push({file:rel+'<style>',text:m[1],host:false});
    for(const m of t.matchAll(/<body[^>]*\sstyle="([^"]*)"/g))corpus.push({file:rel+'<body style>',text:m[1],host:true});
    for(const m of t.matchAll(/\sstyle="([^"]*)"/g))corpus.push({file:rel+'[style]',text:m[1],host:false});
    for(const m of t.matchAll(/href="([^"]+\.css)"/g)){
      const f=join(dist,m[1].replace(/^\//,''));
      if(/\/(tokens|theme)\.css$/.test(m[1])||!existsSync(f))continue;
      corpus.push({file:m[1],text:readFileSync(f,'utf8'),host:true});
    }
  }
  const seen=new Set();return corpus.filter(c=>{const k=c.file+'\0'+c.text;if(seen.has(k))return false;seen.add(k);return true;});
}

// 家族專屬規則（[data-design-family="x"]、[data-site-family="x"]、[data-story-family="x"]… 且 x 不是本站的版型代號）
// 在本站的任何頁面都選不到元素，靜態名稱掃描不該把它們算進引用。其餘規則（含 @media 內）原樣保留。
const FAMILY_ATTR=/\[data-[a-z]+-family\s*=\s*["']?([^"'\]]+)["']?\]/g;
export function stripOtherFamilyRules(css,slug){
  if(!slug)return css;
  let out='',i=0;
  const n=css.length;
  const readBlock=(start)=>{let depth=0,j=start;for(;j<n;j++){if(css[j]==='{')depth++;else if(css[j]==='}'&&--depth===0)return j;}return n-1;};
  while(i<n){
    const open=css.indexOf('{',i);if(open<0){out+=css.slice(i);break;}
    const head=css.slice(i,open),close=readBlock(open);
    if(/^\s*@(media|supports|layer|container)/.test(head)){out+=head+'{'+stripOtherFamilyRules(css.slice(open+1,close),slug)+'}';}
    else{
      const others=[...head.matchAll(FAMILY_ATTR)].map(m=>m[1]).filter(v=>v!==slug);
      // 選擇器清單：只要有任何一個選擇器不是「別的家族」就保留（保守）
      const sels=head.split(',');const live=sels.filter(s=>![...s.matchAll(FAMILY_ATTR)].some(m=>m[1]!==slug));
      if(live.length===sels.length||!others.length)out+=head+css.slice(open,close+1);
      else if(live.length)out+=live.join(',')+css.slice(open,close+1);
    }
    i=close+1;
  }
  return out;
}

export function classify(corpus,tokenCss,{slug}={}){
  const tokenDefs=declaredIn(tokenCss);
  const host=new Set(),refs=new Map();
  for(const c0 of corpus){
    const c={...c0,text:stripOtherFamilyRules(c0.text,slug)};
    for(const n of declaredIn(c.text))host.add(n);
    for(const [n,v] of referencesIn(c.text)){const e=refs.get(n)??{files:new Set(),fallbackOnly:true};e.files.add(c.file.split('/').pop());if(!v.fallback)e.fallbackOnly=false;refs.set(n,e);}
  }
  const A=[],B=[],C=[];
  for(const [name,e] of refs){
    if(host.has(name))continue;
    if(tokenDefs.has(name))A.push({name,files:[...e.files].sort(),fallbackOnly:e.fallbackOnly});
    else C.push({name,files:[...e.files].sort(),fallbackOnly:e.fallbackOnly});
  }
  for(const name of host)if(tokenDefs.has(name))B.push({name});
  const by=(a,b)=>a.name.localeCompare(b.name);
  return {A:A.sort(by),B:B.sort(by),C:C.sort(by)};
}

export function siteSlug(dist){const h=join(dist,'index.html');const m=existsSync(h)&&readFileSync(h,'utf8').match(/data-site-family="([^"]+)"/);return m?m[1]:undefined;}
export function auditDist(dist,tokenCss){return classify(corpusFromDist(dist),tokenCss,{slug:siteSlug(dist)});}

// 政策（階段 2）：殼本來就以 L1 Token 為來源，所以 A（引用了 tokens.css 才定義的名稱）不再是缺陷，只當資訊列出；B 必須為空（沒有白名單）；C 只准白名單且引用處都有後備值。
// （階段 1 的「A 必須為空」與動態的休眠啟用檢查已移除：階段 2 之後，沒有 Token 殼就不成立，由連結順序與算出值檢查把關。）
export function assertShellVars(result,label=''){
  const w=label?label+'：':'';
  assert.deepEqual(result.B.map(x=>x.name),[],w+'同名碰撞（宿主與 tokens.css 定義同一個名稱）：'+result.B.map(x=>x.name).join('、'));
  const badC=result.C.filter(x=>!OPTIONAL_C[x.name]||!x.fallbackOnly);
  assert.deepEqual(badC.map(x=>x.name),[],w+'仍未定義的引用：'+badC.map(x=>x.name+'（'+x.files.join('、')+'）').join('；'));
}
