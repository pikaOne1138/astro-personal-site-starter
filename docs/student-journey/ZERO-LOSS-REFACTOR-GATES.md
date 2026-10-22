# ATP 文件 SSOT 重構｜零資訊遺失最高驗收契約

> 強制優先級：**完整性 > 可追溯性 > 便利性 > 文件數量**。若彼此衝突，以原文保全優先。任何自動檢查 PASS 都不代表人工已核准文件刪改。

## 四階段及禁行事項

| 階段 | 交付 | 必要 Gate | 目前狀態 |
|---|---|---|---|
| 1 原文完整保留 | [精確基線](SOURCE-BASELINE-2026-10-22.md)：main SHA、完整路徑、Blob SHA、位元組；原檔維持 | Git tree 未截斷；192/192 文件均能由當時 main commit 重建；禁止改原檔 | **基線已建立，等待使用者檢閱** |
| 2 逐條內容對照 | [條款遷移對照表](CLAUSE-COVERAGE-MATRIX.md)：每個規則、例外、數字、適用範圍、驗收項、來源逐項映射目標 | 所有待整併文件逐條覆蓋 100%；任何 `UNMAPPED`、`AMBIGUOUS`、`CONFLICT` 不得進入第三階段 | **啟動首批草稿，未達 Gate** |
| 3 新結構＋雙向比對 | 新管理入口（僅索引）、舊原文保留；逐條 source→target 和 target→source 對照報告 | 每項原內容在原位保留或有逐條可追溯的新版權威來源；新增改寫的含義與授權明示；技術引用、生成 ZIP、CI、瀏覽器 QA 另驗 | **未開始；Gate 禁止** |
| 4 人工確認才整理原檔 | 使用者逐份核准清單、Git diff、移轉後文件與反向連結 | 沒有書面核准，不搬、不刪、不縮寫，不 Merge；原文與過往歷史永遠可按 SHA 還原 | **未開始；Gate 禁止** |

## 不得省略的覆蓋欄位

每個**規範性條款**（必要、禁止、例外、安全限制、資料契約、介面/CLI、測試條件、判定標準）必須記：
1. 唯一條款 ID；
2. 原始路徑＋Frozen Blob SHA＋標題／精確行號；
3. 原文短引（完整內容必須可追溯到原檔，不以意譯摘要替代）；
4. 規則性質、適用對象／時點、例外及安全風險；
5. 新目的地檔案＋條款/錨點，以及 `UNCHANGED`／`VERBATIM`／`REWRITTEN`／`REFERENCED`／`HISTORICAL`；
6. 若有改寫，差異、決策者和核准證據；
7. 狀態 `MAPPED`／`UNMAPPED`／`AMBIGUOUS`／`CONFLICT`，與驗證者及檢查結果。

歷史 PR 審查、原始研究、程式碼快照、示範文章及 fixtures **不須逐條移入管理 SSOT**；但需要保留原始檔案和精確基線，並分類 `PRESERVE_IN_PLACE`。因此「條款 100% 覆蓋」是指**被提案整併的規範性內容**，不是把 192 份研究文件都改寫成條款。

## 否決條件（任一項直接擋住）

- 以摘要替代條款造成前提、例外、限制、數字、版本／適用對象或否定詞消失；
- 把 `BUILD PASS` 當 `Preview PASS`，把示例／模擬／測試稿當真實對外服務；
- 將學生獨立站 `PROJECT.md/AGENTS.md` 與教師母 Repo 交接 SSOT 混合；
- 對相互衝突文件直接擇一，沒有記錄來源版本與使用者決策；
- 以 GitHub 歷史「可找回」為由，未經人工核准便先刪掉原檔；
- PR #61 / #67 / #68 / #69 並行修改同一路徑卻沒有先重讀各分支和處理衝突；
- 產生新文件但未處理舊文件的連結，導致學員下載 ZIP、START-HERE、Skill 找不到入口；
- 無具體人工同意便 Merge、改 Production、DNS 或公開索引設定。

## 本輪變更範圍

此契約、基線與條款對照表只是 **PR #67 的治理交付**，不修改任何原始被盤點文件。除非第二階段完成且獲准，不會自動啟動第三、四階段。

## 核對紀錄

- 2026-10-22 第一階段來源：`main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`；Git tree 未截斷，共 192 份 `.md/.mdx/.txt`。
- 第二階段初始狀態：**未完成**。不能用先前 192 份的「已讀與分類」冒充逐條 100% 遷移覆蓋。

## 第二階段執行紀錄｜2026-10-22

- 批次 A：`QUALITY-CONTRACT`、PR59 獨立驗收、`AGENT-HANDOFF`、`PREVIEW-BOOTSTRAP`：**93 行**凍結原文與精確連結。
- 批次 B：`START-HERE`、`STUDENT-AGENTS`、`PROJECT-TEMPLATE`、`PORTABLE-PROJECT-CONTEXT-SPEC`、`THREE-WAYS-TO-BUILD`、PR56 學員動線：**187 行**凍結原文與連結。
- 累計新增 **280 行原文映射記錄**（不是 280 項已完成的獨立條款）。最初 7 筆摘要式映射仍需逐項核實並改為精確條款；不得將記錄行數當完成率。
- **Gate 狀態：階段 2 IN PROGRESS；階段 3／4 BLOCKED。** 缺少各文件所有規範性子句的總分母、複合句拆分、衝突歸併及逐條人工審核。所有被盤點的原始文件仍維持不改動。

## 第二階段續作｜更多建站契約（2026-10-22）

- [批次 2：資料包／版型／素材／Brief](PHASE2-CLAUSE-REVIEW-BATCH2.md)：8 份檔案、151 行非空非標題原文，所有需再拆子條款。
- [批次 3：學員脈絡／三條路線／交接](PHASE2-CLAUSE-REVIEW-BATCH3.md)：5 份檔案、134 行來源原文；與較早批次有來源重疊，**不累加為獨立規範**。
- 不丟失的特殊條件：in-progress 不等於 Ready；首頁與導航 ID 插槽有差異；媒體須有授權且 Logo 非必填；Design Brief Markdown 不能冒稱可直接匯入 JSON；PR Build 不等於部署 Preview；學生意圖文件不能取代 Git/程式事實。
- 第二階段仍未達 Gate：沒有全量獨立子條款分母、未完成衝突仲裁及人工作證。第三與第四階段仍明確禁止。

## 第二階段續作｜19 個 Skills（2026-10-22）

- [Skills A](PHASE2-SKILLS-A.md) 10 份、108 行高風險抽樣；[Skills B](PHASE2-SKILLS-B.md) 9 份、85 行高風險抽樣；全部有 frozen Git blob 與行號。
- 抽樣不是全文逐條拆分，亦未完成 Skill references 的規範性內容比對。不可宣稱 19 Skills 已全部語義驗收。
- 依然禁止 Phase 3/4；安全護欄的跨 Skill 重複不得未經證明就刪除。

## 第二階段續作｜Skill 原子條款 P0

- [PHASE2-SKILLS-ATOMIC-P0.md](PHASE2-SKILLS-ATOMIC-P0.md)：4 份入口／發布 Skills，51 組可回溯的子條款候選，已區分 A/B/C、GitHub Build、實際 Preview、Cloudflare 初始化與索引授權。
- 尚須完整分解 19 Skills 中剩餘條款及 references，並完成每條跨文件語義比對。**51 不是總分母或核准通過數**。
- 第三、第四階段持續 BLOCKED。

## 第二階段續作｜15 Skills 全文候選掃描

- [8 個設計／內容 Skills](PHASE2-SKILLS-DESIGN-CONTENT.md)：137 行候選。
- [7 個組裝／日常操作 Skills](PHASE2-SKILLS-OPERATIONS.md)：79 行候選。
- 不得把 **216 個關鍵字命中來源行**當 216 項完整子條款；沒有命中的原文也不能視為無義務。第二階段的 Skill 主文件已全數建立來源清單，references 未全審。
- Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。保留全部原文與 Git SHA。

## 第二階段續作｜參考文件覆蓋界線

- [references coverage manifest](PHASE2-REFERENCES-COVERAGE.md) 列出 90 份附屬文件，已建立 42 份唯一來源之規範候選掃描，48 份尚未語義審核。
- A/B/C1/C2 分批取證均保留原始路徑、Blob SHA、行號；掃描結果非完整義務集、亦非 100% 覆蓋。
- 不因研究原文或程式碼快照數量多而刪除。第三、第四階段繼續鎖定。

## 第二階段續作｜48 份剩餘附屬來源已分類

[參考文件完整索引](PHASE2-REFERENCES-COVERAGE.md) 現已追蹤原先未做語義審核的 48 份文件：8 份案例特定設計決策、10 份十站逆向研究、2 份歷史稽核、9 份程式碼來源快照、19 份原始設計研究。分批證據：[Examples](PHASE2-SOURCES-EXAMPLES.md)、[Site Analysis](PHASE2-SOURCES-SITE-ANALYSIS.md)、[Snapshots](PHASE2-SOURCES-SNAPSHOTS.md)、[Research A](PHASE2-SOURCES-RESEARCH-A.md)、[Research B](PHASE2-SOURCES-RESEARCH-B.md)。

**48/48 代表來源保全與分類已完成，不代表語義條款驗收完成**。原始檔案未動，不刪研究資料，也不把案例推論當正式規格；Phase 2 IN PROGRESS、Phase 3/4 BLOCKED。

## 第二階段續作｜跨文件高風險原子條款台帳

[PHASE2-ATOMIC-CROSSFILE-LEDGER.md](PHASE2-ATOMIC-CROSSFILE-LEDGER.md) 先建立 **10 組**可追溯的跨文件風險主題 ID（發布授權、Preview/CI、隱私/憑證、真實內容、索引、RWD QA）。每組列凍結 Blob SHA、行號與例外事項，原文仍保留原位。

**10 組是主題分類，不是十條已獲核准的完整原子規範，更不是全量覆蓋率。** 同一主題多來源不得未經人工語義確認便刪去任何一處安全限制。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜P0 主題拆成 31 項候選子義務

[PHASE2-ATOMIC-P0-SUBCLAUSES.md](PHASE2-ATOMIC-P0-SUBCLAUSES.md) 將先前 10 組跨文件主題拆為 **31 項**較細的義務候選，每項都有 frozen main 的可點擊來源行，並另列 Blob SHA；範圍包括發布授權、Preview、獨立學員 CI、隱私憑證、內容真實性、搜尋索引與驗收尺寸。

此 31 項尚未人工確認來源與子義務完全等價，未建構全量 source→atomic／atomic→source 逆向覆蓋，也尚未納入其他版本差異。**不能視為 31 項通過或 100% 覆蓋。** Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜P0 雙向來源驗證發現六項缺口

[PHASE2-ATOMIC-BIDIRECTIONAL-AUDIT.md](PHASE2-ATOMIC-BIDIRECTIONAL-AUDIT.md) 已為 31 項候選建立 26 組「被引用原文行 → 候選 ID」逆向索引，並查出 **6 項**定位錯誤、證據不精確或範圍混淆風險。尤其 `astro-pr-preview/SKILL.md` L64 是章節標題、L55 是人工 QA 限制，不能用來證明歷史 Preview 外洩或 Private Repo 的可見性。原候選表仍未核准，將錯誤登記而非偷偷當 PASS。

這是**已引用行的逆向索引**，不是所有來源行的規範性分母；Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## 第二階段續作｜P0 雙向索引 v2

[PHASE2-ATOMIC-BIDIRECTIONAL-V2.md](PHASE2-ATOMIC-BIDIRECTIONAL-V2.md) 已針對補正後 31 項候選重新建立 source→候選反向索引：**31/31 條有至少一個來源連結，涉及 30 個唯一來源行定位**。這僅是 URL/定位完整性，不是 31/31 語義驗收。逐字查核另找出至少 **10 個**尚未獨立建成候選的義務與例外（含刪舊 Preview 授權、第三方快取、QA 證據、索引重建與學員 Repo 目標證據）。舊的 26 定位索引仍是歷史快照，不可當最新版。

需繼續逐項標記 DIRECT/PARTIAL/UNSUPPORTED、建立原子條款總分母與 PR61/69 版本差異。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## 第二階段續作｜P0 十項漏列規範已加入候選台帳

[PHASE2-ATOMIC-P0-SUBCLAUSES.md](PHASE2-ATOMIC-P0-SUBCLAUSES.md) 現為 **41 個唯一候選 ID**（先前 31 + 補列 10）。新增每條含凍結來源 SHA/行號；逐條標記 `DIRECT` 或 `DIRECT_COMPOSITE`，後者仍需拆出所有附帶條件。來源不變、候選尚未經人工語義核准。

**注意**：本文件若保留 31 項、30 處定位或 10 項 `GAP_NOT_MAPPED` 數字，均屬此次修補之前的稽核快照，**不得當作最新狀態**。重新產生完整 41 項的雙向語義映射尚待執行，不能宣稱條款零遺失已通過。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜41 項候選來源雙向索引 v3

[PHASE2-ATOMIC-BIDIRECTIONAL-V3.md](PHASE2-ATOMIC-BIDIRECTIONAL-V3.md) 已重新生成 41 項候選 → 31 個唯一原文行定位及其反向表；其中 13 項列為 PARTIAL（含適用範圍或複合義務疑義），其餘屬 DIRECT_CANDIDATE（僅來源存在且待人工逐筆判定），**沒有條款獲正式語義 PASS**。仍缺每一個 ID × 來源行支持程度、複合義務完全拆分與全量規範母數。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。
