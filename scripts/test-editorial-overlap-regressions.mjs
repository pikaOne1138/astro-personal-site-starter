import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {mkdtempSync,readFileSync,rmSync,mkdirSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const out=mkdtempSync(join(tmpdir(),'editorial-overlap-'));
function html(collision){
 const css=collision?'position:absolute;left:55px;top:0;':'';
 return '<!doctype html><html lang="zh-Hant"><head><title>Overlap fixture</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><main><h1 style="max-width:230px;font:700 32px/1.3 sans-serif">N10 這是一段會在手機畫面正常自動換行而且不應被判成文字重疊的長中文主標題</h1><p style="width:205px;font:18px/1.5 sans-serif;position:relative">請閱讀 <a href="#first">第一段文字包含完整連結內容以及換行</a> 然後 <a href="#second" style="'+css+'">第二段較短的連結文字</a> 並繼續閱讀。</p></main></body></html>';
}
const server=createServer((req,res)=>{res.setHeader('Content-Type','text/html;charset=utf-8');res.end(html(req.url==='/collision'))});
server.listen(4341,'127.0.0.1');await once(server,'listening');
const run=path=>new Promise(resolve=>{
 const child=spawn(process.execPath,['.ai/astro-editorial-layout-design/scripts/audit.mjs','--base','http://127.0.0.1:4341','--paths',path,'--widths','390','--out',out],{stdio:['ignore','pipe','pipe']});
 let logs='';child.stdout.on('data',x=>logs+=x);child.stderr.on('data',x=>logs+=x);child.on('close',code=>resolve({code,logs}));
});
try{
 const a=await run('/normal');
 if(a.code!==0)throw Error('Normal fixture audit crashed: '+a.logs);
 const normal=JSON.parse(readFileSync(join(out,'report.json'),'utf8')).find(x=>x.width===390);
 if(normal.metrics.textOverlap!==0)throw Error('False-positive inline wrap: '+JSON.stringify(normal.metrics.textOverlapSamples));
 const b=await run('/collision');
 const collision=JSON.parse(readFileSync(join(out,'report.json'),'utf8')).find(x=>x.width===390);
 if(collision.metrics.textOverlap<1)throw Error('Failed to detect real CSS overlap: '+b.logs);
 console.log('N10 long CJK H1 and normal inline wrap PASS; injected CSS collision detected '+collision.metrics.textOverlap);
 mkdirSync('qa-artifacts/quality',{recursive:true});
 writeFileSync('qa-artifacts/quality/editorial-overlap-case.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',cases:[{id:'N10',name:'CJK long title/inline wrap accepted and deliberate CSS collision detected',passed:true,expected:'normal=0 overlap; collision>=1',observations:{normal:normal.metrics.textOverlap,collision:collision.metrics.textOverlap}}]},null,2)+'\n');
}finally{server.close();rmSync(out,{recursive:true,force:true})}
