# ATP｜Design Brief → Starter 交接規則（Task 5＋6）

## 目的與邊界
本流程保留兩份既有資料契約，不發明第三種 JSON：
1. `.ai/astro-design-consultation/references/design-brief-contract.md` 的 **13 段 Markdown Design Brief** 記錄設計意圖、已確認／未確認事實和取捨。
2. `src/data/starter-config.ts` 的 **StarterPlan / Site Brief JSON** 是已存在的產站輸入；使用現有 `checkStarterPlan` 與 Layout Registry 驗證。

學員可先直接用 `/starter/` 選方向與匯出，**不強迫先做諮詢**；諮詢結束也不可聲稱 Brief 能直接匯入 Starter。

## 兩者映射
| Brief 欄位 | Starter 可承載的資料 | 交接規則 |
| --- | --- | --- |
| siteKind | `kind` | 只能 knowledge / helper |
| audience / pageJob / designDecisions | `notes`、產站後 `PROJECT.md` | 保存原意與取捨；不可變成捏造文案 |
| productTruth / contentInventory | `content`、`about`、`serviceFacts`、已授權 assets | 僅 user-provided / confirmed 可成公開事實；missing 不填假資料 |
| designDirection / layoutPlan / systemSelection | `layoutSlug`、`visualTheme`、`sectionPatterns` | Layout/Pattern ID 必須核對目前 Registry；不可直接插入 recipe/Block ID 到未定義欄位 |
| informationArchitecture | `navigation` | 必須符合站型、路由與兩頁以上啟用的限制 |
| trustAndCTA | `primaryCta`、已確認的 `serviceFacts` | CTA 必須指向已啟用真實頁面；外部未配置預約不可假裝成功 |
| referenceInsights / alternatives / handoffAndQA | 保留於 Brief 與 PROJECT 決策背景 | 不能硬塞到 StarterPlan 的未知欄位；QA 一律 evidence-based |

## AI 接手順序
1. 讀 Brief 全部 13 段，逐項標記 confirmed、proposed、missing、not-verified；保留學員拒絕的設計及理由。
2. 讀最新 `src/data/starter-config.ts`、`src/data/layout-directions.json` 與 Pattern Registry；未知 ID 不猜。
3. 若 Brief 具備已確認的必要欄位，透過現有 `/starter/` 選項形成 Site Brief JSON；沒有明確輸入端時不可聲稱可以直接上傳 Brief 自動導入。
4. 跑既有驗證／匯出程序，不能將 `proposed` 當學員 confirmed；檢查最終 `PROJECT.md` Layout ID 與 `site.config.json` 一致。
5. 先預覽再發布，未經學員授權不得 Merge、Production 或 DNS。

## 兩個合約 Fixture
`docs/brief-handoff/fixtures/knowledge.plan.json` 與 `helper.plan.json` 使用示範資料，供合約驗證；**不是自動從 Brief 生成的正式內容**。學員有權直接選擇不同 Layout。

## 驗收和非目標
可驗證：兩個 Fixture 的 Layout ID 站型一致、導航/CTA 合法、匯出器不錯誤、學生 PROJECT 記錄正確。尚未驗證：跨模型理解品質、學生偏好與畫面美感。它們留到試營運 QA。
