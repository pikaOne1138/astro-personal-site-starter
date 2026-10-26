# 殼裝飾設計案報告：外框跟著色票走

對應工單：ai-workbench「設計 Token 分層」之後的設計案（Issue #17 已結案；作者 2026-10-26 決定開工）。基準：`main` @ `1f810c8`。
範圍（作者指定）：13 款殼（art-direction 2＋native-expansion 11）的**選單、hover、樣板裝飾、頁尾裝飾**。要求：由學員色票派生、走 Token 系統、宣告層照 TOKEN-SPEC §12、過 CSS 結算層級稽核、不釘字面值；內容區既有渲染不得被裝飾以外的因素改變；學員端不新增任何操作。

## 1. 設計說明

一套裝飾，只用 L1 語意 Token 組成，換色票時整個外框一起變色；形狀（框、陰影、線寬）固定，顏色全來自色票。值只寫在殼的宿主契約 `src/data/art-direction-adapters/shared/component-contract.css`（共用元件不改，只換值）。

| 位置 | 契約變數 | 值 | 看起來是什麼 |
| --- | --- | --- | --- |
| 下拉選單 | `--student-nav-menu-bg`／`-fg` | `--color-surface`／`--color-content` | 選單面板與頁面同底、字色同內文 |
| | `--student-nav-menu-border` | `1px solid var(--color-line)` | 內文色 20% 混底色的細框（與 prototype 相同的 L1 Token） |
| | `--student-nav-menu-shadow` | `0 14px 28px color-mix(content 9%, transparent)` | 淡陰影，讓面板浮起來 |
| hover | `--student-nav-hover-bg` | `color-mix(primary 10%, transparent)` | 主色 10% 淡染；導覽項滑過時出現 |
| 樣板區段 | `--student-pattern-rule` | `3px solid var(--color-primary)` | 樣板（精選作品、服務路徑等）區段頂線改為主色粗線 |
| | `--student-pattern-bg` | `--color-surface` | 與頁面同底（見 §4：不加底色的理由） |
| 頁尾 | `--student-footer-rule` | `2px solid var(--color-primary)` | 頁尾頂端主色細線 |
| | `-editorial-bg`／`-professional-bg`／`-minimal-bg`／`-professional-fg` | `color-mix(primary 10%, surface)`／`--color-inverse-surface`／`--color-surface`／`--color-on-inverse` | 與 `site.css` 既有的頁尾底色一致（殼本來就跟色票）；契約值只是不再是中性值 |

樣板的實際接線：殼的樣板是 `.pattern-slot`（`ContentPatterns.astro`），不是共用元件 `.student-pattern`，所以 `.pattern-slot` 的底與區段頂線改讀契約變數（原本寫死 `--color-surface` 與 `1px solid var(--line)`）。其餘樣板內部的細線（`.ab-feature`、`dl>div`）維持 `--line`，不動。

## 2. 宣告層（TOKEN-SPEC §12）

- 所有裝飾公式（`--student-*`）宣告在 `:root`（宿主契約檔）；原料——`theme.css` 的色票、`tokens.css` 的 L1——也都在 `:root`。公式層級不高於任一原料的覆寫層。
- **稽核真的擋下過一次（設計過程中的對照）：** 第一版選單框線寫 `1px solid var(--line)`（殼的 L2 `--line`）。靜態稽核在 card-journal 與 compact-dispatch 各報 1 筆：`--student-nav-menu-border`（`:root`）讀 `--line`，而 `.cards`／`.direction` 在元素層級局部覆寫了 `--line`（公式層級高於原料覆寫層）。選單不在那些區塊內，實際上沒有錯誤，但規則是構造性的、不憑「這次剛好沒事」放行，所以改讀 L1 的 `--color-line`（沒有任何版型局部覆寫它，也與 prototype 的選單框線同一個 Token）。修後 13 款靜態 0 筆。沒有登記分類檔、沒有釘字面值。
- 內容 `--line` 本身不動（階段 2 的 L2 派生，內容區的線仍用它）。

## 3. 驗證

### 3.1 稽核與檢查

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| CSS 結算層級稽核（靜態＋動態，13 款 × 色票 A 對 D 重建） | PASS：靜態 0、動態 0 | `audit-css-resolution` 的 `staticFindings`／`dynamicFindings` 逐款輸出（13 款全 0） |
| 稽核負向對照（把色票注入從 `:root` 改到 `body`，同一份 practice-compass 的 dist） | 稽核**擋下**：靜態 7、動態 39（其中含 `.pattern-slot{background:var(--student-pattern-bg)}`、`.student-footer--footer-minimal` 等裝飾規則） | 證明稽核對這批新裝飾有效，不是空轉 |
| `test-shell-vars`（已更新） | PASS | 殼契約每個值只能讀 L1 `--color-*`／`--font-*`、不得有色碼／rgb／hsl／色名、裝飾值不得再是中性值；含負向對照 |
| 其他本機測試 | PASS | test-css-resolution、test-pilot-token-consumption、test-gates、test-release-readiness、test-starter-route-contracts、test-student-project-context、check-doc-hygiene |

### 3.2 內容區不被裝飾以外因素改變

方法：改前（`main`）與改後各以同一份設定匯出並建置 13 款殼 × 3 組色票（A 綠、C 深色、D 洋紅）；`cmp6.js` 對每站首頁加至多 6 個一層路由、桌機 1440＋手機 390、選單展開，逐元素比對算出樣式（含 `::before`／`::after`、色彩／邊框／陰影／輪廓／字型／間距／寬高）與 hover／focus 狀態，並把每個差異歸入區域：選單面板、導覽（hover 底）、樣板、頁尾、「含裝飾區的祖先」（只允許高度變動）、其他內容。

驗收條件：**其他內容區的差異＝0；祖先只准有尺寸（因樣板／頁尾頂線變粗而下移）；導覽只准 hover 底色；選單／樣板／頁尾差異只能落在裝飾屬性。**

### 3.3 比對結果

| 項目 | 結果 |
| --- | --- |
| 範圍 | 13 款 × 3 色票＝39 站；462 頁次（每站首頁＋至多 6 條一層路由 × 桌機／手機）；28,554 個元素節點；16,134 個 hover／focus 狀態 |
| **其他內容區差異** | **0**（所有差異都歸在下列裝飾區域） |
| 祖先（含樣板／頁尾／選單的容器） | 只有「尺寸」差異（1,692 筆，因樣板頂線 1→3px、頁尾頂線 0→2px 而高度下移） |
| 導覽（hover 底） | 只有 `backgroundColor`（231 筆 hover 狀態＋3,036 筆導覽元素在 hover 狀態下的底色） |
| 選單面板 | 底色、框（寬度／樣式／顏色）、陰影、尺寸（面板加框後內縮 2px） |
| 樣板區段 | 頂線顏色／寬度（198 筆）與其尺寸（594 筆） |
| 頁尾 | 頂線顏色／寬度／樣式（462 筆）與其尺寸 |
| 比對器負向對照 | 在一份新站 dist 偷加 `h1{color:#c00}` 與 `.site-header a{padding-left:9px}`：比對器報出 75 筆「內容區」差異（h1 上 10 筆），分析腳本判為裝飾外 → 比對器會抓到 |

不是 0 差異的整體比對（裝飾本來就要變），而是「差異只准出現在裝飾區域與裝飾屬性」的區域化比對；裝飾區域以外為 0。選單／樣板／頁尾內部的非裝飾屬性（字色、字型、間距）沒有變化（上表未列出的屬性＝0）。

### 3.4 前後截圖

每款一張桌機（1440）、一張手機（390）；每張並排四格：色票 A 改前／改後、色票 D 改前／改後；首頁，選單展開、hover 第一個導覽項，含樣板與頁尾。

位置：`docs/design-tokens/shell-decor/<版型>-desktop.jpg`、`<版型>-mobile.jpg`（13 款×2＝26 張）。

## 4. 取捨與未涵蓋

- **樣板不加底色。** 試過樣板區段淡染主色 6%：樣板區段的文字緊貼區段左緣（區段沒有左右內距，是既有版面），加底色後文字貼著色塊邊緣、看起來擁擠；要加內距就會改動樣板內部換行與尺寸，違反「內容區不被裝飾以外因素改變」。所以樣板裝飾只做主色頂線，底維持與頁面同色。若作者之後想要底色，需另決定樣板的內距。
- 殼的樣板不是 `.student-pattern`（那個只在 prototype 宿主出現），所以契約的 `--student-pattern-*` 在殼上靠 `.pattern-slot` 接線；頁尾的 `--student-footer-*-bg` 被 `site.css` 既有的 `[data-assembled-layout]` 規則蓋過（兩者值相同）；這些重複不是新增的，沒有動。
- 頁尾「專業」款是深色底，頂端 2px 主色線在深底上不明顯，這是預期，不另加強。
- 選單框線與 prototype 同讀 `--color-line`（內文 20%），比殼內容區的 `--line`（25%）略淡；不同層級、不同用途，不統一。
- 只驗證首頁加一層路由；更深的路由（文章內頁）只在 hover／選單狀態上與頁尾共用同一份裝飾，沒有另外取樣。
- 沒有真人視覺驗收；截圖是機器擷取，審美判斷在作者。
- 已匯出的站不更動；舊站要吃到新裝飾需走 `component-contract.css` 的差異預覽與核准（TOKEN-SPEC §8）。
- 學員端沒有新增任何操作：改色票的方式不變（改 `site.config.json` 的 brand，重新產生 `theme.css`）。
