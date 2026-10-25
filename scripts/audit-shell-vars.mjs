// 殼版型的 CSS 變數引用掃描（階段 1 休眠／碰撞檢查）。
// 對「實際會載入、會用到」的 CSS（建置後 dist 的所有 html 內嵌 <style>、style=""、連結的 css，不含 tokens.css／theme.css）
// 掃出全部 var(--*) 引用，對照宿主在載入 Token 之前就有定義的變數（殼自身行內變數、site.css、component-contract.css、版型自己的區域變數），
// 再對照 tokens.css／theme.css 會新增定義的變數，分成三類：
//   A 休眠啟用：有引用、宿主沒定義、tokens／theme 有定義 → 載入 Token 後原本無效的宣告會突然生效（畫面改變）。必須為空。
//   B 同名碰撞：宿主與 tokens／theme 都有宣告 → 勝出者必須是宿主（body 行內變數、site.css 的 :root 在 tokens 之後、元件區域變數）。只准白名單內的名稱。
//   C 仍未定義：引用在載入 Token 後依然沒有定義 → 只准白名單內的「有後備值的選用參數」。
// 這是靜態、以名稱為單位的檢查；作用域層級（區域變數在子樹外被引用）由 cmp 逐元素算出值比對補上，見階段 1 報告。
import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';

// B：宿主與 Token 同名但宿主勝出的名稱；理由寫在這，新增要有理由。
export const KNOWN_B={
  '--brand':'殼在 <body style> 寫入 palette.primary；tokens 別名在 :root，body 行內勝出',
  '--ink':'殼在 <body style> 寫入 palette.text；同上',
  '--bg':'殼在 <body style> 寫入 palette.background；同上',
  '--accent':'殼在 <body style> 寫入 palette.accent（階段 1 維持殼語意，不統一為 primary）；同上。樣板容器 .pattern-slot 內另設為 var(--brand)',
  '--line':'殼 site.css 的 :root 在 tokens.css 之後載入，同層級後者勝出',
  '--text':'樣板容器 .pattern-slot（ContentPatterns，殼上每個區段樣板都在裡面）定義為 var(--ink)；容器內勝出。tokens 另在 :root 提供同名別名，所以容器外「多出」定義；容器外沒有引用者（動態檢查證明）',
  '--muted':'同 --text：.pattern-slot 內定義為 ink 與 bg 的混色；容器內勝出',
};
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

// 政策：A 必須為空；B 只准白名單；C 只准白名單且引用處都有後備值。
export function assertShellVars(result,label=''){
  const w=label?label+'：':'';
  assert.deepEqual(result.A.map(x=>x.name),[],w+'休眠啟用（引用了宿主沒定義、載入 Token 後才定義的變數）：'+result.A.map(x=>x.name+'（'+x.files.join('、')+'）').join('；'));
  const badB=result.B.filter(x=>!KNOWN_B[x.name]);
  assert.deepEqual(badB.map(x=>x.name),[],w+'同名碰撞但不在白名單：'+badB.map(x=>x.name).join('、'));
  const badC=result.C.filter(x=>!OPTIONAL_C[x.name]||!x.fallbackOnly);
  assert.deepEqual(badC.map(x=>x.name),[],w+'仍未定義的引用：'+badC.map(x=>x.name+'（'+x.files.join('、')+'）').join('；'));
}

// ---- 動態：以「不載入 tokens.css／theme.css」的同一份 dist 為基準（＝載入前的實際狀態），
// 找出「引用了 Token 才有的變數、而該元素在沒有 Token 時算不出值」的元素。這能抓到靜態名稱掃描看不到的作用域問題
// （例如 --text 只在版型根元素內有區域定義，根元素外的引用在載入 Token 後會突然生效）。
// 規則：樣式表裡含 var(--名稱) 的每條規則（--名稱 ∈ tokens／theme 定義的名稱），其選擇器（去掉 :hover／:focus／偽元素）選到的每個元素，
// 在沒有 Token 的狀態下該名稱必須已有值；沒有 → 該元素會在載入 Token 後被啟用。
import {createServer} from 'node:http';
import {resolve,sep} from 'node:path';
const MIME={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.json':'application/json'};
export async function auditReferencedRuntime(dist,tokenCss,{routes}={}){
  const root=resolve(dist);
  const names=[...declaredIn(tokenCss)];
  const server=createServer((q,res)=>{
    let f=resolve(root,'.'+decodeURIComponent(q.url.split('?')[0]));
    if(f!==root&&!f.startsWith(root+sep)){res.statusCode=403;return res.end();}
    if(existsSync(f)&&statSync(f).isDirectory())f=join(f,'index.html');
    if(!existsSync(f)){res.statusCode=404;return res.end();}
    res.setHeader('content-type',MIME[f.slice(f.lastIndexOf('.'))]||'application/octet-stream');res.end(readFileSync(f));
  });
  await new Promise(r=>server.listen(0,r));
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true});
  const violations=[];let elements=0,pages=0;
  try{
    const list=routes??['',...walk(root).filter(f=>f.endsWith('/index.html')).map(f=>f.slice(root.length+1,-'index.html'.length)).filter(r=>r&&!r.startsWith('_astro')&&!r.startsWith('pagefind'))];
    for(const route of list){
      for(const width of [1440,390]){
        const page=await browser.newPage({viewport:{width,height:900}});
        await page.route(/\/(tokens|theme)\.css(\?|$)/,r=>r.abort());
        await page.goto('http://localhost:'+server.address().port+'/'+route);
        const found=await page.evaluate(names=>{
          const set=new Set(names),out=[],seen=new Set();let count=0;
          const visit=(rules)=>{for(const rule of rules){
            if(rule.cssRules&&!rule.selectorText){visit(rule.cssRules);continue;}
            if(!rule.selectorText||!rule.style)continue;
            const used=new Set();
            for(let i=0;i<rule.style.length;i++){const v=rule.style.getPropertyValue(rule.style[i]);for(const m of v.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g))if(set.has(m[1]))used.add(m[1]);}
            // 原始文字（custom property 的值不會出現在 style[i] 迴圈外的情況）
            for(const m of rule.cssText.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g))if(set.has(m[1]))used.add(m[1]);
            if(!used.size)continue;
            for(const sel of rule.selectorText.split(',')){
              const base=sel.replace(/::?(hover|focus|focus-visible|focus-within|active|before|after|first-letter|first-line|placeholder|marker|selection)\b/g,'').trim();
              let els;try{els=document.querySelectorAll(base||'*')}catch(e){continue}
              for(const el of els){count++;const cs=getComputedStyle(el);
                for(const n of used){if(cs.getPropertyValue(n).trim()===''){const key=sel+'|'+n;if(!seen.has(key)){seen.add(key);out.push({selector:sel.trim().slice(0,90),name:n});}}}}
            }
          }};
          for(const sheet of document.styleSheets){try{visit(sheet.cssRules)}catch(e){}}
          return {out,count};
        },names);
        violations.push(...found.out.map(v=>({...v,route:'/'+route,width})));elements+=found.count;pages++;
        await page.close();
      }
    }
  }finally{await browser.close();server.close();}
  const uniq=new Map();for(const v of violations)uniq.set(v.selector+'|'+v.name,v);
  return {violations:[...uniq.values()],elements,pages};
}

// 檢查器自己的對照組（需要瀏覽器）：Token 才有的引用要抓到；宿主有定義就放行；區域定義在子樹外的引用要抓到。
export async function selfTestAuditRuntime(){
  const {mkdtempSync,mkdirSync,writeFileSync,rmSync}=await import('node:fs');
  const {tmpdir}=await import('node:os');
  const tok=':root{--color-content:#111;--text:var(--color-content)}';
  const mk=(css,body)=>{const d=mkdtempSync(join(tmpdir(),'audit-runtime-'));
    writeFileSync(join(d,'tokens.css'),tok);writeFileSync(join(d,'theme.css'),':root{--brand-primary:#000}');writeFileSync(join(d,'site.css'),css);
    writeFileSync(join(d,'index.html'),'<!doctype html><html><head><link rel="stylesheet" href="/tokens.css"><link rel="stylesheet" href="/theme.css"><link rel="stylesheet" href="/site.css"></head><body>'+body+'</body></html>');return d;};
  const dirs=[];
  try{
    // 1 休眠啟用：引用 Token 才有的名稱，宿主沒定義
    let d=mk('a:hover{background:var(--color-content)}','<a href="#">x</a>');dirs.push(d);
    let r=await auditReferencedRuntime(d,tok);assert.ok(r.violations.some(v=>v.name==='--color-content'),'對照組：休眠啟用沒被抓到');
    // 2 宿主定義了契約變數 → 放行
    d=mk(':root{--hover:transparent}a:hover{background:var(--hover)}','<a href="#">x</a>');dirs.push(d);
    r=await auditReferencedRuntime(d,tok);assert.deepEqual(r.violations,[],'對照組：有宿主定義卻被誤抓');
    // 3 區域定義只在子樹內：子樹內放行、子樹外的引用要抓到（--text 的情況）
    d=mk('.scope{--text:#222}.inside,.outside{color:var(--text)}','<div class="scope"><p class="inside">a</p></div><p class="outside">b</p>');dirs.push(d);
    r=await auditReferencedRuntime(d,tok);assert.deepEqual(r.violations.map(v=>v.selector+'|'+v.name),['.outside|--text'],'對照組：子樹外引用應被抓到');
    d=mk('.scope{--text:#222}.inside{color:var(--text)}','<div class="scope"><p class="inside">a</p></div>');dirs.push(d);
    r=await auditReferencedRuntime(d,tok);assert.deepEqual(r.violations,[],'對照組：子樹內引用不應被抓');
  }finally{for(const x of dirs)rmSync(x,{recursive:true,force:true});}
}
