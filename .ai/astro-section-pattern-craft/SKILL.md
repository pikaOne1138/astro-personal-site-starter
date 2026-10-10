---
name: astro-section-pattern-craft
description: Discover, select and customize ready-to-use Astro section patterns built from existing Blocks, without mistaking sections for full layouts or inventing source content.
---
# Astro Section Pattern Craft｜區段組合樣板

## 入口與定位
展示頁：`/section-patterns/`。資料：`src/data/section-patterns.registry.json`。元件：`src/components/patterns/`。
這一層介於整頁 Layout 與單一功能 Block 之間：展示已組好的內容區段，讓不懂程式的人直接說出「我想要這一段」。

## 選擇流程
1. 先辨認網站用途、讀者和想加入這段區塊的理由；不是為了填滿空間而加卡片。
2. 對照現有 Layout 的首頁區段與資訊動線，確認插入位置、上下段關係和手機閱讀順序。
3. 閱讀 Registry：`purpose`、`composition`、`blocks`、`required`、`optional`、`safety`。請使用 ID 指向樣板，不依顏色猜。
4. 優先組合既有 Blocks，不重複造功能相同的新 Block；Pattern 不列入 Blocks 數量。
5. 用真實資料替換示範，沒有作品／證照／政策／網址就不要製造假的成果或互動。
6. 按主題 Tokens 調整字體、顏色、間距；保留 Layout 設計結構，Effects 最後才選且預設 subtle。
7. Branch + PR，Build 和 1440／1280／768／390 視覺與鍵盤 QA，待使用者同意才合併。

## V1 模式
- `featured-work`：有代表性文章、作品、專題的精選展示；可放首頁自介後。需要真實項目資料。
- `trust-service-path`：服務適合度、資訊透明與低壓下一步；適合助人者。只有確認的服務/聯絡網址才能顯示 CTA。

- `footer-minimal`／`footer-editorial`／`footer-professional`：同一 `SiteFooter` 底層元件的三種完整頁腳排版，能設定品牌說明、多組選單、社群、RSS、版權與真實法律頁面連結。法律連結未設定時不顯示，不可用假的 `#` 連結交付正式站。

## 學員流程的交接契約
- 在學員選定 Layout、規劃頁面/導航後，提供 `/section-patterns/` 給學員比較，不強迫選。
- 每個採用的 Pattern 記錄：`patternId`、`targetPage`、`insertAfter`（或其他有意義的位置）、`contentNeeded`、`notes`。此為 `StarterPlan v1` 的 `sectionPatterns` 正式欄位；請以規劃器實際匯出的 JSON、Schema 與生成器驗證為準。不要因為舊版文件而忽略學員已選取的 Patterns。
- 按 Layout → Section Pattern → Blocks → Motion 的順序實作；主題品牌 Token 應一致作用於這些層級。
- 對 `footer-*` Pattern，位置必須在頁尾、避免同頁出現兩個 footer，所有隱私權/條款連結都必須有效。

## 導航與 Pattern 的差異
`StarterPlan.navigation` 的雙層選單是站點資訊架構，由 Onboarding 與 Site Assembly 處理；`Section Patterns` 仍是內容組合樣板，不能誤把導覽列的子項目當作區段，也不能把 Footer 分組連結當成全站導覽結構。

## 與其他 Skills 分工
`astro-layout-craft` 負責全頁；`astro-editorial-layout-design` 負責構圖；`astro-ui-craft` 和 Block Registry 負責元件；`astro-motion-craft` 負責微動畫；`astro-site-assembly` 負責由 Site Brief 實際組站；`astro-pr-preview` 負責預覽與發布。

## 給學員的提示詞
「請看 `/section-patterns/`，我選 `featured-work`（或 `trust-service-path`）。把這段加到我的＿＿頁、＿＿區段後。保留我選的 Layout 與品牌風格，先列需要我提供的真實內容，再以現有 Blocks 組成。完成 PR 和四尺寸 QA 後給我預覽，不要自動合併。」
