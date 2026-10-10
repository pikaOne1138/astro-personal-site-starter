// Audit shared PRIMARY navigation, not article TOCs or section indices.
// Usage: node scripts/verify-student-navigation.mjs --url http://localhost:4321/ --paths /,/about/,/toolbox/ --expect-links /,/about/,/toolbox/
import { chromium } from 'playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
const argv=process.argv.slice(2),arg=k=>{const i=argv.indexOf(k);return i<0?undefined:argv[i+1]};
const root=arg('--url'),raw=arg('--paths'),expected=arg('--expect-links');
if(!root||!raw||!expected)throw Error('Required: --url BASE --paths /,/about/,/new-page/ --expect-links /,/about/,/new-page/ (expected primary nav destinations)');
const base=new URL(root);const pathOf=v=>{const url=new URL(v.replace(/^\//,''),base.href.endsWith('/')?base.href:base.href+'/');if(url.origin!==base.origin)throw Error('External route not permitted: '+v);return url.pathname.replace(/\/+$/,'/')+url.search};
const paths=[...new Set(raw.split(',').map(x=>x.trim()).filter(Boolean).map(pathOf))];
if(paths.length<3)throw Error('At least three DISTINCT routes required');
const wanted=[...new Set(expected.split(',').map(x=>x.trim()).filter(Boolean).map(pathOf))];
if(!wanted.length)throw Error('Expected primary nav links required');
const widths=[1440,390],rows=[],fail=[],browser=await chromium.launch({headless:true});
try{
 for(const width of widths)for(const route of paths){
  const page=await browser.newPage({viewport:{width,height:850}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   const response=await page.goto(new URL(route,base.origin).href,{waitUntil:'domcontentloaded',timeout:20000});
   if(width===390){
    const toggle=page.locator('header button[aria-controls],header button[aria-expanded],header summary').filter({visible:true}).first();
    if(await toggle.count())await toggle.click();
   }
   const extracted=await page.evaluate(()=>{
    const visible=e=>{const s=getComputedStyle(e);return e.getClientRects().length>0&&s.visibility!=='hidden'&&s.display!=='none'};
    // Restrict to SITE HEADER primary nav; never select article TOC by number of links.
    const nodes=[...document.querySelectorAll('header nav, header [role="navigation"]')].filter(visible);
    const primary=nodes.find(n=>/primary|main|主選單|主導覽|主要|網站導覽/i.test(n.getAttribute('aria-label')||''))||nodes.find(n=>!/(breadcrumb|麵包屑|toc|目錄|文章|footer|頁尾)/i.test(n.getAttribute('aria-label')||''))||null;
    const links=primary?[...primary.querySelectorAll('a[href]')].filter(visible).map(a=>({label:(a.getAttribute('aria-label')||a.textContent||'').trim().replace(/\s+/g,' '),url:new URL(a.href).pathname.replace(/\/+$/,'/')+new URL(a.href).search,origin:new URL(a.href).origin})):[];
    return {links,navFound:!!primary,navLabel:primary?.getAttribute('aria-label')||'',overflow:document.documentElement.scrollWidth>innerWidth+2};
   });
   rows.push({width,route,http:response?.status()??0,...extracted,errors});
  }catch(e){fail.push(width+' '+route+': '+e.message);rows.push({width,route,error:e.message})}finally{await page.close()}
 }
 const signature=x=>JSON.stringify(x.map(l=>[l.label,l.url]));
 for(const width of widths){
  const group=rows.filter(x=>x.width===width),reference=group[0]?.links;
  for(const row of group){
   if(row.http!==200)fail.push(width+' '+row.route+': HTTP '+row.http);
   if(row.overflow)fail.push(width+' '+row.route+': horizontal overflow');
   if(row.errors?.length)fail.push(width+' '+row.route+': JavaScript errors '+row.errors.join('; '));
   if(!row.navFound||!row.links?.length){fail.push(width+' '+row.route+': primary header nav missing');continue}
   if(reference&&signature(row.links)!==signature(reference))fail.push(width+' '+row.route+': nav differs across pages');
   const actual=row.links.map(l=>l.url);
   for(const wantedPath of wanted)if(!actual.includes(wantedPath))fail.push(width+' '+row.route+': expected link absent '+wantedPath);
   const duplicate=actual.filter((x,i)=>actual.indexOf(x)!==i);if(duplicate.length)fail.push(width+' '+row.route+': duplicate nav URL '+[...new Set(duplicate)].join(','));
  }
 }
 // Compare desktop and expanded mobile menus: consistency within each width is not sufficient.
 for(const route of paths){
  const desktop=rows.find(x=>x.width===1440&&x.route===route),mobile=rows.find(x=>x.width===390&&x.route===route);
  if(desktop?.links&&mobile?.links&&signature(desktop.links)!==signature(mobile.links))fail.push(route+': desktop/mobile nav mismatch');
 }
 // Check live link destinations; labels and equal URLs are not proof of a working site.
 const destinations=[...new Set(rows.flatMap(x=>x.links||[]).filter(x=>x.origin===base.origin).map(x=>x.url))];
 const checked=[];
 for(const dest of destinations){
  try{
   const page=await browser.newPage();const response=await page.goto(new URL(dest,base.origin).href,{waitUntil:'domcontentloaded',timeout:20000});
   const status=response?.status()??0;checked.push({path:dest,status});
   if(status<200||status>=400)fail.push('nav destination '+dest+': HTTP '+status);
   await page.close();
  }catch(e){checked.push({path:dest,error:e.message});fail.push('nav destination '+dest+': '+e.message)}
 }
 mkdirSync('qa-artifacts/navigation',{recursive:true});
 writeFileSync('qa-artifacts/navigation/results.json',JSON.stringify({rows,expected:wanted,checked,fail},null,2));
 console.log(JSON.stringify({routes:paths.length,viewports:widths,checkedDestinations:checked.length,fail},null,2));
 if(fail.length)process.exitCode=1;
}finally{await browser.close()}
