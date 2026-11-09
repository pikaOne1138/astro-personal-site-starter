import {readFileSync,mkdtempSync,mkdirSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,resolve} from 'node:path';
import assert from 'node:assert/strict';

const zipPath='public/AI-建站資料包.zip';
assert.ok(existsSync(zipPath),'student ZIP missing (run build-student-pack.mjs first)');
const buf=readFileSync(zipPath),entries=new Map();
let offset=0;
while(offset+30<=buf.length && buf.readUInt32LE(offset)===0x04034b50){
 const flags=buf.readUInt16LE(offset+6),method=buf.readUInt16LE(offset+8);
 assert.equal(method,0,'pack builder expects stored ZIP data');
 assert.ok(flags & 0x0800,'UTF-8 names must be flagged');
 const compressed=buf.readUInt32LE(offset+18);
 const nameLen=buf.readUInt16LE(offset+26),extra=buf.readUInt16LE(offset+28);
 const start=offset+30+nameLen+extra;
 const name=buf.subarray(offset+30,offset+30+nameLen).toString('utf8');
 assert.ok(!name.startsWith('/') && !name.split('/').includes('..'),'unsafe path '+name);
 assert.ok(!entries.has(name),'duplicate ZIP entry '+name);
 assert.ok(start+compressed<=buf.length,'truncated '+name);
 entries.set(name,buf.subarray(start,start+compressed));
 offset=start+compressed;
}
assert.ok(buf.length>offset,'central directory missing');
assert.equal(buf.readUInt32LE(offset),0x02014b50,'ZIP central directory signature missing');
const required=[
 '.ai/astro-site-entry/SKILL.md',
 '.ai/astro-site-entry/route-contract.mjs',
 '.ai/astro-site-maintenance/SKILL.md',
 '.ai/astro-design-consultation/SKILL.md',
 '.ai/SHARED-DESIGN-HANDOFF.md',
 'docs/student-builder-pack/START-MAINTENANCE-PROMPT.txt',
 'docs/student-builder-pack/STUDENT-AGENTS.md',
 'AGENTS.md',
 'START-HERE.md'
];
for(const name of required){
 assert.ok(entries.has(name),'missing ZIP member '+name);
 const expected=name==='AGENTS.md'?'docs/student-builder-pack/STUDENT-AGENTS.md':
   name==='START-HERE.md'?'docs/student-builder-pack/START-HERE.md':name;
 assert.deepEqual(entries.get(name),readFileSync(expected),'ZIP differs from canonical source '+name);
}
const tmp=mkdtempSync(join(tmpdir(),'atp-companion-zip-'));
try{
 for(const name of required){
  const output=resolve(tmp,name);assert.ok(output.startsWith(tmp+'/'),'path traversal');
  mkdirSync(dirname(output),{recursive:true});
  writeFileSync(output,entries.get(name));
  assert.deepEqual(readFileSync(output),entries.get(name),'extraction mismatch '+name);
 }
 const skills=['astro-site-entry','astro-site-maintenance','astro-design-consultation'];
 for(const name of skills){
  const source=entries.get('.ai/'+name+'/SKILL.md').toString('utf8');
  for(const ref of source.matchAll(/\.ai\/[a-z0-9-]+\/SKILL\.md/g)){
   assert.ok(entries.has(ref[0]),name+' missing required reference '+ref[0]);
  }
 }
 const prompt=entries.get('docs/student-builder-pack/START-MAINTENANCE-PROMPT.txt').toString('utf8');
 assert.match(prompt,/只有我沒說明目的時/);
 assert.match(prompt,/不得重跑 Starter 匯出器/);
 console.log('PASS ZIP created, parsed, extracted and canonical prompt/skill references verified',required.length,'key members;',entries.size,'total members');
}finally{rmSync(tmp,{recursive:true,force:true});}
