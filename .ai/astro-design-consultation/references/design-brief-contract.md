# ATP Consultation Design Brief｜人類可讀規格

> 本契約用於設計討論交接，**不是** `StarterPlan` 的 JSON schema，不得直接拿來呼叫 export-starter。將來若要相容，必須用當時最新 `src/data/starter-config.ts` 與 `checkStarterPlan` 驗證。

## 必填段落（以 Markdown）
1. `briefVersion`: consultation-0.1；`status`: exploring / proposed / student-confirmed；`date`。
2. `siteKind`: knowledge / helper；`audience`: 站主提供或明確推測；`pageJob`: 新訪客三十秒應知道什麼。
3. `productTruth`: 真實服務／文章與可核實聲明；每項標上 `user-provided` / `observed` / `missing`。
4. `contentInventory`: 現有站名、自介、文章 / 服務數量與長短、影像權利、外部 CTA 是否已配置。
5. `referenceInsights`: 引用網址、可確認的構圖方式、喜歡 / 不喜歡、未確認處；不得帶原站資產。
6. `designDirection`: 名稱、情緒、設計假說、符合這個人的理由、代價與限制。
7. `alternatives`: 2–3 案的結構差異，至少三個可比較特徵；或說明為何學員指定一案不需多案。
8. `informationArchitecture`: 首頁 / 知識文章索引 / 文章內頁 / About；或首頁 / 服務索引 / 服務詳情 / About / FAQ / Contact。未有內容的頁面標 postponed。
9. `layoutPlan`: Hero、Section 次序、欄位、列表、手機順序、低內容 / 無圖策略。
10. `systemSelection`: Layout slug（只有確認 registry 存在且可用才填 confirmed）、Editorial recipe IDs、Section Pattern IDs、Block IDs、Theme/token 意向、Motion purpose；未核對者標 proposed / not-verified，不要猜 ID。
11. `trustAndCTA`: 單一主要 CTA、次要低壓引導、真實服務配置、資格／見證與隱私限制。
12. `designDecisions`: 做 / 不做的決策及理由，未決項目與學員說法。
13. `handoffAndQA`: 開發時先讀哪個 Skill、正式 Page / Content Collections 的來源、四寬度 1440/1280/768/390、鍵盤、reduced-motion、無圖和長中文、no-JS / 真實連結；區分 not tested、tested with evidence。

## 正式交付品質門檻
- 一旦學員說「整理 Brief／Design Brief／交給另一個 AI」，除了不超過八行的白話摘要，**仍須填寫上述 13 個段落**；未知欄位以 `missing` / `not-verified` / `postponed` / `not tested` 填寫，不可省略整欄。
- `handoffAndQA` 每次完整交付都明列 `1440 / 1280 / 768 / 390`、鍵盤、reduced-motion、無圖、長中文、no-JS、真實連結；這些是**待驗證項目**，沒有執行證據一律 `not tested`。
- 詳細技術欄位可置於「交給下一位 AI」段落，避免讓學員以為每個技術名詞都需要自己填答。

## Brief 與 Starter 的隔離
- 本 Brief 是**意圖描述**，不同於站點建置輸入。
- 不保證現在已存在已選版型的全部內頁或已接入 Exporter。
- PR47 分支中的 prototype / adapter / registry 可能尚未 ready；不得標成學員可以直接部署的整套網站。
- 若未來產出真正 `StarterPlan` JSON，只能先獨立讀當時的 `src/data/starter-config.ts`，並通過 validator。不要塞未定義的 `designDirection` / `alternatives` 到既有 JSON 格式。

## 極簡交付例（示意；不是學員真實資料）
- Site kind: knowledge
- Audience: [待確認]
- Page job: 讓第一次來的人看到最近寫的三篇文章並理解主題
- Content truth: 三篇文章由學員提供；圖片：沒有
- Direction: 日期側欄日誌（proposed）
- Alternative: 主題分類型（proposed）
- Home: 一行站名 → 短自介 → 日期索引＋三篇真文章 → About → Footer
- Article detail: 窄文欄、日期 meta、相關文章（文章不足時隱藏）
- Mobile: 時間側欄變上方月份索引，不侵占閱讀寬度
- CTA: 閱讀文章；Newsletter 未設定不展示訂閱成功
- Components: [待檢查 Registry]
- QA: not tested
