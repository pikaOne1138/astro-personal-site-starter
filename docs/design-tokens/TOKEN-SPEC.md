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

### 字體、圖片
`--font-heading`、`--font-body`（由 `brand.typography` 決定預設）、`--font-mono`（固定）、`--image-filter`（由 `brand.imageStyle` 決定）。

### 圓角、間距、寬度、陰影
- 圓角：`--radius-sm`（.25rem）、`-md`（8px）、`-lg`（1rem）、`-pill`（999px）
- 間距：`--space-1` … `-6`（.5／1／1.5／2／3／5 rem）、`--space-section`、`--space-gutter`
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

主題字面值只允許出現在：(a) `tokens.css` 本身；(b) 帶註記的固定值：`/* design-fixed: <原因> */`，原因限 `brand-logo`（品牌標誌）、`third-party-embed`（第三方嵌入）、`illustration`（手繪場景，不隨主題變）。建議插圖也盡量以 `color-mix()` 由 Token 推導，使場景一起換色；是否例外由 D-T3 在 clinician 的 `clinical-art` 場景實測後決定。透明度黑（`rgb(0 0 0 / x)`）與 `transparent`、`currentColor`、`inherit` 不算主題色。

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

完成定義：任取兩款性質不同的 Layout，能共用同一份詞彙而不需新增版型專屬全域名稱。以兩款試點（reading-atlas 知識型、clinician 助人者型）讀其 `<style>` 規則，逐一對應的結果如下；這是**靜態對照**，真正的「零字面值」證據在 D-T3。

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

## 10. 已知限制與缺口

1. **art-direction 兩款（subject-atlas、practice-compass）不在本次範圍。** 它們由 `export-art-direction-starter.mjs` 匯出，`shared/site.css` 自帶固定 `:root` 色票，匯出器完全不讀 `brand.palette`（盤點時發現）。這兩款目前連色票換色入口都沒有，需另案處理，不隨 D-T2 順手改。
2. 12 款最初版型的 `DesignChrome.css`／`DesignInterior.astro` 仍以家族字面色覆蓋 Token，在 D-T3 處理。
3. 無色票（`palette` 缺省）的舊計畫，`--color-line` 由 content／surface 推導，與先前固定的 `#dad4c9` 略有不同；有色票的匯出站與先前逐元素一致（見 Issue #17 的對照證據）。
4. 與先前行為的一個實質差異：改 `site.config.json` 的 `brand.palette` 後，重新 `npm run build`（或 `npm run sync:theme`）就會換色；先前色票在匯出時被寫死進 `site.css`，只改 config 不會生效。
