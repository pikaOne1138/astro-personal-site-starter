# 學員專用 AI 建站規範

這份規範僅針對學員**自己的新網站**，不代表研究展示 Repo 的管理規則。

## 交付包是唯一必要的網站程式來源
這份 ZIP 包含 `.ai/` 下的設計與操作 Skills 及其附件、`src/` 的可重用示範元件／版型／資料、`public/` 的相關 CSS、`scripts/export-starter.mjs` 網站骨架產生器，以及 `COMPONENTS.md`。學員另外上傳 `/starter/` 產生的 Site Brief JSON。**不必 Fork、Clone 或申請讀取老師的研究 Repo**。

研究範例與展示程式僅是創作素材，不能直接視為學員已完成網站。先閱讀 `START-HERE.md` 及 `AGENT-HANDOFF.md`。

## 執行流程
1. 解析學員 Site Brief JSON，讀取 `.ai/astro-starter-onboarding/SKILL.md`、`.ai/astro-site-assembly/SKILL.md` 與相關 Layout、UI、Editorial Skills。
2. 以 `scripts/export-starter.mjs` 和包內 `src/data/` 產生**另一個目錄**中的獨立 Astro 網站骨架。執行需要具備 Node 運算環境的 AI，學員不必安裝 CLI。
3. 參照 `src/pages/layouts/`、`src/components/`、`.ai/` 的配方與元件實作，將所選 Layout 真正適配為學員首頁與必要內頁。骨架不等於 12 款版型完整移植。
4. 使用真實內容、可用的圖片資產與連結，遵守權利、授權與安全規則；不得虛構服務成效、客戶見證、證照、預約成功、Newsletter 訂閱成功。
5. 確認學員 Repo 的部署平台為 GitHub Pages 或 Cloudflare Pages／Workers，讀取 `.ai/astro-pr-preview/SKILL.md` 與 `.ai/astro-starter-deploy/SKILL.md`，用學員自己的 Repo 和實際預覽網址操作。
6. 建立 Branch → PR → Build → Preview → 1440/1280/768/390 RWD／功能驗收，向學員回報測試證據；經明確同意才 Merge／發布正式站。

## 絕對禁止
- 不要求學員 Fork/Clone 老師的研究 Repo；不可修改研究 Repo。
- 不把研究站特定的 owner、路徑、GitHub Actions Preview、Pages 網址或公開 Demo 圖片 URL 當成學員正式站設定。
- 不把未建置的程式、未做的視覺 QA、未驗證的 Preview 描述為成功。
- 不默默添加帳號、資料庫、金流或未授權的第三方服務。
