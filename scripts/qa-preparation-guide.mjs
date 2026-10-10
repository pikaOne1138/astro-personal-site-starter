import { chromium } from 'playwright';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {setTimeout as delay} from 'node:timers/promises';

const base='http://127.0.0.1:4328';
const widths=[1440,1280,768,390];
const out='qa-artifacts/prepare';
mkdirSync(out,{recursive:true});
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port','4328'],{stdio:'ignore'});
let browser;
const rows=[];
try {
 let ready=false;
 for(let i=0;i<40;i++){try{const r=await fetch(base+'/guide/prepare/');if(r.ok){ready=true;break}}catch{}await delay(500)}
 if(!ready)throw Error('Preview guide unavailable');
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
}finally{await browser?.close();server.kill('SIGTERM')}
