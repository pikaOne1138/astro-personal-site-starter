# D-T3 試點報告：reading-atlas（知識型）、clinician（助人者型）

對應工單：ai-workbench「設計 Token 分層」D-T3；追蹤 Issue pikaOne1138/ai-workbench#17。
基準：`main` @ `15431db`（PR #86、#87 已合併）。Token 規範見 `TOKEN-SPEC.md`，規則見學員 `AGENTS.md` 的「設計修改」一節。

## 1. 轉換了什麼

| 檔案 | 內容 |
| --- | --- |
| `layout-assembly/reading-atlas/Home.astro`、`clinician/Home.astro` | 色彩、字族、陰影全部改讀 Token；版型專屬值用 `--atlas-rule`、`--atlas-hover`、`--clinical-*` 區域變數，由 Token 推導；移除 `var(--x, #字面色)` 的字面後備值。clinician 的插畫場景（牆、地板、窗、椅）也改由 Token 以 `color-mix()` 推導，隨色票換色，不需要字面值例外 |
| `DesignChrome.css` | 只改兩款的家族規則（拿掉字面色，改讀 Token）；基底按鈕文字色改為 `--chrome-on-accent`（預設仍 white，其餘 10 款不變）；`.skip:focus` 改讀 Token（12 款共用） |
| `DesignInterior.astro` | 只改兩款的 `--fp-*` 覆蓋規則（reading-atlas 保留 `--fp-bg:var(--color-surface-alt)`，clinician 拿掉，回到基底別名）；clinician 的字族改讀 `--font-body` |
| 匯出器內嵌 `site.css`、`SelectedPatterns.astro`（頁尾與區段樣板）、`StudentNavigation.astro`（導覽子選單、hover） | 寫死色改讀 Token。這三處是所有匯出站共用，Sonnet 驗收 session 的回報與我的全站掃描揭露它們在試點站啟用 |
| `scripts/test-pilot-token-consumption.mjs`（新增，接入 `npm run build`） | 試點守門：版型檔、家族規則與匯出後試點站的共用元件不得有寫死色／字族／圓角／陰影；含誤判與漏抓 fixture |
| `scripts/audit-design-values.mjs`（修正） | `content:"#2026"` 字串與 `url(#id)` 不再誤判為色碼；百分比圓角視為形狀幾何，不算主題圓角（影響盤點：field-notes 圓角 3→1、companion 1→0、collective 1→0，其餘不變） |

D-T1 的直接寫死色：reading-atlas 27→0、clinician 24→0（掃描器 `audit-design-values.mjs`；後備值、區域 Token 內字面色、字族、陰影亦全為 0）。

**沒有抽出共用元件。** 工單 D-T3 內文寫「Button／Card／Hero／Header 的共用結構與 variant」，但兩款試點各自的這些結構已不含主題字面值，且目前沒有跨版型重複的證據，所以沒有預先抽象。是否抽共用元件待擴展期視重複度提案。

## 2. 驗證（工單驗收 1～3、6、7）

### 驗收 1：全站換色
- **客觀殘留偵測**（`同一頁在預設色票與洋紅色票下，逐元素比對計算後 color／背景／邊框／outline／陰影／漸層，含 ::before／::after 與 hover／focus 狀態，不變且非中性色者＝殘留`）：頁面×寬度共 14 組（reading-atlas 首頁／關於／文章，clinician 首頁／關於／服務／FAQ，各 1440 與 390），並啟用區段樣板與頁尾。**轉換前 760 處殘留（reading-atlas 392、clinician 368），轉換後 0。** 負向對照：在建置結果中塞入 `#2563eb`，偵測器抓到 6 處。
- **新 session 真實執行**（12 次，Haiku＋Sonnet 各 6）：對轉換後試點匯出站下「把網站改成森林綠」，4 次（兩款×兩模型）全部只改 `site.config.json` 的 `brand.palette` 與由腳本產生的 `public/theme.css`；建置後與原色票比對 **0 殘留**。
- 截圖（四個寬度 1440／1280／768／390，轉換前後並排）與淺色／深色站的反白區塊對照已附在 Issue 回報；PR 不含截圖檔。

### 驗收 2：卡片陰影淡一點 — **工單前提不成立，結果見下**
兩款試點的卡片（`.atlas-calendar-grid a`、`.clinical-fit article` 等）本來就沒有陰影；全站只有 3 類陰影：書本裝飾物（`.atlas-book-object`）、clinician 插畫、導覽子選單，都不是卡片。12 次中的 4 次下此指令：3 次沒有改任何檔，回報「沒有卡片陰影可淡化」並詢問學員要哪一個；1 次（Haiku、reading-atlas）把書本裝飾物當作卡片，只改該元素自己的區域變數（`.atlas-book-object` 的 `box-shadow`，建置後全站只有該元素 1 處計算樣式變動）。4 次都**沒有**改 `--shadow-*` 或 palette。
判定：**行為正確（沒有為了局部需求波及全站），但驗收 2 的「diff 只及 Card 共用樣式」無法照原文執行，因為試點沒有帶陰影的卡片。** 需要作者決定：驗收 2 改用試點中實際存在的元素（例如「書本物件的陰影淡一點」），或先為卡片定義共用樣式。

### 驗收 3：只有首頁按鈕要大一點
4 次（兩款×兩模型）都只改 `Home.astro`；建置後計算樣式比對：**首頁以外的頁面（reading-atlas 關於／文章、clinician 關於／服務／FAQ）0 處變動**；頁首的全站 `.button` 沒變。首頁的變動只有按鈕本身與其祖先因高度增加而連動的 `height`。

### 驗收 6：新 session 只讀規則並實際執行
12/12 次層級判斷正確（輸入層 4、頁面層 4、卡片陰影需求 4 次不波及全域）；回報都含「改了哪一層、改了哪些檔、受影響頁面、殘留寫死值、驗證項目（沒跑標 NOT TESTED）」。模型在回報中指出的殘留（頁尾樣板、導覽陰影、`.skip:focus`）已於本 PR 修正。
限制：新 session 環境不允許建置與瀏覽器，建置與計算樣式驗證由我在事後執行；只測兩個模型。

### 驗收 7：回歸
見 PR 說明（`verify-starter-export` 預設與 `FULL_STARTER_BUILD=1`、資料包路徑、art-direction、既有測試）。

## 3. 已知殘留（不在試點範圍）
- 其餘 23 款版型與其家族規則（`DesignChrome.css`、`DesignInterior.astro` 的其他家族）、`site.css` 的 `.layout-radio-letter`／`.layout-curator`／`.layout-collective`：未轉換，屬擴展。
- `StudentNavigation.astro` 的圓角字面值（5 處）與 `ServiceSections`／`AboutSections`／`ArticleArchive`／`ArticleDetail` 的字體字面值：非顏色，留到擴展。
- `tokens.css` 內 `var(--brand-*, 後備值)` 的後備色：Token 來源檔，依規範允許。
- art-direction 兩款（ai-workbench#19）。
- 工單驗收 2 的前提（見上）。

## 4. 視覺上的改變
試點的 header、footer、內頁、書本物件、反白區塊、頁尾樣板原本用固定的家族色，不吃學員色票；轉換後都跟著色票走，所以預設色票下畫面與轉換前略有不同（例如 reading-atlas 的深色區塊由固定深綠改成取內容色，頁尾由固定暖褐改成取內容色）。這是目的，不是回歸。深色站的反白區塊（內容色與底色互換）會是淺色。
