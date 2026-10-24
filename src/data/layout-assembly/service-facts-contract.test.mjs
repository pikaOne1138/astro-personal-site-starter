import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('./ServiceSections.astro',import.meta.url),'utf8');
const contract=source.split('// BEGIN SERVICE_FACTS_CONTRACT')[1]?.split('// END SERVICE_FACTS_CONTRACT')[0];
assert.ok(contract,'ServiceFacts contract embedded in exported component');
const {resolveServiceFacts}=await import('data:text/javascript,'+encodeURIComponent(contract+'\nexport {resolveServiceFacts};'));
const legacy={scope:'按摩放鬆',exclusions:'不提供醫療診斷',method:'現場服務',duration:'60 分鐘',price:'NT$ 1200',cancellation:'提前一天',firstVisit:'以電子郵件聯絡',contact:'hello@example.com'};
const all=resolveServiceFacts(legacy);
assert.equal(all.items.length,7);
assert.equal(all.questions.find(x=>x.question==='費用').answer,'NT$ 1200');
assert.equal(all.contact,'hello@example.com');
const missing=resolveServiceFacts({});
assert.equal(missing.items.find(x=>x.id==='scope').state,'pending');
assert.equal(missing.items.some(x=>x.id==='price'),false);
assert.equal(resolveServiceFacts({presentation:{mode:'published'}}).items.length,0);
const rich=resolveServiceFacts({fields:{price:{value:'NT$ 1500',status:'verified'},method:{value:'示範文案',status:'demo',display:'pending'}},custom:[{id:'hygiene',value:'每次更換乾淨床單',status:'verified'},{id:'venue',value:'二樓工作室',status:'verified'},{id:'precautions',value:'請先告知不適部位',status:'verified'}]});
assert.equal(rich.items.find(x=>x.id==='price').detail,'NT$ 1500');
assert.equal(rich.questions.find(x=>x.question==='衛生流程').answer,'每次更換乾淨床單');
assert.equal(rich.items.find(x=>x.id==='method').state,'pending');
const unsafe=resolveServiceFacts({unknown:'內部資訊',scope:'<script>unsafe</script>',fields:{price:{value:'NT$ 100',status:'demo'},qualification:{value:'保證治癒',status:'verified'},duration:{value:'45 分鐘',status:'verified',display:'hide'}},custom:[{id:'unknown',value:'洩漏',status:'verified'},{id:'venue',value:'<img src=x>',status:'verified'}]});
assert.equal(unsafe.items.filter(x=>x.state==='real').length,0);
assert.equal(unsafe.items.some(x=>x.id==='unknown'),false);
assert.equal(unsafe.items.some(x=>x.id==='venue'),false);
assert.equal(resolveServiceFacts({presentation:{missing:'hide'}}).items.length,0);

const allFamilies=['clinician','companion','somatic','coach','collective','trust-path'];
for(const family of allFamilies){
 assert.ok(source.includes("family==='"+family+"'"),family+' service composition must remain distinct');
}
assert.ok(source.includes('const questions=resolved.questions'),'FAQ must use same resolved data as services');
assert.ok(source.includes('const items=resolved.items'),'Services must use resolved data');
const contactModes=resolveServiceFacts({fields:{contact:{value:'demo@example.com',status:'demo'}}});
assert.equal(contactModes.contact,'');
assert.equal(resolveServiceFacts({presentation:{mode:'published'},fields:{scope:{value:'未確認項目',status:'demo',display:'pending'}}}).items.length,0);

// Odd item counts (e.g. three custom fields on top of four required ones) must not leave an empty grid cell;
// the clinician grid paints gaps with currentColor, so a hole renders as a solid block.
for(const family of ['clinical-facts','collective-protocol'])
 assert.ok(source.includes('.'+family+(family==='clinical-facts'?'>div':' article')+':last-child:nth-child(odd){grid-column:1/-1}'),family+' must span an odd last item');
// Trust-path nodes are centred on the rail and must stay inside the viewport at tablet and phone widths.
assert.ok(source.includes('.trust-service-path{list-style:none;margin:3rem 0 3rem 1.8rem'),'trust-path rail needs a left margin for its nodes');
assert.ok(source.includes('.trust-service-path{padding-left:1rem;margin-left:1.3rem}'),'trust-path mobile rail needs a left margin');

console.log('ServiceFacts data-driven contract tests passed');
