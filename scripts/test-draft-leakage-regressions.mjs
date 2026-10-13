import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=mkdtempSync(join(tmpdir(),'draft-negative-gate-'));
const put=(p,text)=>{const full=join(root,p);mkdirSync(join(full,'..'),{recursive:true});writeFileSync(full,text)};
const html=(body='')=>'<html><head><title>Test page</title><meta name="description" content="fixture"><link rel="canonical" href="https://example.com/"><meta name="robots" content="noindex, nofollow, noarchive"></head><body>'+body+'</body></html>';
const draft='qa-secret-draft',title='Never Publish This Example Draft';
const article='---\ntitle: '+title+'\ndescription: For private draft QA only\npublishedAt: 2026-10-09\ndraft: true\n---\nDraft text';
try{
 put('site.config.json',JSON.stringify({navigation:[]}));
 put('src/content/articles/'+draft+'.md',article);
 put('dist/index.html',html('Public home'));
 put('dist/404.html',html('Not Found'));
 put('dist/rss.xml','<rss version="2.0"></rss>');
 put('dist/sitemap.xml','<urlset></urlset>');
 put('dist/robots.txt','User-agent: *\nSitemap: https://example.com/sitemap.xml\n');
 put('dist/pagefind/pagefind.js','/* QA Pagefind fixture */');
 put('dist/search/exact-zh.json',JSON.stringify({version:1,docs:[]}));
 const run=()=>spawnSync(process.execPath,['scripts/verify-v2-8-output.mjs','--student-site',root],{encoding:'utf8'});
 const cases=[];
 const expect=(name,ok,signature)=>{
  if(!ok&&!signature)throw Error('Negative test must identify the actual violated contract: '+name);
  const execution=run();
  const combined=(execution.stdout||'')+'\\n'+(execution.stderr||'');
  const statusMatches=(execution.status===0)===ok;
  const signatureMatches=ok||combined.includes(signature);
  const item={name,caseId:name.match(/\b(?:W\d+|N\d+|F\d+b?)\b/)?.[0]||null,
    expected:ok?'PASS':'REJECT',exitCode:execution.status,signature:signature||null,
    statusMatches,signatureMatches,pass:statusMatches&&signatureMatches};
  cases.push(item);
  if(!item.pass)throw Error(name+': wrong outcome or missing expected diagnostic '+JSON.stringify({status:execution.status,signature,stdout:execution.stdout,stderr:execution.stderr}).slice(0,1200));
  console.log(name+': '+(ok?'PASS':'correctly rejected with verified error signature'));
 };
 expect('F00 clean draft',true);
 put('dist/index.html',html('Public home').replace('<meta name="description" content="fixture">',''));
 expect('F12 public page missing meta description',false,'Student metadata escaped head:');
 put('dist/index.html',html('Public home'));
 expect('F12 restored metadata',true);
 put('dist/index.html',html('Public home').replace('<meta name="robots" content="noindex, nofollow, noarchive">',''));
 expect('F09 preview missing noindex',false,'F09 student unpublished page is missing noindex:');
 put('dist/index.html',html('Public home'));
 expect('F09 restored preview noindex',true);
 put('dist/index.html',html('Public home').replace('content="noindex, nofollow, noarchive"','content="index, follow"'));
 const approved=spawnSync(process.execPath,['scripts/verify-v2-8-output.mjs','--student-site',root],{encoding:'utf8',env:{...process.env,SITE_INDEXABLE:'true'}});
 if(approved.status!==0)throw Error('F09 approved indexable production must PASS: '+approved.stdout+' '+approved.stderr);
 console.log('F09 explicitly approved production indexing: PASS');
 cases.push({name:'F09 approved production indexing',caseId:'F09',expected:'PASS',exitCode:approved.status,statusMatches:true,signatureMatches:true,pass:true});
 put('dist/index.html',html('Public home'));
 put('dist/index.html',html('這裡尚未填入個人的正式內容'));
 const notice=run();if(notice.status!==0||!notice.stderr.includes('NOTICE:'))throw Error('W6 Placeholder content must be NOTICE, not blocking FAIL');
 console.log('W6 placeholder content NOTICE rather than FAIL: PASS');
 cases.push({name:'W6 placeholder NOTICE',caseId:'W6',expected:'NOTICE',exitCode:notice.status,signature:'NOTICE:',statusMatches:true,signatureMatches:true,pass:true});
 put('dist/index.html',html('Public home'));
 put('dist/index.html',html('<a href="/articles/'+draft+'/">'+title+'</a>'));
 expect('draft in homepage',false,'Draft leaked into public discovery/output:');
 put('dist/index.html',html());
 put('dist/rss.xml','<rss version="2.0"><item><link>https://example.com/articles/'+draft+'/</link></item></rss>');
 expect('F13 draft in RSS',false,'Draft leaked into public discovery/output:');
 put('dist/rss.xml','<rss version="2.0"></rss>');
 put('dist/sitemap.xml','<urlset><url><loc>https://example.com/articles/'+draft+'/</loc></url></urlset>');
 expect('draft in sitemap',false,'Draft leaked into public discovery/output:');
 put('dist/sitemap.xml','<urlset></urlset>');
 put('dist/articles/'+draft+'/index.html',html(title));
 expect('draft HTML route',false,'Draft emitted as public HTML route:');
 // The new public-source isolation rule: drafts live outside the articles Collection.
 put('dist/articles/'+draft+'/index.html','');
 const {unlinkSync}=await import('node:fs');
 unlinkSync(join(root,'dist/articles/'+draft+'/index.html'));
 put('src/content/drafts/folder-only.md',article.replace('qa-secret-draft','folder-only'));
 expect('F05 isolated draft clean output',true);
 put('dist/index.html',html('<a href="/articles/folder-only/">Never Publish This Example Draft</a>'));
 expect('isolated draft leaked in homepage',false,'Draft leaked into public discovery/output:');
 put('dist/index.html',html());
 // A draft title under eight Chinese characters must still be considered sensitive.
 put('src/content/drafts/short-secret.md',article.replace('Never Publish This Example Draft','小秘密草稿'));
 put('dist/index.html',html('小秘密草稿'));
 expect('F04 short Chinese draft title leaked',false,'Draft leaked into public discovery/output:');
 put('dist/index.html',html());
 // Search JSON is a public endpoint and must be audited like public HTML.
 put('dist/search/exact-zh.json',JSON.stringify({version:1,docs:[{title:'小秘密草稿',url:'/articles/short-secret/'}]}));
 expect('F03 N6 draft in public JSON search',false,'Draft leaked into public discovery/output:');
 put('dist/search/exact-zh.json',JSON.stringify({version:1,docs:[]}));
 expect('clean public JSON',true);
 // F11: the validator must reject missing Pagefind or Chinese companion indexes.
 unlinkSync(join(root,'dist/pagefind/pagefind.js'));
 expect('F11 missing Pagefind index',false,'Student Pagefind search index missing');
 put('dist/pagefind/pagefind.js','/* QA Pagefind fixture */');
 unlinkSync(join(root,'dist/search/exact-zh.json'));
 expect('F11 missing Chinese index',false,'Student Chinese exact-match search index missing');
 put('dist/search/exact-zh.json','{invalid json');
 expect('F11 malformed Chinese index',false,'Student Chinese search index is invalid JSON');
 put('dist/search/exact-zh.json',JSON.stringify({version:1,docs:[]}));
 expect('F11 restored search baseline',true);
 mkdirSync('qa-artifacts/quality',{recursive:true});
 const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,githubRun:process.env.GITHUB_RUN_ID||null,
  status:'PASS',cases,positiveCount:cases.filter(x=>x.expected==='PASS').length,
  negativeCount:cases.filter(x=>x.expected==='REJECT').length,noticeCount:cases.filter(x=>x.expected==='NOTICE').length,
  limitations:'A known issue is proven detected at this SHA, but its historical pre-fix SHA evidence and production authorisation are not implied.'};
 writeFileSync('qa-artifacts/quality/draft-regression-cases.json',JSON.stringify(report,null,2)+'\\n');
 console.log('Draft regression proof: '+report.negativeCount+' faults rejected with contract-specific diagnostics; '+report.positiveCount+' positive controls; '+report.noticeCount+' NOTICE');

}finally{rmSync(root,{force:true,recursive:true})}
