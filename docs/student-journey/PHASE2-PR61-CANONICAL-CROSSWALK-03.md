# Phase 2｜PR #61 Crosswalk 03：凍結來源與上游新規則的雙向追溯

> 狀態：**DOCUMENTARY_REVIEW / NOT CANONICAL PASS**。#61 仍為 Open/Draft；本表只建立相互關係，不表示已將 #61 內容合併進 main 或 #67 的原始 Skill。

## 可重現的來源基線

- #67 冻結基線 main：`2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。
- #61 提議來源 HEAD：`da65053ccc237474e1fdf8a28fcbae20fe7029c2`，`docs/student-builder-pack/AGENT-HANDOFF.md` Blob `457835c2e4ae02acf889df1953d0a635511009ef`。
- [UPSTREAM-DELTA-PR61.md](UPSTREAM-DELTA-PR61.md) 是初步來源分類表，已校正 #61 真實行號。PR61 之規範**未生效為 main 的已合併來源**；設計決策另以本次使用者確認為準。

## 條款對照矩陣

| 上游子義務 | 來源 | 已存在的 #67 候選／正式欄位 | 判定 | 保留或新增的差異 |
|---|---|---|---|---|
| UP61-01a 學員 CI Build、內容護欄、RWD QA、附截圖 Artifact | [#61 L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L19) | B9C-DEP34、B9B-ASM-54-01 | PARTIAL_SPLIT | 學員匯出站的 `qa:responsive` 命令、結果與截圖須核對實際生成 ZIP；不能用教師站的四尺寸 QA 替代 |
| UP61-01b Artifact、CI 不等於 Live Preview／人工驗收 | [#61 L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L19) | P0-U004、P0-U005、P0-U008 | ALIAS/PARTIAL | 同樣禁止假稱 Preview；「人工沒有看過」是額外驗收邊界 |
| UP61-08a Cloudflare PR Head/Deployment URL 對照 | [#61 L21](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L21) | P0-U006、B9A-DEP25-01 | ALIAS/PARTIAL | 保留 Cloudflare Git integration 已啟用前提、真實 Branch/Deployment URL |
| UP61-08b GitHub Pages 無預設隔離 PR Preview | [#61 L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L22) | P0-CANON-PRVIEW-MISSING、P0-CANON-PRVIEW-CONSENT | PARTIAL_SPLIT | 無 Preview 時須誠實報告；新增隔離架構須授權和獨立安全驗收，不允許直接推 main |
| UP61-08c Cloudflare 首次連 main 可能直接公開 | [#61 L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L23) | B9C-DEP40、B9B-DEP-19-02 | PARTIAL_SPLIT | 與已合併 #69 的首次部署規則一起核對；須保留「未授權前用安全初始化／隔離策略」 |
| UP61-02 Site Brief 非永久 SSOT | [#61 L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L28) | [使用者確認三路徑決策](UPSTREAM-DELTA-PR61.md) | KEEP / SUPERSEDES_OLD_REQUIREMENT | A/C 不需 Site Brief；B 可輸出；只在實際存在且有必要時記錄當前版本。**禁止把永久保存初版 path/hash/import date 的舊規則再引回** |
| UP61-03a 程式碼/config/Git/部署狀態屬實作來源 | [#61 L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L29) | STUDENT-AGENTS、PROJECT-TEMPLATE 的 SSOT 分工 | ALIAS | `PROJECT.md` 只保留意圖和已確認決策，不宣稱編輯文檔即完成部署 |
| UP61-03b 更新 ZIP 不覆寫既有 PROJECT | [#61 L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L29) | B9C-ASM60、STUDENT-AGENTS | ALIAS/PARTIAL | 現有修改與決策保護需保留，涵蓋未提交修改 |
| UP61-04 AGENTS 運作規範／外部資料非授權 | [#61 L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L30) | P0-U001、P0-U003、STUDENT-AGENTS | PARTIAL_SPLIT | 授權來源不能是 Brief/PROJECT/網頁；`CLAUDE.md`／`GEMINI.md` 指向 `AGENTS.md` 屬架構事實 |
| UP61-05a RWD QA 的五尺寸與錯誤類別 | [#61 L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L31) | B9C-DEP34、B9B-ASM-54-01 | PARTIAL | 學員 RWD 另外包括 **375px**，並具 HTTP／溢出／內部圖片／JS 結果，不可被四尺寸表取代 |
| UP61-05b 產物與人審邊界 | [#61 L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L31) | ACCEPTANCE-SSOT、P0-U008 | KEEP | PR SHA + results/screenshots；外部圖片／可信度／體驗仍須人工確認 |
| UP61-06a 人工驗收欄位 | [#61 L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L32) | ACCEPTANCE-SSOT、B9C-DEP36 | PARTIAL_SPLIT | 審查者／日期／PR head SHA／真實 Preview／頁面尺寸／問題與待補項，每一項需獨立可查的證據 |
| UP61-06b Merge/Production 當次授權 | [#61 L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L32) | P0-U001、P0-U003、B9B-DEP-37-01 | ALIAS/PARTIAL | 學員當次核准的**版本及發布影響範圍**，舊 PROJECT/聊天敘述不構成操作授權 |
| UP61-07a 防覆寫未提交修改與新站現況 | [#61 L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L33) | B9C-ASM60、STUDENT-AGENTS | KEEP/PARTIAL | 新 ZIP／舊 Brief 不可覆寫近期更動；接手先保全未提交工作 |
| UP61-07b 不必追溯最初 Brief | [#61 L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/da65053ccc237474e1fdf8a28fcbae20fe7029c2/docs/student-builder-pack/AGENT-HANDOFF.md#L33) | UP61-02 | ALIAS | 非 Site Brief 路線不得標缺失，也不要求補建 JSON |

## 仍未解決的衝突與不實確定性

1. `PROJECT-TEMPLATE.md` 的「Site Brief JSON 路徑及版本：待確認」及 `scripts/student-project-context.mjs` 的「原始檔路徑待確認」與**不強迫三路徑存在 Brief** 的產品決策有條件性衝突：`PARTIAL_CONFLICT`，尚未授權修改模板/生成器。
2. #61 L19 自述學員匯出站 PR Workflow 將跑 `qa:responsive`。已有腳本及生成器字串證據，但**未把全部輸出情境逐項重新 E2E 驗證**；本次僅處理文件語義，不能宣稱驗收通過。
3. 文字中 `KEEP/ALIAS/PARTIAL` 是提案型逐項處置，不是已裁決的最終唯一 Canonical 條款或來源移除權限。
4. #61 PR 本身仍 Open/Draft，不以 #67 的文檔稽核替代原 PR 獨立合併審查；#58 的 C/D 驗收仍需現行可再現證據。

## 反向驗證責任

- 來源正向：#61 每個 L19/L21–23/L28–33 → UP61 子項 → 對應 P0/Batch 候選、條件及未決問題。
- 候選反向：每個 P0/Batch ID → Frozen 原文來源 + #61 上游相關來源；**相同語義不得刪除來源差異**。
- 對本表每一格都以工作 ID 回到對應文件和 GitHub 的來源原文核實；若 ID 不存在應標 `BROKEN_REFERENCE`，不能推定其存在或遺失規範。
- Stage 2 IN PROGRESS；Stage 3/4 BLOCKED；PR #61/67 均不 Merge，Issue #58 不結案。
