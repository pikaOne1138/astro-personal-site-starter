import source from './art-direction-layout-content.json';

const safe = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim() ? value.trim() : fallback;

export function getDirectionContent(slug: string, kind: 'knowledge' | 'helper', root: string, detailRoute: string) {
  const raw = (source as any)[kind] ?? {};
  const layout = (source.layouts as Record<string, {headline?: string|null; about?: string|null}>)[slug] ?? {};
  const data = {
    siteName: safe(raw.siteName, '未命名網站'),
    headline: safe(layout.headline, safe(raw.headline, '尚未設定首頁標題')),
    intro: safe(raw.intro, '網站介紹待設定'),
    about: safe(layout.about, safe(raw.about, '關於資訊待設定')),
  };
  if (kind === 'knowledge') {
    const original: any[] = Array.isArray(raw.articles) ? raw.articles : [];
    const validSlug = (value: unknown, index: number) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? value : `note-${index+1}`;
    const articles = original.map((item, index) => ({
      id: String(index + 1).padStart(2, '0'),
      slug: validSlug(item?.slug,index),
      title: safe(item?.title, '未命名文章'),
      summary: safe(item?.summary, '文章摘要待補'),
      text: safe(item?.summary, '文章摘要待補'),
      sub: safe(item?.summary, '文章摘要待補'),
      tag: safe(item?.tag, '未分類'),
      topic: safe(item?.tag, '未分類'),
      date: safe(item?.date, '日期待設定'),
      image: typeof item?.image === 'string' && item.image.trim() ? item.image : null,
      body: Array.isArray(item?.body) ? item.body.filter((p: unknown) => typeof p === 'string' && !!p.trim()) : [],
      published: item?.published === true,
      href: item?.published === true ? root + (index === 0 ? detailRoute : 'articles/' + validSlug(item?.slug,index) + '/') : undefined,
      no: String(index + 1).padStart(2, '0'),
    }));
    return {...data, kind, articles, posts: articles, rows: articles, primary: articles.find(p=>p.published) ?? null, services: [], questions: []};
  }
  const original: any[] = Array.isArray(raw.services) ? raw.services : [];
  const validSlug = (value: unknown, index: number) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? value : `service-${index+1}`;
  const services = original.map((item, index) => ({
    id: String(index + 1).padStart(2,'0'),
    slug: validSlug(item?.slug,index),
    name: safe(item?.title,'服務項目待設定'),
    title: safe(item?.title,'服務項目待設定'),
    description: safe(item?.summary,'服務說明待設定'),
    summary: safe(item?.summary,'服務說明待設定'),
    body: Array.isArray(item?.body) ? item.body.filter((p: unknown)=>typeof p==='string' && !!p.trim()) : [],
    fit: safe(item?.fit,'適用對象待提供者確認'),
    format: safe(item?.format,'服務方式待設定'),
    duration: safe(item?.duration,'服務時長待設定'),
    price: safe(item?.price,'實際費用待設定'),
    scope: safe(item?.scope,'服務界線待核實'),
    credential: safe(item?.credential,'資格待核實'),
    image: typeof item?.image==='string' && item.image.trim() ? item.image : null,
    href: item?.published===true ? root + (index === 0 ? detailRoute : 'services/' + validSlug(item?.slug,index) + '/') : undefined,
  }));
  const questions = (Array.isArray(raw.questions) ? raw.questions : [])
    .filter((q: any)=>q && (typeof q.question==='string'||typeof q.answer==='string'))
    .map((q: any)=>({question:safe(q.question,'待補問題'),answer:safe(q.answer,'答案尚未設定')}));
  return {...data,kind,services,questions,articles:[],posts:[],rows:[],primary:services.find(s=>!!s.href) ?? null};
}
