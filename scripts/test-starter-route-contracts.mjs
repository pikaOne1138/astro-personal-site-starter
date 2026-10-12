import {mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
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
try{
 const run=(name,input,pass)=>{
  const folder=join(root,name),file=join(root,name+'.json');writeFileSync(file,JSON.stringify(input));
  const result=spawnSync(process.execPath,['scripts/export-starter.mjs',file,folder],{encoding:'utf8',timeout:20000});
  if((result.status===0)!==pass)throw Error(name+': expected '+(pass?'PASS':'FAIL')+', got '+result.status+'\n'+result.stderr.slice(-800));
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
 const reserved=structuredClone(plan);reserved.navigation[0].path='all-stories/';
 run('N4 article archive reserved path',reserved,false);
 const unsafe=structuredClone(plan);unsafe.navigation[2].path='../secrets/';
 run('W10 unsafe path traversal',unsafe,false);
 const duplicate=structuredClone(plan);duplicate.navigation[2].path='about/';
 run('W10 conflicting route',duplicate,false);
 console.log('W10 N2 N3 N4 normal and negative route fixtures passed');
}finally{rmSync(root,{recursive:true,force:true})}
