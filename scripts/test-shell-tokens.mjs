#!/usr/bin/env node
// 殼版型階段 1：13 款（art-direction 2＋native-expansion 11）的新匯出站載入 tokens.css／theme.css，且殼自己的變數語意不變。
// 這裡只做不需要瀏覽器的靜態檢查（含負向對照）；建置後的算出值檢查在 verify-starter-export（FULL）與其自我測試。
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {checkShellSource} from './shell-token-check.mjs';

const SHELL=[['subject-atlas','knowledge'],['practice-compass','helper'],['sidebar-journal','knowledge'],['editorial-frontpage','knowledge'],['card-journal','knowledge'],['visual-stories','knowledge'],['compact-dispatch','knowledge'],['split-reader','knowledge'],['portrait-profile','helper'],['service-catalogue','helper'],['studio-chapters','helper'],['editorial-practice','helper'],['question-led-practice','helper']];
const pal={primary:'#245E50',secondary:'#58776C',accent:'#C49B70',background:'#F7F8F4',text:'#1F2924'};
const plan=(slug,kind)=>({version:1,kind,layoutSlug:slug,visualTheme:'paper',brand:{name:'測試站',primaryColor:pal.primary,tagline:'測試',palette:pal},
  navigation:(kind==='knowledge'?[{id:'articles',label:'文章'},{id:'about',label:'關於我'}]:[{id:'services',label:'服務'},{id:'about',label:'關於我'},{id:'faq',label:'常見問題'}]).map(x=>({...x,enabled:true})),
  primaryCta:kind==='knowledge'?{label:'閱讀',pageId:'articles'}:{label:'服務',pageId:'services'},content:{headline:'主標題',intro:'介紹'},about:{bio:'介紹',purpose:'a',approach:'b',background:'c'},sectionPatterns:[],notes:'',
  ...(kind==='helper'?{serviceFacts:{scope:'協助',exclusions:'不提供醫療診斷',method:'先討論',firstVisit:'先閱讀',duration:'依方案',price:'待站長確認',cancellation:'依政策',qualification:'尚未提供',contact:'正式聯絡頁'}}:{})});
const tmp=mkdtempSync(join(tmpdir(),'shell-tokens-'));
try{
  let first;
  for(const [slug,kind] of SHELL){
    const f=join(tmp,slug+'.json'),site=join(tmp,slug);writeFileSync(f,JSON.stringify(plan(slug,kind)));
    execFileSync(process.execPath,[new URL('./export-starter.mjs',import.meta.url).pathname,f,site,'--defer-student-context'],{stdio:'pipe'});
    checkShellSource(site);first??=site;
  }
  // 負向對照：檢查器不能是瞎的
  const layoutFile=join(first,'src/layouts/SiteLayout.astro'),orig=readFileSync(layoutFile,'utf8');
  const expectFail=(label,mutated)=>{writeFileSync(layoutFile,mutated);try{assert.throws(()=>checkShellSource(first),undefined,label);}finally{writeFileSync(layoutFile,orig);}};
  expectFail('拿掉 tokens.css 連結',orig.replace("<link rel=\"stylesheet\" href={base+'tokens.css'}/>",''));
  expectFail('連結順序顛倒（site.css 在 theme.css 前）',orig.replace("<link rel=\"stylesheet\" href={base+'theme.css'}/><link rel=\"stylesheet\" href={base+'site.css'}/>","<link rel=\"stylesheet\" href={base+'site.css'}/><link rel=\"stylesheet\" href={base+'theme.css'}/>"));
  expectFail('殼的 --accent 被改成 primary',orig.replace('--accent:${palette.accent}','--accent:${palette.primary}'));
  checkShellSource(first);
}finally{rmSync(tmp,{recursive:true,force:true});}
console.log('shell tokens: PASS（13 款殼版型新匯出站：tokens.css→theme.css→site.css 依序載入，殼的 --accent 仍是 palette.accent；負向對照 3 項）');
