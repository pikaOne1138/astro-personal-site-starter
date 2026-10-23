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
 fs.writeFileSync(path,JSON.stringify({schemaVersion:1,frozenCommit:frozen,authority:'PROVISIONAL',upstreamDelta:{pr:61,separateVersionLayer:true},sourceManifest:{frozen:manifest,working:inventory},records:entries,semanticRelations,importErrors:errors,recoveryFailures},null,2)+'\n');
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
const status={
 frozenManifestFiles:Object.keys(manifest).length,workingFiles:files.length,
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
 unexaminedFrozenNormativeClauses:'NOT_ESTABLISHED',
 semanticCompleteness:'NOT_VERIFIED',
 oldFileRetirement:'NOT_AUTHORIZED',
 stage2:'BLOCKED',stage3:'BLOCKED',stage4:'BLOCKED'
};
const documentaryRelations=old.semanticRelations||[];
const relationOrphans=documentaryRelations.filter(rel=>rel.legacyIds.some(id=>!legacyIndex.has(id)));
const unverifiedMerges=documentaryRelations.filter(rel=>rel.decision==='MERGE'&&rel.sharedExactFrozenAnchors.length===0);
const failReasons=[];
if(status.frozenManifestFiles!==192)failReasons.push('Frozen manifest is not 192 files');
if(missingLegacy.length)failReasons.push('Unimported legacy IDs');
if(failures.length)failReasons.push('Broken links or source integrity failures');
if(missingFrozen.length)failReasons.push('Missing direct frozen or upstream anchors');
if(sourceLineMismatches.length)failReasons.push('Frozen text mismatches');
if(parentRisks.length)failReasons.push('Parent/child canonical double-count risk');
if(crossVersion.length)failReasons.push('Unreviewed non-frozen references');
if(orphanAliases.length)failReasons.push('Alias orphans');
if(unresolved.length)failReasons.push('Semantic adjudication incomplete');
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
 JSON.stringify({counts:status,missingLegacy,missingFrozen,failures:failures.slice(0,100),sourceLineMismatches:sourceLineMismatches.slice(0,100),orphanAliases:orphanAliases.slice(0,100),parentRisks:parentRisks.slice(0,100),crossVersion:crossVersion.slice(0,100),aliases:aliasPairs.slice(0,30),documentaryRelations:old.semanticRelations||[],relationOrphans,unverifiedMerges},null,2),
 '~~~','',
 '## Document retirement',
 'No archival/move/delete plan is authorized until semantic review, complete bidirectional source coverage, zero defects and explicit user approval. The 1,390 legacy IDs are not canonical obligations.',''
].join('\n');
if(process.argv[2]==='report')fs.writeFileSync(dir+'PHASE2-GATE-REPORT.md',report);
console.log(report);
if(process.argv[2]!=='report'&&process.argv[2]!=='verify')throw Error('Usage: import | verify | report');
process.exitCode=1;
