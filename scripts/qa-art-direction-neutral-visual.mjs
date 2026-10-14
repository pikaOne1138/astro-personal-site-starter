import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {chromium} from 'playwright';
const base=process.env.QA_BASE_URL??'http://127.0.0.1:4321';
const fixture=JSON.parse(readFileSync('docs/art-direction/neutral-comparison-fixture.json','utf8'));
const knowledge=['field-notes','essayist','learning-lab','curator','radio-letter','reading-atlas','subject-atlas','sidebar-journal','editorial-frontpage','card-journal','visual-stories','compact-dispatch','split-reader'];
const helper=['clinician','companion','somatic','coach','collective','trust-path','practice-compass','portrait-profile','service-catalogue','studio-chapters','editorial-practice','question-led-practice'];
const viewports=[{name:'1440',width:1440,height:900},{name:'1280',width:1280,height:800},{name:'768',width:768,height:980},{name:'390',width:390,height:844}];
const out='qa-artifacts/art-direction/neutral-visual';
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const reports=[];
try{
for(const [kind,slugs] of [['knowledge',knowledge],['helper',helper]]){
 const data=fixture[kind];
 for(const slug of slugs){
  for(const v of viewports){
   const page=await browser.newPage({viewport:{width:v.width,height:v.height},deviceScaleFactor:1,reducedMotion:'reduce'});
   let error=null;
   try{
    const url=new URL('layouts/'+slug+'/',base.endsWith('/')?base:base+'/');
    const response=await page.goto(url.toString(),{waitUntil:'domcontentloaded',timeout:20000});
    if(!response||!response.ok())throw Error('HTTP '+(response?.status()??'missing'));
    await page.evaluate(({data,kind})=>{
      // DOM-level neutralization: a consistent visual stress test, not actual Site Brief binding.
      const main=document.body;
      if(!main)throw Error('Missing main');
      const titles=[data.headline,...(kind==='knowledge'?data.articles.map(a=>a.title):data.services.map(s=>s.title))];
      const paragraphs=[data.intro,...(kind==='knowledge'?data.articles.map(a=>a.description):data.services.map(s=>s.description))];
      const heading=main.querySelector('h1');if(heading)heading.textContent=titles[0];
      const candidates=[...main.querySelectorAll('h2,h3')].filter(n=>n.getBoundingClientRect().width>0);
      candidates.forEach((el,i)=>{if(i<titles.length-1)el.textContent=titles[i+1]});
      const ps=[...main.querySelectorAll('p')].filter(p=>p.getBoundingClientRect().width>0&&!p.closest('nav,footer'));
      ps.slice(0,paragraphs.length).forEach((el,i)=>el.textContent=paragraphs[i]);
      const style=document.createElement('style');style.textContent=`
        *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;text-shadow:none!important}
        body,main,section,article,aside,header,footer,nav,div{--brand:#355747!important;--accent:#355747!important;--bg:#f4f1e8!important;--ink:#242a24!important}
        body,main{background:#f4f1e8!important;color:#242a24!important}\n        body *,body *::before,body *::after{background-color:transparent!important;background-image:none!important;box-shadow:none!important;color:#242a24!important;border-color:#b5bdb1!important;font-family:Georgia,'Noto Sans TC',serif!important}\n        body :is(section,article,aside){background-color:transparent!important}\n        body :is(a,button){color:#355747!important}\n        body :is(.picture,.photo,.image-fallback,.image-space,.stage-art,.stage-art-title){background-color:#e7ece5!important}
        body :is(h1,h2,h3,h4,p,li,span,a,button,dt,dd){font-family:Georgia,'Noto Sans TC',serif!important}
        body :is(img,video,iframe){visibility:hidden!important}
      `;document.head.append(style);
    },{data,kind});
    await page.screenshot({path:join(out,kind+'-'+slug+'-'+v.name+'.png'),fullPage:true,animations:'disabled'});
    const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,h1Count:document.querySelectorAll('main h1').length,mainWidth:Math.round(document.querySelector('main').getBoundingClientRect().width),sections:[...document.querySelectorAll('body section, body article')].slice(0,16).map(el=>{const r=el.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y+scrollY),width:Math.round(r.width),height:Math.round(r.height)}})}));
    reports.push({kind,slug,viewport:v.name,status:'captured',...metrics,horizontalOverflow:metrics.scrollWidth>metrics.clientWidth+2});
   }catch(e){error=String(e);reports.push({kind,slug,viewport:v.name,status:'failed',error});}
   finally{await page.close();}
  }
 }
}
}finally{await browser.close();}
const summary={schemaVersion:1,method:'post-render same-audience text/style normalization (not renderer fixture injection, not visual human approval)',sourceFixture:'docs/art-direction/neutral-comparison-fixture.json',viewportCount:viewports.length,directions:25,captures:reports.filter(r=>r.status==='captured').length,failures:reports.filter(r=>r.status==='failed'||r.horizontalOverflow),records:reports};
const byKey=new Map(reports.filter(r=>r.status==='captured').map(r=>[r.slug+'@'+r.viewport,r]));
const collisionPairs=[['sidebar-journal','field-notes'],['clinician','trust-path'],['clinician','practice-compass'],['subject-atlas','curator'],['portrait-profile','companion'],['question-led-practice','trust-path']];
summary.collisionGeometry=collisionPairs.flatMap(([a,b])=>viewports.map(v=>{const x=byKey.get(a+'@'+v.name),y=byKey.get(b+'@'+v.name);if(!x||!y)return {a,b,viewport:v.name,available:false};const size=Math.max(1,Math.min(x.sections.length,y.sections.length,6));let distance=0;for(let i=0;i<size;i++){const q=x.sections[i],z=y.sections[i];distance+=Math.abs(q.x-z.x)/v.width+Math.abs(q.width-z.width)/v.width+Math.abs(q.y-z.y)/Math.max(v.height,1)}return {a,b,viewport:v.name,available:true,firstSectionsCompared:size,averageGeometryDifference:Number((distance/size).toFixed(3))}}));
writeFileSync(join(out,'manifest.json'),JSON.stringify(summary,null,2)+'\n');
console.log('Neutral screenshot evidence',summary.captures+'/100','issues:',summary.failures.length);
if(summary.failures.length)process.exitCode=1;
