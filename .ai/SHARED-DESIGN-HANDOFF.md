# Task 4｜跨 Skill 設計決策交接契約

本文件是六套 Skill 在學生 ZIP 中可獨立閱讀的共用判斷契約，不建立新 Skill、不修改版型。老師 Repo 的進一步研究來源：`docs/design-research/P0-AI-DESIGN-JUDGMENT-2026-10-14.md`；該研究原文不包含於學生 ZIP，學員操作不依賴它。

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

## 不依賴研究原文的共同原則
- **Structure before decoration**：先受眾、訪客任務、內容和網站結構，再處理字體、配色與動效。
- **Content shapes composition**：用真實文章長短、實際服務數量和無圖情境決定版面；不要為了卡片裁切真實標題。
- **Layout ≠ Theme**：不同 Layout 必須在資訊順序、Hero／欄位／內頁或手機重排至少幾個面向有真正差別；換色不是新 Layout。
- **Evidence hierarchy**：分清學生確認的事實、直接觀察、推論、AI 提案和缺資料；缺少資格、價格、見證、照片、聯絡端點時不得編造或顯示假成功。
- **Respect rejection**：已否定的版面模式保留否定理由，下游不得換皮引入；若有可用性危險要解釋並重新確認。
- **Responsive/accessibility**：手機閱讀順序、鍵盤、可讀性、reduced-motion 要事先規劃；沒有實際檢查就標記 NOT TESTED。
- **Stop condition**：有足夠決策資訊後應轉入實作與預覽，不要無限提出新方案；技術測試通過不等於主觀視覺已驗收。
