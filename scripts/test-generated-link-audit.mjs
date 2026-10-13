import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {auditLinks} from './audit-generated-links.mjs';
const root=mkdtempSync(join(tmpdir(),'astro-link-regression-'));
const cases=[];
const record=(id,caseName,pass,diagnostic)=>{cases.push({id,caseName,pass,diagnostic});if(!pass)throw Error(id+' '+caseName+': contract failed '+diagnostic)};
try{
 mkdirSync(join(root,'start-here','tools'),{recursive:true});
 writeFileSync(join(root,'index.html'),'<a href="/start-here/tools/">Works</a><a href="#main">Skip</a><a href="https://example.org/">External</a>');
 writeFileSync(join(root,'start-here/tools/index.html'),'<a href="/">Home</a>');
 const good=auditLinks(root);
 record('N5','valid internal/skip/external links accepted',good.failures.length===0,good.failures);
 writeFileSync(join(root,'index.html'),'<a href="/page-custom-guide/">Broken</a>');
 const broken=auditLinks(root);
 record('N5','intentionally broken page route rejected',broken.failures.length===1&&broken.failures[0].includes('/page-custom-guide/'),broken.failures);
 writeFileSync(join(root,'index.html'),'<footer><a href="/start-here/tools/">有效頁尾導覽</a></footer>');
 const goodFooter=auditLinks(root);
 record('F06','valid footer link accepted',goodFooter.failures.length===0,goodFooter.failures);
 writeFileSync(join(root,'index.html'),'<footer><a href="/wrong-footer-route/">已損壞頁尾導覽</a></footer>');
 const footerBroken=auditLinks(root);
 record('F06','broken footer route rejected',footerBroken.failures.some(x=>x.includes('/wrong-footer-route/')),footerBroken.failures);
 console.log('N5 F06 source HTML link and footer link positive/negative regression PASS');
 console.log('PASS generated link auditor positive and negative regression');
 mkdirSync('qa-artifacts/quality',{recursive:true});
 writeFileSync('qa-artifacts/quality/link-regression-cases.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',cases,limitations:'Injected fixture proves current-SHA detector. Historical before-fix evidence remains separate.'},null,2)+'\n');
}finally{rmSync(root,{recursive:true,force:true})}
