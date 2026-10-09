import {mkdtempSync,readFileSync,existsSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import layouts from '../src/data/layout-directions.json' with {type:'json'};
const root=mkdtempSync(join(tmpdir(),'astro-starter-test-'));
const kinds=['knowledge','helper'];
try{
  for(const kind of kinds){
    const plan={
      version:1,kind,layoutSlug:layouts.find(x=>x.kind===kind).slug,visualTheme:'paper',
      brand:{name:kind==='knowledge'?'測試知識站':'測試服務站',primaryColor:'#245E50',tagline:'測試文章與頁面'},
      navigation:(kind==='knowledge'?[{id:'articles',label:'文章'},{id:'about',label:'關於我'}]:[{id:'services',label:'服務'},{id:'about',label:'關於我'}]).map(x=>({...x,enabled:true})),
      primaryCta:kind==='knowledge'?{label:'閱讀文章',pageId:'articles'}:{label:'了解服務',pageId:'services'},
      sectionPatterns:kind==='knowledge'?[{patternId:'featured-work',targetPage:'/',insertAfter:'首頁介紹後'},{patternId:'footer-editorial',targetPage:'site-wide',insertAfter:'所有頁面底部'}]:[{patternId:'trust-service-path',targetPage:'services',insertAfter:'服務介紹後'},{patternId:'footer-professional',targetPage:'site-wide',insertAfter:'所有頁面底部'}],notes:''
    };
    const filename=join(root,kind+'.json'),site=join(root,kind);
    writeFileSync(filename,JSON.stringify(plan));
    execFileSync(process.execPath,['scripts/export-starter.mjs',filename,site],{stdio:'inherit'});
    const out=JSON.parse(readFileSync(join(site,'site.config.json'),'utf8'));
    if(out.layoutSlug!==plan.layoutSlug||out.brand.primaryColor!=='#245E50'||out.navigation.length!==2||out.sectionPatterns.length!==2)throw Error('Config mismatch '+kind);
    if(!existsSync(join(site,'src/pages/index.astro'))||!existsSync(join(site,'astro.config.mjs')))throw Error('Missing generated website');
    const selected=readFileSync(join(site,'src/components/SelectedPatterns.astro'),'utf8');
    const pageLayout=readFileSync(join(site,'src/layouts/SiteLayout.astro'),'utf8');
    if(!selected.includes('settings.sectionPatterns')||!pageLayout.includes('SelectedPatterns'))throw Error('Pattern was not integrated into generated pages');
    if(kind==='knowledge'&&!existsSync(join(site,'src/pages/articles/index.astro')))throw Error('Knowledge articles missing');
    if(kind==='helper'&&existsSync(join(site,'src/pages/articles/index.astro')))throw Error('Unexpected helper articles route');
    if(process.env.FULL_STARTER_BUILD==='1'){
      execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
      execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit'});
    }
  }
  console.log('Starter exporter checks passed for knowledge/helper');
}finally{rmSync(root,{recursive:true,force:true})}
