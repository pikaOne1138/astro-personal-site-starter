import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {transform} from '@astrojs/compiler';
const files=new Set();
const blocks=JSON.parse(readFileSync('src/data/blocks.registry.json','utf8'));
for(const block of blocks)files.add(block.path);
for(const dir of ['src/components/effects','src/components/patterns','.ai/astro-editorial-layout-design/recipes/code']){
 if(!existsSync(dir))continue;
 const scan=p=>{for(const ent of readdirSync(p,{withFileTypes:true})){const item=join(p,ent.name);if(ent.isDirectory())scan(item);else if(item.endsWith('.astro'))files.add(item)}};
 scan(dir);
}
const failures=[];let count=0;
for(const path of files){
 try{await transform(readFileSync(path,'utf8'),{filename:resolve(path)});count++}
 catch(err){failures.push(path+': '+(err?.message||String(err)).slice(0,700))}
}
if(failures.length){console.error('Astro component syntax contract FAILED ('+failures.length+'/'+files.size+'):\n'+failures.join('\n'));process.exitCode=1}
else console.log('Astro component syntax PASS: '+count+' registered Blocks, Effects, Pattern and Editorial recipes.');
