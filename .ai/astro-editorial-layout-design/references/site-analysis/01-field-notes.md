# 01 田野筆記 `fn-`（知識／研究者）

來源：`src/pages/directions/knowledge/field-notes.astro`

## [OBS] 原始碼事實

**容器**
- 根容器 `.fn-site{padding:0 clamp(1rem,4vw,4rem)}`，**背景色 `--fn-paper:#f1eee4` 掛在根容器**（所以任何內層 `max-width` 都不會裁掉背景）。
- 內層各自限寬並 `margin:0 auto`：`.fn-layout{max-width:1360px}`、`.fn-ledger{max-width:1150px}`、`.fn-question{max-width:1150px}`。
  → [MEAS] 1440 視窗下 header/footer 左緣 58px、寬 1325；ledger/question 左緣 145px、寬 1150。**同一頁有兩種內容寬（1325 與 1150），形成階梯。**

**Grid**
- Hero 三欄：`.fn-layout{display:grid;grid-template-columns:78px minmax(0,1fr) 180px;gap:clamp(1.2rem,4vw,4rem);padding:3rem 0 5rem}`；左欄是直排索引 `.fn-rail`（`writing-mode:vertical-rl`），右欄是邊注 `.fn-margin`。
- Ledger：`.fn-ledger{grid-template-columns:.7fr 1.3fr;gap:3rem}`；每列 `.fn-ledger li{grid-template-columns:58px 1fr auto}`（日期｜標題＋副標｜類型標籤）。
- `.fn-question{grid-template-columns:.7fr 1.3fr auto;gap:2rem}`。

**Hero 構圖**：主欄 `.fn-hero{max-width:920px}`，由上到下 kicker → h1 → deck → 標籤 → 圖；圖 `.fn-image{width:min(76%,680px);margin:0 0 0 auto}` 右推，與左上的大標形成對角。
邊注 `.fn-margin{align-self:center;margin-top:5rem;border-left:1px solid #a9ad98}` 掛在第三欄，不與主欄競爭。

**標題**：`.fn-hero h1{font-size:clamp(4.1rem,9vw,9.8rem);line-height:.93;letter-spacing:-.085em;font-weight:400;margin:1rem 0 1.5rem}`，
用 `<br />` 手動分三行：「先把世界／記錄下來，／*再慢慢理解。*」，第三行 `<i>` 改為 `--fn-moss:#59664a`。
字體 `Georgia,"Noto Serif TC",serif`；weight 400（沒有用粗體撐層級，靠尺寸）。

**內文**：`.fn-deck{font-size:1.15rem;line-height:1.85;max-width:530px;color:#515548}`。

**留白**：[OBS] `.fn-layout` 下 padding 5rem；`.fn-ledger{margin:0 auto 5rem}`；`.fn-question{margin:0 auto 3rem}`。[MEAS] 區塊間距 80／48px。

**配色**：紙 `#f1eee4`、墨 `#222a20`、苔 `#59664a`、線 `#c8c6b7 / #b8b8a8 / #cfcec2`（三種灰綠線色，依區塊權重深淺）。**只有 1 個強調色（苔綠），其餘是同色相的明度變化。**

**圖片**：`.fn-image img{aspect-ratio:4/3;object-fit:cover;filter:saturate(.78);border-radius:48% 48% 4px 4px}` —— 拱形上緣＋近直角下緣；`saturate(.78)` 讓照片貼近紙色。
`figcaption` 為 mono `.62rem`，`display:flex;justify-content:space-between`，下方 `border-bottom:1px solid #b6b9aa`，左側「FIG. 06」用苔色。

**章節節奏**：Hero（滿寬三欄）→ Ledger（較窄，頂部 `border-top:2px solid var(--fn-ink)` 粗線＋底部 1px 細線）→ Question（無框）→ Footer。**粗線＝章節開始，細線＝列表內分隔。**

**互動**：無 JS。只有 nav hover：`text-decoration:underline;text-decoration-color:var(--fn-moss);text-underline-offset:4px`。

**手機**：
- ≤850px：`.fn-layout{grid-template-columns:50px 1fr}`，邊注移到第 2 欄 `grid-column:2;max-width:480px`；ledger／question 改單欄。
- ≤580px：`.fn-layout{grid-template-columns:28px 1fr}`（**直排索引欄縮成 28px，仍保留**）；`h1{font-size:clamp(3.5rem,17vw,5.2rem)}`；`.fn-ledger-type{display:none}`（砍次要欄位，而不是縮小）；header nav `order:3;width:100%`。

## [MEAS] 實測
- 1440：h1 129.6px，3 行，高 362px；1280：115.2px；768：69.1px；390：66.3px，**4 行**。
- 全頁字級共 13 種；最小 8.5px；<12px 文字 33 處。
- 390 下 h1 第 4 行只剩單字「解。」（見截圖 `orig/…field-notes-390.png`）。

## [INF] 可重用原則
1. 「大標主欄＋窄邊欄」：邊欄寬 ≤ 主欄 20%，用 1px 線與主欄分隔（而非卡片）。
2. 同一頁使用 2 個內容寬（1325 與 1150）做階梯，而不是全部同寬。
3. 一個強調色＋同色相明度階，比三個強調色更容易有「編輯感」。
4. 手機保留識別元素（直排索引縮為 28px），砍的是次要欄位（類型標籤）。

## [DEFECT] 不要複製
- 390 的 h1 孤字「解。」：手動 `<br/>` 與 `clamp` 下限 3.5rem 在窄螢幕互相衝突。
- mono 標籤 `.63–.71rem`（約 10–11px）、`.fn-margin span .62rem`；33 處 <12px。
- `.fn-rail` 直排文字 `.63rem` 在 390 下縮到 `.52rem`（8.3px），且 `.fn-rail a` 在直排下觸控區 <24px。
- 「24° 48′ N」之類裝飾座標是無資訊價值的氛圍文字（[INF]：在真實專案中應換成真實資料或刪掉）。

## [NEW] 改進
- h1 用 `text-wrap:balance` ＋ `max-inline-size:12em`，並以 `<span class="nowrap">` 保護詞組，取代把每個 `<br/>` 寫死。
- mono 標籤下限 12px、letter-spacing ≤ .12em。