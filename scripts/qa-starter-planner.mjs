import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {chromium} from 'playwright';
const root=resolve('dist');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.webp':'image/webp'};
const server=createServer((req,res)=>{
 let p=new URL(req.url,'http://local').pathname;
 try{p=decodeURIComponent(p)}catch{res.writeHead(400).end();return}
 const file=resolve(root,'.'+p);
 if(file!==root&&!file.startsWith(root+'/')){res.writeHead(403).end();return}
 const target=existsSync(file)&&statSync(file).isDirectory()?join(file,'index.html'):file;
 if(!existsSync(target)){res.writeHead(404).end();return}
 res.writeHead(200,{'Content-Type':(mime[extname(target)]||'application/octet-stream')+'; charset=utf-8'});res.end(readFileSync(target));
});
let browser;
const records=[];
try{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch();
 for(const w of [1440,390]){
  const page=await browser.newPage({viewport:{width:w,height:900}});
  const pageErrors=[];page.on('pageerror',e=>pageErrors.push(e.message));
  const response=await page.goto('http://127.0.0.1:'+server.address().port+'/starter/',{waitUntil:'networkidle'});
  if(response.status()!==200)throw Error('Planner HTTP '+response.status());
  await page.locator('.nav-row').first().waitFor();
  const edit=page.locator('.nav-row input[type=text]').first();
  await edit.fill('QA 頁面');
  const editFocused=await edit.evaluate(el=>document.activeElement===el);
  if(!editFocused)throw Error('Label edit lost focus at '+w);
  const labelUpdated=(await page.locator('.nav-row button[aria-label$="：QA 頁面"]').count())>0;
  if(!labelUpdated)throw Error('Action accessibility labels did not update '+w);
  const move=page.locator('.nav-row button[aria-label^="下移："]').first();
  await move.click();
  const focused=await page.evaluate(()=>({tag:document.activeElement?.tagName,name:document.activeElement?.getAttribute('aria-label')}));
  if(focused.tag!=='BUTTON'||!focused.name?.startsWith('下移：'))throw Error('Keyboard reorder lost focus '+w+' '+JSON.stringify(focused)+' / pageErrors='+JSON.stringify(pageErrors));
  const preview=page.locator('#plan-preview');
  const previewFocusable=(await preview.getAttribute('tabindex'))==='0'&&(await preview.getAttribute('role'))==='region'&&!!(await preview.getAttribute('aria-label'))?.trim();
  if(!previewFocusable)throw Error('Scrollable JSON preview lacks focus or accessible region name');
  await page.locator('#add-nav-page').click();
  const custom=page.locator('.nav-row input[placeholder*="自訂網址"]').last();
  await custom.fill('start-here/tools/');
  const json=JSON.parse(await page.locator('#plan-preview').innerText());
  const customPathPresent=json.navigation.some(x=>x.path==='start-here/tools/');
  if(!customPathPresent)throw Error('Custom path not exported '+w);
  records.push({width:w,editFocused,labelUpdated,reorderFocus:focused.tag==='BUTTON'&&focused.name?.startsWith('下移：'),previewFocusable,customPathPresent});
  console.log('W4 N1 N14 N16 planner interaction PASS at '+w+'px: live accessible labels, focus after reordering, custom path, keyboard-readable preview');
  await page.close();
 }
 if(records.length!==2||records.some(x=>!x.editFocused||!x.labelUpdated||!x.reorderFocus||!x.previewFocusable||!x.customPathPresent))throw Error('Incomplete planner evidence');
 mkdirSync('qa-artifacts/quality',{recursive:true});
 writeFileSync('qa-artifacts/quality/planner-interaction-cases.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',records,scope:'Real browser planner positive interactions at 1440 and 390; invalid path failure injection is separately verified in starter-route contract suite'},null,2)+'\n');
}finally{if(browser)await browser.close();server.close()}
