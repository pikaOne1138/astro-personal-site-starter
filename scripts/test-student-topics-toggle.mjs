import {mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';

// Run the public learner exporter, not only a registry validation.
const work=mkdtempSync(join(tmpdir(),'atp-topics-toggle-'));
try {
 const fixture=JSON.parse(readFileSync('docs/art-direction/fixtures/subject-atlas.json','utf8'));
 delete fixture.contentDirectory;
 fixture.navigation.push({id:'topics',label:'主題',enabled:false});
 const plan=join(work,'plan.json'),out=join(work,'site');
 writeFileSync(plan,JSON.stringify(fixture));
 execFileSync(process.execPath,['scripts/export-art-direction-starter.mjs',plan,out,'--allow-in-progress'],{stdio:'pipe'});
 const config=JSON.parse(readFileSync(join(out,'site.config.json'),'utf8'));
 if(config.navigation.some(x=>x.id==='topics'))throw Error('Disabled Topics leaked into learner navigation');
 if(existsSync(join(out,'src/pages/topics')))throw Error('Disabled Topics emitted public Astro route');
 if(config.artDirection.explicitPageIds.includes('topics'))throw Error('Disabled Topics was marked as a mandatory route');
 const sitemap=readFileSync(join(out,'src/pages/sitemap.xml.js'),'utf8');
 if(!sitemap.includes("config.navigation.some(x=>x.id==='topics')"))throw Error('Topics sitemap entries are not guarded by learner choice');
 console.log('PASS: disabled Topics produces no navigation or public routes');
}finally{rmSync(work,{recursive:true,force:true});}
