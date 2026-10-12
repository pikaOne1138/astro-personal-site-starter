import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join,relative} from 'node:path';
import {transform} from '@astrojs/compiler';
const root='src/components';
const files=[];
const scan=d=>{for(const item of readdirSync(d,{withFileTypes:true})){const path=join(d,item.name);if(item.isDirectory())scan(path);else if(item.isFile()&&path.endsWith('.astro'))files.push(path.replaceAll('\\','/'));}};
scan(root);files.sort();
const registered=JSON.parse(readFileSync('src/data/blocks.registry.json','utf8'));
const registeredPaths=new Set(registered.map(x=>x.path));
const expectedGroups={blocks:54,effects:7,patterns:3,editorialRecipes:40,shared:6};
const groups={blocks:[],effects:[],patterns:[],editorialRecipes:[],shared:[]},errors=[],results=[];
for(const path of files){
 const group=path.startsWith('src/components/blocks/')?'blocks':path.startsWith('src/components/effects/')?'effects':path.startsWith('src/components/patterns/')?'patterns':path.startsWith('src/components/editorial-recipes/')?'editorialRecipes':'shared';
 groups[group].push(path);
 const source=readFileSync(path,'utf8');
 const entry={path,group,syntax:'NOT TESTED',frontmatter:'NOT TESTED',props:'NOT TESTED',behavior:'NOT TESTED',accessibility:'NOT TESTED',responsive:'NOT TESTED',integration:'NOT TESTED',sourceBytes:Buffer.byteLength(source)};
 try{await transform(source,{filename:resolve(path)});entry.syntax='PASS'}catch(e){entry.syntax='FAIL';errors.push(path+': Astro compilation error '+String(e.message||e).slice(0,300))}
 if(source.startsWith('---\n')&&source.indexOf('\n---',4)>0)entry.frontmatter='PASS';else{entry.frontmatter='FAIL';errors.push(path+': missing Astro frontmatter delimiter')}
 if(group==='blocks'&&!registeredPaths.has(path)){entry.registry='FAIL';errors.push(path+': Block not registered')}else if(group==='blocks')entry.registry='PASS';
 results.push(entry);
}
for(const block of registered){if(!files.includes(block.path))errors.push('Registry path not found: '+block.path);}
for(const [group,number] of Object.entries(expectedGroups))if(groups[group].length!==number)errors.push(group+': '+groups[group].length+' found, baseline '+number+' changed; update documented inventory after reviewing added or removed components');
if(files.length!==new Set(files).size)errors.push('Duplicate components');
const report={schemaVersion:1,headSha:process.env.GITHUB_SHA||null,status:errors.length?'FAIL':'PASS',total:files.length,groupCounts:Object.fromEntries(Object.entries(groups).map(([k,v])=>[k,v.length])),individualResults:results,errors,notes:'PASS here means Astro syntax and frontmatter; individual Props, behavior, accessibility, responsive and integration remain NOT TESTED'};
mkdirSync('qa-artifacts/quality',{recursive:true});writeFileSync('qa-artifacts/quality/all-astro-components.json',JSON.stringify(report,null,2)+'\n');
console.log('All Astro components: '+report.total+'; groups '+JSON.stringify(report.groupCounts)+'; syntax errors '+errors.length);
for(const e of errors)console.error('FAIL '+e);
if(errors.length)process.exitCode=1;
