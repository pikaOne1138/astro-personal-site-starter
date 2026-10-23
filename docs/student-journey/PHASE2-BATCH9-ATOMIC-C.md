# Phase 2｜Batch 9 Atomic C：剩餘 21 行語義拆解

Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`. 來源行原封不動保留在 Frozen Skills。下表逐行列出可獨立審核的子項；**分號分隔項目須逐個比對，不得把整行宣稱為單一 Canonical 規範**。

| 來源工作 ID | 子義務、驗收、例外（逐項保留） | 分型 | Frozen source |
|---|---|---|---|
| B9C-ASM48 | 01 先讀獨立 Home.astro 與定義；02 再讀 Prototype index.astro 與 layout-library.css；03 生成器已拷貝匹配首頁屬現況，不是新的需求 | PROCEDURE / ARCHITECTURE | [ASM L48](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L48) |
| B9C-ASM51 | 01 只使用必要 Registry Blocks；02 導覽與文章歸檔須有真路由；03 聯絡及預約 URL 必須實際可用 | NORMATIVE / ACCEPTANCE | [ASM L51](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L51) |
| B9C-ASM52 | 01 映射 primary/accent/background/text/focus tokens；02 文字及按鈕維持對比；03 不得盲目重新配色 | NORMATIVE / ACCEPTANCE | [ASM L52](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L52) |
| B9C-ASM60 | 01 生成至獨立目錄或學生 Repo；02 不得預設覆寫研究站；03 不得預設覆寫既有學生檔案 | NORMATIVE | [ASM L60](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L60) |
| B9C-ASM61 | 01 Build 獨立網站；02 驗證 canonical/base；03 驗證站內連結與選單；04 佔位內容不得冒充真實資料 | ACCEPTANCE / NORMATIVE | [ASM L61](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L61) |
| B9C-ASM62 | 01 有真實 Preview；02 Merge 前學員同意；03 正式發布前學員同意 | ACCEPTANCE / CONSENT | [ASM L62](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L62) |
| B9C-ASM63 | 01 參考 Deploy 與 PR Preview Skills；02 GitHub Pages Preview 需驗真；03 Cloudflare Preview 需驗真 | PROCEDURE / ACCEPTANCE | [ASM L63](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L63) |
| B9C-ASM64 | 01 告知哪些能力實際自動化；02 告知仍需內容及 UI 調整；03 交付截圖與未完成事項 | EVIDENCE / HANDOFF | [ASM L64](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L64) |
| B9C-ASM67 | 01 學員提示詞樣例：選 JSON、獨立 Starter、Layout 修改、PR Preview、同意後發布；此為示例，不額外新增強制門檻 | EXAMPLE | [ASM L67](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L67) |
| B9C-ASM77 | 01 collective team/events 選填資料結構；02 成員需 owner 核准；03 活動需確實確認；04 空資料顯示 pending；05 禁止虛構名冊、日期與可預約性 | OPTIONAL_SCHEMA / NORMATIVE | [ASM L77](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L77) |
| B9C-ASM78 | 01 trust-path serviceTiming 選填；02 正整數分鐘才產生比例時序與真實總長；03 缺資料顯示 pending；04 不虛構 50 分鐘；05 不是預約系統或 CRM | OPTIONAL_SCHEMA / CONDITIONAL / BOUNDARY | [ASM L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L78) |
| B9C-ASM79 | 01 五款知識 Home Adapter 讀取真實已發布 Collection；02 排除 draft:true；03 Reading Atlas 讀 owner 的 reading.records 和 annualBook | ARCHITECTURE / NORMATIVE | [ASM L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L79) |
| B9C-ASM80 | 01 不重新加入已移除的裝飾替代面板；02 保留垂直學習路徑與收藏抽屜；03 保留階梯教練卡片及名冊／活動帳本；04 保留五站路徑 | NORMATIVE | [ASM L80](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-site-assembly/SKILL.md#L80) |
| B9C-DEP11 | 01 讀學生 ZIP 的 AGENTS/Preview/Publishing Skills；02 讀學生 astro.config/package/workflows；03 deploy.yml 僅 main 人工發布、pr-check.yml 僅 Build Artifact；04 核對學生 Repo、Domain、平台，不套老師專屬工作流 | PROCEDURE / ARCHITECTURE | [DEP L11](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L11) |
| B9C-DEP15 | 01 學生獨立 ZIP 在自己新 Repo 使用；02 不 Fork/Clone 教師 Repo；03 不直接動教師展示站 main | NORMATIVE | [DEP L15](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L15) |
| B9C-DEP32 | 01 不為 CI 綠燈移除 noindex；02 未經核准不可讓 Demo／Draft 受搜尋索引 | SECURITY | [DEP L32](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L32) |
| B9C-DEP33 | 01 用正式域名測首頁及文章內頁；02 測標籤及全文搜尋；03 測 RSS、Sitemap、404 | ACCEPTANCE | [DEP L33](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L33) |
| B9C-DEP34 | 01 四尺寸 1440／1280／768／390；02 手機選單；03 鍵盤；04 連結可操作 | ACCEPTANCE | [DEP L34](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L34) |
| B9C-DEP35 | 01 建立測試文章；02 預覽；03 獲同意後才 Merge；04 確認真正上線 | PROCEDURE / ACCEPTANCE | [DEP L35](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L35) |
| B9C-DEP36 | 01 交接正式 URL；02 交接 Preview 流程；03 交接更新位置；04 交接還原方案；05 未串接服務誠實列出 | EVIDENCE | [DEP L36](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L36) |
| B9C-DEP40 | 01 依平台分 GitHub Pages、Cloudflare Pages、Workers；02 研究站 Artifact/workflow_run Preview 不等於學生具備；03 Cloudflare Git Preview 須驗證連線與部署紀錄；04 不擅自變更研究站既有工作流程 | ARCHITECTURE / NORMATIVE | [DEP L40](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-starter-deploy/SKILL.md#L40) |

## 交叉語義保留

- ASM L67 是提示詞示例，不計成新增規範。
- ASM L77／L78 的 optional schema、pending 表現及禁止虛構各屬不同語義面；不得全部簡化為一句「保持真實」。
- DEP L11／L40 要維持學生 Repo 與教師研究站分離，尤其只讀 CI Artifact 不可當 Live Preview。
- DEP L32 中 CI 安全門檻與 Demo/Draft 索引授權是兩條不同禁止條件。
- DEP L36 的交接要求只構成應提供的證據欄位，不能當成已經完成部署的證據。

## 驗收 Gate

Batch9 Atomic A 4 行、Atomic B 8 行、Atomic C 21 行，共 **33/33 行完成第二輪子義務列示**；Atomic C 仍有多子項彙整在單一表列，其子項尚未全部各配一個獨立 ID，**不宣稱完備的最小原子化**。其他 Batch1–8 仍待同樣審查。來源行映射仍為 103/103。

Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skills 不變，不 Merge、不部署。
