# 設計 Tokens（尺寸、字級、留白、色彩）

每個數字都標明出處：**[OBS]** 十款原始碼實際值範圍；**[NEW]** 本 Skill 建議（通常比十款更嚴格）。

## 1. 容器與水平 padding

| Token | 值 | 出處 |
|---|---|---|
| `--ed-gutter` | `clamp(1rem, 4vw, 4rem)` | [OBS] 七款完全相同；es/co 為 `5vw/5rem` |
| 內容寬度候選 | 1030 / 1080 / 1100 / 1150 / 1240 / 1260 / 1300 / 1320 / 1360 px | [OBS] |
| 閱讀欄 `--ed-measure` | 正文欄 **≤ 580–610px**（es 580，co 610，ra transcript 約 560） | [OBS] |
| 建議 | 一頁 **使用 2–3 種寬度**（寬 1260–1320／中 1080–1150／窄 580–610 閱讀欄） | [NEW]（fn 的 1325 vs 1150 是階梯的 [OBS] 實例） |

規則 [NEW]：**背景一律掛在根容器或帶狀 section，禁止掛在 `max-width` 容器上**。帶狀區塊用
`padding-inline: max(var(--ed-gutter), calc((100% - var(--ed-wide)) / 2))`（見 `recipes/code/rhythm/R02-band-alternation.astro`）。

## 2. 字級階（Type scale）

十款 [MEAS]：每頁 12–19 種字級，其中 h1 為 **6.8–14vw**。

[NEW] 建議：設計時每頁 **≤ 9 個命名字級角色**；audit 量測值（0.5px 去重、含 clamp 在該視窗的計算值）**≤ 12**（本 Skill 兩個驗證站實測 9 與 11；初版 16–17 種，經正規化後下降）。下限如下（以 `rem`，1rem=16px）：

| 角色 | 建議 | 說明 |
|---|---|---|
| 超大標題 h1 | `clamp(3rem, 8–12vw, 9–11rem)` | 手機最小 3rem，且**必須在 390px 驗證行數 ≤ 4、無孤字** |
| h2 | `clamp(2rem, 4.5–6vw, 4.5–5rem)` | 十款 [OBS]：2.5–5.5rem |
| h3 / 列表標題 | `1.1–1.6rem` | 十款 [OBS]：1.0–1.75rem |
| 引言／大段落 | `clamp(1.5rem, 3.2–4vw, 3.3rem)` | [OBS] so 引言、cg blockquote |
| 正文 | **≥ 1rem（16px）**；中文 1.0–1.06rem、行高 1.8–2.1 | [OBS] 十款正文實測 12.2–17px；**[NEW] 提高下限到 16px** |
| 次要正文 | ≥ .875rem（14px） | [NEW] |
| mono 標籤 | **≥ .75rem（12px）**，`letter-spacing:.06–.12em` | [OBS] 十款用 .5–.72rem（缺陷）；[NEW] 提高 |
| 絕對下限 | 12px（任何可讀字） | [NEW]；audit 對 <11px 視為 WARN、<12px 在 ≤768 視為 WARN |

### 標題的 CJK 專用設定 [NEW]

| 屬性 | 十款 [OBS] | 建議 [NEW] | 理由（[MEAS]） |
|---|---|---|---|
| `line-height` | .82–1.07 | **≥ 1.0**（粗體 ≥ 1.05） | coach `.86–.88` 兩行字形接觸 |
| `letter-spacing` | −.07～−.11em | **−.02～−.04em** | CJK 字寬固定 1em，過度負字距使相鄰字形重疊 |
| `<br/>` | 全部手動 | 優先 `text-wrap:balance` + 欄寬 `max-inline-size:Nem`；必要時 `<br class="d-only">` | fn 390「解。」、cl 390「麼。」 |
| 禁止孤字 | 無 | 末行 ≥ 2 字；可用 `text-wrap:pretty` | 同上 |

## 3. 垂直留白

[OBS] 區塊間：`margin:0 auto 5rem / 6rem`、padding `3rem–6rem`；[MEAS] gaps 80、96px（一頁最大 170 為 `ra-episode` 的 padding 疊加）。

[NEW] 間距階（8 的倍數）：`--ed-s1:.5rem; s2:1rem; s3:1.5rem; s4:2rem; s5:3rem; s6:5rem; s7:6rem(96)`。
- 章節之間 `s6–s7`（80–96px）；章節內元素 `s3–s4`；標題與內文 `s2–s3`。
- 手機：章節間 `4rem`（64px）— 十款手機保持 96px 使頁面過長（`co` 390 頁高 3090、`cg` 3230）。

## 4. 欄比與間距 (Grid)

[OBS] 常見欄比（heading : content）：`.7fr 1.3fr`（fn、ll、cl）、`.8fr 1.2fr`（cl、ma、cg）、`.95fr 1.05fr`（es）、`.6fr 1.4fr`（co 信）、`.55fr 1.3fr .55fr`（so）、`260px 1fr`（cu）。
gap：`3rem`、`5vw`、`6vw`、`7vw`、`8vw`、`clamp(2rem,8vw,8rem)`。

[INF] 「左小右大」＋ `gap:5–8vw`，使標題與內文之間有 ≥ 64px 的空氣。
[NEW] 在 `minmax(0,1fr)` 取代 `1fr` 以避免長字串撐破欄（fn 的主欄就是 `minmax(0,1fr)` [OBS]）。

## 5. 色彩

十款 [OBS] 每頁色票：底 1、墨 1、強調 1（＋點綴 0–1）、線色 2–3、面板 1–2。

[NEW] token 命名與對比下限：

```css
:root{
  --ed-paper:   /* 底 */;
  --ed-ink:     /* 正文，對 paper ≥ 7:1 */;
  --ed-ink-2:   /* 次要字，對 paper ≥ 4.5:1 */;
  --ed-accent:  /* 強調（文字用），對 paper ≥ 4.5:1 */;
  --ed-accent-deco: /* 裝飾線/大形，可 3:1 */;
  --ed-line:    /* 1px 線 */;
  --ed-panel:   /* 面板底 */;
}
```
- **分開「文字用強調色」與「裝飾用強調色」**（co：`#8f554a` 做字、`#c57e6e` 做線 [OBS]）。
- 深色頁：底不用 `#000`、字不用 `#fff`（ra：`#111a24` / `#eceee9` [OBS]）。
- 影像上的文字：遮罩不透明度在文字位置 ≥ 48%（so 的 `#27332d7a` 約 48% [OBS]），並以目視＋取樣驗證。

## 6. 圖片

[OBS] 比例：4/3（fn、ll、ra、cl、cg）、3/2（es、cu、co、ma）、全幅 `cover`（so）。
處理：`border-radius:44–48% 44–48% 3–4px 3–4px`（拱形，fn/co/cg）、`rotate(1–3deg)`、`filter:saturate(.75–.83)`、`box-shadow:Npx Npx 0 色`（ll、ma）、白框（cu）。
[NEW] 規則：
- 一頁 1 張主視覺，其餘用 CSS/SVG 繪製；
- `aspect-ratio` 明確、`object-fit:cover`、`width`/`height` 屬性防 CLS；
- 傾斜 ≤ 3deg 且只加在**媒體**上，不加在文字容器上；
- 內容圖要有 `alt`；純裝飾 `aria-hidden`。

## 7. 邊框與線

[OBS] 粗線 2px（`ll`、`ma`、`fn-ledger` 上緣）起章節；細線 1px 分列；色 `#c8c6b7`～`#cdd8d5`，不超過 3 種灰度。
[NEW] 線色對 paper 的對比不要求，但**資訊性邊界（輸入框、按鈕框）需 ≥ 3:1**。

## 8. 動態

[OBS] 十款僅有：so `so-breathe 24s scale(1.06)`、ra `ra-pulse 1.8s`（僅播放時）、`details` 的 `transform .2s`、`background .2s`、`html{scroll-behavior:smooth}`。
[NEW] 預算：每頁 ≤ 1 個持續動畫、位移 ≤ 8px、scale ≤ 1.06、持續時間 ≥ 200ms；並必須有 `@media (prefers-reduced-motion: reduce)` 全域關閉。