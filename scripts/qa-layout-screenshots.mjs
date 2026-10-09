import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';

const base='http://127.0.0.1:4328';
const routes=['field-notes','essayist','learning-lab','curator','radio-letter','reading-atlas','clinician','companion','somatic','coach','collective','trust-path'];
const widths=[1440,1280,768,390];
const dir='qa-artifacts/layouts';
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
   const resp=await page.goto(base+'/layouts/'+slug+'/',{waitUntil:'networkidle',timeout:30000});
   await page.screenshot({path:dir+'/'+slug+'-'+width+'.png',fullPage:true});
   const result=await page.evaluate(()=>({
     overflow:document.documentElement.scrollWidth>window.innerWidth+2,
     images:[...document.images].map(i=>({src:i.currentSrc||i.src,loaded:i.complete&&i.naturalWidth>0})).filter(i=>!i.loaded)
   }));
   rows.push({slug,width,status:resp?.status()??null,...result,consoleErrors,pageErrors});
   await page.close();
  }
 }
 const summary={total:rows.length,expected:routes.length*widths,failedHttp:rows.filter(x=>x.status!==200),overflow:rows.filter(x=>x.overflow),imageFailures:rows.filter(x=>x.images.length),runtimeErrors:rows.filter(x=>x.pageErrors.length)};
 writeFileSync(dir+'/results.json',JSON.stringify({summary,rows},null,2));
 console.log('Layout screenshot audit:',JSON.stringify(Object.fromEntries(Object.entries(summary).map(([k,v])=>[k,Array.isArray(v)?v.length:v]))));
 if(rows.length!==48||summary.failedHttp.length||summary.overflow.length||summary.runtimeErrors.length)process.exitCode=1;
 // Missing remote demo imagery is recorded as a warning until media rights and local fallbacks are addressed.
} finally {
 await browser?.close();
 server.kill('SIGTERM');
}
