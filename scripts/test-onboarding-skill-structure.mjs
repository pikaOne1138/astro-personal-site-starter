import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const path='.ai/astro-starter-onboarding/SKILL.md';
const source=readFileSync(path,'utf8');
const validate=text=>{
 const section=text.split('## Beginner workflow\n')[1]?.split('\n## ')[0]||'';
 const numbered=[...section.matchAll(/^(\d+)\.\s+/gm)].map(x=>Number(x[1]));
 const failures=[];
 if(numbered.length!==9||numbered.some((x,i)=>x!==i+1))failures.push('W12 onboarding step numbering is missing, duplicate or reordered: '+numbered.join(','));
 if((section.match(/\*\*/g)||[]).length%2!==0)failures.push('W12 malformed unclosed bold formatting');
 if(!section.includes('9. Branch + PR'))failures.push('W12 final user approval step missing');
 return failures;
};
const baseline=validate(source);
const faults=[
 ['missing numbered step',source.replace('8. AI developer','AI developer')],
 ['unclosed markdown bold',source.replace('** Keep original layout distinctions',' Keep original layout distinctions')]
];
const checks=[{name:'W12 valid nine-step onboarding outline',status:baseline.length?'FAIL':'PASS',errors:baseline}];
for(const [name,broken] of faults){
 const errors=validate(broken);
 checks.push({name:'W12 injected '+name,status:errors.length?'EXPECTED FAIL':'MISSED',errors});
}
const failed=checks.some(x=>x.status==='FAIL'||x.status==='MISSED');
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/onboarding-structure.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:failed?'FAIL':'PASS',checks},null,2)+'\n');
for(const c of checks)console.log(c.status+' '+c.name);
if(failed)process.exitCode=1;
