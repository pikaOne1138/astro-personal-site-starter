import {execFileSync} from 'node:child_process';
// GitHub pull_request defaults GITHUB_SHA to a synthetic merge SHA.
// Test artifacts must identify the commit that was actually checked out.
if(process.env.GITHUB_ACTIONS==='true'){
 try{
  const checkout=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();
  if(/^[a-f0-9]{40}$/.test(checkout))process.env.GITHUB_SHA=checkout;
 }catch{
  // Some student-kit checks run outside a git working tree; inherit the parent SHA.
 }
}
