/** V2 workshop article fixtures. Replace with a Content Collection for real blogs. */
export interface ArticleRecord {
  slug:string; title:string; excerpt:string; category:string; tags:string[];
  publishedAt:string; readingMinutes:number;
}
export const articlesV2:ArticleRecord[]=[
{slug:'homepage-is-a-lobby',title:'首頁是大廳，不是整棟房子',excerpt:'讓首頁只負責方向，給詳細文章留出閱讀空間。',category:'網站設計',tags:['Astro','資訊架構'],publishedAt:'2026-10-08',readingMinutes:5},
{slug:'make-complex-things-clear',title:'把複雜的事，寫成願意重讀的文字',excerpt:'從筆記到文章，建立清楚而持續的內容結構。',category:'寫作方法',tags:['寫作','知識整理'],publishedAt:'2026-10-03',readingMinutes:7},
{slug:'organize-knowledge',title:'讓知識能夠重新被找到',excerpt:'分類、標籤與內容索引的簡單起點。',category:'知識整理',tags:['知識整理','資訊架構'],publishedAt:'2026-09-25',readingMinutes:6},
{slug:'astro-starter-notes',title:'給初學者的 Astro 架站筆記',excerpt:'從零開始建立個人內容基地的整理。',category:'網站設計',tags:['Astro','架站'],publishedAt:'2026-09-12',readingMinutes:8},
{slug:'quiet-writing',title:'保留日常觀察的寫作習慣',excerpt:'沒有靈感的日子，也能留下小小的紀錄。',category:'生活筆記',tags:['寫作','生活'],publishedAt:'2026-08-18',readingMinutes:4},
{slug:'one-good-article',title:'一篇文章，可以有很多入口',excerpt:'把文章與其他內容連結，形成能探索的網站。',category:'網站設計',tags:['Astro','資訊架構'],publishedAt:'2026-08-05',readingMinutes:6}
];
export const articleTags=Array.from(new Set(articlesV2.flatMap(a=>a.tags))).map(name=>({name,count:articlesV2.filter(a=>a.tags.includes(name)).length})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name,'zh-Hant'));
export const articleMonths=Array.from(new Set(articlesV2.map(a=>a.publishedAt.slice(0,7)))).sort().reverse().map(month=>({month,count:articlesV2.filter(a=>a.publishedAt.startsWith(month)).length}));
