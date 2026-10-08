# 特效參考庫｜Astro Motion Reference Library

這是 **AI 可以讀取、對照、再實作**的動效參考庫，不是獨立於網站的第二套 Theme，也不是一批已上線的效果。

## 來源與資料層級

- **Manus v2 一手來源**：使用者上傳 `manusCR-v2astro-editorial-care-tailwind-motion.zip`；配套 `manusCR-v2README.md`、`manusCR-v2COMPONENT_CATALOG.md`。
- **現行專案實作**：`src/components/blocks/`、`src/components/DemoPage.astro`、`src/components/MultiPage.astro`、`public/v02.css`、`public/blocks-v2.css` 等。請以當前 branch 的程式碼為最終事實。
- **本參考庫的 recipes**：為了與既有四套 Theme 相容而寫的**適配建議**；不是 Manus 原始碼的逐字副本，也不是已驗證功能。
- **使用者保留的檔案**：原 ZIP 才是原始程式碼全文；本 Repo 不把原 ZIP 複製成 runtime 的重複元件，避免變成 Astro 5／7、Tailwind／CSS token 雙架構。

## 從哪裡開始

| 想解決的問題 | 先讀文件 | 既有程式／Manus 來源 |
|---|---|---|
| Scroll Reveal、進場方向、延遲、重播、Stagger | [reveal-and-stagger.md](./recipes/reveal-and-stagger.md) | global `data-reveal`、ZIP: `effects/Reveal.astro`、`StaggerGroup.astro`、`scripts/reveal.ts` |
| 卡片 3D Tilt、Spotlight、CTA 磁吸 | [pointer-interactions.md](./recipes/pointer-interactions.md) | 現行 hover cards、ZIP: `effects/MotionCard.astro`、`common/Button.astro` |
| Zoom/Pan 圖片、UnderlineLink、FAQ | [content-interactions.md](./recipes/content-interactions.md) | 現行 FAQ、圖片、連結；ZIP: `effects/ZoomImage.astro`、`effects/UnderlineLink.astro`、`common/FAQAccordion.astro` |
| 什麼已存在、什麼還缺、與四套主題如何搭配 | [effect-catalog.md](./effect-catalog.md) | Motion Skill、既有 UI Skill、Manus v2 Catalog |

## AI 使用方法（每次都要遵守）

1. 讀 `../SKILL.md` 決定強度 `off/subtle/expressive`，再用 `effect-catalog.md` 選擇具體效果。
2. 讀該分類的 `recipes`、核對現有 Astro 元件；如果已存在，**擴充 Props 而不是建立重複的元件**。
3. 根據場景選一種主要動效，加至小範圍 Demo；不要一次把七種 Reveal + 3D + magnetic 堆在全部頁面。
4. 採用專案 CSS tokens 和 `class:list`／`className` 延伸點；**不需要為這些效果引入 Tailwind v4**。
5. 做好 `prefers-reduced-motion`、觸控關閉指標效果、no-JS 可讀、鍵盤焦點、Observer 清理、rAF 性能。
6. 更新 gallery / Registry（**只有新成立的 runtime 元件才加 Registry**）和 AI Skill；PR Preview 建置＋真實互動驗收，未確認不合併。

> 避免把「參考庫中有此效果」描述成「正式網站已實作此效果」。原始參數與適配決策請分開敘述。
