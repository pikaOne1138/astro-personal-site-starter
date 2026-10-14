import {chromium} from 'playwright';
import sharp from 'sharp';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,join} from 'node:path';
const layouts=JSON.parse(readFileSync(new URL('../src/data/layout-directions.json',import.meta.url),'utf8'));
const origin=process.env.TEMPLATE_CAPTURE_BASE || 'http://127.0.0.1:4321';
const out=resolve('public/template-gallery');
mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const records=[];
try{
 for(const item of layouts){
  for(const [mode,width,height] of [['desktop',1440,900],['mobile',390,844]]){
   const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
   const url=origin.replace(/\/$/,'')+'/layouts/'+item.slug+'/';
   const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForLoadState('load',{timeout:15000}).catch(()=>{});
   if(!response?.ok())throw Error(item.slug+' '+mode+' HTTP '+response?.status());
   await Promise.race([page.evaluate(async()=>{await document.fonts.ready;}),new Promise(ok=>setTimeout(ok,8000))]);
   const filename=item.slug+'-'+mode+'.webp';
   const path=join(out,filename);
   const png=await page.screenshot({type:'png',fullPage:true,animations:'disabled'});
   const webp=await sharp(png).webp({quality:80,effort:4}).toBuffer();
   writeFileSync(path,webp);
   const bytes=readFileSync(path);
   records.push({slug:item.slug,mode,route:'/layouts/'+item.slug+'/',viewport:{width,height},filename:'template-gallery/'+filename,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length});
   await page.close();
   console.log(item.slug,mode,bytes.length+' bytes');
  }
 }
 const manifest={version:1,sourceCommit:process.env.GITHUB_SHA||null,origin,generatedAt:new Date().toISOString(),records};
 mkdirSync('docs/template-gallery',{recursive:true});
 writeFileSync('docs/template-gallery/captured.json',JSON.stringify(manifest,null,2)+'\n');
}finally{await browser.close();}
