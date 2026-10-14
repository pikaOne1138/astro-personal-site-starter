import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const expected=[...Array.from({length:14},(_,i)=>'W'+(i+1)),...Array.from({length:20},(_,i)=>'N'+(i+1)),'F00',...Array.from({length:9},(_,i)=>'F'+String(i+1).padStart(2,'0')),'F10b',...Array.from({length:4},(_,i)=>'F'+(i+11))];
const manifest=JSON.parse(readFileSync('docs/quality/HISTORIC-REGRESSIONS.json','utf8'));
const found=Object.keys(manifest.defects||{});
const errors=[],tally={PASS:0,FAIL:0,NOTICE:0,BLOCKED:0,'NOT TESTED':0};
for(const id of expected){
 const row=manifest.defects?.[id];
 if(!row){errors.push(id+': historical requirement missing');continue;}
 if(!['G1','G2','G3','G4','G5'].includes(row.gate))errors.push(id+': invalid Gate assignment');
 if(!Object.hasOwn(tally,row.status))errors.push(id+': invalid status');
 else tally[row.status]++;
 if(row.status==='PASS'&&(!row.evidence||!existsSync(row.evidence)))errors.push(id+': PASS requires existing evidence file');
}
for(const id of found)if(!expected.includes(id))errors.push(id+': unexpected or invalid historical fixture');
if(!manifest.excludedFaults?.F10)errors.push('F10 invalid injection must be explicitly excluded');
const result={schemaVersion:1,sha:process.env.GITHUB_SHA||null,gate:errors.length?'FAIL':'PASS',requirements:expected.length,summary:tally,errors,requirementsDetail:expected.filter(id=>manifest.defects[id]).map(id=>({id,...manifest.defects[id]})),excludedFaults:manifest.excludedFaults};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/historic-regressions.json',JSON.stringify(result,null,2)+'\n');
const md=['# Historical W/N/F regression coverage','',`Registration: **${result.gate}**; tracked: **${expected.length}**; PASS: ${tally.PASS}; NOT TESTED: ${tally['NOT TESTED']}`,'',...errors.map(x=>'FAIL: '+x),'','**This gate checks historical coverage registration, not execution of the historical regression suite.**'].join('\n')+'\n';
writeFileSync('qa-artifacts/quality/historic-summary.md',md);
if(process.env.GITHUB_STEP_SUMMARY)writeFileSync(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
console.log(`Historical coverage: ${expected.length} required, ${errors.length} registration errors, ${tally['NOT TESTED']} unverified`);
if(errors.length){for(const msg of errors)console.error(msg);process.exitCode=1;}
