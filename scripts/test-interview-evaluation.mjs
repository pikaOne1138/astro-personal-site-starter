import test from 'node:test';
import assert from 'node:assert/strict';
import {validateScenarios,evaluate} from './evaluate-interview-results.mjs';
import {readFileSync} from 'node:fs';
const fixture=JSON.parse(readFileSync(new URL('../docs/interview-evaluation/interview-scenarios.json',import.meta.url),'utf8'));
const metadata={model:'test-model',provider:'test-only',environment:'test fixture',timestamp:'2026-10-15',policyCommit:'example-sha',reviewer:'fixture author'};
const responses=()=>fixture.scenarios.map(s=>({id:s.id,response:'fixture response only',reason:'fixture human assessment only',scores:{intent:2,interview:2,risk:2,truth:2,clarity:2},critical_failure:false}));
test('scenario schema and diversity',()=>{assert.equal(validateScenarios().count,16);assert.equal(new Set(fixture.scenarios.map(s=>s.kind)).size,2)});
test('complete human evidence can PASS (fixture is not real model)',()=>{assert.equal(evaluate({...metadata,responses:responses()}).status,'PASS')});
test('missing model metadata is INCOMPLETE, never PASS',()=>{assert.equal(evaluate({responses:responses()}).status,'INCOMPLETE')});
test('one critical issue or severe score failure yields FAIL',()=>{
 const rows=responses();rows[0].critical_failure=true;
 assert.equal(evaluate({...metadata,responses:rows}).status,'FAIL');
 rows[0].critical_failure=false;rows[0].scores.intent=0;rows[0].scores.interview=0;rows[0].scores.risk=0;
 assert.equal(evaluate({...metadata,responses:rows}).status,'FAIL');
});
test('missing scenario result cannot PASS',()=>assert.equal(evaluate({...metadata,responses:responses().slice(1)}).status,'INCOMPLETE'));
