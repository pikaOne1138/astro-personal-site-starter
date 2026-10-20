import { chromium } from 'playwright';
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawn } from 'node:child_process';
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
const maxPages = 80;
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
  if (found.length > maxPages) throw Error('Student QA supports up to ' + maxPages + ' HTML pages; found ' + found.length + '. Split the audit explicitly instead of silently skipping pages.');
  return found;
}

const paths = discoverPages();
const server = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)],
  { stdio: 'ignore', env: { ...process.env, ASTRO_BASE_PATH: configuredBase } });
let browser;
const rows = [];
try {
  let ready = false;
  for (let i = 0; i < 45; i++) {
    try { const r = await fetch(origin + prefix); if (r.ok) { ready = true; break; } } catch {}
    await delay(400);
  }
  if (!ready) throw Error('Student Astro preview did not start; run npm run build first.');

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
  const report = { schemaVersion: 2, checkedAt: new Date().toISOString(), viewportWidths: widths, pages: paths.length, total: rows.length, failed: failed.length, warnings: warnings.length, rows };
  writeFileSync(out + '/results.json', JSON.stringify(report, null, 2) + '\n');
  console.log('Student responsive QA: ' + (rows.length - failed.length) + '/' + rows.length + ' passed; ' + warnings.length + ' warning views.');
  for (const r of failed) console.error('RESPONSIVE_FAIL', JSON.stringify(r));
  for (const r of warnings) console.warn('RESPONSIVE_WARN', JSON.stringify({ path: r.path, width: r.width, brokenRemoteImages: r.brokenRemoteImages, interactions: r.interactions }));
  if (failed.length) process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
