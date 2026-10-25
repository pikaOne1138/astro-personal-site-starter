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

下列名稱已隨匯出站發布，AI 與既有站都在用，**不得刪除、不得改義**；它們在 `tokens.css` 內是新名的別名，值與先前一致。

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
| `scripts/theme-css.mjs` | 系統檔 | 可替換 |
| 共用版型元件與 CSS（`design-family.css`、`DesignInterior` 等） | 共用檔 | 升級走差異預覽＋學員核准 |

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

## 10. 已知限制與缺口

1. **殼版型（art-direction 2＋native-expansion 11，共用 `src/data/art-direction-adapters/shared/`）。** 階段 1 已完成：殼的 `SiteLayout` 依序連結 `tokens.css`、`theme.css`、`site.css`，所以 L1 語意 Token 在這 13 款可用；**沒有改任何語意**——殼自己的 `--brand`／`--ink`／`--bg`／`--panel`／`--accent`（由 `brand.palette` 在 `<html style>` 寫入）與 `--line`／`--serif`（`site.css`）照舊。**注意：殼內的 `--accent` ＝ `palette.accent`，與第 5 節別名層的 `--accent`（＝primary）意義不同**；殼的行內變數勝出，所以在這 13 款讀 `var(--accent)` 得到的是強調色。`test-shell-tokens.mjs`（靜態）與 `verify-starter-export` FULL（建置後算出值）把這件事固定下來。別名外洩（tokens 的舊名別名在殼上多出定義）另案處理：pikaOne1138/ai-workbench#22，把別名拆成獨立檔，排階段 2 之前。階段 2（排在批 3 之後，與 D-T7 一起）才會統一 `--accent`、把殼的 `site.css` 與行內變數改讀 Token，並把 13 款的字族 Token 化；在那之前，批 1 的 4 款（subject-atlas、practice-compass、portrait-profile、editorial-frontpage）仍以殼變數推導，字族 mono／sans 保留字面值。
2. 12 款最初版型的 `DesignChrome.css`／`DesignInterior.astro` 家族字面色覆蓋：reading-atlas、clinician（D-T3 試點）與 field-notes、essayist、companion、somatic（批 1）已轉換；learning-lab、curator、coach（批 2）已轉換；其餘 3 款（radio-letter、collective、trust-path）在批 3。
3. 無色票（`palette` 缺省）的舊計畫，`--color-line` 由 content／surface 推導，與先前固定的 `#dad4c9` 略有不同；有色票的匯出站與先前逐元素一致（見 Issue #17 的對照證據）。
4. 與先前行為的一個實質差異：改 `site.config.json` 的 `brand.palette` 後，重新 `npm run build`（或 `npm run sync:theme`）就會換色；先前色票在匯出時被寫死進 `site.css`，只改 config 不會生效。

## 11. 共用元件的宿主契約（階段 1）

共用元件（`StudentNavigation`、`SelectedPatterns`、家族元件）曾直接引用全域 Token（`--color-*`）或 L0 輸入（`--brand-*`）。這假設宿主一定提供它們；殼宿主（見第 10 節）在載入 `tokens.css` 之前沒有，宣告整條無效，載入之後才突然生效（休眠啟用）。契約改為：**共用元件只引用自己的元件變數 `--student-<元件>-*`，值由宿主在 `component-contract.css` 宣告**。

| 元件變數 | 用途 | prototype 宿主的值 | 殼宿主的值（＝現況效果） |
| --- | --- | --- | --- |
| `--student-nav-menu-bg`／`-fg`／`-border`／`-shadow` | 導覽子選單的底色、字色、邊框（整條 shorthand）、陰影 | `--color-surface`／`--color-content`／`1px solid --color-line`／內容色 9% 陰影 | `transparent`／`inherit`／`none`／`none` |
| `--student-nav-hover-bg` | 導覽連結 hover 底色 | 內容色 8% 淡底 | `transparent` |
| `--student-pattern-bg`、`--student-pattern-rule` | 區段樣板的底色與頂線（整條 shorthand） | `--color-surface`、`3px solid --color-primary` | `transparent`、`none` |
| `--student-footer-rule` | 頁尾頂線（整條 shorthand） | `2px solid --color-primary` | `none` |
| `--student-footer-editorial-bg`／`-professional-bg`／`-professional-fg`／`-minimal-bg` | 三種頁尾的底色與字色 | `--color-surface-alt`／`--color-inverse-surface`／`--color-on-inverse`／`--color-surface` | `transparent`／`transparent`／`inherit`／`transparent` |

| `--student-family-heading-font`／`-body-font`／`-accent` | 家族元件（`DesignInterior`、`ArticleArchive`、`ArticleDetail`、`ServiceSections`、`AboutSections`；殼版型的文章列表／內頁會用到）的標題字族、內文字族、強調色 | `var(--brand-heading-font,Georgia,serif)`／`var(--brand-body-font,system-ui,sans-serif)`／`var(--brand-primary,var(--brand))` | `Georgia,serif`／`system-ui,sans-serif`／`var(--brand)`（宣告在 `body`，因為殼變數寫在 `<body style>`） |

- 兩個宿主檔：prototype 在 `src/styles/component-contract.css`，殼在 `src/data/art-direction-adapters/shared/component-contract.css`，匯出後都是 `public/component-contract.css`，由各自的 `SiteLayout` 在 `theme.css` 之後、`site.css` 之前連結。**宣告集中在這兩個檔，不散在 13 款版型 CSS。**
- 殼宿主的值等於殼現在的實際效果（這些裝飾在殼上目前不出現），**不是新設計**；要讓殼也有這些裝飾是階段 2 的決定，屆時只改這份檔的值。
- 為什麼不是覆寫壓制：沒有在殼上加任何「把效果壓回去」的選擇器。共用元件的 CSS 與宿主的值各自單一來源，契約變數是明文介面；兩個宿主對同一個介面宣告各自的值。
- 這些是 L2 元件變數，不是全域 Token：不進第 4 節詞彙表，不受第 6 節「名稱即 API」的全域規則約束，但名稱視同元件的公開介面（共用元件新增引用就必須在兩個宿主檔同步宣告，`scripts/test-shell-vars.mjs` 會檢查）。
- 機器檢查：`scripts/audit-shell-vars.mjs`（建置後 dist 的全部 `var(--*)` 引用分 A 休眠啟用／B 同名碰撞／C 仍未定義；A 必須為空，B、C 只准白名單）與其動態版（同一份 dist 不載入 Token 時，每個引用 Token 專屬變數的元素都必須已有值），併入 `npm run build` 的測試與 `verify-starter-export` FULL。

