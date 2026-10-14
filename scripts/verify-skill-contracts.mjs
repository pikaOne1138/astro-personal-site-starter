import {readdirSync,readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';

const root='.ai';
const dirs=readdirSync(root,{withFileTypes:true}).filter(e=>e.isDirectory()&&existsSync(join(root,e.name,'SKILL.md'))).map(e=>e.name).sort();
const errors=[],items=[],seen=new Set();
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
 items.push({slug,path,name,explicitSkillReferences:[...new Set(references)],scope:'frontmatter and linked files only; AI task behavior NOT TESTED'});
}
const result={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',skills:items.length,errors,items};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/skill-contracts.json',JSON.stringify(result,null,2)+'\n');
console.log('Skill source contracts: '+result.status+'; '+items.length+' named Skills; '+errors.length+' errors');
if(errors.length){errors.forEach(x=>console.error('FAIL '+x));process.exitCode=1;}
