# PR #67｜Phase 2 收斂重啟與交接計畫

> 2026-10-23。執行基線：PR #67 `feat/student-planner-draft-recovery`；Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。**這是執行方式重整，不是重做研究，也不是宣告 Phase 2 PASS。**

## 0. 單一 Goal／連續執行約定（2026-10-23）

**Goal：Phase 2 Zero-Loss Canonicalization PASS。** A＋B＋C＋D 不是需要逐次下令的獨立里程碑；每次可用的執行工作階段應持續處理到真正 Gate PASS、無法推進的實際阻擋，或工作階段結束。後者須如實交接，不得宣稱背景持續執行。

- **唯一完成判準：** Frozen 有效義務逐項原子化並完成來源→Canonical 與 Canonical→來源雙向核對；跨來源同義與範圍差異已裁決；安全、授權、例外、平台條件無遺漏；所有有效條款都有穩定 Canonical ID；孤兒、破損、重複計數、未解衝突為零；可重跑 Gate 為 PASS。
- **分母不可偷換：** Frozen 192 檔是來源集合；1,390 個 Legacy ID 是工作紀錄；1,793 行是啟發式規範候選；三者都不代表唯一有效義務母數。須完成逐條分類，以經裁決的有效原子義務計數，保留非規範與歷史證據的排除理由。
- **執行循環：** 取原文 → 拆到最小可驗證義務 → 比對既有 Legacy 與 Canonical → 寫回同一 Ledger（KEEP／MERGE／PARTIAL_SPLIT／DISTINCT／NON_NORMATIVE／CONFLICT）→ 雙向驗證 → 下一項。不因小批次完成而等待使用者再次下令，也不增加平行 Batch 或 Crosswalk。
- **真正停止條件：** 無法依 Frozen 與 #61 Delta 證據自行裁決的產品政策衝突、必要授權不足、執行環境限制、可能破壞資料的操作。普通新發現、待審增加或驗證失敗都不是停止理由。
- **進度證據：** 每次列 Head SHA、已裁決有效原子義務／經查核有效原子義務、未裁決與衝突、未覆蓋來源、破損引用、父子重複及驗證器執行結果；不得把來源審查佇列登錄或規則分類當成語義 PASS。
- **執行邊界不變：** PR #67 Draft；不 Merge、不部署、不改 #61 與 #58，不改 Frozen 原文或第三／四階段。Phase 2 Gate 真正 PASS 前第三／四階段維持 BLOCKED。

## 1. 為何重整

`docs/student-journey/` 現有 66 份文件，其中 **59 份以 `PHASE2-` 開頭**（以重整前 #67 Head `01f36996c73b9d51c03e11e30f3bfd53bb79a2f7` 的 Git tree 為準）。原先不斷新增 Batch、Crosswalk、Audit 文檔，雖留下來源線索，卻沒有單一條款台帳，導致有更多平行工作成果需要再整合。自此停止以新編號 Crosswalk / Batch 報告作為預設推進方式。

## 2. SSOT：三個正式角色

1. **Frozen Source**：保留 [SOURCE-BASELINE-2026-10-22.md](SOURCE-BASELINE-2026-10-22.md) 及其中 192 檔來源與 Frozen SHA；不可改寫歷史。
2. **Canonical Ledger**：建立 `docs/student-journey/canonical-ledger.json`，作為唯一**裁決中的規範台帳**。需包含 `canonicalId`（正式裁決後才能賦值）、`requirement`、`kind`（policy/procedure/acceptance/evidence/architecture/example）、`sourceRefs`（來源檔案、行錨點、Frozen SHA、舊工作 ID）、`aliases`、`applicability`、`conditions`、`exceptions`、`acceptanceCriteria`、`decision`（KEEP/MERGE/PARTIAL_SPLIT/DISTINCT/NON_NORMATIVE/CONFLICT）、`reviewStatus`、`evidence`。允許 `pending` 候選，但不得用臆造 Canonical ID 填空。
3. **Gate Report**：`docs/student-journey/PHASE2-GATE-REPORT.md`，由台帳及來源驗證程式重新產生；報告不是另一份規範 SSOT。

## 3. 既有文件具體處置

| 類別 | 目前處置 | 最終退場條件 |
|---|---|---|
| Frozen Baseline 與 192 來源 | **保持原位、唯讀** | 不刪 |
| P0、Skills A/B、Batch 1–9 工作登錄 | 匯入 Legacy ID／來源／文字／狀態，保留原位為證據 | Ledger 引用全覆蓋、反查 PASS 後才提封存方案 |
| Batch1–8 187 候選、50 父／169 子；Batch9-C 21 父／72 子 | 匯入父子關係；明確區分義務與驗收維度，不父子雙算 | 完成跨來源語義裁決 |
| Crosswalk 01–05、Dedupe 07、Audits 06／08／09／10 等 | 將已核實與僅暫定裁決分開匯入；停止在原表增加新狀態 | Ledger 承接判定與來源後，僅保留為歷史證據 |
| #61 Upstream Delta | **獨立版本層**，記錄生效條件，不偷偷回寫 Frozen 母數 | 三路徑與 Site Brief 決策已精確反映 |
| ZERO-LOSS-REFACTOR-GATES.md 舊進度累積 | 凍結為歷史日誌；之後以可重跑 Gate Report 為主 | 不刪歷史，避免另一份手動同步 SSOT |

現階段**不搬移、不刪除**以上文件。待可重跑的零遺失 Gate 通過，另列明擬封存文件／驗證證據與回復方式，使用者同意後才於允許的文件整理階段處理。

## 4. 執行步驟（有界工作包）

### A｜建立機械式匯入與主表

- 從 Git tree 列出 59 個 Phase2 文件和原始來源，建立機器可讀的來源清單。
- 以舊工作 ID 作為 `legacyId`，匯入 P0、Skills A/B、Batch9、Child Split、Crosswalk 和 #61 Delta。
- 每筆保留 Frozen 路徑、行錨點、原句、父子關係與出處；發現衝突標 Pending，而非覆寫。
- **驗收：** 每個被納入的舊工作 ID 都能找到主表紀錄或有原因的非規範性處置；匯入失敗明列數量。

### B｜全面語義裁決

- 同義做 `MERGE` + 保留所有 Aliases；部分重疊做 `PARTIAL_SPLIT`，獨立做 `DISTINCT`，適用條件做 scope，不適合成規範做 `NON_NORMATIVE`。
- 查核每條的原文、程序、例外、授權、安全及三路徑適用性；禁止以字面近似直接合併。
- **驗收：** 未裁決條款數可精確計算並收斂至 0；真正同義的來源保留雙向映射。

### C｜雙向來源驗證

- 原文中的每項有效義務 → Ledger 條款；Ledger 每條規範 → 全部來源與適用條件。
- ID 無孤兒、來源路徑與 SHA 有效、父子不重複計數、例外與敏感安全限制零漏接。
- **驗收：** 建立可重跑驗證程式；破損引用、未覆蓋來源、未裁決衝突和父子重複計數全部為 0。

### D｜結案報告與舊文件退場清單

- Gate Report 輸出可靠唯一 Canonical 母數、Alias 對照、來源雙向通過率、尚未解決衝突。
- 只有 Gate 真正 PASS 才提出舊中繼文件的退場／封存建議；不得自行 Merge。
- **驗收：** 任何人可由 Frozen 來源 + Ledger + 驗證程式重現結果。

## 5. 重要產品邊界／不可觸碰

- 學員三條路徑：A 現有網站復刻、B Starter Planner、C AI 直接訪談建站。**A/C 不強制 Site Brief JSON**；初版 Site Brief 路徑／hash／匯入日不得列為永久保存硬性要求。
- Frozen Source 為歷史；#61 是後凍結 Delta，不可混淆。
- #67 保持 Draft、不 Merge、不部署；#61 Draft 與 Issue #58 Open 不動。
- 第三、四階段仍 **BLOCKED**；不得修改原始 Skills、模板、生成器或正式環境。
- Build Green 不等於 UI／Live Preview／學生網站實際驗收成功。

## 6. 新對話接手指令（可直接使用）

> 請接手 `pikaOne1138/astro-personal-site-starter` PR #67 的 Phase 2 收斂。**第一步請讀 PR 最新 Head、本文件 `docs/student-journey/PHASE2-RESET-EXECUTION-PLAN.md`、Frozen Baseline、#61 Upstream Delta 與既有 Gate。**不要重做研究、不要新增零碎 Crosswalk 報告。先在 #67 原 branch 建立單一 `canonical-ledger.json` 與可重跑驗證程式，把已有 P0、Skills A/B、Batch1–9、Child Split、Crosswalk、#61 Delta 導入並逐項判定，產生同源 Gate Report。現有 59 份 Phase2 文件是待消化的證據，先不刪除。每次回報固定提供：已匯入／總量、已裁決／總量、未覆蓋來源、破損引用、未解衝突、可重跑 Gate 結果。保留 #67 Draft、#61 與 #58，不 Merge、不部署，Phase3/4 BLOCKED。目標是完成 Phase2，而非擴充稽核文件數量。
