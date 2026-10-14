import {mkdtempSync,readFileSync,existsSync,writeFileSync,rmSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import layouts from '../src/data/layout-directions.json' with {type:'json'};
const root=mkdtempSync(join(tmpdir(),'astro-starter-test-'));
const kinds=['knowledge','helper'];
try{
  for(const kind of kinds){
    const plan={
      version:1,kind,layoutSlug:layouts.find(x=>x.kind===kind).slug,visualTheme:'paper',
      brand:{name:kind==='knowledge'?'測試知識站':'測試服務站',primaryColor:'#245E50',tagline:'測試文章與頁面',palette:{primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'}},
      navigation:(kind==='knowledge'?[{id:'articles',label:'文章'},{id:'about',label:'關於我'}]:[{id:'services',label:'服務'},{id:'about',label:'關於我'}]).map(x=>({...x,enabled:true})),
      primaryCta:kind==='knowledge'?{label:'閱讀文章',pageId:'articles'}:{label:'了解服務',pageId:'services'},
      sectionPatterns:kind==='knowledge'?[{patternId:'featured-work',targetPage:'/',insertAfter:'首頁介紹後'},{patternId:'footer-editorial',targetPage:'site-wide',insertAfter:'所有頁面底部'}]:[{patternId:'trust-service-path',targetPage:'services',insertAfter:'服務介紹後'},{patternId:'footer-professional',targetPage:'site-wide',insertAfter:'所有頁面底部'}],notes:''
    };
    if(kind==='knowledge')plan.navigation.push({id:'page-custom-guide',label:'閱讀指南',enabled:true,parentId:'articles',path:'start-here/tools/'});
    const filename=join(root,kind+'.json'),site=join(root,kind);
    writeFileSync(filename,JSON.stringify(plan));
    execFileSync(process.execPath,['scripts/export-starter.mjs',filename,site],{stdio:'inherit'});
    const releaseWorkflow=readFileSync(join(site,'.github/workflows/deploy.yml'),'utf8');
    if(!releaseWorkflow.includes("SITE_INDEXABLE: ${{ vars.SITE_INDEXABLE || 'false' }}"))throw Error('Approved production indexing variable is not forwarded into GitHub Pages build');
    const learnerPkg=JSON.parse(readFileSync(join(site,'package.json'),'utf8'));
    if(!learnerPkg.scripts?.['test:regressions'])throw Error('Learner ZIP exporter omitted cumulative validator regressions');
    execFileSync('npm',['run','test:regressions'],{cwd:site,stdio:'inherit'});
    const out=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8'));
    if(out.layoutSlug!==plan.layoutSlug||out.brand.primaryColor!=='#245E50'||out.navigation.length!==(kind==='knowledge'?3:2)||out.sectionPatterns.length!==2)throw Error('Config mismatch '+kind);
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
      if(!existsSync(join(themedSite,'public/images/my-field.png')))throw Error('Licensed image was not copied to independent starter');
      const themedHome=readFileSync(join(themedSite,'src/components/layouts/selected/Home.astro'),'utf8');
      const themedCss=readFileSync(join(themedSite,'public/site.css'),'utf8');
      if(!themedHome.includes('heroImagePath')||!themedCss.includes('--brand-image-filter:saturate(.68)')||!themedCss.includes('--brand-heading-font:"Noto Sans TC"'))
        throw Error('Brand font and licensed local image configuration not bound to assembled output');
    }
    const generatedCss=readFileSync(join(site,'public/site.css'),'utf8');
    if(!generatedCss.includes('--brand-secondary:#58776C')||!generatedCss.includes('--brand-background:#F7F8F4'))throw Error('Generated palette tokens are missing');
    if(!existsSync(join(site,'src/pages/index.astro'))||!existsSync(join(site,'astro.config.mjs')))throw Error('Missing generated website');
    const navigation=readFileSync(join(site,'src/components/StudentNavigation.astro'),'utf8');
    if(!navigation.includes('student-navigation__submenu'))throw Error('Missing nested navigation');
    if(kind==='knowledge'&&!out.navigation.some(x=>x.parentId==='articles'))throw Error('Nested navigation lost');
    if(kind==='knowledge'&&(!out.navigation.some(x=>x.path==='start-here/tools/')||!navigation.includes('child.path??child.id')))throw Error('Custom nested path was not preserved');
    const selected=readFileSync(join(site,'src/components/SelectedPatterns.astro'),'utf8');
    const pageLayout=readFileSync(join(site,'src/layouts/SiteLayout.astro'),'utf8');
    if(!selected.includes('settings.sectionPatterns')||!pageLayout.includes('SelectedPatterns'))throw Error('Pattern was not integrated into generated pages');
    if(kind==='knowledge'&&!existsSync(join(site,'src/pages/articles/index.astro')))throw Error('Knowledge articles missing');
    if(kind==='helper'&&existsSync(join(site,'src/pages/articles/index.astro')))throw Error('Unexpected helper articles route');
    if(process.env.FULL_STARTER_BUILD==='1'){
      execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
      const homepageHtml=readFileSync(join(site,'dist/index.html'),'utf8');
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
      sectionPatterns:[],notes:''
    };
    if(slug==='essayist'){
      secondary.brand.heroImagePath='/images/hero-image.png';
      secondary.brand.heroImageAlt='自帶圖片的測試示意';
      secondary.assets=[{path:'/images/hero-image.png',mime:'image/png',base64:'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg=='}];
    }
    if(slug==='reading-atlas')secondary.reading={records:[{month:'07',title:'自己讀過的一本書',note:'真實閱讀理由。'}],annualBook:{title:'自己選出的年度書',note:'具體選入原因。'}};
    if(slug==='trust-path')secondary.serviceFacts={duration:'依實際方案而定',price:'請向服務者確認',cancellation:'依公布政策',qualification:'尚未提供可查證資格',contact:'請使用服務頁聯絡方式'};
    if(slug==='radio-letter'){
      secondary.media={episodeAudioPath:'/audio/owned-sample.mp3',episodeTranscript:[{time:'00:00',text:'此為測試者提供的逐字稿。'}]};
      mkdirSync(join(root,'public/audio'),{recursive:true});
      writeFileSync(join(root,'public/audio/owned-sample.mp3'),Buffer.from('ID3\\u0003\\u0000\\u0000','utf8'));
    }
    const filename=join(root,slug+'.json'),site=join(root,slug);
    writeFileSync(filename,JSON.stringify(secondary));
    execFileSync(process.execPath,['scripts/export-starter.mjs',filename,site,'--require-assembled'],{stdio:'inherit'});
    const home=readFileSync(join(site,'src/components/layouts/selected/Home.astro'),'utf8');
    if(!home.includes('data-assembled-layout="'+slug+'"'))throw Error('Missing '+slug+' distinct Home renderer');
    if(slug==='essayist'&&!existsSync(join(site,'public/images/hero-image.png')))throw Error('Browser-selected image was not extracted into standalone project');
    if(slug==='radio-letter'){
      if(!existsSync(join(site,'public/audio/owned-sample.mp3')))throw Error('Missing copied licensed podcast audio');
      const media=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8')).media;
      if(media.episodeTranscript[0].text!=='此為測試者提供的逐字稿。')throw Error('Lost transcript text');
      if(!home.includes('<audio controls')||!home.includes('radio-transcript'))throw Error('Missing accessible radio player or transcript');
    }
    if(slug==='reading-atlas'&&JSON.parse(readFileSync(join(site,'site.config.json'),'utf8')).reading.records[0].title!=='自己讀過的一本書')throw Error('Reading records not exported');
    if(slug==='trust-path'&&JSON.parse(readFileSync(join(site,'site.config.json'),'utf8')).serviceFacts.duration!=='依實際方案而定')throw Error('Service facts not exported');
    if(slug==='reading-atlas'&&(!home.includes('data-atlas-month')||!home.includes('data-record-month')||!home.includes('aria-pressed')))throw Error('Reading atlas month filters incomplete');
    if(slug==='trust-path'&&(!home.includes('trust-route')||!home.includes('href={\'#\'+id}')||!home.includes('trust-unverified')))throw Error('Trust path stations or unverified details missing');
    if(process.env.FULL_STARTER_BUILD==='1'){
      execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
      const html=readFileSync(join(site,'dist/index.html'),'utf8');
      if(!html.includes('data-assembled-layout="'+slug+'"'))throw Error('Lost assembled '+slug+' DOM');
    }
  }
  console.log('Starter exporter checks passed for twelve distinct layout assemblies');
}finally{rmSync(root,{recursive:true,force:true})}
