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
export interface StarterNavigationItem {id:string;label:string;enabled:boolean;}
export interface StarterPlan {
  version: 1;
  kind: StarterKind;
  layoutSlug: string;
  visualTheme: StarterTheme;
  brand: { name: string; primaryColor: string; tagline: string; logoPath?: string };
  navigation: StarterNavigationItem[];
  primaryCta: { label: string; pageId: string };
  notes: string;
}
export const starterThemeSeeds:Record<StarterTheme,string> = {
  paper:'#9A3B2E',morning:'#C8775A',studio:'#2F5D50',botanical:'#50775B',
};
export function checkStarterPlan(plan:StarterPlan, availableLayouts:Array<{kind:string;slug:string}>):string[] {
  const errors:string[]=[];
  if(!starterKinds.includes(plan.kind))errors.push('網站用途不正確');
  if(!availableLayouts.some(x=>x.kind===plan.kind && x.slug===plan.layoutSlug))errors.push('版型與網站用途不一致');
  if(!starterThemes.includes(plan.visualTheme))errors.push('視覺主題不正確');
  if(!/^#[0-9a-fA-F]{6}$/.test(plan.brand.primaryColor))errors.push('品牌主色必須是 HEX');
  if(!plan.brand.name.trim())errors.push('網站名稱不能留空');
  const available=starterPages[plan.kind].map(p=>p.id as string);
  const selected=plan.navigation.filter(x=>x.enabled);
  if(selected.length<2||selected.length>6)errors.push('請啟用 2 至 6 個導覽項目');
  const ids=plan.navigation.map(x=>x.id);
  if(ids.some(id=>!available.includes(id))||new Set(ids).size!==ids.length)errors.push('導覽頁面有重複或不存在的路由');
  if(selected.some(x=>!x.label.trim()))errors.push('已啟用的導覽名稱不能留空');
  if(!selected.some(x=>x.id===plan.primaryCta.pageId))errors.push('主要行動入口必須指向已啟用的頁面');
  return errors;
}
