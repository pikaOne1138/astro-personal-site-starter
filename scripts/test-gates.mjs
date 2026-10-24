import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {loadGateConfig,gateUrl,gatePlaceholders,gateServiceFacts,gateContact,gateSecrets,gateDrafts,runGates,visibleText} from './gates.mjs';

const gc=loadGateConfig('.');
const url='https://site.example.org/';
const site=(files)=>{
 const root=mkdtempSync(join(tmpdir(),'atp-gates-'));
 for(const [p,s] of Object.entries(files)){const f=join(root,p);mkdirSync(join(f,'..'),{recursive:true});writeFileSync(f,s);}
 return root;
};
const page=(path,body='<main><p>正常內容</p></main>')=>'<!doctype html><head><link rel="canonical" href="'+url+path+'"/><meta property="og:url" content="'+url+path+'"/><meta name="robots" content="noindex"/></head><body>'+body+'</body>';
const base=(config,body,extra={})=>site({
 'site.config.json':JSON.stringify({kind:'helper',site:url,base:'/',...config}),
 'dist/index.html':page('',body),
 'dist/robots.txt':'User-agent: *\nDisallow: /\n',
 'dist/sitemap.xml':'<urlset><url><loc>'+url+'</loc></url></urlset>',
 'dist/rss.xml':'<rss><channel><link>'+url+'</link></channel></rss>',
 ...extra});
const ctx=(root,mode='preview',env={})=>({root,mode,env:{SITE_URL:url,...env},config:JSON.parse(require_('site.config.json',root)),gc});
import {readFileSync} from 'node:fs';
function require_(f,root){return readFileSync(join(root,f),'utf8');}
const dirs=[];
const mk=(...a)=>{const r=base(...a);dirs.push(r);return r;};
const good={serviceFacts:{scope:'個別諮商',format:'一對一面談',duration:'50 分鐘',price:'每次 2,000 元',cancellation:'前一日通知可改期',credentials:'領有諮商心理師證照'},contact:{email:'hello@site.example.org',bookingUrl:'https://booking.site.example.org/'}};
try{
 // G-02 placeholder scanning: strong tokens everywhere, weak tokens not inside articles/code
 let r=mk(good,'<main><p>費用：尚未提供</p></main>');
 let g=gatePlaceholders(ctx(r,'preview'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);assert.match(g.learnerMessage,/還有 1 處內容沒填/);
 g=gatePlaceholders(ctx(r,'release'));assert.equal(g.status,'FAIL');assert.equal(g.blocking,true);
 r=mk(good,'<main><article><p>教學：把網址改成 example.com，TODO 清單留給自己。</p></article><pre>TODO example.com</pre><code>TBD</code><script>var t="待填"</script></main>');
 assert.equal(gatePlaceholders(ctx(r,'release')).status,'PASS','articles, code and scripts that mention tokens must not block');
 r=mk(good,'<main><p>請洽 example.com 的客服</p></main>');
 assert.equal(gatePlaceholders(ctx(r,'release')).status,'FAIL','a page that shows example.com outside an article is a leftover');
 assert.ok(!gc.placeholders.strong.includes('')&&!gc.placeholders.weak.includes(''),'no empty-string placeholder');
 assert.match(visibleText('<p>a</p><script>x</script><code>c</code>'),/^a$/);
 // dist missing => NOT TESTED, blocking only in release
 const empty=site({'site.config.json':JSON.stringify({kind:'helper',site:url})});dirs.push(empty);
 g=gatePlaceholders(ctx(empty,'preview'));assert.equal(g.status,'NOT TESTED');assert.equal(g.blocking,false);
 g=gatePlaceholders(ctx(empty,'release'));assert.equal(g.blocking,true,'required release check that was not run must block');
 // G-01 effective URL
 r=mk({...good,site:'https://example.com'},'<main></main>');
 g=gateUrl({...ctx(r,'preview'),env:{}});assert.equal(g.status,'WARN');assert.equal(g.blocking,false);
 g=gateUrl({...ctx(r,'release'),env:{}});assert.equal(g.status,'FAIL');
 g=gateUrl(ctx(r,'release'));assert.equal(g.status,'PASS','SITE_URL overrides the placeholder config value');
 // G-03 service facts by kind, hidden fields, partial fill
 r=mk({kind:'helper',site:url,serviceFacts:{scope:'x服務範圍',format:'面談方式'}},'<main>x服務範圍 面談方式</main>');
 g=gateServiceFacts(ctx(r,'preview'));assert.equal(g.status,'WARN');
 g=gateServiceFacts(ctx(r,'release'));assert.equal(g.status,'FAIL');assert.match(g.learnerMessage,/費用/);
 r=mk({kind:'helper',site:url,serviceFacts:{scope:'x服務範圍',format:'面談方式',duration:'50 分鐘',cancellation:'前一日通知',credentials:'證照資料'},serviceFactsNotPublished:['price']},'<main>x服務範圍 面談方式 50 分鐘 前一日通知 證照資料</main>');
 g=gateServiceFacts(ctx(r,'release'));assert.notEqual(g.status,'FAIL','an explicitly unpublished field is not a failure');
 r=mk({kind:'knowledge',site:url},'<main></main>');
 assert.equal(gateServiceFacts(ctx(r,'release')).status,'PASS','knowledge sites do not need helper service facts');
 r=mk({kind:'helper',site:url,serviceFacts:{...good.serviceFacts,price:'每次 2,000 元'}},'<main>沒有顯示任何服務資訊</main>');
 g=gateServiceFacts(ctx(r,'preview'));assert.ok(g.evidence.some(e=>/not rendered/.test(e)),'configured but not rendered must be called out');
 // G-04 contact
 r=mk(good,'<main><a href="https://booking.site.example.org/">預約服務</a></main>');
 assert.equal(gateContact(ctx(r,'release')).status,'PASS');
 assert.match(gateContact(ctx(r,'release')).evidence.join(),/真的能預約/,'format validity is not delivery');
 r=mk({...good,contact:{email:'not-an-email',bookingUrl:'#'}},'<main><a href="#">預約服務</a></main>');
 g=gateContact(ctx(r,'preview'));assert.equal(g.status,'FAIL');assert.equal(g.blocking,true,'a placeholder booking is blocking even in preview');
 assert.ok(g.evidence.some(e=>/invalid email/.test(e)));
 r=mk({...good,contact:{url:'https://example.org/line'}},'<main><form method="post" action="/x"><button>送出</button></form><p>送出成功</p></main>');
 g=gateContact(ctx(r,'preview'));assert.ok(g.evidence.some(e=>/FAKE_SUCCESS/.test(e)),'success wording without a real form target fails');
 r=mk({...good,contact:{url:'https://line.me/R/ti/p/@abc'}},'<main></main>');
 assert.notEqual(gateContact(ctx(r,'release')).status,'FAIL');
 // G-05 secrets: untracked new file, masked evidence, no full value in the result
 const token='ghp_'+'a1B2c3D4e5F6g7H8i9J0';
 r=mk(good,'<main></main>',{'src/new-file.ts':'export const t="'+token+'";\n'});
 spawnSync('git',['init','-q'],{cwd:r});
 g=gateSecrets(ctx(r,'preview'));assert.equal(g.status,'FAIL');assert.ok(!JSON.stringify(g).includes(token),'the secret value must not appear in the result');
 assert.ok(g.evidence[0].includes('src/new-file.ts:1'));
 r=mk(good,'<main></main>',{'.env':'PUBLIC_API_TOKEN=abc\n'});
 assert.equal(gateSecrets(ctx(r,'preview')).status,'FAIL','env files and PUBLIC_ token names are caught');
 r=mk(good,'<main></main>');assert.equal(gateSecrets(ctx(r,'preview')).status,'PASS');
 // G-09 needs dist; without it NOT TESTED
 assert.equal(gateDrafts(ctx(empty,'release')).status,'NOT TESTED');
 // aggregate exit contract: offline optional-free fixtures, preview does not block on WARN only
 r=mk({kind:'helper',site:'https://example.com'},'<main>尚未提供</main>');
 const preview=runGates({root:r,mode:'preview',env:{}});
 assert.ok(preview.results.find(x=>x.id==='G-01').status==='WARN'&&preview.results.find(x=>x.id==='G-02').status==='WARN');
 const release=runGates({root:r,mode:'release',env:{}});assert.equal(release.exitCode,1);assert.ok(release.results.some(x=>x.id==='G-02'&&x.status==='FAIL'));
 console.log('Gates G-01..G-05, G-09 fixtures PASS (machine checks only; content truth and human approval are not proven).');
}finally{for(const d of dirs)rmSync(d,{recursive:true,force:true});}
