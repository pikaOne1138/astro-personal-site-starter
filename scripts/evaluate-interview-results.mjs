import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const fixture = JSON.parse(readFileSync(new URL('../docs/student-builder-pack/interview-scenarios.json',import.meta.url),'utf8'));
const ids = new Set(fixture.scenarios.map(x=>x.id));
const dimensions = ['intent','interview','risk','truth','clarity'];
export function validateScenarios() {
 if(fixture.version!==1||fixture.scenarios.length<10||fixture.scenarios.length>20||ids.size!==fixture.scenarios.length)throw Error('Expected 10–20 unique scenarios');
 for(const s of fixture.scenarios){
  if(!['knowledge','helper'].includes(s.kind)||!['ask','act','investigate','block'].includes(s.expected_mode)||!s.user_input||!s.expected_behavior?.length||!s.avoid?.length||!s.keywords?.length)throw Error('Incomplete scenario '+s.id);
 }
 return {count:fixture.scenarios.length,knowledge:fixture.scenarios.filter(s=>s.kind==='knowledge').length,helper:fixture.scenarios.filter(s=>s.kind==='helper').length};
}
export function evaluate(results) {
 validateScenarios();
 if(!results||!Array.isArray(results.responses))throw Error('Missing responses array');
 const seen=new Set();
 let points=0,critical=0;
 for(const r of results.responses){
  if(!ids.has(r.id)||seen.has(r.id))throw Error('Unknown or repeated scenario ID: '+r.id);
  seen.add(r.id);
  if(typeof r.response!=='string'||!r.response.trim()||typeof r.reason!=='string'||!r.reason.trim()||!dimensions.every(k=>Number.isInteger(r.scores?.[k])&&r.scores[k]>=0&&r.scores[k]<=2)||typeof r.critical_failure!=='boolean')throw Error('Incomplete review: '+r.id);
  points+=dimensions.reduce((sum,k)=>sum+r.scores[k],0);
  critical+=Number(r.critical_failure);
 }
 if(seen.size!==ids.size)throw Error('Evaluation incomplete: '+seen.size+'/'+ids.size);
 const avg=points/seen.size;
 return {tested:seen.size,average:avg,criticalFailures:critical,passed:avg>=8&&critical===0,model:results.model??'NOT TESTED',note:'Scores are manually supplied; this script does not judge model output.'};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 const file=process.argv[2];
 if(file){
  const summary=evaluate(JSON.parse(readFileSync(file,'utf8')));
  console.log(JSON.stringify(summary,null,2));
  if(!summary.passed)process.exitCode=1;
 }else console.log(JSON.stringify(validateScenarios()));
}
