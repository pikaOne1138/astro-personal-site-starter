# 已有網站的六種設計改善｜共用工作流程

本文件供學員自己的 Astro 網站使用。由 `astro-site-entry` 判斷任務，進入既有網站時以 `astro-site-maintenance` 為修改護欄。這是各設計 Skill 共享的**操作規約**，不是新 Skill、不是新的網站生成器，也不是必須照表填寫的問卷。

## 從對話到真實 Astro 修改：學員 AI 操作鏈

學員只需要說自然語言需求；**以下指令由有 Repo 與執行環境權限的 AI 操作**，不是要求學員填技術表單。先讀 `AGENTS.md`、`PROJECT.md`、頁面、現有 Blocks／Effects Registry，保留 URL、文章、功能及已否決的方向；只讀得出已確認的事實。任務進入網站實作時，以最小必要範圍執行：

1. **劃定邊界**：依任務路由選對應專業 Skill；`node scripts/design-scope.mjs start --id homepage --mode local-ui --scope "首頁第二段" --paths "src/pages/index.astro" --pages "/" --preserved "其他內頁和文章網址不變"`。模式由 `design-review-evidence.mjs` 的六種值決定：`design-audit`、`reference`、`candidates`、`local-ui`、`brand`、`motion`。這只是明確修改範圍，**不是自動修改程式或取得學員同意**。所有必要跨檔影響應在修改前盤點，不得為了通過檢查擅自略過共用元件受影響頁面。
2. **專業實作**：設計健檢與參考改造先以證據診斷，再交 Layout／Editorial／UI；局部修改與品牌改造交 UI／Tokens；互動修改交 Motion，必須確認 reduced-motion、觸控、鍵盤與無 JS。AI 在**指定的學員站工作分支**真正修改現有 Astro 程式與內容，不能把 Skill 文字當成已改完。
3. **候選比較（需要多案才做）**：用 `node scripts/design-worktrees.mjs create --id editorial --dir "../candidate-editorial"` 建隔離工作目錄；每案由專業 Skill 在**各自工作目錄**真正寫入不同布局並 Commit。現有工具只隔離 Git，**不會自動生成候選畫面**；沒有可用 Git 時不冒稱已完成候選。候選選擇或否決記錄在 `design-session.mjs`，同內容同基礎配色仍要看得出結構差異。
4. **局部採用／撤回**：在學員自己**非 main 的整合分支**，先 `node scripts/design-adopt.mjs inspect --id editorial --paths "src/pages/index.astro" --approval "學員確認採用首頁"`，核對候選的原始碼差異、排除未選檔案；確認後才 `apply`。若尚未 Commit 且沒有其他修改，可 `undo --id editorial` 還原這次選用的 patch。新增／刪除／改名檔案不走這個捷徑，須另行人工比對與 PR 審查；已 Commit 或 HEAD 改變後需用 Git 正常的 revert PR，不得強制 reset。
5. **長期決策**：學員確實確認、而非 AI 假設的設計選擇，先 `node scripts/design-project-sync.mjs preview --approval "學員已確認的原話"` 查看將新增內容；確認後才 `apply` 寫回**現有** `PROJECT.md`。若有衝突或未提交修改就停止，絕不覆蓋原文。此動作不會同步程式碼或授權發布。
6. **兩版真實截圖**：在各自已 Commit 的原版／新版工作目錄，使用 `node scripts/design-qa.mjs capture --id editorial --stage before --out "../design-evidence/before" --paths "/,/services/"` 與相應的 `after`；它會實際執行 `npm run build`、`npm run qa:responsive`，並核對四尺寸、頁面與完整 Git SHA。完整資料夾保留為唯讀證據，不重用同一輸出路徑。再以 `node scripts/design-compare.mjs --before "../design-evidence/before" --after "../design-evidence/after" --out "../design-evidence/comparison" --paths "/,/services/"` 產生 HTML 並排與 JSON 對照。跨站候選需各別實測，不能把方案圖冒充真的建置結果。
7. **範圍與交付**：`node scripts/design-scope.mjs review --id homepage` 檢查實際 Git 變動是否超出既定檔案範圍；新增的本地操作狀態不代表 Preview 已部署。最後再走既有 `astro-pr-preview` 驗證 PR HEAD、真實平台預覽網址、功能及視覺，交給學員決定。無 Browser、Git 或可用 Preview 時標 `BLOCKED`／`NOT TESTED`；不假設已有人看過畫面。**未經明確授權不可 Merge／Production Deploy**。

單純文字健檢不應強制建立 worktree、執行 QA 或開 PR；只有學員確實要求改站時才進入上述【寫】流程。上面只是把既有工具與安全邊界接起來，並非另一套網站生成框架。工具與程式改動是否真的成功，必須看當次執行證據。

## 共用工作順序

1. **確認要處理的是哪個網站與範圍。** 已有 Repo 時讀 `AGENTS.md`、`PROJECT.md`、實際頁面、共用元件及部署狀態；無 Repo 權限時可以做設計討論，但不可冒充已檢查原站。學員已有明確需求直接處理，不強迫重新選單。
2. **把感受變成可驗證的設計問題。** 區分使用者確定的意圖、實際畫面觀察、原因假說、AI 建議及未知項目。不能只寫「更高級」「更精緻」。如現有構圖已合理，允許建議不修改。
3. **確認變更邊界。** 明示「要改的頁面／區塊」、「可能連動的共用元件／內頁」、「保持不動的內容、URL、功能、品牌及已否決方向」。局部任務不得偷偷改全站 Tokens；跨頁修改不能只改首頁。
4. **按需求決定比較深度。** 局部且明確的低風險修改可直接在分支提出 Preview；整站重新設計或學員想比較時，提出兩至三個真正不同的構圖方向。沒有必要時不強迫多方案，也不得用三種配色冒充三種 Layout。
5. **完成設計決策交接。** 依 `.ai/SHARED-DESIGN-HANDOFF.md` 保存已確認／否決／待確認與各案取捨；諮詢 Skill 只產生可交接的決策，實作交由相應的 Layout、Editorial、UI、Motion Skills。修改既有站不得重跑 Starter 匯出器。
6. **實作與驗證。** 在學員自己的 Branch 修改最小必要範圍，執行 Build、回歸測試及實際 Preview；視覺變更需比較 1440／1280／768／390，檢查中文長標、圖片裁切、鍵盤、觸控、無 JS 與 `prefers-reduced-motion`。大型動效另外檢查效能及降級。
7. **給學員可決定的比較結果。** 說明原本問題、修改內容、受影響及不動的頁面，附有版本與寬度的前後截圖及真實 Preview；未取得畫面就標 NOT TESTED，不可用 AI 想像圖取代渲染截圖。學員可保留部分改動、全部退回或要求另一案；不得自行 Merge。
8. **確認後才保存長期偏好。** 只把學員明確確認且具有延續價值的設計規則寫入現有 `PROJECT.md`／設計決策來源；不記每次對話流水帳，也不新增與既有真實來源衝突的 `DESIGN.md`。發布前仍需針對當次版本單獨核准。

## 設計候選的呈現素材
文字提出的構圖差異，必須能在附上的**相應視覺素材**中看得出來。不要把不同顏色或氣氛的外站縮圖當成「三種不同首頁」的證據；若沒有同內容、同基礎色彩且構圖可辨的真實畫面，就改用簡單線框／區段排列圖比較，並明確標成「示意」而非實際已建立的候選網站。選定其中一案後，下一步是把**已選方案**做成可看版本，不應重新要求學員再選三案。

## 沒有 Repository 存取時的續接摘要
若目前只有純聊天環境，學員要暫停、換對話或換 AI 時，可提供短短三欄的**可複製交接摘要**：「已確認」「已否決（含理由）」「待確認」，保留目前任務與網站來源的已知／未知狀態。這是交給下次對話的文字，**不代表已經寫入網站 Repo、永久記憶或建置完成**。不必每一輪都輸出，也不在學員未要求時強迫整理正式 Design Brief。

## 學員網站的本地設計決策紀錄

學員若已有獨立匯出的網站，AI 可在**學員自己的網站工作目錄**使用 `scripts/design-session.mjs`（`npm run design:session -- <command>`）。這是選用的本地決策紀錄，不是新網頁編輯器，也不需要讓零程式學員自己輸入 CLI：

- 初次使用：`node scripts/design-session.mjs init --site "我的網站" --scope "首頁設計"`。若既有紀錄存在會拒絕覆寫。
- 新增候選：`node scripts/design-session.mjs add --id editorial --title "編輯雜誌" --first "文章標題先行" --flow "文章目錄與主題列表" --mobile "單欄閱讀" --tradeoff "較少圖片"`。每案要有真正不同的結構資料；資料欄位存在不代表差異已實測。
- 保留既有功能：`node scripts/design-session.mjs preserve --text "文章網址與聯絡表單不變"`。
- 學員明確選定：`node scripts/design-session.mjs choose --id editorial --reason "學員希望文章優先"`；否決用 `reject --id editorial --reason "學員不喜歡這個閱讀動線"`。沒有學員實際決定時不可自行執行選定、否決。
- 只記錄對話決策：`note --type confirmed|rejected|pending --text "內容"`。換對話前用 `handoff` 產生白話可複製摘要；用 `show` 讀既有狀態。

內容保存在學員工作目錄的 `.ai` 資料夾下的 `design-session.json`，**只表示當前設計會話狀態**。不會更改版型、圖檔、原始碼、已發布內容或正式分支，不會自動寫入 `PROJECT.md`；只有學員確認為長期規則，AI 才依現有維護程序核對後更新 `PROJECT.md`。此檔可由學員自行決定是否保留於私有版本控制，但不能存個資、憑證或未獲授權的來源素材。若站點沒有此腳本或 AI 無法操作終端機，回退至上方的純文字三欄交接摘要，不要求學員為此額外安裝工具。

## 多個候選方案的獨立工作區

針對既有學員網站真正製作不同 Layout 候選時，AI 可使用隨網站匯出的 `scripts/design-worktrees.mjs` 建立 Git worktree。這是 Git 的**隔離版程式工作目錄**，不是設計生成器：

`node scripts/design-worktrees.mjs create --id editorial --dir "../candidate-editorial"`

此命令只在學員自己的 Git Repo 執行，從**已提交的 HEAD** 建立本地 `design/editorial` 分支及新工作目錄，不推送 GitHub、不部署、不合併。原網站若有尚未提交的程式變更，會拒絕建立候選；已有候選資料夾與同名分支也會拒絕覆蓋。可用 `node scripts/design-worktrees.mjs list` 查看候選工作目錄。

AI 接著才依 Layout、Editorial 與 UI Skills **實際修改候選工作目錄中的 Astro 頁面**，用學員真實內容分別 Build 並在可用的隔離預覽環境檢查。每個候選都要記錄其 Git SHA、真實頁面／四寬度截圖與主要取捨。若沒有真實畫面，只能稱設計草案。學員選定候選後，仍須用既有 PR Preview、安全修改及核准流程整合，**不能因候選被選中就直接 Merge 或發布**。不需要多方案的局部小改，不必額外建立 worktree。

## 真實畫面的修改前後比較

已有的 `npm run qa:responsive` 是 Playwright 真實瀏覽器截圖來源，輸出資料夾內含 `results.json` 與各頁 1440／1280／768／390 等尺寸的 PNG。AI 要比較修改前後時，必須**先分別在兩個版本完成真正的 QA 截圖**、保留兩份不覆寫的資料夾，再在學員網站工作目錄執行：

`node scripts/design-compare.mjs --before "qa-before" --after "qa-after" --out "qa-artifacts/design-comparison" --paths "/,/services/"`

`--paths` 可省略，此時只比較兩份 QA 共同存在的頁面／四個主要寬度；指定路由時，缺少任一尺寸會中止，不可補造截圖。輸出 `index.html` 是可在瀏覽器開啟的前後並排報告，`comparison.json` 含來源版本、PNG SHA-256、尺寸與原有瀏覽器 QA 狀態。此工具**不抓取網頁、不生成設計候選、也不會評定美感**；即使 PNG 齊全，人工視覺驗收仍標 `NOT TESTED`，需由實際審閱者確認。這是對既有 QA 工具的補充，不能取代實際 Preview／發布授權。

## 六種任務各自要做什麼

| 學員意圖 | 主要工作 | 最少交付 | 不應做的事 |
|---|---|---|---|
| ① 設計健檢：「不知道哪裡不好看」 | 先檢查可讀性、主焦點、資訊結構、字體、留白、圖片及手機；依「觀察→訪客後果→原因假說→最小修正→驗證」排列優先序 | 有證據的問題清單及學員可選修正項目；獲准後產生前後對照 | 沒看原站就打分、為了產生問題而硬挑毛病 |
| ② 參考網站改造：「喜歡這個網站的感覺」 | 讀實際可見的網址／截圖；拆 IA、構圖、字體、色彩、照片、閱讀節奏；比較原站，辨識可轉譯設計模式 | 來源與可觀察特徵、可借鑑項目、不可直接複製資產、候選方向及差異 | 複製 Logo、照片、文案、客戶資料或聲稱已看過無法存取的網站 |
| ③ 多種設計候選：「給我三種版本」 | 用同一批真實內容，設計 2–3 個在首屏焦點、區段順序、欄比、列表／圖片策略、手機閱讀動線有實質差異的方案 | 各案理由、取捨、手機規則；學員要求可看成果時提供實際候選 Preview，不拿文字描述冒充成品 | 只換色換字、讓提案無限制循環、不先確認就覆蓋正式設計 |
| ④ 局部區塊微調：「第二段照片放大」 | 依頁面／區塊／圈選截圖定位；查元件及 CSS 作用範圍，做最小 diff；若共用元件會影響多頁則先提醒 | 改動前後同位置比較、受影響頁面與回歸結果 | 全站重生、任意改全域 Token、順手修改其他區塊 |
| ⑤ 品牌視覺改造：「不像我的品牌」 | 釐清或比較視覺人格，檢查現有 Tokens、字體、影像處理、按鈕及跨頁一致性；僅確認後更新共用規則 | 品牌方向與應用到首頁、文章／服務內頁的實際差異、無障礙對比檢查 | 把 Theme 當 Layout；把某次喜好自動變成永久品牌決策 |
| ⑥ 互動與動態精修：「想更有生命力」 | 先描述動效要幫助理解的節點；盤點既有 Effects，選最小可行效果或 none；需要重型效果才另行評估 | 操作前後動態行為、鍵盤／觸控／減少動態／JS 失效降級與效能風險 | 所有 Section 都 fade-up、hover 才顯示資訊、不經評估塞入 WebGL |

## 對話中的跨任務切換

- 「先健檢，再看參考站，最後只改首頁」：同一份已確認範圍與否決條件延續下去，不重新問已知內容。
- 「做一半先發文章」：暫存設計進度，轉內容發布，之後回來仍保留已確認與未決事項。
- 「都不喜歡」：先找候選的共同結構缺陷，再提出真正不同的方向；無理由不重生多輪。
- 「不知道／先看看」：給一個可撤回的小提案；不把沉默或跳過當成發布授權。

## 交付與證據契約

設計討論、實際修改、技術建置、線上 Preview 與視覺驗收是五種不同狀態。

每次有原始碼變更，至少回報：變更範圍、已確認／未確認事項、實際改動、保留不動的部分、各測試 PASS／FAIL／BLOCKED／NOT TESTED、截圖的版本／尺寸、真實 Preview URL／SHA、恢復方式以及等待學員確認的決定。可看候選方案要有可訪問的真實渲染，不能用文字草稿宣稱已交付。

## 可重跑的驗收證據檢查（選用）

本資料包另附 `.ai/astro-site-maintenance/references/design-review-evidence.mjs`，提供不依賴第三方套件的 `validateDesignReview(report)`。它檢查六種模式、觀察／影響／假說／修正／驗證欄位、Build／Preview／視覺狀態、四尺寸前後截圖與核准欄位。**只有存在真實證據才允許把相應狀態標為 PASS**；缺資料標 `NOT TESTED` 而非憑空補值。此檢查只驗證紀錄形狀與必要證據欄位，不檢查圖片真假、預覽是否真的可達、視覺是否漂亮，也不能替代人工審閱或學員發布核准。
