import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const paths={pr:'.ai/astro-pr-preview/SKILL.md',deploy:'.ai/astro-starter-deploy/SKILL.md',guide:'src/pages/guide/prepare.astro'};
const base=Object.fromEntries(Object.entries(paths).map(([name,path])=>[name,readFileSync(path,'utf8')]));
const assertions=[
 ['W1','pr',["舊的 \`/pr-preview/pr-N/\`","Checks／Deployment","核對 SHA","不要寫死"]],
 ['W2','guide',["github.com","api.github.com","registry.npmjs.org","pages.dev","無法連線時的替代方案","離線整理","不等於網站已完成驗證"]],
 ['W13','pr',["GitHub Commit","刪除舊部署","刪除舊部署","不保證"]],
 ['W13','guide',["Cloudflare 舊 Preview","fork","敏感資料"]],
 ['W14','deploy',["不代表它擁有 Pages 專案寫入","Cloudflare Dashboard","截圖一步一步","不代表"]],
];
function check(sources){
 const rows=assertions.map(([id,file,terms])=>({id,file,terms,missing:terms.filter(term=>!sources[file]?.includes(term)),status:terms.every(term=>sources[file]?.includes(term))?'PASS':'FAIL'}));
 return {rows,errors:rows.filter(x=>x.status==='FAIL')};
}
const normal=check(base);if(normal.errors.length)throw Error('Source documentation contracts failed: '+JSON.stringify(normal.errors));
const falsePass=[];
for(const [id,file,terms] of assertions){
 const mutated={...base,[file]:base[file].replaceAll(terms[0],'[QA FAULT DELETED]')};
 const result=check(mutated);const catches=result.errors.some(e=>e.id===id&&e.file===file);
 falsePass.push({id,file,catches});
 if(!catches)throw Error(id+'/'+file+': deliberate removal was not detected');
}
mkdirSync('qa-artifacts/quality',{recursive:true});
const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',assertions:normal.rows,faults:falsePass,scope:'Document contents and safety contracts, not cloud account permission or actual historical Preview removal'};
writeFileSync('qa-artifacts/quality/learner-document-safety.json',JSON.stringify(report,null,2)+'\n');
console.log('W1 W2 W13 W14 document safety PASS; '+falsePass.length+' destructive mutations rejected');
