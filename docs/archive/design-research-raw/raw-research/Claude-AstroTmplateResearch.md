# Astro 工作坊模板視覺研究（知識／部落格 × 助人者）

研究日期：2026-10-07　｜　方法：WebSearch ＋ WebFetch ＋ 真實 Chrome 開頁截圖與讀取 computed CSS

---

## 0. 先講清楚：這份研究實際做到什麼、沒做到什麼

為了讓你能判斷結論的可信度，每個案例標了驗證等級：

- 🟢 **截圖＋實測 CSS**：我在 Chrome 開啟頁面、看到截圖，並讀取 computed style（字體、色碼、字級、transition）
- 🟡 **只有截圖**：看到畫面，但 CSS 沒量（或只量一部分）
- 🔵 **只有文字**：用 WebFetch／模板商城描述讀取，沒看到畫面。這類的視覺描述只能當線索

**沒做到、需要你知道的缺口：**

1. **Awwwards、SiteInspire、Land-book、One Page Love、Behance、Dribbble、Pinterest、ThemeForest、Webflow／Squarespace 模板庫沒有實際逐一挖掘。** 搜尋引擎對這些平台回傳的都是文章或行銷頁，不是作品頁；Pinterest／Behance 也多半擋自動化存取。我不想用記憶補一堆「看起來合理」的作品網址，所以沒有列。
2. **台灣／香港／日本的真實助人者（心理師、療癒師）網站，我沒有找到可驗證的案例。** 搜尋結果幾乎都是英語圈。亞洲案例我只驗證了知識／媒體類（泛科學、少數派）與你自己的光之伊甸。這是最大的缺口，建議你貼 5–10 個你欣賞的亞洲站網址，我用 Chrome 逐站拆。
3. **手機版沒有實測**（沒有縮窗截圖），所以「手機版值得注意」欄位多為空白或標「未驗證」。
4. **30 欄位沒有逐站填滿。** 我只填「我真的看得到的」，其餘標未驗證，不編。
5. 三個站打不開或被擋：Eliana Goldstein（瀏覽器顯示錯誤頁）、sive.co（錯誤頁）、therapywithgayane.com／inespandzic.com（WebFetch 被 robots 擋，我沒有再用 Chrome 補開）。
6. 設計代幣中，標「實測」的才是從站台讀到的值；標「建議」的是我依案例邏輯設計的，**對比度我用程式算過**（見第 4 節）。
7. Google Fonts 授權我沒有逐一開授權頁確認，上線前請核對。

---

## 第一部分：案例池

### A. 知識／部落格型

| # | 站名 / 網址 | 驗證 | 類型 | 一句話觀察 | Astro 難度 | 列為最終參考？ |
|---|---|---|---|---|---|---|
| A1 | Maggie Appleton — https://maggieappleton.com/ | 🟢 | 數位花園（長文＋筆記＋模式庫） | 暖灰白底、超大襯線標題、卡片＋筆記清單雙欄、文章頁有左側可收合目錄與「預設讀者」提示框 | 中 | ✅ 核心 |
| A2 | Ness Labs — https://nesslabs.com/ | 🟢 | 知識型電子報／社群 | 首屏就是「標題＋Email 欄位」，下方媒體 logo 帶、三欄 icon 介紹、兩則見證 | 低–中 | ✅ 取轉換邏輯 |
| A3 | James Clear — https://jamesclear.com/ | 🟢 | 作者個人品牌 | 導覽置中、首屏一張大書封、最新電子報清單、免費 Email 課程報名 | 低 | ✅ 取導覽與訂閱 |
| A4 | AstroPaper（Astro 主題）demo — https://astro-paper.pages.dev/ | 🟢 | 極簡部落格主題 | 等寬字、Posts／Tags／About＋搜尋＋深淺色切換、Featured 清單。社群資料顯示 GitHub 3.5k+ 星 | 低 | ✅ 結構骨架 |
| A5 | Josh W. Comeau — https://www.joshwcomeau.com/ | 🟢 | 技術教學部落格 | 天空雲朵插畫頁首、分類膠囊標籤、Popular 清單；導覽含搜尋／音效／主題切換／RSS | 中–高（插畫與互動多） | ⚠️ 只借分類膠囊與清單 |
| A6 | The Marginalian — https://www.themarginalian.org/ | 🟡 | 人文長文 | 黃色橫幅刊頭、窄欄正文、標題用「螢光筆」黃底、大引號 pull quote；版面擁擠 | 中 | ⚠️ 只借螢光筆標題與引言 |
| A7 | Austin Kleon — https://austinkleon.com/ | 🟡 | 創作者部落格 | 黑色頂欄＋手寫 logo、三欄（書籍側欄／內容／關於＋電子報）、典型 WordPress 感 | 低 | ❌ 反面教材（側欄過滿） |
| A8 | 泛科學 PanSci — https://pansci.asia/ | 🟡 | 中文科普媒體 | 輪播大圖＋四張小卡，雜誌型密度高 | 高 | ⚠️ 只看中文字距與卡片資訊層級 |
| A9 | 少數派 — https://sspai.com/ | 🟡 | 中文科技媒體 | 圓角卡片拼貼（bento 式）、淺灰底 | 中–高 | ❌ 偏媒體產品 |
| A10 | 光之伊甸 — https://lighteden.one/ | 🟡 | 你自己的專案 | 藍色漸層首屏＋白色波浪＋三張入口卡，導覽在右 | — | 基準線（你可拿來比較模板 A 的差異） |
| A11 | Astro「Folio」主題（付費）— https://astro.build/themes/details/astro-blog-template-folio/ | 🟡（只看到商品頁預覽圖） | 文藝部落格主題 | 奶油紙色、橫線稿紙細節、襯線大標＋一個紅點強調 | 中 | ⚠️ 付費，只借「稿紙橫線」概念，不可照搬 |
| A12 | Astro Air、AstroWind、Astro Cactus、Quiet Pages、RicoUI Blog、Neutral | 🔵 | 各式 Astro 主題 | 僅有主題庫文字描述；Neutral 描述含暖石色、虛線邊框、Space Grotesk＋Inter | 低 | 需另外開 demo 才能判斷 |

**小結**：知識型我有 10 個實際看過畫面，另有 6 個僅文字。數量達標邊緣，但**真正「值得做成模板」的只有約 4 個**（A1–A4），其餘多半是「借 20%」。

### B. 助人者／個人專業服務型

| # | 站名 / 網址 | 驗證 | 類型 | 觀察 | Astro 難度 | 最終參考？ |
|---|---|---|---|---|---|---|
| B1 | Cindy Shu Therapy — https://www.cindyshutherapy.com/ | 🟢 | 舊金山 MFT，Wix | 奶油底＋深青綠（實測 #164E4E）文字；首屏左文右圖，圖後有偏移深色塊；文字連結式 CTA；頁首上方有淺橘公告條；導覽尾端外框按鈕「Say Hello」；頁尾放執照號碼與 Psychology Today 徽章 | 低–中 | ✅ 核心 |
| B2 | Madison Arnholt — https://madisonarnholt.com/ | 🟡 | 一致性教練 | 全幅暖米色人像、細線 logo、置中襯線標題、文字箭頭 CTA「Work with me →」、頂部棕色公告條 | 低 | ✅ 取首屏氛圍 |
| B3 | Katarina Stoltz — https://katarina-stoltz.com/ | 🟢（部分） | 教練＋治療 | 紫色公告條掛免費指南；導覽右側亮黃綠實心按鈕（實測 #EEFC86、圓角 7px）；首屏襯線標題中一個斜體詞強調；副標用螢光筆底；站內有「Praise」見證頁 | 低 | ✅ 取 CTA 位置與斜體強調（顏色不建議） |
| B4 | Minaa B. — https://www.minaab.com/ | 🟢 | 心理師／作者／講者，Squarespace | 飽和藍（實測 #4791FA）頁首＋奶油區塊；窄體襯線大標；「Featured In」媒體 logo 帶；導覽有 Services／Resources 下拉，右側膠囊「Get in Touch」；電子報走 Substack | 中 | ⚠️ 個人品牌型，不適合「溫柔療癒」；取媒體帶與資源中心 |
| B5 | Clarity Coaching — https://claritycoaching.ca/ | 🟡 | 生活教練 | 置中大 logo、導覽小字置右、真人照＋米色文字卡；CTA「Discover it Now!」帶驚嘆號 | 低 | ❌ CTA 偏銷售；取「照片＋文字卡」並排 |
| B6 | Ian Macnaughton — https://www.ianmacnaughton.com/ | 🟡 | 家族企業顧問 | 置中襯線姓名、深酒紅導覽條、暗化模糊照片首屏 | 低 | ⚠️ 顧問型參考（非療癒） |
| B7 | Mel Noakes — https://www.melnoakes.com/ | 🟡（我拍到的首屏圖片尚未載入） | 自我照顧教練 | 字距放寬的大寫導覽、外框粉紅按鈕「Take the Self Care Quiz」＝測驗型 lead magnet | 低 | ⚠️ 取測驗型低壓入口 |
| B8 | Ikigai Integrative — https://ikigai-integrative.com/ | 🔵 | 性治療／心理服務，Elementor | 文字顯示：大型分組式下拉選單（Clinical Concerns 等）、服務八張圖卡、統計數字、5 題 FAQ、結尾預約 CTA、Jane App 預約；口吻輕鬆 | 高（選單與服務頁多） | ⚠️ 只借 FAQ＋結尾 CTA，不借 mega menu |
| B9 | Wholeness Collective — https://www.wholenesscollectivetherapy.com/ | 🔵 | 團體心理診所，Squarespace | 文字顯示：整頁以 01–06 編號分區（關於／EMDR／治療師／資源／FAQ／聯絡），每區不同滿版背景圖，首屏為一段引言 | 中 | ⚠️ 取「編號分區」概念 |
| B10 | Dr. Sara Douglas — https://www.drsaradouglas.com/ | 🔵 | 神經心理評估，Wix | 文字顯示：導覽含多層下拉、資歷放最前、聯絡表單直接放首頁 | 低 | ❌ 資訊型，缺品牌感；可當「最低可行」對照 |
| B11–B20 | Framer 模板：Metuo、CalmNest、Therawell、Mireva、Sanvera、Psychologist、Warm Therapy（maria-psy）、Fabian、Coachly Pro、HomeCoach | 🔵 | 模板商城 | 只讀到商品描述，沒看到 demo 畫面。描述重點：Mireva＝暖中性色＋襯線＋大量留白；Therawell＝照片＋手繪插畫＋柔和中性色；CalmNest＝sticky 區塊＋全螢幕覆蓋式導覽；Metuo＝含部落格／FAQ／定價／電子報區 | 視版型 | 需逐一開 demo 才能列入 |

**小結**：助人者「真實營運網站」我有 10 個，其中 7 個看過畫面、**0 個來自台灣／港／日**。Framer 模板 10 個僅文字，不能算視覺驗證。**這一側的案例池品質不如知識型，且亞洲缺口最大。**

---

## 第二部分：Top 10

### 知識／部落格 Top 10（依「適合做 Astro 教學模板」排序）

1. **Maggie Appleton** — 排版階層與文章頁最完整，且全站幾乎是靜態內容，Astro 可重現。注意：Canela 為商業字體，要換免費替代。
2. **AstroPaper** — 本來就是 Astro，結構（Posts／Tags／About／搜尋／深淺色）最適合當骨架。視覺太工程師，需重新上色。
3. **James Clear** — 置中導覽、首屏單一焦點、電子報訂閱動線清楚。
4. **Ness Labs** — 首屏即訂閱表單的設計值得借；但三欄 icon 區就是你要避開的罐頭樣式。
5. **Folio（付費 Astro 主題）** — 稿紙橫線＋襯線的質感概念好，但是付費，只能借概念。
6. **Josh Comeau** — 分類膠囊與 Popular 清單簡單好用；插畫與互動不適合初學者。
7. **The Marginalian** — 螢光筆標題、引言樣式可借；整體版面不適合。
8. **泛科學** — 中文雜誌卡片資訊層級參考。
9. **Austin Kleon** — 作為「三欄側欄過滿」的反面對照。
10. **少數派** — 中文 bento 卡片；偏媒體產品，僅供比較。

### 助人者 Top 10

1. **Cindy Shu** — 暖底深色字、不含銷售感 CTA、執照與 Psychology Today 放頁尾，最貼近你要的信任感。
2. **Madison Arnholt** — 首屏氛圍與文字箭頭 CTA。
3. **Katarina Stoltz** — 導覽右側 CTA 位置、斜體強調、見證獨立頁（顏色不採用）。
4. **Wholeness Collective（文字驗證）** — 編號分區。
5. **Ikigai Integrative（文字驗證）** — FAQ＋結尾預約。
6. **Minaa B.** — 媒體帶、資源中心。
7. **Mel Noakes** — 測驗型低壓入口。
8. **Ian Macnaughton** — 顧問型信任感（深色導覽條、置中姓名）。
9. **Mireva（Framer，文字驗證）** — 風格描述與你要的「暖中性＋襯線」吻合，需看 demo 確認。
10. **Therawell（Framer，文字驗證）** — 照片＋手繪插畫路線，需看 demo 確認。

---

## 第三部分：Pattern Analysis

### 3.1 導覽列

**實際看到的模式**

| 模式 | 出現在 |
|---|---|
| Logo 左＋少量文字連結右（3–5 項） | Maggie、Josh Comeau、Ness Labs、Cindy Shu |
| 導覽置中＋「關於」放最右 | James Clear |
| 置中 Logo＋下方整條導覽 | Ian Macnaughton、Clarity Coaching（導覽在右） |
| 導覽尾端放一顆 CTA 按鈕 | Cindy Shu（外框）、Katarina（實心）、Minaa B.（膠囊） |
| 頁首上方公告條 | Cindy Shu、Madison Arnholt、Katarina Stoltz |
| 搜尋／深淺色／RSS 圖示群 | AstroPaper（搜尋＋主題）、Josh Comeau（搜尋＋音效＋主題＋RSS） |
| 下拉選單（單層） | Maggie（The Garden）、Ness Labs、Minaa B. |
| Mega menu | 只有 Ikigai（文字驗證） |

沒有看到：行動版 bottom navigation（未測手機，也沒在桌機看到相關線索）、語言切換。

**建議**

A｜知識／部落格
```
[Logo]   文章｜主題｜關於我｜資源                    [搜尋] [☾] [訂閱電子報]
```
- 3–4 個文字連結＋搜尋＋深淺色。電子報用文字按鈕放最右。
- 手機：漢堡選單展開為全螢幕清單，電子報放清單底部。

B｜助人者
```
[公告條：目前接受新個案／預約初談 →]                      （可選）
[Logo／姓名]   關於我｜合作方式｜常見問題｜文章｜聯絡        [預約初談]
```
- 一顆外框或實心按鈕放最右（取 Cindy／Katarina 的位置做法）。
- 不用 mega menu。服務只做單層，或乾脆不做下拉。
- 公告條只有一則，且可關閉。

### 3.2 首頁區塊

**實際看到的順序**

- 知識型（Maggie）：大句式自我介紹 → 「花園」說明 → 長文卡片＋筆記清單 → RSS／社群 → 頁尾。**沒有彈窗、沒有三欄 icon。**
- 知識型（Ness Labs）：首屏標題＋訂閱 → 媒體 logo → 三欄 icon 介紹 → 書 → 見證 → 再次訂閱。
- 助人者（Cindy Shu，文字＋截圖）：公告條 → 首屏（句子＋照片）→「Hi, I'm Cindy」自介 → 服務（四欄純文字列表）→ 合作方式 → 聯絡＋免費 20 分鐘電話諮詢 → 頁尾。
- 助人者（Wholeness、Ikigai，文字）：編號分區／服務圖卡＋統計＋FAQ＋結尾 CTA。

**重新整理（樣本小，n≈10，請當線索不是定論）**

| 區塊 | 真的常見？ | 看起來高級？ | 罐頭風險 |
|---|---|---|---|
| Hero（一句話＋一張真實照片） | 全部 | ✅ | 低（若標題寫得具體） |
| 自我介紹短段＋照片 | 助人者幾乎都有 | ✅ | 低 |
| 服務／合作方式 | 助人者都有 | 純文字列表比圖卡高級 | **中**（八張圖卡版＝官網罐頭） |
| FAQ | Ikigai、Cindy（獨立頁）、Clarity 有 | 中 | 低 |
| 見證 | 我讀到的助人者首頁文字中**很少出現**，通常放獨立頁（Katarina 的 Praise）；Ness Labs 首頁有 | ✅（獨立頁） | **高**（滿版輪播、五星評分＝SaaS 味） |
| 媒體／資歷 logo 帶 | Minaa B.、Ness Labs | ✅ | 中（沒有真實露出就不要放） |
| 三欄 icon 介紹 | Ness Labs | ❌ | **最高** |
| 統計數字動畫 | Ikigai | ❌ | 高（心理諮商放數字易失信任） |
| 「你是否正在經歷…」症狀清單 | 我在已驗證的真實站首頁沒看到；僅 Framer 模板描述提到「症狀卡片」 | 視文案 | 高（文案不到位會變行銷話術） |
| 執照／專業登記資訊 | Cindy 頁尾 | ✅ | 低，且有信任價值 |

**建議順序**

A：Hero（一句主張＋最新文章入口）→ 精選 3 篇 → 主題入口（文字，不用 icon）→ 簡短 About → 電子報 → 最新文章 → 頁尾
B：Hero → 簡短自介（含照片）→ 我如何工作（三到四句，非三欄 icon）→ 服務／合作方式（文字列）→ 一則真實見證或連到見證頁 → FAQ（3–5 題）→ 預約初談 → 頁尾（含執照／資歷）

### 3.3 實測視覺代幣（來自站台）

| 站 | 背景 | 文字 | 次要文字 | 強調 | 字體 |
|---|---|---|---|---|---|
| Maggie Appleton | #F6F5F1（卡片 #FCFBF7） | #353534 | #73706D | #5F023E（連結） | 標題 Canela Deck（商業）；內文 Yozai（自訂）；輔助 Lato。首頁 H1 約 82px，文章 H1 56px／行高 61.6px，文章內文 22px／行高 33px，圖說 16.5px |
| Ness Labs | #FFFFFF | #353A3D | — | 連結 #3A606E | 標題 Lato；內文 Lora 18px |
| James Clear | 透明（頁面為米白） | #111111 | — | — | 標題 europa 36px；內文 Minion Pro 21px |
| Cindy Shu | 奶油（未量） | #164E4E | — | 公告條淺橘（未量） | 自訂字（標題襯線 40px，內文 16px） |
| Minaa B. | 奶油區塊（未量） | 黑／藍 | — | #4791FA | 標題 RockhillSans 76px、次標 memories、內文 Poppins 18px |
| Katarina Stoltz | #FFFFFF | #070C18 | — | 按鈕 #EEFC86、圓角 7px | 內文 Open Sans 17px；按鈕 Inter 20px |

觀察：這幾個站的背景幾乎都不是純白，而是微暖或微灰；正文是接近黑的深色（不是 #000）；強調色只出現在連結與按鈕。這是「看起來不像罐頭」的共通點之一。

### 3.4 小動畫（實測＋建議）

**實測（Maggie Appleton）**：連結 hover 顏色 0.18s ease；卡片／圖片 hover 的 transform＋box-shadow 約 0.24s，曲線 cubic-bezier(0.34, 1.36, 0.64, 1)（輕微回彈）；按鈕 transform 0.12s。**Katarina**：按鈕與連結多為 0.2–0.4s。

**建議組合（以下時間為我的建議值，非實測）**

| 動畫 | 放哪 | 時間／曲線／距離 | 手機 | 效能 | 初學者模板？ | 技術 |
|---|---|---|---|---|---|---|
| 連結底線展開 | 內文連結、導覽 | 0.2s ease-out | ✅ | 無影響 | ✅ 必放 | CSS |
| 按鈕箭頭微移 | CTA | 0.2s，右移 3–4px | ✅（觸控無 hover，不影響） | 無 | ✅ | CSS |
| 卡片上浮 | 文章卡、服務卡 | 0.24s，上移 2–3px＋陰影變淡到深 | hover 在手機不觸發 | 低（只用 transform／opacity） | ✅ | CSS |
| 圖片 hover 微放大 | 文章封面 | 0.5s ease-out，scale 1.03，外框 overflow:hidden | 同上 | 低 | ✅ | CSS |
| 導覽列捲動後加底色／模糊 | 頁首 | 0.25s | ✅ | backdrop-filter 在低階手機偏重，建議改純色底 | ⚠️ 純色版可 | CSS＋少量 JS（偵測捲動；或用 CSS 的 scroll-driven animation，但瀏覽器支援需另查） |
| Fade-up 進場 | 區塊標題與段落 | 0.6s ease-out，位移 12–16px，延遲錯開 60–80ms | ✅ | 低 | ⚠️ 限定 1–2 處，不要每區都有 | 純 CSS 靠載入動畫；捲動觸發需 IntersectionObserver（JS，約 10 行） |
| 閱讀進度條 | 文章頁頂 | 即時 | ✅ | 低 | ⚠️ 加分 | CSS scroll-timeline 或 JS |
| 平滑錨點捲動 | 目錄連結 | scroll-behavior:smooth | ✅ | 無 | ✅ | CSS |
| 視差、遮罩揭露、圖片裁切轉場、頁面轉場 | — | — | — | 較高 | ❌ 不建議放入初學者模板 | JS／進階 |

**一律加上**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```
我沒有在你這次不要的清單（粒子、漸層流動）上花時間。

### 3.5 CTA

**實際看到的文字**：Say Hello、Let's Get Started、Learn More、Get in Touch、Work with me →、Let's get on a call、Book a consultation、Book Now、Take the Self Care Quiz、Discover it Now!。另外 Cindy 把「免費 20 分鐘電話諮詢」放在聯絡區。

**歸納**

- 偏銷售：帶驚嘆號與命令式（Discover it Now!）、Book Now 單獨出現在首屏、亮黃綠實心大按鈕。
- 偏信任：Say Hello／Get in Touch／Work with me →（文字箭頭）／免費初談（降低承諾）／測驗型入口。
- 共通：按鈕不是唯一焦點；多半有一個主要＋一個文字連結。

**建議（中文為我的建議文案，非原站文案）**

助人者
- Primary：「預約 20 分鐘初談」「與我聊聊你的需求」
- Secondary：「了解合作方式」「看看這項服務是否適合你」
- Low-pressure：「先看看常見問題」「訂閱電子報」「做個小測驗」
- 避免：立即購買、立即預約（沒有任何前置資訊）、限時、帶驚嘆號

知識／部落格
- Primary：「訂閱電子報」
- Secondary：「從這裡開始讀」（新手入口文章）
- Low-pressure：「看全部文章」「追蹤 RSS」

### 3.6 文章頁

實測來源只有 Maggie Appleton 一篇（👉 其他站我沒量文章頁，不外推）：

- 標題 56px／行高 1.1，副標淡色大字；下方有分類標籤與「發布／最後更新」兩種日期。
- 左側有可收合的目錄（滾動時固定），內文區在中間。
- 文章開頭有一個「預設讀者」提示框；首字下沉；圖說 16.5px 灰字。
- 內文 22px／行高 1.5。
- 該站沒有顯示閱讀時間（我在截圖範圍內沒看到）。

**對中文的建議（我的建議值）**：正文 17–18px、行高 1.8–1.9、內文欄寬約 640–720px（每行約 34–40 字）；標題行高 1.3。

| 元件 | 必備 | 加分 | 先不做 |
|---|---|---|---|
| 標題、副標、日期、分類／標籤 | ✅ | | |
| 更新日期 | ✅（長期累積站 SEO 有用） | | |
| 目錄（桌機側欄或文章頂摺疊） | ✅ | Sticky | |
| 作者小卡 | ✅（簡短） | | |
| 上一篇／下一篇、相關文章 | ✅（擇一） | | |
| 圖說 figcaption、引用 blockquote、callout | ✅ | | |
| 程式碼區塊 | 視主題 | | |
| 閱讀進度條、閱讀時間 | | ✅ | |
| 文末電子報 CTA | ✅ | | |
| 分享按鈕 | | | ✅ 先不做 |
| 腳註 | | | ✅ 先不做 |

---

## 第四部分：兩套模板 Design Brief

### 設計代幣（建議值＋WCAG 對比度，已用程式計算）

對比度欄：正文／背景｜次要文字／背景｜強調色文字／背景｜按鈕白字／強調色

**知識／部落格**

| 方向 | Background | Surface | Text | Muted | Accent | Accent hover | Border | 對比度 |
|---|---|---|---|---|---|---|---|---|
| K1 Editorial Magazine | #F6F4EE | #FCFBF7 | #2F2E2B | #6F6B63 | #7A2E4A | #5E2038 | rgba(47,46,43,.12) | 12.3｜4.8｜8.2｜9.1 |
| K2 Minimal Japanese | #FAF9F6 | #FFFFFF | #222222 | #77736C | #B5472F | #96371F | rgba(34,34,34,.10) | 15.1｜4.5（剛好過）｜5.1｜5.4 |
| K3 Modern Knowledge Base | #FFFFFF | #F6F7F8 | #1F2328 | #656D76 | #0F6E6E | #0A5555 | #D8DEE4 | 15.8｜5.2｜6.0｜6.0 |
| K4 Dark Intellectual | #15171A | #1D2024 | #E8E6E1 | #9A978F | #D9A441 | #E8B85C | rgba(232,230,225,.12) | 14.4｜6.2｜8.0｜8.0（按鈕用深字） |
| K5 Warm Personal Journal | #F7F0E6 | #FFF9F0 | #3A2F26 | #7A6B5C | #8F5A3C | #764829 | rgba(58,47,38,.14) | 11.5｜4.5｜5.0｜5.7 |

補充：K5 原先參考你範例的 #A86D4B，算出來作為連結字／白字按鈕只有 3.7／4.2，**不達 4.5**，所以改成 #8F5A3C。

| 方向 | 標題字 | 內文字 | 圓角 | 陰影 | Container／文章寬 | 區塊間距（桌機／手機） | 卡片 |
|---|---|---|---|---|---|---|---|
| K1 | Noto Serif TC（拉丁可配 Newsreader） | Noto Sans TC | 6px | 0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05) | 1120／680 | 96／64 | 表面色＋細框，hover 上浮 2px |
| K2 | Shippori Mincho（或 Noto Serif TC） | Zen Kaku Gothic New＋Noto Sans TC | 2px | 無 | 960／640 | 120／72 | 無外框，只留上緣細線的文字清單 |
| K3 | Inter＋Noto Sans TC（粗體標題） | Inter＋Noto Sans TC | 8px | 無（1px 邊框） | 1080／720 | 80／56 | 邊框卡＋標籤膠囊 |
| K4 | Source Serif 4＋Noto Serif TC | 同上或 Noto Sans TC | 6px | 無 | 1040／680 | 96／64 | 深色表面＋細框 |
| K5 | 霞鶩文楷 LXGW WenKai（標題）＋Noto Sans TC | Noto Sans TC | 10px | 柔和大範圍 | 1040／680 | 88／56 | 暖色表面、輕陰影 |

**助人者**

| 方向 | Background | Surface | Text | Muted | Accent | Accent hover | Border | 對比度 |
|---|---|---|---|---|---|---|---|---|
| H1 Warm Therapeutic | #FBF7F1 | #FFFFFF | #2E2A26 | #6B635B | #9E533A | #7F412B | rgba(46,42,38,.12) | 13.3｜5.5｜5.2｜5.6 |
| H2 Botanical Wellness | #F6F4EC | #FFFFFF | #1F3D3A | #5C6F6B | #2F6B5E | #235246 | rgba(31,61,58,.14) | 10.7｜4.8｜5.6｜6.2 |
| H3 Editorial Professional | #FFFFFF | #F4F1F2 | #1B1B1F | #5F5C63 | #5A1F3C | #43152C | #E4DFE2 | 17.2｜6.6｜12.4｜12.4 |
| H4 Calm Minimal | #F4F3EF | #FFFFFF | #2B2B29 | #6A6A64 | #5B6F66 | #485A52 | rgba(43,43,41,.10) | 12.8｜4.9｜4.8｜5.4 |
| H5 Spiritual but Modern | #F5F2F7 | #FFFFFF | #2A2530 | #6C6573 | #6B4E8C | #553C72 | rgba(42,37,48,.12) | 13.5｜5.1｜6.1｜6.8 |

H2 的深青綠方向是依 Cindy Shu 實測的 #164E4E 文字色延伸；H3 的深酒紅參考 Ian Macnaughton 的導覽條氣質。H1 原先的 #B5654A 對比不足，已改 #9E533A。

| 方向 | 標題字 | 內文字 | 圓角 | 陰影 | Container | 區塊間距 | 卡片 |
|---|---|---|---|---|---|---|---|
| H1 | Noto Serif TC（拉丁可配 Fraunces） | Noto Sans TC 17–18px | 12px | 0 6px 24px rgba(46,42,38,.06) | 1080 | 104／64 | 白底、柔陰影、無邊框 |
| H2 | Noto Serif TC | Noto Sans TC | 16px，圖片可用拱形（上緣大圓角） | 無／極淡 | 1080 | 112／72 | 色塊底、無陰影 |
| H3 | Playfair Display＋Noto Serif TC | Inter＋Noto Sans TC | 4px | 無 | 1120 | 96／64 | 細框、平 |
| H4 | Instrument Serif（拉丁）＋Noto Sans TC | Noto Sans TC | 8px | 無 | 960 | 128／80 | 幾乎無卡片，用分隔線 |
| H5 | Newsreader＋Noto Serif TC | Noto Sans TC | 14px | 淡 | 1040 | 104／64 | 白底、淡陰影 |

**字體實作提醒**：中文網頁字體檔很大。Astro 模板建議教學員用自行託管＋子集化（或只載入 400／700 兩個字重），並設定系統字體備援，否則首屏會慢。

---

### ====== 模板 A｜知識／部落格 ======

1. **核心風格**：暖紙色＋襯線標題＋極少強調色，像「安靜的雜誌」。主推 K1，備選 K3／K5。
2. **目標使用者**：個人知識整理者、創作者、專業文章作者；中文長文為主。
3. **Sitemap**：首頁／文章列表／文章頁／主題頁（標籤）／關於我／資源（可選）／訂閱／搜尋／404／RSS
4. **Navbar**：`[Logo]  文章｜主題｜關於我｜資源      [搜尋] [☾] [訂閱電子報]`；sticky，捲動後改純色底。
5. **Homepage Sections**：Hero 主張＋新手入口 → 精選 3 篇 → 主題入口（文字列）→ 簡短 About → 電子報 → 最新文章 → 頁尾
6. **Article layout**：欄寬 640–720px；桌機左側 sticky 目錄；標題／副標／日期（發布＋更新）／標籤；作者小卡；文末電子報＋上下篇＋相關文章。
7. **About page**：照片＋三段話（我是誰／我寫什麼／怎麼聯絡）＋「從這裡開始讀」。
8. **CTA**：Primary「訂閱電子報」；Secondary「從這裡開始讀」；Low「看全部文章」。
9. **Color palette**：K1（見上表）
10. **Typography**：標題 Noto Serif TC；內文 Noto Sans TC 17–18px／行高 1.85
11. **Buttons**：實心主按鈕（accent 底白字）＋文字箭頭次按鈕；圓角 6px；hover 顏色 0.18s
12. **Cards**：表面色＋細框，封面圖選配；hover 上浮 2px（0.24s）
13. **Images**：封面 3:2；圖說灰字；不強制每篇有圖
14. **Micro animations**：連結底線、卡片上浮、圖片微放大、首屏單處 fade-up；全部遵守 reduced-motion
15. **Mobile behavior**：單欄；目錄改文章頂摺疊；導覽漢堡；Accent 按鈕固定高度 48px
16. **Footer**：簡單三欄（關於／主題／訂閱）＋RSS＋社群；版權
17. **必做元件**：Header、Hero、文章卡、標籤膠囊、目錄、作者小卡、電子報區、頁尾、Callout、引用
18. **可選元件**：搜尋、深淺色切換、閱讀進度條、閱讀時間、相關文章
19. **不建議加入**：三欄 icon 區、滿版輪播、統計數字動畫、彈窗訂閱、視差、社群分享按鈕群、右側欄
20. **最值得參考的 5 個站**：Maggie Appleton、AstroPaper、James Clear、Ness Labs（只取首屏訂閱）、Josh Comeau（只取分類膠囊）

### ====== 模板 B｜助人者 ======

1. **核心風格**：暖底、深色文字、真實人像、文字型 CTA；溫柔但不甜膩。主推 H1，備選 H2／H4。
2. **目標使用者**：心理師、諮商師、催眠師、療癒師、身體工作者、教練、顧問。
3. **Sitemap**：首頁／關於我／合作方式（服務，單頁多段）／常見問題／文章（可選）／見證（獨立頁，可選）／聯絡與預約／隱私與專業倫理說明／404
4. **Navbar**：`[姓名／Logo]  關於我｜合作方式｜常見問題｜文章｜聯絡      [預約初談]`；可選頂部單則公告條。
5. **Homepage Sections**：Hero（一句主張＋真人照＋「預約初談」＋文字連結「了解合作方式」）→ 簡短自介 → 我如何工作 → 合作方式（文字列）→ 一則見證或連到見證頁 → FAQ 3–5 題 → 預約初談 → 頁尾（含執照／資歷）
6. **Service page**：每項服務一段：適合誰／我們會做什麼／時間與費用（可填「洽詢」）／如何開始；底部統一 CTA；不用圖卡牆。
7. **About page**：照片＋故事＋專業資歷＋理念；資歷用清單；專業登記資訊放最後。
8. **CTA**：Primary「預約 20 分鐘初談」；Secondary「了解合作方式」；Low「先看看常見問題」「訂閱電子報」
9. **Color palette**：H1（見上表）
10. **Typography**：標題 Noto Serif TC；內文 Noto Sans TC 17–18px（取某 Framer 模板的設計說明：字級略大讓焦慮訪客更好讀，這是模板作者自述，我沒有驗證其效果）
11. **Buttons**：主按鈕 accent 實心、圓角 12px；次按鈕外框；文字箭頭連結；不用亮色、不用驚嘆號
12. **Cards**：極少用；服務用「標題＋段落」文字列，必要時用淺色塊
13. **Images**：真實照片優先（人像、工作空間）；暖色調；不使用庫存圖握手／太陽花；可用拱形遮罩
14. **Micro animations**：連結底線、按鈕箭頭微移、卡片／圖片輕 hover、首屏單處 fade-up；全部 reduced-motion
15. **Mobile behavior**：預約按鈕固定在導覽內，不做浮動遮擋；電話／Line／Email 一鍵；單欄
16. **Footer**：姓名、執照或專業登記資訊、聯絡方式、隱私說明、社群；可加「非緊急專線」提醒（依你所在地法規與專業倫理調整，這是提醒不是法律意見）
17. **必做元件**：Header＋CTA、Hero、自介區、合作方式文字列、FAQ 摺疊、預約／聯絡區、頁尾
18. **可選元件**：公告條、見證頁、文章列表、電子報、測驗型入口（參考 Mel Noakes）
19. **不建議加入**：Mega menu、統計數字動畫、五星評分、輪播見證、倒數／限時、亮黃綠 CTA、「你是否正在經歷…」整排症狀卡（除非文案經過仔細編修）
20. **最值得參考的 5 個站**：Cindy Shu、Madison Arnholt、Katarina Stoltz（只取 CTA 位置與斜體強調）、Wholeness Collective（只取編號分區概念）、Ikigai Integrative（只取 FAQ＋結尾 CTA）

---

## 第五部分：如果各只能做一套，融合哪些元素？

**模板 A（知識／部落格）**
1. Maggie Appleton → 標題階層、文章頁（左側目錄、預設讀者提示框、圖說）、卡片 hover
2. AstroPaper → 資訊結構與功能組合（Posts／Tags／About／搜尋／深淺色），因為它本來就是 Astro
3. James Clear → 置中導覽、單一焦點首屏、免費 Email 課程式訂閱
4. Ness Labs → 首屏直接放訂閱欄位（不要它的三欄 icon）
5. Folio → 稿紙橫線的質感概念（付費主題，只借概念）

**模板 B（助人者）**
1. Cindy Shu → 首屏構圖、文字式 CTA、免費初談、頁尾執照與平台徽章
2. Madison Arnholt → 全幅暖色人像氛圍、頂部單條公告、文字箭頭 CTA
3. Katarina Stoltz → CTA 按鈕在導覽右側、標題中單一斜體詞強調、見證獨立頁
4. Wholeness Collective → 編號分區讓長頁有節奏
5. Ikigai Integrative → FAQ ＋ 結尾預約 CTA 的收束方式

---

## 下一步建議

1. **補亞洲案例**：貼 5–10 個你欣賞的台灣／日本／香港個人品牌網址，我用 Chrome 逐站拆（含縮窗看手機版）。
2. **補模板庫**：指定要看的 Framer／Webflow／Astro 主題 demo 網址，我開頁驗證 🔵 那 16 個。
3. 若同意 A 的 K1、B 的 H1 為主方向，下一階段可以先做「靜態視覺稿」確認風格，再進程式。

---

### 來源（本次實際開啟或讀取）

站台（Chrome 開啟）：maggieappleton.com、nesslabs.com、jamesclear.com、astro-paper.pages.dev、themarginalian.org、austinkleon.com、joshwcomeau.com、pansci.asia、sspai.com、lighteden.one、cindyshutherapy.com、minaab.com、madisonarnholt.com、katarina-stoltz.com、claritycoaching.ca、ianmacnaughton.com、melnoakes.com、astro.build/themes（Folio 與 Neutral 詳情頁）

文字讀取：drsaradouglas.com、ikigai-integrative.com、wholenesscollectivetherapy.com；zarla.com/inspiration/life-coach（教練站名單）

搜尋摘要來源：Astro 主題清單（cloudcannon.com、eastondev.com、astro.build/themes）；Framer 模板頁（framer.com/marketplace 之 Metuo、CalmNest、Therawell、Mireva、Sanvera、Psychologist、HomeCoach、Coachly Pro、Fabian、Warm Therapy）；therapist 網站文章（azurodigital.com、websiteplanet.com、bigapplemedia.com）