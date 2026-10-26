# 殼版型階段 2 報告：語意統一＋字族 Token 化

對應工單：ai-workbench「設計 Token 分層」殼階段 2（Issue #17；排在 Issue #22 之後）。基準：`main` @ `b70d4fc`。
作者決定（本階段開工前）：① 殼改讀 `--color-accent`；② 殼的 `--line` 保留 25%、改成 L2 派生；③ 無色票的舊計畫，殼的後備值改讀 Token，接受預設色微調。

## 1. 結論先講（含一個需要作者知道的偏離）

**階段 2 沒有達到「全狀態真 0 差異」，原因是 `--line` 的原始行為其實是缺陷，不是設計。** 階段 1 的殼把 `--ink`／`--bg` 寫在 `<body style>`，但 `--line` 宣告在 `:root`：`:root` 看不到 body 上的變數，所以殼的 `--line` 一直是用 `site.css` 內寫死的預設值算出來（`color-mix(#242a24 25%, #f4f1e8)`），**與站長的色票無關**（深色色票下也是淺褐灰線）。作者決定的「保留 25%、改 L2 派生」就是授權它跟色票走；凍結的舊色不是選項（作者已明確裁示，不用釘字面值或 `design-fixed` 豁免來保留）。所以所有用 `--line` 的分隔線顏色在殼上改變，是預期的修正。這類缺陷的整類檢查與修法原則見 `D-T-css-resolution-audit-report.md`。

## 2. 做了什麼

- 殼不再有私有設計變數：`SiteLayout` 不再寫 `<body style>`（`--brand`／`--ink`／`--bg`／`--panel`／`--accent`／`--serif` 全移除）；`site.css` 的 `:root` 只剩 `--line`。
- 殼 CSS 一律讀 L1 Token：`--brand`→`--color-primary`、`--ink`→`--color-content`、`--bg`→`--color-surface`、`--panel`→`--color-secondary`、`--accent`→`--color-accent`（仍是 palette.accent，不是 primary）、`--serif`→`--font-heading`、內文字族→`--font-body`、等寬→`--font-mono`。範圍：`art-direction-adapters/`（含 `site.css`、`ContentPatterns`、兩款首頁與內頁）、11 款 `layout-assembly/expanded/*/Page.astro`、共用家族元件裡殼會用到的別名引用（`DesignInterior`、`ServiceSections`、`AboutSections`、`ArticleDetail`、`DesignChrome.css`）。
- `.pattern-slot` 內給樣板元件用的 `--text`／`--muted`／`--accent` 保留（樣板容器自己的 L2）。
- 宿主契約：字族與強調色讀 Token；新增 `--student-nav-focus-ring`（導覽焦點環，原本元件直接讀 `--brand`，兩個宿主都宣告為 `var(--color-primary)`）。選單／hover／樣板／頁尾的裝飾仍是中性值——要不要讓殼也有，是設計決定，待作者。
- 順手收掉 `ArticleDetail.astro` 多家族共用規則的 `ui-monospace` 字面值（改為 `--font-mono`）。
- 檢查：`shell-token-check.mjs` 改為「殼不得再寫私有設計變數」（靜態＋建置後算出值），`test-shell-vars.mjs` 新增「殼專屬來源不得引用已移除的私有變數」；`audit-shell-vars.mjs` 的 A 類（引用 Token）改為資訊、B 類零容忍、C 類不變；階段 1 的動態「休眠啟用」檢查移除（殼現在依賴 Token，那個前提不成立）。

## 3. 驗證

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 13 款殼 × 3 色票 × 全路由，對階段 1（`main`）逐元素比對（算出樣式＋偽元素＋hover／focus） | 結構 0 差異；差異只有下列三類 | 39 組。DOM／狀態數量 0 差異 |
| 差異類別 1：字族（及因此造成的版面寬高） | 預期 | 內文 `Arial` → `--font-body`（`system-ui`）；標題 `Georgia,'Noto Serif TC'` → `"Noto Serif TC",Georgia`（theme.css 的順序）；等寬字串較長。殼現在會跟 `brand.typography` 走 |
| 差異類別 2：`--line` 驅動的分隔線／表格線／導覽群組框線顏色 | 預期（見第 1 節） | 前後截圖已附 |
| 差異類別 3：跳到主內容連結（聚焦時）底色字色 | 預期 | `white`／`#111` → `--color-surface`／`--color-content`（與 prototype 的跳轉連結一致） |
| 差異歸因對照 | PASS | 在新站 dist 把 `--line` 改回舊的寫死值、跳轉連結改回舊色後再比對：只剩字族（及連帶尺寸）差異，沒有任何其他差異 |
| 12 款 prototype × 3 色票，對 `main` | 36 組 0 差異（連 13 個舊名自訂屬性） | `ArticleDetail` 的 `--font-mono` 只改字族字串（文章頁實測：`ui-monospace, monospace` → 較長的堆疊，寬度相同） |
| 無色票的舊計畫（殼） | 預期的小差異 | 底色 `#f4f1e8` → `#f7f5f0`、字色 `#242a24` → `#28231f`、內文字族同上 |
| `FULL_STARTER_BUILD=1 verify-starter-export` | PASS | exit 0 |
| 13 款殼 × 色票 A、C 完整 build 後 `qa:responsive` | PASS | 26 個站全過（40/40 或 55/55），0 警告 |
| 學員包建置與驗證、本機測試 | PASS | test-shell-vars、test-shell-tokens、test-pilot-token-consumption、test-gates、test-student-project-context、check-doc-hygiene、test-release-readiness、test-starter-route-contracts |
| 釋出 G-11 | 不變差 | 寫死色掃描 1414 → 1407 |

## 4. 未涵蓋與後續

- 殼的選單／hover／樣板／頁尾裝飾仍為中性值（設計決定，待作者）。
- `AboutSections`／`ServiceSections` 等共用家族元件仍有其他家族專屬規則的 `ui-monospace`／`Georgia` 字面值（非殼會用到的家族）；本階段只收掉被點名的那一條。
- 殼的 `--line` 是 L2 派生，不是全域 Token；若要改成 Token 的 20%，是另一個可見變更。
- 文章頁 `ArticleDetail` 的字族變更在 12 款 prototype 的逐元素比對路由中沒有涵蓋（取樣只含第一層路由），以上面的單點實測補充。
- D-T7（學員文件對齊）照作者排序留到本階段合併之後。
