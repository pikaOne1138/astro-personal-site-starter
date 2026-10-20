import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { finalizeStudentSite } from './student-project-context.mjs';

const sample = {
  version: 1, kind: 'knowledge', layoutSlug: 'field-notes',
  brand: { name: '測試網站', tagline: '驗證交付安全網' },
  primaryCta: { pageId: 'about', label: '關於' },
  navigation: [{ id: 'articles', label: '文章', enabled: true }, { id: 'about', label: '關於', enabled: true }]
};

const original = [
  'name: Student PR build verification',
  'on:',
  '  pull_request:',
  'permissions:',
  '  contents: read',
  'jobs:',
  '  verify:',
  '    runs-on: ubuntu-latest',
  '    steps:',
  '      - run: npm install',
  '      - name: Prove learner validators reject known-bad output',
  '        run: npm run test:regressions',
  '      - run: npm run build',
  '      - name: Verify site output and draft isolation',
  '        run: npm run verify'
].join('\n') + '\n';

const root = mkdtempSync(join(tmpdir(), 'atp-student-safety-'));
try {
  mkdirSync(join(root, '.github', 'workflows'), { recursive: true });
  writeFileSync(join(root, 'package.json'), JSON.stringify({
    name: 'student-test-site',
    type: 'module',
    scripts: { build: 'astro build', verify: 'node scripts/verify.mjs' }
  }));
  writeFileSync(join(root, '.github', 'workflows', 'pr-check.yml'), original);
  finalizeStudentSite(root, sample);
  assert(existsSync(join(root, 'scripts', 'qa-student-responsive.mjs')), 'browser checker must be bundled');
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts['qa:responsive'], 'node scripts/qa-student-responsive.mjs');
  assert(pkg.devDependencies.playwright, 'Playwright dependency must be pinned to compatible range');
  assert(pkg.scripts['check:secrets'] && pkg.scripts['check:context']);
  const workflow = readFileSync(join(root, '.github', 'workflows', 'pr-check.yml'), 'utf8');
  for (const line of [
    'npm run test:regressions', 'npm run build', 'npm run verify',
    'npm run qa:responsive', 'playwright install --with-deps chromium',
    'npm run check:secrets', 'npm run check:context',
    'student-responsive-qa'
  ]) assert(workflow.includes(line), 'Missing student PR gate: ' + line);
  assert(workflow.indexOf('npm run build') < workflow.indexOf('npm run qa:responsive'), 'Browser QA must follow build');
  assert(workflow.includes('if: always()'), 'QA evidence must upload even if tests fail');
  assert(readFileSync(join(root, '.gitignore'), 'utf8').includes('qa-artifacts/'));
  console.log('PASS: Student exporter finalization bundles QA, existing technical gates and independent student CI workflow.');
} finally {
  rmSync(root, { recursive: true, force: true });
}
