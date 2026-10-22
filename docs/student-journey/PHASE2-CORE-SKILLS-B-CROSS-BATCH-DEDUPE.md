# Phase 2｜核心 Skills B 跨批次去重判定（第一輪）

依據 Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`，核對 Batch 1–3 的 69 個工作候選及 P0 canonical/alias。此表是文件語義「初判」，不等於正式驗收或建立新的 canonical ID。

| 工作候選 A | 工作候選 B / P0 | 判定 | 根據、必要保留的差異 | 下一步 |
|---|---|---|---|---|
| `B3-PUB20-02` | `B2-PUB48-02` | SAME_CANDIDATE | 同一 Publishing Skill L20 與 L48 都說索引產生不等於搜尋 UI 已完成，但前者是生成專案現況、後者是組裝驗收要求；不能刪掉兩個 source | 保留兩來源，核對主詞與驗收差異後才決定共用 canonical |
| `B1-PUB28-02` | `B2-PUB37-01` | PARTIAL_OVERLAP | L28 描述 draft 文件所在的 Collection；L37 描述公共輸出清單、RSS、Sitemap、搜尋不得含 draft；存放位置與公開輸出 QA 不是同一義務 | 分別留 ID |
| `B1-PUB28-07` | `B2-PUB37-02` | PARTIAL_OVERLAP | L28 的資料夾隔離非保密，L37 的公開 Preview 可能曝光未公開內容；前者制度邊界，後者發佈渠道威脅 | 分別保留 |
| `B1-PUB56-02` | `B2-PUB37-01` | PARTIAL_OVERLAP | 一者必須檢查輸出面，一者規定輸出面不應含 draft；驗收手段與規範結果不能合併 | 分類為驗收 vs 規範 |
| `B1-ASM23-01` | `B1-ASM23-02` | DISTINCT | 版本、範圍、Production 行為三者都是授權範圍條件，未必需要獨立三條規範，但不能遺失任一條件 | 保留為同一主契約的三個欄位候選 |
| `B1-DEP31-02` | `P0-CANON-INDEX-ENABLE` | PARTIAL_OVERLAP | P0 已含完成驗收／同意才在 Production 開啟索引；B1 只寫開啟的授權前置，P0 仍保留正式環境與變數約束 | 建 parent-child，不直接加計 |
| `B1-DEP31-04` | `P0-CANON-INDEX-ENABLE` | PARTIAL_OVERLAP | B1 提供重新 Build、robots/canonical/Sitemap 驗證步驟，P0 明確要求額外保留此步驟 | 轉作該 canonical 驗收子項 |
| `B1-DEP31-05` | `P0-CANON-PREVIEW-INDEX` | NOT_APPLICABLE | B1 實際只有 DEP31-01 到 -04，不得創造不存在的 ID | 禁止用錯誤 ID 建立 alias |
| `B1-DEP31-04` | `P0-CANON-PREVIEW-INDEX` | PARTIAL_OVERLAP | Batch1 DEP31-04 同時含 Cloudflare Preview 與 GitHub Pages Action Variable；必須再拆成平台別兩個工作子欄位 | 標為再原子化待辦 |
| `B2-DEP43-05` | `P0-CANON-PRVIEW-MISSING` | DISTINCT | 舊 Preview URL 不能證明新 SHA，與沒有 Live Preview 應誠實回報是不同證據條件 | 分別保留 |
| `B3-DEP8-03` | `P0-CANON-PRVIEW-MISSING` | PARTIAL_OVERLAP | Skill 不能代表已具備 Preview，與實際不可用時須如實報告是不同層次 | 保留能力邊界 |
| `B3-ASM14-02` | `B3-DEP8-03` | DISTINCT | 不得宣稱完整多頁網站與不得宣稱已存在 Live Preview 是不同事實主張 | 分別保留 |

## 校驗結果

- Batch1/2/3：25 + 15 + 29 = **69 個工作候選**，分別對應 **5 + 5 + 10 = 20 個不重複的來源行**。
- 上表 `B1-DEP31-05` 只作反例、明確標為不存在；不能計入工作候選。
- 已觀察到同義候選與數組子條件複合，尚未可核准任何跨來源 canonical 合併。
- 不能用 69 減去 SAME_CANDIDATE 直接宣稱唯一規範分母。全 repo frozen source 覆蓋仍不足。
- Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skill 不修改，不 Merge。
