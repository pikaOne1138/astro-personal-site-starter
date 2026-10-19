import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as pause} from 'node:timers/promises';
import {mkdirSync,writeFileSync} from 'node:fs';
const port=4388,base='http://127.0.0.1:'+port;
const cases=[
 {component:'WorkshopNav',route:'/guide/',selector:'header.workshop-nav',count:1,extra:'header.workshop-nav nav a',extraCount:3},
 {component:'DesignLibraryNav',route:'/blocks/',selector:'nav.design-library-nav',count:1,extra:'nav.design-library-nav a[aria-current="page"]',extraCount:1},
 {component:'SiteNav',route:'/knowledge/paper/',selector:'header.v02-nav',count:1,extra:'nav.v02-links a[href]',extraMin:2},
 {component:'ArticleArchive',route:'/knowledge/paper/articles/',selector:'.article-archive[data-article-archive]',count:1,extra:'.article-archive [data-result-counter]',extraCount:1},
 {component:'DemoPage',route:'/helper/paper/',selector:'.page-shell main .hero',count:1,extra:'.page-shell main h1',extraMin:1},
 {component:'MultiPage',route:'/helper/paper/services/',selector:'main.v02-page',count:1,extra:'main.v02-page h1',extraCount:1}
],widths=[1440,1280,768,390],rows=[],errors=[];
mkdirSync('qa-artifacts/quality',{recursive:true});
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});let browser;
try{
 let up=false;for(let i=0;i<60;i++){try{if((await fetch(base+'/')).ok){up=true;break}}catch{}await pause(300)}
 if(!up)throw Error('Shared component preview unavailable');
 browser=await chromium.launch({headless:true});
 for(const testcase of cases){
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const exceptions=[];page.on('pageerror',x=>exceptions.push(x.message));
   const response=await page.goto(base+testcase.route,{waitUntil:'domcontentloaded',timeout:20000});
   const values=await page.evaluate(arg=>{
    const nodes=[...document.querySelectorAll(arg.selector)];
    const extra=document.querySelectorAll(arg.extra).length;
    return {main:nodes.length,extra,readable:nodes.every(el=>el.getBoundingClientRect().height>8&&el.textContent?.trim()),overflow:document.documentElement.scrollWidth>innerWidth+2,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth};
   },testcase);
   const okay=response?.status()===200&&values.main===testcase.count&&values.readable&&!values.overflow&&!exceptions.length&&(testcase.extraCount===undefined?values.extra>=testcase.extraMin:values.extra===testcase.extraCount);
   rows.push({component:testcase.component,route:testcase.route,width,http:response?.status(),...values,exceptions,pass:okay});
   if(!okay)errors.push(testcase.component+'/'+width+': '+JSON.stringify(rows.at(-1)));
   await page.close();
  }
 }

 const noJSRows=[];
 for(const testcase of cases){
  const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:'reduce'});
  try{
   const response=await page.goto(base+testcase.route,{waitUntil:'domcontentloaded',timeout:20000});
   const elements=await page.evaluate(arg=>[...document.querySelectorAll(arg.selector)].map(el=>{const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return {visible:r.height>8&&cs.display!=='none'&&cs.visibility!=='hidden'&&Number(cs.opacity)>0&&Boolean(el.textContent?.trim())}}),testcase);
   const pass=response?.status()===200&&elements.length===testcase.count&&elements.every(x=>x.visible);
   noJSRows.push({component:testcase.component,width:390,http:response?.status(),elements,pass});
   if(!pass)errors.push(testcase.component+'/no-JS 390: hidden or missing content');
  }finally{await page.close()}
 }

 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',components:cases.length,noJSRows,noJSCount:noJSRows.length,measurements:rows.length,rows,errors,scope:'Six shared Astro components each exercised by a real rendered route in four responsive widths; this checks their demonstration, basic structural contracts, JS exceptions and page overflow, not every Props variant.'};
 writeFileSync('qa-artifacts/quality/shared-components-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('Shared Astro components browser '+report.status+': '+rows.length+' cases / '+errors.length+' errors');
 errors.forEach(e=>console.error('FAIL '+e));if(errors.length)process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM')}
