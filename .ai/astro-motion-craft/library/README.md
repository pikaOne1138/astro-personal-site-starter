# 特效參考庫｜Astro Motion Reference Library

這是 **AI 可以讀取、對照、再實作**的動效參考庫，不是獨立於網站的第二套 Theme，也不是一批已上線的效果。

## 來源與資料層級

- **Manus 一手來源**：使用者提供的 Manus 專案（Astro + Tailwind 動效範例）與它的 README／元件目錄。完整專案不在本 Repo；本庫只保留 `source-snapshots/manus-source/` 裡的九個摘錄快照，內容是第三方程式碼，**僅供對照，不要載入或執行**。
- **現行專案實作**：`src/components/effects/`（七個效果）與 `public/effects.css`，其他互動見 `src/components/blocks/`、`public/multipage-nav.css`、`public/article-explorer.css`。請以目前程式碼為準。
- **本參考庫的 recipes**：為了與既有主題相容而寫的**適配建議**；不是 Manus 原始碼的逐字副本，也不是已驗證功能。
- 本 Repo 不把 Manus 專案複製成 runtime 元件，避免出現 Tailwind／CSS token 雙架構。要逐字移植前，需另外取得原專案並核對授權與相容性。

## 命名規則（Manus 檔案與我們的元件同名）

Manus 的檔案常與我們的元件同名，例如兩邊都有 `Reveal.astro`。文件裡一律這樣寫，避免混淆：

- Manus 的檔案：寫成 `Manus: effects/Reveal.astro`，快照是 `library/source-snapshots/manus-source/Reveal.astro.txt`。
- 我們的元件：寫完整路徑 `src/components/effects/Reveal.astro`。

## 從哪裡開始

| 想解決的問題 | 先讀文件 | 既有程式／Manus 來源 |
|---|---|---|
| Scroll Reveal、進場方向、延遲、重播、Stagger | [reveal-and-stagger.md](./recipes/reveal-and-stagger.md) | global `data-reveal`；`src/components/effects/Reveal.astro`、`StaggerGroup.astro`（Manus: `effects/Reveal.astro`、`StaggerGroup.astro`、`scripts/reveal.ts`） |
| 卡片 3D Tilt、Spotlight、CTA 磁吸 | [pointer-interactions.md](./recipes/pointer-interactions.md) | 現行 hover cards；`src/components/effects/MotionCard.astro`、`MagneticButton.astro`（Manus: `effects/MotionCard.astro`、`common/Button.astro`） |
| Zoom/Pan 圖片、UnderlineLink、FAQ | [content-interactions.md](./recipes/content-interactions.md) | 現行 FAQ、圖片、連結；`src/components/effects/ZoomImage.astro`、`UnderlineLink.astro`、`MotionFAQ.astro`（Manus: `effects/ZoomImage.astro`、`effects/UnderlineLink.astro`、`common/FAQAccordion.astro`） |
| 什麼已存在、什麼還缺、與各主題如何搭配 | [effect-catalog.md](./effect-catalog.md) | Motion Skill、既有 UI Skill、Manus 元件目錄 |

## AI 使用方法（每次都要遵守）

1. 讀 `../SKILL.md` 決定強度 `off/subtle/expressive`，再用 `effect-catalog.md` 選擇具體效果。
2. 讀該分類的 `recipes`、核對現有 Astro 元件；如果已存在，**擴充 Props 而不是建立重複的元件**。
3. 根據場景選一種主要動效，加至小範圍 Demo；不要一次把七種 Reveal + 3D + magnetic 堆在全部頁面。
4. 採用專案 CSS tokens 和 `class:list`／`className` 延伸點；**不需要為這些效果引入 Tailwind v4**。
5. 做好 `prefers-reduced-motion`、觸控關閉指標效果、no-JS 可讀、鍵盤焦點、Observer 清理、rAF 性能。
6. 更新 gallery / Registry（**只有新成立的 runtime 元件才加 Registry**）和 AI Skill；PR Preview 建置＋真實互動驗收，未確認不合併。

> 避免把「參考庫中有此效果」描述成「正式網站已實作此效果」。原始參數與適配決策請分開敘述。


## 線上互動範例和效果登錄表

- Astro 展示：`src/pages/effects/index.astro` → `/effects/`，四套主題即時切換。
- 可重複使用：`src/components/effects/*.astro`；一組效果不等於一個完整頁面。
- 機器可讀效果登錄：`src/data/effects.registry.json`，含可用變體、預設強度、觸控與減少動態策略。
- 實際樣式：`public/effects.css`；自製本地插畫 `public/effects-sample.svg`，無外部影像依賴。
- 檢查效果是否已實作時先查上述 runtime 檔案。源碼快照及 recipe 屬研究佐證，不是 production bundle。
