import {chromium} from 'playwright';
import {spawn,execFileSync} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const port=4351,base='http://127.0.0.1:'+port,dir='qa-artifacts/quality';
mkdirSync(dir,{recursive:true});
const files=['README.md','01-AI-訪談主持人.md','02-網站定位與個人介紹.md','03-內容準備-二選一.md','04-圖片與發布準備.md','05-AI-品牌識別與圖片共創.md','06-Logo與圖片設計研究.md'];
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});
const temp=mkdtempSync(join(tmpdir(),'intake-download-'));
let browser;
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(base+'/starter/')).ok){ready=true;break}}catch{}await wait(300)}
 if(!ready)throw Error('Starter preview unavailable');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({acceptDownloads:true,viewport:{width:390,height:844}});
 const response=await page.goto(base+'/starter/',{waitUntil:'domcontentloaded',timeout:20000});
 if(response?.status()!==200)throw Error('Starter HTTP '+response?.status());
 const [download]=await Promise.all([page.waitForEvent('download',{timeout:20000}),page.locator('#download-intake-zip').click()]);
 const archive=await download.path();if(!archive)throw Error('Interview pack download failed');
 execFileSync('python3',['-m','zipfile','-e',archive,temp],{stdio:'pipe'});
 const rows=[],errors=[];
 for(const name of files){
  const original=readFileSync(join('docs/student-intake',name));
  const extracted=readFileSync(join(temp,name));
  const exact=original.equals(extracted);
  rows.push({name,exact,sourceBytes:original.length,zipBytes:extracted.length});
  if(!exact)errors.push(name+': browser-delivered UTF-8 or newline differs from source');
 }
 const host=readFileSync(join(temp,files[1]),'utf8');
 if(host.includes(String.fromCharCode(92)+'n'))errors.push(files[1]+': contains literal escaped newlines');
 const report={sha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',downloadName:download.suggestedFilename(),files:rows,errors,scope:'Browser-created interview ZIP contents and original Markdown byte equality; not AI response-quality validation'};
 writeFileSync(dir+'/interview-zip-consistency.json',JSON.stringify(report,null,2)+'\n');
 console.log('W3 browser interview ZIP '+report.status+': '+rows.length+' files byte-identical');
 if(errors.length){errors.forEach(x=>console.error('FAIL '+x));process.exitCode=1}
}finally{await browser?.close();server.kill('SIGTERM');rmSync(temp,{recursive:true,force:true})}
