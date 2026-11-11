// Optional, dependency-free evidence gate for student design-improvement handoffs.
// Does not score aesthetics or claim that visual QA was performed.
export const REQUIRED_WIDTHS=[1440,1280,768,390];
export const MODES=['design-audit','reference','candidates','local-ui','brand','motion'];
const STATES=['PASS','FAIL','BLOCKED','NOT TESTED'];
export function validateDesignReview(report){
 const errors=[];
 if(!report || typeof report!=='object'||Array.isArray(report))return ['report must be an object'];
 const nonblank=x=>typeof x==='string'&&x.trim().length>0;
 if(!MODES.includes(report.mode))errors.push('unknown improvement mode');
 if(!nonblank(report.site))errors.push('site must identify reviewed student website');
 if(!nonblank(report.scope))errors.push('scope must identify affected pages/sections');
 if(!nonblank(report.preserved))errors.push('preserved must describe unchanged content/behavior');
 if(!Array.isArray(report.findings))errors.push('findings must be an array');
 else for(const [i,f] of report.findings.entries()){
  for(const field of ['observation','visitorImpact','hypothesis','change','verification']){
   if(!nonblank(f?.[field]))errors.push('findings['+i+'].'+field+' required');
  }
 }
 if(!report.qa||typeof report.qa!=='object')errors.push('qa required');
 else{
  if(!STATES.includes(report.qa.build))errors.push('qa.build status invalid');
  if(!STATES.includes(report.qa.preview))errors.push('qa.preview status invalid');
  if(!STATES.includes(report.qa.visual))errors.push('qa.visual status invalid');
  if(report.qa.preview==='PASS' && (!nonblank(report.previewUrl)||!nonblank(report.headSha)||!/^[0-9a-f]{40}$/i.test(report.headSha)))errors.push('preview PASS requires verified URL and full head SHA');
  if(report.qa.visual==='PASS'){
   if(!Array.isArray(report.visualEvidence))errors.push('visual PASS requires screenshots');
   else for(const width of REQUIRED_WIDTHS){
    const v=report.visualEvidence.find(x=>x?.width===width);
    if(!v || !nonblank(v.before)||!nonblank(v.after)|| !nonblank(v.reviewedBy))errors.push('visual PASS requires before/after screenshots and reviewer at '+width+'px');
   }
   if(report.qa.preview!=='PASS')errors.push('visual PASS requires actual verified Preview');
  }
 }
 if(report.merged===true && report.approved!==true)errors.push('merge forbidden without student approval');
 return errors;
}
