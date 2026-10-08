import { kinds, themes, type Kind, type Theme } from './data';

export type PageId =
  | 'articles' | 'topics' | 'start-here' | 'about' | 'resources'
  | 'services' | 'first-visit' | 'faq' | 'booking';

export const pageMap: Record<Kind, Array<{id: PageId; label: string; nav?: boolean}>> = {
  knowledge: [
    { id: 'articles', label: '文章', nav: true },
    { id: 'topics', label: '主題', nav: true },
    { id: 'start-here', label: 'Start Here', nav: true },
    { id: 'about', label: '關於我', nav: true },
    { id: 'resources', label: '資源' },
  ],
  helper: [
    { id: 'services', label: '服務項目', nav: true },
    { id: 'first-visit', label: '第一次來？', nav: true },
    { id: 'about', label: '關於我', nav: true },
    { id: 'articles', label: '文章', nav: true },
    { id: 'faq', label: 'FAQ', nav: true },
    { id: 'booking', label: '預約聯絡' },
  ],
};

export const detailPages = {
  articles: [
    { slug: 'make-complex-things-clear', title: '把複雜的事，寫成願意重讀的文字' },
    { slug: 'homepage-is-a-lobby', title: '首頁是大廳，不是整棟房子' },
  ],
  services: [
    { slug: 'first-conversation', title: '第一次對談' },
    { slug: 'deep-support', title: '深度陪伴' },
  ],
};

export const allTopLevelPaths = () =>
  kinds.flatMap((kind) =>
    themes.flatMap((theme) =>
      pageMap[kind].map((page) => ({
        params: { kind, theme, page: page.id },
        props: { kind, theme, page: page.id },
      }))
    )
  );

export const allArticlePaths = () =>
  kinds.flatMap((kind) =>
    themes.flatMap((theme) =>
      detailPages.articles.map((article) => ({
        params: { kind, theme, slug: article.slug },
        props: { kind, theme, article },
      }))
    )
  );

export const allServicePaths = () =>
  themes.flatMap((theme) =>
    detailPages.services.map((service) => ({
      params: { kind: 'helper', theme, slug: service.slug },
      props: { kind: 'helper' as Kind, theme: theme as Theme, service },
    }))
  );
