# Phase 2｜Skill 附屬規範來源 A：內容、設計諮詢、部署復原

以 `main@2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c` 為凍結事實來源，附屬於 [CLAUSE-COVERAGE-MATRIX.md](CLAUSE-COVERAGE-MATRIX.md)。此處保留來源檔案、Blob SHA、精確行號與完整原文候選行；**未將規範刪減、合併或改寫**。

本批 10 份引用文件、73 行關鍵字命中規範候選。這不是完整語意條款統計；未命中的內容仍可能是強制要求。

需留意：Design Brief 13 欄合約、訪談只問一題、測試題答案不得供受測模型使用、草稿發布隔離、SEO/Release Checklist 與預覽故障復原是不同用途，不可僅憑部分措辭相近合併。

## `.ai/SHARED-DESIGN-HANDOFF.md`

Blob `b4483fc6939a11987e63dfa74520f4b290fda997` · total lines 37 · selected candidate lines 9.

| Line | Exact source | Status |
|---|---|---|
| [L17](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L17) | 4. 被否決的結構與明確理由，不得下游又塞回來。 | NEEDS_REVIEW |
| [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L19) | 6. 待測試項目與證據；Build PASS 不等於視覺 PASS。 | NEEDS_REVIEW |
| [L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L24) | - C 否定大圖 Hero：下游不得重新加入大圖 Hero，即使改顏色與動畫也不算修正。 | NEEDS_REVIEW |
| [L27](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L27) | 以 `scripts/build-student-pack.mjs` 的 ZIP 清單確認共用規則及 .ai/ Skills 均可讀。純聊天工具無法讀取檔案時不能聲稱已使用 Skill。 | NEEDS_REVIEW |
| [L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L30) | - **Structure before decoration**：先受眾、訪客任務、內容和網站結構，再處理字體、配色與動效。 | NEEDS_REVIEW |
| [L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L32) | - **Layout ≠ Theme**：不同 Layout 必須在資訊順序、Hero／欄位／內頁或手機重排至少幾個面向有真正差別；換色不是新 Layout。 | NEEDS_REVIEW |
| [L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L33) | - **Evidence hierarchy**：分清學生確認的事實、直接觀察、推論、AI 提案和缺資料；缺少資格、價格、見證、照片、聯絡端點時不得編造或顯示假成功。 | NEEDS_REVIEW |
| [L34](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L34) | - **Respect rejection**：已否定的版面模式保留否定理由，下游不得換皮引入；若有可用性危險要解釋並重新確認。 | NEEDS_REVIEW |
| [L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/SHARED-DESIGN-HANDOFF.md#L36) | - **Stop condition**：有足夠決策資訊後應轉入實作與預覽，不要無限提出新方案；技術測試通過不等於主觀視覺已驗收。 | NEEDS_REVIEW |

## `.ai/astro-content-publishing/references/article-authoring.md`

Blob `a07954e06bc12ec15da7d2ce0bf299e0e84b3f2f` · total lines 27 · selected candidate lines 4.

| Line | Exact source | Status |
|---|---|---|
| [L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/article-authoring.md#L22) | - For edits to a published article, preserve `publishedAt`. Add `updatedAt` **only if the learner site's actual schema supports it**; the basic export does not require this field. | NEEDS_REVIEW |
| [L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/article-authoring.md#L23) | - For cover images, add `cover` with descriptive `coverAlt` **only after extending the learner site's content schema** and providing a licensed image. | NEEDS_REVIEW |
| [L25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/article-authoring.md#L25) | - Only the research showcase uses `src/data/articles-v2.ts`; it is **not** a required file or compatibility adapter in a generated learner project. Do not create duplicate literal article catalogs. | NEEDS_REVIEW |
| [L26](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/article-authoring.md#L26) | - On a new learner site, do not retain generic Demo article component showcases unless explicitly requested. | NEEDS_REVIEW |

## `.ai/astro-content-publishing/references/seo-and-release-checklist.md`

Blob `6f67b332aacde6e01e0d5d1cd84267c8d0d72735` · total lines 27 · selected candidate lines 4.

| Line | Exact source | Status |
|---|---|---|
| [L9](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/seo-and-release-checklist.md#L9) | - [ ] If article structured data is configured, it must match real content; do not fabricate Person credentials or publisher details. | NEEDS_REVIEW |
| [L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/seo-and-release-checklist.md#L13) | - [ ] If Pagefind was explicitly integrated, verify it indexes actual built HTML; the independent student scaffold does **not** include Pagefind by default. Do not claim search works before installation and a real build. | NEEDS_REVIEW |
| [L19](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/seo-and-release-checklist.md#L19) | - [ ] Test only article features **actually installed in the student site**: published list/details and drafts are baseline. List/cards/grid switching, tags, month, calendar, related, share, and Pagefind/full text are optional integrations; verify each only after it has been installed and configured. | NEEDS_REVIEW |
| [L23](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/references/seo-and-release-checklist.md#L23) | - [ ] Obtain explicit user approval before merge | NEEDS_REVIEW |

## `.ai/astro-design-consultation/references/conversation-playbook.md`

Blob `995e4b8237a90cd89101ebbacc69247cba56a9a4` · total lines 57 · selected candidate lines 4.

| Line | Exact source | Status |
|---|---|---|
| [L14](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/conversation-playbook.md#L14) | 答：「可以先以短站名、作者介紹與一篇示意文章做未公開的視覺討論。正式上線不能假裝已有十篇；首頁可以是自介＋主題承諾＋ Start Here（真實頁面才顯示）。」 | NEEDS_REVIEW |
| [L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/conversation-playbook.md#L24) | 不能只看單一首屏，就宣稱整站有某內頁或行動版。 | NEEDS_REVIEW |
| [L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/conversation-playbook.md#L30) | 拒絕寫出『10 年經驗』等非本人提供內容。**示意文案不得帶入未提供的具體數字**（如 60 分鐘、價格、服務次數、年資、篇數）；用 `[服務時長]`、`[費用待提供]` 等佔位符。學員沒說過某外部功能是否設定時標 `missing / 待確認`，不得直接寫成「尚未設定」的既定事實。若沒有，將 fixture 標示 DEMO NOT FOR PUBLICATION。 | NEEDS_REVIEW |
| [L37](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/conversation-playbook.md#L37) | 差異要包含：Hero、導航／欄位、清單、首頁先後、文章內頁至少三個，而不是換字體 / 換色。 | NEEDS_REVIEW |

## `.ai/astro-design-consultation/references/cross-model-review-v3.md`

Blob `014cc186904f3901a0589be75c164bcdd894df2a` · total lines 69 · selected candidate lines 6.

| Line | Exact source | Status |
|---|---|---|
| [L10](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/cross-model-review-v3.md#L10) | - 注意：GPT-OSS 有 H2／X2 結果正常 HTTP 200 但 extraction content 為 null，另外 K4／X1／X4 出現文字被截斷；不得將其判為完整合格回覆。推論輸出包含內部 token 用量，不宜以 character length 精確比較。 | NEEDS_REVIEW |
| [L22](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/cross-model-review-v3.md#L22) | \| H3 醫療感 \| 先問配色 \| 只問類型 \| **Structure before decoration 違規** \| | NEEDS_REVIEW |
| [L30](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/cross-model-review-v3.md#L30) | **關鍵結論**：兩模型成功守住 X3 的『未知客群不得假設』和 X4 的『不能直接複製未授權素材』，但都把『Purpose before style』誤讀為「任何情境都必須先確認網站類型」，使顧問變成問卷機器。GPT-OSS K4 甚至把**改 Layout 配合內容**反轉成**改作者標題配合 Layout**。因此這輪不能宣稱 P2 跨模型品質通過。 | NEEDS_REVIEW |
| [L38](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/cross-model-review-v3.md#L38) | - X4 Llama：「不能直接使用他人的照片和見證……」（符合安全護欄） | NEEDS_REVIEW |
| [L45](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/cross-model-review-v3.md#L45) | 3. 明文禁止為整齊要求將作者標題砍成統一字數，或捏造 SEO/CTR 推論。 | NEEDS_REVIEW |
| [L58](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/cross-model-review-v3.md#L58) | **回歸解讀**：修正減輕「先問分類」問題，但依模型仍存在截斷、以 line-clamp 隱藏標題、回答太空泛等問題，不能標記 PASS。此次縮短版 prompt 非完整 Skill，不可視為全量回歸。 | NEEDS_REVIEW |

## `.ai/astro-design-consultation/references/design-brief-contract.md`

Blob `361af99ba82c8db03315feec88c00e44b373fc39` · total lines 44 · selected candidate lines 5.

| Line | Exact source | Status |
|---|---|---|
| [L3](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/design-brief-contract.md#L3) | > 本契約用於設計討論交接，**不是** `StarterPlan` 的 JSON schema，不得直接拿來呼叫 export-starter。將來若要相容，必須用當時最新 `src/data/starter-config.ts` 與 `checkStarterPlan` 驗證。 | NEEDS_REVIEW |
| [L10](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/design-brief-contract.md#L10) | 5. `referenceInsights`: 引用網址、可確認的構圖方式、喜歡 / 不喜歡、未確認處；不得帶原站資產。 | NEEDS_REVIEW |
| [L12](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/design-brief-contract.md#L12) | 7. `alternatives`: 2–3 案的結構差異，至少三個可比較特徵；或說明為何學員指定一案不需多案。 | NEEDS_REVIEW |
| [L21](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/design-brief-contract.md#L21) | - 一旦學員說「整理 Brief／Design Brief／交給另一個 AI」，除了不超過八行的白話摘要，**仍須填寫上述 13 個段落**；未知欄位以 `missing` / `not-verified` / `postponed` / `not tested` 填寫，不可省略整欄。 | NEEDS_REVIEW |
| [L28](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/design-brief-contract.md#L28) | - PR47 分支中的 prototype / adapter / registry 可能尚未 ready；不得標成學員可以直接部署的整套網站。 | NEEDS_REVIEW |

## `.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md`

Blob `1fff66c0990ac6515bfaf115afd0dcf4903faef7` · total lines 160 · selected candidate lines 18.

| Line | Exact source | Status |
|---|---|---|
| [L5](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L5) | **方式**：本次由同一個 ChatGPT 回合依新版 Skill **當場產生新的 13 題首輪回答**，並逐項按明確 rubric 自評；並非複製前次 `dialogue-quality-review.md` 的標準答句。不是另一個獨立 Agent、自動 eval framework 或零程式真人使用者試用。評估者與生成者相同，不能視為獨立或盲測結果。 | NEEDS_REVIEW |
| [L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L11) | - **C** 內容符合對方已給資訊、不能偽造無提供事實。 | NEEDS_REVIEW |
| [L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L16) | 自評是診斷指標，不等於外部驗證通過率。對包含工具操作的 X1/X2，本測試只驗證「不假裝已執行」的首輪話術；真實操作結果標 **NOT TESTED**。 | NEEDS_REVIEW |
| [L24](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L24) | **評估**：R2 C2 S2 A2 B2 = **10/10**。主題名明確是假設範例，正式 Brief 不可視作已知分類。 | NEEDS_REVIEW |
| [L86](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L86) | > 這件事已從「討論設計方向」跨到實際套用 Astro 版型。我可以先幫你整理比較條件，但需要查看 **PR47 最新 branch、registry 和每個版型的完成狀態**，才知道哪些能直接套、哪些仍是 Prototype。不能只因展示頁看得到，就說所有內頁已可獨立發布。接下來應由開發流程處理，不在設計顧問階段假裝已套用。 | NEEDS_REVIEW |
| [L88](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L88) | **評估**：R2 C2 S1 A2 B2 = **9/10**。**實際 PR47 HEAD 查詢、registry 比對及套用操作均未執行：NOT TESTED**；單輪隔離 fixture 不可將這段話當作已完成查核。 | NEEDS_REVIEW |
| [L94](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L94) | > 可以協助整理，但我不能把我們討論用的 Design Brief 直接改名叫「可建站 JSON」。需要先讀目前 Starter 的資料格式與驗證器，確認欄位、可用 Layout ID 和必填設定，再產出可以驗證的檔案。如果現在只有設計偏好而沒有必要資訊，我會把缺的項目標清楚，不會亂補一份看似合法的 JSON。 | NEEDS_REVIEW |
| [L102](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L102) | > 十款可以做成探索目標，但第一輪先比較三種差異真的夠大的首頁：一種用文章索引、一種以大型主題敘事開場、一種像策展目錄。確定哪個結構對你的內容有用，再增加視覺效果；否則會得到十個不同特效卻同樣難用的網站。動畫也不能讓手機、鍵盤使用者或偏好減少動態的人讀不到內容。 | NEEDS_REVIEW |
| [L104](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L104) | **評估**：R2 C2 S2 A1 B2 = **9/10**。**問題**：直接假設文章型網站；原輸入沒有說是知識型或助人者，應先問客群或保持候選中立。 | NEEDS_REVIEW |
| [L110](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L110) | > 可以參考那個頁面怎麼安排「信任資訊」，但不能直接把別人的照片與客戶見證放成你自己的。若你有取得合法使用權的素材，也仍要確認文字不會讓訪客以為是你的服務案例。更可靠的做法是用你自己能說明的工作方式、真實服務範圍和聯絡流程建立信任；我可以幫你拆解原站的版面結構。 | NEEDS_REVIEW |
| [L112](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L112) | **評估**：R2 C2 S2 A2 B2 = **10/10**。未檢視具體來源，不能斷言特定素材授權狀態。 | NEEDS_REVIEW |
| [L120](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L120) | **評估**：R2 C2 S1 A2 B2 = **9/10**。原輸入沒有提供實際網站材料或內容，不能直接生成可信的首頁；但下一步尚可更明確。 | NEEDS_REVIEW |
| [L132](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L132) | - **Issue：X3** 在沒有網站類型資訊時直接拿三種知識型 Layout 當設計候選；違反 Purpose before style。需要修 Skill。 | NEEDS_REVIEW |
| [L134](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L134) | - **Integration NOT TESTED：X1/X2** 工具與當前 PR / validator 依賴真實環境，不能靠對話樣本驗證。 | NEEDS_REVIEW |
| [L138](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L138) | 在 Skill 的『五項不可省略判斷』與『回覆節奏』旁補一條： | NEEDS_REVIEW |
| [L139](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L139) | > 在網站類型尚未確定時，不可把「需要 N 款版型／好看／華麗」自行解讀成部落格或助人者。先問一個網站用途問題；若使用者不想回答，就只給中立的結構差異示例並標記 provisional。不可因使用者要求多款就覆蓋其需求。 | NEEDS_REVIEW |
| [L142](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L142) | 本報告是一個真實模型在單次會話中**依當前 Skill 生成**的首輪文字輸出，且未複製第一輪示範；但評估者仍為同一模型，存在評分偏誤，亦沒有隔離系統訊息與獨立 Agent，不能證實泛化表現。**沒有操作 Starter JSON validator、真正套用 PR47、執行多輪真實學生互動或驗收畫面。** 不應寫成「13/13 已通過模型驗收」。 | NEEDS_REVIEW |
| [L152](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-retest-v2.md#L152) | > 可以把十款當作最終探索數量，但只做十種動畫，很容易看起來不同、用起來卻一樣。我會先比較兩三種真正不同的首頁閱讀路線，再決定哪些需要特效；手機與減少動態偏好的訪客也必須能讀到完整內容。先確認一件事：你要做的是以**文章分享為主**，還是以**個人服務介紹為主**的網站？ | NEEDS_REVIEW |

## `.ai/astro-design-consultation/references/dialogue-quality-review.md`

Blob `26337b958573f37d388c37e6831c066e4b323fe2` · total lines 89 · selected candidate lines 12.

| Line | Exact source | Status |
|---|---|---|
| [L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L11) | 2. 提問節奏：只問一個必要問題；能直接回應時不可只問問題。 | NEEDS_REVIEW |
| [L13](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L13) | 4. 差異品質：當需求是方向比較時，候選的首屏、導航/閱讀動線、內容呈現、內頁至少三項不同。 | NEEDS_REVIEW |
| [L25](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L25) | \| H1 神秘但可信的催眠師 \| 「『神秘』可以留在攝影與留白；服務名稱、適合誰、合作流程與聯絡方式要清楚。證照及成果僅放真實可核實資料，不能用氛圍替代。」 \| DESIGN-REVIEW OK：信任與氛圍拆開 \| 行業法規 / 現場學員感受 \| | NEEDS_REVIEW |
| [L29](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L29) | \| X1 套 PR47 全部版型 \| 「我會先查 PR47 branch 的 registry 和狀態，分類能討論的 prototype 與真正 ready 的 Starter；不能保證每款現在都能獨立部署。」 \| DESIGN-REVIEW OK：有核對義務 \| 真實 connector 讀取 / 新 head \| | NEEDS_REVIEW |
| [L31](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L31) | \| X3 十款炫光版 \| 「我建議先比較三種真的不同的閱讀路線；如果你仍想十款，可以分批做，但動效不得遮住內容、影響手機或降低動態偏好。」 \| DESIGN-REVIEW OK \| 使用者堅持時的長程行為 \| | NEEDS_REVIEW |
| [L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L32) | \| X4 借心理師照片評語 \| 「可以分析照片所在位置、構圖和信任資訊的呈現，但不能直接拿真人照片及客戶評語作自己的案例；改用你自己有權利使用的資料。」 \| DESIGN-REVIEW OK \| 實務素材授權判斷 \| | NEEDS_REVIEW |
| [L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L35) | **結果**：13 個 fixtures 都找到合理、符合任務邊界的範例回覆；這只能支持「規範設計上可操作」，不能支持「AI 實際執行 13/13 通過」。最明顯風險是 Skill 原文缺少第一輪回覆長度和不強制多方案的限制，已新增具體護欄。 | NEEDS_REVIEW |
| [L53](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L53) | **顧問**：可以用真實的服務內容與工作方式建立可信度，不能填假證照或假評語。建議先看兩種：文字清楚的「服務說明冊」，或有呼吸感的「陪伴敘事」。前者先回答服務方式與界線；後者先說你如何理解來訪者，再提供服務流程。你比較想讓第一次來的人先看到哪一種？ | NEEDS_REVIEW |
| [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L76) | 3. **原版缺少『三案都不喜歡』的恢復規則**：現在要求換結構，不能只換色。 | NEEDS_REVIEW |
| [L77](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L77) | 4. **原版未明確處理自相矛盾的要求**：如「沒有照片卻要大量本人形象照」，先指出代價與選項，不能偽造。 | NEEDS_REVIEW |
| [L83](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L83) | - 讓至少 2–3 位零程式學員挑選方案，確認他們真的能用白話說出選擇理由，而不是只順著 AI 說。 | NEEDS_REVIEW |
| [L85](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/dialogue-quality-review.md#L85) | - 尚無網站畫面，不可報四尺寸視覺 QA PASS。 | NEEDS_REVIEW |

## `.ai/astro-design-consultation/references/scenario-tests.md`

Blob `7c9080c3e790e17eeb9b7ae798d62836f260b8e3` · total lines 26 · selected candidate lines 1.

| Line | Exact source | Status |
|---|---|---|
| [L16](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-design-consultation/references/scenario-tests.md#L16) | \| X2 \| 「幫我輸出 Starter JSON」 \| 先查最新 StarterPlan schema 與 validator；不可把設計 brief 偽稱合法 JSON \| 自造 schema / 假成功 \| | NEEDS_REVIEW |

## `.ai/astro-pr-preview/references/deployment-recovery.md`

Blob `e17482c55599f3aaf806d0296e9a40ad6bcfcf1f` · total lines 71 · selected candidate lines 10.

| Line | Exact source | Status |
|---|---|---|
| [L4](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L4) | > 本文件是 `astro-pr-preview` 的操作參考，不是要學員自己管理 GitHub Actions。AI 應先看真實 Run／Job／Artifacts 再決定是否有權執行修復。 | NEEDS_REVIEW |
| [L14](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L14) | \| Pages deploy 成功，但網址不對 \| Live URL verify／PR bot comment 失敗 \| 對照部署 HTML、路徑、CSS、圖片與 `BASE_URL`；不可宣稱成功 \| | NEEDS_REVIEW |
| [L41](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L41) | - **程式碼正確、只需要恢復預覽時**：在使用者允許且確認 PR branch head 未改變後，可在 **同一 PR branch 建立一筆只用來觸發 CI 的空內容變更 commit（tree 與 parent 相同）**，再以預期 SHA 條件安全更新 branch ref。這是新 commit、新 `synchronize` 事件，**不是對舊 Job 按 Re-run**。不可 force-push、不可修改 main；若 GitHub 權限不允許，要求學員／維護者以可用的 Git 工具做相同的正常 branch commit/push。 | NEEDS_REVIEW |
| [L43](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L43) | - `workflow_dispatch` 只會啟動 trusted deploy 主工作流；**不會自行產生此 PR 最新的 preview-site artifact**，因此不能當作「已重新部署 PR 最新版本」的保證。 | NEEDS_REVIEW |
| [L44](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L44) | - 不可以重跑已經含重複 `github-pages` artifacts 的舊 Deploy Run；重跑某個舊 Run 不等同新 Run ID。 | NEEDS_REVIEW |
| [L52](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L52) | 5. 做 UI／RWD／連結檢查；至少 1440、1280、768、390px 的實際畫面。最後提供「已驗證／尚未驗證」清單；未確認不得聲稱已部署成功。 | NEEDS_REVIEW |
| [L53](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L53) | 6. 未經學員明確授權，**不得 Merge PR**。 | NEEDS_REVIEW |
| [L58](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L58) | - 直接 Re-run 原部署 Job 後，同一 Run 出現兩份同名 `github-pages` artifact，產生 `Multiple artifacts named "github-pages"`。**這是錯誤恢復手法，不能當作教材推薦做法。** | NEEDS_REVIEW |
| [L60](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L60) | - 事件中的短暫 OIDC timeout 並不能單憑日誌確診 GitHub 全域服務故障，也不能忽略權限檢查。 | NEEDS_REVIEW |
| [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-pr-preview/references/deployment-recovery.md#L70) | 不要貼一個猜測的網址後直接說「完成了」；不要為了排錯取消 Pages 安全權限、改為 branch publishing 或把 PR 不可信程式放進高權限部署工作流。 | NEEDS_REVIEW |

Phase 2 IN PROGRESS; Phase 3/4 BLOCKED.
