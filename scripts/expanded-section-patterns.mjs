// Expanded adapters retain the existing StarterPlan selection and Block interfaces.
// Only deterministic composition slots are accepted; arbitrary prose is not ignored.
export function normalizeExpandedPatterns(selections,kind,navigation){
 if(selections===undefined)return [];
 if(!Array.isArray(selections)||selections.length>40)throw Error('Invalid sectionPatterns');
 const text=(value,label,max=5000)=>{if(typeof value!=='string'||!value.trim()||value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value))throw Error('Invalid pattern '+label);return value.trim()};
 const strings=(value,label,required=false)=>{if(value===undefined&&!required)return [];if(!Array.isArray(value)||value.length>20||required&&!value.length)throw Error('Invalid pattern '+label);return value.map(v=>text(v,label))};
 const https=value=>{let u;try{u=new URL(text(value,'HTTPS URL',2000))}catch{throw Error('Pattern links require HTTPS URLs without credentials')};if(u.protocol!=='https:'||u.username||u.password)throw Error('Pattern links require HTTPS URLs without credentials');return u.href};
 const action=value=>{if(value===undefined)return undefined;if(!value||Boolean(value.pageId)===Boolean(value.url))throw Error('Pattern action requires exactly one pageId or URL');const label=text(value.label,'action label',120);if(value.pageId){if(!navigation.some(n=>n.enabled&&n.id===value.pageId))throw Error('Pattern action page must be enabled');return {label,pageId:value.pageId}}return {label,url:https(value.url)}};
 const seen=new Set();let footers=0;
 return selections.map(p=>{
  if(!p||typeof p.patternId!=='string')throw Error('Invalid pattern selection');
  const key=p.patternId+'@'+p.targetPage;if(seen.has(key))throw Error('Duplicate pattern selection');seen.add(key);
  if(p.patternId.startsWith('footer-')){if(!['footer-minimal','footer-editorial','footer-professional'].includes(p.patternId)||p.targetPage!=='site-wide'||++footers>1)throw Error('Invalid footer pattern');text(p.insertAfter,'footer position',180);return p;}
  if(!['featured-work','trust-service-path'].includes(p.patternId)||p.patternId==='trust-service-path'&&kind!=='helper')throw Error('Pattern is incompatible with site kind');
  if(p.targetPage!=='/'&&!navigation.some(n=>n.enabled&&n.id===p.targetPage))throw Error('Pattern target page must be enabled');
  const aliases={'主要內容之後':'page-end','首頁介紹後':'after-intro','首頁自介後':'after-intro'};
  const position=aliases[p.insertAfter]??p.insertAfter;
  if(!['page-end','after-intro'].includes(position)||position==='after-intro'&&p.targetPage!=='/')throw Error('Pattern insertAfter must be page-end (主要內容之後), or after-intro on the homepage');
  const c=p.content;if(!c||typeof c!=='object'||Array.isArray(c))throw Error('Pattern '+p.patternId+' requires real content; see docs/student-builder-pack/SECTION-PATTERNS.md');
  const content={title:text(c.title,'title',200),description:c.description===undefined?'':text(c.description,'description'),action:action(c.action)};
  if(p.patternId==='featured-work'){
   if(c.items!==undefined&&(!Array.isArray(c.items)||c.items.length>6))throw Error('Pattern items must contain up to six works');
   content.items=(c.items??[]).map(item=>({title:text(item?.title,'work title',200),description:text(item?.description,'work description'),...(item.url?{url:https(item.url)}:{})}));
   content.articleSlugs=strings(c.articleSlugs,'articleSlugs');
   if(content.articleSlugs.length&&!navigation.some(n=>n.enabled&&n.id==='articles'))throw Error('Pattern articleSlugs require an enabled articles page');
   if(content.articleSlugs.some(s=>!/^([a-z0-9]+-)*[a-z0-9]+$/.test(s)||s.length>64)||new Set(content.articleSlugs).size!==content.articleSlugs.length)throw Error('Invalid pattern articleSlugs');
   if(!content.items.length&&!content.articleSlugs.length||content.items.length+content.articleSlugs.length>6)throw Error('Featured pattern requires one to six real works or articleSlugs');
  }else{
   content.description=text(c.description,'service description');
   content.suitable=strings(c.suitable,'suitable',true);content.notSuitable=strings(c.notSuitable,'notSuitable',true);
   for(const key of ['notice','professionalName','format','policy'])if(c[key]!==undefined)content[key]=text(c[key],key);
   for(const key of ['credentials','areas'])content[key]=strings(c[key],key);
  }
  return {patternId:p.patternId,targetPage:p.targetPage,insertAfter:position,content};
 });
}
