import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {chromium} from 'playwright';

const root=resolve('dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://local').pathname)}catch{res.writeHead(400).end();return}
  const target=resolve(root,'.'+pathname);
  if(target!==root&&!target.startsWith(root+'/')){res.writeHead(403).end();return}
  const file=existsSync(target)&&statSync(target).isDirectory()?join(target,'index.html'):target;
  if(!existsSync(file)){res.writeHead(404).end();return}
  res.writeHead(200,{'Content-Type':(types[extname(file)]||'application/octet-stream')+'; charset=utf-8'});res.end(readFileSync(file));
});
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg==','base64');
const report={sha:process.env.GITHUB_SHA||null,scenarios:[],status:'FAIL'};
let browser;
try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch();
  for(const scenario of [
    {kind:'knowledge',layout:'field-notes',width:390,images:false},
    {kind:'helper',layout:'clinician',width:1440,images:true}
  ]){
    const page=await browser.newPage({viewport:{width:scenario.width,height:900},acceptDownloads:true});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(base+'/starter/?kind='+scenario.kind+'&layout='+scenario.layout,{waitUntil:'networkidle'});
    if(response?.status()!==200)throw Error('Starter HTTP '+response?.status());
    const preview=page.locator('#plan-preview');
    const initial=JSON.parse(await preview.innerText());
    if(initial.kind!==scenario.kind||initial.layoutSlug!==scenario.layout)throw Error('Layout/kind URL preselection lost: '+JSON.stringify(initial));
    const guide=page.locator('.handoff-guide a[href$="guide/#step-02"]').first();
    if(!await guide.count())throw Error('Site Brief to Guide #step-02 link missing');
    if(scenario.images){
      await page.locator('#notes').fill('QA 第一行\nQA 第二行');
      await page.locator('#interview-summary').fill('訪談摘要第一行\n訪談摘要第二行');
      await page.locator('#logo-upload').setInputFiles({name:'logo.png',mimeType:'image/png',buffer:png});
      await page.locator('#hero-upload').setInputFiles({name:'hero.png',mimeType:'image/png',buffer:png});
      await page.waitForFunction(()=>JSON.parse(document.querySelector('#plan-preview').textContent).assets.length===2,{timeout:8000});
    }
    const [download]=await Promise.all([page.waitForEvent('download',{timeout:15000}),page.locator('#save-plan').click()]);
    const file=await download.path();
    if(!file)throw Error('Site Brief download has no file');
    const saved=JSON.parse(readFileSync(file,'utf8'));
    if(download.suggestedFilename()!=='my-astro-site-plan.json')throw Error('Site Brief filename changed');
    if(saved.kind!==scenario.kind||saved.layoutSlug!==scenario.layout)throw Error('Site Brief changed selected layout/kind');
    if(scenario.images){
      if(saved.notes!=='QA 第一行\nQA 第二行\n\n【AI 需求訪談原始摘要（與規劃設定若有明確衝突，先詢問學員，不預設優先）】\n訪談摘要第一行\n訪談摘要第二行')throw Error('Multi-line notes or interview summary lost');
      if(saved.assets?.length!==2||saved.assets.some(x=>x.mime!=='image/png'||!x.base64))throw Error('Logo and hero assets not embedded into downloaded Site Brief');
      if(saved.brand.logoPath!=='/images/brand-logo.png'||saved.brand.heroImagePath!=='/images/hero-image.png')throw Error('Owned image paths not preserved in brand');
    }else if(saved.notes!==''||(saved.assets?.length??0)!==0)throw Error('Optional interview/images cannot be required');
    if(errors.length)throw Error('Browser runtime errors: '+errors.join('; '));
    report.scenarios.push({kind:scenario.kind,layout:scenario.layout,width:scenario.width,optionalAssets:scenario.images,notesLines:scenario.images?4:0,embeddedAssets:saved.assets?.length??0,download:'PASS',guideLink:'PASS'});
    console.log('Student Brief browser handoff PASS: '+scenario.kind+' '+scenario.width+'px');
    await page.close();
  }
  report.status='PASS';
}finally{
  mkdirSync('qa-artifacts/quality',{recursive:true});
  writeFileSync('qa-artifacts/quality/student-brief-handoff.json',JSON.stringify(report,null,2)+'\n');
  await browser?.close();server.close();
}
