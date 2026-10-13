import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {transform} from '@astrojs/compiler';

// Focused source + executable URL contract tests; does not claim full component render QA.
const cases=[];
const check=(name,condition)=>{cases.push({name,passed:Boolean(condition)});if(!condition)throw Error('resource-url-props: '+name)};
const files=['src/components/blocks/LeadMagnetCard.astro','src/components/blocks/ResourceCard.astro'];
const valid=(href)=>href&&(/^(?:https:\/\/[^\s/#?]+(?:[/?#]|$)|\/(?!\/)[^\u0000-\u001f\u007f]*|\.\/(?!\/)[^\u0000-\u001f\u007f]*)/i.test(href)&&!/[\\"'<>]/.test(href));
for(const path of files){
 const src=readFileSync(path,'utf8');
 await transform(src,{filename:path});
 check(path+' contains tested URL guard',src.includes('const valid=href&&(')&&src.includes('/(?!/)'));
}
for(const href of ['https://example.org/resource','/guide/','./downloads/guide.pdf']){
 check('allow '+href,Boolean(valid(href)));
}
for(const href of ['//evil.example/a','javascript:alert(1)','data:text/html,evil','http://example.org','/bad" onclick="alert(1)','/bad\nlink']){
 check('reject '+JSON.stringify(href),!valid(href));
}
mkdirSync('qa-artifacts/quality',{recursive:true});
writeFileSync('qa-artifacts/quality/resource-url-props.json',JSON.stringify({schemaVersion:1,sha:process.env.GITHUB_SHA||null,status:'PASS',scope:files,caseCount:cases.length,cases,limitations:'Focused guard fixtures plus compiler parse; no per-Props DOM/browser acceptance and no historical pre-fix proof'},null,2)+'\n');
console.log('PASS resource URL targeted source/fixture contracts '+cases.length);
