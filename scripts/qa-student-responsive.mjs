import { chromium } from 'playwright';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const config = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'));
const port = 4397;
const origin = 'http://127.0.0.1:' + port;
const base = '/' + String(process.env.ASTRO_BASE_PATH || config.base || '/').split('/').filter(Boolean).join('/');
const prefix = base === '/' ? '/' : base + '/';
const widths = [1440, 1280, 768, 390, 375];
const paths = [...new Set(['', ...(config.navigation || []).filter(n => n.enabled !== false).map(n => n.path || n.id + '/')])];
const safePaths = paths.filter(p => !p || /^(?:[a-z0-9-]+\/)*[a-z0-9-]+\/$/.test(p)).slice(0, 24);
const out = 'qa-artifacts/student-responsive';
mkdirSync(out, { recursive: true });
const server = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], { stdio: 'ignore' });
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
  for (const path of safePaths) {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      const url = origin + prefix + path;
      let status = null;
      let metrics = { overflow: false, offenders: [], brokenLocalImages: [], brokenRemoteImages: [] };
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        status = response?.status() ?? null;
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(250);
        metrics = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const overflow = document.documentElement.scrollWidth > vw + 2;
          const offenders = [...document.body.querySelectorAll('*')].filter(el => {
            const style = getComputedStyle(el);
            if (style.position === 'fixed' || style.visibility === 'hidden' || style.display === 'none') return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > vw + 3 || r.left < -3);
          }).slice(0, 12).map(el => ({
            tag: el.tagName.toLowerCase(),
            className: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
            right: Math.round(el.getBoundingClientRect().right),
            left: Math.round(el.getBoundingClientRect().left)
          }));
          const images = [...document.images].filter(el => !el.complete || el.naturalWidth === 0).map(el => el.currentSrc || el.src);
          const local = images.filter(src => { try { return new URL(src).origin === location.origin; } catch { return true; } });
          return { overflow, offenders, brokenLocalImages: local, brokenRemoteImages: images.filter(src => !local.includes(src)) };
        });
        const key = (path || 'home').replace(/[^a-z0-9-]/g, '-');
        await page.screenshot({ path: out + '/' + key + '-' + width + '.png', fullPage: true, animations: 'disabled', timeout: 15000 });
      } catch (error) { errors.push('NAVIGATION_OR_SCREENSHOT: ' + error.message); }
      rows.push({ path: '/' + path, width, status, ...metrics, errors });
      await page.close();
    }
  }
  const failed = rows.filter(r => r.status !== 200 || r.overflow || r.brokenLocalImages.length || r.errors.length);
  const warnings = rows.filter(r => r.brokenRemoteImages.length || (r.offenders.length && !r.overflow));
  const report = { schemaVersion: 1, checkedAt: new Date().toISOString(), viewportWidths: widths, total: rows.length, failed: failed.length, warnings: warnings.length, rows };
  writeFileSync(out + '/results.json', JSON.stringify(report, null, 2) + '\n');
  console.log('Student responsive QA: ' + (rows.length - failed.length) + '/' + rows.length + ' passed; ' + warnings.length + ' warning views.');
  for (const r of failed) console.error('RESPONSIVE_FAIL', JSON.stringify(r));
  for (const r of warnings) console.warn('RESPONSIVE_WARN', JSON.stringify({ path: r.path, width: r.width, brokenRemoteImages: r.brokenRemoteImages }));
  if (failed.length) process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
