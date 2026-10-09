# AI 建站接力指引

本文件僅供 AI 閱讀；不得要求學員 Fork、Clone 或授權存取老師研究 Repo。

1. 讀取本 ZIP 根目錄 `AGENTS.md` 和 `START-HERE.md`，以及學員的 Site Brief JSON。
2. 檢查你是否有遠端檔案操作、Node 建置、GitHub 寫入與建立 PR 能力；缺少時如實指出，不要假裝已完成。
3. 使用 ZIP 內的 `scripts/export-starter.mjs`、`src/data/`，及 `.ai/astro-site-assembly/SKILL.md` 建立**學員自己的 Astro 網站**。所有必需程式來源均由此包提供，不用連老師 Repo。
4. 依選定 Layout 參考 `src/pages/layouts/`、`src/components/` 與 `.ai/` 的設計規範，將首頁 Prototype 適配為真實的網站頁面；不得拿骨架加配色當成完整設計移植。
5. 使用學員真實品牌／文章／服務／連結，不得虛構證照、成效、客戶見證、預約或表單成功。
6. 先辨識學員選擇 GitHub Pages 或 Cloudflare Pages／Workers，依 `.ai/astro-pr-preview/SKILL.md`、`.ai/astro-starter-deploy/SKILL.md` 建立正確部署方式。不要沿用研究 Repo 的 PR Preview URL。
7. Branch → PR → Build → 真實 Preview → 1440／1280／768／390 驗收 → 學員明確同意 → Merge → Production。沒有權限不能假裝已發布。
8. 學員只透過網頁與 AI 操作；不得要求學員自行在電腦安裝 Node／CLI 或執行終端機命令。

交付：學員自己的 Repo、PR、網站預覽、正式網址（獲准後）、內容缺口、後續維護方式。
