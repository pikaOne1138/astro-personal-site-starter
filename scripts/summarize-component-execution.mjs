import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const read=x=>existsSync(dir+'/'+x)?JSON.parse(readFileSync(dir+'/'+x,'utf8')):null;
const inventory=JSON.parse(readFileSync('docs/quality/COMPONENT-COVERAGE.json','utf8'));
const syntax=read('all-astro-components.json'),blocks=read('block-effect-browser.json'),recipes=read('editorial-recipes-browser.json'),patterns=read('section-patterns-browser.json');
const sha=process.env.GITHUB_SHA||null;
const usable=(doc)=>doc&&doc.sha===sha&&(doc.status==='PASS'||(doc.failed===0&&Array.isArray(doc.rows)));
const syntaxOk=syntax?.status==='PASS'&&syntax?.headSha===sha;
const groups={},rows=[];
for(const [path,declaration] of Object.entries(inventory.components)){
 const row={path,group:declaration.group,syntax:'NOT TESTED',demo:'NOT TESTED',responsive:'NOT TESTED',props:'NOT TESTED',behavior:'NOT TESTED',accessibility:'NOT TESTED',integration:'NOT TESTED',evidence:[]};
 const st=syntax?.individualResults?.find(x=>x.path===path);
 if(syntaxOk&&st?.syntax==='PASS'){row.syntax='PASS';row.evidence.push({source:'all-astro-components.json',checkoutSha:sha,scope:'Astro source parses'})}
 const name=path.split('/').pop().replace(/\.astro$/,'');
 if(declaration.group==='blocks'&&usable(blocks)){
  const registered=blocks.blockGalleryCoverage?.find(x=>x.name===name);
  if(registered?.galleryLabelSeen){row.demo='GALLERY LABEL OBSERVED';row.evidence.push({source:'block-effect-browser.json',checkoutSha:sha,scope:'Block name appears in built gallery; not necessarily individualized browser behavior'})}
 }
 if(declaration.group==='effects'&&usable(blocks)){
  const pass=(blocks.rows||[]).filter(x=>x.kind==='effects'&&[1440,1280,768,390].includes(x.width));
  if(pass.length===4&&pass.every(x=>x.allEffects?.[name]===true)){row.demo='PASS';row.responsive='PASS';row.evidence.push({source:'block-effect-browser.json',checkoutSha:sha,scope:'Four responsive rendered DOM samples and reduced-motion page fixture'})}
 }
 if(declaration.group==='editorialRecipes'&&usable(recipes)){
  const id=name.slice(0,3);
  const matched=(recipes.entries||[]).flatMap(e=>(e.recipes||[]).filter(x=>x.id===id).map(x=>({...x,width:e.width})));
  if(matched.length===4&&matched.every(x=>x.present&&x.hasContent&&x.height>=8&&x.display!=='none')){row.demo='PASS';row.responsive='PASS';row.evidence.push({source:'editorial-recipes-browser.json',checkoutSha:sha,scope:'All four responsive rendered recipe instances'})}
 }
 if(declaration.group==='patterns'&&usable(patterns)){
  const associated=name==='FeaturedWorkSection'?['featured-work']:name==='TrustServiceSection'?['trust-service-path']:name==='FooterPattern'?['footer-minimal','footer-editorial','footer-professional']:[];
  const ok=associated.every(id=>(patterns.rows||[]).filter(x=>[1440,1280,768,390].includes(x.width)).every(x=>x.patterns?.some(p=>p.id===id&&p.present&&p.visible&&p.hasContent)));
  if(associated.length&&patterns.rows?.length===4&&ok){row.demo='PASS';row.responsive='PASS';row.evidence.push({source:'section-patterns-browser.json',checkoutSha:sha,scope:'Actual pattern gallery component at four viewport widths'})}
 }
 rows.push(row);groups[row.group]??={total:0,syntax:0,observed:0};groups[row.group].total++;
 if(row.syntax==='PASS')groups[row.group].syntax++;
 if(row.demo!=='NOT TESTED')groups[row.group].observed++;
}
const report={schemaVersion:1,prHeadSha:process.env.PR_HEAD_SHA||null,checkoutSha:sha,sourceAssetCount:rows.length,groups,rows,releaseAcceptance:'NOT TESTED',limitations:['Gallery name is not equivalent to independently verified Props/behavior','All source components compile, not every configuration or combination','Shared components require own functional and integration proofs','No human visual approval']};
writeFileSync(dir+'/component-execution-coverage.json',JSON.stringify(report,null,2)+'\n');
console.log('All components evidence: '+report.sourceAssetCount+' tracked; '+JSON.stringify(groups));
