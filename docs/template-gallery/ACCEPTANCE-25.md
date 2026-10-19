# 25 款 Layout 縮圖盤點與驗收

基底：main `a37bc3ef0469a67b25e3f6fdea448b9526815722`。PR #56 未合併，本 PR 不覆寫其變更。

所有 Registry 狀態目前為 `in-progress`，都有 Adapter 定義，沒有任何一款因補縮圖升級為 Ready。預覽路由是首頁 Prototype；Adapter 存在不等於獨立多頁網站已完成視覺／功能 QA。

| Slug | 中文名稱 | 類型 | 預覽路由 | 原始圖片 | 本輪處理 | 組裝狀態 |
|---|---|---|---|---|---|---|
| field-notes | 田野筆記 | knowledge | /layouts/field-notes/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| essayist | 長文書房 | knowledge | /layouts/essayist/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| learning-lab | 學習實驗室 | knowledge | /layouts/learning-lab/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| curator | 收藏者目錄 | knowledge | /layouts/curator/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| radio-letter | 聲音通信 | knowledge | /layouts/radio-letter/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| reading-atlas | 閱讀年鑑 | knowledge | /layouts/reading-atlas/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| clinician | 清晰臨床 | helper | /layouts/clinician/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| companion | 溫柔陪伴 | helper | /layouts/companion/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| somatic | 身體與節律 | helper | /layouts/somatic/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| coach | 實作型教練 | helper | /layouts/coach/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| collective | 共好工作室 | helper | /layouts/collective/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| trust-path | 信任路徑 | helper | /layouts/trust-path/ | Desktop＋Mobile | 保留 2 張 | in-progress |
| subject-atlas | 主題標本室 | knowledge | /layouts/subject-atlas/ | 缺兩張 | 新增 2 張 | in-progress |
| practice-compass | 服務羅盤 | helper | /layouts/practice-compass/ | 缺兩張 | 新增 2 張 | in-progress |
| sidebar-journal | 側欄日誌 | knowledge | /layouts/sidebar-journal/ | 缺兩張 | 新增 2 張 | in-progress |
| editorial-frontpage | 個人刊物 | knowledge | /layouts/editorial-frontpage/ | 缺兩張 | 新增 2 張 | in-progress |
| card-journal | 卡片刊物 | knowledge | /layouts/card-journal/ | 缺兩張 | 新增 2 張 | in-progress |
| visual-stories | 影像故事 | knowledge | /layouts/visual-stories/ | 缺兩張 | 新增 2 張 | in-progress |
| compact-dispatch | 極簡短箋 | knowledge | /layouts/compact-dispatch/ | 缺兩張 | 新增 2 張 | in-progress |
| split-reader | 雙欄閱讀台 | knowledge | /layouts/split-reader/ | 缺兩張 | 新增 2 張 | in-progress |
| portrait-profile | 人物名片 | helper | /layouts/portrait-profile/ | 缺兩張 | 新增 2 張 | in-progress |
| service-catalogue | 服務目錄 | helper | /layouts/service-catalogue/ | 缺兩張 | 新增 2 張 | in-progress |
| studio-chapters | 工作室章節 | helper | /layouts/studio-chapters/ | 缺兩張 | 新增 2 張 | in-progress |
| editorial-practice | 觀點服務誌 | helper | /layouts/editorial-practice/ | 缺兩張 | 新增 2 張 | in-progress |
| question-led-practice | 問答對話 | helper | /layouts/question-led-practice/ | 缺兩張 | 新增 2 張 | in-progress |

## 原始資產核對

原始 24 張皆能完整解碼，SHA-256 與既有 Manifest 相符；已目視檢查首頁 contact sheet，沒有空白或錯誤頁。原始 12 款首頁路由及相關樣式相較 capture commit `0975ecf` 沒有變更，保留原檔。

## 頁面整合

`/layouts/` 為主要方向探索入口，使用實際截圖替換氛圍圖與文字構圖；`/templates/` 延用既有桌機／手機比較模式，改用同一份 25 款 Registry；`/starter/` 使用同一份 Registry 並顯示全部縮圖，手機選用 mobile 圖。三者不混用 Theme Demo。

## 驗收狀態

- 本機 `npm run build`：通過（207 pages、Pagefind、既有靜態輸出檢查）。
- 捕捉 Workflow：50 路由／圖片檢查已在初輪通過；50 張完整解碼、SHA-256、來源 route/slug 檢查通過；保留 24 張、新增 26 張。
- 既有 Verify Cloudflare Static Assets：未通過。`WorkshopNav.astro` 缺少 QA responsibility declaration，該元件與 QA Registry 不是本輪變更；可用 `node scripts/test-all-component-coverage-regressions.mjs` 重現。其後步驟跳過，Remote ZIP 黑箱檢查亦因本機 `public/builder-pack-version.json` 未產生而失敗。不得將此 workflow 宣稱全綠。
- 舊版初輪圖庫 QA：發現 client Registry import 遺漏與 hidden lazy-image decode 等待問題，已修正；舊執行結果不作通過證據。

## 圖庫專項瀏覽器證據

[Workflow 39226380700](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39226380700) 通過：三個入口 × 1440/1280/768/390，均無水平溢出或破圖；25 款 query 預選與 Site Brief slug/kind 完全相符，圖庫選用連結及手機切換通過，無瀏覽器 JS 錯誤。

[16 張實際桌機／手機截圖與 JSON](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/39226380700/artifacts/12174042685)。已目視原始 24 張和新增 26 張的首頁 contact sheet。手機選版卡原本高度太矮，會把主標題裁在下緣，本輪改為 180×390 的直式預覽窗（沿用既有圖鑑手機寬度，顯示約原始 390×844 視窗），不修改原始 WebP；需以最終 head 再驗證。

WorkshopNav 的 CI 修復由另一個對話負責，本 PR 不修改其元件或 QA Registry。

## 範圍限制

這次驗收的是縮圖捕捉、選版入口與預選，不是 25 套獨立 Starter 全站驗收。Safari、Firefox、真機、螢幕閱讀器未測。PR 保持 Draft；不 Merge，不發布 Production。
