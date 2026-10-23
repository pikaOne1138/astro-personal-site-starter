import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
import {mkdirSync,writeFileSync} from 'node:fs';
const port=4347,base='http://127.0.0.1:'+port;
const groups={heroes:['H',12],sections:['S',8],lists:['L',6],rhythm:['R',6],'cta-trust':['C',8]};
const viewports=[1440,1280,768,390],entries=[],errors=[],h01Checks=[];
mkdirSync('qa-artifacts/quality',{recursive:true});
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port',String(port),'--strictPort','--ignore-lock'],{stdio:'ignore'});let browser;
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
     recipes:ids.map(id=>{const el=document.getElementById(id)||document.querySelector('.'+id.toLowerCase());if(!el)return{id,present:false};const box=el.getBoundingClientRect();return{id,present:true,hasContent:!!el.textContent?.trim(),width:Math.round(box.width),height:Math.round(box.height),display:getComputedStyle(el).display}}),
     reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches
    };
   },{prefix,count});

   if(group==='heroes'){
    const rail=page.locator('#H01 .rail .rail-item');
    const validLinks=(await rail.count())===2
      &&(await page.locator('#H01 a.rail-item[href="#H02"]').count())===1
      &&(await page.locator('#H01 span.rail-item').count())===1
      &&(await page.locator('#H01 a[href="#"]').count())===0;
    const caption=await page.locator('#H01 figcaption').innerText();
    h01Checks.push({width,links:await page.locator('#H01 a.rail-item[href="#H02"]').count(),inert:await page.locator('#H01 span.rail-item').count(),noFakeHref:await page.locator('#H01 a[href="#"]').count()===0,customCaption:caption.includes('版型示範圖'),passed:validLinks&&caption.includes('版型示範圖')});
    if(!validLinks||!caption.includes('版型示範圖'))errors.push('N18 H01 '+width+': fictitious link exposed or adjustable caption missing');
   }
   const entry={group,width,http:result?.status(),...checked,jsErrors};
   entries.push(entry);
   if(entry.http!==200||entry.overflow||jsErrors.length||!checked.reducedMotion)errors.push(group+'/'+width+': HTTP, overflow, JS or reduced-motion error');
   for(const r of checked.recipes)if(!r.present||!r.hasContent||r.height<8||r.display==='none')errors.push(group+'/'+r.id+'/'+width+': recipe absent or invisible');
   await page.close();
  }
 }

 // True JavaScript-disabled browser, not merely prefers-reduced-motion.
 const noJSChecks=[];
 for(const [group,[prefix,count]] of Object.entries(groups)){
  const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:'reduce'});
  try{
   const response=await page.goto(base+'/layouts/recipes/'+group+'/',{waitUntil:'domcontentloaded',timeout:20000});
   const result=await page.evaluate(({prefix,count})=>{
    const ids=Array.from({length:count},(_,i)=>prefix+String(i+1).padStart(2,'0'));
    return {recipes:ids.map(id=>{const el=document.getElementById(id)||document.querySelector('.'+id.toLowerCase());if(!el)return{id,visible:false};const rect=el.getBoundingClientRect();const style=getComputedStyle(el);return{id,visible:rect.height>=8&&style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)>0&&Boolean(el.textContent?.trim())}}),overflow:document.documentElement.scrollWidth>innerWidth+2};
   },{prefix,count});
   const passed=response?.status()===200&&!result.overflow&&result.recipes.length===count&&result.recipes.every(x=>x.visible);
   noJSChecks.push({group,width:390,componentCount:count,http:response?.status(),...result,passed});
   if(!passed)errors.push('Editorial Recipe no-JS '+group+': failed visible static content contract');
  }finally{await page.close()}
 }

 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',registeredRecipes:40,noJSChecks,individualNoJSChecks:noJSChecks.reduce((n,x)=>n+x.recipes.length,0),viewportChecks:entries.length,individualRecipeChecks:entries.reduce((n,x)=>n+x.recipes.length,0),h01Checks,errors,entries,scope:'40 distinct live Editorial Recipe components at 1440/1280/768/390. Behavior beyond rendered visibility, keyboard sequences, human visual judgment remain NOT TESTED'};
 writeFileSync('qa-artifacts/quality/editorial-recipes-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('Editorial recipes browser: '+report.status+'; '+report.individualRecipeChecks+' individual render checks; '+errors.length+' errors');
 errors.forEach(e=>console.error('FAIL '+e));if(errors.length)process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM')}
