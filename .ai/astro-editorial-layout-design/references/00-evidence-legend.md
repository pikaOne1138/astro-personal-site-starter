# 證據標記與量測方法

本 Skill 所有論述都帶以下標記之一。**不要把 [INF]／[NEW] 當成原始碼事實引用。**

| 標記 | 意義 | 可信度 |
|---|---|---|
| **[OBS]** | 直接讀自十款原始碼（`src/pages/layouts/*/index.astro`、`src/layouts/DirectionLayout.astro`）。會附 class、CSS 屬性與數值。 | 事實 |
| **[MEAS]** | 用 `scripts/audit.mjs`（Playwright + Chromium 1200）在 `astro preview` 上於 1440／1280／768／390 實測的渲染結果。 | 事實（量測當下） |
| **[INF]** | 從 [OBS]/[MEAS] 歸納出的規律或設計原則。有可能是巧合，已標註支持它的案例數。 | 推論 |
| **[NEW]** | 本 Skill 額外提出的建議（含閾值、配方、驗收標準）。**十款原始碼中不存在或不遵守。** | 建議 |
| **[DEFECT]** | 在十款原始碼／畫面中實測到的缺陷。是「不要複製」的反例，不是準則。 | 事實（缺陷） |

## 十款來源檔案

| # | 名稱 | class 前綴 | 檔案 |
|---|---|---|---|
| 01 | 田野筆記 | `fn-` | `src/pages/layouts/field-notes/index.astro` |
| 02 | 長文書房 | `es-` | `src/pages/layouts/essayist/index.astro` |
| 03 | 學習實驗室 | `ll-` | `src/pages/layouts/learning-lab/index.astro` |
| 04 | 收藏者目錄 | `cu-` | `src/pages/layouts/curator/index.astro` |
| 05 | 聲音通信 | `ra-` | `src/pages/layouts/radio-letter/index.astro` |
| 06 | 清晰臨床 | `cl-` | `src/pages/layouts/clinician/index.astro` |
| 07 | 溫柔陪伴 | `co-` | `src/pages/layouts/companion/index.astro` |
| 08 | 身體與節律 | `so-` | `src/pages/layouts/somatic/index.astro` |
| 09 | 實作型教練 | `ma-` | `src/pages/layouts/coach/index.astro` |
| 10 | 共好工作室 | `cg-` | `src/pages/layouts/collective/index.astro` |

共用層 [OBS]：`src/layouts/DirectionLayout.astro` 只提供 reset（`box-sizing:border-box`、`img{display:block;max-width:100%}`）、
`body{min-width:320px;line-height:1.5}`、`:focus-visible{outline:3px solid #d34f38;outline-offset:4px}`、skip link、
`prefers-reduced-motion` 全域降速。**每款自己的 `<style>`（scoped，且是壓成單行的 CSS）決定其餘全部視覺。** 十款都沒有使用 Tailwind utility、
沒有共用元件、沒有共用 token 檔。

## 實測摘要 [MEAS]（1440px 視窗；`rem`=16px）

| # | h1 字級 | h1 行數 | h1 letter-spacing | h1 line-height | 全頁最小字級 | <12px 文字節點 | 頁高 |
|---|---|---|---|---|---|---|---|
| 01 田野筆記 | 129.6px (9vw) | 3 | −0.085em | 0.93 | 8.5px | 33 | 1915 |
| 02 長文書房 | 201.6px (14vw) | 2 | −0.100em | 0.82 | 9.6px | 19 | 1892 |
| 03 學習實驗室 | 122.4px (8.5vw) | 3 | −0.090em | 0.96 | 9.3px | 28 | 1798 |
| 04 收藏者目錄 | 129.6px (9vw) | 3 | −0.080em | 0.90 | 8.0px | 28 | 1416 |
| 05 聲音通信 | 100.8px (7vw) | 3 | −0.075em | 1.02 | 8.3px | 29 | 1838 |
| 06 清晰臨床 | 100.8px (7vw) | 3 | −0.070em | 1.02 | 8.5px | 30 | 2244 |
| 07 溫柔陪伴 | 97.9px (6.8vw) | 3 | −0.070em | 1.07 | 8.5px | 20 | 2375 |
| 08 身體與節律 | 158.4px (11vw) | 2 | −0.090em | 0.90 | 8.0px | 22 | 2201 |
| 09 實作型教練 | 172.8px (12vw) | 2 | −0.110em | 0.88 | 8.0px | 25 | 2384 |
| 10 共好工作室 | 100.8px (7vw) | 3 | −0.080em | 1.00 | 7.7px | 37 | 2488 |

390px 視窗：h1 落在 54.6–70.2px（14–18vw），行數 2–4（田野筆記 4 行，其餘 2–3 行）。

四種寬度 × 十頁 = 40 次量測：
- **水平捲動 `scrollWidth − clientWidth` 全部為 0；超出視窗的可見元素全部為 0。** 這是十款真正做到的紀律。
- **所有十款都有大量 <12px 文字（19–37 處）**，最小 7.7–9.6px。這是缺陷 [DEFECT]，本 Skill 不沿用。
- 390px 下可操作元素 <44px 者每頁 7–13 個，<24px 者每頁 4–11 個 [DEFECT]。
- reduced-motion 下仍在跑的無限動畫：0（`so-breathe`、`ra-pulse` 被 layout 的全域規則壓成 0.01ms）。

量測重現：`node scripts/audit.mjs --base http://localhost:4321 --paths /layouts/coach/`。
閾值如何對應扣分，見 `checklists/scoring.md`。

## 讀法

每份逐款分析（`site-analysis/NN-*.md`）依序是：**[OBS] 原始碼事實 → [MEAS] 實測 → [INF] 可重用原則 → [DEFECT] 不要複製 → [NEW] 改進建議**。