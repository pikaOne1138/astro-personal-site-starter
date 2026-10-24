// An explicit allowlist: unknown JSON keys are never rendered.
export const definitions=[
 ['scope','服務範圍',true,true,'待站長提供真實服務項目與適合對象'],
 ['exclusions','服務界線',true,true,'待站長確認哪些問題不在服務範圍內'],
 ['method','合作方式',false,true,'待站長說明實際合作或面談方式'],
 ['duration','時間',true,false],['price','費用',true,false],
 ['cancellation','取消方式',true,false],
 ['firstVisit','第一次聯絡',true,true,'待站長說明第一次接觸流程'],
 ['qualification','專業資格',false,false],
 ['hygiene','衛生流程',true,false],['venue','場地資訊',true,false],
 ['precautions','注意事項',true,false]
];
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const safe=x=>typeof x==='string'&&x.trim().length<=500&&!/[<>\x00-\x1f]/.test(x)&&
 !/(?:javascript:|data:text\/html|保證治癒|保證療效|立即預約成功)/i.test(x)?x.trim():'';
export function resolveServiceFacts(input){
 const source=obj(input),fields=obj(source.fields),opts=obj(source.presentation);
 const published=opts.mode==='published';
 const custom=new Map();
 if(Array.isArray(source.custom))for(const row of source.custom){
  if(row&&['hygiene','venue','precautions'].includes(row.id)&&!custom.has(row.id))custom.set(row.id,row);
 }
 const items=definitions.flatMap(([id,label,faq,required,pending])=>{
  const hasRich=Object.hasOwn(fields,id)||custom.has(id);
  const raw=hasRich?(Object.hasOwn(fields,id)?fields[id]:custom.get(id)):source[id];
  const legacy=typeof raw==='string';
  const record=obj(raw);
  const value=safe(legacy?raw:record.value);
  const verified=legacy||record.status==='verified';
  const display=['show','hide','pending'].includes(record.display)?record.display:null;
  if(value&&verified&&display!=='hide'&&display!=='pending')return [{id,label,detail:value,faq,state:'real'}];
  const fallback=display??(required&&opts.missing!=='hide'?'pending':'hide');
  return fallback==='pending'&&!published?[{id,label,detail:pending??'待站長確認並設定',faq,state:'pending'}]:[];
 });
 const contactRaw=Object.hasOwn(fields,'contact')?fields.contact:source.contact;
 const contact=typeof contactRaw==='string'?safe(contactRaw):
  obj(contactRaw).status==='verified'&&obj(contactRaw).display!=='hide'?safe(contactRaw.value):'';
 return {items,questions:items.filter(x=>x.faq).map(x=>({question:x.label,answer:x.detail})),
 contact,contactPending:!contact&&!published?'聯絡資訊尚未設定；正式發布前請站長確認。':'',
 firstVisit:items.find(x=>x.id==='firstVisit'),method:items.find(x=>x.id==='method'),
 exclusions:items.find(x=>x.id==='exclusions')};
}
