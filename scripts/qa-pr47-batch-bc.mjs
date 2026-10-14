import {chromium} from 'playwright';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
const layouts=JSON.parse(readFileSync('docs/art-direction/pr47-layout-handoff-registry.json','utf8')).items;
const additions=layouts.filter(x=>x.origin==='pr47-new-11');
const viewports=[390,768,1280,1440];
const base=process.env.QA_BASE_URL||'http://127.0.0.1:4321/';
const out='qa-artifacts/art-direction/batch-bc';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});const records=[];
const asHref=p=>new URL(p.replace(/^\//,''),base).toString();
try {
 for(const item of layouts) {
  const paths=item.origin==='pr47-new-11'?[item.prototype.home,item.prototype.archive,item.prototype.detail,item.prototype.about]:[item.prototype.home];
  for(const route of paths)for(const width of viewports){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',deviceScaleFactor:1});
   const result={slug:item.slug,kind:item.kind,origin:item.origin,route,width,issues:[],warnings:[]};
   try {
    const res=await page.goto(asHref(route),{waitUntil:'domcontentloaded',timeout:25000});
    if(!res?.ok())throw Error('HTTP '+res?.status());
    await page.evaluate(()=>document.fonts.ready);
    const m=await page.evaluate(()=>{
     const root=document.documentElement, main=document.querySelector('main');
     if(!main)return null;
     const visible=el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'};
     const h1=[...document.querySelectorAll('h1')].filter(visible);
     const nav=[...main.querySelectorAll('header,aside,nav')].find(x=>x.querySelector('nav a'))??document.querySelector('header');
     const nr=nav?.getBoundingClientRect();
     const links=[...main.querySelectorAll('a[href]')].filter(visible);
     return {
      viewport:root.clientWidth,scroll:root.scrollWidth,h1Count:h1.length,
      nav:nr?{left:Math.round(nr.left),width:Math.round(nr.width),height:Math.round(nr.height)}:null,
      contentWidth:Math.round(main.getBoundingClientRect().width),
      missingAlt:[...main.querySelectorAll('img')].filter(x=>!x.hasAttribute('alt')).length,
      brokenImages:[...main.querySelectorAll('img')].filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.getAttribute('src')).slice(0,5),
      nonfunctionalLinks:links.filter(x=>/^(#|javascript:|)$/.test(x.getAttribute('href')??'')).length,
      brokenAnchors:links.filter(x=>{const u=x.getAttribute('href')??'';return u.startsWith('#')&&u.length>1&&!document.getElementById(u.slice(1))}).map(x=>x.getAttribute('href')).slice(0,5),
      tinyControls:links.filter(x=>{const q=x.getBoundingClientRect();return q.width<28||q.height<28}).length,
      photoCount:main.querySelectorAll('img').length,
      headings:[...main.querySelectorAll('h1,h2')].filter(visible).slice(0,8).map(x=>x.textContent.trim().slice(0,70))
     };
    });
    if(!m)throw Error('Missing main');
    result.metrics=m;
    if(m.scroll>m.viewport+2)result.issues.push('horizontal-overflow');
    if(m.h1Count!==1)result.issues.push('h1-'+m.h1Count);
    if(m.missingAlt)result.issues.push('missing-image-alt');
    if(m.nonfunctionalLinks||m.brokenAnchors.length)result.issues.push('broken-page-links');
    if(m.tinyControls)result.warnings.push('small-clickable-targets:'+m.tinyControls);
    if(m.brokenImages.length)result.warnings.push('remote-or-missing-images:'+m.brokenImages.length);
    if(item.origin==='pr47-new-11'&&!m.nav)result.issues.push('missing-navigation');
    await page.screenshot({path:out+'/'+item.slug+'-'+route.replaceAll('/','_')+'-'+width+'.png',fullPage:true,animations:'disabled'});
   }catch(e){result.issues.push(String(e))}
   records.push(result);await page.close();
  }
 }
}finally{await browser.close()}
const crossPage=[];
for(const item of additions)for(const width of viewports){
 const rows=records.filter(x=>x.slug===item.slug&&x.width===width);
 const home=rows.find(x=>x.route===item.prototype.home);
 if(!home?.metrics?.nav){crossPage.push({slug:item.slug,width,type:'missing-home-nav'});continue}
 for(const r of rows.filter(x=>x!==home&&x.metrics?.nav)){
  const a=home.metrics.nav,b=r.metrics.nav;
  if(Math.abs(a.left-b.left)>4||Math.abs(a.width-b.width)>4||Math.abs(a.height-b.height)>4)crossPage.push({slug:item.slug,width,route:r.route,home:a,inner:b,type:'nav-geometry-mismatch'});
 }
}
const errors=records.filter(x=>x.issues.length);
const report={expected:232,inspected:records.length,errors,crossPage,warnings:records.filter(x=>x.warnings.length).map(x=>({slug:x.slug,route:x.route,width:x.width,warnings:x.warnings})),records};
writeFileSync(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('BATCH BC',report.inspected,'of 232','errors',errors.length,'nav geometry differences',crossPage.length,'warnings',report.warnings.length);
for(const e of errors.slice(0,15))console.log('ERROR',e.slug,e.route,e.width,e.issues);
for(const e of crossPage.slice(0,20))console.log('NAV REVIEW',JSON.stringify(e));
if(errors.length)process.exitCode=1;
