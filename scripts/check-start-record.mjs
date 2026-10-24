import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

// G-00 start record check. It proves a confirmation record exists and is internally consistent.
// It cannot prove that a real person agreed: the file is writable by the AI.
const STATUSES=['已確認','學員明確略過'];
const ROUTES=['A','B','C'];
const EMPTY=/^(?:|待確認|待補|尚無|無|未知|—|-)$/;
const SHEET_FIELDS=[['定位'],['主要行動','訪客的主要行動'],['頁面'],['已確認'],['AI 建議','AI建議'],['還缺','缺的真實資料','MISSING']];

export function normalizeSheet(text){return text.split(/\r?\n/).map(l=>l.replace(/^\s*>\s?/,'').trim()).filter(Boolean).join('\n');}
export function sheetHash(text){return 'sha256:'+createHash('sha256').update(normalizeSheet(text),'utf8').digest('hex');}

function section(text){
 const lines=text.split(/\r?\n/);
 const start=lines.findIndex(l=>/^#{2,4}\s*需求理解確認紀錄/.test(l));
 if(start<0)return null;
 let end=lines.length;
 for(let i=start+1;i<lines.length;i++)if(/^#{1,4}\s/.test(lines[i])){end=i;break;}
 return lines.slice(start+1,end).join('\n');
}
function parse(body){
 const out={};let key=null;
 for(const line of body.split(/\r?\n/)){
  const f=line.match(/^-\s*([^：:]+)[：:]\s*(.*)$/);
  if(f){key=f[1].trim();out[key]=f[2].trim();continue;}
  if(key&&line.trim())out[key]=(out[key]?out[key]+'\n':'')+line.trim();
 }
 return out;
}

export function inspectStartRecord(text){
 const errors=[];const learner='我們還沒確認過你想要的網站長什麼樣，先完成訪談確認，我再開始做。';
 const body=section(text||'');
 if(body===null)return {ok:false,id:'G-00',status:'FAIL',blocking:true,errors:['G-00: no 需求理解確認紀錄 section'],learnerMessage:learner};
 const r=parse(body);
 const route=(r['入口路線']||'').match(/[ABC]/)?.[0];
 const status=STATUSES.find(s=>(r['狀態']||'').startsWith(s));
 if(!route||!ROUTES.includes(route))errors.push('G-00: 入口路線 must be A, B or C');
 if(!status)errors.push('G-00: 狀態 must be 已確認 or 學員明確略過');
 if(EMPTY.test(r['確認依據']||r['確認依據（學員原話或所指訊息）']||''))errors.push('G-00: 確認依據 is empty');
 const basis=r['確認依據']||r['確認依據（學員原話或所指訊息）']||'';
 if(status==='學員明確略過'&&!/[「"『]/.test(basis))errors.push('G-00: 學員明確略過 must quote the learner\'s own words in 確認依據');
 const sheet=r['確認單全文']||'';
 if(status==='已確認'){
  if(EMPTY.test(sheet.trim()))errors.push('G-00: 確認單全文 is empty');
  else{
   const missing=SHEET_FIELDS.filter(alts=>!alts.some(a=>sheet.includes(a))).map(a=>a[0]);
   if(missing.length)errors.push('G-00: 確認單 missing fields: '+missing.join(', '));
   const hash=r['確認單雜湊'];
   if(hash?.startsWith('sha256:')&&hash!==sheetHash(sheet))errors.push('G-00: 確認單 changed after confirmation (hash mismatch); ask the learner to confirm again');
  }
 }
 const time=r['確認時間']||'';
 const ok=errors.length===0;
 return {ok,id:'G-00',status:ok?'PASS':'FAIL',blocking:!ok,route,recordStatus:status,confirmedAt:EMPTY.test(time)?null:time,errors,
  learnerMessage:ok?'':learner,
  note:'Record presence only; it does not prove a human agreed.'};
}

export function checkStartRecordFile(file){
 const path=resolve(file);
 if(!existsSync(path))return {ok:false,id:'G-00',status:'FAIL',blocking:true,errors:['G-00: record file not found '+file],learnerMessage:'我們還沒確認過你想要的網站長什麼樣，先完成訪談確認，我再開始做。'};
 return inspectStartRecord(readFileSync(path,'utf8'));
}

if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)){
 const [a,b]=process.argv.slice(2);
 if(a==='--print-hash'&&b){console.log(sheetHash(readFileSync(b,'utf8')));}
 else{
  const res=checkStartRecordFile(a||'PROJECT.md');
  if(res.ok)console.log('G-00 開工紀錄 PASS：路線 '+res.route+'，'+res.recordStatus+(res.confirmedAt?'，'+res.confirmedAt:'')+'（只證明有留痕，不證明真人同意）');
  else{console.error('G-00 開工紀錄 FAIL：'+res.learnerMessage);for(const e of res.errors)console.error('  '+e);process.exitCode=1;}
 }
}
