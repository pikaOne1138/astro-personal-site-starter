# PR #47｜25 款 Art Direction 擴充矩陣
更新：2026-10-14。本文件是施工清單，不是驗收報告。PR 維持 Draft。只修改本 PR 自有的 Layout prototype、文件、後續自有定義；#46 Gallery／Starter Generator／主 Adapter 不在範圍內。

## 數量邊界
- Main 既有：12 首頁 Layout prototypes（6 knowledge / 6 helper），保留。
- #47 先前既有：Subject Atlas、Practice Compass 兩個多頁 prototype，保留。
- 本次研究：knowledge 新增 6；helper 新增 5，另 1 筆 Practice Dossier 用於強化既有 Clinician。
- 目標：25 個可辨識 Layout 方向（13 knowledge / 12 helper）；不是 25 個已完成可交付的 Starter。
- Theme、Block、Effect 與 Layout 不混計。對照屬結構近鄰，不代表一個新方向「替換」原方向。

## 原有 12 與研究方向

| Kind | 原有版型 | 研究方向（slug） | 處置 | 批次 | 結構性差異 |
|---|---|---|---|---|---|
| knowledge | field-notes | 側欄日誌 sidebar-journal | 保留＋新增 | 1 | 原版邊注／觀察註解；新款一般文章主流＋作者分類右側欄 |
| knowledge | essayist | 個人刊物 editorial-frontpage | 保留＋新增 | 2 | 原版單篇長文；新款同屏大頭條＋兩則次要文章 |
| knowledge | curator | 卡片刊物 card-journal | 保留＋新增 | 2 | 原版不對稱展牆；新款同權重文章卡格網 |
| knowledge | learning-lab | — | 保留 | 原有 | 學習路線與實作單元 |
| knowledge | radio-letter | — | 保留 | 原有 | 聲音與播出時間線 |
| knowledge | reading-atlas | 極簡短箋 compact-dispatch | 保留＋新增 | 3 | 年份月份地圖 vs 緊湊日期文章流 |
| knowledge | — | 影像故事 visual-stories | 新增 | 3 | 多篇圖文敘事與圖說，不是展物收藏 |
| knowledge | — | 雙欄閱讀台 split-reader | 新增 | 3 | 固定主文預告 5/12＋索引 7/12 的閱讀角色 |
| knowledge | subject-atlas (#47) | 與側欄、卡片刊物比較 | 保留＋強化 | 4 | 主題目錄，而非時間流或等權卡片 |
| helper | companion | 人物名片 portrait-profile | 保留＋新增 | 1 | 長信情感入口 vs 肖像與個人身分主角 |
| helper | coach | 服務目錄 service-catalogue | 保留＋新增 | 2 | 行動計畫 vs 可比較的服務資訊物件 |
| helper | somatic | 工作室章節 studio-chapters | 保留＋新增 | 2 | 沉浸氛圍影像 vs 章節導航與工作方式 |
| helper | trust-path | 問答對話 question-led-practice | 保留＋新增 | 3 | 五站旅程 vs 提問與回答貫穿所有頁 |
| helper | — | 觀點服務誌 editorial-practice | 新增 | 3 | 服務觀點文章為主、本人與服務是側向入口 |
| helper | clinician | 專業資料冊 practice-dossier | 強化，不新增一款 | 4 | 現有版型深化為可核實的專業揭露資料冊 |
| helper | collective | — | 保留 | 原有 | 多人協作與活動 |
| helper | practice-compass (#47) | 與服務目錄／問答對話比較 | 保留＋強化 | 4 | 訪客三個決策入口與適配對照 |

## 批次與每款交付規格
1. 第一批：sidebar-journal、portrait-profile。完整首頁、archive/services、detail、about、同款導覽和 footer。低內容 fallback。
2. 第二批：editorial-frontpage、card-journal、service-catalogue、studio-chapters。同一內容下證明頭條主次、等權格網、服務目錄、章節式構圖區別。
3. 第三批：visual-stories、compact-dispatch、split-reader、editorial-practice、question-led-practice。保持長文章可讀，少文章／無照片仍能降級。
4. 第四批：clinician 強化、subject-atlas / practice-compass 已知契約修復、整庫結構對照與四尺寸 QA。

每個新增 slug 需明示：kind、首頁／索引／詳情／About 路由、Hero 與欄比、文章或服務資料契約、圖片缺失 fallback、手機 DOM 順序、與最近兩款的至少三項結構差異、Build、Preview、視覺 QA 結果。缺失者保留 in-progress，不標 ready。

## 當前施工紀錄
- 已提交 sidebar-journal 原型，四條靜態路由透過 Astro rest-page getStaticPaths 輸出；待 build 與視覺 QA。
- 已提交 portrait-profile 原型，四條靜態路由透過 Astro rest-page getStaticPaths 輸出；待 build 與視覺 QA。
- 這兩款仍屬「第一批實作中」，未接 #46 主 Adapter，也未完成獨立 Starter 驗收。
- 其餘研究候選尚未實作，不得在 UI 或報告計為完成。
- 獨立 Starter / Adapter 截圖驗收本輪延期；本地 prototype 的 1440／1280／768／390 實際目視 QA 仍待執行。
- 不 Merge、不部署 Production、不改 #46 的程式。
