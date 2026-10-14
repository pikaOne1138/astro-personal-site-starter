import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd();
const read=p=>JSON.parse(readFileSync(join(root,p),'utf8'));
const manifest=read('docs/quality/ASSET-COVERAGE.json');
const sources={
 blocks:['src/data/blocks.registry.json','id',['contract','integration','browser','visual']],
 effects:['src/data/effects.registry.json','id',['contract','integration','reducedMotion']],
 layouts:['src/data/layout-directions.json','slug',['contract','responsive','visual']],
 patterns:['src/data/section-patterns.registry.json','id',['contract','integration','visual']],
 skills:[null,'path',['contract','scenario']],
 recipes:[null,'path',['contract','integration','visual']]
};
const recursiveFiles=(base,predicate)=>readdirSync(base,{recursive:true,withFileTypes:true}).filter(x=>x.isFile()).map(x=>join(x.parentPath,x.name).replaceAll('\\','/')).filter(predicate).sort();
const discover=group=>group==='skills'?recursiveFiles('.ai',p=>p.startsWith('.ai/')&&p.endsWith('/SKILL.md')&&p.split('/').length===3):recursiveFiles('.ai/astro-editorial-layout-design/recipes/code',p=>p.endsWith('.astro'));
const idsFor=(group,file,key)=>file?read(file).map(x=>x[key]):discover(group);
const allowed=new Set(['PASS','FAIL','NOTICE','BLOCKED','NOT TESTED']);
const errors=[],items=[],totals={PASS:0,FAIL:0,NOTICE:0,BLOCKED:0,'NOT TESTED':0};
for(const [group,[file,key,required]] of Object.entries(sources)){
 const ids=idsFor(group,file,key);const rows=manifest[group]||{};
 for(const id of ids){
  if(!Object.hasOwn(rows,id)){errors.push(group+'/'+id+': missing coverage declaration');continue;}
  const checks=rows[id];
  for(const type of required){
   const v=checks[type];
   if(!v||!allowed.has(v.status)||typeof v.evidence!=='string'){errors.push(group+'/'+id+'/'+type+': invalid or missing declaration');continue;}
   if(v.status==='PASS'&&(!v.evidence.trim()||!existsSync(join(root,v.evidence))))errors.push(group+'/'+id+'/'+type+': PASS requires existing evidence file');
   totals[v.status]++;
   items.push({group,id,type,status:v.status,evidence:v.evidence});
  }
 }
 for(const id of Object.keys(rows))if(!ids.includes(id))errors.push(group+'/'+id+': stale declaration');
}
const report={schemaVersion:1,headSha:process.env.GITHUB_SHA||null,registrationGate:errors.length?'FAIL':'PASS',registeredAssets:Object.entries(sources).reduce((n,[g,[p,k]])=>n+idsFor(g,p,k).length,0),assertions:totals,errors,items};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/quality-results.json',JSON.stringify(report,null,2)+'\n');
const lines=['# Quality asset coverage','',`Registration: **${report.registrationGate}**; assets: **${report.registeredAssets}**`,`PASS: ${totals.PASS}; NOT TESTED: ${totals['NOT TESTED']}; FAIL: ${totals.FAIL}; BLOCKED: ${totals.BLOCKED}; NOTICE: ${totals.NOTICE}`,'','**Registry coverage registration is not full release acceptance. PASS means assigned existing test source, not a completed browser or visual result.**','','## Outstanding checks',...items.filter(x=>x.status!=='PASS').map(x=>`- ${x.group}/${x.id}/${x.type}: ${x.status}`),'',...errors.map(x=>'FAIL: '+x)];
const md=lines.join('\n')+'\n';
writeFileSync('qa-artifacts/quality/summary.md',md);
if(process.env.GITHUB_STEP_SUMMARY)writeFileSync(process.env.GITHUB_STEP_SUMMARY,md,{flag:'a'});
console.log(`Quality registration: ${report.registrationGate}; ${report.registeredAssets} assets; ${totals['NOT TESTED']} unverified checks`);
if(errors.length){errors.forEach(x=>console.error('FAIL '+x));process.exitCode=1;}
