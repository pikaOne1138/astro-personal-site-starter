import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {chromium} from 'playwright';
const base=process.env.QA_BASE_URL??'http://127.0.0.1:4321/';
const scenario=process.env.QA_SCENARIO??'normal';
const layouts={
  'sidebar-journal':['articles','articles/first-note','about'],
  'editorial-frontpage':['articles','articles/lead-story','about'],
  'card-journal':['articles','articles/sample','about'],
  'visual-stories':['articles','articles/sample','about'],
  'compact-dispatch':['articles','articles/sample','about'],
  'split-reader':['articles','articles/sample','about'],
  'portrait-profile':['services','services/individual','about'],
  'service-catalogue':['services','services/individual','about'],
  'studio-chapters':['services','services/individual','about'],
  'editorial-practice':['services','services/individual','about'],
  'question-led-practice':['services','services/individual','about'],
};
const sizes=[{name:'1440',width:1440,height:900},{name:'1280',width:1280,height:800},{name:'768',width:768,height:980},{name:'390',width:390,height:844}];
const selectedSizes=process.env.QA_VIEWPORTS?process.env.QA_VIEWPORTS.split(','):null;
const viewports=selectedSizes?sizes.filter(v=>selectedSizes.includes(v.name)):sizes;
const artifact='qa-artifacts/art-direction/interior-qa/'+scenario;
mkdirSync(artifact,{recursive:true});
const rows=[],browser=await chromium.launch({headless:true});
try {
for(const [slug,routes] of Object.entries(layouts)){
 for(const route of routes){
  for(const size of viewports){
   const page=await browser.newPage({viewport:{width:size.width,height:size.height},reducedMotion:'reduce',deviceScaleFactor:1,javaScriptEnabled:false});
   const item={slug,route,width:size.width,status:'not-tested',issues:[]};
   try{
    const href=new URL('layouts/'+slug+'/'+route+'/',base).toString();
    const resp=await page.goto(href,{waitUntil:'domcontentloaded',timeout:18000});
    if(!resp?.ok())throw Error('HTTP '+(resp?.status()??'none'));
    await page.evaluate(()=>document.fonts?.ready);
    const results=await page.evaluate(()=>{
      const root=document.documentElement,main=document.querySelector('main');
      const width=root.clientWidth;
      const visible=el=>{const rect=el.getBoundingClientRect();const style=getComputedStyle(el);return rect.width>0&&rect.height>0&&style.visibility!=='hidden'&&style.display!=='none'};
      const links=[...document.querySelectorAll('main a[href]')].filter(visible);
      const invalid=links.filter(a=>{const v=a.getAttribute('href')||'';return /^(javascript:|#?$)/i.test(v)}).map(a=>a.outerHTML.slice(0,140));
      const brokenAnchors=links.filter(a=>(a.getAttribute('href')||'').startsWith('#')&&!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href'));
      const spills=[...document.querySelectorAll('main *')].filter(visible).map(el=>({el,r:el.getBoundingClientRect()})).filter(x=>x.r.right>width+3||x.r.left< -3).slice(0,6).map(x=>({tag:x.el.tagName,className:String(x.el.className).slice(0,70),left:Math.round(x.r.left),right:Math.round(x.r.right)}));
      const h1=[...document.querySelectorAll('main h1')].filter(visible);
      const unstated=[...document.querySelectorAll('main a[href]')].filter(a=>a.textContent.trim().length===0&&!a.getAttribute('aria-label')).length;
      const landmarks={main:document.querySelectorAll('main').length,nav:document.querySelectorAll('nav').length};
      return {viewportWidth:width,scrollWidth:root.scrollWidth,main:!!main,h1Count:h1.length,primaryHeading:h1[0]?.textContent.trim().slice(0,100)??null,linkCount:links.length,invalid,brokenAnchors,spills,missingAlt:[...document.images].filter(img=>!img.hasAttribute('alt')).length,unlabeledLinks:unstated,landmarks,emptyState:document.body.innerText.includes('尚未')||document.body.innerText.includes('待設定')};
    });
    item.metrics=results;
    if(results.scrollWidth>results.viewportWidth+2)item.issues.push('horizontal-document-overflow');
    if(results.spills.length)item.issues.push('element-overflow');
    if(!results.main)item.issues.push('missing-main');
    if(results.h1Count!==1)item.issues.push('heading-count-'+results.h1Count);
    if(results.invalid.length)item.issues.push('unsafe-or-empty-links');
    if(results.brokenAnchors.length)item.issues.push('broken-anchor');
    if(results.missingAlt)item.issues.push('missing-image-alt');
    if(results.unlabeledLinks)item.issues.push('unlabeled-links');
    if(results.landmarks.main!==1)item.issues.push('main-landmark-count');
    // Keyboard navigation sanity: first navigable element must have observable focus.
    await page.keyboard.press('Tab');
    const focus=await page.evaluate(()=>({tag:document.activeElement?.tagName,outline:getComputedStyle(document.activeElement).outlineStyle,href:document.activeElement?.getAttribute('href')??null}));
    item.focus=focus;
    if(!['A','BUTTON','INPUT','SUMMARY'].includes(focus.tag))item.issues.push('keyboard-focus-not-reached');
    await page.screenshot({path:join(artifact,slug+'-'+route.replaceAll('/','_')+'-'+size.name+'.png'),fullPage:true,animations:'disabled',timeout:30000});
    item.status=item.issues.length?'issues':'pass';
   }catch(error){item.status='failed';item.issues.push(String(error).slice(0,300));}
   rows.push(item);
   await page.close();
  }
 }
}
}finally{await browser.close()}
const failures=rows.filter(r=>r.status!=='pass');
const summary={scenario,method:'Live local Astro preview with JS disabled; keyboard focus and DOM checks are automated, not a screen reader or human aesthetic/accessibility approval',expected:Object.keys(layouts).length*3*viewports.length,captured:rows.filter(r=>r.status!=='failed').length,passed:rows.filter(r=>r.status==='pass').length,failures,records:rows};
writeFileSync(join(artifact,'manifest.json'),JSON.stringify(summary,null,2)+'\n');
console.log('INTERIOR-QA',scenario,summary.captured,'/ 132 captured;',summary.passed,'passes;',failures.length,'with issues');
for(const f of failures.slice(0,30))console.log('ISSUE',f.slug,f.route,f.width,f.issues);
if(failures.length)process.exitCode=1;
