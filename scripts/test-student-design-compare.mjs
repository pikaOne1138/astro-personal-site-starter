import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,rmSync,writeFileSync,readFileSync,existsSync,unlinkSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {compareBrowserEvidence,REQUIRED_WIDTHS} from './design-compare.mjs';

// Synthetic PNG metadata fixtures exercise the manifest builder; these are NOT
// screenshots or proof of any real website's visual quality.
const tmp=mkdtempSync(join(tmpdir(),'atp-compare-fixtures-'));
const before=join(tmp,'old'),after=join(tmp,'new'),out=join(tmp,'report');
mkdirSync(before);mkdirSync(after);
function fakePng(file,width){
 const b=Buffer.alloc(24);Buffer.from('89504e470d0a1a0a','hex').copy(b,0);
 b.writeUInt32BE(width,16);b.writeUInt32BE(900,20);
 writeFileSync(file,b);
}
function qa(dir,sha){
 const rows=[];
 for(const width of REQUIRED_WIDTHS){
  rows.push({path:'/',width,status:200,overflow:false,brokenLocalImages:[],errors:[]});
  fakePng(join(dir,'home-'+width+'.png'),width);
  rows.push({path:'/services/',width,status:200,overflow:false,brokenLocalImages:[],errors:[]});
  fakePng(join(dir,'services--'+width+'.png'),width);
 }
 writeFileSync(join(dir,'results.json'),JSON.stringify({sourceCommit:sha,rows}));
}
try{
 qa(before,'a'.repeat(40));qa(after,'b'.repeat(40));
 let r=compareBrowserEvidence({before,after,out,paths:['/','/services/']});
 assert.equal(r.screenshots.length,8);
 assert.equal(r.aestheticReview,'NOT TESTED');
 assert.equal(r.beforeCommit,'a'.repeat(40));
 assert.ok(existsSync(join(out,'index.html')));
 assert.equal((readFileSync(join(out,'index.html'),'utf8').match(/<section>/g)||[]).length,8);
 const first=r.screenshots[0];
 assert.ok(first.before.sha256&&first.after.sha256);
 assert.ok(existsSync(join(out,first.beforeFile))&&existsSync(join(out,first.afterFile)));
 assert.throws(()=>compareBrowserEvidence({before,after,out:join(tmp,'missing'),paths:['/unavailable/']}),/missing before\/after|No matching rendered/);
 unlinkSync(join(after,'home-390.png'));
 assert.throws(()=>compareBrowserEvidence({before,after,out:join(tmp,'invalid'),paths:['/']}),/Missing screenshot/);
 console.log('PASS evidence comparison with synthetic PNG fixtures and negative missing-file case');
 console.log('NOT TESTED actual website rendering, image integrity beyond PNG header, aesthetics or human QA');
}finally{rmSync(tmp,{recursive:true,force:true});}
