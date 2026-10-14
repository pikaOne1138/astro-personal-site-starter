import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const path='qa-artifacts/quality/block-effect-browser.json';
const blocks=JSON.parse(readFileSync('src/data/blocks.registry.json','utf8'));
const input=JSON.parse(readFileSync(path,'utf8'));
function audit(report){
 const faults=[];
 const byName=new Map((report.individualBlockCoverage||[]).map(x=>[x.name,x]));
 if(byName.size!==blocks.length)faults.push('Incorrect block evidence count');
 for(const block of blocks){
  const item=byName.get(block.name);
  if(!item){faults.push(block.name+': missing individual audit');continue}
  const widths=new Set(item.byWidth?.map(x=>x.width)||[]);
  if(widths.size!==4||[1440,1280,768,390].some(width=>!item.byWidth.some(x=>x.width===width&&x.visible===true)))faults.push(block.name+': missing viewport visibility');
  if(item.noJSVisible!==true)faults.push(block.name+': unreadable without JavaScript');
  if(item.renderContractPass!==true)faults.push(block.name+': render contract is not passing');
 }
 return faults;
}
const clean=audit(input);
const cases=[];
function negative(name,edit){
 const clone=structuredClone(input);
 edit(clone);
 const errs=audit(clone);
 cases.push({name,detected:errs.length>0,errors:errs});
 if(errs.length===0)throw Error('Fault not detected: '+name);
}
if(clean.length)throw Error('Baseline Block render evidence invalid: '+clean.join('; '));
negative('remove one Block evidence entry',x=>{x.individualBlockCoverage.pop()});
negative('remove one responsive observation',x=>{x.individualBlockCoverage[0].byWidth=x.individualBlockCoverage[0].byWidth.filter(v=>v.width!==390)});
negative('mark one Block unreadable without JS',x=>{x.individualBlockCoverage[0].noJSVisible=false});
negative('hide one Block at mobile width',x=>{x.individualBlockCoverage[0].byWidth.find(v=>v.width===390).visible=false});
const result={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',registeredBlocks:blocks.length,detectedFaults:cases,limitations:'This validator checks the integrity of viewport/no-JS evidence; it does not prove full component interaction or Props behavior.'};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/block-render-evidence-regressions.json',JSON.stringify(result,null,2)+'\n');
console.log('54 Block individual render evidence PASS; 4 destructive evidence mutations correctly rejected');
