# 主題標本室／服務羅盤：獨立建置入口

這兩款已可匯出獨立多頁 Astro 專案，仍是組裝中，尚未取得視覺驗收，不標示 Starter Ready。

先選一份 docs/student-builder-pack/art-direction/ 中的 JSON，填入自己的 brand、content 與 artDirection 資料。未填內容會呈現待設定，不會製造假文章、資格、費用或預約。

```bash
node scripts/export-art-direction-starter.mjs docs/student-builder-pack/art-direction/subject-atlas.json /absolute/path/to/empty-site --allow-in-progress
cd /absolute/path/to/empty-site
npm install
npm run build
npm run verify
```

服務版改用 practice-compass.json。輸出目錄需為空，不會覆蓋已編輯的網站。`--require-ready` 會拒絕目前尚未驗收的版型。

文章放在輸出專案的 src/content/articles/；草稿放 src/content/drafts/。文章 frontmatter topics 使用 site.config.json 的 artDirection.topics 中已設定的 slug。

可設定服務範圍、serviceFacts、FAQ、contact、pageContent；這兩款以文字為主；Logo 與圖片是選用，依 `OWNED-MEDIA.md` 使用本地路徑或 Site Brief 的 `assets`，不接受內嵌的 data URL。不得把測試文案或待設定資料當正式服務發布。

這兩款也能由主匯出器 `scripts/export-starter.mjs` 依版型 slug 匯出（它會委派上面的命令）；上面的專用命令適合單獨測試。
