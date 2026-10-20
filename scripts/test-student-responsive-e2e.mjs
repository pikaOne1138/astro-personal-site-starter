import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const workspace = mkdtempSync(join(process.cwd(), '.qa-student-e2e-'));
const checker = new URL('./qa-student-responsive.mjs', import.meta.url);
const html = (body, base) => [
  '<!doctype html><html lang="zh-Hant"><head>',
  '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
  '<link rel="stylesheet" href="' + base + 'site.css">',
  '</head><body><header><nav><a href="' + base + '">首頁</a><a href="' + base + 'about/">關於</a></nav></header>',
  '<main>' + body + '</main></body></html>'
].join('');
const run = (base, scenario) => {
  const root = join(workspace, base === '/' ? 'root' : 'subpath', scenario);
  mkdirSync(join(root, 'scripts'), { recursive: true });
  mkdirSync(join(root, 'dist', 'about'), { recursive: true });
  copyFileSync(checker, join(root, 'scripts', 'qa-student-responsive.mjs'));
  writeFileSync(join(root, 'site.config.json'), JSON.stringify({ base, navigation: [{ id: 'about', path: 'about/', enabled: true }] }));
  writeFileSync(join(root, 'dist', 'site.css'), 'body{margin:0;font:18px sans-serif}main{padding:20px}*{box-sizing:border-box}h1{overflow-wrap:anywhere}\n');
  const body = scenario === 'overflow'
    ? '<div style="width:1100px;height:120px">超出手機的固定欄寬</div>'
    : scenario === 'broken-image'
    ? '<img src="' + base + 'missing-portrait.webp" alt="測試破圖">'
    : scenario === 'javascript'
    ? '<script>setTimeout(()=>{throw new Error("QA_INJECTED_JS_FAILURE")},0)</script><h1>JS 測試</h1>'
    : '<h1>' + '這是一段可以正常換行的中文標題'.repeat(12) + '</h1>';
  writeFileSync(join(root, 'dist', 'index.html'), html(body, base));
  writeFileSync(join(root, 'dist', 'about', 'index.html'), html('<h1>獨立網站關於頁</h1>', base));
  const testPort = 44000 + Math.floor(Math.random() * 10000);
  const result = spawnSync(process.execPath, ['scripts/qa-student-responsive.mjs'], {
    cwd: root,
    env: { ...process.env, ATP_QA_PORT: String(testPort) },
    encoding: 'utf8',
    timeout: 100000
  });
  const reportPath = join(root, 'qa-artifacts', 'student-responsive', 'results.json');
  assert(result.status !== null, 'QA process did not exit; ' + result.error?.message);
  let report;
  try { report = JSON.parse(readFileSync(reportPath, 'utf8')); }
  catch { throw new Error('Missing QA report: ' + result.stdout + '\n' + result.stderr); }
  assert.equal(report.pages, 2);
  assert.equal(report.total, 10, '2 actual routes × 5 viewport widths');
  assert.deepEqual(report.viewportWidths, [1440, 1280, 768, 390, 375]);
  assert.equal(report.configuredBase, base);
  assert(report.rows.every(row => row.status === 200), 'Existing routes must not generate false 404: ' + JSON.stringify(report.rows.filter(row => row.status !== 200)));
  if (scenario === 'valid') {
    assert.equal(result.status, 0, 'Valid site must PASS: ' + result.stderr);
    assert.equal(report.failed, 0);
  } else {
    assert.equal(result.status, 1, 'Injected ' + scenario + ' must FAIL');
    assert(report.failed > 0, 'Expected at least one failing viewport');
    const signatures = {
      overflow: row => row.overflow,
      'broken-image': row => row.brokenLocalImages.length,
      javascript: row => row.errors.some(e => e.includes('QA_INJECTED_JS_FAILURE'))
    };
    assert(report.rows.some(signatures[scenario]), 'Missing detector for ' + scenario);
  }
  const humanReport = readFileSync(join(root, 'qa-artifacts', 'student-responsive', 'REPORT.md'), 'utf8');
  assert(humanReport.includes('學員網站防跑版檢查結果'), 'Chinese repair report missing');
  console.log('PASS portable QA:', base, scenario, 'views', report.total, 'failed', report.failed);
};
try {
  for (const base of ['/', '/student-example/']) {
    for (const scenario of ['valid', 'overflow', 'broken-image', 'javascript']) run(base, scenario);
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
