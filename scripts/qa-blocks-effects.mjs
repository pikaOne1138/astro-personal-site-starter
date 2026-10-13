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
    recorded.allEffects=await page.evaluate(()=>({
      Reveal:document.querySelectorAll('#reveal [data-motion-reveal]').length>=5,
      StaggerGroup:!!document.querySelector('#stagger [data-motion-stagger]'),
      MotionCard:document.querySelectorAll('#cards [data-motion-card]').length===2,
      ZoomImage:document.querySelectorAll('#images [data-motion-image] img[alt]').length===2,
      MagneticButton:!!document.querySelector('#actions [data-motion-magnetic][href]'),
      UnderlineLink:document.querySelectorAll('#actions a.motion-underline[href]').length===3,
      MotionFAQ:document.querySelectorAll('#faq .motion-faq details').length===3
    }));
    for(const [name,ok] of Object.entries(recorded.allEffects))if(!ok)failures.push('Effects '+name+'/'+width+': expected rendered component missing');
    const secondFAQ=page.locator('#faq .motion-faq details').nth(1);
    await secondFAQ.locator('summary').click();
    const faqOpened=await secondFAQ.evaluate(el=>el.open);
    recorded.faqKeyboardIndependent=faqOpened;
    if(!faqOpened)failures.push('MotionFAQ/'+width+': native details did not open');

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
    recorded.N11=await page.evaluate(()=>{
      const footer=[...document.querySelectorAll('.ab-demo')].find(x=>x.querySelector('.ab-demo-label strong')?.textContent?.trim()==='SiteFooter')?.querySelector('.site-footer');
      if(!footer)return {ok:false,reason:'No SiteFooter demo'};
      const links=[...footer.querySelectorAll('.site-footer__group a,.site-footer__legal a')].map(a=>({text:a.textContent?.trim(),height:a.getBoundingClientRect().height}));
      const copyright=footer.querySelector('.site-footer__bottom small');
      const font=copyright?Number.parseFloat(getComputedStyle(copyright).fontSize):0;
      return {ok:links.length>0&&links.every(a=>a.height>=43.5)&&font>=12,links,font};
    });
    if(!recorded.N11.ok)failures.push('N11/'+width+': footer small text or link touch-target contract failed '+JSON.stringify(recorded.N11));

    recorded.galleryComponents=await page.evaluate(()=>{
      return [...document.querySelectorAll('.ab-demo')].map(demo=>{
        const title=demo.querySelector('.ab-demo-label strong')?.textContent?.trim()||'';
        const rect=demo.getBoundingClientRect(),style=getComputedStyle(demo);
        const content=[...demo.children].filter(x=>!x.classList.contains('ab-demo-label')&&!['STYLE','SCRIPT'].includes(x.tagName));
        return {title,present:!!title,rendered:rect.width>0&&rect.height>0&&style.display!=='none'&&style.visibility!=='hidden',contentNodes:content.length};
      });
    });
    for(const row of recorded.galleryComponents)if(!row.rendered||row.contentNodes<1)failures.push('Block gallery rendered '+row.title+'/'+width+': missing visible content');
    recorded.individualBlockVisibility=await page.evaluate(names=>{
      const demos=[...document.querySelectorAll('.ab-demo')];
      return names.map(name=>{
        const matches=demos.filter(node=>node.querySelector('.ab-demo-label strong')?.textContent?.trim()===name);
        const instances=matches.map(node=>{
          const content=[...node.children].filter(x=>!x.classList.contains('ab-demo-label')&&!['STYLE','SCRIPT'].includes(x.tagName));
          const displayed=content.filter(el=>{const r=el.getBoundingClientRect(),css=getComputedStyle(el);return r.height>1&&r.width>1&&css.display!=='none'&&css.visibility!=='hidden'&&Number(css.opacity)>0});
          return {contentNodes:content.length,visibleNodes:displayed.length,hasReadableText:!!node.textContent?.trim()};
        });
        return {name,examples:matches.length,instances,visible:instances.length>0&&instances.some(x=>x.visibleNodes>0&&x.hasReadableText)};
      });
    },blocks.map(x=>x.name));
    for(const item of recorded.individualBlockVisibility)if(!item.visible)failures.push('Block '+item.name+'/'+width+': no visible component example');

    const searchTrigger=page.locator('[data-search-open]').first();
    await searchTrigger.click();
    const searchDialog=page.locator('[data-site-search]').first();
    recorded.searchDialogOpened=await searchDialog.evaluate(el=>el.open);
    if(!recorded.searchDialogOpened)failures.push('N17/'+width+': search dialog did not open');
    await searchDialog.locator('[data-site-query]').fill('搜尋測試');
    await searchDialog.locator('[data-site-query]').press('Escape');
    recorded.searchDialogClosed=!(await searchDialog.evaluate(el=>el.open));
    if(!recorded.searchDialogClosed)failures.push('N17/'+width+': first Escape did not close populated search');
    const menu=page.locator('.practical-gallery-mobile [data-mobile-menu]').first();
    const toggle=menu.locator('[data-menu-open]');
    const controlled=await toggle.getAttribute('aria-controls');
    recorded.mobileMenuId=controlled;
    if(!controlled || !controlled.startsWith('mobile-menu-'))failures.push('W9/'+width+': missing deterministic menu ID');
    if(await toggle.isVisible()){
      await toggle.click();
      recorded.mobileMenuExpanded=await toggle.getAttribute('aria-expanded')==='true';
      if(!recorded.mobileMenuExpanded)failures.push('W9/'+width+': menu did not expand');
      await page.keyboard.press('Escape');
      const closed=await page.waitForFunction(() => document.querySelector('.practical-gallery-mobile [data-menu-open]')?.getAttribute('aria-expanded')==='false',null,{timeout:2500}).then(()=>true).catch(()=>false);
      recorded.mobileMenuClosed=closed;
      if(!closed)failures.push('F10b/'+width+': Escape did not close mobile menu');
      if(closed){
        const restored=await page.waitForFunction(() => document.querySelector('.practical-gallery-mobile [data-menu-open]')===document.activeElement,null,{timeout:1500}).then(()=>true).catch(()=>false);
        recorded.mobileMenuFocusRestored=restored;
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
    recorded.featureGrid.href=await linked.first().getAttribute('href');
    if(recorded.featureGrid.href!=='#hero')failures.push('W11/'+width+': entire feature tile lacks correct navigation href');

   }
   if(recorded.http!==200)failures.push(kind+'/'+width+': HTTP '+recorded.http);
   if(recorded.overflow)failures.push(kind+'/'+width+': horizontal overflow');
   if(errors.length)failures.push(kind+'/'+width+': JavaScript errors: '+errors.slice(0,2).join('; '));
   rows.push(recorded);
   await page.close();
  }
 }
 // Progressive enhancement: students must still be able to read the gallery without JavaScript.
 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:850},reducedMotion:'reduce'});
 try{
  for(const kind of ['blocks','effects']){
   const page=await noJS.newPage();
   const response=await page.goto(base+'/'+kind+'/',{waitUntil:'domcontentloaded',timeout:20000});
   const result=await page.evaluate(()=>{
    const main=document.querySelector('main');
    const headline=main?.querySelector('h1');
    const css=headline?getComputedStyle(headline):null;
    const nodes=[...document.querySelectorAll('[data-motion-reveal]')];
    return {readable:!!headline?.textContent?.trim()&&!!css&&css.visibility!=='hidden'&&Number(css.opacity)>0.95,
      revealCount:nodes.length,hiddenReveals:nodes.filter(el=>getComputedStyle(el).visibility==='hidden'||Number(getComputedStyle(el).opacity)<0.95).length,
      overflow:document.documentElement.scrollWidth>window.innerWidth+2};
   });
   if(kind==='blocks'){
    result.individualBlockVisibility=await page.evaluate(names=>{
      const demos=[...document.querySelectorAll('.ab-demo')];
      return names.map(name=>{
       const matches=demos.filter(x=>x.querySelector('.ab-demo-label strong')?.textContent?.trim()===name);
       return {name,examples:matches.length,visible:matches.some(node=>{
        const r=node.getBoundingClientRect(),style=getComputedStyle(node);
        return r.height>1&&r.width>1&&style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)>0&&[...node.children].some(el=>!el.classList.contains('ab-demo-label')&&el.getBoundingClientRect().height>0);
       })};
      });
    },blocks.map(x=>x.name));
    for(const item of result.individualBlockVisibility)if(!item.visible)failures.push('Block no-js '+item.name+': no independently readable demo');
   }
   rows.push({kind:kind+'-nojs',width:390,http:response?.status(),...result});
   if(response?.status()!==200||!result.readable||result.hiddenReveals||result.overflow)failures.push(kind+'/no-js: content inaccessible, overflow or Reveal stuck hidden');
   await page.close();
  }
 }finally{await noJS.close()}
 const labels=rows.find(r=>r.kind==='blocks')?.renderedLabels||[];
 const importable=new Set(labels.map(s=>s.trim().toLowerCase()));
 const coverage=blocks.map(block=>({id:block.id,name:block.name,galleryLabelSeen:importable.has(block.name.toLowerCase()),browserBehavior:'NOT TESTED'}));
 if(coverage.some(c=>!c.galleryLabelSeen))failures.push('Blocks absent from gallery: '+coverage.filter(c=>!c.galleryLabelSeen).map(c=>c.name).join(', '));
 const desktopResults=rows.filter(r=>r.kind==='blocks');
 const noJSResults=rows.find(r=>r.kind==='blocks-nojs')?.individualBlockVisibility||[];
 const individualBlockCoverage=blocks.map(block=>{
  const byWidth=desktopResults.map(r=>({width:r.width,visible:r.individualBlockVisibility?.find(x=>x.name===block.name)?.visible===true}));
  const noJSVisible=noJSResults.find(x=>x.name===block.name)?.visible===true;
  return {name:block.name,path:block.path,byWidth,noJSVisible,renderContractPass:byWidth.length===4&&byWidth.every(x=>x.visible)&&noJSVisible,
    props:'NOT TESTED',keyboard:'NOT TESTED',negativeProps:'NOT TESTED'};
 });
 for(const item of individualBlockCoverage)if(!item.renderContractPass)failures.push('Block '+item.name+': per-component four-width/no-JS render contract missing');
 const blockRows=rows.filter(x=>x.kind==='blocks'&&[1440,1280,768,390].includes(x.width));
 const mobile=blockRows.find(x=>x.width===390);
 const fullFourWidths=blockRows.length===4;
 const historicalCases=[
  {id:'N11',name:'SiteFooter touch/text contracts across four widths',passed:fullFourWidths&&blockRows.every(x=>x.N11?.ok===true),observations:blockRows.map(x=>({width:x.width,N11:x.N11}))},
  {id:'N17',name:'SearchDialog opens and populated Escape closes on first press',passed:fullFourWidths&&blockRows.every(x=>x.searchDialogOpened===true&&x.searchDialogClosed===true),observations:blockRows.map(x=>({width:x.width,opened:x.searchDialogOpened,closed:x.searchDialogClosed}))},
  {id:'W11',name:'FeatureGrid clickable and inert tiles work at all widths',passed:fullFourWidths&&blockRows.every(x=>x.featureGrid?.linked===1&&x.featureGrid?.unlinked===2&&x.featureGrid?.href==='#hero'),observations:blockRows.map(x=>({width:x.width,featureGrid:x.featureGrid}))},
  {id:'W9',name:'MobileMenu stable aria-controls ID, opens, closes and returns focus',passed:!!mobile?.mobileMenuId&&mobile.mobileMenuId.startsWith('mobile-menu-')&&mobile.mobileMenuExpanded===true&&mobile.mobileMenuClosed===true&&mobile.mobileMenuFocusRestored===true,observations:[{width:390,id:mobile?.mobileMenuId,expanded:mobile?.mobileMenuExpanded,closed:mobile?.mobileMenuClosed,focusRestored:mobile?.mobileMenuFocusRestored}]},
  {id:'F10b',name:'MobileMenu Escape closes native mobile menu',passed:mobile?.mobileMenuClosed===true,observations:[{width:390,closed:mobile?.mobileMenuClosed}]}
 ];
 for(const item of historicalCases)if(!item.passed)failures.push('Historical Block browser case '+item.id+': failed explicit expected controls');
 const report={sha:process.env.GITHUB_SHA||null,checks:rows.length,failed:failures.length,failures,rows,blockGalleryCoverage:coverage,individualBlockCoverage,historicalCases,counts:{registeredBlocks:blocks.length,visibleGalleryLabels:coverage.filter(c=>c.galleryLabelSeen).length,effectsRegistered:effects.length},scope:'All Blocks independently require visible demo at four widths and without JS; Props variants, negative input, keyboard and cross-component integration remain NOT TESTED'};
 writeFileSync(dir+'/block-effect-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('Blocks/Effects gallery QA: '+rows.length+' viewports, '+failures.length+' failures; '+report.counts.visibleGalleryLabels+'/'+blocks.length+' registry names visible in demo labels');
 if(failures.length){failures.forEach(f=>console.error('FAIL '+f));process.exitCode=1;}
} finally {
 await browser?.close();
 server.kill('SIGTERM');
}
