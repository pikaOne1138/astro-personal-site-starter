# 05 聲音通信 `ra-`（知識／聲音）

來源：`src/pages/directions/knowledge/radio-letter.astro`

## [OBS] 原始碼事實

**容器**：深色根 `.ra-site{background:var(--ra-bg)}`（`#111a24`），文字 `--ra-ink:#eceee9`、次要 `--ra-dim:#9ea9b5`、強調青 `--ra-cyan:#6fe0d2`、點綴橘 `--ra-orange:#ff9364`。
內層 `max-width:1320px`；**`.ra-episode{max-width:1100px}` 比其他區塊窄**，[MEAS] 1440 左緣 170 寬 1100（閱讀區自動縮窄）。

**Grid**
- Hero：`grid-template-columns:1.1fr .9fr;column-gap:5vw;min-height:600px;padding:4rem 0 3rem`；波形 `.ra-wave{grid-column:1/-1}` 跨滿兩欄作為 hero 的底部「地平線」。
- Episode：`grid-template-columns:.85fr 1.15fr;gap:6vw`。
- Archive 列：`.ra-archive li{grid-template-columns:130px 1fr 70px}`（編號/日期｜標題｜時長，最後欄 `text-align:right`）。

**Hero 構圖**：左 h1＋說明＋逐字稿連結；右 4/3 封面圖（`transform:rotate(1deg)`）；整排下方一條 70px 高的波形帶（上下 `1px solid #34404c`）。

**標題**：`.ra-hero h1{font-size:clamp(3.6rem,7vw,7.1rem);line-height:1.02;letter-spacing:-.075em}`，`em` 切到 `Georgia,serif` ＋青色。**無襯線＋襯線斜體混用**是此頁的「雙聲」標題。

**波形（由 JS 以外的資料驅動）**：Astro frontmatter 內 `Array.from({length:46},(_,i)=><i style={`--bar:${((i*17)%7)+2};--lag:${i*13}ms`}></i>)` 產出 46 根；
CSS `.ra-wave i{height:calc(var(--bar)*7px);flex:1;max-width:13px;background:linear-gradient(0deg,#344e5c,var(--ra-cyan));opacity:.62}`。
`--bar` 取 `((i*17)%7)+2`，→ 2–8 的偽隨機序列，**不用 Math.random，所以 SSR 與重新整理結果穩定**。

**動畫只在使用者播放時啟動**：`.ra-site[data-speaking="true"] .ra-wave i{animation:ra-pulse 1.8s ease-in-out infinite alternate;animation-delay:var(--lag)}`；
inline script 監聽 audio 的 `play/pause/ended/error`，設／移除 `data-speaking` 並更新 `role="status" aria-live="polite"` 的 `#ra-status` 文字。

**媒體**：原生 `<audio controls preload="metadata">`，`.ra-audio{width:min(300px,100%);height:40px;color-scheme:dark}`；`<source>` 內附降級文字「請閱讀下方逐字稿」。

**逐字稿**：`.ra-transcript{border-left:1px solid #3a4a55;padding-left:1.5rem}`，時間碼 `.ra-time{font:.6rem ui-monospace;color:var(--ra-cyan)}` 與段落交錯，段落 `line-height:1.9;color:#d1d5d4`。

**手機**：≤760 hero 單欄、`.ra-cover{width:85%;margin-left:auto}`、player-note 換行 `flex-wrap:wrap`（audio `flex-basis:100%`）；≤480 `h1{font-size:15vw}`、archive 欄 `78px 1fr 48px`。

## [MEAS]
- h1 100.8px×3；390：58.5px×3。
- reduced-motion：無限動畫 0（因未播放）。對比 0 個失敗（淺字深底）。
- 最小字級 8.3px；29 處 <12px；390 下 <44px 目標 10 個（含 `<audio>` 控制列之外的 mono 連結）。

## [INF] 可重用原則
1. **深色頁**：底 `#111a24`（非純黑）、正文 `#d1d5d4`（非純白）、次要字 `#9ea9b5`，對比仍通過；用 1 個冷色強調（青）＋ 1 個暖色點（橘，只作指示燈小圓點）。
2. **狀態驅動動畫**：動畫存在的理由是「正在播放」，所以預設靜止＋`data-*` 開關，天然符合 reduced-motion。
3. 資料驅動的裝飾（波形）以 CSS 變數 `--bar/--lag` 傳值，不用 JS 動畫迴圈。
4. 閱讀區比其他區塊窄（1100 vs 1320），因為內容是長文。

## [DEFECT]
- `.ra-player-note` 字 `.72rem`、`.ra-archive li` `.68rem`。
- 波形條在手機全部保留 46 根（`overflow:hidden` 切掉右側），沒有依寬度調整數量。

## [NEW]
- 以 CSS 縮減條數：`@media(max-width:480px){.wave i:nth-child(n+25){display:none}}`。