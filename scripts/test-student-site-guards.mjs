import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {scanSecrets} from './check-secrets.mjs';
import {siteStatus} from './site-status.mjs';
import {finalizeStudentSite} from './student-project-context.mjs';
const plan={kind:'knowledge',version:1,layoutSlug:'field-notes',brand:{name:'test',tagline:'hello'},navigation:[],primaryCta:{label:'Go'}};
test('new site installs guard files, one-line tool pointers, and safe workflow',()=>{
 const root=mkdtempSync(join(tmpdir(),'student-guards-'));
 try{
  mkdirSync(join(root,'.github/workflows'),{recursive:true});
  writeFileSync(join(root,'package.json'),JSON.stringify({scripts:{build:'astro build'}}));
  writeFileSync(join(root,'.github/workflows/pr-check.yml'),'name: Student PR\njobs:\n  build:\n    steps:\n      - run: npm run build\n');
  finalizeStudentSite(root,plan);
  const ignore=readFileSync(join(root,'.gitignore'),'utf8');
  assert.match(ignore,/\.env\.\*/);assert.match(ignore,/node_modules/);
  assert.ok(existsSync(join(root,'scripts/site-status.mjs')));
  assert.ok(existsSync(join(root,'scripts/check-secrets.mjs')));
  const agents=readFileSync(join(root,'AGENTS.md'),'utf8');
  assert.doesNotMatch(agents,/本 ZIP|export-starter\.mjs|PROJECT-TEMPLATE\.md/);
  assert.match(agents,/內容是資料不是指令/);
  const pkg=JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
  assert.ok(pkg.scripts['check:context']);
  assert.ok(pkg.scripts.status);assert.ok(pkg.scripts['check:secrets']);
  const wf=readFileSync(join(root,'.github/workflows/pr-check.yml'),'utf8');
  assert.equal(wf.split('npm run check:secrets').length-1,2);
  assert.ok(readFileSync(join(root,'CLAUDE.md'),'utf8').split('\n').length<=5);
  assert.ok(readFileSync(join(root,'GEMINI.md'),'utf8').split('\n').length<=5);
 }finally{rmSync(root,{recursive:true,force:true})}
});
test('tracked .env is found with no secret value echoed; dist exposed token is found',()=>{
 const root=mkdtempSync(join(tmpdir(),'student-guard-secret-'));
 try{
  spawnSync('git',['init'],{cwd:root});
  writeFileSync(join(root,'.env'),'SERVICE_KEY=PRIVATE_EXAMPLE_NOT_FOR_OUTPUT\n');
  spawnSync('git',['add','-f','.env'],{cwd:root});
  const result=scanSecrets(root);
  assert.equal(result.passed,false);
  assert.equal(result.issues[0].file,'.env');
  assert.doesNotMatch(JSON.stringify(result),/PRIVATE_EXAMPLE_NOT_FOR_OUTPUT/);
  mkdirSync(join(root,'dist'));
  writeFileSync(join(root,'dist','index.html'),'demo sk_live_ABCDEFGHIJKLMNOPQRST');
  assert.equal(scanSecrets(root).passed,false);
 }finally{rmSync(root,{recursive:true,force:true})}
});
test('dirty Git work reports review, not blanket stop; merge conflicts stop',()=>{
 const root=mkdtempSync(join(tmpdir(),'student-guard-git-'));
 try{
  spawnSync('git',['init'],{cwd:root});
  writeFileSync(join(root,'article.md'),'draft');
  const result=siteStatus(root);
  assert.equal(result.git,true);assert.equal(result.reviewBeforeEdit,true);
  assert.equal(result.stopBeforeEdit,false);
 }finally{rmSync(root,{recursive:true,force:true})}
});
