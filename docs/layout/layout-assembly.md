# 版型組裝：從 Layout 到獨立學員網站

> 對象：維護這個研究展示 Repo 的人。**這份文件不會進學員 ZIP。** 學員端的契約是 `docs/student-builder-pack/` 的 `EXPANDED-LAYOUTS.md`、`SECTION-PATTERNS.md`、`OWNED-MEDIA.md`，以及 `.ai/astro-site-assembly/SKILL.md`。
>
> 這份文件取代了以 PR 編號命名的 PR46／PR47 交接與驗收紀錄（已封存在 `docs/archive/layout-assembly/`）。那些紀錄是某次 CI 的證據，其中的 Run、Artifact 編號與截圖連結多已過期；這裡只保留仍然有效的契約、規則與教訓。

## 唯一依據（不要在文件裡寫死數量或狀態）

| 要知道什麼 | 去哪裡看 |
|---|---|
| 有哪些版型原型 | `src/data/layout-directions.json` 及 `src/pages/layouts/` |
| 哪些版型可匯出、組裝狀態 | `src/data/layout-assembly/definitions.mjs`（`assemblyStatus`、`adapter`） |
| 版型交接清單（slug、客群、結構辨識、QA 證據分級） | `docs/art-direction/layout-handoff-registry.json`，由 `scripts/verify-art-direction-layout-handoff.mjs` 檢查 |
| 獨立 Adapter 的定義 | `src/data/art-direction-definitions/*.json`、`scripts/art-direction-adapters.mjs` |
| 學員可選的區段樣板 | `src/data/section-patterns.registry.json` |

## Layout Definition 契約

一個版型 = 一份定義 + 一個 Adapter。**版型不是主題**：換色、換字型不算新版型。

### 識別與生命週期

- `schemaVersion: 1`（整數，必填）；`slug`（穩定、URL 安全、唯一）；`kind: knowledge | helper`（發布後不可變）。
- `name`、`summary`、`audience[]`、`features[]`；`sourcePrototype: "/layouts/<slug>/"`。
- `assemblyStatus: "prototype" | "in-progress" | "ready"`。只有匯出 Adapter、獨立建置、桌機／手機忠實度與必要內頁都通過審查，才能是 `ready`。好看的預覽或能跑的骨架不代表 `ready`。
- `adapter: null | {id, version, renderer, supportedPages[]}`；未組裝的原型為 `null`。Adapter 為 `null` 或未就緒時，匯出必須明確失敗並說明原因，**不能安靜地輸出一個通用網站並冒用所選版型的名字**。

### 結構定義

- `composition.hero`：構圖識別、文字與媒體比例和位置、標題層級、焦點裁切、主要 CTA。學員只能客製內容與 token。不同構圖必須是不同的 renderer DOM 與 CSS，而不是在同一個通用 Hero 上加 class。
- `composition.sections`：**有序、穩定的陣列**，每項有穩定 `id`、語意 `role`、`renderer`、順序、`required`、內容綁定 `contentKey`。可重用已註冊的 Block 與編輯式配方，但不得修改它們的介面。
- `composition.responsive`：斷點期待（至少 1440／1280／768／390）、文字與媒體堆疊順序、格網收合、溢出、焦點、可讀字級與點擊目標。重要內容不得依賴 hover 或 JavaScript。
- `content`：必填、選填欄位，缺資料時的 `fallback` 一律是「誠實的明確佔位」。
- `pages`：首頁加上相容的文章列表／內頁、Pagefind 搜尋、RSS、sitemap、About、服務內頁、FAQ、聯絡、404，並保留來源網址、無障礙、草稿隔離，以及預約／電子報未設定時不假裝成功。
- `tokens`（品牌色、字型、圖片風格、Logo）只調整**呈現**，不能取代構圖、區段順序或 DOM 層級。

### 圖庫截圖

截圖必須來自實際建置出來的 Astro 原型（不是示意圖、mockup 或別的版型），並記錄來源（ref SHA、路由、視窗、日期、工具）於 `docs/template-gallery/captured.json`（由 `scripts/capture-template-gallery.mjs` 自動寫入）。沒有截圖時顯示明確的「截圖待製作」，不放不相干的照片。

### Adapter 與匯出介面

1. `layout-directions.json` 是原型發現清單，`slug` 與 `kind` 是標準鍵；組裝清單在 `src/data/layout-assembly/`，把標準鍵對應到 Adapter 與狀態。
2. `scripts/export-starter.mjs` 驗證既有 `StarterPlan` v1，只選一個就緒的 Adapter，輸出獨立的 Astro 專案。保留 `site.config.json` 與 `layoutSlug`；新增欄位以向後相容方式加入。未就緒的版型仍可預覽與下載 Site Brief，但不當成可下載的現成網站。
3. 每個 Adapter 提供 `{slug, kind, version, compose, requiredAssets, requiredPages}`，並複製／產生獨立的 `src/components/layouts/<slug>/Home.astro` 與限縮範圍的 CSS。學員建置時**不得**引用展示站的任何檔案。
4. 共用的 `SiteLayout` 提供導覽、手機連結、SEO 與頁尾；Adapter 只控制首頁中央構圖。文章、搜尋、服務頁重用，不另寫一套後端。
5. 學員內容缺漏時，保持標示為範例／示範或直接省略；不編造個人簡介、證照、客戶見證、價格、預約確認、電子報成功、臨床宣稱或危機資源。不支援的第三方服務就停用或要求明確的外部設定。
6. 選用的 Section Pattern 只能放在 Adapter 宣告的擴充點，且種類與頁面相容。不得悄悄打亂不可變的構圖。
7. 學員之後請 AI 改文案、圖片、配色、字型、頁面時，不用重跑產生器去覆蓋已改過的檔案；來源、素材與內容位置要寫在輸出專案的 README。

### 契約變更

向後相容的新增屬性仍屬 v1；破壞性變更需要 v2、遷移說明與 Adapter 相容檢查。

## 就緒狀態與證據

| 狀態 | 需要的證據 | 圖庫按鈕 |
|---|---|---|
| Prototype | 已有真實 Astro 原型；沒有獨立組裝保證 | 預覽設計、下載 Site Brief |
| Assembly in Progress | Adapter 存在，但忠實度或整合關卡未完成 | 預覽設計、下載 Site Brief；明確標示不可直接匯出 |
| Starter Ready | 獨立 `npm run build` 與重點完整性檢查；區段 DOM／結構比對；桌機與手機截圖經人工目視；相關文章／搜尋／服務／導覽路由可用 | 建立獨立網站 |

三種證據要分開記錄，**不可互相取代**：

1. **CI 建置**（程式與測試通過）。
2. **平台實際 Preview 的 SHA 與網址**（見 `.ai/astro-pr-preview/SKILL.md`）。
3. **人工視覺審查**。

Preview 部署不等於核可。**不能把前一個 Head 的綠燈當成新 Head 的**：每次都查最新 Head 的 Checks。GitHub Actions 的截圖 Artifact 只保留幾天，要記的是**結論與條件**，不是會過期的連結。

## 驗證設計的教訓

這些是做 25 款版型整合時踩到、之後仍會再發生的問題：

- **關卡要驗語意，不只驗無錯誤。** 曾有一版「全綠」，實際看圖才發現刪掉最後一篇文章後，空列表仍顯示舊文章，因為關卡只看溢出、family、h1，沒驗文章真的歸零。現在列表輸出 `data-article-count`，真實瀏覽器要確認「零篇＝0、單篇＝1」。
- **Astro `glob()` 遇到空目錄會提前返回，不清除舊資料。** 匯出專案的 `npm run build` 因此先執行 `scripts/clean-build.mjs`，只清產物與快取，不刪學員原始碼或文章。文章異動要檢查首頁、列表、直接網址、RSS、sitemap、exact-zh 六個面向。
- **測 0／1／多篇、無圖片、長中文標題、缺資料。** 不要只用漂亮的 fixture。助人者站啟用文章時，也要有實際的列表與內頁。
- **用相同的品牌色、字體、標題比較不同版型**（neutral fixture），證明結構真的不同，而不是換色。
- **檢查舊殘留。** 曾經只計算新元件的 DOM 標記，漏掉並存的舊佔位區段；現在也要檢查舊 DOM 不存在。
- **自訂頁頁尾要實測前景／背景對比（至少 4.5）**，深色品牌曾出現淺字淺底。
- **音訊測試用合法檔案**（例如一秒靜音 WAV），並實際 muted play／pause；格式無效的測試檔會造成誤判。
- **不要出現 `href="#"` 的假連結**；沒有正式聯絡設定時，禁用寄信 CTA。
- **學員網站的 `PROJECT.md` 要在版型 Adapter 組裝完成之後才寫入。** 曾有主匯出器先用暫代的版型 slug 建骨架並先寫 `PROJECT.md`，結果 `PROJECT.md` 記錄了錯的版型，而 `site.config.json` 後來才被修正。現在兩條匯出路徑共用同一個收尾程序 `finalizeStudentSite`，在 Adapter 組裝、真正的 `layoutSlug` 確定後只執行一次；`check:context` 比對 `PROJECT.md` 與 `site.config.json` 的版型。重跑時不得覆蓋學員已有的 `PROJECT.md`。
- **Cloudflare 的分支預覽要一律 noindex**，即使 `SITE_INDEXABLE=true` 也一樣（HTML meta 與 `robots.txt` 都要檢查）。
- **評測用的答案與測試包不能出貨給學員。** 它們放在 `docs/interview-evaluation/`，打包程式會排除並有洩漏檢查。

## 仍需人工完成的驗收（尚未簽核）

自動檢查全綠不代表下列項目通過。簽核時註明日期、審查者、裝置、網址、截圖與結果。

**視覺設計**
- 每款用「有實際圖片」和「無圖片」兩種情境確認 Hero、留白、圖片比例。
- 1440／1280／768／390 實際查看排版、CJK 字距與斷行、層級、CTA 主次與對比；手機的導覽、Logo、標題、按鈕不遮蔽。
- 抽查相似版型，確認結構差異仍可辨識，不只是換色與換字型。
- 用真實鍵盤（Tab、Shift+Tab、Enter／Space／Escape）檢查互動、焦點、錨點與 Skip link。
- 手機實機（至少 Android Chrome，有條件再測 iOS Safari）。
- 小點擊目標：先前記錄有寬或高低於 28px 的「觀察警告」，那不是確認的違規。需逐一依「元素＋尺寸」分級、修正或記錄豁免。

**多頁原型**
- 首頁／列表／詳情／About 用同一裝置連續瀏覽，檢查 Header 高度、畫布邊界與導覽選取狀態；詳情頁要保留該款設計語法。
- 0／1／多筆與長中文時，不顯示假文章或假服務；缺圖時不虛構人物照片。

**助人者內容真實性**
- 沒有虛構證照、資格、見證、價格、醫療效果、客戶案例、危機電話或媒體報導。
- 預約／聯絡未設定時只顯示明確的未設定狀態，沒有假成功。
- 螢幕閱讀器（NVDA 或 VoiceOver 任一）抽查地標、標題、表單標籤、圖片描述；axe-core 零違規不等於真人驗收通過。

**發布前**
- 不把所有版型自動標為 Ready。Content Collections、Pagefind、RSS、canonical／SEO、路由、圖片路徑以實際匯出的網站驗證。
- 瀏覽器範圍：目前只測過 Chromium；Safari、Firefox、真機與輔助科技未測。
