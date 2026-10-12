import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const source=readFileSync('src/data/starter-config.ts','utf8'),css=readFileSync('public/demo.css','utf8');
const paletteBlock=source.match(/export const starterThemePalettes:[^{]+\{([\s\S]*?)\n\};/)?.[1];
if(!paletteBlock)throw Error('Starter theme palette source not found');
const palettes={};
for(const match of paletteBlock.matchAll(/^\s*(\w+):\{([^}]+)\},?/gm)){
 const obj=Object.fromEntries([...match[2].matchAll(/(\w+):'(#\w{6})'/g)].map(x=>[x[1],x[2]]));palettes[match[1]]=obj;
}
const botanical=css.match(/html\[data-theme="botanical"\]\{([^}]+)\}/)?.[1];
if(!botanical)throw Error('Botanical CSS token source not found');
const tokens=Object.fromEntries([...botanical.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(m=>[m[1],m[2]]));
const linear=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4};
function luminance(hex){const n=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return .2126*linear(n[0])+.7152*linear(n[1])+.0722*linear(n[2])}
function ratio(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function validate(entries){
 const checks=[];
 for(const [name,p] of Object.entries(entries)){
  const text=ratio(p.text,p.background);
  checks.push({name,foreground:p.text,background:p.background,ratio:+text.toFixed(3),minimum:4.5,pass:text>=4.5});
 }
 return checks;
}
const checks=validate(palettes);
if(checks.length!==8)throw Error('Expected all eight learner theme palettes, found '+checks.length);
const botanicalChecks=[['text on page',tokens['--text'],tokens['--bg']],['accent text on page',tokens['--accent'],tokens['--bg']],['accent text on surface',tokens['--accent'],tokens['--surface']]].map(([name,a,b])=>({name,foreground:a,background:b,ratio:+ratio(a,b).toFixed(3),pass:ratio(a,b)>=4.5}));
const intentional=structuredClone(palettes);
intentional.paper.text='#EEEEEE';
const negative=validate(intentional).find(x=>x.name==='paper');
if(negative.pass)throw Error('N15 contrast validator accepts intentionally low foreground contrast');
const failures=[...checks.filter(x=>!x.pass),...botanicalChecks.filter(x=>!x.pass)];
const report={schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:failures.length?'FAIL':'PASS',checks,botanicalChecks,negativeTest:{name:'N15 unreadable pale ink',detected:!negative.pass,ratio:negative.ratio},warnings:Object.entries(palettes).filter(([name,p])=>ratio(p.primary,p.background)<4.5).map(([name,p])=>({name,primary:p.primary,background:p.background,primaryAsTextRatio:+ratio(p.primary,p.background).toFixed(3),note:'Decorative colors are not automatically approved for body text'})),limitations:'Token role contrast is not complete computed-element contrast including transparency, overlays, hover states or rendered multi-layer backgrounds. Browser and human audits remain separate.'};
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/theme-contrast-roles.json',JSON.stringify(report,null,2)+'\n');
console.log('W5 N15 palette role contrast: '+report.status+'; '+checks.length+' theme backgrounds and '+botanicalChecks.length+' botanical pairs; '+report.warnings.length+' decorative primary colors are not text-approved');
if(failures.length){for(const item of failures)console.error('FAIL '+JSON.stringify(item));process.exitCode=1}
