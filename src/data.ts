export const themes = ['paper','morning','studio','botanical'] as const;
export const kinds = ['knowledge','helper'] as const;
export type Theme = typeof themes[number];
export type Kind = typeof kinds[number];

export const themeMeta = {
  paper: { label: 'Paper & Ink', zh: '紙墨', mood: '有深度・像一本排版講究的獨立刊物' },
  morning: { label: 'Morning Light', zh: '晨光', mood: '溫暖安心・像早晨灑進房間的光' },
  studio: { label: 'Quiet Studio', zh: '靜室', mood: '清晰可靠・像一間安靜精準的工作室' },
  botanical: { label: 'Botanical Calm', zh: '植感', mood: '自然舒展・像午後走進一座安靜的花園' },
} as const;

export const kindMeta = {
  knowledge: {
    label: '知識／部落格',
    eyebrow: 'A · KNOWLEDGE / BLOG',
    title: '把散落的知道，整理成值得回來閱讀的地方。',
    intro: '適合長期寫作、觀點累積與 SEO 的個人內容基地。首頁不是資訊牆，而是幫第一次來的人快速找到「從哪裡開始讀」。',
  },
  helper: {
    label: '助人者／專業服務',
    eyebrow: 'B · HELPER / PROFESSIONAL',
    title: '先讓人感覺被理解，再讓專業變得可以靠近。',
    intro: '適合心理師、教練、療癒師、身體工作者與顧問。網站負責建立信任、說清楚合作方式，並把訪客帶到低壓力的下一步。',
  },
} as const;
