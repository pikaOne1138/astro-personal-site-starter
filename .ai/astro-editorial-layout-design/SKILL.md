---
name: astro-editorial-layout-design
description: 為繁體中文知識型（部落格、專欄、教學、策展、聲音）與助人者（諮詢、陪伴、教練、團體）網站，設計「編輯式版面」的 Astro 首頁。當任務是設計或重構 Astro 網站的版面構圖、Hero、內容分區、列表、視覺節奏、CTA／信任資訊，或要驗收網站在 1440／1280／768／390 的實際畫面時使用。提供：十款成品逆向分析、40 個可建置的構圖配方、截圖驗收腳本與評分規則、AI 常見設計失敗清單。禁止把既有網站改色冒充新設計。
---

# Astro Editorial Layout Design

目標：讓你設計出**與十款參考站同等成熟度、但構圖全新**的 Astro 網站，且在四個寬度的**實際畫面**上通過驗收。
不是模板。不要「選一款改色」。

## 0. 證據標記（讀任何檔案前先懂）

| 標記 | 意義 |
|---|---|
| **[OBS]** | 從十款原始碼實際讀到的 class／CSS／數值 |
| **[MEAS]** | 用 `scripts/audit.mjs` 實測渲染結果 |
| **[INF]** | 從 OBS／MEAS 歸納的規律（可能有例外） |
| **[NEW]** | 本 Skill 額外建議（十款中不存在，通常比十款更嚴格） |
| **[DEFECT]** | 十款中實測到的缺陷 —— **反例，不要複製** |

引用時**不得把 [INF]／[NEW] 說成原始碼事實**。細節見 `references/00-evidence-legend.md`。

## 1. 硬規則（違反＝退回）

1. **不得只換配色／字體／圖片就當新站。** 8 個構圖旋鈕與最近 2 款至少 3 項不同（`checklists/diversity-check.md`）。
2. **`astro build` 通過 ≠ 完成。** 必須有四寬度（1440／1280／768／390）整頁截圖，**並用眼睛看**；腳本全綠仍可能壞（`references/03-ai-failure-modes.md` F16）。
3. **任何可讀文字 ≥ 12px；手機正文 ≥ 16px（中文 ≥ 15px）；觸控目標 ≥ 44px。** 十款每頁有 19–37 處 <12px，這是缺陷，不是風格。
4. **背景掛在根容器或滿版色帶（`padding-inline:max(gutter,(100% - wide)/2 + gutter)`），不要掛在 `max-width` 容器。**
5. **CJK 大標：`line-height ≥ 1.04`、`letter-spacing ≥ −.04em`；用詞組陣列＋`inline-block`＋`text-wrap:balance`，不要寫死 `<br/>`；末行 ≥ 2 字。**
6. **不編造**資格、見證、人數、療效、日期、價格；沒有就做成「待填」且畫面上可見。助人類網站必須有「適合／不適合」與緊急資源欄。
7. **持續動畫每頁 ≤ 1 個**，且必須尊重 `prefers-reduced-motion`；內容不可依賴 JS 才可見。
8. **每個設計決定要寫數值與結構理由**，不得只用形容詞（「精緻」「有呼吸感」）。

## 2. 工作流程（詳見 `references/04-workflow.md`）

```
1 需求理解 → 2 選版型方向 → 3 wireframe → 4 tokens+結構 → 5 Astro 實作 → 6 截圖檢查 → 7 修正 → 8 交付
```
| 步驟 | 產出 | 出口條件 |
|---|---|---|
| 1 | `brief.md`（含內容層級表） | 每個標題是具體主張；誠實限制已列 |
| 2 | `direction.md`（8 旋鈕＋與最近 2 款差異＋「為何適合」一句話） | 差異 ≥ 3 項 |
| 3 | `wireframe.md`（1440＋390 ASCII、欄比、手機重排規則） | 每區塊有配方 ID 與手機規則 |
| 4 | `tokens.css`（`--ed-*`），對比已算 | 無 CSS 也可讀 |
| 5 | `src/pages/*.astro` | `npm run build` 通過 |
| 6 | `node scripts/audit.mjs …` ＋ 看截圖 | 依 `checklists/visual-qa.md` |
| 7 | 結構性修正（欄比、斷行、順序、隱藏次要欄位） | 分數 ≥ 85（`checklists/scoring.md`） |
| 8 | `DECISIONS.md`＋截圖＋audit 報告 | 誠實列出未驗證項目 |

兩輪仍未達 85 分 → 回到步驟 3，不要只調 padding。

## 3. 怎麼選配方（`recipes/`）

| 要決定 | 讀 | 數量 | 程式 |
|---|---|---|---|
| Hero 構圖 | `recipes/heroes.md` | 12 | `recipes/code/heroes/` |
| 內容分區 | `recipes/sections.md` | 8 | `recipes/code/sections/` |
| 列表／目錄 | `recipes/lists.md` | 6 | `recipes/code/lists/` |
| 視覺節奏 | `recipes/rhythm.md` | 6 | `recipes/code/rhythm/` |
| CTA／信任資訊 | `recipes/cta-trust.md` | 8 | `recipes/code/cta-trust/` |

**選擇順序**：先答「這位站長要被怎樣信任？」→ 選 Hero → 選 2–3 個內容分區（不同隱喻）→ 選列表 → 選節奏 → 選 CTA／信任。
**用法**：把 `recipes/code/tokens.css` 的變數在你的站覆寫；把配方 `.astro` 複製到 `src/components/` 後**改結構與內容**（直接只換文字＝違反規則 1）。
所有配方元件以 `var(--ed-*, 後備值)` 讀取 tokens，不匯入 tokens 也能渲染。

## 4. 參考資料地圖（按需讀，不要一次全讀）

| 想知道 | 檔案 |
|---|---|
| 十款每一款的容器寬、grid 比例、hero、標題、留白、配色、圖片、節奏、互動、手機重排（含真實 class 與數值） | `references/site-analysis/01…10-*.md` |
| 十款共同遵守什麼／刻意不同什麼／共同犯什麼錯 | `references/01-cross-site-patterns.md` |
| 尺寸、字級、留白、色彩、動態的具體 token（OBS 範圍＋NEW 建議） | `references/02-design-tokens.md` |
| AI 常犯的 16 種設計失敗與偵測、修正 | `references/03-ai-failure-modes.md` |
| 十款實測原始資料 | `references/measurements/ten-sites-audit.json` |

## 5. 驗收（`checklists/`）

```bash
cd your-astro-project
npm i -D playwright-core && npx playwright install chromium     # 或 CHROME_PATH=…
npm run build && npm run preview -- --port 4321 &
node path/to/scripts/audit.mjs --base http://localhost:4321 --paths /,/about --out ./audit-out
```
- `visual-qa.md`：四寬度 × 12 類檢查（[A] 腳本、[V] 目視、[M] 手動）。
- `scoring.md`：100 分制＋5 道門檻（無截圖＝0 分；水平捲動上限 60；編造資格上限 50；只換配色上限 60）。
- `diversity-check.md`：十款的構圖指紋表與比對模板。
- 腳本輸出：`hScroll`、`spill`、`minFont`、`smallText`、`h1`（字級／行數／字距）、`body`（行長）、`images`、`touch`、`contrast`、`textOverlap`、`gaps`、reduced-motion 無限動畫數；結束碼 1＝有 FAIL。
- 腳本**抓不到**：孤字、構圖失衡、影像／漸層上的文字可讀性、圖像主體被裁、對齊軸過多。必須目視。

## 6. 範例（`examples/`）

`examples/` 是一個可建置的 Astro 專案：
- `src/pages/reading-almanac.astro`（閱讀年鑑：無圖年份＋12 月線格＋純 CSS 篩選＋深色年度之書帶）
- `src/pages/trust-path.astro`（信任路徑：橫向路線帶＋脊線五站＋比例時間尺）
- `src/pages/lab/*.astro`：40 個配方元件的實際渲染
- 各站 `brief.md`／`direction.md`／`wireframe.md`／`DECISIONS.md`／`screenshots/`：完整走過一次工作流程，含**實際發生的修正紀錄**。

## 7. 常用片段（皆已在四寬度驗證）

```astro
---
import Base from '../layouts/Base.astro';           // reset + focus-visible + skip link + reduced-motion
import H11 from '../../recipes/code/heroes/H11-numeral-index.astro';
import R02 from '../../recipes/code/rhythm/R02-band-alternation.astro';
import R05 from '../../recipes/code/rhythm/R05-voice-heading.astro';
---
<Base title="…" description="…" theme="--ed-paper:#f3efe6;--ed-accent:#0f5a5a">
  <H11 numeral="2026" title="這一年，我讀完了這些書。" />
  <R02 tone="dark"><R05 level={2} phrases={['如果只能留一本，']} voice="是這一本。" serif /></R02>
</Base>
```
- 深色帶：`R02 tone="dark"` 會重映射 `--ed-ink/--ed-ink-2/--ed-accent/--ed-line/--ed-paper`，子元件自動換淺字配色。
- 欄式分隔線：`gap:1px` ＋容器背景色＝線（避開 scoped `+` 特異性陷阱，F14）。

## 8. 已知限制（誠實）

- 十款網站是**原型**（內容為示意、無真實素材）；它們示範構圖，不示範內容策略。
- 閾值（12px、44px、行長、字級種類 ≤12…）為 [NEW] 建議，不是十款的屬性；十款依這些閾值會被扣分（見 `scoring.md` 末段）。
- 驗證只在 Chromium（Windows）執行；未測 Safari／Firefox／真機／螢幕閱讀器。字體為系統字體堆疊，換環境需重新截圖確認 CJK 斷行。
- 對比檢查略過背景圖／漸層上的文字與 `aria-hidden` 元素；文字疊壓為 bounding box 啟發式，需目視複核。