# 10 共好工作室 `cg-`（助人／團體）

來源：`src/pages/directions/care/collective.astro`

## [OBS] 原始碼事實

**容器**：`.cg-site{padding:0 clamp(1rem,4vw,4rem);background:var(--cg-paper)}`（`#f8f5eb`）；內層 `max-width:1320px`。
配色：墨藍 `#203d68`、群青 `#2d55cf`、薑黃 `#f5cb47`、玫瑰粉 `#e9bcb3`、淡群青面板 `#e9ebf5`。**三個彩度區分「人」**：`.cg-person--rose #f0ddd7`／`--blue #dfe6f8`／`--yellow #f5e8bb`（均為品牌色的淡版）。

**Grid**
- Hero：`1fr 1fr;gap:5vw;padding:4rem 0 5rem`。
- Belief：面板 `.cg-belief{background:#e9ebf5;padding:clamp(1.5rem,4vw,3rem);grid-template-columns:.65fr 1.25fr .8fr;gap:3vw;align-items:start}`（**標籤｜大引言｜補述**）。
- People：`.cg-people-grid{grid-template-columns:repeat(3,1fr);gap:1rem}`，每張 `.cg-person{min-height:270px;padding:1.2rem;display:flex;flex-direction:column;align-items:flex-start}`；連結 `margin-top:auto` 釘在卡底。
- Calendar：`.8fr 1.2fr;gap:5vw`；列 `li{grid-template-columns:72px 1fr auto}`，日期圓 `.cg-date{width:58px;height:58px;border-radius:50%;background:var(--cg-yellow)}`。

**Hero 構圖**：左文右圖（`border-radius:46% 46% 3px 3px` 拱形）；貼紙 `.cg-hero-sticker{position:absolute;right:39%;bottom:2.5rem;width:86px;height:86px;border-radius:50%;background:var(--cg-yellow);transform:rotate(9deg);box-shadow:4px 4px 0 var(--cg-blue)}`，內容「LISTEN／LEARN／SHARE」。
主按鈕實心黃 `.cg-hero-copy>a{background:var(--cg-yellow);padding:.8rem 1rem;font-weight:700}`，導覽 CTA 為藍色膠囊 `border-radius:30px`。

**標題**：`.cg-hero h1{font-size:clamp(3.5rem,7vw,7rem);line-height:1;letter-spacing:-.08em}`；`<i>` 切 `Georgia,serif` ＋群青。`.cg-belief blockquote{font-size:clamp(1.8rem,4vw,3.8rem);line-height:1.25}`。

**人物牆（不用假照片）**：`.cg-avatar{width:82px;height:82px;border-radius:50%;background:#fbf5e9;font-size:2rem}` 內放**姓氏單字**；角落編號 `01/02/03`；JS-less 資料驅動：frontmatter `people` 陣列 `.map()` 出卡片，class 以 `cg-person--${color}` 切換。
`.cg-demo-note`：「以下人物為版型示範資料；正式網站請替換成真實團隊簡介與經當事人同意的照片。」

**活動時間軸（誠實佔位）**：日期欄顯示 `--`／`TBD`，副標「日期、形式與名額待團隊確認」。**沒有編造日期、名額或見證。**

**收尾**：`.cg-join-band{background:var(--cg-blue);color:#fff;display:flex;flex-direction:column}`，h2＋ 底線連結，`kicker` 切 `#f7d864`。

**手機**：≤900 hero 仍 2 欄；≤580：hero 單欄、`h1{font-size:15vw}`、`figure{width:90%;margin-left:auto}`、貼紙 `right:3%;bottom:1rem`、人物 `grid-template-columns:1fr`（`min-height:230px`）、calendar `li{grid-template-columns:55px 1fr}` 並讓連結落在第 2 欄。

## [MEAS]
- h1 100.8px×3；390 58.5px×3；頁高 2488（十款最長）。
- 正文 12.2px／1.85（十款最小）；<12px 文字 37 處；<44px 目標 13 個（390）。
- 對比：`.cg-person-no` 3.97、`.cg-person p` 4.13（<4.5）。
- 390：`figcaption × .cg-hero-sticker` 疊壓。

## [INF] 可重用原則
1. 「團隊」頁用**同形、異色**取代「同色、異照片」：同一 grid 規則、三個淡色底、首字頭像。
2. `margin-top:auto`＋`flex-direction:column` 把卡片內的行動連結釘在底部，高度不一也對齊。
3. 佔位內容必須「看得出是佔位」（`--`、TBD、說明段落），避免被誤當真實資訊。
4. 日期圓＋標題＋連結的列，是不需要日曆元件的活動列表。

## [DEFECT]
- 三欄等寬卡片＝十款中最接近「三欄卡片模板」的結構。差異化靠底色與頭像，但**等欄寬、等高、等內容結構**，屬於需要避免過度使用的圖樣（見 `03-ai-failure-modes.md` F01）。
- 全站最小正文 12.2px；`.cg-person p{.7rem}`、`.cg-date{.53rem}`。
- `.cg-hero-sticker` 以 `right:39%` 定位，與圖片/文字交界在不同寬度漂移。

## [NEW]
- 團隊 >3 人時改 `grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))`；或改為「一位主角大卡＋其餘列表」（見 recipes/lists）。