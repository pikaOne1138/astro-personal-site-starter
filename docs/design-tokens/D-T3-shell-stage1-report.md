# D-T3 殼版型 階段 1 報告：13 款殼載入 `tokens.css`／`theme.css`

對應工單：ai-workbench「設計 Token 分層」D-T3 擴展前置；追蹤 Issue pikaOne1138/ai-workbench#17。作者核准：選 B，階段 1 只加載 tokens、全狀態真 0 差異（不接受 hover 例外，也不接受在殼 CSS 上加覆寫壓回去）。
基準：`main` @ `ec29ebf`。

## 1. 休眠／碰撞掃描（先給清單與結論）

方法：對 13 款殼版型**建置後實際載入的 CSS**（dist 全部 html 的內嵌 `<style>`、`style=""`、連結的 css，不含 `tokens.css`／`theme.css`）掃全部 `var(--*)` 引用，對照宿主在載入 Token 之前就有的定義（`<body style>` 的殼變數、`site.css`、版型與元件自己的區域變數），再對照 `tokens.css`／`theme.css` 會新增的定義。靜態掃描以名稱為單位，作用域層級再用瀏覽器動態檢查補上（同一份 dist 擋掉 `tokens.css`／`theme.css` 的請求＝載入前的實際狀態，查每個引用 Token 專屬變數的元素是否已有值）。13 款 × 色票 A、色票 A 路由全頁 × 1440／390＝190 次頁面載入。

**A 休眠啟用（有引用、載入前未定義、載入後被定義）— 修前 11 個名稱、共用元件 3 組（導覽、樣板與頁尾、家族元件）＋ 1 處版型字族，修後 0**

| 變數 | 引用處（宣告） | 影響元素 |
| --- | --- | --- |
| `--color-content` | StudentNavigation：子選單字色、子選單陰影、**連結／summary hover 底色** | 13 款 |
| `--color-line` | StudentNavigation：子選單邊框 | 13 款 |
| `--color-surface` | StudentNavigation：子選單底；SelectedPatterns：區段樣板底、minimal 頁尾底 | 13 款 |
| `--color-primary` | SelectedPatterns：頁尾頂線、區段樣板頂線 | 13 款 |
| `--color-surface-alt` | SelectedPatterns：editorial 頁尾底 | 5 款（用到該頁尾的站） |
| `--color-inverse-surface`、`--color-on-inverse` | SelectedPatterns：professional 頁尾底與字色 | 4 款 |
| `--font-body` | subject-atlas 的 `.atlas` 字族（帶後備值，效果等值） | 1 款 |
| `--brand-heading-font`、`--brand-body-font`、`--brand-primary` | 家族元件 DesignInterior／ArticleArchive／ArticleDetail（殼的**文章列表與文章頁**：`.family-page`、`.family-intro h1`、`.family-body h2`、`.practice-index h2`、`.story-neighbors strong`；5 個檔共 21 處引用）。帶後備值，載入後字族會從 `Georgia,serif`／`system-ui,sans-serif` 變成品牌字族 | 1 款（practice-compass 保留種子文章列表；其他殼版型有自己的文章頁） |

**結論：hover 不是唯一的啟用點。** 啟用點橫跨四處：StudentNavigation（子選單 4＋hover 1）、SelectedPatterns（樣板與頁尾 7）、家族元件的字族與強調色（5 個檔 21 處引用）、subject-atlas 字族 1 處。第一版只看 hover 是因為我的比對沒有展開子選單、沒有渲染頁尾與樣板、沒有文章頁；這次補上，並加上 FULL 的建置結果掃描才發現家族元件那一組（FULL 在 practice-compass 的文章頁失敗）。

**B 同名碰撞（加載前後都有定義）— 7 個名稱，皆為宿主勝出或容器內勝出，已白名單並寫明理由**

| 名稱 | 宿主定義 | 勝出者與結論 |
| --- | --- | --- |
| `--brand`、`--ink`、`--bg` | 殼在 `<body style>` 寫入 palette | body 行內勝過 tokens 在 `:root` 的別名；值不變 |
| `--accent` | 殼在 `<body style>` 寫入 **palette.accent**（樣板容器內另設為 `var(--brand)`） | **階段 1 維持殼語意**，不統一為 primary；專測見第 5 節 |
| `--line` | 殼 `site.css` 的 `:root`（在 tokens.css 之後載入） | 後載入者勝出，值不變 |
| `--text`、`--muted` | 樣板容器 `.pattern-slot`（ContentPatterns，殼上每個區段樣板都在裡面）定義為 ink 與 bg 的推導 | 容器內勝出；tokens 另在 `:root` 提供同名別名，所以容器外「多出」兩個定義。引用者只有容器內的樣板元件，動態檢查證明容器外沒有引用者 |

**C 仍未定義 — 3 個，皆為有後備值的選用參數（白名單）：** `--owner-fit`、`--owner-position`、`--owner-filter`（OwnerImage 的元素行內參數，引用處為 `var(--owner-fit,cover)` 等）。

**可重跑的檢查已併入 PR：**
- `scripts/audit-shell-vars.mjs`：靜態 A／B／C 分類＋動態「載入前就算不出值的引用元素」檢查；`scripts/test-shell-vars.mjs`（接入 `npm run build`）含對照組：故意放的休眠引用（A）、未定義引用（C）、白名單外的同名碰撞、白名單名稱缺後備值、區域定義在子樹外的引用，都要抓得到；`verify-starter-export` 開頭跑動態檢查的瀏覽器對照組，FULL 對 13 款建置後的 dist 實際執行。
- 對修前的 dist 實跑：靜態 A 為上表 8 個名稱，動態檢查在 13 款抓到 `.student-navigation__submenu`、`.student-navigation a:hover`、`.student-navigation summary:hover`、`.student-footer`、`.student-footer--footer-{minimal,editorial,professional}`、`.atlas`；修後兩者都是 0。

## 2. 修法：共用元件走明文契約（不是覆寫壓制）

StudentNavigation 與 SelectedPatterns 原本直接引用宿主不一定提供的全域 Token。改為**元件只引用自己的元件變數**（`--student-nav-*`、`--student-pattern-*`、`--student-footer-*`，共 15 個，前綴與元件 class 一致，TOKEN-SPEC §11），**值由宿主在 `component-contract.css` 宣告**：
- prototype 宿主（`src/styles/component-contract.css`）：值等於各宣告原本直接寫的 Token 表達式，所以畫面逐元素一致。
- 殼宿主（`src/data/art-direction-adapters/shared/component-contract.css`）：值等於殼現在的實際效果——裝飾類為 `transparent`／`inherit`／`none`（這些裝飾在殼上原本因變數不存在而無效）；家族元件的字族與強調色為原本生效的後備值（`Georgia,serif`、`system-ui,sans-serif`、`var(--brand)`）。
- 兩個宿主檔集中宣告、各自連結一次（SiteLayout 在 theme.css 之後、site.css 之前），不散在 13 款版型 CSS。
- 另外 subject-atlas 的 `var(--font-body, 'Noto Sans TC',…)` 改為字面字族（原本就是後備值生效，效果等值）。

**為什麼這不是覆寫壓制：** 沒有加任何選擇器去蓋掉 hover 或其他效果；共用元件的樣式與宿主的值各自單一來源，中間是明文介面（元件變數）。殼宿主「效果為中性」是對現況的如實宣告，不是用更高優先權把已存在的效果壓回去——那些宣告本來就從未生效。要讓殼也有這些裝飾，只需改殼宿主檔的值（階段 2），不動共用元件。

**更系統化的替代機制（未實作，等核准）：** 把 `tokens.css` 的舊名別名（`--text`、`--muted`、`--surface` 等）拆成獨立檔，只由 prototype 宿主連結，殼只拿 L1 Token。這可以讓第 3 節的自訂屬性外洩（`--text`／`--muted`）在構造上消失，但會改動已發布的 `tokens.css` 內容（名稱即 API）與舊匯出站的升級路徑，風險較高；因此本階段不採用。

## 3. 比對結果（逐項數字）

方法：同一棵樹只差本 PR，old＝`ec29ebf`、new＝本 PR；**25 款版型（12 款 prototype＋13 款殼）× 色票 A／C／D × 全部路由（含樣板在首頁／about／articles／services 的放置、頁尾三種變體各至少一款、導覽子選單展開、文章列表與兩篇文章內頁）× 1440／390**；逐元素比對 27 個算出屬性＋寬高，含 `::before`／`::after`，並對每頁最多 25 個可互動元素取 focus 與 hover（手機寬度先展開選單）。

| 項目 | 結果 |
| --- | --- |
| 規模 | 75 次比對、750 次頁面×寬度、**53,040 個元素／偽元素節點、24,162 個 focus／hover 狀態** |
| 靜態算出樣式（含偽元素） | **0 差異** |
| hover | **0 差異** |
| focus | **0 差異** |
| 版面寬高 | **0 差異** |
| 12 款 prototype | 全部屬性含自訂屬性 **0 差異** |
| 對照組 | 同建置自比：殼 0、prototype 0；異色票（A vs D）574 差異，偵測器沒有失靈 |
| 具體值抽查（old／new 並排） | 子選單底／字／框／陰影、hover 底、頁尾：prototype 與殼各取樣皆 IDENTICAL（prototype 有裝飾值，殼為 transparent／none，兩邊修前後一致） |

**作者裁示（`--text`／`--muted`）：** 標準以算出樣式為準，未被引用的自訂屬性多出定義不計為差異，不擋本 PR；別名外洩另開後續案（pikaOne1138/ai-workbench#22），以「別名拆成獨立檔」的系統修法處理，排階段 2 之前；不接受殼宿主重設覆寫，也不接受白名單永久保留。因此 `audit-shell-vars.mjs` 的 `--text`／`--muted` 白名單標為**暫時**（`TEMPORARY_B`，指向 #22），測試要求有追蹤編號、FULL 會列出，#22 完成時必須移除。

原先的說明（保留供對照）：13 款殼版型上，自訂屬性 `--text`、`--muted` 在載入後新增定義（41,304 個元素值，tokens 的舊名別名在 `:root`）。不是渲染屬性、沒有任何渲染差異；殼上唯一的引用者（樣板元件）一律在 `.pattern-slot` 內，容器內有自己的定義；動態檢查在 13 款全頁（含文章頁）為 0 違規。

## 4. `--accent` 專測、完整 CI 與其他驗收
- **`--accent` 專測：** 靜態（13 款新匯出站）：連結順序 tokens → theme → 宿主契約 → site，`SiteLayout` 仍以 `--accent:${palette.accent}` 寫入；故意破壞對照 4 項（拿掉 tokens 連結、順序顛倒、拿掉宿主契約連結、`--accent` 改成 primary）都失敗。動態（FULL 建置後瀏覽器算出值）：`<body>` 上 `--accent` ＝ palette.accent、`--brand` ＝ primary、`--color-primary`／`--color-accent` 已載入；practice-compass 殼元件 `.fit-grid article:last-child` 的邊框讀到 palette.accent；檢查器自我測試含負向對照。
- **FULL_STARTER_BUILD=1、13 款 `qa:responsive`、學員包驗證、既有測試、13 款 release G-11：** 見 PR 說明與 CI 結果。13 款 release G-11 修前修後輸出逐行相同（唯一的失敗證據是測試色票強調色對比，不是新增）。

## 5. 沒測的
- 人眼逐頁視覺（只做算出樣式比對）。
- hover／focus 探針每頁取前 25 個可互動元素；靜態與偽元素為全元素。
- 動態引用檢查只涵蓋 13 款實際建置出的頁面與樣板放置（首頁／about／articles／services／頁尾變體）；沒有出現過的放置位置不在內。
- 階段 2（統一 `--accent`、殼 `site.css`／行內變數改讀 Token、讓殼也有導覽選單／頁尾裝飾、13 款字族 Token 化）不在本 PR。
