---
name: astro-site-from-zero
description: Start a maintainable Astro website by talking with a non-coder directly, without first requiring an ATP Starter planner or Site Brief JSON.
---
# Astro Site from Zero｜直接對話建站

> 這是「從自然語言開始」的入口，而不是另一套 Starter 生成器。

## 模式先行
檢查工作區、既有 Repo／未提交變更及工具能力：可否讀寫檔案、執行 Astro Build、看實際瀏覽器、建立 Git Branch／PR、獲取預覽。能力齊全採 Build Mode；能力缺乏採 Guided Mode，一次引導學員一個動作，不宣稱做過沒做的事情。

## 學員對話流程
1. 先讀已有資料（`INTERVIEW-NOTES.md`、`PROJECT.md`、學員貼回的進度摘要、上傳的檔案），從學員已說過的內容開始，已記錄的答案不重問。一次只問**一個**最影響下一步的白話問題；每題只能有一個必答點，不把多個必答子問題塞進同一題。可回答「不知道／跳過／你決定」。
2. 依「核心題庫」問到核心主題都有答案或被標 `SKIPPED`／`MISSING` 為止，不為湊滿而連環追問。能寫檔就逐題保存（見「逐題保存與續接」）。
3. 停止訪談後送出「理解確認單」並**停下**（見「理解確認單與硬停點」）。學員明確同意前不匯出、不寫程式、不建 Repo。
4. 確認後，只需要 Markdown 摘要即可開工；若適合既有 ATP Exporter，才由 AI 把確認過的資訊映射到 `src/data/starter-config.ts` 的 Site Brief JSON，沒有使用 Exporter 就不強制 JSON。設計與實作按需讀 `.ai/astro-design-consultation/SKILL.md`、`.ai/astro-ui-craft/SKILL.md`、`.ai/astro-layout-craft/SKILL.md`，但不要求學員逐一選 Layout、Section Patterns、Blocks 或動效。優先使用有權使用的真實素材；缺少時明確保留待設定。
5. 以可維護的 Astro 靜態網站為預設；按需共用元件，不任意加入 SSR、React、CMS、資料庫。**對持續寫文章、主題分類、長期 SEO／搜尋的知識型網站，優先採 Content Collections**；因為課後還要新增與維護內容，不只做第一次首頁。極小且無結構化內容的單頁站可不用。
6. 讀 `.ai/astro-content-publishing/SKILL.md` 處理文章，`.ai/astro-pr-preview/SKILL.md` 做 Branch、PR、Build 和真實 Preview；QA 至少檢查桌機、手機、連結、主要互動、可及性及 reduced-motion，未實測不得聲稱完成。交付的網站必須帶有備用元件庫 `.ai/library/`：有用 ATP Exporter 時由匯出器自動組裝；手工組站時，照 `docs/student-builder-pack/LIBRARY-README.md` 的結構，從建站包的 `src/components/`、`src/data/` 與 `public/` CSS 整批複製組裝，不得省略。
7. 學員確認內容和目前版本後，才依 `.ai/astro-starter-deploy/SKILL.md` 執行獲授權的正式部署；在學員自己的 `PROJECT.md` 留下決策與後續維護資訊。

## 核心題庫
最多七個核心主題，**不強制問滿**；已由學員資料回答的主題直接採用。「題目」可直接照唸；其餘欄位給 AI 用，不必唸給學員。

| # | 題目（白話） | 為什麼問 | 答不出來時 | 寫入 |
|---|---|---|---|---|
| 1 | 這個網站是做什麼的？想讓誰看到？ | 決定 kind 與整體方向 | 給 2–3 個例子（寫文章分享／介紹自己的服務），或標 `SKIPPED` | PROJECT §1 定位、受眾 |
| 2 | 訪客來了，你最希望他做的一件事是什麼？ | 決定唯一主要行動與 CTA | 列出讀文章／寄信／透過既有預約連結聯絡讓他選 | PROJECT §1 主要行動 |
| 3 | 你手上已經有哪些真實的文字、照片或服務項目？ | 分辨可用素材與缺口 | 標 `MISSING`，不替他生成 | PROJECT §2 素材 |
| 4 | 服務或內容的事實：（依 kind，一次只問其中一項）助人者問服務對象、形式、時長、費用是否公開、預約管道、不適合的情況；知識站問想持續寫的主題 | 事實欄位不得編造 | 價格、資格、經歷、聯絡方式答不出來只能 `MISSING`／`DO_NOT_PUBLISH` | PROJECT §2、`site.config.json` 欄位 |
| 5 | 看哪個比較像你想要的「感覺」？（見下方風格題） | 抽象形容詞不能直接翻譯成設計 | 允許「你幫我選」→ 標 `AI_PROPOSED` | PROJECT §3 |
| 6 | 有沒有不想要、不要出現的東西？ | 防止踩雷 | 標 `SKIPPED` | PROJECT §1／§5 |
| 7 | 訪客怎麼聯絡你、下一步是什麼？ | 聯絡管道必須真實 | 沒有就標 `MISSING`，不放假表單或 `#` | PROJECT §2、§3 |

- **風格題一律選擇題化**：出示 2–3 個**現有**具體選項（Layout 預覽截圖或站內範例連結）讓學員指認喜歡哪個的「感覺」，記錄所選的 Layout／theme；禁止只問「想要什麼風格」再自行詮釋形容詞。選項從 `src/data/layout-directions.json`、`src/data/layout-assembly/definitions.mjs` 與 `starterThemes`（`src/data/starter-config.ts`）讀取，不照抄舊數量，也不要求學員理解 slug。純聊天讀不到這些檔案時，只記下學員描述的偏好並註明「待對應現有 Layout」，不捏造已載入的版型。
- 細節題（選配）另外計，上限 5 題，只在答案會讓方案走向不同時才問。
- 答案來源分三類並如實標示：學員提供（`CONFIRMED`，經確認單後才算）、AI 建議（`AI_PROPOSED`）、缺漏（`MISSING`／`SKIPPED`）。價格、資格、經歷、聯絡方式等事實不得由 AI 代填。

## 理解確認單與硬停點
停止訪談後送出**六欄固定格式**的確認單，缺一不可：
1. 一句話定位（這個網站是什麼、給誰）
2. 訪客的主要行動（一個就好）
3. 頁面清單（名稱＋每頁一句目的）
4. 已確認（學員親口給的，逐項列）
5. AI 建議、尚未經學員同意（逐項列，含版型與風格）
6. 還缺的真實資料（`MISSING` 清單，寫明「先空著，不會編」）

此格式只在本節維護；其他入口與文件引用這裡，不另寫第二份欄位定義。

**硬停點**：送出確認單的那則訊息，結尾只能是請學員確認，不得包含「我先開始做」之類已開工的宣稱或產出。學員明確肯定（對／可以／開始）之前，禁止執行匯出、寫程式或建 Repo。「嗯嗯」「好像可以」等模糊回覆不算同意，需再問一次哪裡正確或哪裡要改。學員指出錯誤就修正確認單重送。

學員先前已用具體文字授權涵蓋此需求（例如已說「價格改為 2,000 元」）時，記錄該依據，不重複索取相同授權；範圍不明或有連帶影響才補問。

**留痕**：學員確認後，把下列欄位寫入 `PROJECT.md`「需求訪談與理解狀態」中的「需求理解確認紀錄」（尚無站時先寫入 `INTERVIEW-NOTES.md`，格式相同）：
- `入口路線`：A、B 或 C。
- `狀態`：`已確認` 或 `學員明確略過`。
- `確認依據`：學員的原話或所指的訊息；`學員明確略過` 必須引用學員自己的話（用「」括起）。
- `確認時間`：無法取得時鐘就如實寫「待補」，不編造。
- `確認單雜湊`（選填）：能執行 Node 時用 `node scripts/check-start-record.mjs --print-hash <含確認單的檔案>` 取得；確認後確認單被改動，檢查會失敗並要求重新確認。
- `確認單全文`：以 `>` 引用整張六欄確認單。

**開工關卡 G-00**：首次組站、且要用 ATP 匯出器時，執行 `node scripts/export-starter.mjs <plan.json> <out> --require-start-record <PROJECT.md 或 INTERVIEW-NOTES.md>`；沒有合格紀錄就被擋下並印出白話訊息，可先用 `node scripts/check-start-record.mjs <檔案>` 單獨檢查。B 路線以學員在規劃器下載的 Site Brief 為依據，可不帶此旗標；A 路線以復刻範圍確認為依據，仍需寫入紀錄。這個檢查只證明「有留痕且內部一致」，不證明真人同意，也攔不住不經匯出器的任意寫碼，不得宣稱全面強制。既有網站的日常維護不跑匯出器，也不受此關卡影響；只有重大需求改動才重新確認，小修不需要重新訪談。

## 逐題保存與續接
- 能寫檔：每題答完立即寫入 `PROJECT.md`；尚未有站就寫入工作區的 `INTERVIEW-NOTES.md`（每題一列：題號、答案、來源標記），組站時併入 `PROJECT.md`。並在回覆中用一行「已記錄：＿＿」讓學員看見。
- 不能寫檔：不得說「已存檔」。每答完數題，提供一段**可複製的進度摘要**（已回答的題與標記、尚未回答的題號），請學員自行保存；換對話時貼回。
- 續接：新對話先讀 `INTERVIEW-NOTES.md`／`PROJECT.md` 或學員貼回的摘要，從第一個未回答的核心題繼續。讀不到任何紀錄時，如實告知「我看不到先前的紀錄」，重新開始，不假裝記得。

## 定位
ATP 正式提供知識／部落格、助人者／專業服務兩類設計與架構起點。若需求是其他類型，可進行通用 Astro 討論或另外設計，但須告知沒有對應 Ready Starter；不能暗示本工作坊提供 CRM、會員、購物車、付款或大型商業系統。

## 不得假造
禁止假履歷、證照、評價、服務成效、價格、訂閱／預約成功、可工作的表單、部署完成或公開網址。預覽有可能公開，無法保證有權限控制。不要在聊天中要求帳密、Token 或驗證碼。
