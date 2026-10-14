import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {mkdtempSync,rmSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const root=mkdtempSync(join(tmpdir(),'editorial-audit-faults-'));
const html=(body)=>`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QA</title><style>
body{margin:0;background:white;color:#111;font:16px/1.6 sans-serif}
main{padding:32px;max-width:760px}h1{font:700 30px/1.2 sans-serif}
.skip{position:absolute;left:-9999px}.skip:focus{left:8px;top:8px}
</style></head><body><a class="skip" href="#main">Skip to content</a><main id="main">${body}</main></body></html>`;
const pages={
 '/good':html('<h1>Accessible article</h1><p>Visible content in a simple page.</p>'),
 '/low':html('<h1>Accessible article</h1><p style="color:#dddddd">Unreadably pale paragraph.</p>'),
 '/stuck':html('<h1>Accessible article</h1><div data-motion-reveal style="opacity:0">Content permanently hidden by a broken reveal.</div>')
};
const server=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(pages[req.url]||pages['/good'])});
const cases=[];
try{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const url='http://127.0.0.1:'+server.address().port;
 for(const [name,good] of [['good',true],['low',false],['stuck',false]]){
  const child=spawn(process.execPath,['.ai/astro-editorial-layout-design/scripts/audit.mjs','--base',url,'--paths','/'+name,'--widths','390','--out',join(root,name)],{cwd:resolve('.'),stdio:['ignore','pipe','pipe']});
  let out='';child.stdout.on('data',x=>out+=x);child.stderr.on('data',x=>out+=x);
  const code=await new Promise((done,reject)=>{child.once('error',reject);child.once('close',done)});
  if((code===0)!==good)throw Error(name+': expected '+(good?'PASS':'FAIL')+' got '+code+'\n'+out.slice(-2600));
  const data=JSON.parse(readFileSync(join(root,name,'report.json'),'utf8'));
  const row=data.find(r=>r.width===390);
  const matched=name==='low'?row?.metrics?.contrastFail>0:
    name==='stuck'?row?.fail?.some(x=>x.includes('Reveal')):row?.fail?.length===0;
  if(!matched)throw Error(name+': QA did not identify intended editorial contract: '+JSON.stringify(row).slice(0,800));
  for(const id of name==='good'?['N7']:name==='low'?['N8','F08']:['N9','F14'])
   cases.push({id,name,expected:good?'PASS':'REJECT',exitCode:code,diagnostic:row.fail||[],metrics:{contrastFail:row.metrics?.contrastFail??null},passed:true});

  console.log('Editorial audit '+name+': '+(good?'valid page passed':'injected fault rejected')+(name==='good'?' [N7]':name==='low'?' [N8 F08]':' [N9 F14]'));
 }
 mkdirSync('qa-artifacts/quality',{recursive:true});
 writeFileSync('qa-artifacts/quality/editorial-fault-cases.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',cases,scope:'Current-SHA editorial normal, contrast, and stuck Reveal diagnostics.'},null,2)+'\n');
}finally{server.close();rmSync(root,{recursive:true,force:true})}
