import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join,relative,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(process.cwd());
const skipped=new Set(['node_modules','.git','.astro','.cache']);
const suspicious=/^(?:\.env(?:\..*)?|.*\.(?:pem|p12|pfx|key)|id_(?:rsa|ed25519)|.*credentials.*\.json)$/i;
function listFiles(path,files=[]){
 if(!existsSync(path))return files;
 for(const e of readdirSync(path,{withFileTypes:true})){
  if(e.isSymbolicLink())continue;
  const target=join(path,e.name);
  if(e.isDirectory()){if(!skipped.has(e.name))listFiles(target,files);}
  else if(e.isFile())files.push(target);
 }
 return files;
}
export function scanSecrets(cwd=root){
 const git=spawnSync('git',['ls-files','--cached','-z'],{cwd,encoding:'buffer'});
 const paths=git.status===0?git.stdout.toString('utf8').split('\0').filter(Boolean):listFiles(cwd).map(f=>relative(cwd,f));
 const candidates=[...new Set([...paths,...listFiles(join(cwd,'dist')).map(f=>relative(cwd,f))])];
 const issues=[];
 for(const name of candidates){
  const base=name.split('/').at(-1);
  if(suspicious.test(base)){issues.push({file:name,rule:'credential filename'});continue;}
  const full=join(cwd,name);
  if(!existsSync(full)||statSync(full).size>2_000_000)continue;
  const data=readFileSync(full,'utf8');
  if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:sk_live_|ghp_|github_pat_)[A-Za-z0-9_-]{12,}|(?:api[_-]?key|secret[_-]?key)\s*[:=]\s*['"]?[A-Za-z0-9_/-]{20,}/i.test(data))issues.push({file:name,rule:'possible credential value'});
 }
 return {passed:issues.length===0,issues};
}
if(process.argv[1]?.endsWith('check-secrets.mjs')){
 const r=scanSecrets();console.log(JSON.stringify({passed:r.passed,issues:r.issues}));if(!r.passed)process.exitCode=1;
}
