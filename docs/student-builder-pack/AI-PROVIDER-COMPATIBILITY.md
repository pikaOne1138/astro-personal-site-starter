# 跨 AI 建站相容性｜權限確認與卡關處理

適用：拿 ATP 資料包請不同 AI 建**學員自己的獨立 Astro 網站**。這是工具能力與失敗交接說明，不是另一套 Exporter、QA 清單或部署程序。建站路由以 `.ai/astro-site-entry/SKILL.md`、首次部署以 `.ai/astro-starter-deploy/SKILL.md`、PR 與預覽以 `.ai/astro-pr-preview/SKILL.md` 為單一程序來源。

## 先選建站路線，然後才確認能力

- **A｜既有網站復刻**：已有本人擁有／獲授權的來源站，要遷移內容與路由。讀 `.ai/url-to-frontend-replica/SKILL.md`；不用先跑 Starter 匯出器。
- **B｜ATP Starter**：學員選 Layout／內容／品牌，在 `/starter/` 下載 Site Brief JSON，提供資料包，再按 `.ai/astro-site-assembly/SKILL.md` 組裝。只有這條路的匯出器需要有效 JSON；匯出後仍要補真實內容與驗收。
- **C｜AI 對話從零**：沒有既有網站，直接描述需求。讀 `.ai/astro-site-from-zero/SKILL.md`；不要求先用 `/starter/` 或準備 JSON。

**判斷案例**：「幫一位按摩師架站，參考 ATP 展示站」不等於擁有要復刻的原網站，也不等於已提供 Site Brief。預設走 **C**，由 AI 確認需求與網站是否由該按摩師授權；若明確選用 ATP 規劃器才改走 B。不得把展示站的設計、人物資格、見證或服務資料照搬，也不可虛構按摩師證照、價格、療效或預約成功。

## AI 第一步：只確認真正具備的工具能力

不需學員自己安裝指令工具。AI 先用它實際可操作的工具／授權確認，而不是因為「知道 Git」就自稱能用 Git。逐項列出 **YES／NEEDS AUTHORIZATION／NO／NOT TESTED**，並說明實測證據或限制：

| 能力 | 可以做什麼／該怎麼降級 |
| --- | --- |
| 有可寫檔案系統、Node、Git／CLI | 在學員授權的工作區建立／檢查獨立專案，依實際 `package.json` 安裝與 Build；確認 Git 遠端屬學員，走 Branch、PR。 |
| 可寫 GitHub API，但無本機 Git／CLI | 透過 GitHub API 在**學員自己的 Repo** 建 Branch、寫檔、開 PR；不要執行 `git status` 或把錯誤當成 Repo 遺失。遠端 CI 未執行前，Build 標 `NOT TESTED`；不能宣稱已產出可執行網站。 |
| GitHub 可寫一般檔案，不能寫 `.github/workflows/*.yml` | 先保留一般程式與文件變更於 Branch／PR，Workflow 操作標 `BLOCKED`。使用下方 403 路徑，不改名迴避限制，不宣稱 CI／部署已設定。 |
| Cloudflare 可讀但不可寫 | 可讀實際專案與部署紀錄，但**不能**新建 Pages／Workers、授權 Git 連線、設定環境變數或發布；交給學員在 Dashboard 人工完成並回傳非機密證據。 |
| AI 沒有 Build、瀏覽器或可驗證的線上 Preview | 明確回報哪些是 `NOT TESTED`／`BLOCKED`；交付 Repo／PR 與人工檢查步驟，不能虛構 Preview URL、截圖或成功狀態。 |

`git status` 只適用已確認存在的本機 Git 工作樹。ZIP 本身**不應內含 `.git`**。有本機 Git 能力時才於學員獨立專案初始化／連接 Repo；只有 GitHub API 時走遠端建立 Branch 和檔案，不要求將 Git 中繼資料塞進 ZIP。已有網站時先檢查遠端與現有變更，不能重新初始化覆蓋它。

## GitHub Workflow 403：停在權限關，不繞過

1. 記錄失敗操作、目標 Repo、目標路徑、HTTP **403** 與 GitHub 回傳的安全錯誤摘要（遮蔽 token、cookie 和個資）。區分一般 Contents 寫入與 Workflows 寫入是否不同；不要把單一 403 一律判成 GitHub 當機。
2. 檢查連接的是哪個 GitHub App／帳號、是否授權到學員的 Repo、是否有 Contents 寫入及對 Workflow 檔案所需的 **Workflows** 權限；亦核對 Branch protection、Repository Rules／組織政策。有權限顯示不等於本次操作成功。
3. 學員願意時，**由學員在 GitHub 官方授權畫面**審核 App／權限並重新授權，或請 Repo 管理者處理。不要索取 Personal Access Token、要求關閉保護規則或擴大所有倉庫權限。
4. 若不能授權，先保持 PR Draft、附上待新增／修改的 Workflow 原文、位置和用途，由有權限的學員／管理員在 GitHub 網頁編輯器或受信任的本機環境**另行審閱並手動提交到受保護的變更流程**，完成後再檢查 Actions 實際 Run。不可用其他路徑檔案假冒 Workflow，也不可把 Build artifact 說成線上 Preview。
5. **不需要新的 Workflow 就不要新增**：先檢查 Repo 是否已有可用 CI 與部署方式。ATP 展示 Repo 的 `deploy-pages.yml`／`pr-preview.yml` 並非學員必須複製的 Workflow；匯出學員骨架是否有 `pr-check.yml`／`deploy.yml`，須在實際匯出結果核對。

回報給學員：「一般網站檔案已在 PR；GitHub 拒絕 AI 編輯自動部署設定（403），因此這一步尚未完成。我沒有正式發布。需要你確認 GitHub App 權限或由有權限的人按提供的檔案進行人工提交，之後我們再看 CI 結果。」若僅文件模擬而未真實遇到 403，狀態為 **NOT TESTED**，不可說已重現。

## Cloudflare 第一次連接 GitHub：按下部署前先檢查

**Preview** 是供審核的測試部署；**Production** 是平台指定正式分支的部署，即使尚未綁自訂網域，也可能有公開 `pages.dev` 網址。Cloudflare Pages 首次連接 GitHub 並按 **Save and Deploy** 時，可能立即建置／公開 Production branch；**不能把首次部署當成沒有外部可見效果的預覽**。

- 在按下 Save and Deploy 前，確認要連的**學員 Repo**、Production branch、目前該分支實際內容、Pages／Workers 產品類型與網站可見性；若有草稿、個資、未確認的醫療／專業聲明或不願公開的品牌內容，**停止**。
- 若要先測試，請學員明確核准隔離的測試內容與獨立 Pages 專案／可驗證的測試分支策略；平台是否允許選擇、限制、部署可見性均以**當下 Dashboard**為準。不要自行創造 `qa-production-disabled` 分支並稱為 Cloudflare 官方標準方案；不存在或未核對的分支不得宣稱可使用。
- Preview 網址也可能公開可見，不是私人草稿；必要時先在授權的本地環境／受控預覽檢查，或配置經確認的存取限制。首次公開風險需獨立取得學員同意；Draft PR **本身不會阻止**平台對指定 Production branch 的首次部署。
- 只有 Cloudflare 真實 Deployment 紀錄、對應 commit SHA、可打開的網址才算已完成預覽；若 AI 唯讀，由學員在 Dashboard 完成設定並分享**非機密**狀態畫面／部署連結，AI 再比對。

## 三份規則，不要混讀成一份

| 工作位置 | 權威與閱讀順序 |
| --- | --- |
| ATP 研究／展示倉庫 | 根目錄 `AGENTS.md` 管理此 Repo；依任務挑選 `.ai/*/SKILL.md`，不把展示站的 Workflow 或正式網域拿去部署學員站。 |
| 下載的 AI 建站資料包 | ZIP **根目錄** `START-HERE.md` → ZIP 根目錄 `AGENTS.md`（由 `docs/student-builder-pack/STUDENT-AGENTS.md` 打包而來）→ `astro-site-entry` 選 A／B／C → 只讀該路線必要 Skill。ZIP 裡的 `docs/student-builder-pack/` 是來源位置，不能把其文件當另一套更高權威規則。 |
| 已建立的學員獨立網站 | 先檢查該站目前 Git／程式、根目錄 `AGENTS.md`、`PROJECT.md`、`package.json` 和實際部署；本次操作的原始碼／Git／平台證據優先於過期的 ZIP 或對話說法。只在需要跨代理接手時讀 `AGENT-HANDOFF.md`，不得拿新版 ZIP 覆蓋學員自己的 PROJECT。 |

`PROJECT.md` 記錄已確認的網站意圖／決策，不是可取代最新 Git 原始碼和部署事實的執行紀錄。Skills 各負責一種程序，並無「全部先讀一次」的要求。QA 與正式發布依 `astro-pr-preview`、`astro-starter-deploy` 與實際學員 Repo，**本文件不建立第二份 QA Checklist**。

## Muse 按摩師案例｜文件路由演練（不是跨平台實測）

輸入：「建立按摩師人格側寫，參考 ATP 幫他架站，確認有沒有 GitHub／Cloudflare 能力。」

1. `astro-site-entry` 判 C（除非使用者改選 B 或提供自己的舊站改走 A）；先確認按摩師的授權及真實服務內容，Demo 不能冒充真人資料。
2. 能力表逐項確認：若 Muse 無本機 Git，不能呼叫 `git status`，但如實具備 API 寫入則可走 GitHub 遠端 Branch／PR；不能因會呼叫 API 而宣稱已執行 Node Build。
3. 寫 Workflow 遭遇 403 → 保留一般檔案變更，停止受阻部分，依權限／人工完成路徑交接，不使用假 CI 結果。
4. Cloudflare 只有讀取 → 明確 `BLOCKED`；先說明首次 Save and Deploy 可能立即公開 Production，不擅自連接或部署。
5. 若沒有實際 Build、Preview、手機畫面與部署 SHA，這些全部標 **NOT TESTED**。人工核准前保持 PR Draft，絕不 Merge／Production。

**演練結果：文件可引導到上述路由與停止點；Muse、其他外部 AI 的真實工具相容性／權限補救及雲端部署均為 NOT TESTED。**

## 最低交接格式

`建站路線 A/B/C｜學員 Repo/PR（如有）｜AI 工具能力 YES/NEEDS AUTHORIZATION/NO/NOT TESTED｜Build｜Workflow 權限｜真實 Preview URL + SHA（如有）｜Production 狀態｜尚缺的人工作業｜是否取得指定版本發布核准`。各欄位無證據即填 `NOT TESTED` 或 `BLOCKED`，不得補造網址、身份、成功紀錄。
