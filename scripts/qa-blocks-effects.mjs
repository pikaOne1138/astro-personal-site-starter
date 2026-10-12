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
    recorded.revealVisibility=await page.evaluate(()=>{
      const nodes=[...document.querySelectorAll('[data-motion-reveal]')];
      const blocked=nodes.filter(el=>{
        const css=getComputedStyle(el);
        return css.visibility==='hidden'||Number(css.opacity)<0.98;
      });
      return {sampled:nodes.length,blocked:blocked.length};
    });
    if(!recorded.reducedMotion||recorded.revealVisibility.blocked)failures.push('Effects reduced-motion content hidden at '+width+': '+recorded.revealVisibility.blocked+' elements');

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
    if(await toggle.isVisible()){
      await toggle.click();
      if(await toggle.getAttribute('aria-expanded')!=='true')failures.push('W9/'+width+': menu did not expand');
      await page.keyboard.press('Escape');
      const closed=await page.waitForFunction(() => document.querySelector('.practical-gallery-mobile [data-menu-open]')?.getAttribute('aria-expanded')==='false',null,{timeout:2500}).then(()=>true).catch(()=>false);
      if(!closed)failures.push('F10b/'+width+': Escape did not close mobile menu');
      if(closed){
        const restored=await page.waitForFunction(() => document.querySelector('.practical-gallery-mobile [data-menu-open]')===document.activeElement,null,{timeout:1500}).then(()=>true).catch(()=>false);
        if(!restored)failures.push('W9/'+width+': focus did not return to menu trigger');
      }
      recorded.mobileMenuInteracted=true;
    } else {
      recorded.mobileMenuInteracted=false;
    }

    // Individual rendered contracts: assess actual built markup, not Astro source syntax.
    const componentChecks=await page.evaluate(()=>{
      const demo=name=>[...document.querySelectorAll('.ab-demo')].find(el=>el.querySelector('.ab-demo-label strong')?.textContent?.trim()===name);
      const form=demo('ArticleSearch')?.querySelector('form[role="search"]');
      const tags=[...(demo('TagCloud')?.querySelectorAll('nav[aria-label] a')||[])];
      const months=[...(demo('ArchiveMonths')?.querySelectorAll('nav[aria-label] a')||[])];
      const dates=[...(demo('PostCalendar')?.querySelectorAll('a.v2-calendar-day')||[])];
      const practitioner=demo('PractitionerCard');
      const fit=demo('ServiceFit');
      return {
        articleSearch:!!form&&form.getAttribute('action')?.endsWith('/explore/')&&!!form.querySelector('input[name="q"][type="search"]'),
        tagCloud:tags.length>=1&&tags.every(a=>a.href.includes('?tag=')),
        archiveMonths:months.length>=1&&months.every(a=>a.href.includes('?month=')),
        postCalendar:dates.length>=1&&dates.every(a=>a.href.includes('?date=')&&a.hasAttribute('aria-label')),
        practitionerDemoNoFalseClaims:!!practitioner?.querySelector('.practical-practitioner')&&!practitioner.querySelector('.practical-practitioner__actions a')&&!practitioner.textContent?.includes('證照：'),
        serviceFit:!!fit?.querySelector('[aria-label="這項服務適合誰？"]')&&!!fit?.textContent?.includes('可能需要其他資源')
      };
    });
    recorded.componentChecks=componentChecks;
    for(const [name,passed] of Object.entries(componentChecks))if(!passed)failures.push('Block contract '+name+'/'+width+': invalid rendered semantics');

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
