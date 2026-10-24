import {readFileSync,existsSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,resolve,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {inspectRelease} from './verify-release-readiness.mjs';
import {scanSecrets} from './check-secrets.mjs';

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
 if(run.status===0)return result('G-09','草稿與預覽不外洩','PASS',{mode,evidence:['verify-site-output: drafts, sitemap, RSS, search index and preview noindex checks passed']});
 const lines=(run.stderr||run.stdout||'').split('\n').filter(Boolean);
 return result('G-09','草稿與預覽不外洩','FAIL',{mode,evidence:lines.slice(0,5),learnerMessage:'有不該公開的內容（例如草稿）出現在公開的頁面、搜尋或訂閱裡。請先不要發布。'});
}

export function gateApproval(ctx){
 const {root,mode,env}=ctx;
 if(mode!=='release')return null;
 const rel=inspectRelease({root,env,approvalRequired:true});
 const errs=rel.errors.filter(e=>e.startsWith('APPROVAL')||e.startsWith('INDEXING')||e.startsWith('ROBOTS')||e.startsWith('SITEMAP')||e.startsWith('RSS')||e.startsWith('PREVIEW')||e.startsWith('DIST'));
 return result('G-06','核准版本（宣告比對）',errs.length?'FAIL':'PASS',{mode,evidence:errs.length?errs:['declared SHA/URL match; a human must still approve this exact version'],
  learnerMessage:errs.length?'你之前看過並同意的版本，和現在要發布的版本對不上，或網站的索引與網址設定有問題。請重新看一次最新預覽再決定。':''});
}

export function runGates({root='.',mode='preview',env=process.env}={}){
 root=resolve(root);
 const gc=loadGateConfig(root),config=readConfig(root);
 const ctx={root,mode,env,config,gc};
 const results=[];
 for(const gate of [gateUrl,gatePlaceholders,gateServiceFacts,gateContact,gateSecrets,gateDrafts,gateApproval]){
  try{const r=gate(ctx);if(r)results.push(r);}
  catch(e){results.push({id:gate.name,name:gate.name,status:'NOT TESTED',blocking:mode==='release',evidence:['gate error: '+e.message],learnerMessage:''});}
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
 const mode=args.includes('--mode')?args[args.indexOf('--mode')+1]:'preview';
 if(!['preview','release'].includes(mode)){console.error('Usage: gates.mjs [--mode preview|release] [root]');process.exit(2);}
 const rootArg=args.find((a,i)=>!a.startsWith('--')&&args[i-1]!=='--mode')||'.';
 try{
  const out=runGates({root:rootArg,mode});
  mkdirSync(join(resolve(rootArg),'qa-artifacts'),{recursive:true});
  writeFileSync(join(resolve(rootArg),'qa-artifacts/gates-result.json'),JSON.stringify({mode:out.mode,results:out.results},null,2)+'\n');
  console.log(summarize(out));
  for(const r of out.results)if(r.status!=='PASS')for(const e of r.evidence)console.log('  ['+r.id+'] '+e);
  process.exitCode=out.exitCode;
 }catch(e){console.error('gates failed to run: '+e.message);process.exitCode=2;}
}
