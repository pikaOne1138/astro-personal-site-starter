> **已封存（2026-10-23）。** 某一輪 CI 與驗收的紀錄（Run、Artifact 編號與截圖連結已過期）。仍有效的契約已在 `docs/layout/layout-assembly.md`，學員端契約在 `docs/student-builder-pack/` 的 `EXPANDED-LAYOUTS.md`、`SECTION-PATTERNS.md`、`OWNED-MEDIA.md`。僅供歷史查閱，不再維護。

# PR46｜恢復執行後的 CTA 與品牌驗收

本輪程式：`119dae09adf1187578f9cfb9ef851b01bc6c23f5`。保持 Draft，不 Merge、不修改 Production／DNS。

## 承接位置與實際修正

從 GitHub 最新 `d13e662b` 接續；該 Head 四項 Actions 全成功。原工作目錄停在更早的程式且有未提交修改，因此另外建立最新 Head 的工作目錄，沒有覆蓋舊工作內容。

- 已下載 d13e662b 的 [1,476 張實際學員站圖](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38703271923/artifacts/11957831822)，核對 results.json 九類失敗皆為零。以逐款四尺寸比較圖目視新十一款深色 palette／clear-sans 的 Home 與 About（88 張來源圖）。這是有限範圍的構圖／留白／斷行覆核，不是逐像素讀完全部 1,476 張。
- 修正十一款 native Renderer 的 `primaryCta`：首頁明確一個主要行動、各內頁的原生導覽一個主要行動。文字、目標頁皆讀真實 Site Brief；`pageId` 依 navigation 的實際 `path` 解析，可導向巢狀自訂頁。保留文章標題連結、服務詳情、章節錨點等各自資訊任務。
- 舊十二款及兩款 art-direction Adapter 維持既有 Header CTA；共用 StudentNavigation 僅在 `config.nativeLayout` 啟用新增行動，避免重複。
- Guide 的舊「12 款首頁」說明已改成由 Registry 計算可產站數量；維持新增設計仍在測試的清楚界線。此項僅文案與資料來源修正，`npm run build` 及實際 HTML 檢查通過。
- 服務目錄 About 的 purpose／approach／background 分行顯示，避免文字黏成一段。
- 延伸既有 `verify-starter-export.mjs`，在實際 Chromium 檢查 default CTA 與深色品牌情境中變更後的中文 label／巢狀頁 href、唯一角色、鍵盤焦點及至少 44px 高度；不建立第二套 QA 平台。

## 這一版的證據

- [PR Preview Build](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38737810834)：成功。
- [Static Assets](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38737810796)：成功。
- [Independent Adapter](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38737810805)：成功；本機同一組 29 項也成功。
- [Standalone 四尺寸／內容回歸](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38737810785)：成功。產生 [1,476 張新圖與結果](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38737810785/artifacts/11974789767)，HTTP／溢出／runtime／family／h1／文章數／鍵盤／masthead 各類失敗皆為零。新增 CTA 預設與自訂中文／巢狀頁檢查通過。
- 本機 `npm run build`、原十二款匯出檢查、Builder Pack 完整模式通過。巢狀 CTA 專項另實際匯出 sidebar-journal，獨立安裝／Build，確認 Home／Navbar 兩個角色皆指向 `/guides/first/` 並呈現自訂中文。
- 已下載本版 [preview-site Artifact](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38737810834/artifacts/11973454156)，從其中真正的 AI 建站資料包解壓，以包內程式匯出 25 款，knowledge／helper 實際 npm install、Build、validator regressions、verify 通過。驗證時使用同一個 Preview 的 web manifest，而不是不同版本的本機 manifest。
- ZIP manifest 的 `sourceCommit=573d74135717ded8c5d2e3dbc502be32de7f8b87` 是 PR 測試合併 SHA，parent 是 main d79fedd7 與 119dae09；Tree `51a3138418bf8145aa6c08e47d824a56d988206a` 與程式 Head 相同，Guide／ZIP manifest 一致。
- 真正下載包另測 sidebar-journal／portrait-profile：包內程式匯出、獨立安裝後，設定學員 site.config.json 的 `base=/class/`，Build／verify 通過；Home／Navbar 兩角色均指向 `/class/guides/first/`。Site Brief 不以頂層 base 設定部署路徑，依現有發布契約在輸出專案或 ASTRO_BASE_PATH 設定。
- 線上 Guide 的 ZIP 也已實際下載並核對其公開 manifest 一致；與 CI 包逐檔比對，僅 BUILDER-PACK-VERSION.json 的來源 Commit 不同，所有其他檔案完全相同。Cloudflare 記錄 119dae09，GitHub 記錄測試合併 573d7413，兩者 Tree 相同。
- Cloudflare 回報本版部署成功：[固定 Preview](https://413c6a42.personal-site-starter.pages.dev/)。本機直接 HTTPS GET 首頁得到 HTTP 200；未因此宣稱遠端所有頁面或全部瀏覽器完成視覺驗收。

新圖已下載並以十一款 Home 四尺寸的 standard／brand 比較圖覆核（88 張來源圖），確認新增 Navbar／Home CTA 沒有遮字或溢出，長中文導覽按鈕可換行。另直接查看服務目錄 brand About 390 圖，確認三個欄位已分行。未宣稱其餘 1,476 張全部逐張讀完。

以上四項 CI 與 Cloudflare Check 均屬 119dae09。後續提交僅本輪文件及 Guide 文案／Registry 數量來源；Guide 修改後的完整本機 Build 與輸出 HTML 已驗證，後續 SHA 的 Actions 狀態仍須以 GitHub 最新結果為準，不冒稱沿用父 Commit 綠燈。

## 交付狀態與剩餘 Gate

25 款均有真正可匯出的 Adapter；不升級 Ready。原十二款保留既有限定驗收範圍。新增十三款已完成接線與技術回歸，但仍需完成圖片／Logo 角色與裁切、固定標語的持有人編輯及最終設計核可。

新十三款非 footer Section Patterns 仍明確拒絕；Subject Atlas／Practice Compass 的品牌圖片仍明確拒絕。沒有把拒絕功能寫成已支援。PR47 真實裝置、螢幕閱讀器、小點擊目標分級仍由原人工清單承接，Chromium 的 CTA 檢查不替代所有人工項目。

後續先讀本文件與 GitHub 最新 Checks，不能重複卡在已解除的 environment_offline／HTTP 403，也不能把本輪有限範圍目視說成所有情境全數人工簽核。
