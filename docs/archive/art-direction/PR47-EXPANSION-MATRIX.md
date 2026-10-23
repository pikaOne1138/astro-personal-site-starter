> **已封存（2026-10-23）。** PR 當時的交接、審查與 QA 紀錄。仍有效的規則與尚未簽核的人工驗收清單已併入 `docs/layout/layout-assembly.md`。結構辨識與 QA 證據分級的機器可讀版本是 `docs/art-direction/pr47-layout-handoff-registry.json`。僅供歷史查閱，不再維護。

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
- 第二批四款皆已有靜態多頁原型：editorial-frontpage、card-journal、service-catalogue、studio-chapters；各自設計首頁、索引、詳細頁與 About。仍待 Build 與實際視覺 QA，不視為 ready。
- 第三批五款已各提交 4 條 Astro rest-route 原型：visual-stories、compact-dispatch、split-reader、editorial-practice、question-led-practice；待 build／瀏覽器驗收，並非 Ready。
- 獨立 Starter / Adapter 截圖驗收本輪延期；本地 prototype 的 1440／1280／768／390 實際目視 QA 仍待執行。
- 不 Merge、不部署 Production、不改 #46 的程式。

## 第二批結構驗收待辦
- Personal Publication：7/12 大頭條＋5/12 次要文章，不等於 Essayist 的單篇長文；索引維持頭條／短列分級。
- Card Journal：等權重文章卡，無圖以內嵌類別區補位，不等於 Curator 拼貼展牆。
- Service Catalogue：服務資訊條目與規格表為首屏主角，僅一項服務仍成立，不等於 Coach 的行動計畫或 Practice Compass 的訪客問題分流。
- Studio Chapters：章節式工作方法與服務詳細資訊，側邊章節目錄延伸到內頁，不等於 Somatic 的沉浸式氛圍頁。
- 目前四款 prototype 尚未接真實 Content Collections／網站設定資料；真實資料注入與主 Adapter 整合由後續契約交接處理。不能把 Demo 硬編資料視為可交付 Starter。
- 待實際 CI、1440／1280／768／390 目視比對；同色同字同內容差異目前僅作來源結構分析，非視覺 PASS。

## 第三批與第四批施工更新（2026-10-14）
- 第三批新增五組原型，每組首頁／索引／詳情／About，主閱讀結構分別為交錯圖文、極簡日期列、5:7 閱讀台、7:4 觀點加側記、3:8 問答對話。導覽與頁尾均包含真實原型路由；無圖時展示可讀佔位，禁止把示範資料當真實服務。
- 四批規劃的 11 個新增方向，目前 **11/11 有多頁源碼原型**；不代表 11/11 通過 build、視覺、實際資料契約或獨立 Starter 驗收。第一／第二／第三批總計定義 44 條靜態原型路由。
- 第四批已在既有 Clinician 首頁新增 Practice Dossier 條列：身份、證照核驗、範圍、費用取消、所在地及聯絡個資。這是強化原版，**不是新增第 26 款**。必須對照 Trust Path 五站旅程與 Practice Compass 三個決策入口，防止重新長成同一種頁面。
- Subject Atlas 的首頁主題／條目數字已由 fixture 來源計算，不再寫死 04/8；其餘實際 Content Collection adapter 資料契約未完成。
- Practice Compass 目前三個決策入口仍是原型固定文案，必須確認獨立 adapter 的 visitorIntents、scope、serviceInfo、faq 與正式 Site Brief 連接。不能把這個固定文案原型視為已完成的資料契約修復。
- 本次不更動 #46 Gallery／Exporter／Starter／主 Adapter。新方向沒有自動註冊到 #46 的 12 款學生交付系統，整合屬後續跨 PR 工作。

### 研究方向與既有版型差異（Source/DOM 審查；非視覺 PASS）
| 原型 | 優先資訊物件 | 版面關鍵 | 避免重複 |
|---|---|---|---|
| sidebar-journal | 文章流＋作者分類側欄 | 主文＋右側欄 | Field Notes 邊註 |
| portrait-profile | 本人資訊與肖像佔位 | 個人身分主角 | Companion 長信 |
| editorial-frontpage | 頭條＋次要文章 | 不等權 7:5 | Essayist 單篇巨文 |
| card-journal | 平等文章卡 | 規律同權卡片格網 | Curator 展物牆 |
| service-catalogue | 可比較服務欄位 | 單一資料卡＋明細表 | Coach 方法步驟 |
| studio-chapters | 章節與方法 | 章節目錄＋文章軸 | Somatic 氛圍首屏 |
| visual-stories | 影像與圖說 | 交替圖文序列 | Curator 物件收藏 |
| compact-dispatch | 日期與短文 | 緊湊時間列 | Reading Atlas 年月格 |
| split-reader | 主文＋索引 | 5:7 固定角色 | Essayist 長文首頁 |
| editorial-practice | 服務觀點長文 | 7:4 主張＋側記 | Coach 執行清單 |
| question-led-practice | 問題／回答 | 3:8 問答同頁閱讀 | Trust Path 五站旅程 |
| clinician 強化 | 可驗證揭露資料 | 單一條列資料冊 | Trust Path／Practice Compass |

### 目前未完成的驗收
1. 待最新 commit 完整 npm build / GitHub Actions；未通過前不能宣稱路由實際輸出。
2. 1440／1280／768／390 真實瀏覽器截圖及目視 QA 尚未完成，不能以 CSS 閱讀或研究圖代替。
3. 同客群同內容／同字體／同配色的視覺 A/B 對照尚未執行。原型仍有 demo-specific 文案，未建立完全統一測試 fixture。
4. 全部 11 款目前只用原型展示資料，**尚無 Content Collections／真實專業服務資料的完整可編輯輸入契約**。
5. PR #46 擁有的獨立 Starter／Adapter 截圖驗收本輪延後；PR #47 繼續 Draft，禁止 Merge／Production。

## 第一階段完成紀錄（2026-10-14）

此節為目前進度，優先於上方舊的「尚未接資料」歷史紀錄。

- 新增的 11 款原型已各自保留原有 Layout DOM，但從統一 JSON 檔和正規化 helper 讀取首頁、文章／服務項目、詳細頁正文、About 資訊及缺值。
- `src/data/art-direction-layout-content.json` 為 Demo / Layout 介面交接用。不能取代真正網站的 Astro Content Collections，也未替 #46 完成主 Adapter 實際映射。
- 每種客群可以設定 0、1、數筆內容；公開條目有個別路由，未公開條目不提供無效文章／服務詳細連結。資料缺失顯示待設定，而不是假造照片、費用、資格、預約。
- 新增內容契約 Build gate：`Art Direction Layout Content Contract`；正常、空內容、多內容三種輸入分別建置，77 項檢查通過（Run 38575077241，2026-10-14）。
- **第一階段完成：原型可編輯內容契約與資料流。** 下一階段仍需 11 款完整多頁四尺寸視覺/功能 QA，並於第三階段完成 Definition / handoff。
- 獨立 Starter/Adapter 截圖驗收持續延期，11 款不能標成學員 Ready。
