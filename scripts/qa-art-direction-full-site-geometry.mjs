import {chromium} from 'playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
const groups={
 'subject-atlas':['','articles/','articles/sample/','about/','topics/method/'],
 'practice-compass':['','services/','about/','faq/','contact/','privacy/']
};
const out='qa-artifacts/art-direction/full-site-consistency';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const rows=[];
try{
 for(const [slug,routes] of Object.entries(groups))for(const width of [390,768,1280,1440])for(const route of routes){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const record={slug,route:route||'home',width,issues:[]};
  try{
   const response=await page.goto(new URL('layouts/'+slug+'/'+route,process.env.QA_BASE_URL||'http://127.0.0.1:4321/').toString(),{waitUntil:'domcontentloaded'});
   if(!response?.ok())throw Error('HTTP '+response?.status());
   const m=await page.evaluate(()=>{
    const header=document.querySelector('header.prototype-nav');
    const main=document.querySelector('main');
    if(!header||!main)return null;
    const r=header.getBoundingClientRect();
    return {headerLeft:Math.round(r.left),headerWidth:Math.round(r.width),headerHeight:Math.round(r.height),headerTop:Math.round(r.top),viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth};
   });
   if(!m)throw Error('Missing prototype navigation');
   Object.assign(record,m);
   if(m.scroll>m.viewport+2)record.issues.push('horizontal-overflow');
   await page.screenshot({path:out+'/'+slug+'-'+(route||'home').replaceAll('/','_')+'-'+width+'.png',fullPage:true});
  }catch(e){record.issues.push(String(e))}
  finally{await page.close()}
  rows.push(record);
 }
}finally{await browser.close()}
for(const slug of Object.keys(groups))for(const width of [390,768,1280,1440]){
 const group=rows.filter(r=>r.slug===slug&&r.width===width&&!r.issues.length);
 if(group.length!==groups[slug].length)continue;
 const expected=group[0];
 for(const entry of group.slice(1)){
  if(Math.abs(entry.headerLeft-expected.headerLeft)>2)entry.issues.push('header-left-mismatch '+expected.headerLeft);
  if(Math.abs(entry.headerWidth-expected.headerWidth)>2)entry.issues.push('header-width-mismatch '+expected.headerWidth);
  if(Math.abs(entry.headerHeight-expected.headerHeight)>2)entry.issues.push('header-height-mismatch '+expected.headerHeight);
 }
}
const failing=rows.filter(r=>r.issues.length);
writeFileSync(out+'/manifest.json',JSON.stringify({count:rows.length,failures:failing,records:rows},null,2)+'\n');
console.log('FULL-SITE GEOMETRY',rows.length,'tested;',failing.length,'failures');
for(const x of failing)console.log('FAIL',JSON.stringify(x));
if(failing.length)process.exitCode=1;
