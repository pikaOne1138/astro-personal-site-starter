# Phase 2｜Batch 1–8 全量候選盤點（稽核母表）

Frozen main `2d20e3ab2e87b52a954d26a64d621d25a2c8ac0c`。本表逐筆收錄現有八份 Atomic Batch 的 **187 筆候選列**，作為下一步原子化與去重稽核的候選分母。**候選數不是唯一規範數**，且表內部分候選是分類、狀態或既有父子關係。

| 既有候選 ID | Batch | 既有條款摘要 | 複合語句初篩 | 目前處置 |
|---|---:|---|---|---|
| `B1-PUB28-01` | 1 | 公開文章只來自 articles Collection | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-PUB28-02` | 1 | 草稿存放於 drafts 而非 articles | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-PUB28-03` | 1 | 發布時移入 articles 並將舊 draft:true 改為 false | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-PUB28-04` | 1 | 撤回時移回 drafts、設 draft:true 並清空舊輸出重新 Build | FLAG | CHILD_SPLIT_01_CREATED |
| `B1-PUB28-05` | 1 | 每次轉換檢查公開文章路由 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-PUB28-06` | 1 | 不可靜默改網址；舊站 legacy 過濾須先檢查路由再遷移 | FLAG | CHILD_SPLIT_01_CREATED |
| `B1-PUB28-07` | 1 | 資料夾隔離是發布控制不是保密控制 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-PUB28-08` | 1 | 變更後實際執行草稿外洩 Gate；未執行不能 PASS | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-PUB28-09` | 1 | 公開 Loader 僅限 articles，不得 glob 全內容目錄 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-PUB56-01` | 1 | 文章修改後須乾淨 Build 並對實際學員站執行 Gate | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-PUB56-02` | 1 | 檢查草稿直接 HTML 路由、全部 HTML、RSS、Sitemap 及搜尋發現介面 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-PUB56-03` | 1 | 負向故障注入應被驗證器偵測為 FAIL | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-PUB56-04` | 1 | 驗證器漏報必須修 Gate，不能修報告 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-PUB56-05` | 1 | 自訂 slug、巢狀路由、MDX、CMS 等須另外擴展 route-aware 驗證 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-ASM22-01` | 1 | 發布前逐頁指出仍為 Demo/sample/unconfigured 的元素 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-ASM22-02` | 1 | 學員選擇保留、編輯或隱藏 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-ASM22-03` | 1 | 學員可明確選擇保留已標示的示範內容 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-ASM23-01` | 1 | 正式發布必須核准特定的目前版本 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-ASM23-02` | 1 | 正式發布必須核准變更範圍與 Production 行動 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-ASM23-03` | 1 | Build 和 Preview 通過不等於發布核准 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-ASM23-04` | 1 | 已揭露且知情接受的 Demo 不單獨阻擋獲核准的發布 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-DEP31-01` | 1 | 預設 HTML noindex，robots.txt 禁止索引 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-DEP31-02` | 1 | 完成內容、Preview、資安與授權驗收且學員明確同意後才可開啟正式站索引 | FLAG | CHILD_SPLIT_02_CREATED |
| `B1-DEP31-03` | 1 | 只在 Production 使用 SITE_INDEXABLE=true 並重新 Build、檢查 robots/canonical/Sitemap | FLAG | CHILD_SPLIT_02_CREATED |
| `B1-DEP31-04` | 1 | Cloudflare Preview 不得共用正式站索引設定 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B1-DEP31-04-CF` | 1 | Cloudflare Preview 的 SITE_INDEXABLE 應維持與正式站隔離；與 B1-DEP31-04 同源，為範圍說明，不另行計數 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B1-DEP31-04-GH` | 1 | GitHub Pages Actions Variables 中 SITE_INDEXABLE 未設定視為 false；正式站審查並獲核准後才設 true 並手動執行 Production Workflow | FLAG | CHILD_SPLIT_02_CREATED |
| `B2-PUB36-01` | 2 | 舊文章保留 slug，除非學員同意 URL 變更計畫 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B2-PUB36-02` | 2 | 真正內容修改才更新 updatedAt；不得靜默修改 publishedAt | FLAG | CHILD_SPLIT_01_CREATED |
| `B2-PUB37-01` | 2 | Draft 不得出現在列表、歸檔、RSS、Sitemap、搜尋 | FLAG | CHILD_SPLIT_01_CREATED |
| `B2-PUB37-02` | 2 | 公開 PR Preview 可能曝光草稿；機密資料不能上傳公開 repo 或 preview | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B2-PUB48-01` | 2 | 保留 Pagefind HTML-based 搜尋索引 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B2-PUB48-02` | 2 | 搜尋 UI 必須另外組裝及實測 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B2-PUB48-03` | 2 | 不新增硬編碼 metadata-only 全站搜尋 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B2-ASM50-01` | 2 | Section Pattern 須先讀 Skill、Registry | FLAG | CHILD_SPLIT_02_CREATED |
| `B2-ASM50-02` | 2 | 學員未選 Pattern 不強制加入 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B2-ASM50-03` | 2 | 輸出 Pattern 骨架仍須真實內容與視覺移植 | FLAG | CHILD_SPLIT_02_CREATED |
| `B2-DEP43-01` | 2 | 須檢查 Cloudflare 工具權限、scope 與帳號 | FLAG | CHILD_SPLIT_02_CREATED |
| `B2-DEP43-02` | 2 | 唯讀時由學員在 Dashboard 連接，AI 逐步引導 | FLAG | CHILD_SPLIT_02_CREATED |
| `B2-DEP43-03` | 2 | 不要求 Token 或假稱已部署 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B2-DEP43-04` | 2 | Private Repo 可優先考慮，仍需部署授權 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B2-DEP43-05` | 2 | 舊 Preview URL 不可推論新 SHA | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB14-01` | 3 | Publishing Skill 不涵蓋 WP 遷移、CMS、DB、金流及應用後端 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB14-02` | 3 | 舊站核准匯出內容可另案謹慎重建 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB14-03` | 3 | 不承諾自動 URL 保留或無縫遷移 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB20-01` | 3 | 以學員生成專案真實 schema、navigation、scripts 為準 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB20-02` | 3 | 生成 Pagefind 索引不等於搜尋對話框 UI 完成 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB20-03` | 3 | 分類／月份搜尋、OG、結構化資料未組裝不得宣稱已完成 | FLAG | CHILD_SPLIT_02_CREATED |
| `B3-PUB33-01` | 3 | 建立新文章先讀 schema 與現有 ID | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB33-02` | 3 | 新文章使用唯一、穩定的 ASCII slug | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB33-03` | 3 | 不可直接改 dist、Pagefind index 或 adapter | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB34-01` | 3 | Frontmatter 必填欄位依實際 schema | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB34-02` | 3 | 有 cover 必須同時有 coverAlt | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB35-01` | 3 | 使用真實文章正文、可及性標題與有意義連結 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB35-02` | 3 | 圖片須有授權及替代文字 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB35-03` | 3 | 不在一般正式文章塞入虛構示例 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB44-01` | 3 | 每頁 title／description 須真實準確 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB44-02` | 3 | 八個 Demo 不能假稱八套獨立原創內容 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-PUB45-01` | 3 | 分別檢查 Production 與 PR Preview canonical | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-PUB45-02` | 3 | 學員站選用自己的 canonical root | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-ASM14-01` | 3 | 確認採用哪一個獨立 Homepage Prototype | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-ASM14-02` | 3 | 第一版 Home Adapter 不等於十二套完整多頁網站 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-ASM24-01` | 3 | 禁止洩漏秘密或第三方私人資料 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-ASM24-02` | 3 | 未驗證資格或服務不得偽裝為真實 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-ASM24-03` | 3 | 即使尚未正式發布也須告知公開 Preview 風險 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-DEP8-01` | 3 | GitHub Pages 與 Cloudflare 靜態託管是平行可選路線 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-DEP8-02` | 3 | Cloudflare 不必然使用 Workers、D1、R2、金流或後端 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-DEP8-03` | 3 | 部署指引本身不證明有真實 Live Preview | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B3-DEP23-01` | 3 | Cloudflare 部署前確認 Pages 或 Workers 靜態資產 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-DEP23-02` | 3 | 確認平台現行支援方式及限制 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B3-DEP23-03` | 3 | 優先靜態網站，不無必要加入 SSR 或後端 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-PUB24-01` | 4 | 在真正的學員生成目錄執行 npm run build | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B4-PUB24-02` | 4 | 從 ZIP 使用帶 --student-site 的驗證命令；無 flag 僅供研究站 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-PUB24-03` | 4 | 發布前讀 PR Preview Skill | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B4-PUB32-01` | 4 | 內容與目標不能推導時才詢問學員 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-PUB32-02` | 4 | slug 或 public/draft 狀態有疑慮時先確認 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-PUB38-01` | 4 | 富文本需求先檢查現有元件及 Registry | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-PUB38-02` | 4 | 不複製現有 article renderer 邏輯 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B4-PUB50-01` | 4 | 每次學員部署核對 astro.config site/base | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-PUB50-02` | 4 | RSS、Sitemap、canonical 絕對網址不能沿用教師 Repo 網址 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-ASM12-01` | 4 | 讀 Starter Config、Layout Directions、Blocks Registry | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-ASM12-02` | 4 | 驗證 kind/layoutSlug 一致性 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-ASM12-03` | 4 | 驗證 HEX、路由、CTA、導航名稱及排序 | FLAG | CHILD_SPLIT_02_CREATED |
| `B4-ASM28-01` | 4 | About 應採學生實際提供的 bio、purpose、approach、background | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-ASM28-02` | 4 | 不得自行虛構資格、經歷、推薦與獎項 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP16-01` | 4 | 辨認 GitHub Pages 是 Project、User 或 Custom Domain | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP16-02` | 4 | 依實際域名及 Repo 子路徑設定 Astro site/base | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP17-01` | 4 | 用 import.meta.env.BASE_URL 處理路由與資產 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP17-02` | 4 | 核對 canonical、RSS、Sitemap、robots、OG URL | FLAG | CHILD_SPLIT_02_CREATED |
| `B4-DEP17-03` | 4 | 移除研究站的硬編碼 URL | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B4-DEP18-01` | 4 | 使用 GitHub Actions Build/Deploy | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP18-02` | 4 | 不直接套用教師 showcase 的 workflow_run、Preview Cleanup、gh-pages Snapshot | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP18-03` | 4 | 學員獨立單站工作流程採最小權限 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B4-DEP20-01` | 4 | 首次 Pages、Actions 權限及 DNS 可能需學員自己設定 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP20-02` | 4 | 未確認真實授權或部署，不可宣稱已完成 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B4-DEP24-01` | 4 | Cloudflare Git 整合須核對正式 Branch、Build、dist、site/base | FLAG | CHILD_SPLIT_02_CREATED |
| `B4-DEP24-02` | 4 | Cloudflare base 依實際根網域或子路徑判斷，不可硬套 / | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB8-01` | 5 | 文章／SEO／RSS／搜尋相關工作使用 Publishing Skill | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB8-02` | 5 | GitHub 發布應協同 PR Preview Skill | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB8-03` | 5 | 版型變動協同 UI Craft Skill | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB12-01` | 5 | 文字、身份、URL、圖片、專業事實由使用者提供 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB12-02` | 5 | 不得虛構資格、見證、價格、聯絡、電子報及預約成功 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB18-01` | 5 | 離線 ZIP 為參考包，不等於學員生成網站 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB18-02` | 5 | 真正學生網站以生成目錄為準 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB18-03` | 5 | 學員不用 Clone 教師 Repo | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB22-01` | 5 | 研究 ZIP 內部檔案不能當作學員預設路由 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB22-02` | 5 | 不直接照搬八種 Demo 或要求學員取得研究 Repo | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB58-01` | 5 | 已撤回草稿可能留在歷史部署與公開 PR Preview | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB58-02` | 5 | Git History 或 immutable Artifact 可能保留內容 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB58-03` | 5 | noindex、draft flag 不保障資料保密 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB58-04` | 5 | 須向學員回報歷史外洩可能性 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB62-01` | 5 | 讀 package.json 核對實際 Build Script | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB62-02` | 5 | 可能時測 Production 與實際 PR Base Build | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB62-03` | 5 | 不得繞過失敗 Gate 換取 CI Green | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-PUB63-01` | 5 | 檢查實際產出文章與缺漏路由 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-PUB63-02` | 5 | 核對清單、標籤、月份、日期、相關文章連結 | FLAG | CHILD_SPLIT_02_CREATED |
| `B5-PUB63-03` | 5 | 核對文章分享、麵包屑、導航及搜尋行為 | FLAG | CHILD_SPLIT_02_CREATED |
| `B5-ASM8-01` | 5 | 按任務職責參照 Onboarding、Layout、Editorial、UI、Publishing、Deploy、Maintenance Skills | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-ASM8-02` | 5 | 不得把設計指引當成已可執行網站 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-ASM21-01` | 5 | Draft／Preview 可保留已明確標示的 Demo／Sample 與未配置欄位 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B5-ASM21-02` | 5 | 不得僅因未完成而擅自刪除／隱藏 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B5-ASM21-03` | 5 | 未核實的資格、見證、療效、價格、可用表單不得偽裝成真實 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB46-01` | 6 | OG/Twitter 內容需符合真實內容 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB46-02` | 6 | OG 圖片未設定不可聲稱存在 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB46-03` | 6 | 結構化資料應與可見內容相符 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB47-01` | 6 | 檢查 sitemap、RSS、robots、404 產物 | FLAG | CHILD_SPLIT_01_CREATED |
| `B6-PUB47-02` | 6 | 連結需指向真實網站 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB47-03` | 6 | RSS 不重複展示八種主題外觀的同一文章 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB49-01` | 6 | 正確處理 BASE_URL 與 ASTRO_BASE_PATH | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB49-02` | 6 | 避免 PR Preview 被搜尋引擎索引 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB49-03` | 6 | robots.txt 不足以單獨隔離預覽子路徑 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB64-01` | 6 | 檢查生成 RSS、Sitemap XML 與 canonical | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB64-02` | 6 | 未受自動化覆蓋者須標記未驗證 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB65-01` | 6 | 使用 Feature Branch + PR | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB65-02` | 6 | 驗證真實 Hosting Preview，不能拿 PR Artifact 冒充 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB65-03` | 6 | UI 變更測試 1440、1280、768、390 及手機鍵盤操作 | FLAG | CHILD_SPLIT_01_CREATED |
| `B6-ASM11-01` | 6 | Assembly 輸入為 Starter 輸出的 JSON | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-ASM11-02` | 6 | 輸入需含 version、kind、layoutSlug、visualTheme、brand、navigation、primaryCta | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-ASM13-01` | 6 | 核對品牌、圖片權利、真實聯絡與預約方式 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-ASM13-02` | 6 | 專業履歷及資格僅能使用本人提供事實 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-ASM13-03` | 6 | 未配置第三方整合須隱藏或明確標示 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-DEP30-01` | 6 | 驗證 Build 實際產生 Pagefind 與中文 exact-zh 索引 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-DEP30-02` | 6 | npm run verify 應檢查索引結構、路由與草稿隔離 | FLAG | CHILD_SPLIT_02_CREATED |
| `B6-DEP30-03` | 6 | PR CI regressions 應包含負向故障案例 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-DEP30-04` | 6 | 不同 base 設定下必須重新驗證 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B6-PUB66-01` | 6 | 交接異動檔案與文章公開／草稿狀態 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B6-PUB66-02` | 6 | 交接實際執行的檢查與未解風險；未同意不得 Merge | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L70-01` | 7 | 經授權新增文章可用單一 Markdown 檔完成，不必維護 TypeScript 陣列 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L70-02` | 7 | 公開文章在路由、文章頁、標籤與日期、相關連結及搜尋可見 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L70-03` | 7 | RSS、Sitemap、Metadata、Preview Index 策略一致 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L70-04` | 7 | 桌機與手機可正確閱讀及導覽，不得虛構發布成功 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L72-01` | 7 | 文章公開網址要改動時須先揭露取捨，不可擅自實作 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L72-02` | 7 | 法律／醫療內容、資料所有權變更須先揭露取捨 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L76-01` | 7 | 「新增草稿」只追問缺少的真實材料並核對 slug／日期 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L76-02` | 7 | 寫入實際 Collection，確認草稿不在文章清單、RSS、Sitemap、搜尋 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L76-03` | 7 | 公開 PR Preview 可能洩露內容；敏感草稿只用受限環境預覽 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L77-01` | 7 | 修改舊文章時保留 slug／publishedAt | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B7-PUB-L77-02` | 7 | 有 updatedAt 欄位且確實修改才更新 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L77-03` | 7 | 交付原文與修改差異 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L78-01` | 7 | 排定公開須先完成文字、SEO、內鏈、圖片來源與手機 QA | FLAG | CHILD_SPLIT_01_CREATED |
| `B7-PUB-L78-02` | 7 | 沒有實際排程服務不可聲稱能定時自動發布 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B7-PUB-L79-01` | 7 | 發布須確認學員同意稿件 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B7-PUB-L79-02` | 7 | Branch／PR 經 Preview 驗收後再 Merge／Production | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B7-PUB-L79-03` | 7 | 發布後核對 URL、清單、RSS、Sitemap、搜尋（有 Pagefind 時） | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L80-01` | 7 | 「隱藏」先區分列表隱藏、draft 與取消公開 URL | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L80-02` | 7 | 刪除或重導時須交代 SEO 與外部連結影響並等同意 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L80-03` | 7 | 優先保留可恢復的 Git 歷史，不直接刪除原稿 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L81-01` | 7 | 新文章桌機與手機共用導航、列表、相關文章一致 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B7-PUB-L81-02` | 7 | 一般頁面須用 astro-page-management，不塞進 Article Collection | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L17-01` | 8 | Exporter 在另一目錄產出獨立可執行 Astro，不修改 Showcase | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L17-02` | 8 | 生成所選頁面、共用導航與站點資產，不將研究站路由全數照搬 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L17-03` | 8 | 有 Adapter 時保留專屬 Home，不用通用 Hero 替代 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L17-04` | 8 | Phase 1 不能聲稱完整移植十二套原始構圖 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B8-ASM-L29-01` | 8 | 服務資料只能使用學生提供的 scope／exclusions／method／firstVisit 等真實欄位 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B8-ASM-L29-02` | 8 | 未填資料顯示未配置，缺 contact endpoint 不可冒充可用預約表單 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L30-01` | 8 | 長 CJK、缺媒體及文章數不同是正常學員輸入 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L30-02` | 8 | 保留家族構圖但調整響應式約束，不用通用版型取代 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L31-01` | 8 | student-visual-qa 產出首頁／內頁的 1440、1280、768、390 截圖 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L31-02` | 8 | 人工對照 Art Direction；Build PASS／無 Overflow 不代表忠實度 | FLAG | CHILD_SPLIT_01_CREATED |
| `B8-ASM-L35-01` | 8 | 保留家族專用的首頁與內頁元件，不替換為通用頁首或內頁 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L37-01` | 8 | Home Adapter 從所選 slug 來源匯出到學生 selected/Home.astro | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L38-01` | 8 | ArticleArchive 提供知識型各家族不同結構，但共用文章資料查詢 | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L39-01` | 8 | ArticleDetail 依家族組合閱讀版型，仍僅有一個 h1，內文以 slot 載入 Collection | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |
| `B8-ASM-L40-01` | 8 | 一般內頁使用家族 DesignInterior 元件 | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B8-ASM-L41-01` | 8 | About 使用 AboutSections | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B8-ASM-L42-01` | 8 | 助人服務使用 ServiceSections | — | PENDING_CROSS_SOURCE_DEDUPE |
| `B8-ASM-L43-01` | 8 | 導覽與 Footer 使用 DesignChrome.css | FLAG | PENDING_ATOMIC_SEMANTIC_REVIEW |

## 計數及風險

- 總列數 **187**；標點／連詞初篩標記 **128**；其中 **8** 個父候選已在 [第一批子項表](PHASE2-BATCH1-8-CHILD-SPLIT-01.md) 進行拆解，其他 **120** 個需優先人工語義檢查。
- 初篩僅指示需閱讀，並非將所有連詞拆成獨立 Canonical；子條件可能只是描述、例外或同一義務的驗收欄位。
- 現存候選中 `B6-ASM11-01`、`B6-ASM11-02` 描述傳統 Starter JSON 路線，已與使用者確立的 A／B／C 三路徑形成 **conditional scope**：僅 B 或有實際使用 Site Brief 時適用，不得強迫 A/C 生成 JSON；Frozen 來源保留原貌，另見 [PR61 Delta](UPSTREAM-DELTA-PR61.md)。
- 本表只證實 187 個條目皆有盤點欄，尚未證明其全部原文子條件已拆盡、跨文件 SAME/DIFFERENT 已裁決，或最終 canonical 母數已確認。
- Gate：Phase 2 IN PROGRESS；3/4 BLOCKED。


## 2026-10-23 人工語義拆解第二輪

[CHILD-SPLIT-02](PHASE2-BATCH1-8-CHILD-SPLIT-02.md) 已核對 Frozen Skills 原文並拆解 **14 個父工作候選／55 子檢查**，本清單的該 14 列狀態更新為 `CHILD_SPLIT_02_CREATED`。原有 8 父／27 子為第一輪。初始 120 個標點風險待審項（不含第一輪已拆 8 項）中，這次有 14 項完成細拆，因此**初篩待審約 106 列**；仍需檢查其他候選與每項的語義最小性，不表示第二階段 Gate 通過。
