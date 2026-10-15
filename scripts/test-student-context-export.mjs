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
