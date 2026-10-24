# 尚未完成的驗收項目

> 對象：維護這個研究展示 Repo 的人。**這份文件不會進學員 ZIP。** 它只追蹤「還沒有證據」的驗收：需要在學員自己的 GitHub Repository 或實際部署環境才能做的，以及必須由人類完成的。程式與 CI 的技術結果，以對應 commit 的 Actions 與 Artifact 為準。**不得用預期結果代替證據。**
>
> 狀態定義（PASS、FAIL、NOT TESTED、BLOCKED、NOTICE）見 `QUALITY-CONTRACT.md`。這裡另外用 `IN PROGRESS`（正在執行、尚無結果）與 `N/A`（有明確原因且經人類核准不適用；不能因為難測就標 N/A）。

每次更新都要記錄：測試目標、commit SHA、實際網址或 Artifact、日期、執行者、結果與未解風險。**上游程式變更後，要重新判定原有證據是否仍適用。**不存放憑證、學員個資或敏感圖片。

## A. 需要獨立的學員 Repository 才能完整驗證

| ID | 項目與通過標準 | 狀態 | 先決條件 | 必留證據 |
| --- | --- | --- | --- | --- |
| EXT-01 | 從學員 ZIP／匯出器產生知識型獨立專案，推到**測試用學員 Repo**，開 PR 後 `pr-check.yml` 能自動觸發，順序包含 regressions、Build、Verify、Secrets／Context、Playwright RWD，並上傳 QA Artifact | NOT TESTED | 經使用者允許，建立或使用隔離的測試 Repo | Repo、PR、Workflow Run 網址、SHA、Artifact |
| EXT-02 | 助人者型獨立專案做同樣的真實 PR Workflow 驗證，並保留既有的安全與未公開內容護欄 | NOT TESTED | 同 EXT-01 | 同 EXT-01，另含助人者路由與手機選單證據 |
| EXT-03 | GitHub Pages **Repository 子路徑**：實際 Preview、資產、文章與服務內頁、導覽、搜尋、canonical 都可用，且能對應確切 SHA；不能把本地模擬當成線上部署 | NOT TESTED | 隔離測試 Repo 的 Pages 授權與設定 | 測試網址、部署 SHA、實際瀏覽器結果 |
| EXT-04 | Cloudflare Pages／Workers **根路徑**（若選用）：實際分支 Preview 的路由、圖片、搜尋資產可載入；不使用正式 Production 部署 | NOT TESTED | 已授權的測試環境（不是所有學員都必須選 Cloudflare） | Preview 網址、deployment SHA、瀏覽器報告 |
| EXT-05 | 學員 Repo 的 Branch Protection／Rulesets 是否把必要檢查列為 Required，失敗時是否擋住 Merge。不能因為 Workflow 存在就推論有保護 | NOT TESTED | 使用者或 Repo 管理者核准並實測 | 設定記錄、測試 PR 與失敗的 check、SHA |
| EXT-06 | 模擬學員在自己的 Repo 用 AI 修改頁面後重跑 PR QA，確認報告與 Artifact 對應**修改後**的 commit，不是舊結果 | NOT TESTED | 測試 Repo；AI 修改測試資料 | 兩個 commit、兩次 Run、修復前後的報告 |

> 主 Repo 的封裝測試確認學員 Workflow 有被匯出，且本地靜態伺服器的根路徑與子路徑正反故障注入檢查通過；這**不是** EXT-01 到 EXT-06 的 PASS，因為學員獨立 Repo 的 PR 事件、授權與線上 Preview 都沒有被驗證。

## B. 需要人工視覺、內容、互動驗收

| ID | 項目與通過標準 | 狀態 | 執行者 | 必留證據 |
| --- | --- | --- | --- | --- |
| HUMAN-01 | 知識型網站在 1440／1280／768／390 四個寬度目視檢查首頁、文章列表與文章內頁；閱讀動線、字體與圖片比例合理，沒有明顯遮擋 | NOT TESTED | 使用者或指定的設計驗收者，用實際的學員 Preview 或截圖 | SHA、五個寬度的截圖、審查意見 |
| HUMAN-02 | 助人者型網站在五個寬度檢查首頁、服務、FAQ、關於、聯絡等頁；內容可信、CTA 明確、手機操作合理 | NOT TESTED | 同上 | SHA、截圖、審查意見 |
| HUMAN-03 | 學員換上真實圖片、字型、品牌配色與較長的繁體中文內容後，檢視 Hero 焦點、文字留白、表格與狀態；不能因為與 Demo 不同就判失敗 | NOT TESTED | 真實學員素材，或經確認可用的測試素材 | 替換前後截圖、調整說明 |
| HUMAN-04 | 用手機與鍵盤實際走訪導覽、FAQ、CTA 等操作；自動化辨識不到的自訂選單要記錄補測 | NOT TESTED | 人工或指定評審，用實際 Preview | 裝置與瀏覽器、步驟、結果、問題截圖 |
| HUMAN-05 | 上線前核對真實資格、服務價格、客戶推薦、圖片授權、預約與外部表單、隱私資訊與內容來源；不可由自動 PASS 推定真實性或法律適用性 | NOT TESTED | 網站持有人 | 經本人確認的審查清單 |
| HUMAN-06 | 對準備交付或 Merge 的**確切 PR commit** 看過真實 Preview，並由網站持有人明確同意；沒有同意不得合併或發布 | NOT TESTED | 網站持有人 | PR SHA、Preview 網址、明確的核准紀錄 |

## C. 已知的缺口

這些是檢查過程中發現、尚未處理的問題，**不要宣稱已解決**。

- **URL 欄位的驗證只涵蓋「連結」，不涵蓋全部輸入。** `Button`、`ServiceCard`、`CTASection`、`FeatureGrid` 與 `UnderlineLink` 現在經過共用的 `safeHref`（`src/components/blocks/safe-href.ts`）：只接受站內路徑、頁內錨點、`https`、`mailto`、`tel`；其他值（`javascript:`、`data:`、`vbscript:`、`//host`、控制字元、引號）不產生連結，改輸出純文字。`scripts/test-block-href-guard.mjs` 驗證守衛本身會拒絕這些輸入，也驗證五個元件確實使用它；這不是每個元件的完整渲染測試。`LeadMagnetCard` 與 `ResourceCard` 仍用各自較嚴格的規則（只接受 `https`，拒絕 `http`），兩套規則尚未合併。
- **學員站的網址與路徑前綴改由平台提供，但沒有在真實平台部署過。** 匯出站現在用 `actions/configure-pages`（GitHub Pages）或 `CF_PAGES_URL`／`SITE_URL`（Cloudflare Pages）取得網址，不再寫死 `example.com`；`scripts/test-student-deploy-config.mjs` 在本機模擬三種環境並檢查連結、sitemap、robots，已進 CI。它不會真的部署到 GitHub 或 Cloudflare，EXT-01 到 EXT-04 仍是 NOT TESTED。
- **Props 的 render fixture 是實驗性的。** `scripts/qa-generate-props-render-fixtures.mjs` 與 `scripts/qa-verify-props-render-fixtures.mjs` 產生的輸入曾漏掉巢狀的 `items`，那是 fixture 產生器的錯，不是元件壞了。沒有任何「全部 Props 的執行期驗收」被宣稱。
- **歷史缺陷的修復前後對照不完整。** `HISTORIC-REGRESSIONS.json` 記錄的歷史缺陷，其「目前 commit 的證據」與「原始修復前失敗、修復後通過」是兩件事；後者並非全部補齊。
- **人工設計品質與第一次使用的真人學員體驗都沒有測過。** 已有的 AI 端到端與解壓 ZIP 檢查可用，沒有重大程式變更時不要重跑完整套件。

## 更新紀錄格式

```text
日期／時區：
項目 ID：
測試目標（Repo、部署平台）：
Commit SHA：
執行者：
測試步驟與範圍：
結果：NOT TESTED / BLOCKED / IN PROGRESS / PASS / FAIL / N/A
證據（Run、Artifact、Preview、截圖）：
已知限制與下一步：
```

## 放行原則

- **工程層可以進入最終審查**：本 Repo 必要的 CI 在當前 commit 通過，學員匯出器、腳本與 Workflow 的封裝有自動化證據。此時 EXT 與 HUMAN 項目可以仍是 NOT TESTED，但必須在這裡明確披露，不能宣稱「真實學員 Repo／人工視覺已驗收」。
- **獨立學員測試環境通過**：相關 EXT 項目具備真實的 PR／部署證據，才能宣稱獨立 Repo Workflow 已驗證。
- **學員網站可以正式發布**：仍需要該網站本人的 HUMAN 類審核與明確核准。合併工程變更與發布學員網站是不同的授權，不可混淆。
