import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';

// Build-time student distribution. Deliberately excludes the research Git history,
// showcase workflows, internal README and any credentials or environment files.
const root = resolve('.');
const output = resolve('public/AI-建站資料包.zip');
const entries = new Map();
function add(from, to = from) {
  const full = resolve(root, from);
  const st = statSync(full);
  if (st.isDirectory()) {
    for (const name of readdirSync(full)) add(join(from, name), join(to, name));
    return;
  }
  if (!st.isFile() || /(^|[/\\])(?:node_modules|\.git|\.env[^/\\]*)(?:[/\\]|$)/.test(from)) return;
  const name = to.split(sep).join('/');
  if (!/\.(md|mdx|astro|ts|js|mjs|json|jsonc|css|svg|html|txt|png|jpg|jpeg|webp|woff2)$/.test(name)) return;
  entries.set(name, readFileSync(full));
}
// Keep real source-relative paths: bundled Skills can find their actual references,
// and the generator can load ../src/data/*.json without access to the research repo.
for (const path of [
  '.ai',
  'src',
  'docs',
  'public/demo.css',
  'public/blocks.css',
  'public/blocks-v2.css',
  'public/layout-gallery.css',
  'public/layout-library.css',
  'public/editorial-recipes.css',
  'public/effects.css',
  'public/layout-media-placeholder.svg',
  'public/v02.css',
  'public/effects-sample.svg',
  'public/robots.txt',
  'scripts/verify-v2-8-output.mjs',
  'scripts/export-starter.mjs',
  'scripts/verify-starter-export.mjs',
  'COMPONENTS.md'
]) add(path);
add('docs/student-builder-pack/STUDENT-AGENTS.md', 'AGENTS.md');
add('docs/student-builder-pack/UPSTREAM-SOURCES.md', 'REFERENCE-NOTES.md');
add('docs/student-builder-pack/START-HERE.md', 'START-HERE.md');
add('docs/student-builder-pack/AGENT-HANDOFF.md', 'AGENT-HANDOFF.md');
add('docs/student-builder-pack/README.md', 'README.md');
/* Exclude internal project research prose and non-distribution artifacts.
   The portable kit intentionally retains source examples and skill references,
   but does not publish unrelated project notes as student-facing instructions. */
for (const name of [...entries.keys()]) {
  if (name.startsWith('docs/') && !name.startsWith('docs/student-builder-pack/') && !name.startsWith('docs/student-intake/')) entries.delete(name);
  if (name.startsWith('.ai/') && /(?:^|\/)(?:\.DS_Store|\.env|node_modules)(?:\/|$)/.test(name)) entries.delete(name);
}

// ZIP files must also contain the actual reference roots declared in the Skills;
// absent optional research files are documented rather than fabricated.

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);
  return c>>>0;
});
function crc32(buf) { let c=0xffffffff;for(const b of buf)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0; }
function header(size) {return Buffer.alloc(size);}
function zip(items) {
 const blocks=[],central=[];let offset=0;
 for(const [name,data] of [...items].sort((a,b)=>a[0].localeCompare(b[0]))) {
  const filename=Buffer.from(name,'utf8'),crc=crc32(data);
  const local=header(30);
  local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);local.writeUInt16LE(0x0800,6);
  local.writeUInt16LE(0,8);local.writeUInt32LE(crc,14);local.writeUInt32LE(data.length,18);
  local.writeUInt32LE(data.length,22);local.writeUInt16LE(filename.length,26);
  blocks.push(local,filename,data);
  const dir=header(46);
  dir.writeUInt32LE(0x02014b50,0);dir.writeUInt16LE(20,4);dir.writeUInt16LE(20,6);
  dir.writeUInt16LE(0x0800,8);dir.writeUInt16LE(0,10);dir.writeUInt32LE(crc,16);
  dir.writeUInt32LE(data.length,20);dir.writeUInt32LE(data.length,24);
  dir.writeUInt16LE(filename.length,28);dir.writeUInt32LE(offset,42);
  central.push(dir,filename);offset+=local.length+filename.length+data.length;
 }
 const dirSize=central.reduce((n,b)=>n+b.length,0),end=header(22);
 end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(items.size,8);end.writeUInt16LE(items.size,10);
 end.writeUInt32LE(dirSize,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([...blocks,...central,end]);
}
mkdirSync(resolve('public'),{recursive:true});
const data=zip(entries);writeFileSync(output,data);
console.log('Student distribution:',entries.size,'files,',data.length,'bytes');
if(!entries.has('scripts/export-starter.mjs')||!entries.has('AGENTS.md')||!entries.has('.ai/astro-pr-preview/SKILL.md')||!entries.has('src/data/layout-directions.json'))throw Error('Student pack lacks required core files');
