import {readFileSync,existsSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,resolve,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {inspectRelease} from './verify-release-readiness.mjs';
import {scanSecrets} from './check-secrets.mjs';
import {readState,validateState} from './site-state.mjs';
import {needsRecheck} from './preflight.mjs';
import {scanSourceTree,readDesignBaseline,compareToBaseline,writeDesignBaseline,BASELINE_FILE} from './design-scan.mjs';
import {contrastPairs} from './theme-css.mjs';

// Machine gates. Each result: {id,name,status,blocking,evidence,learnerMessage}.
// status is PASS | FAIL | WARN | NOT TESTED; blocking is separate so an optional NOT TESTED never fails an offline build.
// Gates only judge what a machine can: they do not prove content is true or that a person agreed.
const here=new URL('.',import.meta.url).pathname;
export function loadGateConfig(root='.'){
 for(const p of [join(resolve(root),'scripts/gates.config.json'),join(here,'gates.config.json')])if(existsSync(p))return JSON.parse(readFileSync(p,'utf8'));
 throw Error('gates.config.json not found');
}
const result=(id,name,status,{mode,required=true,evidence=[],learnerMessage=''}={})=>{
 const blocking=status==='FAIL'||(status==='NOT TESTED'&&required&&mode==='release');
 return {id,name,status,blocking,evidence:evidence.slice(0,30),learnerMessage};
};
const listHtml=dist=>{const out=[];const visit=p=>{if(!existsSync(p))return;for(const e of readdirSync(p,{withFileTypes:true})){const f=join(p,e.name);if(e.isDirectory()){if(e.name!=='pagefind'&&e.name!=='_astro')visit(f);}else if(e.name.endsWith('.html'))out.push(f)}};visit(dist);return out;};
export function visibleText(html,{dropArticles=false}={}){
 let s=html.replace(/<!--[\s\S]*?-->/g,'').replace(/<(script|style|noscript|template|pre|code)\b[\s\S]*?<\/\1>/gi,' ');
 if(dropArticles)s=s.replace(/<article\b[\s\S]*?<\/article>/gi,' ');
 return s.replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
}
const mask=v=>v.length<=8?'****':v.slice(0,4)+'…'+v.slice(-4);
const isFilled=v=>typeof v==='string'?v.trim()!==''&&!/^(尚未提供|待填|待設定|待確認)/.test(v.trim()):v&&typeof v==='object'?true:false;

function readConfig(root){try{return JSON.parse(readFileSync(join(root,'site.config.json'),'utf8'));}catch{return null;}}

export function gateUrl(ctx){
 const {root,mode,env,config}=ctx;
 const rel=inspectRelease({root,env,approvalRequired:false});
 const urlErrors=rel.errors.filter(e=>e.startsWith('RELEASE_URL')||e.startsWith('BASE_URL'));
 const dist=join(root,'dist');
 if(!existsSync(dist)&&!urlErrors.length)return result('G-01','正式網址',mode==='release'?'NOT TESTED':'WARN',{mode,evidence:['dist/ missing; run the build first']});
 if(urlErrors.length)return result('G-01','正式網址',mode==='release'?'FAIL':'WARN',{mode,evidence:urlErrors,learnerMessage:'網站的正式網址還沒設定好（現在是範例值或格式不對），這樣上線的話，分享連結和搜尋引擎都會指向錯誤的網址。請先決定正式網址再發布。'});
 const canon=rel.errors.filter(e=>e.startsWith('CANONICAL')||e.startsWith('OG_URL'));
 if(canon.length)return result('G-01','正式網址',mode==='release'?'FAIL':'WARN',{mode,evidence:canon,learnerMessage:'網站產出的連結和設定的網址對不上。請用正式網址重新建置後再檢查。'});
 return result('G-01','正式網址',config?'PASS':'WARN',{mode,evidence:['effective origin '+rel.site]});
}

export function gatePlaceholders(ctx){
 const {root,mode,gc}=ctx;const dist=join(root,'dist');
 if(!existsSync(dist))return result('G-02','佔位文字','NOT TESTED',{mode,evidence:['dist/ missing; run the build first']});
 const hits=[];const allow=gc.placeholders.allow||[];
 for(const file of listHtml(dist)){
  const page=relative(dist,file).replaceAll('\\','/');
  const html=readFileSync(file,'utf8');
  const strongText=visibleText(html),weakText=visibleText(html,{dropArticles:true});
  for(const [tokens,text] of [[gc.placeholders.strong,strongText],[gc.placeholders.weak,weakText]])for(const t of tokens){
   if(!t)continue;
   const i=text.toLowerCase().indexOf(t.toLowerCase());
   if(i<0)continue;
   if(allow.some(a=>a.token===t&&new RegExp(a.pagePattern||'.').test(page)))continue;
   hits.push({page,token:t,context:text.slice(Math.max(0,i-12),i+t.length+18)});
  }
 }
 if(!hits.length)return result('G-02','佔位文字','PASS',{mode});
 const summary=hits.slice(0,5).map(h=>h.page+'「'+h.context+'」').join('；');
 return result('G-02','佔位文字',mode==='release'?'FAIL':'WARN',{mode,evidence:hits.map(h=>h.page+': '+h.token+' → '+h.context),
  learnerMessage:'還有 '+hits.length+' 處內容沒填：'+summary+'。這些會被訪客直接看到，請先補齊，或把該欄位改成不公開。'});
}

const aliasKeys=f=>[f.key,...(f.aliases||[])];
export function gateServiceFacts(ctx){
 const {mode,config,gc,root}=ctx;
 if(!config)return result('G-03','服務事實','NOT TESTED',{mode,evidence:['site.config.json missing or unreadable']});
 const rule=gc.serviceFacts[config.kind];
 if(!rule||!rule.required.length&&!rule.recommended.length)return result('G-03','服務事實','PASS',{mode,evidence:['no required service facts for kind '+config.kind]});
 const facts=config.serviceFacts||config.artDirection?.serviceFacts||{};
 const hidden=new Set(config.serviceFactsNotPublished||[]);
 const missing=[],soft=[];
 for(const [list,sink] of [[rule.required,missing],[rule.recommended,soft]])for(const f of list){
  const keys=aliasKeys(f);
  if(keys.some(k=>hidden.has(k)))continue;
  if(!keys.some(k=>isFilled(facts[k])&&!(facts[k]&&typeof facts[k]==='object'&&facts[k].publish===false)))sink.push(f);
 }
 // configured but not rendered: a setting that never reaches the page is a silent failure
 const dist=join(root,'dist');const unrendered=[];
 if(existsSync(dist)){
  const all=listHtml(dist).map(f=>visibleText(readFileSync(f,'utf8'))).join('\n');
  for(const [k,v] of Object.entries(facts))if(typeof v==='string'&&v.trim().length>=4&&!all.includes(v.trim().slice(0,24)))unrendered.push(k);
 }
 const labels=a=>a.map(f=>f.label).join('、');
 if(missing.length)return result('G-03','服務事實',mode==='release'?'FAIL':'WARN',{mode,evidence:['missing: '+missing.map(f=>f.key).join(','),...(unrendered.length?['configured but not rendered: '+unrendered.join(',')]:[])],
  learnerMessage:'服務資訊還缺：'+labels(missing)+'。請補上你的真實資料，或明確標示這一項不公開；AI 不會幫你編。'});
 if(soft.length||unrendered.length)return result('G-03','服務事實','WARN',{mode,evidence:[...(soft.length?['recommended missing: '+soft.map(f=>f.key).join(',')]:[]),...(unrendered.length?['configured but not rendered: '+unrendered.join(',')]:[])],
  learnerMessage:(soft.length?'建議再補：'+labels(soft)+'。':'')+(unrendered.length?'有些已填的服務資訊沒有出現在頁面上，請請 AI 檢查。':'')});
 return result('G-03','服務事實','PASS',{mode});
}

const URLISH=['contactUrl','bookingUrl','formUrl'];
export function gateContact(ctx){
 const {root,mode,env,config,gc}=ctx;
 if(!config)return result('G-04','預約與聯絡','NOT TESTED',{mode,evidence:['site.config.json missing or unreadable']});
 const errors=[];const warns=[];
 const contact={...(config.artDirection?.contact||{}),...(config.contact||{})};
 const values=[];
 for(const k of URLISH)if(config[k])values.push([k,config[k]]);
 for(const [k,v] of Object.entries(contact))if(v)values.push(['contact.'+k,v]);
 for(const [name,raw] of values){
  const v=String(raw).trim();
  if(/example\.com|localhost|^#$|TODO|待設定/i.test(v)){errors.push(name+': placeholder '+mask(v));continue;}
  if(/^mailto:/.test(v)||/(^|\.)email$/i.test(name)||name==='contact.email'){const addr=v.replace(/^mailto:/,'');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr))errors.push(name+': invalid email format');continue;}
  if(/^tel:/.test(v)||name==='contact.phone'){if(!/^(tel:)?\+?[0-9\s-]{6,}$/.test(v))errors.push(name+': invalid phone format');continue;}
  let u;try{u=new URL(v);}catch{errors.push(name+': not a valid URL');continue;}
  if(!['https:','http:'].includes(u.protocol)){errors.push(name+': unsupported protocol '+u.protocol);continue;}
  if(u.protocol==='http:')warns.push(name+': uses http');
  if(/(^|\.)line\.(me|naver\.jp)$/.test(u.hostname)||/(^|\.)lin\.ee$/.test(u.hostname)){if(!/^(line\.me|lin\.ee)$/.test(u.hostname.replace(/^www\./,'')))errors.push(name+': LINE link must use line.me or lin.ee');}
 }
 // rendered controls: reuse the release scan (forms without a usable target, placeholder CTAs)
 const rel=existsSync(join(root,'dist'))?inspectRelease({root,env,approvalRequired:false}):{errors:[]};
 for(const e of rel.errors)if(/^SERVICE/.test(e))errors.push(e);
 // success wording on a page whose form has no real target is a fake success
 const dist=join(root,'dist');
 if(existsSync(dist))for(const file of listHtml(dist)){
  const html=readFileSync(file,'utf8'),page=relative(dist,file).replaceAll('\\','/'),text=visibleText(html);
  const phrase=gc.successPhrases.find(p=>text.includes(p));
  if(phrase&&/<form\b/i.test(html)&&!/<form\b[^>]*\baction=["']https?:/i.test(html))errors.push('FAKE_SUCCESS: '+page+' shows「'+phrase+'」without a real form target');
  else if(phrase)warns.push('success wording「'+phrase+'」on '+page+'; confirm it is not shown without a real submission');
  else if(gc.successPhrases.some(p=>[...html.matchAll(/<script\b[\s\S]*?<\/script>/gi)].some(m=>m[0].includes(p))))warns.push('success wording inside script on '+page+'; text scanning cannot prove it is not a fake success');
 }
 if(errors.length)return result('G-04','預約與聯絡','FAIL',{mode,evidence:errors,learnerMessage:'預約或聯絡的方式還沒設好（空的、範例值、格式不對，或畫面會假裝送出成功）。請提供真實的管道，或先隱藏這個按鈕。'});
 if(warns.length)return result('G-04','預約與聯絡','WARN',{mode,evidence:[...warns,'格式合法與連結可達不代表真的能預約或收到訊息，請自己試一次。']});
 return result('G-04','預約與聯絡','PASS',{mode,evidence:['格式合法不代表真的能預約或收到訊息，請自己試一次。']});
}

export function gateSecrets(ctx){
 const {root,mode}=ctx;
 const r=scanSecrets(resolve(root));
 if(r.passed)return result('G-05','密鑰掃描','PASS',{mode,evidence:['scanned '+r.scanned+' files; scope is files only, not chat or screenshots']});
 return result('G-05','密鑰掃描','FAIL',{mode,evidence:r.issues.map(i=>i.file+(i.line?':'+i.line:'')+' '+i.rule+(i.sample?' '+i.sample:'')),
  learnerMessage:'網站檔案裡疑似有密碼或 Token。請先不要發布，也不要把它貼到對話或截圖；請 AI 移除並到服務商重新產生新的金鑰。'});
}

export function gateDrafts(ctx){
 const {root,mode,env}=ctx;
 if(!existsSync(join(root,'dist')))return result('G-09','草稿與預覽不外洩','NOT TESTED',{mode,evidence:['dist/ missing; run the build first']});
 const out=join(root,'scripts/verify-site-output.mjs');
 const script=existsSync(out)?out:join(here,'verify-site-output.mjs');
 const run=spawnSync(process.execPath,[script,'--student-site',root],{cwd:root,encoding:'utf8',env});
 const indexing=mode==='release'?inspectRelease({root,env,approvalRequired:false}).errors.filter(e=>e.startsWith('INDEXING')):[];
 if(run.status===0&&!indexing.length)return result('G-09','草稿與預覽不外洩','PASS',{mode,evidence:['verify-site-output: drafts, sitemap, RSS, search index and preview noindex checks passed','noindex is not access control: a public preview URL is not private']});
 if(run.status===0)return result('G-09','草稿與預覽不外洩','FAIL',{mode,evidence:indexing,learnerMessage:'網站的索引設定和你要的公開狀態不一致（該擋搜尋引擎卻沒擋，或該公開卻被擋）。請先不要發布。'});
 const lines=(run.stderr||run.stdout||'').split('\n').filter(Boolean);
 return result('G-09','草稿與預覽不外洩','FAIL',{mode,evidence:lines.slice(0,5),learnerMessage:'有不該公開的內容（例如草稿）出現在公開的頁面、搜尋或訂閱裡。請先不要發布。'});
}

const git=(args,root)=>{const r=spawnSync('git',args,{cwd:root,encoding:'utf8'});return r.status===0?r.stdout.trim():null;};
const RECORD_ONLY=[/^site-state\.json$/,/^PROJECT\.md$/,/^qa-artifacts\//];

export function gateReleaseTech(ctx){
 const {root,mode,env}=ctx;
 if(mode!=='release')return null;
 const rel=inspectRelease({root,env,approvalRequired:false});
 const errs=rel.errors.filter(e=>/^(ROBOTS|SITEMAP|RSS|PREVIEW|DIST|BASE_URL)/.test(e));
 return result('R-01','發布技術檢查（robots、sitemap、RSS、平台分支）',errs.length?'FAIL':'PASS',{mode,evidence:errs,learnerMessage:errs.length?'網站的搜尋引擎設定或網址清單有問題，現在發布會讓別人找不到或找錯地方。':''});
}

// G-11: design consistency. (1) hardcoded theme colours outside the token files, (2) palette contrast.
// Violation = a literal colour above the per-file count recorded at export (design-baseline.json), so layouts that
// are not tokenised yet are not blocked for what they shipped with. design.baseline=false makes every literal a violation.
export function gateDesign(ctx){
 const {root,mode,config,gc}=ctx;
 const cfg={baseline:true,dirs:['src','public'],exclude:['public/tokens.css','public/theme.css'],allowlist:[],...(gc.design||{})};
 const violation=mode==='release'?'FAIL':'WARN';
 const problems=[],notes=[],messages=[];
 let tested=0;
 // (1) literal colours
 const hasSource=cfg.dirs.some(d=>existsSync(join(root,d)));
 if(hasSource){
  tested++;
  const found=scanSourceTree(root,cfg);
  const baseline=cfg.baseline===false?null:readDesignBaseline(root);
  if(cfg.baseline!==false&&!baseline){
   if(found.total)notes.push('no '+BASELINE_FILE+': cannot tell shipped literals from new ones, '+found.total+' literal colours found (run node scripts/gates.mjs --write-design-baseline to record them)');
  }else{
   const cmp=compareToBaseline(found,baseline);
   for(const v of cmp.violations){
    const shown=v.items.slice(0,6).map(i=>v.file+':'+i.line+' '+i.prop+': '+i.value);
    problems.push('hardcoded colour above baseline in '+v.file+' ('+v.count+' found, '+v.baseline+' allowed): '+shown.join(' | ')+(v.items.length>6?' …':''));
   }
   if(cmp.violations.length)messages.push('網站裡有新寫死的顏色（沒有透過設計 Token）。之後改色票時這些地方不會跟著變。請讓元件讀 Token，或在確有必要時加上 design-fixed 註記並說明原因。');
   const legacy=cmp.legacy.reduce((a,b)=>a+b.count,0);
   if(legacy)notes.push(legacy+' shipped hardcoded colours in '+cmp.legacy.length+' files are within the recorded baseline (layout not tokenised yet)');
  }
  for(const f of Object.entries(found.files))for(const b of f[1].badAnnotations)problems.push('design-fixed annotation with unknown reason "'+b.reason+'" at '+f[0]+':'+b.line);
  const ex=Object.values(found.files).reduce((a,b)=>a+b.exempted.length,0);
  if(ex)notes.push(ex+' literal colours exempted by design-fixed annotation or allowlist');
 }else notes.push('no src/ or public/ folder: literal colour scan not run');
 // (2) palette contrast
 if(config?.brand){
  tested++;
  const bad=contrastPairs(config.brand).filter(p=>!p.ok);
  for(const p of bad)problems.push('low contrast '+p.name+': '+p.ratio+':1 (needs '+p.min+':1) '+p.fg+' on '+p.bg+' — '+p.usage);
  if(bad.length)messages.push('色票裡有搭配的對比不夠（'+bad.map(p=>p.name+' '+p.ratio+':1').join('、')+'），部分訪客會看不清楚。請換一組對比足夠的顏色。');
 }else notes.push('site.config.json has no brand block: palette contrast not checked');
 if(!tested)return result('G-11','設計一致性','NOT TESTED',{mode,required:false,evidence:notes});
 if(problems.length)return result('G-11','設計一致性',violation,{mode,evidence:[...problems,...notes],learnerMessage:messages.join('')});
 return result('G-11','設計一致性',notes.some(n=>n.startsWith('no '+BASELINE_FILE))?'WARN':'PASS',{mode,evidence:notes});
}

// G-06: approval evidence. Identical SHAs pass; different SHAs pass only when git shows nothing but record files changed.
// An AI saying "same version" is never enough, and neither is a SHA that merely looks plausible.
export function gateApproval(ctx){
 const {root,mode,env}=ctx;
 if(mode!=='release')return null;
 const {state,error}=readState(root);
 const evidence=[];
 if(error)return result('G-06','核准版本',  'FAIL',{mode,evidence:[error],learnerMessage:'核准紀錄檔壞掉了，請請 AI 修復後再發布。'});
 const problems=state?validateState(state):[];
 const approved=env.RELEASE_APPROVED_SHA||state?.approvedSha||'';
 const current=env.RELEASE_SHA||git(['rev-parse','HEAD'],root)||'';
 const rel=inspectRelease({root,env,approvalRequired:false});
 const approvedUrl=env.RELEASE_APPROVED_URL||state?.approvedUrl||'';
 const msg='你之前看過並同意的版本，和現在要發布的版本不一樣（中間又有修改）。請重新看一次最新預覽再決定。';
 if(problems.length)return result('G-06','核准版本','FAIL',{mode,evidence:problems,learnerMessage:'核准紀錄不完整，請請 AI 補齊後再發布。'});
 if(!/^[0-9a-f]{40}$/.test(approved))return result('G-06','核准版本','FAIL',{mode,evidence:['no approved SHA recorded (RELEASE_APPROVED_SHA or site-state.json approvedSha)'],learnerMessage:'還沒有你對某個版本的核准紀錄。請先看過最新預覽，明確同意後再發布。'});
 if(!/^[0-9a-f]{40}$/.test(current))return result('G-06','核准版本','NOT TESTED',{mode,evidence:['current commit unknown: set RELEASE_SHA or run inside the git repository']});
 if(!rel.site||approvedUrl!==rel.site)evidence.push('APPROVAL: approved URL must equal the production URL '+(rel.site||'(unresolved)'));
 if(evidence.length)return result('G-06','核准版本','FAIL',{mode,evidence,learnerMessage:'你核准的網址和現在要發布的網址不一樣。請確認要發布的正式網址後再決定。'});
 if(approved===current)return result('G-06','核准版本','PASS',{mode,evidence:['approved SHA equals release SHA '+current.slice(0,7),'a person must still have approved this exact version; this check cannot authenticate consent']});
 const have=sha=>git(['cat-file','-e',sha+'^{commit}'],root)!==null||spawnSync('git',['cat-file','-e',sha+'^{commit}'],{cwd:root}).status===0;
 if(!have(approved)||!have(current))return result('G-06','核准版本','NOT TESTED',{mode,evidence:['cannot compare '+approved.slice(0,7)+' with '+current.slice(0,7)+': a commit is missing locally (fetch the PR head); differing SHAs are not accepted on declaration alone']});
 const names=(git(['diff','--name-only',approved,current],root)||'').split('\n').filter(Boolean);
 const changed=names.filter(n=>!RECORD_ONLY.some(re=>re.test(n)));
 if(changed.length)return result('G-06','核准版本','FAIL',{mode,evidence:['content changed after approval: '+changed.slice(0,10).join(', ')+(changed.length>10?' …':'')],learnerMessage:msg});
 return result('G-06','核准版本','PASS',{mode,evidence:['SHA differs ('+approved.slice(0,7)+' → '+current.slice(0,7)+') but only record files changed: '+(names.join(', ')||'none'),'a person must still have approved the approved version']});
}

// G-07: does publishing happen as a side effect of merging/pushing, and is the approval gate in front of it?
// No platform API is called (no credentials): the platform facts come from site-state.json deploy, which the learner confirmed or a read-only query supplied.
export function gatePublishPath(ctx){
 const {root,mode,results}=ctx;
 if(mode!=='release')return null;
 const {state}=readState(root);
 const deploy=state?.deploy;
 const approval=(results||[]).find(r=>r.id==='G-06');
 const approvalOk=approval?.status==='PASS';
 if(!deploy?.platform)return result('G-07','發布通路',  'NOT TESTED',{mode,evidence:['deploy.platform not recorded in site-state.json; the hosting platform and its production-branch policy were not checked']});
 const wfDir=join(root,'.github/workflows');
 let pushDeploy=false;
 if(existsSync(wfDir))for(const f of readdirSync(wfDir)){const t=readFileSync(join(wfDir,f),'utf8');if(/\bon:[\s\S]*?push:[\s\S]*?branches:[\s\S]*?\b(main|master)\b/.test(t)&&/deploy-pages|pages deploy|wrangler|cloudflare/i.test(t))pushDeploy=true;}
 if(deploy.platform==='github-pages'){
  if(!existsSync(wfDir))return result('G-07','發布通路','NOT TESTED',{mode,evidence:['no workflow found; cannot tell how GitHub Pages publishes']});
  return approvalOk?result('G-07','發布通路','PASS',{mode,evidence:[pushDeploy?'pushing to the main branch publishes; the approval gate (G-06) passed for this version':'no push-triggered deploy workflow found']}):
   result('G-07','發布通路',pushDeploy?'FAIL':'PASS',{mode,evidence:[pushDeploy?'pushing to main publishes this site but G-06 did not pass':'no push-triggered deploy workflow found'],learnerMessage:pushDeploy?'合併或推送就會直接公開網站，但這個版本還沒有你的核准。請先完成核准再合併。':''});
 }
 if(deploy.autoDeployProduction===undefined||deploy.autoDeployProduction===null)return result('G-07','發布通路','NOT TESTED',{mode,evidence:['deploy.autoDeployProduction unknown: could not confirm whether connecting or pushing publishes to production (needs the platform settings or a read-only query)']});
 if(deploy.autoDeployProduction&&!approvalOk)return result('G-07','發布通路','FAIL',{mode,evidence:['platform auto-deploys production on push/merge and G-06 did not pass for this version','production branch: '+(deploy.productionBranch||'unknown')],learnerMessage:'平台會在合併或推送時自動公開網站，但這個版本還沒有你的核准。請先完成核准，或先把正式分支設成不會自動發布。'});
 return result('G-07','發布通路','PASS',{mode,evidence:[deploy.autoDeployProduction?'auto-deploy is on and the approval gate passed for this version':'production publishing is a separate, manual step','state checked at '+(deploy.checkedAt||'unknown time')+' ('+(deploy.source||'unknown source')+'); re-check if the platform connection changed']});
}

export function gateEnvironment(ctx){
 const {root,mode}=ctx;
 const {state}=readState(root);
 const r=needsRecheck(state,root);
 return result('G-08','環境能力報告',r.recheck?'WARN':'PASS',{mode,required:false,evidence:[r.reason+(r.recheck?'; run npm run preflight -- --write':''),state?.capabilities?.checkedAt?'last checked '+state.capabilities.checkedAt:'never checked'],
  learnerMessage:r.recheck?'還沒做過（或環境已改變）的環境檢查。請請 AI 先跑環境檢查，再照結果選路線。':''});
}

// G-10: external links. Warnings only; "unreachable" (offline sandbox) is NOT TESTED and never blocks.
export async function gateLinks(ctx){
 const {root,mode,fetchImpl=globalThis.fetch,checkLinks,config}=ctx;
 if(mode!=='release'&&!checkLinks)return null;
 const dist=join(root,'dist');
 if(!existsSync(dist))return result('G-10','外部連結存活','NOT TESTED',{mode,required:false,evidence:['dist/ missing']});
 const own=(()=>{try{return new URL(config?.site||'https://invalid.invalid').hostname;}catch{return '';}})();
 const urls=new Set();
 for(const f of listHtml(dist))for(const m of readFileSync(f,'utf8').matchAll(/<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["']/gi)){try{const u=new URL(m[1].replaceAll('&amp;','&'));if(u.hostname!==own&&!/^(www\.)?(w3\.org)$/.test(u.hostname))urls.add(u.href);}catch{}}
 const list=[...urls].slice(0,30);
 if(!list.length)return result('G-10','外部連結存活','PASS',{mode,required:false,evidence:['no external links']});
 const bad=[],unreachable=[];let ok=0;
 for(const u of list){
  try{
   const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),8000);
   let res=await fetchImpl(u,{method:'HEAD',redirect:'follow',signal:ctl.signal});
   if(res.status===405||res.status===403)res=await fetchImpl(u,{method:'GET',redirect:'follow',signal:ctl.signal});
   clearTimeout(t);
   if(res.status>=400)bad.push(u+' → '+res.status);else ok++;
  }catch(e){unreachable.push(u+' ('+(e.name||'error')+')');}
 }
 if(ok===0&&bad.length===0)return result('G-10','外部連結存活','NOT TESTED',{mode,required:false,evidence:['no response from any external link (offline or blocked network)',...unreachable.slice(0,5)]});
 if(bad.length)return result('G-10','外部連結存活','WARN',{mode,required:false,evidence:[...bad,...unreachable.map(u=>'unreachable '+u),'200/3xx does not prove a booking or contact link actually works'],learnerMessage:'有外部連結打不開：'+bad.slice(0,3).join('；')+'。請確認 LINE、預約或社群連結還有效。'});
 return result('G-10','外部連結存活','PASS',{mode,required:false,evidence:[ok+' links responded (200/3xx), '+unreachable.length+' unreachable','200/3xx does not prove a booking or contact link actually works']});
}

export async function runGates({root='.',mode='preview',env=process.env,fetchImpl,checkLinks=false}={}){
 root=resolve(root);
 const gc=loadGateConfig(root),config=readConfig(root);
 const results=[];
 const ctx={root,mode,env,config,gc,results,fetchImpl,checkLinks};
 for(const gate of [gateUrl,gatePlaceholders,gateServiceFacts,gateContact,gateSecrets,gateDrafts,gateDesign,gateReleaseTech,gateApproval,gatePublishPath,gateLinks,gateEnvironment]){
  try{const r=await gate(ctx);if(r)results.push(r);}
  catch(e){results.push({id:gate.name,name:gate.name,status:'NOT TESTED',blocking:mode==='release'&&gate!==gateLinks&&gate!==gateEnvironment,evidence:['gate error: '+e.message],learnerMessage:''});}
 }
 const blocking=results.some(r=>r.blocking);
 return {mode,results,blocking,exitCode:blocking?1:0};
}

export function summarize({mode,results}){
 const lines=['# 發布關卡（'+mode+'）',''];
 for(const r of results){lines.push('- '+r.id+' '+r.name+' '+r.status+(r.blocking?'（擋下）':'')+(r.learnerMessage&&r.status!=='PASS'?'：'+r.learnerMessage:''));}
 return lines.join('\n');
}

if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)){
 const args=process.argv.slice(2);
 if(args.includes('--write-design-baseline')){const dir=resolve(args.find((a,i)=>!a.startsWith('--')&&args[i-1]!=='--mode')||'.');const r=writeDesignBaseline(dir,loadGateConfig(dir).design||{});console.log('design baseline written: '+r.total+' literal colours in '+Object.keys(r.files).length+' files');process.exit(0);}
 const mode=args.includes('--mode')?args[args.indexOf('--mode')+1]:'preview';
 if(!['preview','release'].includes(mode)){console.error('Usage: gates.mjs [--mode preview|release] [--check-links] [--write-design-baseline] [root]');process.exit(2);}
 const rootArg=args.find((a,i)=>!a.startsWith('--')&&args[i-1]!=='--mode')||'.';
 try{
  const out=await runGates({root:rootArg,mode,checkLinks:args.includes('--check-links')});
  mkdirSync(join(resolve(rootArg),'qa-artifacts'),{recursive:true});
  writeFileSync(join(resolve(rootArg),'qa-artifacts/gates-result.json'),JSON.stringify({mode:out.mode,results:out.results},null,2)+'\n');
  console.log(summarize(out));
  for(const r of out.results)if(r.status!=='PASS')for(const e of r.evidence)console.log('  ['+r.id+'] '+e);
  process.exitCode=out.exitCode;
 }catch(e){console.error('gates failed to run: '+e.message);process.exitCode=2;}
}
