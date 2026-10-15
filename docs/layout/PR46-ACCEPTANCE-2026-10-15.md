# PR #46｜2026-10-15 實際驗收

此記錄更新 PR46-HANDOFF.md 的歷史離線狀態。分支保持 Draft；不 Merge、不部署 Production。驗收對象是既有 Starter Export 匯出的獨立學員網站，不以老師的 Prototype gallery 代替交付網站。

## 本輪發現與修正

- 聲音通信：恢復全幅播放器 → 本期內容／逐字稿雙欄 → 全幅公開文章索引的原型順序；修正手機框內文字貼邊與超長本期標題。
- 信任路徑：恢復曲線與座標對齊的五站路線、每站訪客問題側欄、垂直方法列與深色收尾；真實時間配置移到第一次會談，沒有預設杜撰的時長。
- 閱讀年鑑：年份及年度數字恢復原型層級；統計來自真實記錄，缺值顯示待填；年度書為全幅色帶，手機月份仍保留閱讀線格。
- 學習實驗室：文章列表兩位數編號不再上下斷行。
- 六款知識型零篇列表：空內容訊息跨完整列，不再擠進編號欄。零篇語意與刪掉最後一篇後的快取清除仍維持硬 gate。
- 十二款長中文 Hero：提高 DesignChrome 防護規則的 specificity，使其確實覆蓋 Astro scoped styles；Essayist／Coach 長標題圖片改為文流，避免封面壓字。正常標題使用平衡斷行。
- 沿用既有驗證腳本新增實際文字行數、手機內距與長標題計算字級 gate，避免 overflow=0 卻視覺破版。

## 十二款逐款視覺紀錄

下列狀態針對既有測試內容及四尺寸 Chromium，不能延伸成所有未來內容或逐像素一致保證。原型結構可以在同色／同字體／同內容比較中辨識；真實內容量與缺資料降級可以改變段落高度。

| 版型 | 構圖辨識重點 | 四尺寸首頁／內頁 |
|---|---|---|
| field-notes | 側注、拱形圖、日期 ledger | 首頁 PASS；對應內頁 PASS |
| essayist | overlap cover、焦點長文、notebook | 首頁 PASS；對應內頁 PASS |
| learning-lab | 分欄 Hero、垂直節點、單元 spread | 首頁 PASS；對應內頁 PASS |
| curator | 相框展牆、主抽屜與次要物件列 | 首頁 PASS；對應內頁 PASS |
| radio-letter | 深色聲波、播放器、本期與逐字稿、索引 | 首頁 PASS；對應內頁 PASS |
| reading-atlas | 年份、月份線格、全幅年度書、季度索引 | 首頁 PASS；對應內頁 PASS |
| clinician | 清晰分欄、fit、process、資格與聯絡 | 首頁 PASS；對應內頁 PASS |
| companion | 拱形 Hero、信件、低壓陪伴順序 | 首頁 PASS；對應內頁 PASS |
| somatic | 全幅照片、練習帶、淺色服務入口 | 首頁 PASS；對應內頁 PASS |
| coach | 大字封面、錯位方法卡、深色合作區 | 首頁 PASS；對應內頁 PASS |
| collective | 拱形 Hero、立場、成員卡、活動 ledger | 首頁 PASS；對應內頁 PASS |
| trust-path | 五站曲線、編號脊線、問題側欄、真實時間尺 | 首頁 PASS；對應內頁 PASS |

正常頁面目視範圍：12 款首頁及 About、6 款知識 Archive／Detail、6 款助人者 services／FAQ／booking／first-visit，共 240 張四尺寸。另檢視同品牌結構比較、長標題、零篇／單篇列表，以及助人者可選文章列表／詳情。未變更的內頁沿用本輪實際檢視的 0cf1bc6b artifact；本輪變動的首頁與文章列表以最新 artifact 覆核。

## 自動化與交付

程式驗收 SHA：`22cbea9fdc1662972c2d9d73a444c346e71e9eca`。

- standalone-build：run `38687888905`，PASS，十二款獨立匯出與 Build。
- static-build：run `38687888928`，PASS，包含既有 Builder Pack 實際解壓／Build／Guide 版本 gate。
- preview-build：run `38687888952`，PASS。
- Cloudflare Pages：同 SHA check `116267018142`，PASS（PR Preview，沒有 Production 發佈）。
- 額外現行 check standalone-adapters：run `38687888948`，PASS。GitHub 現況為五項，不沿用交接文字的舊四項數量。

[四尺寸獨立學員網站截圖 artifact 11950729735](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38687888905/artifacts/11950729735)：584 JPG、`index.html`、`results.json`；保留至 2026-10-22。解壓開啟 index.html 可按家族、情境及尺寸查閱。檔名 `<slug>-home-1440.jpg`、`<slug>-articles-390.jpg`；long-home／neutral／empty／single／empty-facts 為情境名稱。

實際 results.json：`total=584`；failedHttp、overflow、errors、noFamily、heading、articleCounts、keyboard、invisibleMasthead 全部為空陣列。這些表示測試失敗數為零；空文章內容數本身另外必須為零，單篇為一。音訊使用合法一秒靜音 WAV，metadata 與實際 muted play／pause gate 通過。

人工目視證據分兩輪：本輪先檢視 `0cf1bc6b` 的 240 張正常頁面及同色比較／壓力圖，發現問題後實作；`81739ad3` 取得 584 圖並檢視十二款正常／長標題與六款空列表；最新 `22cbea9f` 再覆核改動的 Radio／Atlas 構圖與壓力圖。其他未改元件沿用同輪已目視內容，不宣稱最新每一張都人工閱讀過。

此後若只有交接文件變動，網站與測試內容仍同上面的固定程式 SHA；最新 Head Checks 必須另外查詢，不能把父 Commit 的綠燈改標成新 Head。

既有 Builder Pack 流程的 gate 包含 ZIP 解壓、十二款 layout 選擇匯出、knowledge/helper 完整 Build、Guide 與 ZIP manifest 一致、官方 prompt、草稿排除、SEO／Pagefind 與實際 ZIP 下載。不建立另一套產生器。

## 驗收界線

- Chromium 寬度 1440／1280／768／390；未測 Safari、Firefox、真機或螢幕閱讀器。
- 助人者的可選文章頁以 clinician 實際匯出與四尺寸圖驗證；其他五款可選文章詳情分支尚未逐款以瀏覽器另行目視，不把此額外組合說成已驗收。
- 缺資格、價格、見證、成員、活動、音訊及時間的情境必須誠實待設定；沒有模擬預約或訂閱成功。
- 測試包含文章零篇／一篇／多篇、無圖片、長中文與長文、實際服務資料、Navbar Enter／Tab／Escape 與焦點恢復。缺資料情境有 144 張自動化截圖，本輪人工檢視其中桌面及手機代表頁，沒有聲稱人工逐張讀完全部壓力情境。
- Draft 待使用者以自己的品牌、文章及服務內容確認；不因測試 fixture 通過而自動發佈。
