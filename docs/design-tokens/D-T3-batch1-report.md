# D-T3 擴展 批 1 報告：8 款版型 Token 化

對應工單：ai-workbench「設計 Token 分層」D-T3 擴展；追蹤 Issue pikaOne1138/ai-workbench#17（作者已核准批 1 → 批 2 → 批 3 的順序與驗收方式）。
基準：`main` @ `2f1fce7`。

## 1. 範圍與結果

| 版型 | 類型 | 轉換前（直接寫死色／區域 Token 內的色） | 轉換後 | 換色殘留（轉換前 → 後） | 做法 |
| --- | --- | --- | --- | ---: | --- |
| field-notes | 知識／prototype | 5／0 | 0／0 | 76 → 0 | L1 Token ＋ `color-mix()`；`--font-mono`、`--font-heading`、`--radius-pill` |
| essayist | 知識／prototype | 4／0 | 0／0 | 74 → 0 | 同上 |
| companion | 助人者／prototype | 4／0 | 0／0 | 264 → 0 | 同上 |
| somatic | 助人者／prototype | 0／8 | 0／0 | 300 → 0 | 深色區塊改取 `inverse-surface`／`on-inverse` |
| subject-atlas | 知識／art-direction | 1／0 | 0／0 | 0 → 0（原本只有白字） | 殼變數（見第 3 節） |
| practice-compass | 助人者／art-direction | 4／0 | 0／0 | 48 → 0 | 殼變數；深色決策區塊取 `--ink`／`--bg` 互換 |
| portrait-profile | 助人者／native | 1／0 | 0／0 | 16 → 0 | 殼變數 |
| editorial-frontpage | 知識／native | 0／1 | 0／0 | 0 → 0（原本只有一個 `--rule`） | 殼變數 |

合計：直接寫死色 19、區域 Token 內 9 → 0；4 個 prototype 家族在 `DesignChrome.css`（`--chrome-*`）與 `DesignInterior.astro`（`--fp-*`）的字面色 24 → 0；**換色殘留 778 → 0**（同頁在預設色票與洋紅色票下比對，不變且非中性色＝殘留；方法同 D-T3 試點）。舊名別名（`--bg`、`--ink`、`--brand`…）在 prototype 4 款一併改讀 `--color-*`；Home.astro 內 `var(--x, #字面色)` 的後備值全部移除。

## 2. 推導原則

沒有新增任何全域名稱。版型插圖與漸層用 `color-mix(in srgb, <角色> N%, var(--color-surface))` 在 **primary／secondary／accent 之間取不同角色混色**，保留多色感，不收斂成單一色調（例如 field-notes 的圖形：primary 35%＋secondary 14%＋secondary 62% 三段漸層，加 primary 的光暈）。深色區塊取 `inverse-surface`／`on-inverse`，深色站會換成淺色（內容色／底色互換，沿用試點規則）。

## 3. 發現（需要作者知道）

1. **13 款的匯出殼沒有載入 `tokens.css`。** art-direction（2）與 native-expansion（11）的 `SiteLayout` 只由 `brand.palette` 寫入 `--brand`／`--ink`／`--bg`／`--panel`／`--accent`／`--serif`，頁面只連結 `site.css`，所以 `--color-*`、`--font-*` 這些 L1 Token 在這 13 款不存在。批 1 的 4 款（subject-atlas、practice-compass、portrait-profile、editorial-frontpage）因此用殼變數推導（換色一處改、全站一致，驗證結果見下），**字族（mono／sans）保留字面值**，標題字族改讀殼的 `--serif`（同時讓 `clear-sans` 字體預設對這 4 款的標題生效）。我第一版直接用 `--color-*`，在算出的樣式比對中發現版面與字型整個跑掉才退回；這也是建議的做法：殼是否載入 `tokens.css` 屬於另案（要處理殼內 `--accent` 與別名層 `--accent` 意義不同），需作者決定，批 1 不順手改。
2. **既有缺陷（D-T5 交付時的漏洞，本 PR 修正）：** art-direction／native 匯出站的 `design-baseline.json` 是在被換掉的 surrogate 版型上寫的，所以 13 款的新匯出站一跑 `npm run verify` 就因「超出基準」而 WARN，**release 會 FAIL**（轉換前的 portrait-profile 匯出站已重現）。修法：`export-art-direction-starter.mjs` 在最終內容定案後重寫基準。新增守門：每個已轉換版型的新匯出站，G-11 release 不得一開始就超出基準；還原修正後該測試對 subject-atlas 轉紅（負向對照）。
3. 殼變數版型的反白區塊在深色站會翻成淺色（`--ink`／`--bg` 互換），與 prototype 一致。

## 4. 驗收（沿用試點方式）

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 驗收 1 換色殘留 | PASS | 8 款：778 → 0（見第 1 節）；每款 ≥ 3 條路由 × 1440／390 |
| 預設色票外觀 | PASS（有預期差異） | 逐元素比對預設色票轉換前後：版面尺寸（寬／高／間距）0 差異（修正殼問題後）；差異只在顏色、字族名稱（`ui-monospace,monospace` → `--font-mono` 等）與 field-notes 的 pill 圓角（99px → 999px，視覺相同）。多數顏色差異是原本的固定家族色改為跟色票走，是目的不是回歸 |
| 驗收 7 回歸：Build／Verify | PASS | `FULL_STARTER_BUILD=1 node scripts/verify-starter-export.mjs` 全數通過（最終程式碼；含 12 款最初版型與 13 款進行中版型的完整建置、G-11、QA） |
| 回歸：響應式 QA | PASS | 8 款各一個匯出站跑 `npm run qa:responsive`：15/15、15/15、25/25、25/25、20/20、20/20、40/40、35/35，0 警告；另 FULL 內的兩款代表站 30/30、60/60 |
| 反白區塊視覺 | PASS（人眼） | 深色站（色票 C）與洋紅色票（D）的前後並排截圖：somatic 主視覺與頁首、practice-compass 決策區塊、field-notes 頁尾，皆可讀、對比正常；截圖在 Issue 回報 |
| `FULL_STARTER_BUILD`（先前記帳） | PASS | 同上 |
| 驗收 2（卡片陰影）、驗收 3（首頁按鈕）、驗收 6（新 session 實測） | NOT TESTED（本批） | 這三項驗證的是 AGENTS 規則與共用元件行為，不隨版型而變；試點與 D-T6 已在 clinician 站實測。批 1 沒有重跑；若作者要求，可在批 1 站補測 |
| 護欄 | PASS | `test-pilot-token-consumption.mjs` 擴到 8＋2 款（含家族規則），另 13 款殼變數版型護欄色彩／圓角／陰影；含目錄走訪漏抓 fixture；對 field-notes、portrait-profile、card-journal、practice-compass 注入 `#2563eb` 皆被抓到 |

## 5. 已知限制（不在批 1）

- 13 款殼變數版型的字族字面值（mono／sans）仍在；殼補上 Token 後再轉。
- `--font-heading` 的預設值是 `"Noto Serif TC", Georgia, serif`，原先寫死 `Georgia,serif` 的 prototype 4 款標題字在安裝了 Noto Serif TC 的環境會略有不同（拉丁字母），並且現在會跟著 `clear-sans` 預設換成無襯線。
- 測試用色票的強調色 `#C49B70` 對背景 2.38:1，新的強調色對比檢查（#91）會在 preview WARN；這是色票測試資料，不是版型問題。
- 批 2（learning-lab、curator、coach）與批 3（radio-letter、collective、trust-path）未動；批 3 在作者看過 coach 的 A 政策截圖前不動。
