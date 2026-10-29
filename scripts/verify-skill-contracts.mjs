import {readdirSync,readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';

const root='.ai';
const dirs=readdirSync(root,{withFileTypes:true}).filter(e=>e.isDirectory()&&existsSync(join(root,e.name,'SKILL.md'))).map(e=>e.name).sort();
const errors=[],items=[],seen=new Set();
const routeFiles=['AGENTS.md','docs/student-builder-pack/STUDENT-AGENTS.md'];
const routed=new Set();
for(const file of routeFiles){
 if(!existsSync(file))continue;
 for(const m of readFileSync(file,'utf8').matchAll(/\.ai\/([a-z0-9-]+)\/SKILL\.md/g)){
  routed.add(m[1]);
  if(!existsSync(join(root,m[1],'SKILL.md')))errors.push(file+': routing points to a missing Skill .ai/'+m[1]+'/SKILL.md');
 }
}
for(const slug of dirs){
 const path=join(root,slug,'SKILL.md');
 const source=readFileSync(path,'utf8');
 const match=/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
 if(!match){errors.push(path+': missing YAML frontmatter');continue;}
 const name=/^name:\s*([^\r\n]+)$/m.exec(match[1])?.[1]?.trim()?.replace(/^["']|["']$/g,'');
 const description=/^description:\s*(.+)$/m.exec(match[1])?.[1]?.trim();
 if(!name||name!==slug)errors.push(path+': name must match directory slug ('+slug+')');
 if(!description)errors.push(path+': nonempty description required');
 if(seen.has(name))errors.push(path+': duplicated skill name '+name);
 seen.add(name);
 const references=[...source.matchAll(/\.ai\/[a-z0-9-]+\/SKILL\.md/g)].map(m=>m[0]);
 for(const target of new Set(references))if(!existsSync(target))errors.push(path+': missing explicit Skill reference '+target);
 if(!/\bNot for\b|\bnever for\b|\bDo not use\b|不適用|不要用於|不用於/i.test(description||''))errors.push(path+': description must say when NOT to use this Skill (e.g. "Not for ...")');
 if(!routed.has(slug))errors.push(path+': Skill is not listed in any routing table (AGENTS.md or STUDENT-AGENTS.md)');
 items.push({slug,path,name,explicitSkillReferences:[...new Set(references)],scope:'frontmatter and linked files only; AI task behavior NOT TESTED'});
}
const result={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',skills:items.length,errors,items};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/skill-contracts.json',JSON.stringify(result,null,2)+'\n');
console.log('Skill source contracts: '+result.status+'; '+items.length+' named Skills; '+errors.length+' errors');
if(errors.length){errors.forEach(x=>console.error('FAIL '+x));process.exitCode=1;}
