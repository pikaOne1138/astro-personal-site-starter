import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {setTimeout as wait} from 'node:timers/promises';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const port=4340,base='http://127.0.0.1:'+port;
const dir='qa-artifacts/quality';mkdirSync(dir,{recursive:true});
const expected='dist/AI-建站資料包.zip';
if(!existsSync(expected))throw Error('Missing actual built guide ZIP at '+expected);
const server=spawn('npm',['run','preview','--','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'});
let browser;
try{
 let ready=false;
 for(let i=0;i<50;i++){try{if((await fetch(base+'/guide/')).ok){ready=true;break}}catch{}await wait(300)}
 if(!ready)throw Error('Guide preview server did not start');
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({acceptDownloads:true,viewport:{width:1280,height:900}});
 const navigation=await page.goto(base+'/guide/',{waitUntil:'domcontentloaded'});
 if(navigation?.status()!==200)throw Error('Guide returned '+navigation?.status());
 const [download]=await Promise.all([page.waitForEvent('download',{timeout:15000}),page.locator('#download-builder-zip').click()]);
 const file=await download.path();
 if(!file)throw Error('Guide ZIP download was not saved');
 const sha=data=>createHash('sha256').update(data).digest('hex');
 const expectedSha=sha(readFileSync(expected)),actualSha=sha(readFileSync(file));
 const result={status:expectedSha===actualSha?'PASS':'FAIL',prHeadSha:process.env.GITHUB_SHA||null,source:'Actual /guide/ browser button against built local Astro preview',expectedSha256:expectedSha,downloadedSha256:actualSha,byteSize:readFileSync(file).length,filename:download.suggestedFilename(),limitation:'Local built-site delivery check; not proof of external Cloudflare HTTP, deployed ZIP content, or student-owned website'};
 writeFileSync(dir+'/guide-zip-download.json',JSON.stringify(result,null,2)+'\n');
 console.log('Guide ZIP browser download: '+result.status+' ('+result.byteSize+' bytes)');
 if(result.status!=='PASS')throw Error('Download differs from shipped dist ZIP');
}finally{await browser?.close();server.kill('SIGTERM')}
