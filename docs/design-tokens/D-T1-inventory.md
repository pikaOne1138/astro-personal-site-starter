# D-T1 設計值現況盤點

對應工單：ai-workbench「設計 Token 分層」D-T1（追蹤 Issue：pikaOne1138/ai-workbench#17）。本報告是唯讀盤點，沒有改任何版型。

- 產品基準：`main` @ `780635bc822cb72c922efbb3f1ec8c1c453ec88e`（2026-10-25）
- 數據由 `node scripts/audit-design-values.mjs --json docs/design-tokens/d-t1-inventory.json` 產生，可重跑；下表為同一指令的輸出。
- 掃描器的色值計數已用獨立的 grep／regex 對 25 款全部交叉核對（色值總數＝直接用＋區域 Token＋var() 後備值，25 款 0 差異）。這只驗證「掃描器數得準」，不驗證「畫面上真的有殘留」。

## 1. 「25 款」的定義

25 款 = `src/data/layout-assembly/definitions.mjs` 的 `layoutDefinitions`（25 筆，與 `src/pages/layouts/` 的 25 個版型目錄一一對應）。注意 `src/data/layout-directions.json` 只有 12 筆（最初的 12 款），不是這份清單。三種實作形態，匯出時進入學員站的檔案不同：

| 形態 | 款數 | 匯出的版型檔（本報告掃描範圍） |
| --- | ---: | --- |
| prototype-adapter（最初 12 款） | 12 | `src/data/layout-assembly/<slug>/Home.astro` |
| art-direction | 2 | `src/data/art-direction-adapters/<slug>/**`（subject-atlas、practice-compass） |
| native-expansion | 11 | `src/data/layout-assembly/expanded/<slug>/**` |

`src/pages/layouts/<slug>/` 是比較頁原型，不會匯出，數據只放 JSON 的 `prototype` 欄，不列入下表。共用檔（所有匯出站都帶）另列於第 3 節。

## 2. 逐版型數據（匯出的版型檔）

欄位定義：
- **寫死色（直接用）**：在屬性宣告（color／background／border／box-shadow 等）中直接寫字面色（hex、rgb/hsl 系列函式、white／black），不含 `var(--x, 後備)` 的後備值。這是 F-01 的核心指標。
- **不同色數**：上述直接寫死色中不同 hex 的個數（只計 hex）。
- **區域 Token 內的色**：寫在版型自己的自訂屬性定義（`--xxx: #…`）裡的字面色。有定義成變數，但來源是該版型自己寫的值，不來自品牌色票。
- **寫死字體**：`font-family`／`font` 簡寫宣告中沒有 `var()` 的個數（`font` 簡寫同時含字級，所以這欄偏高，是上界）。
- **寫死圓角／陰影**：border-radius（排除 0、50%）／box-shadow、text-shadow 沒有 `var()` 的宣告數。
- **消費共用 Token**：`var()` 參照到共用名稱（`--bg`、`--ink`、`--line`、`--accent`、`--brand-*`、`--ed-*`、`--chrome-*` 等）的次數。
- **chrome 版型專屬字面色**：`DesignChrome.css` 內該版型的 `body[data-site-family="<slug>"]` 規則中的字面色個數（只適用最初 12 款，見第 4 節）。

| # | 版型 | 類型 | 引擎 | 匯出檔數 | 寫死色(直接用) | 不同色數 | 區域 Token 內的色 | 寫死字體 | 寫死圓角 | 寫死陰影 | 消費共用 Token(次) | 區域 Token 定義(個) | chrome 版型專屬字面色 | 示例 |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | field-notes | knowledge | prototype-adapter | 1 | 5 | 4 | 0 | 8 | 3 | 0 | 0 | 4 | 3 | `src/data/layout-assembly/field-notes/Home.astro background:radial-gradient(ellipse 24% 40% at 63% 47%,transparent 60%,r` |
| 2 | essayist | knowledge | prototype-adapter | 1 | 4 | 4 | 0 | 6 | 0 | 0 | 2 | 2 | 3 | `src/data/layout-assembly/essayist/Home.astro background:linear-gradient(140deg,#cfbea9,#eee6d7 58%,#b0a28e)` |
| 3 | learning-lab | knowledge | prototype-adapter | 1 | 14 | 12 | 2 | 14 | 0 | 0 | 0 | 4 | 3 | `src/data/layout-assembly/learning-lab/Home.astro background:#45a667` |
| 4 | curator | knowledge | prototype-adapter | 1 | 21 | 16 | 3 | 17 | 0 | 2 | 0 | 4 | 3 | `src/data/layout-assembly/curator/Home.astro border-bottom:1px solid #c8c0bb` |
| 5 | radio-letter | knowledge | prototype-adapter | 1 | 34 | 25 | 0 | 8 | 0 | 2 | 1 | 1 | 4 | `src/data/layout-assembly/radio-letter/Home.astro background:#14222a` |
| 6 | reading-atlas | knowledge | prototype-adapter | 1 | 27 | 14 | 0 | 8 | 0 | 1 | 3 | 4 | 3 | `src/data/layout-assembly/reading-atlas/Home.astro background:#e8e4d8` |
| 7 | clinician | helper | prototype-adapter | 1 | 24 | 19 | 1 | 4 | 1 | 2 | 0 | 3 | 3 | `src/data/layout-assembly/clinician/Home.astro color:#53666b` |
| 8 | companion | helper | prototype-adapter | 1 | 4 | 4 | 0 | 5 | 1 | 0 | 4 | 2 | 3 | `src/data/layout-assembly/companion/Home.astro background:radial-gradient(ellipse at 67% 36%,#e5c3a8 0 14%,transparent` |
| 9 | somatic | helper | prototype-adapter | 1 | 0 | 0 | 8 | 3 | 0 | 0 | 3 | 14 | 3 |  |
| 10 | coach | helper | prototype-adapter | 1 | 23 | 16 | 0 | 7 | 0 | 0 | 1 | 1 | 3 | `src/data/layout-assembly/coach/Home.astro background:linear-gradient(130deg,#eed35f,#f37443 55%,#1e3c55)` |
| 11 | collective | helper | prototype-adapter | 1 | 32 | 24 | 0 | 7 | 1 | 1 | 1 | 1 | 3 | `src/data/layout-assembly/collective/Home.astro background:linear-gradient(45deg,#dfb5a4 0 25%,#b8d4d0 25% 50%,#e4d08a ` |
| 12 | trust-path | helper | prototype-adapter | 1 | 49 | 21 | 0 | 6 | 0 | 0 | 1 | 4 | 3 | `src/data/layout-assembly/trust-path/Home.astro background:#f5f4ee` |
| 13 | subject-atlas | knowledge | art-direction | 6 | 1 | 0 | 0 | 10 | 0 | 0 | 23 | 0 | 0 | `src/data/art-direction-adapters/subject-atlas/Home.astro color:white` |
| 14 | practice-compass | helper | art-direction | 6 | 4 | 4 | 0 | 9 | 0 | 0 | 29 | 0 | 0 | `src/data/art-direction-adapters/practice-compass/Home.astro color:#fff!important` |
| 15 | sidebar-journal | knowledge | native-expansion | 1 | 0 | 0 | 0 | 6 | 0 | 0 | 14 | 3 | 0 |  |
| 16 | editorial-frontpage | knowledge | native-expansion | 1 | 0 | 0 | 1 | 4 | 0 | 0 | 17 | 1 | 0 |  |
| 17 | card-journal | knowledge | native-expansion | 1 | 0 | 0 | 0 | 7 | 0 | 0 | 29 | 1 | 0 |  |
| 18 | visual-stories | knowledge | native-expansion | 1 | 0 | 0 | 0 | 7 | 0 | 0 | 20 | 2 | 0 |  |
| 19 | compact-dispatch | knowledge | native-expansion | 1 | 0 | 0 | 0 | 7 | 0 | 0 | 20 | 2 | 0 |  |
| 20 | split-reader | knowledge | native-expansion | 1 | 0 | 0 | 0 | 7 | 0 | 0 | 20 | 2 | 0 |  |
| 21 | portrait-profile | helper | native-expansion | 1 | 1 | 1 | 0 | 4 | 0 | 0 | 20 | 3 | 0 | `src/data/layout-assembly/expanded/portrait-profile/Page.astro border:1px solid #aab9ac` |
| 22 | service-catalogue | helper | native-expansion | 1 | 0 | 0 | 0 | 5 | 0 | 0 | 24 | 2 | 0 |  |
| 23 | studio-chapters | helper | native-expansion | 1 | 0 | 0 | 0 | 6 | 0 | 0 | 17 | 2 | 0 |  |
| 24 | editorial-practice | helper | native-expansion | 1 | 0 | 0 | 0 | 7 | 0 | 0 | 20 | 2 | 0 |  |
| 25 | question-led-practice | helper | native-expansion | 1 | 0 | 0 | 0 | 7 | 0 | 0 | 20 | 2 | 0 |  |

合計（25 款匯出版型檔）：直接寫死色 **243**（最初 12 款 237、art-direction 2 款 5、native-expansion 11 款 1）；區域 Token 內的色 15；寫死字體 179（上界）；寫死圓角 6；寫死陰影 8。

## 3. 共用檔（每個匯出站都帶，不屬於單一版型）

| 檔案 | 直接寫死色 | 區域 Token 內的色 | 寫死字體 | 備註 |
| --- | ---: | ---: | ---: | --- |
| `layout-assembly/DesignChrome.css` | 5 | 36 | 5 | 12 款的 header／footer 色（見第 4 節） |
| `layout-assembly/DesignInterior.astro` | 0 | 36 | 8 | 12 款的內頁色（`--fp-*`，見第 4 節） |
| `layout-assembly/ServiceSections.astro` | 0 | 0 | 14 | 只寫死字體 |
| `layout-assembly/AboutSections.astro` | 0 | 0 | 30 | 只寫死字體 |
| `layout-assembly/ArticleArchive.astro` | 0 | 0 | 17 | 只寫死字體 |
| `layout-assembly/ArticleDetail.astro` | 0 | 0 | 18 | 只寫死字體 |
| `src/styles/editorial-tokens.css` | 0 | 8 | 0 | 現有唯一的獨立 Token 檔（`--ed-*`，39 行） |
| `src/layouts/DirectionLayout.astro` | 3 | 0 | 2 | 比較頁用，不屬學員站 |
| `art-direction-adapters/shared/site.css` | 2 | 5 | 3 | art-direction 兩款的基底樣式 |
| 匯出器內嵌的 `public/site.css`（`scripts/export-starter.mjs`） | 4 | 3 | 1 | 色票在這裡被覆寫成 `--bg`、`--ink`、`--brand-*`（匯出器第 331–334 行） |

完整逐檔數據見 JSON 的 `shared` 與 `exporterSiteCss`。

## 4. 主要發現

**發現 A：最初 12 款的 header／footer 與內頁以「版型專屬字面色」蓋掉學員色票（F-01 的直接證據）。**
- `DesignChrome.css` 第 12、15、18、21、24、27、29、31、33、35、38、40 行：12 款各有一條 `body[data-site-family="<slug>"]{--chrome-panel:#…;--chrome-text:#…;--chrome-accent:#…}`。基底規則（第 3 行）原本把 `--chrome-accent` 指向 `--brand-primary`，但每個家族規則以字面色覆蓋。header 按鈕（第 11 行 `background:var(--chrome-accent)`）因此不跟品牌主色走。
- `DesignInterior.astro` 第 41–52 行：12 款各有一條 `.family-page[data-design-family="<slug>"]{--fp-bg:#…;--fp-ink:#…;--fp-accent:#…}`。基底（第 34 行）指向 `--bg／--ink／--brand-primary`，家族規則同樣蓋掉。這與工單「現況盤點」所記水獺站換色時還要逐一映射內頁 `--fp-bg` 相符。
- 影響：換 `brand.palette` 時，這 12 款的 header、footer、內頁（文章、關於、服務）不會跟著變；首頁是否變取決於各 Home.astro 的 237 處直接寫死色。

**發現 B：somatic 只有首頁完成語意化，周邊仍寫死。** somatic 的 Home.astro 直接寫死色為 0（PR #78 的成果），但同一版型在 `DesignChrome.css` 第 33 行（`#243e31`／`#efecda`／`#8e6f40`）與 `DesignInterior.astro` 第 49 行（`#243e31`／`#efecda`／`#cfbd95`）仍是字面色。它的 Home.astro 還有 8 個區域 Token 內的字面色（`--somatic-on-dark` 等深底上的固定字色）與 14 個 `--somatic-*` 區域定義；詞彙是 somatic 專屬，不是共用詞彙。

**發現 C：詞彙不統一（F-02）。** 12 款最初版型各用自己的前綴：`field-*`、`essay-*`、`ll-*`、`cu-*`、`atlas-*`、`clinical-*`、`companion-*`、`somatic-*`、`station-*`/`route-*`，sidebar-journal 用 `j-*`；radio-letter、coach、collective 幾乎沒有區域 Token（直接寫死 34／23／32 處）。共用名稱只有 `--bg／--ink／--line／--accent／--brand-*`；`--ed-*`（editorial-tokens.css）在這 25 款的匯出版型檔中沒有任何檔案參照（grep `--ed-` 於 25 款的匯出檔：0 個檔案）。

**發現 D：兩個新世代形態已接近乾淨。** art-direction 兩款共 5 處直接寫死色、native-expansion 11 款共 1 處（portrait-profile 的 `border:1px solid #aab9ac`），且大量消費共用名稱（14–29 次）。它們是可複製的目標形態；問題集中在最初 12 款加上它們共用的 chrome／interior 檔。

**發現 E：寫死圓角與陰影很少（6／8 處），寫死字體很多。** 字體欄是上界（含字級）。字體在目前產品裡由 `--brand-heading-font`／`--brand-body-font` 承載，但版型多以字面 `font-family` 或 `font` 簡寫使用；D-T2 需決定是否把字體族與字級拆開。

## 5. 對試點選擇的支撐（建議，待作者核准；不是決定）

排序依據：直接寫死色多寡、是否代表一整類結構、修一次能帶動多少款。

- 最初 12 款共用 `DesignChrome.css` 與 `DesignInterior.astro`：這兩個檔改成消費 Token 後，12 款的 header／footer／內頁一次受益。試點若選最初 12 款其中之一，必然要動這兩個共用檔，風險與效益都最大。
- 新世代（art-direction／native-expansion）13 款幾乎乾淨，適合作為「目標形態對照」而非試點：選它們無法證明「從寫死到 Token」的轉換可行。

詳細試點建議見 Issue #17 的 D-T1 回報留言。

## 6. 限制（未測／未量）

- **NOT TESTED：渲染驗證。** 本報告是靜態掃描，沒有建置匯出站、沒有換色後截圖。「換 Token 後畫面是否殘留舊色」要到 D-T3 的驗收 1 才會有證據。
- 未量測：間距與字級字面值、對比度、JS 內的樣式字串、`.astro` 模板中 `style`／SVG 顏色屬性以外的內嵌顏色（例如 `<img>` 的 `filter`）、`set:html` 注入的樣式。
- `var()` 參照分類（共用／區域／other）以名稱前綴判定；`other` 是前綴不屬於已知共用名稱者（例如 `--serif`），數量見 JSON。D-T2 定案詞彙時需逐一歸類，這份數字不應直接當 Token 覆蓋率。
- 掃描器只吃 `.astro` 的 `<style>`、`style=""` 與 `fill／stroke／stop-color` 屬性及 `.css` 檔；色名只認 `white`／`black`。
- 比較頁原型（`src/pages/layouts/`）的數據在 JSON 的 `prototype` 欄，不進本報告結論。

## 7. 重跑

```
node scripts/audit-design-values.mjs --json docs/design-tokens/d-t1-inventory.json --md /tmp/table.md
```

`scanCss()` 是匯出函式，D-T5（G-11）會直接重用它，不另建平行掃描器。
