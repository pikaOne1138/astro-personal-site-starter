# D-T3 擴展 批 3 報告：radio-letter、collective、trust-path Token 化＋新漸層推導

對應工單：ai-workbench「設計 Token 分層」D-T3 擴展；追蹤 Issue pikaOne1138/ai-workbench#17。
基準：`main` @ `63709eb`（批 2 已合併）。作者已核准新漸層推導（實驗截圖見 Issue #17）。

## 1. 範圍與結果

| 版型 | 做法 | 換色殘留（色票 A vs D，轉換前 → 後） |
| --- | --- | ---: |
| radio-letter | 深色底取 `inverse-surface`／`on-inverse`；銅色、青色以 `color-mix()` 推導；版型區域變數 `--rl-*`；同心圓與條紋用新漸層寫法 | 見下方合計 |
| collective | `--color-primary／accent／secondary` 推導色塊與卡片底；宣言帶取 primary／on-primary；四色拼貼改為主色→輔色→強調色→混色的硬邊色帶（oklch） | 見下方合計 |
| trust-path | 主視覺與結尾取 `inverse-surface`；路徑軌道取 secondary；版型區域變數 `--tp-*` | 見下方合計 |

三款合計換色殘留 **1635 → 0**（`m12old` → `m12new`，每款 ≥ 3 條路由 × 1440／390，色票 A vs D）。

家族共用規則：`DesignChrome.css`、`DesignInterior.astro` 三款家族改為 Token 推導；`AboutSections／ServiceSections／ArticleDetail` 的三款專屬規則字族改取 `--font-*`。

**新漸層推導（同步套用到 coach）**：`linear-gradient(<角度> in oklch, var(--color-primary), var(--color-secondary), var(--color-accent))`——主色→強調色為主軸，輔色為中間站，三色取滿值，不再與 surface／content 混色。coach 的兩處漸層一併改寫；全站其餘版型沒有受影響。

**curator／collective 共用背景規則**：匯出器骨架 `site.css` 的 `.layout-curator,.layout-collective{background:#eae4dc}` 與 `.layout-radio-letter{background:#29251f;color:white}` 改用骨架自己的 `--brand／--bg／--ink` 推導（`color-mix(brand 10%, bg)`、`var(--ink)`／`var(--bg)`），不再有寫死色。真實版型不渲染這個骨架 class，所以三款的算出樣式不受影響。

沒有新增全域名稱。`test-pilot-token-consumption.mjs` 的 PROTOTYPE 清單與匯出迴圈納入三款（現為 12 款全數）。

## 2. 驗收

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 驗收 1 換色殘留 | PASS | 三款 1635 → 0 |
| 其餘版型不受影響 | PASS | 25 款 × 色票 A／C／D 逐元素算出樣式（含偽元素、hover、focus）新舊比對：21 款 × 3 色票 0 差異；對照組：自比 0、A vs D 1200 差異 |
| 變動版型的差異性質 | PASS | radio-letter／collective／trust-path：只有顏色、字族、陰影、背景圖；coach：只有 `.move-art` 背景圖（新漸層）；DOM 與狀態數量 0 差異 |
| 驗收 2 行為實測（trust-path，Haiku＋Sonnet） | PASS（範圍） | 需求「首頁最上面那塊深色底淡一點」：兩者 `git diff` 都只動 `Home.astro`；建置後比對 6 頁，只有首頁 hero 區（背景、路線圓點、kicker／簡介文字色）變化，結尾條與其他頁 0 差異。兩者都用版型區域變數而非改全域 Token |
| 驗收 3 行為實測（trust-path，Haiku＋Sonnet） | PASS | 需求「只有首頁的按鈕要大一點」：兩者都只放大 `.trust-cta`；其餘 5 頁 0 差異；全站 `.button` 未動 |
| 本機測試 | PASS | test-shell-vars、test-shell-tokens、test-pilot-token-consumption、test-gates、test-student-project-context、check-doc-hygiene |
| `FULL_STARTER_BUILD=1 verify-starter-export` | PASS | exit 0 |
| 響應式 QA | PASS | radio-letter 30/30、collective 40/40、trust-path 40/40（色票 A、C 各一），0 警告 |
| Student pack build／verify | PASS | 25 款匯出；知識／helper 建置在預設模式略過 |
| 釋出 G-11 | 不變差 | 來源樹寫死色掃描 1561 → 1414 |

## 3. 發現與備註

1. **我自己的一個失誤，已被比對抓到並修正。** 第一版轉換時，用來改家族規則的輔助函式對 `DesignChrome.css`／`DesignInterior.astro` 整檔做了字族正規化，順帶改到其他家族的字族（field-notes 等的 `/about` 出現 36 筆 fontFamily 差異）。逐元素比對發現後，兩檔回復並只做精準取代，最後一輪 21 款 × 3 色票全部 0 差異。
2. 子代理在 trust-path 的 `Home.astro` 發現幾處選擇器多了一個空格（`. trust-hero-copy`、`. trust-figure img`、`. trust-section a`），這幾條規則因此從未生效。這是既有問題，collective、radio-letter 的 `Home.astro` 也有同樣寫法（`. common-hero-copy`、`. radio-hero-copy`）；修正會改變算出樣式，不屬於 Token 化範圍，**未動**，列為後續案候選。
3. `ArticleDetail.astro` 內一條多家族共用規則（`.story-letter>span, … .story-collective>span …`）仍含 `ui-monospace` 字面值；改它會改變其他家族的算出字族，留給殼階段 2 的字族 Token 化。
4. 預設色票本身彩度偏低（輔色為灰綠），新漸層的彩度上限由色票決定；這是新推導的已知天花板，不是缺陷。

## 4. 未涵蓋

- 殼階段 2、D-T7、Issue #22（別名拆檔）照原順序，尚未動工。
