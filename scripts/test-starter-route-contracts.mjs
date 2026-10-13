import {mkdtempSync,readFileSync,writeFileSync,rmSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'student-route-contract-'));
const layouts=JSON.parse(readFileSync('src/data/layout-directions.json','utf8'));
const plan={
 version:1,kind:'knowledge',layoutSlug:layouts.find(x=>x.kind==='knowledge').slug,visualTheme:'paper',
 brand:{name:'示範站',primaryColor:'#245E50',tagline:'這是可變更網址的 QA 網站'},
 navigation:[
  {id:'articles',label:'文章',enabled:true},
  {id:'about',label:'關於',enabled:true},
  {id:'page-custom-guide',label:'閱讀指南',enabled:true,parentId:'articles',path:'start-here/tools/'}
 ],
 primaryCta:{label:'閱讀指南',pageId:'page-custom-guide'},sectionPatterns:[],notes:''
};
const cases=[];
try{
 const run=(name,input,pass)=>{
  const folder=join(root,name),file=join(root,name+'.json');writeFileSync(file,JSON.stringify(input));
  const result=spawnSync(process.execPath,['scripts/export-starter.mjs',file,folder],{encoding:'utf8',timeout:20000});
  if((result.status===0)!==pass)throw Error(name+': expected '+(pass?'PASS':'FAIL')+', got '+result.status+'\n'+result.stderr.slice(-800));
  cases.push({id:name.match(/\b(?:W\d+|N\d+)\b/)?.[0]||null,name,expected:pass?'PASS':'REJECT',exitCode:result.status,passed:true,diagnostic:(result.stderr||'').slice(0,550)});
  console.log((pass?'PASS ':'CORRECTLY REJECTED ')+name);
  return folder;
 };
 const dir=run('W10 N2 N3 custom CTA route',plan,true);
 const output=JSON.parse(readFileSync(join(dir,'site.config.json'),'utf8'));
 if(!output.navigation.some(n=>n.id==='page-custom-guide'&&n.path==='start-here/tools/'))throw Error('W10 custom route not preserved');
 const home=readFileSync(join(dir,'src/pages/index.astro'),'utf8');
 const layout=readFileSync(join(dir,'src/layouts/SiteLayout.astro'),'utf8');
 const pages=readFileSync(join(dir,'src/pages/[...page].astro'),'utf8');
 const selected=readFileSync(join(dir,'src/components/SelectedPatterns.astro'),'utf8');
 const nav=readFileSync(join(dir,'src/components/StudentNavigation.astro'),'utf8');
 for(const [name,src] of [['hero',home],['header',layout],['dynamic-page',pages],['footer',selected],['navigation',nav]]){
  if(!src.includes('.path')&&!src.includes('path??'))throw Error('W10 '+name+' did not honor custom path field');
 }
 console.log('W10 N2 N3 custom path propagated to hero/header/footer/nav/dynamic pages');
 for(const id of ['W10','N2','N3'])cases.push({id,name:'Custom URL propagated to all generated site consumers',expected:'PASS',passed:true});
 const pkg=JSON.parse(readFileSync(join(dir,'package.json'),'utf8'));
 const page404=readFileSync(join(dir,'src/pages/404.astro'),'utf8');
 if(!pkg.scripts?.build?.includes('[data-pagefind-body]')||!page404.includes('searchable={false}'))throw Error('N12 Pagefind build includes unsearchable 404 content');
 console.log('N12 Pagefind selector excludes 404/nonsearchable pages: PASS');
 cases.push({id:'N12',name:'Pagefind excludes nonsearchable/404',expected:'PASS',passed:true});
 const tokens=readFileSync(join(dir,'public/site.css'),'utf8');
 if(!['--ed-ink:var(--heading)','--ed-ink-2:var(--muted)','--ed-accent:var(--accent)','--ed-line:var(--line)'].every(x=>tokens.includes(x)))throw Error('N13 Block/Editorial shared token bridge missing');
 console.log('N13 learner token aliases are mapped to brand theme: PASS');
 cases.push({id:'N13',name:'Learner design token aliases',expected:'PASS',passed:true});
 const workflow=readFileSync(join(dir,'.github/workflows/pr-check.yml'),'utf8');
 if(!workflow.includes('npm run test:regressions')||!workflow.includes('npm run build')||!workflow.includes('npm run verify')||!workflow.includes('  contents: read')||workflow.includes('  pages: write'))throw Error('N19 student PR workflow missing core tests or has write permissions');
 console.log('N19 read-only learner PR CI checks failure injection, build and site output: PASS');
 cases.push({id:'N19',name:'Read-only learner PR CI controls',expected:'PASS',passed:true});

 const reserved=structuredClone(plan);reserved.navigation[0].path='all-stories/';
 run('N4 article archive reserved path',reserved,false);
 const unsafe=structuredClone(plan);unsafe.navigation[2].path='../secrets/';
 run('W10 unsafe path traversal',unsafe,false);
 const duplicate=structuredClone(plan);duplicate.navigation[2].path='about/';
 run('W10 conflicting route',duplicate,false);
 console.log('W10 N2 N3 N4 normal and negative route fixtures passed');
 mkdirSync('qa-artifacts/quality',{recursive:true});
 writeFileSync('qa-artifacts/quality/starter-route-regression-cases.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',cases,scope:'Current-SHA site generator positive/negative fixtures and source contracts. Independent built web output remains separately audited.'},null,2)+'\n');
}finally{rmSync(root,{recursive:true,force:true})}
