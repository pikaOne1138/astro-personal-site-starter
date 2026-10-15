import {readFileSync,existsSync,mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderStudentProject} from './student-project-context.mjs';
const here=fileURLToPath(new URL('../',import.meta.url));
export function inspectLegacySite(directory){
 const root=resolve(directory),settings=join(root,'site.config.json'),packagePath=join(root,'package.json');
 if(!existsSync(settings)||!existsSync(packagePath))throw Error('Not an independent student site: missing site.config.json or package.json');
 const plan=JSON.parse(readFileSync(settings,'utf8'));
 if(!['knowledge','helper'].includes(plan.kind)||!/^[a-z0-9-]+$/.test(plan.layoutSlug||''))throw Error('Cannot infer existing site kind/layout safely');
 const files=['PROJECT.md','AGENTS.md','.gitignore','CLAUDE.md','GEMINI.md','scripts/site-status.mjs','scripts/check-secrets.mjs','scripts/check-project-context.mjs'];
 return {root,plan,existing:files.filter(f=>existsSync(join(root,f))),missing:files.filter(f=>!existsSync(join(root,f)))};
}
export function migrateLegacySite(directory,{apply=false}={}){
 const audit=inspectLegacySite(directory);
 if(!apply)return {...audit,status:'DRY_RUN',message:'Nothing written. Explicit --apply required.'};
 if(audit.existing.includes('PROJECT.md')||audit.existing.includes('AGENTS.md'))return {...audit,status:'BLOCKED',message:'Existing context requires human review; never overwrite or infer replacement.'};
 if(audit.existing.length)return {...audit,status:'BLOCKED',message:'Partial existing guard files require manual reconciliation to avoid overwrite.'};
 const template=readFileSync(join(here,'docs/student-builder-pack/PROJECT-TEMPLATE.md'),'utf8');
 const agents=readFileSync(join(here,'docs/student-builder-pack/STUDENT-AGENTS.md'),'utf8');
 const output=renderStudentProject(template,audit.plan);
 writeFileSync(join(audit.root,'PROJECT.md'),output,{flag:'wx'});
 writeFileSync(join(audit.root,'AGENTS.md'),agents.replace(/<!-- builder-only:start -->[\\s\\S]*?<!-- builder-only:end -->/g,'').replace(/本 ZIP/g,'學員網站').replace(/PROJECT-TEMPLATE\\.md/g,'PROJECT.md').replace(/scripts\\/export-starter\\.mjs/g,'網站原始碼'),{flag:'wx'});
 writeFileSync(join(audit.root,'.gitignore'),['node_modules/','dist/','.astro/','.env','.env.*','!.env.example','*.pem','*.key'].join('\\n')+'\\n',{flag:'wx'});
 writeFileSync(join(audit.root,'CLAUDE.md'),'@AGENTS.md\\n請閱讀 PROJECT.md，尊重既有文章與決策。\\n',{flag:'wx'});
 writeFileSync(join(audit.root,'GEMINI.md'),'請先讀 AGENTS.md 和 PROJECT.md。\\n',{flag:'wx'});
 mkdirSync(join(audit.root,'scripts'),{recursive:true});
 for(const name of ['site-status.mjs','check-secrets.mjs','check-project-context.mjs'])copyFileSync(join(here,'scripts',name),join(audit.root,'scripts',name));
 // Existing package.json and CI are deliberately untouched. Avoid breaking unknown old-site scripts.
 return {...audit,status:'INSTALLED',warning:'Existing package.json and workflows unchanged. Review before adding npm aliases or CI.'};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){
 const root=process.argv[2];if(!root)throw Error('Usage: node scripts/migrate-student-context.mjs existing-site [--apply]');
 const report=migrateLegacySite(root,{apply:process.argv.includes('--apply')});
 console.log(JSON.stringify({status:report.status,existing:report.existing,missing:report.missing,message:report.message,warning:report.warning},null,2));
 if(report.status==='BLOCKED')process.exitCode=2;
}
