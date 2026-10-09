import patterns from './section-patterns.registry.json';
/** Student configuration contract. This file is intentionally independent of the workshop demo navigation. */
export const starterKinds = ['knowledge','helper'] as const;
export const starterThemes = ['paper','morning','studio','botanical'] as const;
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
export interface StarterNavigationItem {id:string;label:string;enabled:boolean;parentId?:string;}
export interface StarterPatternChoice {patternId:string;targetPage:string;insertAfter:string;}
export interface StarterPlan {
  version: 1;
  kind: StarterKind;
  layoutSlug: string;
  visualTheme: StarterTheme;
  brand: { name: string; primaryColor: string; tagline: string; logoPath?: string; palette?: {primary:string;secondary:string;accent:string;background:string;text:string} };
  navigation: StarterNavigationItem[];
  primaryCta: { label: string; pageId: string };
  sectionPatterns?: StarterPatternChoice[];
  notes: string;
}
export const starterThemeSeeds:Record<StarterTheme,string> = {
  paper:'#9A3B2E',morning:'#C8775A',studio:'#2F5D50',botanical:'#50775B',
};
export const starterThemePalettes:Record<StarterTheme,{primary:string;secondary:string;accent:string;background:string;text:string}> = {
 paper:{primary:'#9A3B2E',secondary:'#806A54',accent:'#C58D63',background:'#F8F5EF',text:'#28231F'},
 morning:{primary:'#C8775A',secondary:'#7F8F80',accent:'#B65B75',background:'#FFF8F3',text:'#362B29'},
 studio:{primary:'#2F5D50',secondary:'#708A7A',accent:'#B17C60',background:'#F6F7F3',text:'#23312D'},
 botanical:{primary:'#50775B',secondary:'#8D9B72',accent:'#B48569',background:'#F6F7EF',text:'#28392E'},
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
  const available=starterPages[plan.kind].map(p=>p.id as string);
  const selected=plan.navigation.filter(x=>x.enabled);
  if(selected.length<2||selected.length>20)errors.push('請啟用 2 至 20 個頁面');
  if(selected.filter(x=>!x.parentId).length>12)errors.push('最多 12 個第一層項目；更多內容請放到第二層');
  const ids=plan.navigation.map(x=>x.id);
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
