# PR46｜main 整合與 25 款正式 Starter 接手

## 2026-10-15 自有媒體與可編輯標題（目前入口）

接續實作見 [十三款圖片／Logo／標題契約與驗證](PR46-OWNED-MEDIA-2026-10-15.md)。前輪五項檢查已收斂；本輪新增媒體與標題仍以 PR46 當輪 Head 的檢查／截圖為準。下方「尚未支援品牌圖片／Logo／固定標語」為較早 checkpoint。

## 前輪：恢復執行後的有效入口

最新程式為 `119dae09adf1187578f9cfb9ef851b01bc6c23f5`；環境已恢復，新版配色 Home／About 已實際看圖，十一款自訂 CTA 已接線。後續從 [恢復後驗收與證據](PR46-RESUMED-QA-2026-10-15.md) 接續；下方離線、403 與 CTA 尚未接線的內容是歷史 checkpoint，已被新紀錄取代。25 款維持 Adapter，不自動升 Ready。

## 歷史：執行環境中斷交接

- **更新：653aea8dbcb814fb961b4e9d761d17c376d32a1a 四項 Actions 已全部成功**：[Standalone](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288943)、[Preview](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288998)、[Static](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701289028)、[Independent Adapter](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288957)。[該版 1,476 張四尺寸實際截圖](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288943/artifacts/11957331135) 的日誌再次確認所有九類自動失敗數為零；**環境仍離線，未目視這批新圖**。後續只更新交接文件的 SHA 仍會觸發新 CI，不可把這個程式版本的綠燈當成新文件 Head 的狀態。
- 最後程式 Head：`653aea8dbcb814fb961b4e9d761d17c376d32a1a`；本次只更新交接文件，沒有改程式、合併 PR 或動 Production。PR46 保持 Draft，main 已整合。
- `6e84c170993c8157e6007a5431c9c85051da8a39` **四項 Actions 全成功**，包括品牌／字體案例。Standalone [38700676516](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38700676516) 的實際日誌為 **1,476 張；HTTP、溢出、runtime、family、h1、文章數、鍵盤及 masthead 全部零失敗**。新十一款深色 palette／clear-sans 的實際計算樣式檢查通過。
- [6e84 的四尺寸截圖 Artifact](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38700676516/artifacts/11956659242) 已產生，**尚未目視這批新品牌圖片**。可見於先前環境的 1,340／1,388 張已有前述逐款檢視，不能把它們當成新 palette 的目視核可。
- 653aea8 的 [Preview](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288998)、[Static](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701289028)、[Independent Adapter](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288957) 已成功；[Standalone](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38701288943) 寫前一版交接時仍在執行，現已成功，見本段最上方更新。結果持續更新於 PR46 說明，不沿用前一個 SHA 的結論。Cloudflare 對 653aea8 回報 Preview check 成功：[該版 Preview](https://abd287b6.personal-site-starter.pages.dev/)；直接瀏覽可用性尚未確認。
- 實際阻擋：工作區執行服務回報 `409 Conflict, environment_offline: Environment is not connected`，重試仍無法執行。新圖下載／解壓／目視及本地修改因此不能繼續；GitHub 已推送的程式、Actions、Artifacts 不受影響。後續從本分支最新 Head 建立工作區即可，勿依賴舊 scratch 圖片路徑。
- **確切未完成項**：新 palette 截圖目視；新增十一款 Navbar／Home 的使用者自訂 `primaryCta.label/pageId` 對位（目前保留原型內文 CTA；從 exporter 的 `assets['src/components/StudentNavigation.astro']` 與 native Page 的呼叫接續，該導覽目前只列 navigation）；真實圖片／Logo 角色及裁切；PR47 點擊目標／真實裝置／讀屏人工清單。不要把「JSON 有保存」當成「所有設計角色都有套用」。
- 因上述項目，**新增十三款維持 in-progress Adapter，不是 Ready**。已交付 25 個真正可匯出的 Renderer／資料接線與技術回歸，尚不能宣稱 25 款完整設計驗收結束。

更新：2026-10-15。這是實作與驗證 checkpoint，最新 Head／Actions／Artifact／Preview 的後續結果持續寫入 [PR46 說明](https://github.com/pikaOne1138/astro-personal-site-starter/pull/46)，不得沿用舊 SHA 綠燈。保持 Draft，不 Merge、不寫 main、不修改 Production／DNS。

## 已完成的三批實作

1. **main 已整合**：PR47 的 `d79fedd7a1731c81baec44ef23e4436a684d6b1e` 以雙 parent commit `0975ecf3d62dfd65b44fbb8320f6af4a0a70f5c6` 整合進同一 feature branch。共同基底為 `26acf168b90a7d672d9468c7489e8095cf060683`，沒有文字衝突；人工協調保留兩邊 build-student-pack、內容契約／原型、原十二款功能，並做實際資料包回歸。GitHub mergeable=true。
2. **兩款獨立方向接主流程**：Subject Atlas／Practice Compass 現經主 `export-starter.mjs`、Starter 選擇與既有 ZIP 輸出，29 項原獨立 Adapter 回歸仍保留；補各自 About DOM 與長標題處理。
3. **十一款多頁原型轉 Adapter**：六 knowledge＋五 helper 的原生 DOM／CSS 置於 `src/data/layout-assembly/expanded/<slug>/Page.astro`，接實際 Collection／slug、About、顯式公開服務、FAQ／聯絡、圖片、前後文章與 SEO／Pagefind。不是同一個 Home 換 CSS。

主產站流程可匯出 25 款。**新增十三款仍是 in-progress Adapter；原十二款有既有限定測試內容目視證據，25 款都不自行升 Ready。** 形式上能產站與最終 Art Direction 核可是不同驗收。

## 已確認的最近完整技術基準

`7fb5718ed4e8f5e30a81c350ee73723029766ec2` 四項 Actions 全成功：

- [Standalone：25 款、1,388 張、內容／RWD／鍵盤／搜尋](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38699494505)
- [PR Preview Build](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38699494496)
- [Static Assets](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38699494483)
- [Independent Adapters](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38699494510)

[該 SHA 的四尺寸學員網站截圖、index.html、results.json](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38699494505/artifacts/11956221944)，1440／1280／768／390。不可將 7fb 綠燈套到後續色彩／字體 Commit。

已實測 0／1／多篇、長中文、草稿、文章撤回後 Home／Archive／直接網址／RSS／Sitemap／中文索引，以及服務 0／1／多項與撤回。新增十一款在 Chromium 實際 import Pagefind：文章存在時可搜到獨有 token，最後一篇刪除重建後零結果。不是只看 Build 或 JSON。

## 最新已實作、須看其自身 CI 的項目

- 程式 checkpoint `6e84c170993c8157e6007a5431c9c85051da8a39`：十一款原生色彩／display 字體接既有品牌變數，新增深色 palette＋clear-sans 的實際 Build、Home／About 四尺寸及計算樣式檢查；完整截圖預期 **1,476 張**。該批 Standalone 已成功，精確證據見上方中斷交接；新圖目視仍 pending。
- 本次交接亦移除 Practice Compass 未提供 About 欄位時的空紀錄色帶；有真實欄位時仍保留其獨立條目構圖。
- 最新 Head 的精確 SHA、四項 Actions、Cloudflare check 與 Artifact 由 PR46 說明記錄；不得把預期張數或尚未目視的修正說成完成。

## 實際資料包回歸

已下載 7fb 的 [CI Preview 產物](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38699494496/artifacts/11955596160)，使用其中真正的 `AI-建站資料包.zip`，不是本地自行重建來替代：

- 解壓後僅靠包內檔案，25 選項全部經主入口匯出。
- knowledge／helper 完整 npm install、Build、verify 通過。
- 另用包內程式實際建立 editorial-frontpage／split-reader 零文章網站，安裝／Build／verify 通過；保留持有人 headline／intro，文章數 0，沒有不存在主文的閱讀 CTA。
- Guide／ZIP manifest 完全一致，25 slugs／狀態齊全。
- manifest 的 `2635bb0f052acb9e3a313481319b7f15099d6682` 是 GitHub PR 測試合併 SHA，兩個 parent 為 main 與 7fb；已核對 Tree `5b45cc939fe31334a1dd7527fe6f67cc55fdc6e7` 與 7fb Head 相同。版本差異不是錯包。

包內 AI 指引已改為依 Registry engine 選原十二款、兩款 art-direction 或十一款 native Renderer；新增十三款的支援與拒絕項目見 [正式資料契約](../student-builder-pack/EXPANDED-LAYOUTS.md)。沒有新 ZIP 產生器／CMS／CRM／QA 平台。

## 25 款逐款狀態

Definition＝設計契約；Prototype＝展示原型；Adapter＝正式 Renderer／資料接線；Ready＝完整必要驗收與人工核可。本批全 25 款均已達 Adapter；新十三款的最終核可仍 pending。

| 名稱 | slug | 已達層級／證據 | 下一個 Gate |
|---|---|---|---|
| 田野筆記 | `field-notes` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 長文書房 | `essayist` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 學習實驗室 | `learning-lab` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 收藏者目錄 | `curator` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 聲音通信 | `radio-letter` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 閱讀年鑑 | `reading-atlas` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 清晰臨床 | `clinician` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 溫柔陪伴 | `companion` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 身體與節律 | `somatic` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 實作型教練 | `coach` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 共好工作室 | `collective` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 信任路徑 | `trust-path` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 整合後技術回歸已過；保留 624 張基準與人工限制 |
| 主題標本室 | `subject-atlas` | Adapter；主匯出器接線、獨立 Build 已完成，視覺待核可 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 服務羅盤 | `practice-compass` | Adapter；主匯出器接線、獨立 Build 已完成，視覺待核可 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 側欄日誌 | `sidebar-journal` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 個人刊物 | `editorial-frontpage` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 卡片刊物 | `card-journal` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 影像故事 | `visual-stories` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 極簡短箋 | `compact-dispatch` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 雙欄閱讀台 | `split-reader` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 人物名片 | `portrait-profile` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 服務目錄 | `service-catalogue` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 工作室章節 | `studio-chapters` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 觀點服務誌 | `editorial-practice` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |
| 問答對話 | `question-led-practice` | Adapter 初版；原生多頁 DOM／真實資料接線、獨立 Build 通過 | 新 Head 內容回歸、四尺寸實際截圖目視、人工 QA |


## 已實際目視與依圖修正

- 原十二款保留 [84a02764 的限定內容驗收](PR46-ACCEPTANCE-2026-10-15.md)，624 張歷史證據不是新增十三款的證據。
- 已下載 ee2cf9e 的 1,340 張與 0df7f815 的 1,388 張，逐款檢視新十一款 Home／Index／About 四尺寸及詳情頁前 2,400px；兩款獨立方向另檢視文章／服務、FAQ／聯絡、About。後續修正再重看相應輸出，不宣稱每張 stress 圖都已逐像素審讀。
- 修正：長標題內有連結的文字走訪與縮字、卡片刊物品牌／標題、原型 demo／資料契約 UI、About 重複欄位、真實日期、Home intro 誤用文章摘要、問答詳情缺 body／facts、全文章索引連結、多服務先標題再條目、服務目錄逐項規格、正式 bookingUrl 僅外連、零文章精選空殼／虛假閱讀 CTA。
- 共用 symlink node_modules 的早期本地撤回試驗不一致，不採為通過證據；上述 CI 每款獨立 install 的撤回與瀏覽器搜尋，以及下載 ZIP 的真正獨立安裝，才是有效證據。

## 尚未完成／平台限制

- 最新品牌字體修正後的完整四尺寸目視仍須承接；新十三款保持 in-progress。後續所有新 SHA 都要重新核對 CI／Artifact。
- PR47 的真實授權圖片裁切、原型固定標語的持有人編輯、點擊目標警告、真實裝置／讀屏人工清單仍 pending。Chromium 截圖不替代 Safari／Firefox／讀屏；本環境沒有真實裝置輔助技術。
- 新十三款非 footer Section Patterns 仍須逐款構圖接線；匯出器明確拒絕，避免靜默丟資料。原十二款既有 Blocks／Patterns 不移除。
- Subject Atlas／Practice Compass 仍文字優先，尚不接受品牌圖片輸入。新十一款部分圖片角色已有接線，但不能把未做真圖裁切驗收的情境說成 Ready。
- Cloudflare 對 0df7f815 回報 Preview 部署成功，但本環境直接 HTTP 讀取 `https://20909d7f.personal-site-starter.pages.dev/` 得到 403，web 讀取亦不可達。沒有把它當作可用性通過；以確實下載的 CI 產物與學員 Chromium 圖繼續驗證，未碰 Production／DNS。新 Preview URL 以最新 check 為準。

下一次先讀本檔與 PR46 最新結果，從尚未核可的真圖／品牌／人工清單接續，不重做版型研究、不把 CI 全綠當成 25 款設計完成。
