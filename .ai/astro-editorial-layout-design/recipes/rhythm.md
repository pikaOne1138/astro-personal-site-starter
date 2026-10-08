# 視覺節奏配方 ×6

節奏＝「讓眼睛知道哪裡開始、哪裡重、哪裡可以休息」。這六個配方都有具體數值，而不是形容詞。
程式：`recipes/code/rhythm/Rxx-*.astro`。示範頁：`examples/src/pages/lab/rhythm.astro`。

| ID | 名稱 | 控制什麼 | 來源 |
|---|---|---|---|
| R01 | spacing-ladder | 垂直間距階 | 歸納 [INF] 十款 `margin-bottom:5/6rem`，手機降階 [NEW] |
| R02 | band-alternation | 明度波形（淺-深-淺） | 衍生 08；token 重新映射 [NEW] |
| R03 | rule-weights | 線寬階層 | 歸納 [INF] 2px/1px |
| R04 | fr-mirror | 欄比左右鏡像 | [NEW] |
| R05 | voice-heading | 標題雙聲 + 詞組斷行 | 歸納 [INF]；詞組斷行 [NEW] |
| R06 | media-accent | 媒體識別處理 | 歸納 [INF] |

## R01 spacing-ladder
**觀察 [OBS/MEAS]**：十款區塊間距 80／96px（`margin:0 auto 5rem/6rem`），手機保持 96px，使 390px 頁高 2265–3230px（co 3090、cg 3230）。
**配方 [NEW]**：`--ed-section: clamp(4rem, 8vw, 6rem)`（手機 64px、桌機 96px）；章節內 24–32px；標題與內文 16–24px。
```css
.stack > * + * { margin-top: var(--ed-section) }
```
**失敗**：每個區塊自訂 margin（80、96、107、170 混用，見 ra-episode）→ 節奏不一致；用 padding 疊 margin 造成雙倍間距（collapse 不成立時）。
**驗收**：audit 的 `gaps[]` 在同一頁應只有 ≤ 3 種值。

## R02 band-alternation
**觀察 [OBS]**：so 的 `.so-practice` 以 `padding-inline` 做滿版色帶；明度順序 淺（hero 影像）→ 淺 → 深 → 淺。
**配方**：
```css
.band{padding:var(--pad) max(var(--ed-gutter), calc((100% - var(--wide))/2 + var(--ed-gutter)))}
.band.dark{background:var(--ed-dark);--ed-ink:var(--ed-on-dark);--ed-ink-2:var(--ed-on-dark-2);--ed-accent:#e9bf9f}  /* token 重新映射 */
```
**token 重新映射 [NEW]**：深色帶內重設 `--ed-*`，子元件不必寫深色版；開發 R05/R06 時我們實際遇到「深帶內標題用固定 ink 色而不可見」(contrast=1) 而加入此做法。
**規則**：一頁 3–5 個區塊至少 1 次明度反轉；連續 2 個區塊同底色時用 R03 線寬分隔。
**失敗**：深帶放進 `max-width` 容器（F06）；公式漏了 `+ gutter` → 帶內文字比其他區塊更貼邊（開發時 H05 即如此：內容起點 60px vs 118px）。

## R03 rule-weights
**觀察 [OBS]**：`border-top:2px solid var(--ll-ink)`（ll、ma、fn-ledger）起章節；1px `#cfcec2` 分列；虛線 `1px dashed` 只出現在 co、cu 的附註。
**配方**：三級：chapter 2px ink／item 1px line／aside 1px dashed。**一頁只用這三種，不要 3px、不要多種灰。**
**失敗**：所有分隔線同粗細 → 沒有層次；用陰影代替線。

## R04 fr-mirror
**觀察 [OBS]**：十款幾乎都是「左小右大」（`.7fr 1.3fr`、`.8fr 1.2fr`…）。**[MEAS]** 同一頁 4–5 個區塊全部同向 → 視覺重量永遠壓在右側。
**配方 [NEW]**：連續 ≥3 個雙欄區塊時，鏡像至少 1 次（`.flip{grid-template-columns:1.3fr .7fr}` 且標題 `order:2`）；手機一律「標題在上」。
**失敗**：鏡像後手機仍用 `order:2` 使標題落到內容之後（閱讀順序顛倒）→ 手機要還原 `order:0`。

## R05 voice-heading
**觀察 [OBS]**：十款 h1/h2 皆有「第二聲」：`<i>`/`<em>` 換色或換字體（Georgia 斜體）、`mark` 螢光（ll）、縮排（es `padding-left:.8em`）。
**配方 [NEW]**：以詞組陣列取代 `<br/>`：
```astro
<h1>{phrases.map(p => <span class="ph">{p}</span>)}<em class="ph">{voice}</em></h1>
<style> .ph{display:inline-block} h1{text-wrap:balance;letter-spacing:-.03em;line-height:1.04} </style>
```
**規則**：作者自行在語意邊界切詞組；每個詞組寬度 ≤ 欄寬（字數 × 字級 ≤ 欄寬 px）；末行 ≥ 2 字。
**失敗**：詞組長於欄寬被硬斷（H02 5 字 × 176px 在 795px 欄）；voice 詞組用 `inline-block` 且 9 字 → 斷在「再決定要不／要出發。」→ 改成兩個詞組（H12）。

## R06 media-accent
**觀察 [OBS]**：每款主視覺都有「一種」識別處理 — 拱形 `border-radius:48% 48% 4px 4px`（fn/co/cg）、白框＋旋轉（cu）、硬陰影（ll/ma）、全幅（so）、純旋轉（es/ra）。
**配方**：`treatment: arch | mat | hard | plain`；`tilt` 夾在 ±3deg；**一頁只用一種**；傾斜只加在媒體上。
**失敗**：同時 arch＋hard＋tilt＋sticker（四種識別疊加＝看起來像貼紙簿）；傾斜加在文字容器上導致文字邊緣鋸齒。