import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {mkdirSync,writeFileSync} from 'node:fs';
const port=4347,base='http://127.0.0.1:'+port;
const groups={heroes:['H',12],sections:['S',8],lists:['L',6],rhythm:['R',6],'cta-trust':['C',8]};
const viewports=[1440,1280,768,390],entries=[],errors=[];
mkdirSync('qa-artifacts/quality',{recursive:true});
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});let browser;
try{
 let ready=false;for(let i=0;i<50;i++){try{if((await fetch(base+'/layouts/recipes/')).ok){ready=true;break}}catch{}await delay(300)}
 if(!ready)throw Error('Recipes preview did not start');
 browser=await chromium.launch({headless:true});
 for(const [group,[prefix,count]]of Object.entries(groups)){
  for(const width of viewports){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const jsErrors=[];page.on('pageerror',err=>jsErrors.push(err.message));
   const result=await page.goto(base+'/layouts/recipes/'+group+'/',{waitUntil:'domcontentloaded',timeout:20000});
   await page.waitForTimeout(140);
   const checked=await page.evaluate(({prefix,count})=>{
    const ids=Array.from({length:count},(_,i)=>prefix+String(i+1).padStart(2,'0'));
    return {
     scrollWidth:document.documentElement.scrollWidth,
     viewport:innerWidth,
     overflow:document.documentElement.scrollWidth>innerWidth+2,
     recipes:ids.map(id=>{const el=document.getElementById(id);if(!el)return{id,present:false};const box=el.getBoundingClientRect();return{id,present:true,hasContent:!!el.textContent?.trim(),width:Math.round(box.width),height:Math.round(box.height),display:getComputedStyle(el).display}}),
     reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches
    };
   },{prefix,count});
   const entry={group,width,http:result?.status(),...checked,jsErrors};
   entries.push(entry);
   if(entry.http!==200||entry.overflow||jsErrors.length||!checked.reducedMotion)errors.push(group+'/'+width+': HTTP, overflow, JS or reduced-motion error');
   for(const r of checked.recipes)if(!r.present||!r.hasContent||r.height<8||r.display==='none')errors.push(group+'/'+r.id+'/'+width+': recipe absent or invisible');
   await page.close();
  }
 }
 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',registeredRecipes:40,viewportChecks:entries.length,individualRecipeChecks:entries.reduce((n,x)=>n+x.recipes.length,0),errors,entries,scope:'40 distinct live Editorial Recipe components at 1440/1280/768/390. Behavior beyond rendered visibility, keyboard sequences, human visual judgment remain NOT TESTED'};
 writeFileSync('qa-artifacts/quality/editorial-recipes-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('Editorial recipes browser: '+report.status+'; '+report.individualRecipeChecks+' individual render checks; '+errors.length+' errors');
 errors.forEach(e=>console.error('FAIL '+e));if(errors.length)process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM')}
