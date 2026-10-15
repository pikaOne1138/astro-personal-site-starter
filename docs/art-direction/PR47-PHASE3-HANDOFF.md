# PR #47 第三階段｜25 Layout Definition 與 PR #46 交接

更新：2026-10-14。這是 PR47 Art Direction 的交付規格，**不是 25 套完整學生網站**。維持 Draft；不得在這份文件中授權 Merge、Production 或 PR46 主 Generator 修改。

## 單一可機器讀取的交付清單

`docs/art-direction/pr47-layout-handoff-registry.json` 包含 25 筆、每筆具有唯一 slug、kind、名稱、結構辨識特色、原型路由、內容契約、renderer／內容資料來源（若適用）、assemblyStatus、QA 及 handoff 限制。

|來源層級|數量|已具備|未具備|
|---|---:|---|---|
|main 原有方向|12|既有首頁原型、結構性識別|完整學生輸出契約；不要誤當新增 12 多頁|
|PR47 既有方向|2|Subject Atlas／Practice Compass 獨立 Adapter，已測匯出|主 Generator 整合、已延期的獨立 Starter 截圖驗收|
|PR47 新方向|11|各四個原型路由、可編輯 Prototype Content Contract、內頁 QA|正式 Content Collections 到學員 Starter 的完整映射、實際學員 Builder 整合|

數量：知識／部落格 13，助人／個人專業服務 12。Layout≠Theme≠Block≠Effect。

## 給 PR46 實作的契約交接

1. PR46 **讀取** `pr47-layout-handoff-registry.json`，但不應把它直接當作 Ready 列表。學生介面僅顯示已真正具有可用 Renderer / Build Gate / 裝置驗收的方向；待使用者同意後才提升 Ready。
2. 新增 11 款用 `src/data/art-direction-layout-content.json`（範例），以及 `src/data/art-direction-content.ts`（原型正規化）作輸入形狀參考。真實文章必須由既有 Astro Content Collections 供應，不另立持久 JSON metadata 假文章庫，也不得捨棄 Pagefind。
3. 將個人網站 Content Model 匯入各款 Layout-specific composition；保留不同的首頁 IA、文章／服務索引、詳情頁、About 閱讀語法，而非全部硬套同一種 Hero / cards。
4. 真實圖片欄位缺失時保留可閱讀 fallback；不杜撰作者肖像、工作者姓名、證照、價格、見證、成效、正式聯絡資訊或付款／預約成功。
5. 新原型首筆使用 legacy detail URL（例如 `articles/sample/`）；當真實網站改用 Content Collection slug 時，由 PR46 設定對應、舊網址與遷移／redirect，不直接複製原型 legacy routes 成學員正式網址。
6. 由 PR46 對主 Generator／Gallery／主 Adapter 提獨立 PR 內修改，並驗證真正匯出的 Astro Build、頁面、RSS、Pagefind、SEO/Canonical 以及多裝置行為。**PR47 不跨界修改 PR46 code**。

## 驗收證據（現有，不得外推）

- 25 款首頁中性化 1440／1280／768／390，共 100 截圖，Structural stress test；不是 25 套學生站。
- 新 11 款索引／詳細頁／About ×4 尺寸，共 132 正常原型畫面；零／單筆／長 CJK ×2 尺寸，共 198；共 330 組內頁截圖。
- 新 11 款 66 次 axe-core WCAG A/AA、2.1 AA 自動掃描，零 violation；**不等於真人讀屏或全 WCAG 人工驗收**。
- Content contract 三類 Astro Build、77 項測試通過；Subject Atlas／Practice Compass 的獨立 Adapter 具特定技術驗證。
- 證據鏈：`docs/art-direction/PR47-P0-VERIFICATION-2026-10-14.md`、`PR47-CONTENT-CONTRACT-11.md`、`PR47-PHASE2-INTERIOR-QA.md`。
- 新增 `scripts/verify-pr47-layout-handoff.mjs` + `PR47 Layout Handoff Contract` GitHub Action 驗證 slug、客群計數、原型路徑、內容契約、狀態與禁止誤標 Ready。

## 明確保留的限制

- 原有 12 款並非全部多頁，對它們的內頁 QA 不應寫成已完成。
- 新 11 款可編輯資料契約仍供 Prototype 展示，部分固定示範詳情頁在清空資料時仍存在示範段落；不可把它視為正式文章已公開。
- 若缺失資格、費用或預約來源，網站不能虛構資料或導向假的提交成功。
- 已延期的獨立 Starter／Adapter 截圖不在本輪強行恢復。
- 全面的真人讀屏、逐張四尺寸人工排版核可尚未取得；25 款不能一律標 `ready`。
- 無使用者明確確認，不 Merge PR47，也不將 PR47 的 Definition 寫入 PR46 主要展示／組裝系統。

## 完成定義

第三階段的 **Definition / Evidence / Handoff 文件與自動一致性檢查** 可以交付；但正式可供學員交付的 `Ready` 狀態需另由 PR46 主線完成真實整合與人工核准。讀者不應混用兩種完成。
