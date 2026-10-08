# Manus v2：動效 API 與本專案整合對照

來源：使用者提供的 Manus v2 README、Catalog 和 ZIP 內 component 源碼（2026-10-08）。此文件描述**參考專案**的 API，不代表本專案已包含該元件。新增前以實際原始碼、Props 與授權逐項檢查。

| 原始檔 | Manus v2 參數／限制 | 本專案建議 | 現況 |
|---|---|---|---|
| `effects/Reveal.astro` | `variant=fade-up/fade/soft-zoom/blur-up/slide-left/slide-right/clip-up`；`delay` 0–1400ms；`duration` 350–1400ms；`once`；`className` | 把現有 global `data-reveal` 整理為可用 variants，或建立封裝但不得啟動雙 observer；預設 subtle | global reveal 已有，7 variants 待移植 |
| `effects/StaggerGroup.astro` | `step` 20–260ms；`start` 0–1200ms；只管直接子層 `[data-reveal]`，累積延遲上限 1600ms | 建議每組 3–6 項且總延遲 ≤ 600ms；超過直接顯示 | 待移植 |
| `effects/MotionCard.astro` | `reveal`、`tilt`、`spotlight`、`tiltMax` 1–8° 預設 4°；細游標與非 reduce 才追蹤 rAF | 採用 optional API，主題採 `--accent` 等既有 token；只在少量展示卡，避免重複套 `PostCard` hover | 簡單 hover 已有，3D/Spotlight 待移植 |
| `effects/ZoomImage.astro` | `effect=zoom/pan/none`；`src`、`alt`、`href`、`aspectRatio`、`position`、`loading`、`className`，pan 游標偏移約 10px/8px | 支援圖說 alt；無障礙，文字截圖禁用 pan；避免指定外站不受控素材 | 待移植 |
| `effects/UnderlineLink.astro` | `variant=grow/center/marker`、`arrow`、`external`、`className` | 與現有 a:hover / focus-visible 合併；不能完全依賴 hover | 待移植 |
| `common/Button.astro` | `magnetic`；滑鼠輕微牽引與 shimmer | 以現有 Button 為基底加選配；不為磁吸破壞原 CTA 點擊範圍 | 待擴充 |
| `common/FAQAccordion.astro` | 原生 `details/summary`、`variant=line/soft/cards`、`openFirst`、`className` | 保留本專案 FAQ 既有內容，補 variants 與瀏覽器漸進增強；避免多個同義 FAQ | FAQ 已有，variants 待擴充 |
| `blog/ReadingProgress.astro` | 顏色 `forest/warm/ink` | 本專案已實作 ReadingProgress，顏色由四套 `--accent` token 決定，不另外複製 forest palette | 已有 |
| `common/SiteHeader.astro` | `glass={false}` 關閉模糊 | 本專案使用**不透底 sticky header**；預設不得開 glass | 已有實作符合 |
| `src/styles/tailwind.css` | Tailwind CSS 4 + `@tailwindcss/vite`、`@theme inline`、`@source`、className 靜態掃描 | 本專案 Astro 5 + 自定 CSS tokens，**先不引入 Tailwind**。若真的需要 className 支援，用 Astro `class:list` + CSS variables；屬於獨立架構提案 | 未整合，刻意維持現況 |

## 避免「變成 AI 網站」的視覺規範

- 元件的角色比效果重要：文章欄保持穩定，動效只在少數區段轉折處使用；助人者的信任、資格、費用和預約區避免大幅滑動。
- 不要把每張卡片加同一套圓角、灰底、左邊綠條與上浮；文章卡、服務卡、專業者卡須採不同資訊層級。
- `paper` 以細線＋排版為主；`morning` 較柔和；`studio` 節制；`botanical` 可少量柔焦/景深。這些是**預設風格傾向，皆可個別關閉**，不是使用者被職業綁死。
- 重要資訊、操作回饋、鍵盤 focus 無論動態開關皆須清楚。

## 可參考的元件骨架

```astro
---
// 假想的未來 Reveal.astro Props，不是當前 repo 已有檔案。
interface Props { variant?: 'fade-up'|'fade'|'soft-zoom'; intensity?: 'off'|'subtle'|'expressive'; once?: boolean; className?: string; }
const {variant='fade-up',intensity='subtle',once=true,className=''}=Astro.props;
---
<div class:list={['motion-reveal',`motion-reveal--${variant}`,`motion--${intensity}`,className]} data-motion-once={once}><slot /></div>
```

範例僅是 API 草圖。實作需要搭配 JS、CSS、no-JS 可見性與減少動態檢查，不能直接宣稱執行。
