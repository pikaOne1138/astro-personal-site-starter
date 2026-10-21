# ATP 學員端到端驗收 SSOT

> 狀態：待實測。此文件是本輪唯一的學員旅程測試規格；PR #61 的 AGENT-HANDOFF.md 負責 AI 交接與每次發布的人工核准紀錄，兩者職責不同。不得把本文件勾選或 CI 綠燈當成學員實際通過。

## 範圍與規則
- 對象：沒有程式背景、使用電腦與支援專案操作 AI 的學員。
- 三條入口（既有網站復刻／ATP Starter／直接 AI 訪談）都應收斂到獨立 Astro Repo、PR、真實 Preview、人工驗收、正式發布與維護。
- 不要求學員使用 CLI；GitHub／Cloudflare 首次授權可以由講師或 Computer Use 陪跑，不列入本輪 UI 必修項。
- 任何需 GitHub／Cloudflare 真實權限的步驟，不得用模擬畫面標為通過。
- 每次測試記錄日期、執行者、AI 工具／模式與訂閱條件、Repo、Commit SHA、平台、Preview 與 Production URL、截圖／Actions 證據、錯誤及後續修正。沒有證據一律「未測」。
- 測試分開標記：學員能否理解下一步（UX）／軟體是否真的成功（功能）。
- 嚴禁在未明確同意時 Merge、改 DNS、正式發布或將示範資歷／表單成功當真實資料。

## 七關學員端到端驗收
| 關卡 | 學員成功條件 | 系統驗收與證據 | 狀態 |
| --- | --- | --- | --- |
| 01 尋找入口 | 從 Guide 能選擇適合自己的三條路線之一 | 入口、課前與 FAQ 無矛盾；學員能描述下一步 | 未測 |
| 02 Starter 草稿 | 規劃內容後關閉、重新開啟，可接續 | Layout、Theme、品牌、訪談文字、導覽、色票不遺失；清除可確認；跨裝置不宣稱同步 | 未測 |
| 03 訪談交接 | 可與 AI 訪談並帶回結果 | 可匯入合法 Site Brief JSON；惡意、不相容與格式錯誤檔案會拒絕；圖片限制清楚 | 未測 |
| 04 建站交接 | 能把 Site Brief 和建站 ZIP 交給 AI | 確認模式具備檔案讀寫、Build、GitHub PR 能力；無能力明確阻擋 | 未測 |
| 05 獨立 Preview | AI 建立學員自己的 Astro 網站 | Build 成功；PR head SHA 與實際 Preview 部署 SHA 相符；1440／1280／768／390，檢查內容／連結／互動 | 未測 |
| 06 修改驗收 | 學員用截圖指出一項修改並看新版本 | 不擅自更動其他設計；回報未通過項；人工確認不是 CI 取代 | 未測 |
| 07 正式發布和再修改 | 同意指定版本後才發布，知道下次怎麼改 | Merge／Production SHA 與正式 URL；內頁、圖、CTA、搜尋、canonical、robots、sitemap、還原指引 | 未測 |

## PR 分工
- A：草稿持久化、匯入／清除、資料恢復；禁止為此引入後端或會員系統。
- B：FAQ／Prepare／Guide、Layout 成熟度白話化、推薦入口、成本與工具說明。保留 25 Layout、三條路線與完整欄位。
- C：首次 Preview 與明確發布指令、正式站 QA。沿用既有 astro-pr-preview／astro-starter-deploy Skill，禁止自動 Merge。
- 三個 PR 都從 main 分支，各自 Draft，待人工審查後才合併；B／C 以此文件為共同驗收來源，不複製維護其他版本。

## 測試紀錄格式
日期／測試者／路線／工具版本／Repo／PR／SHA／Preview／正式站：
每關：UX PASS／FAIL／未測；功能 PASS／FAIL／未測；截圖或 Actions URL；卡住的原話；修正 PR。
最後人工核准：學員、版本 SHA、核准範圍與時間。沒有明確授權不進行合併／發布。
