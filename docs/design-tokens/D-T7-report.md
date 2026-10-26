# D-T7 報告：學員面分級對齊

對應工單：ai-workbench「設計 Token 分層」D-T7（排在 D-T3 三批、殼階段 1／2、Issue #22 與 CSS 結算層級稽核之後，語意定案後一次對齊）。基準：`main` @ `c914a34`。

## 1. 做了什麼

- 新增學員說明卡 `docs/student-builder-pack/CUSTOMIZATION-GUIDE.md`（人話版，三點，不含技術名詞）：**換配色、字體、站名或 Logo**／**換版型或換設計款式**／**改某一個地方的樣子**。`/guide/` 第 07 步直接讀取同一份，與訪談說明卡同一個做法。
- 學員 `AGENTS.md`（`STUDENT-AGENTS.md`）的「S／M／H 任務車道」新增「設計客製的三級」表，用**同樣的三句話**作為列標籤，對應：S（輸入層、Token 層，學員可直接請 AI 做）／M（元件、版型層，走 Preview 核准）／M（涉及憑證、刪除、正式分支或敏感資料時升為 H）（元件、頁面層，先說明影響範圍、固定回報格式）。沒有第二套分類：三級只是既有 S／M／H 車道在「設計」上的對照。
- 「設計修改」一節：「四條規則」改為五條，新增第 5 條（CSS 結算層級）：新增由其他變數推導的區域變數，宣告層不得高於原料被覆寫的層，否則換色票時它會凍結（殼階段 1 的 `--line` 就是這樣）。
- `START-HERE.md` 登記說明卡；`build-student-pack`／`verify-student-pack` 把說明卡與驗證腳本依賴納入。
- 順手修一個我自己先前的疏漏：資料包內的 `verify-starter-export.mjs` 匯入了 `audit-shell-vars.mjs`、`shell-token-check.mjs`、`audit-css-resolution.mjs`（及分類檔），但這幾個檔沒有被打進 ZIP；已補進打包清單與 ZIP 驗證清單。

## 2. 完成定義：兩處講法一致、無第二套分類——機器檢查

延伸既有的 `test-canonical-student-prompt.mjs`（CI `verify-cloudflare-ssg` 工作流已在跑；沒有另建平行工具）：
- 說明卡必須恰好三點，每點以粗體標籤開頭；
- `AGENTS.md` 的車道表必須逐字含這三個標籤，且每個標籤恰好一列，車道依序為 S、M、M（H）；
- 說明卡不含技術名詞（PR／commit／JSON／Token／Variant／CSS）；兩份文件都不得宣稱「一鍵換風格」；
- `/guide/` 頁面確實讀取該卡、`START-HERE` 確實登記。
負向對照：把 `AGENTS.md` 的標籤改掉 → FAIL（「缺少卡上的標籤」「每個標籤應恰好一列」）；說明卡加第四點 → FAIL（「必須恰好三點」）。

## 3. 驗證

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 兩處講法一致的機器檢查 | PASS（含兩個負向對照 FAIL） | 上節 |
| `/guide/` 實際渲染說明卡 | PASS | `astro build` 後 `dist/guide/index.html` 含「改設計，有三種程度」與三點（粗體標籤保留） |
| 新對話只讀 `AGENTS.md` 的分級實測（Haiku＋Sonnet，唯讀、不給其他檔案） | PASS（分級與車道）：兩者各 5/5 | 五句學員用語（森林綠、改黑體、換首頁排版、卡片陰影淡一點、只有首頁按鈕大一點）：兩個模型都正確分到級別與車道（S、S、M、M、M），第一步動作都符合表中「AI 要做的事」（第 3 句先說明這不是換色並走預覽核准；第 4、5 句先說影響範圍且不改全站 Token）。Haiku 另多了「先 `npm run status`」，這是 AGENTS 其他章節的通則，不是錯誤 |
| 學員包建置與驗證 | PASS | 25 款全部匯出；說明卡與驗證腳本依賴在 ZIP 內 |
| 本機測試 | PASS | test-student-project-context、test-shell-vars、test-shell-tokens、test-pilot-token-consumption、test-gates、test-css-resolution、check-doc-hygiene、test-release-readiness、test-starter-route-contracts、test-canonical-student-prompt |

## 4. 未涵蓋

- 分級實測只測「AI 讀了 AGENTS 後會不會正確歸類與選第一步」，**沒有**讓它真的去改一個站（該行為驗收已在 D-T3 各批做過）。
- 沒有真人學員讀過說明卡；「人話版」只由機器檢查擋技術名詞，是否好懂要由作者或講師看。
- 殼的選單／hover／樣板／頁尾裝飾仍是中性值（設計決定，作者已裁示擱置，與本案分開）。
