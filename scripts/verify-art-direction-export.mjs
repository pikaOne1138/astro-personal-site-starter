import {mkdtempSync,readFileSync,writeFileSync,existsSync,rmSync,readdirSync,cpSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const workspace=mkdtempSync(join(tmpdir(),'art-direction-qa-'));
const exporter=resolve('scripts/export-art-direction-starter.mjs');
const fixtureDir=resolve('docs/art-direction/fixtures');
const report={checks:[],screenshots:'DEFERRED BY USER',visualApproval:'NOT TESTED'};
const run=(command,args,cwd)=>execFileSync(command,args,{cwd,stdio:'pipe',maxBuffer:20*1024*1024});
const check=(name,fn)=>{fn();report.checks.push(name);console.log('PASS',name)};
const rejects=(name,plan,options=[])=>{const path=join(workspace,'bad.json');writeFileSync(path,JSON.stringify(plan));const r=spawnSync(process.execPath,[exporter,path,join(workspace,'bad-output'),...options],{encoding:'utf8'});assert.notEqual(r.status,0,name);assert.ok(!existsSync(join(workspace,'bad-output/site.config.json')),name+' must reject before delivering output');report.checks.push('reject: '+name);};
try{
 for(const slug of ['subject-atlas','practice-compass']){
  const source=join(fixtureDir,slug+'.json');const plan=JSON.parse(readFileSync(source));
  const site=join(workspace,slug);
  run(process.execPath,[exporter,source,site,'--allow-in-progress']);
  check(slug+' real selected adapter',()=>{const c=JSON.parse(readFileSync(join(site,'site.config.json')));assert.equal(c.layoutSlug,slug);assert.equal(c.layoutAdapter.id,slug);assert.equal(c.layoutAdapter.assemblyStatus,'in-progress');assert.ok(readFileSync(join(site,'src/components/layouts',slug,'Home.astro'),'utf8').includes('data-assembled-layout="'+slug+'"'));});
  run('npm',['install','--no-audit','--no-fund','--package-lock=false'],site);
  run('npm',['run','test:regressions'],site);
  run('npm',['run','build'],site);
  run('npm',['run','verify'],site);
  check(slug+' independent build, validators and draft isolation',()=>{
   for(const p of ['index.html','404.html','about/index.html','guides/first/index.html','search/index.html','rss.xml','sitemap.xml','robots.txt','pagefind/pagefind.js','pagefind/pagefind-ui.js','search/exact-zh.json'])assert.ok(existsSync(join(site,'dist',p)),p);
   const c=JSON.parse(readFileSync(join(site,'site.config.json')));for(const n of c.navigation)assert.ok(existsSync(join(site,'dist',n.path,'index.html')),n.path);
   const home=readFileSync(join(site,'dist/index.html'),'utf8');assert.ok(home.includes('QA 首頁標題'));assert.ok(home.includes('noindex'));
   const archive=slug==='subject-atlas'?readFileSync(join(site,'dist/articles/index.html'),'utf8'):'';
   if(slug==='subject-atlas'){assert.ok(archive.includes('索引文章 QA 示範'));assert.ok(existsSync(join(site,'dist/topics/method/index.html')));assert.ok(!existsSync(join(site,'dist/articles/legacy-draft/index.html')));assert.ok(!existsSync(join(site,'dist/articles/private-note/index.html')));assert.ok(readFileSync(join(site,'dist/rss.xml'),'utf8').includes('索引文章 QA 示範'));assert.ok(readFileSync(join(site,'dist/sitemap.xml'),'utf8').includes('topics/method/'));assert.ok(readFileSync(join(site,'dist/search/exact-zh.json'),'utf8').includes('QA_PUBLIC_NOTE_TOKEN'));}
   if(slug==='practice-compass'){const services=readFileSync(join(site,'dist/services/index.html'),'utf8');assert.ok(services.includes('QA 示範形式'));assert.ok(services.includes('尚未設定'));assert.ok(readFileSync(join(site,'dist/faq/index.html'),'utf8').includes('<details'));assert.ok(readFileSync(join(site,'dist/contact/index.html'),'utf8').includes('尚未配置'));assert.ok(!home.includes('<form'));}
  });
  const baseRun=spawnSync('npm',['run','build'],{cwd:site,encoding:'utf8',env:{...process.env,ASTRO_BASE_PATH:'/course/site/',SITE_URL:'https://owned.example'},maxBuffer:20*1024*1024});assert.equal(baseRun.status,0,baseRun.stderr+' '+baseRun.stdout);
  check(slug+' subpath routes and own canonical',()=>{const h=readFileSync(join(site,'dist/index.html'),'utf8');assert.ok(h.includes('/course/site/site.css'));assert.ok(h.includes('https://owned.example/course/site/'));const search=readFileSync(join(site,'dist/search/index.html'),'utf8');assert.ok(search.includes('/course/site/pagefind/pagefind-ui.js'));});
  if(slug==='subject-atlas'){const bad=join(site,'src/content/articles/unknown-topic.md');writeFileSync(bad,'---\ntitle: Unknown\ndescription: Unknown\npublishedAt: 2026-10-14\ntopics: [missing]\n---\nUnknown topic body');const failed=spawnSync('npm',['run','build'],{cwd:site,encoding:'utf8'});assert.notEqual(failed.status,0);assert.ok((failed.stdout+failed.stderr).includes('Unknown topic'));rmSync(bad);report.checks.push('reject: public article with undefined topic');}
  check(slug+' refuses overwrite',()=>{const marker=join(site,'owner-edit.txt');writeFileSync(marker,'KEEP');const r=spawnSync(process.execPath,[exporter,source,site,'--allow-in-progress']);assert.notEqual(r.status,0);assert.equal(readFileSync(marker,'utf8'),'KEEP');});
  rejects(slug+' missing explicit in-progress opt-in',plan);
  rejects(slug+' strict Ready gate',plan,['--require-ready']);
  const collision=structuredClone(plan);collision.navigation.push({id:'page-collision',path:'search/',enabled:true,label:'衝突'});rejects(slug+' reserved route',collision,['--allow-in-progress']);
  const unsafe=structuredClone(plan);unsafe.artDirection.contact={bookingUrl:'javascript:alert(1)'};rejects(slug+' unsafe booking URL',unsafe,['--allow-in-progress']);
  const badEmail=structuredClone(plan);badEmail.artDirection.contact={email:'owner%0ABcc@site.example'};rejects(slug+' email header injection',badEmail,['--allow-in-progress']);
  const traversal=structuredClone(plan);traversal.contentDirectory='../outside';rejects(slug+' content directory traversal',traversal,['--allow-in-progress']);
  const disabled=structuredClone(plan);disabled.navigation.push({id:'page-search',enabled:false,label:'搜尋'});rejects(slug+' disabled essential page',disabled,['--allow-in-progress']);
 }
 const input=JSON.parse(readFileSync(join(fixtureDir,'subject-atlas.json')));input.artDirection.topics=[{slug:'../escape',title:'bad'}];rejects('topic traversal',input,['--allow-in-progress']);
 const empty=JSON.parse(readFileSync(join(fixtureDir,'subject-atlas.json')));delete empty.contentDirectory;empty.artDirection.topics=[];const p=join(workspace,'empty.json');writeFileSync(p,JSON.stringify(empty));const site=join(workspace,'empty');run(process.execPath,[exporter,p,site,'--allow-in-progress']);run('npm',['install','--no-audit','--no-fund','--package-lock=false'],site);run('npm',['run','build'],site);check('empty knowledge site has honest empty states',()=>{assert.ok(readFileSync(join(site,'dist/index.html'),'utf8').includes('尚未設定主題'));assert.ok(readFileSync(join(site,'dist/articles/index.html'),'utf8').includes('目前沒有公開文章'));});
 run(process.execPath,['scripts/build-student-pack.mjs'],process.cwd());
 const pack=join(workspace,'portable');run('unzip',['-q',resolve('public/AI-建站資料包.zip'),'-d',pack]);
 for(const slug of ['subject-atlas','practice-compass']){run(process.execPath,[join(pack,'scripts/export-art-direction-starter.mjs'),join(pack,'docs/student-builder-pack/art-direction',slug+'.json'),join(workspace,'portable-'+slug),'--allow-in-progress'],pack);const config=JSON.parse(readFileSync(join(workspace,'portable-'+slug,'site.config.json')));assert.equal(config.layoutAdapter.id,slug);report.checks.push(slug+' portable ZIP exporter and owned sources');}
 mkdirSync('qa-artifacts/art-direction',{recursive:true});writeFileSync('qa-artifacts/art-direction/standalone.json',JSON.stringify(report,null,2)+'\n');console.log('All standalone adapter checks PASS:',report.checks.length);
}finally{rmSync(workspace,{recursive:true,force:true})}
