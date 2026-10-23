# 動效型錄：Manus v2 × 現有 Astro 元件

「本專案現況」欄的事實來源是 `src/data/effects.registry.json` 與 `src/components/effects/`，文件可能落後，以程式碼為準。Manus API 與原始行為依使用者提供的 ZIP 實際檔案核對；以下「建議」則是本專案新設計決策。

| ID | Manus 原始 Props／行為 | 本專案現況 | 方案與強度 |
|---|---|---|---|
| R01 Reveal | `fade-up`、`fade`、`soft-zoom`、`blur-up`、`slide-left`、`slide-right`、`clip-up`；delay 0–1400、duration 350–1400、once | **已有** `Reveal.astro`（七種 variant），使用 `data-motion-*` 屬性與自己的 observer；全站另有 `DemoLayout` 的全域 `[data-reveal]` 簡單淡入，兩者屬性不同，不可混標同一元素 | 保留既有 observer，增加可選 variant；**預設 subtle**，長文減少使用 |
| R02 StaggerGroup | step 20–260、start 0–1200；子元素 `[data-reveal]` 延遲最高 1600ms | **已有** `StaggerGroup.astro`：只對**直接子層、且帶 `data-motion-reveal`**（也就是 `Reveal`）的元素設定延遲，單項延遲上限 1400ms | **僅 3–6 個子元素，建議總延遲≤600ms** |
| P01 MotionCard | `tilt`、`spotlight`、`tiltMax` 1–8 (default 4)、`reveal`；pointermove + rAF | **已有** `MotionCard.astro`（tilt、spotlight）；既有 `PostCard` hover 另保留 | 擇一選用，預設不開 tilt/spotlight； fine-pointer desktop |
| P02 Magnetic Button | `magnetic` boolean，指標牽引幅度由移動 x 8px／y 6px 計算 | **已有** `MagneticButton.astro`；原 `Button` 沒有改 | 預設關閉；只在主要 CTA 使用，不用在表單送出等關鍵操作 |
| I01 ZoomImage | `zoom/pan/none`，`aspectRatio`、`position`、`src`、`alt`、`href`、`className` | **已有** `ZoomImage.astro`（zoom、pan、none） | 有授權的照片使用；表格、資訊圖、文字截圖不做 pan |
| L01 UnderlineLink | `grow/center/marker`、arrow、external、className | **已有** `UnderlineLink.astro`（grow、center、marker） | 應和現有文字連結樣式融合；保持 focus-visible |
| F01 FAQAccordion | `line/soft/cards`、openFirst、className；原生 details | **已有** `MotionFAQ.astro`（效果庫內的獨立展示元件）；既有 FAQ／ArticleAccordion 沒有改。學員的單一網站依需求修改現有 FAQ，除非學員明確要新增另一種，才另開新元件 | **增強既有**，不要多生一套 FAQ；條件支援時 CSS 高度動畫 |
| A01 ReadingProgress | `forest/warm/ink` 變體 | **已有** ReadingProgress | 仍使用既有 `--accent`，不建立第二套顏色 |
| N01 SiteHeader glass | `glass=false` 可關閉透明磨砂 | **已有**不透底 sticky nav | 預設透明磨砂**禁止**，維持已確認的 Header 設計 |
| T01 Tailwind tokens | `@theme inline` sage/forest/clay、`className` 靜態掃描 | **已有**四套 CSS tokens，尚未用 Tailwind v4 | **不移植 Tailwind 配置**；以 class:list、CSS vars 與既有 CSS 層級提供覆寫 |

### 精緻感而不是堆動畫

- **paper 紙墨**：線條、排版、連結底線；Reveal 最輕，避免 Spotlight 卡片。
- **morning 晨光**：小幅柔焦與淡入；不因柔和就一律套玻璃導覽列。
- **studio 靜室**：精準的 CTA 回饋、線性節奏；需要時在少數示範卡用 Tilt。
- **botanical 植感**：可在有授權的攝影內容選配 Zoom/Pan、局部 soft zoom，不能把所有段落漂浮化。
- **知識文章**：內容、程式碼和內文應穩定可複製；不做持續的滑鼠跟隨特效。
- **心理、身體工作、教練、靈氣**：費用、資格、服務限制、預約和緊急資訊均避免搖晃／磁吸，重點是信任與清晰。

### 前端效能與無障礙驗收

- 非必要動效必須尊重 `prefers-reduced-motion:reduce`；非精準滑鼠關閉 pointer transforms。
- 無 JS：內容可見、FAQ 可展開、連結可點；不允許關鍵文字永遠 `opacity:0`。
- 軟體使用者 Tab 焦點清楚；小觸控目標需至少 44px。
- PointerMove 僅讀取必要 rect、透過 requestAnimationFrame 合併寫入 CSS vars；pointerleave / cancel 回復。
- CSS 先用 transform 和 opacity，避免 width/top/left 連續重排。
- 以一頁中的**單一主要效果**做精緻重點，請勿連續讓所有元件「同一種浮動」。


## 實作狀態

`src/components/effects/` 的七個元件，是我們用自己的 `public/effects.css` 實作的版本，**不是直接載入 Manus 原始 CSS**；`src/pages/effects/index.astro` 提供對應的互動展示。`src/data/effects.registry.json` 是效果索引，與 `src/data/blocks.registry.json` 的網站元件分開。若要融合既有 `FAQ.astro` 或 `Button.astro` 的 API，先比較目前行為與真實頁面的樣式，避免重複打包與 CSS 衝突。
