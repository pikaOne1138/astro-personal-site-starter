# Astro Editorial Layout Design Skill

給其他 AI Coding Agent 使用的設計 Skill：為繁體中文**知識型**與**助人者**網站設計「編輯式版面」的 Astro 首頁，並以四個寬度的實際畫面驗收。
資料來源：`astro-ten-site-directions` 專案的十款網站（Astro 原始碼、CSS）、其實測渲染與截圖。

> 目標不是重新產生那十款網站，而是提煉它們的**設計方法、構圖原則、實作技巧與驗收標準**，讓新網站達到同等成熟度、但構圖全新。

## 內容

```
astro-editorial-layout-skill/
├─ SKILL.md                      ← 入口：硬規則、工作流程、配方選擇、驗收
├─ README.md                     ← 本檔
├─ references/
│  ├─ 00-evidence-legend.md      ← [OBS]/[MEAS]/[INF]/[NEW]/[DEFECT] 標記與十款實測總表
│  ├─ 01-cross-site-patterns.md  ← 共同規則 vs 刻意差異 vs 共同缺陷；8 個構圖旋鈕
│  ├─ 02-design-tokens.md        ← 容器、字級、留白、色彩、動態的具體數值
│  ├─ 03-ai-failure-modes.md     ← 16 種 AI 設計失敗（偵測＋修正＋十款對照）
│  ├─ 04-workflow.md             ← 8 步工作流程與出口條件
│  ├─ site-analysis/01…10-*.md   ← 十款逐款逆向分析（真實 class、CSS 屬性、數值）
│  └─ measurements/ten-sites-audit.json   ← 十款 × 四寬度原始量測
├─ recipes/
│  ├─ heroes.md (12)  sections.md (8)  lists.md (6)  rhythm.md (6)  cta-trust.md (8)
│  └─ code/                      ← 40 個可建置的 Astro 元件 + tokens.css
├─ checklists/
│  ├─ visual-qa.md               ← 四寬度 × 12 類驗收清單
│  ├─ scoring.md                 ← 100 分制、門檻、計分表
│  └─ diversity-check.md         ← 十款構圖指紋；禁止「只有配色不同」
├─ scripts/audit.mjs             ← Playwright 截圖＋量測（溢出、字級、對比、觸控、疊壓…）
└─ examples/                     ← 可建置的 Astro 專案
   ├─ src/pages/reading-almanac.astro   + reading-almanac/{brief,direction,wireframe,DECISIONS}.md + screenshots/
   ├─ src/pages/trust-path.astro        + trust-path/{…}
   ├─ src/pages/lab/*.astro             ← 40 個配方的實際渲染
   └─ lab-audit/report.json
```

## 快速開始

### 看範例（需要 Node.js ≥ 22.19）
```bash
cd examples
npm install
npm run build
npm run preview -- --port 4400
# http://localhost:4400/reading-almanac/   http://localhost:4400/trust-path/   http://localhost:4400/lab/heroes/
```

### 驗收你自己的站
```bash
npm i -D playwright-core && npx playwright install chromium    # 或設定 CHROME_PATH
npm run build && npm run preview -- --port 4321
node scripts/audit.mjs --base http://localhost:4321 --paths /,/about --out ./audit-out
```
輸出 `audit-out/<頁>-<寬>.png`（1440／1280／768／390 整頁截圖）與 `report.json`；有 FAIL 時結束碼為 1。
**看完腳本結果後，必須實際看截圖**（孤字、構圖、影像上文字等腳本抓不到）。

### 在你的專案使用配方
1. 把 `recipes/code/tokens.css` 匯入並覆寫 `--ed-*`（色票、字體、gutter）。
2. 複製需要的 `recipes/code/**/*.astro` 到 `src/components/`，**改結構與內容**（只換文字／顏色會被 `diversity-check.md` 退回）。
3. 每個元件以 `var(--ed-*, 後備值)` 讀 tokens，未匯入 tokens 也能渲染；Props 都有示意預設值，Props 介面寫在檔案頂端。
4. 範例 layout `examples/src/layouts/Base.astro` 只含 reset、`:focus-visible`、skip link、reduced-motion。

## 三種資訊如何區分

| 類型 | 在哪裡 | 例 |
|---|---|---|
| **從十款原始碼實際觀察到的** | `site-analysis/*.md` 的 [OBS]／[MEAS]；`01-cross-site-patterns.md` 的「證據」欄 | `.fn-layout{grid-template-columns:78px minmax(0,1fr) 180px}`；h1 實測 129.6px |
| **從案例歸納的設計原則** | 標 [INF]，並寫支持案例數（N/10） | 「背景掛根容器」10/10；「雙聲標題」10/10 |
| **本 Skill 額外提出的建議** | 標 [NEW] | 12px 字級下限、44px 觸控、H11／H12 配方、`gap:1px` 線格、token 重映射 |

## 本 Skill 做過的驗證（以及沒做的）

**做過**
- 十款：`astro build` ＋ Playwright（Chromium 1200）四寬度 × 十頁，共 40 次量測與整頁截圖；逐款讀完全部原始碼。
- 40 個配方元件：全部渲染於 `examples` 的 lab 頁，四寬度 audit 無水平溢出、無文字疊壓、最小字級 12px、無對比失敗；逐一目視 Hero 配方，修正了開發中發現的多項問題（見各 `DECISIONS.md` 與 `03-ai-failure-modes.md` F14–F16）。
- 兩個新站（閱讀年鑑、信任路徑）依 8 步工作流程完成，audit 全綠，並附實際發生的修正紀錄。

**沒做**
- Safari／Firefox／真機／螢幕閱讀器。
- 十款並未被「正式評分」；`scoring.md` 末段只說明它們依本規則會在哪些類別被扣分。
- 沒有使用任何外部圖片素材；範例以 CSS／SVG 繪製視覺。

## 發現（十款的真實狀況）

- 優點：**40 次量測零水平捲動**、背景掛根容器、構圖語彙多樣、誠實佔位。
- 缺陷：**每頁 19–37 處 <12px 文字（最小 7.7–9.6px）**、手機觸控目標大量 <24px、CJK 大標 `letter-spacing −.07～−.11em` 造成字形接觸、手動 `<br/>` 產生孤字（田野筆記 390「解。」、清晰臨床 390「麼。」、長文書房 h2「案？」）、深色面板上 kicker 對比約 1.4:1。
  → 本 Skill 把這些列為「不要複製」，並以 [NEW] 閾值取代。

## 授權與資料

所有範例內容（書名、人物、費用、時段）皆為虛構示意；程式碼可自由用於你的專案。十款原始碼與圖片來自 `astro-ten-site-directions`，其素材授權見該專案的 `ASSET_SOURCES.md`（本包不含這些圖片）。