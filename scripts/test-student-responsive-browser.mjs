import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const cases = [
    {
      label: 'valid responsive page',
      html: '<!doctype html><meta name="viewport" content="width=device-width"><style>body{margin:0}main{max-width:100%;box-sizing:border-box;padding:20px}h1{overflow-wrap:anywhere}</style><main><h1>這是一段很長很長但是能夠正常自動換行的中文網站標題</h1></main>',
      overflow: false
    },
    {
      label: 'fixed width regression',
      html: '<!doctype html><meta name="viewport" content="width=device-width"><style>body{margin:0}.broken{width:720px;height:100px;background:#ddd}</style><div class="broken"></div>',
      overflow: true
    },
    {
      label: 'unbreakable long text regression',
      html: '<!doctype html><meta name="viewport" content="width=device-width"><style>body{margin:0}pre{white-space:pre;width:max-content}</style><pre>https://example.invalid/' + 'A'.repeat(900) + '</pre>',
      overflow: true
    }
  ];
  for (const sample of cases) {
    await page.setContent(sample.html);
    const measured = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
    assert.equal(measured, sample.overflow, sample.label);
  }
  // Mobile interaction fixture: a semantic control must expose an operable panel.
  await page.setContent('<!doctype html><meta name="viewport" content="width=device-width"><button id="menu" aria-controls="links" aria-expanded="false">開啟選單</button><nav id="links" hidden><a href="/about/">關於</a></nav><script>document.querySelector("#menu").addEventListener("click",()=>{const b=document.querySelector("#menu"),n=document.querySelector("#links");n.hidden=!n.hidden;b.setAttribute("aria-expanded",String(!n.hidden));});</script>');
  await page.getByRole('button', { name: '開啟選單' }).click();
  assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('#links').isVisible(), true);
  // A wide article table without scroll containment is a real responsive regression.
  await page.setContent('<!doctype html><meta name="viewport" content="width=device-width"><style>body{margin:0}table{width:1100px}</style><main><table><tr><td>項目</td><td>內容</td></tr></table></main>');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2), true, 'uncontained wide table must be flagged');
  await page.setContent('<!doctype html><meta name="viewport" content="width=device-width"><img src="/missing-qa-fixture-image.png">');
  await page.waitForFunction(() => document.images[0].complete);
  assert.equal(await page.evaluate(() => document.images[0].naturalWidth === 0), true, 'broken image must be detectable');
  const runtimeErrors = [];
  page.on('pageerror', e => runtimeErrors.push(e.message));
  await page.setContent('<script>setTimeout(()=>{throw new Error("injected runtime failure")}, 0)</script>');
  await page.waitForTimeout(120);
  assert(runtimeErrors.some(e => e.includes('injected runtime failure')), 'runtime pageerror should surface');
  console.log('PASS: Responsive browser fixtures detect horizontal overflow, broken images and JS failures without rejecting fluid text.');
} finally {
  await browser.close();
}
