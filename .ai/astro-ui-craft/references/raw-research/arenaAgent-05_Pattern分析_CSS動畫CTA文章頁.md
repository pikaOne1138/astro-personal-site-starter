# Pattern 分析（下）｜CSS 視覺系統＋小動畫＋CTA＋文章頁

## 四、CSS 視覺系統（Design Tokens）

> 來源：綜合 B12 陶土、B08 暖米霧藍、A04 紙色、A17 日系米白、B14 暖土、訴心理諮商所「靜謐棕＋絮語米＋千歲綠」取樣近似＋通用化。以下色票皆為「可直接寫進 CSS 變數」的建議值，對比度皆通過 WCAG AA（正文）。

### 通用基礎（兩模板共用）

```css
--radius-sm: 8px;   /* 標籤、按鈕小 */
--radius-md: 12px;  /* 卡片、輸入框 */
--radius-lg: 16px;  /* 大卡、Hero 圖 */
--radius-full: 999px; /* 頭像、pill 按鈕 */
--shadow-sm: 0 1px 2px rgba(41,39,36,.06);
--shadow-md: 0 4px 16px rgba(41,39,36,.08);
--shadow-lg: 0 12px 40px rgba(41,39,36,.12); /* 只用在 Hero／CTA 大版 */
--container: 1120px;      /* 首頁容器 */
--container-narrow: 720px; /* 文章容器（約 38–42 中文字寬） */
--section-gap: clamp(64px, 8vw, 112px); /* section 間距，手機自動縮 */
```

### 知識／部落格：4 套視覺方向

#### A-1｜Warm Editorial（主推・溫暖編輯風）靈感：A04＋B12＋A19
```css
--bg: #FAF7F1; --surface: #FFFFFF; --text: #292724; --muted: #706B64;
--accent: #A86D4B; --accent-hover: #8F5A3C; --border: rgba(41,39,36,.12);
--heading-font: "Fraunces", "Noto Serif TC", serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
卡片：白底＋1px 邊框＋`shadow-sm`，hover 上浮 4px＋`shadow-md`。中文標題建議 Noto Serif TC 700、內文 Noto Sans TC 400／17px／行高 1.9。

#### A-2｜Minimal Japanese（日系極簡）靈感：A17＋A10
```css
--bg: #FFFFFF; --surface: #F5F3EE; --text: #2B2B28; --muted: #8A877F;
--accent: #3E5C4B; /* 千歲綠 */ --accent-hover: #31493C; --border: rgba(43,43,40,.10);
--heading-font: "Zen Kaku Gothic New", "Noto Sans TC", sans-serif;
--body-font: "Noto Sans TC", sans-serif;
```
卡片：幾乎無卡片，用細線分隔＋大留白；圖片圓角小（8px）；動畫最慢（400ms）。

#### A-3｜Modern Knowledge（現代知識庫）靈感：A02＋A07
```css
--bg: #FFFFFF; --surface: #F6F7F9; --text: #16181D; --muted: #5B6472;
--accent: #2F6B4F; --accent-hover: #245741; --border: rgba(22,24,29,.10);
--heading-font: "Inter", "Noto Sans TC", sans-serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
卡片：淺灰底色塊卡＋分類色標籤；標籤色系統：每主題一色（最多 6 色，低飽和）。

#### A-4｜Dark Intellectual（深色知性・選配）靈感：B04＋A15 深色區
```css
--bg: #14120F; --surface: #1E1B16; --text: #EDE8DF; --muted: #A39C90;
--accent: #D9A441; /* 金 */ --accent-hover: #C08F33; --border: rgba(237,232,223,.14);
--heading-font: "Fraunces", "Noto Serif TC", serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
注意：深色只建議「整站原生深色」（如 B04），不要做切換器以免工作坊超時；中文深色內文一律 17px 以上、字重 400 不可更細。

### 助人者：4 套視覺方向

#### B-1｜Warm Therapeutic（主推・暖療癒）靈感：B12＋B08＋B10
```css
--bg: #F8F5EF; --surface: #FFFFFF; --text: #2E2A26; --muted: #7A736B;
--accent: #A86D4B; --accent-hover: #8F5A3C; --border: rgba(46,42,38,.12);
--heading-font: "Fraunces", "Noto Serif TC", serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
卡片：奶油底＋圓角 16px＋`shadow-sm`；見證卡用左側 accent 粗線＋斜體引言；按鈕全圓角 pill。

#### B-2｜Botanical Wellness（植物系）靈感：B09＋B14＋訴諮商所
```css
--bg: #F4F1E8; --surface: #FFFFFF; --text: #2C332C; --muted: #6F7A6E;
--accent: #4A6B4F; /* 鼠尾草深綠 */ --accent-hover: #3A563F; --border: rgba(44,51,44,.12);
--heading-font: "Newsreader", "Noto Serif TC", serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
卡片：白底＋綠色細線＋植物 SVG 角落裝飾（1–2 處即可，多了變罐頭）；適合女性／親子／芳療。

#### B-3｜Calm Clinical（沉靜專業・中性）靈感：B08＋B13
```css
--bg: #F7F6F4; --surface: #FFFFFF; --text: #23272E; --muted: #68707C;
--accent: #4A6FA5; /* 霧藍 */ --accent-hover: #3B5A87; --border: rgba(35,39,46,.12);
--heading-font: "Source Serif 4", "Noto Serif TC", serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
卡片：方正（圓角 8–12px）＋冷灰邊框；適合男性治療師／醫師／企業顧問；信任感最強。

#### B-4｜Spiritual Modern（現代靈性・深色）靈感：B04
```css
--bg: #1C1917; --surface: #292524; --text: #F5EFE6; --muted: #B8AA99;
--accent: #C9A227; /* 古金 */ --accent-hover: #A9861F; --border: rgba(245,239,230,.14);
--heading-font: "Cormorant Garamond", "Noto Serif TC", serif;
--body-font: "Inter", "Noto Sans TC", sans-serif;
```
卡片：深底＋金細線＋大圓角；只適合有高品質暗調攝影的學員，否則寧可選 B-1。工作坊列為「進階換膚」。

### 免費字體清單（全部 Google Fonts，可合法商用）

- 英文標題：Fraunces（編輯感首選）、Newsreader（柔和）、Source Serif 4（專業）、Cormorant Garamond（靈性）、Inter（現代無襯線）
- 中文標題：Noto Serif TC（宋體感・知性暖）、Noto Sans TC（黑體・現代）
- 中文內文：一律 Noto Sans TC；字級 16–18px、行高 1.8–2.0、字距 0.02–0.05em
- 禁區：中文不用圓體當內文、不用明體細字當小字、標題中英混排時英文一律小 0.9em＋基線對齊

---

## 五、精緻感小動畫

> 原則：單次 200–400ms、位移 ≤24px、只動 transform＋opacity（不觸發重排）、全部包 `prefers-reduced-motion`。

### 建議清單（按優先級）

| # | 效果 | 放哪裡 | 時間／easing／位移 | 手機 | 效能 | 初學者模板 | 純 CSS? |
|---|---|---|---|---|---|---|---|
| 1 | fade-up 進場 | 全站 section、人卡、見證 | 300ms／ease-out／16px | ✅ | 優 | ✅ 必做 | 需一點 JS（IntersectionObserver，給現成 snippet） |
| 2 | 導航毛玻璃＋陰影 | 滾動後的 nav | 200ms／ease／— | ✅ | 優 | ✅ 必做 | 需 5 行 JS（scroll class） |
| 3 | 卡片 hover 上浮 | 文章卡、服務卡 | 250ms／ease-out／-4px＋陰影加深 | ➖（無 hover，改 active 縮放 0.98） | 優 | ✅ 必做 | ✅ 純 CSS |
| 4 | 圖片 hover 微放大 | 封面圖、人像 | 400ms／ease-out／scale 1.03–1.05（overflow hidden） | ➖ 同上 | 優 | ✅ 必做 | ✅ 純 CSS |
| 5 | 連結底線動畫 | 導航文字鏈、內文連結 | 200ms／ease／scaleX 0→1 | ✅ | 優 | ✅ 必做 | ✅ 純 CSS |
| 6 | 按鈕箭頭滑動 | 主 CTA（→ 移動 4px） | 200ms／ease／4px | ✅ | 優 | ✅ 必做 | ✅ 純 CSS |
| 7 | 閱讀進度條 | 文章頁頂部 | 跟隨滾動／linear／— | ✅ | 良（需節流） | ✅ 建議 | 需少量 JS |
| 8 | 平滑錨點 | 目錄、FAQ 跳轉 | 500ms／ease-in-out | ✅ | 优 | ✅ 建議 | ✅ `scroll-behavior: smooth` |
| 9 | FAQ 手風琴 | FAQ 區 | 300ms／ease／grid-rows 動畫 | ✅ | 優 | ✅ 建議 | ✅ 可用 `<details>`＋CSS |
| 10 | 數字淡入／stagger | 見證、統計、卡片群 | 每項延遲 60–80ms | ✅ | 優 | ➖ 選配 | 需 JS（與 #1 同 snippet） |
| 11 | 引用高亮（marker） | 文章重點句 | 載入後 600ms 展開 | ✅ | 優 | ➖ 選配 | ✅ background-size 動畫 |
| 12 | Hero 圖片慢縮放 | Hero 背景（Ken Burns 極慢版） | 8–12s／linear／1.0→1.06 | ✅ | 良 | ➖ 選配（B 模板可用） | ✅ 純 CSS |
| 13 | 頁面切換過渡 | 整站換頁 | 200ms 淡入 | ✅ | 良 | ➖ 進階（Astro View Transitions） | Astro 原生 |
| 14 | 視差（subtle） | Hero 裝飾層 | 跟隨滾動／translateY ≤40px | ❌ 關閉 | 中 | ❌ 不建議新手 | 需 JS |

### 禁止清單（兩種模板都不做）

粒子、滿版視差、打字機（助人者尤其禁，便宜感）、3D 翻轉卡、游標特效、自動輪播（見證輪播改靜態三則；如需輪播必須可暫停＋手動）、loading 開場動畫（靜態站不需要演）。

### 無障礙鐵律（寫進模板 global.css）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  html { scroll-behavior: auto; }
}
```

---

## 六、CTA 研究

### 助人者：銷售感 vs 信任感（實際案例用語對照）

| 銷售感（不要用） | 出處類型 | 信任感（案例實際用語） | 出處 |
|---|---|---|---|
| 立即購買／立即預約 | 通用電商、罐頭模板 | 預約初談／預約免費諮詢 | B08 B10 B20 |
| 搶先報名／名額有限 | 微商課程頁 | Begin／從這裡開始 | B12／B01 B03 |
| 免費領取／點擊領取 | 內容農場 | 下載免費冥想／免費第一章 | B02／A01 B05 |
| 諮詢醫生／掛號 | 醫院系統 | 與我聊聊／看看是否適合你 | B04 B10 B18（篩選式表單） |
| 提交／送出 | 預設表單 | 送出預約申請（＋「我會在 24 小時內回覆」微文案） | B08 B20 概念綜合 |

**核心發現**：助人者 Top 10 的主 CTA 動詞只有 4 類——預約（Book）、開始（Begin／Start）、聊聊（Chat／Consult）、了解（Learn）。沒有一家用「購買」「搶購」「下單」。連 B18 這種轉換機器都用 Apply（申請）而非 Buy。

### 知識／部落格 CTA 三層

- **Primary**：訂閱電子報（全站唯一主 CTA；Hero＋文末＋頁尾前三處重複，文案微調不重複）
- **Secondary**：免費資源（新手包／電子書／模板／冥想；用鉛磁鐵承接「還不想訂閱」的人）
- **Low-pressure**：繼續閱讀（相關文章／主題分類／Start Here；讓路過者多留 3 分鐘）

### 助人者 CTA 三層

- **Primary**：預約初談（免費／低價；表單欄位 ≤5 格：姓名＋聯絡＋議題＋時段＋補充）
- **Secondary**：了解合作方式（流程＋費用＋FAQ；承接「還沒準備好」的人——B20 概念＋看見心理文案：「你不需要準備好，才能開始諮商」）
- **Low-pressure**：免費資源／測驗／文章（自我照顧測驗 B03／免費冥想 B02／衛教文 B08；把「只逛逛」變成名單）

### CTA 位置公式（兩模板共用）

導航右側（常駐）＋ 每個 section 末（情境式）＋ 頁尾前大版（總結式）＋ 行動版黏著條（B 模板）／文章文末框（A 模板）。同一頁主 CTA 文案必須完全一致（不要一處「預約初談」一處「立即諮詢」）。

---

## 七、文章頁研究

> 綜合 A01 A02 A04 A11 A12 A13 A15＋B08 B20 衛教文。Astro Content Collections 可全部原生支援。

### 規格建議（中文）

- 最大閱讀寬度：720px（約 38–42 字）；英文 65–75ch
- 字級：內文 17–18px、行高 1.85–2.0；H2 24–26px、H3 20–22px；引言 19–20px
- 標題比例：H1 : H2 : 內文 ≈ 2 : 1.4 : 1（H1 約 34–36px）
- 段落：每段 ≤4 行；每 300 字一個小標或視覺喘息點（引言／圖／分隔線）

### 元件：必備／加分／先不做

| 元件 | 分級 | 說明 |
|---|---|---|
| 標題＋發布日期＋更新日期＋閱讀時間 | ✅ 必備 | 更新日期對 SEO＋信任極重要（B20 衛教文標配） |
| 分類＋標籤 | ✅ 必備 | 分類單選、標籤多選；即 Topics 系統基礎 |
| 引言（lede）＋首段放大 | ✅ 必備 | 精緻感最便宜的來源 |
| 目錄 TOC（H2 層級） | ✅ 必備 | 桌面右側 sticky、手機可折疊置頂；Astro 可 remark 生成 |
| 作者框（照片＋一句＋連結） | ✅ 必備 | E-E-A-T＋轉換（連到 About／訂閱） |
| 相關文章 3 篇 | ✅ 必備 | 同分類優先；提高停留＋SEO 內鏈 |
| 上一篇／下一篇 | ✅ 必備 | 最簡單的留人設計 |
| 文末 Newsletter CTA 框 | ✅ 必備 | A01 A02 A16 B19 一致；文章頁轉換擔當 |
| 引用 Quote＋圖說 caption | ✅ 必備 | 純 CSS 即可，高級感立竿見影 |
| Callout／重點框 2–3 種 | ➕ 加分 | 重點／提醒／練習三色；Markdown container 或 Astro component |
| 閱讀進度條 | ➕ 加分 | 7 行 JS；長文體驗＋完成率 |
| Sticky 分享列 | ➕ 加分 | 複製連結＋LINE＋FB；台灣必有 LINE |
| 系列文導覽（Part 1/2/3） | ➕ 加分 | 系列完結率神器；A02 A03 愛用 |
| 圖片燈箱 | ➕ 加分 | Fuwari 有；可用 `<dialog>` 原生做簡版 |
| 程式碼區塊 | ➕ 加分（技術向才要） | 一般知識站不需要；助人者完全不需要 |
| 留言系統 | ⏳ 先不做 | Giscus／Disqus 皆可後加；先用「回信給我」代替（A01 做法：每期報尾問一個問題） |
| 全文搜尋 | ⏳ 先不做（進階） | A12 fuse.js 做法列 Day 2 選修；先用分類＋標籤 |
| 目錄雙層＋捲動高亮（scrollspy） | ⏳ 先不做 | 單層 TOC 已夠；高亮是精緻選配 |
| 付費牆／會員限定 | ⏳ 先不做 | 商業模式確定後再說；模板留「會員旗標」欄位即可 |
| Footnote／引用文獻 | ⏳ 視領域 | 心理／醫療衛教文建議要（信任）；一般先不做 |

### 文章頁線框（文字版）

```
[進度條]
麵包屑：首頁 / 主題 / 標題
分類 pill
H1 標題（34px）
引言段（20px 灰）
作者小列：[頭像] 姓名 · 日期 · 更新 · 5 分鐘 · [分享icon]
──────────────────
封面圖（可選）＋圖說
[TOC]（桌面右側 sticky／手機折疊）
正文 H2／H3／引言／圖／Callout／分隔線
──────────────────
標籤列
作者框（照片＋介紹＋訂閱小 CTA）
Newsletter 大框
相關文章 ×3
上一篇｜下一篇
```