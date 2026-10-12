import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
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
try{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch();
 for(const w of [1440,390]){
  const page=await browser.newPage({viewport:{width:w,height:900}});
  const response=await page.goto('http://127.0.0.1:'+server.address().port+'/starter/',{waitUntil:'networkidle'});
  if(response.status()!==200)throw Error('Planner HTTP '+response.status());
  await page.locator('.nav-row').first().waitFor();
  const edit=page.locator('.nav-row input[type=text]').first();
  await edit.fill('QA 頁面');
  if(!(await edit.evaluate(el=>document.activeElement===el)))throw Error('Label edit lost focus at '+w);
  if(!(await page.locator('.nav-row button[aria-label$="：QA 頁面"]').count()))throw Error('Action accessibility labels did not update '+w);
  const move=page.locator('.nav-row button[aria-label^="下移："]').first();
  await move.click();
  const focused=await page.evaluate(()=>({tag:document.activeElement?.tagName,name:document.activeElement?.getAttribute('aria-label')}));
  if(focused.tag!=='BUTTON'||!focused.name?.startsWith('下移：'))throw Error('Keyboard reorder lost focus '+w+' '+JSON.stringify(focused));
  if((await page.locator('#plan-preview').getAttribute('tabindex'))!=='0')throw Error('Scrollable JSON preview not focusable');
  await page.locator('#add-nav-page').click();
  const custom=page.locator('.nav-row input[placeholder*="自訂網址"]').last();
  await custom.fill('start-here/tools/');
  const json=JSON.parse(await page.locator('#plan-preview').innerText());
  if(!json.navigation.some(x=>x.path==='start-here/tools/'))throw Error('Custom path not exported '+w);
  console.log('W4 N1 N14 N16 planner interaction PASS at '+w+'px: live accessible labels, focus after reordering, custom path, keyboard-readable preview');
  await page.close();
 }
}finally{if(browser)await browser.close();server.close()}
