import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const blocks=read('src/data/blocks.registry.json');
const layouts=read('src/data/layout-directions.json');
const patterns=read('src/data/section-patterns.registry.json');
const fail=[];
const unique=(items,name,attr)=>{const keys=items.map(x=>x[attr]);if(keys.some(x=>typeof x!=='string'||!x.trim()))fail.push(name+' has an empty '+attr);if(keys.length!==new Set(keys).size)fail.push(name+' has duplicate '+attr)};
unique(blocks,'Blocks','id');unique(blocks,'Blocks','path');
unique(layouts,'Layouts','slug');unique(patterns,'Patterns','id');
const names=new Set(blocks.map(x=>x.path.split('/').at(-1).replace(/\.astro$/,'')));
for(const block of blocks){
 if(!block.path?.startsWith('src/components/blocks/')||!existsSync(resolve(block.path)))fail.push('Missing Block: '+block.id+' '+block.path);
 if(!Array.isArray(block.compatibleWith)||!block.compatibleWith.some(x=>['knowledge','helper'].includes(x)))fail.push('Bad Block compatibility: '+block.id);
}
for(const pattern of patterns){
 for(const component of pattern.blocks||[])if(!names.has(component))fail.push('Pattern '+pattern.id+' references missing block '+component);
 if(!Array.isArray(pattern.kind)||pattern.kind.some(x=>!['knowledge','helper'].includes(x)))fail.push('Bad Pattern kind: '+pattern.id);
}
if(layouts.length!==12)fail.push('Layout prototype contract requires 12 directions, got '+layouts.length);
for(const kind of ['knowledge','helper'])if(layouts.filter(x=>x.kind===kind).length!==6)fail.push('Expected six '+kind+' layouts');
if(fail.length){console.error(fail.join('\n'));process.exitCode=1}else console.log('Registry contract PASS: '+blocks.length+' Blocks, '+layouts.length+' layouts, '+patterns.length+' section patterns');
