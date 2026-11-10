import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {routeIntent,OPTIONS,FIRST_LAYER} from '../.ai/astro-site-entry/route-contract.mjs';

const data=JSON.parse(readFileSync('scripts/student-ai-companion-cases.json','utf8'));
assert.equal(data.schemaVersion,1);
let total=0;
for(const fixture of data.cases){
 const result=routeIntent(fixture.message,fixture.state||{});
 assert.equal(result.type,fixture.type,fixture.name+' type');
 if(fixture.layer)assert.equal(result.layer,fixture.layer,fixture.name+' menu layer');
 if(fixture.options)assert.deepEqual(result.options.map(x=>x.id),fixture.options,fixture.name+' options');
 if(fixture.routes)assert.deepEqual(result.routes.map(x=>x.id),fixture.routes,fixture.name+' routes');
 if(fixture.skills)for(const s of fixture.skills)assert.ok(result.skills.includes(s),fixture.name+' skill '+s);
 if(fixture.technical)assert.equal(result.routes[0].technical,fixture.technical,fixture.name+' technical route');
 for(const key of ['noExporter','needsRepo','canDiscussWithoutRepo','preserveContext']){
   if(key in fixture)assert.deepEqual(result[key],fixture[key],fixture.name+' '+key);
 }
 if('confirmed' in fixture)assert.deepEqual(result.confirmed,fixture.confirmed,fixture.name+' context retention');
 if('unavailableSkills' in fixture)assert.deepEqual(result.unavailableSkills,fixture.unavailableSkills,fixture.name+' inaccessible Skills');
 if('usedSkills' in fixture)assert.deepEqual(result.usedSkills,fixture.usedSkills,fixture.name+' no false usage');
 total++;
 console.log('PASS',fixture.name);
}
// The student-facing Skill is the authoritative conversational policy.
// This executable contract is optional and cannot replace semantic intent recognition.
const skill=readFileSync('.ai/astro-site-entry/SKILL.md','utf8');
const prompt=readFileSync('docs/student-builder-pack/START-MAINTENANCE-PROMPT.txt','utf8');
const guide=readFileSync('src/pages/guide/index.astro','utf8');
const student=readFileSync('docs/student-builder-pack/STUDENT-AGENTS.md','utf8');
assert.match(skill,/route-contract\.mjs/,'Skill must link to executable contract');
assert.match(skill,/Not for/i,'description explicitly excludes execution work');
assert.match(prompt,/只有我沒說明目的時/,'guide prompt defers menu');
assert.match(guide,/START-MAINTENANCE-PROMPT\.txt\?raw/,'guide imports canonical prompt');
assert.match(student,/astro-site-entry\/SKILL\.md/,'student own agent routes to companion');
for(const [group,items] of Object.entries(OPTIONS)){
 const section=skill.slice(skill.indexOf('**第二層：**'));
 assert.ok(section.includes(group==='new'?'建立新網站':group==='improve'?'改善目前的網站':'維護與處理問題'),group+' menu');
 for(const item of items){
  assert.ok(skill.includes(item.label),item.id+' learner-facing label missing');
  for(const linked of item.skills)assert.ok(skill.includes(linked),item.id+' skill reference '+linked);
 }
}
assert.equal(FIRST_LAYER.length,3);
console.log('PASS executable deterministic routing contract',total,'fixtures');

assert.match(guide,/data-prompt="4"/,'guide maintenance copy button must target canonical prompt');
assert.match(guide,/text:startMaintenancePrompt\.trim\(\)/,'guide must render imported prompt unchanged');
assert.match(guide,/navigator\.clipboard\.writeText\(prompts\[Number\(b\.dataset\.prompt\)\]\)/,
 'copy action must copy displayed canonical prompt');
assert.match(prompt,/也允許我用自然語言改變任務/,'prompt must support plain-text chat without UI controls');
const followup=routeIntent('我今天想處理網站');
assert.equal(followup.type,'first-menu');
const designChoice=routeIntent('②',{menuLayer:'first'});
assert.equal(designChoice.type,'second-menu');
assert.equal(designChoice.layer,'improve');
assert.equal(designChoice.options.length,6);
assert.equal(routeIntent('③',{menuLayer:'improve'}).routes[0].id,'candidates');
const newChoice=routeIntent('①',{menuLayer:'first'});
assert.deepEqual(newChoice.options.map(x=>x.technical),['C','B','A']);
assert.equal(routeIntent('我想新增一篇文章').type,'direct');
const switched=routeIntent('幫我發表一篇文章',{menuLayer:'improve',confirmed:{brand:'已確認品牌'}});
assert.deepEqual(switched.confirmed,{brand:'已確認品牌'});
console.log('PASS /guide/ canonical copy-path + plain-text learner-turn handoff contract');

console.log('NOT TESTED: genuine model conversation; deterministic examples are not model behavior.');
