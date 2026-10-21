import {readFileSync} from 'node:fs';
const packs=[
 ['AI-replica-skill-pack.zip','.ai/url-to-frontend-replica/SKILL.md'],
 ['AI-from-zero-skill-pack.zip','.ai/astro-site-from-zero/SKILL.md']
];
for(const [filename,specific] of packs){
 const b=readFileSync('public/'+filename);const names=new Set();let o=0;
 while(o+30<=b.length&&b.readUInt32LE(o)===0x04034b50){
   const method=b.readUInt16LE(o+8),compressed=b.readUInt32LE(o+18),n=b.readUInt16LE(o+26),extra=b.readUInt16LE(o+28);
   if(method!==0)throw Error(filename+' unsupported ZIP compression');
   names.add(b.subarray(o+30,o+30+n).toString('utf8'));o+=30+n+extra+compressed;
 }
 for(const key of [specific,'.ai/astro-site-entry/SKILL.md','.ai/astro-pr-preview/SKILL.md','START-HERE.md','AGENTS.md','SKILL-PACK-VERSION.json']){
   if(!names.has(key))throw Error(filename+' missing '+key);
 }
 console.log('Validated route ZIP',filename,names.size,'files');
}
