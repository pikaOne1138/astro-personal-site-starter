> **已封存（2026-10-23）。** 尚未完成的驗收項目已改寫併入 `docs/quality/open-acceptance.md`；其中帶時間性的 CI 結果快照已不適用。僅供歷史查閱，不再維護。

# PR #59｜學員獨立網站待驗收 SSOT

> **唯一事實來源（SSOT）**：本檔只追蹤 PR #59 尚需在**學員自己的 GitHub Repository／實際部署環境**或由**人類**執行的驗收。程式碼與 CI 的技術真相仍以對應 Commit、Actions、Artifact 為準。本檔不得用預期結果代替證據。
>
> 範圍：ATP PR #59 學員獨立 Astro 網站的 RWD／功能安全網；不涵蓋 Issue #58 收尾、不重新 QA ATP 25 款展示 Layout。**未經授權不建立學員正式 Repo、不 Merge、不部署 Production。**

## 狀態規則

- **NOT TESTED**：未在指定目標環境執行；不能宣稱 PASS。
- **BLOCKED**：因授權、環境或必要資料缺失無法進行，必須寫明原因及解除條件。
- **IN PROGRESS**：正在執行且尚無最終結果。
- **PASS**：有對應版本的真實測試證據。
- **FAIL**：有對應版本的實際失敗證據。
- **N/A**：有明確原因且經人類核准不適用；不可因難測就標 N/A。

每次更新必須同時記錄：測試目標／Repository、Commit SHA、實際網址或 Artifact、日期、執行者、結果與未解風險。**上游程式變更後應重新判定原有證據是否仍適用**。本檔記載「缺哪些驗收」，不儲存憑證、學員個資或敏感圖片。

## A. 需要獨立學員 Repository 才能完整驗證

| ID | 項目與通過標準 | 目前狀態 | 執行者／先決條件 | 必留證據 |
| --- | --- | --- | --- | --- |
| EXT-01 | 從學員 ZIP／Exporter 產生知識型獨立專案，推到**測試用學員 Repo**，開 PR 後 `pr-check.yml` 能自動觸發，順序包含 regressions、Build、Verify、Secrets／Context、Playwright RWD，並上傳 QA Artifact。 | NOT TESTED | 經使用者允許建立／使用隔離測試 Repo；AI 執行 | 學員 Repo URL、PR URL、Workflow Run URL、SHA、Artifact |
| EXT-02 | 助人者型獨立專案進行同樣的真實 PR Workflow 驗證；保留既有安全與未公開內容護欄。 | NOT TESTED | 同 EXT-01 | 同 EXT-01，另含助人者路由／手機選單證據 |
| EXT-03 | GitHub Pages **Repository 子路徑**：實際 Preview、資產、文章／服務內頁、導航、搜尋與 canonical 等路徑配置可用，且能對應確切 SHA；不可將本地模擬當成線上部署。 | NOT TESTED | 需隔離測試 Repo 的 Pages 授權／配置 | 公開或受控測試 URL、部署 SHA、實際瀏覽器結果 |
| EXT-04 | Cloudflare Pages／Workers **根路徑**（如選用）：實際分支 Preview、路由、圖片、搜尋資產可載入；不使用正式 Production 部署。 | NOT TESTED | 需已授權的測試環境；並非所有學員都必須選 Cloudflare | Preview URL、deployment SHA、瀏覽器報告 |
| EXT-05 | 真實學員 Repo 的 Branch Protection／Rulesets 是否將必要檢查列為 Required；失敗時是否擋 Merge。不能用 Workflow 存在推論已有保護。 | NOT TESTED | 使用者／Repo 管理者核准並實測設定 | Ruleset 設定記錄、測試 PR／失敗 check、SHA |
| EXT-06 | 模擬學員在自己 Repo 用 AI 修改頁面後，重跑 PR QA；確認報告與 Artifact 對應**修改後** Commit，不會使用舊版結果。 | NOT TESTED | 需測試 Repo；AI 修改測試資料 | 兩個 Commit、兩次 Run、修復前後報告 |

> **已完成的替代性自動檢查（不是 EXT-01～06 PASS）**：主 Repo 的封裝測試確認學員工作流程有被匯出；本地靜態伺服器的根路徑／子路徑正反故障注入檢查通過。這不能證明學員獨立 GitHub Repo 的 PR 事件、授權或線上 Preview 已驗收。

## B. 需要人工視覺／內容／互動驗收

| ID | 項目與通過標準 | 目前狀態 | 執行者／先決條件 | 必留證據 |
| --- | --- | --- | --- | --- |
| HUMAN-01 | 知識型網站在 1440／1280／768／390／375 五尺寸目視檢查首頁、文章列表與文章內頁；閱讀動線、字體與圖片比例合理，沒有明顯遮擋。 | NOT TESTED | 使用者或指定設計驗收者；需要實際學生 Preview／截圖 | 版本 SHA、五尺寸截圖、審查意見 |
| HUMAN-02 | 助人者型網站在五尺寸目視檢查首頁、服務、FAQ、關於、聯絡等頁；內容可信、CTA 明確、手機操作合理。 | NOT TESTED | 同上 | SHA、截圖、審查意見 |
| HUMAN-03 | 學員替換真實圖片、字型、品牌配色與較長的繁體中文內容後，檢視 Hero 焦點、文字留白、表格與狀態；不得以與 Demo 不同為失敗理由。 | NOT TESTED | 實際學員素材或經確認可使用的測試素材 | 替換前後截圖、調整說明 |
| HUMAN-04 | 以手機／鍵盤實際走訪導航、FAQ、CTA 等操作，確認操作結果符合意圖；自動化未辨識的自訂選單要記錄補測。 | NOT TESTED | 人工或指定評審；實際 Preview | 裝置／瀏覽器、步驟、結果、問題截圖 |
| HUMAN-05 | 上線前核對真實資格、服務價格、客戶推薦、圖片授權、預約／外部表單、隱私資訊與內容來源；不可由自動 PASS 推定真實性或法律適用性。 | NOT TESTED | 網站持有人 | 經本人確認的審查清單；不存個資或憑證 |
| HUMAN-06 | 對準備交付或 Merge 的**確切 PR Commit** 看過真實 Preview，並由網站持有人明確同意；無同意不得合併或發布。 | NOT TESTED | 網站持有人 | PR SHA、Preview URL、明確核准紀錄 |

## C. 主 Repo 技術自動驗收（僅作現況索引，不取代上兩類）

| 項目 | 最新已確認的結果 | 證據 |
| --- | --- | --- |
| Student Portable Context Gates | PASS（Commit `16650c2`） | [Actions Run 39444544669](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544669) |
| Art Direction Independent Adapter Check | PASS（同 Commit） | [Actions Run 39444544952](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544952) |
| PR Preview Build／根路徑與子路徑故障注入 | PASS（同 Commit） | [Actions Run 39444544675](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544675) |
| Verify Cloudflare Static Assets | PASS（同 Commit） | [Actions Run 39444544959](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544959) |
| Standalone Starter Export Check | IN PROGRESS（最後查詢時） | [Actions Run 39444544891](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39444544891) |

> 此表是一個**帶時間性的驗證快照**。查詢最新狀態時，應以 GitHub Actions 真實結論更新，不得把「IN PROGRESS」永久當成失敗或通過。

## 更新紀錄格式

```text
日期／時區：
項目 ID：
測試目標 Repo／部署平台：
Commit SHA：
執行者：
測試步驟與範圍：
結果：NOT TESTED / BLOCKED / IN PROGRESS / PASS / FAIL / N/A
證據 URL（Run、Artifact、Preview、截圖）：
已知限制與下一步：
```

## 放行原則

- **PR #59 工程層進入最終審查**：本 Repo 必要 CI 在當前 Commit 通過，學員 Exporter、腳本與 Workflow 封裝有自動化證據；此時 EXT／HUMAN 項目可以仍為 NOT TESTED，但必須在此 SSOT 明確披露，不可宣稱「真實學員 Repo／人工視覺已驗收」。
- **獨立學員測試環境通過**：EXT 類相關項目具備真實 PR／部署證據，才能宣稱獨立 Repo Workflow 已驗證。
- **學員網站可正式發布**：仍需該網站本人的 HUMAN 類審核及明確核准。PR #59 合併與學員網站發布是不同授權，絕不可混淆。
