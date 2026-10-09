# 09 實作型教練 `ma-`（助人／行動教練）

來源：`src/pages/layouts/coach/index.astro`

## [OBS] 原始碼事實

**容器**：`.ma-site{padding:0 clamp(1rem,4vw,4rem);background:var(--ma-paper)}`（`#f1eadb`）；內層一律 `max-width:1320px`。
Header `border-bottom:2px solid var(--ma-ink)`；`.ma-problem` 上下各 `2px solid var(--ma-ink)`；`.ma-bottom` `border-bottom:2px`。**粗線＝章節邊界（與 03 同法）**。
配色：墨 `#151d38`、鈷藍 `#2148d8`、橘紅 `#ee6846`、紙 `#f1eadb`；步驟卡色 `#d8deee`／`#f7c7a6`／`#d7dfb9`（藍/橘/綠的淡色版）。

**Hero 構圖：海報式封面**
- `.ma-cover{position:relative;min-height:650px;overflow:hidden;padding:2rem 0 5rem}`；
- 頂部標籤列 `.ma-cover-label{display:flex;justify-content:space-between}`（期號／日期 mono）；
- `h1{font-size:clamp(5rem,12vw,11rem);line-height:.88;letter-spacing:-.11em;margin:4rem 0 1rem;z-index:2}`，第二行 `<i style normal>` 鈷藍；**粗體 Arial（無 weight 覆寫→h1 預設 bold）**；
- 圖 `figure{position:absolute;right:1%;top:16%;width:34%;transform:rotate(3deg)}`，`img{border:3px solid var(--ma-ink);box-shadow:12px 12px 0 var(--ma-orange)}`；
- `.ma-cover-bottom{margin-left:8vw;display:flex;align-items:end;gap:3rem}`；
- 箭頭 `.ma-arrow-mark{position:absolute;right:37%;bottom:10%;font-size:3.5rem;color:var(--ma-orange);transform:rotate(18deg)}` 指向下一節。
[MEAS] 1440：h1 172.8px，2 行，寬 1320（整欄）。

**階梯式步驟（斜向構圖）**
`.ma-steps{grid-template-columns:repeat(3,1fr);gap:.8rem;align-items:start}`；
`.ma-step{min-height:260px;border-top:8px solid var(--ma-blue)}`；`.ma-step--two{margin-top:2rem}`、`.ma-step--three{margin-top:4rem}` → **每張卡下沉 2rem，形成 0／32／64px 的階梯**，三色（藍/橘/綠）。
每張是 `<details>`（第一張 `open`），數字 `b{position:absolute;right:.7rem;bottom:.4rem;font-size:3rem;opacity:.2}` 作浮水印，`summary::after{content:"＋"}`/`[open]` 為 `"−"`。

**深色帶**：`.ma-work{background:var(--ma-ink);color:#fff;grid-template-columns:.85fr 1.15fr;gap:6vw}`；h2 內 `<i>` 切 `Georgia,serif` ＋ `#ff9d77`（雙聲）。
**收尾 CTA 是一個超大字標題而非按鈕**：`.ma-bottom h2{font-size:clamp(2.7rem,7vw,6rem);line-height:.86;letter-spacing:-.1em;color:var(--ma-blue)}`，`grid-template-columns:1fr 1.2fr auto`。

**按鈕**：`.ma-nav-cta{background:var(--ma-blue);color:#fff;box-shadow:4px 4px 0 var(--ma-orange)}`。

**手機**：≤850 hero 圖 `top:24%;width:38%`、`.ma-cover-bottom{margin-left:1rem}`；≤560：圖改 `position:relative;width:76%;margin:2rem 0 0 auto`、**階梯 margin 全歸零**（`.ma-step,.ma-step--two,.ma-step--three{margin:0;min-height:190px}`）、步驟單欄、`h1{font-size:16vw}`。

## [MEAS]
- h1 172.8px ×2，lh .88、ls −.11em；整頁 2384px。
- **textOverlap：每個寬度都有 `h3 × b`（步驟標題與浮水印數字）**—— 浮水印為刻意重疊；但 768 另有 `a × span.ma-arrow-mark`。
- 對比：`.ma-arrow-mark` 2.62（裝飾）。最小字級 8.0px，<12px 25 處。

## [INF] 可重用原則
1. **「大」靠比例**：h1 ≥ 12vw、weight 900 ＋ 黑與一個飽和色兩行；周圍留白不減。
2. 斜向／階梯構圖：用 `margin-top` 差 2rem 的規律遞增，而非隨機偏移；手機歸零。
3. 結尾 CTA 以超大字做視覺終點，按鈕只是附屬。
4. 「硬陰影＋粗邊框」與 03 同源，但色彩關係不同（橘影配藍）→ **手法可重用、配色不可重用**。
5. 步驟用 `<details>`：鍵盤、螢幕閱讀器原生可用，零 JS。

## [DEFECT]
- **CJK 在 `letter-spacing:-.11em`＋`line-height:.86–.88` 下，兩行字形互相接觸**（見 `orig/…coach-1440.png`「先找到／下一個動作」與 hero 兩行）。
- `.ma-step p` 在 `<details>` 關閉時不可見，但卡片仍有 `min-height:260px`，造成「空盒子」觀感（02、03 號卡片）。
- `.ma-nav-cta{font-size:.65rem}`（10.4px）的主按鈕；390：`.56rem`。
- 浮水印數字 `opacity:.2` 與標題重疊，掃描工具判為文字疊壓。

## [NEW]
- 保留粗體 CJK 大標，但 line-height ≥ 1.0、letter-spacing ≥ −.04em。
- `details` 未展開時 `min-height:0`。