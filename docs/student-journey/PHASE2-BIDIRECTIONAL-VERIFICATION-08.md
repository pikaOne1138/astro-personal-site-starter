# Phase 2｜雙向追溯與 Canonical Gate 狀態 08

> 依 #67 分支於 2026-10-23 的實際登錄表查核；Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。**本報告不得作為 Phase2 完成核准。**

## 實際已執行的可重現查核

1. 已讀取 Batch1–8 的八份工作登錄：**187** 筆候選，逐筆列在 [Batch1–8 Inventory](PHASE2-BATCH1-8-CANDIDATE-INVENTORY.md)。連詞／標點初篩 **128** 筆，先前已拆的 **8** 筆，其餘 **120** 筆標 `PENDING_ATOMIC_SEMANTIC_REVIEW`；不能把初篩視為確定有 120 個缺失。
2. 已驗證 Batch9-C [子項登錄](PHASE2-BATCH9-C-CHILD-ID-REGISTER.md) 有 **72** 筆首欄子工作 ID，父列 21 筆仍保留；語義最小化尚待審核。
3. 本輪以 P0 Register、Batch1–8、Batch9-A/B/C、Batch9-C Child 和 Batch1–8 Split 等登錄表的首欄作工作 ID 集，辨識 **444 個符合工作 ID 格式的不同鍵值**。P0 文件內有自我重提／統計段落，這些鍵值不可當成唯一義務總數。
4. [Cross-source Dedupe 07](PHASE2-CROSS-SOURCE-DEDUPE-07.md) 之 **55 個不同 P0/B 工作 ID 引用**都能在本次所讀首欄工作 ID 表中找到定義：**55/55 存在性檢查通過，0 個未解引用**。這只證實**該表**引用的鍵，不等於 Crosswalk01–06 或整個 192 文件全量引用均通過。
5. 17 組跨來源去重仍是 `SAME_CANDIDATE / PARTIAL_OVERLAP / CONDITIONAL_SCOPE / DISTINCT_CONDITIONS` 初判；不具使用者核准或自動刪除來源的效力。

## 三項剩餘缺口的真實判定

| 原始缺口 | 目前可證實成果 | 未達成 Gate |
|---|---|---|
| Batch1–8 全部複合條款原子化 | 187 筆已完整盤點、8 個父條款已細分成 27 子項、120 筆標人工優先審核 | 尚須逐列核對原始 Skill，判斷文字是單一義務／多義務／狀態／範例／例外，補足確有需要的工作子 ID |
| P0／Skills A／B／Batch9／PR61 全量語義去重 | 新增 17 群跨來源候選，原始角色及平台差異保留 | **未完成**：Skills A、設計／內容／研究等來源及既有 Crosswalk 的逐來源 SAME/PARTIAL/DISTINCT 尚不能保證全面對齊 |
| 所有 ID 雙向追溯與最終唯一 Canonical 分母 | 最新 Cross-source 07 的 55/55 ID 存在；Batch9-C 的 72 筆有父子鍵 | **未完成**：仍需全部來源原文逐條 → 對應原子項、各 Canonical → 所有來源與適用條件、孤兒引用／重複父子全量核對 |

## 不得誤讀的數字

- **187** = Batch1–8 現有候選行數，不是唯一義務。
- **128** = 含可能複合語句的初篩候選，不代表確定需要 128 次拆分。
- **72** = Batch9-C 有 ID 的既有子條件，不是全部已完成最小原子化。
- **444** = 已讀登錄表所辨識之不同工作鍵值（混合父／子／分類），不是 Canonical 數量。
- **55/55** = 限 Cross-source 07 工作 ID 的存在性驗證，不是全 Repo 零遺失 PASS。
- **17** = 跨來源候選語義群數，不是唯一規範數。

## 遵守產品決策與 Gate

- A 復刻／C AI 從零不強制 Site Brief；B 可選擇透過 Starter 生成。Frozen `B6-ASM11-01/02` 原文適用範圍限原路線，不擴張為三路徑通用前置。#61 Upstream Delta 保留其撤銷初版 Brief path/hash/import date 永久追溯的決策。
- 不以 Build／CI／Artifiact 成功代替 Live Preview 或人工驗收；不將 #58 收尾 Issue 視為自動結案。
- **Phase 2 仍 IN PROGRESS，不能核准唯一 Canonical 母數；Stage 3/4 BLOCKED**。#67 與 #61 Draft，#58 Open；原始 Skill、Frozen Source、Builder Pack、模板／生成器不動、不 Merge、不部署。
