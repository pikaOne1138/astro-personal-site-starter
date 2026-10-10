# 學員離線資料包的內容與界線

## 這份 ZIP 已經包含的資料
- `AGENTS.md`：學員專用規範
- `START-HERE.md`、`AGENT-HANDOFF.md`、`README.md`
- `.ai/`：設計、內容、動效、Layout、PR Preview、部署等 Skills，包含其參考文件／配方（打包時與來源專案相同的相對路徑）
- `src/components/`：可重用元件與 Editorial Recipes
- `src/pages/layouts/`：Layout Library 原始頁面
- `src/data/`：Blocks／Effects／Layout／Section Pattern 等資料與規劃器設定
- `src/layouts/`、`src/content/`：相關版型與示範內容
- `public/` 中的必要 CSS
- `scripts/export-starter.mjs`：Site Brief JSON → 獨立 Astro 骨架的工具
- `COMPONENTS.md`：元件使用資訊

## 獨立使用方式
1. 只要學員上傳這份 ZIP 和自己產生的 Site Brief JSON，**有遠端檔案操作、Node 建置、GitHub 寫入與雲端瀏覽能力的 AI** 就可從包內的生成器與設計素材建立其獨立網站；不需要讀老師的研究 Repo。
2. ZIP 的根目錄與 Skill 引用相對路徑保持一致；不要錯誤尋找 `skills/`，Skill 主要位於 `.ai/astro-*/SKILL.md`。
3. 先產生骨架，再把所選 Layout 的原始構圖與實際所需 Blocks 移植成學員自己的站，最後編譯及預覽。

## 尚需學員決定或配置的事項
- 真實品牌、文章、服務資料、圖片授權、連結與正式網域
- GitHub Repository 與 Pages/Cloudflare 平台授權、Preview 設定及生效確認
- 原型中可能使用外部圖片或示範內容；不能直接承諾所有品牌素材均可商業使用
- 部分研究 Repo 特有的 `.github/workflows/` 與研究展示 CI 不在包內，學員部署應依雙平台 Skills 建立**適合自己 Repo** 的設定，不能照搬老師 Repo 的整套安全工作流

ZIP 包含可用的程式來源與配方，但自動產生的 Phase 1 仍是網站骨架。真正的完整網站需 AI 後續適配、填內容、編譯、驗證及學員確認。 
