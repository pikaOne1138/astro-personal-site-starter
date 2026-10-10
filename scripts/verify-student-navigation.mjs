// Standalone browser-based learner-site navigation consistency audit.
// Run after installing Playwright in an AI work environment:
//   node scripts/verify-student-navigation.mjs --url http://127.0.0.1:4321 --paths /,/about/,/articles/,/services/
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const args=process.argv.slice(2),opt=(name)=>{const i=args.indexOf(name);return i>=0?args[i+1]:undefined};
const root=opt('--url'),rawPaths=opt('--paths');
if(!root||!rawPaths)throw Error('Usage: --url <site-base-url> --paths /,/about/,/articles/... (include a newly added page and representative old pages)');
const paths=rawPaths.split(',').map(x=>x.trim()).filter(Boolean);
if(paths.length<3)throw Error('Check at least three distinct routes: home, existing page, new page');
const base=new URL(root);
const widths=[1440,390];
const browser=await chromium.launch({headless:true});
const results=[];
try {
 for(const width of widths){
  for(const path of paths){
   const page=await browser.newPage({viewport:{width,height:850}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(new URL(path.replace(/^\//,''),base.href.endsWith('/')?base.href:base.href+'/').href,{waitUntil:'domcontentloaded',timeout:20000});
   if(width===390){
    const toggles=page.locator('button[aria-controls], button[aria-expanded], summary');
    for(let i=0;i<Math.min(await toggles.count(),6);i++){
     const item=toggles.nth(i);
     const label=(await item.getAttribute('aria-label')||await item.textContent()||'').toLowerCase();
     if(/menu|選單|導覽|navigation|nav/.test(label)) {await item.click().catch(()=>{});break}
    }
   }
   const nav=await page.evaluate(()=>{
    const candidates=[...document.querySelectorAll('header nav, header [role="navigation"], nav[aria-label]')];
    const normalize=a=>{try{const u=new URL(a.href);return u.pathname.replace(/\/+$/,'/')+u.search}catch{return a.getAttribute('href')||''}};
    const list=candidates.map(n=>({
      label:n.getAttribute('aria-label')||'',
      visible:!!(n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden'),
      links:[...n.querySelectorAll('a[href]')].filter(a=>a.getClientRects().length).map(a=>({name:(a.textContent||a.getAttribute('aria-label')||'').trim().replace(/\s+/g,' '),href:normalize(a)}))
    })).filter(x=>x.visible&&x.links.length);
    const best=list.sort((a,b)=>b.links.length-a.links.length)[0]||null;
    return {navigation:best,overflow:document.documentElement.scrollWidth>innerWidth+2};
   });
   const record={width,path,http:response?.status(),...nav,errors};
   results.push(record);await page.close();
  }
 }
 const fail=[];
 for(const width of widths){
  const group=results.filter(x=>x.width===width);
  const reference=group[0]?.navigation?.links;
  if(!reference)fail.push(width+': no detectable header navigation on baseline');
  for(const row of group){
   if(row.http!==200)fail.push(width+' '+row.path+': HTTP '+row.http);
   if(row.overflow)fail.push(width+' '+row.path+': horizontal overflow');
   if(row.errors.length)fail.push(width+' '+row.path+': runtime errors');
   if(!row.navigation)fail.push(width+' '+row.path+': no detectable nav (check site-specific selectors)');
   else if(reference&&JSON.stringify(row.navigation.links)!==JSON.stringify(reference))
     fail.push(width+' '+row.path+': navigation differs from baseline');
  }
 }
 // This checks link order/labels/URLs, not visual fidelity or all collapsed submenus.
 mkdirSync('qa-artifacts/navigation',{recursive:true});
 writeFileSync('qa-artifacts/navigation/results.json',JSON.stringify({results,fail},null,2));
 console.log(JSON.stringify({checked:results.length,fail},null,2));
 if(fail.length)process.exitCode=1;
}finally{await browser.close()}
