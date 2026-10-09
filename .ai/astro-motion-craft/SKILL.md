---
name: astro-motion-craft
description: Design, tune and audit restrained Astro motion interactions using reusable effects, four existing theme tokens and accessibility-first performance constraints.
version: 1
---

# Astro Motion Craft — 動效與微互動設計 Skill

## 必讀：特效參考庫（不是只有一份 Skill 文件）

本專案維護 `library/`，把 Manus v2 原始檔案的實際 API、數值、行為與我們現有 Astro 元件放在一起。**每次要寫動效程式前，必須先讀庫內的對應 recipe，不能只根據效果名稱猜測。**

- 入口：[`library/README.md`](./library/README.md)
- 完整現況／Manus 來源／設計分工：[`library/effect-catalog.md`](./library/effect-catalog.md)
- Reveal + Stagger：[`library/recipes/reveal-and-stagger.md`](./library/recipes/reveal-and-stagger.md)
- Tilt / Spotlight / Magnetic：[`library/recipes/pointer-interactions.md`](./library/recipes/pointer-interactions.md)
- ZoomImage / UnderlineLink / FAQ：[`library/recipes/content-interactions.md`](./library/recipes/content-interactions.md)
- 原始檔路徑、版本對照：[`references/manus-v2-motion-map.md`](./references/manus-v2-motion-map.md)

**資料等級標示**：
1. 「Manus 原始碼確認」為使用者提供的 ZIP 檔案中可核對的 Props 與 JS；
2. 「本專案建議／recipe」為我們依現有四套主題重新設計的融合方案；
3. 「已實作」只以本 GitHub 分支實際存在的元件與網站展示為準。

這個 library 是**實作知識庫**，不是自動引入外部程式碼的 runtime。新的 AI Agent 若無法直接存取原始 ZIP，仍能按 library 的參數與源檔路徑做受限的可重用實作；需要完整逐字移植前則需再次取得原 ZIP 並核對授權與相容性。

## 何時使用

使用者要求：網站「更精緻」、滾動出場、Stagger、3D Tilt／Spotlight、圖片 Zoom／Pan、磁吸 CTA、連結底線、FAQ 展開動態；或要求減少動畫、提高易讀性、維持手機效能。此 Skill 是設計與工程**規格**；不可宣稱本專案已實作所有 Manus 效果。參照 `references/manus-v2-motion-map.md` 中逐項實作對照。

## 步驟（必須依序）

1. **讀來源與現況**：先讀 `library/README.md`、`library/effect-catalog.md` 和相關 recipe；再查 `src/data/blocks.registry.json`、`src/components/`、`public/v02.css`、`public/blocks*.css`、`.ai/astro-ui-craft/SKILL.md`；不要把 Manus 原始檔名誤認為本專案已安裝。確認頁面是知識／部落格或身體工作、諮商心理、教練、靈氣等助人者。
2. **定義動作目的**：每個效果必須完成至少一項目的：建立層級、提示可操作性、協助閱讀、降低資訊密度、清楚回饋。無目的不加。
3. **選動效強度**：預設 `subtle`；若沒有指定，**不要**全站使用 tilt、spotlight、magnetic、parallax。
4. **沿用四套主題**：paper/morning/studio/botanical 使用現有 `--text`, `--muted`, `--accent`, `--surface`, `--line`, `--radius` 等 CSS 變數。不要直接導入 Manus 的 forest／sage Tailwind palette 覆蓋設計；若必須使用 Tailwind v4，先確定現有 Astro 建置、CSS cascade 與依賴相容。
5. **先檢查現有效果**：global `[data-reveal]`、`TableOfContents`、`FAQ`、`PostCard` hover、`ArticleViewSwitcher` 已有互動。可以增強，但不能雙重 observer、重複轉場或重設焦點。
6. **在四套主題與兩類網站驗證**：375/390px、平板、桌機；觸控、滑鼠、鍵盤與 `prefers-reduced-motion:reduce`。無 JavaScript 時文字、FAQ、導覽必須可見可用。
7. **分支與合併**：用 GitHub PR 做小幅且可預覽的變更，更新 Registry、展示、`COMPONENTS.md`、Skill／reference；Build 成功、瀏覽器實測後請使用者確認才合併。

## 強度政策

| 等級 | 使用範圍 | 位移／時間／效果 |
|---|---|---|
| `off` | 使用者要求、動態不適、資訊密集頁 | 不使用非必要出場、傾斜、磁吸；保留 focus/按鈕狀態 |
| **`subtle` 預設** | 長文章、服務頁、專業資訊 | reveal 單次、6–14px、450–750ms；hover 1–3px，陰影細微；只 1 個主視覺焦點 |
| `expressive` 選配 | 行銷首頁、可操作示範、非長閱讀主欄 | 允許少量 stagger、soft zoom、spotlight／tilt **擇一**；tilt 1–4°、延遲疊加最多 600ms |

數值是**本專案建議值**，不是 Manus 原始元件的原封設定。Manus 的實際限制另見 references。

## 效果使用場景

| 元件／效果 | 適合 | 不應使用 |
|---|---|---|
| Reveal (fade/soft zoom/slide/clip) | Hero、區段第一次進入 | 每行文字重播、重要文字先隱藏、長篇正文段段飛入 |
| StaggerGroup | 3–6 張服務／文章卡片 | 過多項目逐張延遲導致頁面卡頓 |
| MotionCard tilt / spotlight | 少量行銷卡片、可選功能示範 | 關於／法務／費用等需安定閱讀的主內容；手機追蹤 |
| ZoomImage zoom / pan | 攝影、作品集、視覺故事 | 文字截圖、圖表、需要精確閱讀的圖片 |
| Button magnetic | 最多一個高辨識度 CTA | 所有按鈕，尤其手機或關鍵表單動作 |
| UnderlineLink | 文字 CTA、文章索引與 footer | 依靠 hover 才顯示連結意義 |
| FAQ Accordion | 常見問題 | 過度複雜的高度動畫、變成無法鍵盤操作的自製 div |
| ReadingProgress | 長文章 | 將整頁頁腳也納入閱讀進度 |

## 不可妥協的降級要求

- `prefers-reduced-motion: reduce`：取消平移、縮放、3D、磁吸與非必要延遲；內容立即可見。
- 只有 `(hover:hover) and (pointer:fine)` 啟用 3D Tilt、Spotlight 指標追蹤、Pan 與 Magnetic。觸控關閉指標追蹤；鍵盤焦點必須仍有清楚可見的狀態。
- 不在 server-rendered HTML 將核心內容永久設為 `opacity:0`；有 JS + IntersectionObserver 才漸進增強。對 `IntersectionObserver`／`ResizeObserver` 缺席提供立即可見 fallback。
- 避免 layout thrash：以 transform/opacity 為主；scroll 用 passive listener + rAF；mouseleave 回復狀態；必要時 observer disconnect。
- 照片與文字不得因動畫造成版面位移；圖片固定 aspect ratio + alt；no-JS 保留所有內容。
- 交互型元件使用原生 button/link/details，支援 Tab、Enter/Space、Esc、focus-visible；不要在無互動 div 上假裝按鈕。

## AI 產出契約

若使用者請求「做出某網站同款精緻感」：
1. 先輸出簡短**動效地圖**：頁面區段、效果、用途、強度、觸控／reduced-motion 行為。
2. 檢查是否可由既有元件 props 達成；新效果需提供可重用 Props 與 `className` 或 `class` 合併方式。
3. 保留內容可讀性、SEO、網站速度、真實 CTA；示範型效果不要讓正式網站看起來像動畫 playground。
4. PR 預覽附簡單前後對照與鍵盤／觸控驗收，不主張僅因 build 通過就等於動效品質過關。

> 參考庫是常駐的設計資產，新增效果、修正既有效果時，也要回填 `library/effect-catalog.md` 的狀態與對應 recipe。

> Manus v2 參考資料：`manusCR-v2README.md`、`manusCR-v2COMPONENT_CATALOG.md` 與使用者提供的 `manusCR-v2astro-editorial-care-tailwind-motion.zip`。這些是**設計研究來源**，不直接代表本 repo 的已安裝依賴或現有實作。


## 實際可操作的特效庫（本 PR 新增）

- 預覽網址：`/effects/`（GitHub Pages 請加上 repo BASE_URL；PR 預覽走 `/pr-preview/pr-N/effects/`）。
- 元件來源：`src/components/effects/`，七個實際元件：`Reveal`、`StaggerGroup`、`MotionCard`、`ZoomImage`、`MagneticButton`、`UnderlineLink`、`MotionFAQ`；索引：`src/data/effects.registry.json`。
- 六個可操作的分類：Reveal、Stagger、Tilt／Spotlight、圖片 Zoom／Pan、磁吸／底線、可調 FAQ。可切換四套 Theme 和 off／subtle／expressive 強度，且 Reveal／Stagger 可重播。
- **與原有 53 個 blocks 分開計數**：效果不是網站內容型區塊。後續組裝網站時優先將 effects 與既有 blocks 組合，必要時再抽象成可覆寫的 props，不要把整個展示頁複製到實站。
- 舊文獻中標示「待移植」的效果已至少有**本 PR 版本的基本 Demo**，但並不表示與 Manus CSS、Tailwind 或所有參數完全一致。確認輸入方式、視覺與動效後才可說「正式完成」。

## 系統動畫效果／降低動態的必要診斷

當使用者回報「所有效果都沒動」時，**優先檢查系統與瀏覽器的動態偏好，不要直接調動畫 CSS**：

1. 在 `/effects/` 閱讀 runtime diagnostics：`prefers-reduced-motion`、精準指標、CSS 是否載入、JS 是否執行。此頁也有各裝置的設定教學。
2. Windows 11：設定 → 協助工具 → 視覺效果 → 「動畫效果」**開啟**；Windows 10：輕鬆存取 → 顯示 →「在 Windows 中顯示動畫」**開啟**。
3. macOS：系統設定 → 輔助使用 → 動態效果（較舊版可能在「顯示」）→「減少動態」**關閉**。
4. iPhone／iPad：設定 → 輔助使用 → 動態效果 →「減少動態效果」**關閉**。
5. Android：設定 → 無障礙 → 色彩與動態 →「移除動畫」**關閉**；依廠牌搜尋設定內的「動畫」。
6. 重新整理並按「重新檢查」。滑鼠追蹤效果仍需要 `(hover:hover) and (pointer:fine)`，觸控沒有相同 hover 行為。
7. 系統減少動態是使用者的無障礙偏好，不要全站偷偷覆寫。只有在示範庫按明確同意按鈕，才於當頁、當次暫時試玩；正式內容繼續尊重偏好。

若操作系統的動畫設定曾關閉，即使網站程式、圖片、CSS、JS 都正確，也會出現「完全不動」的情況。不能把 Actions Build 成功等同於動畫正常播放。


## 返回頁首效果
已有 `src/components/blocks/BackToTop.astro` 可重複使用；捲動顯示和返回頁首預設依照系統減少動態偏好降級。它是導航控制而非純視覺效果，應放在共用 Layout，勿在特效庫重複造一個同義的元件。


## Layout composition is a separate layer
Twelve structural directions live at `/layouts/`, with their own `.ai/astro-layout-craft/SKILL.md`. Do not use motion to compensate for a weak layout; choose the content reading flow first. A subtle reveal fits only selected sections and never makes distinct website layouts identical.


## 與 Claude 編輯式構圖的使用順序

先選 `astro-layout-craft` 的整頁動線，再參照 `astro-editorial-layout-design` 的 40 款構圖配方，最後才由本 Motion Skill 加入必要的動效。即使元件可用 Tilt/Spotlight/Reveal，也不得藉動效掩蓋內容結構薄弱或字級留白問題。


## 外部動效資源評估（特效庫底部）

使用 `src/data/external-motion-resources.json` 與 `/effects/#external-motion` 作為**參考清單**，包含 Animista、Animate.css、Hover.css、Uiverse、Motion、GSAP、AOS、CSS Loaders。清單不是安裝清單，也不代表已完成元件安全與授權驗收。

- 先盤點本專案 `src/components/effects/` 的 Reveal／Stagger／Card／ZoomImage／MagneticButton／UnderlineLink／MotionFAQ；如果已滿足需求，不要另裝 AOS 等重疊方案。
- 原生 CSS 動效優先；需要複雜捲動敘事才考慮 Motion 或 GSAP。外部網站與原始碼的授權、依賴、維護、性能要個別確認。
- 任何動效都必須支援 `prefers-reduced-motion`；手機沒有 Hover 時功能仍要完整，鍵盤與觸控操作要合理，JS 失敗時內容仍可閱讀。
- 動效服務於閱讀和回饋；靜態文章站不應為了好看加入假的載入動畫或全頁過度動效。
- 請先給學員能理解的比較與建議，取得同意後才在 Branch + PR 引入外部程式；Build 通過仍須四個視口實際 QA。

- Animate.css 現行官方標示 Hippocratic License 2.1；Hover.css 對商業及再散布用途有不同授權條件。外部範例只作連結與研究，**不得把其 CSS 原碼直接編入會分發給學員的 Starter**，除非逐項完成適用授權確認。
- Splide 屬於可操作的輪播元件候選，應歸 Blocks／UI Craft 的評估流程，**不是 Motion Effect 計數項目**。靜態內容優先列表或 CSS scroll-snap；非必要不要加自動輪播，自動輪播時要提供暫停控制、鍵盤與減少動態支援。
- AOS 是 scroll-triggered reveal，不等於完整 parallax；我們已有 Reveal／Stagger，先檢查重疊。
