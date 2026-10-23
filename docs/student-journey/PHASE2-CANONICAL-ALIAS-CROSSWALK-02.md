# Phase 2｜Canonical / Alias Crosswalk 02：授權、Preview、索引的來源裁決

Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`. 本次核對 P0 實際工作登錄及 Batch1、2、9A/9B/9C 與 Crosswalk01。**裁決僅供稽核工作使用，不等於使用者已核准最終規範重構。**

| 規範群 | 既有 Canonical 或待定群組 | 有效來源工作 ID | 關係 | 保留的精確差異與處置 |
|---|---|---|---|---|
| Merge 授權 | CAND-AUTH-MERGE（待定） | P0-U001、B9B-DEP-37-01、B9C-ASM62、B1-ASM23-01 | PARTIAL_OVERLAP | P0 明示「當前 PR 版本」；Deploy L37 是不得無授權 Merge；Assembly L23 還涉及版本/範圍，應保留 version+operation 的核准證據 |
| Production 授權 | CAND-AUTH-PROD（待定） | P0-U003、B9C-ASM62、B1-ASM23-02 | PARTIAL_OVERLAP | Merge 與實際 Production 部署可分別執行；不能憑單一泛稱「同意」覆蓋兩種操作 |
| 其他破壞性授權 | CAND-AUTH-OTHER（待定） | B9B-DEP-37-02/03/04 | DISTINCT | 刪 Repo、改 DNS、覆寫網站分別要求明確授權，不得因批准 Merge 而推定已批准 |
| Build 不是 Preview | CAND-PROOF-LIVE（待定） | P0-U004、P0-U005、B9A-DEP25-01、B9B-DEP-19-05 | PARTIAL_OVERLAP | CI Build、Artifact、實際 URL、可訪問及分支隔離是不同可驗證物件 |
| 缺 Preview 的說明 | P0-CANON-PRVIEW-MISSING | P0-U035、P0-U044 | SAME_MEANING（P0 已記錄） | 只適用 GitHub Pages 缺 Live URL 時的如實說明；不覆蓋建置 Preview 的授權 |
| 預覽架構修改 | P0-CANON-PRVIEW-CONSENT | P0-U036、P0-U045 | SAME_MEANING（P0 已記錄） | 未同意不得調整預覽部署架構；不是一般內容編修的同意 |
| Production 允許索引 | P0-CANON-INDEX-ENABLE | P0-U018、P0-U047、B1-DEP31-02、B1-DEP31-03 | PARTIAL_OVERLAP | 原 P0 兩項同源 Alias 不變；Batch1 新增了內容/資安/Preview Gate 與重新 Build/檢查輸出證據，作前置及驗收子欄位 |
| Cloudflare Preview 索引 | P0-CANON-PREVIEW-INDEX | P0-U019、P0-U049、B1-DEP31-04-CF | PARTIAL_OVERLAP | P0 同源兩 ID 為正式文件性合併；新子項只是 Cloudflare 分支來源，不能推定 GitHub Pages 同環境機制 |
| GitHub Pages 索引設定 | CAND-INDEX-GH（待定） | B1-DEP31-04-GH | DISTINCT | GH Actions Variables 未設置時 false、Owner 核准後設 true 並手動 Production Workflow；不得併成 Cloudflare 分支 |
| 防 CI 門檻繞過 | CAND-GATE-NO-BYPASS（待定） | B5-PUB62-03、B9C-DEP32-01 | PARTIAL_OVERLAP | 通用不得繞過檢查與特指不能移除 noindex 的風險、驗收面不同 |
| Demo/Draft 不開放索引 | CAND-INDEX-DRAFT（待定） | B2-PUB37-01、B9C-DEP32-02、B1-PUB28-08 | PARTIAL_OVERLAP | 草稿排除清單/RSS/Sitemap/Search、未授權索引政策、實測負向 Gate 各為結果／限制／證據 |

## 跨表一致性勘誤

1. [Crosswalk 01](PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md) 的 `B9C-DEP40-03` 與 `B9A-DEP25-01` 都要求核對 Cloudflare Preview，但後者不涵蓋「Git 專案連線、實際 Deployment 記錄」的全部證據；應維持 PARTIAL_OVERLAP。
2. [Batch1](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH1.md) 中 `B1-DEP31-04` 是父候選，`-CF` 與 `-GH` 是平台條件；**不得**將三者各計一條規範。
3. P0 的四組 SAME_MEANING 已有既有 DOCUMENTARY_CONSOLIDATION_ONLY 判定，本表**只重用**，不宣稱新增核准 Canonical ID。
4. `B9B-DEP-19-05` 是 Batch9 Atomic B 中的第五個子項；若未獨立於各來源行驗證，保持 provisional。
5. 「公開 Preview 的可發現性／noindex」與「資料保密」不同：noindex 不會移除已公開的舊部署／Git 歷史。

## 待完成的雙向驗收

- 正向：Frozen source → 每個最小語義單位 → 候選／alias → 類型及平台例外。
- 反向：Canonical → 所有 Alias／來源位置 → 驗收證據、適用平台、允許的操作和 Owner 同意。
- 對每個待定群組，必須採 SAME、PARTIAL、DISTINCT、CONDITIONAL 四態有依據裁決；不得僅靠字串相似度。
- 跨 A/B/P0 的所有 192 檔以及剩餘複合候選仍未全量處置，本表不是「規範全部去重」。

**Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skills 不修改，不 Merge、不部署。**
