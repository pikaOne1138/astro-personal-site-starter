# GitHub Pages／PR Preview 故障排除與恢復操作

> 適用：本倉庫的 `PR Preview Build`（`.github/workflows/pr-preview.yml`）與 `Deploy Astro to GitHub Pages`（`.github/workflows/deploy-pages.yml`）。
> 本文件是 `astro-pr-preview` 的操作參考，不是要學員自己管理 GitHub Actions。AI 應先看真實 Run／Job／Artifacts 再決定是否有權執行修復。

## 1. 先分清楚失敗階段

| 階段 | 觀察證據 | 處置 |
| --- | --- | --- |
| PR Build / Astro Build | `PR Preview Build` 的 `npm run build` 失敗、編譯錯誤 | 修正程式或路徑，在 PR branch 提交；等新的 PR Build |
| PR Build 成功、Pages 前置步驟失敗 | `Deploy Astro to GitHub Pages` 的 main build、下載 preview-site、組裝或驗證失敗 | 找出失敗步驟與 artifact，修正流程或輸入；不要只看 PR 綠燈 |
| Upload Pages artifact 成功、OIDC 逾時 | `actions/deploy-pages@v4`: `Failed to get ID Token`、`Request timeout` | 確認 workflow 有 `pages: write`、`id-token: write`；有權限不代表無法逾時。先辨認暫時性服務問題，避免無差別重試 |
| Re-run 後出現同名 artifact | `Multiple artifacts named "github-pages"` | **不要再 Re-run 該部署 Job／失敗 Jobs**；同一 Run 的 artifacts 已重複，應產生新 Run |
| Pages deploy 成功，但網址不對 | Live URL verify／PR bot comment 失敗 | 對照部署 HTML、路徑、CSS、圖片與 `BASE_URL`；不可宣稱成功 |

`punycode` 或 Node.js 棄用警告不是本案例的根因。錯誤訊息「Ensure GITHUB_TOKEN has permission id-token: write」是通用提示，先核對 workflow 權限與真正的 request timeout。

## 2. 本倉庫正確恢復 PR #N 最新預覽的方法

正常事件鏈：

```text
PR source branch 出現新 commit (pull_request synchronize)
→ 新的 PR Preview Build run
→ preview-event + preview-site artifacts
→ 新的 trusted Deploy Astro to GitHub Pages workflow_run
→ main 與 PR 靜態產物組裝、上傳唯一 github-pages artifact
→ Pages 發布、實際 URL 驗證、PR bot 留言
```

### 執行前（必須）

1. 讀 `AGENTS.md`、本 Skill、兩個 workflow、`docs/github-pr-preview-setup.md`；確認 PR 與分支仍 Open、head SHA 與最近的 Run。
2. 取得最近 PR Preview Build、其後觸發的 Deploy Run、各 Job steps、錯誤日誌及 artifacts（尤其 artifact 的 **name、ID、run ID、run attempt**）。
3. 確認失敗是程式、權限、網路逾時、同名 artifact 或組裝邏輯；不要因為 PR Build 成功就宣稱線上已更新。
4. 檢查有沒有更新中的新 Run；若已有正常進行中的流程，不重複觸發。

### 需產生全新 Run 時（本倉庫 PR Preview）

- **首選**：已有真正需要修正的內容，就在既有 PR source branch 修正並提交。push 造成 `pull_request: synchronize`，觸發全新 `PR Preview Build`。
- **程式碼正確、只需要恢復預覽時**：在使用者允許且確認 PR branch head 未改變後，可在 **同一 PR branch 建立一筆只用來觸發 CI 的空內容變更 commit（tree 與 parent 相同）**，再以預期 SHA 條件安全更新 branch ref。這是新 commit、新 `synchronize` 事件，**不是對舊 Job 按 Re-run**。不可 force-push、不可修改 main；若 GitHub 權限不允許，要求學員／維護者以可用的 Git 工具做相同的正常 branch commit/push。
- 切勿為了觸發預覽而修改無關程式碼，或對 PR 添加虛假的功能修正。
- `workflow_dispatch` 只會啟動 trusted deploy 主工作流；**不會自行產生此 PR 最新的 preview-site artifact**，因此不能當作「已重新部署 PR 最新版本」的保證。
- 不可以重跑已經含重複 `github-pages` artifacts 的舊 Deploy Run；重跑某個舊 Run 不等同新 Run ID。

### 確認真的完成

1. 查到**新** `PR Preview Build` Run ID；其 head SHA 等於剛提交的 PR 最新 SHA，Build 成功。
2. 查到因該 PR Run 完成而產生的**新** `Deploy Astro to GitHub Pages` Run ID；不是舊 Run 的 attempt 2。
3. 確認 Pages artifact 上傳與 deploy 成功；該 Run 只有唯一供 deploy-pages 使用的 `github-pages` artifact。
4. 確認 workflow 的 `Verify live Pages URL returns PR's HTML` 通過，並查看 bot 的實際 PR 預覽網址。主站與 PR 預覽分別確認。
5. 做 UI／RWD／連結檢查；至少 1440、1280、768、390px 的實際畫面。最後提供「已驗證／尚未驗證」清單；未確認不得聲稱已部署成功。
6. 未經學員明確授權，**不得 Merge PR**。

## 3. 真實事件案例：2026-10-08 PR #20

- PR 預覽 build 成功，trusted deploy build 與組裝也成功，但 `actions/deploy-pages@v4` 在取得 OIDC ID Token 時 request timeout。
- 直接 Re-run 原部署 Job 後，同一 Run 出現兩份同名 `github-pages` artifact，產生 `Multiple artifacts named "github-pages"`。**這是錯誤恢復手法，不能當作教材推薦做法。**
- 正確恢復做法：在 PR source branch 建立不改程式內容的 CI 觸發 commit（該次為 `7dd3a4a1`），推進該 branch，得到新的 `pull_request synchronize` 與新的 `PR Preview Build` Run；仍須另外確認 trusted deploy 與 live HTML 驗證完成。
- 事件中的短暫 OIDC timeout 並不能單憑日誌確診 GitHub 全域服務故障，也不能忽略權限檢查。

## 4. 給初學者的溝通格式

說明三件事就好：

1. **壞在哪一關：** 寫程式／產生網站／上傳／發布／線上畫面。
2. **AI 要做什麼：** 檢查真實錯誤後修正；若是同名 artifact，從 PR 分支觸發新 Run，不再重跑舊失敗 Job。
3. **怎樣才叫成功：** Build 成功 ＋ deploy 成功 ＋ 最新預覽網址能打開且內容一致 ＋ 學員看過畫面。

不要貼一個猜測的網址後直接說「完成了」；不要為了排錯取消 Pages 安全權限、改為 branch publishing 或把 PR 不可信程式放進高權限部署工作流。
