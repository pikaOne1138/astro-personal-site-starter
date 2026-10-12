import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';

const port=4339, base='http://127.0.0.1:'+port, widths=[1440,1280,768,390];
const blocks=JSON.parse(readFileSync('src/data/blocks.registry.json','utf8'));
const effects=JSON.parse(readFileSync('src/data/effects.registry.json','utf8'));
const dir='qa-artifacts/quality';
mkdirSync(dir,{recursive:true});
const rows=[],failures=[];
let browser;
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});
try {
 let ready=false;
 for(let attempt=0;attempt<50;attempt++){
  try {if((await fetch(base+'/blocks/')).ok){ready=true;break;}} catch {}
  await wait(300);
 }
 if(!ready)throw Error('Blocks preview server not ready');
 browser=await chromium.launch({headless:true});
 for(const width of widths){
  for(const kind of ['blocks','effects']){
   const page=await browser.newPage({viewport:{width,height:920},reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',err=>errors.push(err.message));
   const response=await page.goto(base+'/'+kind+'/',{waitUntil:'domcontentloaded',timeout:20000});
   const expected=kind==='blocks'?'[data-block-theme="botanical"]':'[data-fx-theme="botanical"]';
   await page.locator(expected).waitFor({state:'visible',timeout:10000});
   const before=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,title:document.title}));
   const target=page.locator(expected);
   await target.click();
   const pressed=await target.getAttribute('aria-pressed');
   if(pressed!=='true')failures.push(kind+'/'+width+': theme selector did not set aria-pressed');
   const recorded={kind,width,http:response?.status(),overflow:before.overflow,themeApplied:pressed==='true',jsErrors:errors};
   if(kind==='effects'){
    const off=page.locator('[data-fx-intensity="off"]');
    await off.click();
    recorded.motionOff=await off.getAttribute('aria-pressed')==='true';
    if(!recorded.motionOff)failures.push('effects/'+width+': motion off control failed');
    recorded.reducedMotion=await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
   } else {
    recorded.renderedLabels=await page.locator('.ab-demo-label strong').allTextContents();
    const searchTrigger=page.locator('[data-search-open]').first();
    await searchTrigger.click();
    const searchDialog=page.locator('[data-site-search]').first();
    if(!await searchDialog.evaluate(el=>el.open))failures.push('N17/'+width+': search dialog did not open');
    await searchDialog.locator('[data-site-query]').fill('搜尋測試');
    await searchDialog.locator('[data-site-query]').press('Escape');
    if(await searchDialog.evaluate(el=>el.open))failures.push('N17/'+width+': first Escape did not close populated search');
    const menu=page.locator('.practical-gallery-mobile [data-mobile-menu]').first();
    const toggle=menu.locator('[data-menu-open]');
    const controlled=await toggle.getAttribute('aria-controls');
    recorded.mobileMenuId=controlled;
    if(!controlled || !controlled.startsWith('mobile-menu-'))failures.push('W9/'+width+': missing deterministic menu ID');
    await toggle.click();
    if(await toggle.getAttribute('aria-expanded')!=='true')failures.push('W9/'+width+': menu did not expand');
    await page.keyboard.press('Escape');
    if(await toggle.getAttribute('aria-expanded')!=='false')failures.push('F10b/'+width+': Escape did not close mobile menu');
    if(!await toggle.evaluate(el=>el===document.activeElement))failures.push('W9/'+width+': focus did not return to menu trigger');

    const featureDemo=page.locator('.ab-demo').filter({has:page.locator('.ab-demo-label strong', {hasText:'FeatureGrid'})}).first();
    const linked=featureDemo.locator('a.ab-feature-link');
    const unlinked=featureDemo.locator('article.ab-feature');
    recorded.featureGrid={linked:await linked.count(),unlinked:await unlinked.count()};
    if(recorded.featureGrid.linked!==1||recorded.featureGrid.unlinked!==2)failures.push('W11/'+width+': linked and unlinked FeatureGrid tiles changed');
    if(await linked.first().getAttribute('href')!=='#hero')failures.push('W11/'+width+': entire feature tile lacks correct navigation href');

   }
   if(recorded.http!==200)failures.push(kind+'/'+width+': HTTP '+recorded.http);
   if(recorded.overflow)failures.push(kind+'/'+width+': horizontal overflow');
   if(errors.length)failures.push(kind+'/'+width+': JavaScript errors: '+errors.slice(0,2).join('; '));
   rows.push(recorded);
   await page.close();
  }
 }
 const labels=rows.find(r=>r.kind==='blocks')?.renderedLabels||[];
 const importable=new Set(labels.map(s=>s.trim().toLowerCase()));
 const coverage=blocks.map(block=>({id:block.id,name:block.name,galleryLabelSeen:importable.has(block.name.toLowerCase()),browserBehavior:'NOT TESTED'}));
 if(coverage.some(c=>!c.galleryLabelSeen))failures.push('Blocks absent from gallery: '+coverage.filter(c=>!c.galleryLabelSeen).map(c=>c.name).join(', '));
 const report={sha:process.env.GITHUB_SHA||null,checks:rows.length,failed:failures.length,failures,rows,blockGalleryCoverage:coverage,counts:{registeredBlocks:blocks.length,visibleGalleryLabels:coverage.filter(c=>c.galleryLabelSeen).length,effectsRegistered:effects.length},scope:'Browser interaction and overflow of component gallery; individual Block semantics and Effect integration remain NOT TESTED'};
 writeFileSync(dir+'/block-effect-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('Blocks/Effects gallery QA: '+rows.length+' viewports, '+failures.length+' failures; '+report.counts.visibleGalleryLabels+'/'+blocks.length+' registry names visible in demo labels');
 if(failures.length){failures.forEach(f=>console.error('FAIL '+f));process.exitCode=1;}
} finally {
 await browser?.close();
 server.kill('SIGTERM');
}
