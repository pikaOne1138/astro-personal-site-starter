# 03 學習實驗室 `ll-`（知識／教學）

來源：`src/pages/layouts/learning-lab/index.astro`

## [OBS] 原始碼事實

**容器**：`.ll-site{padding:0 clamp(1rem,4vw,4.5rem);background:var(--ll-paper)}`（`#f4f5ef`）。內層統一 `max-width:1320px;margin:0 auto`（hero、path、modules、footer 同寬）。
Header：`height:84px;border-bottom:2px solid var(--ll-ink)`；footer 同樣 `border-top:2px solid var(--ll-ink)` —— **粗線包住整頁，如試卷的上下框線**。

**Grid**
- Hero：`grid-template-columns:1.02fr .98fr 40px;gap:3rem;min-height:590px;padding:4rem 0;align-items:center`（第三欄 40px 是直排索引 `.ll-side-index{writing-mode:vertical-rl;height:260px;border-left:1px solid}`）。
- Path：`grid-template-columns:.7fr 1.3fr;gap:6vw;border-top:2px solid var(--ll-ink);padding-top:2rem`。
- Modules：面板 `background:#e5e8f2;padding:clamp(1.2rem,4vw,3rem);grid-template-columns:.72fr 1.28fr;gap:4vw`。

**Hero 構圖**：左文右圖，**用「硬陰影」做識別**：
`.ll-hero-art img{border:2px solid var(--ll-ink);box-shadow:12px 12px 0 var(--ll-yellow);transform:rotate(1deg)}`；按鈕 `.ll-button{background:var(--ll-blue);box-shadow:4px 4px 0 var(--ll-yellow)}`。
標題第二行 `h1 span{background:var(--ll-yellow);padding:0 .15em;box-decoration-break:clone}` —— 螢光筆標示。

**標題**：`.ll-hero-copy h1{font-size:clamp(4rem,8.5vw,8.5rem);line-height:.96;letter-spacing:-.09em}`；
章節標題 `.ll-path header h2{font-size:clamp(2.6rem,5vw,5rem);line-height:.98;letter-spacing:-.08em}`。字體 `Arial,"Noto Sans TC"` —— 無襯線（與前兩款襯線形成對比）。

**時間軸（圓點不壓字的做法）**
- `.ll-track{position:relative}` ＋ `.ll-track::before{left:27px;top:30px;bottom:30px;width:2px;background:var(--ll-blue)}`。
- 每列 `.ll-unit{display:grid;grid-template-columns:58px 1fr 78px;gap:1rem;align-items:center}`；圓點 `.ll-unit-no{width:54px;height:54px;border-radius:50%;z-index:1}` **獨占 58px 欄**，文字在第 2 欄。
- **線的 x（27px）= 圓點寬（54px）÷ 2**；手機 `grid-template-columns:46px 1fr 68px`、圓點 42px、線 `left:20px`（≈21，差 1px）。
- 圓點三色：預設黃、`--blue` `#b7c5ff`、`--coral` `#f28a6a`。

**互動**：勾選＋進度。`<input class="ll-check" type="checkbox">` 搭配原生 `<progress id="ll-progress" max="3">` 與 `aria-live="polite"` 的文字 `#ll-progress-label`；
inline script 更新 `progress.value` 並切換 `.is-done`（背景 `#e9f0df`，`transition:background .2s`）。無 JS 時內容仍可讀。

**手機**：≤900 hero 保持 `1fr 1fr`、隱藏 `.ll-side-index`、path/modules 單欄；≤600 hero 單欄、`h1{font-size:18vw}`、`.ll-hero-art{width:94%;margin-left:auto}`、勾選欄縮 68px；header nav `order:3;width:100%;justify-content:space-between`。

## [MEAS]
- h1 1440：122.4px，3 行；390：70.2px，3 行。
- 觸控：390 下 <44px 的可操作元素 12 個（`.ll-complete` 標籤文字 `.55rem`、checkbox 15px）。
- 全頁字級 12–13 種。

## [INF] 可重用原則
1. **節點軸做法**：節點占獨立 grid 欄，軸線以 `left = 欄寬 ÷ 2` 絕對定位在 `::before`，節點 `z-index:1`。圓點因此永遠不會壓到文字。
2. 硬陰影（`Npx Npx 0 色`）＋ 2px 邊框 ＝ 低成本的「教學／手作」識別，只用在 1 張圖與 1 顆按鈕。
3. 互動的「狀態」放在頁面上（進度條＋文字＋列背景），而非彈窗。

## [DEFECT] 不要複製
- `.ll-complete` `.62rem`（約 10px）、checkbox 15–17px：390 下觸控區不足。
- `.ll-unit>a` 選擇器沒有對應元素（箭頭已移除）—— 死 CSS。
- `.ll-progress label` 與狀態文字 `font:.62rem ui-monospace`（約 10px），是頁面的主要回饋資訊卻是最小的字。

## [NEW]
- 勾選列整列變成 `<label>`，點擊面積 ≥ 44px 高；`.is-done` 另外加上文字「已完成」以免只靠顏色。