> **已封存（2026-10-23）。** PR 當時的交接、審查與 QA 紀錄。仍有效的規則與尚未簽核的人工驗收清單已併入 `docs/layout/layout-assembly.md`。結構辨識與 QA 證據分級的機器可讀版本是 `docs/art-direction/pr47-layout-handoff-registry.json`。僅供歷史查閱，不再維護。

# PR #47｜人工驗收批次 A：五組高相似結構（第一輪）

檢查日期：2026-10-14。基準截圖來源為 [Art Direction Neutral Visual Evidence](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38584660984)，對應 commit `09673fbe`。確認使用者已自行檢視 25 款，並表示整體大致可以區分。這不是重做設計研究或宣稱所有 UI 完成驗收。

## 正式入口
- [PR #47 Branch Preview](https://feat-art-direction-library.personal-site-starter.pages.dev/layouts/)
- [Commit Preview](https://9a305ed0.personal-site-starter.pages.dev/layouts/)
- [GitHub PR #47](https://github.com/pikaOne1138/astro-personal-site-starter/pull/47)

## 審查方法與界線

檢視同客群中性化後的 desktop 1440、mobile 390 全頁截圖，配合實際 Astro CSS。中性化測試**刻意隱藏圖片**但保留圖片容器占位，所以不能直接把圖片留下的空白全部判定為正式網站缺陷。100 張首頁自動截圖的 QA 無水平溢出，但不是所有內頁的人工作品評分。批次 A 有 5 個風險群、6 組主要雙向比較。

| 比較組別 | Desktop 辨識點 | 390px 辨識點 | 初步判定／風險 |
|---|---|---|---|
| Sidebar Journal / Field Notes | 前者短刊頭＋時間串流、固定側欄；後者大比例觀察刊頭與邊註 | Sidebar 先品牌／導航再密集日誌；Field Notes 強化巨大題字及留白 | **結構可區分**。手機導覽與正文上下順序需維持；不得恢復雙方共用巨大 Hero |
| Clinician / Trust Path / Practice Compass | Clinician 專業揭露及資料冊；Trust Path 五站時序；Compass 三條訪客問題入口 | Clinician 區塊密實度較高；Trust Path 轉垂直旅程；Compass 服務選擇文字優先 | **結構可區分**。Clinician 中性截圖 Hero 下方空白包含原型圖片佔位，應以正常圖片和缺圖 fallback 分開驗證，不能只按中性圖砍掉空間 |
| Subject Atlas / Curator | Atlas 文字主題索引／右側數據；Curator 不對稱編輯展牆 | Atlas 文字與主題數量優先；Curator 大字題＋策展目錄 | **結構可區分**。手機首屏文章索引出現位置偏下，但主要是原構圖留白，需要正常內容截圖才能決定調整 |
| Portrait Profile / Companion | 人物肖像框與個人身分先行；Companion 像信件的長段落 | Portrait 肖像框→身分；Companion 直接書信式訴說 | **結構可區分**。無照片 fallback 應驗標籤、對比、長姓名狀態；不能虛構真實照片 |
| Question-led Practice / Trust Path | 前者全頁問答雙欄；後者連續信任旅程 | Q/A 為連續問題串；Trust Path 仍有明確路線圓點 | **結構可區分**。確認其他服務內頁問答特色不被通用服務卡取代 |

## 實際發現與修正

- **FIXED／低風險 CSS defect**：`src/pages/layouts/clinician/index.astro` 與 `portrait-profile/[...page].astro` 末端追加 CSS 存在字面量 `\\n`，可能破壞緊鄰 selector 的有效解析。已將字面量轉為真正換行（commit `98b29b4`、`d4f73d8`），需要在最新 Head CI 與 Preview 上複驗。
- **WATCH／缺圖真實驗收**：中性化 screenshot 以 `visibility:hidden` 隱藏圖片；Clinician 手機首屏的長空白不可單憑中性圖當成 CSS 空白 bug。需使用原貌 Preview 或缺圖情境確認 Image placeholder 的閱讀價值。
- **WATCH／資訊密度**：在 390px，文字密度很高的 Clinician、Subject Atlas、Question-led 三種不同密度方向有各自的節奏，不以排成同樣卡片來修。
- **NOT COVERED**：原有 12 的完整內頁不都存在，不能宣稱五組全站通過 4 頁人工視覺驗收。人工手機實機、讀屏、逐張頁面批准仍需使用者確認。

## Batch A 結論

**初步設計方向通過**：五組在同字、同配色的 Desktop/Mobile 仍可辨識，符合使用者『大致可區分』的觀察。本輪發現兩個原型追加 CSS 的確定問題並已修正。**尚未形成最終人工批准**；需最新 CI 後以正常預覽抽驗圖片 fallback 與需要保留的裝置排版。PR47 Draft，不 Merge，不 Production，不改 PR46。
