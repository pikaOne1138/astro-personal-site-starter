import { chromium } from 'playwright';
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, relative, resolve, sep, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const config = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'));
const port = Number(process.env.ATP_QA_PORT || 4397);
const origin = 'http://127.0.0.1:' + port;
const configuredBase = process.env.ASTRO_BASE_PATH || config.base || '/';
const segments = String(configuredBase).split('/').filter(Boolean);
const prefix = segments.length ? '/' + segments.join('/') + '/' : '/';
const widths = [1440, 1280, 768, 390, 375];
const outputRoot = process.env.ATP_QA_DIST || 'dist';
const out = process.env.ATP_QA_OUT || 'qa-artifacts/student-responsive';
const maxPages = 40;
const failOnSkippedNavigation = process.env.ATP_QA_STRICT_NAV === '1';
mkdirSync(out, { recursive: true });

function discoverPages() {
  if (!existsSync(outputRoot)) throw Error('dist/ missing: run npm run build before responsive QA');
  const found = [];
  function visit(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!['pagefind', '_astro', 'qa-layouts'].includes(entry.name)) visit(file);
      } else if (entry.name === 'index.html') {
        const path = relative(outputRoot, file).replace(/\\/g, '/').replace(/index\.html$/, '');
        if (!path.startsWith('pr-preview/') && !path.startsWith('qa-')) found.push(path);
      }
    }
  }
  visit(outputRoot);
  found.sort((a, b) => a === '' ? -1 : b === '' ? 1 : a.localeCompare(b));
  if (!found.length) throw Error('No built index.html found in ' + outputRoot);
  return found;
}

const discovered = discoverPages();
const topLevel = discovered.filter(p => !p || p.split('/').filter(Boolean).length <= 1);
const samples = discovered.filter(p => !topLevel.includes(p));
const capacity = Math.max(0, maxPages - topLevel.length);
const sampled = samples.length <= capacity ? samples : Array.from({ length: capacity }, (_, i) => samples[Math.floor(i * samples.length / capacity)]);
const paths = [...new Set([...topLevel, ...sampled])];
const browserNotTested = discovered.filter(p => !paths.includes(p));
let sourceCommit = process.env.GITHUB_SHA || 'local-uncommitted';
if(!process.env.GITHUB_SHA)try { sourceCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(); }catch {}
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};
const staticRoot = resolve(outputRoot);
const server = createServer((request, response) => {
  try {
    const url = new URL(request.url || '/', origin);
    const pathname = decodeURIComponent(url.pathname);
    if (!pathname.startsWith(prefix)) {
      response.writeHead(404); response.end('Outside configured base'); return;
    }
    const relativePath = pathname.slice(prefix.length);
    const target = resolve(staticRoot, relativePath.endsWith('/') || !relativePath ? relativePath + 'index.html' : relativePath);
    if (!target.startsWith(staticRoot + sep)) {
      response.writeHead(403); response.end('Forbidden'); return;
    }
    if (!existsSync(target)) {
      response.writeHead(404); response.end('Not found: ' + relativePath); return;
    }
    response.writeHead(200, { 'Content-Type': mime[extname(target).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(readFileSync(target));
  } catch (error) {
    response.writeHead(500); response.end('Static test server error: ' + error.message);
  }
});
let browser;
const rows = [];
try {
  await new Promise((ok, fail) => { server.once('error', fail); server.listen(port, '127.0.0.1', ok); });
  browser = await chromium.launch({ headless: true });
  for (const path of paths) {
    for (const width of widths) {
      const page = await browser.newPage({
        viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce'
      });
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      const url = origin + prefix + path;
      let status = null;
      let metrics = { overflow: false, offenders: [], brokenLocalImages: [], brokenRemoteImages: [] };
      const interactions = [];
      let navLinkFailures = [];
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        status = response?.status() ?? null;
        await page.evaluate(() => document.fonts.ready);
        // Screenshot scrolls the page to exercise lazy images; then wait for image loads.
        const key = (path || 'home').replace(/[^a-z0-9-]/g, '-').slice(0, 100);
        await page.screenshot({
          path: out + '/' + key + '-' + width + '.png', fullPage: true,
          animations: 'disabled', timeout: 20000
        });
        await page.evaluate(async () => {
          await Promise.all([...document.images].filter(i => {
            const r = i.getBoundingClientRect();
            return i.loading !== 'lazy' || (r.top < innerHeight && r.bottom > 0);
          }).map(img => {
            if (img.complete) return Promise.resolve();
            return Promise.race([
              new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }); }),
              new Promise(resolve => setTimeout(resolve, 2500))
            ]);
          }));
        });
        metrics = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const overflow = document.documentElement.scrollWidth > vw + 2;
          const offenders = [...document.body.querySelectorAll('*')].filter(el => {
            const style = getComputedStyle(el);
            if (style.position === 'fixed' || style.visibility === 'hidden' || style.display === 'none') return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > vw + 3 || r.left < -3);
          }).slice(0, 12).map(el => {
            const r = el.getBoundingClientRect();
            return { tag: el.tagName.toLowerCase(), className: typeof el.className === 'string' ? el.className.slice(0, 100) : '', left: Math.round(r.left), right: Math.round(r.right) };
          });
          const failed = [...document.images].filter(img => img.complete && img.naturalWidth === 0 && img.currentSrc);
          const brokenLocalImages = [], brokenRemoteImages = [];
          for (const img of failed) {
            const src = img.currentSrc || img.src;
            const local = new URL(src, location.href).origin === location.origin;
            (local ? brokenLocalImages : brokenRemoteImages).push(src);
          }
          return { overflow, offenders, brokenLocalImages, brokenRemoteImages };
        });
        if (width <= 390 && path === '') {
          // Probe only recognized semantic mobile navigation. Unknown implementations
          // are warnings, not false-positive failures.
          const candidates = page.locator('button[aria-controls],button[aria-expanded],summary').filter({ visible: true });
          const count = await candidates.count();
          if (count) {
            let exercised = false;
            for (let i = 0; i < Math.min(count, 10); i++) {
              const button = candidates.nth(i);
              const label = ((await button.getAttribute('aria-label')) || (await button.textContent()) || '').trim();
              const target = (await button.getAttribute('aria-controls')) || '';
              if (!/menu|navigation|導覽|選單|目錄|nav/i.test(label + ' ' + target)) continue;
              exercised = true;
              const before = await button.getAttribute('aria-expanded');
              await button.click({ timeout: 3000 });
              const after = await button.getAttribute('aria-expanded');
              const ok = before !== null ? before !== after : true;
              interactions.push({ name: 'mobile-navigation-toggle', ok, label });
              if (!ok) errors.push('Mobile navigation toggle did not update aria-expanded');
              const controls = await button.getAttribute('aria-controls');
              if (controls) {
                const panel = page.locator('[id="' + controls.replace(/[^a-zA-Z0-9_-]/g, '') + '"]');
                if (await panel.count() === 1 && !(await panel.isVisible())) errors.push('Mobile navigation panel did not become visible');
              }
              await button.press('Escape').catch(() => {});
              break;
            }
            if (!exercised) interactions.push({ name: 'mobile-navigation-toggle', skipped: 'No identifiable semantic toggle' });
          } else {
            interactions.push({ name: 'mobile-navigation-toggle', skipped: 'No semantic mobile toggle found' });
          }
          // Visible navigation links should remain keyboard-focusable and have destinations.
          navLinkFailures = await page.locator('nav a[href]').evaluateAll(els => els.filter(a => {
            const s = getComputedStyle(a), r = a.getBoundingClientRect();
            return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 &&
              (!a.href || a.getAttribute('href') === '#');
          }).map(a => a.textContent?.trim() || '[unnamed]'));
          if (navLinkFailures.length) errors.push('Visible navigation links have no destination: ' + navLinkFailures.join(', '));
          if (failOnSkippedNavigation && interactions.some(x => x.skipped)) errors.push('Mobile navigation could not be verified in strict mode');
        }
      } catch (error) { errors.push('BROWSER_QA: ' + error.message); }
      rows.push({ path: '/' + path, width, status, ...metrics, interactions, errors });
      await page.close();
    }
  }
  const failed = rows.filter(r => r.status !== 200 || r.overflow || r.brokenLocalImages.length || r.errors.length);
  const warnings = rows.filter(r => r.brokenRemoteImages.length || r.interactions.some(x => x.skipped));
  const report = { schemaVersion: 3, sourceCommit, configuredBase, discoveredPages: discovered.length, browserNotTested, checkedAt: new Date().toISOString(), viewportWidths: widths, pages: paths.length, total: rows.length, failed: failed.length, warnings: warnings.length, rows };
  writeFileSync(out + '/results.json', JSON.stringify(report, null, 2) + '\n');
  const lines=[
    '# 學員網站防跑版檢查結果',
    '',
    '來源版本：'+sourceCommit+'；部署 base：'+configuredBase,
    '瀏覽器抽樣頁數：'+paths.length+'／'+discovered.length+'；尺寸：'+widths.join(', ')+'px；失敗視圖：'+failed.length+'；提醒視圖：'+warnings.length,
    '',
    '自動化可偵測技術錯誤，但不能取代本人對排版、圖片焦點及內容的確認。',
    ''
  ];
  for(const row of failed){
    lines.push('## FAIL '+row.path+' @ '+row.width+'px');
    if(row.status!==200)lines.push('- HTTP: '+row.status+'；請確認輸出路由與部署 base');
    if(row.overflow)lines.push('- 水平溢出；優先檢查 Grid、固定寬度、min-width、長網址。元素：'+JSON.stringify(row.offenders.slice(0,5)));
    if(row.brokenLocalImages.length)lines.push('- 站內圖片無法載入：'+row.brokenLocalImages.join(', '));
    if(row.errors.length)lines.push('- 瀏覽器錯誤：'+row.errors.join('; '));
    lines.push('');
  }
  if(browserNotTested.length){lines.push('## NOT TESTED：未進行瀏覽器抽樣的頁面（由既有 Build / Verify 檢查路由）');for(const p of browserNotTested)lines.push('- /'+p);lines.push('');}
  if(warnings.length){
    lines.push('## WARN：人工確認事項');
    for(const row of warnings.slice(0,30))lines.push('- '+row.path+' @ '+row.width+'px：'+(row.brokenRemoteImages.length?'外部圖片 '+row.brokenRemoteImages.join(', '):'')+(row.interactions.some(x=>x.skipped)?'；無法識別手機導航切換方式':''));
    lines.push('');
  }
  lines.push('AI 修復指引：僅修正失敗頁面與對應元件，保留原內容、配色與版型；不可關閉測試或隱藏出錯元素。修復後重新執行 npm run build、npm run verify、npm run qa:responsive。');
  writeFileSync(out + '/REPORT.md',lines.join('\n')+'\n');
  console.log('Student responsive QA: ' + (rows.length - failed.length) + '/' + rows.length + ' passed; ' + warnings.length + ' warning views.');
  for (const r of failed) console.error('RESPONSIVE_FAIL', JSON.stringify(r));
  for (const r of warnings) console.warn('RESPONSIVE_WARN', JSON.stringify({ path: r.path, width: r.width, brokenRemoteImages: r.brokenRemoteImages, interactions: r.interactions }));
  if (failed.length) process.exitCode = 1;
} finally {
  await browser?.close();
  if(server.listening)await new Promise(resolveClose => server.close(resolveClose));
}
