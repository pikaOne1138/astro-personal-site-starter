import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const root='src/components', paths=[];
function walk(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const p=join(dir,entry.name);if(entry.isDirectory())walk(p);else if(p.endsWith('.astro'))paths.push(p.replaceAll('\\\\','/'))}}
walk(root);paths.sort();
const manifest=JSON.parse(readFileSync('docs/quality/COMPONENT-COVERAGE.json','utf8'));
const violations=[],items=[];
function getProps(source){
 const match=/\\binterface\\s+Props\\s*(?:extends\\s+[^{}]+)?\\s*\\{/m.exec(source);
 if(!match)return {status:'UNDECLARED',fields:[],reason:'No interface Props declaration; requires review for Astro.props usage or slot-only design'};
 let depth=1,pos=match.index+match[0].length,quote=null;
 for(;pos<source.length&&depth;pos++){const ch=source[pos];if(quote){if(ch===quote&&source[pos-1]!=='\\\\')quote=null;continue}if(ch==='"'||ch==="'"||ch==='\x60'){quote=ch;continue}if(ch==='{')depth++;if(ch==='}')depth--}
 if(depth)return {status:'AMBIGUOUS',fields:[],reason:'Unbalanced Props interface'};
 const body=source.slice(match.index+match[0].length,pos-1);
 // Extract top-level properties only: nested object fields are not mistaken for Props.
 let nest=0,start=0,parts=[],string=null;
 for(let i=0;i<body.length;i++){const ch=body[i];if(string){if(ch===string&&body[i-1]!=='\\\\')string=null;continue}if(ch==='"'||ch==="'"||ch==='\x60'){string=ch;continue}if(ch==='{'||ch==='['||ch==='('||ch==='<')nest++;if(ch==='}'||ch===']'||ch===')'||ch==='>')nest=Math.max(0,nest-1);if(nest===0&&(ch===';'||ch==='\\n')){parts.push(body.slice(start,i));start=i+1}}
 parts.push(body.slice(start));
 const fields=[],unknown=[];
 for(const part of parts){const cleaned=part.replace(/\\/\\*[\\s\\S]*?\\*\\//g,'').replace(/\\/\\/[^\\n]*/g,'').trim();if(!cleaned)continue;
 const m=/^(?:readonly\\s+)?(['"]?[A-Za-z_$][\\w$-]*['"]?)\\s*(\\?)?\\s*:\\s*([\\s\\S]+)$/.exec(cleaned);
 if(m)fields.push({name:m[1].replace(/^['"]|['"]$/g,''),required:!m[2],type:m[3].trim().slice(0,250),execution:'NOT TESTED'});else unknown.push(cleaned.slice(0,140));
 }
 return {status:unknown.length?'PARTIAL':'EXTRACTED',fields,unknown,reason:unknown.length?'Complex or multiline Props require manual mapping':undefined};
}
for(const path of paths){const source=readFileSync(path,'utf8');const found=getProps(source);const group=manifest.components[path]?.group||'MISSING';
 if(group==='MISSING')violations.push(path+' absent from component coverage');
 if(found.status==='AMBIGUOUS')violations.push(path+' Props declaration is unbalanced');
 if(found.status==='UNDECLARED'&&/Astro\\.props/.test(source))violations.push(path+' reads Astro.props without interface Props');
 items.push({path,group,inventory:found.status,props:found.fields,unknown:found.unknown||[],reason:found.reason||null,validPropsExecution:'NOT TESTED',invalidPropsExecution:'NOT TESTED',browserInteractions:'NOT TESTED',integrations:'NOT TESTED'});
}
for(const name of Object.keys(manifest.components))if(!paths.includes(name))violations.push(name+' stale component manifest entry');
if(process.env.QA_PROPS_INVENTORY_FIXTURE==='omit-last')items.pop();
if(items.length!==paths.length)violations.push('Props inventory missing component entries');
const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:violations.length?'FAIL':'PASS',scope:'All source component Props declarations / ownership only, not runtime Props validation',componentCount:paths.length,extractedComponentCount:items.filter(x=>x.inventory==='EXTRACTED').length,partialCount:items.filter(x=>x.inventory==='PARTIAL').length,undocumentedCount:items.filter(x=>x.inventory==='UNDECLARED').length,declaredPropCount:items.reduce((n,x)=>n+x.props.length,0),items,violations,releaseAcceptance:'NOT TESTED'};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/all-component-props-inventory.json',JSON.stringify(report,null,2)+'\\n');
console.log('Component Props inventory '+report.componentCount+'; props parsed '+report.declaredPropCount+'; partial '+report.partialCount+'; undeclared '+report.undocumentedCount);
if(violations.length){console.error(violations.join('\\n'));process.exitCode=1}
