# 04 收藏者目錄 `cu-`（知識／策展）

來源：`src/pages/layouts/curator/index.astro`

## [OBS] 原始碼事實

**容器**：`.cu-site{padding:0 clamp(1rem,4vw,4rem);background:var(--cu-paper)}`（`#efebe6`）；內層 `max-width:1300px`（hero、catalog、footer 同寬）。[MEAS] 1440：左緣 70、寬 1300。

**Grid**
- Hero：`grid-template-columns:1fr .85fr;gap:6vw;min-height:560px;padding:5rem 0;align-items:center`。
- Catalog：`grid-template-columns:260px 1fr;gap:5vw;border-top:1px solid #b8b0ab` —— **固定寬索引欄 260px ＋ 彈性內容欄**（與其他九款的 fr 比例不同，是「抽屜式目錄」做法）。
- 精選項 summary：`grid-template-columns:42px 1fr 170px;gap:1.2rem`（編號｜文字｜書封）。
- 物件列：`.cu-object-row{grid-template-columns:1fr 1fr}`，以 `article{border-right:1px solid #c2b9b2}`＋`article+article{padding-left:1.3rem;border-right:0}` 做欄分隔線（不是 gap）。

**Hero 構圖**：左文、右「靜物照＋白框」。
`.cu-still{transform:rotate(1.8deg);background:#fff;padding:.7rem .7rem 2.2rem;box-shadow:0 18px 50px #30252f19}` —— 底部 padding 2.2rem 比邊 .7rem 大 3 倍，做出**拍立得白邊**；
印章 `.cu-stamp{position:absolute;right:37%;bottom:3.4rem;width:94px;height:94px;border:1px solid var(--cu-gold);border-radius:50%;transform:rotate(-13deg)}` 壓在文字欄與圖片間的縫上。

**標題**：`.cu-hero h1{font-size:clamp(4.2rem,9vw,9rem);line-height:.9;letter-spacing:-.08em}`；第二行 `<i>` 用 `--cu-plum:#5b4055`。Catalog 的 `h2{font-size:3rem;line-height:.9}` 用小很多的標題，因其為側欄。

**CSS 繪製的書封（無圖片）**：`.cu-cover{width:150px;height:196px;background:var(--cu-plum);box-shadow:8px 8px 0 #d1c8be;display:flex;justify-content:space-between}`，書名 `b{writing-mode:vertical-rl;letter-spacing:.1em}` —— **用 CSS 取代素材**，所以不會有圖片授權／比例問題。

**互動**：`<details class="cu-featured"><summary class="cu-featured-summary">`，自繪 ＋／−：
`summary::after{content:"＋"}` ／ `.cu-featured[open] .cu-featured-summary::after{content:"−"}`，並移除原生三角（`list-style:none; ::-webkit-details-marker{display:none}; ::marker{content:""}`）。鍵盤原生可用。

**配色**：墨 `#30252f`、梅 `#5b4055`、舊金 `#76572c`、紙 `#efebe6`；金色只用在編號與印章（約 4 處）。

**手機**：≤800 catalog 欄縮為 200px；≤600：
- 索引 `ol` 變 `display:flex;flex-wrap:wrap;gap:.5rem 1rem`，`li{border-top:0}` —— **側欄目錄在手機轉成橫向 chip 列**；
- 書封縮 82×128；`.cu-object-row` 單欄，欄分隔線改為 `border-bottom`；footer `flex-direction:column`。

## [MEAS]
- h1 129.6px×3 行；頁面最短（1416px）。
- 390：正文 13.1px（`.cu-hero-copy p` 約 1rem，`.cu-featured p` .82rem）；<44px 目標 7 個；audit 於 768 偵測到 `p × span`（印章與文字 bounding box 交集）、390 偵測到 `a × h3`，需以截圖確認是否真的壓字。

## [INF] 可重用原則
1. **固定寬側欄（260px）＋彈性欄**適合目錄：側欄寬度不隨視窗漂移，主欄吃剩下的空間。
2. 「白框 padding 不對稱」（上/左/右小、下大）＝ 一行 CSS 的相片感，不需 mockup 圖。
3. 以 CSS 繪製抽象物件（書封、徽章），降低素材依賴。
4. 側欄目錄手機化＝改成 chip 流（`flex-wrap`），而不是整塊塞到頁首。

## [DEFECT]
- `.cu-index li` 與 `.cu-label` 為 .63–.67rem mono；`.cu-featured a` `.63rem`。
- `.cu-stamp` 絕對定位在 `right:37%`，視窗變化時會落在標題與圖片之間的不同位置（768px 時 `right:40%`、390px 時 `right:4%` 靠手動修正）。

## [NEW]
- 印章／徽章用 `inset-inline-end` 相對於圖片 `figure` 定位（放進 figure 內），讓它跟著圖走而不是跟著視窗。