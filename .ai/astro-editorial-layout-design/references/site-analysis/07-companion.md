# 07 溫柔陪伴 `co-`（助人／關係）

來源：`src/pages/layouts/companion/index.astro`

## [OBS] 原始碼事實

**容器**：`.co-site{padding:0 clamp(1rem,5vw,5rem);background:var(--co-paper)}`（`#fbf5ed`）；內層寬度**有四種**：hero 1240、letter 1030、how 1100、contact 1240。[MEAS] 1440：letter 左緣 205 寬 1030；how 左緣 170 寬 1100。
配色：墨 `#4b312d`、玫瑰 `#c57e6e`（邊線/按鈕框）、文字用的深玫瑰 `#8f554a`／`#9f5e53`、信紙 `#f1e6dc`。**裝飾色（`#c57e6e`）與文字色（`#8f554a`）分開**：邊線用淺的，字用深的，所以對比不掉。

**Grid**
- Hero：`1.1fr .9fr;gap:6vw;padding:5rem 0 6rem`。
- **信（letter）**：`.co-letter{max-width:1030px;background:#f1e6dc;padding:1.2rem clamp(1.2rem,6vw,5rem) 3rem;grid-template-columns:.6fr 1.4fr;gap:5vw}`；
  `.co-letter::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:1px dashed #d2b7aa}` —— **虛線摺痕**（`dashed`＋置中），≤800px 時 `display:none`。
  左欄 meta 為直排 flex 的三行 mono 小字（「一封沒有催促的信」／「寫給正在想著要不要聯絡的人」／「2026 / 秋」）；右欄 `.co-letter-body{max-width:610px;font-size:1.03rem;line-height:2.1}`。
- How：`.co-how-row{grid-template-columns:repeat(3,1fr);border-top/bottom:1px solid #dcc8bc}`，以 `article+article{border-left:1px solid}` 分欄；**這是三欄，但沒有卡片底色、沒有圓角、沒有陰影，只有細線**。
- Contact：`1fr 1fr auto;align-items:end`。

**Hero 構圖**：`.co-hero figure img{aspect-ratio:3/2;border-radius:44% 44% 4px 4px}`（拱形）；
`.co-hero-sign{position:absolute;right:0;bottom:-3.2rem;transform:rotate(-4deg);font-size:1.1rem;line-height:1.8}` 一段「慢慢來，我們有時間。」像手寫簽名斜放在圖的下方（**無手寫字體，只靠旋轉**）；
`.co-flower{position:absolute;top:19%;right:43%;font-size:3rem;color:#d69e8f;opacity:.7}` 純裝飾字元 ✳。

**標題**：`.co-hero h1{font-size:clamp(3.3rem,6.8vw,6.4rem);line-height:1.07;letter-spacing:-.07em;font-weight:400}`；`.co-how h2{font-size:clamp(2.8rem,6vw,5rem)}` 置中。**行高 1.07，是十款 h1 中最鬆的**。

**內文**：hero 說明 `1.05rem/1.95`、信 `1.03rem/2.1`，皆為十款中最大/最鬆。「親愛的」`.co-dear{font-size:1.5rem}`。

**CTA**：`.co-postmark{border:1px solid var(--co-rose);border-radius:50%;transform:rotate(-5deg)}` 郵戳形按鈕；`.co-invite{border-radius:40px;border:1px solid}` 描邊膠囊按鈕 —— **沒有任何實心主按鈕**（低壓）。

**手機**：≤800：`.co-letter{grid-template-columns:1fr}`，meta 變 `flex-direction:row;flex-wrap:wrap` ＋ `border-bottom:1px dashed`；`.co-hero figure{width:82%;margin-left:auto}`；≤540：`.co-how-row{grid-template-columns:1fr}` 且分隔線改 `border-top`。

## [MEAS]
- h1 97.9px×3、390 54.6px×3；正文 16.5px／2.1，約 34 字/行；全頁字級 19 種（十款最多）。
- 對比：`.co-flower` 2.12（裝飾字元，可接受）；其餘通過。
- 390：`p × span.co-flower`、`.co-hero-sign` 與 figcaption 交集（裝飾與文字重疊）。

## [INF] 可重用原則
1. **行高與字級是「溫度」的主要旋鈕**：本頁 h1 行高 1.07、正文 2.1，較冷的頁（coach）為 .88／1.9。
2. 用「紙張隱喻」（信紙底色、虛線摺痕、郵戳按鈕）取代「卡片」。
3. 裝飾色與文字色分離（`#c57e6e` 做線、`#8f554a` 做字）。
4. 三欄不等於三卡：只用 1px 線分欄，也能得到可掃讀的並列結構。

## [DEFECT]
- 19 種字級過多（階層混亂風險）；`.co-hero-sign` 與 `.co-flower` 在 390 與正文互撞。
- 信中的佔位指示（`.co-fineprint`）夾在正文裡。

## [NEW]
- 字級控制在 audit 量測 ≤ 12 種（見 `02-design-tokens.md` 字級階）。