# 常見 AI 設計失敗（含偵測與修正）

格式：**症狀 → 為什麼會發生 → 怎麼偵測（可執行）→ 修正（CSS／結構）→ 十款對照**。
標記同 `00-evidence-legend.md`。偵測欄的指令都對應 `scripts/audit.mjs` 的輸出欄位，或需要看截圖。

---

## F01 過度使用三欄卡片

- **症狀**：Hero 之後立刻 `repeat(3,1fr)` 的三張等高卡片（圖示＋標題＋兩行字），整頁 3–4 組同結構。
- **原因**：卡片是最便宜的「看起來有組織」結構；模型把每組並列內容都轉成卡片。
- **偵測**：數 `grid-template-columns:repeat(3` 在頁面中出現次數 ≥ 3 → FAIL；或截圖看到連續 3 個區塊都是「同寬三格＋圓角＋陰影」。
  `rg "repeat\(3" src/pages/<page>.astro | wc -l`
- **修正**：同一組內容換列表隱喻（ledger／節點軸／目錄／日曆），見 `recipes/lists.md` L01–L06；
  三欄只在 ≤ 1 個區塊使用，且**用 1px 線分欄而非卡片**（co 的 `.co-how-row`＝[OBS]）。
- **十款對照**：九款首頁都沒有「三卡片陣列」；最接近的是 cg `.cg-people-grid`（等欄等高，靠底色＋頭像差異化，仍是 [DEFECT] 風險）與 co `.co-how-row`（線分欄，OK）。

## F02 制式 Hero（左文右圖／置中大標＋兩顆按鈕）

- **症狀**：左邊 h1＋副標＋「立即開始／了解更多」兩按鈕，右邊圖。
- **原因**：最常見的訓練資料模板。
- **偵測**：與 `recipes/heroes.md` 的 H01–H12 無一吻合；h1 ≤ 5vw；按鈕 ≥ 2 個並列；首屏沒有任何「這個人才有」的資訊。
- **修正**：選一個 Hero 配方並寫出**「為何這個構圖適合這位站長」一句話**；h1 ≥ 7vw；**1 個**主動作＋1 條低壓文字提示。
- **十款對照**：十款首屏的差別不在按鈕，在「圖與標題的關係」（A10/B）。

## F03 滿版但缺乏留白

- **症狀**：區塊 `width:100%` 無 gutter、文字貼邊、圖片撐滿但文字與圖片之間 <24px。
- **偵測**：`sections[i].left=0` 但其中有文字節點且父層 padding-inline <16px；390px 截圖文字距左右邊 <16px。
- **修正**：`padding-inline: var(--ed-gutter)`（`clamp(1rem,4vw,4rem)`）；滿版**色帶**用 padding-inline 而不是 max-width（so 的 `.so-practice` [OBS]）。
- **對照**：so 是十款唯一滿版，且每區塊都自己給 padding。

## F04 時間軸圓點壓文字

- **症狀**：垂直軸線用 `border-left` 或絕對定位 dot，文字 `padding-left` 不夠，圓點蓋到字。
- **偵測**：audit `textOverlap`；目視 390px 的軸線區。
- **修正**：**節點占獨立 grid 欄；軸線 `left = 欄寬/2`；節點 `z-index:1`**（`ll-track`＝[OBS]：`58px 1fr 78px`、`::before{left:27px}`）。見 `recipes/code/lists/L02-node-track.astro`。
- 手機：欄寬縮小時**同步更新 `left`**（ll 從 27→20 是 [OBS] 的手動同步；[NEW] 建議用 CSS 變數 `--node:54px; left:calc(var(--node)/2)`）。

## F05 字級缺乏比例

- **症狀**：h1 2.5rem、h2 2rem、h3 1.5rem、正文 1rem，每級 ×1.2–1.3，整頁「平」。
- **原因**：預設 type scale。編輯式頁面靠**極端對比**：大標 ≥ 7vw vs 標籤 12px。
- **偵測**：`distinctFontSizes` 少於 5 種且 h1/正文 < 4 倍；或相鄰層級比 <1.25。
- **修正**：至少 3 種「聲音」：超大標題（≥ 6.5vw）、中標題（2–3.3rem）、小標籤（12px mono 大寫）；h1 : 正文 ≥ 5:1。
- **對照**：十款 h1 : 正文 ≈ 6–12 倍（100–200px vs 16px）[MEAS]。但**字級種類 12–19 種過多**是反面問題（C7）。

## F06 背景被 max-width 裁切

- **症狀**：`<section class="max-w-6xl mx-auto bg-slate-900">` —— 背景只在中間一條，兩側露出頁面底色。
- **偵測**：audit `sections[]`：有 `bg` 的區塊 `width < vw` 且不是刻意的面板（沒有 gutter 對稱的卡片感）；目視 1440/1280 兩側色差。
- **修正**：兩種正解 [OBS]：①根背景＋內層 max-width；②色帶 `padding-inline:max(gutter,(100%-wide)/2)`。

## F07 過度動畫

- **症狀**：每個區塊 fade-up、卡片 tilt、按鈕磁吸、背景漂浮、視差。
- **偵測**：`document.getAnimations()` 中 `iterations===Infinity` 的數量；reduced-motion 下是否仍有動作；scroll 觸發的 reveal 區塊 >50%。
- **修正**：預算（`02-design-tokens.md` §8）：每頁 ≤ 1 個持續動畫；進場動畫只用在 hero；內容預設可見（不要 `opacity:0` 起始＋JS 才顯示）。
- **對照**：十款總共只有 2 個持續動畫（so-breathe、ra-pulse）[OBS]。

## F08 缺乏真實內容層級

- **症狀**：所有標題一樣大、說明都「高品質、專業、創新」、`Lorem ipsum`、假見證、假數字。
- **偵測**：每個區塊問：標題是否是具體主張？有沒有日期／時長／作者／範圍？是否出現「領先」「專業」「全方位」「賦能」等空詞。
- **修正**：先寫**內容層級表**（見 `04-workflow.md` 步驟 1）：每區塊的「主張／證據／下一步」。佔位內容要**可見地標示為佔位**（cg 的 `--`／`TBD`＝[OBS]）。
- **助人類**：禁止編造資格、療效、見證、人數（A17）。

## F09 Build 成功卻視覺失敗

- **症狀**：`astro build` 綠燈，但 390px 下 h1 孤字、nav 擠成兩行重疊、圖被裁掉主體、文字在圖上看不見。
- **原因**：build 只驗證語法與型別。
- **偵測**：必須跑 `scripts/audit.mjs` 並**實際看截圖**（四個寬度）。十款本身即例：build 全過，但 [MEAS] 每頁 19–37 處 <12px、手機觸控 <24px 5–11 個。
- **修正**：把截圖檢查寫入交付門檻（`checklists/scoring.md`：未附四寬度截圖＝0 分）。

## F10 以「換色」冒充「換版型」（本 Skill 的核心禁令）

- **症狀**：十頁共用同一個 grid／同一個 hero，只改 `--accent`、字體、圖片。
- **偵測（可執行）**：兩頁的「構圖指紋」相同——Hero 配方 ID、主 grid 欄比、列表配方 ID、分隔語彙、明度結構中 **≥ 5/8 個旋鈕相同** → FAIL。指紋表見 `checklists/diversity-check.md`。
- **修正**：重新選至少 3 個旋鈕（`01-cross-site-patterns.md` §E）。

## F11 裝飾元素用視窗百分比定位

- **症狀**：貼紙、印章、箭頭 `right:37%`，視窗一變就壓到文字（十款 C5）。
- **偵測**：audit `textOverlap`、目視四寬度。
- **修正**：把裝飾**放進它依附的 `figure`/容器內**，用 `inset-block-end`、`inset-inline-end` 相對該容器定位；手機直接 `display:none` 或改回文流。

## F12 孤字與 `<br/>` 硬斷行

- **症狀**：末行單字（「解。」「麼。」「案？」）。
- **偵測**：audit `h1.lines`、目視；或 `Range.getClientRects()` 取末行寬度 < 2em。
- **修正**：`text-wrap:balance`（標題）／`pretty`（段落）、用 `<span class="nw">不可斷詞組</span>`、縮小 `max-inline-size`；避免跨斷點都用同一組 `<br/>`。
- **對照**：fn 390、cl 390、es 1440 h2＝[DEFECT]。

## F13 小字當作「風格」

- **症狀**：全頁 mono 9–10px 大寫標籤，認為「編輯感」。
- **偵測**：audit `smallText.lt12`；目視手機。
- **修正**：12px 為下限；用「大寫＋字距＋顏色」製造層級，**而不是縮小**。
- **對照**：十款 100% 犯此問題（C1）——這是最重要的「不要從十款學」項目。

## F14 scoped CSS 特異性陷阱：`div + div` 的邊框無法被媒體查詢覆寫

- **症狀**：桌機 4 欄、手機 2 欄時，用 `li + li{border-left:…}` 做分隔線，再用媒體查詢 `li:nth-child(3){border-left:0}` 重設，**重設失效**，第 3 格仍有左線與左 padding。
- **原因**：Astro scoped CSS 會替每個複合選擇器加屬性選擇器：`.stats div + div` 編譯為 `.stats[data-astro-cid] div[data-astro-cid]+div[data-astro-cid]`（特異性 0,4,2），高於 `…div[data-astro-cid]:nth-child(3)`（0,4,1）。本 Skill 開發時 H11 即如此（`audit` 全綠，目視 390 才發現）。
- **偵測**：目視手機的欄式分隔線；`getComputedStyle(cell).borderLeftWidth`。
- **修正**：用 **`gap:1px` ＋ 容器背景色 ＝ 線格**（格子自帶底色）；padding 用 `:nth-child(2n+1)` 等同特異性選擇器重設。避免依賴 `+` 兄弟選擇器做可被覆寫的邊框。
- **十款對照**：十款同樣是 scoped，但 `.co-how-row article+article`、`.cu-object-row article+article` 在媒體查詢內是用**同一個 `+` 選擇器**重設（特異性相同、後者勝），所以沒中招。

## F15 元件只看視窗寬度，放進窄容器就壞

- **症狀**：同一個元件（如 C02 界線條）在整頁寬度正常，放進 46rem 內容欄後，資源欄被擠成「當地緊急電／話」。
- **原因**：媒體查詢只看視窗；容器變窄時版型不會切換。
- **偵測**：把元件放進 ≤ 46rem 與 ≤ 22rem 的容器各看一次（`examples/src/pages/trust-path.astro` 即為測試）。
- **修正**：內部用 `grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))` 這類「不看視窗」的寫法，或 `@container`；列內項目用 `display:grid` 上下排列而非 `space-between` 橫排。

## F16 audit 全綠 ≠ 視覺通過（本 Skill 開發中的 3 個實例）

| 實例 | audit 結果 | 實際畫面 |
|---|---|---|
| 信任路徑 390：header | hScroll=0、疊壓=0、觸控 0 | 品牌被擠成直排「路／徑」，導覽項被壓成 1–2 字寬 |
| 閱讀年鑑 390：計數條 | 全綠 | 2×2 的第 3 格仍有左線與縮排（F14） |
| 年鑑 1440：訂閱區 | 全綠 | 多出一條對齊軸（左緣 160px vs 118px） |

→ 驗收一律「腳本＋眼睛」，缺任一不算通過。