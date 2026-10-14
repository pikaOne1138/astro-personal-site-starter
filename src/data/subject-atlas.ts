// Prototype fixtures only. A null article slug is a planned title, not a published page.
export const atlasTopics = [
  { id: '01', slug: 'observation', name: '觀察', en: 'OBSERVATION', notes: ['城市裡被忽略的五種停留', '一張椅子如何改變一個角落', '把散步變成觀察練習'] },
  { id: '02', slug: 'reading', name: '閱讀', en: 'READING', notes: ['不是每一頁都需要筆記', '一本書與三次重讀'] },
  { id: '03', slug: 'method', name: '方法', en: 'METHOD', notes: ['怎麼建立一份真正有用的主題索引？', '當標籤多到沒有意義'] },
  { id: '04', slug: 'questions', name: '提問', en: 'QUESTIONS', notes: ['有些問題值得留久一點'] },
];
export const atlasEntries = atlasTopics.flatMap(topic => topic.notes.map((title, index) => ({
  topic: topic.slug, topicName: topic.name, title,
  articleSlug: topic.slug === 'method' && index === 0 ? 'sample' : null,
})));
