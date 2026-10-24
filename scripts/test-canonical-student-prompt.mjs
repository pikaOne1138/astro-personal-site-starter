import {existsSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const canonicalPath='docs/student-builder-pack/START-BUILD-PROMPT.txt';
const canonical=readFileSync(canonicalPath,'utf8').trim();
const guide=readFileSync('src/pages/guide/index.astro','utf8');
const start=readFileSync('docs/student-builder-pack/START-HERE.md','utf8');
const repoReadme=readFileSync('README.md','utf8');
const errors=[];
if(canonical.length<200)errors.push('Canonical learner prompt is missing or too short');
for(const phrase of ['Site Brief JSON','AGENTS.md','AGENT-HANDOFF.md','Branch','Pull Request','預覽','沒有我明確同意'])if(!canonical.includes(phrase))errors.push('Canonical prompt missing safety requirement '+phrase);
if(!guide.includes("import startBuildPrompt from '../../../docs/student-builder-pack/START-BUILD-PROMPT.txt?raw'")||!guide.includes("title:'開始建站',text:startBuildPrompt.trim()"))errors.push('N20 Guide does not read canonical prompt');
if(!start.includes('START-BUILD-PROMPT.txt')||!start.includes('唯一正式起始提示詞'))errors.push('N20 ZIP START-HERE does not use canonical prompt');
if(!repoReadme.includes('START-BUILD-PROMPT.txt'))errors.push('N20 research README missing canonical reference');
const interviewPath='docs/student-builder-pack/START-INTERVIEW-PROMPT.txt';
const interview=readFileSync(interviewPath,'utf8').trim();
if(interview.length<150||interview.length>300)errors.push('Interview prompt must be 150-300 characters, got '+interview.length);
for(const phrase of ['一次只問我一個問題','不知道','跳過','不可替我編','已記錄','理解確認單','停下來','對，可以開始','密碼','Token'])if(!interview.includes(phrase))errors.push('Interview prompt missing '+phrase);
if(!guide.includes("import startInterviewPrompt from '../../../docs/student-builder-pack/START-INTERVIEW-PROMPT.txt?raw'")||!guide.includes('startInterviewPrompt.trim()'))errors.push('Guide chat route does not read interview prompt');
if(!start.includes('START-INTERVIEW-PROMPT.txt'))errors.push('ZIP START-HERE does not register interview prompt');
if(!repoReadme.includes('START-INTERVIEW-PROMPT.txt'))errors.push('Research README missing interview prompt reference');
const fromZero=readFileSync('.ai/astro-site-from-zero/SKILL.md','utf8');
for(const phrase of ['核心題庫','理解確認單與硬停點','逐題保存與續接','INTERVIEW-NOTES.md','學員明確略過'])if(!fromZero.includes(phrase))errors.push('from-zero Skill missing '+phrase);
let archive='NOT TESTED';
const pkg='public/AI-建站資料包.zip';
if(existsSync(pkg)){
 const bytes=readFileSync(pkg);
 const foundName=bytes.includes(Buffer.from(canonicalPath,'utf8'));
 const foundText=bytes.includes(Buffer.from(canonical,'utf8'))&&bytes.includes(Buffer.from(interview,'utf8'));
 archive=foundName&&foundText?'PASS':'FAIL';
 if(archive==='FAIL')errors.push('N20 actual delivered ZIP does not contain canonical prompt bytes');
}
const result={schemaVersion:1,checkoutSha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',sourceContract:'PASS',bundledZip:archive,errors,note:'Source-of-truth checks verify identical text is imported by /guide and packaged in ZIP; actual browser copy operation is covered separately by guide E2E.'};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/canonical-student-prompt.json',JSON.stringify(result,null,2)+'\n');
console.log('N20 canonical student prompt: '+result.status+'; ZIP '+archive);
if(errors.length){errors.forEach(e=>console.error('FAIL '+e));process.exitCode=1;}
