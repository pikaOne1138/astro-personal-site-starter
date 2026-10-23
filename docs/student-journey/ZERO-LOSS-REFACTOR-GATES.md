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

## 第二階段續作｜13 項 PARTIAL 的複合條款拆解

[PHASE2-ATOMIC-PARTIAL-SPLIT.md](PHASE2-ATOMIC-PARTIAL-SPLIT.md) 已針對 P0 v3 的 **13 項 PARTIAL 父主題**，建立 **31 個子候選**，分別保留凍結來源行及適用範圍。**父與子不可相加成 72 條**，也不能認定原子語義 PASS；後續仍需對每個 ID × 來源行做逐筆 DIRECT/PARTIAL/UNSUPPORTED 判讀。原始來源一律保留。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜31 子候選來源初核

[PHASE2-PARTIAL-SOURCE-ADJUDICATION.md](PHASE2-PARTIAL-SOURCE-ADJUDICATION.md) 對 13 個 PARTIAL 父主題拆出的 31 個子候選逐一讀取凍結來源行：27 項 `DIRECT_CANDIDATE`、4 項 `PARTIAL`（獨立 Repo 證據、PR59 複合證據欄位、正式索引範圍、站點功能 QA 適用性）。這僅是來源文本與候選摘要的初核，非正式人工語義 PASS。父子不可加總，仍須去重並建立全量來源分母。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜13 父／31 子的非加總計數與四項範圍解釋

[PHASE2-PARENT-CHILD-DEDUPE.md](PHASE2-PARENT-CHILD-DEDUPE.md) 對 13 個 PARTIAL 父主題與 31 個拆解子候選逐組記錄重疊、不同平台與證據限制；四項待確認範圍已寫明依據（獨立 Repo EXT 尚未測試、PR59 證據必填欄、SITE_INDEXABLE 正式環境限制、功能型 QA 的適用條件）。仍有子項是複合義務，**未取得真正去重後的原子總母數，父 41 + 子 31 不可加總**。原始文件未動。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## 第二階段續作｜8 組複合子候選的欄位拆解

[PHASE2-ATOMIC-LEAF-DECOMPOSITION.md](PHASE2-ATOMIC-LEAF-DECOMPOSITION.md) 對 8 組仍複合的子候選，將必填證據欄位、SEO 驗證項、Preview 互動與路徑檢查細分為 **35 個可核對欄位／檢查點**。列出同義條款候選，保留原始 SHA／行號。**35 不是新增的 35 條獨立政策，不可與 41 個父候選、31 個子候選加總**。尚待逐條語義判定、覆蓋分母與人為驗收。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## 第二階段續作｜P0 單一計數工作視圖

[PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md](PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md) 將既有 41 父候選、31 子候選、35 檢查點依「末端優先」規則整成 **86 筆暫定紀錄**（28 未拆父＋23 未再拆子＋35 檢查點），每筆保留來源與層級型態，另登記已辨識的跨條款同義關係。**86 並非唯一語義條款總數**；證據欄位不是獨立政策，語義重複仍須確認，全量原文規範也尚未盤點完成。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜86 筆末端紀錄類型分類

[PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md](PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md) 已在原有表格中直接對 **86 筆**作暫定語義分類：**規範義務 36、驗收條件 36、證據欄位 14**。全部仍標 `CLASSIFIED_PENDING_SEMANTIC_REVIEW`，避免把類型推斷當成通過驗收。尚須檢查混合語義及重複 ID；**86 筆不是全量、也不是去重的獨立條款母數**。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜86 筆跨來源語義初核

[PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md](PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md) 已直接補上 **11 組**同義、部分重疊或授權範圍差異的對照：其中 **4 組 SAME_CANDIDATE** 只是同義候選，尚未人工裁決、尚未合併 ID。並校正 3 筆語義類型，目前暫計：**規範義務 37、驗收條件 37、證據欄位 12**（共 86 筆）。原 36/36/14 已屬舊快照；不能按四組候選重複直接扣除分母。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜四組同源同義條款建立 canonical alias

[PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md](PHASE2-P0-UNIQUE-ID-WORKING-REGISTER.md) 已對四組 SAME_CANDIDATE 逐字比對凍結來源（均為同一原文行經不同拆分路徑產生），建立 4 個 canonical ID 並保留原有 8 個工作 ID 作 alias。適用範圍和例外已在表中列明，並非跨版本語義驗收。86 筆末端工作記錄的 4 組重複可暫作 82 個工作代表，**82 不是全部來源的唯一規範分母，亦非正式 PASS**；原文未刪改。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## 第二階段續作｜三份核心 Skills 全行來源處置

[PHASE2-CORE-SKILLS-FULL-LINE-A.md](PHASE2-CORE-SKILLS-FULL-LINE-A.md) 對固定 baseline 的 `astro-site-entry`（25 行）、`astro-site-from-zero`（26 行）、`astro-content-readiness`（34 行）逐行分類，共 85 行、37 行帶規範／流程內容，拆出 74 個義務或操作步驟候選，含原始 Blob SHA 和 L# URL。這是逐行審閱，不是僅擷取 regex 關鍵字；**74 不等於 74 項已去重獨立規範，且仍待連結 P0 與全量語義核對**。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。

## 第二階段續作｜三份核心 Skill 與 P0 工作 ID 對照

[PHASE2-CORE-SKILLS-FULL-LINE-A.md](PHASE2-CORE-SKILLS-FULL-LINE-A.md) 已直接在 37 個規範／流程來源行補映射：**10 行**與現有 P0 工作 ID 有部分交疊（`PARTIAL_OVERLAP_P0`），**27 行**仍為新範圍候選（`NEW_SCOPE_CANDIDATE`）。這是「來源行 → 已有 P0 工作 ID」初步連結，不等於原行所有子義務已完整覆蓋；74 個細項候選尚未逐條語義驗收，不能直接加到 P0 82 個工作代表。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## 第二階段續作｜27 未映射來源行細分完成

[PHASE2-CORE-SKILLS-FULL-LINE-A.md](PHASE2-CORE-SKILLS-FULL-LINE-A.md) 已於原檔補登 **27 行來源 → 45 個子候選工作 ID**（規範 18、流程 21、架構邊界 4、條件式程序 1、驗收條件 1），每個都連到凍結原文並附 8 組同義／部分交疊的交叉比對候選。此分類為工作判讀，不是經人為驗收的義務，也尚未連入真正唯一規範總分母；不可與 P0 的 82 個工作代表加總。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED。

## Phase 2｜三份核心 Skill 逐行來源盤點 B

已新增 [PHASE2-CORE-SKILLS-FULL-LINE-B.md](PHASE2-CORE-SKILLS-FULL-LINE-B.md)，核對凍結版本內容發布、組站、部署三份 Skill，共 207 行，103 行含規範或操作程序。全數附原始檔案行號；但複合義務尚未逐一建立唯一 ID 或完成跨文件語義驗收。Phase 2 未完成；Phase 3、4 保持阻擋。


## 第二階段｜核心 Skills B 原子候選首批 Gate

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH1.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH1.md) 已針對 frozen main 之內容發布、組站、部署 Skills 的 **5 個高風險複合來源行**建立 **25 個來源錨定子候選 ID**。103 個來源規範／程序行目前仍有 98 行未完成原子化；這 25 個為工作候選，尚未與 P0 canonical/alias 及 A 批候選完成同義去重，**不可加總為最終條款數**。原始 Skills 未修改；Phase 2 IN PROGRESS、Phase 3/4 BLOCKED。


## Phase 2｜Core Skills B Atomic Batch 2

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH2.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH2.md)：新增 5 行 Frozen Skill 的 15 個來源錨定子候選；連同 Batch1 共 10/103 個含規範或程序來源行完成初步拆解，尚餘 93 行。工作 ID 尚待 P0 canonical、前批 A 及其他來源語義去重；不可將 25+15 當最終規範母數。原文不變，Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。


## Phase 2｜Core Skills B Atomic Batch 3

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH3.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH3.md) 記錄 frozen source 10 個新來源行與 29 個工作候選，連同前兩批暫計 20/103 行、69 個候選；尚有 83 行未初步原子化。候選尚未跨 P0 canonical/alias 與 A 批完成語義去重，也不是最終獨立規範數。Phase 2 IN PROGRESS、Phase 3/4 BLOCKED。原始 Skills 不變，不 Merge。


## Phase 2｜Core Skills B 跨批次語義去重初判

新增 [PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md](PHASE2-CORE-SKILLS-B-CROSS-BATCH-DEDUPE.md)：核實 Batch1–3 合計 20 個不重複來源行、69 個暫定工作候選，開始與 P0 canonical/alias 逐組比對；明確區分 SAME_CANDIDATE、PARTIAL_OVERLAP、DISTINCT 與不存在 ID 的反例。這是語義初判、非已裁決去重；不能把工作候選數直接加總或扣除成獨立規範母數。餘 83/103 行待初步拆分。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。


## 第二階段｜Core Skills B Batch 4 與跨平台複合候選校正

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH4.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH4.md)：新增 11 個不重複 Frozen Source 行與 26 個暫定子候選，累計 **31/103 行、95 個工作候選**，還有 72 行待拆分。Batch1 的 `B1-DEP31-04` 現明確保留父 ID 並加 `-CF`、`-GH` 條件子欄位（不得重複加總），避免把 Cloudflare Preview 索引與 GitHub Pages Actions Variables 混成同一設定。95 不是唯一規範母數；P0/A 批語義去重和來源反向核查未完成。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED；原始 Skills 未修改、不 Merge、不部署。


## Phase 2｜Batch 5 與來源行計數校正

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH5.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH5.md) 補充 8 個 Frozen 來源行與 24 個暫定子候選；反向查核前四批發現 `DEP L43` 在 Batch2 及 Batch4 重複、且 Batch3 的實際來源行為 11 行，故先前 **31/103** 快照不準確。現依來源行去重集合：**40/103 行**已有工作子 ID，**63 行待拆**；共 119 筆工作候選列項，仍混合程序、限制、驗收與語義重疊，**不是唯一規範總數，也不是 Phase 2 PASS**。原始 Skill 未動，Phase 3/4 BLOCKED。


## Phase 2｜Batch 6 實際來源行集合校正

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH6.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH6.md) 新增 8 個 Frozen 規範／程序來源行與 25 個暫定子 ID。比對 Batch1–5 的實際工作 ID，先前累計 40 行應修正為 **41 行**；本批後為 **49/103 行**、**54 行尚待拆解**。列項候選暫計 144（119+25），但仍須全量 ID 及跨來源語義去重，並非獨立規範數。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED；原始 Skills 未改，不合併。


## Phase 2｜Batch 7：Publishing Lifecycle 與反向行數核對

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH7.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH7.md) 依 frozen main 對 Publishing L70、L72、L76–L81 建立 **8 行／22 個來源錨定工作候選**，包括文章發布、修改、撤回、歷史風險、交接及一般頁面職責。由 Batch1–6 ID 集合重算原已覆蓋 **50 行**，修正上一輪 49 行快照；本批後為 **58/103 行**，**45 行尚未初步原子化**。候選涉及程序、規範、證據與重疊，非 22 條新 canonical 規範；去重與全量雙向語義驗收未完成。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skill 不變，不 Merge、不部署。


## Phase 2｜Core Skills B Batch 8：組站架構與內頁映射

[PHASE2-CORE-SKILLS-B-ATOMIC-BATCH8.md](PHASE2-CORE-SKILLS-B-ATOMIC-BATCH8.md) 在 Frozen main 上新增 Site Assembly 的 **12 個來源行、18 個候選子項**；Batch1–7 原有 58/103 行，現 **70/103 行**至少有工作候選，尚有 **33 行**需初步拆解。L37–L43 大多是元件位置與結構事實，不能直接計為獨立規範；L31 四尺寸截圖也不等於人工完成視覺驗收。跨來源 Canonical/alias 和全文雙向語義覆蓋未完成，Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skill 不修改，不 Merge、不部署。


## Phase 2｜Core Skills B 103/103 來源行映射完成（非原子語義 PASS）

[PHASE2-CORE-SKILLS-B-REMAINING-LINE-MAP.md](PHASE2-CORE-SKILLS-B-REMAINING-LINE-MAP.md) 已依 frozen main 補齊 Assembly 20 行與 Deploy 13 行。對 `PHASE2-CORE-SKILLS-FULL-LINE-B.md` 的 103 個 `SOURCE_REQUIREMENT_OR_PROCEDURE` 來源行以路徑+行號集合反向檢驗：**103/103 行至少有一個工作行 ID，missing=0、extra=0**。惟 Batch9 為「語義摘要與來源錨定」，仍包含多個複合義務、驗收欄位、架構事實及示例，**不能宣稱 103 行全部原子化、完整來源文件全量覆蓋或已建立唯一 canonical 規範母數**。下一步需再拆 Batch9 複合來源、與 P0/A 批進行 canonical/alias 去重及雙向語義稽核。Phase 2 IN PROGRESS，Phase 3/4 BLOCKED；原始 Skills 不變、不 Merge、不部署。


## Phase 2｜Batch9 複合來源語義拆解 A

[PHASE2-BATCH9-ATOMIC-A.md](PHASE2-BATCH9-ATOMIC-A.md) 對已映射的 Assembly L57/L70/L73 與 Deploy L25 四個來源行進一步拆出 **19 個分類候選**，保留父來源與具體作用條件，並建立與 P0/前批的 SAME_CANDIDATE、PARTIAL_OVERLAP 關係。Batch9 仍有 29 行尚未同程度細拆；**103/103 是來源行映射，不是全量原子化、唯一 Canonical 規範分母或 Phase 2 PASS**。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skills 未改，不 Merge、不部署。


## Phase 2｜Batch9 Atomic B：授權與部署複合條款

[PHASE2-BATCH9-ATOMIC-B.md](PHASE2-BATCH9-ATOMIC-B.md) 從 Batch9 另取 8 個凍結來源行拆成 31 個分類子候選，涉及 Layout 保真、真實 URL、四尺寸 QA、GitHub Pages Preview、Cloudflare 自訂域名、憑證及 Merge/DNS/覆蓋授權；加上 Atomic A 既有 4 行，Batch9 **12/33 行已進一步細拆**，21 行仍待。來源映射總數仍 103/103，但語義去重、規範與證據欄位分型和跨文件雙向驗收未完成，不得宣布 Phase 2 PASS。Phase 3/4 BLOCKED；原始 Skills 不修改、不合併、不部署。


## Phase 2｜Batch9 Atomic C：第二輪子義務列示 33/33

[PHASE2-BATCH9-ATOMIC-C.md](PHASE2-BATCH9-ATOMIC-C.md) 補列 Batch9 最後 **21 個來源行**之逐項子義務與分型，連同 Atomic A（4 行）、B（8 行），Batch9 **33/33 行已第二輪拆解**。但 C 批若干來源行仍含多個編號子項於同一表列，且 A/B/C 尚未完整合併 P0 與 Skills A 的 canonical/alias；Batch1–8 也有複合要求。**103/103 僅是來源行追溯覆蓋，33/33 僅是 Batch9 第二輪拆解，不代表全量最小原子化及 Phase 2 PASS**。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED；原始 Skills 未改，不 Merge、不部署。


## Phase 2｜Canonical/Alias Crosswalk 01 初步關係稽核

新增 [PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md](PHASE2-CANONICAL-ALIAS-CROSSWALK-01.md)：將 Batch9 C 的 5 個複合父來源段落拆成 **16 個可追溯的子欄位 ID**，以來源行為錨點交叉檢查 P0、Batch1–9 的重疊。已區分 `PARTIAL_OVERLAP`、`DISTINCT`，沒有把一般 CI Gate 與特指 `noindex` 規則誤判為等價，也沒有宣告任何跨批次 Canonical 合併。**103/103 是核心 Skills B 來源行映射，不等於原子義務全覆蓋、唯一規範母數或 Stage 2 PASS**；其他 A 批與來源全文待審。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED；不修改原始 Skills、不 Merge、不部署。


## Phase 2｜Canonical/Alias Crosswalk 02：授權、Preview、索引

新增 [PHASE2-CANONICAL-ALIAS-CROSSWALK-02.md](PHASE2-CANONICAL-ALIAS-CROSSWALK-02.md)，核對 P0 的四組既有文件性 Alias 與 Batch1/2/5、Batch9A/B/C 的 **11 個概念群組**。保留 Merge/Production/DNS/刪除/覆寫的操作授權差別；Build/Artifact/Live Preview 的證據差別；Cloudflare 與 GitHub Pages 的 SITE_INDEXABLE 平台差別；以及 noindex/draft 與資料保密的差別。本輪 **0 個新核准 Canonical ID**，`CAND-*` 均為待定交叉稽核群組而非正式 ID。全量最小原子化、Skills A/B/P0 雙向追溯、全部來源文件審查仍未完成。Phase 2 IN PROGRESS；Phase 3/4 BLOCKED，不改原始 Skills、不 Merge、不部署。


## Upstream Delta｜PR #61（2026-10-23）

新增 [UPSTREAM-DELTA-PR61.md](UPSTREAM-DELTA-PR61.md)，以 PR #61 HEAD `da65053ccc237474e1fdf8a28fcbae20fe7029c2` 的 AGENT-HANDOFF Blob `457835c2e4ae02acf889df1953d0a635511009ef` 作為 Frozen main `2d20e3ab` 以後獨立來源，建立 8 組可追溯處置（KEEP／ALIAS／PARTIAL_SPLIT、附 PARTIAL_CONFLICT）。已確認三條路徑 **不強制 Site Brief JSON**：Starter B 可以匯出、既有網站復刻 A 不預設、直接 AI 建站 C 可視需要另建。使用者明確取消永久保存初版 Brief 路徑、Hash、匯入日期；舊初版不得覆蓋學員網站現況。PROJECT-TEMPLATE L40 與 student-project-context L26 可能誘發非必要的追補義務，先保留待裁決，**本批不改模板／生成器**。#61 及 #58 都保持 Open，#67 保持 Draft，Phase 2 尚未 PASS，Phase 3/4 BLOCKED，不 Merge、不部署。


## PR #61 Upstream Crosswalk 03｜來源校正與條款反查

已將 [UPSTREAM-DELTA-PR61.md](UPSTREAM-DELTA-PR61.md) 的來源錨點校正至 PR61 真正行號：Site Brief 撤銷為 L28（而非先前誤植 L25）；新增 [PHASE2-PR61-CANONICAL-CROSSWALK-03.md](PHASE2-PR61-CANONICAL-CROSSWALK-03.md)，以 PR61 L19/L21–23/L28–33 建立可反查的 16 個子義務及 P0／Batch／學生模板關係。明確記錄三路徑不強制 Site Brief、初版 path/hash/import date 永久保留要求已撤銷、375px RWD 與人工審查證據的不可刪條件。**此為文件候選關係，不是跨全 Repo 的 Canonical PASS**；來源 PR61 仍 Open/Draft，Issue58 保留 Open。Stage2 IN PROGRESS，Stage3/4 BLOCKED；不改模板、不刪源、不 Merge、不部署。


## Phase 2｜Crosswalk 04：內容真實性／Demo／Draft 的來源裁決

新增 [PHASE2-CANONICAL-ALIAS-CROSSWALK-04.md](PHASE2-CANONICAL-ALIAS-CROSSWALK-04.md)，回讀 Frozen main 之 site-entry L18、publishing L12/L28/L37/L58、assembly L21/L22/L23/L29，共 **9 個確實核對來源行／7 個語義群**。區分 Demo 可在 Preview 保留、正式發布前應揭露並讓學員選 keep/edit/hide、不得偽造資格或假功能、特定版本的 Merge/Production 授權，以及文章 draft release Gate 與歷史 Git/Preview 洩漏的保密風險。所有來源追溯和語義重疊均只算本批局部證據，不宣稱完整 Canonical 去重或 Stage 2 PASS。#61 Delta 維持獨立，Frozen baseline 不改；Stage 3/4 BLOCKED，不 Merge、不部署。


## Phase 2｜Crosswalk 05：Layout／Blocks／Motion／Visual QA

新增 [PHASE2-CANONICAL-ALIAS-CROSSWALK-05.md](PHASE2-CANONICAL-ALIAS-CROSSWALK-05.md)：直接核對 Frozen Assembly 九行（45/48/49/51/52/54/57/61/64）、Layout 三行（9/47/79）、Motion 四行（35/38/66/119），合計 16 個不重複來源行，整理 10 個待定義語義群。把結構忠實度、Registry 功能 Block、Token、動效 fallback、四尺寸視覺 QA、互動可用性與獨立學員網站測試分開。**Layout/Motion 的新原子 ID 尚未完成；本輪僅跨來源候選映射，不是全量去重 PASS**。Stage 2 持續；3/4 BLOCKED。#61 與 #58 不變；原始 Skills、Template、生成器不改。


## 本輪後續補正｜Batch9-C 的 72 個子條件 ID

[PHASE2-BATCH9-C-CHILD-ID-REGISTER.md](PHASE2-BATCH9-C-CHILD-ID-REGISTER.md) 已將原 Batch9-C 的 **21 父行／72 個原有編號子條件** 各配一個獨立可反查的工作 ID（如 `B9C-DEP40-01`、`B9C-ASM77-03`），修復本輪發現的 `CHILD_ID_NOT_MINTED` 類型缺口。原父列與 Frozen source 均保留；原文子條件仍需要進一步分拆複合語義，**72 不是唯一 Canonical 數，Phase 2 仍 IN PROGRESS**。已記錄的其他跨表關係還須全量存在性及正反向驗證，Stage 3/4 BLOCKED。


## Phase 2｜Batch 1–8 原子化補正（2026-10-23）

新增 [PHASE2-BATCH1-8-CHILD-SPLIT-01.md](PHASE2-BATCH1-8-CHILD-SPLIT-01.md)，依 Frozen Publishing L28、L36、L37、L47、L65、L78 與 Assembly L31 實際原文，拆解 8 個已存在的父工作 ID 為 27 個有來源錨點的子檢查。父工作 ID 保留，不得父子重複加總；這是**第一批已確認的局部拆解**，不能宣稱 Batch1–8 全部拆完或全 Repo Canonical 去重完成。Stage 2 IN PROGRESS，Stage 3/4 BLOCKED；#61 Delta 與 #58 不變。


## Phase 2｜全量收斂第一輪：Batch1–8 與雙向追溯（2026-10-23）

新增 [Batch1–8 全部 187 候選盤點](PHASE2-BATCH1-8-CANDIDATE-INVENTORY.md)、[跨來源去重候選 07（17 群）](PHASE2-CROSS-SOURCE-DEDUPE-07.md)、[雙向追溯與 Gate 報告 08](PHASE2-BIDIRECTIONAL-VERIFICATION-08.md)。初篩 128 筆可能含複合語句，已拆解的 8 筆父候選另有 27 子項；其餘 120 筆優先做語義審查。以目前已讀登錄表首欄識別 444 種工作 ID 鍵值，Cross-source 07 所引用 55 個不同工作 ID 均能找到登錄定義（55/55），**但這不等於全量零遺失查核、最小原子化或最終唯一 Canonical 數已確立**。三個缺口仍有待驗證的部分，Phase 2 保持 IN PROGRESS、Phase3/4 BLOCKED，不重寫 Frozen Source、不 Merge、不部署。


## Phase 2｜Batch1–8 進一步原文查核（2026-10-23）

本輪直接核對 Frozen Deploy L17/L24/L31/L43、Assembly L12/L50、Publishing L20/L63 等來源，新增 [CHILD-SPLIT-02](PHASE2-BATCH1-8-CHILD-SPLIT-02.md)：**14 個複合父候選／55 個獨立可追溯驗收子項**。此前第一輪為 8 父／27 子，故累計本兩輪 **22 個父候選／82 個子項 ID**（不含 Batch9）。[187 候選 Inventory](PHASE2-BATCH1-8-CANDIDATE-INVENTORY.md) 已同步標記第二輪 14 筆。初始 128 筆標點初篩僅為人工審查優先度，現在其中 22 筆有拆解紀錄，另約 106 筆仍需語義核實。子項非 Canonical 數量，候選有狀態／驗收／例外，父子不可雙重計數。**Phase 2 IN PROGRESS，Phase 3/4 BLOCKED；不刪來源，不 Merge，不部署。**


## Phase 2｜Batch1–8 剩餘 106 候選深化（2026-10-23）

[逐列語義初裁](PHASE2-BATCH1-8-REMAINING-SEMANTIC-REVIEW.md) 已將前一輪剩餘 106 項分成 43 個單一條款含屬性、35 個條件性／架構事項、28 個真正待細拆的父候選；[CHILD-SPLIT-03](PHASE2-BATCH1-8-CHILD-SPLIT-03.md) 已把後者建立 **87 個子檢查 ID**，並更新 [187 項 Inventory](PHASE2-BATCH1-8-CANDIDATE-INVENTORY.md)。前三輪合計 8+14+28=**50 個父候選**有拆解紀錄，27+55+87=**169 個子檢查 ID**。這些數字描述追溯顆粒度，非唯一 Canonical 義務；43+35 分類也仍須全量來源與跨表反向驗證。Phase 2 IN PROGRESS、Stage3/4 BLOCKED，原始文件不改、不 Merge、不部署。


## Phase 2｜子工作 ID 正反向結構核對 09

新增 [PHASE2-CHILD-REVERSE-TRACE-AUDIT-09.md](PHASE2-CHILD-REVERSE-TRACE-AUDIT-09.md)：三輪 Batch1–8 Child Split 合計 **50 個不重複父工作 ID／169 個不重複子工作 ID**，全部父 ID 可在 187 筆 Inventory 找到；並回讀 Frozen Publishing L28/L56、Deploy L31、Assembly L31/L11 對照不得遺失的條件與例外。**本輪只確認子 ID 唯一、父 ID 存在及指定來源語義的局部核對；不能據此宣稱 187 筆全量語義等價、跨來源去重或唯一 Canonical 母數 PASS。** Phase2 IN PROGRESS，Stage3/4 BLOCKED。


## Phase 2｜跨來源引用實際修復 10

新增 [PHASE2-CROSSWALK-REFERENCE-REPAIR-10.md](PHASE2-CROSSWALK-REFERENCE-REPAIR-10.md)；發現 Crosswalk 04 將 Frozen Assembly L29 錯誤寫成不存在的 `B9-ASM-L29-1`，已依 Batch1–8 定義修正為 `B8-ASM-L29-02`，保留勘誤追溯。並確認 9 個 Batch9 Remaining Line Map ID 與 3 個 Batch9-C 新子 ID 的存在性。本次**限定引用核對，不是完整 192 檔、全 58 份 Phase2 文件或所有 Crosswalk ID 的雙向 Gate PASS**。Phase2 持續，Stage3/4 BLOCKED。
