# AI 建站接力指引

本文件給 AI 在**接手既有專案、跨對話或跨代理**時閱讀；初次建站從 `START-HERE.md` 開始。不得要求學員 Fork、Clone 或授權存取老師的研究 Repo。

1. 接手既有網站時，先檢查網站自己的 `PROJECT.md`、`AGENTS.md`、未提交的修改、分支與 GitHub 狀態，**不能拿這個 ZIP 覆蓋原網站**。再讀 ZIP 根目錄的 `AGENTS.md`、`PROJECT-TEMPLATE.md` 與學員的 Site Brief JSON。
2. 用 `scripts/export-starter.mjs` 建立學員自己的 Astro 網站後，確認根目錄有學員專屬的 `PROJECT.md` 與 `AGENTS.md`，其中的 Layout 必須與 `site.config.json` 相同。必須依 Site Brief 的 `layoutSlug` 選用對應原始碼，不得改回通用首頁；哪些版型可組裝、各自的狀態，以 `src/data/layout-assembly/definitions.mjs` 為準，細節見 `EXPANDED-LAYOUTS.md`。
3. 首頁 Prototype 要適配成真實的網站頁面，不能拿骨架加配色當成完整的設計移植。Site Brief 的選擇不等於視覺驗收，也不得覆蓋學員已做的決策。
4. 匯出網站的 `.github/workflows/pr-check.yml` 只驗證 PR 能 Build 並上傳靜態網站 Artifact，**本身不是可在瀏覽器打開的 PR Preview**；`.github/workflows/deploy.yml` 只處理合併後的正式 GitHub Pages 發布。預覽與發布的規則見 `.ai/astro-pr-preview/SKILL.md` 與 `.ai/astro-starter-deploy/SKILL.md`。

交付：學員自己的 Repo、PR、網站預覽、正式網址（獲准後）、內容缺口、後續維護方式。
