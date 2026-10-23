

---

## 0. 先說明這份回覆的性質

**我在這個對話中沒有網路搜尋與瀏覽工具，無法開啟網站、看截圖，也無法確認連結是否仍可正常開啟。**

你要求「真的上網搜尋」「實際觀察頁面」，這部分我做不到。若我假裝逐站實測 30 個欄位，字體、色碼、動畫秒數幾乎都會是編造的，拿去設計教學模板風險很大。

因此這份回覆分成兩種可信度：

| 區塊 | 可信度 | 說明 |
|---|---|---|
| 案例池（第一、二部分） | **待驗證** | 憑記憶列出我有把握「存在」的網站與研究假設。**未逐站實測**，視覺細節請以你親眼所見為準。 |
| Pattern、動畫、CTA、文章頁（第三部分） | **中高** | 來自通用的網頁設計慣例與可讀性規範，不是逐站實測結果。 |
| Design Tokens、Design Brief（第四、五部分） | **設計提案** | 我的設計判斷，不是從某站抽取的色碼。對比度請用工具再驗證。 |
| 融合建議（第六部分） | **假設** | 前提是案例池經你驗證。 |

---

## 一、案例池（待驗證）

### A. 知識／部落格型

| # | 名稱 | 類型 | 預期值得研究的點（假設） |
|---|---|---|---|
| 1 | [AstroPaper](https://github.com/satnaing/astro-paper) | Astro 主題 | 極簡部落格、搜尋、標籤、淺深色切換，適合當技術底座 |
| 2 | [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) | Astro 主題 | 個人部落格結構、筆記／文章分流 |
| 3 | [Fuwari](https://github.com/saicaca/fuwari) | Astro 主題 | 中日文圈常見的卡片式部落格、色彩可調 |
| 4 | [Astro Micro](https://github.com/trevortylerlee/astro-micro) | Astro 主題 | 極簡、文章頁細節 |
| 5 | [Astro Nano](https://github.com/markhorn-dev/astro-nano) | Astro 主題 | 極簡首頁、輕量，適合初學者拆解 |
| 6 | [Astro Themes 官方列表](https://astro.build/themes/) | 主題平台 | 篩選 blog／portfolio 類，找出更多候選 |
| 7 | [Astro Showcase](https://astro.build/showcase/) | 官方案例 | 找真實營運的 Astro 內容站 |
| 8 | [Maggie Appleton](https://maggieappleton.com) | 個人知識庫 | 數位花園、手繪插圖、內容成熟度標示 |
| 9 | [Josh W. Comeau](https://joshwcomeau.com) | 專業文章 | 微互動與閱讀體驗，只借少量，整站太複雜 |
| 10 | [Julia Evans](https://jvns.ca) | 技術部落格 | 個人風格強烈，插圖與語氣 |
| 11 | [The Marginalian](https://themarginalian.org) | 長青文章 | 純閱讀導向、長期內容累積 |
| 12 | [Austin Kleon](https://austinkleon.com) | 創作者 | 個人聲音、電子報與部落格結合 |
| 13 | [Derek Sivers](https://sive.rs) | 個人觀點 | 極度精簡的資訊架構（視覺偏陽春，主要看結構） |
| 14 | [Farnam Street](https://fs.blog) | 知識型 | 主題分類、電子報轉換路徑 |
| 15 | [James Clear](https://jamesclear.com) | 創作者 | 電子報訂閱轉換設計（偏商業化，借結構即可） |
| 16 | [Ness Labs](https://nesslabs.com) | 知識型 | 主題分類與內容導覽 |
| 17 | [Andy Matuschak's notes](https://notes.andymatuschak.org) | 筆記型 | 筆記連結與閱讀介面（實作偏難） |
| 18 | [Bear Blog](https://bearblog.dev) | 極簡平台 | 極簡的下限參考 |
| 19 | [Kinfolk](https://kinfolk.com) | 雜誌風 | Editorial 版面、留白、圖文節奏 |
| 20 | [少數派](https://sspai.com) | 中文知識媒體 | 中文排版、分類與卡片（偏媒體規模） |
| 21 | [阮一峰的網路日誌](https://www.ruanyifeng.com/blog/) | 中文個人部落格 | 長期累積型的中文資訊架構 |
| 22 | [Mr.Market 市場先生](https://rich01.com) | 台灣專業內容 | 台灣讀者的內容導覽與訂閱路徑 |
| 23 | [泛科學](https://pansci.asia) | 台灣科普 | 主題分類、文章頁中文排版 |
| 24 | [ほぼ日刊イトイ新聞](https://www.1101.com) | 日本長壽媒體 | 日系溫度感、內容節奏 |
| 25 | [灯台もと暮らし](https://motokurashi.com) | 日本生活媒體 | 日系 editorial 版面 |
| 26 | [北欧、暮らしの道具店](https://hokuohkurashi.com) | 日本內容電商 | 圖文節奏與溫度（電商部分不適用） |

### B. 助人者／個人專業服務型

我憑記憶能確定的，多半是**知名個人品牌**，不是典型的小型心理師或療癒師個人站。它們適合研究 editorial 質感與信任感，不適合直接當小型服務者的規模參考。

| # | 名稱 | 類型 | 預期值得研究的點（假設） |
|---|---|---|---|
| 1 | [Esther Perel](https://estherperel.com) | 心理治療師品牌 | 專業感與編輯感平衡、內容與服務分流 |
| 2 | [Tara Brach](https://www.tarabrach.com) | 冥想／心理師 | 平靜的視覺、內容為入口的轉換路徑 |
| 3 | [Brené Brown](https://brenebrown.com) | 研究者／作者 | 溫暖品牌感、資源分層 |
| 4 | [The Holistic Psychologist](https://www.theholisticpsychologist.com) | 心理學創作者 | 現代溫暖風、社群導流（偏商業化） |
| 5 | [Gabor Maté](https://drgabormate.com) | 醫師／作者 | 資歷與內容整合 |
| 6 | [Kristin Neff, Self-Compassion](https://self-compassion.org) | 研究者 | 資源型網站的低壓力入口 |
| 7 | [Good Inside](https://www.goodinside.com) | 臨床心理師品牌 | 溫暖視覺與課程／內容分流（偏平台） |
| 8 | [Martha Beck](https://www.marthabeck.com) | 教練 | 教練類品牌的 CTA 語氣 |
| 9 | [Susan David](https://www.susandavid.com) | 心理學者／顧問 | 專業顧問型的克制版面 |
| 10 | [Marie Forleo](https://www.marieforleo.com) | 教練／創業 | 反例研究：銷售感較強，可對照 CTA 差異 |
| 11 | [Therapy in a Nutshell](https://therapyinanutshell.com) | 心理治療內容站 | 資源導向的組織方式 |

**我無法從記憶可靠列出的類型，需要你實際搜尋補足：**
- 小型獨立心理師、諮商師、催眠師、身體工作者的真實個人網站，這是你最需要的類別
- 台灣、香港、日本的個人心理與療癒服務站
- Squarespace、Showit、Framer、Webflow 的療癒與教練模板

### 建議搜尋入口與關鍵字

| 來源 | 關鍵字 |
|---|---|
| [Framer Marketplace](https://www.framer.com/marketplace/templates/) | therapist、coach、wellness、personal blog、editorial |
| [Webflow Templates](https://webflow.com/templates) | therapist、counselor、coaching、journal |
| [Squarespace Templates](https://www.squarespace.com/templates) | wellness、therapist、coach |
| [Showit](https://showit.co) | coach、therapist、wellness（教練與服務者模板很多） |
| [SiteInspire](https://www.siteinspire.com) | 篩選 Personal、Editorial、Health |
| [Land-book](https://land-book.com) | therapy、wellness、coaching |
| [One Page Love](https://onepagelove.com) | therapist、coach |
| [Awwwards](https://www.awwwards.com) | 只借美感，勿借複雜度 |
| 中文搜尋 | 「臨床心理師 個人網站」「諮商心理所」「身心靈 工作者 官網」「催眠師 預約」 |
| 日文搜尋 | 「カウンセリングルーム」「心理カウンセラー ホームページ」「整体 個人サロン」 |

### 每站調查表（精簡版）

你的 30 個欄位可以濃縮成 8 組，逐站看時更有效率：

1. **基本**：名稱、網址、類型、歸屬（知識／助人者／兩者）
2. **視覺**：風格、字體、色彩、留白節奏、卡片、圖片
3. **結構**：首頁資訊架構、導航、Hero、頁尾
4. **互動**：動畫、手機版重點
5. **內容頁**：部落格、服務頁、About、FAQ
6. **信任**：推薦、見證、媒體、資歷、合作品牌
7. **轉換**：預約／表單、電子報、轉換路徑、CTA 語氣
8. **評估**：值得借的 20%、不適合初學者的部分、Astro 難度、是否列入、理由

---

## 二、暫定優先驗證名單（假設，非實測排名）

**知識／部落格 Top 10（優先驗證順序）**
1. Maggie Appleton（知識組織與個人感）
2. The Marginalian（純閱讀）
3. Kinfolk（editorial 版面）
4. AstroPaper（技術底座）
5. Fuwari（中日文圈卡片風）
6. 灯台もと暮らし（日系 editorial）
7. 泛科學（中文文章頁）
8. Farnam Street（主題分類）
9. Austin Kleon（個人聲音）
10. Josh W. Comeau（微互動，只借少量）

**助人者 Top 10（優先驗證順序）**
1. Esther Perel
2. Tara Brach
3. Brené Brown
4. Susan David
5. Therapy in a Nutshell
6. Martha Beck
7. Gabor Maté
8. Kristin Neff
9. The Holistic Psychologist
10. Good Inside

這份名單偏向大型個人品牌。你實際搜尋後，應該以真實小型執業者站台替換其中至少一半。

---

## 三、跨案例 Pattern Analysis（基於設計慣例）

### 3.1 導航列模式

| 模式 | 適用 | 評價 |
|---|---|---|
| Logo＋3～5 個文字連結＋右側 CTA | 兩者 | 最穩，初學者最好維護 |
| Sticky header＋捲動後加背景與 border | 兩者 | 實作簡單、質感提升明顯，推薦 |
| 透明 header 疊在 Hero 上 | 助人者 | 好看但對比度難控，需要 Hero 圖有深色區，初學者易出錯 |
| 極簡文字導航（無底色） | 知識 | 有編輯感，需控制連結數量 |
| 漢堡選單（僅手機） | 兩者 | 必備，桌機不要用 |
| Mega menu | 無 | 不適合，兩種模板內容量都不夠 |
| 行動版 bottom navigation | 無 | 偏 App 感，不建議 |
| 搜尋按鈕 | 知識 | 文章超過約 30 篇才有價值，用 Pagefind 這類靜態搜尋 |
| 深淺色切換 | 知識 | 加分項，助人者不建議 |
| 語言切換 | 視需求 | 雙語站才做，會讓初學者複雜度大增 |

**A. 知識／部落格推薦導航**

```text
桌機：
[Logo／站名]   文章｜主題｜關於｜資源          [搜尋]  [訂閱電子報]

手機：
[Logo／站名]                                    [搜尋] [☰]
  └ 展開：文章 / 主題 / 關於 / 資源 / [訂閱電子報]
```

**B. 助人者推薦導航**

```text
桌機：
[姓名／工作室名]   關於我｜服務內容｜文章｜常見問題      [預約初談]

手機：
[姓名／工作室名]                                      [☰]
  └ 展開：關於我 / 服務內容 / 文章 / 常見問題 / [預約初談]
```

助人者導航的設計原則：
- 連結不超過 5 個。
- CTA 只放一個。
- 不放搜尋與深色模式。
- 預約按鈕可在手機版常駐於頁面底部，但要小而克制，且能關閉或不遮擋內容。

### 3.2 首頁區塊分析

**知識／部落格**

| 區塊 | 判斷 |
|---|---|
| Hero（一句定位＋簡短介紹） | 必備，但要短，不要做成大圖橫幅 |
| 精選／最新文章 | 必備，首頁的主角 |
| 主題分類 | 加分，也是 SEO 內部連結的好入口 |
| About 簡短區塊 | 必備，用一小段文字加一張照片即可 |
| Newsletter | 必備，放在文章列表之後與頁尾前 |
| 熱門文章 | 可晚點做，內容少時沒有意義 |
| Featured resources | 有產品或資源時才加 |
| Social links | 放頁尾即可，不要獨立成區 |

建議順序：Hero → 精選文章（1 大 2～3 小）→ 最新文章 → 主題分類 → About → Newsletter → Footer。

**助人者**

| 區塊 | 判斷 |
|---|---|
| Hero（定位＋一個 CTA） | 必備 |
| 「你是否正在經歷……」 | 常見，但易流於罐頭。建議改寫成一段有溫度的散文，而不是打勾清單 |
| 我可以怎麼幫你 | 必備，與服務項目合併即可 |
| 服務項目（2～4 項） | 必備，用編輯式卡片而不是三欄 icon |
| 適合對象 | 可併入服務頁，不必在首頁獨立成區 |
| 方法／理念 | 加分，最能區隔個人風格，寫短一點 |
| 個人介紹 | 必備，要有真人照片，高信任感來源 |
| 專業資歷 | 必備，用列表呈現 |
| Testimonials | 視職業而定，見下方倫理提醒 |
| FAQ | 加分，能降低預約焦慮 |
| 預約 CTA | 必備，放在頁尾前 |
| Footer | 必備，含聯絡方式與專業聲明 |

建議順序：Hero → 簡短共鳴段落 → 我如何陪伴你（方法）→ 服務概覽 → 關於我（帶照片）→ 資歷 → FAQ → 低壓力 CTA → Footer。

**容易變成罐頭 Landing Page 的訊號：**
- 每區都是 icon＋標題＋三欄文字
- 數字統計條（「服務超過 1,000 人」）
- 五星評價輪播
- 每個區塊結尾都有一顆按鈕
- 使用過多「改變人生」「蛻變」等空泛詞

**倫理提醒（請自行向公會與法規確認，我不提供法律意見）：** 台灣的心理師、諮商心理師對廣告與個案見證通常有較嚴格的專業倫理限制。對這類職業，建議以資歷、受訓背景、工作方式與 FAQ 取代個案見證，並避免療效保證用語。教練、顧問、身體工作者的限制通常較寬，但仍要避免誇大。

### 3.3 動畫清單

全部都要包在這個前提下：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

| 動畫 | 放哪裡 | 時間／easing | 距離 | 手機 | 效能 | 初學者模板 |
|---|---|---|---|---|---|---|
| fade-up（進場） | Hero、區塊標題 | 600ms／`cubic-bezier(.22,1,.36,1)` | 12～16px（手機 8～12） | 適合 | 低 | **建議**，需要少量 JS（IntersectionObserver），或僅對 Hero 用純 CSS |
| stagger reveal | 卡片列 | 每項延遲 60～80ms，上限 4～5 項 | 同上 | 適合，項數少 | 低 | 建議（CSS 變數設延遲） |
| 圖片 hover 放大 | 文章卡片、服務卡片 | 600～800ms／ease-out | scale 1.03～1.05 | 觸控無 hover，自然略過 | 低（用 transform） | **建議**，純 CSS |
| 連結底線動畫 | 導航、文內連結 | 250ms／ease | 底線由左向右 | 略過 | 低 | **建議**，純 CSS |
| 按鈕箭頭滑動 | CTA | 250ms／ease-out | 4～6px | 略過 | 低 | **建議**，純 CSS |
| 卡片 lift | 卡片 | 250ms／ease-out | translateY(-2～-4px)，陰影略增 | 略過 | 低 | 建議，幅度要小 |
| navbar blur＋背景 | Header | 200～300ms | — | 適合 | `backdrop-filter` 在低階手機稍吃效能 | 建議，可降級成純色背景；需要少量 JS 判斷捲動 |
| Sticky TOC | 文章頁 | 無 | — | 桌機才用 | 低 | 建議，純 CSS `position: sticky` |
| 閱讀進度條 | 文章頁頂端 | 隨捲動 | — | 適合 | 用 JS 時要節流 | 加分，需要 JS；可用 CSS scroll-timeline 但支援度需查證 |
| smooth anchor | 錨點連結 | — | — | 適合 | 低 | **建議**，`scroll-behavior: smooth`＋`scroll-margin-top` 避開 sticky header |
| 文字螢光筆效果 | 重點詞 | 700ms | 背景由左展開 | 適合 | 低 | 加分，用於少量關鍵詞 |
| subtle parallax | Hero 圖 | 隨捲動 | ≤ 20px | **建議手機關閉** | 中 | 先不做 |
| 漸層緩動 | 背景 | 10 秒以上 | — | — | 中 | 先不做，易變成 AI 風 |
| reveal mask／clip-path | 圖片進場 | 800～1000ms | — | 適合 | 中 | 可選，整站最多用 1～2 處 |
| page transition | 頁面切換 | 250～400ms | — | 適合 | 中 | Astro 有 View Transitions，可選，容易有 bug，初學者先不做 |

**原則：** 全站同一套 easing 與時間，用 CSS 變數管理，一致性比花樣更重要。

### 3.4 CTA 分析

**語氣光譜：**

| 偏銷售（避免） | 中性（可用） | 偏信任（助人者優先） |
|---|---|---|
| 立即購買、馬上搶、限時優惠、名額有限 | 立即預約、了解更多 | 預約初談、看看這項服務是否適合你、了解合作方式、與我聊聊你的需求、從這裡開始 |

「立即預約」本身不是錯，但在單一頁面重複出現會製造壓力。改成「預約初談」或「了解合作方式」，會讓使用者覺得是先認識而不是被要求決定。

**知識／部落格 CTA 層級**

| 層級 | 範例 |
|---|---|
| Primary | 訂閱電子報（附一句價值說明：每週一封，不寄廣告） |
| Secondary | 從這裡開始讀、瀏覽所有主題 |
| Low-pressure | 看看我最常被讀的 5 篇、追蹤 RSS、認識作者 |

**助人者 CTA 層級**

| 層級 | 範例 |
|---|---|
| Primary | 預約初談（含時長與形式說明，例如「20 分鐘，線上」） |
| Secondary | 了解合作方式、看看服務內容 |
| Low-pressure | 先讀幾篇文章、看看常見問題、寄一封信給我 |

助人者站有一個細節：按鈕旁邊加一行小字說明下一步會發生什麼事（「填寫簡短表單，我會在 2 個工作天內回覆」），比換按鈕文案更能降低焦慮。

### 3.5 文章頁規格

| 項目 | 建議值 | 等級 |
|---|---|---|
| 最大閱讀寬度 | 中文 640～720px（約 32～40 字／行）；英文 65～75 字元 | 必備 |
| 內文字級 | 17～19px（手機不低於 16px） | 必備 |
| 行距 | 中文 1.8～1.9，英文 1.6～1.7 | 必備 |
| 標題比例 | h1 約 2.0～2.5em，h2 1.5em，h3 1.25em，比例 1.2～1.25 | 必備 |
| 發布日期 | 顯示 | 必備 |
| 更新日期 | 有更新才顯示 | 加分 |
| 閱讀時間 | 簡單計算即可 | 加分 |
| Tag／Category | 分類必備，Tag 可晚點 | 必備／加分 |
| 作者資訊 | 文末一小塊 | 必備（對助人者尤其重要） |
| 目錄 TOC | 長文才顯示 | 加分 |
| Sticky TOC | 桌機側邊 | 可晚點 |
| 閱讀進度條 | 需要 JS | 可晚點 |
| 相關文章 | 同分類 3 篇 | 加分 |
| 上一篇／下一篇 | 簡單 | 加分 |
| 引言（lead） | 開頭段落放大 | 可選 |
| Callout | 提示框 | 加分 |
| 圖片＋Figure caption | 圖片必備，caption 加分 | 必備／加分 |
| Code block | 技術內容才需要，Astro 內建 Shiki | 視內容 |
| Quote | 引用樣式 | 必備 |
| Footnote | Markdown 支援 | 可晚點 |
| 文末 Newsletter CTA | 低壓力版本 | 加分 |
| 分享按鈕 | 可先不做，複製連結即可 | 可晚點 |

---

## 四、CSS 視覺系統（設計提案，非抽取自特定網站）

**字體原則：**
- 全部使用 Google Fonts 等可合法使用的開源字體。
- 中文 Web Font 檔案很大（數 MB），教學模板應提醒學員**使用子集化、`font-display: swap`、只載入需要的字重**，或以系統字體作 fallback。
- 以下對比度為估計值，請用對比檢查工具再驗證（正文需達 4.5:1）。

### A. 知識／部落格

**A1 Editorial Magazine**

| Token | 值 |
|---|---|
| Background | `#FAF8F4` |
| Surface | `#FFFFFF` |
| Text | `#1C1B19` |
| Muted | `#6B665F` |
| Accent | `#B3402A` |
| Accent hover | `#8F3220` |
| Border | `rgba(28,27,25,.12)` |
| Heading | Noto Serif TC（拉丁字可搭 Playfair Display） |
| Body | Noto Sans TC |
| Radius | 2px |
| Shadow | 無，用細線分隔 |
| Container／Prose | 1200px／680px |
| Section spacing | 96～128px |
| 卡片 | 無外框，3:2 圖片＋襯線標題＋小字 meta，卡片間用細線 |

**A2 Minimal Japanese**

| Token | 值 |
|---|---|
| Background | `#F7F6F2` |
| Surface | `#FDFCFA` |
| Text | `#2B2A28` |
| Muted | `#6F6A62` |
| Accent | `#5C6B5A` |
| Accent hover | `#46533F` |
| Border | `rgba(43,42,40,.10)` |
| Heading | Zen Kaku Gothic New 或 Shippori Mincho |
| Body | Noto Sans TC |
| Radius | 0～4px |
| Shadow | 無 |
| Container／Prose | 960px／640px |
| Section spacing | 112～144px |
| 卡片 | 純文字列表為主，日期＋標題，極少圖片 |

**A3 Warm Personal Journal**

| Token | 值 |
|---|---|
| Background | `#F6EFE4` |
| Surface | `#FFFAF2` |
| Text | `#33291F` |
| Muted | `#75685A` |
| Accent | `#9A5A3C` |
| Accent hover | `#7C4429` |
| Border | `rgba(51,41,31,.14)` |
| Heading | LXGW WenKai TC（霞鶩文楷）或 Noto Serif TC |
| Body | Noto Sans TC |
| Radius | 12px |
| Shadow | `0 6px 20px rgba(51,41,31,.06)` |
| Container／Prose | 1080px／700px |
| Section spacing | 88～112px |
| 卡片 | 米色底圓角卡，圖片在上，手寫感標籤 |

**A4 Modern Knowledge Base**

| Token | 值 |
|---|---|
| Background | `#FBFBFA` |
| Surface | `#FFFFFF` |
| Text | `#1F2328` |
| Muted | `#5F6670` |
| Accent | `#2F5D8A` |
| Accent hover | `#244A6E` |
| Border | `rgba(31,35,40,.12)` |
| Heading／Body | Inter＋Noto Sans TC；程式碼用 JetBrains Mono |
| Radius | 8px |
| Shadow | `0 1px 2px rgba(0,0,0,.05)` |
| Container／Prose | 1200px（含側欄）／720px |
| Section spacing | 72～96px |
| 卡片 | 有外框、含分類標籤，資訊密度高 |

**A5 Dark Intellectual**

| Token | 值 |
|---|---|
| Background | `#15140F` |
| Surface | `#1D1B17` |
| Text | `#ECE7DD` |
| Muted | `#A39C8F` |
| Accent | `#D9A441` |
| Accent hover | `#E8B95C` |
| Border | `rgba(236,231,221,.12)` |
| Heading | Source Serif 4 或 Noto Serif TC |
| Body | Inter＋Noto Sans TC |
| Radius | 6px |
| Shadow | 無，用邊框取代 |
| Container／Prose | 1120px／680px |
| Section spacing | 96px |
| 卡片 | 深色面板、細邊框、hover 時邊框變亮 |

### B. 助人者

**B1 Warm Therapeutic**

| Token | 值 |
|---|---|
| Background | `#F8F3EC` |
| Surface | `#FFFCF7` |
| Text | `#2E2823` |
| Muted | `#6F655B` |
| Accent | `#A4583A` |
| Accent hover | `#8A4730` |
| Accent soft | `#EBD9CB` |
| Border | `rgba(46,40,35,.12)` |
| Heading | Noto Serif TC（拉丁字可搭 Cormorant Garamond） |
| Body | Noto Sans TC |
| Radius | 卡片 16px、按鈕 10px |
| Shadow | `0 8px 24px rgba(46,40,35,.06)` |
| Container | 1120px |
| Section spacing | 96～120px |
| 卡片 | 暖色圓角卡，內文偏多，圖片溫和 |

**B2 Botanical Wellness**

| Token | 值 |
|---|---|
| Background | `#F4F4EC` |
| Surface | `#FBFBF6` |
| Text | `#26302A` |
| Muted | `#66705F` |
| Accent | `#4F6B4A` |
| Accent hover | `#3E5539` |
| Accent soft | `#DCE4D2` |
| Border | `rgba(38,48,42,.12)` |
| Heading | Fraunces 或 Noto Serif TC |
| Body | DM Sans＋Noto Sans TC |
| Radius | 卡片 20px，圖片可用拱形（上緣半圓） |
| Shadow | 極淡 |
| Container／Section | 1100px／96～120px |
| 卡片 | 大圓角、鼠尾草綠點綴，圖片取自自然質感 |

**B3 Editorial Professional**

| Token | 值 |
|---|---|
| Background | `#FBFAF7` |
| Surface | `#FFFFFF` |
| Text | `#1B1F23` |
| Muted | `#5E646B` |
| Accent | `#1F3A4D` |
| Accent hover | `#15293A` |
| Border | `rgba(27,31,35,.12)` |
| Heading | Source Serif 4＋Noto Serif TC |
| Body | Inter＋Noto Sans TC |
| Radius | 4px |
| Shadow | 幾乎無 |
| Container／Section | 1160px／104～128px |
| 卡片 | 編號式服務列表、細線分隔，像雜誌目錄 |

**B4 Calm Minimal**

| Token | 值 |
|---|---|
| Background | `#F5F4F1` |
| Surface | `#FFFFFF` |
| Text | `#2A2A2A` |
| Muted | `#6E6E6A` |
| Accent | `#4F6370` |
| Accent hover | `#3E505B` |
| Border | `rgba(42,42,42,.10)` |
| Heading／Body | Noto Sans TC（標題用輕字重）或 Zen Kaku Gothic New |
| Radius | 6px |
| Shadow | 無 |
| Container／Section | 1040px／128px |
| 卡片 | 幾乎沒有卡片感，以留白與文字層次分區 |

**B5 Spiritual but Modern**

| Token | 值 |
|---|---|
| Background | `#F6F1EE` |
| Surface | `#FFFAF7` |
| Text | `#2B2328` |
| Muted | `#6C6168` |
| Accent | `#7A4B5E` |
| Accent hover | `#623B4B` |
| Secondary（金） | `#B8935A`（僅用於裝飾，不當文字色） |
| Border | `rgba(43,35,40,.12)` |
| Heading | Cormorant Garamond＋Noto Serif TC |
| Body | Karla＋Noto Sans TC |
| Radius | 14px |
| Shadow | `0 10px 30px rgba(43,35,40,.07)` |
| Container／Section | 1080px／104～128px |
| 卡片 | 柔和圓角、少量細金線裝飾；避免紫藍霓虹與玻璃擬態 |

---

## 五、兩套模板 Design Brief

### 模板 A｜知識／部落格

1. **核心風格**：Warm Personal Journal 與 Editorial Magazine 的折衷。以閱讀為中心，有人味，不像媒體網站那麼擁擠。
2. **目標使用者**：個人知識整理者、創作者、專業文章寫作者，要長期累積內容。
3. **Sitemap**：首頁／文章列表／文章頁／主題分類頁／關於／資源（可選）／訂閱／404。
4. **Navbar**：`[站名] 文章｜主題｜關於｜資源 [搜尋][訂閱電子報]`，sticky，捲動後加細線與輕微背景。
5. **Homepage Sections**：Hero → 精選文章 → 最新文章 → 主題分類 → About → Newsletter → Footer。
6. **Article layout**：單欄 680～700px，標題區（分類、標題、日期、閱讀時間）→ 內文 → 文末作者簡介 → 相關文章 → 上下篇。長文才顯示 TOC。
7. **About page**：照片＋故事式長文＋你在寫什麼、為誰而寫＋聯絡方式。
8. **CTA**：Primary 訂閱電子報；Secondary 從這裡開始；Low-pressure 看精選文章。
9. **Color palette**：用 A3 為主，A1 的紅色作為替代 accent。
10. **Typography**：標題襯線（Noto Serif TC），內文 Noto Sans TC，17～18px，行距 1.85。
11. **Buttons**：實心 accent 一種、文字連結加箭頭一種，兩種就夠。
12. **Cards**：圖片 3:2，標題、一行摘要、日期與分類，hover 圖片微放大。
13. **Images**：統一比例、圓角一致；允許無圖文章，用純文字卡片。
14. **Micro animations**：fade-up、圖片 hover、連結底線、按鈕箭頭、smooth anchor；全部支援 reduced-motion。
15. **Mobile behavior**：單欄、漢堡選單、字級不小於 16px、卡片改為垂直堆疊。
16. **Footer**：站名、簡短一句話、主要連結、社群連結、RSS、版權；Newsletter 可放此處。
17. **必做元件**：Header、Footer、文章卡片、文章頁佈局、分類標籤、Newsletter 表單、按鈕、Prose 樣式。
18. **可選元件**：搜尋、TOC、閱讀進度、深色模式、相關文章、Callout。
19. **不建議加入**：留言系統、大量社群嵌入、彈出視窗訂閱、無限捲動、輪播、粒子或漸層背景。
20. **最值得參考的 5 個網站（待驗證）**：Maggie Appleton、The Marginalian、AstroPaper、Fuwari、灯台もと暮らし。

### 模板 B｜助人者

1. **核心風格**：Warm Therapeutic 與 Calm Minimal 的折衷。溫暖、安靜、有真人感，不強推銷。
2. **目標使用者**：心理師、諮商師、催眠師、療癒師、身體工作者、教練、顧問等個人執業者。
3. **Sitemap**：首頁／關於我／服務內容（可含各服務子頁）／文章（可選）／常見問題／聯絡預約／隱私與專業聲明。
4. **Navbar**：`[姓名] 關於我｜服務內容｜文章｜常見問題 [預約初談]`，只放一個 CTA。
5. **Homepage Sections**：Hero → 共鳴短文 → 我如何陪伴你 → 服務概覽 → 關於我 → 資歷 → FAQ → 低壓力 CTA → Footer。
6. **Service page**：這項服務是什麼 → 適合哪些情況（用散文）→ 過程會怎麼進行 → 時間、形式、費用 → FAQ → 預約 CTA。
7. **About page**：真人照片＋你的故事與立場＋受訓背景與資歷＋工作方式；不要寫成履歷清單。
8. **CTA**：Primary 預約初談；Secondary 了解合作方式；Low-pressure 先讀文章或看 FAQ；按鈕旁加一行說明。
9. **Color palette**：以 B1 為主，可替換為 B2 或 B4 的色票。
10. **Typography**：標題襯線、內文無襯線，字級 17～18px，行距 1.85。標題字重不要過重。
11. **Buttons**：實心主按鈕、描邊次按鈕、文字連結；圓角 10px，不用全圓膠囊以免像 App。
12. **Cards**：服務卡片以文字為主，加一行適合情境與「了解更多」連結；數量 2～4 張，不用三欄 icon。
13. **Images**：優先使用真實人像與工作空間照；沒有照片時用柔和抽象紋理或留白，**避免庫存圖中的假笑模特兒**。
14. **Micro animations**：fade-up、連結底線、按鈕箭頭、圖片輕微放大；節奏要比部落格更慢、更少。
15. **Mobile behavior**：單欄、預約按鈕在選單內與頁面尾端各一個；表單欄位少、字大；電話與 Email 可一鍵點擊。
16. **Footer**：姓名與執業資訊、聯絡方式、地點或線上說明、專業聲明（例如不提供緊急危機服務與求助資源）、隱私政策。
17. **必做元件**：Header、Footer、Hero、服務卡、About 區塊、FAQ（手風琴）、CTA 區塊、聯絡表單或預約連結。
18. **可選元件**：文章系統、Newsletter、資歷時間軸、推薦語（視職業倫理而定）。
19. **不建議加入**：倒數計時、限時優惠、庫存假見證、星級評價、浮動聊天機器人、自動播放影片、彈窗、強烈漸層。
20. **最值得參考的 5 個網站（待驗證）**：Esther Perel、Tara Brach、Susan David、Therapy in a Nutshell，另外請補入至少 1 個你實際搜到的小型獨立執業者網站。

---

## 六、如果各做一套模板：該融合哪些元素（假設）

**模板 A（知識／部落格）**
- **Maggie Appleton**：內容分類方式與個人感，借「成熟度標示」概念，不照搬花園圖譜。
- **The Marginalian／Kinfolk**：文章頁的留白、字級與圖文節奏。
- **AstroPaper**：技術骨架（內容集合、標籤、搜尋），因為已是 Astro，學員拆解成本最低。
- **Fuwari**：中日文圈的卡片與色彩客製方式。
- **Josh W. Comeau**：只借一兩個微互動的「手感」，不借整體複雜度。

**模板 B（助人者）**
- **Esther Perel／Susan David**：專業 editorial 感、克制的資訊層級。
- **Tara Brach**：平靜的視覺節奏、以內容建立信任而非強推預約。
- **Therapy in a Nutshell**：以資源與文章作為低壓力入口。
- **小型執業者網站（需你補）**：服務頁與預約流程，這是前述大型品牌最缺的參考。

---

## 下一步

要把這份假設變成實測依據，可以選其中一種：

1. **你提供 URL 或截圖**：貼給我 8～15 個你實際看過、覺得好的網站（尤其是小型心理師、療癒師站與台灣、日本案例），我會用第一部分的調查表逐站拆解，並修正第四到第六部分。
2. **在有瀏覽能力的環境執行**：把第一部分的搜尋入口與調查表交給具備網頁瀏覽的工具，再把結果貼回來，由我做 Pattern Analysis 與 Design Brief 收斂。
3. **先決定風格方向**：從 A1～A5、B1～B5 各挑 1～2 套，我可以再細化成更具體的元件規格與版面草圖（文字版）。