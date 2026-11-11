import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,existsSync,readFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {applyCommand,loadSession,renderHandoff,sessionPath} from './design-session.mjs';

const generator=readFileSync(new URL('./student-project-context.mjs',import.meta.url),'utf8');
const packBuilder=readFileSync(new URL('./build-student-pack.mjs',import.meta.url),'utf8');
assert.ok(generator.includes("'design-session.mjs'"),'standalone exporter must install design tool');
assert.ok(generator.includes("'design:session':'node scripts/design-session.mjs'"),'student site must expose CLI script');
assert.ok(packBuilder.includes("'scripts/design-session.mjs'"),'ZIP must ship the same source tool');

const root=mkdtempSync(join(tmpdir(),'atp-design-session-'));
try{
 mkdirSync(join(root,'.ai'),{recursive:true});
 const fail=fn=>assert.throws(fn);
 fail(()=>loadSession(root));
 applyCommand(root,'init',{site:'山徑筆記',scope:'首頁文章列表'});
 assert.ok(existsSync(sessionPath(root)));
 fail(()=>applyCommand(root,'init',{site:'replace',scope:'bad'}));
 applyCommand(root,'preserve',{text:'舊文章網址與聯絡連結'});
 applyCommand(root,'note',{type:'confirmed',text:'文章標題先出現'});
 applyCommand(root,'note',{type:'rejected',text:'拒絕巨型照片 Hero'});
 applyCommand(root,'note',{type:'pending',text:'手機閱讀順序'});
 applyCommand(root,'add',{id:'editorial',title:'編輯雜誌',first:'精選文章標題',flow:'導言、目錄',mobile:'單欄線性閱讀',tradeoff:'圖像較少'});
 applyCommand(root,'add',{id:'gallery',title:'展覽牆',first:'多圖並列',flow:'不對稱網格',mobile:'縮成圖文清單',tradeoff:'需要授權圖片'});
 fail(()=>applyCommand(root,'add',{id:'editorial',title:'duplicate',first:'x',flow:'x',mobile:'x',tradeoff:'x'}));
 applyCommand(root,'reject',{id:'gallery',reason:'學員不喜歡大量圖片'});
 fail(()=>applyCommand(root,'choose',{id:'gallery',reason:'should fail'}));
 applyCommand(root,'choose',{id:'editorial',reason:'學員明確選定'});
 let current=loadSession(root);
 assert.equal(current.selectedId,'editorial');
 assert.equal(current.publicationApproved,false);
 assert.equal(current.options.find(x=>x.id==='gallery').status,'rejected');
 const summary=renderHandoff(current);
 for(const text of ['已確認','已否決（含理由）','待確認','不修改的部分','精選文章標題','學員明確選定','未授權合併']){
  assert.ok(summary.includes(text),text);
 }
 applyCommand(root,'reject',{id:'editorial',reason:'學員改變主意'});
 current=loadSession(root);
 assert.equal(current.selectedId,null);
 assert.equal(current.options.find(x=>x.id==='editorial').status,'rejected');
 fail(()=>applyCommand(root,'note',{type:'published',text:'無授權'}));
 const bytes=readFileSync(sessionPath(root),'utf8');
 assert.ok(!bytes.includes('replace'));
 console.log('PASS design decisions: no overwrite, proposal, rejection, selected rollback, handoff and no release permission');
 console.log('NOT TESTED human model dialogue, visual previews or actual publication');
}finally{rmSync(root,{recursive:true,force:true});}
