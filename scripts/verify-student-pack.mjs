import {layoutDefinitions} from '../src/data/layout-assembly/definitions.mjs';
import { mkdtempSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const archive=process.env.STUDENT_PACK_ARCHIVE||'public/AI-建站資料包.zip';
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
    'scripts/export-starter.mjs','scripts/verify-student-navigation.mjs','src/components','public/layout-library.css',
    'public/v02.css','public/effects-sample.svg','public/robots.txt',
    'scripts/verify-v2-8-output.mjs','scripts/build-student-search-index.mjs','scripts/test-generated-link-audit.mjs','docs/student-intake/01-AI-訪談主持人.md'
  ];
  for(const path of required)if(!existsSync(join(root,path)))throw Error('Missing ZIP dependency: '+path);
  // Both the built website and the downloadable ZIP must declare the same source version.
  const webManifest=JSON.parse(readFileSync('public/builder-pack-version.json','utf8'));
  const zipManifest=JSON.parse(readFileSync(join(root,'BUILDER-PACK-VERSION.json'),'utf8'));
  if(JSON.stringify(webManifest)!==JSON.stringify(zipManifest))throw Error('Guide/Builder Pack version mismatch');
  if(!Array.isArray(zipManifest.layoutSlugs)||zipManifest.layoutSlugs.length!==layoutDefinitions.filter(x=>x.adapter).length||zipManifest.layoutAdapterCount!==layoutDefinitions.filter(x=>x.adapter).length)throw Error('Builder Pack manifest missing registered layouts');
  if(!/^[a-f0-9]{40}$/.test(zipManifest.sourceCommit)&&zipManifest.sourceCommit!=='unknown')throw Error('Invalid source commit version');
  const guide=readFileSync(join(root,'AGENTS.md'),'utf8');
  if(!guide.includes('學員')||guide.includes('read `.ai/astro-ui-craft/SKILL.md` first'))throw Error('Research AGENTS was shipped instead of learner AGENTS');
  if(existsSync(join(root,'.github/workflows/deploy-pages.yml')))throw Error('Research deploy workflow included');
  // Execute the *extracted* ZIP's own generator using only its bundled files.
  const { mkdtempSync: temp }=await import('node:fs');
  const output=temp(join(tmpdir(),'student-export-'));
  try {
    const layouts=JSON.parse(readFileSync(join(root,'src/data/layout-directions.json'),'utf8'));
    if(layouts.length!==12)throw Error('Expected 12 directions, got '+layouts.length);
    // The existing AI Builder Pack—not a separate ZIP generator—must ship
    // all independent layout adapters and their registry/source contracts.
    const definitionsPath=join(root,'src/data/layout-assembly/definitions.mjs');
    if(!existsSync(definitionsPath))throw Error('Student ZIP missing layout assembly registry');
    const {getLayoutDefinition}=await import('file://'+definitionsPath);
    for(const layout of layouts){
      const definition=getLayoutDefinition(layout.slug,layout.kind);
      if(!definition?.adapter)throw Error('Student ZIP missing adapter definition: '+layout.slug);
      const source=join(root,'src/data/layout-assembly',layout.slug,'Home.astro');
      if(!existsSync(source))throw Error('Student ZIP missing independent homepage source: '+layout.slug);
    }
    for(const layout of layouts){
      const {kind}=layout;
      const plan={version:1,kind,layoutSlug:layout.slug,
        visualTheme:'paper',brand:{name:'學員測試站',primaryColor:'#245E50',tagline:'驗收'},
        navigation:(kind==='knowledge'?['articles','about']:['services','about']).map(id=>({id,label:id,enabled:true})),
        primaryCta:{label:'進入',pageId:kind==='knowledge'?'articles':'services'},sectionPatterns:[]};
      const planFile=join(output,layout.slug+'.json'),site=join(output,layout.slug);
      const { writeFileSync }=await import('node:fs');
      writeFileSync(planFile,JSON.stringify(plan));
      execFileSync(process.execPath,[join(root,'scripts/export-starter.mjs'),planFile,site],{cwd:root,stdio:'inherit'});
      if(!existsSync(join(site,'src/pages/index.astro')))throw Error('Missing exported website for '+layout.slug);
      const config=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8'));
      if(config.kind!==kind||config.layoutSlug!==layout.slug)throw Error('Layout selection lost: '+layout.slug);
      if(!config.layoutAdapter)throw Error('Layout adapter was not selected from student ZIP: '+layout.slug);
      const homeSource=join(site,'src/components/layouts/selected/Home.astro');
      if(!existsSync(homeSource)||!readFileSync(homeSource,'utf8').includes('data-assembled-layout="'+layout.slug+'"'))throw Error('Student ZIP exported wrong independent homepage: '+layout.slug);

      if(process.env.FULL_STUDENT_PACK_BUILD==='1' && (layout===layouts.find(x=>x.kind==='knowledge')||layout===layouts.find(x=>x.kind==='helper'))){
        writeFileSync(join(site,'src/content/articles/qa-public.md'),'---\ntitle: QA public\ndescription: Public regression fixture\npublishedAt: 2026-10-09\ndraft: false\n---\nPublic regression content.');
        writeFileSync(join(site,'src/content/articles/qa-draft.md'),'---\ntitle: QA draft\ndescription: Draft regression fixture\npublishedAt: 2026-10-09\ndraft: true\n---\nDraft regression content.');
        execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
        execFileSync('npm',['run','test:regressions'],{cwd:site,stdio:'inherit'});
        execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
        execFileSync('npm',['run','verify'],{cwd:site,stdio:'inherit'});
        for(const file of ['rss.xml','sitemap.xml','robots.txt','pagefind/pagefind.js','search/exact-zh.json'])if(!existsSync(join(site,'dist',file)))throw Error('Missing generated SEO endpoint '+file+' for '+kind);
        const sitemap=readFileSync(join(site,'dist/sitemap.xml'),'utf8');
        if(!sitemap.includes('https://example.com'))throw Error('Unexpected sitemap site URL');
        const rss=readFileSync(join(site,'dist/rss.xml'),'utf8');
        const robots=readFileSync(join(site,'dist/robots.txt'),'utf8');
        if(!/^User-agent: \*$/m.test(robots)||!/^Sitemap: https?:\/\//m.test(robots)||robots.includes('\\n'))throw Error('Invalid robots lines');
        if(rss.includes('qa-draft')||sitemap.includes('qa-draft')||existsSync(join(site,'dist/articles/qa-draft/index.html')))throw Error('Draft leaked');
        if(kind==='knowledge'&&(!rss.includes('qa-public')||!sitemap.includes('qa-public')||!existsSync(join(site,'dist/articles/qa-public/index.html'))))throw Error('Public article missing');
        execFileSync(process.execPath,[join(root,'scripts/verify-v2-8-output.mjs'),'--student-site',site],{stdio:'inherit'});

      }
    }
    const expanded=JSON.parse(readFileSync(join(root,'src/data/layout-assembly/expansion-directions.json'),'utf8'));
    for(const layout of expanded){
      const {writeFileSync}=await import('node:fs');
      const plan={version:1,kind:layout.kind,layoutSlug:layout.slug,visualTheme:'paper',brand:{name:'QA ZIP 獨立測試',primaryColor:'#355747'},navigation:[{id:'about',label:'關於',enabled:true}],primaryCta:{label:'關於',pageId:'about'}};
      const file=join(output,layout.slug+'.json'),site=join(output,layout.slug);writeFileSync(file,JSON.stringify(plan));
      execFileSync(process.execPath,[join(root,'scripts/export-starter.mjs'),file,site,'--require-assembled'],{cwd:root,stdio:'inherit'});
      const config=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8'));
      if(config.layoutSlug!==layout.slug||config.layoutAdapter.assemblyStatus==='ready')throw Error('Expanded ZIP adapter selection/status invalid: '+layout.slug);
      if(!existsSync(join(site,'src/pages/index.astro')))throw Error('Expanded ZIP renderer missing: '+layout.slug);
    }
  } finally { rmSync(output,{recursive:true,force:true}); }
  console.log('Student ZIP extracted: all 25 registered layout selections export; knowledge/helper Astro builds '+(process.env.FULL_STUDENT_PACK_BUILD==='1'?'passed':'SKIPPED (set FULL_STUDENT_PACK_BUILD=1)'));
} finally { rmSync(root,{recursive:true,force:true}); }
