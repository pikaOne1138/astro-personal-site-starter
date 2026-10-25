// Acceptance evidence and final visual limits: docs/layout/layout-assembly.md
import {mkdtempSync,readFileSync,existsSync,writeFileSync,rmSync,mkdirSync,cpSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import layouts from '../src/data/layout-directions.json' with {type:'json'};
import headingFields from '../src/data/layout-assembly/expanded/heading-fields.json' with {type:'json'};
import expansion from '../src/data/layout-assembly/expansion-directions.json' with {type:'json'};
import {checkShellSource,checkShellRuntime,selfTestShellRuntime} from './shell-token-check.mjs';
import {auditDist,assertShellVars,auditReferencedRuntime,selfTestAuditRuntime,temporaryUsed} from './audit-shell-vars.mjs';
await selfTestShellRuntime();
await selfTestAuditRuntime();
const root=mkdtempSync(join(tmpdir(),'astro-starter-test-'));
function assertStudentContext(site,expectedSlug){
 const config=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8'));
 const project=readFileSync(join(site,'PROJECT.md'),'utf8');
 if(config.layoutSlug!==expectedSlug)throw Error('Export config Layout mismatch: expected '+expectedSlug+', got '+config.layoutSlug);
 if(!project.includes('Layout ID（規劃選擇）：`'+expectedSlug+'`'))throw Error('PROJECT Layout mismatch for '+expectedSlug);
 for(const path of ['AGENTS.md','CLAUDE.md','GEMINI.md','.gitignore','scripts/check-project-context.mjs','scripts/check-secrets.mjs','scripts/site-status.mjs','scripts/qa-student-responsive.mjs'])
  if(!existsSync(join(site,path)))throw Error('Student export missing '+path+' for '+expectedSlug);
 execFileSync(process.execPath,[join(site,'scripts/check-project-context.mjs'),site],{stdio:'pipe'});
 const pkg=JSON.parse(readFileSync(join(site,'package.json'),'utf8'));
 if(!pkg.scripts['qa:responsive']||!pkg.devDependencies?.playwright)throw Error('Student export missing portable Playwright QA: '+expectedSlug);
 const workflow=readFileSync(join(site,'.github/workflows/pr-check.yml'),'utf8');
 for(const gate of ['npm run build','npm run qa:responsive','npm run check:secrets','npm run verify'])if(!workflow.includes(gate))throw Error('Student PR lacks quality gate '+gate+' for '+expectedSlug);
}

const kinds=['knowledge','helper'];
const visualEnabled=process.env.STUDENT_VISUAL_CAPTURE==='1';
const visualOutput=process.env.STUDENT_VISUAL_OUT||'student-visual';
const visualRows=[];
let visualBrowser;
if(visualEnabled){
  const {chromium}=await import('playwright');
  visualBrowser=await chromium.launch({headless:true});
  mkdirSync(visualOutput,{recursive:true});
}
const escapeHtml=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
async function captureStudentSite(slug,kind,site,scenario={}){
  if(!visualBrowser)return;
  const base='https://student-static.example';
  const {resolve,sep}=await import('node:path');
  const dist=resolve(site,'dist');
  const widths=[1440,1280,768,390];
  const pages=scenario.routes??(kind==='knowledge'?['','about/','articles/','articles/qa-long-title/']:['','about/','services/','faq/','booking/','first-visit/']);
  const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.xml':'application/xml','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.m4a':'audio/mp4'};
  for(const route of pages)for(const width of widths){
    const page=await visualBrowser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*', async request=>{
      try{
        const url=new URL(request.request().url());
        if(url.origin!==base)return request.abort();
        const relative=decodeURIComponent(url.pathname).replace(/^\/+/, '');
        const file=resolve(dist,(!relative||relative.endsWith('/'))?relative+'index.html':relative);
        if(file!==dist&&!file.startsWith(dist+sep))return request.fulfill({status:403,body:'Forbidden'});
        if(!existsSync(file))return request.fulfill({status:404,body:'Not found'});
        const ext=file.slice(file.lastIndexOf('.'));
        return request.fulfill({status:200,contentType:types[ext]||'application/octet-stream',body:readFileSync(file)});
      }catch(error){return request.fulfill({status:500,body:'Capture error'});}
    });
    const response=await page.goto(base+'/'+route,{waitUntil:'load',timeout:15000});
    let audioReady=true;
    if(await page.locator('audio').count()){
      try{
        await page.waitForFunction(()=>[...document.querySelectorAll('audio')].every(a=>!a.error&&a.readyState>=1&&a.duration>0),{},{timeout:5000});
        await page.evaluate(async()=>{for(const a of document.querySelectorAll('audio')){a.muted=true;await a.play();a.pause();a.currentTime=0;}});
      }catch(error){audioReady=false;errors.push('Owned audio metadata/playback failed: '+error.message);}
    }
    if(scenario.searchState&&route==='articles/'&&width===390){
      const matches=await page.evaluate(async()=>{const index=await import('/pagefind/pagefind.js');return (await index.search('nativewithdrawuniquetoken')).results.length;});
      if(scenario.searchState==='published'?matches===0:matches!==0)errors.push('Pagefind publication/withdrawal result mismatch: '+matches);
    }
    // Test the single navigation tree as a visitor would operate it.
    // At mobile widths links are intentionally hidden until the toggle opens.
    let keyboardFocus=true,escapeNavigation=true;
    const mobileToggle=page.locator('.student-nav-toggle');
    const isMobileToggleVisible=await mobileToggle.count()&&await mobileToggle.isVisible();
    if(isMobileToggleVisible){
      const navLinks=page.locator('.student-navigation');
      keyboardFocus=await navLinks.isHidden();
      await mobileToggle.focus();
      keyboardFocus=keyboardFocus&&await mobileToggle.evaluate(el=>document.activeElement===el&&getComputedStyle(el).outlineStyle!=='none'&&parseFloat(getComputedStyle(el).outlineWidth)>=2);
      await page.keyboard.press('Enter');
      const opened=await mobileToggle.getAttribute('aria-expanded')==='true'&&await navLinks.isVisible();
      keyboardFocus=keyboardFocus&&opened;
    }
    const firstLink=page.locator('.student-navigation > a').first();
    if(await firstLink.count()){
      await firstLink.focus();
      keyboardFocus=keyboardFocus&&await firstLink.evaluate(el=>document.activeElement===el&&getComputedStyle(el).outlineStyle!=='none'&&parseFloat(getComputedStyle(el).outlineWidth)>=2);
    }
    const group=page.locator('.student-navigation details').first();
    if(await group.count()){
      const summary=group.locator('summary');await summary.focus();await page.keyboard.press('Enter');
      const opened=await group.evaluate(el=>el.open);
      await page.keyboard.press('Tab');await page.keyboard.press('Escape');
      escapeNavigation=opened&&await summary.evaluate(el=>!el.parentElement.open&&document.activeElement===el);
    }
    if(isMobileToggleVisible){
      // A second Escape closes only the mobile drawer and returns focus to its toggle.
      await page.keyboard.press('Escape');
      const closed=await mobileToggle.getAttribute('aria-expanded')==='false'&&await page.locator('.student-navigation').isHidden();
      const focused=await mobileToggle.evaluate(el=>document.activeElement===el);
      escapeNavigation=escapeNavigation&&closed&&focused;
    }
    if(scenario.patternCheck){
      const expected=scenario.patternCheck[route]??[];
      if(await page.locator('.student-pattern').count())errors.push('Inherited placeholder Pattern duplicated the real content');
      if(route==='guides/first/'&&await page.locator('.native-service-facts').count())errors.push('Custom page inherited unrelated service facts');
      const actual=await page.locator('[data-section-pattern]').evaluateAll(nodes=>nodes.map(n=>n.dataset.sectionPattern));
      if(JSON.stringify(actual)!==JSON.stringify(expected))errors.push('Pattern selection/order mismatch: '+JSON.stringify(actual));
      const placed=await page.evaluate(()=>[...document.querySelectorAll('.pattern-slot')].every(slot=>{
        const canvas=document.querySelector('[data-native-page]');
        if(canvas&&!canvas.contains(slot))return false;
        if(slot.dataset.patternPosition==='after-intro'&&slot.previousElementSibling?.tagName!=='SECTION')return false;
        return slot.getBoundingClientRect().width<=innerWidth;
      }));
      if(!placed)errors.push('Pattern escaped its canvas or opening anchor');
      for(const link of await page.locator('.pattern-slot a').all()){
        await link.focus();
        if(!await link.evaluate(el=>document.activeElement===el&&getComputedStyle(el).outlineStyle!=='none'&&el.getBoundingClientRect().height>=44))errors.push('Pattern link lost keyboard focus or 44px target');
      }
    }
    if(scenario.imageCheck){
      const owned=await page.evaluate(()=>[...document.querySelectorAll('img[data-owner-image]')].map(img=>({role:img.dataset.ownerImage,loaded:img.complete&&img.naturalWidth>0,alt:img.alt,width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height,fit:getComputedStyle(img).objectFit,position:getComputedStyle(img).objectPosition,filter:getComputedStyle(img).filter,centered:(()=>{const a=img.closest('a.brand');if(!a)return true;const x=img.getBoundingClientRect(),y=a.getBoundingClientRect();return Math.abs((x.left+x.width/2)-(y.left+y.width/2))<2;})(),insideFrame:!img.classList.contains('owner-image--fill')||(()=>{const frame=img.closest('.native-image-slot');if(!frame)return false;const a=img.getBoundingClientRect(),b=frame.getBoundingClientRect();return Math.abs(a.left-b.left)<2&&Math.abs(a.top-b.top)<2&&a.width<=b.width+2&&a.height<=b.height+2;})()})));
      const logos=owned.filter(img=>img.role==='logo'),pictures=owned.filter(img=>img.role==='editorial');
      if(logos.length!==1||logos.some(img=>!img.loaded||!img.alt||img.width>125.5||img.height>48.5||img.fit!=='contain'||img.filter!=='none'))errors.push('Owned Logo missing, broken, stretched or filtered: '+JSON.stringify(logos));
      if(slug==='editorial-frontpage'&&logos.some(img=>!img.centered))errors.push('Editorial wordmark lost its centered masthead axis');
      const homeImage=['subject-atlas','practice-compass','portrait-profile','studio-chapters'].includes(slug);
      if((route==='about/'||!route&&homeImage)&&pictures.length===0)errors.push('Owned editorial image missing from its layout role');
      for(const img of pictures)if(!img.loaded||!img.alt||!img.insideFrame||img.width<1||img.height<1||img.fit!==scenario.imageCheck.fit||img.position!==scenario.imageCheck.position)errors.push('Owned image/crop mismatch: '+JSON.stringify(img));
      if(scenario.imageCheck.heading&&await page.getByText('QA 可編輯段落標題',{exact:true}).count()===0&&route==='about/'&&['portrait-profile','service-catalogue','card-journal','editorial-frontpage','sidebar-journal','split-reader','visual-stories','studio-chapters'].includes(slug))errors.push('Configured editorial heading was not rendered');
    }
    if(scenario.ctaCheck){
      const actions=page.locator('[data-primary-cta]');
      const expected=scenario.ctaCheck;
      if(await page.locator('[data-primary-cta="navigation"]').count()!==1)errors.push('Native navigation must expose exactly one primary action');
      if(!route&&await page.locator('[data-primary-cta="home"]').count()!==1)errors.push('Native home must expose exactly one primary action');
      for(const action of await actions.all()){
        if((await action.textContent()).trim().replace(/[→↗]$/,'').trim()!==expected.label||await action.getAttribute('href')!==expected.href)errors.push('Configured CTA label/route was not applied');
        await action.focus();
        if(!await action.evaluate(el=>document.activeElement===el&&getComputedStyle(el).outlineStyle!=='none'&&el.getBoundingClientRect().height>=44))errors.push('Primary CTA lost keyboard focus or 44px target');
      }
    }
    const footerContrast=await page.evaluate(()=>{
      const footer=document.querySelector('.student-footer');if(!footer)return [];
      const ctx=document.createElement('canvas').getContext('2d');
      const rgb=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3)};
      const luminance=channels=>channels.map(n=>{const v=n/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
      const bg=luminance(rgb(getComputedStyle(footer).backgroundColor));
      return [...footer.querySelectorAll('a,p,strong,small,h2,span')].filter(el=>el.getBoundingClientRect().height>0&&el.textContent.trim()).flatMap(el=>{
        const ink=luminance(rgb(getComputedStyle(el).color));const ratio=(Math.max(bg,ink)+.05)/(Math.min(bg,ink)+.05);
        return ratio<4.5?[{text:el.textContent.trim().slice(0,40),ratio}]:[];
      });
    });
    if(footerContrast.length)errors.push('Selected footer contrast below 4.5: '+JSON.stringify(footerContrast));
    // Avoid screenshots of an incidental focus outline.
    await page.evaluate(()=>document.activeElement?.blur());
    // A page can fit the viewport while its index digits wrap or framed copy
    // touches the border. These regressions were found in actual captures.
    const compositionIssues=await page.evaluate(()=>{
      const issues=[];
      for(const number of document.querySelectorAll('.module-number')){
        const range=document.createRange();range.selectNodeContents(number);
        const lines=new Set([...range.getClientRects()].filter(r=>r.width>0).map(r=>Math.round(r.top)));
        if(lines.size>1)issues.push('Learning archive number wraps: '+number.textContent);
      }
      for(const empty of document.querySelectorAll('.archive-empty')){
        const range=document.createRange();range.selectNodeContents(empty);
        const height=range.getBoundingClientRect().height;
        const style=getComputedStyle(empty);const line=parseFloat(style.lineHeight)||parseFloat(style.fontSize)*1.8;
        if(height>line*3)issues.push('Empty archive copy is trapped in an index column');
      }
      if(innerWidth<=800)for(const panel of document.querySelectorAll('.radio-section')){
        const style=getComputedStyle(panel);
        if(parseFloat(style.paddingLeft)<16||parseFloat(style.paddingRight)<16)issues.push('Radio framed panel lost its reading gutter');
      }
      return issues;
    });
    errors.push(...compositionIssues);
    if(scenario.brandCheck){
      const brand=await page.evaluate(()=>{const canvas=document.querySelector('[data-native-page]');return {background:getComputedStyle(canvas).backgroundColor,ink:getComputedStyle(canvas).color,font:getComputedStyle(document.querySelector('main h1')).fontFamily};});
      if(brand.background!=='rgb(23, 38, 52)'||brand.ink!=='rgb(240, 245, 251)'||!brand.font.includes('Arial'))errors.push('Native Site Brief brand tokens not applied: '+JSON.stringify(brand));
    }
    const check=await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth>innerWidth+2,
      scrollWidth:document.documentElement.scrollWidth,
      viewport:innerWidth,
      h1:document.querySelectorAll('main h1').length,
      articleCount:document.querySelector('[data-article-count]')?Number(document.querySelector('[data-article-count]').getAttribute('data-article-count')):null,
      yearVisible:!document.querySelector('.atlas-year')||getComputedStyle(document.querySelector('.atlas-year')).webkitTextStrokeColor!=='rgba(0, 0, 0, 0)',
      family:document.querySelector('[data-assembled-layout]')?.getAttribute('data-assembled-layout')||
        document.querySelector('[data-about-family]')?.getAttribute('data-about-family')||
        document.querySelector('[data-archive-family]')?.getAttribute('data-archive-family')||
        document.querySelector('[data-service-family]')?.getAttribute('data-service-family')||
        document.querySelector('[data-story-family]')?.getAttribute('data-story-family')
    }));
    const label=route?route.replaceAll('/','-').replace(/-$/,''):'home';
    const filename=slug+'-'+(scenario.variant?scenario.variant+'-':'')+label+'-'+width+'.jpg';
    await page.screenshot({path:visualOutput+'/'+filename,type:'jpeg',quality:56,fullPage:true,animations:'disabled',timeout:15000});
    visualRows.push({slug,route:'/'+route,width,http:response?.status(),...check,keyboardFocus,escapeNavigation,audioReady,errors,filename,variant:scenario.variant||'standard'});
    // Same colors/font/copy, preserving all geometric CSS and nested title markup.
    // Captures are comparison evidence, never a second template/export pipeline.
    if(!route&&!scenario.variant){
      const neutral=await page.addStyleTag({content:`body,body *,body *::before,body *::after{color:#222!important;background-color:transparent!important;background-image:none!important;border-color:#666!important;text-decoration-color:#666!important;font-family:Arial,sans-serif!important;box-shadow:none!important}body{background:#f5f5f5!important}main img,main [role="img"],.ll-owned-placeholder,.cu-owned-placeholder{background:#ddd!important;filter:grayscale(1)!important}main img{visibility:hidden!important}main .atlas-year{color:transparent!important;-webkit-text-stroke-color:#222!important}.student-pattern,.student-footer,body>header,body>footer{display:none!important}main [role="img"] *,main .ll-owned-placeholder *,main .cu-owned-placeholder *{visibility:hidden!important}`});
      await page.evaluate(()=>{const h=document.querySelector('main h1');if(h?.firstChild?.nodeType===3){h.dataset.originalCopy=h.firstChild.textContent;h.firstChild.textContent='一個人的觀察與整理';}h?.querySelectorAll('em,i,span').forEach(el=>{el.dataset.originalCopy=el.textContent;el.textContent='持續留下值得理解的事';});});
      const filename=slug+'-neutral-home-'+width+'.jpg';
      const safety=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
      await page.screenshot({path:visualOutput+'/'+filename,type:'jpeg',quality:56,fullPage:true,animations:'disabled'});
      visualRows.push({slug,route:'/',width,http:response?.status(),...check,...safety,keyboardFocus,escapeNavigation,audioReady,errors,filename,variant:'neutral'});
      await neutral.evaluate(el=>el.remove());
      await page.evaluate(()=>{const h=document.querySelector('main h1');if(h?.dataset.originalCopy)h.firstChild.textContent=h.dataset.originalCopy;h?.querySelectorAll('[data-original-copy]').forEach(el=>el.textContent=el.dataset.originalCopy);});
      // Long real-world CJK homepage title: mutate only the existing copy node.
      await page.evaluate(()=>{const h=document.querySelector('main h1');const walker=h&&document.createTreeWalker(h,NodeFilter.SHOW_TEXT);const text=walker?.nextNode();if(text){h.closest('[data-assembled-layout]')?.setAttribute('data-long-headline','true');text.textContent='把生活裡反覆出現的問題、閱讀線索與真實觀察整理成長期可以回看的個人網站，讓每一次思考與每一步實踐都有自己的位置';}});
      const stressName=slug+'-long-home-'+width+'.jpg';
      const stress=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,headlineFont:parseFloat(getComputedStyle(document.querySelector('main h1')).fontSize)}));
      if(width>800&&stress.headlineFont>60)errors.push('Long homepage title lost its responsive type scale: '+stress.headlineFont);
      await page.screenshot({path:visualOutput+'/'+stressName,type:'jpeg',quality:56,fullPage:true,animations:'disabled'});
      visualRows.push({slug,route:'/',width,http:response?.status(),...check,...stress,keyboardFocus,escapeNavigation,audioReady,errors,filename:stressName,variant:'long-home'});
    }
    await page.close();
  }
}

try{
  for(const kind of kinds){
    const plan={
      version:1,kind,layoutSlug:layouts.find(x=>x.kind===kind).slug,visualTheme:'paper',
      brand:{name:kind==='knowledge'?'測試知識站':'測試服務站',primaryColor:'#245E50',tagline:'測試文章與頁面',palette:{primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'}},
      navigation:(kind==='knowledge'?[{id:'articles',label:'文章'},{id:'about',label:'關於我'}]:[{id:'services',label:'服務'},{id:'about',label:'關於我'}]).map(x=>({...x,enabled:true})),
      primaryCta:kind==='knowledge'?{label:'閱讀文章',pageId:'articles'}:{label:'了解服務',pageId:'services'},
      content:{headline:'個人化首頁主標題',intro:'個人化介紹'},about:{bio:'這是獨立的關於頁介紹，包含真實學員資訊。',purpose:'我希望用個人網站保存長期作品與觀察。',approach:'以可驗證來源整理內容與方法。',background:'作品與資格請以實際證據補充。'},
      sectionPatterns:kind==='knowledge'?[{patternId:'featured-work',targetPage:'/',insertAfter:'首頁介紹後'},{patternId:'footer-editorial',targetPage:'site-wide',insertAfter:'所有頁面底部'}]:[{patternId:'trust-service-path',targetPage:'services',insertAfter:'服務介紹後'},{patternId:'footer-professional',targetPage:'site-wide',insertAfter:'所有頁面底部'}],notes:''
    };
    if(kind==='helper')plan.navigation.push(...['faq','booking','first-visit'].map(id=>({id,label:({'faq':'常見問題','booking':'聯絡','first-visit':'初次聯絡'})[id],enabled:true})));
    if(kind==='helper')plan.serviceFacts={scope:'協助來訪者釐清實際工作與生活選擇',exclusions:'不提供醫療診斷或藥物建議',method:'先討論需求，再說明合作流程',firstVisit:'先閱讀服務說明，再用公開聯絡方式詢問',duration:'依個別方案說明',price:'待站長確認',cancellation:'依站長公開政策',qualification:'尚未提供可查證資格',contact:'使用正式聯絡頁'};
    if(kind==='knowledge')plan.navigation.push({id:'page-custom-guide',label:'閱讀指南',enabled:true,parentId:'articles',path:'start-here/tools/'});
    const filename=join(root,kind+'.json'),site=join(root,kind);
    writeFileSync(filename,JSON.stringify(plan));
    execFileSync(process.execPath,['scripts/export-starter.mjs',filename,site],{stdio:'inherit'});
    assertStudentContext(site,JSON.parse(readFileSync(filename,'utf8')).layoutSlug);
    const releaseWorkflow=readFileSync(join(site,'.github/workflows/deploy.yml'),'utf8');
    if(!releaseWorkflow.includes("SITE_INDEXABLE: ${{ vars.SITE_INDEXABLE || 'false' }}"))throw Error('Approved production indexing variable is not forwarded into GitHub Pages build');
    const learnerPkg=JSON.parse(readFileSync(join(site,'package.json'),'utf8'));
    if(!learnerPkg.scripts?.['test:regressions'])throw Error('Learner ZIP exporter omitted cumulative validator regressions');
    execFileSync('npm',['run','test:regressions'],{cwd:site,stdio:'inherit'});
    const out=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8'));
    if(out.layoutSlug!==plan.layoutSlug||out.brand.primaryColor!=='#245E50'||out.navigation.length!==(kind==='knowledge'?3:5)||out.sectionPatterns.length!==2)throw Error('Config mismatch '+kind);
    // The two independently generated sites must contain genuinely different renderers,
    // not the same generic DOM with only a layout class or brand palette swapped.
    const selectedHome=readFileSync(join(site,'src/components/layouts/selected/Home.astro'),'utf8');
    const expectedMarker=kind==='knowledge'?'data-assembled-layout="field-notes"':'data-assembled-layout="clinician"';
    const structuralTokens=kind==='knowledge'
      ? ['field-frame','field-rail','field-ledger','field-question']
      : ['clinical-hero','clinical-fit','clinical-process','clinical-credentials'];
    if(!selectedHome.includes(expectedMarker)||structuralTokens.some(token=>!selectedHome.includes(token)))
      throw Error('Selected Layout did not produce its unique homepage composition: '+kind);
    if(kind==='knowledge'&&selectedHome.includes('clinical-fit')||kind==='helper'&&selectedHome.includes('field-rail'))
      throw Error('Two Layouts accidentally share an assembly renderer');
    if(kind==='knowledge'){
      const themed=structuredClone(plan);
      themed.brand.typography='clear-sans';
      themed.brand.imageStyle='documentary';
      themed.brand.heroImagePath='/images/my-field.png';
      themed.brand.heroImageAlt='我自己的授權觀察照片';
      const themedPlan=join(root,'brand-config.json'),themedSite=join(root,'brand-config');
      writeFileSync(themedPlan,JSON.stringify(themed));
      mkdirSync(join(root,'public/images'),{recursive:true});
      writeFileSync(join(root,'public/images/my-field.png'),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg==','base64'));
      execFileSync(process.execPath,['scripts/export-starter.mjs',themedPlan,themedSite],{stdio:'inherit'});
      assertStudentContext(themedSite,JSON.parse(readFileSync(themedPlan,'utf8')).layoutSlug);
      if(!existsSync(join(themedSite,'public/images/my-field.png')))throw Error('Licensed image was not copied to independent starter');
      const themedHome=readFileSync(join(themedSite,'src/components/layouts/selected/Home.astro'),'utf8');
      const themedCss=readFileSync(join(themedSite,'public/theme.css'),'utf8');
      if(!themedHome.includes('heroImagePath')||!themedCss.includes('--brand-image-filter:saturate(.68)')||!themedCss.includes('--brand-heading-font:"Noto Sans TC"'))
        throw Error('Brand font and licensed local image configuration not bound to assembled output');
    }
    const generatedCss=readFileSync(join(site,'public/theme.css'),'utf8');
    if(!generatedCss.includes('--brand-secondary:#58776C')||!generatedCss.includes('--brand-background:#F7F8F4'))throw Error('Generated palette tokens are missing');
    if(!existsSync(join(site,'src/pages/index.astro'))||!existsSync(join(site,'astro.config.mjs')))throw Error('Missing generated website');
    const navigation=readFileSync(join(site,'src/components/StudentNavigation.astro'),'utf8');
    if(!navigation.includes('student-navigation__submenu'))throw Error('Missing nested navigation');
    if(kind==='knowledge'&&!out.navigation.some(x=>x.parentId==='articles'))throw Error('Nested navigation lost');
    if(kind==='knowledge'&&(!out.navigation.some(x=>x.path==='start-here/tools/')||!navigation.includes('children.map(child=>')||!navigation.includes('href(child)')))throw Error('Custom nested path was not preserved');
    const selected=readFileSync(join(site,'src/components/SelectedPatterns.astro'),'utf8');
    const pageLayout=readFileSync(join(site,'src/layouts/SiteLayout.astro'),'utf8');
    if(!selected.includes('settings.sectionPatterns')||!pageLayout.includes('SelectedPatterns'))throw Error('Pattern was not integrated into generated pages');
    const aboutComponent=readFileSync(join(site,'src/components/layouts/selected/AboutSections.astro'),'utf8');
    if(!aboutComponent.includes("family==='"+plan.layoutSlug+"'"))throw Error('Missing first-direction About composition: '+plan.layoutSlug);
    const specialized=kind==='knowledge'?'ArticleArchive.astro':'ServiceSections.astro';
    const specializedSource=readFileSync(join(site,'src/components/layouts/selected',specialized),'utf8');
    if(!specializedSource.includes("family==='"+plan.layoutSlug+"'"))throw Error('Missing first-direction '+specialized+' family branch');
    if(kind==='knowledge'){
      const articleDir=join(site,'src/content/articles');
      mkdirSync(articleDir,{recursive:true});
      writeFileSync(join(articleDir,'qa-long-title.md'),[
        '---','title: 一篇談閱讀與實際生活中如何整理資訊的長文章標題——包含中文標點與不同長度的文字來驗證網站是否仍可閱讀',
        'description: 文章說明的實際內容測試，不是虛構見證。','publishedAt: 2026-10-12','draft: false','---',
        '## 第一個標題','真實內容版型與中英文混排的驗證。'
      ].join('\n'));
    }
    if(kind==='knowledge')for(let i=1;i<=7;i++)writeFileSync(join(site,'src/content/articles','qa-note-'+i+'.md'),['---','title: 測試筆記 '+i+'：不同長度的中文標題與觀察','description: QA 測試資料，不代表作者真實作品。','publishedAt: 2026-10-11','draft: false','---','這是文章數量與相鄰導覽的測試資料。'].join('\n'));
    if(kind==='knowledge'&&!existsSync(join(site,'src/pages/articles/index.astro')))throw Error('Knowledge articles missing');
    if(kind==='helper'&&existsSync(join(site,'src/pages/articles/index.astro')))throw Error('Unexpected helper articles route');
    if(process.env.FULL_STARTER_BUILD==='1'){
      execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
      // Run the same portable browser checker students receive, on both representative types.
      if(process.env.STUDENT_PORTABLE_QA!=='0')execFileSync('npm',['run','qa:responsive'],{cwd:site,stdio:'inherit',timeout:240000});
      await captureStudentSite(kind==='knowledge'?'field-notes':'clinician',kind,site);
      const homepageHtml=readFileSync(join(site,'dist/index.html'),'utf8');
      const firstAboutHtml=readFileSync(join(site,'dist/about/index.html'),'utf8');
      if(!firstAboutHtml.includes('data-about-family="'+plan.layoutSlug+'"'))throw Error('Built first-direction About lost selected Design Family');
      const firstSpecialized=readFileSync(join(site,'dist',kind==='knowledge'?'articles':'services','index.html'),'utf8');
      if(!firstSpecialized.includes(kind==='knowledge'?'data-archive-family="field-notes"':'data-service-family="clinician"'))throw Error('Built first-direction inner page lost Design Family');
      if(!homepageHtml.includes(kind==='knowledge'?'data-assembled-layout="field-notes"':'data-assembled-layout="clinician"'))
        throw Error('Built standalone homepage lost layout-specific DOM: '+kind);
      if(!existsSync(join(site,'dist/pagefind/pagefind.js')))throw Error('Pagefind static index was not generated');
      if(!existsSync(join(site,'dist/search/exact-zh.json')))throw Error('Search companion index was not generated');
      const search=JSON.parse(readFileSync(join(site,'dist/search/exact-zh.json'),'utf8'));
      if(search.version!==1||!Array.isArray(search.docs)||!search.docs.some(x=>x.url==='/'))throw Error('Search companion index is invalid');
      if(kind==='knowledge'&&!existsSync(join(site,'dist/start-here/tools/index.html')))throw Error('Custom nested page was not generated');
      execFileSync(process.execPath,[new URL('./audit-generated-links.mjs',import.meta.url).pathname,join(site,'dist')],{stdio:'inherit'});
    }
  }
  // Narrow assembly integration extension: build each second-direction renderer with
  // the same verified navigation/FAQ/article infrastructure, without new QA tooling.
  for(const [slug,kind] of [['essayist','knowledge'],['companion','helper'],['learning-lab','knowledge'],['curator','knowledge'],['radio-letter','knowledge'],['reading-atlas','knowledge'],['somatic','helper'],['coach','helper'],['collective','helper'],['trust-path','helper']]){
    const secondary={
      version:1,kind,layoutSlug:slug,visualTheme:'morning',
      brand:{name:'組裝測試網站',primaryColor:'#8A5A42',tagline:'版型獨立測試',typography:'balanced',imageStyle:'minimal'},
      navigation:(kind==='knowledge'?[{id:'articles',label:'文章',enabled:true},{id:'about',label:'關於',enabled:true}]:[{id:'services',label:'服務',enabled:true},{id:'about',label:'關於',enabled:true}]),
      primaryCta:kind==='knowledge'?{label:'閱讀文章',pageId:'articles'}:{label:'查看服務',pageId:'services'},
      sectionPatterns:[],content:{headline:'個人化首頁主標題',intro:'個人化介紹'},about:{bio:'這是獨立的關於頁介紹，包含真實學員資訊。',purpose:'我希望用個人網站保存長期作品與觀察。',approach:'以可驗證來源整理內容與方法。',background:'作品與資格請以實際證據補充。'},notes:''
    };
    if(kind==='helper')secondary.navigation.push(...['faq','booking','first-visit'].map(id=>({id,label:({'faq':'常見問題','booking':'聯絡','first-visit':'初次聯絡'})[id],enabled:true})));
    if(slug==='essayist'){
      secondary.brand.heroImagePath='/images/hero-image.png';
      secondary.brand.heroImageAlt='自帶圖片的測試示意';
      secondary.assets=[{path:'/images/hero-image.png',mime:'image/png',base64:'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg=='}];
    }
    if(slug==='reading-atlas')secondary.reading={records:[{month:'07',title:'自己讀過的一本書',note:'真實閱讀理由。'}],annualBook:{title:'自己選出的年度書',note:'具體選入原因。'}};
    if(kind==='helper')secondary.serviceFacts={scope:'協助來訪者釐清實際工作與生活選擇',exclusions:'不提供醫療診斷或藥物建議',method:'先討論需求，再說明合作流程',firstVisit:'先閱讀服務說明，再用公開聯絡方式詢問',duration:'依個別方案說明',price:'待站長確認',cancellation:'依站長公開政策',qualification:'尚未提供可查證資格',contact:'使用正式聯絡頁'};
    if(slug==='collective'){secondary.team=Array.from({length:3},(_,i)=>({name:'QA 測試成員 '+(i+1),role:'QA 角色示意，非真實資格',bio:'只用於資料傳入與版型驗證，不代表真實團隊。'}));secondary.events=[{title:'QA 版型測試活動',description:'只用於活動日期與真實連結欄位驗證，不代表正式活動。',date:'2026-10-20',url:'https://example.com/owned-event'}];}
    if(slug==='trust-path')secondary.serviceTiming=[{label:'QA 需求確認',minutes:10},{label:'QA 合作說明',minutes:20}];
    if(slug==='trust-path')secondary.serviceFacts={duration:'依實際方案而定',price:'請向服務者確認',cancellation:'依公布政策',qualification:'尚未提供可查證資格',contact:'請使用服務頁聯絡方式'};
    if(slug==='radio-letter'){
      secondary.media={episodeAudioPath:'/audio/owned-sample.wav',episodeTranscript:[{time:'00:00',text:'此為測試者提供的逐字稿。'}]};
      mkdirSync(join(root,'public/audio'),{recursive:true});
      writeFileSync(join(root,'public/audio/owned-sample.wav'),Buffer.from('UklGRqQ+AABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YYA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','base64'));
    }
    const filename=join(root,slug+'.json'),site=join(root,slug);
    writeFileSync(filename,JSON.stringify(secondary));
    execFileSync(process.execPath,['scripts/export-starter.mjs',filename,site,'--require-assembled'],{stdio:'inherit'});
    assertStudentContext(site,JSON.parse(readFileSync(filename,'utf8')).layoutSlug);
    const home=readFileSync(join(site,'src/components/layouts/selected/Home.astro'),'utf8');
    if(!home.includes('data-assembled-layout="'+slug+'"'))throw Error('Missing '+slug+' distinct Home renderer');
    if(!home.includes('config.content?.headline')||!home.includes('config.content?.intro'))throw Error('Student copy binding missing on '+slug);
    if(slug==='essayist'&&!existsSync(join(site,'public/images/hero-image.png')))throw Error('Browser-selected image was not extracted into standalone project');
    if(slug==='radio-letter'){
      if(!existsSync(join(site,'public/audio/owned-sample.wav')))throw Error('Missing copied licensed podcast audio');
      const media=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8')).media;
      if(media.episodeTranscript[0].text!=='此為測試者提供的逐字稿。')throw Error('Lost transcript text');
      if(!home.includes('<audio controls')||!home.includes('radio-transcript'))throw Error('Missing accessible radio player or transcript');
    }
    if(slug==='reading-atlas'&&JSON.parse(readFileSync(join(site,'site.config.json'),'utf8')).reading.records[0].title!=='自己讀過的一本書')throw Error('Reading records not exported');
    if(slug==='trust-path'&&JSON.parse(readFileSync(join(site,'site.config.json'),'utf8')).serviceFacts.duration!=='依實際方案而定')throw Error('Service facts not exported');
    if(slug==='reading-atlas'&&(!home.includes('data-atlas-month')||!home.includes('data-record-month')||!home.includes('aria-pressed')))throw Error('Reading atlas month filters incomplete');
    if(slug==='trust-path'&&(!home.includes('trust-route')||!home.includes('href={\'#\'+id}')||!home.includes('trust-unverified')))throw Error('Trust path stations or unverified details missing');
    // Exercise student-owned content rather than the default placeholder-only empty pages.
    // A deliberately long CJK title catches broken template bindings and overflow regressions.
    const longTitle='一篇談閱讀與實際生活中如何整理資訊的長文章標題——包含中文標點與不同長度的文字來驗證網站是否仍可閱讀';
    if(kind==='knowledge'){
      const articleDir=join(site,'src/content/articles');
      mkdirSync(articleDir,{recursive:true});
      writeFileSync(join(articleDir,'qa-long-title.md'),[
        '---','title: '+longTitle,'description: 這段文章摘要是實際內容測試，不是虛構的使用者見證。',
        'publishedAt: 2026-10-12','draft: false','---',
        '## 第一個標題','這是學員撰寫的文章，包含中文、標點與一段比較長的文字。',
        '## 第二個標題',...Array.from({length:12},(_,i)=>'測試段落 '+(i+1)+'：這是長篇中文內容與 English terms 的版型壓力測試，保留來源與閱讀脈絡，不虛構研究成果。'), '| 欄位 | 說明 |','| --- | --- |','| 資料來源 | 站長提供的實際內容 |','```text','https://example.com/'+ 'long-path-'.repeat(25),'```'
      ].join('\n'));
      for(let i=1;i<=7;i++)writeFileSync(join(articleDir,'qa-note-'+i+'.md'),['---','title: 測試筆記 '+i+'：不同長度的中文標題與觀察','description: QA 測試資料，不代表作者真實作品。','publishedAt: 2026-10-11','draft: false','---','這是文章數量與相鄰導覽的測試資料。'].join('\n'));
      writeFileSync(join(articleDir,'qa-hidden.md'),[
        '---','title: 不應公開的草稿','description: 草稿範例','publishedAt: 2026-10-10','draft: true','---','這段不能出現在公開搜尋。'
      ].join('\n'));
    }
    const aboutPage=readFileSync(join(site,'src/pages/[...page].astro'),'utf8');
    if(!aboutPage.includes('AboutSections'))throw Error('Missing About page composition in '+slug);
    if(kind==='knowledge'){
      const sourceDetail=readFileSync(join(site,'src/pages/articles/[slug].astro'),'utf8');
      if(!sourceDetail.includes('ArticleDetail'))throw Error('Missing article detail composition in '+slug);
    }
    const aboutSource=readFileSync(join(site,'src/components/layouts/selected/AboutSections.astro'),'utf8');
    if(!aboutSource.includes("family==='"+slug+"'"))throw Error('No dedicated About composition branch for '+slug);
    if(kind==='knowledge'){
      const archive=readFileSync(join(site,'src/components/layouts/selected/ArticleArchive.astro'),'utf8');
      if(!archive.includes("family==='"+slug+"'"))throw Error('No dedicated knowledge archive DOM for '+slug);
    }else{
      const service=readFileSync(join(site,'src/components/layouts/selected/ServiceSections.astro'),'utf8');
      if(!service.includes("family==='"+slug+"'"))throw Error('No dedicated helper service DOM for '+slug);
    }
    if(process.env.FULL_STARTER_BUILD==='1'){
      execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
      await captureStudentSite(slug,kind,site);
      if(kind==='helper')for(const route of ['faq','booking','first-visit']){const routeHtml=readFileSync(join(site,'dist',route,'index.html'),'utf8');if(!routeHtml.includes('data-service-family="'+slug+'"'))throw Error('Lost helper '+route+' family: '+slug);if(slug!=='trust-path'&&!routeHtml.includes(route==='faq'?'協助來訪者釐清實際工作與生活選擇':'先閱讀服務說明，再用公開聯絡方式詢問'))throw Error('Lost true facts in '+slug+' '+route);}
      const html=readFileSync(join(site,'dist/index.html'),'utf8');
      if(!html.includes('data-assembled-layout="'+slug+'"'))throw Error('Lost assembled '+slug+' DOM');
      if(!html.includes('個人化首頁主標題')||!html.includes('個人化介紹'))throw Error('Student copy missing from built '+slug+' page');
      if(slug==='collective'&&(!html.includes('QA 測試成員 3')||!html.includes('QA 版型測試活動')||!html.includes('2026-10-20')))throw Error('Lost owned collective content');
      if(slug==='trust-path'&&(!html.includes('QA 需求確認')||!html.includes('QA 合作說明')||!html.includes('30 分鐘')))throw Error('Lost provided proportional timing');
      const aboutHtml=readFileSync(join(site,'dist/about/index.html'),'utf8');
      if(!aboutHtml.includes('data-about-family="'+slug+'"'))throw Error('Dedicated About did not render for '+slug);
      if(!aboutHtml.includes('這是獨立的關於頁介紹')||!aboutHtml.includes('我希望用個人網站保存長期作品與觀察'))throw Error('Owned About copy missing: '+slug);
      const inner=kind==='knowledge'?'articles':'services';
      const innerHtml=readFileSync(join(site,'dist',inner,'index.html'),'utf8');
      if(kind==='knowledge'){
        if(!innerHtml.includes('data-archive-family="'+slug+'"')||!innerHtml.includes(longTitle))throw Error('Published long article missing from '+slug+' unique archive');
        if(innerHtml.includes('不應公開的草稿'))throw Error('Draft article visible in '+slug+' archive');
        const articleHtml=readFileSync(join(site,'dist/articles/qa-long-title/index.html'),'utf8');
        if(!articleHtml.includes('data-story-family="'+slug+'"')||!articleHtml.includes(longTitle)||!articleHtml.includes('第一個標題'))throw Error('Long article lost content or layout family: '+slug);
        if(existsSync(join(site,'dist/articles/qa-hidden/index.html')))throw Error('Draft article rendered for '+slug);
      }else{
        if(!innerHtml.includes('data-service-family="'+slug+'"'))throw Error('Dedicated service composition missing: '+slug);
        if(slug!=='trust-path'&&!innerHtml.includes('協助來訪者釐清實際工作與生活選擇'))throw Error('Student-supplied service facts lost in '+slug);
      }

    }
  }
  if(process.env.FULL_STARTER_BUILD==='1'){
    for(const layout of layouts){
      const site=join(root,layout.slug===layouts.find(x=>x.kind===layout.kind).slug?layout.kind:layout.slug);
      if(layout.kind==='knowledge'){
        const dir=join(site,'src/content/articles');
        for(const name of (await import('node:fs')).readdirSync(dir))if(name.endsWith('.md')&&name!=='qa-long-title.md')rmSync(join(dir,name));
        rmSync(join(site,'dist'),{recursive:true,force:true});
        execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
        await captureStudentSite(layout.slug,layout.kind,site,{variant:'single',routes:['','articles/']});
        rmSync(join(dir,'qa-long-title.md'),{force:true});
        rmSync(join(site,'dist'),{recursive:true,force:true});
        execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
        execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
        await captureStudentSite(layout.slug,layout.kind,site,{variant:'empty',routes:['','articles/']});
        const archive=readFileSync(join(site,'dist/articles/index.html'),'utf8');
        if(!archive.includes('data-archive-family="'+layout.slug+'"'))throw Error('Empty archive lost family '+layout.slug);
        for(const name of ['index.html','articles/index.html','rss.xml','sitemap.xml','search/exact-zh.json']){
          const output=readFileSync(join(site,'dist',name),'utf8');
          if(output.includes('qa-long-title')||output.includes('一篇談閱讀')||output.includes('qa-note-'))throw Error('Withdrawn last article survived empty rebuild in '+layout.slug+' '+name);
        }
        if(existsSync(join(site,'dist/articles/qa-long-title/index.html')))throw Error('Withdrawn direct article route survived: '+layout.slug);
      }else{
        const filename=join(site,'site.config.json');
        const settings=JSON.parse(readFileSync(filename,'utf8'));
        delete settings.serviceFacts;settings.team=[];settings.events=[];settings.serviceTiming=[];
        writeFileSync(filename,JSON.stringify(settings));
        rmSync(join(site,'dist'),{recursive:true,force:true});
        execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
        execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
        await captureStudentSite(layout.slug,layout.kind,site,{variant:'empty-facts'});
      }
    }
  }
  if(process.env.FULL_STARTER_BUILD==='1')for(const layout of layouts.filter(item=>item.kind==='helper')){
    // Preserve optional Articles for every helper family, not only the default clinician.
    const plan=JSON.parse(readFileSync(join(root,'helper.json'),'utf8'));
    plan.layoutSlug=layout.slug;
    plan.navigation.push({id:'articles',label:'文章',enabled:true});
    const filename=join(root,layout.slug+'-helper-articles.json'),site=join(root,layout.slug+'-helper-articles');
    writeFileSync(filename,JSON.stringify(plan));
    execFileSync(process.execPath,['scripts/export-starter.mjs',filename,site],{stdio:'inherit'});
    assertStudentContext(site,JSON.parse(readFileSync(filename,'utf8')).layoutSlug);
    writeFileSync(join(site,'src/content/articles/qa-helper-note.md'),['---','title: QA 服務者公開文章','description: 文章系統驗證資料，不代表專業建議。','publishedAt: 2026-10-14','draft: false','---','這是知識與服務網站共用文章功能的驗證。'].join('\n'));
    writeFileSync(join(site,'src/content/articles/qa-helper-draft.md'),['---','title: QA 未公開草稿','description: 不得公開','publishedAt: 2026-10-14','draft: true','---','不可公開。'].join('\n'));
    execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
    execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
    execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
    const html=readFileSync(join(site,'dist/articles/index.html'),'utf8');
    if(!html.includes('QA 服務者公開文章')||html.includes('QA 未公開草稿')||!html.includes('data-article-count="1"'))throw Error('Optional helper article archive lost actual published content');
    if(existsSync(join(site,'dist/articles/qa-helper-draft/index.html')))throw Error(layout.slug+' exposed helper draft route');
    const detail=readFileSync(join(site,'dist/articles/qa-helper-note/index.html'),'utf8');
    if(!detail.includes('data-site-family="'+layout.slug+'"'))throw Error(layout.slug+' lost helper article family');
    await captureStudentSite(layout.slug,'helper',site,{variant:'optional-articles',routes:['articles/','articles/qa-helper-note/']});
  }
  if(process.env.FULL_STARTER_BUILD==='1')for(const layout of expansion){
    const {slug,kind}=layout,native=layout.engine==='native-expansion';
    const plan=JSON.parse(readFileSync('docs/art-direction/fixtures/'+(kind==='knowledge'?'subject-atlas':'practice-compass')+'.json','utf8'));
    plan.layoutSlug=slug;
    // 殼的 --accent（palette.accent）與 tokens.css 的別名 --accent（primary）意義不同；用 accent≠primary 的色票才分辨得出載入後有沒有被改掉。
    plan.brand={...plan.brand,primaryColor:'#245E50',palette:{primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'}};
    if(native){
      delete plan.contentDirectory;
      plan.about={bio:'QA 本人提供的自我介紹',purpose:'QA 寫作目的',approach:'QA 工作方式',background:'QA 背景尚未核實'};
      plan.services=[{slug:'owned-service',title:'QA 自有服務',summary:'QA 服務說明，非成果宣稱',published:true,body:['QA 詳情正文'],scope:'QA 服務範圍',bookingUrl:'https://booking.example.test/owned-service'},{slug:'second-service',title:'QA 第二項服務',summary:'QA 第二項說明',published:true},{slug:'hidden-service',title:'QA 隱藏服務',published:false}];
    }
    if(!native)cpSync('docs/art-direction/fixtures/content',join(root,'content'),{recursive:true});
    if(!plan.navigation.some(n=>n.id==='articles'))plan.navigation.push({id:'articles',label:'文章',enabled:true});
    const featured={title:'QA 精選作品與文章',description:'QA 提供的作品資料，供版型測試，非真實客戶成果。',items:[{title:'QA 一份可以公開的作品與長中文標題：讓作品說明在手機上也能完整閱讀',description:'QA 自行提供的測試文字；沒有網址的作品保留為文字。'},{title:'QA 第二份作品',description:'QA 真實資料接線測試',url:'https://example.test/work'}],articleSlugs:[native?'owned-note':'real-note',native?'hidden-note':'legacy-draft'],action:{label:'閱讀完整指南',pageId:'page-guide'}};
    const trust={title:'QA 合作範圍與下一步',description:'QA 已提供的服務範圍；並非真實專業服務。',suitable:['QA 希望先了解工作方式與適用範圍'],notSuitable:['QA 需要網站服務範圍以外的協助'],notice:'QA 測試說明；無即時處理服務。',format:'QA 依雙方確認方式進行',policy:'QA 依事先公開政策確認',action:{label:'先閱讀服務資訊',pageId:'services'}};
    plan.sectionPatterns=[
      {patternId:kind==='helper'?'trust-service-path':'featured-work',targetPage:'/',insertAfter:'after-intro',content:kind==='helper'?trust:featured},
      {patternId:'featured-work',targetPage:'about',insertAfter:'page-end',content:featured},
      {patternId:'featured-work',targetPage:'page-guide',insertAfter:'主要內容之後',content:featured},
      {patternId:kind==='helper'?'trust-service-path':'featured-work',targetPage:kind==='helper'?'services':'articles',insertAfter:'page-end',content:kind==='helper'?trust:featured},
      {patternId:'footer-editorial',targetPage:'site-wide',insertAfter:'每頁主要內容之後'},
      ...(kind==='helper'?[{patternId:'featured-work',targetPage:'articles',insertAfter:'page-end',content:featured}]:[])
    ];
    const fixture=join(root,slug+'.json'),site=join(root,'expanded-'+slug);writeFileSync(fixture,JSON.stringify(plan));
    execFileSync(process.execPath,['scripts/export-starter.mjs',fixture,site,'--require-assembled'],{stdio:'inherit'});
    assertStudentContext(site,JSON.parse(readFileSync(fixture,'utf8')).layoutSlug);
    if(native){
      const dir=join(site,'src/content/articles');mkdirSync(dir,{recursive:true});
      const note=(title,draft,body)=>['---','title: '+title,'description: QA 內容描述','publishedAt: 2026-10-15','draft: '+draft,'---',body].join('\n');
      writeFileSync(join(dir,'owned-note.md'),note('QA 長中文文章標題：用真實內容來檢查每一款版型的閱讀動線、索引、詳細頁與導覽是否完整',false,'## QA 正文標題\n\nQA 正文唯一識別。 nativewithdrawuniquetoken\n\n'+'長篇中文與 English terms。'.repeat(300)));
      writeFileSync(join(dir,'second-note.md'),note('QA 第二篇文章',false,'QA 第二篇正文'));
      writeFileSync(join(dir,'hidden-note.md'),note('QA 隱藏文章',true,'QA 草稿不得公開'));
    }
    const build=()=>execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
    execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});build();
    execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
    checkShellSource(site);
    // 休眠／碰撞掃描：建置後實際載入的 CSS，A 類（載入 Token 才生效的引用）必須為空
    {const audit=auditDist(join(site,'dist'),readFileSync(join(site,'public/tokens.css'),'utf8')+'\n'+readFileSync(join(site,'public/theme.css'),'utf8'));assertShellVars(audit,slug);
     const temp=temporaryUsed(audit);if(temp.length)console.log('NOTICE '+slug+' 使用暫時白名單（須由後續案移除）：'+temp.join('、'));}
    {const tokenCss=readFileSync(join(site,'public/tokens.css'),'utf8')+'\n'+readFileSync(join(site,'public/theme.css'),'utf8');
     const rt=await auditReferencedRuntime(join(site,'dist'),tokenCss);
     if(rt.violations.length)throw Error(slug+' 載入 Token 後會被啟用的引用（沒有 Token 時算不出值）：'+rt.violations.slice(0,6).map(v=>v.selector+' '+v.name+' @'+v.route+' '+v.width).join('；'));}
    await checkShellRuntime(join(site,'dist'),plan.brand.palette,{probe:slug==='practice-compass'?{selector:'.fit-grid article:last-child',prop:'borderTopColor'}:undefined});
    let routes=kind==='knowledge'?['','articles/',native?'articles/owned-note/':'articles/real-note/','topics/','topics/method/','about/','search/']:['','services/','about/','faq/','contact/','privacy/','search/'];
    if(native&&kind==='helper')routes.push('services/owned-service/','services/second-service/','articles/','articles/owned-note/');
    routes.push('guides/first/');
    if(kind==='helper'&&!routes.includes('articles/'))routes.push('articles/');
    const patternCheck={'':[kind==='helper'?'trust-service-path':'featured-work'],'about/':['featured-work'],'guides/first/':['featured-work'],[kind==='helper'?'services/':'articles/']:[kind==='helper'?'trust-service-path':'featured-work']};
    if(kind==='helper')patternCheck['articles/']=['featured-work'];
    for(const [route,expected] of Object.entries(patternCheck)){
      const html=readFileSync(join(site,'dist',route,'index.html'),'utf8');
      if(/class="student-pattern(?:\s|")/.test(html))throw Error('Legacy placeholder still rendered: '+slug+' '+route);
      if(route==='guides/first/'&&html.includes('class="native-service-facts"'))throw Error('Unrelated service facts on custom page: '+slug);
      for(const id of expected)if(!html.includes('data-section-pattern="'+id+'"'))throw Error('Missing actual Pattern '+slug+' '+route+' '+id);
      if((html.match(/<footer[\s>]/g)??[]).length!==1)throw Error('Selected footer duplicated or lost: '+slug+' '+route);
    }
    await captureStudentSite(slug,kind,site,{routes,patternCheck,searchState:native?'published':undefined,ctaCheck:native?{label:plan.primaryCta.label,href:'/'+plan.primaryCta.pageId+'/'}:undefined});
    if(native){
      const archive=readFileSync(join(site,'dist/articles/index.html'),'utf8');
      for(const id of ['owned-note','second-note'])if(!archive.includes('href="/articles/'+id+'/"'))throw Error('Native published article lacks archive link: '+slug+' '+id);
      const home=readFileSync(join(site,'dist/index.html'),'utf8');
      for(const value of [plan.brand.name,plan.content.headline,plan.content.intro])if(!home.includes(value))throw Error('Native homepage lost owned copy: '+slug+' '+value);
      if(kind==='helper'){const service=readFileSync(join(site,'dist/services/owned-service/index.html'),'utf8');for(const value of ['QA 詳情正文','QA 服務範圍','https://booking.example.test/owned-service'])if(!service.includes(value))throw Error('Native service lost real facts: '+slug+' '+value);}
      const about=readFileSync(join(site,'dist/about/index.html'),'utf8');
      for(const value of Object.values(plan.about))if(!about.includes(value))throw Error('Native About lost owned field: '+slug+' '+value);
      if(existsSync(join(site,'dist/articles/hidden-note/index.html'))||existsSync(join(site,'dist/services/hidden-service/index.html')))throw Error('Native draft route leaked: '+slug);
      for(const path of ['index.html','articles/index.html','rss.xml','sitemap.xml','search/exact-zh.json']){
        const html=readFileSync(join(site,'dist',path),'utf8');if(html.includes('QA 隱藏文章')||html.includes('hidden-note')||html.includes('hidden-service'))throw Error('Native draft leaked: '+slug+' '+path);
      }
      const detail=readFileSync(join(site,'dist/articles/owned-note/index.html'),'utf8');if(!detail.includes('QA 正文唯一識別'))throw Error('Native article lost actual body: '+slug);
      const dir=join(site,'src/content/articles');rmSync(join(dir,'second-note.md'));build();
      await captureStudentSite(slug,kind,site,{variant:'single',routes:kind==='knowledge'?['','articles/']:['articles/']});
      rmSync(join(dir,'owned-note.md'));build();
      await captureStudentSite(slug,kind,site,{variant:'empty',routes:kind==='knowledge'?['','articles/']:['articles/'],searchState:'withdrawn'});
      for(const path of ['index.html','articles/index.html','rss.xml','sitemap.xml','search/exact-zh.json'])if(/owned-note|second-note|QA 正文唯一識別/.test(readFileSync(join(site,'dist',path),'utf8')))throw Error('Native withdrawn article survived cached build: '+slug+' '+path);
      if(kind==='knowledge'&&/>閱讀主文|>閱讀 →/.test(readFileSync(join(site,'dist/articles/index.html'),'utf8')))throw Error('Empty native archive shows a nonexistent featured article: '+slug);
      if(existsSync(join(site,'dist/articles/owned-note/index.html')))throw Error('Native withdrawn direct route survived: '+slug);
      if(kind==='helper'){
        const file=join(site,'site.config.json'),config=JSON.parse(readFileSync(file,'utf8'));
        config.services=config.services.filter(s=>s.slug==='owned-service');writeFileSync(file,JSON.stringify(config));build();
        await captureStudentSite(slug,kind,site,{variant:'single-service',routes:['','services/']});
        config.services=[];writeFileSync(file,JSON.stringify(config));build();
        await captureStudentSite(slug,kind,site,{variant:'empty-service',routes:['','services/']});
        if(existsSync(join(site,'dist/services/owned-service/index.html'))||readFileSync(join(site,'dist/sitemap.xml'),'utf8').includes('owned-service'))throw Error('Withdrawn service survived rebuild: '+slug);
      }
      const brandedFile=join(site,'site.config.json'),branded=JSON.parse(readFileSync(brandedFile,'utf8'));
      branded.sectionPatterns.find(p=>p.targetPage==='/').insertAfter='page-end';
      branded.primaryCta={pageId:'page-guide',label:'先看我的合作與閱讀指南'};
      branded.brand.typography='clear-sans';branded.brand.palette={primary:'#9FDBFF',secondary:'#416780',accent:'#E0B778',background:'#172634',text:'#F0F5FB'};
      writeFileSync(brandedFile,JSON.stringify(branded));build();
      await captureStudentSite(slug,kind,site,{variant:'brand',routes:['','about/'],brandCheck:true,ctaCheck:{label:branded.primaryCta.label,href:'/guides/first/'}});
    }
  }
  // Real-sized, self-authored calibration fixtures. These are not client photos
  // or a claim of real-image art-direction approval. Reuse the same capture flow.
  if(process.env.FULL_STARTER_BUILD==='1')for(const layout of expansion){
    const {slug,kind}=layout;
    const plan=JSON.parse(readFileSync('docs/art-direction/fixtures/'+(kind==='knowledge'?'subject-atlas':'practice-compass')+'.json','utf8'));
    delete plan.contentDirectory;plan.layoutSlug=slug;
    plan.about={bio:'QA 自有圖像配置',purpose:'QA 目的',approach:'QA 方式',background:'QA 背景'};
    plan.brand.logoPath='/images/brand-logo.png';plan.brand.heroImagePath='/images/hero-image.png';plan.brand.heroImageAlt='QA 自製比例與裁切校準圖';plan.brand.imageStyle='documentary';plan.brand.imageFit='cover';plan.brand.imagePosition='top';
    plan.assets=[{path:plan.brand.logoPath,mime:'image/png',base64:readFileSync('docs/art-direction/fixtures/assets/owned-logo.png').toString('base64')},{path:plan.brand.heroImagePath,mime:'image/png',base64:readFileSync('docs/art-direction/fixtures/assets/owned-landscape.png').toString('base64')}];
    plan.sectionPatterns=[{patternId:'featured-work',targetPage:'/',insertAfter:'page-end',content:{title:'QA 頁尾前的精選作品',items:[{title:'QA 作品',description:'QA 圖片與區段同頁的組裝檢查'}]}}];
    plan.layoutContent={headings:Object.fromEntries(Object.keys(headingFields[slug]).map(key=>[key,'QA 可編輯段落標題']))};
    const fixture=join(root,'owned-'+slug+'.json'),site=join(root,'owned-'+slug);writeFileSync(fixture,JSON.stringify(plan));
    execFileSync(process.execPath,['scripts/export-starter.mjs',fixture,site,'--require-assembled'],{stdio:'inherit'});
    assertStudentContext(site,JSON.parse(readFileSync(fixture,'utf8')).layoutSlug);
    for(const path of ['images/brand-logo.png','images/hero-image.png'])if(!existsSync(join(site,'public',path)))throw Error('Owned uploaded image not copied: '+slug+' '+path);
    execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
    execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
    await captureStudentSite(slug,kind,site,{variant:'owned-landscape',routes:['','about/'],imageCheck:{fit:'cover',position:'50% 0%',heading:Object.keys(headingFields[slug]).length>0}});
    const file=join(site,'site.config.json'),settings=JSON.parse(readFileSync(file,'utf8'));settings.brand.imageFit='contain';settings.brand.imagePosition='bottom';writeFileSync(file,JSON.stringify(settings));
    cpSync('docs/art-direction/fixtures/assets/owned-portrait.png',join(site,'public/images/hero-image.png'));
    execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
    await captureStudentSite(slug,kind,site,{variant:'owned-portrait',routes:['','about/'],imageCheck:{fit:'contain',position:'50% 100%',heading:Object.keys(headingFields[slug]).length>0}});
  }
  console.log('Starter exporter checks passed: twelve established assemblies; FULL mode adds thirteen in-progress adapters');
}finally{
 if(visualEnabled){
  const summary={total:visualRows.length,failedHttp:visualRows.filter(x=>x.http!==200),overflow:visualRows.filter(x=>x.overflow),errors:visualRows.filter(x=>x.errors.length),noFamily:visualRows.filter(x=>x.family!==x.slug),heading:visualRows.filter(x=>x.h1!==1),articleCounts:visualRows.filter(x=>(x.route==='/articles/'||(x.route==='/'&&expansion.some(d=>d.slug===x.slug&&d.kind==='knowledge')))&&((x.variant==='empty'&&x.articleCount!==0)||(x.variant==='single'&&x.articleCount!==1))),keyboard:visualRows.filter(x=>!x.keyboardFocus||!x.escapeNavigation),invisibleMasthead:visualRows.filter(x=>x.yearVisible===false)};
  writeFileSync(visualOutput+'/results.json',JSON.stringify({summary,rows:visualRows},null,2));
  const cards=visualRows.map(x=>'<article><h2>'+escapeHtml(x.slug)+' / '+escapeHtml(x.route)+' / '+x.width+'px</h2><p>HTTP '+x.http+' · overflow '+x.overflow+' · family '+escapeHtml(x.family)+'</p><a href="'+x.filename+'"><img loading="lazy" src="'+x.filename+'" alt="'+escapeHtml(x.slug+' '+x.route)+'"/></a></article>').join('');
  writeFileSync(visualOutput+'/index.html','<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Independent Student Site Visual QA</title><style>body{font:16px/1.6 system-ui;max-width:1320px;margin:auto;padding:20px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px}article{border:1px solid #aaa;padding:12px;min-width:0}img{max-width:100%;height:auto}</style><h1>Independent student sites / responsive pages</h1><p>Rows '+summary.total+' · HTTP failures '+summary.failedHttp.length+' · overflow '+summary.overflow.length+' · browser errors '+summary.errors.length+' · wrong families '+summary.noFamily.length+'</p><a href="results.json">Full results</a><main>'+cards+'</main></html>');
  console.log('Student visual QA summary:',JSON.stringify(Object.fromEntries(Object.entries(summary).map(([key,val])=>[key,Array.isArray(val)?val.length:val]))));
  for(const [type,issues] of [['OVERFLOW',summary.overflow],['HTTP',summary.failedHttp],['RUNTIME',summary.errors],['FAMILY',summary.noFamily],['MASTHEAD',summary.invisibleMasthead],['HEADING',summary.heading],['ARTICLE_COUNT',summary.articleCounts],['KEYBOARD',summary.keyboard]]){
    for(const issue of issues.slice(0,20))console.log('STUDENT_VISUAL_'+type,JSON.stringify(issue));
  }
  await visualBrowser?.close();
  if(summary.failedHttp.length||summary.overflow.length||summary.errors.length||summary.noFamily.length||summary.invisibleMasthead.length||summary.heading.length||summary.keyboard.length||summary.articleCounts.length)process.exitCode=1;
 }
 rmSync(root,{recursive:true,force:true});
}
