# Phase 2｜跨來源 Canonical／Alias 稽核第一輪（不改動既有 ID）

基線：main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本文件只登錄有來源依據的候選關係，不新增已核准 canonical。Batch9 C 中以 01/02/03 形式藏在一列的欄位需先有可穩定引用 ID。這份裁決保留範圍、平台及情境，避免「看起來相同」就刪除。

## A. 可追蹤子 ID（由既有 C 批逐項細分）

| 父 ID | 可追蹤子 ID | 來源與內容 | 類型 |
|---|---|---|---|
| B9C-DEP32 | B9C-DEP32-01 | 禁止為 CI 綠燈移除 noindex | NORMATIVE |
| B9C-DEP32 | B9C-DEP32-02 | 未經核准禁止開放 Demo/Draft 搜尋索引 | NORMATIVE |
| B9C-DEP40 | B9C-DEP40-01 | 部署流程依 GitHub Pages／Cloudflare Pages／Workers 選擇 | PROCEDURE |
| B9C-DEP40 | B9C-DEP40-02 | 教師站 Artifact/workflow_run 不代表學生具備 Live Preview | BOUNDARY |
| B9C-DEP40 | B9C-DEP40-03 | Cloudflare Git Preview 需核實專案連線與實際部署紀錄 | ACCEPTANCE |
| B9C-DEP40 | B9C-DEP40-04 | 不得擅改研究站既有成功部署 Workflow | NORMATIVE |
| B9C-ASM77 | B9C-ASM77-01 | collective team/events 為選填欄位 | ARCHITECTURE |
| B9C-ASM77 | B9C-ASM77-02 | 團隊成員身分需要擁有人核准 | NORMATIVE |
| B9C-ASM77 | B9C-ASM77-03 | 活動日期與事件需真實確認 | NORMATIVE |
| B9C-ASM77 | B9C-ASM77-04 | 空資料顯示 pending；不得編造名冊、日期、可預約性 | NORMATIVE |
| B9C-ASM78 | B9C-ASM78-01 | serviceTiming 為選填內容欄位，而非排程或 CRM | ARCHITECTURE |
| B9C-ASM78 | B9C-ASM78-02 | 正整數分鐘才得計算比例時序與總時長 | CONDITIONAL |
| B9C-ASM78 | B9C-ASM78-03 | 缺時長顯示 pending，不捏造 50 分鐘 | NORMATIVE |
| B9C-DEP36 | B9C-DEP36-01 | 交付正式 URL、Preview 使用方法 | EVIDENCE |
| B9C-DEP36 | B9C-DEP36-02 | 交付內容更新位置與還原方法 | EVIDENCE |
| B9C-DEP36 | B9C-DEP36-03 | 誠實列出未串接的外部服務 | EVIDENCE |

來源固定對應：
- [Assembly L77–L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L77-L78)
- [Deploy L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L32)
- [Deploy L36–L40](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L36-L40)

## B. 跨批次語義關係（暫定、未核准合併）

| A | B | 判定 | 不得遺失的適用範圍 |
|---|---|---|---|
| B9C-DEP32-01 | B5-PUB62-03 | PARTIAL_OVERLAP | 一者特指 noindex，一者概括 CI Gate，不能直接合併或互相取代 |
| B9C-DEP32-02 | P0-CANON-INDEX-ENABLE | PARTIAL_OVERLAP | P0 明確要求內容、安全、預覽及 Owner 同意後，僅 Production 可開索引 |
| B9C-DEP40-02 | P0-CANON-PRVIEW-MISSING | PARTIAL_OVERLAP | 教師 Workflow 不能當學生 Preview，與學生實際無 Preview 時如實回報不同 |
| B9C-DEP40-03 | B9A-DEP25-01 | PARTIAL_OVERLAP | Cloudflare Git 專案連線和實際 Preview URL／SHA 是獨立證據 |
| B9C-ASM77-02 | B5-PUB12-02 | PARTIAL_OVERLAP | 團隊成員明確核准與不得虛構資格／推薦可建立關聯，不等於完全同義 |
| B9C-ASM78-02 | B9C-ASM78-03 | DISTINCT | 有正整數才做比例與沒有數值就顯示 pending，是不同輸入分支 |
| B9C-DEP36-01 | B9-ASM-L64-1 | PARTIAL_OVERLAP | URL/Preview 交接與自動生成／UI 待辦交接的證據欄位不同 |
| B9C-ASM77-01 | B9C-ASM77-02 | DISTINCT | 選填 Schema 不是團隊成員身份核准政策 |

表中的 PARTIAL_OVERLAP 與 DISTINCT 都屬初判，**沒有任何一組可直接視為正式 Canonical 合併**；對於 noindex 特指條件，不可因概括 CI Gate 條款而抹除。

## C. 零遺失 Gate

- 現有 103/103 是 Frozen Core Skills B 來源行追蹤覆蓋；不是 103 條唯一規範，也不是整個 Repo 所有 Skills 完全稽核。
- 已在 Batch9 C 下補可引用的子 ID，但原 C 檔及先前各批仍需一致性機械比對、複合義務續拆。
- P0 登錄簿暫計 86 末端候選與四組同源 Alias；不得以 82 當最終規範母數。
- 本輪**沒有**宣告新增核准 Canonical ID、刪除舊 ID 或合併相似義務。
- Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skill 不修改、不 Merge、不部署。
