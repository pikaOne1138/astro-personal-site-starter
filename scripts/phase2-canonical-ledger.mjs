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
 if(!row.canonicalId||row.reviewStatus!=='APPROVED'||row.decision==='PENDING')unresolved.push(id);
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
 aliasGroups:aliasPairs.length,
 documentaryRelationGroups:(old.semanticRelations||[]).length,
 documentaryMerges:(old.semanticRelations||[]).filter(x=>x.decision==='MERGE').length,
 documentaryPartialSplits:(old.semanticRelations||[]).filter(x=>x.decision==='PARTIAL_SPLIT').length,
 documentaryDistinct:(old.semanticRelations||[]).filter(x=>x.decision==='DISTINCT').length,
 frozenLinesReferenced:sourceCoverage.size,
 sourceFirstScopeFiles:scopedNormativeFiles.length,
 sourceFirstScopeCoverageOfFrozenFiles:scopedNormativeFiles.length+'/'+Object.keys(manifest).length,
 sourceFirstLinesScanned:sourceLineInventory.length,
 sourceFirstUnscannedFrozenFiles:Object.keys(manifest).filter(p=>!scopedNormativeFiles.includes(p)).length,
 sourceFirstCandidateLines:candidateLines.length,
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
 p0p1SourceDispositionTotal:assessedQueue.length+firstPassDisposed.length+closedNonNormative.length,
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
const integrityFailures=[...frozenManifestErrors,...canonicalConsistencyErrors,...failures,...sourceLineMismatches,...relationOrphans,...unverifiedMerges];
const failReasons=[];
if(status.frozenManifestFiles!==192)failReasons.push('Frozen manifest is not 192 files');
if(frozenManifestErrors.length)failReasons.push('Frozen manifest blob SHA mismatch or unreadable source');
if(canonicalConsistencyErrors.length)failReasons.push('Canonical groups have inconsistent definitions or aliases');
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
 JSON.stringify({counts:status,frozenManifestErrors,canonicalConsistencyErrors,sourceFirst:{scopeFiles:scopedNormativeFiles,readFailures:sourceInventoryFailures,triageCounts,unmappedCandidateLines:unmappedCandidateLines.filter(x=>x.sourceRole==='OPERATIONAL_CONTRACT'),otherFrozenUnmappedCount:unmappedCandidateLines.filter(x=>x.sourceRole!=='OPERATIONAL_CONTRACT').length,firstReviewClassified:firstReviewedUnmapped.length,unclassified:remainingUnclassified.length,classification:'HEURISTIC_REVIEW_REQUIRED_NOT_PROVEN_OBLIGATIONS'},missingLegacy,missingFrozen,failures:failures.slice(0,100),sourceLineMismatches:sourceLineMismatches.slice(0,100),orphanAliases:orphanAliases.slice(0,100),parentRisks:parentRisks.slice(0,100),crossVersion:crossVersion.slice(0,100),aliases:aliasPairs.slice(0,30),documentaryRelations:old.semanticRelations||[],relationOrphans,unverifiedMerges},null,2),
 '~~~','',
 '## Document retirement',
 'No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.',''
].join('\n');
if(process.argv[2]==='report'){
 old.sourceReviewQueue=sourceReviewQueue;
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
