import {mkdtempSync,readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

// An exported learner site must get its public URL and path prefix from the hosting platform,
// not from source code. This builds one exported site three ways and checks the output.
const cases=[];
const check=(name,ok)=>{cases.push({name,passed:Boolean(ok)});if(!ok)throw Error('student-deploy-config: '+name)};
const root=mkdtempSync(join(tmpdir(),'student-deploy-'));
const site=join(root,'site');
execFileSync(process.execPath,['scripts/export-starter.mjs','docs/art-direction/fixtures/subject-atlas.json',site,'--require-assembled'],{stdio:'inherit'});

const config=readFileSync(join(site,'astro.config.mjs'),'utf8');
check('astro.config takes SITE_URL first',/process\.env\.SITE_URL\|\|/.test(config));
check('astro.config falls back to the Cloudflare deployment URL before the placeholder',/process\.env\.CF_PAGES_URL\|\|config\.site/.test(config));
check('astro.config takes the path prefix from ASTRO_BASE_PATH',/process\.env\.ASTRO_BASE_PATH\|\|config\.base/.test(config));

const workflow=readFileSync(join(site,'.github/workflows/deploy.yml'),'utf8');
const configureAt=workflow.indexOf('actions/configure-pages');
const buildAt=workflow.indexOf('npm run build');
check('GitHub Pages workflow runs configure-pages before the build',configureAt!==-1&&configureAt<buildAt);
check('GitHub Pages workflow passes the site origin to the build',workflow.includes('SITE_URL: ${{ steps.pages.outputs.origin }}'));
check('GitHub Pages workflow passes the path prefix to the build',workflow.includes('ASTRO_BASE_PATH: ${{ steps.pages.outputs.base_path }}'));
check('indexing stays off unless the variable says so',workflow.includes("SITE_INDEXABLE: ${{ vars.SITE_INDEXABLE || 'false' }}"));
const readme=readFileSync(join(site,'README.md'),'utf8');
check('README explains both hosting routes',readme.includes('GitHub Pages：')&&readme.includes('Cloudflare Pages：')&&readme.includes('SITE_URL'));

execFileSync('npm',['install','--no-audit','--no-fund'],{cwd:site,stdio:'inherit'});
const {auditLinks}=await import(pathToFileURL(join(site,'scripts/audit-generated-links.mjs')).href);
const build=(env)=>execFileSync('npm',['run','build'],{cwd:site,stdio:'inherit',env:{...process.env,CF_PAGES:'',CF_PAGES_URL:'',CF_PAGES_BRANCH:'',SITE_URL:'',ASTRO_BASE_PATH:'',SITE_INDEXABLE:'',...env}});
const read=(file)=>readFileSync(join(site,'dist',file),'utf8');

// 1. GitHub Pages project site: https://learner.github.io/my-site/
build({SITE_URL:'https://learner.github.io',ASTRO_BASE_PATH:'/my-site'});
const failures=auditLinks(join(site,'dist'),'/my-site');
check('project-site build has no broken internal links under the path prefix',Array.isArray(failures)?failures.length===0:!failures?.length);
check('sitemap uses the platform origin and path prefix',read('sitemap.xml').includes('<loc>https://learner.github.io/my-site/'));
check('robots.txt stays closed without the indexing variable',/Disallow: \//.test(read('robots.txt')));
check('home page links stay under the path prefix',/href="\/my-site\//.test(read('index.html')));

// 2. Cloudflare Pages: no SITE_URL, deployment URL provided by the platform
build({CF_PAGES:'1',CF_PAGES_URL:'https://abc123.learner-site.pages.dev',CF_PAGES_BRANCH:'main'});
check('Cloudflare build uses the platform URL instead of the placeholder',read('sitemap.xml').includes('https://abc123.learner-site.pages.dev/')&&!read('sitemap.xml').includes('example.com'));
check('Cloudflare build stays closed to search engines by default',/Disallow: \//.test(read('robots.txt')));

// 3. Approved production: explicit URL and explicit indexing
build({SITE_URL:'https://www.learner.example',SITE_INDEXABLE:'true'});
check('approved production build opens robots.txt',/Allow: \//.test(read('robots.txt'))&&read('robots.txt').includes('https://www.learner.example/sitemap.xml'));
check('approved production build drops noindex from the home page',!/noindex/.test(read('index.html')));

mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/student-deploy-config.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',caseCount:cases.length,cases,limitations:'Local builds that simulate what GitHub Pages and Cloudflare Pages provide. Does not deploy to either platform.'},null,1));
console.log('PASS student deploy config '+cases.length);
