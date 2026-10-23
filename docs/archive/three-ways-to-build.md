> **已封存（2026-10-23）。** 內容已併入 `docs/student-builder-pack/START-HERE.md`。僅供歷史查閱，不再維護。

# ATP｜三種方式開始建站

同一門工作坊，依目前狀態從其中一條開始；不必全部走完，也不需要先理解所有 Skills。主打「知識／部落格」及「助人者／專業服務」兩類網站，其他類型可以先討論，但 ATP 不保證提供可直接選用的完整 Starter。

| 入口 | 什麼情況選 | 學員的第一步 | AI 使用的主要 Skill |
| --- | --- | --- | --- |
| A 既有網站復刻 | 已有本人擁有／獲授權的網站，要遷移或還原 | 提供來源網址和範圍 | `.ai/url-to-frontend-replica/SKILL.md` |
| B ATP Starter | 想先比較版型並自行選設計方向 | 開啟 `/starter/` 規劃、匯出 JSON | `.ai/astro-site-assembly/SKILL.md` |
| C 直接與 AI 討論 | 不知道怎麼規劃、想從一句話開始 | 說「我想做一個……網站」，由 AI 一次問一題 | `.ai/astro-site-from-zero/SKILL.md` |

- **先決定建站入口，再讀對應 Skill**：`.ai/astro-site-entry/SKILL.md` 僅負責判斷路線，不重寫技術規則。
- **維護共用**：有長期文章／內容需要時使用 Astro Content Collections 和既有內容發布規範，搭配搜尋、SEO／RSS；三條路都要遵守安全、內容真實性、Git PR、真實 Preview、使用者核准才正式發布。
- **Site Brief JSON 並非所有路線的門檻**：B 的匯出器需要有效 JSON；A 可從來源網站盤點開始；C 可由 AI 訪談、先確認簡短文字計畫，只有選用 ATP 匯出器時才轉換 JSON。
- **功能範圍**：Astro 個人網站優先；付款、預約、會員、CRM 等應使用授權的外部服務或另案評估，不宣稱免費 Starter 已提供後端。
- **來源技能不等於完成網站**：每條路都需要實際建置、RWD／連結／互動 QA、真實 Preview 和獲准的部署步驟。

## 上線前檢查
請 AI 根據學員的實際平台、GitHub 倉庫與程式碼完成 `npm run build`、桌機／手機檢查並提交 PR；回報真實 URL、Commit SHA、已完成頁面與缺少資訊。不能用示意網址取代部署證據。
