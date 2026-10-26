// 殼版型（art-direction／native-expansion 共用的 SiteLayout）載入語意 Token 後的檢查。
// 階段 1 只加載 tokens.css 與 theme.css，不改任何語意：殼自己的 --brand／--ink／--bg／--panel／--accent 仍由 brand.palette 寫入，
// 其中 --accent 是 palette.accent，不是 tokens.css 別名層的 --accent（＝primary）。這個檢查把這件事固定下來。
import {readFileSync,existsSync} from 'node:fs';
import {join,resolve,sep} from 'node:path';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
import {declaredIn} from './audit-shell-vars.mjs';

// 舊名別名（legacy-aliases.css，ai-workbench#22）：tokens.css 不得定義；只有 prototype 宿主連結與出貨，殼宿主兩者皆無。
const aliasNames=()=>[...declaredIn(readFileSync(new URL('../src/styles/legacy-aliases.css',import.meta.url),'utf8'))];
function tokensHaveNoAliases(site){
  const defs=declaredIn(readFileSync(join(site,'public/tokens.css'),'utf8'));
  assert.deepEqual(aliasNames().filter(n=>defs.has(n)),[],'public/tokens.css 不得定義舊名別名（應在 legacy-aliases.css）');
}

// 靜態：匯出站原始碼。連結順序＝tokens → theme → site；殼仍以 palette 寫入行內變數；theme.css／tokens.css 檔案存在。
export function checkShellSource(site){
  const layout=readFileSync(join(site,'src/layouts/SiteLayout.astro'),'utf8');
  const at=h=>layout.indexOf("href={base+'"+h+"'}");
  const [t,th,cc,s]=['tokens.css','theme.css','component-contract.css','site.css'].map(at);
  assert.ok(t>=0&&th>t&&cc>th&&s>cc,'SiteLayout 必須依序連結 tokens.css、theme.css、component-contract.css、site.css');
  assert.ok(layout.includes('--accent:${palette.accent}'),'殼的 --accent 必須仍是 palette.accent');
  assert.ok(layout.includes('--brand:${palette.primary}')&&layout.includes('--ink:${palette.text}')&&layout.includes('--bg:${palette.background}'),'殼的 --brand／--ink／--bg 必須仍由 palette 寫入');
  for(const f of ['public/tokens.css','public/theme.css','public/component-contract.css','public/site.css'])assert.ok(existsSync(join(site,f)),f+' 不存在');
  assert.ok(/prebuild/.test(readFileSync(join(site,'package.json'),'utf8')),'prebuild 必須重產 theme.css');
  assert.ok(!layout.includes('legacy-aliases.css'),'殼宿主不得連結 legacy-aliases.css');
  assert.ok(!existsSync(join(site,'public/legacy-aliases.css')),'殼宿主不得出貨 legacy-aliases.css');
  tokensHaveNoAliases(site);
}

// 靜態：prototype 宿主。連結順序＝tokens → legacy-aliases → theme → component-contract → site；別名檔存在且定義全部舊名。
export function checkPrototypeSource(site){
  const layout=readFileSync(join(site,'src/layouts/SiteLayout.astro'),'utf8');
  const at=h=>layout.indexOf("href={base+'"+h+"'}");
  const [t,a,th,cc,s]=['tokens.css','legacy-aliases.css','theme.css','component-contract.css','site.css'].map(at);
  assert.ok(t>=0&&a>t&&th>a&&cc>th&&s>cc,'SiteLayout 必須依序連結 tokens.css、legacy-aliases.css、theme.css、component-contract.css、site.css');
  assert.ok(existsSync(join(site,'public/legacy-aliases.css')),'public/legacy-aliases.css 不存在');
  const defs=declaredIn(readFileSync(join(site,'public/legacy-aliases.css'),'utf8'));
  assert.deepEqual(aliasNames().filter(n=>!defs.has(n)),[],'legacy-aliases.css 缺舊名');
  tokensHaveNoAliases(site);
}

// 動態：建置後的 dist 在瀏覽器中的算出值。palette 需含不同於 primary 的 accent，才有辨識力。
export async function checkShellRuntime(dist,palette,{route='',probe}={}){
  assert.ok(palette?.accent&&palette.accent.toLowerCase()!==palette.primary.toLowerCase(),'檢查用色票的 accent 必須不同於 primary');
  const root=resolve(dist);
  const server=createServer((q,res)=>{
    let f=resolve(root,'.'+decodeURIComponent(q.url.split('?')[0]));
    if(f!==root&&!f.startsWith(root+sep)){res.statusCode=403;return res.end();}
    if(existsSync(f)&&!/\.[a-z0-9]+$/i.test(f))f=join(f,'index.html');
    if(!existsSync(f)){res.statusCode=404;return res.end();}
    res.setHeader('content-type',{'.html':'text/html;charset=utf-8','.css':'text/css'}[f.slice(f.lastIndexOf('.'))]||'application/octet-stream');
    res.end(readFileSync(f));
  });
  await new Promise(r=>server.listen(0,r));
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage();
    await page.goto('http://localhost:'+server.address().port+'/'+route);
    const got=await page.evaluate(({probe})=>{
      // 殼把 palette 寫在 <body style>，殼元件（body 之下）讀到的是 body 上的算出值；Token 在 :root。
      const v=(n,el=document.body)=>getComputedStyle(el).getPropertyValue(n).trim().toLowerCase();
      const out={accent:v('--accent'),brand:v('--brand'),colorPrimary:v('--color-primary'),colorAccent:v('--color-accent'),tokensLoaded:v('--space-2',document.documentElement)!==''};
      if(probe){const e=document.querySelector(probe.selector);out.probe=e?getComputedStyle(e)[probe.prop]:null;}
      return out;
    },{probe});
    const hex=h=>{const n=parseInt(h.slice(1),16);return `rgb(${n>>16&255}, ${n>>8&255}, ${n&255})`;};
    const norm=s=>{if(!s)return s;s=s.trim().toLowerCase();return s.startsWith('#')?s:s;};
    assert.equal(norm(got.accent),palette.accent.toLowerCase(),'殼的 --accent 載入 tokens.css 後必須仍是 palette.accent，實際：'+got.accent);
    assert.notEqual(norm(got.accent),norm(got.colorPrimary),'--accent 不得變成 primary');
    assert.equal(norm(got.brand),palette.primary.toLowerCase(),'殼的 --brand 必須仍是 palette.primary');
    assert.equal(norm(got.colorPrimary),palette.primary.toLowerCase(),'tokens.css 已載入：--color-primary 必須等於 palette.primary');
    assert.equal(norm(got.colorAccent),palette.accent.toLowerCase(),'tokens.css 已載入：--color-accent 必須等於 palette.accent');
    assert.ok(got.tokensLoaded,'tokens.css 未載入（--space-2 不存在）');
    if(probe)assert.equal(got.probe,hex(palette.accent),'殼元件（'+probe.selector+'）的 '+probe.prop+' 必須讀到 palette.accent，實際：'+got.probe);
    return got;
  }finally{await browser.close();server.close();}
}

// 檢查器自己的負向／正向對照（需要瀏覽器）：accent 被換成 primary 時必須失敗，維持 palette.accent 時必須通過。
export async function selfTestShellRuntime(){
  const {mkdtempSync,mkdirSync,writeFileSync,rmSync}=await import('node:fs');
  const {tmpdir}=await import('node:os');
  const palette={primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'};
  const mk=accentValue=>{
    const dir=mkdtempSync(join(tmpdir(),'shell-token-selftest-'));
    writeFileSync(join(dir,'tokens.css'),':root{--color-primary:var(--brand-primary);--color-accent:var(--brand-accent,var(--color-primary));--space-2:1rem;--accent:var(--color-primary)}');
    writeFileSync(join(dir,'theme.css'),`:root{--brand-primary:${palette.primary};--brand-accent:${palette.accent}}`);
    writeFileSync(join(dir,'site.css'),'p{color:#000}');
    writeFileSync(join(dir,'index.html'),`<!doctype html><html><head><link rel="stylesheet" href="/tokens.css"><link rel="stylesheet" href="/theme.css"><link rel="stylesheet" href="/site.css"></head><body style="--brand:${palette.primary};--ink:${palette.text};--bg:${palette.background};--accent:${accentValue};"><p>x</p></body></html>`);
    return dir;
  };
  const good=mk(palette.accent),bad=mk(palette.primary);
  try{
    await checkShellRuntime(good,palette);
    let failed=false;
    try{await checkShellRuntime(bad,palette);}catch{failed=true;}
    assert.ok(failed,'檢查器自我測試：--accent 被換成 primary 時應該失敗，卻通過了');
  }finally{rmSync(good,{recursive:true,force:true});rmSync(bad,{recursive:true,force:true});}
}
