import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const dir='docs/student-journey/',frozen='2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c';
const files=fs.readdirSync(dir).filter(x=>/^PHASE2-.*\.md$/.test(x)).sort().concat('UPSTREAM-DELTA-PR61.md');
const baseline=fs.readFileSync(dir+'SOURCE-BASELINE-2026-10-22.md','utf8');
const manifest={};
for(const row of baseline.split('\n')){const x=row.match(/^\|\s*\d+\s*\|\s*\x60([^\x60]+)\x60\s*\|\s*\x60([0-9a-f]{40})\x60/);if(x)manifest[x[1]]=x[2];}
const records=new Map(),errors=[],inventory=[];
for(const file of files){
 let content;try{content=fs.readFileSync(dir+file,'utf8')}catch(e){errors.push({file,error:e.message});continue}
 const blobSha=execFileSync('git',['hash-object',dir+file],{encoding:'utf8'}).trim();
 inventory.push({path:dir+file,blobSha});
 content.split('\n').forEach((line,n)=>{
  if(!line.startsWith('|'))return;
  const cols=line.split('|').slice(1,-1).map(x=>x.trim());
  const id=cols[0]?.match(/^\x60([A-Z][A-Z0-9_.-]*\d[A-Z0-9_.-]*)\x60$/)?.[1] || (file === 'PHASE2-BATCH9-ATOMIC-C.md' ? cols[0]?.match(/^(B9C-[A-Z]+\d+)$/)?.[1] : null);
  if(!id||cols.length<3)return;
  const refs=[{path:dir+file,revision:blobSha,blobSha,lineStart:n+1,lineEnd:n+1,legacyWorkId:id,sourceLayer:'LEGACY_WORK_PAPER',sourceText:line}];
  for(const m of line.matchAll(/https:\/\/github\.com\/pikaOne1138\/astro-personal-site-starter\/blob\/([0-9a-f]{40})\/([^\s)#]+)(?:#L(\d+)(?:-L(\d+))?)?/g)){
   const p=decodeURIComponent(m[2]);
   refs.push({path:p,revision:m[1],blobSha:m[1]===frozen?manifest[p]||null:null,lineStart:m[3]?+m[3]:null,lineEnd:m[4]?+m[4]:m[3]?+m[3]:null,legacyWorkId:id});
  }
  const evidence={workingPath:dir+file,workingBlobSha:blobSha,workingLine:n+1,rawRow:line};
  if(records.has(id)){const old=records.get(id);old.evidence.push(evidence);old.sourceRefs.push(...refs.filter(x=>!old.sourceRefs.some(z=>z.path===x.path&&z.lineStart===x.lineStart&&z.revision===x.revision)));return;}
  const parent=id.startsWith('B9C-')&&/-\d\d$/.test(id)?id.replace(/-\d\d$/,''):null;
  records.set(id,{legacyId:id,canonicalId:null,requirement:(cols[2]||cols[1]).replace(/\x60/g,''),kind:'evidence',sourceRefs:refs,aliases:[],applicability:[],conditions:[],exceptions:[],acceptanceCriteria:[],decision:'PENDING',reviewStatus:'PENDING_SEMANTIC_REVIEW',evidence:[evidence],parentLegacyId:parent,childrenLegacyIds:[]});
 });
}
for(const r of records.values())if(r.parentLegacyId&&records.has(r.parentLegacyId)){
 const parent=records.get(r.parentLegacyId);
 parent.childrenLegacyIds.push(r.legacyId);
 if(!r.sourceRefs.length)r.sourceRefs.push(...parent.sourceRefs.map(x=>({...x,legacyWorkId:r.legacyId,sourceInference:'EXACT_PARENT_WORK_ROW'})));
}
// Keep all previously recorded legacy IDs even when a parser version cannot rediscover them.
const previousLedger=fs.existsSync(dir+'canonical-ledger.json')?JSON.parse(fs.readFileSync(dir+'canonical-ledger.json','utf8')):null;
for(const prior of previousLedger?.records||[])if(!records.has(prior.legacyId)){
 records.set(prior.legacyId,{...prior,reviewStatus:'SOURCE_ROW_NOT_REDISCOVERED'});
}
// Recover mechanically encoded Batch 1–8 source coordinates from the Frozen Git tree.
// The working identifier B{batch}-{PUB|ASM|DEP}{line}-{ordinal} contains the
// source family and line number; verify the line exists before recording it.
// Preserve exact line text as evidence; this is not a semantic adjudication.
const families={PUB:'.ai/astro-content-publishing/SKILL.md',ASM:'.ai/astro-site-assembly/SKILL.md',DEP:'.ai/astro-starter-deploy/SKILL.md'};
const frozenCache=new Map(),recoveryFailures=[];
function frozenLine(source,line){
 if(!frozenCache.has(source)){
  try {frozenCache.set(source,execFileSync('git',['show',frozen+':'+source],{encoding:'utf8',maxBuffer:8*1024*1024}).split(/\r?\n/));}
  catch(e){frozenCache.set(source,null);}
 }
 return frozenCache.get(source)?.[line-1]||null;
}
for(const row of records.values()){
 if(row.sourceRefs.some(ref=>ref.revision===frozen && ref.lineStart))continue;
 const m=row.legacyId.match(/^B[1-8]-(PUB|ASM|DEP)(\d+)-\d+(?:-CF|-GH)?$/);
 if(!m)continue;
 const source=families[m[1]],line=Number(m[2]),original=frozenLine(source,line);
 if(!original||!manifest[source]){
  recoveryFailures.push({legacyId:row.legacyId,reason:'encoded Frozen source line unavailable',source,line});
  continue;
 }
 row.sourceRefs.push({path:source,revision:frozen,blobSha:manifest[source],
  lineStart:line,lineEnd:line,legacyWorkId:row.legacyId,
  sourceLayer:'FROZEN_SOURCE',sourceInference:'ENCODED_BATCH_ID_VERIFIED_AGAINST_FROZEN_LINE',
  sourceText:original});
}
// Additional legacy formats store the original source coordinates in their IDs.
// Preserve the full Frozen line, and reject nonexistent coordinates.
const explicitSources={
 QC:'docs/quality/QUALITY-CONTRACT.md',
 P59:'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',
 P56:'docs/workshop/PR56-USER-JOURNEY-QA.md'
};
const canonicalEvidence={
 'P0-CANON-PRVIEW-MISSING':['.ai/astro-pr-preview/SKILL.md',30],
 'P0-CANON-PRVIEW-CONSENT':['.ai/astro-pr-preview/SKILL.md',30],
 'P0-CANON-INDEX-ENABLE':['.ai/astro-starter-deploy/SKILL.md',31],
 'P0-CANON-PREVIEW-INDEX':['.ai/astro-starter-deploy/SKILL.md',31]
};
for(const row of records.values()){
 if(row.sourceRefs.some(ref=>ref.revision===frozen && ref.lineStart))continue;
 const id=row.legacyId;
 const m=id.match(/^(QC|P59|P56)-(\d+)$/);
 const labeled=id.match(/^B[1-9]-(PUB|ASM|DEP)-L(\d+)-\d+$/);
 const match=m?[explicitSources[m[1]],Number(m[2])]:
  labeled?[families[labeled[1]],Number(labeled[2])]:
  canonicalEvidence[id]||null;
 if(!match)continue;
 const [source,line]=match,original=frozenLine(source,line);
 if(!original||!manifest[source]){
  recoveryFailures.push({legacyId:id,source,line,reason:'referenced original line unavailable'});
  continue;
 }
 row.sourceRefs.push({path:source,revision:frozen,blobSha:manifest[source],
  lineStart:line,lineEnd:line,legacyWorkId:id,sourceLayer:'FROZEN_SOURCE',
  sourceInference:'LEGACY_ID_COORDINATE_VERIFIED_AGAINST_FROZEN_LINE',sourceText:original});
}
// Phase 2 B: import evidence-backed semantic relationships, never auto-approve IDs.
const semanticRelations=[];
function relation(ids,decision,source,scope){
 const present=ids.filter(id=>records.has(id));
 if(present.length!==ids.length){recoveryFailures.push({reason:'SEMANTIC_RELATION_ORPHAN',ids,missing:ids.filter(id=>!records.has(id))});return;}
 const rows=ids.map(id=>records.get(id));
 const common=rows.map(r=>new Set(r.sourceRefs.filter(x=>x.revision===frozen).map(x=>x.path+':'+x.lineStart)));
 const exactShared=[...common[0]].filter(k=>common.slice(1).every(set=>set.has(k)));
 semanticRelations.push({legacyIds:ids,decision,sourceWorkingPaper:source,scopeNote:scope,
  sharedExactFrozenAnchors:exactShared,reviewStatus:'DOCUMENTARY_EVIDENCE_REVIEWED_PENDING_APPROVAL',
  canonicalId:null});
 for(const r of rows){
  r.semanticRelations=[...(r.semanticRelations||[]),{otherLegacyIds:ids.filter(id=>id!==r.legacyId),decision,sourceWorkingPaper:source}];
 }
}
const p0='docs/student-journey/PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md';
relation(['P0-U035','P0-U044'],'MERGE',p0,'Same Frozen preview SKILL L30, missing GitHub Pages Preview reporting');
relation(['P0-U036','P0-U045'],'MERGE',p0,'Same Frozen preview SKILL L30, consent before Preview architecture changes');
relation(['P0-U018','P0-U047'],'MERGE',p0,'Same Frozen deploy SKILL L31, production indexing only with approval');
relation(['P0-U019','P0-U049'],'MERGE',p0,'Same Frozen deploy SKILL L31, Cloudflare Preview index settings isolated');
const cw='docs/student-journey/PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md';
relation(['B9C-DEP32-01','B5-PUB62-03'],'PARTIAL_SPLIT',cw,'Specific noindex versus broader CI release gate');
relation(['B9C-ASM78-02','B9C-ASM78-03'],'DISTINCT',cw,'Positive duration condition differs from missing-duration fallback');
relation(['B9C-ASM77-01','B9C-ASM77-02'],'DISTINCT',cw,'Optional schema differs from member-identity approval');
relation(['B9C-DEP40-03','B9A-DEP25-01'],'PARTIAL_SPLIT',cw,'Cloudflare project linkage differs from URL/SHA proof');
// Ingest existing crosswalk relationship rows (evidence only). Avoid a new parallel ledger.
// Require both legacy IDs and explicit relation classification in the source table.
const relationKeys=new Set(semanticRelations.map(x=>x.legacyIds.join('|')+'|'+x.decision));
const classifyRelation=text=>{
 if(/\b(DISTINCT|DIFFERENT_SCOPE|NOT_EQUIVALENT)\b/.test(text))return 'DISTINCT';
 if(/\b(PARTIAL_SPLIT|PARTIAL_OVERLAP|SCOPE_OVERLAP|TEST_OVERLAP|AUTHORIZATION_SCOPE|FIELD_SCOPE_OVERLAP)\b/.test(text))return 'PARTIAL_SPLIT';
 if(/\b(SAME_CANDIDATE|SAME_MEANING|EXACT_ALIAS)\b/.test(text))return 'MERGE';
 return null;
};
for(const filename of files.filter(n=>/(CROSSWALK|DEDUPE|SEMANTIC|REVIEW)/.test(n))){
 const filepath=dir+filename,body=fs.readFileSync(filepath,'utf8');
 for(const [idx,rowText] of body.split('\n').entries()){
  if(!rowText.startsWith('|'))continue;
  const cells=rowText.split('|').slice(1,-1).map(x=>x.trim());
  if(cells.length<3)continue;
  const left=cells[0].match(/^\x60([A-Z][A-Z0-9_.-]*\d[A-Z0-9_.-]*)\x60$/)?.[1];
  const right=cells[1].match(/^\x60([A-Z][A-Z0-9_.-]*\d[A-Z0-9_.-]*)\x60$/)?.[1];
  const initialDecision=classifyRelation(cells[2]);
  const decision=initialDecision==='MERGE' && /(?:不能刪掉兩個|驗收差異後才決定|核對主詞)/.test(cells.slice(3).join(' '))?'PARTIAL_SPLIT':initialDecision;
  if(!left||!right||!decision||left===right)continue;
  if(!records.has(left)||!records.has(right)){
   recoveryFailures.push({reason:'DOCUMENTARY_RELATION_MISSING_ID',source:filepath,line:idx+1,legacyIds:[left,right]});
   continue;
  }
  const ids=[left,right].sort();
  const key=ids.join('|')+'|'+decision;
  if(relationKeys.has(key))continue;
  relationKeys.add(key);
  relation(ids,decision,filepath+'#L'+(idx+1),cells.slice(2).join(' | ').replace(/\x60/g,''));
 }
}
const path=dir+'canonical-ledger.json';
const old=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,'utf8')):null;
if(process.argv[2]==='import'){
 const oldById=new Map((old?.records||[]).map(x=>[x.legacyId,x]));
 const entries=[...records.values()].map(x=>{const previous=oldById.get(x.legacyId);return previous?{...x,sourceRefs:x.sourceRefs.length?x.sourceRefs:previous.sourceRefs,canonicalId:previous.canonicalId,decision:previous.decision,reviewStatus:previous.reviewStatus,kind:previous.kind,aliases:previous.aliases,applicability:previous.applicability,conditions:previous.conditions,exceptions:previous.exceptions,acceptanceCriteria:previous.acceptanceCriteria}:x;});
 // Four exact-source, independently checked P0 aliases. Never infer merges
 // from proximity. Frozen text and the P0 register identify the same action.
 const approvedPairs=[
  {canonicalId:'ATP-P2-0001',ids:['P0-U035','P0-U044'],
   requirement:'When student GitHub Pages has no installed safe PR preview workflow or external preview hosting, explicitly report that no live preview URL exists; never fabricate one.',
   kind:'policy',applicability:['student-owned GitHub Pages without functioning isolated PR preview'],
   conditions:['No verified student PR Preview deployment exists'],exceptions:[],
   acceptanceCriteria:['No Live URL claimed without real deployment evidence'],
   frozenPath:'.ai/astro-pr-preview/SKILL.md',line:30},
  {canonicalId:'ATP-P2-0002',ids:['P0-U036','P0-U045'],
   requirement:'Obtain student consent before changing preview or deployment architecture.',
   kind:'policy',applicability:['student preview infrastructure change'],
   conditions:['Proposed installation or alteration of Preview hosting/workflow'],exceptions:[],
   acceptanceCriteria:['Specific student approval precedes architecture modification'],
   frozenPath:'.ai/astro-pr-preview/SKILL.md',line:30},
  {canonicalId:'ATP-P2-0003',ids:['P0-U018','P0-U047'],
   requirement:'Only after content, live Preview, security and authorization review, and explicit student approval, set SITE_INDEXABLE=true for production only and rebuild.',
   kind:'policy',applicability:['approved student Production environment'],
   conditions:['Content/Preview/security/consent gates completed'],exceptions:['Never on Cloudflare Preview'],
   acceptanceCriteria:['Production-only flag with verified robots/meta/canonical/sitemap after rebuild'],
   frozenPath:'.ai/astro-starter-deploy/SKILL.md',line:31},
  {canonicalId:'ATP-P2-0004',ids:['P0-U019','P0-U049'],
   requirement:'Do not share the approved production search-indexing flag with Cloudflare Preview environments.',
   kind:'policy',applicability:['Cloudflare Preview versus Production indexing isolation'],
   conditions:['Student uses Cloudflare Preview'],exceptions:[],
   acceptanceCriteria:['Preview indexing remains disabled regardless of production approval'],
   frozenPath:'.ai/astro-starter-deploy/SKILL.md',line:31}
 ];
 const byId=new Map(entries.map(x=>[x.legacyId,x]));
 for(const group of approvedPairs){
  const lineText=frozenLine(group.frozenPath,group.line);
  const linked=group.ids.map(id=>byId.get(id));
  if(!lineText||!manifest[group.frozenPath]||linked.some(x=>!x)||
      linked.some(x=>!x.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===group.frozenPath&&ref.lineStart===group.line))){
   throw Error('Canonical evidence check failed for '+group.canonicalId);
  }
  for(const entry of linked){
   if(entry.canonicalId&&entry.canonicalId!==group.canonicalId)throw Error('Canonical decision conflict for '+entry.legacyId);
   Object.assign(entry,{canonicalId:group.canonicalId,requirement:group.requirement,
    kind:group.kind,aliases:group.ids.filter(id=>id!==entry.legacyId),
    applicability:group.applicability,conditions:group.conditions,exceptions:group.exceptions,
    acceptanceCriteria:group.acceptanceCriteria,decision:'MERGE',reviewStatus:'APPROVED',
    approvalEvidence:{frozenPath:group.frozenPath,frozenBlobSha:manifest[group.frozenPath],
      frozenLine:group.line,sourceText:lineText,
      method:'DIRECT_FROZEN_LINE_PLUS_P0_DOCUMENTARY_SAME_ACTION_REVIEW'}});
  }
  const rel=semanticRelations.find(x=>x.legacyIds.length===2&&group.ids.every(id=>x.legacyIds.includes(id))&&x.decision==='MERGE');
  if(!rel)throw Error('Missing reviewed relationship '+group.canonicalId);
  rel.canonicalId=group.canonicalId;rel.reviewStatus='APPROVED';
 }
 // Explicitly source-checked P0 single-action clauses. Preserve any prior
 // adjudication and do not equate one Frozen line with one atomic clause.
 const directP0=[
  ['P0-U001','Consent for the current PR version is required before merging','.ai/astro-pr-preview/SKILL.md',25,'policy'],
  ['P0-U002','Report actual Preview URL and distinguish verified from unverified checks before asking for release approval','.ai/astro-pr-preview/SKILL.md',25,'acceptance'],
  ['P0-U003','Do not publish production without specific student authorization','.ai/astro-starter-deploy/SKILL.md',37,'policy'],
  ['P0-U004','A successful build does not establish that a live Preview exists','.ai/astro-pr-preview/SKILL.md',23,'evidence'],
  ['P0-U005','An Actions artifact must not be represented as a web-accessible live Preview','.ai/astro-pr-preview/SKILL.md',23,'evidence'],
  ['P0-U006','Compare the deployment commit with the current PR head SHA before claiming a Preview is current','.ai/astro-pr-preview/SKILL.md',23,'acceptance'],
  ['P0-U008','Teacher-repository CI does not establish independent student-repository acceptance','.ai/astro-pr-preview/SKILL.md',11,'evidence'],
  ['P0-U009','Historical immutable deployment URLs may remain publicly reachable','.ai/astro-pr-preview/SKILL.md',39,'policy'],
  ['P0-U010','Private repository status does not guarantee Preview access is private','.ai/astro-pr-preview/SKILL.md',39,'policy'],
  ['P0-U011','Do not ask students to disclose tokens, passwords or one-time verification codes in chat','.ai/astro-pr-preview/SKILL.md',16,'policy'],
  ['P0-U012','Do not embed credentials in committed source files or conversation text','.ai/astro-pr-preview/SKILL.md',16,'policy'],
  ['P0-U013','Do not fabricate professional qualifications, testimonials, effects or prices','.ai/astro-site-entry/SKILL.md',18,'policy'],
  ['P0-U014','Do not claim booking, form submission or newsletter subscriptions succeeded without configured and verified integrations','.ai/astro-site-entry/SKILL.md',18,'policy'],
  ['P0-U015','When content facts are missing, leave them blank, explicitly pending, or clearly marked demo data','.ai/astro-site-entry/SKILL.md',18,'policy'],
  ['P0-U016','Actual website owner must confirm factual claims; automated CI cannot substitute for factual verification','.ai/astro-site-entry/SKILL.md',18,'policy'],
  ['P0-U020','Never remove noindex merely to make CI pass','.ai/astro-starter-deploy/SKILL.md',31,'policy'],
  ['P0-U021','Visual QA for normal site changes covers 1440, 1280, 768 and 390 widths','.ai/astro-pr-preview/SKILL.md',24,'acceptance'],
  ['P0-U023','Without actual visual inspection, do not claim visual QA is completed','.ai/astro-pr-preview/SKILL.md',24,'acceptance'],
  ['P0-U030','DNS changes require student authorization','.ai/astro-starter-deploy/SKILL.md',37,'policy'],
  ['P0-U031','Repository deletion requires student authorization','.ai/astro-starter-deploy/SKILL.md',37,'policy'],
  ['P0-U032','Overwriting an existing student site requires student authorization','.ai/astro-starter-deploy/SKILL.md',37,'policy']
  ,['P0-U022','PR59 independent student-site manual QA additionally includes 375px','.ai/astro-pr-preview/SKILL.md',24,'acceptance']
  ,['P0-U024','Deleting historical preview deployments, reviewing exposure history or configuring Cloudflare Access requires separate explicit authorization','.ai/astro-pr-preview/SKILL.md',62,'policy']
  ,['P0-U025','Do not claim that already publicly copied website content can be guaranteed erased','.ai/astro-pr-preview/SKILL.md',62,'policy']
  ,['P0-U026','Do not destroy QA evidence without authorization','.ai/astro-pr-preview/SKILL.md',62,'policy']
  ,['P0-U027','Unpublished drafts should use local or restricted-access previews rather than unrestricted public deployments','.ai/astro-pr-preview/SKILL.md',62,'policy']
  ,['P0-U028','Automated PASS does not prove professional claims or legal applicability in an independent student site','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',39,'acceptance']
  ,['P0-U033','Completion of research PR59 does not authorize publication of an individual student site','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',72,'policy']
  ,['P0-U037','Cloudflare Preview URLs and associated status must come from actual platform deployment reports','.ai/astro-pr-preview/SKILL.md',38,'evidence']
  ,['P0-U038','Do not invent Cloudflare pages.dev URLs or copy research GitHub Pages preview path conventions','.ai/astro-pr-preview/SKILL.md',38,'policy']
  ,['P0-U039','Student-owned independent repo requires real PR workflow run evidence','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',22,'acceptance']
  ,['P0-U040','For GitHub Pages repository subpaths validate deployed site routes and assets against real URL and SHA','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',24,'acceptance']
  ,['P0-U041','Run Cloudflare root-path preview tests only when Cloudflare is the chosen hosting route','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',24,'acceptance']
  ,['P0-U042','Check whether the deployed Preview is indexable by search engines','.ai/astro-pr-preview/SKILL.md',39,'acceptance']
  ,['P0-U043','Check Preview for private or unapproved content before disclosing its URL','.ai/astro-pr-preview/SKILL.md',39,'acceptance']
  ,['P0-U046','Re-evaluate prior test evidence when the upstream project revision changes','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',16,'acceptance']
  ,['P0-U050','Independent external student-site acceptance requires a working Preview corresponding to exact deployment SHA','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',24,'acceptance']
  ,['P0-U051','A local simulated site is not evidence of live online deployment','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',24,'acceptance']
  ,['P0-U007','Branch Preview URLs may change over time; use the deployment URL corresponding to the reviewed PR commit','.ai/astro-pr-preview/SKILL.md',23,'acceptance']
  ,['P0-U017','New student site defaults to noindex HTML and disallowing search crawling in robots.txt','.ai/astro-starter-deploy/SKILL.md',31,'policy']
  ,['P0-U029','Manual acceptance evidence must preserve the exact approved PR Head SHA','docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',40,'evidence']
  ,['P0-U034','GitHub Pages pull requests do not inherently create isolated live Preview deployments','.ai/astro-pr-preview/SKILL.md',30,'architecture']
  ,['P0-U048','After approved production indexing settings change, rebuild the actual student site','.ai/astro-starter-deploy/SKILL.md',31,'procedure']
 ];
 for(let i=0;i<directP0.length;i++){
  const [id,requirement,source,line,kind]=directP0[i],entry=byId.get(id);
  const canonicalId='ATP-P2-'+String(i+5).padStart(4,'0');
  const text=frozenLine(source,line);
  if(!entry||!text||!entry.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===source&&ref.lineStart===line))
   throw Error('Missing exact original evidence for '+id);
  if(entry.canonicalId&&entry.canonicalId!==canonicalId)throw Error('Overwriting existing canonical '+id);
  Object.assign(entry,{
   canonicalId,requirement,kind,aliases:[],
   decision:'KEEP',reviewStatus:'APPROVED',
   applicability:['student-owned site workflow; according to source scope'],
   conditions:['Source-specific platform and authorization conditions remain binding'],
   exceptions:[],acceptanceCriteria:[],
   approvalEvidence:{frozenPath:source,frozenBlobSha:manifest[source],frozenLine:line,
    sourceText:text,method:'DIRECT_SOURCE_AND_P0_ATOMIC_DOCUMENTARY_REVIEW'}
  });
 }
 // Exact same-action aliases from prior Phase2 papers. Each pair has a
 // matching Frozen line AND a manually checked atomic statement. Never map
 // composite parents or narrower acceptance subconditions by proximity.
 const semanticAliasProofs=[
  ['B1-DEP31-01','P0-U017','.ai/astro-starter-deploy/SKILL.md',31],
  ['B1-DEP31-02','P0-U018','.ai/astro-starter-deploy/SKILL.md',31],
  ['B1-DEP31-04','P0-U019','.ai/astro-starter-deploy/SKILL.md',31],
  ['B1-DEP31-04-CF','P0-U019','.ai/astro-starter-deploy/SKILL.md',31],
  ['B1-DEP31-03-S02','P0-U048','.ai/astro-starter-deploy/SKILL.md',31],
  ['PREVIEW-HISTORY-01','P0-U024','.ai/astro-pr-preview/SKILL.md',62],
  ['PREVIEW-HISTORY-02','P0-U025','.ai/astro-pr-preview/SKILL.md',62],
  ['PREVIEW-HISTORY-03','P0-U026','.ai/astro-pr-preview/SKILL.md',62],
  ['PREVIEW-HISTORY-04','P0-U027','.ai/astro-pr-preview/SKILL.md',62],
  ['GATE-002.01','P0-U003','.ai/astro-starter-deploy/SKILL.md',37],
  ['GATE-002.02.S1','P0-U030','.ai/astro-starter-deploy/SKILL.md',37],
  ['GATE-002.02.S2','P0-U031','.ai/astro-starter-deploy/SKILL.md',37],
  ['GATE-002.02.S3','P0-U032','.ai/astro-starter-deploy/SKILL.md',37],
  ['PROOF-001.03.S1','P0-U034','.ai/astro-pr-preview/SKILL.md',30],
  ['PROOF-001.03.S2','P0-U035','.ai/astro-pr-preview/SKILL.md',30],
  ['PROOF-001.03.S3','P0-U036','.ai/astro-pr-preview/SKILL.md',30],
  ['PREVIEW-POLICY-01.S1','P0-U035','.ai/astro-pr-preview/SKILL.md',30],
  ['PREVIEW-POLICY-01.S2','P0-U036','.ai/astro-pr-preview/SKILL.md',30]
 ];
 for(const [legacyId,anchorId,source,line] of semanticAliasProofs){
  const target=byId.get(anchorId),alias=byId.get(legacyId);
  if(!target?.canonicalId||!alias||!frozenLine(source,line)||
    !alias.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===source&&ref.lineStart===line)||
    !target.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===source&&ref.lineStart===line))
   throw Error('Source-verified alias proof unavailable: '+legacyId+' -> '+anchorId);
  if(alias.canonicalId&&alias.canonicalId!==target.canonicalId)
   throw Error('Alias would overwrite prior canonical: '+legacyId);
  const siblings=entries.filter(row=>row.canonicalId===target.canonicalId || row.legacyId===legacyId);
  const ids=siblings.map(row=>row.legacyId);
  for(const row of siblings){
   const original=row.legacyId===legacyId?alias:row;
   Object.assign(row,{canonicalId:target.canonicalId,requirement:target.requirement,
    kind:target.kind,applicability:target.applicability,conditions:target.conditions,
    exceptions:target.exceptions,acceptanceCriteria:target.acceptanceCriteria,
    decision:'MERGE',reviewStatus:'APPROVED',aliases:ids.filter(id=>id!==row.legacyId),
    approvalEvidence:row.approvalEvidence||{frozenPath:source,frozenBlobSha:manifest[source],
      frozenLine:line,sourceText:frozenLine(source,line),
      formerWorkingRequirement:original.requirement,
      method:'DIRECT_FROZEN_SOURCE_AND_PRIOR_ATOMIC_ROW_SEMANTIC_EQUIVALENCE'}});
  }
  semanticRelations.push({legacyIds:[legacyId,anchorId],decision:'MERGE',
   sourceWorkingPaper:'PHASE2_P0_AND_PRIOR_BATCH_ATOMIC_RECORD',
   scopeNote:'Exact same scoped action at immutable Frozen line; original working row preserved in evidence',
   sharedExactFrozenAnchors:[source+':'+line],reviewStatus:'APPROVED',canonicalId:target.canonicalId});
 }
 // P0 leaf checkboxes/evidence fields are acceptance dimensions of a
 // composite obligation, not 35 independently invented policy obligations.
 const dimensions=[
  {key:'PR59_REPORT_FIELDS',ids:[52,53,54,55,56,57,58],
   parent:'PR59-EVIDENCE-01',scope:'PR59 evidence record: target, commit, URL/artifact, date, actor, result, unresolved risks'},
  {key:'INDEXING_ARTIFACTS',ids:[59,60,61,62],
   parent:'ATP-P2-0003',scope:'Production indexing after authorized build: meta robots, robots.txt, canonical and sitemap'},
  {key:'PREVIEW_QA_TARGETS',ids:[63,64,65,66,67,68,69,70,71,72,73,74,75,76],
   parent:'QA-DETAIL-01',scope:'Applicable real Preview routes, page behavior, input methods and privacy checks'},
  {key:'PR59_SUBPATH_QA',ids:[77,78,79,80,81],
   parent:'PROOF-003.03',scope:'Student repository GitHub Pages subpath browser acceptance'},
  {key:'PR59_EXT01_EVIDENCE',ids:[82,83,84,85,86],
   parent:'PROOF-003.02',scope:'Independent student repo real PR CI evidence package'}
 ];
 const mappedDimensions=[];
 for(const group of dimensions){
  for(const num of group.ids){
   const id='P0-U'+String(num).padStart(3,'0');
   const entry=byId.get(id);
   if(!entry||!entry.sourceRefs.some(ref=>ref.revision===frozen&&ref.lineStart))
    throw Error('Evidence field Frozen source missing: '+id);
   if(entry.canonicalId)throw Error('Leaf evidence field already assigned a distinct canonical: '+id);
   entry.kind=entry.kind==='evidence'?'acceptance':entry.kind;
   entry.decision='PARTIAL_SPLIT';
   entry.reviewStatus='EVIDENCE_DIMENSION_MAPPED_PARENT_ADJUDICATION_PENDING';
   entry.parentCanonicalCandidate=group.parent;
   entry.acceptanceDimensionGroup=group.key;
   entry.acceptanceDimensionScope=group.scope;
   entry.atomicEvidenceText=entry.requirement;
   mappedDimensions.push({legacyId:id,parent:group.parent,group:group.key});
  }
 }
 // Canonicalization of *acceptance dimensions* across earlier work papers.
 // These 35 proof/checklist leaf aliases remain children of five composite
 // acceptance contracts. Never count them as 35 extra policy obligations.
 const leafAliasGroups=[
  {pattern:'PR59-EVIDENCE-01.S1.A',nums:[1,2,3],p0Start:52,source:'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',line:16},
  {pattern:'PR59-EVIDENCE-01.S2.A',nums:[1,2,3,4],p0Start:55,source:'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',line:16},
  {pattern:'INDEX-DETAIL-01.S3.A',nums:[1,2,3,4],p0Start:59,source:'.ai/astro-starter-deploy/SKILL.md',line:31},
  {pattern:'QA-DETAIL-01.S1.A',nums:[1,2,3,4,5,6,7,8],p0Start:63,source:'.ai/astro-pr-preview/SKILL.md',line:24},
  {pattern:'QA-DETAIL-01.S2.A',nums:[1,2,3],p0Start:71,source:'.ai/astro-pr-preview/SKILL.md',line:24},
  {pattern:'QA-DETAIL-01.S3.A',nums:[1,2,3],p0Start:74,source:'.ai/astro-pr-preview/SKILL.md',line:24},
  {pattern:'EXT-DETAIL-01.S1.A',nums:[1,2,3,4,5],p0Start:77,source:'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',line:24},
  {pattern:'PROOF-003.02.S2.A',nums:[1,2,3,4,5],p0Start:82,source:'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md',line:22}
 ];
 const dimensionAliases=[];
 for(const group of leafAliasGroups){
  for(const num of group.nums){
   const id=group.pattern+num;
   const anchorId='P0-U'+String(group.p0Start+num-1).padStart(3,'0');
   const anchor=byId.get(anchorId),alias=byId.get(id);
   if(!anchor||!alias||!frozenLine(group.source,group.line)||
      ![anchor,alias].every(row=>row.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===group.source&&ref.lineStart===group.line)))
    throw Error('Acceptance dimension alias lacks original source proof: '+id);
   if(alias.canonicalId)throw Error('Dimension already has distinct canonical '+id);
   Object.assign(alias,{kind:'acceptance',decision:'MERGE',
    reviewStatus:'APPROVED_DIMENSION_EQUIVALENCE_PARENT_PENDING',
    equivalentAcceptanceDimensionId:anchorId,
    parentCanonicalCandidate:anchor.parentCanonicalCandidate,
    acceptanceDimensionGroup:anchor.acceptanceDimensionGroup,
    atomicEvidenceText:anchor.atomicEvidenceText,
    approvalEvidence:{frozenPath:group.source,frozenLine:group.line,
     frozenBlobSha:manifest[group.source],sourceText:frozenLine(group.source,group.line),
     method:'EXACT_SOURCE_AND_IDENTICAL_EVIDENCE_FIELD'}});
   anchor.equivalentDimensionAliases=[...(anchor.equivalentDimensionAliases||[]),id];
   dimensionAliases.push([id,anchorId]);
   semanticRelations.push({legacyIds:[id,anchorId],decision:'MERGE',
    sourceWorkingPaper:'PHASE2_P0_AND_PRIOR_ATOMIC_EVIDENCE_FIELDS',
    scopeNote:'Identical individually testable acceptance field; no extra independent policy',
    sharedExactFrozenAnchors:[group.source+':'+group.line],
    reviewStatus:'APPROVED_DIMENSION_EQUIVALENCE_PARENT_PENDING',canonicalId:null});
  }
 }
 // Phase 2 B — content publishing: canonicalize actual atomic leaves from
 // Frozen L28, not their composite parent labels.
 const publishingAtomic=[
  ['B1-PUB28-01','Public article collection loader must use src/content/articles only','policy'],
  ['B1-PUB28-02','Unpublished Markdown drafts belong under src/content/drafts, not the public articles directory','policy'],
  ['B1-PUB28-03-S01','Approved draft publication moves Markdown into articles','procedure'],
  ['B1-PUB28-03-S02','On publication change legacy draft:true frontmatter to draft:false','procedure'],
  ['B1-PUB28-04-S01','Withdrawn published article moves back to drafts Collection','procedure'],
  ['B1-PUB28-04-S02','Withdrawn article is marked draft:true','procedure'],
  ['B1-PUB28-04-S03','Build from a clean output directory after article withdrawal','procedure'],
  ['B1-PUB28-05','Verify actual public article route visibility after publish/withdrawal transition','acceptance'],
  ['B1-PUB28-06-S01','Do not silently change existing public article URLs','policy'],
  ['B1-PUB28-06-S02','Inspect student-specific routing before migrating legacy draft filtering','procedure'],
  ['B1-PUB28-07','Draft/public folder separation is a publication control, not confidentiality protection','policy'],
  ['B1-PUB28-08','After article state changes run actual draft-leakage gate; without running it do not report PASS','acceptance'],
  ['B1-PUB28-09','Public article loader must never glob the entire content directory including drafts','policy']
 ];
 for(let i=0;i<publishingAtomic.length;i++){
  const [id,requirement,kind]=publishingAtomic[i],entry=byId.get(id);
  const source='.ai/astro-content-publishing/SKILL.md',line=28;
  const canonicalId='ATP-P2-'+String(48+i).padStart(4,'0');
  if(!entry||!frozenLine(source,line)||
     !entry.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===source&&ref.lineStart===line))
   throw Error('Missing Frozen publishing atomic child: '+id);
  if(entry.canonicalId&&entry.canonicalId!==canonicalId)throw Error('Publishing canonical conflict: '+id);
  Object.assign(entry,{canonicalId,requirement,kind,aliases:[],decision:'KEEP',
   reviewStatus:'APPROVED',applicability:['Student site with articles/drafts Collections'],
   conditions:[],exceptions:[],acceptanceCriteria:[],
   approvalEvidence:{frozenPath:source,frozenLine:line,frozenBlobSha:manifest[source],
    sourceText:frozenLine(source,line),method:'FROZEN_SOURCE_PLUS_PRIOR_ATOMIC_CHILD_REVIEW'}});
 }
 const publishingParents=[
  ['B1-PUB28-03',['B1-PUB28-03-S01','B1-PUB28-03-S02']],
  ['B1-PUB28-04',['B1-PUB28-04-S01','B1-PUB28-04-S02','B1-PUB28-04-S03']],
  ['B1-PUB28-06',['B1-PUB28-06-S01','B1-PUB28-06-S02']]
 ];
 for(const [id,children] of publishingParents){
  const parent=byId.get(id);
  if(!parent||children.some(child=>byId.get(child)?.reviewStatus!=='APPROVED'))
   throw Error('Cannot close publishing composite parent: '+id);
  Object.assign(parent,{kind:'evidence',decision:'PARTIAL_SPLIT',
   reviewStatus:'PARENT_COVERED_BY_ATOMIC_CHILDREN',childrenLegacyIds:children,
   parentDisposition:'Composite requirement superseded for counting by exactly enumerated approved children, not deleted'});
 }
 // Publishing draft leak acceptance: never equate an unrun check with PASS.
 const leakageLeaves=[
  ['B1-PUB56-01-S01','Run clean Astro build before draft leakage inspection'],
  ['B1-PUB56-01-S02','Run the output draft leakage gate in the actual student site'],
  ['B1-PUB56-02-S01','Verify withdrawn drafts do not have direct public HTML routes'],
  ['B1-PUB56-02-S02','Verify all generated HTML is free of draft leakage'],
  ['B1-PUB56-02-S03','Verify RSS output omits withdrawn drafts'],
  ['B1-PUB56-02-S04','Verify sitemap output omits withdrawn drafts'],
  ['B1-PUB56-02-S05','Verify configured search and content discovery do not expose drafts'],
  ['B1-PUB56-03','Use a deliberately leaking negative fixture and require the draft gate to fail'],
  ['B1-PUB56-04','If draft-leakage gate misses a leak, repair the gate instead of rewriting the QA report'],
  ['B1-PUB56-05-S01','Extend route-aware draft leak verification for custom slugs'],
  ['B1-PUB56-05-S02','Extend route-aware draft leak verification for nested routes'],
  ['B1-PUB56-05-S03','Extend route-aware draft leak verification for MDX'],
  ['B1-PUB56-05-S04','Extend route-aware draft leak verification for CMS or unconventional sources']
 ];
 for(let i=0;i<leakageLeaves.length;i++){
  const [id,requirement]=leakageLeaves[i],entry=byId.get(id);
  const source='.ai/astro-content-publishing/SKILL.md',line=56;
  if(!entry||!frozenLine(source,line)||
    !entry.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===source&&ref.lineStart===line))
   throw Error('Draft leakage rule source missing: '+id);
  const canonicalId='ATP-P2-'+String(61+i).padStart(4,'0');
  if(entry.canonicalId&&entry.canonicalId!==canonicalId)throw Error('Existing draft canonical mismatch: '+id);
  Object.assign(entry,{canonicalId,requirement,kind:'acceptance',decision:'KEEP',reviewStatus:'APPROVED',
   applicability:['Student article sites with public/draft content'],
   conditions:i>=9?['Only if custom content routing/data source is used']:[],
   exceptions:[],aliases:[],acceptanceCriteria:[],
   approvalEvidence:{frozenPath:source,frozenLine:line,frozenBlobSha:manifest[source],
    sourceText:frozenLine(source,line),method:'FROZEN_LINE_AND_ATOMIC_CHILD_SEMANTIC_REVIEW'}});
 }
 for(const [id,kids] of [
  ['B1-PUB56-01',['B1-PUB56-01-S01','B1-PUB56-01-S02']],
  ['B1-PUB56-02',Array.from({length:5},(_,i)=>'B1-PUB56-02-S0'+(i+1))],
  ['B1-PUB56-05',Array.from({length:4},(_,i)=>'B1-PUB56-05-S0'+(i+1))]
 ]){
  const row=byId.get(id);
  if(!row||kids.some(child=>byId.get(child)?.reviewStatus!=='APPROVED'))
   throw Error('Cannot decompose draft gate parent: '+id);
  Object.assign(row,{decision:'PARTIAL_SPLIT',kind:'evidence',
   reviewStatus:'PARENT_COVERED_BY_ATOMIC_CHILDREN',childrenLegacyIds:kids,
   parentDisposition:'Content verified from the listed atomic children; retain for historical trace only'});
 }
 // Verify actual article output and discovery surfaces. Existing child IDs
 // are individual acceptance dimensions; the historical parent is not counted.
 const articleAcceptance=[
  ['B5-PUB63-01-S01','Generated public article routes exist',63],
  ['B5-PUB63-01-S02','No expected article route is missing',63],
  ['B5-PUB63-02-S01','Article listing links navigate to actual pages',63],
  ['B5-PUB63-02-S02','Article tag links work',63],
  ['B5-PUB63-02-S03','Article month links work',63],
  ['B5-PUB63-02-S04','Article calendar/date links work',63],
  ['B5-PUB63-02-S05','Related-article links work',63],
  ['B5-PUB63-03-S01','Article sharing interactions actually work',63],
  ['B5-PUB63-03-S02','Article breadcrumb navigation works',63],
  ['B5-PUB63-03-S03','Previous and next article navigation works',63],
  ['B5-PUB63-03-S04','Configured article search actually finds matching content',63],
  ['B7-PUB-L70-01','Authorized article creation requires only a Markdown file and not manual TypeScript arrays',70],
  ['B7-PUB-L70-02-S01','Published article is reachable through a public route',70],
  ['B7-PUB-L70-02-S02','Published article has a reachable detail page',70],
  ['B7-PUB-L70-02-S03','Published article is correctly discoverable through tags and dates',70],
  ['B7-PUB-L70-02-S04','Published article appears in relevant related-article links',70],
  ['B7-PUB-L70-02-S05','Published article is discoverable through configured search',70],
  ['B7-PUB-L70-03-S01','RSS and Sitemap reflect the published article state',70],
  ['B7-PUB-L70-03-S02','Published article metadata remains consistent with source',70],
  ['B7-PUB-L70-03-S03','Preview indexing configuration is appropriate to the actual deployment environment',70]
 ];
 for(let i=0;i<articleAcceptance.length;i++){
  const [id,requirement,line]=articleAcceptance[i],entry=byId.get(id);
  const source='.ai/astro-content-publishing/SKILL.md',canonicalId='ATP-P2-'+String(74+i).padStart(4,'0');
  if(!entry||!frozenLine(source,line)||
     !entry.sourceRefs.some(ref=>ref.revision===frozen&&ref.path===source&&ref.lineStart===line))
   throw Error('Article acceptance original coordinate missing: '+id);
  if(entry.canonicalId&&entry.canonicalId!==canonicalId)throw Error('Article acceptance ID conflict: '+id);
  Object.assign(entry,{canonicalId,requirement,kind:id==='B7-PUB-L70-01'?'procedure':'acceptance',
    decision:'KEEP',reviewStatus:'APPROVED',aliases:[],
    applicability:['Student site with implemented article content'],
    conditions:[],exceptions:[],acceptanceCriteria:[],
    approvalEvidence:{frozenPath:source,frozenLine:line,frozenBlobSha:manifest[source],
      sourceText:frozenLine(source,line),method:'EXACT_FROZEN_LINE_AND_ATOMIC_WORK_ITEM'}});
 }
 for(const [id,kids] of [
  ['B5-PUB63-01',['B5-PUB63-01-S01','B5-PUB63-01-S02']],
  ['B5-PUB63-02',Array.from({length:5},(_,i)=>'B5-PUB63-02-S0'+(i+1))],
  ['B5-PUB63-03',Array.from({length:4},(_,i)=>'B5-PUB63-03-S0'+(i+1))],
  ['B7-PUB-L70-02',Array.from({length:5},(_,i)=>'B7-PUB-L70-02-S0'+(i+1))],
  ['B7-PUB-L70-03',Array.from({length:3},(_,i)=>'B7-PUB-L70-03-S0'+(i+1))]
 ]){
  const entry=byId.get(id);
  if(!entry||kids.some(child=>byId.get(child)?.reviewStatus!=='APPROVED'))
   throw Error('Article composite coverage incomplete '+id);
  Object.assign(entry,{decision:'PARTIAL_SPLIT',kind:'evidence',
   reviewStatus:'PARENT_COVERED_BY_ATOMIC_CHILDREN',childrenLegacyIds:kids,
   parentDisposition:'All source children carry approved atomic acceptance criteria'});
 }
 fs.writeFileSync(path,JSON.stringify({schemaVersion:1,frozenCommit:frozen,authority:'PROVISIONAL',upstreamDelta:{pr:61,separateVersionLayer:true},sourceManifest:{frozen:manifest,working:inventory},records:entries,semanticRelations,sourceReviewQueue:old?.sourceReviewQueue||[],importErrors:errors,recoveryFailures},null,2)+'\n');
 console.log(JSON.stringify({imported:entries.length,sourceFiles:files.length,errors:errors.length}));process.exit();
}
if(!old)throw Error('Run import first');
const failures=[],missingFrozen=[],unresolved=[],parentRisks=[],sourceLineMismatches=[],crossVersion=[],orphanAliases=[],canonicalGroups=new Map();
const sourceCoverage=new Map(), legacyIndex=new Map();
for(const row of old.records){
 if(legacyIndex.has(row.legacyId))failures.push({type:'DUPLICATE_LEGACY_ID',id:row.legacyId});
 legacyIndex.set(row.legacyId,row);
}
const sourceCache=new Map();
function readRevision(revision,file){
 const k=revision+':'+file;
 if(sourceCache.has(k))return sourceCache.get(k);
 let source=null;
 try{
  if(revision===frozen)source=execFileSync('git',['show',k],{encoding:'utf8',maxBuffer:12*1024*1024}).split(/\r?\n/);
  else if(fs.existsSync(file))source=fs.readFileSync(file,'utf8').split(/\r?\n/);
 }catch{}
 sourceCache.set(k,source);return source;
}
for(const row of old.records){
 const id=row.legacyId;
 if(!row.canonicalId&&row.reviewStatus==='PARENT_COVERED_BY_ATOMIC_CHILDREN'){
  const kids=row.childrenLegacyIds||[];
  if(!kids.length||kids.some(child=>!legacyIndex.has(child)||legacyIndex.get(child)?.reviewStatus!=='APPROVED'))failures.push({type:'INCOMPLETE_COMPOSITE_PARENT',id});
 }else if(!row.canonicalId||row.reviewStatus!=='APPROVED'||row.decision==='PENDING')unresolved.push(id);
 if(row.canonicalId){
  if(!canonicalGroups.has(row.canonicalId))canonicalGroups.set(row.canonicalId,[]);
  canonicalGroups.get(row.canonicalId).push(row);
 }
 if(row.parentLegacyId&&!legacyIndex.has(row.parentLegacyId))failures.push({type:'ORPHAN_PARENT',id,parent:row.parentLegacyId});
 if(row.parentLegacyId&&row.canonicalId&&legacyIndex.get(row.parentLegacyId)?.canonicalId===row.canonicalId)parentRisks.push(id);
 for(const alias of row.aliases||[])if(typeof alias==='string'&&!legacyIndex.has(alias))orphanAliases.push({id,alias});
 for(const e of row.evidence||[]){
  const ls=readRevision('working',e.workingPath);
  if(!ls||ls[e.workingLine-1]!==e.rawRow)failures.push({type:'WORK_PAPER_CHANGED',id,path:e.workingPath,line:e.workingLine});
 }
 let direct=false;
 for(const ref of row.sourceRefs||[]){
  const isFrozen=ref.revision===frozen;
  if(!isFrozen&&ref.sourceLayer!=='UPSTREAM_DELTA'&&ref.sourceLayer!=='LEGACY_WORK_PAPER'&&ref.revision?.length===40)crossVersion.push({id,path:ref.path,revision:ref.revision});
  if(isFrozen){
   if(!manifest[ref.path]||manifest[ref.path]!==ref.blobSha)failures.push({type:'FROZEN_BLOB_SHA_MISMATCH',id,path:ref.path});
   const ls=readRevision(frozen,ref.path);
   if(!ls||!ref.lineStart||!ref.lineEnd||ref.lineEnd>ls.length)failures.push({type:'FROZEN_LINE_INVALID',id,path:ref.path,line:ref.lineStart});
   else {
    if(ref.sourceText&&ref.sourceText!==ls[ref.lineStart-1])sourceLineMismatches.push({id,path:ref.path,line:ref.lineStart});
    direct=true;
    const k=ref.path+':'+ref.lineStart; if(!sourceCoverage.has(k))sourceCoverage.set(k,new Set());sourceCoverage.get(k).add(id);
   }
  }else if(ref.sourceLayer==='UPSTREAM_DELTA')direct=true;
  if(!ref.lineStart)failures.push({type:'UNANCHORED_REF',id,path:ref.path});
 }
 if(!direct)missingFrozen.push(id);
}
const discovered=[...records.keys()],imported=new Set(old.records.map(x=>x.legacyId)),missingLegacy=discovered.filter(x=>!imported.has(x));
const aliasPairs=[...canonicalGroups.entries()].filter(([,v])=>v.length>1).map(([canonicalId,v])=>({canonicalId,legacyIds:v.map(x=>x.legacyId)}));
// Source-first review inventory: this is the missing direction of the Gate.
// Candidate detection is deliberately conservative; it is a review queue,
// not an automated declaration that all obligations have been enumerated.
// Read every Frozen manifest file, not only the 45 operational contract files.
const scopedNormativeFiles=Object.keys(manifest).sort();
const isPriorityContract=p=>p.startsWith('.ai/')&&p.endsWith('/SKILL.md')||p.startsWith('docs/student-builder-pack/')||p.startsWith('docs/quality/')||p.startsWith('docs/workshop/')||p.startsWith('docs/qa/')||p.startsWith('docs/student-journey/ACCEPTANCE-');
function frozenDocumentRole(file){
 if(isPriorityContract(file))return ['OPERATIVE_CONTRACT_OR_QA_RECORD','Operational source; inspect each obligation and historical status'];
 if(/\/raw-research\/|\/source-snapshots\/|\/fixtures\/|^src\/content\/articles\//.test(file))
  return ['RESEARCH_OR_FIXTURE','Raw research, copied source snapshot, or demonstration content; not automatically binding policy'];
 if(/\/examples\/|\/references\/site-analysis\/|\/recipes\/|\/checklists\/|\/research-log\.md$/.test(file))
  return ['DESIGN_REFERENCE_OR_EXAMPLE','Recipe, case study or reference may contain techniques, not universal student obligations'];
 if(/(?:^docs\/art-direction\/|^docs\/layout\/PR4|PR4\d|2026-\d\d-\d\d|audit|handoff|smoke-test)/i.test(file))
  return ['HISTORICAL_PROJECT_EVIDENCE','Time-bound implementation/acceptance evidence, requires current applicability review'];
 if(/^(?:README\.md|COMPONENTS\.md|AGENTS\.md)$|^\.ai\/.*\/references\//.test(file))
  return ['ACTIVE_REFERENCE_OR_RULE_CANDIDATE','May contain active conventions; must undergo source-to-ledger review'];
 return ['UNCLASSIFIED_FROZEN_SOURCE','Review function and normative authority before applying source line obligations'];
}
const frozenFileRoleInventory=Object.entries(manifest).map(([path,blobSha])=>{
 const [role,reason]=frozenDocumentRole(path);
 return {path,blobSha,role,reason,reviewStatus:'DOCUMENTARY_SCOPE_CANDIDATE_NOT_FINAL_EXCLUSION'};
});
const roleCount=Object.fromEntries([...new Set(frozenFileRoleInventory.map(x=>x.role))].map(role=>
 [role,frozenFileRoleInventory.filter(x=>x.role===role).length]));
const cues=/(必須|不得|禁止|應該|應先|須|不能|未經|確認|檢查|驗證|需|must\b|never\b|should\b|shall\b|required\b|do not\b|don't\b|verify\b|ensure\b|check\b|only\b)/i;
const sourceLineInventory=[],sourceInventoryFailures=[];
for(const file of scopedNormativeFiles){
 const ls=readRevision(frozen,file);
 if(!ls||!manifest[file]){sourceInventoryFailures.push(file);continue;}
 for(let i=0;i<ls.length;i++){
  const exact=ls[i],trimmed=exact.trim(),key=file+':'+(i+1);
  if(!trimmed||/^#{1,6}\s/.test(trimmed)||/^\|(?:[-:\s|]+)\|$/.test(trimmed))continue;
  const candidate=cues.test(trimmed),mapped=sourceCoverage.get(key);
  sourceLineInventory.push({path:file,frozenBlobSha:manifest[file],line:i+1,sourceText:exact,
   candidateForNormativeReview:candidate,sourceRole:isPriorityContract(file)?'OPERATIONAL_CONTRACT':'OTHER_FROZEN_SOURCE_PENDING_FILE_CLASSIFICATION',legacyIds:mapped?[...mapped].sort():[],
   coverageStatus:mapped?'ANCHORED_NOT_SEMANTICALLY_VERIFIED':candidate?'REVIEW_REQUIRED_UNMAPPED':'NONCANDIDATE_UNCLASSIFIED',
   reviewStatus:'PENDING_HUMAN_CLAUSE_CLASSIFICATION'});
 }
}
// First evidence-based classification of uncovered source lines.
// Review notes describe original line scope; these are not approved Canonical clauses.
const firstReview={
 '.ai/astro-pr-preview/SKILL.md':{
  3:['NON_NORMATIVE','Skill YAML description, not an independent clause'],
  21:['NORMATIVE_PENDING_SPLIT','BASE_URL and build verification; prohibited fabricated success'],
  29:['NORMATIVE_PENDING_SPLIT','GitHub Pages source/platform check and student-specific site/base'],
  36:['NORMATIVE_PENDING_SPLIT','Cloudflare student-repo integration and preview settings'],
  51:['NORMATIVE_PENDING_SPLIT','Failure-specific repair instead of indiscriminate retries'],
  53:['NORMATIVE_PENDING_SPLIT','Preview head SHA must match deployment head'],
  55:['NORMATIVE','Disclose browser QA as pending when not executable'],
  59:['EXAMPLE_WITH_NORMATIVE_REFERENCES','Sample student prompt; requirements must be traced to other operative lines'],
  65:['NORMATIVE_PENDING_SPLIT','Historical PR Preview 404 not proof of branch outage; validate actual deployment URL']
 },
 'docs/quality/QUALITY-CONTRACT.md':{
  9:['NORMATIVE_CONDITION','NOTICE exception: example content alone does not block technical builds'],
  10:['NORMATIVE','NOT TESTED must not silently count as PASS'],
  11:['ACCEPTANCE_STATUS','BLOCKED definition; tool/environment unavailable'],
  28:['NON_NORMATIVE','Table header only; content belongs in subsequent rows']
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md':{
  3:['NORMATIVE_PENDING_SPLIT','PR59 evidence authority, no expectation as evidence'],
  5:['NORMATIVE_CONDITION','PR59 test scope and explicit authorization boundary'],
  9:['ACCEPTANCE_STATUS','NOT TESTED definition'],
  10:['ACCEPTANCE_STATUS','BLOCKED requires reason and unblock conditions'],
  29:['EVIDENCE_NOT_PASS','Historical substitute checks explicitly not EXT PASS'],
  44:['NON_NORMATIVE','Historical CI table header only'],
  47:['HISTORICAL_EVIDENCE','Historical workflow run snapshot, not current requirement'],
  49:['HISTORICAL_EVIDENCE','Historical workflow run snapshot, not current requirement'],
  50:['HISTORICAL_EVIDENCE','Historical IN PROGRESS snapshot, not current status'],
  52:['NORMATIVE','Time-bound snapshot must be rechecked from Actions']
 },
 'docs/workshop/PR56-USER-JOURNEY-QA.md':{
  15:['PROCEDURE_CONDITIONAL','Optional interview package and information return path'],
  41:['NORMATIVE','Draft and unverified test results cannot be represented as PASS']
 }
};
for(const row of sourceLineInventory){
 const classification=firstReview[row.path]?.[row.line];
 if(classification&&!row.legacyIds.length){
  row.initialReview={classification:classification[0],rationale:classification[1],
   reviewStatus:'DOCUMENTARY_CLASSIFIED_PENDING_CLAUSE_MAPPING'};
 }
}
// Deterministic priority triage is a queue, NOT an adjudication.
function sourcePriority(row){
 const t=row.sourceText;
 if(/(?:憑證|密碼|token|secret|privacy|private|授權|未經|同意|不得|禁止|安全|敏感|洩露|曝露|production|正式發布|merge|部署|noindex|indexable|DNS)/i.test(t))return 'P0_SAFETY_RELEASE';
 if(/(?:PASS|FAIL|BLOCKED|NOT TESTED|QA|驗收|預覽|preview|Build|artifact|SHA|test|verify|驗證)/i.test(t))return 'P1_EVIDENCE_QA';
 return 'P2_CONTENT_PROCEDURE';
}
for(const row of sourceLineInventory)if(!row.legacyIds.length&&row.candidateForNormativeReview)row.triagePriority=sourcePriority(row);
const candidateLines=sourceLineInventory.filter(x=>x.candidateForNormativeReview);
const unmappedCandidateLines=candidateLines.filter(x=>!x.legacyIds.length);
const mappedCandidateLines=candidateLines.filter(x=>x.legacyIds.length);
const firstReviewedUnmapped=unmappedCandidateLines.filter(x=>x.initialReview);
const remainingUnclassified=unmappedCandidateLines.filter(x=>!x.initialReview);
const triageCounts=Object.fromEntries(['P0_SAFETY_RELEASE','P1_EVIDENCE_QA','P2_CONTENT_PROCEDURE'].map(key=>[key,unmappedCandidateLines.filter(x=>x.triagePriority===key).length]));
// Register each uncovered P0/P1 source line in the sole canonical-ledger.json.
// This is a review candidate, not an approved clause or a replacement for the
// exact Frozen content. It is intentionally separate from the 1,390 Legacy IDs.
const targetedQueue=unmappedCandidateLines.filter(x=>x.sourceRole==='OPERATIONAL_CONTRACT'&&['P0_SAFETY_RELEASE','P1_EVIDENCE_QA'].includes(x.triagePriority));
const priorQueue=new Map((old.sourceReviewQueue||[]).map(x=>[x.sourceKey,x]));
const sourceReviewQueue=targetedQueue.map(x=>{
 const sourceKey=x.path+':'+x.line;
 const previous=priorQueue.get(sourceKey);
 const status=x.initialReview?.classification||'UNCLASSIFIED_CANDIDATE';
 const isHistorical=/^\|.*(?:PASS|IN PROGRESS|NOT TESTED|Actions Run)/i.test(x.sourceText);
 const isSample=/^\s*(?:「|>|description:)/.test(x.sourceText);
 return {
  sourceKey,origin:'FROZEN_SOURCE',sourcePath:x.path,sourceBlobSha:x.frozenBlobSha,
  frozenCommit:frozen,lineStart:x.line,lineEnd:x.line,sourceText:x.sourceText,
  priority:x.triagePriority,
  preliminaryKind:previous?.preliminaryKind||x.initialReview?.classification||(isHistorical?'HISTORICAL_EVIDENCE_CANDIDATE':isSample?'EXAMPLE_OR_META_CANDIDATE':'NORMATIVE_REVIEW_REQUIRED'),
  reviewerNote:previous?.reviewerNote||x.initialReview?.rationale||'Unmapped original line: check atomic subclauses, scope, exceptions and cross-source aliases.',
  matchingLegacyIds:previous?.matchingLegacyIds||[],
  proposedAction:previous?.proposedAction||'PENDING_SOURCE_TO_LEDGER_MAPPING',
  reviewStatus:previous?.reviewStatus||'PENDING_SEMANTIC_REVIEW',
  canonicalId:previous?.canonicalId||null
 };
});
// Evidence-backed first substantive pass. Every entry is tied to the exact
// Frozen source line; no classification grants merge/deploy authority.
const assessedLines={
 '.ai/astro-pr-preview/SKILL.md:21':{
  action:'SPLIT_PENDING_CANONICAL',kind:'MULTI_OBLIGATION',
  clauses:['Respect BASE_URL in routes/assets','Check configured Node/install/build','Do not claim tests were executed without evidence']
 },
 '.ai/astro-pr-preview/SKILL.md:29':{
  action:'SPLIT_PENDING_CANONICAL',kind:'PLATFORM_CONDITIONAL',
  clauses:['Read deploy Skill for initial deployment','Verify actual GitHub Pages source/repo/domain/plan','Derive site/base/ASTRO_BASE_PATH from student repo/domain']
 },
 '.ai/astro-pr-preview/SKILL.md:36':{
  action:'SPLIT_PENDING_CANONICAL',kind:'PLATFORM_CONDITIONAL',
  clauses:['Verify Cloudflare project links student owned repository','Verify production branch/build command/output directory','Verify non-production branch and PR preview configuration']
 },
 '.ai/astro-pr-preview/SKILL.md:51':{
  action:'SPLIT_PENDING_CANONICAL',kind:'FAILURE_RESPONSE',
  clauses:['Repair build failure and rerun valid checks','Diagnose deployment failure from matching platform logs','Do not blindly rerun unrelated jobs']
 },
 '.ai/astro-pr-preview/SKILL.md:53':{
  action:'KEEP_PENDING_CANONICAL',kind:'VERSION_VERIFICATION',
  clauses:['Compare PR head SHA to deployed commit before treating old Preview as current']
 },
 '.ai/astro-pr-preview/SKILL.md:55':{
  action:'KEEP_PENDING_CANONICAL',kind:'EVIDENCE_DISCLOSURE',
  clauses:['If browser verification cannot run, explicitly mark manual QA as pending']
 },
 '.ai/astro-pr-preview/SKILL.md:65':{
  action:'SPLIT_PENDING_CANONICAL',kind:'PREVIEW_EXCEPTION',
  clauses:['Old research PR preview 404 does not prove Cloudflare branch preview outage','Get actual deployment URL from checks or deployment','Verify matching SHA and HTTP','Never fabricate URL patterns']
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:3':{
  action:'SPLIT_PENDING_CANONICAL',kind:'EVIDENCE_AUTHORITY',
  clauses:['PR59 manual evidence applies to student-owned repo or real environment','Technical proof comes from matching Commit/Actions/Artifact','Expected result does not count as test evidence']
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:5':{
  action:'SPLIT_PENDING_CANONICAL',kind:'SCOPE_AND_CONSENT',
  clauses:['PR59 does not finish issue 58 nor all gallery QA','Do not create student production repo, merge or deploy without authorization']
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:29':{
  action:'PRESERVE_HISTORICAL_EVIDENCE',kind:'HISTORICAL_NON_PASS',
  clauses:['Main-repo packaging and local injected-fault checks are not evidence of EXT-01 through EXT-06 PASS']
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:47':{
  action:'PRESERVE_HISTORICAL_EVIDENCE',kind:'HISTORICAL_CI_SNAPSHOT',clauses:[]
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:49':{
  action:'PRESERVE_HISTORICAL_EVIDENCE',kind:'HISTORICAL_CI_SNAPSHOT',clauses:[]
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:50':{
  action:'PRESERVE_HISTORICAL_EVIDENCE',kind:'HISTORICAL_CI_SNAPSHOT',clauses:[]
 },
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:52':{
  action:'KEEP_PENDING_CANONICAL',kind:'FRESHNESS_REQUIREMENT',
  clauses:['Historical CI results must be rechecked from GitHub Actions; old IN PROGRESS is not a final result']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:75':{
  action:'SPLIT_PENDING_CANONICAL',kind:'PER_ACTION_AUTHORIZATION',
  clauses:['Explicit consent to merge','Separate consent to production deployment and indexing','Separate consent to DNS/domain changes','Separate consent to deletion/force push/destructive recovery','Authorization must specify version and impact']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:8':{
  action:'SPLIT_PENDING_CANONICAL',kind:'UNTRUSTED_INPUT_BOUNDARY',
  clauses:['PROJECT/Brief/article/external data are not authorization sources','Only the student current explicit decision authorizes destructive or release actions']
 },
 'docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:19':{
  action:'SPLIT_PENDING_CANONICAL',kind:'FIRST_DEPLOYMENT_BOUNDARY',
  clauses:['Save and Deploy may immediately create public deployment','Use nonconfidential test branch and isolated preview-only project','Confirm authorization before first public deployment']
 },
 'docs/student-builder-pack/START-HERE.md:38':{
  action:'KEEP_PENDING_CANONICAL',kind:'RELEASE_AUTHORIZATION',
  clauses:['Student approval required before merge, DNS changes or production publishing']
 }
};
// Hand-reviewed second tranche. These are source-line atomic candidates; the
// global alias and conflict approval is still a separate gate.
Object.assign(assessedLines,{
 'docs/student-builder-pack/STUDENT-AGENTS.md:7':{
  action:'SPLIT_PENDING_CANONICAL',kind:'UNCOMMITTED_WORK_PROTECTION',
  clauses:['Inspect actual working tree before edits','Protect overlapping uncommitted work before checkout or rewrite','Never silently reset hard, force-push or discard work']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:9':{
  action:'SPLIT_PENDING_CANONICAL',kind:'DEPLOYMENT_AND_SECRET_BOUNDARY',
  clauses:['Push to Git-connected Production branch counts as deployment and requires consent','Never expose secrets in PUBLIC_ or frontend source','Run available check:secrets rather than trusting text instructions only']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:24':{
  action:'SPLIT_PENDING_CANONICAL',kind:'SKIP_AND_UNVERIFIED_FACTS',
  clauses:['Allow skipped planning questions while continuing reversible proposals','Do not interpret skip as consent for publication','Do not fabricate qualifications, health effects, pricing, booking or client data','Keep unsafe missing facts MISSING or DO_NOT_PUBLISH']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:27':{
  action:'SPLIT_PENDING_CANONICAL',kind:'SCOPED_RISK_DISCOVERY',
  clauses:['Check risk dimensions directly relevant to the requested change','Validate data destination for forms and exposed API keys for APIs','Block only high-impact affected action while evidence missing']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:28':{
  action:'SPLIT_PENDING_CANONICAL',kind:'QUESTION_BUDGET_SAFETY_EXCEPTION',
  clauses:['Ask only when answer materially changes solution and cannot be verified elsewhere','Treat question count as usability budget, never an upper bound on authorization checks','Do not guess safety-critical facts because question budget is exhausted']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:74':{
  action:'SPLIT_PENDING_CANONICAL',kind:'REPO_AUTHORITY',
  clauses:['Commit/push/PR only in authorized student repository','Without a remote repository do not claim an actual GitHub PR or Actions run exists']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:77':{
  action:'KEEP_PENDING_CANONICAL',kind:'PRESERVE_UNCOMMITTED_WORK',
  clauses:['Before reset, checkout, force push or stash, protect existing user changes and do not silently discard work']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:99':{
  action:'SPLIT_PENDING_CANONICAL',kind:'STUDENT_SITE_QA_COMMANDS',
  clauses:['Run build, verify and responsive QA in the generated student site after layout/content/navigation changes','Run browser checks only when compatible Chromium dependencies are installed']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:100':{
  action:'SPLIT_PENDING_CANONICAL',kind:'QA_ARTIFACT_AND_LIMITATIONS',
  clauses:['Responsive QA must cover generated HTML routes with result JSON and screenshots','Report HTTP failures, overflow, broken internal images and JS errors','Warn and disclose external-image and ambiguous navigation cases rather than claiming full verification']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:101':{
  action:'SPLIT_PENDING_CANONICAL',kind:'NO_TEST_GAMING',
  clauses:['Repair observed failure with the smallest necessary change and rerun build/QA','Never remove content or weaken the test to force green checks','Do not hide broken UI or rebuild an unrelated whole page']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:103':{
  action:'KEEP_PENDING_CANONICAL',kind:'BROWSER_QA_NOT_TESTED',
  clauses:['Without actual browser execution mark NOT TESTED; static images alone cannot establish browser QA']
 },
 'docs/student-builder-pack/STUDENT-AGENTS.md:110':{
  action:'KEEP_PENDING_CANONICAL',kind:'PROJECT_FILE_UPGRADE_PROTECTION',
  clauses:['Updating student ZIP/starter must not overwrite student edited PROJECT.md; compare conflicts first']
 },
 'docs/student-builder-pack/START-HERE.md:24':{
  action:'SPLIT_PENDING_CANONICAL',kind:'STUDENT_OWNED_CONTEXT',
  clauses:['Generated independent student site must contain PROJECT.md and AGENTS.md','Commit these context files to the student owned repo','Do not overwrite existing PROJECT on ZIP upgrade']
 },
 'docs/student-builder-pack/START-HERE.md:30':{
  action:'SPLIT_PENDING_CANONICAL',kind:'OPTIONAL_HANDOFF_FILE',
  clauses:['AGENT-HANDOFF.md is only required for transfer across tools or chats, not first time build','Existing site takeover must honor local PROJECT/AGENTS and current Git working tree']
 },
 'docs/student-builder-pack/START-HERE.md:37':{
  action:'SPLIT_PENDING_CANONICAL',kind:'REAL_PREVIEW_ACCEPTANCE',
  clauses:['Verify build and actually accessible preview','Test actual desktop/mobile content, navigation, images and search','Do not assert success for untested integration']
 },
 'docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:13':{
  action:'SPLIT_PENDING_CANONICAL',kind:'GITHUB_PAGES_PREVIEW_BOUNDARY',
  clauses:['GitHub Pages PR artifact does not imply a live Preview','Production uses authorized manual workflow_dispatch, not unapproved automatic publishing']
 },
 'docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:15':{
  action:'SPLIT_PENDING_CANONICAL',kind:'ISOLATED_GITHUB_PAGES_PREVIEW',
  clauses:['Advanced GitHub Pages PR preview requires separated trusted publisher and PR-code privilege boundary','Set dedicated PR base paths and safe cleanup','Do not copy teacher repo owner URLs or claim advanced preview installed']
 },
 'docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:18':{
  action:'SPLIT_PENDING_CANONICAL',kind:'CLOUDFLARE_PREVIEW_CONFIGURATION',
  clauses:['Connect student-owned repository only with authorization','Confirm Production branch, preview branch policy, exact deployment SHA and real URL']
 },
 'docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:20':{
  action:'SPLIT_PENDING_CANONICAL',kind:'PREVIEW_BEFORE_MERGE',
  clauses:['Verify live Preview URL and reviewed PR head alignment before requesting merge approval','Merge to configured production branch only after explicit consent']
 },
 'docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:21':{
  action:'KEEP_PENDING_CANONICAL',kind:'PLATFORM_SPECIFIC_DEPLOYMENT',
  clauses:['Do not mix Cloudflare Pages, Workers assets and GitHub Pages build settings or URL shapes']
 },
 'docs/quality/QUALITY-CONTRACT.md:9':{
  action:'KEEP_PENDING_CANONICAL',kind:'NOTICE_NOT_BUILD_BLOCKER',
  clauses:['Do not block technical builds solely for placeholder content, intentionally empty articles or deliberate experimentation']
 },
 'docs/quality/QUALITY-CONTRACT.md:10':{
  action:'KEEP_PENDING_CANONICAL',kind:'NOT_TESTED_NO_PASS',
  clauses:['If there is no evidence for this commit, mark NOT TESTED and do not silently count as PASS']
 },
 'docs/quality/PROPS-URL-CONTRACT-TARGETS.md:9':{
  action:'SPLIT_PENDING_CANONICAL',kind:'URL_VALIDATION_AND_FALLBACK',
  clauses:['Allow safe internal and applicable external URL types','For optional invalid links show unavailable text or pending state','Never output a fake interaction for a required invalid link']
 },
 'docs/quality/PROPS-URL-CONTRACT-TARGETS.md:13':{
  action:'SPLIT_PENDING_CANONICAL',kind:'SECURITY_REGRESSION_EVIDENCE',
  clauses:['Validate that the URL validator rejects malicious input, not merely that a dead-link scanner fails','Record fixture, component, expected and actual diagnostics, checkout SHA and result']
 },
 'docs/quality/PROPS-URL-CONTRACT-TARGETS.md:23':{
  action:'KEEP_PENDING_CANONICAL',kind:'NO_CROSS_TEST_PASS_UPGRADE',
  clauses:['Do not substitute a different layer PASS for a check that has not run']
 }
});
const thirdPassAtomic=[
 ['.ai/astro-design-consultation/SKILL.md:39','STUDENT_FACING_LANGUAGE',['Keep ordinary design discussion in plain Chinese, not internal code/skill names','Explain Design Brief is not importable site config unless validated','Show engineering identifiers only on user request or real developer handoff']],
 ['.ai/astro-design-consultation/SKILL.md:44','CONTEXTUAL_RESPONSE',['If learner has no images or testimonials offer layouts without those elements','If learner has already selected a homepage do not restart discovery','If learner requests JSON explain handoff validation']],
 ['.ai/astro-design-consultation/SKILL.md:75','EDITORIAL_SEQUENCE',['Design follows audience/content to IA, layout, composition, optional patterns, blocks, theme, optional motion and QA']],
 ['.ai/astro-design-consultation/SKILL.md:106','USER_OWNED_DESIGN_BRIEF',['Learner should be able to justify layout preference in plain language','Human-readable Design Brief should survive handoff to development AI']],
 ['.ai/astro-editorial-layout-design/SKILL.md:37','LAYOUT_COMPOSITION_WORKFLOW',['Design workflow proceeds from requirements and direction through wireframe, implementation, visual checks, revisions and delivery']],
 ['.ai/astro-editorial-layout-design/SKILL.md:48','QA_EVIDENCE_DISCLOSURE',['Delivery evidence includes design decisions, screenshots and audit report','List all unverified items honestly']],
 ['.ai/astro-editorial-layout-design/SKILL.md:84','VISUAL_QA_REFERENCE',['Four-width visual QA reference distinguishes script, visual and manual checks']],
 ['.ai/astro-editorial-layout-design/SKILL.md:119','HISTORICAL_BROWSER_SCOPE',['Historical Chromium-only visual testing does not establish Safari/Firefox, real-device or screen-reader verification']],
 ['.ai/astro-launch-health-check/SKILL.md:15','CONTENT_LAUNCH_SAFETY',['Before launch examine demo content and fabricated testimonials or claims','Check real booking/payment/forms, empty articles and privacy links']],
 ['.ai/astro-launch-health-check/SKILL.md:16','LAUNCH_TECHNICAL_SEO',['Verify deployed HTML metadata, canonical, robots and sitemap','For applicable article sites verify RSS and Pagefind after build','Check site/base and asset URLs target actual deployment, not localhost']],
 ['.ai/astro-launch-health-check/SKILL.md:18','LAUNCH_OPERATIONS_HANDOFF',['Record actual student repo, deployment workflow and known-good SHA','Record recovery and backup limitations and external integration dependencies','Confirm domain ownership and access']],
 ['.ai/astro-launch-health-check/SKILL.md:20','EVIDENCE_STATUS_DISCLOSURE',['Each launch check must carry PASS, FAIL, BLOCKED or NOT TESTED plus direct proof or a reason']],
 ['.ai/astro-layout-craft/SKILL.md:16','LAYOUT_PROTOTYPE_BOUNDARY',['Homepage layout prototypes are not complete multi-page student sites','Before delivery self-host licensed images and implement required internal pages']],
 ['.ai/astro-motion-craft/SKILL.md:25','SOURCE_LICENSE_LIMITATION',['Motion reference library is design knowledge, not automatically imported runtime','Exact reproduction requires access to authorized source ZIP and compatibility validation']],
 ['.ai/astro-motion-craft/SKILL.md:39','MOTION_PR_APPROVAL',['Motion library changes require PR and updated registry/examples/docs','Actual build/browser QA and user approval required before merge']],
 ['.ai/astro-motion-craft/SKILL.md:148','EXTERNAL_MOTION_DEPENDENCIES',['Prefer native CSS for simple effects','Before Motion/GSAP adoption verify external code license, dependencies, maintenance and performance']],
 ['.ai/astro-motion-craft/SKILL.md:151','EXTERNAL_DEPENDENCY_CONSENT',['Present understandable options and receive consent before importing external motion code on PR','Build passing does not replace four viewport QA']],
 ['.ai/astro-motion-craft/SKILL.md:159','CLIENT_ROUTER_REINITIALIZATION',['Astro ClientRouter may require reinitializing scripts after client navigation','Verify back button, keyboard focus and reduced-motion behavior after transitions']],
 ['.ai/astro-navigation-tree-test/SKILL.md:21','ACCESSIBLE_NAV_TEST',['Verify generated desktop keyboard/mouse controls and mobile touch','Check focus, aria, Escape, reduced-motion and responsive layouts']],
 ['.ai/astro-site-maintenance/SKILL.md:21','MAINTENANCE_RELEASE_APPROVAL',['Disclose modifications, impact and test results before user approval','Verify production after authorized merge']],
 ['.ai/astro-site-maintenance/SKILL.md:32','DEPLOY_DIAGNOSIS',['Inspect actual Actions/deployment logs and exact commit before attributing failure to caching']],
 ['.ai/astro-site-maintenance/SKILL.md:34','RESTORE_AUTHORIZATION',['If restore changes DNS, live article, public URL or external services, obtain informed consent beforehand']],
 ['.ai/astro-site-maintenance/SKILL.md:35','RESTORE_REGRESSION',['After restore, rebuild and verify homepage, content, search, 404, subscriptions and CTA','Disclose restored version and remaining unknowns']],
 ['.ai/astro-site-maintenance/SKILL.md:45','RECOVERY_BOUNDARY',['Document recoverable prior version and tested PR restoration path','Do not assume Git repository backs up external services']],
 ['.ai/astro-site-maintenance/SKILL.md:49','TASK_TO_SKILL_SELECTION',['Read student-owned repository, not teacher research site','Choose correct page/layout/UI/content skills without bypassing Branch/build/preview/QA/consent']],
 ['.ai/astro-site-maintenance/SKILL.md:55','MAINTENANCE_QA_EVIDENCE',['Use actual build, functional and Chromium QA as applicable','Check widths 1440,1280,768,390 and matching deployed head','Report blocked/not-tested when evidence is missing']],
 ['.ai/url-to-frontend-replica/SKILL.md:16','REPLICA_AUTHORIZED_SCOPE',['Read AGENTS/PROJECT/skills and confirm work and deployment boundary before replication','Do not force full-site rewrite when only visual section requested']],
 ['.ai/url-to-frontend-replica/SKILL.md:28','REPLICA_VIEWPORTS',['Compare available screenshots in desktop and mobile views, including tablet when relevant','Use 1440/1280/768/390 as final proposed checks']],
 ['.ai/url-to-frontend-replica/SKILL.md:46','REPLICA_A11Y_CHECKS',['Check narrow-screen overflow, keyboard/focus/touch, semantics, contrast and reduced motion']],
 ['.ai/url-to-frontend-replica/SKILL.md:47','REPLICA_VISUAL_TRUTH',['Fix largest visual and functional differences first and record unverified portions','Build green alone does not constitute visual replica acceptance']]
];
Object.assign(assessedLines,Object.fromEntries(thirdPassAtomic.map(([key,kind,clauses])=>
 [key,{action:clauses.length>1?'SPLIT_PENDING_CANONICAL':'KEEP_PENDING_CANONICAL',kind,clauses}])));
const fourthPassAtomic=[
 ['docs/student-builder-pack/STUDENT-AGENTS.md:15','MINIMAL_CHANGE_BOUNDARY',['Describe task goal, minimal impact, preserved behavior and checkable acceptance','Ask only if unclear requirements materially affect existing confirmed design']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:22','INTERVIEW_DECISION',['Low-risk specific edits proceed without unnecessary interviewing','Clarify when unclear scope affects architecture, privacy or publication']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:26','DIAGNOSIS_NOT_ASSUMPTION',['Turn user descriptions into testable hypotheses','Do not infer root cause from symptoms without evidence']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:31','FEEDBACK_AND_PROJECT_UPDATES',['Use evidence from draft or Preview to refine requirements','Persist only durable confirmed audience/brand decisions in PROJECT.md']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:45','EMAIL_COLLECTION_REALITY',['Before collecting email confirm consent, data destination, third-party configuration and delivery tests','Do not claim subscription or submission without proof']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:46','FRONTEND_SECRET_PROHIBITION',['Do not put private API keys in publicly delivered code','Investigate existing exposure and propose secret-safe backend design']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:67','REVERSIBLE_DESIGN_DRAFT',['For moderate-impact design edits ask only material questions','Offer reversible, explicitly proposed drafts where learner does not know, without treating it as confirmed']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:73','AUTONOMOUS_ACTION_SCOPE',['Within authorized work area AI may inspect, research, plan, branch and test','Higher impact release actions require separately scoped approval']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:78','STUDENT_DEPLOY_PLATFORM',['Do not import teacher demonstration workflow or hardcoded preview URLs','Configure per actual student GitHub Pages, Cloudflare Pages or Workers evidence']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:91','VIEWPORT_QA_EVIDENCE',['Run available real build and QA','Distinguish screenshot creation from actual visual examination at four breakpoints']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:94','RELEASE_QA_TRUTH',['Do not merge, production publish or claim unexecuted QA as passed']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:108','BRIEF_NOT_IMPLEMENTATION',['Site Brief JSON is early planning data, not current code/Git implementation source','A chosen homepage layout does not mean internal pages are complete']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:109','DURABLE_PROJECT_DECISIONS',['Update PROJECT.md for durable confirmed brand/audience/layout decisions','Do not append permanent logs for trivial visual edits']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:111','NEW_AGENT_REVALIDATES',['New AI conversations must inspect current PROJECT and actual code/Git state rather than assuming prior chat memory']],
 ['docs/student-builder-pack/STUDENT-AGENTS.md:116','PR61_BRIEF_APPLICABILITY_CONFLICT',['Old ZIP text assumes Site Brief JSON always supplied','Later product decision permits A replica and C direct AI interview with no mandatory Site Brief; do not turn this into a universal requirement']],
 ['docs/student-builder-pack/START-HERE.md:16','SINGLE_START_PROMPT',['Begin learner build from official guide or packaged START-BUILD-PROMPT verbatim, not piecemeal README fragments']],
 ['docs/student-builder-pack/START-HERE.md:20','DESIGN_CONSULTATION_OPTIONAL',['Early design-only discussion requires no Site Brief JSON','Only claim AI loaded Skills when it can actually read ZIP/skill files']],
 ['docs/student-builder-pack/START-HERE.md:31','OPTIONAL_SECTION_PATTERNS',['Section patterns are optional; do not interrupt building when learner has not selected them']],
 ['docs/student-builder-pack/START-HERE.md:35','LAYOUT_READINESS_BOUNDARY',['25 layout directions are not all validated Ready exported sites','Generated site requires actual content, necessary internal pages and four-width visual acceptance']],
 ['docs/student-builder-pack/START-HERE.md:36','STUDENT_ACCOUNT_BOUNDARY',['Preview/deploy must use hosting configuration, domain and keys from learner account rather than teacher site']],
 ['docs/student-builder-pack/START-HERE.md:41','STUDENT_DELIVERY_EVIDENCE',['Handoff includes student repo, actual preview, unresolved content list, deployment verification and safe update instructions']],
 ['docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:8','STUDENT_PREVIEW_VALIDITY',['Create preview only from configured and actually reachable isolated environment','Student checks real homepage/subpages/mobile/functions and AI verifies exact SHA']],
 ['docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:9','DEPLOY_PATH_CONSENT',['Require student merge approval','For GitHub Pages deploy production manually with authorization','For Cloudflare check actual production branch auto-deploy policy']],
 ['docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:14','ISOLATED_PREVIEW_OPTION',['Cloudflare isolated preview-only project is optional route, not mandatory platform','Separate Cloudflare and GitHub authorization and resources']],
 ['docs/student-builder-pack/PREVIEW-BOOTSTRAP.md:26','PREVIEW_HANDOFF_FIELDS',['Provide actual hosting provider, valid preview URL, corresponding SHA and checked device/page evidence']]
];
Object.assign(assessedLines,Object.fromEntries(fourthPassAtomic.map(([key,kind,clauses])=>
 [key,{action:clauses.length>1?'SPLIT_PENDING_CANONICAL':'KEEP_PENDING_CANONICAL',kind,clauses}])));
const fifthPassAtomic=[
 ['.ai/astro-starter-onboarding/SKILL.md:18','STARTER_PLANNER_ONLY',['For Starter Planner JSON verify chosen section pattern ID, destination and placement','AI adapts sections to factual content and preserves layout distinctness']],
 ['.ai/astro-ui-craft/SKILL.md:78','DESIGN_TOKEN_MAINTENANCE',['Existing hard-coded design legacy values do not authorize inventing more','Any global token cleanup belongs in separately scoped work']],
 ['.ai/astro-ui-craft/SKILL.md:221','UI_SKILL_SCOPE',['UI skill follows already confirmed page structure and content; focus on components, tokens, interactions and cross-page consistency']],
 ['docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:9','NOT_TESTED_STATUS',['Do not assert PASS when target environment has not been tested']],
 ['docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:10','BLOCKED_STATUS',['BLOCKED must record authorization, environment or missing-data reason plus what would unblock it']],
 ['docs/quality/BETA-CANDIDATE-SCOPE.md:9','TEACHER_VISUAL_APPROVAL',['Teacher must review candidate before Merge','Passing build/CI is not equivalent to manual visual approval']],
 ['docs/quality/BETA-CANDIDATE-SCOPE.md:21','FIXED_CANDIDATE_POLICY',['Do not automatically merge or modify Production','Fixed candidate ZIP and Preview must reference exact source SHA']],
 ['docs/quality/DEFECT-REGISTER.md:31','BLOCK_REGISTRY_EVIDENCE_LIMIT',['Registry structure check does not prove each block behavior and rendering in both site types']],
 ['docs/quality/DEFECT-REGISTER.md:33','REPRESENTATIVE_EFFECT_TESTS',['Editorial Recipes/Effects require keyboard, reduced-motion and visible-content tests','Representative checks cannot prove every possible combination']],
 ['docs/quality/DEFECT-REGISTER.md:35','PRODUCTION_VERIFY_WITH_AUTHORIZATION',['Actual production access is separate from simulated PR checks','Only test or change it with explicit authorization']],
 ['docs/quality/DEFECT-REGISTER.md:36','BETA_EVIDENCE_TRIANGULATION',['Final candidate checks should align teacher CI, extracted student ZIP CI, browser QA and deployed SHA','Anything not executed remains NOT TESTED']],
 ['docs/quality/QUALITY-CONTRACT.md:11','BLOCKED_DEFINITION',['Mark BLOCKED when tool access, unsupported platform, deployment or environment prevents verification']],
 ['docs/student-builder-pack/ART-DIRECTION-STARTER.md:15','EXPORTER_EXISTING_SITE_SAFETY',['Export destination must be empty; never overwrite modified student site','--require-ready rejects unverified layout adapters']],
 ['docs/student-builder-pack/ART-DIRECTION-STARTER.md:19','CONTENT_FALLBACK_BOUNDARY',['Text-first service template does not accept image or Logo input in this mode','Never publish test wording or pending data as factual service claims']],
 ['docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md:3','CROSS_MODEL_FIXTURE_ISOLATION',['Each AI tested in separate fresh conversation using equivalent isolated fixture','Evaluation pack is test specification, not actual run evidence','Prevent exposing teacher answer keys']],
 ['docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md:7','CROSS_MODEL_RUN_PROVENANCE',['Record actual tool/model/version, policy and fixture SHAs, timestamp and permissions per run','Do not assume skills were loaded without evidence']],
 ['docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md:9','AI_INSTRUCTION_ADHERENCE_TEST',['Check that model actually read AGENTS contract with safe low-risk test constraint','File existence alone does not prove agent compliance']],
 ['docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md:28','CROSS_MODEL_SCORING_EVIDENCE',['Record actual git diff, project flags, secret leaks, unauthorized pushes, CI/build and preview SHA']],
 ['docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md:56','LAYOUT_ADAPTER_CONDITIONAL_TEST',['Only after #46 adapter integration execute every supported layout','Check site.config layoutSlug agrees with PROJECT actual selected slug','Do not claim In Progress prototypes are Ready']],
 ['docs/student-builder-pack/DESIGN-CONSULTATION-PROMPT.txt:5','DESIGN_ONLY_PATH_SCOPE',['Do not make PR or deploy when user only asked for design discussion','Only export Site Brief when user explicitly selected Starter Planner path']],
 ['docs/student-builder-pack/INTERVIEW-EVALUATION.md:9','INTERVIEW_EVAL_RUN_PROVENANCE',['Record evaluator, time, tool/model/version and policy SHA per evaluation','Do not claim file access or actual operation without proof']],
 ['docs/student-builder-pack/INTERVIEW-EVALUATION.md:16','INTERVIEW_EVAL_TRUTH_SCALE',['Evaluate whether AI invents completion and whether it separates confirmed, proposed and unverified']],
 ['docs/student-builder-pack/INTERVIEW-EVALUATION.md:19','PROPOSED_EVALUATION_THRESHOLD',['Proposed test threshold is average at least 8, each answer at least 6 and no major security failure','Do not claim criterion passed without actually running the model tests']],
 ['docs/student-builder-pack/INTERVIEW-EVALUATION.md:22','TEST_HARNESS_VERSUS_MODEL',['node --test checks evaluation script/schema, not real model interview quality']],
 ['docs/student-builder-pack/INTERVIEW-EVALUATION.md:25','INDEPENDENT_MODEL_RUN_PERMISSION',['External Claude/Codex real-tool tests require separate access/authorization; mark NOT TESTED if unrun']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:3','HISTORICAL_DEPENDENCY_SCOPE',['Historical PR50 acceptance was blocked until art-direction adapter path from PR46 integrated; do not treat as current merge permission']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:6','LIVE_PR_STATE_CHECK',['Check actual current GitHub PR state and branch before any integration','Do not promote historical Draft/blocked status to live current fact']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:8','SHARED_STUDENT_FINALIZER',['Both student export routes need equivalent project/agent/secrets/CI context','Prefer one idempotent finalizer and preserve existing user files']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:9','EXPORTED_LAYOUT_EVIDENCE',['Actually exercise supported layout adapters in distributable ZIP and both site types','Verify no builder-only answer keys leak; ensure secrets and Git safety checks runnable','Distinguish Ready from unsupported prototype']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:17','READY_STATUS_EVIDENCE',['Never count an unsupported layout as tested or Ready without actual evidence']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:18','ANSWER_KEY_SECRECY',['Never package private interview evaluation answer keys into student ZIP']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:26','HISTORICAL_BUG_EVIDENCE',['Frozen exporter sequence describes mismatched PROJECT layout before adapter compose','Treat as historical defect, verify current code before claiming still unresolved']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:28','ADAPTER_FINALIZER_ORDER',['When adapter path supported, finalize PROJECT and context after actual layout compose','Do not overwrite existing student PROJECT','Compare SITE CONFIG and PROJECT layout slug against actual selected layout']],
 ['docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md:31','PREVIEW_INDEXING_FAILSAFE',['Deny indexing on Cloudflare branch previews even if SITE_INDEXABLE=true','Verify HTML meta robots and robots.txt with unknown production branch too']],
 ['docs/student-builder-pack/START-HERE.md:47','PROMPT_CAPABILITY_DISCLOSURE',['Before building disclose ability or permissions to read ZIP, edit files, run build, push branch PR and verify real Preview','Do not claim unavailable capabilities or publish without approval']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:19','STUDENT_PREVIEW_JOURNEY',['Preview phase requires real version-matching URL, desktop/mobile functional checks and human feedback']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:21','STUDENT_MAINTENANCE_JOURNEY',['Long-term updates use student-owned repo and current project context','Preview, confirm, publish and keep recovery record']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:31','STUDENT_REALITY_AND_PREVIEW_EXPOSURE',['Protect tokens and private client data from public site/preview','Do not fabricate qualifications, testimonials, medical effects, payment or booking success']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:36','PREVIEW_DEFINITION',['Preview is a verified working URL matching the reviewed version and content']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:37','PRODUCTION_DEFINITION',['Production changes require explicit current authorization','Build or PR success alone is not proof Production updated']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:41','AI_CAPABILITY_LIMITATION',['Chat-only AI does not necessarily have filesystem, coding or deployment tools','Learner-hosted GitHub/Cloudflare access requires learner setup or authorization']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:46','FACT_PROPOSAL_SEPARATION',['Keep confirmed decisions, AI proposals, pending fields and actual tool results separate']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:50','REAL_VISUAL_QA_BOUNDARY',['Build success is not visual acceptance','Verify actual four widths and keyboard/touch/content/navigation behavior']],
 ['docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md:57','PROGRESSIVE_STUDENT_PATH',['Learner may begin with informal design discussion and move to preview draft','Explicit release approval remains separate from request to see draft']]
];
Object.assign(assessedLines,Object.fromEntries(fifthPassAtomic.map(([key,kind,clauses])=>
 [key,{action:clauses.length>1?'SPLIT_PENDING_CANONICAL':'KEEP_PENDING_CANONICAL',kind,clauses}])));
for(const entry of sourceReviewQueue){
 const assessment=assessedLines[entry.sourceKey];
 if(!assessment)continue;
 entry.preliminaryKind=assessment.kind;
 entry.proposedAction=assessment.action;
 entry.atomicClauseCandidates=assessment.clauses;
 entry.reviewerNote='Direct reading of the exact Frozen line; conditions and exceptions preserved. '+
  (entry.initialReview?.rationale||'No canonical or cross-source dedupe decision yet.');
 entry.reviewStatus='DOCUMENTARY_ATOMIC_REVIEW_PENDING_CROSS_SOURCE_ADJUDICATION';
}
// Complete the documented P0/P1 source-line disposition pass.
// Each disposition is a *source inventory* decision, not proof of an approved
// canonical requirement. Keep an explicit cross-source verification blocker.
function evidenceDisposition(entry){
 const line=entry.sourceText.trim(),path=entry.sourcePath;
 if(/^description:|^<!-- builder-only:|^npm run verify$/.test(line)||
    /^共用可攜判斷依據：/.test(line))return ['NON_NORMATIVE_METADATA','Skill description, marker, example command or documentation pointer','RETAIN_AS_EVIDENCE'];
 if(/^「|^> 請|^> 幫我|^> 「|^\| UX-|^\| 「|^學員可以不用設計術語回答/.test(line))
   return ['EXAMPLE_NOT_INDEPENDENT_OBLIGATION','Example, suggested language or scenario; do not create new norm from example','RETAIN_AS_EXAMPLE'];
 if(/(?:Actions Run \d+|historic failing workflow|IN PROGRESS（最後查詢時）|is historical|目前為|已完成的替代性自動檢查)/i.test(line))
   return ['HISTORICAL_EVIDENCE','Time-specific evidence is not a present PASS and must remain source traceable','RETAIN_HISTORICAL_NOT_PASS'];
 if(path.includes('DEFECT-REGISTER')&&/^\|/.test(line))
   return ['HISTORICAL_STATUS_OR_ACCEPTANCE','Historical defect state: distinguish historical result from forward requirement','REVIEW_APPLICABILITY'];
 if(/^[-\d]+\.|^[\-*] |^\|/.test(line)||/^\d+\./.test(line)){
   if(/(?:未經|同意|不得|禁止|private|secret|token|授權|merge|production|公開|DNS|刪除)/i.test(line))
     return ['SOURCE_POLICY_OR_CONDITION','Safety/release wording: preserve separate actor, operation, precondition and exception','MAP_ATOMIC_POLICY_PENDING'];
   if(/(?:驗證|檢查|測試|QA|PASS|FAIL|NOT TESTED|verify|test|build|preview|SHA|截圖|瀏覽器)/i.test(line))
     return ['ACCEPTANCE_OR_EVIDENCE_REQUIREMENT','Evidence criteria: retain target platform, exact SHA and NOT TESTED boundary','MAP_ACCEPTANCE_PENDING'];
   return ['PROCEDURE_OR_ARCHITECTURE','Operational procedure or architectural contract: preserve source-specific scope','MAP_PROCEDURE_PENDING'];
 }
 if(/^(?:但|若|如果|只有|不能|需要|不應|不必|請)/.test(line))
   return ['CONDITIONAL_SOURCE_CLAUSE','Conditional clause: applicability and exceptions cannot be lost','MAP_CONDITIONAL_PENDING'];
 return ['SOURCE_CONTENT_REQUIREMENT','Potential norm or context: preserve complete original; no inferred alias or parent replacement','MAP_ATOMIC_PENDING'];
}
for(const entry of sourceReviewQueue){
 if(entry.reviewStatus==='DOCUMENTARY_ATOMIC_REVIEW_PENDING_CROSS_SOURCE_ADJUDICATION'||entry.reviewStatus==='DOCUMENTARY_FINAL_NON_NORMATIVE'||entry.reviewStatus==='APPROVED'||entry.canonicalId)continue;
 const [kind,reason,action]=evidenceDisposition(entry);
 entry.preliminaryKind=kind;
 entry.proposedAction=action;
 entry.reviewerNote=reason;
 entry.reviewStatus='SOURCE_DISPOSITION_COMPLETE_SEMANTIC_ALIAS_PENDING';
 entry.atomicClauseCandidates=[];
 entry.adjudicationNeeded=['scope','normative-versus-context','atomicity','source-to-legacy-map','cross-source-alias','approval'];
}
const firstPassDisposed=sourceReviewQueue.filter(x=>x.reviewStatus==='SOURCE_DISPOSITION_COMPLETE_SEMANTIC_ALIAS_PENDING');
// Explicit documentary decisions for low-ambiguity source lines.
// These decisions eliminate only non-normative/historical rows, never a live obligation.
const terminalSourceDecisions={
 '.ai/astro-pr-preview/SKILL.md:3':['NON_NORMATIVE','YAML description: scope metadata, not a separate instruction'],
 '.ai/astro-pr-preview/SKILL.md:59':['NON_NORMATIVE','Quoted sample prompt, obligations must map through operational source lines'],
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:47':['NON_NORMATIVE','Historic Action result, cannot be treated as a live acceptance requirement'],
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:49':['NON_NORMATIVE','Historic Action result, cannot be treated as a live acceptance requirement'],
 'docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md:50':['NON_NORMATIVE','Historic IN PROGRESS value, not current evidence'],
 'docs/quality/QUALITY-CONTRACT.md:28':['NON_NORMATIVE','Table header only, preserve its table rows'],
 'docs/student-builder-pack/ART-DIRECTION-STARTER.md:12':['NON_NORMATIVE','Isolated shell invocation illustrative of an existing verification command'],
 'docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md:15':['NON_NORMATIVE','An evaluation scenario row, not a universally applicable website policy']
};
// Exact-document references, example user scripts and frozen status snapshots
// do not constitute fresh enforceable requirements by themselves.
Object.assign(terminalSourceDecisions,{
 '.ai/astro-design-consultation/SKILL.md:111':['NON_NORMATIVE','Link to shared Design Handoff and teacher research files, not an independent obligation'],
 '.ai/astro-editorial-layout-design/SKILL.md:124':['NON_NORMATIVE','Documentation pointer to shared handoff and research, not an atomic requirement'],
 '.ai/astro-layout-craft/SKILL.md:88':['NON_NORMATIVE','Reference-only path to shared and teacher research material'],
 '.ai/astro-motion-craft/SKILL.md:164':['NON_NORMATIVE','Reference-only shared material pointer'],
 '.ai/astro-section-pattern-craft/SKILL.md:48':['NON_NORMATIVE','Shared handoff and teacher research reference'],
 '.ai/astro-ui-craft/SKILL.md:219':['NON_NORMATIVE','Reference to handoff and optional teacher research'],
 '.ai/astro-page-management/SKILL.md:54':['NON_NORMATIVE','Quoted example student prompt, not an additional independent approval rule'],
 '.ai/astro-section-pattern-craft/SKILL.md:39':['NON_NORMATIVE','Quoted example student prompt; actual QA and approval obligations reside in operative instructions'],
 '.ai/astro-site-maintenance/SKILL.md:39':['NON_NORMATIVE','Illustrative maintenance example, not independent normative instruction'],
 'docs/quality/BETA-CANDIDATE-SCOPE.md:12':['NON_NORMATIVE','Historical experimental workflow/fixture defect snapshot, not current component failure'],
 'docs/quality/BETA-CANDIDATE-SCOPE.md:14':['NON_NORMATIVE','Time-bound report of not-yet-run learner usability checks; recheck state rather than canonize result'],
 'docs/quality/DEFECT-REGISTER.md:9':['NON_NORMATIVE','Historical defect register status row with linked acceptance targets'],
 'docs/quality/DEFECT-REGISTER.md:13':['NON_NORMATIVE','Historical W6 issue disposition; warning policy needs distinct Frozen operative source'],
 'docs/quality/DEFECT-REGISTER.md:24':['NON_NORMATIVE','Historical N19 implementation state, not proof of present runtime acceptance']
});
for(const entry of sourceReviewQueue){
 const d=terminalSourceDecisions[entry.sourceKey];
 if(!d)continue;
 if(entry.canonicalId||entry.reviewStatus==='APPROVED')continue;
 entry.preliminaryKind='NON_NORMATIVE';
 entry.proposedAction='NON_NORMATIVE';
 entry.decision='NON_NORMATIVE';
 entry.reviewStatus='DOCUMENTARY_FINAL_NON_NORMATIVE';
 entry.reviewerNote=d[1];
 entry.dispositionEvidence={frozenSource:entry.sourceKey,frozenBlobSha:entry.sourceBlobSha,sourceText:entry.sourceText,reason:d[1]};
 entry.atomicClauseCandidates=[];
}
// Cross-reference suggestions are evidence discovery, not MERGE decisions.
// Rank candidates only when they point to the same Frozen file near a clause.
const sameFileLegacy=new Map();
for(const item of old.records){
 for(const ref of item.sourceRefs||[]){
  if(ref.revision!==frozen||!ref.lineStart)continue;
  if(!sameFileLegacy.has(ref.path))sameFileLegacy.set(ref.path,[]);
  sameFileLegacy.get(ref.path).push({id:item.legacyId,line:ref.lineStart,source:ref.sourceText||''});
 }
}
for(const entry of sourceReviewQueue){
 if(entry.reviewStatus==='DOCUMENTARY_FINAL_NON_NORMATIVE')continue;
 const candidates=(sameFileLegacy.get(entry.sourcePath)||[])
  .map(x=>({...x,distance:Math.abs(x.line-entry.lineStart)}))
  .filter(x=>x.distance<=3)
  .sort((a,b)=>a.distance-b.distance||a.id.localeCompare(b.id));
 const dedup=new Set();
 entry.nearbyLegacyEvidence=candidates.filter(x=>{if(dedup.has(x.id))return false;dedup.add(x.id);return true;})
  .slice(0,8).map(x=>({legacyId:x.id,frozenPath:entry.sourcePath,frozenLine:x.line,lineDistance:x.distance,
   interpretation:'PROXIMITY_ONLY_NOT_SEMANTIC_EQUIVALENCE'}));
}
// Source-first candidate-to-legacy comparison with reproducible documentary
// evidence. Line proximity alone is never an alias and never closes a clause.
const legacyByExactAnchor=new Map();
for(const legacy of old.records){
 for(const ref of legacy.sourceRefs||[]){
  if(ref.revision!==frozen||!ref.lineStart)continue;
  const key=ref.path+':'+ref.lineStart;
  if(!legacyByExactAnchor.has(key))legacyByExactAnchor.set(key,[]);
  legacyByExactAnchor.get(key).push(legacy);
 }
}
const frozenCandidateLinks=[];
for(const line of sourceLineInventory){
 if(!line.candidateForNormativeReview)continue;
 const key=line.path+':'+line.line;
 const linked=legacyByExactAnchor.get(key)||[];
 const nearest=linked.map(x=>({legacyId:x.legacyId,canonicalId:x.canonicalId,
  reviewStatus:x.reviewStatus,requirement:x.requirement,
  relationship:'EXACT_SOURCE_LINE_NOT_PROOF_OF_SEMANTIC_COVERAGE'}));
 frozenCandidateLinks.push({sourceKey:key,sourceText:line.sourceText,frozenBlobSha:line.frozenBlobSha,
  sourceRole:line.sourceRole,legacyMatches:nearest,
  sourceCoverageState:nearest.some(x=>x.canonicalId&&x.reviewStatus==='APPROVED')?
   'CANONICAL_REFERENCES_EXIST_CLAUSE_COMPLETENESS_PENDING':
   nearest.length?'LEGACY_REFERENCES_EXIST_CLAUSE_COMPLETENESS_PENDING':
   'UNREFERENCED_SOURCE_LINE_REQUIRES_REVIEW'});
}
const candidateLinksExact= frozenCandidateLinks.filter(x=>x.legacyMatches.length).length;
const candidateLinksWithApprovedCanonical=frozenCandidateLinks.filter(x=>x.legacyMatches.some(y=>y.canonicalId&&y.reviewStatus==='APPROVED')).length;
const queueWithNearbyEvidence=sourceReviewQueue.filter(x=>x.nearbyLegacyEvidence?.length).length;
const closedNonNormative=sourceReviewQueue.filter(x=>x.reviewStatus==='DOCUMENTARY_FINAL_NON_NORMATIVE');
const assessedQueue=sourceReviewQueue.filter(x=>x.reviewStatus==='DOCUMENTARY_ATOMIC_REVIEW_PENDING_CROSS_SOURCE_ADJUDICATION');
const droppedPrevious=[...priorQueue.keys()].filter(k=>!sourceReviewQueue.some(x=>x.sourceKey===k));
const unresolvedP0P1=sourceReviewQueue.filter(x=>x.proposedAction==='PENDING_SOURCE_TO_LEDGER_MAPPING').length;
const outstandingLineKeys=new Set(sourceReviewQueue.filter(x=>x.reviewStatus!=='APPROVED').map(x=>x.sourceKey));
const sourceFirstNotYetDisposed=unmappedCandidateLines.filter(x=>!x.initialReview&&!outstandingLineKeys.has(x.path+':'+x.line));
// Zero-loss integrity checks must not be confused with semantic PASS.
const canonicalConsistencyErrors=[];
for(const [cid,rows] of canonicalGroups){
 const claimed=new Set(rows.map(x=>x.legacyId));
 const distinctStatements=new Set(rows.map(x=>JSON.stringify({
  requirement:x.requirement,kind:x.kind,applicability:x.applicability||[],
  conditions:x.conditions||[],exceptions:x.exceptions||[],acceptanceCriteria:x.acceptanceCriteria||[]
 })));
 if(distinctStatements.size>1)canonicalConsistencyErrors.push({canonicalId:cid,reason:'DIVERGENT_CANONICAL_DEFINITIONS'});
 for(const row of rows){
  if(row.decision==='MERGE' && !rows.every(other=>other===row||(row.aliases||[]).includes(other.legacyId)))
   canonicalConsistencyErrors.push({canonicalId:cid,legacyId:row.legacyId,reason:'MISSING_RECIPROCAL_ALIAS'});
  for(const alias of row.aliases||[]){
   if(!claimed.has(alias))canonicalConsistencyErrors.push({canonicalId:cid,legacyId:row.legacyId,alias,reason:'CROSS_GROUP_ALIAS'});
  }
 }
}
const frozenManifestErrors=[];
for(const [file,expectedSha] of Object.entries(manifest)){
 try{
  const actual=execFileSync('git',['rev-parse',frozen+':'+file],{encoding:'utf8'}).trim();
  if(actual!==expectedSha)frozenManifestErrors.push({path:file,expectedSha,actual});
 }catch(e){frozenManifestErrors.push({path:file,expectedSha,error:'FROZEN_FILE_NOT_READABLE'});}
}
const p0Leaves=old.records.filter(x=>/^P0-U\d{3}$/.test(x.legacyId));
const p0Approved=p0Leaves.filter(x=>x.canonicalId&&x.reviewStatus==='APPROVED');
const p0EvidenceDimensions=p0Leaves.filter(x=>x.reviewStatus==='EVIDENCE_DIMENSION_MAPPED_PARENT_ADJUDICATION_PENDING');
const p0Unhandled=p0Leaves.filter(x=>!p0Approved.includes(x)&&!p0EvidenceDimensions.includes(x));
const p0UniqueCanonical=new Set(p0Approved.map(x=>x.canonicalId)).size;
const p0DimensionGroups=new Set(p0EvidenceDimensions.map(x=>x.acceptanceDimensionGroup)).size;
const p0InvariantFailures=[];
if(p0Leaves.length!==86)p0InvariantFailures.push({type:'P0_LEAF_COUNT_CHANGED',actual:p0Leaves.length});
if(p0Approved.length+p0EvidenceDimensions.length+p0Unhandled.length!==p0Leaves.length)p0InvariantFailures.push({type:'P0_LEAF_DISPOSITION_SUM_ERROR'});
for(const x of p0EvidenceDimensions)if(!x.atomicEvidenceText||!x.parentCanonicalCandidate||!x.sourceRefs.some(z=>z.revision===frozen))
 p0InvariantFailures.push({type:'P0_EVIDENCE_FIELD_MISSING_SOURCE_OR_PARENT',id:x.legacyId});
// Group inherited IDs by exact original Frozen coordinate for the next
// semantic de-duplication pass. Shared line is review priority, NOT equality.
const anchorGroups=new Map();
for(const item of old.records){
 for(const ref of item.sourceRefs||[]){
  if(ref.revision!==frozen||!ref.lineStart)continue;
  const key=ref.path+':'+ref.lineStart;
  if(!anchorGroups.has(key))anchorGroups.set(key,new Map());
  anchorGroups.get(key).set(item.legacyId,{id:item.legacyId,canonicalId:item.canonicalId,
   kind:item.kind,decision:item.decision,requirement:item.requirement});
 }
}
const multipleAnchorGroups=[...anchorGroups.entries()].filter(([,v])=>v.size>=2)
 .map(([sourceKey,v])=>({sourceKey,rows:[...v.values()]}))
 .sort((a,b)=>b.rows.length-a.rows.length||a.sourceKey.localeCompare(b.sourceKey));
const pendingMultipleAnchorGroups=multipleAnchorGroups.filter(x=>x.rows.some(y=>!y.canonicalId));
const status={
 frozenManifestFiles:Object.keys(manifest).length,workingFiles:files.length,
 frozenManifestIntegrityErrors:frozenManifestErrors.length,
 canonicalConsistencyErrors:canonicalConsistencyErrors.length,
 discoveredLegacyIds:discovered.length,importedLegacyIds:old.records.length,
 missingLegacyIds:missingLegacy.length,brokenReferences:failures.length,
 frozenTextMismatches:sourceLineMismatches.length,
 noFrozenOrUpstreamAnchor:missingFrozen.length,
 unmatchedAliases:orphanAliases.length,
 parentDoubleCountRisks:parentRisks.length,
 crossVersionReferences:crossVersion.length,
 pendingSemanticDecisions:unresolved.length,
 approvedCanonicalIds:canonicalGroups.size,
 p0Leaves:p0Leaves.length,
 p0ApprovedLegacyRows:p0Approved.length,
 p0UniqueCanonicalIds:p0UniqueCanonical,
 p0MappedAcceptanceDimensions:p0EvidenceDimensions.length,
 p0AcceptanceDimensionGroups:p0DimensionGroups,
 p0UnhandledLeaves:p0Unhandled.length,
 p0InvariantFailures:p0InvariantFailures.length,
 aliasGroups:aliasPairs.length,
 documentaryRelationGroups:(old.semanticRelations||[]).length,
 documentaryMerges:(old.semanticRelations||[]).filter(x=>x.decision==='MERGE').length,
 documentaryPartialSplits:(old.semanticRelations||[]).filter(x=>x.decision==='PARTIAL_SPLIT').length,
 documentaryDistinct:(old.semanticRelations||[]).filter(x=>x.decision==='DISTINCT').length,
 frozenLinesReferenced:sourceCoverage.size,
 sourceAnchorMultiIdGroups:multipleAnchorGroups.length,
 sourceAnchorUnresolvedGroups:pendingMultipleAnchorGroups.length,
 sourceFirstScopeFiles:scopedNormativeFiles.length,
 frozenFileRoleCounts:JSON.stringify(roleCount),
 sourceFirstScopeCoverageOfFrozenFiles:scopedNormativeFiles.length+'/'+Object.keys(manifest).length,
 sourceFirstLinesScanned:sourceLineInventory.length,
 sourceFirstUnscannedFrozenFiles:Object.keys(manifest).filter(p=>!scopedNormativeFiles.includes(p)).length,
 sourceFirstCandidateLines:candidateLines.length,
 sourceFirstExactLegacyLinkLines:candidateLinksExact,
 sourceFirstApprovedCanonicalLinkLines:candidateLinksWithApprovedCanonical,
 sourceFirstUnmappedCandidateLines:unmappedCandidateLines.length,
 sourceFirstMappedCandidateLines:mappedCandidateLines.length,
 sourceFirstReadFailures:sourceInventoryFailures.length,
 sourceFirstOperationalContractFiles:scopedNormativeFiles.filter(isPriorityContract).length,
 sourceFirstOtherFrozenFiles:scopedNormativeFiles.filter(p=>!isPriorityContract(p)).length,
 sourceFirstClassifiedUnmapped:firstReviewedUnmapped.length,
 sourceFirstUnclassifiedUnmapped:remainingUnclassified.length,
 sourceFirstNotYetDisposed:sourceFirstNotYetDisposed.length,
 sourceFirstUnmappedP0:triageCounts.P0_SAFETY_RELEASE,
 sourceFirstUnmappedP1:triageCounts.P1_EVIDENCE_QA,
 sourceFirstUnmappedP2:triageCounts.P2_CONTENT_PROCEDURE,
 p0p1QueueItems:sourceReviewQueue.length,
 p0p1PendingSourceMapping:unresolvedP0P1,
 p0p1PendingCanonicalAdjudication:sourceReviewQueue.filter(x=>x.reviewStatus!=='APPROVED'&&x.reviewStatus!=='DOCUMENTARY_FINAL_NON_NORMATIVE').length,
 p0p1ClosedNonNormative:closedNonNormative.length,
 p0p1DocumentaryAssessed:assessedQueue.length,
 p0p1FirstPassDisposed:firstPassDisposed.length,
 p0p1SourceDispositionTotal:sourceReviewQueue.filter(x=>['DOCUMENTARY_ATOMIC_REVIEW_PENDING_CROSS_SOURCE_ADJUDICATION','SOURCE_DISPOSITION_COMPLETE_SEMANTIC_ALIAS_PENDING','DOCUMENTARY_FINAL_NON_NORMATIVE','APPROVED'].includes(x.reviewStatus)).length,
 p0p1NearbyLegacyEvidence:queueWithNearbyEvidence,
 p0p1AtomicSubclausesProposed:assessedQueue.reduce((n,x)=>n+(x.atomicClauseCandidates?.length||0),0),
 p0p1RemovedQueueKeys:droppedPrevious.length,
 unexaminedFrozenNormativeClauses:'NOT_ESTABLISHED',
 semanticCompleteness:'NOT_VERIFIED',
 oldFileRetirement:'NOT_AUTHORIZED',
 stage2:'BLOCKED',stage3:'BLOCKED',stage4:'BLOCKED'
};
const documentaryRelations=old.semanticRelations||[];
const relationOrphans=documentaryRelations.filter(rel=>rel.legacyIds.some(id=>!legacyIndex.has(id)));
const unverifiedMerges=documentaryRelations.filter(rel=>rel.decision==='MERGE'&&rel.sharedExactFrozenAnchors.length===0);
const integrityFailures=[...p0InvariantFailures,...frozenManifestErrors,...canonicalConsistencyErrors,...failures,...sourceLineMismatches,...relationOrphans,...unverifiedMerges];
const failReasons=[];
if(status.frozenManifestFiles!==192)failReasons.push('Frozen manifest is not 192 files');
if(frozenManifestErrors.length)failReasons.push('Frozen manifest blob SHA mismatch or unreadable source');
if(canonicalConsistencyErrors.length)failReasons.push('Canonical groups have inconsistent definitions or aliases');
if(p0InvariantFailures.length)failReasons.push('P0 leaf counts or evidence parent mapping inconsistent');
if(missingLegacy.length)failReasons.push('Unimported legacy IDs');
if(failures.length)failReasons.push('Broken links or source integrity failures');
if(missingFrozen.length)failReasons.push('Missing direct frozen or upstream anchors');
if(sourceLineMismatches.length)failReasons.push('Frozen text mismatches');
if(parentRisks.length)failReasons.push('Parent/child canonical double-count risk');
if(crossVersion.length)failReasons.push('Unreviewed non-frozen references');
if(orphanAliases.length)failReasons.push('Alias orphans');
if(unresolved.length)failReasons.push('Semantic adjudication incomplete');
if(unresolvedP0P1)failReasons.push('P0/P1 source-to-ledger semantic mapping incomplete');
if(unmappedCandidateLines.length)failReasons.push('Source-first potentially normative lines not semantically mapped (including dispositioned pending records)');
if(sourceInventoryFailures.length)failReasons.push('Source-first scope files could not be read');
if(relationOrphans.length)failReasons.push('Semantic relation orphan IDs');
if(unverifiedMerges.length)failReasons.push('Documentary MERGE candidates lack a shared exact Frozen line');
failReasons.push('No exhaustive clause denominator / source-to-ledger semantic coverage verified');
const report=[
 '# PR #67 | Phase 2 Gate Report','',
 '> Generated, non-normative report. Frozen baseline and canonical ledger remain the only source evidence/decision authority. Mechanical traceability is not semantic coverage.','',
 '| Metric | Result |','|---|---:|',
 ...Object.entries(status).map(([k,v])=>'| '+k+' | '+String(v)+' |'),
 '',
 '**Phase 2: BLOCKED. Phase 3 / 4: BLOCKED.**',
 '',
 '## Gate blockers',
 ...failReasons.map(x=>'- '+x),
 '',
 '## Machine-verifiable diagnostics',
 '~~~json',
 JSON.stringify({counts:status,sourceAnchorGroupsToReview:pendingMultipleAnchorGroups.slice(0,45),frozenFileRoleInventory,p0InvariantFailures,frozenManifestErrors,canonicalConsistencyErrors,sourceFirst:{scopeFiles:scopedNormativeFiles,readFailures:sourceInventoryFailures,triageCounts,unmappedCandidateLines:unmappedCandidateLines.filter(x=>x.sourceRole==='OPERATIONAL_CONTRACT'),otherFrozenUnmappedCount:unmappedCandidateLines.filter(x=>x.sourceRole!=='OPERATIONAL_CONTRACT').length,firstReviewClassified:firstReviewedUnmapped.length,unclassified:remainingUnclassified.length,classification:'HEURISTIC_REVIEW_REQUIRED_NOT_PROVEN_OBLIGATIONS'},missingLegacy,missingFrozen,failures:failures.slice(0,100),sourceLineMismatches:sourceLineMismatches.slice(0,100),orphanAliases:orphanAliases.slice(0,100),parentRisks:parentRisks.slice(0,100),crossVersion:crossVersion.slice(0,100),aliases:aliasPairs.slice(0,30),documentaryRelations:old.semanticRelations||[],relationOrphans,unverifiedMerges},null,2),
 '~~~','',
 '## Document retirement',
 'No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.',''
].join('\n');
if(process.argv[2]==='report'){
 old.sourceReviewQueue=sourceReviewQueue;
 old.sourceFirstCandidateLinks=frozenCandidateLinks;
 old.frozenFileRoleInventory=frozenFileRoleInventory;
 fs.writeFileSync(dir+'canonical-ledger.json',JSON.stringify(old,null,2)+'\n');
 fs.writeFileSync(dir+'PHASE2-GATE-REPORT.md',report);
}
console.log(report);
if(process.argv[2]==='integrity'){
 console.log(JSON.stringify({integrityFailures:integrityFailures.length,missingLegacy:missingLegacy.length,missingFrozen:missingFrozen.length,importErrors:errors.length,frozenReadFailures:sourceInventoryFailures.length},null,2));
 process.exitCode=integrityFailures.length||missingLegacy.length||missingFrozen.length||errors.length||sourceInventoryFailures.length?1:0;
}else if(process.argv[2]==='verify'||process.argv[2]==='report'){
 process.exitCode=1; // Semantic Gate remains blocked while obligations are not adjudicated.
}else throw Error('Usage: import | integrity | verify | report');
