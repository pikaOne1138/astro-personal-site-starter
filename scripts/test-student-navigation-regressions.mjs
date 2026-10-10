import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const port=4339;
let scenario='healthy';
const links=[['首頁','/'],['關於','/about/'],['工具箱','/toolbox/']];
const server=createServer((req,res)=>{
 const path=new URL(req.url,'http://localhost').pathname;
 if(!['/','/about/','/toolbox/'].includes(path)){res.writeHead(404);res.end('Not Found');return}
 const nav=(mobile)=>links.filter(x=>!(scenario==='mobile-missing'&&mobile&&x[1]==='/toolbox/')).map(([label,href])=>'<a href="'+(scenario==='broken'&&href==='/toolbox/'?'/missing/':href)+'">'+label+'</a>').join('');
 const toc='<nav aria-label="文章目錄">'+Array.from({length:20},(_,i)=>'<a href="#part'+i+'">目錄 '+i+'</a>').join('')+'</nav>';
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.end('<!doctype html><html><meta name="viewport" content="width=device-width, initial-scale=1"><style>.mobile{display:none}@media(max-width:600px){.desktop{display:none}.mobile{display:block}}</style><header><nav aria-label="主要導覽" class="desktop">'+nav(false)+'</nav><nav aria-label="手機主選單" class="mobile">'+nav(true)+'</nav></header><main>'+toc+'</main></html>');
});
server.listen(port,'127.0.0.1');
await once(server,'listening');
const run=async(paths='/,/about/,/toolbox/')=>new Promise(resolve=>{
 const child=spawn(process.execPath,['scripts/verify-student-navigation.mjs','--url','http://127.0.0.1:'+port+'/','--paths',paths,'--expect-links','/,/about/,/toolbox/'],{stdio:['ignore','pipe','pipe']});
 let logs='';child.stdout.on('data',v=>logs+=v);child.stderr.on('data',v=>logs+=v);
 child.on('close',code=>resolve({code,logs}));
});
try{
 for(const [name,shouldPass] of [['healthy',true],['mobile-missing',false],['broken',false]]){
  scenario=name;
  const result=await run();
  if((result.code===0)!==shouldPass)throw Error(name+' expected '+(shouldPass?'PASS':'FAIL')+' got '+result.code+'\n'+result.logs);
  console.log('Navigation regression '+name+': '+(shouldPass?'PASS':'caught intentionally'));
 }
 scenario='healthy';
 const duplicate=await run('/,/about/,/about/');
 if(duplicate.code===0)throw Error('Duplicate route list was accepted');
 console.log('Navigation regression duplicate-route: caught intentionally');
}finally{server.close()}
