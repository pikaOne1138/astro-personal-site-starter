# Phase 2｜Batch1–8 子條款反向完整性核對 09

> Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。查核 #67 三份子項表與總 Inventory；此結果是**結構完整性**和特定原文抽查，不是語義全覆蓋核准。

## 實際結構驗證

- `CHILD-SPLIT-01`：8 個父工作 ID、27 個子工作 ID。
- `CHILD-SPLIT-02`：14 個父工作 ID、55 個子工作 ID。
- `CHILD-SPLIT-03`：28 個父工作 ID、87 個子工作 ID。
- 合計 **50 個不同父 ID／169 個不同子 ID**。169 個子 ID **沒有相互重複**；50 個父 ID 均可於 Batch1–8 的 187 筆 Inventory 首欄找到。
- 數量核實表示父子連結存在；**不能**推斷每個子工作 ID 已覆蓋凍結原句的所有條件、例外或技術前提。

## 原文核對重點／仍需避免的資訊遺失

| 來源 | 父候選及子 ID | 已保留 | 仍需明示的範圍 |
|---|---|---|---|
| [Publishing L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L28) | B1-PUB28-03/04 | 發布 articles、legacy draft:false；撤回 drafts、draft:true、乾淨 Build | 同一原文還要求每次檢查公開路由、保留 legacy filtering、URL 不可靜默改、限制 loader scope；要聯結原 Batch1 其他工作 ID，不能只看上述子項 |
| [Publishing L56](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L56) | B1-PUB56-01/02/05 | 乾淨 Build、草稿多輸出面、route-aware 限制 | 該行還有負向測試、驗證器漏報不得改報告，以及命令應針對實際學生網站執行；必須保留 B1-PUB56-03/04，且不得把 route-aware 延伸要求視為已實作 |
| [Deploy L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L31) | B1-DEP31-02/03 | 內容、Preview、安全、授權與索引狀態／robots/canonical/Sitemap | 正式環境與 Preview 互斥設定、GitHub Pages Variables 未設定 false 及手動 Workflow 另有平台別條件；不得只保留索引 Boolean |
| [Assembly L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L31) | B8-ASM-L31-02 | 實際截圖人工 Art Direction 比對、Build／無 overflow 不代表忠實度 | 真實輸出首頁及內頁 1440/1280/768/390 的 artifact 範圍不可被純構圖審查取代 |
| [Assembly L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L11) | B6-ASM11-01/02（未在此次子表細拆） | 早期 B 路徑的 JSON schema | 已確認三路徑 A/C 不強制 JSON；此凍結來源應標條件適用，不能擴張成學員通用阻擋 |

## 有界結論

1. **PASS（結構）**：本次 169 個子 ID 唯一；50 個父 ID 均能回到 Inventory；三份 Child Split 仍保留對凍結原文的連結。
2. **PENDING（語義）**：未逐句完成 187 個候選所有父子及例外的語義等價審核；不能直接把 50 個父條款刪除。
3. **PENDING（跨來源）**：P0／Skills A／B／Batch9／PR61 Delta 仍需跨整批候選建立 SAME、PARTIAL、DISTINCT、CONDITIONAL 及反向來源清單。
4. **BLOCKED（Canon 數）**：在上述工作完成前無法可靠確定唯一 Canonical 母數，不可將 169、187 或先前 444 當成最後條款數。

Stage 2 IN PROGRESS；Stage 3/4 BLOCKED。#67 保持 Draft，#61／#58 不變。不得刪原始規範、改模板、Merge 或正式部署。
