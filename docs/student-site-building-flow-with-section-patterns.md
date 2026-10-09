# 學員架站流程｜Section Patterns 納入版（2026-10-09）

## 給學員看的說明

**先選一個最接近你的整頁設計，再挑你需要的局部段落，最後用 AI 換成自己的文字、圖片與品牌。** 不用先學會每顆元件的名稱。

1. **需求**：網站寫給誰看？主要要提供什麼？訪客下一步希望做什麼？
2. **選網站類型與 Layout**：知識／部落格或助人者／專業服務；在 `/layouts/` 找最接近的整頁版型，記住 slug。Layout 不等於四種配色。
3. **定網站架構與導覽**：在 `/starter/` 規劃首頁、內頁、選單、CTA；沒有內容就暫時不啟用空頁。
4. **挑 Section Patterns（可以跳過）**：在 `/section-patterns/` 挑「代表作品」、「服務信任入口」或三款頁腳等需要的完整區段。每段說清楚放哪頁、放在哪兩段之間；不用把五款都用上。
5. **設定品牌視覺**：選紙墨／晨光／靜室／植感作為起點，調主色、名稱、圖片與字體，AI 檢查對比與 RWD。
6. **調整 Blocks 與細節**：只有區段現有功能不夠用時，再到 `/blocks/` 選較細的功能；`/effects/` 的微動效最後再決定。
7. **建立與驗收**：下載 Site Brief JSON，另外附上所選 Pattern 清單；請 AI 依 `astro-site-assembly` 組站、用 GitHub PR 預覽，檢查 1440／1280／768／390。
8. **發布與維護**：本人確認後才合併與部署。接下來新增文章、修改區段和還原版本走內容發布、部署、維護 Skills。

## 進階導航（選用）
在 `/starter/` 可新增自訂頁面、重命名、排序、指定「第一層」或「某個第一層底下的子選單」。第一層最多 12 項，單組子選單最多 10 項，網站總啟用頁數最多 20 項；這些是目前程式的安全上限，不是建議學員塞滿。桌面使用可點開的下拉選單，手機以點擊展開，父選單另有「查看全部」頁面入口。複雜 mega-menu、第三層或圖片式選單是後續客製需求，不能假稱已支援。

## Pattern 選擇交接模板

```json
{
  "sectionPatternSelections": [
    {
      "patternId": "featured-work",
      "targetPage": "/",
      "insertAfter": "首頁的作者介紹之後",
      "contentNeeded": ["真實作品名稱", "作品摘要"],
      "notes": "手機改為單欄"
    },
    {
      "patternId": "footer-editorial",
      "targetPage": "site-wide",
      "insertAfter": "每頁主要內容之後",
      "contentNeeded": ["品牌簡介", "各欄選單", "正式隱私權網址"],
      "notes": "不要與既有 SiteFooter 重複輸出"
    }
  ]
}
```

**注意：** 此清單是目前交給 AI 組站的補充資料，不是 `StarterPlan v1` 已正式支援的欄位。`/starter/` 的 JSON 和 `scripts/export-starter.mjs` 尚不會自動套用 Patterns。這是後續正式程式功能的待辦事項。

## Skill 分工

| 學員任務 | AI 使用 |
|---|---|
| 需求、整體規劃 | `astro-starter-onboarding` |
| 整頁 Layout | `astro-layout-craft` |
| 局部已完成段落 | `astro-section-pattern-craft` |
| Hero、列表、閱讀節奏 | `astro-editorial-layout-design` |
| 個別 Blocks 與視覺 Tokens | `astro-ui-craft` |
| 微動效 | `astro-motion-craft` |
| JSON 與獨立網站組裝 | `astro-site-assembly` |
| 文章／SEO | `astro-content-publishing` |
| PR 預覽 | `astro-pr-preview` |
| 獨立部署與復原 | `astro-starter-deploy`、`astro-site-maintenance` |

## 教學驗收問題

- 學員能說出選擇 Layout 和 Section Pattern 的差別嗎？
- 能找到五款 Pattern 的展示，指出要哪一款、放在何處、如何替換內容嗎？
- AI 是否能維持原版型而增加 Pattern，不重複 Footer 或亂造新元件？
- Build 與實際預覽均通過嗎？未配置的預約與法律頁面有沒有被誤當正式功能？
