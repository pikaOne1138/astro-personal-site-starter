# CSS 結算層級稽核報告：抓「上層改了、某處因結算層級沒跟著改」這一整類問題

對應：PR #97（殼階段 2）同一支 PR 內落地。程式：`scripts/audit-css-resolution.mjs`（稽核）、`scripts/test-css-resolution.mjs`（靜態對照組與分類紀律，併入 `npm run build`）、`scripts/css-resolution-classification.json`（分類檔，目前為空）；整站版在 `verify-starter-export` FULL（也就是 CI `standalone-build`）。

## 1. 缺口是什麼

CSS 自訂屬性在「宣告它的元素」就結算，並以結算後的值往下繼承。殼階段 1 的 `--line` 是：

```
:root { --ink:#242a24; --bg:#f4f1e8; --line: color-mix(in srgb, var(--ink) 25%, var(--bg)); }   /* site.css */
<body style="--ink:<色票文字色>; --bg:<色票底色>">                                                   /* SiteLayout */
```

站長改色票，只改得到 body 上的 `--ink`／`--bg`；`--line` 在 `:root` 已經用預設值結算完，body 的新值傳不上去，所以它對任何色票都是同一個顏色。現行檢查（逐元素算出值比對、殘留偵測、G-11 字面值）都抓不到：值不是字面值、算出的樣式也「一致」（因為新舊都凍結），而殘留偵測只看「不變且非中性」的顏色，且在已知是固定的版型上不會被當成問題。

## 2. 檢查（可重跑，兩部分）

**靜態**（`staticFindings`）：讀建置後 dist 的全部 CSS（含 `tokens.css`、`theme.css`、`<style>`、行內 `style=""`），列出每一個公式型自訂屬性（值含 `var()`／`color-mix()`）、它的宣告層、與它每一個原料變數在任何地方的宣告層。層級：`:root`／`html`＝0，`body`（含屬性選擇器、行內 body style）＝1，其他元素／元件／樣板容器＝2。**公式宣告層高於任一原料的宣告層，列為嫌疑**（上層結算，下層改不到）。後備值裡的變數只有在「前導變數在公式層或更高層沒有任何宣告」時才算原料——否則後備值不可達，不影響結果。這是檢查器的精準度，不是放行：它由 `test-css-resolution` 的對照組固定（可達的後備值照樣被抓）。

**動態**（`dynamicFindings`）：同一站、同一份計畫，只換色票（預設色票 A 與每個角色都不同的色票 D），各建置一次，逐頁（首頁、各一層頁面、再補較深頁面，上限 10 頁，1440 與 390 兩個寬度）逐元素（含 `::before`／`::after`）比對 `color`、`background-color`、四邊 `border-*-color` 的算出值。凡是**匹配的規則裡有宣告到該屬性且值含 `var()`**（直接或經派生源自 Token）、算出的可見顏色卻**跨色票不變**的，列為嫌疑。純黑、純白、全透明不算（`on-primary` 之類的自動黑白在兩組色票下可能相同）。字面值（規則裡沒有 `var()`）不在這裡：那是 G-11 與殘留偵測的範圍。

分類（`css-resolution-classification.json`）：只收**刻意固定**與**裝飾不存在**，每筆要有理由（≥10 字）與追蹤編號（`pikaOne1138/ai-workbench#NN`）；**真漏不得登記，必須修**；沒有被任何項目涵蓋的嫌疑 → 檢查失敗；沒有預設放行。

## 3. 先證明檢查有效：對 `main`（修前，殼階段 2 之前）

| 結果 | 內容 |
| --- | --- |
| 靜態：FAIL（抓到 `--line`） | `--line（:root）= color-mix(in srgb,var(--ink) 25%,var(--bg))`；原料 `--ink`、`--bg` 在 `<body style="">`（body 層）另有宣告。13 款殼全部命中，其他變數 0 |
| 動態：FAIL（抓到 `--line` 邊線） | 18 組（勝出規則×屬性），全是 `border-… : 1px solid var(--line)`（`.pattern-slot .ab-feature`、`.sp-section`、`details`、`th, td`、各版型的 aside／topics 等），涵蓋 5 款殼（subject-atlas、practice-compass、sidebar-journal、editorial-frontpage、studio-chapters；其餘 8 款雖然有同一個 `--line` 公式，在比對的頁面上沒有出現被凍結的 `--line` 邊線）。比對 23,040 個屬性，其中只有 `--line` 被列出——沒有其他誤報 |
| 整支檢查（`auditSite`）對 `main` 建好的殼站 | **FAIL**，訊息列出上面兩項 |
| 對照組（`selfTestCssResolution`，FULL 內執行） | 凍結的 `--line` 寫法：靜態與動態都必須抓到；公式與原料同層的修好寫法：兩者都必須通過；隨色票改變的顏色不得被列為嫌疑 |

## 4. 完整清單（兩種宿主都掃：13 款殼＋12 款 prototype，色票 A vs D）

**修前（`main`）**

| # | 嫌疑 | 宿主 | 分類 | 處置 |
| --- | --- | --- | --- | --- |
| 1 | `--line`（`:root` 公式）⟵ `--ink`、`--bg`（`<body style>` 注入） | 殼（13 款） | **真漏** | 殼階段 2 已修（見第 5 節） |
| 2 | 動態：18 組 `var(--line)` 邊線跨色票不變 | 殼（5 款） | **真漏**（同 #1 的結果） | 同上 |
| — | prototype：靜態 0、動態 0 | prototype（12 款） | — | 不需處置 |

刻意固定：0 項；裝飾不存在：0 項（分類檔為空）。**清單沒有超出殼的範圍**，所以沒有需要停下回報的項目。

**修後（本 PR）**：靜態 0、動態 0——先以 25 款建置站（色票 A vs D）驗證，再由 `verify-starter-export` FULL 在每一款（13 款殼＋12 款 prototype，含加了文章與程式碼區塊的內容）各自重建一份換色票版本實測，整輪 exit 0。

**FULL 第一次完整跑出的一項（prototype、殼範圍之外）——請看過這個判斷**：`.story-prose pre { border:1px solid var(--sr) }`（`ArticleDetail.astro`），出現在有程式碼區塊的 5 款知識型 prototype（curator、essayist、learning-lab、radio-letter、reading-atlas）。`--sr` 是 `color-mix(in srgb, currentColor 25%, transparent)`；Shiki 的 `github-dark` 程式碼區塊自己設定前景色 `#e1e4e8`，所以框線是它自己前景色的 25%，與站長色票無關。**它不是「源自色票 Token」的顏色**，是第三方程式碼高亮主題的固定深色方案，所以不是缺陷。我把動態檢查的定義收緊成它本來該有的樣子：**var() 鏈（經自訂屬性宣告往下展開）必須碰到至少一個會隨色票改變的變數**（`:root`／`body` 算出值跨色票不同者）才列；只到 `currentColor` 的不列，並寫進對照組（同頁有會變的變數也不能讓它被誤判）。收緊後，對 `main` 的 `--line` 仍然 12 組全抓（subject-atlas 為例），FULL 整輪 0 項。**我沒有改任何 prototype 檔案，也沒有登記放行**；若你要把這一項當成需要處理的設計（例如讓程式碼區塊框線跟色票走），那是殼範圍外的變更，請明說。

**精準度揭露（我自己的過程，請看過）**：第一版靜態檢查把「後備值裡的變數」也算原料，因而多列了 `--chrome-accent`、`--student-family-accent`（4 款 prototype：coach、collective、radio-letter、trust-path；公式 `var(--brand-primary,var(--brand))`，`--brand` 被各版型 `.xx-shell` 區域覆寫）。分析結果它們不是缺陷：`--brand-primary` 由 `theme.css` 在 `:root` 永遠宣告，後備值 `var(--brand)` 不可達，且那些區域覆寫的值本來就等於 `--color-primary`。我把檢查改成「後備值只有在前導變數沒有宣告時才算原料」並加了對照組，**為此沒有改任何 prototype 檔案，也沒有登記放行**。若你認為 prototype 契約檔那一行（`src/styles/component-contract.css` 的 `--student-family-accent`）也該改成與殼一致的 `var(--color-primary)`，那是殼範圍之外的變更，請明說，我再做。

## 5. 修法原則與這次的修法

原則：**公式的宣告層不高於原料的覆寫層**——移注入點或移公式，二擇一貫徹；不釘字面值、不加 `design-fixed` 豁免。

殼階段 2 採「移注入點」：色票不再由 `<body style>` 注入，改由 `theme.css`（`:root`）提供，殼 CSS 一律讀 L1 Token；`--line` 保持 25% 的 L2 派生，與原料同在 `:root` 結算，換色票時跟著變。

## 6. 驗收

| 項目 | 結果 |
| --- | --- |
| 對 `main` 修前：整支檢查 FAIL 且列出 `--line` | PASS（第 3 節） |
| 本 PR 修後：靜態 0、動態 0，整支檢查 PASS | PASS（subject-atlas-A、coach-A 與全 25 款清單） |
| 併入 CI | `test-css-resolution`（靜態對照組、分類紀律）在 `npm run build`；整站靜態＋換色票傳播在 `verify-starter-export` FULL（`standalone-build` job），每款殼與 prototype 各多建置一份換色票版本 |

## 7. 涵蓋限制（請知道）

- 動態稽核只看靜止狀態的算出值：`:hover`／`:focus`／`:active` 等狀態規則、`box-shadow`／`text-decoration-color`／`outline-color`／SVG `fill`／`stroke` **沒有比對**（靜態公式檢查仍涵蓋這些屬性背後的公式）。
- `/search/` 頁（pagefind 載入後由腳本插入內容，兩次載入的元素數不同）無法逐元素對齊，列為 skipped，沒有比對；其他頁面最多 10 頁。
- 只比對 palette A 與 D 兩組；兩組都落在同一個純黑／純白（例如 `on-primary` 自動黑白）的顏色視為中性，不列。
- 靜態層級只分 root／body／element 三層；元素層內的巢狀覆寫（元件區塊內再覆寫）算同一層，不細分祖孫關係。
