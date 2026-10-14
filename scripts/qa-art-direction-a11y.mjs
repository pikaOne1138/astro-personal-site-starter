import {chromium} from 'playwright';
import axe from 'axe-core';
import {mkdirSync,writeFileSync} from 'node:fs';
const slugs={ 'sidebar-journal':['articles','articles/first-note','about'],'editorial-frontpage':['articles','articles/lead-story','about'],'card-journal':['articles','articles/sample','about'],'visual-stories':['articles','articles/sample','about'],'compact-dispatch':['articles','articles/sample','about'],'split-reader':['articles','articles/sample','about'],'portrait-profile':['services','services/individual','about'],'service-catalogue':['services','services/individual','about'],'studio-chapters':['services','services/individual','about'],'editorial-practice':['services','services/individual','about'],'question-led-practice':['services','services/individual','about']};
const origin=process.env.QA_BASE_URL||'http://127.0.0.1:4321/';
const target='qa-artifacts/art-direction/accessibility';mkdirSync(target,{recursive:true});
const browser=await chromium.launch({headless:true}),records=[];
try{
 for(const [slug,routes] of Object.entries(slugs))for(const route of routes)for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
 try {
   const href=new URL('layouts/'+slug+'/'+route+'/',origin).toString();
   await page.goto(href,{waitUntil:'domcontentloaded'});
   await page.addScriptTag({content:axe.source});
   const result=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']},rules:{'region':{enabled:false}}}));
   const violations=result.violations.map(v=>({id:v.id,impact:v.impact,description:v.help,nodes:v.nodes.slice(0,5).map(n=>({html:n.html.slice(0,150),failureSummary:n.failureSummary?.slice(0,240)}))}));
   records.push({slug,route,width,status:'checked',violations});
 } catch(e){records.push({slug,route,width,status:'failed',error:String(e)})}
 await page.close();
 }
}finally{await browser.close()}
const blocking=records.filter(r=>r.status==='failed'||r.violations?.some(v=>['critical','serious'].includes(v.impact)));
const violations=records.flatMap(r=>(r.violations??[]).map(v=>({slug:r.slug,route:r.route,width:r.width,id:v.id,impact:v.impact})));
writeFileSync(target+'/report.json',JSON.stringify({scans:records.length,blocking,violationCount:violations.length,violations,records},null,2)+'\n');
console.log('ACCESSIBILITY',records.length,'scans,',blocking.length,'blocking,',violations.length,'violation groups');
for(const x of blocking.slice(0,15))console.log('BLOCK',x.slug,x.route,x.width,JSON.stringify(x.violations?.filter(v=>['critical','serious'].includes(v.impact)).slice(0,4)));
if(blocking.length)process.exitCode=1;
