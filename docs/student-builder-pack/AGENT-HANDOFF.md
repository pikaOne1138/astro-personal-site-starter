# AI 建站接力指引

本文件僅供 AI 閱讀；不得要求學員 Fork、Clone 或授權存取老師研究 Repo。

1. 讀取本 ZIP 根目錄 `AGENTS.md`、`PROJECT-TEMPLATE.md` 和 `START-HERE.md`，以及學員的 Site Brief JSON。接手既有網站先檢查網站自己的 `PROJECT.md`、`AGENTS.md`、未提交修改、分支和 GitHub 狀態，不能拿 ZIP 覆蓋原網站。
2. 檢查你是否有遠端檔案操作、Node 建置、GitHub 寫入與建立 PR 能力；缺少時如實指出，不要假裝已完成。
3. 使用 ZIP 內的 `scripts/export-starter.mjs`、`src/data/layout-assembly/definitions.mjs`、`src/data/layout-assembly/<slug>/Home.astro` 及 `.ai/astro-site-assembly/SKILL.md` 建立**學員自己的 Astro 網站**。可組裝的版型與各自的狀態，以 `src/data/layout-assembly/definitions.mjs` 為準。先讀 `docs/student-builder-pack/EXPANDED-LAYOUTS.md`，依 engine 使用既有 Home、art-direction Adapter 或 native multipage Page；不得把非 Ready 的版型宣稱為 Ready。必須依 Site Brief 的 `layoutSlug` 選用對應原始碼，不得改回通用首頁。所有必需程式來源均由此包提供，不用連老師 Repo。
4. 產生網站後確認根目錄有學員專屬 `PROJECT.md` 與 `AGENTS.md`，其中 Layout 必須與 `site.config.json` 相同；Site Brief 選擇不等於視覺驗收，且不得覆蓋既有決策。
5. 依選定 Layout 參考 `src/pages/layouts/`、`src/components/` 與 `.ai/` 的設計規範，將首頁 Prototype 適配為真實的網站頁面；不得拿骨架加配色當成完整設計移植。
6. 使用學員真實品牌／文章／服務／連結，不得虛構證照、成效、客戶見證、預約或表單成功。
7. 先辨識學員選擇 GitHub Pages 或 Cloudflare Pages／Workers，依 `.ai/astro-pr-preview/SKILL.md`、`.ai/astro-starter-deploy/SKILL.md` 建立正確部署方式。不要沿用研究 Repo 的 PR Preview URL。
8. Branch → PR → Build → 真實 Preview → 1440／1280／768／390 驗收 → 學員明確同意 → Merge → Production。沒有權限不能假裝已發布。
9. 學員只透過網頁與 AI 操作；不得要求學員自行在電腦安裝 Node／CLI 或執行終端機命令。

交付：學員自己的 Repo、PR、網站預覽、正式網址（獲准後）、內容缺口、後續維護方式。

## 預覽與正式發布

依 `.ai/astro-pr-preview/SKILL.md` 與 `.ai/astro-starter-deploy/SKILL.md`。匯出網站的 `.github/workflows/pr-check.yml` 只驗證 PR 能 Build 並上傳靜態網站 Artifact，**本身不是可在瀏覽器打開的 PR Preview**；`.github/workflows/deploy.yml` 只處理合併後的正式 GitHub Pages 發布。不可把 Build 綠燈、Artifact 下載網址或正式主站當成尚未 Merge 的預覽。

## 初學者需求訪談與未知風險
收到模糊的自然語言需求時，依 ZIP 根目錄 `AGENTS.md` 的訪談／停問規則先釐清最重要的問題；將經學員確認的長期方向更新至 `PROJECT.md`。需求已足夠明確則直接執行，不用每次開冗長問卷。
