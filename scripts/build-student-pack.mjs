import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import {layoutDefinitions} from '../src/data/layout-assembly/definitions.mjs';

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
  'public/article-explorer.css',
  'public/layout-gallery.css',
  'public/layout-library.css',
  'public/editorial-recipes.css',
  'public/effects.css',
  'public/layout-media-placeholder.svg',
  'public/multipage-nav.css',
  'public/effects-sample.svg',
  'public/robots.txt',
  'scripts/verify-site-output.mjs',
  'scripts/verify-release-readiness.mjs',
  'scripts/test-release-readiness.mjs',
  'scripts/qa-student-responsive.mjs',
  'scripts/export-starter.mjs',
  'scripts/theme-css.mjs',
  'scripts/design-scan.mjs',
  'scripts/check-start-record.mjs',
  'scripts/gates.mjs',
  'scripts/gates.config.json',
  'scripts/site-state.mjs',
  'scripts/preflight.mjs',
  'scripts/test-gates.mjs',
  'scripts/student-project-context.mjs',
  'scripts/site-status.mjs',
  'scripts/check-secrets.mjs',
  'scripts/check-project-context.mjs',
  'scripts/export-art-direction-starter.mjs',
  'scripts/art-direction-adapters.mjs',
  'scripts/native-layout-adapters.mjs',
  'scripts/expanded-section-patterns.mjs',
  'scripts/verify-starter-export.mjs',
  'scripts/audit-shell-vars.mjs',
  'scripts/shell-token-check.mjs',
  'scripts/audit-css-resolution.mjs',
  'scripts/css-resolution-classification.json',
  'scripts/verify-student-navigation.mjs',
  'scripts/test-student-navigation-regressions.mjs',
  'scripts/test-draft-leakage-regressions.mjs',
  'scripts/test-generated-link-audit.mjs',
  'scripts/build-student-search-index.mjs',
  'scripts/audit-generated-links.mjs',
  'COMPONENTS.md'
]) add(path);
add('docs/student-builder-pack/STUDENT-AGENTS.md', 'AGENTS.md');
add('docs/student-builder-pack/PROJECT-TEMPLATE.md', 'PROJECT-TEMPLATE.md');
add('docs/student-builder-pack/UPSTREAM-SOURCES.md', 'REFERENCE-NOTES.md');
add('docs/student-builder-pack/START-HERE.md', 'START-HERE.md');
add('docs/student-builder-pack/AGENT-HANDOFF.md', 'AGENT-HANDOFF.md');
add('docs/student-builder-pack/RELEASE-APPROVAL-PROMPT.md', 'RELEASE-APPROVAL-PROMPT.md');
add('docs/student-builder-pack/README.md', 'README.md');
/* Exclude internal project research prose and non-distribution artifacts.
   The portable kit intentionally retains source examples and skill references,
   but does not publish unrelated project notes as student-facing instructions. */
for (const name of [...entries.keys()]) {
  if (name.startsWith('docs/') && !name.startsWith('docs/student-builder-pack/') && !name.startsWith('docs/student-intake/')) entries.delete(name);
  if (name.startsWith('.ai/') && /(?:^|\/)(?:\.DS_Store|\.env|node_modules)(?:\/|$)/.test(name)) entries.delete(name);
}

for (const name of [...entries.keys()]) if (/^(?:docs\/(?:student-builder-pack|interview-evaluation)\/(?:interview-scenarios\.json|INTERVIEW-EVALUATION\.md|CROSS-MODEL-E2E-TEST-PACK\.md)|scripts\/(?:evaluate-interview-results|test-interview-evaluation)\.mjs)$/.test(name)) entries.delete(name);
if ([...entries.keys()].some(n=>/interview-scenarios|INTERVIEW-EVALUATION|CROSS-MODEL-E2E-TEST-PACK|evaluate-interview|test-interview-evaluation/.test(n)))throw Error('Student ZIP exposes private evaluation materials');
// One provenance record for the website and the existing student ZIP.
// Use the checked-out source SHA; do not claim that this is a deployed PR SHA.
let sourceSha='unknown';
try { sourceSha=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(); }
catch { /* The learner pack can also be built without Git metadata. */ }
const release={
  schemaVersion:1,
  sourceCommit:sourceSha,
  layoutAdapterCount:layoutDefinitions.filter(x=>x.adapter).length,
  layoutSlugs:layoutDefinitions.filter(x=>x.adapter).map(x=>x.slug),
  layoutStatuses:Object.fromEntries(layoutDefinitions.map(x=>[x.slug,x.assemblyStatus])),
  distribution:'AI-建站資料包.zip',
  releaseStage:'beta-assembly'
};
const provenance=Buffer.from(JSON.stringify(release,null,2)+String.fromCharCode(10));
entries.set('BUILDER-PACK-VERSION.json',provenance);
writeFileSync(resolve('public/builder-pack-version.json'),provenance);
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
if(!entries.has('scripts/export-starter.mjs')||!entries.has('AGENTS.md')||!entries.has('PROJECT-TEMPLATE.md')||!entries.has('scripts/student-project-context.mjs')||!entries.has('.ai/astro-pr-preview/SKILL.md')||!entries.has('src/data/layout-directions.json'))throw Error('Student pack lacks required core files');


const routeShared=['.ai/astro-site-entry/SKILL.md','.ai/astro-pr-preview/SKILL.md','.ai/astro-starter-deploy/SKILL.md','.ai/astro-site-maintenance/SKILL.md','.ai/astro-content-publishing/SKILL.md','.ai/astro-ui-craft/SKILL.md','.ai/astro-layout-craft/SKILL.md','.ai/astro-design-consultation/SKILL.md'];
for(const [name,specific,description] of [
 ['replica',['.ai/url-to-frontend-replica/SKILL.md'],'既有網站復刻'],
 ['from-zero',['.ai/astro-site-from-zero/SKILL.md'],'直接與 AI 討論建站']
]){
 const files=new Map();
 for(const p of [...routeShared,...specific])if(entries.has(p))files.set(p,entries.get(p));else throw Error('Missing route Skill: '+p);
 for(const p of ['AGENTS.md','PROJECT-TEMPLATE.md'])if(entries.has(p))files.set(p,entries.get(p));
 files.set('START-HERE.md',Buffer.from('# '+description+'｜AI Skill 資料包\n\n這份 ZIP 只有 AI 操作 Skill 和必要的共用守則，不是可直接執行的 Astro 網站；建站 AI 需有檔案操作和建置能力。\n先讀 .ai/astro-site-entry/SKILL.md，然後讀 .ai/'+(name==='replica'?'url-to-frontend-replica':'astro-site-from-zero')+'/SKILL.md，其他 Skills 依實際工作按需讀取。\n不必先產生 Site Brief JSON，也不必登入老師的 Repository。使用者明確同意前不可 Merge 或正式發布。\n'));
 files.set('SKILL-PACK-VERSION.json',Buffer.from(JSON.stringify({schemaVersion:1,sourceCommit:sourceSha,route:name,skillFiles:[...files.keys()].filter(x=>x.startsWith('.ai/'))},null,2)+'\n'));
 const filename='AI-'+name+'-skill-pack.zip';
 writeFileSync(resolve('public/'+filename),zip(files));
 console.log('Route Skill pack:',name,files.size,'files');
}
