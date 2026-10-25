# D-T3 殼版型 階段 1 報告：13 款殼載入 `tokens.css`／`theme.css`

對應工單：ai-workbench「設計 Token 分層」D-T3 擴展前置；追蹤 Issue pikaOne1138/ai-workbench#17。作者核准：選 B，階段 1 只加載、不改任何語意、不統一 `--accent`。
基準：`main` @ `ec29ebf`。

## 1. 改了什麼
- `src/data/art-direction-adapters/shared/layouts/SiteLayout.astro`：在 `site.css` 之前加 `tokens.css`、`theme.css` 兩個 `<link>`。共用殼只有這一份，13 款（art-direction 2＋native-expansion 11）一起生效。殼內的行內變數（`--brand／--ink／--bg／--panel／--accent`）、`site.css` 的 `--line／--serif` 都沒動。
- `scripts/shell-token-check.mjs`（新）、`scripts/test-shell-tokens.mjs`（新，接入 `npm run build`）、`scripts/verify-starter-export.mjs`（FULL 加建置後的算出值檢查）、`package.json`、`TOKEN-SPEC.md` §10。
- 只影響**新匯出**的站；既有匯出站不動。`SiteLayout` 屬共用檔，升級走差異預覽＋核准。

## 2. 回歸（作者要求：13 款 × ≥ 2 組色票 × 偽元素／hover／focus 逐元素 = 0 差異）
方法：同一提交（`ec29ebf`）只差這兩個 `<link>`，各匯出並建置 13 款 × 色票 A（預設）、C（深色站）、D（洋紅）；對每個站的首頁＋最多 6 條內頁 × 1440／390，逐元素比對 27 個算出屬性（顏色、背景、邊框、圓角、陰影、outline、文字裝飾、字族、字級、行高、間距、min-height、opacity）＋寬高，含 `::before`／`::after`，並逐一對每頁最多 25 個可互動元素（手機寬度先展開選單）取 focus 與 hover 狀態。

| 項目 | 結果 |
| --- | --- |
| 規模 | 39 次比對（13 款 × 3 色票）、462 次頁面×寬度、**14,532 個元素／偽元素節點、9,642 個 focus／hover 狀態** |
| 靜態算出樣式（含偽元素）差異 | **0** |
| focus 狀態差異 | **0** |
| 版面（寬高）差異 | **0** |
| hover 狀態差異 | **2,352，全部同一類**：`.student-navigation a／summary:hover` 的 `background-color`（見第 3 節） |
| 雜訊底線 | 同一個 dist 對自己比對 = 0 差異；偵測器負向對照（色票 A vs D）= 686 差異 |

**FAIL 於作者的字面標準（要求 0 差異）。** 唯一的差異類別是 hover 背景色，原因與處置見下，等作者裁示。

## 3. 唯一的差異：導覽連結的 hover 背景
`StudentNavigation.astro`（所有匯出站共用，D-T3 試點時改為讀 Token）的規則是 `.student-navigation a:hover{background:color-mix(in srgb,var(--color-content) 8%,transparent)}`。在殼版型，`--color-content` 原本不存在，整條宣告無效，所以導覽連結 hover 時**沒有任何背景回饋**；載入 `tokens.css` 之後這條宣告生效，hover 時出現 8% 內容色的淡底（與另外 12 款 prototype 版型一致）。照片見傳給作者的 `hover_compare.png`。
- 這不是語意改變，是「原本就寫在共用元件裡、但在殼版型上一直失效」的宣告被啟用；對可用性是改善（hover 回饋），不影響版面。
- 想要嚴格 0 差異的做法只有：在殼版型對這條規則另外覆寫成透明，等於故意保留一個壞掉的回饋，我不建議。
- **需要作者決定：接受（我建議），或要求殼版型保持無 hover 底色。**

## 4. `--accent` 語意固定（作者要求的專門案例）
殼的 `--accent` 是 `palette.accent`，tokens.css 別名層的 `--accent` 是 primary；階段 1 不統一。
- 靜態（`test-shell-tokens.mjs`，13 款新匯出站）：連結順序 tokens → theme → site；`SiteLayout` 仍以 `--accent:${palette.accent}` 寫入；負向對照 3 項（拿掉連結、順序顛倒、`--accent` 改成 primary）都會失敗。
- 動態（`verify-starter-export` FULL，每一款建置後的 dist 在 Chromium 讀 `<body>` 上的算出值）：`--accent` ＝ palette.accent（用 accent≠primary 的色票才分辨得出）、`--brand` ＝ primary、`--color-primary`／`--color-accent` ＝ 色票（證明 tokens 已載入）；practice-compass 的殼版型元件 `.fit-grid article:last-child` 的 `border-color: var(--accent)` 算出為 palette.accent。
- 檢查器自我測試（`verify-starter-export` 開頭，需瀏覽器）：accent 被換成 primary 時必須失敗，維持時必須通過；對載入前的舊 dist 也會被拒絕。

## 5. 完整 CI
- `FULL_STARTER_BUILD=1 node scripts/verify-starter-export.mjs`：全過（含 12 款最初版型與 13 款進行中版型完整建置、G-11、QA；代表站 `qa:responsive` 60/60、30/30）。
- 13 款各一個匯出站 `npm run qa:responsive`：25/25、25/25、40/40、35/35、25/25、25/25、25/25、25/25、25/25、40/40、40/40、40/40、40/40，0 警告。
- 13 款各一站 release 模式 G-11：唯一的失敗證據是測試色票的強調色對比（`#C49B70` 2.38:1，#91 的新檢查），沒有「超出基準」。
- `test-gates`、`test-pilot-token-consumption`、`test-shell-tokens`、`test-student-project-context`、`check-doc-hygiene`、`build-student-pack`＋`verify-student-pack` 通過。GitHub CI 見 PR。

## 6. NOT TESTED
- 人眼逐頁視覺（只做了算出樣式比對；hover 差異另附圖）。
- 比對探針每頁取前 25 個可互動元素；更後面的元素與非導覽的 hover 狀態沒有逐一取樣（靜態與 focus 是全元素）。
- 階段 2（統一 `--accent`、殼 `site.css`／行內變數改讀 Token、13 款字族 Token 化）不在本 PR。
