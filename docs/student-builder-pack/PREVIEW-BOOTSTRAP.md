# 學員網站：安全預覽與正式發布（Preview-first）

本檔是 AI 建站用的部署分流指引。**Build 成功、Artifact、正式 Production 都不是 PR Preview。** 學員未明確同意前，不可合併或正式發布。

## 基本共通流程
1. 學員自己的 Repo 建立 feature branch，AI 將 Astro 程式提交 PR。
2. PR 執行 read-only `.github/workflows/pr-check.yml`，只檢查編譯與 Artifact；不能告訴學員「預覽網址已部署」。
3. 使用**已配置且實際可存取的獨立預覽環境**產生 URL。使用者開啟該網址驗證首頁、內頁、手機、圖片、功能與真實內容，AI 核對該次 Head SHA。
4. 得到學員明確同意後才 Merge。GitHub Pages 的 Production 使用 `workflow_dispatch` 手動由受授權者觸發；Cloudflare Production 必須檢查其 Production branch 與部署規則。
5. 第一次建立 preview service 也可能建立**可被公開瀏覽的測試網址**；只放經授權可公開的測試內容，不可有客戶資料／密碼。

## A｜網站正式發布用 GitHub Pages
- GitHub Pages 不因 `pull_request` + `upload-artifact` 自動提供 Live PR Preview。此專案基礎骨架只提供 read-only PR Build，正式發佈需要人工 `workflow_dispatch`；嚴禁在未獲同意前開啟或點擊 Production 部署。
- **最低可執行的 Preview 路線**：如學員已連上 Cloudflare Pages，可使用獨立 preview-only Pages 專案（或現有專案的 branch preview），讓 AI 取得可打開的 pages.dev Preview，再於核准後選用 GitHub Pages 正式發布。這是兩個平台各自的資源，需學員自己完成授權。
- 要完全只用 GitHub Pages 做 PR Preview，必須額外建立受信任的 Publisher 工作流程，隔離 PR 不可信程式與高權限部署權限，並為預覽建立帶 PR 編號的 base path 與更新／清理機制。不能直接把老師 GitHub Actions 硬編碼 owner/repo 路徑套入學員站。基礎 ZIP 不聲稱這項進階能力已啟用。

## B｜使用 Cloudflare Pages
- 經學員授權連接**學員自己的 GitHub Repo**；Preview Deployment 由非 Production branch 觸發。AI 必須確認目前的 Production branch、Branch Preview 範圍、每次部署的 Commit SHA、Preview URL。
- 若專案尚未建立，在按 **Save and Deploy** 前，必須明確告知該動作會產生第一個可公開瀏覽的部署。採用不含私密資料的無品牌測試初始分支建立 preview-only 專案或隔離網站；完成權限和預覽測試後，才配置正式 Production 路線。
- 當 Preview Branch 的 URL 可開啟且 Head 與 PR 一致，再請學員檢查內容；取得明確同意後才 Merge 到配置好的正式分支。
- Cloudflare Pages Preview、Cloudflare Workers 靜態資產、GitHub Pages Actions 是不同部署類型，不能混用 Build 設定或 URL 格式。

## AI 必須回報的可驗證資料
- 學員 Repo URL、PR URL、Head SHA。
- 該次 Build 的 Actions URL 與明確狀態。
- Preview hosting 服務、**真實可開啟**的預覽網址、所對應 Commit SHA，及實際檢查的頁面／裝置。
- Production branch、人工授權 Gate，及學員是否已明確同意正式發布。
- 缺少帳號授權或尚未配置 Preview 時，應標為「尚未完成」，不可杜撰已部署網址。

此流程不建立第三方後台、會員、CRM、資料庫或金流。