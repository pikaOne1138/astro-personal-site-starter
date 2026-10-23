# Phase 2｜跨來源引用反查 10：已確認的破損 ID 與修正

Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本文件是 **Crosswalk 01–05 的限定範圍引用審查**，並非全部 192 份來源文件的語義覆蓋 PASS。

## 查核結果

| 發現 | 來源及證據 | 處置 |
|---|---|---|
| `B9-ASM-L29-1` 找不到對應正式工作列 | Crosswalk 04 原引用；Batch9 Remaining Line Map 無該 L29 工作列 | **已更正**為 `B8-ASM-L29-02`，其來源為 Frozen Assembly L29「未填資料顯示未配置、缺 contact endpoint 不可冒充可用預約表單」。保留 Crosswalk 04 更正紀錄 |
| `B9-ASM-L45-1`、`B9-ASM-L48-1`、`B9-ASM-L49-1`、`B9-ASM-L51-1`、`B9-ASM-L52-1`、`B9-ASM-L54-1`、`B9-ASM-L57-1`、`B9-ASM-L61-1`、`B9-ASM-L64-1` | [Batch9 Remaining Line Map](PHASE2-CORE-SKILLS-B-REMAINING-LINE-MAP.md) | 本批 9 個引用均找到來源列；但標記 `SOURCE_ANCHORED / ATOMIC_REVIEW_PENDING`，不等於已原子化 |
| `B9C-DEP40-01`、`B9C-ASM77-03`、`B9C-ASM78-01` | [Batch9-C Child Register](PHASE2-BATCH9-C-CHILD-ID-REGISTER.md) | 在新增 72 子項登錄表找到 ID；曾經無獨立子鍵的歷史狀態不得繼續當成最新缺口 |
| `B8-ASM-L29-02` | [Batch1–8 Inventory](PHASE2-BATCH1-8-CANDIDATE-INVENTORY.md)，Frozen [Assembly L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L29) | 修補的是引用，不新增或變更來源義務 |

## 證據性質與剩餘 Gate

- 本次確認了上述具體引用的**存在性與來源對應**，未計算完整 Crosswalk 所有 token 的閉環率，沒有宣稱全倉庫 `0 BROKEN_REFERENCE`。
- `B9-ASM-L29-1` 是確實找到並修復的文檔引用錯誤；已更正 [Crosswalk 04](PHASE2-CANONICAL-ALIAS-CROSSWALK-04.md)。
- 分子項目有真實 ID 與來源錨點，只能作為 Phase2 工作候選。條款語義是否相同、條件適用與可否歸併成正式 Canonical，仍須進一步逐個裁決。
- #61 後凍結 Delta 不得悄悄混入 Frozen 分母；已明確取消永久保存初版 Site Brief path/hash/import date，三路徑不強制都有 JSON。
- Phase2 **IN PROGRESS**，Stage3/4 **BLOCKED**；#67 Draft，#61 Draft，Issue #58 Open；未 Merge、未部署、未刪原始文件。
