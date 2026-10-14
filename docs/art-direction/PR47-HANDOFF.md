# PR #47 接手入口｜09.2 Art Direction + Template Expansion

## 最新增補：第四批推進（2026-10-14，取代上方「新候選沒有實作」的舊敘述）
- 最新權威紀錄：`docs/art-direction/PR47-EXPANSION-MATRIX.md`。原先第一批建議與「未實作」為舊時點，不可再視為現況。
- #47 新增的 11 個方向已有各四條 Astro 路由的多頁原型，合計 44 條定義：sidebar-journal、portrait-profile、editorial-frontpage、card-journal、service-catalogue、studio-chapters、visual-stories、compact-dispatch、split-reader、editorial-practice、question-led-practice。
- 第四批 Clinician（原有方向）已新增可查證的 Practice Dossier 結構。Subject Atlas 修正固定數字為 fixture 推導。Practice Compass 的真實 Site Brief 契約尚未修復，不可宣稱完成。
- 新增原型尚未接學員 Content Collection／服務設定；不進 #46 Generator 或 Gallery，不得視為新增 11 個 Ready 模板。
- 截至第二批 Head `13c18fc1` 三個 GitHub Actions 綠燈；第三／四批 Head CI 必須另查，不可沿用先前成功。新版四尺寸截圖與同內容視覺實測未完成。
- PR #47 必須保留 Draft，不 Merge／部署 Production。獨立 Starter 截圖驗收延期。
- 下一輪優先：查最新 Head CI，必要時修 Astro Build；完成 11 款同客群同內容 Neutral Fixture 與圖片 fallback、手機四尺寸原型視覺 QA；再處理 Subject Atlas / Practice Compass 的真實內容接線（不要改 #46 範圍）。


更新：2026-10-14。新對話先讀此檔，再查 GitHub 最新狀態；不要假設本檔記錄的 SHA 永遠是最新。

## Repository 與工作狀態

- Repository：https://github.com/pikaOne1138/astro-personal-site-starter
- PR：https://github.com/pikaOne1138/astro-personal-site-starter/pull/47
- Branch：`feat/art-direction-library`
- 此交接檔之前的最新確認 SHA：`78f1c487b34b15a6a8c4b57dc6d06dc1203c029a`
- PR #47 為 Draft、open、未 merge。保持 Draft；禁止自動 Merge、Production 部署、DNS 調整。
- PR #46 是平行的 Gallery／Starter Generator／主 Adapter 整合。先查其最新 diff，勿覆蓋或自行合併其工作。

## 真正目標與已確認的修正

兩個目標客群：
1. 個人知識／內容創作者：知識、專業文章、個人觀點、部落格、簡單生活紀錄。
2. 助人者／個人專業服務者：心理師、諮商師、催眠師、療癒師、身心靈、身體工作、教練、顧問。

PR B 的目的：重用中英文網站研究，辨識現有版型的相似性，擴充更多真正不同的首頁與成套內頁。
核心驗收：即使使用相同顏色、字體與內容，也能從版面結構辨識不同網站。
每款不必有不同用途。使用者用 WP Blog 主題多樣性作比喻，不是要求轉成 WordPress 或新聞媒體站。
不要再把方向縮限為 Subject Atlas／Practice Compass 的兩個功能缺口，也不要以技術 Adapter 工作取代設計擴充。

## 已完成與未完成

已完成：
- Subject Atlas、Practice Compass 已有多頁原型及獨立 Adapter 源碼。既有實作 SHA fd9c503 曾通過 27 個專用技術檢查與 Preview Build；不能推論為視覺完成。
- `df33ac8`：重新對齊兩客群，來源結構比較、歷史研究與九張歷史截圖檢視、十二個中性構圖示意，以及首頁／內頁／低內容量 brief。
- `78f1c48`：八個實際營運站的公開流量估計、兩個台灣預約型補充、三個內頁查核；HTML／JSON 檢查與 `npm run build` 通過。

未完成：
- 新候選沒有實作。十一個新增候選＋一個既有強化提案，不能算已完成模板。
- 當前網站截圖、同內容視覺比較、PR #47 全頁四尺寸視覺 QA 尚未完成；歷史截圖不是當前 QA。
- 獨立 Starter／Adapter 截圖驗收：使用者明確決定本輪不做，原因是環境與能力限制。不要再以此阻塞本輪設計開發。
- 未完成主 Adapter 整合與獨立網站驗證前，Definition 不可標 `ready`。現有兩個 Definition 為 in-progress，截圖證據為 null。
- 既有兩款仍有內容契約／品牌字型／資料量等問題需根據實際源碼重查，不能把舊檢查當成已修復。

## 讀取入口（避免重做研究與重複報告）

使用者閱讀入口只有一份真正 HTML：
- `docs/art-direction/research-reset-2026-10-14.html`

機器交接資料：
- `docs/art-direction/template-expansion-research.json`
- `docs/art-direction/traffic-site-research.json`
- `docs/art-direction/research-source-inventory.json`

既有實作：
- `src/data/layout-directions.json`
- `src/pages/layouts/subject-atlas/`、`src/pages/layouts/practice-compass/`
- `src/data/art-direction-definitions/`
- `src/data/art-direction-adapters/`
- `scripts/art-direction-adapters.mjs`、`scripts/export-art-direction-starter.mjs`
- `docs/art-direction/09-2-differentiation-audit.md`
- `docs/art-direction/INDEPENDENT-ADAPTERS.md`：只是技術子集，不是 PR B 的全目標。

HTML 內不得放未轉換的 Markdown。不要產生多份近似 HTML／MD／ZIP 讓使用者猜要看哪個。本交接 Markdown 用於 GitHub 接手閱讀，不取代使用者的 HTML 報告。

## 十二個研究方向

知識類：側欄日誌、個人刊物、卡片刊物、影像故事、極簡短箋、雙欄閱讀台。
個人刊物是單一作者的內容主次，不是新聞編輯台或多人媒體。

助人類：人物名片、服務目錄、工作室章節、專業資料冊（強化既有 Clinician）、觀點服務誌、問答對話。
最後兩個是原創候選；不能宣稱來源網站已採用提案的精確構圖。

相似風險組：Clinician／Trust Path／Practice Compass；Field Notes／Curator／Subject Atlas；Learning Lab／Coach。
以上是來源結構的風險判斷，不是視覺 PASS／FAIL；用途重疊不能直接判定要刪版型。

## 最新流量研究的使用界線

案例：Tony Robbins、Mel Robbins、Marie Forleo、Esther Perel、Therapy in a Nutshell、Gabby Bernstein、Tara Brach、Eckhart Tolle。
資料為 2026-09 第三方估計，不是 GA4、獨立訪客、粉絲、轉換率或收入。Similarweb 數值保留公開比較卡片原始 K／M，未取得原始圖表匯出，不做精確排名；Gabby 採 Semrush。來源比例為桌面範圍，不混算不同平台模型。
國際樣本多為內容／課程品牌；台灣蛹之生、看見心理補充預約脈絡，但未取得可核對流量，不標高流量。
Therapy in a Nutshell 諮商頁明確表示目前不接新個案，主要是教育與轉介。內容品牌不可一概當一般預約服務者。
這輪是文字與導覽查核，未取得這批網站的當前視覺截圖。流量不能證明版型造成成效，療效與靈性主張未驗證。

## 下一輪具體工作

不用等 PR #46。接手者先核對分支與 PR 最新狀態、讀 AGENTS.md 及相關本地 Skills，然後開始實作，別繼續只堆研究。
1. 建議第一批：側欄日誌與人物名片各一套。這是前輪提出的開發順序，尚未實作，也不是宣稱使用者挑選了確切視覺稿。
2. 各自完成首頁、文章或服務索引、詳細頁、關於頁及一致導航；無照片、一項服務、少文章時仍成立。
3. 使用同一客群的相同內容、字型與顏色，與最近的既有版型比較欄位角色、首屏比例、內容次序、列表與內頁結構。
4. 原生預覽的視覺 QA 依可用能力如實進行；若能做，使用 1440／1280／768／390，檢查 CJK、手機重排、溢出、導航、連結與互動。獨立 Starter／Adapter 截圖驗收仍延期，不冒稱通過。
5. 再擴充個人刊物／服務目錄；修既有兩款實際契約問題。Commit、Push 到 #47、保持 Draft。

PR #47 可提供版型與內頁源碼／契約；PR #46 才接入 Gallery、Starter Generator、主 Adapter 與完整學員產站流程。交接每款 slug、kind、路由、內容欄位、圖片 fallback、renderer、狀態與驗證證據。不修改 #46 所負責的程式。

## 接手環境

對話模式不是進度依據；持久來源是 GitHub 分支與上述文件。新環境須能讀 repo、修改檔案、執行 Build 並 Commit／Push；需要真實截圖時另需可用瀏覽器能力。沒有這些能力的文字對話只能閱讀與討論，不能宣稱執行開發或 QA。
前輪 scratch 檔案與已登入 Browser 不保證新對話仍可使用，不要依賴其路徑或記憶。先取得 repository；原始研究附件若缺少，再由使用者提供。
