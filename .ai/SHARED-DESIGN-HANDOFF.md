# Task 4｜跨 Skill 設計決策交接契約

本文件是六套 Skill 的輕量共用交接說明；共用設計判斷研究來源見 [P0-AI-DESIGN-JUDGMENT-2026-10-14.md](../docs/design-research/P0-AI-DESIGN-JUDGMENT-2026-10-14.md)。不建立新 Skill、不修改版型。

## 分工
- Design Consultation：釐清意圖、真實資料、設計方向、取捨、否定選項；整理 Design Brief。
- Layout Craft：整頁資訊架構、閱讀順序、首頁與內頁結構、手機重排。
- Editorial Layout Design：Hero、區段構圖、列表、留白與節奏。
- Section Pattern Craft：使用 Registry 內的可重用 Section Pattern，不憑空創造資料。
- UI Craft：元件、Tokens、一致性與操作可用性。
- Motion Craft：有目的的 subtle 動效、降級與無障礙。

## 每次階段交接最小資訊
1. 網站類型、受眾、訪客首要任務。
2. 已確認的 Product Truth 與資料來源；missing 保持 missing。
3. 學員已確認的 Layout / Section 順序 / 手機順序，未核對 ID 標 not-verified。
4. 被否決的結構與明確理由，不得下游又塞回來。
5. 設計假說、採用理由、代價及尚未決定項目。
6. 待測試項目與證據；Build PASS 不等於視覺 PASS。

## 驗收情境（只檢查規則與輸入輸出契約，不冒稱已跑真模型）
- A 同內容、同色字，不同 Layout：各 Skill 都保留首頁、內頁、手機閱讀動線差異，不將換皮當新設計。
- B 無照片／見證／證照：不產生空白破版、虛構成果、假 CTA 或尚未設定的可用服務。
- C 否定大圖 Hero：下游不得重新加入大圖 Hero，即使改顏色與動畫也不算修正。

## 學生包可攜性
以 `scripts/build-student-pack.mjs` 的 ZIP 清單確認共用規則及 .ai/ Skills 均可讀。純聊天工具無法讀取檔案時不能聲稱已使用 Skill。
