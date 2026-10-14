import patterns from './section-patterns.registry.json';
/** Student configuration contract. This file is intentionally independent of the workshop demo navigation. */
export const starterKinds = ['knowledge','helper'] as const;
export const starterThemes = ['paper','morning','studio','botanical','ocean','sand','slate','lavender'] as const;
export type StarterKind = typeof starterKinds[number];
export type StarterTheme = typeof starterThemes[number];

export const starterPages = {
  knowledge: [
    {id:'articles',label:'文章',enabled:true},
    {id:'topics',label:'主題',enabled:true},
    {id:'start-here',label:'開始閱讀',enabled:true},
    {id:'about',label:'關於我',enabled:true},
    {id:'resources',label:'資源',enabled:false},
  ],
  helper: [
    {id:'services',label:'服務項目',enabled:true},
    {id:'first-visit',label:'合作流程',enabled:true},
    {id:'about',label:'關於我',enabled:true},
    {id:'faq',label:'常見問題',enabled:true},
    {id:'articles',label:'文章',enabled:false},
    {id:'booking',label:'聯絡方式',enabled:true},
  ],
} as const;
export type StarterPageId = typeof starterPages[StarterKind][number]['id'];
export interface StarterNavigationItem {id:string;label:string;enabled:boolean;parentId?:string;path?:string;}
export interface StarterPatternChoice {patternId:string;targetPage:string;insertAfter:string;}
export interface StarterPlan {
  version: 1;
  kind: StarterKind;
  layoutSlug: string;
  visualTheme: StarterTheme;
  brand: { name: string; primaryColor: string; tagline: string; logoPath?: string; typography?: 'editorial-serif'|'clear-sans'|'balanced'; imageStyle?: 'natural'|'documentary'|'minimal'; heroImagePath?: string; heroImageAlt?: string; palette?: {primary:string;secondary:string;accent:string;background:string;text:string} };
  navigation: StarterNavigationItem[];
  primaryCta: { label: string; pageId: string };
  sectionPatterns?: StarterPatternChoice[];
  assets?: Array<{path:string;mime:string;base64:string}>;
  content?: {headline?:string;intro?:string};
  notes: string;
  reading?: {records:Array<{month:string;title:string;note:string}>;annualBook?:{title:string;note:string}};
  media?: {episodeAudioPath?:string;episodeTranscript?:Array<{time:string;text:string}>};
  serviceFacts?: Partial<Record<'duration'|'price'|'cancellation'|'qualification'|'contact',string>>;
}

export const starterThemeSeeds:Record<StarterTheme,string> = {
  paper:'#9A3B2E',morning:'#C8775A',studio:'#2F5D50',botanical:'#50775B',
 ocean:'#245D78',sand:'#9C603B',slate:'#475569',lavender:'#705A95',
};
export const starterThemePalettes:Record<StarterTheme,{primary:string;secondary:string;accent:string;background:string;text:string}> = {
 paper:{primary:'#9A3B2E',secondary:'#806A54',accent:'#895432',background:'#F8F5EF',text:'#28231F'},
 morning:{primary:'#C8775A',secondary:'#7F8F80',accent:'#B65B75',background:'#FFF8F3',text:'#362B29'},
 studio:{primary:'#2F5D50',secondary:'#708A7A',accent:'#B17C60',background:'#F6F7F3',text:'#23312D'},
 botanical:{primary:'#50775B',secondary:'#596A45',accent:'#8A5A3E',background:'#F6F7EF',text:'#28392E'},
 ocean:{primary:'#245D78',secondary:'#647E88',accent:'#B57949',background:'#F5F8FA',text:'#1E303A'},
 sand:{primary:'#9C603B',secondary:'#877E69',accent:'#6B826C',background:'#FBF7EF',text:'#352A23'},
 slate:{primary:'#475569',secondary:'#657784',accent:'#7A5530',background:'#F4F6F8',text:'#202C39'},
 lavender:{primary:'#705A95',secondary:'#857F99',accent:'#A56D82',background:'#F8F6FB',text:'#30283C'},
};
export function checkStarterPlan(plan:StarterPlan, availableLayouts:Array<{kind:string;slug:string}>):string[] {
  const errors:string[]=[];
  if(!starterKinds.includes(plan.kind))errors.push('網站用途不正確');
  if(!availableLayouts.some(x=>x.kind===plan.kind && x.slug===plan.layoutSlug))errors.push('版型與網站用途不一致');
  if(!starterThemes.includes(plan.visualTheme))errors.push('視覺主題不正確');
  if(!/^#[0-9a-fA-F]{6}$/.test(plan.brand.primaryColor))errors.push('品牌主色必須是 HEX');
  if(!plan.brand.name.trim())errors.push('網站名稱不能留空');
  if(plan.brand.palette){
    const colors=plan.brand.palette;
    if(['primary','secondary','accent','background','text'].some(k=>!/^#[0-9a-fA-F]{6}$/.test(colors[k as keyof typeof colors]||'')))errors.push('品牌色盤必須提供五個有效 HEX 色碼');
    if(colors.primary.toUpperCase()!==plan.brand.primaryColor.toUpperCase())errors.push('主色需與色盤一致');
  }
  const brand=plan.brand;
  if(brand.typography && !['editorial-serif','clear-sans','balanced'].includes(brand.typography))errors.push('字體組合無效');
  if(brand.imageStyle && !['natural','documentary','minimal'].includes(brand.imageStyle))errors.push('圖片風格無效');
  if(brand.logoPath && !/^\/images\/[a-z0-9/_-]+\.(?:webp|png|jpe?g|avif)$/i.test(brand.logoPath))errors.push('Logo 請使用網站本地的 PNG、WebP、JPG 或 AVIF');
  if(brand.heroImagePath && !/^\/images\/[a-z0-9/_-]+\.(?:webp|png|jpe?g|avif)$/i.test(brand.heroImagePath))errors.push('主視覺圖片需使用網站自己的 /images/ 檔案路徑');
  if(brand.heroImageAlt && (brand.heroImageAlt.length>180 || !brand.heroImagePath))errors.push('主視覺替代文字需要有效的圖片路徑');
  if(plan.reading?.records && plan.reading.records.some(x=>!/^(0[1-9]|1[0-2])$/.test(x.month)||!x.title.trim()||!x.note.trim()))errors.push('閱讀紀錄需要月份、實際書名與真實評註');
  if(plan.reading?.annualBook && (!plan.reading.annualBook.title.trim()||!plan.reading.annualBook.note.trim()))errors.push('年度選書請同時提供書名與理由');
  if(plan.media?.episodeAudioPath&&!/^\/audio\/[a-z0-9/_-]+\.(mp3|wav|ogg|m4a)$/i.test(plan.media.episodeAudioPath))errors.push('音檔請使用 /audio/ 本地音檔路徑');
  if(plan.serviceFacts && Object.values(plan.serviceFacts).some(x=>typeof x!=='string'||x.length>500))errors.push('服務資訊欄位太長');
  if(plan.content && ((plan.content.headline?.length??0)>120||(plan.content.intro?.length??0)>800))errors.push('首頁標題或介紹文字太長');
  if(plan.assets?.some(x=>!/^\/images\/(brand-logo|hero-image)\.(png|jpg|webp|avif)$/.test(x.path)||!/^image\/(png|jpeg|webp|avif)$/.test(x.mime)||!x.base64||x.base64.length>6000000))errors.push('圖片格式或大小無效，最多約 4 MB');
  const available=starterPages[plan.kind].map(p=>p.id as string);
  const selected=plan.navigation.filter(x=>x.enabled);
  if(selected.length<2||selected.length>20)errors.push('請啟用 2 至 20 個頁面');
  if(selected.filter(x=>!x.parentId).length>12)errors.push('最多 12 個第一層項目；更多內容請放到第二層');
  const ids=plan.navigation.map(x=>x.id);
  if(plan.navigation.some(x=>x.id==='articles'&&x.path&&x.path!=='articles/'))errors.push('文章封存入口固定為 articles/，目前不支援更改');
  const paths=plan.navigation.map(x=>x.path??x.id+'/');
  if(paths.some(p=>!/^([a-z0-9-]+\/)+$/.test(p)||p.startsWith('articles/')&&p!=='articles/'||p.includes('//'))||new Set(paths).size!==paths.length)errors.push('頁面網址無效或重複；請使用相對路徑，例如 start-here/tools/');
  if(ids.some(id=>!available.includes(id)&&!/^page-[a-z0-9-]{1,32}$/.test(id))||new Set(ids).size!==ids.length)errors.push('導覽頁面有重複或無效的路由');
  if(selected.some(x=>x.parentId&&(!selected.some(p=>p.id===x.parentId&&!p.parentId)||x.parentId===x.id)))errors.push('子選單必須有已啟用的第一層父項目，不支援第三層');
  if(selected.some(x=>x.parentId&&selected.filter(y=>y.parentId===x.parentId).length>10))errors.push('單組子選單最多 10 項');
  if(selected.some(x=>!x.label.trim()))errors.push('已啟用的導覽名稱不能留空');
  if(!selected.some(x=>x.id===plan.primaryCta.pageId))errors.push('主要行動入口必須指向已啟用的頁面');
  const patternsChosen=plan.sectionPatterns||[];
  const footerCount=patternsChosen.filter(x=>x.patternId.startsWith('footer-')).length;
  if(footerCount>1)errors.push('頁腳組合只能選一款');
  const enabledPages=new Set(selected.map(x=>x.id));
  if(patternsChosen.some(x=>{
    const known=patterns.find(p=>p.id===x.patternId);
    return !known||!known.kind.includes(plan.kind)||!x.insertAfter?.trim()||x.insertAfter.length>180||
      (x.patternId.startsWith('footer-')?x.targetPage!=='site-wide':!(x.targetPage==='/'||enabledPages.has(x.targetPage)));
  }))errors.push('區段樣板與網站類型、頁面或位置不相容');
  if(new Set(patternsChosen.map(x=>x.patternId+'@'+x.targetPage)).size!==patternsChosen.length)errors.push('同一頁不能重複放相同樣板');
  return errors;
}
