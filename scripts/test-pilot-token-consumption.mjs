#!/usr/bin/env node
// 已轉換版型守門（D-T3 試點＋擴展批次）：版型檔與其在共用檔中的家族規則，
// 不得出現主題字面值（色碼、rgb()/hsl()、white/black、寫死的字族／圓角／陰影）。
// 掃描用 audit-design-values.mjs 的 scanCss()，與之後 G-11 共用同一個掃描器。
// 這不是發布關卡：它只防止試點被新寫死值蛀空；其餘版型尚未轉換，不在此列。
import {readFileSync,mkdtempSync,mkdirSync,writeFileSync,rmSync,existsSync,readdirSync,statSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {scanCss,extractCss} from './audit-design-values.mjs';
import {gateDesign,loadGateConfig} from './gates.mjs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const total=r=>({
  colorInUse:r.colorLiteralInUse.reduce((n,x)=>n+x.n,0),
  colorInLocalToken:r.colorLiteralInLocalToken.reduce((n,x)=>n+x.n,0),
  colorFallback:r.colorFallback,
  font:r.fontLiteral.length,radius:r.radiusLiteral.length,shadow:r.shadowLiteral.length,
});
const scanFile=(file,text)=>extractCss(file,text).map(p=>total(scanCss(p.text))).reduce((a,b)=>Object.fromEntries(Object.keys(a).map(k=>[k,a[k]+b[k]])),{colorInUse:0,colorInLocalToken:0,colorFallback:0,font:0,radius:0,shadow:0});
const zero={colorInUse:0,colorInLocalToken:0,colorFallback:0,font:0,radius:0,shadow:0};

// 誤判 fixture：這些是正常寫法，不得被標記（吸取 G-02 教訓）
const clean=`
.a{color:var(--color-content);background:color-mix(in srgb,var(--color-primary) 20%,transparent);border:1px solid currentColor}
.b{background:linear-gradient(130deg,var(--color-surface),var(--color-surface-alt));box-shadow:var(--shadow-hard)}
.c{font:500 1rem/1.4 var(--font-heading);font-family:var(--font-body);border-radius:var(--radius-md);outline:3px solid var(--color-focus)}
.d::after{content:"#2026 white black";background:url(#grad)}
.e a[href="#top"]{color:inherit}
.f{box-shadow:0 2px 4px #0003;background:rgba(255,255,255,.4);border-color:rgb(0 0 0 / .1)}
.g{color:var(--color-primary)}
/* design-fixed: brand-logo */
.h{fill:#d9262c}
`;
assert.deepEqual(total(scanCss(clean)),zero,'誤判：正常的 Token 用法被標記');

// 必須抓到的寫死值（驗收 4 的 fixture：故意寫入 #2563eb）
const dirty=scanCss('.x{background:#2563eb;color:white;border:1px solid rgb(10,20,30);font-family:Georgia,serif;border-radius:12px;box-shadow:0 1px 2px rgb(10,20,30)}');
const t=total(dirty);
assert.ok(t.colorInUse>=4&&t.font===1&&t.radius===1&&t.shadow===1,'漏抓：'+JSON.stringify(t));
assert.ok(dirty.colorLiteralInUse.flatMap(x=>x.colors||[]).includes('#2563eb'),'應標出 #2563eb');

// 已轉換版型的守門。D-T3 試點（reading-atlas、clinician）＋批 1（field-notes、essayist、companion、somatic、subject-atlas、
// practice-compass、portrait-profile、editorial-frontpage）。名單只增不減：新版型轉換完成後加進來。
const PROTOTYPE=['reading-atlas','clinician','field-notes','essayist','companion','somatic'];
// art-direction 與 native-expansion 的匯出殼（SiteLayout）只定義 --brand／--ink／--bg／--panel／--accent／--serif，沒有載入 tokens.css
// （D-T3 批 1 發現的缺口，見 Issue #17）。這些版型暫時以殼的變數推導，守門先護欄色彩／圓角／陰影；字族（mono／sans 字面值）等殼補上 Token 後再納入。
const SHELL_BASED={'subject-atlas':'src/data/art-direction-adapters/subject-atlas','practice-compass':'src/data/art-direction-adapters/practice-compass',
  'portrait-profile':'src/data/layout-assembly/expanded/portrait-profile','editorial-frontpage':'src/data/layout-assembly/expanded/editorial-frontpage'};
// 其餘 native-expansion 版型：色彩、圓角、陰影已乾淨，同樣先護欄這三項。
const NATIVE_COLOUR_ONLY=['sidebar-journal','card-journal','visual-stories','compact-dispatch','split-reader','service-catalogue','studio-chapters','editorial-practice','question-led-practice'];
const walk=(rel,out=[])=>{for(const f of readdirSync(new URL('../'+rel,import.meta.url)).sort()){const r=rel+'/'+f;
  if(statSync(new URL('../'+r,import.meta.url)).isDirectory())walk(r,out);else if(/\.(astro|css)$/.test(f))out.push(r);}return out;};
const scanDir=rel=>walk(rel).map(f=>scanFile(f,read(f))).reduce((a,b)=>Object.fromEntries(Object.keys(a).map(k=>[k,a[k]+b[k]])),{...zero});

// 目錄走訪不得是瞎的：放一個髒檔，必須被掃出來
const dirtyTmp=mkdtempSync(join(tmpdir(),'guard-walk-'));
try{
  mkdirSync(join(dirtyTmp,'sub'));writeFileSync(join(dirtyTmp,'sub','X.astro'),'<style>.x{color:#2563eb;font-family:Georgia,serif}</style>');
  const w=(d,o=[])=>{for(const f of readdirSync(d)){const r=join(d,f);statSync(r).isDirectory()?w(r,o):o.push(r)}return o};
  const found=w(dirtyTmp).map(f=>scanFile(f,readFileSync(f,'utf8')));
  assert.ok(found.length===1&&found[0].colorInUse===1&&found[0].font===1,'目錄走訪／掃描漏抓了子目錄內的髒檔');
}finally{rmSync(dirtyTmp,{recursive:true,force:true});}

for(const slug of PROTOTYPE){
  const f=`src/data/layout-assembly/${slug}/Home.astro`;
  assert.deepEqual(scanFile(f,read(f)),zero,`${slug} Home.astro 仍有寫死設計值`);
  const rules=(file,key)=>read(file).split('\n').filter(l=>l.includes(key)).join('\n');
  const chrome=rules('src/data/layout-assembly/DesignChrome.css',`data-site-family="${slug}"`);
  assert.ok(chrome.length>0,`${slug} 在 DesignChrome.css 找不到家族規則`);
  assert.deepEqual(total(scanCss(chrome)),zero,`${slug} 的 DesignChrome.css 家族規則仍有寫死設計值`);
  const interior=rules('src/data/layout-assembly/DesignInterior.astro',`data-design-family="${slug}"`);
  assert.deepEqual(total(scanCss(interior)),zero,`${slug} 的 DesignInterior.astro 家族規則仍有寫死設計值`);
  // 不得再以字面色覆蓋 --chrome-*／--fp-*（掃描器已涵蓋；這條是第二道，防掃描器日後被改弱）
  for(const [file,key] of [['src/data/layout-assembly/DesignChrome.css',`data-site-family="${slug}"`],['src/data/layout-assembly/DesignInterior.astro',`data-design-family="${slug}"`]])
    assert.ok(!new RegExp(key.replace(/[-/]/g,'\\$&')+'\\]\\{[^}]*#[0-9a-fA-F]{3,8}').test(read(file)),`${file} ${slug} 家族規則仍以字面色覆蓋`);
}
const colourOnly=(slug,dir)=>{const r=scanDir(dir);assert.deepEqual([r.colorInUse,r.colorInLocalToken,r.colorFallback,r.radius,r.shadow],[0,0,0,0,0],`${slug} 出現寫死色／圓角／陰影（${dir}）`);};
for(const [slug,dir] of Object.entries(SHELL_BASED))colourOnly(slug,dir);
for(const slug of NATIVE_COLOUR_ONLY)colourOnly(slug,`src/data/layout-assembly/expanded/${slug}`);

// 匯出後的試點站：版型之外、在試點站會啟用的共用檔也不得寫死主題色（頁尾樣板、導覽、跳到主要內容）
const tmp=mkdtempSync(join(tmpdir(),'pilot-tokens-'));
try{
  const SHELL=Object.keys(SHELL_BASED);
  const mkPlan=(kind,slug)=>({version:1,kind,layoutSlug:slug,visualTheme:'paper',
    brand:{name:'測試站',primaryColor:'#245E50',tagline:'測試',palette:{primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'}},
    navigation:(kind==='knowledge'?[{id:'articles',label:'文章'},{id:'about',label:'關於我'}]:[{id:'services',label:'服務'},{id:'about',label:'關於我'}]).map(x=>({...x,enabled:true})),
    primaryCta:kind==='knowledge'?{label:'閱讀',pageId:'articles'}:{label:'服務',pageId:'services'},content:{headline:'主標題',intro:'介紹'},
    about:{bio:'介紹',purpose:'a',approach:'b',background:'c'},notes:'',
    sectionPatterns:SHELL.includes(slug)?[]:[...(kind==='knowledge'?[{patternId:'featured-work',targetPage:'/',insertAfter:'首頁介紹後'}]:[{patternId:'trust-service-path',targetPage:'services',insertAfter:'服務介紹後'}]),{patternId:'footer-professional',targetPage:'site-wide',insertAfter:'所有頁面底部'}],
    ...(kind==='helper'?{serviceFacts:{scope:'協助',exclusions:'不提供醫療診斷',method:'先討論',firstVisit:'先閱讀',duration:'依方案',price:'待站長確認',cancellation:'依政策',qualification:'尚未提供',contact:'正式聯絡頁'}}:{})});
  for(const [slug,kind] of [['reading-atlas','knowledge'],['clinician','helper'],['field-notes','knowledge'],['essayist','knowledge'],['companion','helper'],['somatic','helper'],['subject-atlas','knowledge'],['practice-compass','helper'],['portrait-profile','helper'],['editorial-frontpage','knowledge']]){
    const plan=join(tmp,slug+'.json'),site=join(tmp,slug);
    writeFileSync(plan,JSON.stringify(mkPlan(kind,slug)));
    execFileSync(process.execPath,[new URL('./export-starter.mjs',import.meta.url).pathname,plan,site,'--defer-student-context'],{stdio:'pipe'});
    for(const f of ['src/components/SelectedPatterns.astro','src/components/StudentNavigation.astro','src/components/layouts/selected/ServiceSections.astro','src/components/layouts/selected/AboutSections.astro','src/components/layouts/selected/ArticleArchive.astro','src/components/layouts/selected/ArticleDetail.astro','src/layouts/SiteLayout.astro']){
      if(!existsSync(join(site,f)))continue;
      const r=scanFile(f,readFileSync(join(site,f),'utf8'));
      assert.deepEqual([r.colorInUse,r.colorInLocalToken,r.colorFallback],[0,0,0],`${slug} 匯出的 ${f} 仍有寫死色`);
    }
    // 宿主契約：共用元件的 --student-* 變數由這份檔宣告，SiteLayout 必須連結它（殼版型與 prototype 版型都一樣）
    assert.ok(existsSync(join(site,'public/component-contract.css'))&&readFileSync(join(site,'src/layouts/SiteLayout.astro'),'utf8').includes("href={base+'component-contract.css'}"),`${slug} 匯出站缺宿主契約 component-contract.css 或沒連結`);
    // 新匯出站的 G-11 在 release 不得一開始就因「超出基準」而失敗（殼版型曾因基準寫在被換掉的 surrogate 上而全部誤報）
    const g11=gateDesign({root:site,mode:'release',config:{},gc:loadGateConfig(site)});
    assert.ok(g11.status!=='FAIL'&&!g11.evidence.some(e=>/above baseline/.test(e)),`${slug} 新匯出站的 G-11 一開始就超出基準：${g11.evidence.slice(0,3).join(' | ')}`);
    for(const f of ['public/site.css','public/design-family.css']){
      const skip=readFileSync(join(site,f),'utf8').split(/(?<=\})/).filter(x=>x.includes('.skip:focus')).join('');
      assert.deepEqual(total(scanCss(skip)),zero,`${slug} 匯出的 ${f} 的 .skip:focus 仍有寫死設計值`);
    }
  }
}finally{rmSync(tmp,{recursive:true,force:true});}
console.log('token consumption guard: PASS（試點 2 款＋批 1 共 8 款：0 處寫死色／圓角／陰影（prototype 6 款含字族）；另 13 款殼變數版型色彩／圓角／陰影為 0；誤判與漏抓 fixture 通過）');
