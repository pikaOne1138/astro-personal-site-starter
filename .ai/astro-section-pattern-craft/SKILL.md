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

## 與其他 Skills 分工
`astro-layout-craft` 負責全頁；`astro-editorial-layout-design` 負責構圖；`astro-ui-craft` 和 Block Registry 負責元件；`astro-motion-craft` 負責微動畫；`astro-site-assembly` 負責由 Site Brief 實際組站；`astro-pr-preview` 負責預覽與發布。

## 給學員的提示詞
「請看 `/section-patterns/`，我選 `featured-work`（或 `trust-service-path`）。把這段加到我的＿＿頁、＿＿區段後。保留我選的 Layout 與品牌風格，先列需要我提供的真實內容，再以現有 Blocks 組成。完成 PR 和四尺寸 QA 後給我預覽，不要自動合併。」
