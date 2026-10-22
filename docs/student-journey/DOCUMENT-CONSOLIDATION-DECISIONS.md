# ATP 文件治理｜整併決策表（提案）

> 2026-10-22；基於 [192 份文件原文盤點](DOCUMENT-COMPARISON-REGISTER.md)。**此為決策提案，不是已完成整併**。不得刪掉歷史證據、原始研究、測試 fixture 或學員網站必要檔案。本 PR 不進行 Merge 或 Production 部署。

## 一、治理方式

**單一專案管理入口，非單一巨大文件。** 建議建立根目錄 `PROJECT-SSOT.md`，只存 ATP 母專案當前產品邊界、決策、責任分工、驗收矩陣、未解阻礙，以及指向真實 GitHub PR／Commit／CI／部署的連結。不要在多份文件重複寫「目前 25 款已 Ready」等易過期敘述。

「權威來源」依資訊種類唯一指定：

| 資訊 | 權威來源 | PROJECT-SSOT 的角色 |
| --- | --- | --- |
| 需求、受眾、產品邊界、已核准決策 | 新 `PROJECT-SSOT.md` | 保存現行決策／變更來源 |
| 程式已做什麼／版型與元件數／網站路由 | GitHub 當前程式及 registry（`src/data/layout-assembly/definitions.mjs`、`src/data/blocks.registry.json` 等） | 僅連來源和核對日期，數字必須重新查 |
| PR／Build／Preview／Production | PR/Commit、GitHub Actions、託管平台真實部署紀錄 | 狀態與證據索引；不能宣稱文字更新即完成 |
| PASS/FAIL/BLOCKED 定義 | `docs/quality/QUALITY-CONTRACT.md` | 參照，不複製一套狀態定義 |
| 缺陷 ID 與修復追蹤 | `docs/quality/DEFECT-REGISTER.md` | 顯示未結阻礙與鏈結 |
| 七關學員旅程及驗收 | 將 #67 `docs/student-journey/ACCEPTANCE-SSOT.md` **規範部分**整合至 `PROJECT-SSOT.md`（待核准） | 主表；測試原始證據仍保留 |
| 學員可複製的建站指令 | `docs/student-builder-pack/START-BUILD-PROMPT.txt` | 只連結 |
| 人工發布授權提示詞 | #69 `docs/student-builder-pack/RELEASE-APPROVAL-PROMPT.md`（尚未入 main） | 只連結；提示詞本身不是授權 |
| AI 操作規則 | ATP `AGENTS.md`、學員輸出 `STUDENT-AGENTS.md`，依 Repo 分工 | 指明用途，不混用 |
| 設計／部署／內容的操作技術 | 各專職 `.ai/*/SKILL.md` 與其 references | 連結技能路由 |
| 每位學員網站自己的長期決策 | 匯出專案自己的 `PROJECT.md`（模板為 `PROJECT-TEMPLATE.md`） | 僅說明此分界；不收學員個資 |

## 二、逐群決策表（先建議，不執行刪移）

| 群組／文件 | 決策 | 實際變更提案 | 先決條件／注意 |
| --- | --- | --- | --- |
| `README.md` | **保留＋縮減重複現況** | 保留介紹、展示站與學員站區別、主要入口；舊 PR 歷史與版本數字改鏈至 Registry／SSOT | 先驗證最新 main，修正「12」與「25」混用 |
| ATP `AGENTS.md` | **保留＋路由** | 維持研究 Repo 操作規則；開頭指向專案 SSOT 與專職 Skill；歷史 PR 描述僅標註舊背景 | 不可覆蓋學員 `AGENTS.md` |
| `COMPONENTS.md` | **保留契約** | 元件目錄、用法；與 Registry 不一致先修對照，不複寫即時元件數進 SSOT | 以程式目錄／registry 查證 |
| `docs/quality/QUALITY-CONTRACT.md` | **保留規範權威** | 所有驗收表引用既有 PASS/FAIL/NOTICE/NOT TESTED/BLOCKED | 不因採用七關而消失 |
| `docs/quality/DEFECT-REGISTER.md` | **保留活的問題台帳** | 每個缺陷參照 GitHub Issue/PR、影響關卡；不要因 PR 綠燈自動關閉 | 保持 ID 可追溯 |
| `docs/quality/BETA-CANDIDATE-SCOPE.md`、`docs/v0.2-collaboration.md`、`docs/v2-8-content-and-seo.md` | **標示歷史** | 加「當時快照，不代表目前開發狀態」提示，連到現行入口 | 保留決策脈絡 |
| `docs/qa/PR59-INDEPENDENT-MANUAL-SSOT.md` | **保留歷史驗收，映射到現行主表** | EXT-01～06／HUMAN-01～06 列對應七關；不刪證據與原 ID | 尚未執行項不得變 PASS |
| `docs/workshop/PR56-USER-JOURNEY-QA.md` | **保留歷史驗收，映射到現行主表** | 將步驟、JSON／ZIP 與訪談交接驗收要求連回新主表 | 實測 Starter Logo 上傳位置，勿憑舊文字改 UI |
| `docs/student-journey/ACCEPTANCE-SSOT.md`（#67） | **整合後改導覽／歸檔** | 將七關與 UX／功能雙層驗收移入專案 SSOT，原檔改成指向新章節的索引或保留提交歷史，不再宣稱獨立唯一 | 先核准欄位與證據記法；不要兩份同時編輯 |
| `docs/workshop/AI-BUILDING-PARTNER-JOURNEY.md` | **保留教學模型** | 七階段「需求→規劃→設計→建置→預覽→發布→維護」維持學員說明；SSOT 驗收關卡須映射而非取代它 | 兩套「七」用途不同 |
| `docs/student-three-quality-gates.md` | **保留程序指南** | 連結三項 Skill，更新舊 PR31–34 歷史註記 | 它不是七關驗收 |
| `docs/student-site-building-flow-with-section-patterns.md` | **改引用共享規範** | 保留學員語言和操作順序；重複 Layout／Pattern／QA 定義改連 Skill／Guide | 核對真實 Guide/Starter 順序 |
| `docs/student-builder-pack/README.md` | **保留人類導讀，界定 B 路線** | 清楚說明 ZIP＋Site Brief 適用哪條路；其他路線不強制 JSON | A 復刻/C AI 從零不因整併而被移除 |
| `docs/student-builder-pack/START-HERE.md` | **保留 AI 封包唯一入口** | 三路線入口、讀取順序；技術細節引用相應 Skill，不重複數值 | 給 ZIP 內 AI 使用，與專案級 SSOT 不同 |
| `docs/student-builder-pack/THREE-WAYS-TO-BUILD.md` | **保留路線契約＋引用** | 固定 A/B/C 用途；START-HERE、Guide 不另維護互斥定義 | 維持三條路 |
| `docs/student-builder-pack/START-BUILD-PROMPT.txt` | **保留字面唯一來源** | Guide 按鈕繼續讀原文；新文案只改此檔 | 適用 Starter/B 路線 |
| `docs/student-builder-pack/DESIGN-CONSULTATION-PROMPT.txt` | **保留獨立階段** | 設計諮詢、不直接建站，不能併入正式建站指令 | 與 START-BUILD 的時機不同 |
| `docs/student-builder-pack/STUDENT-AGENTS.md` | **保留學生站操作權威** | 在匯出站根目錄生成 `AGENTS.md`；維護安全邊界與任務路由 | PR #61、#69 若觸及需先比對 |
| `docs/student-builder-pack/PROJECT-TEMPLATE.md` | **保留學員個人決策模板** | 每位學員自己的 `PROJECT.md`；不要當成 ATP 母 Repo 狀態文件 | 禁存機密／客戶資料 |
| `docs/student-builder-pack/PORTABLE-PROJECT-CONTEXT-SPEC.md` | **保留工程契約，確認落地後可標「已實作」** | 去除與 STUDENT-AGENTS 重複的現行操作指令，留下跨工具匯出規格 | 必須先比對 Exporter 測試 |
| `docs/student-builder-pack/AGENT-HANDOFF.md` | **保留接手手冊＋改引用** | 接手時才讀，重複部署與安全條款引用 STUDENT-AGENTS／部署 Skill | PR #61 正在修改：不能從 main 舊版直接覆寫 |
| `docs/student-builder-pack/PREVIEW-BOOTSTRAP.md` | **保留初次預覽操作** | 實際 GitHub Pages/Cloudflare 初設說明，通用規則引用 astro-pr-preview | PR #69 有初次部署提示，應先看差異 |
| `docs/student-builder-pack/RELEASE-APPROVAL-PROMPT.md`（#69） | **保留授權文案** | 唯一供學員明確送出的發布指令；Guide 和 ZIP 引用，不在 SSOT 複製 | 是否授權仍看該次對話的確切同意 |
| `docs/student-builder-pack/INTERVIEW-EVALUATION.md`、`CROSS-MODEL-E2E-TEST-PACK.md` | **保留專項測試** | 測試場景與實際證據存各自檔案；七關追蹤引用測試 ID | 不得把規格算作實測通過 |
| `docs/student-builder-pack/ART-DIRECTION-STARTER.md` | **核實後標示舊路線或更新** | 文件仍有「主規劃器尚未接線」語氣；核對主 Exporter、Adapter 後決定是否需保留舊用法 | 與 EXPANDED-LAYOUTS 不一致 |
| `docs/student-builder-pack/EXPANDED-LAYOUTS.md`、`SECTION-PATTERNS.md`、`OWNED-MEDIA.md` | **保留 API／內容契約** | 明確 25 Layout 與 Adapter、插槽與媒體欄位；避免再在其他文件重寫大表 | 要求驗證 definitions、Exporter、Schema |
| `docs/student-builder-pack/MEDIA-REPLACEMENT.md` | **保留媒體授權流程** | 設計原型遠端資產替換、Demo 占位與 QA | 不與 OWNED-MEDIA 合併，分工不同 |
| `docs/student-builder-pack/UPSTREAM-SOURCES.md` | **保留包來源表** | 指出實際 ZIP 包含何物，不作「已完成站點」證據 | 對照 build-student-pack.mjs |
| `docs/student-builder-pack/PR50-PR46-INTEGRATION-GATE.md` | **標示歷史 PR gate** | 保留當時待合併證據，連至現行 PR | 不要作為新的 Merge 禁令 |
| `docs/student-intake/*`（7 份） | **保留學員訪談資料** | 01–06 主題、品牌／Logo 選填與 README，不強制學員先有圖片 | 這是學員資料，不是 SSOT |
| `docs/brief-handoff/README.md` | **保留 Brief→Site Brief 契約** | Design Brief Markdown 與 Site Brief JSON 明確區分；映射至 onboarding Skill | 不新增第三種規劃格式 |
| `docs/template-gallery/README.md`、`ACCEPTANCE-25.md` | **保留版型專項驗收** | 截圖與原型／Adapter 狀態，結果核對 Registry／實際部署 | 縮圖≠25 個 Ready 站 |
| `docs/layout/LAYOUT-DEFINITION-CONTRACT-v1.md`、`CONTENT-INPUTS-THREE-LAYOUTS.md` | **保留版本化設計契約** | 技術欄位／結構，僅指向 SSOT 的方向決策 | 不能和現行程式不一致 |
| `docs/layout/PR46-*.md`、`TWELVE-ASSEMBLY-READINESS.md` | **歷史證據＋引用** | 原十二款與 PR46 的實作／QA 記錄仍可查；不是現行 25 款全部品質判定 | 不逐篇改寫原始 QA 結果 |
| `docs/art-direction/PR47-*.md`、`09-2-differentiation-audit.md` | **歷史研究＋驗收證據** | PR47 研究、25 款構圖差異、人工 QA、交接；登記當時 SHA | 未打勾人工 QA 保留 NOT TESTED |
| `docs/art-direction/INDEPENDENT-ADAPTERS.md` | **保留專項 Adapter 契約** | 和 PR46、EXPANDED-LAYOUTS 僅引用共同 Registry | 不把 Prototype 說成完整站 |
| `docs/art-direction/fixtures/**`（3 份） | **保留測試 Fixture** | 用於驗證草稿隔離與文章公開，不屬可清除文件 | 不搬到「文件封存」 |
| `docs/cloudflare-pages-deployment.md`、`docs/cloudflare-workers-static-assets.md` | **保留雙平台操作** | 新手安裝與 Workers Static Assets 分開，通用安全規則引導至 Deploy Skill | 平台最新操作仍需實測 |
| `docs/github-pr-preview-setup.md`、`pr-preview-reconciliation.md`、`pr-preview-smoke-test.md` | **保留特定基礎設施／歷史紀錄** | 僅針對老師 Repo 專用工作流，不假裝適用全部學生 Repo | 和 Cloudflare Preview 不可混淆 |
| `docs/quality/PROPS-URL-CONTRACT-TARGETS.md` | **保留回歸測試契約** | 指向缺陷與測試腳本，不用 SSOT 重寫 Props | 避免宣稱元件全覆蓋 |
| `docs/astro-skills-end-to-end-validation-v1.md` | **歷史測試手冊** | 紀錄當時 10 個 Skills 驗證方案 | 現在有 19 Skill，不能當現行全量結果 |
| `docs/design-research/*`、`research-gap-matrix*`、`manus-component-gap*` | **保留研究與歷史比較** | 不直接寫入現行完成進度 | 源研究不等於可商用素材 |
| `.ai/*/SKILL.md`（19 份） | **保留專職 Skills** | 每個 Skill 只擔任自身責任；同類安全規則可引用共用上位文件 | 不合成巨型 Skill |
| `.ai/**/references`、`recipes`、`examples`、`checklists`、`raw-research`、`source-snapshots` | **保留技術參考／來源資產** | 僅按其 Skill 需要載入；原始研究與原始碼快照不重寫 | 不可因文件數多而刪除 |
| `.ai/SHARED-DESIGN-HANDOFF.md` | **保留設計跨 Skill 交接** | 範圍只限 Layout/UI/Editorial/Motion，連至對應設計 Skill | 非專案全局 SSOT |
| `src/content/articles/*.md`（6 份） | **保留網站內容** | Content Collections 是正式來源 | 不列入管理文件重整 |
| `public/robots.txt` | **保留執行資產** | 搜尋爬蟲輸出仍須真實 build 檢查 | 不當作文檔刪除 |

## 三、優先改正的實際衝突

| 優先 | 差異 | 所需核驗 | 完成判準 |
| --- | --- | --- | --- |
| P0 | 多份文件自稱「唯一 SSOT」，使專案管理入口不明 | 比對 #61 的 AGENT-HANDOFF、PR59 的範圍與 #67 七關 | 項目在專案級唯一索引；各自標為驗收紀錄／操作手冊而非同層管理 SSOT |
| P0 | START-HERE / AGENT-HANDOFF / STUDENT-AGENTS 重複發佈與操作提醒 | 確認學生 ZIP 真正匯出三者、讀取時機 | 初次／接手／持續修改各有唯一入口，交叉引用一致 |
| P0 | Build、Artifact、Preview、Production 的說法可能被混為一談 | 以獨立學生 Repo 實證兩平台 Preview；查看 #69 的安全修改 | 無有效 URL + Head SHA 不宣稱 Preview；正式發布保留人工核准 |
| P1 | README 12 vs Builder Pack 25 | 查 `definitions.mjs`、`expansion-directions.json`、可組裝狀態 | 準確描述「25 方向」與 Ready/Prototype/Adapter 不同意義 |
| P1 | ART-DIRECTION-STARTER 未接線 vs EXPANDED-LAYOUTS 已接線 | 查兩種 exporter 與主入口測試 | 標為歷史或修正操作文案，不給學員互相矛盾教學 |
| P1 | PR56 Logo 上傳步驟與當前 Starter | 實測第 02／04 步、Site Brief assets | 唯一學員流程與實際頁面相符；圖片選填不強迫技術路徑 |
| P2 | PR46／47／50 舊「Draft」語氣 | 以最新 PR/merge SHA 驗證 | 在歷史文件前加日期／狀態來源，不覆寫當時結果 |
| P2 | Repo 專用 GitHub Pages Preview vs 學員平台 | 讀兩套 Workflow 和專職 Skill | 文件明確適用對象和平台 |

## 四、執行次序與風險

1. **文件責任定案**：由使用者核准本表；確定母 Repo 的單一入口檔名及學員站 `PROJECT.md` 永遠獨立。
2. **建立入口而非搬全部資料**：新增 `PROJECT-SSOT.md`，放產品決策、七關驗收主表、來源連結、待辦與證據；README/AGENTS 放入口連結即可。
3. **消除真的重複編輯**：把 #67 `ACCEPTANCE-SSOT` 轉成指向主表；PR59/PR56 仍完整留底。其他文件用「規格權威／適用對象／歷史快照」前言標清。
4. **只修明確矛盾**：先實際核對 Registry、Exporter、Starter UI、#61/#69 diff；任何改動走獨立 PR 或在同職責 PR 上修改，避免三條活躍 PR 互相覆蓋。
5. **驗收**：所有原路徑仍可讀，學生 ZIP 起點未斷、學員站模板未改、Script/Actions 不受影響；引用連結及歷史證據可追溯，且未 Merge。
6. **後續維護規則**：新需求先判斷是產品決策、技術規格、操作 Skill、歷史證據、還是 Bug；只更新對應權威文件，專案級入口僅引用狀態；不得無故另外創第二個「SSOT」。

## 五、此表的狀態

- [x] 192 個 main 文字文件的原文讀取、路徑索引與第一輪責任分類
- [x] 文件交疊／矛盾候選與分群建議
- [x] 整併決策表（**提案已寫入，不代表核准**）
- [ ] 使用者核准
- [ ] 對 PR #61／#67／#69 同路徑修訂做實際 diff 比對
- [ ] 建立唯一管理入口、整合七關驗收
- [ ] 修 README／學員文件的現況矛盾並通過 QA
- [ ] 真實新手走完七關，人工批准

**邊界：** 此 PR 的文件盤點不應擴張成在 Starter A 工作裡直接修所有 Skills。先核准表，再以小範圍 PR 實施。
