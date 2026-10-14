# PR #46 接手／驗收記錄

## 目前有效範圍
- 分支：`feat/visual-template-assembly`，保持 Draft；不 Merge、不部署 Production。
- 不修改 PR #47 的檔案。已核對 PR #47 Files Changed；本輪修改只在 PR #46 的獨立組裝、匯出與既有驗證流程。
- 最新 Head 必須重新讀 GitHub。本文件中的歷史綠燈不能替代最新 Head。
- 使用既有 Builder Pack／Starter Export，不建立第二套 ZIP 產生器或 QA 平台。

## 本輪完成的程式
1. 十二款 Home 都保留各自的主要構圖、閱讀順序及 RWD。
2. Learning Lab 原始垂直節點、互動勾選與單元 spread；Curator 主抽屜＋兩個次要物件列；Coach 錯位方法卡、深色合作區與底部大字 CTA；Collective 立場 spread、真實成員卡及活動 ledger。
3. Radio Letter 節目說明雙欄、授權音訊／逐字稿、公開文章索引；Reading Atlas 年份外框、四欄月份、年度書 spread 及季度索引；Somatic 全幅 Hero、練習帶、淺色服務入口；Trust Path 五站脊線與真正提供的比例時間尺。
4. 共用文章資料／路由／SEO／Pagefind；保留六種 Archive、十二種 ArticleDetail/About、六種服務／FAQ／初次聯絡的 Design Family。
5. 修正文章邊距、重複外層側欄、窄編號換行、臨床 About 多餘深色空格、深色家族 chrome 被抹成淺色、1280/768 封面圖壓到標題、長精選文章標題過大及手機正文過小。
6. Homepage 引用真正公開文章；草稿不列入首頁、Archive、RSS、Sitemap 或搜尋。
7. FAQ 重用已有 `FAQ.astro`；缺少資格、價格、成員、活動或時間時明確待設定，不虛構資料／預約成功。
8. Navbar 實測 Enter/Tab/Escape、焦點恢復及目前位置；沿用原來的導覽與真實路由。
9. 新的可選真實欄位：Collective 的 `team[{name,role,bio}]`／`events[{title,description,date,url}]`，Trust Path 的 `serviceTiming[{label,minutes}]`。同一匯出器驗證與傳入，不是後台／CRM。

## 重要回歸：舊「576 張全綠」不能視為全部通過
程式快照 `7eb7ad045731891a7d4dad01e48f6923e40d60ea` 四項 CI 通過：
- Standalone：run `38599556814`，artifact `11913640484`，576 張。
- Static：run `38599556826`。
- PR Preview：run `38599556817`。
- Cloudflare：讀該 SHA 的 Check Runs 取得真實網址。

但實際看圖後發現：刪掉最後一篇文章，空 Archive 仍出現快取舊文章。上述「零篇」結果實際 **FAIL**，因為舊 gate 只看 overflow/family/h1，沒有驗證文章真的為零。

原因已在本機安裝的 Astro 5.18.2 `glob()` 原始碼核對：空目錄提前 return，跳過清除舊 store。已修正：
- 匯出的 `npm run build` 先執行 `scripts/clean-build.mjs`，只清除 dist／.astro／node_modules/.astro 的產物與快取，不刪除學員原始碼或文章。
- 空文章回歸檢查首頁、Archive、直接文章網址、RSS、Sitemap、exact-zh。
- Archive 加上 `data-article-count`；真實瀏覽器報告的 empty=0、single=1 是硬 gate，不能只靠來源碼。
- 本機「一篇→移除最後一篇→Build」六個面向回歸已 PASS；全十二款匯出／Build 的清快取版本也在離線前 PASS。
- 無效的舊 ID3 測試字串改為合法一秒靜音 WAV；CI 現在等待 metadata、驗證 duration，實際 muted play/pause，失敗不可說播放器正常。

## 四尺寸證據與其界線
已取得且實際目視：
- Baseline `3a5dbb89`：168 張，十二款桌面／手機首頁與 About／文章或服務總覽。
- `9709997f`：240 張，四尺寸首頁／About／內頁，以及六款 FAQ／聯絡／第一次聯絡。
- `e1f7ab0f`：336 張，加 48 同色同字體同主標結構比較、48 長中文首頁。
- `7eb7ad04`：576 張；完整正常首頁／手機／空內容總覽已看。零篇語意 FAIL 已如上記錄，不再冒充通過。
- 原始 Prototype 四尺寸 artifact：`11911240240`（run `38597060351`），亦已取得並目視 1280/768 對照；1440/390 原始 gallery 亦已看。

[舊 576 張證據（包含被發現的空文章缺陷）](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38599556814/artifacts/11913640484)

最新修正的 CI 預期輸出仍為 576 張：
240 正常頁面 + 48 neutral + 48 long-home + 48 single + 48 empty + 144 empty-facts。
以新 `results.json` 為準；HTTP/overflow/runtime/family/h1/keyboard/masthead/articleCounts 都必須為零失敗，音訊播放不得有錯誤。
檔名 `<slug>-<page>-<width>.jpg`；empty/single/empty-facts/neutral/long-home 有對應前綴。解壓開 `index.html` 查看原圖。Actions artifact 保留七天。

## 十二款逐款狀態
「已實作」不等於最新修正已目視完畢。

| 版型 | 已還原的主要結構 | 內頁 | 最後一輪目視 |
|---|---|---|---|
| field-notes | 側注／拱形圖／日期 ledger | Archive／Detail／About | 清快取後 empty/single 待看 |
| essayist | overlap cover／focal essay／notebook | Archive／Detail／About | 清快取後 empty/single 待看 |
| learning-lab | split Hero／垂直節點／單元 spread | Archive／Detail／About | 最後手機字級與空文章待看 |
| curator | 相框展牆／主抽屜／兩個次要物件列 | Archive／Detail／About | 最後原型列結構與手機字級待看 |
| radio-letter | 暗色 Hero／聲波／節目雙欄／逐字稿 | Archive／Detail／About | 最後合法音訊／空文章待看 |
| reading-atlas | 年份／四欄月份／年度書／季度索引 | Archive／Detail／About | 最後手機字級／空文章待看 |
| clinician | split／fit／process／qualification／contact | Service／About／FAQ／first-contact | 最後空資料 gate 待看 |
| companion | 拱形 Hero／信件／低壓流程 | Service／About／FAQ／first-contact | 最後空資料 gate 待看 |
| somatic | 全幅 Hero／練習帶／淺色服務入口 | Service／About／FAQ／first-contact | 最後原型色帶重排待看 |
| coach | 大字封面／錯位方法卡／深色合作／底部 CTA | Service／About／FAQ／first-contact | 最後空資料 gate 待看 |
| collective | 拱形 Hero／立場／成員卡／活動 ledger | Service／About／FAQ／first-contact | 最後空成員／活動待看 |
| trust-path | 五站／脊線／範圍／比例時間尺 | Service／About／FAQ／first-contact | 最後空時間／服務 gate 待看 |

## Builder Pack
離線前已用原本 Builder Pack 解壓實測：
- 12/12 Layout 選擇實際匯出。
- knowledge/helper 完整 Astro Build、SEO、draft leakage、Pagefind、搜尋索引通過。
- Guide manifest 與 ZIP manifest 比對通過。
- 最新修正仍需取得当前 Head CI 的相同驗證，不借用先前 Head 的 PASS。

## 平台限制與下一步
執行環境在最後一輪離線（exec-server environment_offline），不能再本機讀檔或觀看新 artifact。最後修正透過 GitHub 連線從 **固定 7eb7ad04 SHA** 重建並保存，沒有改 main 或 PR #47。

接手者必須：
1. 讀最新 Head／四項 CI／失敗 log。若 CI 失敗，先修正，不跳 gate。
2. 取得最新 `student-visual-qa`，看 `articleCounts` 與 empty JPG 真正為零篇，再逐款檢視最後一輪四尺寸。
3. 特別看 Curator 的主次物件、Somatic 的色帶重排、四款手機字級、合法 Radio 音訊；完成之前不宣稱十二款「最終視覺全部完成」。
4. 未測真機／Safari／Firefox／螢幕閱讀器；不把 Chromium 與 fixture 成功擴張成所有未來內容保證。
5. 仍保持 Draft，不 Merge、不部署 Production。


## 最新已確認的程式驗收：10a510e0
此節更新前面的「最新 CI 待確認」狀態：
- 四項 Check Runs 均 PASS：Cloudflare Pages、preview-build、standalone-build、static-build。
- Standalone run `38605031762`、job `115993608446`，實際 log：
  `{"total":576,"failedHttp":0,"overflow":0,"errors":0,"noFamily":0,"heading":0,"articleCounts":0,"keyboard":0,"invisibleMasthead":0}`
- `articleCounts=0` 表示沒有文章數量失敗；empty 實測必須 0、single 必須 1。撤回舊文章的六個輸出面向均通過。
- 合法一秒靜音 WAV 的 metadata／muted play/pause 檢查沒有錯誤。
- Static run `38605031559` 與 PR Preview run `38605031726` 均成功；原 Builder Pack 的解壓／匯出／完整 Build／Guide 版本 gate 同時通過。

[最新已確認 576 張（10a510e0）](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38605031762/artifacts/11914384379)

**這些新圖尚未目視**：環境離線，不能把 log 的 PASS 說成最終 Art Direction 全部通過。上一輪舊圖的空文章 FAIL 已被修正且回歸通過，但仍應看最新 empty JPG。

## 既有助人者「文章」選項的相容性
最後檢查發現：planner/exporter 原本允許 helper 啟用 articles，但專屬 Archive 元件只有六款 knowledge 分支，會讓 helper 的文章列表空白。已在同一 ArticleArchive 補回實際公開文章列表／空內容狀態，沿用目前 Design Family，沒有新建 Block、搜尋或產生器。

既有驗證增加一個 helper＋articles 的實際匯出／Build，確認公開文章、草稿排除、Archive Count=1，並捕捉列表和詳情的四尺寸，共新增 8 張；因此下一個有效 Head 預期 **584 張**。此新 Head 必須再核對 CI，不借用 10a510e0 的綠燈。


## 最新完整程式驗收：283a5a19（含 helper 文章）
此節取代前面「584 張待確認」的技術狀態：
- Commit：`283a5a19a0c075444a2c38ccd94a601e70268970`。
- Cloudflare Pages、preview-build、standalone-build、static-build **四項 PASS**。
- Standalone run `38606958973`、job `116000200096`，實際 log：
  `{"total":584,"failedHttp":0,"overflow":0,"errors":0,"noFamily":0,"heading":0,"articleCounts":0,"keyboard":0,"invisibleMasthead":0}`
- Helper 啟用文章的實際 Archive／Detail 已回歸通過；公开文章可見，草稿不公開。此新增 8 張為相同既有流程的額外測試，不是另一個匯出器。
- Static run `38606958960`、job `116000197819`：Builder Pack 解壓、十二款選擇匯出、knowledge/helper 完整 Build、canonical prompt／ZIP gate、Guide ZIP 真實瀏覽器下載與遠端 ZIP black-box 均 PASS。
- PR Preview run `38606959000` PASS。實際 Cloudflare immutable Preview：`https://fe8d858d.personal-site-starter.pages.dev/`，確認七個路由及 ZIP，對應此已驗收程式版本。

[584 張完整學員四尺寸截圖](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38606958973/artifacts/11916106581)

最後的歸檔 commit 只更新本交接記錄及驗證腳本的文件參照註解；網站、匯出器與測試行為同此已確認版本。仍以最新 GitHub Head／Checks 為準。

**最後未完成：584 張最新版的目視 Art Direction 覆核。** 環境離線，不能再讀／看新圖片。十二款正常、長文與缺資料的瀏覽器技术 gates 均 PASS；但最後的原型忠實度與內頁視覺完整性不能冒充已收工。上一輪圖已目視，本輪最後修正依據原型／程式與 CI；重新取得最新 artifact 看圖即可延續，無須重做研究或重造功能。
