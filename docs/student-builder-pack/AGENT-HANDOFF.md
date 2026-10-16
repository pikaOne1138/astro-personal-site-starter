# AI 建站接力指引

本文件僅供 AI 閱讀；不得要求學員 Fork、Clone 或授權存取老師研究 Repo。

1. 讀取本 ZIP 根目錄 `AGENTS.md`、`PROJECT-TEMPLATE.md` 和 `START-HERE.md`，以及學員的 Site Brief JSON。接手既有網站先檢查網站自己的 `PROJECT.md`、`AGENTS.md`、未提交修改、分支和 GitHub 狀態，不能拿 ZIP 覆蓋原網站。
2. 檢查你是否有遠端檔案操作、Node 建置、GitHub 寫入與建立 PR 能力；缺少時如實指出，不要假裝已完成。
3. 使用 ZIP 內的 `scripts/export-starter.mjs`、`src/data/layout-assembly/definitions.mjs`、`src/data/layout-assembly/<slug>/Home.astro` 及 `.ai/astro-site-assembly/SKILL.md` 建立**學員自己的 Astro 網站**。目前 registry 有 25 個可組裝方向：原十二款及新增十三款 in-progress Adapter。先讀 `docs/student-builder-pack/EXPANDED-LAYOUTS.md`，依 engine 使用原十二款 Home、兩款 art-direction Adapter 或十一款 native multipage Page；不得把 25 個方向宣稱為 25 款 Ready。必須依 Site Brief 的 `layoutSlug` 選用對應原始碼，不得改回通用首頁。所有必需程式來源均由此包提供，不用連老師 Repo。
4. 產生網站後確認根目錄有學員專屬 `PROJECT.md` 與 `AGENTS.md`，其中 Layout 必須與 `site.config.json` 相同；Site Brief 選擇不等於視覺驗收，且不得覆蓋既有決策。
5. 依選定 Layout 參考 `src/pages/layouts/`、`src/components/` 與 `.ai/` 的設計規範，將首頁 Prototype 適配為真實的網站頁面；不得拿骨架加配色當成完整設計移植。
5. 使用學員真實品牌／文章／服務／連結，不得虛構證照、成效、客戶見證、預約或表單成功。
6. 先辨識學員選擇 GitHub Pages 或 Cloudflare Pages／Workers，依 `.ai/astro-pr-preview/SKILL.md`、`.ai/astro-starter-deploy/SKILL.md` 建立正確部署方式。不要沿用研究 Repo 的 PR Preview URL。
7. Branch → PR → Build → 真實 Preview → 1440／1280／768／390 驗收 → 學員明確同意 → Merge → Production。沒有權限不能假裝已發布。
8. 學員只透過網頁與 AI 操作；不得要求學員自行在電腦安裝 Node／CLI 或執行終端機命令。

交付：學員自己的 Repo、PR、網站預覽、正式網址（獲准後）、內容缺口、後續維護方式。

## 預覽與正式發布的硬性安全關卡

匯出的 `.github/workflows/pr-check.yml` 只會驗證 PR 能 Build、上傳靜態網站 Artifact，**它本身不是可在瀏覽器打開的 PR Preview**。`.github/workflows/deploy.yml` 只處理合併後的正式 GitHub Pages 發布。不可把 Build 綠燈、Artifact 下載網址或正式主站當成尚未 Merge 的預覽。

- **Cloudflare Pages Git integration**：若學員自己的 GitHub Repo 已連接 Pages，且 Preview Deployment 確實啟用，必須核對 PR Head SHA 與真實 `pages.dev` Branch／Deployment URL，才能交付學員驗收。
- **GitHub Pages 單獨使用**：GitHub Pages 不會自動提供隔離的 PR 預覽。如果還沒替學員 Repo 安全配置預覽系統，先只做 PR Build 和本機／雲端臨時預覽，**不能在學員確認前推送 main**，也不能宣稱可用的 PR URL 已存在。建立 GitHub Pages PR 預覽需要另外設計不覆蓋 Production、隔離不可信 PR 程式碼的工作流程，並由老師驗收後才可作為標準學員交付。
- 首次 Cloudflare 接上 GitHub main 可能立刻部署 Production；若尚未通過學員確認，先用未公開測試專案或隔離測試分支，在授權前不得把正式品牌、聯絡或個資內容公開。

## 初學者需求訪談與未知風險
收到模糊的自然語言需求時，依 ZIP 根目錄 `AGENTS.md` 的訪談／停問規則先釐清最重要的問題；將經學員確認的長期方向更新至 `PROJECT.md`。需求已足夠明確則直接執行，不用每次開冗長問卷。評估情境與人工評分標準在 `docs/student-builder-pack/INTERVIEW-EVALUATION.md`；測試情境不是學員的真實資料，也不是已通過模型實測的證明。
