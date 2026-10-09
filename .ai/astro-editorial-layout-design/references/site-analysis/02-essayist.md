# 02 長文書房 `es-`（知識／作家）

來源：`src/pages/layouts/essayist/index.astro`

## [OBS] 原始碼事實

**容器**：`.es-site{padding:0 clamp(1rem,5vw,5rem);background:var(--es-paper)}`（`#f7f3e9`，背景在根）。
內層：`.es-cover{max-width:1280px;margin:0 auto}`、`.es-article{max-width:1080px}`、`.es-notebook{max-width:1080px}`。
[MEAS] 1440：cover 左緣 80 寬 1280；article/notebook 左緣 180 寬 1080。

**Grid**：文章區 `.es-article{grid-template-columns:.95fr 1.05fr;gap:clamp(2rem,8vw,8rem)}`（左：標題＋導言；右：正文）；筆記 `.es-notebook{grid-template-columns:1fr 1.2fr;gap:3rem}`；
筆記列 `.es-notebook li{grid-template-columns:74px 1fr}`。

**Hero 構圖：整頁是「超大標題＋疊壓圖片」**
- `.es-cover{position:relative;min-height:620px;padding:clamp(3rem,8vw,8rem) 0 5rem}`。
- `h1{font-size:clamp(5rem,14vw,13rem);line-height:.82;letter-spacing:-.1em;max-width:940px;position:relative;z-index:2}`；第二行 `<em>` 用 `--es-red:#b24331` 斜體並 `padding-left:.8em` **縮排**，製造階梯。
- 圖片 `.es-cover figure{position:absolute;right:2%;top:13%;width:min(35%,430px);transform:rotate(2deg)}` 絕對定位到右上，**文字（z-index:2）壓在圖片之上**。
- 底部 `.es-cover-bottom{margin:2rem 0 0 8vw;display:flex;align-items:end;gap:3rem}` 左縮排 8vw，與標題第一行不同軸。
- 角落小字 `.es-margin-mark{position:absolute;right:0;bottom:1.6rem;text-align:right}`。

**正文排版**：`.es-prose{max-width:580px;font-size:1.06rem;line-height:2.05}`；首字 `.es-dropcap:first-letter{float:left;font-size:4.2rem;line-height:.83;color:var(--es-red)}`；
引言 `blockquote{font-size:1.7rem;line-height:1.6;border-left:1px solid var(--es-red);font-style:italic}`。
導言 `.es-standfirst{font-size:1.18rem;line-height:1.75;max-width:400px}`。

**標題（文章）**：`.es-article header h2{font-size:clamp(2.7rem,6vw,5rem);letter-spacing:-.075em;line-height:1.04}`，以 `<br/>` 手動斷行。

**層級手法**：紅色只出現在 kicker、dropcap、blockquote 邊線、`<em>`、連結 —— **全頁唯一強調色用在「入口」位置**。

**圖片/卡片傾斜**：`.es-notebook{background:#ece5d8;transform:rotate(-.5deg)}`（整塊面板微傾），`figure` 傾 `2deg`。

**手機**：≤760 `.es-cover figure{position:relative;top:auto;right:auto;width:75%;margin:2rem 0 0 auto}`（絕對定位改回文流）、`.es-article{grid-template-columns:1fr}`；≤480 `h1{font-size:17vw}`、`em{padding-left:.2em}`（縮排量隨之縮小）。

## [MEAS]
- h1 1440：201.6px（14vw），2 行，高 331px；390：66.3px。
- 正文 17px／行高 2.05，**約 30 個全形字/行**（580px 欄寬）。
- 有 1 處 textOverlap（1280、768）：見下方缺陷。

## [INF] 可重用原則
1. **正文欄 ≤ 580px、行高 ≈ 2.0、約 30 全形字/行**，是此頁「讀起來像書」的主因。
2. 「超大標題」＝ `font-size ≥ 12vw` ＋ `line-height ≤ .9` ＋ 縮排的第二行。
3. 強調色只放在入口處（kicker、連結、首字、引言線），不鋪面。
4. 絕對定位的裝飾圖必須在手機改回文流（`position:relative`）。

## [DEFECT] 不要複製
- 圖片壓在 h1 的「題」字與句點上：`figcaption` 與「。」字形互撞（見截圖 `orig/…essayist-1440.png` 約 (900–1000, 460)）。
- `.es-article h2` 用 `<br/>` 斷在 5.0rem 但欄寬 ~450px：實際斷成「我們為什麼總／想要／馬上得到答／案？」4 行，孤字「案？」。
- `letter-spacing:-.1em` ＋ `line-height:.82` 讓 CJK 字形互相接觸；`.es-label` 色彩對比 4.48（<4.5）。
- 19 處 <12px 文字，最小 9.6px。

## [NEW] 改進
- 疊圖時圖片放 `z-index:0`、文字 `z-index:2`，並讓 `figcaption` 移出文字的 bounding box；或乾脆不疊，改用 Hero 配方 H02 的「錯位而不重疊」版本。
- CJK 大標 letter-spacing 建議 ≥ −.04em、line-height ≥ 1.0（見 `references/02-design-tokens.md`）。