import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';

const base='http://127.0.0.1:4328';
const routes=['field-notes','essayist','learning-lab','curator','radio-letter','reading-atlas','clinician','companion','somatic','coach','collective','trust-path'];
const widths=[1440,1280,768,390];
const dir=process.env.LAYOUT_QA_OUT||'qa-artifacts/layouts';
const publicMode=process.env.LAYOUT_QA_PUBLIC==='1';
mkdirSync(dir,{recursive:true});
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4328'],{stdio:'ignore'});
const rows=[];
let browser;
try {
 let ready=false;
 for(let i=0;i<40;i++){
  try {const r=await fetch(base+'/layouts/');if(r.ok){ready=true;break;}}catch{}
  await wait(500);
 }
 if(!ready)throw Error('Astro preview server did not start');
 browser=await chromium.launch({headless:true});
 for(const slug of routes){
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const consoleErrors=[],pageErrors=[];
   page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
   page.on('pageerror',e=>pageErrors.push(e.message));
   const resp=await page.goto(base+'/layouts/'+slug+'/',{waitUntil:'domcontentloaded',timeout:12000});
   // Wait briefly for remote demo images, without hanging indefinitely on broken hosts.
   await page.waitForFunction(() => [...document.images].every(img=>img.complete),null,{timeout:6500}).catch(()=>{});
   await page.waitForTimeout(200);
   await page.screenshot({path:dir+'/'+slug+'-'+width+(publicMode?'.jpg':'.png'),type:publicMode?'jpeg':'png',quality:publicMode?62:undefined,fullPage:true,timeout:12000,animations:'disabled'});
   const result=await page.evaluate(()=>({
     overflow:document.documentElement.scrollWidth>window.innerWidth+2,
     images:[...document.images].map(i=>({src:i.currentSrc||i.src,loaded:i.complete&&i.naturalWidth>0})).filter(i=>!i.loaded),
     fallbacks:[...document.images].filter(i=>i.dataset.demoFallback).map(i=>({source:i.dataset.originalSrc||'',placeholder:i.currentSrc||i.src}))
   }));
   rows.push({slug,width,status:resp?.status()??null,...result,consoleErrors,pageErrors});
   await page.close();
  }
 }
 const summary={total:rows.length,expected:routes.length*widths.length,failedHttp:rows.filter(x=>x.status!==200),overflow:rows.filter(x=>x.overflow),imageFailures:rows.filter(x=>x.images.length),runtimeErrors:rows.filter(x=>x.pageErrors.length),fallbacks:rows.filter(x=>x.fallbacks.length)};
 writeFileSync(dir+'/results.json',JSON.stringify({summary,rows},null,2));
 if(publicMode){
  const escape=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const cards=rows.map(r=>'<article><h2>'+escape(r.slug)+' / '+r.width+'px</h2><p>HTTP '+r.status+' · overflow '+r.overflow+' · missing images '+r.images.length+' · fallback '+r.fallbacks.length+' · runtime '+r.pageErrors.length+'</p><a href="'+escape(r.slug+'-'+r.width+'.jpg')+'"><img loading="lazy" src="'+escape(r.slug+'-'+r.width+'.jpg')+'" alt="'+escape(r.slug)+' viewport '+r.width+'"></a></article>').join('');
  const html='<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>PR Layout QA / 48 views</title><style>body{font:16px/1.6 system-ui;max-width:1280px;margin:24px auto;padding:16px;color:#242424}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:18px}article{border:1px solid #ddd;border-radius:10px;padding:12px}img{display:block;width:100%;height:auto;border:1px solid #ccc}h2{font-size:18px}p{font-size:14px}</style><h1>12 layouts × 4 viewport widths</h1><p>QA screenshots from Chromium. <a href="results.json">Raw results.json</a> · HTTP failures '+summary.failedHttp.length+' · overflow '+summary.overflow.length+' · image warning groups '+summary.imageFailures.length+' · placeholder groups '+summary.fallbacks.length+' · JS error groups '+summary.runtimeErrors.length+'</p><main>'+cards+'</main></html>';
  writeFileSync(dir+'/index.html',html);
 }

 console.log('Layout screenshot audit:',JSON.stringify(Object.fromEntries(Object.entries(summary).map(([k,v])=>[k,Array.isArray(v)?v.length:v]))));
 for(const row of summary.imageFailures)console.log('LAYOUT_IMAGE_FAILURE',JSON.stringify({slug:row.slug,width:row.width,images:row.images}));
 for(const row of summary.fallbacks)console.log('LAYOUT_FALLBACK',JSON.stringify({slug:row.slug,width:row.width,images:row.fallbacks}));
 if(rows.length!==48||summary.failedHttp.length||summary.overflow.length||summary.runtimeErrors.length)process.exitCode=1;
 // Missing remote demo imagery is recorded as a warning until media rights and local fallbacks are addressed.
} finally {
 await browser?.close();
 server.kill('SIGTERM');
}
