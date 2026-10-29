import {mkdtempSync,mkdirSync,cpSync,readFileSync,writeFileSync,rmSync,readdirSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'qa-skill-source-'));
try{
 mkdirSync(join(root,'scripts'),{recursive:true});
 cpSync('scripts/verify-skill-contracts.mjs',join(root,'scripts/verify-skill-contracts.mjs'));
 for(const f of ['AGENTS.md','docs/student-builder-pack/STUDENT-AGENTS.md']){mkdirSync(dirname(join(root,f)),{recursive:true});cpSync(f,join(root,f));}
 for(const e of readdirSync('.ai',{withFileTypes:true}).filter(x=>x.isDirectory())){
  const p=join('.ai',e.name,'SKILL.md');
  if(existsSync(p)){mkdirSync(dirname(join(root,p)),{recursive:true});cpSync(p,join(root,p));}
 }
 const file=join(root,'.ai/astro-pr-preview/SKILL.md');
 const original=readFileSync(file,'utf8');
 const check=(label,expected)=>{const p=spawnSync(process.execPath,['scripts/verify-skill-contracts.mjs'],{cwd:root,encoding:'utf8'});if((p.status===0)!==expected)throw Error(label+': unexpected '+p.status+' '+p.stdout+' '+p.stderr);console.log(label+': '+(expected?'PASS':'correctly FAIL'))};
 check('all original Skills have valid source contracts',true);
 writeFileSync(file,original.replace(/^name:\s*[^\n]+/m,'name: qa-invalid-skill-name'));check('wrong Skill name',false);
 writeFileSync(file,original);
 writeFileSync(file,original+'\nCheck .ai/qa-nonexistent/SKILL.md as a dependency.\n');check('broken cross-Skill reference',false);
 writeFileSync(file,original);
 writeFileSync(file,original.replace(/^(description:.*)$/m,l=>l.replace(/\bNot for\b|\bnever for\b|\bDo not use\b|不適用|不要用於|不用於/gi,'Only for')));check('description without a when-not-to-use clause',false);
 writeFileSync(file,original);
 mkdirSync(join(root,'.ai/qa-unrouted-skill'),{recursive:true});
 writeFileSync(join(root,'.ai/qa-unrouted-skill/SKILL.md'),'---\nname: qa-unrouted-skill\ndescription: Not for any real task.\n---\n');check('Skill missing from the routing tables',false);
 rmSync(join(root,'.ai/qa-unrouted-skill'),{recursive:true,force:true});
 check('routing restored',true);
}finally{rmSync(root,{recursive:true,force:true})}
