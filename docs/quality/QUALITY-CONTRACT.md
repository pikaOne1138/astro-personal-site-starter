# Astro workshop quality contract

This file defines **what a passing test means**. A green build by itself is not a release acceptance.

## Truthful statuses

- **PASS**: an applicable assertion was actually executed against the stated commit and output.
- **FAIL**: an applicable invariant was violated, including a validator's inability to reject a known bad fixture.
- **NOTICE**: example/placeholder content, empty articles, or deliberate experimentation; never block technical builds solely for these.
- **NOT TESTED**: no evidence at this commit; never silently count as PASS.
- **BLOCKED**: tool access, unsupported platform, deployment or environment prevented the check.

## Invariants applicable to both learner types

1. Every internal link to a generated page or local asset resolves; a custom page path must be respected by navigation, hero CTAs, section patterns, footers and sitemap.
2. Unpublished Markdown stays out of public HTML routes, discovery pages, RSS, sitemap and public searchable JSON; new publishing surfaces require an explicit gate.
3. Public article content and search index are derived from the generated output, not from a parallel hard-coded metadata array.
4. No form, booking link, qualification, recommendation or newsletter is presented as successfully functioning without the actual integration and truthful data.
5. User-facing navigation, essential controls, keyboard focus and Escape behavior work. No purely decorative text alters accessible names.
6. Hidden skip links must be keyboard-accessible and must not be mistaken for overflowing visible content.
7. Animation is enhancement. Readable content must not remain permanently invisible; reduced-motion works.
8. A build success does not establish responsive quality. Review 1440, 1280, 768 and 390; add 375 for edge cases.
9. Real deployed Preview and its source commit must be matched; published historical deployment URLs may remain reachable.
10. Student starter package must stand alone. The same core output assertions run under a student-owned read-only PR CI, not only in the research repository.

## QA layers

| Layer | Validations | Required evidence |
| --- | --- | --- |
| Contract | StarterPlan, routes, Registry references, component Props | positive and negative fixtures |
| Output | Astro build, internal href/src, metadata, public articles, draft leaks, RSS, sitemap, Pagefind and JSON | generated dist and machine-readable result |
| Browser | navigation, search, dialogs, focus, keyboard, essential interaction | Playwright on representative pages |
| Visual | responsive, accessibility, contrast, visible content, reduced-motion | screenshot + audit, notes for subjective design |
| Delivery | ZIP install/export/build/validate, student CI, real CF Pages Preview | commit SHA + deployment ID/URL |

## Regression discipline

- Retain all previously proven W-series fixes, N-series fixes, editorial overlap fixes and effective F-series fault injections as permanent regression fixtures.
- Each defect is not VERIFIED until: a pre-fix failure is reproducible, the post-fix normal fixture passes, an injected fault fails the intended gate, and the generated learner export passes where applicable.
- A later commit invalidates earlier release-candidate acceptance until mandatory gates pass again at the new SHA.
- Keep the minimal student-side checks on every PR; schedule expensive full-layout screenshot work on teacher-side shared-component changes and before candidate release.
- No automatic merge, production deployment, history rewriting or third-party content destruction.

## Release decision

Do **not** claim complete acceptance until all high-priority defects are verified, no critical checker false positives/negatives remain, teacher and exported-student CI both pass, the actual ZIP is black-box exercised, and the latest Cloudflare Preview receives visual QA. Known low-priority exceptions must be listed as DEFERRED. Unknown or missing evidence is NOT TESTED.

## 機器可讀的清冊

下列 JSON 是驗證腳本直接讀取的資料，不要移動位置或改欄位名稱：

| 檔案 | 內容 | 讀取它的腳本 |
|---|---|---|
| `ASSET-COVERAGE.json` | Skill、元件、資產各自的驗證狀態與證據路徑 | `verify-quality-coverage.mjs`、`test-quality-coverage-regressions.mjs` |
| `COMPONENT-COVERAGE.json` | 每個 Astro 元件的 Props 與 QA 責任宣告 | `verify-all-astro-components.mjs`、`inventory-all-component-props.mjs` 等 |
| `HISTORIC-REGRESSIONS.json` | 歷史缺陷（W／N／F 系列）的目前狀態與證據 | `verify-historic-regressions.mjs`、`verify-historic-execution.mjs` |

狀態為 PASS 的項目必須有真實存在的證據檔，否則驗證會失敗。尚未驗證的維持 NOT TESTED。尚未完成的人工與獨立 Repo 驗收，記在 `open-acceptance.md`。

## 證據的層次

任何一層沒做，就不能拿其他層的 PASS 往上升級：

1. 原始碼的 Props 清單（只證明「宣告存在」）。
2. 合法與非法 Props 的 fixture 執行。
3. 實際 DOM、鍵盤、無 JS、四個寬度。
4. 跨 Layout、跨主題、跨 Starter 的整合。
5. 修復前後的比較，以及最終 SHA 的驗收。

驗證器（尤其是 URL 驗證）必須有負向注入：證明它真的會拒絕不安全的輸入，並記錄 id、元件、fixture、期望診斷、實際診斷、checkout SHA 與結果。

## 缺陷之外還要覆蓋的範圍

1. `src/data/blocks.registry.json` 的所有 Block：registry 的結構檢查已有；建置、行為、Props、在兩種網站類型的渲染，是另一張驗收矩陣，不能因為「存在」就當作已證明。
2. 所有 Layout 方向原型：四個寬度；首頁原型與完整多頁網站要分開看。
3. 編輯式配方與 Effects：代表性的整合、鍵盤、reduced-motion、內容可見；不宣稱所有交叉組合都測過。
4. 學員生命週期：新站、發布文章、撤回、搜尋、新增自訂頁面、安全的 Preview、復原；各維持一個真實的知識型與助人者網站。
5. 兩種部署方式：實際的正式環境存取要和模擬的 PR 建置分開驗證，且需要明確授權。
6. 最終候選版：教師端 CI、解壓 ZIP 後的學員端 CI、瀏覽器 QA、Cloudflare 部署 SHA 要一致。沒跑過的就是 NOT TESTED。
