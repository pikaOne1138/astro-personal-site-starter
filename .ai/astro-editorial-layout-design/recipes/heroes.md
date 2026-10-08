# Hero 構圖配方 ×12

**每個配方都對應一個可建置的 Astro 元件**（`recipes/code/heroes/Hxx-*.astro`），已在 1440／1280／768／390 通過 `scripts/audit.mjs`（無溢出、無文字疊壓、最小字級 12px）。
元件預設內容是示意；使用時**必須改結構與內容，不是只改文字與顏色**（失敗 F10）。

標記：**[OBS]** 來自十款原始碼；**[NEW]** 本 Skill 新增構圖。「衍生」＝以十款的某個手法為起點，但已修正其缺陷。

| ID | 名稱 | 來源 | 主視覺與標題的關係 | 適合 |
|---|---|---|---|---|
| H01 | rail-margin | 衍生 01 | 並排＋邊欄 | 研究者、長期記錄 |
| H02 | offset-stagger | 衍生 02 | 錯位（不壓字） | 作家、評論 |
| H03 | hard-shadow-split | 衍生 03/09 | 並排＋硬陰影 | 教學、工具、課程 |
| H04 | mat-still-stamp | 衍生 04 | 並排＋白框相片 | 策展、選書、清單 |
| H05 | signal-band | 衍生 05 | 並排＋資料條（深色） | 聲音、節目、事件流 |
| H06 | spec-sheet | 衍生 06 | 並排＋meta 條 | 專業服務、需講界線者 |
| H07 | letter-arch | 衍生 07 | 並排＋拱形＋簽名 | 陪伴、低壓邀請 |
| H08 | veil-fullbleed | 衍生 08 | 全幅影像＋遮罩 | 身體、自然、空間感 |
| H09 | poster-stack | 衍生 09 | 標題獨占一排＋下排圖 | 教練、行動導向 |
| H10 | sticker-split | 衍生 10 | 並排＋貼紙＋實心行動塊 | 團體、社群 |
| H11 | numeral-index | **[NEW]** | 無圖：巨大數字＋計數索引 | 年鑑、年度回顧、紀錄 |
| H12 | route-diagram | **[NEW]** | 圖表：SVG 路線＋站點 | 流程即信任的服務 |

**選擇規則**：先問「這位站長要被怎樣信任」，再選；不要先選好看的。若兩站的 Hero 配方相同，其餘 7 個旋鈕中至少要有 3 個不同（`checklists/diversity-check.md`）。

---

## H01 rail-margin — 窄索引軌 + 主欄大標 + 邊注

**來源**：[OBS] `.fn-layout{grid-template-columns:78px minmax(0,1fr) 180px}`、`.fn-rail{writing-mode:vertical-rl}`、`.fn-margin{border-left:1px solid #a9ad98}`（01 田野筆記）。
**適用**：重視「紀錄與脈絡」的站：研究札記、田野日誌、讀書筆記。
**不適用**：需要強烈行動呼籲的服務站（邊欄會稀釋行動）。

```
┌─────────────────────────────────────────────────────┐
│ 01—05 │ kicker                          │             │
│ INDEX │ H1  先把世界                     │ MARGIN NOTE │
│ 筆記  │     記錄下來，                   │ │「引言…」   │
│ 索引  │     再慢慢理解。(voice)          │ │— 出處      │
│  │    │ deck ≤ 34em                     │             │
│ stem  │            ┌ 拱形圖 76% ┐        │             │
└─────────────────────────────────────────────────────┘
 4.5rem   minmax(0,1fr)                      11rem
```
**關鍵 CSS**
```css
.h01{display:grid;grid-template-columns:4.5rem minmax(0,1fr) 11rem;gap:clamp(1.2rem,4vw,4rem)}
.rail a{writing-mode:vertical-rl;min-height:44px;padding:.5rem .75rem}   /* 直排連結也要 44px 觸控 */
h1{font:400 clamp(3rem,9vw,8.5rem)/1.04 var(--ed-serif);letter-spacing:-.03em;text-wrap:balance}
.ph{display:inline-block}                                              /* 詞組不被拆開 */
@media(max-width:850px){.h01{grid-template-columns:3.2rem minmax(0,1fr)} .margin{grid-column:2}}
```
**用法**：`<H01 phrases={['先把世界','記錄下來，']} voice="再慢慢理解。" rail={['索引','問題']} />`
**常見失敗**：① 原版 390px 的 h1 孤字「解。」→ 本配方用短語 inline-block＋`text-wrap:balance`；② 直排連結寬 25px → 本配方給 padding；③ 邊注在 ≤850px 沒落到主欄下方會擠成 1 字寬。
**程式**：`code/heroes/H01-rail-margin.astro`

---

## H02 offset-stagger — 巨大標題（8 欄）+ 錯位傾斜圖

**來源**：[OBS] 02 `.es-cover h1{clamp(5rem,14vw,13rem);line-height:.82;letter-spacing:-.1em}` ＋ `figure{position:absolute;right:2%;top:13%;transform:rotate(2deg)}`。
**修正**：圖與標題在 12 欄 grid 中**錯開欄位**（標題 1–8、圖 9–12），不再疊壓；`figcaption` 不會碰到標題字形。
**適用**：評論、散文、專欄；標題本身就是「作品」。
**不適用**：標題很長（>12 字）時，大標會變成 4 行以上。

```
┌──────────────────────────────────────────────────────┐
│ ISSUE 018 / 2026 AUTUMN                               │
│ 把一個問題                      ┌────────────┐        │
│     想完整。(italic, 縮排 .6em) │  3:2 圖 2° │        │
│                                 └─ caption ──┘        │
│   deck ≤ 26em      讀本期文章 ↓                        │
└──────────────────────────────────────────────────────┘
 cols 1──────8                    cols 9────12
```
**關鍵 CSS**
```css
.h02{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(.5rem,1.5vw,1.5rem)}
h1{grid-column:1/9;font:400 clamp(3.2rem,10vw,9rem)/1.06 var(--ed-serif)}
h1 em{display:block;padding-left:.6em}
figure{grid-column:9/-1;grid-row:2/4;transform:rotate(2deg)}
```
**算寬公式**：每個詞組寬度 ≈ 字數 × 字級(px) 必須 ≤ 標題欄寬。1440 視窗：8 欄 ≈ 795px、10vw = 144px → 詞組 ≤ 5 字。超過就拆成兩個詞組（陣列元素）。
**常見失敗**：詞組 5 字 × 176px(11rem) = 880px > 795px，詞組在內部被硬斷成「把一／個問題」（本 Skill 開發時實際發生，已改字級上限為 9rem）。
**程式**：`code/heroes/H02-offset-stagger.astro`

---

## H03 hard-shadow-split — 左文右圖 + 硬陰影 + 螢光標記

**來源**：[OBS] 03 `.ll-hero-art img{border:2px solid;box-shadow:12px 12px 0 var(--ll-yellow)}`、`.ll-hero-copy h1 span{background:var(--ll-yellow);box-decoration-break:clone}`、`.ll-button{box-shadow:4px 4px 0 yellow}`。
**適用**：教學、工具、課程、教練；需要「動手感」。
**不適用**：嚴肅專業服務（硬陰影像遊戲 UI）。**警告**：硬陰影＋螢光是 03/09 的簽名，不要再加旋轉、貼紙、箭頭。

```
┌─────────────────────────────────────────────┐
│ OVERLINE                                    │
│ H1 把好奇心         ┌───────────┐            │
│    ▓變成一條路。▓   │   4:3 圖   │▒▒(12px)   │
│ body ≤30em          └───────────┘▒           │
│ [看學習路徑 ↘]▒ 自學也可以有方向。            │
└─────────────────────────────────────────────┘
 1.02fr                .98fr
```
**關鍵 CSS**
```css
mark{background:var(--hi);color:inherit;padding:0 .15em;box-decoration-break:clone;-webkit-box-decoration-break:clone}
figure img{border:2px solid var(--ed-ink);box-shadow:12px 12px 0 var(--hi)}
.btn{min-height:48px;box-shadow:4px 4px 0 var(--hi)}
```
**常見失敗**：`box-decoration-break:clone` 漏掉 → 標記在折行處左右邊缺口；`mark` 預設文字色是黑，需 `color:inherit`。
**程式**：`code/heroes/H03-hard-shadow-split.astro`

---

## H04 mat-still-stamp — 白框相片（下緣加厚）+ 印章

**來源**：[OBS] 04 `.cu-still{padding:.7rem .7rem 2.2rem;transform:rotate(1.8deg);box-shadow:0 18px 50px #30252f19}`、`.cu-stamp{border-radius:50%;transform:rotate(-13deg)}`。
**修正**：印章放進 `figure`，以圖為定位基準（04 用 `right:37%` 隨視窗漂移）；印章文字 12px（04 為 8px）。
**適用**：策展、選書、收藏、評選。
```
┌────────────────────────────────────────┐
│ kicker                                  │
│ H1 我替你           ┌─白框────────┐      │
│    先選過一輪。      │ 3:2 圖      │ 1.8° │
│ body                │             │      │
│ 進入收藏目錄 ↓   ⊙印章└─ caption ──┘      │
└────────────────────────────────────────┘
```
**關鍵 CSS**：`.mat{background:#fff;padding:.7rem .7rem 2.2rem;transform:rotate(1.8deg)}`（下緣 ≈ 3× 邊 → 相片感）；`.stamp{position:absolute;left:-2.5rem;bottom:3.6rem}`（相對 figure）。
**常見失敗**：印章壓到 figcaption（audit 報 `figcaption × span.stamp`）→ 抬高 `bottom`。
**程式**：`code/heroes/H04-mat-still-stamp.astro`

---

## H05 signal-band — 深色 hero + 跨列資料條

**來源**：[OBS] 05 `.ra-wave{grid-column:1/-1;height:70px}`、`.ra-wave i{height:calc(var(--bar)*7px)}`、`--bar:((i*17)%7)+2`、`.ra-site[data-speaking="true"] .ra-wave i{animation:…}`。
**適用**：聲音／節目／事件流／資料型內容。資料條可以換成「今年每週閱讀量」等真實資料。
**不適用**：沒有狀態可驅動時不要加動畫（純裝飾動畫＝F07）。
```
████████████████ 深色滿版 ████████████████
 kicker                    ┌──────────┐
 H1 按下播放，              │  4:3 封面 │
    這封信說給你聽。        └─ ON AIR ─┘
 打開本期逐字稿 ↘
 ▁▃▅▂▇▃▅▁▆▃▂▅▇▃▁▅▂▆▃▅▁ …（72 根，手機 ≤24 根）
```
**關鍵 CSS**
```css
.h05{background:var(--ed-dark);padding:… max(var(--ed-gutter),calc((100% - var(--ed-wide))/2 + var(--ed-gutter)))}
.h05[data-live="true"] .wave i{animation:pulse 1.8s ease-in-out infinite alternate;animation-delay:var(--lag)}
@media(prefers-reduced-motion:reduce){.h05[data-live="true"] .wave i{animation:none}}
@media(max-width:760px){.wave i:nth-child(n+25){display:none}}
```
**常見失敗**：背景放在 `max-width` 容器（F06）；波形在手機保留全部條數被裁切；`Math.random()` 造成 SSR 與水合不一致 → 用確定性公式。
**程式**：`code/heroes/H05-signal-band.astro`

---

## H06 spec-sheet — 規格書式 hero（含 meta 條）

**來源**：[OBS] 06 `.cl-meta{grid-template-columns:repeat(3,1fr);border-top:1px solid}`；右圖 `border-radius:3px` 無裝飾。
**適用**：專業服務、需要先講範圍與資格的站；**meta 值若未驗證要顯示「待填」**。
**手機**：meta 改為 label 左／value 右（390px 下三欄會縮到 9px 字，原版即如此）。
```
┌──────────────────────────────────────────────┐
│ 專業關係，從清楚開始          ┌──────────────┐ │
│ H1 讓你知道                   │   4:3 圖      │ │
│    接下來會發生什麼。          │   無裝飾      │ │
│ body                          └──────────────┘ │
│ [了解服務範圍 ↓] 不必先承諾預約。               │
│ ───────────────────────────────                │
│ 服務對象 │ 會談方式 │ 資格資訊                  │
└──────────────────────────────────────────────┘
```
**常見失敗**：把「請填入」佔位字直接上線；meta 在手機仍三欄。
**程式**：`code/heroes/H06-spec-sheet.astro`

---

## H07 letter-arch — 鬆行距大標 + 拱形圖 + 簽名短句

**來源**：[OBS] 07 `.co-hero h1{line-height:1.07}`、`figure img{border-radius:44% 44% 4px 4px}`、`.co-hero-sign{transform:rotate(-4deg);bottom:-3.2rem}`、`.co-postmark{border-radius:50%}`。
**修正**：簽名短句放在 figure 內；CTA 為描邊膠囊（無實心主按鈕）。
**適用**：陪伴、諮詢、低壓力邀請。
```
 kicker
 H1 你可以先從          ┌─(拱形)───┐
    想說的那一小段開始。 │  3:2 圖   │
 body 1.05rem/1.95      └─ caption ┘
 (讀一封寫給你的信 ↓)       慢慢來，
                            我們有時間。(−4°)
```
**關鍵 CSS**：`h1{line-height:1.14}`（比其他配方鬆）；`.pill{border:1px solid var(--ed-accent-deco);border-radius:40px;min-height:48px}`。
**常見失敗**：簽名短句用 `position:absolute;right:43%`（原版 flower）→ 390px 壓到正文。
**程式**：`code/heroes/H07-letter-arch.astro`

---

## H08 veil-fullbleed — 全幅影像 + 單向遮罩

**來源**：[OBS] 08 `.so-hero{min-height:min(850px,100svh)}`、`.so-veil{background:linear-gradient(90deg,#1c291fc9 0%,#27332d7a 47%,#25302c14 100%)}`、`.so-hero-img{animation:so-breathe 24s ease-in-out infinite alternate}`（scale 1.06）。
**規則**：文字放在遮罩 ≥ 48% 不透明處；底部再加 `linear-gradient(0deg,#0000008c,transparent 40%)` 保護小字；動畫 ≤ 1 個且尊重 reduced-motion。
**適用**：有「空間感」的服務（身體、自然、場域）。**必須有真實影像**，漸層只是示範。
```
┌──────────── 100svh 影像 ────────────┐
│▓▓▓▓ kicker                  ░░░░░░░│
│▓▓▓▓ H1 先回到                ░ 影像 ░│
│▓▓▓▓    身體裡。               ░░░░░░│
│▓▓▓▓ body / 看看練習如何開始 ↓       │
│ SPACE FOR PRACTICE — 01             │
└─────────────────────────────────────┘
```
**常見失敗**：影像上的 nav 文字 10px 且無遮罩（原版）；遮罩只用單層漸層，底部小字不可讀；沒有 `fetchpriority="high"`。
**程式**：`code/heroes/H08-veil-fullbleed.astro`

---

## H09 poster-stack — 標題獨占一排 + 下排「文案｜傾斜圖」

**來源**：[OBS] 09 `.ma-cover h1{font-size:clamp(5rem,12vw,11rem);line-height:.88;letter-spacing:-.11em}`、`figure{position:absolute;transform:rotate(3deg)}img{border:3px solid;box-shadow:12px 12px 0 orange}`。
**修正**：圖改為下排的 grid 欄（不再壓標題）；`line-height ≥ 1.04`、`letter-spacing −.03em`（09 原值使兩行字形接觸）。
```
 FIELD GUIDE …                       NO. 09 / 2026
 卡住的事，                        ← 粗體 12vw
 拆成下一步。 (voice 色)
        body ≤24em           ┌───────────┐
        看方法如何運作 ↓      │ 3:2 圖 3° │▒
                             └───────────┘
```
**算寬**：6 字 × 12vw：1440 → 1036px ≤ 1205px；390 → 3.4rem(54px)×6 = 326px ≤ 358px。
**常見失敗**：把圖絕對定位到標題上（本 Skill 第一版就犯，audit 報 `em.ph × figcaption`）。
**程式**：`code/heroes/H09-poster-stack.astro`

---

## H10 sticker-split — 拱形圖 + 貼紙 + 實心行動塊

**來源**：[OBS] 10 `.cg-hero-sticker{width:86px;border-radius:50%;box-shadow:4px 4px 0 blue;transform:rotate(9deg)}`、`.cg-hero-copy>a{background:var(--cg-yellow)}`。
**修正**：貼紙在 figure 內；文字 12px。
**適用**：團體、社群、工作室。**不要同時用 H03 的硬陰影媒體**。
**程式**：`code/heroes/H10-sticker-split.astro`

---

## H11 numeral-index — 巨大數字當主視覺 **[NEW]**

**原理**：資料本身就是視覺；十款原始碼沒有「無圖＋數字」的構圖。
**適用**：年鑑、年度回顧、紀錄；任何「有一個強而真的數字」的站。**不適用**：沒有真實數字（不要編造 112 本、9 本重讀）。
```
 THE READING ALMANAC
 ┌ 2026 ┐  ← outline 數字 clamp(7rem,30vw,28rem)，aria-hidden
 ══════════════════════════════════════════   (2px 粗線)
 H1 這一年，我讀完了      │ deck ≤30em
    這些書。              │ 從一月開始翻 ↓
 ───────────────────────────────────────────
 112      │ 12      │ 9       │ 3
 本讀完   │ 個月主題 │ 本重讀   │ 本放棄
```
**關鍵 CSS**
```css
.num{font:400 clamp(7rem,30vw,28rem)/.82 var(--ed-serif);color:transparent;-webkit-text-stroke:2px var(--ed-ink);font-variant-numeric:tabular-nums}
.stats{display:grid;grid-template-columns:repeat(4,1fr)}  /* ≤760px → 2×2，並補第 3 格的左線與上線 */
```
**常見失敗**：`-webkit-text-stroke` 在小尺寸太細 → 只在 ≥ 7rem 使用；裝飾數字沒有 `aria-hidden`，螢幕閱讀器重複朗讀；對比檢查會誤報（透明填色），需用 `aria-hidden`＋人工確認描邊對比。
**程式**：`code/heroes/H11-numeral-index.astro`

## H12 route-diagram — SVG 路線 + 站點 **[NEW]**

**原理**：「流程」本身是信任資訊；把它畫成路線，而不是三張卡片。文字在 HTML，線在 SVG。
**幾何**：每站高度固定 `8.5rem`；SVG 寬高用 rem、viewBox 用同比例單位（1 單位 = 1/16 rem），節點中心 `(24 + shift, 24 + i·136)`，路徑 `C` 曲線由 frontmatter 以迴圈產生，任何字級縮放下都精準穿過節點。
```
 A CLEAR ROUTE
 H1 先看路線，            (01)─ 一般詢問
    再決定                  ┆
    要不要出發。               (02)─ 初次會談
 deck                       ┆
 [先問一個一般問題]          (03)─ 共同決定
```
**常見失敗**：用 `preserveAspectRatio="none"` 拉伸 SVG，節點與線錯位（第一版即如此，已修）；voice 詞組太長被硬斷。
**程式**：`code/heroes/H12-route-diagram.astro`