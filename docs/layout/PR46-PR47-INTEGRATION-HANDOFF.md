# PR #46｜PR #47 整合與 25 款 Starter 擴充接手

更新：2026-10-15（Asia/Taipei）。本文件是後續實作的目前入口，取代「本輪十二款驗收完成＝全部擴充工作完成」的解讀。本輪已整合 main 並完成新增十三款的主匯出器與初版正式 Adapter；尚未取得新增十一款的完整四尺寸目視驗收，不標 Ready。

## 本輪實作進度

- main 已以雙 parent Merge Commit `0975ecf3d62dfd65b44fbb8320f6af4a0a70f5c6` 整合；保留 PR47 原型／內容契約、兩邊資料包邏輯及原十二款組裝器。該 Commit 的 Preview、Static、Standalone、Independent Adapter checks 成功。
- `7840d3aedbdf443097832078dfd4666321546888` 已把 Subject Atlas／Practice Compass 接入主 `export-starter.mjs`、Starter 選擇與既有 ZIP。獨立 Adapter 29 項本地回歸通過；該 SHA 的 Preview／Static／Adapter checks 成功，Standalone 待取得完成結果。
- 新增十一款：逐款移植 PR47 的原生多頁 DOM/CSS；接 Content Collections、真實文章 slug、About 四欄、顯式 published 服務與真實詳情網址。全部十一個實際匯出網站本地 Build 成功；Home 僅一個 h1／main，均有 StudentNavigation，About 四欄輸出檢查通過。
- 主流程現有 25 個可組裝方向，新增十三款維持 **in-progress Adapter**。這是匯出能力，不是 25 款已通過設計驗收。
- 既有 Standalone Actions 已擴充新增十三款四尺寸與十一款 0／1／多筆、撤回快取、草稿、服務 0／1／多筆回歸。新 SHA Actions／實際截圖仍待取得並目視，不能以本地 Build 代替。
- PR47 人工 QA 的真實圖片裁切、細小點擊目標、裝置／讀屏及跨頁品質仍 pending。Native 初版仍須依截圖整理內容密度與空資料節奏，不自動核可。

## 已核對的 GitHub 基準（原始接手記錄）

- Repository：pikaOne1138/astro-personal-site-starter。
- PR #46 分支：`feat/visual-template-assembly`，更新文件前 Head `84a027642dd25cf52cedbb580ce7f3dbcf6cb5d5`；Draft、open、未 Merge。
- PR #47：merged=true；Squash Merge SHA／目前 main：`d79fedd7a1731c81baec44ef23e4436a684d6b1e`。
- GitHub compare 顯示 diverged：#46 相對 main ahead 228、behind 1；共同基底 `26acf168b90a7d672d9468c7489e8095cf060683`。
- 本次 GitHub 回報 #46 mergeable=true；以共同基底執行 `git merge-tree --write-tree --merge-base=<base> <PR46-head> <main-head>`，exit 0，未發現文字衝突。這只建立試算 tree、沒有實際 merge／更新分支。先前「mergeable=false」不是本次最新結果；即使乾淨合併仍需驗證語意／ZIP 相容。
- 十二款既有 Starter 的固定驗收與限制見 [2026-10-15 驗收紀錄](PR46-ACCEPTANCE-2026-10-15.md)。[84a02764 的 624 張學員網站截圖](https://github.com/pikaOne1138/astro-personal-site-starter/actions/runs/38689419637/artifacts/11951691634) 保留至 2026-10-22。這份證據不涵蓋新增十三款或整合後的新 Head。
- 每次開始均重新取得最新 Head／main／CI；不可將上述歷史 SHA 的綠燈套用到新 Commit。

## 開始前必讀

PR46 分支與 PR47 merge 到 main 的版本都須核對：
- `AGENTS.md`
- `.ai/astro-ui-craft/SKILL.md`
- `.ai/astro-layout-craft/SKILL.md`
- `.ai/astro-editorial-layout-design/SKILL.md`
- `.ai/astro-pr-preview/SKILL.md`
- `docs/layout/PR46-HANDOFF.md`
- `docs/art-direction/PR47-PHASE3-HANDOFF.md`
- `docs/art-direction/PR47-BATCH-BC-REVIEW.md`
- `docs/art-direction/PR47-MANUAL-QA-CHECKLIST.md`
- `docs/art-direction/pr47-layout-handoff-registry.json`

目前 PR47 文件位於 main 固定 SHA；尚未整合時，不能因 feature branch 找不到它們就重造研究。已讀的 #47 歷史文件仍可能寫著 Draft／不 Merge #47；實際 #47 已 Merge 的事實以上述 GitHub 狀態為準。

## 先整合 main，再接正式產站

1. 讀 #46 最新 diff、CI、失敗日誌及 main，將已合併 #47 的 main 整合到同一 #46 feature branch。不得直接以 ours/theirs 覆蓋檔案。
2. 特別檢查 `scripts/build-student-pack.mjs`：兩邊的打包來源、排除規則、Skills 參照根目錄、layout 清單與版本 manifest 都須保留並協調。乾淨文字合併也可能缺少必要包內檔案。
3. 保留原十二款 Home／Archive／Detail／About／Service adapters、清除生成快取的 build 邏輯與零文章回歸；不可覆蓋為只有 Prototype 的 #47 狀態。
4. 跑 Build、現有 CI、Starter 匯出、既有學生 ZIP 解壓／安裝／Build／Guide manifest／Preview 回歸。整合後的新 SHA 必須有自己的結果。
5. 依 #47 registry 的內容契約將新增兩款 Adapter 與十一款多頁原型接入既有主 Starter Export／Gallery／Site Brief，不新建另一套產生器、QA 平台或後台。
6. 不重新做大量版型研究；依既有構圖實作正式資料映射。單一問題久卡時記錄可重現原因，換驗證方法或推進其他不受阻的版型。

## 25 款逐款狀態

Definition＝設計／資料契約；Prototype＝可瀏覽原型；Adapter＝具獨立渲染與部分或完整資料接線；Ready＝主流程接線、Build、完整內容與四尺寸目視驗證，且完成必要人工核可。它們不是單看數量的完成度。

原十二款在 PR47 registry 被標 prototype-only，是 #47 的來源範圍；PR46 已完成的十二款獨立匯出證據仍有效，不能被該標記抹去。新增十三款也不能借用原十二款的驗收而被升級 Ready。下表不改寫 #47 來源 registry，也不自動提升學員選擇介面的 Ready 狀態。

| 名稱 | slug | 已達層級／證據 | 下一個 Gate |
|---|---|---|---|
| 田野筆記 | `field-notes` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 長文書房 | `essayist` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 學習實驗室 | `learning-lab` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 收藏者目錄 | `curator` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 聲音通信 | `radio-letter` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 閱讀年鑑 | `reading-atlas` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 清晰臨床 | `clinician` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 溫柔陪伴 | `companion` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 身體與節律 | `somatic` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 實作型教練 | `coach` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 共好工作室 | `collective` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
| 信任路徑 | `trust-path` | Adapter；PR46 原十二款已通過限定測試內容驗收 | 保留 624 張基準；main 整合後重驗 |
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

盤點：25 個方向（13 knowledge、12 helper）；原十二款已有固定目視證據，新十三款已接入主匯出器並有本地 Build，新增十一款的整合後 CI 與目視待驗，Ready 尚未核定。

## 正式資料與功能不可退化

- Astro Content Collections 是正式文章來源；沿用 Pagefind、RSS、Sitemap、Canonical、SEO Metadata、分類／標籤及真實 slug，不建立假文章 JSON 或第二套搜尋。
- 不將 Prototype demo 文當正式文章；舊原型固定 sample/detail URL 與正式 collection slug 的映射／redirect 必須明訂。
- 各款保留自己的首頁 IA、索引、詳情、About、Navbar／Footer、閱讀行長與節奏；不能全轉成同一 Hero／三卡／通用 Footer。
- 不虛構姓名、專業資格、價格、見證、成效、聯絡來源或預約／訂閱成功。缺正式服務網址時明確待設定。
- 學員流程維持：ATP 規劃器 → Site Brief JSON → 既有 AI Builder Pack ZIP → 官方起始提示詞 → AI 建立學員自己的 Repository → Preview → 確認部署；不要求學員 Fork 老師 Repo、跑 CLI 或理解 Astro。

## 每款整合後的驗收

以真正匯出的 Starter 檢查，不用 Prototype gallery 代替：
- 1440／1280／768／390：Home、Index、Detail、About；helper 加服務／FAQ／聯絡。
- 0／1／多筆文章或服務、只有一項服務、長中文、長文、無圖片、未設定專業資訊。
- Navbar 鍵盤／焦點／手機重排、頁面返回及文章鄰篇導覽。
- 撤回／刪光文章後重新 Build，確認首頁、Archive、直接文章路由、RSS、Sitemap、Pagefind／搜尋索引均不殘留舊文章。必須驗證輸出，不只 Build exit 0。
- Builder Pack 解壓、安裝、Build、Preview 與部署所需檔案／相對引用完整；Guide／ZIP manifest 一致。
- 最新 CI 截圖下載後實際目視；Build 或 axe 綠燈不能代替設計及真人操作驗收。

## 承接 PR47 未簽核項目

保留 `PR47-MANUAL-QA-CHECKLIST.md` 的 A–D，逐項註明裝置、URL、日期、審查者、截圖與結果：
- 25 款有授權真圖／無圖的構圖；11 款連續四頁的導航、畫布與詳情閱讀節奏。
- 224 組頁面／尺寸的小點擊目標警告：須定位具體元素與尺寸，再分級／修正／記錄豁免，不能說成 224 個確認違規，也不能直接全勾 PASS。
- 實際鍵盤、Android Chrome／條件允許時 iOS Safari、NVDA／VoiceOver；自動 axe 不等於真人測試。
- Subject Atlas／Practice Compass 原先延期的獨立 Starter 截圖，納入 #46 接線後的實際匯出驗收；未執行前維持 pending。
- 真實圖片、資格／服務條款來源與設計負責人的核可仍需證據。

## 交付／安全邊界

保持 PR46 Draft，不自動 Merge PR46，不改 Production／DNS，不直接寫 main。本次更新沒有實際合併 main 或新增 Renderer，沒有新增通過聲明。

後續每次交付記錄：整合／衝突結果、25 款逐款 Definition／Prototype／Adapter／Ready、真正主流程輸出的款數、哪些通過 Build／RWD／內容驗收、#47 人工清單承接、最新 SHA／CI／Preview／截圖及剩餘阻擋。最終目的為零程式背景學員能用 AI 和真實內容建立可維護的個人網站。
