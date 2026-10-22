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
