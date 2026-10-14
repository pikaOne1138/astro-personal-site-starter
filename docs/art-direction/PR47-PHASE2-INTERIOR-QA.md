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

## 第二階段追加：低內容／長 CJK／無障礙回歸（2026-10-14）

本節優先於上方第一輪「尚待」清單，因為它記錄後續實際執行結果。

- GitHub Actions [Art Direction Phase 2 Stress QA](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38579784078)：**PASS**。三種資料：零文章／零服務、只保留單篇／單項、超長連續 CJK 標題與正文；11 款×3 內頁×2 寬度（1440/390）×3 情境＝**198/198 真實 Chromium 全頁截圖成功，198/198 DOM／連結／鍵盤焦點／overflow 檢查 PASS**，同時禁用 JavaScript。
- Artifacts：`art-direction-phase2-stress-captures`，含 `empty/`、`single/`、`long-cjk/` 和三份可追溯的 JSON manifest。首輪正常資料另有 132 張四尺寸截圖，總計 **330 張內頁場景截圖**（132 基準＋198 stress）。
- GitHub Actions [Art Direction Interior Accessibility Audit](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38580569498)：**PASS**。11 款×3 內頁×2 寬度＝**66 次 axe-core WCAG 2 A/AA、2.1 AA 規則掃描，0 項 violation**，報告存 `art-direction-interior-a11y-report`。不代表人工螢幕閱讀器與所有 WCAG 成功準則全部驗收。
- 新增可重跑程式：`scripts/qa-art-direction-phase2-stress.mjs`、`scripts/qa-art-direction-a11y.mjs`；CI `.github/workflows/art-direction-phase2-stress.yml`、`.github/workflows/art-direction-interior-a11y.yml`。
- 已抽查零內容與極長 CJK 的手機合成截圖；版型沿用不同布局，長中文字使段落變高但未見測試尺寸的水平外溢。這不代表所有尺寸已逐頁人工細看。
- **已知設計內容限制**：即使資料來源清空，原型固定示範詳情路由（例如 `articles/sample/`）仍會保留部分明確標示為原型的示範敘事。這是設計展示頁，不等於正式公開文章。正式學員內容路由必須遵照 Content Collections 和 #46 組裝機制，禁止把展示段落當真實發布內容。
- **第二階段結論**：正常內頁四尺寸、自動低內容與長中文回歸、禁用 JavaScript、基礎焦點與 axe 自動稽核均完成且成功。完整真人讀屏操作、精細 Art Director 多尺寸逐頁主觀確認、正式 Starter 截圖（本輪延期）不屬於本次**自動化通過**的證據，未取得人工核准不得宣稱「100% 無障礙」或「所有 UI 已人工驗收」。下一工作主線可開始第三階段的 Definition／Handoff 收斂，但設計 Review 仍要保留人工 QA 待確認標記。
