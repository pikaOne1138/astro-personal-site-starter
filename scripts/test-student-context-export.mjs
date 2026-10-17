import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../',import.meta.url));
function plan(kind) {
 const knowledge = kind === 'knowledge';
 const ids = knowledge ? ['articles','about'] : ['services','about'];
 return {
  version:1,kind,layoutSlug:knowledge?'field-notes':'clinician',
  visualTheme:'paper',brand:{name:knowledge?'讀書筆記':'陪伴工作室',tagline:'我的網站',primaryColor:'#445566'},
  navigation:ids.map(id=>({id,label:id,enabled:true})),
  primaryCta:{pageId:ids[0],label:knowledge?'閱讀文章':'查看服務'},sectionPatterns:[]
 };
}
test('standalone export includes live context and AI Skills for both audiences',()=>{
 for(const kind of ['knowledge','helper']){
  const tmp=mkdtempSync(join(tmpdir(),'atp-standalone-'));
  try{
   const input=join(tmp,'site-brief.json'),out=join(tmp,'student-site');
   writeFileSync(input,JSON.stringify(plan(kind)));
   const result=spawnSync(process.execPath,[join(root,'scripts/export-starter.mjs'),input,out],{encoding:'utf8',timeout:45000});
   assert.equal(result.status,0,result.stderr||result.stdout);
   const project=readFileSync(join(out,'PROJECT.md'),'utf8');
   const agents=readFileSync(join(out,'AGENTS.md'),'utf8');
   assert.match(project,/網站名稱：/);assert.match(project,/尚未完成發布與驗收/);
   assert.match(agents,/自然語言/);
   assert.ok(existsSync(join(out,'.ai/astro-site-maintenance/SKILL.md')));
   assert.ok(existsSync(join(out,'.ai/astro-pr-preview/SKILL.md')));
   assert.ok(existsSync(join(out,'site.config.json')));
   // Cross-session takeover: keep user's existing decisions, never re-export over them.
   writeFileSync(join(out,'PROJECT.md'),'# 已確認的個人決策\n');
   const retry=spawnSync(process.execPath,[join(root,'scripts/export-starter.mjs'),input,out],{encoding:'utf8',timeout:45000});
   assert.notEqual(retry.status,0);
   assert.equal(readFileSync(join(out,'PROJECT.md'),'utf8'),'# 已確認的個人決策\n');
  }finally{rmSync(tmp,{recursive:true,force:true});}
 }
});

test('generated Cloudflare branch previews cannot be indexed even with SITE_INDEXABLE enabled',()=>{
 const tmp=mkdtempSync(join(tmpdir(),'atp-preview-index-'));
 try{
  const input=join(tmp,'plan.json'),out=join(tmp,'site');writeFileSync(input,JSON.stringify(plan('knowledge')));
  const result=spawnSync(process.execPath,[join(root,'scripts/export-starter.mjs'),input,out],{encoding:'utf8',timeout:45000});
  assert.equal(result.status,0,result.stderr||result.stdout);
  const layout=readFileSync(join(out,'src/layouts/SiteLayout.astro'),'utf8');
  const robots=readFileSync(join(out,'src/pages/robots.txt.js'),'utf8');
  assert.match(layout,/isBranchPreview/);
  assert.match(layout,/SITE_INDEXABLE==='true'&&!isBranchPreview/);
  assert.match(robots,/isBranchPreview\|\|process\.env\.SITE_INDEXABLE/);
 }finally{rmSync(tmp,{recursive:true,force:true});}
});

test('PROJECT layout mismatch is detected without rewriting student decisions',()=>{
 const tmp=mkdtempSync(join(tmpdir(),'atp-context-mismatch-'));
 try{
  const input=join(tmp,'plan.json'),out=join(tmp,'site');writeFileSync(input,JSON.stringify(plan('knowledge')));
  const made=spawnSync(process.execPath,[join(root,'scripts/export-starter.mjs'),input,out],{encoding:'utf8',timeout:45000});
  assert.equal(made.status,0,made.stderr||made.stdout);
  const ok=spawnSync(process.execPath,[join(out,'scripts/check-project-context.mjs'),out],{encoding:'utf8'});
  assert.equal(ok.status,0,ok.stderr||ok.stdout);
  const projectPath=join(out,'PROJECT.md'),prior=readFileSync(projectPath,'utf8');
  const configPath=join(out,'site.config.json'),settings=JSON.parse(readFileSync(configPath,'utf8'));
  settings.layoutSlug='subject-atlas';writeFileSync(configPath,JSON.stringify(settings));
  const bad=spawnSync(process.execPath,[join(out,'scripts/check-project-context.mjs'),out],{encoding:'utf8'});
  assert.notEqual(bad.status,0);
  assert.match(bad.stdout,/differs/);
  assert.equal(readFileSync(projectPath,'utf8'),prior);
 }finally{rmSync(tmp,{recursive:true,force:true});}
});

test('art-direction adapters finalize PROJECT with the real selected Layout',()=>{
 for(const slug of ['subject-atlas','practice-compass']){
  const tmp=mkdtempSync(join(tmpdir(),'atp-adapter-context-'));
  try{
   const input=join(root,'docs/art-direction/fixtures',slug+'.json'),out=join(tmp,'site');
   const run=spawnSync(process.execPath,[join(root,'scripts/export-art-direction-starter.mjs'),input,out,'--allow-in-progress'],{encoding:'utf8',timeout:60000});
   assert.equal(run.status,0,run.stderr||run.stdout);
   const project=readFileSync(join(out,'PROJECT.md'),'utf8');
   const config=JSON.parse(readFileSync(join(out,'site.config.json'),'utf8'));
   assert.equal(config.layoutSlug,slug);
   assert.match(project,new RegExp('Layout ID（規劃選擇）：`'+slug+'`'));
   assert.ok(existsSync(join(out,'AGENTS.md')));
   assert.ok(existsSync(join(out,'scripts/check-project-context.mjs')));
   assert.ok(existsSync(join(out,'.ai/astro-pr-preview/SKILL.md')));
   const guard=spawnSync(process.execPath,[join(out,'scripts/check-project-context.mjs'),out],{encoding:'utf8'});
   assert.equal(guard.status,0,guard.stderr||guard.stdout);
  }finally{rmSync(tmp,{recursive:true,force:true})}
 }
});


test('practice-compass export uses visitor-safe copy and mobile navigation',()=>{
 const tmp=mkdtempSync(join(tmpdir(),'atp-visitor-export-'));
 try{
  const input=join(root,'docs/art-direction/fixtures/practice-compass.json');
  const out=join(tmp,'site');
  const run=spawnSync(process.execPath,[join(root,'scripts/export-art-direction-starter.mjs'),input,out,'--allow-in-progress'],{encoding:'utf8',timeout:60000});
  assert.equal(run.status,0,run.stderr||run.stdout);
  const nav=readFileSync(join(out,'src/components/StudentNavigation.astro'),'utf8');
  const layout=readFileSync(join(out,'src/layouts/SiteLayout.astro'),'utf8');
  const home=readFileSync(join(out,'src/components/layouts/practice-compass/Home.astro'),'utf8');
  assert.match(nav,/student-mobile-navigation/);
  assert.match(nav,/hasContact/);
  assert.match(nav,/<summary>選單<\\/summary>/);
  assert.match(layout,/visibleNavigation/);
  assert.doesNotMatch(home,/BEFORE ANY APPOINTMENT|VISITOR DECISIONS|SCOPE & BOUNDARIES/);
  assert.match(home,/服務範圍與界線/);
  assert.doesNotMatch(layout,/THE PRACTICE COMPASS/);
 }finally{rmSync(tmp,{recursive:true,force:true});}
});
