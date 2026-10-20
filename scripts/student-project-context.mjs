import { readFileSync, existsSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const clean = (value, fallback = '待確認') => {
  if (typeof value !== 'string') return fallback;
  const text = value.trim().replace(/[\r\n|]+/g, ' ').replace(/[<>]/g, '');
  return '「' + (text.slice(0, 180) || fallback).replaceAll('」','』') + '」';
};
const kindName = { knowledge: '知識／部落格型', helper: '助人者／個人專業服務型' };

export function renderStudentProject(template, plan) {
  if (!template.includes('# PROJECT.md') || !plan || !kindName[plan.kind]) {
    throw new Error('Invalid project context template or StarterPlan');
  }
  const nav = Array.isArray(plan.navigation) ? plan.navigation.filter(x => x.enabled) : [];
  const visiblePages = nav.map(x => clean(x.label)).join('、') || '待確認';
  const cta = nav.find(x => x.id === plan.primaryCta?.pageId);
  const fields = [
    ['網站名稱：待確認', '網站名稱：' + clean(plan.brand?.name)],
    ['網站類型：待確認（知識／部落格型，或助人者／個人專業服務型）', '網站類型：' + kindName[plan.kind] + '（學員 Site Brief 選擇，待本人核對）'],
    ['一句定位：待確認', '一句定位：' + clean(plan.brand?.tagline)],
    ['Layout ID（規劃選擇）：`pending`', 'Layout ID（規劃選擇）：`' + clean(plan.layoutSlug).replace(/[「」]/g,'') + '`'],
    ['Layout（決定版面與閱讀動線）：尚未選擇', 'Layout（決定版面與閱讀動線）：' + clean(plan.layoutSlug) + '（Site Brief，非已完成設計驗收）'],
    ['重要頁面及各頁目的：待討論', '重要頁面及各頁目的：規劃頁面：' + visiblePages + '；各頁目的待確認'],
    ['導覽順序／主要 CTA：待討論', '導覽順序／主要 CTA：' + visiblePages + '；主要 CTA：' + clean(plan.primaryCta?.label) + ' → ' + clean(cta?.label)],
    ['Site Brief JSON 路徑及版本：待確認', 'Site Brief JSON 路徑及版本：建立網站使用的 Site Brief（version ' + String(plan.version ?? '?') + '）；原始檔路徑待確認'],
    ['階段：需求探索', '階段：建站規劃（尚未完成發布與驗收）']
  ];
  let output = template;
  for (const [from, to] of fields) {
    if (!output.includes(from)) throw new Error('Missing project template field: ' + from);
    output = output.replace(from, to);
  }
  return output;
}

/** No overwrite, even if the site was generated before a new kit was downloaded. */
export function installProjectContext(directory, plan, options = {}) {
  const template = options.template ?? readFileSync(new URL('../docs/student-builder-pack/PROJECT-TEMPLATE.md', import.meta.url), 'utf8');
  const agents = options.agents ?? readFileSync(new URL('../docs/student-builder-pack/STUDENT-AGENTS.md', import.meta.url), 'utf8');
  const projectPath = join(directory, 'PROJECT.md');
  const agentsPath = join(directory, 'AGENTS.md');
  if (existsSync(projectPath) || existsSync(agentsPath)) {
    throw new Error('Refusing to overwrite existing PROJECT.md or AGENTS.md; review changes manually');
  }
  writeFileSync(projectPath, renderStudentProject(template, plan), { flag: 'wx' });
  writeFileSync(agentsPath, agents.replace(/<!-- builder-only:start -->[\s\S]*?<!-- builder-only:end -->/g,'').replace(/本 ZIP/g,'學員的原始建站資料包').replace(/PROJECT-TEMPLATE\.md/g,'PROJECT.md').replace(/scripts\/export-starter\.mjs/g,'網站原始碼'), { flag: 'wx' });
  return { projectPath, agentsPath };
}

/** Install runtime guards only into a newly generated, independently owned site. */
export function finalizeStudentSite(directory,plan,options={}){
 installProjectContext(directory,plan,options);
 const ignore=['node_modules/','dist/','.astro/','.env','.env.*','!.env.example','*.pem','*.key','qa-artifacts/','.DS_Store'].join('\n')+'\n';
 writeFileSync(join(directory,'.gitignore'),ignore,{flag:'wx'});
 const scripts=join(directory,'scripts');mkdirSync(scripts,{recursive:true});
 for(const file of ['site-status.mjs','check-secrets.mjs','check-project-context.mjs','qa-student-responsive.mjs'])copyFileSync(new URL('./'+file,import.meta.url),join(scripts,file));
 writeFileSync(join(directory,'CLAUDE.md'),'@AGENTS.md\n請先閱讀 PROJECT.md 並檢查 npm run status。\n',{flag:'wx'});
 writeFileSync(join(directory,'GEMINI.md'),'請先閱讀 AGENTS.md 與 PROJECT.md，並檢查 npm run status。\n',{flag:'wx'});
 const pkgPath=join(directory,'package.json'),pkg=JSON.parse(readFileSync(pkgPath,'utf8'));
 pkg.devDependencies={...pkg.devDependencies,playwright:'^1.56.0'};
 pkg.scripts={...pkg.scripts,'qa:responsive':'node scripts/qa-student-responsive.mjs',status:'node scripts/site-status.mjs','check:secrets':'node scripts/check-secrets.mjs','check:context':'node scripts/check-project-context.mjs'};
 writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\n');
 const wf=join(directory,'.github/workflows/pr-check.yml');
 if(existsSync(wf)){
  const old=readFileSync(wf,'utf8');
  if(!old.includes('npm run qa:responsive')){
    const verifyMarker='      - name: Verify site output and draft isolation';
    if(!old.includes(verifyMarker))throw Error('Student PR CI missing expected verify step');
    const browserSteps=[
      '      - name: Install browser for student responsive QA',
      '        run: npx playwright install --with-deps chromium',
      '      - name: Check responsive website in real browser',
      '        run: npm run qa:responsive',
      '      - name: Upload responsive QA evidence',
      '        if: always()',
      '        uses: actions/upload-artifact@v4',
      '        with:',
      '          name: student-responsive-qa',
      '          path: qa-artifacts/student-responsive/',
      '          if-no-files-found: warn'
    ].join('\n')+'\n';
    writeFileSync(wf,old.replace(verifyMarker,browserSteps+verifyMarker));
  }
  const withQa=readFileSync(wf,'utf8');
  if(!withQa.includes('npm run check:secrets')){
    const marker='      - run: npm run build';
    if(!withQa.includes(marker))throw Error('Student PR CI missing expected build step');
    writeFileSync(wf,withQa.replace(marker,'      - run: npm run check:context\n      - run: npm run check:secrets\n'+marker+'\n      - run: npm run check:secrets'));
  }
 }
 return directory;
}
