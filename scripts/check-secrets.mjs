import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join,relative,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(process.cwd());
const skipped=new Set(['node_modules','.git','.astro','.cache','qa-artifacts']);
const suspicious=/^(?:\.env(?:\..*)?|.*\.(?:pem|p12|pfx|key)|id_(?:rsa|ed25519)|.*credentials.*\.json)$/i;
const binaryExt=/\.(?:png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|eot|zip|gz|pdf|mp[34]|mov|wasm)$/i;
// Token shapes only; matches are never printed in full.
const patterns=[
 [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,'private key'],
 [/(?:sk_live_|ghp_|gho_|github_pat_)[A-Za-z0-9_-]{12,}/,'GitHub/Stripe token'],
 [/\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{24,}/,'API key (sk-)'],
 [/\bAKIA[0-9A-Z]{16}\b/,'AWS access key'],
 [/\bAIza[0-9A-Za-z_-]{35}\b/,'Google API key'],
 [/\bxox[baprs]-[A-Za-z0-9-]{10,}/,'Slack token'],
 [/\b(?:CLOUDFLARE|CF)_API_(?:TOKEN|KEY)\s*[:=]\s*['"]?[A-Za-z0-9_-]{30,}/i,'Cloudflare API credential'],
 [/(?:api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token)\s*[:=]\s*['"]?[A-Za-z0-9_/+-]{20,}/i,'possible credential value']
];
const publicSecret=/\bPUBLIC_[A-Z0-9_]*(?:TOKEN|SECRET|PASSWORD|PRIVATE|API_?KEY)[A-Z0-9_]*\b/;
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
const mask=v=>v.length<=8?'****':v.slice(0,4)+'…'+v.slice(-4);
function allowedPaths(cwd){
 for(const p of [join(cwd,'scripts/gates.config.json')])if(existsSync(p))try{return new Set(JSON.parse(readFileSync(p,'utf8')).secretsAllowPaths||[]);}catch{}
 return new Set();
}
export function scanSecrets(cwd=root){
 // tracked files plus new, not-yet-ignored files, so a freshly added secret is covered before its first commit
 const git=spawnSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd,encoding:'buffer'});
 const paths=git.status===0?git.stdout.toString('utf8').split('\0').filter(Boolean):listFiles(cwd).map(f=>relative(cwd,f));
 const candidates=[...new Set([...paths,...listFiles(join(cwd,'dist')).map(f=>relative(cwd,f))])].filter(n=>!n.split('/').some(s=>skipped.has(s)));
 const allow=allowedPaths(cwd);
 const issues=[];let scanned=0;
 for(const name of candidates){
  const base=name.split('/').at(-1);
  if(allow.has(name))continue;
  if(suspicious.test(base)){issues.push({file:name,rule:'credential filename'});continue;}
  if(binaryExt.test(base))continue;
  const full=join(cwd,name);
  if(!existsSync(full)||!statSync(full).isFile()||statSync(full).size>2_000_000)continue;
  const buf=readFileSync(full);
  if(buf.includes(0))continue;
  scanned++;
  const lines=buf.toString('utf8').split('\n');
  for(let i=0;i<lines.length;i++){
   const hit=patterns.find(([re])=>re.test(lines[i]));
   if(hit){const m=lines[i].match(hit[0]);issues.push({file:name,line:i+1,rule:hit[1],sample:mask(m[0])});break;}
   const pub=lines[i].match(publicSecret);
   if(pub&&/\.env|\.(?:astro|[mc]?[jt]sx?)$|\.json$/.test(base)){issues.push({file:name,line:i+1,rule:'secret-like value exposed through PUBLIC_ variable',sample:pub[0]});break;}
  }
 }
 return {passed:issues.length===0,issues,scanned};
}
if(process.argv[1]?.endsWith('check-secrets.mjs')){
 const r=scanSecrets();console.log(JSON.stringify({passed:r.passed,issues:r.issues,scanned:r.scanned}));if(!r.passed)process.exitCode=1;
}
