# Layout source audit｜PR #20

## Manus 原始程式移植：10 / 10

來源為使用者提供的 `astro-ten-site-directions.zip`。十款皆已**直接把 ZIP 中各自的 `.astro` HTML、scoped CSS、RWD 規則及頁內 JavaScript 移植**到獨立的 `src/pages/layouts/<slug>/index.astro`，另新增原始 `src/layouts/DirectionLayout.astro`。這不是以原圖猜測重新寫的版型。

| 頁面 | ZIP 原始目錄 | GitHub 目標 |
|---|---|---|
| field-notes | knowledge/field-notes.astro | layouts/field-notes/index.astro |
| essayist | knowledge/essayist.astro | layouts/essayist/index.astro |
| learning-lab | knowledge/learning-lab.astro | layouts/learning-lab/index.astro |
| curator | knowledge/curator.astro | layouts/curator/index.astro |
| radio-letter | knowledge/radio-letter.astro | layouts/radio-letter/index.astro |
| clinician | care/clinician.astro | layouts/clinician/index.astro |
| companion | care/companion.astro | layouts/companion/index.astro |
| somatic | care/somatic.astro | layouts/somatic/index.astro |
| coach | care/coach.astro | layouts/coach/index.astro |
| collective | care/collective.astro | layouts/collective/index.astro |

## 不可避免的路徑調整

- ZIP 的 `href="/directions/"` 改成 `import.meta.env.BASE_URL + 'layouts/'`，能適應 GitHub Pages 主站及 PR Preview 子路徑。
- 圖片仍使用 ZIP 原檔名，但**目前引用使用者已發布的 Manus 站點圖片**，不是自託管；製成離線交付模板時需把 ZIP 的 `public/images/directions/` 素材另行放入專案。
- `radio-letter` 的來源音檔 `/audio/demo-episode.mp3` 暫引用 Manus 演示站的公開音檔網址。遠端實際播放仍需瀏覽器測試。
- 「十種」比較入口文案調整成十二種。其他頁面編排、原始 CSS selector 與互動不以新造的通用版型取代。
- 兩款 Claude 延伸版型 `reading-atlas`、`trust-path` **沒有在 Manus ZIP 中對應的原始頁**，依研究獨立實作。它們與十個移植版型來源不同。

## 已完成的機器驗證

- GitHub Actions：Astro / Pagefind 建置成功。
- 直接核對已部署 `gh-pages` 上 10 個 PR Preview HTML，均具有來源中的原始 `fn-/es-/ll-/cu-/ra-/cl-/co-/so-/ma-/cg-` class，均無 `item.slug===` 漏出，回連包含 `/pr-preview/pr-20/layouts/`，且 HTML 含樣式與示範圖片。
- 舊的兩份手工仿製 CSS `learning-lab-source.css`、`companion-source.css` 已刪除，避免混用。

## 尚未驗證，合併前仍需處理

- 1440px 與 390px 實際瀏覽器全頁截圖，同尺寸和原始站逐一比較。
- 十款遠端圖片載入成功與 `radio-letter` 遠端音訊確實可播放。
- 觸控、Tab 操作、`prefers-reduced-motion` 和無橫向卷軸。
- Claude 的兩款新創版型另行驗證，不誤稱 Manus 原始移植。

**原始碼移植已完成。視覺逐頁驗收仍進行中。PR #20 未合併。**
