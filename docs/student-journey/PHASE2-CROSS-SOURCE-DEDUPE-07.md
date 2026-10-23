# Phase 2｜跨來源去重裁決候選 07（附適用條件）

Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`；#61 為後凍結 Delta。下列 **17 個跨來源語義群**不是 17 個正式 Canonical ID。關係為工作裁決候選，仍需逐行核對所有來源與例外，禁止刪除 Alias 來源。

| 候選群 | 關聯工作 ID | 關係 | 不能遺失的條件 |
|---|---|---|---|
| AUTH-MERGE | `P0-U001`、`B1-ASM23-01`、`B7-PUB-L79-02`、`B9C-ASM62-02`、`UP61-06b` | PARTIAL_OVERLAP | 核准必須指向當前 PR/head SHA；作者同意稿件不直接構成 Merge 授權 |
| AUTH-PRODUCTION | `P0-U003`、`B1-ASM23-02`、`B9C-ASM62-03`、`UP61-06b` | PARTIAL_OVERLAP | Production、Merge、索引開放是不同操作，不得用一般同意涵蓋全部 |
| PREVIEW-REAL | `P0-U004`、`P0-U005`、`B6-PUB65-02`、`B9A-DEP25-01`、`UP61-01b` | PARTIAL_OVERLAP | Artifact 不等於 Live 網址；另要核對實際 Branch/Deployment/SHA |
| PREVIEW-PRIVACY | `B2-PUB37-02`、`B5-PUB58-01`、`B5-PUB58-02`、`UP61-08c` | PARTIAL_OVERLAP | 公開 PR Preview、immutable 部署與 Git 歷史是不同曝光面 |
| DRAFT-OUTPUT | `B1-PUB28-09`、`B2-PUB37-01`、`B1-PUB56-02` | PARTIAL_OVERLAP | Loader 來源限制、各輸出面的負向結果、檢驗手段分開 |
| SEARCH-UI | `B3-PUB20-02`、`B2-PUB48-02`、`B9A-ASM70-04` | PARTIAL_OVERLAP | Pagefind 建索引≠搜尋 UI 已組裝且功能驗收 |
| SEARCH-NO-METADATA | `B2-PUB48-03`、`B9A-ASM70-03` | SAME_CANDIDATE | 同為禁止自行重建 metadata-only 索引；須保留 Publishing/Assembly 兩來源 |
| NO-FAKE-FACTS | `P0-U013`、`B4-ASM28-02`、`B5-PUB12-02`、`B5-ASM21-03` | PARTIAL_OVERLAP | 資格、見證、療效、價格、功能可用性及媒體授權不得互相吞併 |
| DEMO-PUBLISH | `B5-ASM21-01`、`B1-ASM22-01`、`B1-ASM22-02`、`B1-ASM23-04` | DISTINCT_CONDITIONS | Preview 保留 Demo、逐項揭露、選 keep/edit/hide、被核准發布是四個不同關卡 |
| VISUAL-QA | `B6-PUB65-03`、`B8-ASM-L31-01`、`B8-ASM-L31-02`、`B9C-DEP34` | PARTIAL_OVERLAP | 四尺寸截圖、內容/構圖忠實度、互動可操作是不同驗收面 |
| HOSTING-CONFIG | `B4-DEP16-02`、`B4-DEP17-02`、`B4-PUB50-01`、`B4-PUB50-02` | PARTIAL_OVERLAP | site/base 設定與 RSS/Sitemap/canonical 輸出實測分開 |
| ARTICLE-SLUG | `B2-PUB36-01`、`B7-PUB-L77-01`、`B7-PUB-L72-01` | PARTIAL_OVERLAP | 原 URL 保留與 URL 變更事前告知同意是不同義務 |
| CONTENT-UPDATE-DATE | `B2-PUB36-02-S01`、`B2-PUB36-02-S02`、`B7-PUB-L77-02` | PARTIAL_OVERLAP | 更新 updatedAt 與不可改 publishedAt 為不同條件 |
| SITE-BRIEF-SCOPE | `B6-ASM11-01`、`B6-ASM11-02`、`UP61-02` | CONDITIONAL_SCOPE | Frozen B 路線必需 JSON 不可擴張至 A/C；使用者已確認 Site Brief 為選用初建輸入 |
| STUDENT-PROJECT-SSOT | `B3-PUB20-01`、`B5-PUB18-02`、`UP61-03a` | PARTIAL_OVERLAP | 程式/Git/部署描述實作，PROJECT.md 記錄已核准意圖 |
| INDEX-SAFETY | `B1-DEP31-02`、`B1-DEP31-03`、`B6-PUB49-02`、`P0-U018` | PARTIAL_OVERLAP | 索引開關、部署環境、robots/canonical/sitemap 與學員授權各留獨立欄 |
| CI-NO-BYPASS | `B5-PUB62-03`、`B6-DEP30-03`、`P0-U008` | PARTIAL_OVERLAP | 不跳 Gate、負向注入、教師站驗收不能替代學生站皆獨立 |

## 決策限度

- `SAME_CANDIDATE` 仍不等於已核准合併；`PARTIAL_OVERLAP` 不得硬併。個別 work ID 應以對應 Batch／P0 register 為準。
- Upstream `UP61-*` 是 Delta 子條款而非 Frozen 規範；適用性與生效日須分開。
- 暫不核准去重後的唯一母數，因 Batch1–8 仍有待原子化的候選，其他 Frozen 文件尚未逐條完成語義分類。
- Phase2 IN PROGRESS；Stage3/4 BLOCKED。#67 Draft；#61、#58 不變。
