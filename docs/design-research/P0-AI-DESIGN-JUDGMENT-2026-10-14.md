# ATP P0｜AI 設計能力外部研究與共用設計判斷規則

研究日：2026-10-14。狀態：**研究與規則草案（P0）**，不是已通過視覺驗收、不是新 Skill 安裝、不是 Starter 程式異動。

## 1. 研究目標與邊界

服務兩類：A 個人知識／部落格／文章與內容創作者；B 諮商／心理／催眠／身心靈／身體工作／教練／顧問個人專業者。目標是讓無程式基礎者與 AI 討論網站設計，並讓 Layout / Editorial / UI / Motion 各有明確的設計決策。

不建立 SaaS、會員、CRM、自建排程或金流。外部 repo 只供研究；不要自動安裝其 Skills、JS 套件、MCP、CLI 或移植 assets。若要取用外部程式碼，個別審核檔案授權、相依性、Astro 適用性、效能、安全與無障礙。

**證據級別**：本文件以公開 GitHub README 與可開啟的 Skill 原文、ATP GitHub 既有 Skill 與 PR47 交接為依據；沒有逐一執行外部 demo 的像素級 / 效能實驗。以下「借鑑」是 ATP 的設計提案，不是已實作或第三方成效的證明。

## 2. 外部來源逐項拆解

| Repo / 原址 | 查到的內容 | 最能借鑑 | 不直接採用的原因 / 限制 | 優先 |
|---|---|---|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 一個入口統合設計流程：init、shape、craft、critique、audit、polish、layout、typeset、distill、bolder、quieter、harden；產品真相 PRODUCT.md 與設計系統 DESIGN.md 分離；有決定式 detector 與 LLM 質性批評 | 跨階段設計動詞、雙軌檢查（可測規則與主觀批評）、產品目的不等於 Theme | 不照裝 CLI、不把檢查分數當美感；版本中 commands / detectors 數量會變 | P0 |
| [marvkr/better-design](https://github.com/marvkr/better-design) | MCP 設計知識層：get-ui-principle、get-review-rules；及依需載入設計系統 / Tokens / components 的 Scaffold | **按需檢索設計原則**，不是一次塞全部；審核 a11y / visual design；語義 tokens | 偏 shadcn、React、產品 UI，31 套品牌主題不能當我們兩種網站的現成版型 | P0 |
| [madebymustafa/design-taste](https://github.com/madebymustafa/design-taste) | 核心 anti-slop Skill、10 種風格包、排版、色彩、Motion、可及性、工程規範；相同 brief 的 before / after 示範 | 先宣告 design read、反罐頭規則、同內容比較、技術 craft 與視覺 craft 分離 | 相同 brief 的兩張圖是示例，不是控制組成效證據；不複製 10 種風格包 | P0 |
| [superdesigndev/superdesign](https://github.com/superdesigndev/superdesign) | 舊 IDE extension，官方註明不再積極維護；畫布、線框稿、多版本 fork；另有 [superdesign-skill](https://github.com/superdesigndev/superdesign-skill) | **分歧探索→比較→收斂**、先 wireframe 後 Astro | 新產品與舊開源 extension 不是同一可自由移植的能力；不要假設其完整網頁設計 Agent 開源 | P1 |
| [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | framework-agnostic TS 核心，WebGL / WebGPU Canvas 與各框架 wrapper | 學習「保留真 HTML 互動，特效作漸進視覺層」 | GPU 性能、回退、維護與無障礙成本高；非工作坊預設 | 參考 |
| [paper-design/shaders](https://github.com/paper-design/shaders) | Vanilla / React Shader 元件，Apache-2.0；提醒 0.0.x breaking updates | 可探索少量帶意義的背景質感；依賴 pinning | 首頁視覺不能靠動態 Shader 補救 Layout；不加到 Starter | 參考 |
| [ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts) | React 元件、特效、互動、圖像處理、工具與 blocks | 有差異的「視覺行為模式」可抽象成構圖研究 | 大量與 ATP Blocks / Effects 重複；不可直接把元件庫當 Layout Library | P2 |
| [Hyperiux-Immersion-Labs/hyperiux-components](https://github.com/Hyperiux-Immersion-Labs/hyperiux-components) | Next.js + Tailwind 效果庫與 CLI / MCP；免費與 Pro 效果分開授權 | 精準研究單一 CTA / 圖片 / 文字效果的替代手法 | **CLI MIT 不等於 Effects 全 MIT**；有專屬 Effects 授權及 Pro 限制；不要複製 | 參考 |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | React + Motion + Tailwind 動效 kit，README 標 beta、MIT | Motion 用途、微互動手法、元件拆分 | 現有 Astro Motion Craft 七效果優先；無必要不裝新 runtime | P2 |
| [ui-layouts/cursify](https://github.com/ui-layouts/cursify) | React / Next.js 游標效果，需要 motion / Tailwind | 僅特殊作品集情境的 hover 考察 | 觸控 / 鍵盤不可依賴 cursor；工作坊預設排除 | 排除預設 |
| [akaieuan/trickle-UI-kit](https://github.com/akaieuan/trickle-UI-kit) | React 文字動畫，多數 CSS-only / server-safe，含 reduced-motion 規則 | 保留文字的最終可讀狀態與減少動態降級 | 助人者和內容頁切忌大量 typewriter/scramble；不裝 | 參考 |

**來源訂正**：社群短網址所指 Better Design 為 `marvkr/better-design`（非 `marvks`）；社群列出的是概念索引而非官方質量排名。上述 repo 文件在時間上可能更新，引用精確 commands / rule counts 前應再看 upstream HEAD。

## 3. 額外挖掘：這批研究帶給 ATP 六個新機制

1. **分開 PRODUCT TRUTH 與 DESIGN DECISION**：學員的受眾、網站目的、實際內容、資格和 CTA 是事實層；Layout、字體、品牌配色、動效是設計層。AI 不得從風格臆造資格、照片或成效數據。（Impeccable 的 PRODUCT.md / DESIGN.md 概念）
2. **Design Read / Hypothesis**：實作前用一段話宣告「此頁要服務誰、要先回答什麼、主閱讀方向、為何選此構圖、哪些已知內容會撐起它、哪個風險最高」。學員可以糾正假設。（Design Taste）
3. **按需查規則**：Layout 問題只找 Layout / Editorial；品牌圖像與排版找 UI；動效找 Motion；內容真實度找 Content Readiness。不要把 11 套外部 Skills 全加進 prompt。（Better Design）
4. **雙重批評**：規則機器檢查可及性、overflow、缺少 focus、重複任意 token；人工看實際畫面決定構圖、美感與情感信任。自動 PASS ≠ visually approved。（Impeccable）
5. **相同內容的中性對照**：保持客群、文案、圖像集、字型、顏色一致，比較 Hero 比例、欄位位置、內容順序、Article/Services/About 版面、手機動線；只有顏色不同不算新 Layout。（PR47 + Design Taste）
6. **設計探索有停止條件**：先提出可解釋的 2–3 個不同構圖方向，再收斂選擇、完成首頁與內頁；不無限生成十幾款形式相似的 Hero。（Superdesign 模式的 ATP 取捨）

## 4. P0 共用設計判斷規則（可供現有 Skills 引用）

### 4.1 輸入與證據（不可跳過）
- 固定區分 `observed`、`user-provided`、`design-inference`、`demo-only`、`missing`。
- 真實內容優先：可提供長短不一的標題、自然長度內文、本人照片；沒有真實資料時不要自動塞相同長度的三卡、虛構證照 / 見證 / 價格 / 訂閱成功 / 排程成功。
- 不確定的欄位應隱藏、待設定或明確 Demo；按鈕不得導向假的服務流程。
- 設計審查應記錄 screenshot path / viewport / git SHA / fixture / review date；未取得證據時標記 not tested。

### 4.2 版面（Layout/Editorial）
- 每個主頁先定一個主焦點與閱讀路徑；優先比較 **不靠換皮仍辨識的結構**。
- 不預設置中標語 + 雙 CTA + 三等寬 icon cards；但如內容客觀上正好三項，三欄可以成立，禁止的是「無理由的預設」。
- 內容長度應驅動 Hero 寬度、標題斷行、圖片比例、清單樣式；不要裁剪重要資訊只為維持整齊。
- 反罐頭不是一律改成不對稱：頁面可用高度規整對稱，須能解釋選擇與使用情境。
- 同一品牌的 About / Article Detail / Service Detail 必須繼承首頁視覺語言，但可依任務改資訊密度與佈局。
- 最少測空內容、單篇 / 單服務、長 CJK、無圖 / 有圖；無圖也應具備可辨識構圖。

### 4.3 字體、圖像與 Brand
- 遵循現存 Design Tokens；不能靜默新增任意字級、Spacing、Shadow、Radius。
- 先校正層級、行寬、CJK 換行、行距，再談字型風格；不能認為 Serif 就必然有編輯質感。
- Image brief 說明主體、構圖、裁切、光線、功能與授權；素材取自學員提供或可核實授權，不複製參考站圖片。
- 色彩不作 Layout 差異的證據；色彩與背景應服務內容層級與可讀性。
- 結構、內容與照片應當先對齊，再做 hover 或裝飾。

### 4.4 Motion
- 每個效果輸出 `target`、`purpose`、`effect`、`fallback`、`qa`；允許 `none`。
- 預設 subtle；保留現有 Astro 原生效果，不為 UI 動畫引 React / GSAP / WebGL。
- reduced-motion、pointer coarse、no-JS、keyboard 功能要成立。
- 不允許動畫遮住長文、讓用戶等待內容、假裝提交成功。

### 4.5 設計 Critique 必須可執行
輸出每個議題的：**觀察證據 → 訪客後果 → 原因假說 → 最小修改 → 如何驗證**。
不得只說「缺乏設計感」「再高級一點」，或只給空泛 8/10。
將「技術可測」與「人工視覺」分兩份結論；未測試不能填 PASS。

## 5. P0 設計審查 Rubric

| 面向 | 判斷問題 | 測試方法 | 阻塞級 |
|---|---|---|---|
| 目標 / IA | 進站是否知道寫什麼 / 幫誰 / 下一步 | 首屏+導航閱讀，2 類客群不同任務 | 高 |
| 結構差異 | 同內容同 Theme 下還能區分不同 Layout？ | Neutral Fixture 並排，Hero / lists / inner pages / mobile 逐項比 | 高（版型庫） |
| 視覺階層 | 第一視覺焦點、次要訊息清楚？ | 1440 / 1280 / 768 / 390 screenshot 人工審閱 | 高 |
| Content-first | 一項服務、三篇文章、長標是否不需假資料？ | Empty / sparse / long CJK / missing image fixtures | 高 |
| 真實信任 | 資格 / 評語 / 價格 / 聯絡 / 外部預約是否有事實？ | 欄位來源與實際連結核對 | 阻塞 |
| CJK / 影像 | 中文換行、段距、圖片主體與裁切合理？ | 四視口視覺回歸 | 中高 |
| CTA / 導航 | Primary 與低壓入口明確、使用者可返回？ | 鍵盤 / 觸控 / no-JS 功能 | 高 |
| 可及性 | 對比、focus、touch、縮放與 reduced motion 是否合理？ | 靜態檢查 + axe + 人工鍵盤 / 讀屏 | 阻塞（嚴重問題） |
| 技術品質 | build / Base URL / Pagefind / 截斷 / CSS 依賴 | CI + Preview 真站驗證 | 高 |
| 品牌一致 | 不是只換色而首頁 / 內頁似乎不屬一站？ | Cross-page 人工設計批評 | 中高 |

Rubric 不產生憑空美學統分，也不直接把第三方前端 Repo 的自評分數當客觀證據。可標 `not-tested / issue / pass-with-evidence`。

## 6. 與現有 ATP Skills 的分工和改動建議

| 所屬 | 將來引用內容 | P0 是否修改既有 Skill |
|---|---|---|
| `astro-layout-craft` | 相同 fixture 的結構差異、跨內頁設計角色、非預設卡片排列 | 否，P0 先存共用參考 |
| `astro-editorial-layout-design` | 真實內容塑形、CJK / 稀疏內容 composition、visual rhythm | 否 |
| `astro-ui-craft` | Design Read、tokens、圖像策略、反罐頭 critique / polish | 否 |
| `astro-motion-craft` | Purpose-first effects、回退、複雜性預算 | 否 |
| `astro-content-readiness` | 缺內容 / 假功能 / 實際圖片與文字準備 | 否 |
| 未來 `astro-design-consultation`（P2） | 學員自然語言需求→參考網站拆解→多方向比較→Design Brief | 尚未建立 |
| PR47（P1） | Neutral Fixture 實圖比較，分開技術 PASS 與人工 Art Direction QA | 不在本 PR 改 |

建議 P1 再經批准，將本文件以簡短 cross-link 加入各 Skill 的適當 reference 區塊；不得在 P0 偷改 PR46 / PR47 的 UI 或 Generator。

## 7. P0 驗收 / 尚未驗證

- [x] 核對貼文提及的十個入口、找回 Better Design 正確倉庫。
- [x] 記錄 Superdesign 舊 IDE 原始碼與新產品的維護落差。
- [x] 對照現存 ATP Skills 的責任與 PR47 Draft 分界。
- [x] 形成可操作 design judgement / critique 參考規則與 rubric。
- [x] 記錄外部套件技術 / 授權的移植邊界。
- [ ] 各第三方 repo 最新 commit / 每個 component 的逐檔授權與 source review；目前以 repo 文件為主要來源。
- [ ] 外部 demo 的正式實機效能 / a11y / 四尺寸測試。
- [ ] ATP 實際 UI 的 P1 視覺 QA（需要真實 Preview 截圖）。
- [ ] 新 Consultation Skill、Starter 接線（分別 P2 / P3）。

## 8. 原始公開來源（研究可追溯）

- Impeccable: https://github.com/pbakaus/impeccable
- Better Design: https://github.com/marvkr/better-design
- Design Taste: https://github.com/madebymustafa/design-taste/blob/main/skills/design-taste/SKILL.md
- Design Taste Code Craft: https://github.com/madebymustafa/design-taste/blob/main/skills/taste-code-craft/SKILL.md
- Superdesign legacy: https://github.com/superdesigndev/superdesign
- Superdesign new skill: https://github.com/superdesigndev/superdesign-skill
- Canvas UI: https://github.com/DavidHDev/canvas-ui
- Paper Shaders: https://github.com/paper-design/shaders
- UI Layouts: https://github.com/ui-layouts/uilayouts
- Hyperiux: https://github.com/Hyperiux-Immersion-Labs/hyperiux-components
- Motion Primitives: https://github.com/ibelick/motion-primitives
- Cursify: https://github.com/ui-layouts/cursify
- Trickle: https://github.com/akaieuan/trickle-UI-kit
- ATP: `AGENTS.md`, `.ai/astro-ui-craft/SKILL.md`, `.ai/astro-layout-craft/SKILL.md`, `.ai/astro-editorial-layout-design/SKILL.md`, `.ai/astro-motion-craft/SKILL.md`, `docs/art-direction/PR47-HANDOFF.md`.

## 9. 外部內容轉用政策

只移植抽象設計原則，不移植品牌、照片、文案、付費特效、完整 UI 實作。MIT / Apache 或其他開源標示也須逐檔核對，再決定是否需要附 LICENSE / NOTICE。這份文件用自己的文字概括研究而非重製原始 Skill。任何未來程式移植應另起 Branch + PR，做 Astro 靜態輸出與四尺寸 QA，使用者明確確認前不 Merge。
