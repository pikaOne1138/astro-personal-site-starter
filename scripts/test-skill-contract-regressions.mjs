import {mkdtempSync,mkdirSync,cpSync,readFileSync,writeFileSync,rmSync,readdirSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'qa-skill-source-'));
try{
 mkdirSync(join(root,'scripts'),{recursive:true});
 cpSync('scripts/verify-skill-contracts.mjs',join(root,'scripts/verify-skill-contracts.mjs'));
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
}finally{rmSync(root,{recursive:true,force:true})}
