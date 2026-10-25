# D-T3 擴展 批 2 報告：learning-lab、curator、coach Token 化

對應工單：ai-workbench「設計 Token 分層」D-T3 擴展；追蹤 Issue pikaOne1138/ai-workbench#17。
基準：`main` @ `b4959ab`（殼階段 1 已合併）。批 3 尚未動工；個性色政策待作者看過 coach 前後截圖後決定。

## 1. 範圍與結果

| 版型 | 做法 | 換色殘留（色票 A vs D，轉換前 → 後） |
| --- | --- | ---: |
| learning-lab | `--ll-*` 區域變數改由 `--color-content／primary／accent／surface` 推導；單元色塊用 `color-mix()`；字族取 `--font-mono／heading／body` | 258 → 0 |
| curator | `--cu-*` 改由 Token 推導；金色 `color-mix(accent 70%, content)`；封面文字 `on-primary` | 232 → 0 |
| coach（政策 A 試做） | 漸層與色塊由 primary／secondary／accent 混色；深色區塊取 `inverse-surface`／`on-inverse` | 430 → 0 |

家族共用檔（`DesignChrome.css`、`DesignInterior.astro`、`ServiceSections／AboutSections／ArticleDetail`）三款的家族規則同步 Token 化。沒有新增全域名稱。`test-pilot-token-consumption.mjs` 的 PROTOTYPE 清單加入三款。

## 2. 驗收

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 驗收 1 換色殘留 | PASS | 920 → 0 |
| 其餘 22 款不受影響 | PASS | 25 款 × 色票 A／C／D 逐元素算出樣式（含偽元素、hover、focus）新舊比對：22 款 0 差異；對照組：自比 0、A vs D 1150 差異 |
| 三款的差異性質 | PASS | 只有顏色、字族、因字族而變的尺寸、陰影（curator）、背景圖（coach）；無 DOM 數量或狀態數量差異 |
| 驗收 2（行為實測，coach） | PASS | Haiku／Sonnet 各一，「首頁 hero 圖陰影淡一點」：兩者 `git diff` 都只動 `Home.astro` 的 hero 圖陰影；建置後比對 7 頁，只有首頁 `.move-art` 的 box-shadow 變化，其他元素與頁面 0 差異 |
| 驗收 3（行為實測，coach） | PASS（範圍）；詮釋不同 | 「只有首頁的按鈕要大一點」：兩者都只改 `Home.astro`，其他 6 頁 0 差異。Sonnet 只放大 hero 的 `.move-cta`（最小改動）；Haiku 把首頁四個行動連結都改成填色按鈕（解讀較寬，並在回報中自述）。兩者都沒動全站 `.button` |
| 本機測試 | PASS | test-shell-vars、test-shell-tokens、test-pilot-token-consumption、test-gates、test-student-project-context、check-doc-hygiene 全過 |
| `FULL_STARTER_BUILD=1 verify-starter-export` | PASS | exit 0 |
| 響應式 QA | PASS | learning-lab 30/30、curator 30/30、coach 40/40（色票 A 與 C 各一），0 警告 |
| Student pack build／verify | PASS | 25 款全部匯出；知識／helper 建置在預設模式略過 |
| 釋出 G-11 | 不變差 | 來源樹寫死色掃描 1659 → 1561 |

## 3. 未涵蓋與備註

- 驗收 2、3 的子代理都沒有建置能力，其「驗證」欄皆自報 NOT TESTED；以上結果由我建置後比對得出，不採自報。
- 匯出器內嵌 `site.css` 字串的 `.layout-curator,.layout-collective{background:#eae4dc}` 與 collective 共用，留到批 3；該規則在批 2 轉換後的殘留偵測中沒有被觸及。
- 個性色政策 A 的視覺判斷（多色感是否保留）由作者看截圖決定，批 3 在此之前不動。
