# ATP 設計 Token 規範（D-T2）

對應工單：ai-workbench「設計 Token 分層」D-T2；追蹤 Issue pikaOne1138/ai-workbench#17。
參考實作：`src/styles/tokens.css`（匯出為學員站 `public/tokens.css`）、`scripts/theme-css.mjs`（匯出為學員站 `public/theme.css`）。
產品基準：`main` @ `780635bc822cb72c922efbb3f1ec8c1c453ec88e`（盤點見 `D-T1-inventory.md`）。
實作載體是 CSS Variables，與 Tailwind 決策解耦（D-T6 另評估）。

## 1. 一句話

設計事實只有一處：學員的色票與字體偏好只寫在 `site.config.json`；`tokens.css` 把它整理成「角色命名」的 Token；版型與元件只讀 Token，不寫主題字面值。這與內容面的 `serviceFacts`「改一處、全站一致」是同一個原則。

## 2. 分層

| 層 | 內容 | 在哪裡 | 誰改 |
| --- | --- | --- | --- |
| L0 輸入 | 品牌色票（primary／secondary／accent／background／text）、字體預設、圖片風格 | `site.config.json` 的 `brand` | 學員／AI（換色、換字體只改這裡） |
| L0 產出 | 把 L0 寫成 `:root{--brand-*}` | `public/theme.css`（由 `scripts/theme-css.mjs` 在 `predev`／`prebuild` 重新產生，**不手改**） | 無人手改 |
| L1 語意 Token | `--color-*`、`--font-*`、`--radius-*`、`--space-*`、`--width-*`、`--shadow-*`、`--image-filter` 角色命名，及舊名別名 | `public/tokens.css` | 系統維護者（新增 Token 才改；見第 6 節） |
| L2 元件／版型區域變數 | 只從 L1 推導的版型專屬值，例如 `--atlas-rule` | 該版型／元件檔的 `<style>` | 版型維護者 |
| L3 個別客製 | 單一頁面或單一元件的外觀需求 | 該頁面／專用元件，不回寫共用元件 | AI（M／H 車道） |

規則：
1. L2、L3 只能用 `var(--color-primary)` 這類 L1 Token、`color-mix()` 等從 L1 推導，**不得出現主題字面值**（例外見第 7 節）。
2. 版型專屬值走 L2，**不進全域**。全域詞彙的新增門檻見第 6 節。
3. 字體只 Token 化「字族」；字級、行高、留白、版式屬版型層，不進全域 Token（工單補充判斷 6）。

## 3. 命名規則

格式：`--<類別>-<角色>[-<修飾>]`，全小寫連字號。**角色命名，不用色相命名**（`--color-primary` 而不是 `--color-green`；換成紅色後名稱仍然成立）。類別固定為：

| 類別 | 用途 | 例 |
| --- | --- | --- |
| `--color-*` | 色彩角色 | `--color-primary`、`--color-surface` |
| `--font-*` | 字族 | `--font-heading` |
| `--radius-*` | 圓角 | `--radius-md` |
| `--space-*` | 間距（含 `--space-section`、`--space-gutter`） | `--space-3` |
| `--width-*` | 內容寬度 | `--width-read` |
| `--shadow-*` | 陰影 | `--shadow-md` |
| `--image-filter` | 圖片風格濾鏡 | — |

**前綴政策：不使用專案代號（不加 `--atp-` 之類的前綴）。** 理由：名稱的消費者是任意 AI（含能力較弱、沒有本專案前置對話的模型）。採用通用類別命名（`--color-*`、`--font-*`、`--radius-*`、`--space-*`、`--shadow-*` 與 Tailwind v4 `@theme` 的命名空間一致），AI 不必學一套專案專屬的名稱，憑通用慣例就能猜對，降低用錯名稱、自創名稱或寫死字面值的機率。`--width-*` 與 `--space-*` 是本專案的類別名（Tailwind 對應 `--container-*`、`--spacing`），這兩項若日後導入 Tailwind，需在 D-T6 評估是否加對照層。

代價與對策：
1. **撞名風險**。通用名稱可能與既有或第三方 CSS 同名。已查證本倉兩處同名：`public/demo.css` 為展示站主題定義 `--radius-lg`（12／20／32／40px，被 `blocks.css`、`effects.css`、`multipage-nav.css` 讀取），`subject-atlas/Home.astro` 讀取未定義的 `--font-body`（帶後備值）。展示站與學員站不會同頁載入 `tokens.css` 與 `demo.css`；art-direction 匯出器目前不載入 `tokens.css`。這兩項在 art-direction 納入（決定 4）與任何把 `demo.css` 帶進學員站之前須處理：`--font-body` 一旦被 `tokens.css` 定義，字體堆疊會從後備值變成 `--font-body` 的值。
2. **區分「Token」與「版型區域變數」改由位置與規則辨認**，不再靠前綴：L1 名稱只能由 `tokens.css` 定義（D-T5 的 G-11 檢查「`tokens.css` 以外不得定義 L1 名稱」）；版型區域變數必須帶版型前綴（如 `--atlas-rule`、`--clinical-line`），不得使用上表的類別開頭。
3. 輸入層 `--brand-*` 與第 5 節舊名別名不改名。

## 4. 詞彙表（v1）

### 色彩
| Token | 角色 | 來源 |
| --- | --- | --- |
| `--color-primary` | 主色（按鈕、重點、連結強調） | `brand.palette.primary` |
| `--color-on-primary` | 主色之上的文字／圖示 | 依主色自動取白或黑中對比較高者（`theme-css.mjs`） |
| `--color-secondary` | 次要色 | `brand.palette.secondary`，缺省＝primary |
| `--color-accent` | 點綴色 | `brand.palette.accent`，缺省＝primary |
| `--color-surface` | 頁面底色 | `brand.palette.background` |
| `--color-surface-alt` | 區塊／卡片的次級底色 | content 6% 混 surface |
| `--color-content` | 內文與標題文字 | `brand.palette.text` |
| `--color-content-muted` | 次要文字 | content 75% 混 surface |
| `--color-line` | 分隔線、邊框 | content 20% 混 surface |
| `--color-inverse-surface` | 反白（深色）區塊底色 | ＝content |
| `--color-on-inverse` | 反白區塊上的文字 | ＝surface |
| `--color-on-inverse-muted` | 反白區塊上的次要文字 | surface 78% 混 content |
| `--color-focus` | 鍵盤焦點外框 | ＝primary |

反白區塊直接取 content／surface 互換：只要 content／surface 這組色過對比，反白組合就必然過，學員不必另外提供第六、第七個顏色。

G-11 的色票對比檢查（`theme-css.mjs` 的 `contrastPairs`）目前有五組：內文色／背景 4.5、次要文字／背景 4.5、主色上的文字／主色 4.5、主色／背景 3、強調色／背景 3。強調色只用在非文字的點綴（色塊、線條、插圖），所以門檻是 3:1，且不得拿來當文字色；沒有設定強調色時 `--color-accent` 退回主色，不另外檢查。**輔色（`--color-secondary`）沒有配對檢查**：它只經 `--ed-accent-deco` 用在裝飾線、邊框與插圖底色，不是文字色也不是表面色；若日後有版型把輔色放在文字或有意義的圖形上，再補這一組。

### 字體、圖片
`--font-heading`、`--font-body`（由 `brand.typography` 決定預設）、`--font-mono`（固定）、`--image-filter`（由 `brand.imageStyle` 決定）。

### 圓角、間距、寬度、陰影
- 圓角：`--radius-sm`（.25rem）、`-md`（8px）、`-lg`（1rem）、`-pill`（999px）
- 間距：`--space-1` … `-6`（.5／1／1.5／2／3／4 rem＝8／16／24／32／48／64px，落在 astro-ui-craft 的既定間距階內）、`--space-section`、`--space-gutter`
- 寬度：`--width-wide`（1320px）、`-mid`（1120px）、`-read`（36rem）
- 陰影：`--shadow-sm`／`-md`／`-lg`／`-hard`；陰影色由 content 混出，換色時一起變。

## 5. 舊名別名（視同已發布 API）

下列名稱已隨匯出站發布，AI 與既有站都在用，**不得刪除、不得改義**；它們是新名的別名，值與先前一致。**別名定義在獨立檔 `legacy-aliases.css`（匯出站為 `public/legacy-aliases.css`），不在 `tokens.css`**（ai-workbench#22）：12 款 prototype 版型的匯出站依序連結 `tokens.css` → `legacy-aliases.css` → `theme.css`；殼版型（13 款）自己有 `--brand`／`--ink`／`--bg`／`--accent`／`--line` 等，只連結 `tokens.css`，不連結也不出貨別名檔，所以 `tokens.css` 在殼上只新增 L1 名稱，自訂屬性層級沒有多出的定義。

| 舊名 | 等於 |
| --- | --- |
| `--brand`、`--accent` | `--color-primary` |
| `--ink`、`--heading`、`--text` | `--color-content` |
| `--bg`、`--surface` | `--color-surface` |
| `--line` | `--color-line` |
| `--muted` | `--color-content-muted` |
| `--radius` | `--radius-md` |
| `--ed-ink`／`--ed-ink-2`／`--ed-accent`／`--ed-accent-deco`／`--ed-panel`／`--ed-line`／`--ed-gutter`／`--ed-wide` | 對應的 L1 Token（沿用匯出器原本的對應） |

輸入層的 `--brand-primary`／`-secondary`／`-accent`／`-background`／`-text`／`-heading-font`／`-body-font`／`-image-filter` 同樣保留。新增輸入 `--brand-on-primary`。`--chrome-*`、`--fp-*` 是 12 款最初版型的內部變數，**不是 API**，D-T3 起逐步改為 L2 變數。

## 6. 穩定性與新增規則（名稱即 API）

1. 已發布的名稱不得改名或刪除。要改：新增新名、舊名保留為別名、在變更說明公告淘汰期。
2. 新增全域 Token 的門檻：至少兩款性質不同的版型需要同一個角色；只有一款需要的，走 L2。
3. 新增 Token 要同時更新本表與 `tokens.css`；不得只更新其中一個。
4. 禁止的繞過：行內樣式（`style=""`）寫主題值、頁面層寫死色、以 `!important` 蓋過 Token。

## 7. 字面值例外（供 D-T5 的 G-11 允許清單採用，提案）

主題字面值只允許出現在：(a) `tokens.css` 本身；(b) 帶註記的固定值：`/* design-fixed: <原因> */`（G-11 認得這個格式。涵蓋範圍：註記放在一條規則〔選擇器或 `@media` 等 at-rule〕前，涵蓋該規則 `{}` 內的所有宣告；放在單一宣告前〔含規則 `{` 之後的第一個宣告〕，只涵蓋緊接的那一個宣告；**不提供檔案層級涵蓋**，太寬），原因限 `brand-logo`（品牌標誌）、`third-party-embed`（第三方嵌入）、`illustration`（手繪場景，不隨主題變）、`page-custom`（學員明確要求且已確認的單一元件或單頁顏色，只寫在該處的一個區域變數）。插圖以 `color-mix()` 由 Token 推導，使場景一起換色；D-T3 已在 clinician 的 `clinical-art` 場景驗證可行（場景隨色票換色、無寫死色），因此 `illustration` 例外目前沒有實際使用者，保留給確實無法推導的場景。透明度黑（`rgb(0 0 0 / x)`）與 `transparent`、`currentColor`、`inherit` 不算主題色。

## 8. 檔案三分法歸類

採用 ai-workbench 銷售頁結論 2.4 節的定義（系統檔／學員資產／共用檔）：

| 檔案 | 歸類 | 更新方式 |
| --- | --- | --- |
| `site.config.json`（`brand` 區塊） | 學員資產 | 永不覆蓋 |
| `public/theme.css` | 衍生檔（由學員資產產生） | 任何時候可由 `site.config.json` 重新產生，不進差異預覽 |
| `public/tokens.css` | 共用檔 | 升級走差異預覽＋學員核准 |
| `public/legacy-aliases.css` | 共用檔（只有 prototype 宿主有） | 升級走差異預覽＋學員核准；**必須和 `tokens.css` 一起升級**（見下） |
| `scripts/theme-css.mjs` | 系統檔 | 可替換 |
| 共用版型元件與 CSS（`design-family.css`、`DesignInterior` 等） | 共用檔 | 升級走差異預覽＋學員核准 |

**升級既有匯出站時的別名檔（ai-workbench#22）。** 拆檔前匯出的 prototype 站，舊名別名寫在自己的 `public/tokens.css` 內，`SiteLayout.astro` 沒有連結別名檔。這些站**不必變動就能正常運作**；但差異預覽若把 `tokens.css` 換成新版（別名已移出），必須同一批核准三件事，缺一就會讓 `var(--brand)`、`var(--ink)`、`var(--line)` 等舊名失效：(1) 新增 `public/legacy-aliases.css`；(2) `SiteLayout.astro` 在 `tokens.css` 之後、`theme.css` 之前加一條 `<link rel="stylesheet" href={base+'legacy-aliases.css'}/>`；(3) 換上新版 `tokens.css`。殼版型的既有站不需要別名檔。新匯出站由 `verify-starter-export` 檢查連結順序、別名檔內容，以及 `tokens.css` 不再定義任何舊名（`shell-token-check.mjs` 的 `checkPrototypeSource`／`checkShellSource`）。

與工單的差異（依工單要求指出）：工單補充判斷 3 建議「共用元件屬系統檔」，但銷售頁結論 2.4 節把「版型元件與 CSS」列為共用檔。本規範採後者，因為學員可能改過元件；系統檔只限不含學員編輯的腳本與工具。待作者確認。

## 9. 驗收：兩款不同性質版型共用同一份詞彙

完成定義：任取兩款性質不同的 Layout，能共用同一份詞彙而不需新增版型專屬全域名稱。以兩款試點（reading-atlas 知識型、clinician 助人者型）讀其 `<style>` 規則，逐一對應的結果如下；這是**靜態對照**，D-T3 已完成：兩款試點的字面值為 0，見 `D-T3-pilot-report.md`。

| 現有字面值的用途 | 對應 Token |
| --- | --- |
| 頁面底、卡片底 | `surface`、`surface-alt` |
| 內文、標題 | `content` |
| 次要文字（clinician 的 `#53666b`、`#52646b`） | `content-muted` |
| 分隔線與邊框（`#cdd8d5`、`#c6d0cb`、`#bfcfca`；atlas 的 `#a4aaa0`） | `line`；較深的格線以 L2 `--atlas-rule`＝content 與 surface 混色 |
| 深色區塊與其文字（atlas `#283832`＋白、clinician 聯絡區塊＋`#b2ccc8`） | `inverse-surface`、`on-inverse`、`on-inverse-muted` |
| 焦點外框（atlas `#b27648`） | `focus` |
| 主色塊（atlas 書本物件 `#245E50`＋`#f2efe5`、clinician 的 `#24584e` 邊線） | `primary`、`on-primary` |
| 硬陰影（`12px 12px 0 #0003`） | `shadow-hard` |
| hover 底色（atlas `#e1ddce`） | L2：`surface-alt` 混 content |
| clinician 的 `clinical-art` 場景色（約 10 個淺色與灰綠） | 第 7 節例外或 L2 推導，D-T3 決定 |

未對應到的只剩場景插圖一類；其他用途都落在現有角色內，沒有需要新增全域名稱。

批 1（field-notes、essayist、companion、somatic）沿用同一份詞彙，沒有新增全域名稱。版型插圖與漸層的推導寫法：用 `color-mix(in srgb, <角色> N%, var(--color-surface))` 在 primary／secondary／accent 之間取不同角色混色，保留多色感而不收斂成單一色調；深色區塊取 `inverse-surface`／`on-inverse`（somatic 的主視覺與頁首）；等寬字用 `--font-mono`、標題字用 `--font-heading`。

批 2（learning-lab、curator、coach）同樣沒有新增全域名稱。個性色採政策 A：色塊與漸層由色票角色推導——coach 的主視覺與步驟卡在 primary／secondary／accent 之間混色，learning-lab 的單元色塊取 primary／accent／secondary 的 `color-mix()`，curator 的金色取 `color-mix(accent 70%, content)`；反白區塊取 `inverse-surface`／`on-inverse`。

批 3（radio-letter、collective、trust-path）同樣沒有新增全域名稱，並**改用新的漸層推導**（批 2 的 coach 同步改版）：漸層以 `linear-gradient(<角度> in oklch, var(--color-primary), var(--color-secondary), var(--color-accent))` 為標準寫法——主色→強調色為主軸、輔色為中間站，三色取滿值、在 oklch 內插，不再和 surface／content 混色（舊寫法在預設色票下混成大地色，彩度掉太多）。硬邊色帶與同心圓紋理沿用同一組角色。深色版型（radio-letter 的底、trust-path 的主視覺與結尾）取 `inverse-surface`／`on-inverse`，並用 `color-mix()` 推導銅色／青色等點綴；`--rl-*`、`--tp-*` 是版型區域變數，不是全域 Token。

## 10. 已知限制與缺口

1. **殼版型（art-direction 2＋native-expansion 11，共用 `src/data/art-direction-adapters/shared/`）。** 階段 1（載入 `tokens.css`／`theme.css`）與階段 2（語意統一）都已完成。階段 2 的結果：殼不再有私有的 `--brand`／`--ink`／`--bg`／`--panel`／`--accent`／`--serif`——`SiteLayout` 不再寫 `<body style>`，`site.css` 的 `:root` 只剩 `--line`（`color-mix(content 25%, surface)`，殼自己的 L2 派生，保留原本 25%，不是 Token 的 20%）；殼 CSS 一律讀 L1 Token：`--brand`→`--color-primary`、`--ink`→`--color-content`、`--bg`→`--color-surface`、`--panel`→`--color-secondary`、`--accent`→`--color-accent`（值仍是 palette.accent，**強調色在殼上不是 primary**；舊名別名的 `--accent`＝primary 不載入殼）、`--serif`→`--font-heading`、內文字族→`--font-body`、等寬→`--font-mono`。`.pattern-slot` 內給樣板元件用的 `--text`／`--muted`／`--accent` 是樣板容器自己的 L2 變數，保留。字族改讀 Token 的後果：殼版型現在會跟著 `brand.typography` 與 `--brand-heading-font`／`-body-font` 走（先前殼自己寫死字族）；沒有 palette 的舊計畫，殼的底色／字色改用 Token 的預設值。檢查：`shell-token-check.mjs`（殼不得再寫私有設計變數）、`test-shell-tokens.mjs`、`verify-starter-export` FULL（建置後算出值）。別名外洩（tokens 的舊名別名在殼上多出定義）已修：舊名別名拆到 `legacy-aliases.css`，殼不連結（ai-workbench#22，見第 5 節），`audit-shell-vars.mjs` 的 B 類不再有任何白名單。**尚未決定的設計**：共用元件的裝飾（選單底與框、hover 底、樣板與頁尾的底色與頂線）在殼上維持中性值（不出現），要不要讓殼也有，是作者的設計決定，只需改殼宿主契約檔的值。
2. 12 款最初版型的 `DesignChrome.css`／`DesignInterior.astro` 家族字面色覆蓋：reading-atlas、clinician（D-T3 試點）與 field-notes、essayist、companion、somatic（批 1）已轉換；learning-lab、curator、coach（批 2）與 radio-letter、collective、trust-path（批 3）已轉換；12 款最初版型全數完成。
3. 無色票（`palette` 缺省）的舊計畫，`--color-line` 由 content／surface 推導，與先前固定的 `#dad4c9` 略有不同；有色票的匯出站與先前逐元素一致（見 Issue #17 的對照證據）。
4. 與先前行為的一個實質差異：改 `site.config.json` 的 `brand.palette` 後，重新 `npm run build`（或 `npm run sync:theme`）就會換色；先前色票在匯出時被寫死進 `site.css`，只改 config 不會生效。

## 11. 共用元件的宿主契約（階段 1）

共用元件（`StudentNavigation`、`SelectedPatterns`、家族元件）曾直接引用全域 Token（`--color-*`）或 L0 輸入（`--brand-*`）。這假設宿主一定提供它們；殼宿主（見第 10 節）在載入 `tokens.css` 之前沒有，宣告整條無效，載入之後才突然生效（休眠啟用）。契約改為：**共用元件只引用自己的元件變數 `--student-<元件>-*`，值由宿主在 `component-contract.css` 宣告**。

| 元件變數 | 用途 | prototype 宿主的值 | 殼宿主的值（＝現況效果） |
| --- | --- | --- | --- |
| `--student-nav-menu-bg`／`-fg`／`-border`／`-shadow` | 導覽子選單的底色、字色、邊框（整條 shorthand）、陰影 | `--color-surface`／`--color-content`／`1px solid --color-line`／內容色 9% 陰影 | `transparent`／`inherit`／`none`／`none` |
| `--student-nav-hover-bg` | 導覽連結 hover 底色 | 內容色 8% 淡底 | `transparent` |
| `--student-nav-focus-ring` | 導覽連結／摘要／按鈕的鍵盤焦點環顏色（階段 2 新增；原本元件直接讀 `--brand`） | `var(--color-primary)` | `var(--color-primary)` |
| `--student-pattern-bg`、`--student-pattern-rule` | 區段樣板的底色與頂線（整條 shorthand） | `--color-surface`、`3px solid --color-primary` | `transparent`、`none` |
| `--student-footer-rule` | 頁尾頂線（整條 shorthand） | `2px solid --color-primary` | `none` |
| `--student-footer-editorial-bg`／`-professional-bg`／`-professional-fg`／`-minimal-bg` | 三種頁尾的底色與字色 | `--color-surface-alt`／`--color-inverse-surface`／`--color-on-inverse`／`--color-surface` | `transparent`／`transparent`／`inherit`／`transparent` |

| `--student-family-heading-font`／`-body-font`／`-accent` | 家族元件（`DesignInterior`、`ArticleArchive`、`ArticleDetail`、`ServiceSections`、`AboutSections`；殼版型的文章列表／內頁會用到）的標題字族、內文字族、強調色 | `var(--brand-heading-font,Georgia,serif)`／`var(--brand-body-font,system-ui,sans-serif)`／`var(--brand-primary,var(--brand))` | `var(--font-heading)`／`var(--font-body)`／`var(--color-primary)`（階段 2；階段 1 時是 `Georgia,serif`／`system-ui,sans-serif`／`var(--brand)`） |

- 兩個宿主檔：prototype 在 `src/styles/component-contract.css`，殼在 `src/data/art-direction-adapters/shared/component-contract.css`，匯出後都是 `public/component-contract.css`，由各自的 `SiteLayout` 在 `theme.css` 之後、`site.css` 之前連結。**宣告集中在這兩個檔，不散在 13 款版型 CSS。**
- 殼宿主的裝飾值是中性值（這些裝飾在殼上不出現），**不是新設計**；要讓殼也有這些裝飾是設計決定（待作者），屆時只改這份檔的值。階段 2 新增契約變數 `--student-nav-focus-ring`（選單焦點環，原本共用元件直接讀 `--brand`；兩個宿主都宣告為 `var(--color-primary)`）。
- 為什麼不是覆寫壓制：沒有在殼上加任何「把效果壓回去」的選擇器。共用元件的 CSS 與宿主的值各自單一來源，契約變數是明文介面；兩個宿主對同一個介面宣告各自的值。
- 這些是 L2 元件變數，不是全域 Token：不進第 4 節詞彙表，不受第 6 節「名稱即 API」的全域規則約束，但名稱視同元件的公開介面（共用元件新增引用就必須在兩個宿主檔同步宣告，`scripts/test-shell-vars.mjs` 會檢查）。
- 機器檢查：`scripts/audit-shell-vars.mjs`（建置後 dist 的全部 `var(--*)` 引用分 A 引用 Token／B 同名碰撞／C 仍未定義；階段 2 起殼以 L1 Token 為來源，A 只列出不算缺陷，B 必須為空（沒有白名單），C 只准白名單的有後備值選用參數）。階段 1 的動態「不載入 Token 時每個引用元素都已有值」檢查已移除——殼現在依賴 Token，改由連結順序（`shell-token-check.mjs`）、建置後算出值（FULL）與逐元素比對把關。併入 `npm run build` 的測試與 `verify-starter-export` FULL。

## 12. CSS 結算層級（公式型自訂屬性的規則與稽核）

自訂屬性在**宣告它的元素**結算，並以結算後的值往下繼承。所以：**公式型自訂屬性（值含 `var()`／`color-mix()`）的宣告層不得高於它任一原料變數的注入／覆寫層**。層級：`:root`／`html`＝root，`body`＝body，其餘＝element。違反時，上層需求改了（換色票）、公式卻在較高層用舊值結算，下層改不到——殼階段 1 的 `--line` 就是這樣凍結的。修法二擇一：把原料的注入點移到公式的層級或更高（殼的做法：色票由 `theme.css` 在 `:root` 提供），或把公式移到原料的層級；**不准用釘字面值或 `design-fixed` 保留凍結行為**。

稽核：`scripts/audit-css-resolution.mjs`——靜態（公式宣告層高於原料覆寫層即嫌疑）與動態（同站換色票重建後，源自 `var()` 的可見顏色跨色票不變即嫌疑）。分類檔 `scripts/css-resolution-classification.json` 只收「刻意固定」與「裝飾不存在」，需理由與追蹤編號；真漏必須修。說明、對 `main` 的對照組與完整清單見 `D-T-css-resolution-audit-report.md`。
