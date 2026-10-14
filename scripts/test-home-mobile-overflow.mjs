import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {mkdirSync,writeFileSync} from 'node:fs';
const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const port=4346,base='http://127.0.0.1:'+port;
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});
let browser;
const checks=[];
const measure=page=>page.evaluate(()=>({
 viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
 overflow:document.documentElement.scrollWidth>innerWidth+2,
 galleryScrollers:[...document.querySelectorAll('.showcase-demo-grid')].map(x=>({
   clientWidth:x.clientWidth,scrollWidth:x.scrollWidth,scrollable:getComputedStyle(x).overflowX==='auto'
 }))
}));
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(base+'/')).ok){ready=true;break}}catch{}await wait(300)}
 if(!ready)throw Error('Homepage preview server never became ready');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:390,height:850},reducedMotion:'reduce'});
 const response=await page.goto(base+'/',{waitUntil:'domcontentloaded'});
 if(response?.status()!==200)throw Error('Home HTTP status '+response?.status());
 const baseline=await measure(page);
 const baselinePass=!baseline.overflow&&baseline.galleryScrollers.length===2&&baseline.galleryScrollers.every(x=>x.scrollable);
 checks.push({name:'normal 390px homepage: outer viewport fits; two carousels remain horizontally scrollable',pass:baselinePass,measurement:baseline});
 await page.addStyleTag({content:'.showcase-example-groups { min-width:520px !important }'});
 const broken=await measure(page);
 const mutationDetected=broken.overflow;
 checks.push({name:'F07 fault injection: unexpected 520px page-wide minimum must trigger outer overflow',pass:mutationDetected,measurement:broken});
 if(!mutationDetected||!baselinePass)process.exitCode=1;
 await page.close();
}finally{await browser?.close();server.kill('SIGTERM');}
writeFileSync(dir+'/home-mobile-overflow-regression.json',JSON.stringify({
 schemaVersion:1,headSha:process.env.GITHUB_SHA||null,
 status:checks.every(x=>x.pass)?'PASS':'FAIL',checks,
 scope:'Positive homepage mobile layout plus destructive CSS fault injection. External Cloudflare audit independently verifies deployed output.'
},null,2)+'\n');
for(const check of checks)console.log((check.pass?'PASS ':'FAIL ')+check.name+' '+JSON.stringify(check.measurement));
