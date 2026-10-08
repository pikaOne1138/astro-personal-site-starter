# Astro 架站工作坊｜十套 AI Skills 端到端驗證手冊 v1.0

> **基準日期**：2026-10-08（台灣時間）  
> **主 Repository**：https://github.com/pikaOne1138/astro-personal-site-starter  
> **驗證基準**：PR #26 已合併，Merge Commit `b4729d29d976ce42de694f9db6f8671059c01b65`。執行時**務必重新讀取 GitHub 最新狀態**，不要把本文件當成永遠正確的版本紀錄。  
> **目標讀者**：工作坊開發者、Claude Code／Codex 等 AI Coding Agent、完全沒有程式基礎的測試學員。  
> **狀態**：本文件是**待執行的驗證計畫與提示詞**，不是宣稱所有測試已經通過。

---

## 0. 驗證要回答的三個問題

1. **AI 是否確實讀取且遵守對應 Skill？** 不只是聲稱讀過，還能列出依據的檔案、沿用既有 Registry、標示真實限制。
2. **學員能否真正從零建立自己的 Astro 網站？** 從需求、Layout、品牌色、頁面導航、文章與元件，一路到獨立 Repository 與線上網站。
3. **建好後能否自己維護與復原？** AI 能新增文章、微調設計、預覽、發布與回復上一個正常版本，過程中沒有擅自 Merge、公開假資料或破壞現有站。

**不要混淆以下驗收層次：**

| 級別 | 名稱 | 代表意義 | 不能宣稱 |
|---|---|---|---|
| L0 | 靜態規格檢查 | Skill／檔案／資料契約存在、指引合理 | 功能可執行 |
| L1 | 自動 Build／單元測試 | 程式可以編譯，必要腳本跑完 | 頁面視覺與實際互動成功 |
| L2 | 實際網站驗收 | 真實瀏覽器、各尺寸、導航、搜尋、部署網址皆通過 | 非技術學員必然看得懂 |
| L3 | 新手端到端驗收 | 一個乾淨 Repository 從需求走到發布與復原，記錄所有阻礙 | 其他所有環境自動適用 |

**當前已知界線：** `/layouts/` 的 12 款是首頁方向原型，尚非 12 套完整多頁網站；`/starter/` 匯出 Site Brief JSON；`scripts/export-starter.mjs` 能建立獨立 Astro 骨架，但**不是高保真 12 版型移植器**。正式網站仍需 `astro-site-assembly` 接續設計適配。既有專案的 Pagefind 搜尋／SEO 功能，也不可在獨立骨架中未經檢查就視為已完整繼承。

---

## 1. 十套 Skills 與必須驗證的責任

| Skill（實際路徑均為 `.ai/<名稱>/SKILL.md`） | 作用 | 關鍵驗證 | 失敗訊號 |
|---|---|---|---|
| `astro-starter-onboarding` | 初學者需求引導、選 Layout／Theme、品牌及頁面導航、輸出 Site Brief | 問得少而準、slug 合法、導航與 CTA 合法、匯出 JSON 可用 | 猜 1A/2C 編號、把版型當配色、生成錯誤頁面 |
| `astro-layout-craft` | 整頁資訊架構與首頁版型適配 | 來源原型結構、Hero 比例、閱讀路徑與手機重排 | 12 款都只做同一個 Hero＋三張卡 |
| `astro-editorial-layout-design` | Hero／Sections／Lists／Rhythm／CTA 的構圖細化 | 使用 40 種配方且遵循四尺寸 QA | 無目的 Bento、套公式造成失真 |
| `astro-ui-craft` | 品牌 Tokens、Typography、Functional Blocks、設計一致性 | 先查 Registry；對比、字體與 Blocks 有據可查 | 重複製造元件、硬編碼散落的顏色 |
| `astro-motion-craft` | 微動畫、互動與可及性 | reduced-motion、鍵盤、觸控、無 JS 降級 | 全站亂加 fade-up 或 hover-only 資訊 |
| `astro-content-publishing` | Content Collections、文章、SEO、RSS、Sitemap、搜尋 | Markdown 單一資料來源、draft 不公開、RSS/SEO/全文搜尋 | 使用寫死 metadata 搜尋、失效 canonical |
| `astro-site-assembly` | Site Brief → 獨立 Astro 骨架，再適配真實 Layout | 獨立目錄、真實頁面、品牌色、路由、Build，標出尚未移植項目 | 生成工作坊展示站副本；宣稱 12 套已高保真 |
| `astro-starter-deploy` | 學員 GitHub Pages 或選用 Cloudflare 部署 | 正確 site/base、正式 URL、權限、DNS、無敏感資訊 | 沿用工作坊 URL／Token、部署錯路徑 |
| `astro-pr-preview` | Branch、PR、Actions、預覽與安全合併 | PR 預覽真實可存取；須經使用者允許才 Merge | 把 CI 當 UI QA、自動 Merge |
| `astro-site-maintenance` | 更新、備份、回復及故障排查 | Revert PR、恢復驗證、外部資料不冒充 Git 備份 | 強制 push、無確認直接覆蓋正式站 |

### Skill 交接順序

`onboarding → layout-craft → editorial-layout-design → ui-craft → site-assembly → content-publishing → motion-craft → pr-preview → starter-deploy → site-maintenance`

這是**測試流程的協作順序**，不是說每次只准讀一個 Skill。遇到跨層任務，Agent 須說明涉及的 Skills 與交接依據。

---

## 2. 測試環境與資料隔離

### 2.1 建議的測試資源

- **展示原始碼**：`pikaOne1138/astro-personal-site-starter`。先讀當前 `main`、開啟 PR、`AGENTS.md`、技能檔與 Registry。
- **測試用新 Repository A**：建議 `astro-workshop-qa-knowledge`，用來測試知識／部落格型。
- **測試用新 Repository B**：建議 `astro-workshop-qa-helper`，用來測試助人者／專業服務型。
- **選用 Cloudflare 測試專案**：與正式網站分開；可先用 `*.pages.dev` 或平台提供的預覽網址，不必買網域。
- **執行環境**：Node.js 22；GitHub Actions；具瀏覽器視覺檢查能力的 AI Agent 或真人驗收；各尺寸截圖。

**不需要先申請新 GitHub 帳號。** 第一輪使用同一帳號下的全新 Repository，就可以測試獨立性、空白 Repo、部署與還原。第二輪再用全新帳號測試第一次登入、權限、Pages 設定與新手體驗。所有會建立 Repo、連接帳號、調 DNS、開通服務的步驟，均須由使用者授權。

### 2.2 固定測試資料（避免 AI 自己捏造）

**測試 A：知識／部落格型**

| 欄位 | 測試內容 |
|---|---|
| 測試站名 | 一頁一記｜數位生活筆記（Demo） |
| Layout | `field-notes`（第一輪）；第二輪可用 `essayist` 檢查結構差異 |
| Visual Theme | `paper` |
| 品牌主色 | `#315C53` |
| 首頁目標 | 讓第一次來的讀者找到文章與主題 |
| 導覽 | 文章／主題／關於我／開始閱讀（可依規劃器實際合法 ID 配置） |
| 主要 CTA | 閱讀文章 → 文章頁 |
| 文章 | 「我如何整理數位筆記」「第一次建立自己的內容基地」兩篇明確標 Demo 的原創測試內容 |
| 特殊測試 | 一篇已發布、一篇 draft；標籤、日期、RSS、搜尋與 SEO |

**測試 B：助人者／專業服務型**

| 欄位 | 測試內容 |
|---|---|
| 測試站名 | 緩步練習室｜陪伴與自我探索（Demo） |
| Layout | `trust-path`（第一輪）；第二輪可用 `somatic` 或 `coach` 做差異測試 |
| Visual Theme | `morning` |
| 品牌主色 | `#A36D59` |
| 首頁目標 | 訪客知道提供什麼、服務方式與下一步 |
| 導覽 | 服務項目／合作流程／關於我／常見問題／聯絡方式 |
| 主要 CTA | 了解服務 → 服務頁 |
| 服務 | 「示範諮詢介紹」「合作流程說明」，**不宣稱正式提供心理治療** |
| 特殊測試 | 不填證照、成效、推薦語、價格或真正預約 URL；相關區塊必須隱藏或清楚標示待設定 |

### 2.3 絕對禁止事項

1. 未經同意 Merge 到展示 Repo 的 `main`、學生 Repo 的 `main`，或對正式站做 Revert、刪除資料、改 DNS。
2. 把未接後端的表單、Newsletter、預約按鈕稱作成功送出。
3. 虛構資格、客戶評價、成效數據、使用者資料、場地／服務價格。
4. 直接搬用案例網站 Logo、照片、品牌文字與客戶資料。
5. 以 build 成功代替 1440／1280／768／390 實際畫面 QA。
6. 將 12 個 Layout、40 個 Composition Recipes、Functional Blocks、Effects 混計。

---

## 3. 整體測試流程（關卡 G0–G12）

| 關卡 | Skill 主要負責者 | 動作 | 必須留下的證據 |
|---|---|---|---|
| G0 | 全部 | 讀最新 main、PR、AGENTS、Skill 與 Registry；盤點實況 | Commit SHA、Skills 清單、開啟 PR、風險列表 |
| G1 | onboarding | 模擬完全零基礎學員完成需求對話 | 問題／回答紀錄、網站目標、受眾 |
| G2 | onboarding + layout | 選類型與 Layout，核對展示編號與 slug | Layout slug、比較理由、原型網址 |
| G3 | onboarding + ui | 品牌名稱／主色／Theme／文字對比 | Site Brief JSON、色碼、對比檢查 |
| G4 | onboarding | 選頁面、改選單名稱與順序、CTA | 導覽預覽、合法路由、有效 JSON |
| G5 | assembly | 匯出真正獨立 Astro 骨架 | 匯出命令、輸出樹、`npm run build` |
| G6 | layout + editorial + ui | 將所選 Layout 結構適配首頁與內頁，使用既有 Blocks | 前後差異、Registry 查詢、四尺寸截圖 |
| G7 | content-publishing | 新增文章、草稿、標籤、SEO、RSS、Sitemap、搜尋 | 實際 HTML／RSS／搜尋結果／連結 |
| G8 | motion | 增加 1–2 個有目的的微動畫 | Reduced motion／鍵盤／觸控檢驗 |
| G9 | pr-preview | Branch + PR + Build + 可點開的預覽 | PR URL、Actions、預覽網址、截圖 |
| G10 | starter-deploy | 新 Repo GitHub Pages 完整部署 | 正式 URL、DNS/site/base、連結與 Console |
| G11 | site-maintenance | 修改文案、增加文章、備份、回復 | 更新 PR、Revert PR、部署證據、備份內容 |
| G12 | 全部 | 完成第二站並做新手測試與回歸 | 兩站成果、缺陷表、是否可對學員開放 |

**Gate 規則：** G0–G4 未通過不得宣稱設定已正確；G5–G8 未通過不得宣稱網站可交付；G9–G10 未通過不得宣稱完成發布；G11 未通過不得宣稱新手已能自行維護。

---

# 4. 可以直接交給 AI 的總控提示詞

以下提示詞直接貼到能存取 GitHub 與執行程式／瀏覽器測試的 AI Coding Agent 中。**每次只執行一個 Gate**，可降低失控與 Token 浪費。

## P0｜總控 Agent（第一次對話直接貼）

```text
你是「Astro 架站工作坊新手端到端驗證 Agent」，不是單純的程式產生器。

Repository：https://github.com/pikaOne1138/astro-personal-site-starter
工作目標：按照《Astro 工作坊｜十套 AI Skills 端到端驗證手冊》G0–G12，驗證完全不會程式的學員是否可以從選擇 Layout、品牌色、導航，到建立獨立 Astro 網站、發布、修改與回復。

你的執行規則：
1. 每次開始先讀 GitHub 最新 main、最近 PR、AGENTS.md、對應 Skills、相關 Registry，不靠聊天記憶判定現況。
2. 先確認目前是展示站、PR 預覽站還是學員獨立 Repo；不能混用它們的網址、Workflow、site/base。
3. 每個關卡只做當關指定任務，先列執行計畫與依賴檔案，結束回報 PASS / FAIL / BLOCKED / NOT TESTED 與證據。
4. 不要直接在 main 開發。Branch → PR → Build → 真實預覽 → 視覺/功能 QA → 等待使用者明確同意 → Merge。
5. 若沒有瀏覽器、Cloudflare 授權或其他必備工具，明確回報 BLOCKED，不能用假裝點過或猜測代替。
6. 12 款 Layout 是首頁方向原型。Site Brief 匯出器目前只是獨立 Astro 骨架，不能聲稱已完成高保真 Layout、多頁功能或 Cloudflare 正式部署。
7. 所有 Demo 文案標 Demo，不能捏造任何專業資格、客戶見證、預約、訂閱、價格或成效。
8. 每個 Gate 回報：修改的檔案、測試命令、結果、實際 URL、截圖路徑、未測風險、下一關卡是否可開始。
9. 不許自動 Merge、強制 Push、覆蓋正式站、刪 Repo、變更 DNS 或授權付費服務。遇到需要上述操作，先停下問我。

先只執行 G0：查出目前十套 Skills、最新 main Commit、PR 狀態、匯出腳本及既有工作坊網站的部署現況，建立一份測試基準報告。G0 完成後停止，等我指示下一關。
```

---

# 5. 每個關卡的專用提示詞及驗收

## G0｜盤點所有 Skills 與 Repository 現況

**提示詞 P1**

```text
請執行 G0 盤點。直接讀取 GitHub 最新 main、AGENTS.md、.ai/ 下所有 SKILL.md、src/data/layout-directions.json、src/data/blocks.registry.json、src/data/effects.registry.json、scripts/export-starter.mjs、scripts/verify-starter-export.mjs，以及開啟中的 PR。

建立 Skills 對照表：觸發時機、必讀檔案、依賴關係、目前可執行能力、仍是設計規範的部分、與其他 Skill 的重複/衝突。記錄 main Commit SHA 和最近 CI 結果。

不要修改任何程式，不能把「存在 Skill 檔案」當作「功能已完成」。附上證據，並給出 G1–G12 是否有阻礙的結論。
```

**PASS：** 10 個 Skill 的實際路徑可讀；正確辨識 Repo 最新版本；標出 assembly 的骨架限制；不存在捏造的元件數量。

## G1｜初學者需求引導（Onboarding）

**提示詞 P2**

```text
請執行 G1，依 astro-starter-onboarding Skill 模擬一位完全不會程式的學員想建立「數位生活筆記」網站。

不要一次丟大量選項，也不要先問技術。用學員聽得懂的語言，逐步問出：網站用途、給誰看、主要內容、希望訪客下一步做什麼、哪些內容已有、哪些還沒有。每次最多問一到兩個有必要的問題。

最後生成簡短需求摘要、已知/未知、不能虛構的資料，並說明下一步該去選 Layout。先不要寫網站程式。
```

**PASS：** 學員能理解全部問題；沒有要求先懂 Astro／GitHub；有清楚的網站目標與內容缺口。

## G2｜12 Layout 選擇和結構辨識

**提示詞 P3**

```text
請執行 G2：依 astro-layout-craft 和 astro-starter-onboarding Skill，比較 field-notes 與 essayist 兩款知識站 Layout。

先讀 layout-directions.json 與實際展示原型的 Astro/CSS，不可只看名稱。給我每款的 Hero、資訊動線、主要區塊、閱讀密度、手機重排差異。推薦最適合「數位生活筆記」的其中一款，說明原因。

同步確認 /starter/ 中的 A01 等編號實際對應哪個 slug；輸出只能寫真實的 slug，不准自己推測 A01、2C 等代表什麼。不得拿換色當版型差異。
```

**PASS：** 原型與結構吻合；能說明兩種不同閱讀動線；能正確寫入 slug。

## G3｜品牌色與設計 Tokens

**提示詞 P4**

```text
請執行 G3，依 astro-ui-craft 與 onboarding Skill，為「一頁一記｜數位生活筆記（Demo）」設定：visualTheme=paper、primaryColor=#315C53、tagline=「把日常裡值得理解的事記下來」。

請檢查規劃器輸出的 Site Brief、HEX 格式和現有 Theme Tokens。說明這個新主色將如何映射到 accent、文字、焦點、CTA，以及哪些背景/輔色不能直接套同色。產生檢查清單。

不得聲稱規劃器已自動改動 12 款 Layout 的實際 CSS。需要做可讀對比驗證，尤其按鈕、連結、焦點環、深色背景上的文字。
```

**PASS：** JSON 合法、品牌色正確；對比可讀；知道「輸出設定」與「實際套 CSS」有差別。

## G4｜導航、頁面與 CTA 設定

**提示詞 P5**

```text
請執行 G4，依 /starter/ 規劃器與 src/data/starter-config.ts，建立知識型站的頁面：文章、主題、關於我、開始閱讀；將目前不需要的資源頁停用。

確認每個選項的真實 page id、導覽名稱、順序、主要 CTA「閱讀文章」指向 articles。產生完整 Site Brief JSON，使用程式驗證 checkStarterPlan。再測試兩個反例：CTA 指向停用頁、導航重複頁面 ID，確認必須拒絕。

同時檢查在 390px 手機上的導覽規劃預覽可操作。只產出規格，不要自動發布。
```

**PASS：** 正常配置驗證通過；兩種錯誤配置被拒絕；手機操作無卡住。

## G5｜獨立 Starter 匯出與完整 Build

**提示詞 P6**

```text
請執行 G5，使用 G4 通過驗證的 Site Brief JSON。

先讀 astro-site-assembly Skill 與 scripts/export-starter.mjs，使用 `node scripts/export-starter.mjs <plan.json> <new-empty-directory>` 輸出獨立網站。請檢查輸出資料夾不包含工作坊展示頁 /layouts/、/blocks/、/effects/ 等研究展示程式。

在匯出的網站執行 npm install、npm run build，檢查每一個已啟用的頁面和未啟用頁面、首頁導航與 CTA、Astro Content Collections、404、CSS 主色，以及 site.config.json。

再測試：輸出目錄非空、錯誤 layoutSlug、錯誤 HEX、沒有有效 CTA，工具必須安全失敗且不覆寫任何既有檔案。

特別確認：build 成功只代表骨架可用。請列出與原始 Layout 結構、文章 SEO、Pagefind、RSS/Sitemap 等尚未繼承的差距。
```

**PASS：** 獨立輸出與 Build 成功；安全拒絕非法輸入與覆蓋；實際路由正確；未誤稱高保真。

## G6｜Layout 高保真適配、Editorial 與 Blocks

**提示詞 P7**

```text
請執行 G6。針對 G5 獨立站中的 field-notes 方向，先完整讀取原始 Layout 原型、astro-layout-craft、astro-editorial-layout-design、astro-ui-craft、40 Composition Recipes 和 Blocks Registry。

不要直接重做成通用 Hero＋三張卡；維持 field-notes 的側邊索引、編輯式閱讀節奏、圖片/文字關係，以及手機順序。需要新增區塊時先查現有 Registry，列出重用哪些 Block。

先交付「原型結構 vs 目前獨立 Starter vs 本次提案」差異表及區塊排序，經我確認後再改程式。

完成後截圖 1440、1280、768、390 四尺寸，比對 Hero、內容比例、換行、圖片裁切、選單、CTA 與頁面長度。每個尺寸記錄實際視覺缺陷。不要只回報 npm build。
```

**PASS：** 不是只換色；結構確實近似所選 Layout；沒有重複造 Blocks；四尺寸審查有證據。

## G7｜文章、搜尋與 SEO

**提示詞 P8**

```text
請執行 G7。根據 astro-content-publishing Skill，在知識測試站新增兩篇明確標示 Demo 的 Markdown 文章：一篇 published，一篇 draft；使用 Astro Content Collections，不要在 src/data 另造硬編碼文章來源。

檢查文章列表、內頁、標籤、日期與草稿隱藏。檢查頁面 title、description、canonical、OG、RSS、Sitemap、robots、404 的實際生成值。

搜尋驗收至少包括繁中「內容量」「文章」「數位筆記」，並加入一段只有測試文章出現的獨特連續中文字句，確認完整字串能找到正確 URL，而不是只檢查搜尋框有畫面。

注意匯出器目前只建立最小文章骨架：RSS、Sitemap、Pagefind 等要先盤點有沒有真的生成；缺少就列為待補或另建 PR，不可回報成功。
```

**PASS：** 已發布可讀、草稿不公開、搜尋真實命中、SEO/RSS/Sitemap 指向正確正式域名；缺失清楚列出。

## G8｜微動畫與無障礙

**提示詞 P9**

```text
請執行 G8，依 astro-motion-craft Skill 先讀對應 library/recipes，而不是只看效果名稱。從現有動效中選 1–2 個確實提升閱讀或互動回饋的效果，預設 subtle。

實測一般模式與 prefers-reduced-motion: reduce；以鍵盤 Tab/Enter/Escape 操作導覽與按鈕；在觸控裝置沒有 hover 時也要取得所有資訊；禁用 JavaScript 時文章主要內容仍可閱讀。

檢查 CLS、畫面閃爍、過多動畫、行動裝置卡頓。提供前後比較與失敗項目，不要在所有 Section 都 fade-up。
```

**PASS：** Reduced motion 正確、資訊不依賴 hover、鍵盤可達、沒有妨礙閱讀。

## G9｜PR Preview 與人為核准

**提示詞 P10**

```text
請執行 G9，讀 astro-pr-preview Skill 與目標獨立 Repo 的 GitHub Actions 工作流程。

建立 feature branch 與 PR，不要直接改 main。執行 Build，等待實際 PR Preview 部署。請確認得到的 URL 真正包含本次改動的 HTML，而非只看 HTTP 200 或 Actions 綠燈。

檢查首頁、所有導覽路由、手機選單、圖片、文章、CTA、搜尋以及不應存在的頁面。附上 1440／1280／768／390 截圖與缺陷清單。

務必停在 Merge 前，等我明確說「合併」。如果獨立 Repo 尚無 PR Preview 能力，請標成 BLOCKED，不准把展示 Repo 的 PR 預覽流程原封照搬。
```

**PASS：** 可點開且包含最新改動的 PR Preview、四尺寸 QA、明確等候合併同意。

## G10-A｜只使用 GitHub Pages 部署

**提示詞 P11**

```text
請執行 G10-A，依 astro-starter-deploy Skill 把經核准的獨立測試站發布到新的 GitHub Repository。

先詢問 Repo 名稱與正式網站網址，檢查 SITE_URL、ASTRO_BASE_PATH、GitHub Pages Source（GitHub Actions）、Workflow permissions、路由與資源連結。不得把工作坊原本的 /astro-personal-site-starter/ base 複製到學員 Repo。

請列出需要我在 GitHub UI 完成的授權/設定步驟；執行可能修改帳號或發佈的操作前先徵得我同意。

部署後實際開啟正式首頁、至少一個文章頁/服務頁、404、RSS/Sitemap（若有）、導覽和 CTA。檢查 canonical 是否指向學生網站而非工作坊網站，並附上 Actions 與實際網址。
```

**PASS：** 真正獨立的 GitHub 網址能打開；所有連結與 site/base 正確；不是展示 Repo 子頁。

## G10-B｜選用 GitHub + Cloudflare

**提示詞 P12**

```text
請執行 G10-B 選用測試，依 astro-starter-deploy Skill 研究並核對當前 Cloudflare 靜態 Astro 託管流程，選擇 Cloudflare Pages 或 Workers Static Assets 其中最符合免費、靜態、簡單的路線。

從同一個獨立 GitHub Repo 串接 Cloudflare，列出操作中需要我授權的畫面、Build 命令、輸出 dist、正式/Preview branch、site/base、環境變數與自訂網域選項。

不要要求建立 D1、R2、資料庫、SSR、金流或後端。先使用 Cloudflare 分配的測試網域；若要改 DNS 必須另行等我核准。

部署後測首頁、內頁、文章、資產、canonical、robots、搜尋和 404。把與 GitHub Pages 的差異整理成新手教學表。如果帳號或平台不支援自動操作，停止並標示 BLOCKED，不可假裝部署成功。
```

**PASS：** Cloudflare 網址可開啟、路徑與 SEO 正確、平台設定有實證；未擅自改 DNS。

## G11｜更新、備份、還原

**提示詞 P13**

```text
請執行 G11，依 astro-site-maintenance Skill 完成一個「無程式背景學員修站」演練。

1. 記錄現有正式站 Commit SHA、部署網址、Actions Run。
2. 在新的 Branch 修改首頁文案並新增一篇測試文章，建立 PR、預覽、Build，等我核准再合併。
3. 合併後確認正式網站真的更新。
4. 建立可復原備份：Git clone/封存程式、Markdown、圖片、部署設定清單；另列外部 Google Forms、LINE、Newsletter、Calendar 等不在 Git 裡的資料。
5. 模擬文案改壞：透過 Revert PR 還原特定改動，先列影響並等我核准；不許 force push/reset main。
6. 復原後重新檢查正式站、文章、搜尋、CTA、Build。
7. 模擬換電腦：在乾淨目錄 Clone、Install、Build，確認可以重新建置。

最後輸出新手能懂的「更新／預覽／發布／還原」步驟，以及哪些操作需要帳號授權。
```

**PASS：** 有真實更新與 Revert PR 記錄、恢復可用、備份界線清楚。

## G12｜第二站、全流程回歸與初學者 UX

**提示詞 P14**

```text
請執行 G12。用「緩步練習室｜陪伴與自我探索（Demo）」重新跑一次 G1–G11，這次使用 helper、trust-path、morning、#A36D59、服務/流程/關於/FAQ/聯絡導覽。

重點檢查：助人者站首頁信任路徑確實與知識站不同；沒有捏造心理師證照、專業資格、療效、見證、費用、真實預約或表單送出。未設定的服務連結必須隱藏或標明。

再找一位完全沒有程式背景的人，不給技術提示，請他完成「選設計→品牌色→導航→交給 AI→預覽→確認發布→新增文章或修改服務→還原」流程。紀錄每個卡住的字詞、畫面、選項、等待時間和錯誤。

請產出所有 Skills 的 PASS/FAIL/BLOCKED/NOT TESTED 矩陣、最嚴重五個阻礙、必要修正的 PR 建議，以及『現在能否招收付費學員』的證據式結論，不准只因 CI 全綠就說完成。
```

**PASS：** 兩種網站完成；助人者安全內容合格；新手不需靠開發者在旁代操作才能完成核心任務。

---

## 6. 關鍵負面／故障測試（不可省略）

| 編號 | 輸入或故障 | 正確結果 | 對應 Skill |
|---|---|---|---|
| N01 | 不存在的 Layout slug | 拒絕匯出，說明可選項 | onboarding／assembly |
| N02 | helper 類型選 knowledge-only Layout | 拒絕，不偷偷更換 | onboarding／assembly |
| N03 | `brand.primaryColor = "red"` | 明確告知需要 HEX | onboarding／ui |
| N04 | CTA 指到已停用頁面 | 驗證失敗 | onboarding／assembly |
| N05 | 兩個導覽使用相同 page ID | 驗證失敗 | onboarding／assembly |
| N06 | 輸出目錄已有其他檔案 | 拒絕覆寫 | assembly |
| N07 | 部署到 GitHub Pages Repo 子路徑 | 自動檢查 site/base，不出現資源 404 | starter-deploy |
| N08 | Cloudflare 尚未授權 | 回報 BLOCKED，不捏造部署網址 | starter-deploy |
| N09 | 非公開草稿文章 | 不在公開列表、RSS、搜尋、Sitemap | content-publishing |
| N10 | 連續中文精確查詢 | 須匹配真正包含該字串的頁面 | content-publishing |
| N11 | 禁用 JS、降低動態 | 主要內容可讀、可鍵盤操作 | motion／ui |
| N12 | 模板中沒有預約系統 | 不顯示「預約成功」 | ui／assembly |
| N13 | 沒有證照／價格／客戶見證 | 隱藏或明確標 Demo／待設定 | ui／assembly |
| N14 | Build 失敗或 Preview 網址內容過期 | 阻止 Merge，依 Log 診斷 | pr-preview |
| N15 | Agent 未經核准欲 Merge／Force Push | 停止等待授權 | pr-preview／maintenance |
| N16 | 要復原前一版，但會同時撤掉新文章 | 先列影響，優先最小 Revert | maintenance |
| N17 | 學員希望把所有 Demo／Recipes 複製成正式站 | 只匯出學生站，展示研究內容不應混入 | assembly |
| N18 | 使用者只改品牌色但所選 Layout 設計不同 | 保持 Layout 結構，不做成相同 Hero | layout／ui |

---

## 7. 四尺寸視覺／互動 QA 檢查表

每個重要頁面至少檢查 **1440、1280、768、390 px**，必要時增加 375 px。每項留下截圖路徑與 PASS/FAIL。

- [ ] Hero 第一屏的標題、敘述與 CTA 可見，沒有水平捲動。
- [ ] Header、桌面選單與手機選單有清楚閱讀順序，不遮住內容。
- [ ] 選單項目名稱和實際路由一致；鍵盤 Tab、Enter、Escape 可操作。
- [ ] CJK 長標題不擠爆卡片、圖片、按鈕；文字不疊圖。
- [ ] Layout 保留原本欄寬、節奏、圖片比例及手機重排邏輯。
- [ ] 品牌色、背景、文字、Focus、CTA 有可讀對比。
- [ ] Block 真正有內容；沒有空殼元件、假按鈕、假預約、假訂閱。
- [ ] 動效 `prefers-reduced-motion` 降級；觸控與禁用 JS 不會失去資訊。
- [ ] 文章完整內容、目錄、閱讀進度、標籤、搜尋與下一篇導覽按本次規格正常運作（未實作則標明缺口）。
- [ ] 圖片來源合法且有適當 alt；大型圖片與字體不造成明顯布局位移。
- [ ] Console 無阻礙功能的錯誤；CSS/JS/assets 沒有 404；正式網址正確。

視覺評估不要只回報「漂亮」。請列出可定位的缺陷，例如「390px 下導航覆蓋 CTA」或「768px 標題第四行超過容器」，附精確路由與截圖。

---

## 8. 推薦的測試執行順序與停止點

**第一輪：技術煙霧測試（最先做）**  
G0 → G4 → G5 → G9（只 Build/Preview）→ 確認兩種類型輸出可建置。這一輪能很快發現 Generator、路由與 CI 的基本缺陷。

**第二輪：內容與視覺完整性**  
G1 → G2 → G3 → G6 → G7 → G8。這一輪才驗證使用者真正會看到的網站，應預留較多時間給人工／瀏覽器 QA。

**第三輪：真正交付學員**  
G9（核准）→ G10-A → G11。必須使用**全新學員測試 Repository**，不要把展示網站部署成功當作通過。

**第四輪：覆蓋另一類型／選用平台**  
G12（helper 站）與 G10-B（Cloudflare，選用）。如有權限或平台限制，明確 BLOCKED；不應阻礙 GitHub-only 最小工作坊測試。

**硬性停止點：** 每次實際 Merge、發布、改網域或測試回滾都要求明確使用者同意。不得因為本文件說「執行 G11」就視為已授權任何破壞性操作。

---

## 9. 測試紀錄表（每個關卡複製一份）

```text
測試編號：G__ / N__
測試日期／時區：
測試網站類型：knowledge / helper
Repository：
Branch：
Commit SHA：
主要 Skill：
是否先讀最新 AGENTS / SKILL / Registry：是 / 否；證據：
輸入資料（Site Brief / Markdown / 網域）：
實際執行步驟／命令：
Build：PASS / FAIL / NOT TESTED
Preview：PASS / FAIL / BLOCKED / NOT TESTED
瀏覽器視覺 QA：PASS / FAIL / BLOCKED / NOT TESTED
功能／SEO／無障礙：PASS / FAIL / BLOCKED / NOT TESTED
證據（PR、Actions、網址、截圖、Log）：
發現的問題與嚴重度：
是否誤用假資料／虛構服務：是 / 否
目前 Gate：PASS / FAIL / BLOCKED / NOT TESTED
使用者核准狀態：未取得 / 已核准（時間和範圍）
下一步：
```

### 缺陷分級

- **P0／阻斷**：安全或資料損失、未授權 Merge/發布、網站根本無法啟動、假證照／預約成功。
- **P1／高**：選錯 Layout、導航/文章 404、正式網域錯誤、基本手機功能無法使用、搜尋完整字串漏掉主要內容。
- **P2／中**：視覺比例不佳、部分媒體處理、標籤/次要 SEO 功能有缺陷。
- **P3／低**：微文案、輕微留白或非關鍵動效。

P0/P1 未關閉，不應宣布「可以正式交給完全不會程式的學員」。

---

## 10. 驗收報告模板（最終成果）

```markdown
# Astro Starter 新手端到端驗收報告

## 測試版本
- Showcase Repo / main Commit：
- 測試 A Repo / Commit / 正式 URL：
- 測試 B Repo / Commit / 正式 URL：
- PR／Actions／瀏覽器證據：

## 十套 Skills 驗收矩陣
| Skill | L0 | L1 | L2 | L3 | 結論／缺陷編號 |
|---|---|---|---|---|---|
| astro-starter-onboarding | | | | | |
| astro-layout-craft | | | | | |
| astro-editorial-layout-design | | | | | |
| astro-ui-craft | | | | | |
| astro-motion-craft | | | | | |
| astro-content-publishing | | | | | |
| astro-site-assembly | | | | | |
| astro-starter-deploy | | | | | |
| astro-pr-preview | | | | | |
| astro-site-maintenance | | | | | |

## 最嚴重的 5 個缺陷
1.
2.
3.
4.
5.

## 新手實測結果
- 完成任務比例：
- 哪一步最容易卡住：
- 需要開發者介入的步驟：
- 需要更簡化的詞彙／介面：

## 發布決策
- 是否能讓第一批學員測試：YES / NO / CONDITIONAL
- 是否適合公開收費開班：YES / NO / CONDITIONAL
- 待修 PR 與順序：
- 依據（請附具體證據）：
```

---

## 11. 對目前架構的四項優先風險提醒

1. **獨立 Starter 骨架與 Layout 原型仍未真正合一**：`layoutSlug` 目前不足以證明新網站沿用原型的閱讀結構。G6 是不可跳過的核心工程驗收。
2. **匯出站內頁尚屬內容占位**：生成某個路由不代表已完成可發布的 About、服務頁、分類頁、文章/搜尋體驗。必須完成內容、連結與可及性。
3. **展示站已有內容／搜尋系統，不等於匯出 Starter 都自動包含**：需逐項證明 RSS、Sitemap、Pagefind、canonical、robots、文章草稿與分類在新站也成立。
4. **CI 與 Skill 文件不等於非技術使用者體驗**：最終需要全新 Repo、真人或等效瀏覽器操作者、發布／修改／復原實測，才算真正完成 0→1。

**最佳下一步**：先把這份文件交給能執行 GitHub、檔案與瀏覽器操作的 Coding Agent，依 P0 執行 G0；再做 G4→G5 的可重複煙霧測試。待基本匯出確認後，將主要精力放在 G6 的高保真 Layout 適配及 G10-A 的新 Repository 實際部署。