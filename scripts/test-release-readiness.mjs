import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import {inspectRelease} from './verify-release-readiness.mjs';
const root=mkdtempSync(join(tmpdir(),'atp-release-'));
const sha='a'.repeat(40),url='https://site.example.org/';
const put=(p,s)=>{const full=join(root,p);mkdirSync(join(full,'..'),{recursive:true});writeFileSync(full,s)};
function page(path,robots='index, follow',og=true){
 const canonical=url+path;
 return '<!doctype html><head><title>Fixture</title><meta name="description" content="ok"/><link rel="canonical" href="'+canonical+'"/>'+ (og?'<meta property="og:url" content="'+canonical+'"/>':'')+'<meta name="robots" content="'+robots+'"/></head><body>Fixture</body>';
}
const run=(env)=>inspectRelease({root,env:{SITE_INDEXABLE:'true',RELEASE_SHA:sha,RELEASE_APPROVED_SHA:sha,RELEASE_APPROVED_URL:url,...env}});
try{
 put('site.config.json',JSON.stringify({site:'https://example.com',base:'/',navigation:[],brand:{name:'Fixture'}}));
 put('dist/index.html',page(''));
 put('dist/404.html',page('404.html'));
 put('dist/robots.txt','User-agent: *\\nAllow: /\\nSitemap: '+url+'sitemap.xml\\n');
 put('dist/sitemap.xml','<urlset><url><loc>'+url+'</loc></url></urlset>');
 put('dist/rss.xml','<rss version="2.0"><channel><link>'+url+'</link></channel></rss>');
 assert.equal(run({}).ok,false,'placeholder origin must fail');
 assert.ok(run({}).errors.some(s=>s.includes('RELEASE_URL')));
 assert.equal(run({SITE_URL:url}).ok,true,'valid origin, aligned outputs and declared approval must pass technical gate');
 assert.equal(run({SITE_URL:url,RELEASE_APPROVED_SHA:'b'.repeat(40)}).ok,false,'stale approval must fail');
 assert.equal(run({SITE_URL:url,SITE_INDEXABLE:'false'}).ok,false,'robots/indexability contradiction must fail');
 assert.equal(run({SITE_URL:url,CF_PAGES:'1',CF_PAGES_BRANCH:'preview-branch'}).ok,false,'Cloudflare branch preview must fail');
 put('dist/index.html',page('', 'index, follow',false));
 assert.equal(run({SITE_URL:url}).ok,false,'missing OG URL must fail');
 put('dist/index.html',page(''));
 put('dist/sitemap.xml','<urlset><url><loc>https://wrong.example.net/</loc></url></urlset>');
 assert.equal(run({SITE_URL:url}).ok,false,'foreign sitemap must fail');
 console.log('Release gate regression fixtures PASS (negative and positive technical checks; no human release approval claimed).');
}finally{rmSync(root,{recursive:true,force:true})}
