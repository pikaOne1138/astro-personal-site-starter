---
name: astro-site-from-zero
description: Start a maintainable Astro website by talking with a non-coder directly, without first requiring an ATP Starter planner or Site Brief JSON.
---
# Astro Site from Zero｜直接對話建站

> 這是「從自然語言開始」的入口，而不是另一套 Starter 生成器。

## 模式先行
檢查工作區、既有 Repo／未提交變更及工具能力：可否讀寫檔案、執行 Astro Build、看實際瀏覽器、建立 Git Branch／PR、獲取預覽。能力齊全採 Build Mode；能力缺乏採 Guided Mode，一次引導學員一個動作，不宣稱做過沒做的事情。

## 學員對話流程
1. 從學員已說過的內容開始，不重問。一次只問**一個**最影響下一步的白話問題：網站要做什麼、訪客是誰、主要行動、真實素材、視覺偏好。可回答「不知道／跳過」。
2. 資訊足夠就用白話確認短版計畫：網站目的、目標訪客、主要頁面、可公開內容、未知處、可回復的預設。不要把完整訪談或先開 `/starter/` 當強制門檻。
3. 只需要 Markdown 摘要即可開工；若適合既有 ATP Exporter，才由 AI 把確認過的資訊映射到 `src/data/starter-config.ts` 的 Site Brief JSON。沒有使用 Exporter 就不強制 JSON。
4. 設計與實作按需讀 `.ai/astro-design-consultation/SKILL.md`、`.ai/astro-ui-craft/SKILL.md`、`.ai/astro-layout-craft/SKILL.md`，但不要求學員逐一選 Layout、Section Patterns、Blocks 或動效。優先使用有權使用的真實素材；缺少時明確保留待設定。
5. 以可維護的 Astro 靜態網站為預設；按需共用元件，不任意加入 SSR、React、CMS、資料庫。**對持續寫文章、主題分類、長期 SEO／搜尋的知識型網站，優先採 Content Collections**；因為課後還要新增與維護內容，不只做第一次首頁。極小且無結構化內容的單頁站可不用。
6. 讀 `.ai/astro-content-publishing/SKILL.md` 處理文章，`.ai/astro-pr-preview/SKILL.md` 做 Branch、PR、Build 和真實 Preview；QA 至少檢查桌機、手機、連結、主要互動、可及性及 reduced-motion，未實測不得聲稱完成。
7. 學員確認內容和目前版本後，才依 `.ai/astro-starter-deploy/SKILL.md` 執行獲授權的正式部署；在學員自己的 `PROJECT.md` 留下決策與後續維護資訊。

## 定位
ATP 正式提供知識／部落格、助人者／專業服務兩類設計與架構起點。若需求是其他類型，可進行通用 Astro 討論或另外設計，但須告知沒有對應 Ready Starter；不能暗示本工作坊提供 CRM、會員、購物車、付款或大型商業系統。

## 不得假造
禁止假履歷、證照、評價、服務成效、價格、訂閱／預約成功、可工作的表單、部署完成或公開網址。預覽有可能公開，無法保證有權限控制。不要在聊天中要求帳密、Token 或驗證碼。
