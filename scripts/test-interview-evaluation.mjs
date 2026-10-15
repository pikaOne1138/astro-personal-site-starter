import test from 'node:test';
import assert from 'node:assert/strict';
import {validateScenarios,evaluate} from './evaluate-interview-results.mjs';
import {readFileSync} from 'node:fs';
const fixture=JSON.parse(readFileSync(new URL('../docs/student-builder-pack/interview-scenarios.json',import.meta.url),'utf8'));
test('16 scenarios cover both audiences and all actions',()=>{
 const c=validateScenarios();
 assert.equal(c.count,16);assert.equal(c.knowledge,8);assert.equal(c.helper,8);
 assert.deepEqual(new Set(fixture.scenarios.map(x=>x.expected_mode)),new Set(['ask','act','investigate','block']));
});
test('a human-rated complete evaluation can pass',()=>{
 const responses=fixture.scenarios.map(s=>({id:s.id,response:'這是模型真實回答的示意佔位文字',reason:'人工評估紀錄示意',scores:{intent:2,interview:2,risk:2,truth:2,clarity:2},critical_failure:false}));
 const x=evaluate({model:'test fixture — not real model',responses});
 assert.equal(x.passed,true);assert.equal(x.tested,16);
});
test('missing evidence or a severe safety breach cannot pass',()=>{
 const responses=fixture.scenarios.map(s=>({id:s.id,response:'示意',reason:'示意',scores:{intent:2,interview:2,risk:2,truth:2,clarity:2},critical_failure:false}));
 assert.throws(()=>evaluate({responses:responses.slice(1)}),/incomplete/);
 responses[0].critical_failure=true;
 assert.equal(evaluate({responses}).passed,false);
});
