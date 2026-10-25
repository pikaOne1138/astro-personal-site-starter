#!/usr/bin/env node
// D-T3 試點守門：reading-atlas、clinician 的版型檔與其在共用檔中的家族規則，
// 不得出現主題字面值（色碼、rgb()/hsl()、white/black、寫死的字族／圓角／陰影）。
// 掃描用 audit-design-values.mjs 的 scanCss()，與之後 G-11 共用同一個掃描器。
// 這不是發布關卡：它只防止試點被新寫死值蛀空；其餘版型尚未轉換，不在此列。
import {readFileSync,mkdtempSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {scanCss,extractCss} from './audit-design-values.mjs';

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
`;
assert.deepEqual(total(scanCss(clean)),zero,'誤判：正常的 Token 用法被標記');

// 必須抓到的寫死值（驗收 4 的 fixture：故意寫入 #2563eb）
const dirty=scanCss('.x{background:#2563eb;color:white;border:1px solid rgb(10,20,30);font-family:Georgia,serif;border-radius:12px;box-shadow:0 1px 2px #0003}');
const t=total(dirty);
assert.ok(t.colorInUse>=4&&t.font===1&&t.radius===1&&t.shadow===1,'漏抓：'+JSON.stringify(t));
assert.deepEqual(dirty.colorLiteralInUse.flatMap(x=>x.colors||[]),['#2563eb','#0003'],'應標出 #2563eb');

// 試點守門
const pilots=['reading-atlas','clinician'];
for(const slug of pilots){
  const f=`src/data/layout-assembly/${slug}/Home.astro`;
  assert.deepEqual(scanFile(f,read(f)),zero,`${slug} Home.astro 仍有寫死設計值`);
  const rules=(file,key)=>read(file).split('\n').filter(l=>l.includes(key)).join('\n');
  const chrome=rules('src/data/layout-assembly/DesignChrome.css',`data-site-family="${slug}"`);
  assert.ok(chrome.length>0,`${slug} 在 DesignChrome.css 找不到家族規則`);
  assert.deepEqual(total(scanCss(chrome)),zero,`${slug} 的 DesignChrome.css 家族規則仍有寫死設計值`);
  const interior=rules('src/data/layout-assembly/DesignInterior.astro',`data-design-family="${slug}"`);
  assert.deepEqual(total(scanCss(interior)),zero,`${slug} 的 DesignInterior.astro 家族規則仍有寫死設計值`);
}
// 試點在家族規則中不得再用字面色覆蓋 --chrome-*／--fp-*
for(const [file,pat] of [['src/data/layout-assembly/DesignChrome.css',/data-site-family="(?:reading-atlas|clinician)"\]\{[^}]*#[0-9a-fA-F]{3,8}/],['src/data/layout-assembly/DesignInterior.astro',/data-design-family="(?:reading-atlas|clinician)"\]\{[^}]*#[0-9a-fA-F]{3,8}/]])
  assert.ok(!pat.test(read(file)),`${file} 試點家族規則仍以字面色覆蓋`);

// 匯出後的試點站：版型之外、在試點站會啟用的共用檔也不得寫死主題色（頁尾樣板、導覽、跳到主要內容）
const tmp=mkdtempSync(join(tmpdir(),'pilot-tokens-'));
try{
  const mkPlan=(kind,slug)=>({version:1,kind,layoutSlug:slug,visualTheme:'paper',
    brand:{name:'測試站',primaryColor:'#245E50',tagline:'測試',palette:{primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'}},
    navigation:(kind==='knowledge'?[{id:'articles',label:'文章'},{id:'about',label:'關於我'}]:[{id:'services',label:'服務'},{id:'about',label:'關於我'}]).map(x=>({...x,enabled:true})),
    primaryCta:kind==='knowledge'?{label:'閱讀',pageId:'articles'}:{label:'服務',pageId:'services'},content:{headline:'主標題',intro:'介紹'},
    about:{bio:'介紹',purpose:'a',approach:'b',background:'c'},notes:'',
    sectionPatterns:[...(kind==='knowledge'?[{patternId:'featured-work',targetPage:'/',insertAfter:'首頁介紹後'}]:[{patternId:'trust-service-path',targetPage:'services',insertAfter:'服務介紹後'}]),{patternId:'footer-professional',targetPage:'site-wide',insertAfter:'所有頁面底部'}],
    ...(kind==='helper'?{serviceFacts:{scope:'協助',exclusions:'不提供醫療診斷',method:'先討論',firstVisit:'先閱讀',duration:'依方案',price:'待站長確認',cancellation:'依政策',qualification:'尚未提供',contact:'正式聯絡頁'}}:{})});
  for(const [slug,kind] of [['reading-atlas','knowledge'],['clinician','helper']]){
    const plan=join(tmp,slug+'.json'),site=join(tmp,slug);
    writeFileSync(plan,JSON.stringify(mkPlan(kind,slug)));
    execFileSync(process.execPath,[new URL('./export-starter.mjs',import.meta.url).pathname,plan,site,'--defer-student-context'],{stdio:'pipe'});
    for(const f of ['src/components/SelectedPatterns.astro','src/components/StudentNavigation.astro','src/components/layouts/selected/ServiceSections.astro','src/components/layouts/selected/AboutSections.astro','src/components/layouts/selected/ArticleArchive.astro','src/components/layouts/selected/ArticleDetail.astro','src/layouts/SiteLayout.astro']){
      if(!existsSync(join(site,f)))continue;
      const r=scanFile(f,readFileSync(join(site,f),'utf8'));
      assert.deepEqual([r.colorInUse,r.colorInLocalToken,r.colorFallback],[0,0,0],`${slug} 匯出的 ${f} 仍有寫死色`);
    }
    for(const f of ['public/site.css','public/design-family.css']){
      const skip=readFileSync(join(site,f),'utf8').split(/(?<=\})/).filter(x=>x.includes('.skip:focus')).join('');
      assert.deepEqual(total(scanCss(skip)),zero,`${slug} 匯出的 ${f} 的 .skip:focus 仍有寫死設計值`);
    }
  }
}finally{rmSync(tmp,{recursive:true,force:true});}
console.log('pilot token consumption: PASS（reading-atlas、clinician：0 處寫死色／字族／圓角／陰影；誤判 fixture 與漏抓 fixture 通過）');
