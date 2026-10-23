# Phase 2｜Crosswalk 06：ID 存在性反查與 Batch 9 未原子化債務

> 基準 PR #67 `9b5620f003c0cde944aa586a72b5961840f79894`，Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。這是**分層、可重現的局部查核**，不是全 Repo 的 Canonical 完成宣告。

## 查核方式／範圍

讀取 `PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md`、`PHASE2-CORE-SKILLS-B-ATOMIC-BATCH1..8.md`、`PHASE2-BATCH9-ATOMIC-A/B/C.md` 和 `PHASE2-CORE-SKILLS-B-REMAINING-LINE-MAP.md` 的 Markdown 表格**首欄**作工作 ID 定義，再對照 Crosswalk 01–05 的內文引用。須分辨「確實有獨立 ID」、「存在父行工作 ID 但子項未配 ID」、「候選群名稱而非工作 ID」、「查核範圍外」；以文字出現作定義是不充分的。

本輪檢查上述 14 份主要登錄表，辨識到 379 個**首欄符合格式的工作 ID 字串**（計入 Cross-batch 查核表時另有工作引用，不等於 379 個獨立義務）。Crosswalk 文本共出現 82 個符合 P0/B 型式的候選引用，其中下列是**未能在本輪首欄定義中找到的引用**：

| 參照型式 | 本輪觀察 | 處置 |
|---|---|---|
| `B9C-DEP40-01`, `B9C-DEP40-04` | [Batch9-C](PHASE2-BATCH9-ATOMIC-C.md) 僅以 `B9C-DEP40` 為表列 ID，01/04 是描述欄的子句序號 | `CHILD_ID_NOT_MINTED`；不能計入去重母數 |
| `B9C-ASM77-03`, `B9C-ASM77-04` | 僅有父列 `B9C-ASM77` | `CHILD_ID_NOT_MINTED` |
| `B9C-ASM78-01`, `B9C-ASM78-03` | 僅有父列 `B9C-ASM78` | `CHILD_ID_NOT_MINTED` |
| `B9C-DEP36-02`, `B9C-DEP36-03` | 僅有父列 `B9C-DEP36` | `CHILD_ID_NOT_MINTED` |
| `B9-ASM-L29-1` | 來源行地圖不是完整 Batch9 義務定義，且本輪所讀首欄無此 ID | `SOURCE_ID_RECHECK`，回 `REMAINING-LINE-MAP` 和來源 L29 核對 |
| `B9C-DEP40-03`（若另表引用） | 與上述 DEP40 同類，為**行內子項描述** | `CHILD_ID_NOT_MINTED` |

**請注意：** `P0-CANON-...` 與 `CAND-...` 為既有群組／候選名稱，不是上述首欄型式的新原子條款 ID；不能把群組數加到義務數。

## 本輪未確認為失效、需分層核對的引用

`B9A-DEP25-01`、`B9B-DEP-37-01`、`B9C-ASM62`、`B9C-DEP34`、`B9B-ASM-54-01`、`B9C-ASM60` 等已在 Batch9-A/B/C 登錄表出現，不能僅因不同前綴或舊正規表示式未命中就報 BROKEN。這些與未建立的 `B9C-DEP40-01` **不是同一情形**。

## 結論與下一個 Gate

1. **Batch9-C 的 21 個父列仍含多個以 01/02/03 串列的要求**。需由凍結原文逐項核實，為真正獨立的子義務 mint ID，明確區分 NORMATIVE、ACCEPTANCE、PROCEDURE、EVIDENCE、SCHEMA、STATUS；來源父列不刪。
2. 完成 Batch9-C 後再查 Batch1–8 的複合條件；對照 P0 86 末端工作記錄，排除父子重複和例外條款，不以差值推測唯一 Canonical 數。
3. Crosswalk 01–05 的關係文字暫保留供追溯；新表明確標示尚無子項 ID，**不得因引用名貌似存在就判為 PASS**。
4. PR #61 的 Post-frozen Delta 分開計數並註明何時生效；#58 為總驗收 Issue，不因本輪文檔檢查關閉。

Stage 2 **IN PROGRESS**；Stage 3/4 **BLOCKED**。未改 Frozen 來源、Skill、Builder Template、生成器或生產部署；#67 保持 Draft，#61/#58 維持 Open。
