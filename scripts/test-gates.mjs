import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {loadGateConfig,gateUrl,gatePlaceholders,gateServiceFacts,gateContact,gateSecrets,gateDrafts,gateApproval,gatePublishPath,gateLinks,gateEnvironment,gateDesign,runGates,visibleText} from './gates.mjs';
import {validateState,readState} from './site-state.mjs';
import {contrastPairs} from './theme-css.mjs';
import {inspectEnvironment,needsRecheck} from './preflight.mjs';

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
 g=gatePlaceholders(ctx(r,'release'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);
 r=mk(good,'<main><article><p>教學：把網址改成 example.com，TODO 清單留給自己。</p></article><pre>TODO example.com</pre><code>TBD</code><script>var t="待填"</script></main>');
 assert.equal(gatePlaceholders(ctx(r,'release')).status,'PASS','articles, code and scripts that mention tokens must not block');
 r=mk(good,'<main><p>請洽 example.com 的客服</p></main>');
 assert.equal(gatePlaceholders(ctx(r,'release')).status,'WARN','a page that shows example.com outside an article is a leftover (listed, not blocking)');
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
 const preview=await runGates({root:r,mode:'preview',env:{}});
 assert.ok(preview.results.find(x=>x.id==='G-01').status==='WARN'&&preview.results.find(x=>x.id==='G-02').status==='WARN');
 const release=await runGates({root:r,mode:'release',env:{}});assert.equal(release.exitCode,1,'G-01 still blocks release');{const g2=release.results.find(x=>x.id==='G-02');assert.equal(g2.status,'WARN','G-02 never blocks, even in release');assert.equal(g2.blocking,false);assert.ok(g2.evidence.length&&g2.learnerMessage.includes('站長決定'));}
 // G-02 alone in release: lists every hit, exit stays 0 on the placeholder alone
 r=mk({kind:'helper',site:'https://shop.example.org'},'<main><p>費用：尚未提供</p><p>年資：待設定</p></main>');
 {const g2=gatePlaceholders(ctx(r,'release'));assert.equal(g2.status,'WARN');assert.equal(g2.blocking,false);assert.equal(g2.evidence.length,2);assert.ok(g2.learnerMessage.includes('2 處'));}

 // ---- batch 4: G-06 approval evidence in a real temp git repo
 const gitIn=(cwd,...a)=>{const o=spawnSync('git',a,{cwd,encoding:'utf8'});assert.equal(o.status,0,a.join(' ')+o.stderr);return o.stdout.trim();};
 r=mk(good,'<main></main>',{'src/a.txt':'one\n','PROJECT.md':'# p\n'});
 gitIn(r,'init','-q');gitIn(r,'config','user.email','t@t');gitIn(r,'config','user.name','t');
 gitIn(r,'add','-A');gitIn(r,'commit','-qm','approved version');
 const approved=gitIn(r,'rev-parse','HEAD');
 const rel=(extra={})=>({...ctx(r,'release',{RELEASE_APPROVED_URL:url,...extra}),results:[]});
 assert.equal(gateApproval(ctx(r,'preview')),null,'approval gate is release-only');
 g=gateApproval(rel({RELEASE_APPROVED_SHA:approved,RELEASE_SHA:approved}));assert.equal(g.status,'PASS');assert.match(g.evidence.join(),/cannot authenticate consent/);
 g=gateApproval(rel({}));assert.equal(g.status,'FAIL');assert.match(g.learnerMessage,/核准紀錄/);
 g=gateApproval(rel({RELEASE_APPROVED_SHA:'abc'}));assert.equal(g.status,'FAIL','non-40-hex SHA is not an approval');
 g=gateApproval({...rel({RELEASE_APPROVED_SHA:approved,RELEASE_SHA:approved}),env:{SITE_URL:url,RELEASE_APPROVED_SHA:approved,RELEASE_SHA:approved,RELEASE_APPROVED_URL:'https://other.example.net/'}});assert.equal(g.status,'FAIL','approved URL must be the production URL');
 // record-only commit after approval (the approval record itself adds a commit): equivalent
 writeFileSync(join(r,'site-state.json'),JSON.stringify({version:1,stage:'approved',approvedSha:approved,approvalBasis:'學員說「這版可以」'}));
 writeFileSync(join(r,'PROJECT.md'),'# p\n更新紀錄\n');
 gitIn(r,'add','-A');gitIn(r,'commit','-qm','record approval');
 const head=gitIn(r,'rev-parse','HEAD');
 g=gateApproval(rel({RELEASE_APPROVED_SHA:approved,RELEASE_SHA:head}));assert.equal(g.status,'PASS');assert.match(g.evidence.join(),/only record files changed/);
 // content commit after approval: blocked, files named
 writeFileSync(join(r,'src/a.txt'),'two\n');gitIn(r,'add','-A');gitIn(r,'commit','-qm','content change');
 const head2=gitIn(r,'rev-parse','HEAD');
 g=gateApproval(rel({RELEASE_APPROVED_SHA:approved,RELEASE_SHA:head2}));assert.equal(g.status,'FAIL');assert.match(g.evidence.join(),/src\/a\.txt/);assert.match(g.learnerMessage,/不一樣/);
 // unknown commit (squash merge where the PR head is not fetched): NOT TESTED, blocking, never accepted on declaration
 g=gateApproval(rel({RELEASE_APPROVED_SHA:'f'.repeat(40),RELEASE_SHA:head2}));assert.equal(g.status,'NOT TESTED');assert.equal(g.blocking,true);
 assert.deepEqual(validateState({version:1,approvedSha:approved}).length>0,true,'approvedSha without basis is rejected');
 // ---- G-07 publish path
 const stateFile=(o)=>writeFileSync(join(r,'site-state.json'),JSON.stringify({version:1,...o}));
 const passApproval=[{id:'G-06',status:'PASS'}],failApproval=[{id:'G-06',status:'FAIL'}];
 stateFile({});assert.equal(gatePublishPath({...rel(),results:passApproval}).status,'NOT TESTED','platform not recorded');
 stateFile({deploy:{platform:'cloudflare-pages'}});assert.equal(gatePublishPath({...rel(),results:passApproval}).status,'NOT TESTED','auto-deploy unknown is not a pass');
 stateFile({deploy:{platform:'cloudflare-pages',autoDeployProduction:true,productionBranch:'main'}});
 g=gatePublishPath({...rel(),results:failApproval});assert.equal(g.status,'FAIL');assert.match(g.learnerMessage,/自動公開/);
 assert.equal(gatePublishPath({...rel(),results:passApproval}).status,'PASS');
 stateFile({deploy:{platform:'cloudflare-pages',autoDeployProduction:false}});assert.equal(gatePublishPath({...rel(),results:failApproval}).status,'PASS','manual promotion path is safe even without approval yet');
 mkdirSync(join(r,'.github/workflows'),{recursive:true});writeFileSync(join(r,'.github/workflows/deploy.yml'),'on:\n  push:\n    branches: [main]\njobs:\n  d:\n    steps:\n      - uses: actions/deploy-pages@v4\n');
 stateFile({deploy:{platform:'github-pages'}});
 assert.equal(gatePublishPath({...rel(),results:failApproval}).status,'FAIL','push-to-main Pages deploy without approval blocks');
 assert.equal(gatePublishPath({...rel(),results:passApproval}).status,'PASS');
 assert.equal(gatePublishPath(ctx(r,'preview')),null);
 // ---- G-08 environment report: unknown is never reported as pass; recheck on environment change
 const env1=inspectEnvironment(r);assert.equal(env1.capabilities.workflowPush,'unknown');assert.equal(env1.capabilities.deployConnected,'unknown');assert.ok(env1.routes.length>=2);
 assert.equal(needsRecheck(null,r).recheck,true);
 assert.equal(needsRecheck({capabilities:{checkedAt:env1.checkedAt,environmentId:env1.environmentId}},r).recheck,false);
 assert.equal(needsRecheck({capabilities:{checkedAt:env1.checkedAt,environmentId:'other'}},r).recheck,true);
 stateFile({capabilities:{checkedAt:env1.checkedAt,environmentId:'other'}});
 g=gateEnvironment(ctx(r,'release'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);
 // ---- G-10 external links with an injected fetch: 4xx warns, offline is NOT TESTED, neither blocks
 const linkSite=mk(good,'<main><a href="https://alive.example.org/">a</a><a href="https://gone.example.org/">b</a></main>');
 const lc=(f)=>({...ctx(linkSite,'release'),fetchImpl:f});
 g=await gateLinks(lc(async u=>({status:u.includes('gone')?404:200})));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);assert.match(g.evidence.join(),/gone\.example\.org.*404/);
 g=await gateLinks(lc(async()=>{throw new TypeError('fetch failed');}));assert.equal(g.status,'NOT TESTED');assert.equal(g.blocking,false,'offline must not fail a local build');
 g=await gateLinks(lc(async()=>({status:200})));assert.equal(g.status,'PASS');assert.match(g.evidence.join(),/does not prove/);
 assert.equal(await gateLinks(ctx(linkSite,'preview')),null,'link checks are release or opt-in only');
 const full=await runGates({root:linkSite,mode:'release',env:{SITE_URL:url},fetchImpl:async()=>{throw new TypeError('offline');}});
 assert.ok(full.results.find(x=>x.id==='G-10').blocking===false);
 // ---- G-11 design consistency: hardcoded theme colours (above the shipped baseline) and palette contrast
 const dsite=(files,config={})=>mk({brand:{palette:{primary:'#245E50',secondary:'#58776C',accent:'#8A6A3F',background:'#F7F8F4',text:'#1F2924'}},...config},'<main></main>',files);
 const dctx=(root,mode,gcOver)=>({...ctx(root,mode),gc:{...gc,design:{...gc.design,...gcOver}}});
 const baselineOf=(files)=>JSON.stringify({version:1,files});
 // no source folder: the literal scan is not run; an untestable optional check never blocks
 g=gateDesign(dctx(mk({...good,brand:undefined},'<main></main>'),'release'));assert.equal(g.status,'NOT TESTED');assert.equal(g.blocking,false);
 // clean site and the normal ways of writing colour that must NOT be flagged (G-02 lesson)
 r=dsite({
  'src/components/Ok.astro':'<a href="#top" class="a">#fff #2563eb in text</a>\n<style>\n.a{color:var(--color-content);background:color-mix(in srgb,var(--color-primary) 20%,transparent);border:1px solid currentColor}\n.b::after{content:"#2026 white";background:url(#grad)}\n.c{box-shadow:0 2px 4px #0003;background:rgba(255,255,255,.4);border-color:rgb(0 0 0 / .1)}\n</style>',
  'public/tokens.css':':root{--color-primary:#355747;--x:white}',
  'public/theme.css':':root{--brand-primary:#245E50}',
  'design-baseline.json':baselineOf({})});dirs.push(r);
 for(const m of ['preview','release']){g=gateDesign(dctx(r,m));assert.equal(g.status,'PASS',m+' '+JSON.stringify(g.evidence));assert.equal(g.blocking,false);}
 // a literal #2563eb in a component: WARN in preview, FAIL (blocking) in release, with file and line
 r=dsite({'src/components/Card.astro':'<div class="card"></div>\n<style>\n.card{\n  background:#2563eb;\n}\n</style>','design-baseline.json':baselineOf({})});dirs.push(r);
 g=gateDesign(dctx(r,'preview'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);assert.match(g.evidence.join('\n'),/src\/components\/Card\.astro:4 background: #2563eb/);assert.match(g.learnerMessage,/Token/);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'FAIL');assert.equal(g.blocking,true);
 // shipped literals within the baseline do not block; one more does
 const lit=n=>'<style>\n'+Array.from({length:n},(_,i)=>'.x'+i+'{color:#a1b2c3}').join('\n')+'\n</style>';
 r=dsite({'src/components/Old.astro':lit(2),'design-baseline.json':baselineOf({'src/components/Old.astro':2})});dirs.push(r);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'PASS');assert.match(g.evidence.join(),/within the recorded baseline/);
 r=dsite({'src/components/Old.astro':lit(3),'design-baseline.json':baselineOf({'src/components/Old.astro':2})});dirs.push(r);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'FAIL');assert.match(g.evidence.join(),/3 found, 2 allowed/);
 // strict mode (design.baseline=false): every literal is a violation; missing baseline file is a non-blocking WARN, never a silent pass
 g=gateDesign(dctx(dsite({'src/components/Old.astro':lit(1),'design-baseline.json':baselineOf({'src/components/Old.astro':1})}),'release',{baseline:false}));assert.equal(g.status,'FAIL');
 r=dsite({'src/components/Old.astro':lit(1)});dirs.push(r);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);assert.match(g.evidence.join(),/no design-baseline\.json/);
 // exemptions: design-fixed annotation with a known reason, allowlist entry with a reason; unknown reason or allowlist without reason do not exempt
 r=dsite({'src/components/Logo.astro':'<style>\n/* design-fixed: brand-logo */\n.logo{fill:#d9262c}\n</style>','design-baseline.json':baselineOf({})});dirs.push(r);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'PASS');assert.match(g.evidence.join(),/exempted/);
 r=dsite({'src/components/Logo.astro':'<style>\n/* design-fixed: because */\n.logo{fill:#d9262c}\n</style>','design-baseline.json':baselineOf({})});dirs.push(r);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'FAIL');assert.match(g.evidence.join(),/unknown reason "because"/);
 r=dsite({'src/components/Embed.astro':'<style>\n.e{background:#112233}\n</style>','design-baseline.json':baselineOf({})});dirs.push(r);
 assert.equal(gateDesign(dctx(r,'release',{allowlist:[{file:'src/components/Embed.astro',match:'#112233',reason:'第三方嵌入'}]})).status,'PASS');
 assert.equal(gateDesign(dctx(r,'release',{allowlist:[{file:'src/components/Embed.astro',match:'#112233'}]})).status,'FAIL','allowlist entries need a reason');
 // design-fixed scope: before a rule it covers every declaration in that rule (and only that rule); before one declaration it covers only that declaration; an unknown reason never exempts
 const lits=(css,over)=>{const x=dsite({'src/components/S.astro':'<style>\n'+css+'\n</style>','design-baseline.json':baselineOf({})});dirs.push(x);return gateDesign(dctx(x,'release',over));};
 g=lits('/* design-fixed: page-custom */\n.btn{--o:#c2410c;color:#ffffff;background:#111827}');assert.equal(g.status,'PASS',JSON.stringify(g.evidence));assert.match(g.evidence.join(),/3 literal colours exempted/);
 g=lits('/* design-fixed: page-custom */\n.btn{--o:#c2410c;color:#ffffff}\n.other{color:#123456}');assert.equal(g.status,'FAIL');assert.match(g.evidence.join('\n'),/S\.astro:4 color: #123456/);assert.doesNotMatch(g.evidence.join('\n'),/#c2410c|#ffffff/,'next rule is flagged, the annotated rule is not');
 g=lits('/* design-fixed: page-custom */\n@media(min-width:600px){.a{color:#0a0b0c}.b{color:#0d0e0f}}\n.c{color:#abcdef}');assert.equal(g.status,'FAIL');assert.match(g.evidence.join('\n'),/#abcdef/);assert.doesNotMatch(g.evidence.join('\n'),/#0a0b0c|#0d0e0f/,'an at-rule annotation covers the rules inside it');
 g=lits('.btn{\n/* design-fixed: page-custom */\n--o:#c2410c;\ncolor:#ffffff}');assert.equal(g.status,'FAIL');assert.match(g.evidence.join('\n'),/S\.astro:5 color: #ffffff/);assert.doesNotMatch(g.evidence.join('\n'),/#c2410c/,'a declaration-level annotation covers that declaration only');
 g=lits('/* design-fixed: because */\n.btn{color:#ffffff;background:#111827}');assert.equal(g.status,'FAIL');assert.match(g.evidence.join('\n'),/unknown reason "because"/);assert.match(g.evidence.join('\n'),/#ffffff/);assert.match(g.evidence.join('\n'),/#111827/,'unknown reason exempts nothing in the rule');
 // palette contrast: names and numbers of the failing pairs (release FAIL, preview WARN)
 r=dsite({'src/components/Ok.astro':'<p>ok</p>','design-baseline.json':baselineOf({})},{brand:{palette:{primary:'#cccccc',secondary:'#dddddd',accent:'#eeeeee',background:'#ffffff',text:'#9a9a9a'}}});dirs.push(r);
 g=gateDesign(dctx(r,'preview'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'FAIL');assert.equal(g.blocking,true);
 assert.match(g.evidence.join('\n'),/內文色／背景: 2\.8\d?:1 \(needs 4\.5:1\)/);assert.match(g.evidence.join('\n'),/主色／背景: 1\.6\d?:1 \(needs 3:1\)/);assert.match(g.learnerMessage,/對比不夠/);
 // accent/background: only the accent is weak here, so only it is named, with its number; no accent set means no extra pair
 r=dsite({'src/components/Ok.astro':'<p>ok</p>','design-baseline.json':baselineOf({})},{brand:{palette:{primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'}}});dirs.push(r);
 g=gateDesign(dctx(r,'preview'));assert.equal(g.status,'WARN');assert.equal(g.blocking,false);
 g=gateDesign(dctx(r,'release'));assert.equal(g.status,'FAIL');assert.equal(g.blocking,true);
 assert.match(g.evidence.join('\n'),/low contrast 強調色／背景: 2\.38:1 \(needs 3:1\) #C49B70 on #F7F8F4/);assert.equal(g.evidence.filter(e=>e.startsWith('low contrast')).length,1,'only the accent pair fails');assert.match(g.learnerMessage,/強調色／背景 2\.38:1/);
 const afull=await runGates({root:r,mode:'release',env:{SITE_URL:url},fetchImpl:async()=>{throw new TypeError('offline');}});
 assert.equal(afull.results.find(x=>x.id==='G-11').status,'FAIL','runGates: a weak accent alone blocks release');assert.match(afull.results.find(x=>x.id==='G-11').evidence.join(),/強調色／背景/);assert.ok(afull.blocking);
 const acc=(a,bg='#F7F8F4')=>contrastPairs({palette:{primary:'#245E50',secondary:'#58776C',accent:a,background:bg,text:'#1F2924'}}).find(p=>p.name==='強調色／背景');
 assert.equal(acc('#8A6A3F').ok,true);assert.equal(acc('#8A6A3F').min,3);assert.equal(acc(undefined),undefined,'no accent: --color-accent falls back to the primary, which has its own pair');
 assert.equal(contrastPairs({palette:{primary:'#245E50',background:'#F7F8F4',text:'#1F2924'}}).length,4);
 // boundary: the same pair passes just above 3:1 and fails just below
 const edge=contrastPairs({palette:{primary:'#245E50',accent:'#949494',background:'#ffffff',text:'#1F2924'}}).find(p=>p.name==='強調色／背景');assert.equal(edge.ok,true);assert.ok(edge.ratio>=3&&edge.ratio<3.1);
 assert.equal(contrastPairs({palette:{primary:'#245E50',accent:'#999999',background:'#ffffff',text:'#1F2924'}}).find(p=>p.name==='強調色／背景').ok,false);
 // runGates carries G-11 and the blocking exit code in release
 const dfull=await runGates({root:r,mode:'release',env:{SITE_URL:url},fetchImpl:async()=>{throw new TypeError('offline');}});
 assert.equal(dfull.results.find(x=>x.id==='G-11').status,'FAIL');assert.ok(dfull.blocking);
 console.log('Gates G-01..G-11 fixtures PASS (machine checks only; content truth and human approval are not proven).');
}finally{for(const d of dirs)rmSync(d,{recursive:true,force:true});}
