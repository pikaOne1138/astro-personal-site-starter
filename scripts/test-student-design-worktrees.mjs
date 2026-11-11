import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createSafeCandidate,listCandidates} from './design-worktrees.mjs';

const tmp=mkdtempSync(join(tmpdir(),'atp-design-worktree-'));
const base=join(tmp,'student-site'),candidate=join(tmp,'candidate-editorial');
const git=(...args)=>execFileSync('git',['-C',base,...args],{encoding:'utf8',stdio:'pipe'}).trim();
try{
 mkdirSync(base);
 git('init','-b','main');
 git('config','user.email','test@example.invalid');
 git('config','user.name','ATP test');
 writeFileSync(join(base,'README.md'),'Original student website\n');
 git('add','README.md');
 git('commit','-m','baseline');
 const baseline=git('rev-parse','HEAD');
 const created=createSafeCandidate({root:base,slug:'editorial',destination:candidate});
 assert.equal(created.branch,'design/editorial');
 assert.equal(created.base,baseline);
 assert.ok(existsSync(join(candidate,'README.md')));
 assert.equal(git('rev-parse','HEAD'),baseline,'original student repository unchanged');
 const worktrees=listCandidates(base);
 assert.equal(worktrees.length,1);
 assert.equal(worktrees[0].branch,'refs/heads/design/editorial');
 assert.throws(()=>createSafeCandidate({root:base,slug:'editorial',destination:join(tmp,'another')}),/already exists/);
 assert.throws(()=>createSafeCandidate({root:base,slug:'BAD',destination:join(tmp,'bad')}),/slug/);
 writeFileSync(join(base,'README.md'),'dirty site content\n');
 assert.throws(()=>createSafeCandidate({root:base,slug:'second',destination:join(tmp,'second')}),/Uncommitted changes/);
 assert.equal(git('rev-parse','HEAD'),baseline);
 console.log('PASS actual Git worktree branch isolation, original baseline preservation, duplicate/dirty guards');
 console.log('NOT TESTED candidate visual designs, independent preview deployment or student approval');
}finally{rmSync(tmp,{recursive:true,force:true});}
