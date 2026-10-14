# PR47 第二階段｜內頁四尺寸 QA 第一輪

日期：2026-10-14。PR47 保留 Draft，不 Merge、不部署 Production、不改 PR46。

## 實際執行證據
- Workflow：[`Art Direction Interior QA`](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38577914500)
- Artifacts：`art-direction-interior-qa-132`，含原頁完整截圖 132 張和 `manifest.json`；可從該 Action 的 Artifacts 下載。
- 11 個新增方向 × 每方向 3 頁（索引、詳細頁、About）× 1440/1280/768/390 四種寬度 = **132/132** 成功截圖。
- 首輪程式自動檢查：**132/132 PASS**，未發現 document 橫向 overflow、單元素越界、空/危險 URL、斷掉的錨點、缺失的圖片 alt、缺 main、缺/多 H1、首個 Tab 不能移到互動元素等問題。
- 使用未修改的頁面內容，不是首頁用過的 neutralization/post-render 調色替換。自動化未代替視覺藝術總監或完整無障礙讀屏測試。

## 第一輪人工圖面抽查
- 已生成「11 款 × 索引/詳情/About × 桌面/390px」共 66 個縮圖的對照表，確認布局仍有主次角色。
- 結構辨識：sidebar-journal 的左導航與正文、editorial-frontpage 的刊物結構、card-journal 均權格網、visual-stories 的圖文序列、compact-dispatch 的緊密清單、split-reader 的雙角色分欄、portrait-profile 的人像/身分、service-catalogue 的資料條列、studio-chapters 的章節、editorial-practice 的主張文章、question-led-practice 的問答。並未宣稱已完成逐頁全尺寸人工閱讀。

## 本輪完成 / 尚待
- **完成**：對正常 Demo 資料的 132 個內頁實際渲染／截圖、基本 route/DOM/overflow/Tab 檢查；所有自動檢查通過。
- **尚待**：低內容量（零文章、僅一篇、零服務、僅一項服務、缺圖）專門截圖與人工審查；低內容量的 Build/正規化驗證在第一階段已完成，但不能代替視覺 QA。
- **尚待**：更完整鍵盤巡覽、關閉 JS 模式、讀屏語意、文字對比度、長中文標題，逐頁人工視覺修正。
- **尚待**：根據 132 張圖檢查細部間距、截斷、字體與章節閱讀節奏，記錄具體 defect 才能關閉第二階段。
- **另外延期**：獨立 Starter/Adapter 截圖驗收不屬本輪，保持延期狀態。
