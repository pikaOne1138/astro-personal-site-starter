# D-T6 評估報告：是否採用 Tailwind v4

對應工單：ai-workbench「設計 Token 分層」D-T6；追蹤 Issue pikaOne1138/ai-workbench#17。
基準：`main` @ `1c8ff1a`（PR #86–#89 已合併）。

**範圍聲明：這是 spike 報告，不是實作。** 產品倉與學員站都沒有採用 Tailwind；所有實驗站都在 scratch 目錄，未提交。Tailwind 的採用決定屬於作者（停止點 C）。

## 結論（建議）

**NO-GO：現階段不採用。** 理由一句話：16 次弱模型修改測試中，Tailwind 組沒有比現行 CSS 變數組更穩（兩組都能把改動限制在正確層級），但它多出安裝、設定、相容與雙來源的維持成本。

| 準則 | 結果 | 對採用的影響 |
| --- | --- | --- |
| 1 建置／維護複雜度 | 多 24 個套件（約 +51 MB）、建置時間無差、多 3 處設定（vite 外掛、`tailwind.css`、版型 import）；匯出站鎖 `astro ^5.14.0`，需確認外掛相容 | 不利 |
| 2 弱模型修改行為 | A（現行）8 個中 7 PASS＋1 部分；B2（Tailwind）8 個全 PASS；差異來自模型選色而非 Tailwind | 中性（沒有證據顯示更好） |
| 3 與 25 版型現有 CSS 相容 | 完整 import 會讓 4 個測試版型各 77–228 個元素樣式改變（preflight 重置）；分層 import（不載入 preflight）4 個版型 0 差異；art-direction 匯出站未測 | 可解但需要全量回歸 |
| 4 輸出大小 | CSS +11.7%（分層）／+16.5%（完整） | 輕微不利 |

## 1. 做了什麼比較

- **A**：現行站（Token 在 `tokens.css`，輸入層 `site.config.json`）。
- **B1**：完整 Tailwind（含 preflight）。
- **B2**：分層 Tailwind（`@layer theme, base, components, utilities;` 只 import theme 與 utilities，`@theme static` 輸出全部 Token，`--color-*: initial` 清掉預設色盤），首頁按鈕轉成 utility class，並附 Tailwind 版 AGENTS。
- 技術事實：`@theme static` 讓所有 Token 都輸出成 CSS 變數；使用 `@tailwindcss/vite` 外掛；Node 22 即可建置 Astro 5。

## 2. 準則 2 行為測試（16 個新 session）

方法：A、B2 兩種站各 4 個學員需求 × Haiku／Sonnet，每次都是新 session，在 git 初始化的站複本內工作；**判定一律看 `git diff` 與建置後的 computed-style 比對，不採信 agent 自述**。agent 自己因環境限制不能 build，所以回報裡的驗證都是 NOT TESTED；build 與比對由我另外執行，16 個站全部建置成功。

| 需求 | 判定 | 結果（A／B2） |
| --- | --- | --- |
| 「改成森林綠」 | 只改 `site.config.json`＋重產 `theme.css`；全站換色、殘留 0 | 4/4 PASS（A 的 Haiku／Sonnet 與 B2 的 Haiku／Sonnet 各一）。四個 run 的受影響範圍完全一致：315 個選擇器、無殘留 |
| 「更圓潤」 | 改 `--radius-*` 的值，不得在各處寫死圓角 | 4/4 PASS（A 的 Haiku／Sonnet 與 B2 的 Haiku／Sonnet 各一）。A-haiku 只讓導覽與按鈕變圓（28 個元素），並詢問卡片是否要圓；A-sonnet 連卡片也處理（48 個）。B2-haiku 只改 `tailwind.css` 而讓 `public/tokens.css` 留舊值（見風險） |
| 「只有首頁按鈕大一點」 | 只動首頁，不動共用 `.button` | 4/4 PASS（A 的 Haiku／Sonnet 與 B2 的 Haiku／Sonnet 各一）。四個 run 都只有 `/` 的同一組 14 個選擇器變化 |
| 「首頁『聯絡方式』按鈕改橘色，其他不變」 | 不改全域 Token／色票；單顆按鈕；不得用 Tailwind 預設色或 `bg-[#…]` | A：Sonnet PASS、Haiku 部分；B2：Haiku、Sonnet 皆 PASS（合計 A 1 PASS＋1 部分、B2 2 PASS） |

細節：
- A-orange-haiku 誠實回報「專案沒有橘色 Token」，改用 `--color-accent`（駝色）並請學員確認；範圍正確（只 1 個元素變），但顏色不是橘色，所以記「部分」。
- 其餘三個橘色 run（A-sonnet、B2-haiku、B2-sonnet） 都用頁面層區域變數＋`/* design-fixed: page-custom */`。**A-orange-sonnet 在 G-11 被 WARN**：註記只涵蓋緊接的下一個宣告，第二個字面值（`--clinical-on-orange:#fff`）未被涵蓋。這是 G-11 註記粒度的摩擦，與 Tailwind 無關，列為後續改進。
- B2-orange-sonnet 去掉底線改成有框按鈕，連帶 7 個元素的高度變化（版面小副作用）。
- 全部 16 個 diff 沒有任何 `bg-[#…]` 之類任意值，也沒有改 `public/theme.css`（皆為重產）。
- 樣本很小：每格 n=1，只測 clinician 版型、只測 Haiku／Sonnet 兩個模型。**不足以證明 Tailwind 會更差，只足以說明沒有看到更好。**

## 3. 風險與成本（若採用）

1. **雙來源漂移**：B2 站同時存在 `tailwind.css`（`@theme`）與 `public/tokens.css`；B2-round-haiku 就只改了其中一份。採用就必須只留一個 Token 來源並改寫 TOKEN-SPEC、匯出器與 G-11 的掃描對象。
2. **G-11 衝突**：`@theme` 裡的 `var(--brand-primary,#355747)` 後備值被 G-11 當作 4 個新寫死色（B2 站全部出現 WARN）。需把 `tailwind.css` 的後備值納入例外或移除。
3. **任意值繞過**：Tailwind 的 `bg-[#2563eb]`、預設色盤（`bg-orange-500`）都是繞過 Token 的新出口；採用時 AGENTS 必須新增「不得在 utility 寫死主題值」，G-11 掃描器要新增 `\[(#|rgb|hsl|oklch)` 與預設色盤的偵測與 fixture。
4. **相容**：必須用分層 import（不載入 preflight）；25 版型全量視覺回歸，art-direction 匯出站尚未測。
5. **依賴與版本**：新增 24 個套件；匯出站鎖 Astro 5，需要鎖定 `@tailwindcss/vite` 版本。

## 4. 為什麼是 NO-GO、以及何時重評

現行分層（輸入層 → `tokens.css` 語意 Token → 版型區域變數）已讓弱模型在四類需求裡選對層級；Tailwind 的主要賣點（熟悉的 utility 語法）在這個學員站情境沒有轉成可量測的穩定度。重評條件（任一成立）：
- 學員站開始需要大量新版型或元件，現行 CSS 的維護量明顯超過 utility 的維護量；
- 以更多樣本（≥5 次／格，加上 Opus 以外的更弱模型與其他版型）看到 Tailwind 組有可量測的優勢；
- 作者想要和 Tailwind 生態（外部範本）對接。

若作者仍決定採用，建議順序：先做單一版型 pilot（分層 import）→ 只留一個 Token 來源 → 更新 G-11 與 AGENTS → 再擴到其他版型。

## 5. NOT TESTED（誠實清單）

- 實際瀏覽器的人眼視覺（只做了 computed-style 比對）。
- hover／focus 狀態（只比對靜態樣式）。
- art-direction 匯出站、其餘 20+ 版型與其他版面寬度（只測 1440／390，4 條路由）。
- Haiku／Sonnet 以外的模型。
