# 08 身體與節律 `so-`（助人／身體工作）

來源：`src/pages/directions/care/somatic.astro`

## [OBS] 原始碼事實

**容器（唯一一款「帶狀滿版」）**：`.so-site` **沒有**水平 padding、背景 `#e8e6dc`；每個區塊自己決定：
- `.so-hero` 滿版 `padding:110px clamp(1rem,9vw,9rem) 4rem`；
- `.so-intro{max-width:1240px;margin:0 auto;padding:6rem clamp(1rem,4vw,4rem)}`（內容在 1240 內，背景仍是根色）；
- `.so-practice{background:var(--so-olive);padding:clamp(2rem,6vw,5rem) clamp(1rem,8vw,8rem)}`（`#3e4b37` 滿版色帶，**內容靠 padding 限寬而不是 max-width**，所以色帶不會被裁切）；
- `.so-sessions` 再回到 1240。[MEAS] 1440：header/hero/practice/footer 左緣 0 寬 1440；intro/sessions 左緣 100 寬 1240。
**這是處理「背景要滿版、內容要限寬」的兩種正解**：①根背景＋內層 max-width；②色帶用 padding-inline 限寬。

**Hero 構圖（全幅影像＋遮罩）**
- `.so-hero{position:relative;min-height:min(850px,100svh);display:flex;align-items:center;overflow:hidden}`
- `.so-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:so-breathe 24s ease-in-out infinite alternate}`；`@keyframes so-breathe{to{transform:scale(1.06)}}` —— **24 秒、僅放大 6%**。
- 遮罩 `.so-veil{background:linear-gradient(90deg,#1c291fc9 0%,#27332d7a 47%,#25302c14 100%)}` ——**由左到右 79% → 48% → 8% 不透明**，文字區在最暗側。
- Header 為 `position:absolute;z-index:3` 浮在影像上，`border-bottom:1px solid #ffffff3c`，文字白色。
- 直排裝飾 `.so-vertical{writing-mode:vertical-rl;right:2rem;top:40%}`、`.so-frame-note{position:absolute;bottom:1.3rem}`。

**標題**：`.so-hero h1{font-size:clamp(5rem,11vw,10rem);line-height:.9;letter-spacing:-.09em}`；第二行 `em` `#d8b092`。[MEAS] 1440：158.4px，2 行。

**內容區**：`.so-intro{grid-template-columns:.7fr 1.2fr .8fr}`——**大引言置中欄（`clamp(1.8rem,3.6vw,3.3rem)`、行高 1.35、色 `#52604b`）夾在左側小 kicker 與右側小字備註之間**；
`.so-practice{grid-template-columns:.8fr 1.2fr;gap:8vw}`，列 `li{grid-template-columns:100px 1fr 25px}`（編號｜標題＋說明｜方向箭頭 ↘↘↗）。
`.so-sessions{grid-template-columns:.55fr 1.3fr .55fr}`。

**節奏**：影像（100svh）→ 大字引言（呼吸，padding 6rem）→ 深色色帶（密度高）→ 淺色資訊 → 淡灰 footer（`#deddd2`）。**淺→深→淺的明度波形**。

**手機**：≤560 `.so-hero{min-height:760px;min-height:95svh;padding:120px 1.2rem 4rem}`（兩行 min-height：舊瀏覽器 fallback）、`h1{font-size:18vw}`、`.so-vertical{right:.8rem}`、各 grid 單欄、色帶 padding `3rem 1.2rem`。

## [MEAS]
- 390 下 hero 圖渲染比例 0.49（390×800，`object-fit:cover` 取中央裁切，沒變形）。
- reduced-motion：`so-breathe`被壓到 0.01ms（layout 全域規則）→ 無限動畫 0。
- audit 對比失敗 14 處為**文字在影像上**（`.so-logo`、nav，審計腳本不計算背景圖，已標 skipped；**需以目視/取樣判斷**）；另外**真正可由程式計算的低對比**：`.so-practice .so-kicker`（`--so-clay:#825339` 於 `#3e4b37`，以 WCAG 公式計算約 1.4:1 [MEAS-calc]）。
- 390：`h1 × span.so-vertical` 疊壓（直排裝飾壓到標題右緣）。

## [INF] 可重用原則
1. 全幅影像 hero＝`inset:0` ＋ `object-fit:cover` ＋ **單向漸層遮罩，文字放在最暗側**；遮罩不透明度 ≥ 48% 的位置才放文字。
2. 影像動態只用 1 個、24s、scale ≤ 1.06。
3. 帶狀滿版：色帶用 `padding-inline: clamp(...)`，不要把色帶放進 max-width。
4. 明度波形（淺→深→淺）取代卡片分隔。
5. 以 `100svh`（不是 `100vh`）處理行動瀏覽器網址列。

## [DEFECT]
- `.so-practice .so-kicker` 對比約 1.4:1（幾乎看不到）。
- 影像上 nav 文字 `.65rem`（10.4px）。
- `.so-hero` 下方 `.so-frame-note` `.55rem` 白字 `#ffffff9c` 在亮處不可讀。

## [NEW]
- 遮罩加一道由下往上的 `linear-gradient(0deg,#0008,transparent 40%)`，保護 hero 底部小字。