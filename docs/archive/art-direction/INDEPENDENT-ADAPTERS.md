> **已封存（2026-10-23）。** PR 當時的交接、審查與 QA 紀錄。仍有效的規則與尚未簽核的人工驗收清單已併入 `docs/layout/layout-assembly.md`。結構辨識與 QA 證據分級的機器可讀版本是 `docs/art-direction/pr47-layout-handoff-registry.json`。僅供歷史查閱，不再維護。

# Subject Atlas／Practice Compass：獨立組裝與本輪邊界

> 2026-10-14 目標校正：本文件只描述已實作的技術組裝，不是 PR B 的完整目標。PR B 要擴充同用途、同內容仍可辨識不同結構的版型與內頁；不要求每款有不同用途。最新研究與擴充 brief 見 `research-reset-2026-10-14.html`，候選清單見 `template-expansion-research.json`。本輪截圖驗收仍延期，候選不算已交付。

使用者於 2026-10-14 改變本輪優先順序：先完成獨立 Starter／Adapter，截圖驗收本輪不做。這不是視覺 PASS，也不以截圖環境限制阻擋本輪技術組裝。

## 已實作的入口

```bash
node scripts/export-art-direction-starter.mjs plan.json ./my-site --allow-in-progress
cd my-site
npm install
npm run build
npm run verify
```

`--allow-in-progress` 是明確的測試／組裝輸出；`--require-ready` 或省略 opt-in 會拒絕。兩套 Definition 狀態為 `in-progress`、有非空 Adapter，但不是 `ready`。本輪不宣稱視覺忠實度、真機、搜尋介面 Browser 操作或正式內容核准。

本入口重用既有 `scripts/export-starter.mjs` 的輸入、選單、路由、Section Pattern、SEO、草稿、安全輸出檢查，再套上所選的真實獨立 renderer。內部種子暫用既有 kind-compatible scaffold key；最後生成的 `layoutSlug` 和 `layoutAdapter` 都是使用者所選的新 layout，不交付田野筆記或臨床版型假冒新設計。輸出無 research repo 的依賴，亦不會覆蓋既有學員網站。

為避免與仍開發中的 PR #46 衝突，沒有修改其 Gallery、Planner、既有 exporter 或 `src/data/layout-assembly/definitions.mjs`。這是一個可用的 additive adapter 匯出入口；將它接入主要規劃器／Gallery 的工作仍留給 #46，不宣稱此 UI 已整合。

## 自有構圖與多頁內容

- Subject Atlas：3:1 字體 Hero／主題數字、左主題 rail、不等分目錄、最近文章、表格 Archive、窄閱讀欄、主題詳細頁。文章與主題數量由實際公開 Content Collection 生成，沒有重用假 sample 全文。
- Practice Compass：2:1 字體 Hero／揭露側欄、三種訪客意圖、適合／不適合對照、服務資訊 ledger、FAQ、關於、聯絡、隱私。沒有醫療資格、價格、預約或表單成功的虛構值。
- 共用：一致的主要與頁尾導覽、既有兩層原生 details 導覽、Pagefind 全文搜尋頁、RSS、Sitemap、robots、404、noindex 與 canonical。自訂附加頁可用 `page-*` IDs／相對路徑；必要核心路徑不可關閉或占用。
- 狀態：沒有文章／主題／服務／FAQ／聯絡時呈現誠實空狀態。未知文章主題在 Build 時拒絕，草稿不應產生直接路由或進入 feed／search。
- 兩套是文字優先、無必須圖片的 Layout；目前若提供圖片或 Logo 輸入會明確拒絕，不假裝已移植圖片。品牌 HEX／完整五色 palette 與三種既有 typography preset 可設定。

## Site Brief v1 的 additive 欄位

`docs/art-direction/fixtures/*.json` 是可執行的 QA 範例，名稱與內容明確標示測試用，不是真實營運者。

| 欄位 | 語意 |
|---|---|
| content.headline／intro | 首頁標題與介紹，未填時沿用品牌資料或透明的閱讀引導 |
| artDirection.topics | knowledge 主題陣列；slug、title、description |
| 文章 frontmatter topics | 對應已設定的主題 slug；公開文章缺少 topic 時仍可在 Archive 閱讀 |
| artDirection.scope | helper 的 suitable／notSuitable 字串陣列 |
| artDirection.serviceFacts | scope、credentials、format、duration、price、cancellation；未填明示待設定 |
| artDirection.faq | question／answer 陣列；原生可開合 details |
| artDirection.contact | email、HTTPS url、HTTPS bookingUrl；未設定無假表單 |
| pageContent | 按選單 ID 定義內頁段落，例如 about、page-contact、page-privacy |
| contentDirectory | 相對 Site Brief 目錄內的子資料夾；只複製 articles／drafts 下的平面 Markdown，不接受 traversal 或 symlink |

文章使用現有 title、description、publishedAt、draft、tags；新增 topics 陣列。作者需提供實際文稿與發布狀態，匯出器不生成假文章。保留公開 articles 與未公開 drafts 資料夾隔離，以及舊格式 `draft:true` 排除。

## 檢查與交接

`node scripts/verify-art-direction-export.mjs` 執行兩套各自安裝依賴、Root Build、既有驗證器／故障注入、子路徑 Build、自己的 canonical、所有選單目的地、核心頁、Pagefind／中文索引、實際文章 topic／RSS／Sitemap、草稿排除、空站。另檢查拒絕覆寫、錯誤 slug、核心路徑占用、危險 URL／mail header、content path traversal、未核准 Ready 匯出，以及 public article 未定義 topic 的 Build 失敗。

新增 `.github/workflows/art-direction-export.yml`，只跑本兩套的技術檢查並上傳結果；不啟動截圖流程。

#46 接線時可使用 `scripts/art-direction-adapters.mjs` 的 `{slug,kind,version,compose,requiredAssets,requiredPages}` 介面及 Definition。`compose` 接收現有 Scaffold 目錄與已驗證 settings；不得先覆蓋修改過的學生網站。保留本兩套 renderer／核心頁結構，將 Gallery／主要 exporter 導入新 manifest 是後續明確的整合工作。

注意：這兩套新增 source 在 `src/data/art-direction-adapters/`，是打包原始碼，不是展示站的 Blocks，不加入 Blocks Registry。

## 離線資料包

`AI-建站資料包.zip` 現在同時包含新 CLI、adapter module、兩套 source、填寫用的兩份 JSON 與 `ART-DIRECTION-STARTER.md`。離線解壓後可從包內匯出，不必存取研究 repo；套件仍從標準 npm 安裝。已實際從 ZIP 解壓並匯出兩套。`build-student-pack.mjs` 僅添加新入口檔案，不改舊 exporter 或 Gallery。
