import {mkdtempSync,writeFileSync,readFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(new URL('../',import.meta.url).pathname);
function run(cmd,args,cwd,env){
 const p=spawnSync(cmd,args,{cwd,env:{...process.env,...env},encoding:'utf8',timeout:240000,maxBuffer:8*1024*1024});
 if(p.status!==0)throw Error(cmd+' '+args.join(' ')+' failed: '+(p.stderr||p.stdout).slice(-2500));
}
const tmp=mkdtempSync(join(tmpdir(),'atp-index-matrix-'));
try{
 const input=join(tmp,'plan.json'),site=join(tmp,'site');
 const plan={version:1,kind:'knowledge',layoutSlug:'field-notes',visualTheme:'paper',brand:{name:'測試閱讀站',tagline:'安全索引測試',primaryColor:'#445566'},navigation:[{id:'articles',label:'文章',enabled:true},{id:'about',label:'關於',enabled:true}],primaryCta:{pageId:'articles',label:'看文章'},sectionPatterns:[]};
 writeFileSync(input,JSON.stringify(plan));
 run(process.execPath,[join(root,'scripts/export-starter.mjs'),input,site],root,{});
 run('npm',['install','--no-audit','--no-fund'],site,{});
 run('npm',['run','check:context'],site,{});
 const matrix=[
  {name:'default-unpublished',env:{SITE_INDEXABLE:'false'},indexed:false},
  {name:'cloudflare-preview-forced-off',env:{CF_PAGES:'1',CF_PAGES_BRANCH:'feature-preview',SITE_INDEXABLE:'true'},indexed:false},
  {name:'cloudflare-production-approved',env:{CF_PAGES:'1',CF_PAGES_BRANCH:'main',SITE_INDEXABLE:'true'},indexed:true},
  {name:'cloudflare-production-not-approved',env:{CF_PAGES:'1',CF_PAGES_BRANCH:'main',SITE_INDEXABLE:'false'},indexed:false},
  {name:'cloudflare-unknown-production-branch',env:{CF_PAGES:'1',CF_PAGES_BRANCH:'preview',CF_PAGES_PRODUCTION_BRANCH:'',SITE_INDEXABLE:'true'},indexed:false}
 ];
 for(const item of matrix){
  const env={CF_PAGES:'0',CF_PAGES_BRANCH:'',CF_PAGES_PRODUCTION_BRANCH:'main',SITE_INDEXABLE:'false',...item.env};
  run('npm',['run','build'],site,env);
  const html=readFileSync(join(site,'dist','index.html'),'utf8');
  const robots=readFileSync(join(site,'dist','robots.txt'),'utf8');
  const meta=item.indexed?'content="index, follow"':'content="noindex, nofollow, noarchive"';
  if(!html.includes(meta))throw Error(item.name+' missing '+meta);
  if(!robots.includes(item.indexed?'Allow: /':'Disallow: /'))throw Error(item.name+' wrong robots.txt');
  if(!html.includes('rel="canonical"'))throw Error(item.name+' missing canonical');
  for(const path of ['rss.xml','sitemap.xml'])if(!existsSync(join(site,'dist',path)))throw Error(item.name+' missing '+path);
  console.log('PASS',item.name,item.indexed?'INDEX':'NOINDEX');
 }
}finally{rmSync(tmp,{recursive:true,force:true});}
