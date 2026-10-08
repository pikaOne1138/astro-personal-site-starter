# V2.8｜內容與搜尋引擎基礎設施

**AI 操作規範：`.ai/astro-content-publishing/SKILL.md`。** 本文件保留為這次 V2.8 的階段說明與歷史背景；後續 AI 新增文章、調整 SEO、建置或發布，必須先讀 Skill 及其 `references/`，再檢查專案最新原始碼。

本階段不包含 WordPress 遷移、CMS 後台、資料庫或自建預約系統。

## 新增文章
在 `src/content/articles/` 建立 `your-slug.md`。frontmatter 至少包含 `title`、`description`、`publishedAt`、`category`；`tags` 可選。建議提供 `readingMinutes`。使用 `draft: true` 暫停公開發布。

文章的完整內文寫在 Markdown 主體，無需修改 TypeScript 陣列。列表、標籤、日期、文章內頁、相關文章及 RSS 均來自同一 Content Collection。

現有 Demo 文章仍帶有元件功能示範區；正式學員網站應依需求移除或改用內容區塊。

## 發布與搜尋引擎
正式網址：`/astro-personal-site-starter/`；預覽網址：`/astro-personal-site-starter/pr-preview/pr-N/`。DemoLayout 於預覽加入 noindex，canonical 指向正式路徑。
- `/sitemap.xml` 為靜態生成路由清單。
- `/rss.xml` 為知識站紙墨示範文章的訂閱來源（同一文章八個主題版本只保留一筆訂閱）。
- `/404.html` 提供返回首頁連結。
- Pagefind 繼續在 build 時建立靜態全文索引。

注意：目前 8 個 Demo 共用文章，正式個人網站必須選擇自己的網站路徑，否則會產生內容重複；完整 Canonical 策略需在正式 Starter 客製時校對。

## QA
1. `npm run build` 成功且無孤立連結。
2. `ASTRO_BASE_PATH=/astro-personal-site-starter/pr-preview/pr-22 npm run build` 測試預覽 base。
3. 確認 `rss.xml` 與 `sitemap.xml` 為合法 XML 並連到現有網址。
4. 增加一篇文章，確認文章列表、主題、日期、內頁與搜尋都更新。
5. 將文章改成 `draft: true`，確認不出現在公開頁、RSS 與 Sitemap。
6. 桌機與手機人工檢查文章排版，確認既有搜尋及閱讀元件仍可操作。
