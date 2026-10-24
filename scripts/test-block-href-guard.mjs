import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {transform} from '@astrojs/compiler';
import {safeHref} from '../src/components/blocks/safe-href.ts';

// Focused contract: the shared link guard rejects unsafe values, and each component that takes a
// caller-supplied href goes through it. This is not a full render test of every component.
const cases=[];
const check=(name,condition)=>{cases.push({name,passed:Boolean(condition)});if(!condition)throw Error('block-href-guard: '+name)};

for(const href of ['#contact','/guide/','/repo/guide/?q=1#a','./a/','../a/','faq/','https://example.org/a','mailto:hello@example.org','tel:+886912345678']){
 check('allow '+href,safeHref(href)===href);
}
for(const href of [undefined,null,'',' ','javascript:alert(1)','JaVaScRiPt:alert(1)','  javascript:alert(1)','data:text/html,evil','vbscript:msgbox(1)','//evil.example/a','/\\evil.example','/%2F%2Fevil.example/','/%ZZ/','/bad" onclick="alert(1)','/bad\nlink','http://example.org/a','ftp://example.org/a','https://']){
 check('reject '+JSON.stringify(href),safeHref(href)===undefined);
}

const files={
 'src/components/blocks/Button.astro':/safeHref\(href\)/,
 'src/components/blocks/ServiceCard.astro':/safeHref\(href\)/,
 'src/components/blocks/FeatureGrid.astro':/safeHref\(x\.href\)/,
 'src/components/effects/UnderlineLink.astro':/safeHref\(href\)/,
 'src/components/blocks/CTASection.astro':/<Button href=\{href\}>/, // CTASection hands its href to Button, which guards it.
};
for(const [path,pattern] of Object.entries(files)){
 const src=readFileSync(path,'utf8');
 await transform(src,{filename:path});
 check(path+' uses the guard',pattern.test(src));
 if(!path.endsWith('CTASection.astro')){
  check(path+' imports the shared guard',/from '(\.\/|\.\.\/blocks\/)safe-href'/.test(src));
  check(path+' no longer writes the raw href',!/\shref=\{(href|x\.href)\}/.test(src));
 }
}
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/block-href-guard.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',scope:Object.keys(files),caseCount:cases.length,cases,limitations:'Guard fixtures plus source contracts. Not a full render test of every component.'},null,1));
console.log('PASS block href guard '+cases.length);
