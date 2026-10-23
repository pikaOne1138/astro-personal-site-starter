import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const registry=JSON.parse(readFileSync('src/data/section-patterns.registry.json','utf8'));
const port=4369,base='http://127.0.0.1:'+port,ids=registry.map(x=>x.id),widths=[1440,1280,768,390],rows=[],errors=[];
mkdirSync('qa-artifacts/quality',{recursive:true});
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port',String(port),'--strictPort','--ignore-lock'],{stdio:'ignore'});let browser;
try{
 let ready=false;for(let i=0;i<50;i++){try{if((await fetch(base+'/section-patterns/')).ok){ready=true;break}}catch{}await delay(300)}
 if(!ready)throw Error('Pattern preview failed to start');
 browser=await chromium.launch({headless:true});
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const jsErrors=[];page.on('pageerror',err=>jsErrors.push(err.message));
  const response=await page.goto(base+'/section-patterns/',{waitUntil:'domcontentloaded'});
  const state=await page.evaluate(ids=>({
   viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
   overflow:document.documentElement.scrollWidth>innerWidth+2,
   patterns:ids.map(id=>{const el=document.getElementById(id),r=el?.getBoundingClientRect();return{id,present:!!el,visible:!!r&&r.height>10&&getComputedStyle(el).display!=='none',hasContent:!!el?.textContent?.trim()}}),
   previewSamples:document.querySelectorAll('.sp-preview').length
  }),ids);
  rows.push({width,status:response?.status(),...state,jsErrors});
  if(response?.status()!==200||state.overflow||jsErrors.length)errors.push('Pattern gallery '+width+': HTTP/overflow/JS error');
  for(const v of state.patterns)if(!v.present||!v.visible||!v.hasContent)errors.push('Pattern '+v.id+'/'+width+': missing live render');
  await page.close();
 }

 const noJSPage=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:'reduce'});
 let noJS;
 try{
  const response=await noJSPage.goto(base+'/section-patterns/',{waitUntil:'domcontentloaded'});
  const samples=await noJSPage.evaluate(ids=>ids.map(id=>{const el=document.getElementById(id);if(!el)return{id,visible:false};const rect=el.getBoundingClientRect();const style=getComputedStyle(el);return{id,visible:rect.height>10&&style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)>0&&Boolean(el.textContent?.trim())}}),ids);
  noJS={width:390,http:response?.status(),samples,passed:response?.status()===200&&samples.length===ids.length&&samples.every(x=>x.visible)};
  if(!noJS.passed)errors.push('Section pattern no-JS visibility: missing content');
 }finally{await noJSPage.close()}

 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',registryCount:ids.length,componentCount:3,noJS,checks:rows.length*ids.length,rows,errors,scope:'All five pattern directions from three composed Astro components render at 1440/1280/768/390; interaction specifics and human design quality require separate acceptance'};
 writeFileSync('qa-artifacts/quality/section-patterns-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('Section patterns browser: '+report.status+'; '+report.checks+' samples; '+errors.length+' errors');
 errors.forEach(x=>console.error('FAIL '+x));if(errors.length)process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM')}
