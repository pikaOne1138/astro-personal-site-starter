import { mkdtempSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const archive='public/AI-建站資料包.zip';
const root=mkdtempSync(join(tmpdir(),'student-pack-audit-'));
try {
  if (!existsSync(archive)) throw Error('Missing built student ZIP');
  execFileSync('python3',['-m','zipfile','-e',archive,root],{stdio:'inherit'});
  const required=[
    'AGENTS.md','START-HERE.md','AGENT-HANDOFF.md','README.md',
    '.ai/astro-pr-preview/SKILL.md','.ai/astro-starter-deploy/SKILL.md',
    '.ai/astro-site-assembly/SKILL.md','.ai/astro-editorial-layout-design/SKILL.md',
    'src/data/layout-directions.json','src/data/blocks.registry.json',
    'src/data/section-patterns.registry.json','src/pages/layouts/index.astro',
    'scripts/export-starter.mjs','src/components','public/layout-library.css'
  ];
  for(const path of required)if(!existsSync(join(root,path)))throw Error('Missing ZIP dependency: '+path);
  const guide=readFileSync(join(root,'AGENTS.md'),'utf8');
  if(!guide.includes('學員')||guide.includes('read `.ai/astro-ui-craft/SKILL.md` first'))throw Error('Research AGENTS was shipped instead of learner AGENTS');
  if(existsSync(join(root,'.github/workflows/deploy-pages.yml')))throw Error('Research deploy workflow included');
  // Execute the *extracted* ZIP's own generator using only its bundled files.
  const { mkdtempSync: temp }=await import('node:fs');
  const output=temp(join(tmpdir(),'student-export-'));
  try {
    for(const kind of ['knowledge','helper']){
      const layouts=JSON.parse(readFileSync(join(root,'src/data/layout-directions.json'),'utf8'));
      const plan={version:1,kind,layoutSlug:layouts.find(x=>x.kind===kind).slug,
        visualTheme:'paper',brand:{name:'學員測試站',primaryColor:'#245E50',tagline:'驗收'},
        navigation:(kind==='knowledge'?['articles','about']:['services','about']).map(id=>({id,label:id,enabled:true})),
        primaryCta:{label:'進入',pageId:kind==='knowledge'?'articles':'services'},sectionPatterns:[]};
      const planFile=join(output,kind+'.json'),site=join(output,kind);
      const { writeFileSync }=await import('node:fs');
      writeFileSync(planFile,JSON.stringify(plan));
      execFileSync(process.execPath,[join(root,'scripts/export-starter.mjs'),planFile,site],{cwd:root,stdio:'inherit'});
      if(!existsSync(join(site,'src/pages/index.astro')))throw Error('Missing exported website for '+kind);
      if(process.env.FULL_STUDENT_PACK_BUILD==='1'){
        execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
        execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
      }
    }
  } finally { rmSync(output,{recursive:true,force:true}); }
  console.log('Student ZIP extracted and standalone knowledge/helper export passed');
} finally { rmSync(root,{recursive:true,force:true}); }
