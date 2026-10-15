# 學員專用 AI 建站規範（AGENTS.md）

> 對象是**學員自己的 Astro 個人網站**，而不是老師的研究展示 Repo。學員可以用自然語言提出需求，不需要學會 Git／CLI 指令。你必須確認目前可用的檔案、終端、Git、GitHub 和瀏覽器權限；沒有能力不能假裝已執行。

## 開始任何任務以前：了解專案與保護現有工作

1. 先讀根目錄 `PROJECT.md`，理解受眾、網站目的、已確認設計決策與待確認事項；再讀 `site.config.json`、真實 Astro 原始碼、`package.json` 和所需 Skills。若 PROJECT.md 尚不存在，使用包內 `PROJECT-TEMPLATE.md` 建立**初稿**，先標示未知，不要猜測。
2. 判斷工作位置：本機、雲端 GitHub、兩者混合、尚無 Repo。檢查目前 Branch、remote、未提交變更與正在進行的 PR。不可假設 GitHub 一定比本機未提交內容更新；先保護使用者現有檔案。
3. 以自然語言歸納任務目標、最小修改範圍、不可被破壞的舊行為與可驗證的完成條件。需求模糊或會影響已確認決策時，先提出少量、必要的問題。
4. 查現有 Components／Registry 與路由，不重複造輪子、不直接重跑 Starter 生成器覆蓋已有網站。

## 將「人話」轉成任務與 Skill

| 使用者說法 | 工作意圖 | 優先讀取 |
| --- | --- | --- |
| 想開始做網站、想選版型／品牌色 | 需求訪談與設計決策 | `.ai/astro-starter-onboarding/SKILL.md`、`.ai/astro-layout-craft/SKILL.md` |
| 想要更好看、更像雜誌／書房 | 先診斷版面，再提出差異化設計；不是直接亂改 | `.ai/astro-layout-craft/SKILL.md`、`.ai/astro-editorial-layout-design/SKILL.md`、`.ai/astro-ui-craft/SKILL.md` |
| 換照片、改一行文案或 CTA | 局部修改與真實來源／連結驗證 | `.ai/astro-site-maintenance/SKILL.md`；圖片／版面需要時讀 UI Skill |
| 新增頁面、調整選單、網址 | 路由與全站導航一致性 | `.ai/astro-page-management/SKILL.md` |
| 寫文章、修改文章、下架草稿 | 內容發布、搜尋／RSS／Sitemap 回歸 | `.ai/astro-content-publishing/SKILL.md` |
| 新增功能或元件 | 先找既有 Block，再補實作 | `.ai/astro-ui-craft/SKILL.md`、Blocks Registry |
| 網站壞掉了、回到先前版本 | 根因調查、備份、可稽核修復 | `.ai/astro-site-maintenance/SKILL.md` |
| 想看修改結果、可以上線了 | Preview、發布核准、部署後檢查 | `.ai/astro-pr-preview/SKILL.md`、`.ai/astro-starter-deploy/SKILL.md` |

複合任務可以讀多個 Skill，但不要把所有職責塞成新的一套 Agent 框架。先結構與內容，後視覺與效果。

## AI 自主權限與 Git 的正確使用

- **可自主**：在已授權工作空間檢查檔案／Repo、研究、規劃、建立隔離 Branch、修改指定範圍、執行本機 Build 和測試。
- **僅在已授權的 Repo**：Commit、Push、建立 PR、取得真實 Preview。若只有本機 Git，先保留可回復的本機 Commit；沒有遠端就沒有 GitHub PR／Actions，不得聲稱已建立。
- **須取得明確核准**：Merge、Production 部署、啟用搜尋引擎索引、DNS／公開網域變更、刪除內容或 Repo、強制推送／重寫歷史、破壞性復原。核准必須指向實際版本與影響範圍；不能把「幫我改一下」當成發布授權。
- **日常安全流程**：現況和影響分析 → 最小變更 → Git diff／Build／回歸 → PR（適用時）→ 實際 Preview → 學員看過並明確同意 → Merge／發布 → 正式站實測。
- 已存在未提交的使用者工作時，不得直接 reset、checkout 覆蓋、force-push 或 stash 後遺忘；先說明衝突並保護原有工作。
- 研究展示網站的 GitHub Pages Workflow 和 URL **不得搬成學員的部署設定**；依自己 Repo 的 GitHub Pages、Cloudflare Pages 或 Workers 實際紀錄選擇程序。

## 修改範圍、真實性與品質護欄

- 使用兩類網站：知識／部落格，以及助人者／個人專業服務。優先 Astro 靜態網站，不擅自做 CRM、會員、金流、醫療資料庫或自建預約後台。
- Layout 是資訊架構，不是換色；Theme／品牌 Tokens、Section Patterns、Blocks、Effects 分別處理不同層級。設計先處理 Typography、Grid、Spacing、CJK、Responsive，再考慮節制動效；不要靠大量動畫修補薄弱版面。
- 不虛構證照、見證、服務價格、治療效果、統計、預約／訂閱成功；未設定的外部表單、預約與支付須隱藏或清楚標示，絕不可假裝功能已可使用。
- 研究案例只借抽象結構、資訊階層、節奏和互動；不可複製別人的品牌圖、原文、Logo、照片或客戶資料。
- 所有動效尊重 `prefers-reduced-motion`，支援鍵盤和觸控；JavaScript 不可成為主要內容可見的前提。

## 驗收與回報：工程綠燈不等於設計核可

1. 先對照需求檢查 `git diff`，確認沒有無關重構；確保舊頁、導航、公開文章、草稿隔離、搜尋、RSS、Sitemap、SEO 和真實 CTA 不意外退化。
2. 執行實際可用的 Build、測試和 CI。UI 修改需依任務檢查 1440、1280、768、390，並區分「已產生截圖」與「有人真正檢視畫面」；鍵盤、觸控、reduced-motion 亦需合適驗證。
3. 只有真正可開啟並對應當前 Commit 的 Preview 才可交付；Build artifact 或猜測網址不是 Preview。
4. 給學員可理解的結果：改了什麼、哪些沒有改、真實預覽連結、PASS／FAIL／BLOCKED／NOT TESTED、風險、下一步及還原方式。
5. **不得擅自 Merge、正式發布或宣稱未做過的 QA 已經通過。**

## PROJECT.md 的生命週期

- 第一次網站討論就建立預設初稿，未知欄位保留「待確認」；逐步更新，不要求學員一次寫完整規格。
- Site Brief JSON 是初次規劃的結構化資料；真實實作以程式與 Git 為準，不得把已選 Layout 視為所有內頁已完成。
- 有新的長期品牌、受眾、版型、頁面、部署決策時，提出 PROJECT.md 變更；只做小幅視覺調整不需每次追加工作日誌。
- 更新建站 ZIP 或 Starter 不得覆蓋學員已寫的 PROJECT.md，若有衝突先比對並詢問。
- 在新 AI 工具或新對話接手時，依 `PROJECT.md` 的意圖與 Git／程式的現況重新驗證，不依賴舊聊天記憶。

## 交付包與環境注意事項

本 ZIP 提供必要的 `.ai/` Skills、可重用版型和 Blocks、`scripts/export-starter.mjs`、`PROJECT-TEMPLATE.md`、`START-HERE.md`、`AGENT-HANDOFF.md`；學員另提供規劃器匯出的 Site Brief JSON。不要 Fork／修改老師 Repo，也不要將老師的示範素材當成已獲授權的正式網站素材。AI 缺少 Node／Git／雲端或瀏覽器能力時，必須如實告知替代流程，不要求完全新手自己猜 CLI 指令。
