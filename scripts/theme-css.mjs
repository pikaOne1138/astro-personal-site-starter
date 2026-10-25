#!/usr/bin/env node
// 學員站主題輸入：site.config.json 的 brand → public/theme.css（:root 的 --brand-* 輸入變數）。
// site.config.json 是唯一真相；theme.css 是由它產生的檔案，不要手改。
// 語意 Token（--color-* 等）與舊名別名在 public/tokens.css，由這些輸入推導。
// 匯出器在匯出時呼叫 themeCss()；學員站在 predev／prebuild 重新產生（npm run sync:theme）。
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const HEX=/^#[0-9a-fA-F]{6}$/;
const SERIF='"Noto Serif TC",Georgia,serif';
const SANS='"Noto Sans TC",system-ui,sans-serif';
const FILTERS={documentary:'saturate(.68) contrast(1.07)',minimal:'saturate(.45)'};
const channel=(h,i)=>{const v=parseInt(h.slice(i,i+2),16)/255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4;};
const luminance=h=>.2126*channel(h,1)+.7152*channel(h,3)+.0722*channel(h,5);
export const contrastRatio=(a,b)=>{const [x,y]=[luminance(a),luminance(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05);};

// G-11 色票對比：與 tokens.css 的推導一致（次要文字＝內容色 75% 混背景；主色上的文字＝黑白中對比較高者）。
const rgbOf=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const hexOf=c=>'#'+c.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const DEFAULTS={primary:'#355747',background:'#F7F5F0',text:'#28231F'};
export function contrastPairs(brand={}){
 const pal=brand.palette||{};
 const pick=(k,alt)=>HEX.test(pal[k]||'')?pal[k]:(k==='primary'&&HEX.test(brand.primaryColor||'')?brand.primaryColor:alt);
 const primary=pick('primary',DEFAULTS.primary),bg=pick('background',DEFAULTS.background),text=pick('text',DEFAULTS.text);
 const muted=hexOf(rgbOf(text).map((v,i)=>v*.75+rgbOf(bg)[i]*.25));
 const onPrimary=contrastRatio(primary,'#ffffff')>=contrastRatio(primary,'#000000')?'#ffffff':'#000000';
 const pair=(name,fg,back,min,usage)=>{const ratio=Math.round(contrastRatio(fg,back)*100)/100;return {name,fg,bg:back,min,ratio,ok:ratio>=min,usage};};
 return [
  pair('內文色／背景',text,bg,4.5,'內文與標題'),
  pair('次要文字／背景',muted,bg,4.5,'日期、說明文字'),
  pair('主色／主色上的文字',onPrimary,primary,4.5,'按鈕與主色區塊上的文字'),
  pair('主色／背景',primary,bg,3,'焦點外框、連結強調（非文字元件）'),
 ];
}

export function themeCss(brand={}){
 const palette=brand.palette||{};
 const primary=HEX.test(palette.primary||'')?palette.primary:HEX.test(brand.primaryColor||'')?brand.primaryColor:null;
 const lines=[];
 if(primary){
  lines.push('--brand-primary:'+primary);
  for(const key of ['secondary','accent','background','text'])if(HEX.test(palette[key]||''))lines.push('--brand-'+key+':'+palette[key]);
  // 主色上的文字取對比較高者，避免淺色主色配白字。
  lines.push('--brand-on-primary:'+(contrastRatio(primary,'#ffffff')>=contrastRatio(primary,'#000000')?'#ffffff':'#000000'));
 }
 lines.push('--brand-heading-font:'+(brand.typography==='clear-sans'?SANS:SERIF));
 lines.push('--brand-body-font:'+SANS);
 lines.push('--brand-image-filter:'+(FILTERS[brand.imageStyle]||'none'));
 return '/* 由 site.config.json 的 brand 產生（node scripts/theme-css.mjs）。請改 site.config.json，不要手改本檔。 */\n:root{'+lines.join(';')+';}\n';
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const config=JSON.parse(readFileSync('site.config.json','utf8'));
 mkdirSync('public',{recursive:true});
 writeFileSync('public/theme.css',themeCss(config.brand));
 console.log('theme.css 已由 site.config.json 產生');
}
