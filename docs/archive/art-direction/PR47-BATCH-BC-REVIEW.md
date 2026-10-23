> **已封存（2026-10-23）。** PR 當時的交接、審查與 QA 紀錄。仍有效的規則與尚未簽核的人工驗收清單已併入 `docs/layout/layout-assembly.md`。結構辨識與 QA 證據分級的機器可讀版本是 `docs/art-direction/pr47-layout-handoff-registry.json`。僅供歷史查閱，不再維護。

# PR #47｜批次 B＋C 設計驗收／收斂報告

日期：2026-10-14。此文件記錄實際瀏覽器自動量測、原貌截圖抽查與缺陷修正。**自動成功 ≠ 逐張美術人工簽核**。PR 保持 Draft；不 Merge、Production、不改 PR46。

## 最新證據

- [Batch B/C Full-site Review — 通過的 Run](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38599421924)（Head `9cc05218547c`）。第一次 Run `38598844284` 的 8 組錯誤沒有抹去：Reading Atlas 2 個原型 `href="#"` × 4 尺寸；Trust Path 首頁 H1 在 main 外，測試誤判 × 4 尺寸。
- 重跑結果：**232/232 成功、0 blocking DOM/overflow/anchor/alt errors；新增 11 款跨頁 Header 幾何差異 0。**
- 232 = 11 新版型 × 4 頁（首頁、索引、詳細、About）× 4 尺寸 + 其餘 14 款首頁 × 4 尺寸。
- Artifact `pr47-batch-bc-232-screenshots`：原貌全頁 PNG 與 `report.json`。腳本 `scripts/qa-pr47-batch-bc.mjs`，CI `.github/workflows/pr47-batch-bc.yml`。同時保留現有 `Art Direction Interior QA`、`Art Direction Phase 2 Stress QA`、`Art Direction Interior Accessibility Audit`。
- 程式仍回報 224 組頁面／尺寸有 **small-clickable-targets** 警告（門檻 28px、包括行內文字連結）。它是偏保守的**人工追蹤訊號**，不是已核定 WCAG 2.2 失敗；尚未做逐元素豁免與量測判定，不能用零 blocking 宣稱已符合所有觸控規範。

## Batch B｜11 款成套多頁

| 方向 | 首頁 → 索引 → 詳情 → About 設計連續性 | 現階段結論 |
|---|---|---|
| Sidebar Journal | 品牌側欄／日期串流；所有內頁延續 rail | 自動通過 |
| Editorial Frontpage | 刊物報頭、編輯主次；詳情版面更窄以利閱讀 | 自動通過 |
| Card Journal | 首頁及索引同權卡片，長文內頁改閱讀列 | 自動通過 |
| Visual Stories | 圖文序列和影像佔位持續出現在內頁 | 自動通過；圖片授權/正式素材待配置 |
| Compact Dispatch | 緊密日期筆記、窄幅列表；手機不把格式改成通用卡 | 自動通過 |
| Split Reader | 雙角色閱讀與索引；內頁沿用文字主次 | 自動通過 |
| Portrait Profile | 人物身分佔位、方法及服務資訊；沒有虛構人物照片 | 自動通過；真實肖像來源待配置 |
| Service Catalogue | 服務目錄／規格表結構，詳情和 About 延續設計語法 | 自動通過 |
| Studio Chapters | 章節閱讀與編號步驟，服務頁仍按階段呈現 | 自動通過 |
| Editorial Practice | 專業觀點＋服務說明的主次分隔 | 自動通過 |
| Question-led Practice | 問題導向、問答順序延伸至詳情 | 自動通過 |

**硬性結果**：176/176 新版型跨四頁四尺寸截圖；H1、主內容、連結、圖片 alt、全站 overflow 檢查無阻擋錯誤；各版型四頁 Header 的 left／width／height 在每個驗收寬度的差異皆未超過 4px。

**有意保留的版面差異**：內頁文章／服務正文可較窄；一致性只要求網站畫布外框及主要導覽，不強迫同款所有頁面等欄寬／Hero 高度。單一正式 Starter／完整 Article Collection 的匯出屬 PR46，非本輪完成事項。

## Batch C｜25 款整體 Art Direction

在 1440／1280／768／390 四寬度，共 100 張原貌首頁截圖；與既有 100 張中性化首頁截圖不同。以 Typography、Hierarchy、Grid、Spacing、Visual Rhythm、CTA、Responsive 與誠實 Demo 狀態對照。

- 可辨識差異：原始 12 款及新增 13 款維持各自首頁結構，不以換色當另一套 Layout。使用者先前已確認 25 款「大致可以區分」。
- 主要自動檢查：沒有頁面水平溢出、缺失 H1、缺少圖片替代文字、空 URL 假 CTA；用戶先前發現的 Subject Atlas/Practice Compass 11 路由寬度與 Header 差異，已由獨立 44 場景 QA 驗證通過。
- 實際修正：Reading Atlas 原型「做法／更正」兩個資料條目原本帶 `href="#"`，現在改成純文字；Trust Path `C05` CTA 無正式聯絡網址時現在顯示不可點擊的狀態文字，不再用 `#` 假裝可寄信。測試 H1 改從整個 document 檢查，避免把位於 `main` 之前但實際存在的 Hero H1 誤報缺失。
- 待設計人工複核：224 個頁面／尺寸組合的「小點擊目標」觀察警告仍需有實際元素與行動裝置操作證據才分級；無圖片與有授權真圖片時的視覺比例仍需使用正式素材確認。中性化截圖刻意隱藏媒體，所以不能代替這項。
- 不能宣稱的驗收：真實螢幕閱讀器流程、實際手機 Safari/Android 實機、文章內容與品牌來源真實性、完整 Starter／Adapter 產站與人工每張 232 截圖視覺批准。

## 安全與真實性

不臆測諮商師的專業資格、價格、見證、醫療成果及表單／預約成功；`bookingUrl` 沒設定不可做有效 CTA。原型內容如仍是示範文字，不能轉寫成學員正式文章；學員文章繼續由 Astro Content Collections + Pagefind 供應。

## B/C 結案界線與下一步

**B/C 的工程可重跑自動審查、原貌截圖、跨頁幾何對照與本輪確定缺陷修正已完成。** 跨瀏覽器實機、真人讀屏、小觸控目標的必要修正判斷、真實圖片／真實內容客製及全部畫面設計負責人的批准屬**仍待人工簽核**，不標 PASS；原先延期的獨立 Starter／Adapter 截圖繼續延期。PR47 維持 Draft，不應自動解除／合併。PR46 正式 Builder 接線另案進行。
