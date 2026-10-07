# Astro Personal Site Starter

工作坊研究成果的可執行原型：**2 種內容架構 × 3 種視覺人格 = 6 個 Demo**。

## Demo routes

- `/knowledge/paper/`
- `/knowledge/morning/`
- `/knowledge/studio/`
- `/helper/paper/`
- `/helper/morning/`
- `/helper/studio/`

首頁 `/` 是六種 Demo 的比較入口。

## Design system

- **Paper & Ink 紙墨**：編輯感、襯線、細線、紙張感
- **Morning Light 晨光**：暖奶油、大圓角、柔光、有機感
- **Quiet Studio 靜室**：大量留白、精準格線、單一深綠強調

## AI instructions

- `AGENTS.md`
- `.ai/astro-ui-craft/SKILL.md`
- `.ai/astro-ui-craft/references/`

Skill references 保留本次多模型研究與收斂紀錄，讓後續 AI 修改網站時能追溯設計依據。

## Local

```bash
npm install
npm run dev
```

## Deploy

推到 `main` 後由 `.github/workflows/deploy-pages.yml` 發布到 GitHub Pages。
