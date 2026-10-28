import {mkdtempSync,readFileSync,writeFileSync,existsSync,rmSync,readdirSync,cpSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {normalizeExpandedPatterns} from './expanded-section-patterns.mjs';
const workspace=mkdtempSync(join(tmpdir(),'art-direction-qa-'));
const exporter=resolve('scripts/export-art-direction-starter.mjs');
const fixtureDir=resolve('docs/art-direction/fixtures');
const report={checks:[],screenshots:'DEFERRED BY USER',visualApproval:'NOT TESTED'};
const run=(command,args,cwd)=>execFileSync(command,args,{cwd,stdio:'pipe',maxBuffer:20*1024*1024});
const check=(name,fn)=>{fn();report.checks.push(name);console.log('PASS',name)};
const rejects=(name,plan,options=[])=>{const path=join(workspace,'bad.json');writeFileSync(path,JSON.stringify(plan));const r=spawnSync(process.execPath,[exporter,path,join(workspace,'bad-output'),...options],{encoding:'utf8'});assert.notEqual(r.status,0,name);assert.ok(!existsSync(join(workspace,'bad-output/site.config.json')),name+' must reject before delivering output');report.checks.push('reject: '+name);};
try{
 const pattern={patternId:'featured-work',targetPage:'/',insertAfter:'after-intro',content:{title:'QA 作品',items:[{title:'QA 名稱',description:'QA 簡介'}]}};
 const nav=[{id:'about',path:'about/',enabled:true},{id:'articles',path:'articles/',enabled:true}];
 for(const [name,change] of [
  ['missing real content',p=>delete p.content],['empty works',p=>p.content.items=[]],
  ['unsafe work URL',p=>p.content.items[0].url='javascript:alert(1)'],['credential URL',p=>p.content.items[0].url='https://user:password@example.test/'],
  ['ambiguous position',p=>p.insertAfter='somewhere'],['non-home opening slot',p=>p.targetPage='about'],
  ['disabled target',p=>p.targetPage='missing'],['draft direct link',p=>p.content.articleSlugs=['../draft']],
  ['unavailable action',p=>p.content.action={label:'QA',pageId:'missing'}],['incompatible trust',p=>p.patternId='trust-service-path']
 ])check('pattern rejects '+name,()=>{const p=structuredClone(pattern);change(p);assert.throws(()=>normalizeExpandedPatterns([p],'knowledge',nav));});
 check('missing content can be skipped on request and stays an explicit error otherwise',()=>{const p=structuredClone(pattern);delete p.content;assert.throws(()=>normalizeExpandedPatterns([p],'knowledge',nav),/--skip-patterns-without-content/);assert.deepEqual(normalizeExpandedPatterns([p],'knowledge',nav,{skipMissingContent:true}),[]);});
 check('pattern rejects article references without an article page',()=>assert.throws(()=>normalizeExpandedPatterns([{...pattern,content:{title:'QA',articleSlugs:['owned-note']}}],'helper',nav.filter(n=>n.id!=='articles'))));
 check('trust pattern requires both fit boundaries',()=>assert.throws(()=>normalizeExpandedPatterns([{patternId:'trust-service-path',targetPage:'/',insertAfter:'page-end',content:{title:'QA',description:'QA',suitable:['QA']}}],'helper',nav)));
 check('pattern normalizes planner position and preserves real content',()=>{const p=structuredClone(pattern);p.insertAfter='主要內容之後';assert.equal(normalizeExpandedPatterns([p],'knowledge',nav)[0].insertAfter,'page-end');});
 for(const slug of ['subject-atlas','practice-compass']){
  const source=join(fixtureDir,slug+'.json');const plan=JSON.parse(readFileSync(source));
  plan.sectionPatterns=[{...structuredClone(pattern),content:{title:'QA <script> literal',...(slug==='subject-atlas'?{articleSlugs:['real-note','legacy-draft']}:{items:[{title:'QA 作品',description:'QA 提供的作品'}]}),action:{label:'QA 關於',pageId:'about'}}}];
  if(!plan.navigation.some(n=>n.id==='articles'))plan.navigation.push({id:'articles',label:'文章',enabled:true});
  for(const target of ['page-guide','articles'])plan.sectionPatterns.push({...structuredClone(plan.sectionPatterns[0]),targetPage:target,insertAfter:'page-end'});
  // Resolve the original relative article source before writing the temporary brief.
  if(plan.contentDirectory)cpSync(join(fixtureDir,plan.contentDirectory),join(workspace,plan.contentDirectory),{recursive:true});
  const selectedSource=join(workspace,slug+'.json');writeFileSync(selectedSource,JSON.stringify(plan));
  const site=join(workspace,slug);
  run(process.execPath,[resolve('scripts/export-starter.mjs'),selectedSource,site,'--require-assembled']);
  check(slug+' real selected adapter',()=>{const c=JSON.parse(readFileSync(join(site,'site.config.json')));assert.equal(c.layoutSlug,slug);assert.equal(c.layoutAdapter.id,slug);assert.equal(c.layoutAdapter.assemblyStatus,'in-progress');if(slug==='practice-compass')assert.ok(c.artDirection.explicitPageIds.includes('articles'),'optional archive must not also be a catch-all page');assert.ok(readFileSync(join(site,'src/components/layouts',slug,'Home.astro'),'utf8').includes('data-assembled-layout="'+slug+'"'));});
  run('npm',['install','--no-audit','--no-fund','--package-lock=false'],site);
  run('npm',['run','test:regressions'],site);
  run('npm',['run','build'],site);
  run('npm',['run','verify'],site);
  check(slug+' independent build, validators and draft isolation',()=>{
   for(const p of ['index.html','404.html','about/index.html','guides/first/index.html','search/index.html','rss.xml','sitemap.xml','robots.txt','pagefind/pagefind.js','pagefind/pagefind-ui.js','search/exact-zh.json'])assert.ok(existsSync(join(site,'dist',p)),p);
   const c=JSON.parse(readFileSync(join(site,'site.config.json')));for(const n of c.navigation)assert.ok(existsSync(join(site,'dist',n.path,'index.html')),n.path);
   const home=readFileSync(join(site,'dist/index.html'),'utf8');assert.ok(home.includes('QA 首頁標題'));assert.ok(home.includes('noindex'));assert.ok(home.includes('data-section-pattern="featured-work"'));assert.ok(home.includes('QA &lt;script&gt; literal'));assert.ok(!home.includes('href="/articles/legacy-draft/"'));
   for(const path of ['guides/first/index.html','articles/index.html']){const html=readFileSync(join(site,'dist',path),'utf8');assert.ok(html.includes('data-section-pattern="featured-work"'));assert.ok(!/class="student-pattern(?:\s|")/.test(html),'legacy placeholder in '+path);}
   const archive=slug==='subject-atlas'?readFileSync(join(site,'dist/articles/index.html'),'utf8'):'';
   if(slug==='subject-atlas'){assert.ok(archive.includes('索引文章 QA 示範'));assert.ok(existsSync(join(site,'dist/topics/method/index.html')));assert.ok(!existsSync(join(site,'dist/articles/legacy-draft/index.html')));assert.ok(!existsSync(join(site,'dist/articles/private-note/index.html')));assert.ok(readFileSync(join(site,'dist/rss.xml'),'utf8').includes('索引文章 QA 示範'));assert.ok(readFileSync(join(site,'dist/sitemap.xml'),'utf8').includes('topics/method/'));assert.ok(readFileSync(join(site,'dist/search/exact-zh.json'),'utf8').includes('QA_PUBLIC_NOTE_TOKEN'));}
   if(slug==='practice-compass'){assert.ok(home.includes('QA 是否適合'));assert.ok(home.includes('QA 合作方式'));assert.ok(home.includes('QA 常見疑問'));const services=readFileSync(join(site,'dist/services/index.html'),'utf8');assert.ok(services.includes('QA 示範形式'));assert.ok(services.includes('尚未設定'));assert.ok(readFileSync(join(site,'dist/faq/index.html'),'utf8').includes('<details'));assert.ok(readFileSync(join(site,'dist/contact/index.html'),'utf8').includes('尚未配置'));assert.ok(!home.includes('<form'));}
  });
  const baseRun=spawnSync('npm',['run','build'],{cwd:site,encoding:'utf8',env:{...process.env,ASTRO_BASE_PATH:'/course/site/',SITE_URL:'https://owned.example'},maxBuffer:20*1024*1024});assert.equal(baseRun.status,0,baseRun.stderr+' '+baseRun.stdout);
  check(slug+' subpath routes and own canonical',()=>{const h=readFileSync(join(site,'dist/index.html'),'utf8');assert.ok(h.includes('/course/site/site.css'));assert.ok(h.includes('href="/course/site/about/"'));assert.ok(h.includes('https://owned.example/course/site/'));const search=readFileSync(join(site,'dist/search/index.html'),'utf8');assert.ok(search.includes('/course/site/pagefind/pagefind-ui.js'));});
  if(slug==='subject-atlas'){const bad=join(site,'src/content/articles/unknown-topic.md');writeFileSync(bad,'---\ntitle: Unknown\ndescription: Unknown\npublishedAt: 2026-10-14\ntopics: [missing]\n---\nUnknown topic body');const failed=spawnSync('npm',['run','build'],{cwd:site,encoding:'utf8'});assert.notEqual(failed.status,0);assert.ok((failed.stdout+failed.stderr).includes('Unknown topic'));rmSync(bad);report.checks.push('reject: public article with undefined topic');}
  check(slug+' refuses overwrite',()=>{const marker=join(site,'owner-edit.txt');writeFileSync(marker,'KEEP');const r=spawnSync(process.execPath,[exporter,source,site,'--allow-in-progress']);assert.notEqual(r.status,0);assert.equal(readFileSync(marker,'utf8'),'KEEP');});
  rejects(slug+' missing explicit in-progress opt-in',plan);
  rejects(slug+' strict Ready gate',plan,['--require-ready']);
  const badCrop=structuredClone(plan);badCrop.brand.imageFit='stretch';rejects(slug+' unsupported image fit',badCrop,['--allow-in-progress']);
  const badPosition=structuredClone(plan);badPosition.brand.imagePosition='url(https://untrusted.example)';rejects(slug+' unsafe image position',badPosition,['--allow-in-progress']);
  const badHeading=structuredClone(plan);badHeading.layoutContent={headings:{unknown:'bad'}};rejects(slug+' unknown editorial heading',badHeading,['--allow-in-progress']);
  const missingImage=structuredClone(plan);missingImage.brand.heroImagePath='/images/missing.png';rejects(slug+' missing owned asset',missingImage,['--allow-in-progress']);
  const collision=structuredClone(plan);collision.navigation.push({id:'page-collision',path:'search/',enabled:true,label:'衝突'});rejects(slug+' reserved route',collision,['--allow-in-progress']);
  const unsafe=structuredClone(plan);unsafe.artDirection.contact={bookingUrl:'javascript:alert(1)'};rejects(slug+' unsafe booking URL',unsafe,['--allow-in-progress']);
  const badEmail=structuredClone(plan);badEmail.artDirection.contact={email:'owner%0ABcc@site.example'};rejects(slug+' email header injection',badEmail,['--allow-in-progress']);
  const traversal=structuredClone(plan);traversal.contentDirectory='../outside';rejects(slug+' content directory traversal',traversal,['--allow-in-progress']);
  const disabled=structuredClone(plan);disabled.navigation.push({id:'page-search',enabled:false,label:'搜尋'});rejects(slug+' disabled essential page',disabled,['--allow-in-progress']);
 }
 const input=JSON.parse(readFileSync(join(fixtureDir,'subject-atlas.json')));input.artDirection.topics=[{slug:'../escape',title:'bad'}];rejects('topic traversal',input,['--allow-in-progress']);
 const empty=JSON.parse(readFileSync(join(fixtureDir,'subject-atlas.json')));delete empty.contentDirectory;empty.artDirection.topics=[];const p=join(workspace,'empty.json');writeFileSync(p,JSON.stringify(empty));const site=join(workspace,'empty');run(process.execPath,[exporter,p,site,'--allow-in-progress']);run('npm',['install','--no-audit','--no-fund','--package-lock=false'],site);run('npm',['run','build'],site);check('empty knowledge site has honest empty states',()=>{assert.ok(readFileSync(join(site,'dist/index.html'),'utf8').includes('尚未設定主題'));assert.ok(readFileSync(join(site,'dist/articles/index.html'),'utf8').includes('目前沒有公開文章'));});
 const helperEmpty=JSON.parse(readFileSync(join(fixtureDir,'practice-compass.json')));helperEmpty.artDirection.scope={suitable:[],notSuitable:[]};helperEmpty.artDirection.faq=[];helperEmpty.artDirection.visitorIntents=[];helperEmpty.artDirection.serviceFacts={};helperEmpty.artDirection.contact={};const helperPlan=join(workspace,'empty-helper-plan.json');writeFileSync(helperPlan,JSON.stringify(helperEmpty));const helperSite=join(workspace,'empty-helper');run(process.execPath,[exporter,helperPlan,helperSite,'--allow-in-progress']);run('npm',['install','--no-audit','--no-fund','--package-lock=false'],helperSite);run('npm',['run','build'],helperSite);check('empty helper export is buildable and discloses missing facts',()=>{const h=readFileSync(join(helperSite,'dist/index.html'),'utf8');assert.ok(h.includes('待由服務提供者確認'));assert.ok(!h.includes('<form'));assert.ok(readFileSync(join(helperSite,'dist/faq/index.html'),'utf8').includes('尚未填入正式常見問題'));});
 const invalidIntents=structuredClone(helperEmpty);invalidIntents.artDirection.visitorIntents=[{title:'QA',detail:'QA',target:'https://example.com'}];rejects('reject arbitrary visitor intent target',invalidIntents,['--allow-in-progress']);
 run(process.execPath,['scripts/build-student-pack.mjs'],process.cwd());
 const pack=join(workspace,'portable');run('unzip',['-q',resolve('public/AI-建站資料包.zip'),'-d',pack]);
 for(const slug of ['subject-atlas','practice-compass']){run(process.execPath,[join(pack,'scripts/export-starter.mjs'),join(pack,'docs/student-builder-pack/art-direction',slug+'.json'),join(workspace,'portable-'+slug),'--allow-in-progress'],pack);const config=JSON.parse(readFileSync(join(workspace,'portable-'+slug,'site.config.json')));assert.equal(config.layoutAdapter.id,slug);report.checks.push(slug+' portable ZIP exporter and owned sources');}
 mkdirSync('qa-artifacts/art-direction',{recursive:true});writeFileSync('qa-artifacts/art-direction/standalone.json',JSON.stringify(report,null,2)+'\n');console.log('All standalone adapter checks PASS:',report.checks.length);
}finally{rmSync(workspace,{recursive:true,force:true})}
