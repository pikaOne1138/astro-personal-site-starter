import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {auditLinks} from './audit-generated-links.mjs';
const root=mkdtempSync(join(tmpdir(),'astro-link-regression-'));
try{
 mkdirSync(join(root,'start-here','tools'),{recursive:true});
 writeFileSync(join(root,'index.html'),'<a href="/start-here/tools/">Works</a><a href="#main">Skip</a><a href="https://example.org/">External</a>');
 writeFileSync(join(root,'start-here/tools/index.html'),'<a href="/">Home</a>');
 const good=auditLinks(root);
 if(good.failures.length)throw Error('False positive: '+good.failures.join('; '));
 writeFileSync(join(root,'index.html'),'<a href="/page-custom-guide/">Broken</a>');
 const broken=auditLinks(root);
 if(broken.failures.length!==1||!broken.failures[0].includes('/page-custom-guide/'))throw Error('Auditor missed intentionally broken link '+JSON.stringify(broken));
 writeFileSync(join(root,'index.html'),'<footer><a href="/start-here/tools/">有效頁尾導覽</a></footer>');
 if(auditLinks(root).failures.length)throw Error('F06 valid footer link incorrectly rejected');
 writeFileSync(join(root,'index.html'),'<footer><a href="/wrong-footer-route/">已損壞頁尾導覽</a></footer>');
 const footerBroken=auditLinks(root);
 if(!footerBroken.failures.some(x=>x.includes('/wrong-footer-route/')))throw Error('F06 intentionally broken footer route not detected');
 console.log('N5 F06 source HTML link and footer link positive/negative regression PASS');
 console.log('PASS generated link auditor positive and negative regression');
}finally{rmSync(root,{recursive:true,force:true})}
