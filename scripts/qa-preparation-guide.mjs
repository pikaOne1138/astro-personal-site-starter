import { chromium } from 'playwright';
import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,extname,sep} from 'node:path';

// Serve the finished dist/ to avoid Astro preview's process-wide singleton guard.
const root=resolve('dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon'};
const server=createServer((req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 const target=resolve(root,'.'+pathname);
 if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403).end();return}
 let file=target;
 if(existsSync(file)&&statSync(file).isDirectory())file=join(file,'index.html');
 if(!existsSync(file)||!statSync(file).isFile()){res.writeHead(404).end();return}
 res.writeHead(200,{'Content-Type':(types[extname(file)]||'application/octet-stream')+'; charset=utf-8'});
 res.end(readFileSync(file));
});
await new Promise((ok,fail)=>{server.once('error',fail);server.listen(0,'127.0.0.1',ok)});
const base='http://127.0.0.1:'+server.address().port;
const widths=[1440,1280,768,390];
const out='qa-artifacts/prepare';
mkdirSync(out,{recursive:true});
let browser;
const rows=[];
try {
 browser=await chromium.launch({headless:true});
 for(const width of widths) {
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base+'/guide/prepare/',{waitUntil:'domcontentloaded'});
  const initial=await page.evaluate(()=>({
   overflow:document.documentElement.scrollWidth>innerWidth+2,
   access:document.querySelector('#access')?.textContent?.includes('Read-only'),
   emptyRepo:document.querySelector('#repo')?.textContent?.includes('README.md'),
   cloudflare:document.querySelector('#cloudflare')?.textContent?.includes('Cloudflare Workers and Pages')
  }));
  await page.getByRole('button',{name:/Cloudflare Pages/}).click();
  const cfVisible=await page.locator('#cloudflare-instructions').isVisible();
  await page.screenshot({path:out+'/cloudflare-'+width+'.png',fullPage:true,animations:'disabled'});
  await page.getByRole('button',{name:/GitHub Pages/}).click();
  const ghVisible=await page.locator('#github-pages').isVisible();
  await page.screenshot({path:out+'/github-'+width+'.png',fullPage:true,animations:'disabled'});
  const result={width,status:response?.status(),...initial,cfVisible,ghVisible,errors};
  rows.push(result);
  if(result.status!==200||result.overflow||!result.access||!result.emptyRepo||!result.cloudflare||!ghVisible||!cfVisible||errors.length)throw Error('Guide QA failed: '+JSON.stringify(result));
  await page.close();
 }
 writeFileSync(out+'/results.json',JSON.stringify(rows,null,2));
 console.log('Preparation guide Chromium QA:',JSON.stringify(rows));
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
