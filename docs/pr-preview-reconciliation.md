# PR 預覽長期同步維護

每次正式 GitHub Pages 部署（main push、PR Preview Build 完成或手動執行），`scripts/reconcile-pr-previews.mjs` 都會：

1. 取得目前仍 Open 的 PR 與各自最新 head SHA。
2. 只接受同倉庫 PR 且該 head SHA 對應的成功 `PR Preview Build`；下載其 `preview-event` 與 `preview-site`。
3. 檢查事件 PR 號相符及 `index.html`，重新覆蓋預覽檔，寫入 `.preview-head.json`（SHA／Run ID）。
4. 刪除已關閉、來自 fork、或沒有最新成功建置的 PR 舊預覽。
5. API／下載失敗就停止發布，避免把過期頁面當作新版本。

## 安全界線
- 只在受信任的 main 分支部署 Job 使用 GitHub Token，不在未受信任 PR Build 裡執行。
- 不執行 PR 上傳的任意 JavaScript；只複製 build artifact。
- PR 預覽是測試版本，CI 成功仍須人工視覺及功能驗收。
- PR head 尚在建置時，預覽可能暫時消失；待新 Build 成功，後續 `workflow_run` 再補上。
- 此做法不能保證 GitHub Pages/CDN 瀏覽器快取立即一致；正式部署後應以部署結果核實。

## 故障排查
- 先看 `Deploy Astro to GitHub Pages` 的 `Reconcile all open PR previews` 步驟與對應 Build run。
- 若要重建某 PR，需建立新的 PR 同步事件（新提交），不是單純重跑舊部署 Job。
- 不用要求學員操作這些設定；它是工作坊維護者的基礎設施。

## 驗收案例
- PR 更新後：只保留新 head SHA 的預覽。
- main 重新部署：所有仍開啟 PR 用各自最新成功 Build 更新。
- PR 關閉：對應預覽刪除。
- PR 有新 Commit 但 Build 未成功：舊預覽刪除，而非顯示舊版。
- PR Preview Build 下載失敗：整個正式部署標記失敗，避免錯誤宣告成功。
