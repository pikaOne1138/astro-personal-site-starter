# Phase 2｜Core Skills B Atomic Batch 7 — 文章發布生命週期

Frozen main: `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`.

本批對 Publishing Skill 尚未覆蓋的 8 行建立來源錨定候選，區分規範、驗收與操作程序。這些是 provisional 子項，**非獨立 canonical 數**。

| ID | 候選要求 | 類型 | 凍結來源 |
|---|---|---|---|
| B7-PUB-L70-01 | 經授權新增文章可用單一 Markdown 檔完成，不必維護 TypeScript 陣列 | 驗收 | [L70](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L70) |
| B7-PUB-L70-02 | 公開文章在路由、文章頁、標籤與日期、相關連結及搜尋可見 | 驗收 | 同上 |
| B7-PUB-L70-03 | RSS、Sitemap、Metadata、Preview Index 策略一致 | 驗收 | 同上 |
| B7-PUB-L70-04 | 桌機與手機可正確閱讀及導覽，不得虛構發布成功 | 驗收／規範 | 同上 |
| B7-PUB-L72-01 | 文章公開網址要改動時須先揭露取捨，不可擅自實作 | 條件式規範 | [L72](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L72) |
| B7-PUB-L72-02 | 法律／醫療內容、資料所有權變更須先揭露取捨 | 條件式規範 | 同上 |
| B7-PUB-L76-01 | 「新增草稿」只追問缺少的真實材料並核對 slug／日期 | 操作程序 | [L76](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L76) |
| B7-PUB-L76-02 | 寫入實際 Collection，確認草稿不在文章清單、RSS、Sitemap、搜尋 | 操作／驗收 | 同上 |
| B7-PUB-L76-03 | 公開 PR Preview 可能洩露內容；敏感草稿只用受限環境預覽 | 規範 | 同上 |
| B7-PUB-L77-01 | 修改舊文章時保留 slug／publishedAt | 規範 | [L77](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L77) |
| B7-PUB-L77-02 | 有 updatedAt 欄位且確實修改才更新 | 條件式程序 | 同上 |
| B7-PUB-L77-03 | 交付原文與修改差異 | 證據／交接 | 同上 |
| B7-PUB-L78-01 | 排定公開須先完成文字、SEO、內鏈、圖片來源與手機 QA | 發布準備 | [L78](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L78) |
| B7-PUB-L78-02 | 沒有實際排程服務不可聲稱能定時自動發布 | 規範 | 同上 |
| B7-PUB-L79-01 | 發布須確認學員同意稿件 | 授權 | [L79](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L79) |
| B7-PUB-L79-02 | Branch／PR 經 Preview 驗收後再 Merge／Production | 程序 | 同上 |
| B7-PUB-L79-03 | 發布後核對 URL、清單、RSS、Sitemap、搜尋（有 Pagefind 時） | 驗收 | 同上 |
| B7-PUB-L80-01 | 「隱藏」先區分列表隱藏、draft 與取消公開 URL | 條件式程序 | [L80](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L80) |
| B7-PUB-L80-02 | 刪除或重導時須交代 SEO 與外部連結影響並等同意 | 規範 | 同上 |
| B7-PUB-L80-03 | 優先保留可恢復的 Git 歷史，不直接刪除原稿 | 程序／保全 | 同上 |
| B7-PUB-L81-01 | 新文章桌機與手機共用導航、列表、相關文章一致 | 驗收 | [L81](https://github.com/pikaOne1138/astro-personal-site-starter/blob/2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c/.ai/astro-content-publishing/SKILL.md#L81) |
| B7-PUB-L81-02 | 一般頁面須用 astro-page-management，不塞進 Article Collection | 架構邊界 | 同上 |

## 跨來源對照（待裁決）

- L76 與 Publishing L28／L37／L56：草稿存放、公開輸出隔離及實際負向驗證有部分重疊，保留不同證據面。
- L77 與 Publishing L36：slug／日期規範有 SAME_CANDIDATE，原始來源兩行仍需雙向保留。
- L79 與 Assembly L23、P0 發布授權：同一授權主題，稿件認可與版本／範圍／Production 行動須保留各自限制。
- L80 與 L28、L58：撤回程序與歷史部署仍可曝光是不同規範；Git 歷史保全不等於機密保護。
- L81 與 astro-page-management：一般頁面與文章系統為不同架構職責。

## 計數與 Gate

由 Batch1–6 工作 ID 反查：實際已有 **50/103** 個不重複規範／程序來源行，不是前輪摘要的 49/103。Batch7 新增 **8 個來源行、22 個工作候選**，合計 **58/103 行**、**45 行未覆蓋**。先前候選計數仍待以工作 ID 唯一集合稽核，不用它作條款分母。

Phase 2 IN PROGRESS；Phase 3/4 BLOCKED。原始 Skill 不修改，不 Merge，不部署。
