import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const [kind,slug] of [['knowledge','field-notes'],['helper','clinician']]){
 test('Brief handoff fixture exports a valid '+kind+' starter context',()=>{
  const temp=mkdtempSync(join(tmpdir(),'atp-brief-handoff-'));
  try{
   const planFile=join(root,'docs/brief-handoff/fixtures',kind+'.plan.json');
   const plan=JSON.parse(readFileSync(planFile,'utf8'));
   assert.equal(plan.kind,kind);assert.equal(plan.layoutSlug,slug);
   assert.ok(plan.navigation.some(x=>x.enabled&&x.id===plan.primaryCta.pageId));
   assert.ok(plan.navigation.filter(x=>x.enabled).length>=2);
   const out=join(temp,'site');
   const run=spawnSync(process.execPath,[join(root,'scripts/export-starter.mjs'),planFile,out,'--require-assembled'],{encoding:'utf8',timeout:60000});
   assert.equal(run.status,0,run.stderr||run.stdout);
   const config=JSON.parse(readFileSync(join(out,'site.config.json'),'utf8'));
   const project=readFileSync(join(out,'PROJECT.md'),'utf8');
   assert.equal(config.layoutSlug,slug);
   assert.ok(project.includes('Layout ID（規劃選擇）：`'+slug+'`'));
   assert.ok(existsSync(join(out,'AGENTS.md')));
   const guard=spawnSync(process.execPath,[join(out,'scripts/check-project-context.mjs'),out],{encoding:'utf8'});
   assert.equal(guard.status,0,guard.stderr||guard.stdout);
  }finally{rmSync(temp,{recursive:true,force:true})}
 })
}
