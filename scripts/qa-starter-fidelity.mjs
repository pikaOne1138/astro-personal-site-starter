/**
 * P0 visual QA: compare original prototypes and independently exported student
 * sites at 1440/1280/768/390. Screenshots are evidence for HUMAN sign-off,
 * never an automatic declaration of pixel fidelity.
 *
 * Run after root npm run build and Playwright Chromium install.
 */
import {chromium} from 'playwright';
import directions from '../src/data/layout-directions.json' with {type:'json'};
import {spawn,execFileSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,symlinkSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
const out=resolve(process.env.STARTER_FIDELITY_OUT||'.preview-qa/starter-fidelity');
mkdirSync(out,{recursive:true});
const work=mkdtempSync(join(tmpdir(),'starter-fidelity-'));
const root=resolve('.');
const widths=[1440,1280,768,390];
const errors=[],records=[];
const servers=[];
let browser;
function serve(directory,port){
 const child=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',directory],{stdio:'ignore'});
 servers.push(child);return child;
}
async function reachable(url){
 for(let i=0;i<40;i++){
  try{const res=await fetch(url);if(res.ok)return;}catch{}
  await new Promise(r=>setTimeout(r,250));
 }
 throw Error('Local preview not reachable: '+url);
}
async function inspect(page,url,file){
 const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
 if(!response?.ok())throw Error('HTTP '+response?.status()+' for '+url);
 await Promise.race([page.evaluate(()=>document.fonts.ready),new Promise(r=>setTimeout(r,4500))]);
 const info=await page.evaluate(()=>{
  const doc=document.documentElement;
  return {
   title:document.title,
   h1:[...document.querySelectorAll('h1')].map(n=>n.textContent.trim()),
   main:!!document.querySelector('main'),
   bodyWidth:doc.scrollWidth,
   viewportWidth:innerWidth,
   brokenLocalImages:[...document.images].filter(n=>!n.complete||n.naturalWidth===0).filter(n=>new URL(n.src).origin===location.origin).map(n=>n.src),
   anchors:[...document.querySelectorAll('a[href^="#"]')].filter(n=>n.getAttribute('href')!=='#'&&!document.getElementById(n.getAttribute('href').slice(1))).map(n=>n.getAttribute('href'))
  };
 });
 await page.screenshot({path:file,type:'jpeg',quality:73,fullPage:true,animations:'disabled'});
 return info;
}
try{
 browser=await chromium.launch({headless:true});
 serve(join(root,'dist'),4481);
 await reachable('http://127.0.0.1:4481/layouts/');
 for(const item of directions){
  const site=join(work,item.slug);
  const plan={version:1,kind:item.kind,layoutSlug:item.slug,visualTheme:'paper',
   brand:{name:'示範學員網站',primaryColor:'#50775B',tagline:'我的內容與服務',typography:'balanced',imageStyle:'natural'},
   navigation:(item.kind==='knowledge'?[['articles','文章'],['about','關於']]:[['services','服務'],['about','關於']]).map(([id,label])=>({id,label,enabled:true})),
   primaryCta:item.kind==='knowledge'?{label:'閱讀文章',pageId:'articles'}:{label:'查看服務',pageId:'services'},
   sectionPatterns:[],notes:''};
  const planFile=join(work,item.slug+'.json');
  writeFileSync(planFile,JSON.stringify(plan));
  execFileSync(process.execPath,['scripts/export-starter.mjs',planFile,site,'--require-assembled'],{cwd:root,stdio:'pipe'});
  symlinkSync(join(root,'node_modules'),join(site,'node_modules'),'dir');
  execFileSync('npm',['run','build'],{cwd:site,stdio:'pipe',timeout:120000});
  const studentServer=serve(join(site,'dist'),4482);
  await reachable('http://127.0.0.1:4482/');
  for(const width of widths){
   const height=width===390?844:width===768?1024:900;
   const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
   const protoFile=item.slug+'-'+width+'-prototype.jpg';
   const studentFile=item.slug+'-'+width+'-student.jpg';
   const prototype=await inspect(page,'http://127.0.0.1:4481/layouts/'+item.slug+'/',join(out,protoFile));
   const student=await inspect(page,'http://127.0.0.1:4482/',join(out,studentFile));
   const problems=[];
   if(!student.main||student.h1.length!==1)problems.push('Missing main or exactly one H1');
   if(student.bodyWidth>width+2)problems.push('Student horizontal overflow '+student.bodyWidth+'/'+width);
   if(student.brokenLocalImages.length)problems.push('Student broken local image');
   if(student.anchors.length)problems.push('Unresolved student anchors: '+student.anchors.join(','));
   if(problems.length)errors.push(item.slug+' '+width+': '+problems.join('; '));
   records.push({slug:item.slug,width,height,prototype:{screenshot:protoFile,...prototype},student:{screenshot:studentFile,...student},problems,visualReview:'NOT REVIEWED'});
   await page.close();
  }
  studentServer.kill('SIGTERM');
  await new Promise(r=>setTimeout(r,250));
 }
 const manifest={version:1,source:process.env.GITHUB_SHA||null,notes:'Original Astro prototype vs standalone export. Automated geometry only; human fidelity NOT reviewed.',records,errors};
 writeFileSync(join(out,'results.json'),JSON.stringify(manifest,null,2)+'\n');
 const escape=s=>String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
 const cells=records.map(r=>'<section><h2>'+escape(r.slug)+' · '+r.width+' px</h2><p>'+escape(r.problems.join('; ')||'No automated geometry problems; visual comparison pending')+'</p><div class="pair"><figure><img loading="lazy" src="'+r.prototype.screenshot+'"/><figcaption>Original Astro Prototype</figcaption></figure><figure><img loading="lazy" src="'+r.student.screenshot+'"/><figcaption>Independent Student Starter</figcaption></figure></div></section>').join('\n');
 writeFileSync(join(out,'index.html'),'<!doctype html><html lang="zh-Hant"><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>12 Layouts / Student fidelity QA</title><style>body{font:16px/1.5 system-ui;margin:2rem;background:#f5f3ed;color:#27241f}section{border-top:2px solid #777;margin:3rem 0;padding-top:1rem}.pair{display:grid;grid-template-columns:1fr 1fr;gap:2rem}figure{margin:0}img{width:100%;height:auto;border:1px solid #777}figcaption{font-weight:bold;margin:.5rem 0}@media(max-width:760px){.pair{grid-template-columns:1fr}}</style><h1>12 Astro Layouts · Prototype vs Student Export</h1><p>四種尺寸視覺對照。此頁不表示人工驗收通過；真正 Starter Ready 仍須逐款核准。</p>'+cells+'</html>');
 if(errors.length)throw Error('Student visual smoke failed:\n'+errors.join('\n'));
 console.log('Starter visual smoke passed: '+records.length+' paired comparisons; human approval remains pending');
}finally{
 if(browser)await browser.close();
 for(const server of servers)server.kill('SIGTERM');
 rmSync(work,{recursive:true,force:true});
}
