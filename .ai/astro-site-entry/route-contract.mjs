// Lightweight, optional deterministic routing *contract* for repeatable tests.
// Skills remain responsible for all specialist tasks. A conversational AI may use
// semantics beyond these phrases; this file does not claim to simulate an LLM.
export const OPTIONS={
  new:[
    {id:'from-zero',label:'從零開始，讓 AI 訪談',technical:'C',skills:['astro-site-from-zero']},
    {id:'starter',label:'使用 ATP 現成版型',technical:'B',skills:['astro-starter-onboarding','astro-site-assembly']},
    {id:'replica',label:'參考或遷移既有網站',technical:'A',skills:['url-to-frontend-replica']}
  ],
  improve:[
    {id:'design-audit',label:'AI 網站設計健檢',skills:['astro-design-consultation']},
    {id:'reference',label:'參考網站改造',skills:['astro-design-consultation']},
    {id:'candidates',label:'多種設計候選',skills:['astro-design-consultation','astro-layout-craft']},
    {id:'local-ui',label:'局部區塊微調',skills:['astro-ui-craft']},
    {id:'brand',label:'品牌視覺改造',skills:['astro-ui-craft']},
    {id:'motion',label:'互動與動態精修',skills:['astro-motion-craft']}
  ],
  maintain:[
    {id:'content',label:'更新文章、文字與圖片',skills:['astro-content-publishing','astro-site-maintenance']},
    {id:'feature',label:'新增網站功能或頁面',skills:['astro-page-management','astro-ui-craft']},
    {id:'repair',label:'修復網站問題',skills:['astro-site-maintenance']},
    {id:'preview',label:'預覽、驗收與發布',skills:['astro-pr-preview']},
    {id:'restore',label:'備份、還原與恢復先前版本',skills:['astro-site-maintenance']}
  ]
};
export const FIRST_LAYER=[
  {id:'new',label:'建立新網站'},
  {id:'improve',label:'改善目前的網站'},
  {id:'maintain',label:'維護與處理問題'}
];
const RULES=[
 ['restore',/恢復.{0,8}(昨天|之前|版本)|還原|回復.{0,6}版本|備份/],
 ['repair',/打不開|跑掉|壞掉|故障|404|錯誤|手機版.{0,6}(跑|壞|溢出)/],
 ['content',/發表.{0,8}文章|新增.{0,8}文章|更新.{0,8}文章|寫.{0,8}文章|修改.{0,8}文字|換.{0,8}圖片/],
 ['feature',/新增.{0,8}(FAQ|功能|頁面|選單)|加.{0,8}(FAQ|功能|頁面)/i],
 ['preview',/預覽|驗收|發布|上線/],
 ['replica',/有.{0,8}網站.{0,15}(搬|遷移|重建|復刻)|把.{0,6}網站搬|照著.{0,6}網站重建/],
 ['starter',/ATP.{0,8}(版型|Starter)|現成版型|選.{0,5}模板/],
 ['from-zero',/從零.{0,7}(做|建)|AI.{0,6}訪談|直接.{0,6}訪談/],
 ['reference',/喜歡.{0,8}(這個網站|參考網站)|參考網站|照著.{0,6}(風格|感覺)/],
 ['candidates',/(兩|三|四|多)種.{0,8}(首頁|設計|方向|候選)|不同.{0,8}(版型|首頁|設計)/],
 ['local-ui',/(把|讓).{0,10}(照片|圖片|按鈕|第二段|第三段|區塊).{0,8}(放大|縮小|調整|移動|修改)|修改.{0,8}(首頁|第二段|第三段).{0,8}(照片|圖片|大小)/],
 ['brand',/個人風格|品牌.{0,6}(視覺|色彩|字體)|全站.{0,6}(配色|字體)|風格一致/],
 ['motion',/動態感|動效|動畫|互動效果|操作回饋/],
 ['design-audit',/首頁.{0,10}(普通|不好看|單調)|網站.{0,10}(普通|不好看|不美)|設計健檢/]
];
const IMPROVE=new Set(OPTIONS.improve.map(x=>x.id)),MAINTAIN=new Set(OPTIONS.maintain.map(x=>x.id));
const findOption=id=>Object.entries(OPTIONS).flatMap(([group,items])=>items.map(item=>({...item,group}))).find(x=>x.id===id);
const uniq=x=>[...new Set(x)];
const menu=layer=>({type:layer==='first'?'first-menu':'second-menu',layer,options:layer==='first'?FIRST_LAYER:OPTIONS[layer],routes:[],skills:[],preserveContext:true});
export function routeIntent(message,{menuLayer=null,confirmed={},hasRepoAccess=false}={}){
  const input=String(message||'').trim();
  if(menuLayer==='first' && /^[123一二三①②③]$/.test(input)){
    const number={'1':0,'一':0,'①':0,'2':1,'二':1,'②':1,'3':2,'三':2,'③':2}[input];
    return menu(FIRST_LAYER[number].id);
  }
  if(menuLayer && menuLayer!=='first' && /^[1-6一二三四五六①②③④⑤⑥]$/.test(input)){
    const number={'1':0,'一':0,'①':0,'2':1,'二':1,'②':1,'3':2,'三':2,'③':2,'4':3,'四':3,'④':3,'5':4,'五':4,'⑤':4,'6':5,'六':5,'⑥':5}[input];
    const item=OPTIONS[menuLayer]?.[number];
    if(item)return result([item.id],confirmed,hasRepoAccess);
  }
  const ids=RULES.filter(([,pattern])=>pattern.test(input)).map(([id])=>id);
  if(ids.length)return result(ids,confirmed,hasRepoAccess);
  if(/想.{0,8}(建|做).{0,8}網站|個人網站/.test(input))return menu('new');
  if(/改善.{0,8}網站|修改網站|改網站/.test(input))return menu('improve');
  return menu('first');
}
function result(ids,confirmed,hasRepoAccess){
  const routes=uniq(ids).map(findOption).filter(Boolean);
  const skills=uniq(routes.flatMap(x=>x.skills));
  const existing=routes.some(x=>x.group!=='new');
  return {
    type:'direct',routes:routes.map(({id,group,technical})=>({id,group,...(technical?{technical}:{})})),
    skills:existing?uniq(['astro-site-maintenance',...skills]):skills,
    needsRepo:existing && !hasRepoAccess, // discussion may still proceed without access
    canDiscussWithoutRepo:true,
    noExporter:existing,
    preserveContext:true,
    confirmed // caller-owned knowledge is passed through, never overwritten
  };
}
