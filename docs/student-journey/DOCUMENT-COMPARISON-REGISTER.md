# ATP 文件內容比對紀錄｜Batch 01–02

> 盤點日期：2026-10-22。對照 GitHub `main` 的原文；新學員驗收檔另讀 `feat/student-planner-draft-recovery`。這是**對照報告**，不是刪除或整併授權，不把歷史驗收表的狀態自動升級為 PASS。PR #61 尚有未合併的 `AGENT-HANDOFF.md` 修訂，以下 `main` 比對必須等 #61 決定後重新檢核。

## 目錄／追蹤方法

- **Batch 01：專案規則與品質／驗收**（10 份，已讀）。
- **Batch 02：學員獨立網站專案上下文與起步**（7 份，已讀）。
- **Batch 03 待辦：其餘 `docs/student-builder-pack/`、`docs/student-intake/`、Guide/FAQ/Starter UI 與三條 Skill 路由**。
- **Batch 04 待辦：Layout／Art Direction 歷史 PR HANDOFF／QA、部署手冊／Skills、19 個 Skill 主文檔**。
- **Batch 05 待辦：剩餘 Skill references／研究原文，判定「資料／規範／歷史證據」後才考慮處置**。
- 單一入口提議為 `PROJECT-SSOT.md`，**尚未建立**。避免另一份 SSOT：本報告只放在 PR #67 的文件稽核附錄；目前 `docs/student-journey/ACCEPTANCE-SSOT.md` 尚待將來整合，現階段不得宣稱 main 已有單一 SSOT。
- 證據鏈：原始路徑 + branch + Blob SHA；程式狀態以 Git/CI/部署證據為準，不用文字摘要充當執行成功。

## Batch 01｜專案規則、品質、驗收（已讀原文）

| 檔名（main） | 內容實際涵蓋 | 交疊／具體差異 | 建議職責與處置 |
| --- | --- | --- | --- |
| `README.md` | 專案定位、研究展示與獨立學員網站區別、GitHub Pages 與 Cloudflare 預覽、正式建站 Prompt 來源、架構、文章／搜尋、歷史功能 | 其中「12 個首頁 Layout」屬舊敘述；`START-HERE` 與 `AGENT-HANDOFF` 都提到 25 方向。README 對研究展示站兩個平台的說明不能直接當學員部署現況 | **保留**公開介紹與導覽，現況數字要透過 Registry 校驗後更新；不要當進度 SSOT |
| `AGENTS.md` | ATP 研究 Repo 的 AI 指引；按 UI、Preview、內容、Starter、三道品質關卡、Section Patterns 分派 Skill；含大量歷史開發備註 | 同類規則在 `STUDENT-AGENTS.md` 出現，但前者面向研究 Repo、後者面向學員獨立站。混用易把老師 PR/部署流程帶到學員站 | **保留**研究 Repo 操作規則；可縮減歷史備註為歷史連結，初步不可直接合併兩者 |
| `docs/quality/QUALITY-CONTRACT.md` | 定義 PASS/FAIL/NOTICE/NOT TESTED/BLOCKED；十項不變條件、Contract→Output→Browser→Visual→Delivery QA、回歸與發布判準 | 與 PR59、七關驗收都要求真實 Preview SHA、實測證據、RWD、不得以綠燈等同人工驗收；此文件是**橫向測試規則**，不是個別測試執行台帳 | **保留為規範定義**，單一 SSOT 應引用狀態定義，不重抄另一套 |
| `docs/quality/DEFECT-REGISTER.md` | W1–W14、N1–N20、F00–F14 問題／故障注入及處置（IMPLEMENTED/COVERED/PARTIAL/DEFERRED）；明定不等於完成最終驗收 | 同一缺陷可能出現在 PR59 與新七關；但問題台帳的 IMPLEMENTED 並不等於當前 Head SHA 已驗收 | **保留獨立缺陷台帳**；SSOT 只顯示連結、未結阻礙與來源版本 |
| `docs/quality/BETA-CANDIDATE-SCOPE.md` | PR #45 Beta 範圍與延後 QA，提醒沒有完整 Props fixture、真實新手人工試走；列後續工作包 | 和新七關涉及「獨立網站交付」、「人工驗收」，但屬 2026-10-14 的 Beta 階段決策 | **保留為歷史基線**，加歷史性標示，避免作為最新未完功能清單 |
| `docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md` | EXT-01～06 真實學員 Repo / CI / GitHub Pages/Cloudflare Preview/分支保護；HUMAN-01～06 四／五尺寸、真實內容、發佈核准；當時技術證據索引 | 和七關第 05～07 關**高度重疊**，但 PR59 更細且聚焦學員獨立 Repo 與人工；七關另涵蓋進站／草稿／訪談／工具能力 | **保留原有驗收 ID 作追溯，將關卡映射到專案級驗收矩陣**；原 PR59 記錄屬歷史驗收視角，不能刪證據 |
| `docs/student-builder-pack/AGENT-HANDOFF.md` | 初次與接手的檔案順序、Exporter/Layout、不可假資格、Branch→PR→Preview、學員端不同部署平台與第一次公開風險、AI 訪談 | 與 `START-HERE` 重複起始步驟，與 `STUDENT-AGENTS` 重複安全／授權，與 `PREVIEW-BOOTSTRAP` 重複部署安全。但它是**跨 AI 接手文件**，不是專案級 SSOT | 保留交接程序，將重複章節改為連結；**注意 PR #61 修改本檔**，不能在 #67 基於舊版覆寫 |
| `docs/student-three-quality-gates.md` | 三種程序型 QA Skills：內容準備度、導航樹測試、正式上線健康檢查；包含 PR31–34 當時的整合資訊、回報格式與總控提示詞 | 與 `AGENTS.md` Skill 路由、七關第 03/06/07 關相交，但三道檢查**不是完整七關**，不應刪除或當成自動 PASS | 保留為學員使用說明，SSOT 僅連至 QA 任務及證據 |
| `docs/workshop/PR56-USER-JOURNEY-QA.md` | PR56 首頁→Prepare→Layouts→Starter→Guide 資訊流、三份 ZIP/JSON 用途、訪談與 Logo 交接、當時待做清單 | 與七關第 01–04 關高度相交；此文件寫「Logo AI 生圖後 → Starter 02 上傳」，而當時 Starter 流程區分第 02 步品牌視覺、第 04 步訪談，須用真實 UI 檢核是否已移動欄位。未打勾項目不可認定現在仍 FAIL 或 PASS | **保留為 PR56 時點驗收證據**；有效路徑應更新到新的學員端到端矩陣 |
| `docs/student-journey/ACCEPTANCE-SSOT.md`（#67 分支） | 三條建站入口、學員七關、UX/功能兩層、實測日期/工具/Repo/SHA/URL/截圖、PR A/B/C 分工 | 明顯重用 QUALITY-CONTRACT 狀態／PR59 部署人審查及 PR56 動線；文件內寫「本輪唯一」，但並未真正收納其他歷史驗收清單 | **暫保留作候選整合草稿**；日後把七關放入專案級唯一入口，舊路徑做導向，不要同時維持兩份「唯一」 |

### Batch 01 核心差異，不應誤刪
1. **不同真相層級**：QUALITY-CONTRACT 是「PASS 怎麼定義」，DEFECT-REGISTER 是「過去發現何種缺陷」，PR59 是「誰在何個真實學員環境驗收」，七關是「新手從進站到上線是否接續順利」。可以由一個索引統整，但不能粗暴視為四份完全重複。
2. **實際文件版本落差**：README 的 12 Layout 與 student pack 的 25 Layout 不能同時作最新總數；先查 Registry 再更正文案。
3. **PR56 步驟文字不是當前 UI 證據**：先查 Starter 第 02、04 步的真實欄位，避免重新放錯 Logo 上傳位置。
4. **PR61 編輯衝突**：main `AGENT-HANDOFF.md` 尚未包含 #61 的全部 SSOT 分層文字；#67 不能直接把舊版覆寫回去。

## Batch 02｜學員 AI 建站資料包與專案脈絡（已讀原文）

| 檔名（main） | 內容實際涵蓋 | 交疊／具體差異 | 建議職責與處置 |
| --- | --- | --- | --- |
| `docs/student-builder-pack/START-HERE.md` | 三條入口（A 授權網站復刻、B Starter JSON/Exporter、C AI 訪談直接建站）；B 的 ZIP＋Site Brief＋唯一起始提示詞；AI 讀取順序、工具能力自查 | 同 `THREE-WAYS-TO-BUILD`、`AGENT-HANDOFF`、`STUDENT-AGENTS` 路由重疊；但本檔明確說 `AGENT-HANDOFF` 僅接手時閱讀，不是每次開局必經 | **保留作學員 ZIP 唯一入門**；減少和技術規格互相重複，引用路由及 Skills |
| `docs/student-builder-pack/STUDENT-AGENTS.md` | 匯出後學員獨立站的 AGENTS.md；狀態與工作樹安全、信任邊界、自然語言訪談、未知風險、任務分級、授權、編輯驗收、PROJECT 生命週期 | 與 `AGENTS.md` 名稱相近但**適用 Repo 不同**；與 `PORTABLE-PROJECT-CONTEXT-SPEC` 大幅重複 AGENTS/PROJECT 分工及核准權限 | **保留作學員站操作權威**；技術需求文件引用它，勿為了減檔合併到老師 AGENTS |
| `docs/student-builder-pack/PROJECT-TEMPLATE.md` | 在學員網站生成 `PROJECT.md` 的模板：受眾、品牌、Layout、內容、來源、實際環境、理解狀態、長期決策表、階段與維護 | 和 `PORTABLE-PROJECT-CONTEXT-SPEC` 的 PROJECT 職責交疊，但模板是可複製實例；其網站狀態不得優先於 source/config/Git | **保留模板**。同名 PROJECT 是**每位學員自己的站**，不要拿它當 ATP 母專案 SSOT |
| `docs/student-builder-pack/PORTABLE-PROJECT-CONTEXT-SPEC.md` | Draft 工程契約：學生站的 AGENTS／PROJECT／source 分工、初次到持續維護、任務路由、權限邊界、交付驗收、整合目標 | 與 `STUDENT-AGENTS` 具規範性重疊；和 `PROJECT-TEMPLATE` 重複欄位理念，但不是給初學者直接操作的第一入口 | **保留為設計契約或標記已落地狀態**；待對照已匯出模板／測試，決定哪些規則已由實際碼取代 |
| `docs/student-builder-pack/PREVIEW-BOOTSTRAP.md` | 學生 Repo 的 read-only PR CI、GitHub Pages 無內建 PR Preview、Cloudflare Pages 首次 Save and Deploy、測試版公開性、真正部署 SHA 證據 | 與 `AGENT-HANDOFF`、`astro-pr-preview`、`astro-starter-deploy` 高度重複；這是部署教學細節，不是另外的進度 SSOT | **保留作部署路線教學**，後續比對兩個 Deploy Skills，再選一個權威規則入口，其他作逐步教學 |
| `docs/student-builder-pack/THREE-WAYS-TO-BUILD.md` | A 復刻、B Starter、C 自然語言建站的選擇表；主要 Skill、JSON 非全路線必經、架構邊界與 Preview 原則 | `START-HERE` 和 Workshop Guide 另重述三條路線；`THREE-WAYS` 更適合作「路線定義表」，`START-HERE` 是「實際操作次序」 | **保留路線規格，讓其他入口引用或共享資料來源**，避免三處不同版本 |
| `docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md` | 初學者七階段：需求訪談→規劃→設計→建置→預覽修改→發布→維護；角色、真實 Preview 與 Production、不虛報、從頭到尾由同一 AI 夥伴接續 | 與七關驗收**不是同一套七件事**：這份描述 AI 與人的學習旅程，#67 描述測試關卡；例如 #67 把「草稿保存」獨立成關卡。與 `START-HERE` 的三路線為不同維度 | **保留為課程與學員體驗目標**，七關驗收應明確映射此七階段，而非取代教學旅程 |

### Batch 02 核心差異
1. 有兩層 `AGENTS.md`：老師研究 Repo 的 AI 守則、學生生成網站自己的 AI 守則；不可錯誤「去重」。
2. 有兩種 `PROJECT.md` 概念：可能建立的 ATP 專案級管理入口 vs. 每位學生站點的決策紀錄。**建議 ATP 用 `PROJECT-SSOT.md`（待建立），學員維持 `PROJECT.md`**，清楚區分。
3. `START-HERE` 是文件入口，`THREE-WAYS` 是路線定義，`PORTABLE-...-SPEC` 是工程契約，`PREVIEW-BOOTSTRAP` 是操作說明；不應全改成 SSOT。
4. `AGENT-HANDOFF` 應只給接手，不能變成所有新生都要先讀的第四份手冊。

## 本輪已核對來源版本（Blob SHA）

| 批次 | 檔名 | 已讀來源 Blob SHA |
| --- | --- | --- |
| 01 | `AGENTS.md` | `fc4678117367b93ec179f5b3f6455ba5cffb768f` |
| 01 | `README.md` | `6a3606f3423c99bf857cd785c54008944d52edfa` |
| 01 | `docs/quality/QUALITY-CONTRACT.md` | `a93641ed257d4f1a3855acd6081c88f3f1366031` |
| 01 | `docs/quality/DEFECT-REGISTER.md` | `6e50d8ef1ef51af017f7d8384aa8fb164800167c` |
| 01 | `docs/quality/BETA-CANDIDATE-SCOPE.md` | `bd48a96da49937bfab1fe514fd43e3ae338ebe31` |
| 01 | `docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md` | `62e7406a9fb784c6d6b192982eb5b83911f359d7` |
| 01 | `docs/student-builder-pack/AGENT-HANDOFF.md` | `5005e7599a211906f63b002daf93b9ce5651fa46` |
| 01 | `docs/student-three-quality-gates.md` | `6a7a4eacaf8fd5af65cb286c7c6c694f8f46e116` |
| 01 | `docs/workshop/PR56-USER-JOURNEY-QA.md` | `67f691c0578ec123735cc8d2c345248c478d0694` |
| 01 | `docs/student-journey/ACCEPTANCE-SSOT.md` (PR #67) | `97f036e25c7a625063b09debd6a6b0161b41c151` |
| 02 | `docs/student-builder-pack/START-HERE.md` | `bcd508e4901701a6b6ae55ce19ba63b6e2c47a8a` |
| 02 | `docs/student-builder-pack/STUDENT-AGENTS.md` | `e771e2b5177f40ba0b376d2ab86fa2945cfe51a9` |
| 02 | `docs/student-builder-pack/PROJECT-TEMPLATE.md` | `84706560890654922fa671c2749c5b9bd48d5889` |
| 02 | `docs/student-builder-pack/PORTABLE-PROJECT-CONTEXT-SPEC.md` | `f3083e04248f3c92dd4d4f15729d90f098d99168` |
| 02 | `docs/student-builder-pack/PREVIEW-BOOTSTRAP.md` | `a5dba72bf9a0779bacc4a3f21328060803e6a290` |
| 02 | `docs/student-builder-pack/THREE-WAYS-TO-BUILD.md` | `9154d8bdf9bc13acda894543c12c9c8639e98d66` |
| 02 | `docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md` | `06d50e4464d4be87cfb942ad929918c8e5d8002d` |

## 待使用者核准的整理方向（未實行）
- 將 ATP 專案目標、有效決策、現階段 PR、學員驗收關卡、品質規則連結集中成一個管理入口；單一入口管理，並非合併所有技術手冊。
- 針對真正重複的**規範**確定權威來源後，其他文件改指向；歷史 PR 證據保留。
- 先釐清 PR #61 是否需先合併／重基準；不修改該 PR 負責的檔案。

## Batch 03｜Builder Pack 其餘十份操作／技術文件（已讀原文）

| 檔名（main） | 文件實際內容 | 內容重疊／待查風險 | 建議職責 |
| --- | --- | --- | --- |
| `docs/student-builder-pack/README.md` | 完整學員 ZIP 包說明、Starter JSON＋Guide ZIP＋官方 Prompt、25 Layout in-progress、包版本、媒體與 Preview 安全 | 和 `START-HERE` 重複 B 路線操作；此文把必備流程寫為 Starter JSON，未同時說明 A 復刻／C 直接 AI 建站可不走 JSON，應標記為 **B 路線專用** 而非全部學員必經 | 保留 ZIP 人類導讀，實際 AI 讀取以 START-HERE 分流 |
| `docs/student-builder-pack/START-BUILD-PROMPT.txt` | 單一正式 B 路線建站提示詞：上傳 Site Brief＋ZIP、讀 START-HERE、確認能力與帳號，Build/PR/Preview、未授權不 Merge | 與 `START-HERE` 的 AI 工作內容重複，合理：前者是**學員可複製輸入**，後者是 AI 操作入口；C／A 不該被此 Prompt 強迫產 JSON | **保留單一可複製 Prompt**，網頁／ZIP 應引用這個檔案 |
| `docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md` | PR50 Claude/Gemini/Codex 隔離情境、模型第一次接手、UX-S/M/H 安全案例、打分與記錄 schema、PR46 整合條件 | 和七關驗收的「工具可否操作」、「學員容易理解」交疊，但更細到模型／策略行為；該表是**測試設計，不是已實測證明** | 保留實驗規格／歷史測試證據，七關驗收引用對應 Case |
| `docs/student-builder-pack/INTERVIEW-EVALUATION.md` | PR50 16 組訪談案例、五項 0–2 分評分、模型／工具／評審證據、建議門檻與安全錯誤 | 同 CROSS-MODEL 的採證方法交疊，但測量的焦點是「需求訪談品質」而非整個生成站流程；不能由 schema 測試宣稱真人品質 PASS | 保留訪談評估規格；明列需真實對話結果 |
| `docs/student-builder-pack/ART-DIRECTION-STARTER.md` | subject-atlas／practice-compass 專用 exporter 與需補資料方式，強調未 Ready、命令與圖片限制 | 文件仍稱 Gallery／主規劃器接線是後續工作，和較新的 `EXPANDED-LAYOUTS.md` 已描述整合主匯出器有**歷史階段差異**；不能直接拿此舊說明給當前學生 | **優先確認新主流程後** 標明為過時專用路線或歷史使用說明，不能同時維持衝突的「最新」操作 |
| `docs/student-builder-pack/EXPANDED-LAYOUTS.md` | PR46 12＋13 配接契約，engine/Renderer、native Page、Article/Service/FAQ/Media、需自有真實資料、不得把 in-progress 宣稱 Ready | 和 ART-DIRECTION-STARTER 的雙 Adapter 範圍有交疊；和 `OWNED-MEDIA`、`SECTION-PATTERNS` 存在引用關係，非無目的重複 | 保留目前的擴充技術契約，驗證 registry／實作後再指定權威版本 |
| `docs/student-builder-pack/SECTION-PATTERNS.md` | 新十三款 Pattern 適用範圍、`targetPage` 為導航 ID、`after-intro`/ `page-end` 插槽、featured-work/trust-service-path 資料契約 | 與 EXPANDED-LAYOUTS 只重複入口與 in-progress 警示；具體插槽、驗證與內容契約應獨立，不屬 SSOT 進度 | 保留技術 API 詳規 |
| `docs/student-builder-pack/MEDIA-REPLACEMENT.md` | 遠端 Manus 圖片／音訊版權風險、資產盤點、Demo 占位、圖音可用性與授權檢查 | 和 OWNED-MEDIA 都講自有圖片，但前者是**外來展示素材的權利與替換 QA**，後者是**欄位與版面呈現**；不應誤刪 | 保留來源風險檢查與媒體替換作業 |
| `docs/student-builder-pack/OWNED-MEDIA.md` | 新十三款 `brand.logoPath/heroImagePath/assets`、圖片裁切與位置、各 Layout 圖片角色、`layoutContent.headings` | 跟 MEDIA-REPLACEMENT 互補；目前學員 Starter 允許圖片上傳，但文件主要給 AI／Exporter 看，不應額外把檔案路徑變成學員必填欄位 | 保留技術欄位契約，學員 UI 應維持選填上傳 |
| `docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md` | PR50 在 PR46 之後合併驗收、兩種 Exporter 的 PROJECT/AGENTS 檔案一致性、25 Layout、測試案例 | **歷史 PR 條件**，開頭以「PR46 若未合併則 BLOCKED」為前提；不能直接沿用它判定 2026-10-22 的開發進度。應核對實際 merge SHA 與 code 後轉歷史資料 | 保留 PR50/46 驗收來龍去脈，避免作為新 PR 阻塞規則 |

### Batch 03 實質差異
1. **三條路線 vs. B 路線包**：`THREE-WAYS` 與 `START-HERE` 均允許 A/C 不需要 Site Brief；`student-builder-pack/README` 與 `START-BUILD-PROMPT` 卻以 B 路線為主。這是適用範圍差異，不是要求把 A/C 強制收斂成先下載 JSON。
2. **老文件的當下時態**：`ART-DIRECTION-STARTER` 的「Gallery／主要規劃器接線尚未做」和 `EXPANDED-LAYOUTS` 的「已由主匯出器接線」需要實作查核，不應僅改寫成任一方為對。
3. **媒體兩份文件不是重複**：授權替換流程 vs. 可設定的 Layout 圖片角色，需要各自保留。
4. **工程規格與管理 SSOT 分層**：SECTION-PATTERNS、EXPANDED-LAYOUTS 是契約，PR50-PR46 gate 是特定 PR 的歷史驗收，不該與專案狀態共編一份。

### Batch 03 原文版本

| 路徑（皆 main） | 已讀 Blob SHA |
| --- | --- |
| `docs/student-builder-pack/README.md` | `7e8e676951c7104af42b76a11e9113ccf9ecc30b` |
| `docs/student-builder-pack/START-BUILD-PROMPT.txt` | `72766d4280a141d50af660d3c55a88ab8796cb4f` |
| `docs/student-builder-pack/CROSS-MODEL-E2E-TEST-PACK.md` | `d95a1fb86e9db724ad3d21fc4a9a5f03e2863da9` |
| `docs/student-builder-pack/INTERVIEW-EVALUATION.md` | `1067b605a73632df9cd6baaa51b9378bb318196d` |
| `docs/student-builder-pack/ART-DIRECTION-STARTER.md` | `0b0b3870098f56dcaefc6d486ec789364b0b5ef1` |
| `docs/student-builder-pack/EXPANDED-LAYOUTS.md` | `8fe4c3ea3ed6b3523d868056ef570391eb4fe09a` |
| `docs/student-builder-pack/SECTION-PATTERNS.md` | `7fb9d7457cbf054675fb62e29f20f45fcd2d6820` |
| `docs/student-builder-pack/MEDIA-REPLACEMENT.md` | `5b5d9f200801e88235465701339c515189f11bef` |
| `docs/student-builder-pack/OWNED-MEDIA.md` | `8ca0a4b51be64469d640bec52f89c0ac63695bf9` |
| `docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md` | `d63f96a0652559bdcdc04de5049d018cec8dd4c6` |

## Batch 04A｜Registry、部署、學員流程與技術驗收文件

| 路徑 | 原文標題／內容章節 | Blob SHA 前綴 |
|---|---|---|
| `COMPONENTS.md` | # Astro Blocks · V2；## 版本邊界；## 元件展示分類原則；## 元件名錄 | ef5079318581 |
| `docs/astro-skills-end-to-end-validation-v1.md` | # Astro 架站工作坊｜十套 AI Skills 端到端驗證手冊 v1.0；## 0. 驗證要回答的三個問題；## 1. 十套 Skills 與必須驗證的責任；### Skill 交接順序 | 6083f3088b56 |
| `docs/brief-handoff/README.md` | # ATP｜Design Brief → Starter 交接規則（Task 5＋6）；## 目的與邊界；## 兩者映射；## AI 接手順序 | cf5da0ffa931 |
| `docs/cloudflare-pages-deployment.md` | # Cloudflare Pages｜workshop default static deployment | e9f29e824872 |
| `docs/cloudflare-workers-static-assets.md` | # Cloudflare Workers Static Assets deployment；## Cloudflare Workers Builds (connected GitHub repository)；## Smoke checks | 562a3d73fc6d |
| `docs/github-pr-preview-setup.md` | # GitHub-only Astro PR Preview — 一次設定，後續自動預覽；## 目標；## Pipeline；## Initial setup (maintainer) | 306c75684642 |
| `docs/pr-preview-reconciliation.md` | # PR 預覽長期同步維護；## 安全界線；## 故障排查；## 驗收案例 | dff6a2e6f07b |
| `docs/pr-preview-smoke-test.md` | # PR Preview activation | 3c923c756e11 |
| `docs/student-site-building-flow-with-section-patterns.md` | # 學員架站流程｜完整建站與測試流程（2026-10-09）；## 給學員看的說明；## 發布前後要確認的事；## 外部配色資源（放在規劃器 Step 02 底部） | 0741c9aa67f6 |
| `docs/template-gallery/ACCEPTANCE-25.md` | # 25 款 Layout 縮圖盤點與驗收；## 原始資產核對；## 頁面整合；## 驗收狀態 | 822690afd1ca |
| `docs/template-gallery/README.md` | # Layout thumbnail capture；## Reproduce；# In another terminal:；# If capture created files after build, copy them before browser QA: | 01ddef8b4267 |
| `docs/quality/PROPS-URL-CONTRACT-TARGETS.md` | # QA v2.0｜Props 契約與 URL 護欄定點回歸；## 目前確認的風險；## 必要負向注入；## 證據分層 | 4acdcbf65a7e |

交疊觀察：Cloudflare Pages/Workers、GitHub PR Preview、Smoke/Reconciliation 四類文件均涉及部署，但分別處理不同平台與故障排除；必須與 astro-pr-preview / astro-starter-deploy Skills 指向同一套核准與 Preview 證據規則。ACCEPTANCE-25 是版型庫專項驗收，不能取代學員七關驗收。COMPONENTS 是元件目錄而非專案進度 SSOT。

## Batch 04B｜訪談與設計研究原文（已讀）

| 檔案 | 原文內容綱要 | Blob SHA |
|---|---|---|
| `docs/student-intake/README.md` | # 建站前 AI 訪談包｜學員使用說明；## 七份文件；## 開場語（複製到 AI）；## 真正完成的標準；## 下一步 | 0883b659f92a64d9509c1208b3863ca470d1d86a |
| `docs/student-intake/01-AI-訪談主持人.md` | # AI 角色指令｜我的建站前內容訪談主持人；## 對話規則；## 訪談階段（自然對話，不是一次貼整份表單）；### 第一階段｜找到方向；### 第二階段｜About：訪客認識你 | b14088ae85ee9bfce8a0cc691969a4c4fa2c5df2 |
| `docs/student-intake/02-網站定位與個人介紹.md` | # 我的網站｜定位與 About 準備紙；## 1. 我想做哪一種網站？；## 2. 網站名稱；## 3. 讀者與下一步；## 4. 一句話介紹（不知道就讓 AI 提案） | 2cd591bf4070d498efb63f0cccf7affa2bcb6328 |
| `docs/student-intake/03-內容準備-二選一.md` | # 我的網站｜文章或服務內容準備紙；## A｜知識／部落格（選這類才填）；### 想分享的三個主題；### 第一篇文章的素材；### 可選的第二、第三篇文章 | 09a235231055a52d87b7baea492f284a8c9d4a5f |
| `docs/student-intake/04-圖片與發布準備.md` | # 我的網站｜圖片、聯絡與公開資料準備紙；## 1. Logo 與視覺素材；## 1A. 跟 AI 一起產圖的下一步；## 2. 可以公開的外部連結；## 3. 我希望正式網站公開的資訊 | 6e99528c26a57c9ac4a40205a9937b9ce25754b7 |
| `docs/student-intake/05-AI-品牌識別與圖片共創.md` | # AI 品牌識別共創｜從網站名稱到 Logo、Favicon、替代圖片；## 角色；## 設計分五關；### 1. 品牌線索；### 2. 標誌策略 | 82c038c799b74bdebdaf6d1ddddb8ee880ddac6d |
| `docs/student-intake/06-Logo與圖片設計研究.md` | # Logo、Favicon 與 AI 網站圖片｜設計研究備忘；## 研究後的核心判斷；## 工作坊採用的交付檔；## 參考閱讀 | 2a3fde90d097d619110be123a8441b9579c5925e |
| `docs/student-builder-pack/DESIGN-CONSULTATION-PROMPT.txt` | 我已提供 ATP AI 建站資料包。這次先不要建站，請讀取包內 AGENTS.md、.ai/astro-design-consultation/SKILL.md 與其必要 refe | 8b2887ba4c236bf7aeab03f3ba8c52caa9b6af6b |
| `docs/student-builder-pack/UPSTREAM-SOURCES.md` | # 學員離線資料包的內容與界線；## 這份 ZIP 已經包含的資料；## 獨立使用方式；## 尚需學員決定或配置的事項 | 53acadfa6cc6d61ea8504aa9bc55076a057ab20d |
| `docs/design-research/P0-AI-DESIGN-JUDGMENT-2026-10-14.md` | # ATP P0｜AI 設計能力外部研究與共用設計判斷規則；## 1. 研究目標與邊界；## 2. 外部來源逐項拆解；## 3. 額外挖掘：這批研究帶給 ATP 六個新機制；## 4. P0 共用設計判斷規則（可供現有 Skills 引用） | b319cfc9655058e154f3044d3a23da77b02ecb37 |
| `docs/research-gap-matrix-v2-5.md` | # 跨 AI 研究 × Astro 35 元件缺口矩陣；## 1. 範圍與資料可信度；## 2. 已有 35 個元件：能力與缺口（不能只看名稱）；## 3. 缺口優先級：研究交叉證據 × 教學價值；## 4. 建議 V2.5 實作範圍（**10 組核心能力、分批實作**） | a88ed8599e1e516e03b8b3227512f54ed190577d |
| `docs/manus-component-gap-v2-5-part2.md` | # Manus Component Kit × 現有 Astro 元件庫｜V2.5 第二批決策矩陣；## 1. 對照原則；## 2. 全部 44 個 Manus 元件分類（依 ZIP 原始檔案核對）；### A. 共用 11 個；### B. 知識／部落格 19 個 | 3988c1060b9beb8ab34628224ae2a2359f6be04a |

比較：student-intake 七份是提供給學員／訪談 AI 的連續使用資料，並非七份專案 SSOT；其中 Logo／品牌訪談屬選填，不應藉文件整合新增前置硬性欄位。Design Consultation Prompt 與正式 Start Build Prompt 處於不同階段；研究缺口與 Manus Gap 屬來源研究／歷史判斷，不是即時程式實作狀態。

## Batch 04C｜Layout 契約與 PR46 歷史驗收（已讀）

| 路徑 | 原文章節 | Blob SHA |
|---|---|---|
| `docs/layout/CONTENT-INPUTS-THREE-LAYOUTS.md` | # Starter content inputs: Reading Atlas, Radio Letter, Trust Path；## Reading Atlas (reading-atlas)；## Radio Letter (radio-letter)；## Trust Path (trust-path)；## Acceptance | c0a273de67417e3b319700db3667e220304ef9f3 |
| `docs/layout/LAYOUT-DEFINITION-CONTRACT-v1.md` | # Layout Definition Contract v1 — Visual Template → Independent Astro Starter；## 1. Identity and lifecycle；## 2. Visual assets controlled by this repository；## 3. Structural definition: never Theme-as-Layout；## 4. Adapter and generated-site interface | 6ea68d39144dd245f8b79898302f95406153b721 |
| `docs/layout/PR46-ACCEPTANCE-2026-10-15.md` | # PR #46｜2026-10-15 實際驗收；## 本輪發現與修正；## 十二款逐款視覺紀錄；## 自動化與交付；## 驗收界線 | 7c5ea1f72b8184deef1998f1373fcac962e898ee |
| `docs/layout/PR46-HANDOFF.md` | # PR #46 接手／驗收記錄；## 目前有效範圍；## 本輪完成的程式；## 重要回歸：舊「576 張全綠」不能視為全部通過；## 四尺寸證據與其界線 | 9f9f43a68182187a2a2ac6ce9ab660005cc8a80c |
| `docs/layout/PR46-OWNED-MEDIA-2026-10-15.md` | # PR46｜新增十三款的自有圖片、Logo 與段落標題；## 本輪實作；## 圖片位置契約；## 驗證與證據方式；## 狀態界線 | e13ee9786f5f4c7def199f525ba01ab8ec6c4deb |
| `docs/layout/PR46-PR47-INTEGRATION-HANDOFF.md` | # PR46｜main 整合與 25 款正式 Starter 接手；## 2026-10-15 自有媒體與可編輯標題（目前入口）；## 前輪：恢復執行後的有效入口；## 歷史：執行環境中斷交接；## 已完成的三批實作 | 54d7d0ca37419b2581c9880af4fade869e283bb2 |
| `docs/layout/PR46-RESUMED-QA-2026-10-15.md` | # PR46｜恢復執行後的 CTA 與品牌驗收；## 承接位置與實際修正；## 這一版的證據；## 交付狀態與剩餘 Gate | 956657575e76263fb35d31f681ee7cfe6b9a7461 |
| `docs/layout/PR46-SECTION-PATTERNS-2026-10-15.md` | # PR46｜新增十三款非頁腳 Section Patterns；## 組裝結果；## 資料與失敗方式；## 驗證範圍與界線；## 截圖目視後的修正 | ac92e15f2d251c822a6668673b66bfc5782d192e |
| `docs/layout/TWELVE-ASSEMBLY-READINESS.md` | # Twelve layout assembly status (PR #46) | a2bd66fff5c701a58bd9b72179d3501835617763 |

比較判斷：LAYOUT-DEFINITION-CONTRACT 是現行架構契約候選，CONTENT-INPUTS 是內容欄位契約；PR46 具日期之 Acceptance、QA、Media、Section、Handoff 屬時點工作證據，必須對照最新 definitions/Exporter 以判定是否仍適用；TWELVE-ASSEMBLY-READINESS 的十二款不能拿來代表 25 款整體驗收。

## Batch 04D｜Art Direction PR47 文檔與 Fixtures（已讀）

| 路徑 | 原文章節／Fixture 內容起點 | Blob SHA |
|---|---|---|
| `docs/art-direction/09-2-differentiation-audit.md` | # 09.2 Art Direction differentiation audit and parallel handoff；## Twelve-layout structure comparison；## Priority differentiation decisions [INF/NEW]；## Original extensions in this commit [NEW] | 1f46ff8eff7abcbc03b16687b09cb82e3831346d |
| `docs/art-direction/INDEPENDENT-ADAPTERS.md` | # Subject Atlas／Practice Compass：獨立組裝與本輪邊界；## 已實作的入口；## 自有構圖與多頁內容；## Site Brief v1 的 additive 欄位 | 9b9bd564019f05428ed102cee26fd3159c1651f7 |
| `docs/art-direction/PR47-BATCH-A-VISUAL-REVIEW.md` | # PR #47｜人工驗收批次 A：五組高相似結構（第一輪）；## 正式入口；## 審查方法與界線；## 實際發現與修正 | 40f3be2ba461076e0ab273c5ac70d9ad9c7e5589 |
| `docs/art-direction/PR47-BATCH-BC-REVIEW.md` | # PR #47｜批次 B＋C 設計驗收／收斂報告；## 最新證據；## Batch B｜11 款成套多頁；## Batch C｜25 款整體 Art Direction | 775ced303039f4afbdcd9c06673264d8ccc33e88 |
| `docs/art-direction/PR47-CONTENT-CONTRACT-11.md` | # PR #47｜第一階段：11 款 Layout 的可編輯內容契約；## 單一可編輯資料來源；### Knowledge：6 款；### Helper：5 款 | c9fdd062cbcb4b9b5e28fef5991d025f4488f6be |
| `docs/art-direction/PR47-EXPANSION-MATRIX.md` | # PR #47｜25 款 Art Direction 擴充矩陣；## 數量邊界；## 原有 12 與研究方向；## 批次與每款交付規格 | 9e32965a4c1a55f11304fb716353120cdcb4315f |
| `docs/art-direction/PR47-HANDOFF.md` | # PR #47 接手入口｜09.2 Art Direction + Template Expansion；## 批次 B／C 審查更新（2026-10-14）；## 第三階段最新交付（2026-10-14）；## 第二階段更新（2026-10-14） | ea7f46b2a505f44cbd30b954bf07ba625ea51714 |
| `docs/art-direction/PR47-MANUAL-QA-CHECKLIST.md` | # PR #47｜人工 QA 驗收清單與合併保留項目；## A. 全站視覺設計（25 款首頁）；## B. 11 款新增多頁原型；## C. 助人者網站特有的內容真實性 | 7570a1c1c0ea8b62fe26c64c77c28e49454664f7 |
| `docs/art-direction/PR47-P0-NEUTRAL-AUDIT.md` | # PR47 P0｜25 方向中性內容與結構差異稽核（source-only）；## A｜知識與內容：13 款；## B｜助人者與個人服務：12 款；## 需整改的結構碰撞（以優先順序排列） | bbed6617dc60de634d5d2f99b3e77b70b6071ba0 |
| `docs/art-direction/PR47-P0-VERIFICATION-2026-10-14.md` | # PR #47｜P0 中性版型視覺與獨立 Adapter 驗證（2026-10-14）；## 可重現證據；## 實際截圖的五組定點人工檢視；## 獨立 Adapter 真實測試 | 1419617bba0e94eb5feded51f5f8843478dc2e66 |
| `docs/art-direction/PR47-PHASE2-INTERIOR-QA.md` | # PR47 第二階段｜內頁四尺寸 QA 第一輪；## 實際執行證據；## 第一輪人工圖面抽查；## 本輪完成 / 尚待 | a4dc84270c20c092a378db8a789e348ef39d8fe4 |
| `docs/art-direction/PR47-PHASE3-HANDOFF.md` | # PR #47 第三階段｜25 Layout Definition 與 PR #46 交接；## 單一可機器讀取的交付清單；## 給 PR46 實作的契約交接；## 驗收證據（現有，不得外推） | 3b7a2a37bfae483a9ef9d37b2ceb6d699aeb87c3 |
| `docs/art-direction/fixtures/content/articles/legacy-draft.md` | ---
title: '不得公開的舊格式測試稿'
description: 'QA 草稿。'
publishedAt: 2026-10-14 | f4e968a3737ae4cff9065b7e5d6cbf9da9880c6d |
| `docs/art-direction/fixtures/content/articles/real-note.md` | ## 文章正文 | 8d4fa1d0041040e8f0e2222e9ef2828ff914d03c |
| `docs/art-direction/fixtures/content/drafts/private-note.md` | ---
title: '未公開資料夾測試稿'
description: 'QA 未公開稿。'
publishedAt: 2026-10-14 | 04fcb316816dbc79b65fc4ddd875ad69c57c6956 |

比較判斷：EXPANSION-MATRIX／CONTENT-CONTRACT／INDEPENDENT-ADAPTERS 是設計與實作契約；PR47 各階段 Visual Review、P0、Manual QA、Handoff 都有歷史分支／日期語境，應保留原始證據而非聲稱現在仍 Draft；fixtures 下的 Markdown 是用於測試文章與草稿公開性，**不是文件 SSOT，也不能清掉**。對 25 款的現行狀態須以 registry + 最新 PR／Actions 為準。

## Batch 05A｜Skill 主文件 1/2（已讀）

| 檔名 | 內容章節 | Blob SHA |
|---|---|---|
| `.ai/astro-content-publishing/SKILL.md` | # Astro Content Publishing；## Mission and boundaries；## Source of truth and mandatory reading；## Public vs draft source folders (student Starter) | 6dc13d9e2bc4d1e4dabf16e8d012ea04787e7298 |
| `.ai/astro-content-readiness/SKILL.md` | # Astro Content Readiness｜內容準備度檢查；## When to run；## Read sources of truth；## Procedure | f7a3b255189adb996fed03099896cababc1ec208 |
| `.ai/astro-design-consultation/SKILL.md` | # Astro Design Consultation｜網站設計對話顧問；## 使命與適用對象；## 何時啟動；## 使用前閱讀（按需；不要一次全讀） | a9e8de73f26b72499f1372b605a348665e41fa08 |
| `.ai/astro-editorial-layout-design/SKILL.md` | # Astro Editorial Layout Design；## 0. 證據標記（讀任何檔案前先懂）；## 1. 硬規則（違反＝退回）；## 2. 工作流程（詳見 `references/04-workflow.md`） | c14edf53f2f69d47d2465e3b30bd159c759a8279 |
| `.ai/astro-launch-health-check/SKILL.md` | # Astro Launch Health Check｜發布後健康檢查；## When to run；## Preconditions；## Verification checklist | 074060c27edae6ff2e3a5444bf241c8913f4d9b4 |
| `.ai/astro-layout-craft/SKILL.md` | # Astro Layout Craft｜版型設計與組裝 Skill；## 定位；## 來源與誠實標註；## 必須遵循的組裝步驟 | 2c148dd24e89a38d0c6026c1f8cb12c257a54bb9 |
| `.ai/astro-motion-craft/SKILL.md` | # Astro Motion Craft — 動效與微互動設計 Skill；## 必讀：特效參考庫（不是只有一份 Skill 文件）；## 何時使用；## 步驟（必須依序） | 39ed33b76ccbd67abf2032f9c655165cf6dfbdf9 |
| `.ai/astro-navigation-tree-test/SKILL.md` | # Astro Navigation Tree Test｜導航可理解性測試；## When to run；## Distinguish two evaluations；## Procedure | 64c4597eb034fcaac226e9bd18a188683b311ea5 |
| `.ai/astro-page-management/SKILL.md` | # Astro Page Management｜既有網站的頁面管理；## 適用時機；## 核心原則：一個導航來源，整站一致；## 工作流程 A｜新增頁面 | 64878b45861ab912d917e20d4bc8be92bb64adc8 |
| `.ai/astro-pr-preview/SKILL.md` | # Astro PR Preview & Safe Release｜學員雙平台預覽與安全發布；## 目的；## Step 0｜先辨識環境，不能猜；## 共同安全流程（兩平台皆適用） | 411c091674981f0f600b4154df085ad3cb9d8ca7 |

## Batch 05B｜Skill 主文件 2/2（已讀）

| 檔名 | 內容章節 | Blob SHA |
|---|---|---|
| `.ai/astro-section-pattern-craft/SKILL.md` | # Astro Section Pattern Craft｜區段組合樣板；## 入口與定位；## 選擇流程；## V1 模式 | 4ca56d61367ee68f7efaefad5b11ec5af0a0d1d3 |
| `.ai/astro-site-assembly/SKILL.md` | # Astro Site Assembly｜把學員規劃變成獨立網站；## Role；## Inputs；## Generator — phase 1 | d7d78ef65952a00ca5704153b672830e4d28386e |
| `.ai/astro-site-entry/SKILL.md` | # ATP 建站總入口｜三條路，單一維護護欄；## 先判斷需求，不先叫學員填表；## 主打客群與能力界線；## 三條路共用的交付基礎 | b141f9c57e7810a9d4b39d161ec96973504e84db |
| `.ai/astro-site-from-zero/SKILL.md` | # Astro Site from Zero｜直接對話建站；## 模式先行；## 學員對話流程；## 定位 | 8224afcff166a8864326f2eff33cd8f718706eee |
| `.ai/astro-site-maintenance/SKILL.md` | # Astro Site Maintenance｜更新、備份與復原；## 用途；## 重要觀念；## 工作流程 A｜日常安全更新 | e10010c421b143a26bd5d48f9ad4e2eee90159ab |
| `.ai/astro-starter-deploy/SKILL.md` | # Astro Starter Deploy｜獨立網站部署；## 目的與界線；## 開始前必讀；## A｜GitHub Pages（學員可選） | 0354681c6c6217310d5d858d3bddbdffe3911f49 |
| `.ai/astro-starter-onboarding/SKILL.md` | # Astro Starter Onboarding；## Trigger；## Beginner workflow；## 下一步：匯出獨立 Starter | 54dad8192d899b42b3e495280e916838fe0ebdd6 |
| `.ai/astro-ui-craft/SKILL.md` | # Astro UI Craft；## Core model；## Scope guardrail；## Evidence hierarchy | 70ceabb3ad04551d544133854667e7df7bbf659f |
| `.ai/url-to-frontend-replica/SKILL.md` | # URL-to-Frontend Replica｜既有網站的授權前端重建；## 0. 先辨識權利與環境；## 1. 發現完整頁面與範圍；## 2. 觀察設計、內容、素材與互動 | 858bc69db2ba46d3074a2e10d9f9d8390f668b3b |

Skill 交疊判斷：`astro-pr-preview` 管 PR／Preview／人為 Merge gate，`astro-starter-deploy` 管首次平台設定，`astro-launch-health-check` 管 Production 上線後健康檢查；這是三個時間點，不能因為都出現部署而合成巨型 Skill。`astro-site-entry` 選 A/B/C 路線；`astro-starter-onboarding` 規劃輸入；`astro-site-assembly` 組裝；`astro-site-from-zero` 直接訪談組站；`astro-site-maintenance` 管既有站變更與復原。Layout、Editorial、UI、Motion、Section Pattern 同理保持專職，重複的共通安全規則由上位 AGENTS 與有效 Skill 引用。
