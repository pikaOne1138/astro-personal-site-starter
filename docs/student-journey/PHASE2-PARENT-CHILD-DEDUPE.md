# Phase 2｜P0 父子條款計數與重疊關係

本表是 [CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md) 的輔助證據，固定既有 41 個候選和 13 個 PARTIAL 父條款拆出的 31 子候選。**不以父＋子直接相加，不虛構唯一原子條款總分母。**

| 父候選 | 子候選數 | 子候選 ID | 可計數性及重疊風險 | 狀態 |
|---|---:|---|---|---|
| `GATE-001.03` | 1 | `GATE-001.03.S1` | single-child, retain one leaf but parent remains until source map approved | COUNT_PENDING |
| `GATE-002.02` | 3 | `GATE-002.02.S1`、`GATE-002.02.S2`、`GATE-002.02.S3` | three distinct protected actions; child leaves replace parent's combined action for counting | COUNT_PENDING |
| `GATE-002.03` | 1 | `GATE-002.03.S1` | single-child, exact PR59 scoped requirement | COUNT_PENDING |
| `PROOF-001.03` | 3 | `PROOF-001.03.S1`、`PROOF-001.03.S2`、`PROOF-001.03.S3` | three requirements; PREVIEW-POLICY-01 repeats two, do not double count | COUNT_PENDING |
| `PROOF-002.01` | 2 | `PROOF-002.01.S1`、`PROOF-002.01.S2` | two URL proof obligations | COUNT_PENDING |
| `PROOF-003.02` | 2 | `PROOF-003.02.S1`、`PROOF-003.02.S2` | two requirements; evidence is EXT-01 acceptance criterion NOT TESTED | COUNT_PENDING |
| `PROOF-003.03` | 2 | `PROOF-003.03.S1`、`PROOF-003.03.S2` | two branches with conditional Cloudflare | COUNT_PENDING |
| `PRIV-001.01` | 2 | `PRIV-001.01.S1`、`PRIV-001.01.S2` | two privacy checks | COUNT_PENDING |
| `PREVIEW-POLICY-01` | 2 | `PREVIEW-POLICY-01.S1`、`PREVIEW-POLICY-01.S2` | both overlap PROOF-001.03.S2/S3 | COUNT_PENDING |
| `PR59-EVIDENCE-01` | 3 | `PR59-EVIDENCE-01.S1`、`PR59-EVIDENCE-01.S2`、`PR59-EVIDENCE-01.S3` | three groups of required fields; missing result must be included | COUNT_PENDING |
| `INDEX-DETAIL-01` | 4 | `INDEX-DETAIL-01.S1`、`INDEX-DETAIL-01.S2`、`INDEX-DETAIL-01.S3`、`INDEX-DETAIL-01.S4` | four conditional steps for production indexing | COUNT_PENDING |
| `QA-DETAIL-01` | 3 | `QA-DETAIL-01.S1`、`QA-DETAIL-01.S2`、`QA-DETAIL-01.S3` | three bundles, still composite and feature-conditional | COUNT_PENDING |
| `EXT-DETAIL-01` | 3 | `EXT-DETAIL-01.S1`、`EXT-DETAIL-01.S2`、`EXT-DETAIL-01.S3` | three acceptance components overlap PROOF-003.03 | COUNT_PENDING |

## 範圍核對：四項尚未完全解決的條款

1. `PROOF-003.02.S2`：PR59 EXT-01 所列 Workflow Run、Artifact、SHA 是 **尚未執行的驗收證據規格**（NOT TESTED），並不是已執行測試或所有學生站需額外複製教師 workflow。
2. `PR59-EVIDENCE-01.S2`：原文完整記錄欄位包括測試目標/Repo、Commit SHA、網址或 Artifact、**日期、執行者、結果、未解風險**；上游版本變動必須重判證據。不能只留下「時間、執行者、風險」三項。
3. `INDEX-DETAIL-01.S1`：只在完成內容、安全與授權驗收，且學員明確同意的**正式部署環境**設定 `SITE_INDEXABLE=true`，再重建與檢驗；不適用 Cloudflare Preview。
4. `QA-DETAIL-01.S1`：檢查的 Pagefind、RSS、內容頁等以實際生成網站及適用功能為準。不能把具有索引的建置流程誤認為搜尋對話框 UI 已組裝；Preview 上還要驗證連結、404、操作與隱私。

## 已辨識的不可重複計數關係

- `PROOF-001.03.S2/S3` 與 `PREVIEW-POLICY-01.S1/S2` 指向同一 GitHub Pages 無預覽時的告知及變更部署設定權限，需要同義映射而非四條總數。
- `PROOF-003.03` 與 `EXT-DETAIL-01` 都描述 EXT-03/04 路徑驗收，但平台適用範圍不同，不可完全合併。
- `PR59-EVIDENCE-01` 是測試報告欄位的複合要求，暫不能宣稱已拆到不可再拆。
- `QA-DETAIL-01` 仍有多個功能檢查，因此 31 個子候選並非全部真正原子化。

**Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。沒有任何來源被刪改或宣布語義 PASS。**
