---
name: astro-starter-deploy
description: Help non-coders independently deploy an Astro personal site to GitHub Pages or optional Cloudflare, including repository, domain, base URL and preview checks without silently reconfiguring the research showcase.
---
# Astro Starter Deploy｜獨立網站部署

## 目的與界線
學員的獨立網站，不是研究展示站部署。提供兩條平行、均可供學員選擇的路線：GitHub + GitHub Pages，以及 GitHub + Cloudflare Pages／Workers 靜態託管。選擇 Cloudflare 不代表一定要 Workers、D1、R2、金流或後端。這是操作 Skill 與交付驗收契約，**不表示生成骨架已有線上Preview或完成版型適配**。

## 開始前必讀
讀取離線包的 `AGENTS.md`、`.ai/astro-pr-preview/SKILL.md`、`.ai/astro-content-publishing/SKILL.md`，再讀**學員生成專案**的 `astro.config.mjs`、`package.json` 與實際 `.github/workflows/`。生成器提供 `deploy.yml`（只允許main人工觸發正式發布）和 `pr-check.yml`（只讀Build Artifact）；不要尋找老師專用deploy-pages/pr-preview檔案。先確認自己的Repository／網域與託管平台；不可沿用老師owner/repo。


## A｜GitHub Pages（學員可選）
1. 在學員自己的新Repository使用ZIP匯出的獨立專案；不Fork/Clone老師Repo。不可在展示 Repo 的 main 上直接修改學員資料。
2. 確認 GitHub Pages 的 Repository 站、使用者站或自訂網域；據此設定 Astro `site` 與 `base`。Repository 子路徑應匹配倉庫名稱，自訂網域通常不需要原 Repo 子路徑；以 GitHub Pages 實際設定為準。
3. 使用 `import.meta.env.BASE_URL` 處理路由及資產。檢查 canonical、RSS、Sitemap、robots、OG URL；從研究站複製的硬編碼網址必須替換。
4. 使用 GitHub Actions Build/Deploy。不得假設展示站 `workflow_run`、預覽清理與 `gh-pages` 快照設計可以原封不動搬到新 Repo；安全地為單站裁切工作流程，權限採最小化。
5. 操作：Branch → PR → CI Build → 預覽可開啟 → 學員同意 → Merge → 正式 Deploy → 實際頁面/搜尋/連結驗證。GitHub Pages 的 PR Preview 必須有實際隔離與可訪問路徑，不能把本地 Build 當線上預覽。
6. 教學時清楚指出首次設定 GitHub Pages、GitHub Actions 權限和網域 DNS 可能需要學員在帳號中操作。不得聲稱完成未經確認的授權或部署。

## B｜GitHub + Cloudflare（學員可選）
1. 先詢問使用 Cloudflare Pages 還是 Workers 靜態資產，確認目前供應商支援方式與限制。優先靜態網站，避免無必要的 SSR/後端。
2. 連接 GitHub Repository，設定正式 branch、安裝與建置命令（例如 `npm run build`）、靜態輸出 `dist`、Astro `site` 與 `base`。通常根網域的 base 是 `/`；以實際子路徑和 Cloudflare 專案設定為準。
3. 確認 PR 分支是否提供 Preview、預覽網域是否需要 `noindex`、是否洩露未公開內容；不假設 Cloudflare Preview 和 GitHub Pages Preview 設定相同。
4. 自訂網域時，確認 DNS、HTTPS、生效網址、canonical、RSS、Sitemap、搜尋索引及跳轉；對需要額外 Cloudflare 規則的功能逐項驗證。不要承諾完整 WordPress 301 遷移。
5. Cloudflare API Token、GitHub OAuth 或部署授權只在平台授權流程處理，不存入程式碼、聊天訊息、Commit 或公用設定。

## QA／交付
- `npm run build` 成功，再從離線包執行學員模式驗證器；Pagefind只有實際加入才測，不宣稱骨架已包含。不同部署base下再次測試。
- 首頁、文章內頁、標籤、全文搜尋、RSS、Sitemap、404，均用正式域名實測。
- 檢查 1440／1280／768／390 RWD，手機選單、鍵盤與連結可操作。
- 建立一篇文章、預覽、經核准合併、確認正式公開。
- 提供「正式網址、預覽流程、更新位置、還原方式、未串接服務」交接清單。
- **不得在沒有學員明確同意時 Merge、刪除 Repo、變更 DNS 或覆蓋網站。**

## 和現有展示站的差異
`astro-pr-preview` 是**學員共用的雙平台 PR／Preview／安全發布 Skill**：先辨識自己的部署平台，再走 GitHub Pages、Cloudflare Pages 或 Workers 對應流程。本研究展示 Repo 的 GitHub Pages Artifacts + `workflow_run` 預覽機制是特例，不代表學員 Repo 已具備相同 Workflow。Cloudflare Pages 的 Git Preview 也須先核對專案連線與真實部署記錄。不得悄悄更改研究站既有的成功部署工作流程。
