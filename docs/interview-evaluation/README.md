# 評測資料（老師專用，不進學員 ZIP）

這裡放的是評測 AI 訪談與設計顧問行為用的資料，**含預期答案**，所以不能隨學員資料包出貨。打包程式（`scripts/build-student-pack.mjs`）會排除它們並檢查沒有洩漏。

- `interview-scenarios.json`、`INTERVIEW-EVALUATION.md`：初學者需求訪談的情境集與人工評分標準。由 `scripts/evaluate-interview-results.mjs`、`scripts/test-interview-evaluation.mjs` 使用。
- `CROSS-MODEL-E2E-TEST-PACK.md`：跨模型端到端測試規格。這是測試規格，不是已執行真實模型測試的證明。
- `design-consultation/`：`astro-design-consultation` 的情境測試（含預期行為，是答案卷）與歷次對話品質評審紀錄。這些是人工桌面模擬的診斷，不是獨立模型的基準測試。

規則：評測用的答案不放進 `.ai/` 或 `docs/student-builder-pack/`，因為那些資料夾會出貨給學員。
