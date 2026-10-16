import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
export function checkProjectContext(dir=process.cwd()){
 const path=resolve(dir),configPath=join(path,'site.config.json'),projectPath=join(path,'PROJECT.md');
 const errors=[];
 if(!existsSync(configPath)||!existsSync(projectPath))return {ok:false,errors:['Missing site.config.json or PROJECT.md']};
 const config=JSON.parse(readFileSync(configPath,'utf8'));
 const project=readFileSync(projectPath,'utf8');
 const selected=project.match(/^- Layout ID（規劃選擇）：\s*`([a-z0-9-]+)`/m);
 if(!selected)errors.push('PROJECT.md is missing explicit planned Layout ID');
 else if(selected[1]!==config.layoutSlug)errors.push('Planned Layout ID differs from site.config.json layoutSlug');
 if(!/^\s*- 網站類型：/m.test(project))errors.push('PROJECT.md website kind missing');
 return {ok:errors.length===0,expected:config.layoutSlug,recorded:selected?.[1]??null,errors};
}
if(process.argv[1]&&process.argv[1].endsWith('check-project-context.mjs')){
 const result=checkProjectContext(process.argv[2]||'.');
 console.log(JSON.stringify(result,null,2));
 if(!result.ok)process.exitCode=1;
}
