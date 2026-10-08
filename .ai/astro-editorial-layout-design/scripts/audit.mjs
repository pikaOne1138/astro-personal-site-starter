#!/usr/bin/env node
/**
 * audit.mjs — 視覺驗收量測腳本（Astro Editorial Layout Design Skill）
 *
 * 用途：對一組 URL 在 1440 / 1280 / 768 / 390 四種寬度截圖，並量測
 *   水平溢出、元素超出視窗、最小字級、h1 字級與行數、行長、圖片變形、
 *   觸控目標、文字對比、文字疊壓、reduced-motion 下的無限動畫。
 *
 * 安裝（在你的 Astro 專案內）：
 *   npm i -D playwright-core && npx playwright install chromium
 *   # 或設定 CHROME_PATH 指向既有 Chrome/Edge
 *
 * 執行：
 *   node audit.mjs --base http://localhost:4321 --paths /,/about --out ./audit-out
 *   node audit.mjs --base http://localhost:4321 --paths /directions/care/coach/ --widths 1440,390
 *
 * 輸出：<out>/<slug>-<width>.png（整頁截圖）、<out>/report.json、終端機摘要表。
 * 結束碼：有任何 FAIL 級問題 → 1；僅 WARN → 0。
 *
 * 判定閾值為本 Skill 的「建議值」（見 checklists/scoring.md），並非原始碼觀察。
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : 'true']);
    return acc;
  }, [])
);
const base = (args.base || 'http://localhost:4321').replace(/\/$/, '');
const paths = (args.paths || '/').split(',');
const widths = (args.widths || '1440,1280,768,390').split(',').map(Number);
const out = args.out || './audit-out';
const heightFor = (w) => (w >= 1280 ? 900 : w >= 768 ? 1024 : 844);
mkdirSync(out, { recursive: true });

// 從「目前工作目錄」與「腳本所在目錄」依序解析 playwright / playwright-core（腳本可放在任何位置）
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
async function loadChromium() {
  for (const pkg of ['playwright', 'playwright-core']) {
    for (const base of [process.cwd() + '/', import.meta.url]) {
      try { const m = await import(pathToFileURL(createRequire(base).resolve(pkg)).href); const c = m.chromium ?? m.default?.chromium; if (c) return c; } catch { /* 試下一個 */ }
    }
  }
  console.error('找不到 playwright 或 playwright-core：請在專案內執行 npm i -D playwright-core'); process.exit(2);
}
const chromium = await loadChromium();
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });

/** 在頁面內執行的量測函式 */
function measure() {
  const vw = document.documentElement.clientWidth;
  const px = (v) => parseFloat(v) || 0;
  const sel = (el) => {
    if (!el || !el.tagName) return '';
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const c = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (c.length) s += '.' + c.join('.');
    return s;
  };
  const visible = (el) => {
    // 收合的 <details> 內容在 Chromium 仍有 bounding rect（content-visibility:hidden），但並未繪製 → 視為不可見
    const d = el.closest('details');
    if (d && !d.open && !el.closest('summary')) return false;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0;
  };
  // 解析顏色 → [r,g,b,a]
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 0];
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  };
  const over = (top, bot) => {
    const a = top[3];
    return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1];
  };
  const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const effBg = (el) => {
    // 自下而上疊加背景；遇到背景圖/漸層則回報 null（需人工看截圖）
    const stack = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return null;
      const c = parse(cs.backgroundColor);
      if (c[3] > 0) stack.push(c);
      if (c[3] === 1) break;
      n = n.parentElement;
    }
    let acc = [255, 255, 255, 1];
    for (let i = stack.length - 1; i >= 0; i--) acc = over(stack[i], acc);
    return acc;
  };

  const res = { vw };
  const de = document.documentElement;
  res.hScroll = de.scrollWidth - de.clientWidth;
  res.pageHeight = de.scrollHeight;

  // 1. 超出視窗右緣的可見元素（排除被祖先 overflow 裁切的）
  const clipped = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const o = getComputedStyle(n).overflowX;
      if (o === 'hidden' || o === 'auto' || o === 'scroll' || o === 'clip') return true;
    }
    return false;
  };
  const spill = [];
  document.querySelectorAll('body *').forEach((el) => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !clipped(el)) spill.push(`${sel(el)} L${Math.round(r.left)} R${Math.round(r.right)}`);
  });
  res.spill = spill.slice(0, 8);
  res.spillCount = spill.length;

  // 2. 文字葉節點：字級、對比、行長
  const textEls = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || seen.has(el) || !visible(el) || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) continue;
    seen.add(el);
    textEls.push(el);
  }
  const sizes = textEls.map((el) => ({ el, fs: px(getComputedStyle(el).fontSize) }));
  res.textElCount = textEls.length;
  res.minFont = Math.min(...sizes.map((s) => s.fs));
  res.smallText = {
    lt11: sizes.filter((s) => s.fs < 11).length,
    lt12: sizes.filter((s) => s.fs < 12).length,
    lt14: sizes.filter((s) => s.fs < 14).length,
  };
  res.smallTextSamples = sizes.filter((s) => s.fs < 11).slice(0, 4).map((s) => `${sel(s.el)} ${s.fs.toFixed(1)}px`);
  // 字級種類（四捨五入到 0.5px）
  res.distinctFontSizes = [...new Set(sizes.map((s) => Math.round(s.fs * 2) / 2))].sort((a, b) => a - b);

  // 對比（跳過背景圖）
  const lows = [];
  let skipped = 0;
  textEls.forEach((el) => {
    if (el.closest('[aria-hidden="true"]')) return; // 純裝飾文字（aria-hidden）不計對比
    const cs = getComputedStyle(el);
    const bg = effBg(el);
    if (!bg) { skipped++; return; }
    const fg = over(parse(cs.color), bg);
    const cr = ratio(fg, bg);
    const fs = px(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const large = fs >= 24 || (fs >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (cr < need) lows.push({ s: sel(el), cr: +cr.toFixed(2), need, fs: +fs.toFixed(1), t: el.textContent.trim().slice(0, 14) });
  });
  res.contrastFail = lows.length;
  res.contrastSamples = lows.slice(0, 5);
  res.contrastSkippedImageBg = skipped;

  // 3. h1
  const h1 = document.querySelector('h1');
  if (h1) {
    const cs = getComputedStyle(h1);
    const r = h1.getBoundingClientRect();
    const fs = px(cs.fontSize);
    const lh = cs.lineHeight === 'normal' ? fs * 1.2 : px(cs.lineHeight);
    res.h1 = {
      fontSize: +fs.toFixed(1), lineHeightRatio: +(lh / fs).toFixed(2), letterSpacingEm: +(px(cs.letterSpacing) / fs).toFixed(3),
      width: Math.round(r.width), height: Math.round(r.height), lines: Math.round(r.height / lh),
      vwRatio: +(fs / vw).toFixed(3), family: cs.fontFamily.split(',')[0],
    };
  }

  // 4. 正文行長（字元數）：取最長的 p
  let best = null;
  document.querySelectorAll('p').forEach((p) => {
    if (!visible(p)) return;
    const cs = getComputedStyle(p);
    const txt = p.textContent.trim();
    if (txt.length < 40) return;
    const w = p.getBoundingClientRect().width;
    const fs = px(cs.fontSize);
    const cjk = (txt.match(/[㐀-鿿]/g) || []).length / txt.length > 0.4;
    const cpl = cjk ? w / fs : w / (fs * 0.5);
    if (!best || txt.length > best.len) best = { s: sel(p), len: txt.length, widthPx: Math.round(w), fs: +fs.toFixed(1), lh: +(px(cs.lineHeight) / fs || 0).toFixed(2), approxCharsPerLine: Math.round(cpl) };
  });
  res.body = best;

  // 5. 圖片：渲染比例 vs 自然比例
  res.images = [...document.images].filter(visible).map((img) => {
    const r = img.getBoundingClientRect();
    const cs = getComputedStyle(img);
    const nat = img.naturalWidth / img.naturalHeight;
    const ren = r.width / r.height;
    return { s: sel(img), nat: +nat.toFixed(2), rendered: +ren.toFixed(2), fit: cs.objectFit, distort: cs.objectFit === 'fill' && Math.abs(nat - ren) / nat > 0.03, w: Math.round(r.width) };
  });

  // 6. 觸控目標
  // 目標：連結、按鈕、summary、表單控制項；label 只在包住控制項時才算（避免 <label for> 小標籤誤報）；
  // 被 label 包住的 checkbox/radio 以 label 的面積為準。
  const targets = [...document.querySelectorAll('a[href],button,summary,input,select,textarea,label')].filter(visible).filter((el) => {
    if (el.tagName === 'LABEL') return !!el.querySelector('input,select,textarea');
    if (el.tagName === 'INPUT' && /checkbox|radio/.test(el.type) && el.closest('label')) return false;
    return true;
  });
  const small = targets.filter((el) => {
    const r = el.getBoundingClientRect();
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') {
      // 行內文字連結：WCAG 2.5.8 例外，不計
      return false;
    }
    return r.height < 24 || r.width < 24;
  });
  const under44 = targets.filter((el) => {
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') return false;
    const r = el.getBoundingClientRect();
    return r.height < 44 || r.width < 44;
  });
  res.touch = { total: targets.length, lt24: small.length, lt44: under44.length, samples: under44.slice(0, 5).map((e) => `${sel(e)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`) };

  // 7. 文字疊壓（啟發式：兩個不互為祖孫的文字元素外框交集 > 30% 較小者）
  const rects = textEls.map((el) => ({ el, r: el.getBoundingClientRect() })).filter((o) => o.r.width > 4 && o.r.height > 4);
  const overlaps = [];
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const ix = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const iy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (ix > 2 && iy > 2) {
        const inter = ix * iy;
        const small = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
        if (inter / small > 0.3) overlaps.push(`${sel(a.el)} × ${sel(b.el)}`);
      }
    }
  }
  res.textOverlap = overlaps.length;
  res.textOverlapSamples = overlaps.slice(0, 4);

  // 8. 主要區塊的左右邊界（背景被 max-width 裁切檢查：有背景色的區塊寬度應 == 視窗或明確為卡片）
  const main = document.querySelector('main') || document.body;
  res.sections = [...main.children].filter(visible).slice(0, 14).map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { s: sel(el), left: Math.round(r.left), width: Math.round(r.width), bg: cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? cs.backgroundColor : '', py: `${px(cs.paddingTop)}/${px(cs.paddingBottom)}` };
  });
  // 頁面底色與視窗右緣之間是否露出 body 預設底色
  const probe = document.elementFromPoint(vw - 2, Math.min(300, innerHeight - 2));
  res.rightEdgeElement = sel(probe);

  // 9. 垂直節奏：main 子區塊之間的間距（上一個 bottom 到下一個 top）
  const kids = [...main.children].filter(visible);
  res.gaps = kids.slice(1).map((el, i) => Math.round(el.getBoundingClientRect().top - kids[i].getBoundingClientRect().bottom));
  return res;
}

function grade(m, w) {
  const f = [], wn = [];
  if (m.hScroll > 0) f.push(`水平捲動 +${m.hScroll}px`);
  if (m.spillCount > 0) f.push(`${m.spillCount} 個元素超出視窗：${m.spill.slice(0, 2).join('; ')}`);
  if (m.textOverlap > 0) (m.textOverlap > 2 ? f : wn).push(`文字疊壓 ${m.textOverlap}：${m.textOverlapSamples.slice(0, 2).join('; ')}`);
  if (m.contrastFail > 0) wn.push(`對比不足 ${m.contrastFail}（例 ${m.contrastSamples.slice(0, 2).map((c) => `${c.s}:${c.cr}`).join(', ')}）`);
  if (m.smallText.lt11 > 0) wn.push(`<11px 文字 ${m.smallText.lt11} 處`);
  if (m.smallText.lt12 > 0 && w <= 768 && m.smallText.lt12 - m.smallText.lt11 > 0) wn.push(`11–12px 文字 ${m.smallText.lt12 - m.smallText.lt11} 處`);
  if (m.images.some((i) => i.distort)) f.push('圖片被拉伸（object-fit: fill 且比例不符）');
  if (m.h1 && w <= 480 && m.h1.lines > 5) wn.push(`手機 h1 ${m.h1.lines} 行`);
  if (m.h1 && m.h1.width > w) f.push('h1 比視窗寬');
  if (m.touch.lt24 > 0 && w <= 768) f.push(`觸控目標 <24px：${m.touch.lt24}`);
  else if (m.touch.lt44 > 0 && w <= 768) wn.push(`觸控目標 <44px：${m.touch.lt44}`);
  if (m.body && w >= 1280 && m.body.approxCharsPerLine > 45 && m.body.fs < 20) wn.push(`正文行長約 ${m.body.approxCharsPerLine} 字`);
  return { fail: f, warn: wn };
}

const report = [];
let anyFail = false;
for (const p of paths) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: heightFor(w) }, deviceScaleFactor: 1, hasTouch: w <= 768, isMobile: w <= 480 });
    const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await page.waitForTimeout(400);
    const slug = (p.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home') + '-' + w;
    await page.screenshot({ path: join(out, slug + '.png'), fullPage: true });
    const m = await page.evaluate(measure);
    const g = grade(m, w);
    if (g.fail.length) anyFail = true;
    report.push({ path: p, width: w, ...g, metrics: m });
    await ctx.close();
  }
  // reduced-motion 檢查（只在最寬視窗跑一次）
  const ctx = await browser.newContext({ viewport: { width: widths[0], height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + p, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const anim = await page.evaluate(() => document.getAnimations().filter((a) => {
    const t = a.effect && a.effect.getComputedTiming();
    return t && (t.iterations === Infinity) && t.duration > 50;
  }).length);
  report.push({ path: p, width: 'reduced-motion', infiniteAnimationsRunning: anim });
  if (anim > 0) console.log(`  ! ${p} reduced-motion 下仍有 ${anim} 個無限動畫`);
  await ctx.close();
}
await browser.close();
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 2));

console.log('\npath'.padEnd(34) + 'w'.padEnd(6) + 'hScroll spill h1(px/lines/ls) minFont lt12 overlap contrast touch<44  FAIL / WARN');
for (const r of report) {
  if (r.width === 'reduced-motion') continue;
  const m = r.metrics;
  const h1 = m.h1 ? `${m.h1.fontSize}/${m.h1.lines}/${m.h1.letterSpacingEm}` : '-';
  console.log(
    r.path.padEnd(33) + String(r.width).padEnd(6) + String(m.hScroll).padEnd(8) + String(m.spillCount).padEnd(6) + h1.padEnd(18) +
    String(m.minFont.toFixed(1)).padEnd(8) + String(m.smallText.lt12).padEnd(5) + String(m.textOverlap).padEnd(8) + String(m.contrastFail).padEnd(9) + String(m.touch.lt44).padEnd(8) +
    (r.fail.length ? 'FAIL ' + r.fail.join(' | ') : '') + (r.warn.length ? ' WARN ' + r.warn.length : '')
  );
}
console.log(`\n報告：${join(out, 'report.json')}  截圖：${out}`);
process.exit(anyFail ? 1 : 0);