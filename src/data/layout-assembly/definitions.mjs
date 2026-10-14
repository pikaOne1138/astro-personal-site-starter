import directions from '../layout-directions.json' with {type:'json'};

/**
 * Version 1 layout assembly registry.
 * The original research registry is read-only to avoid conflicts with parallel Art Direction.
 * Prototype selection remains available in the planner. Existing scaffold-only exports stay compatible;
 * strict --require-assembled export accepts only adapters, and ready status requires manual visual QA.
 */
export const layoutDefinitions = directions.map(direction => {
  const adapterAvailable = direction.slug === 'field-notes' || direction.slug === 'clinician';
  return {
    schemaVersion: 1,
    slug: direction.slug,
    kind: direction.kind,
    title: direction.title,
    audience: direction.audience,
    description: direction.description,
    structure: direction.structure,
    sourcePrototype: '/layouts/' + direction.slug + '/',
    assemblyStatus: adapterAvailable ? 'in-progress' : 'prototype',
    adapter: adapterAvailable ? {id: direction.slug, version: 1, renderer: 'src/components/layouts/' + direction.slug + '/Home.astro'} : null,
    screenshots: {
      desktop: '/template-gallery/' + direction.slug + '-desktop.webp',
      mobile: '/template-gallery/' + direction.slug + '-mobile.webp'
    },
    composition: direction.slug === 'field-notes'
      ? {hero:'marginalia-ledger', sectionOrder:['field-hero','field-ledger','field-question'], gridDesktop:'78px minmax(0,1fr) 180px', responsive390:'rail shrinks; hero/media flow before ledger; single-column question'}
      : direction.slug === 'clinician'
      ? {hero:'clinical-split', sectionOrder:['clinical-hero','clinical-fit','clinical-process','clinical-credentials','clinical-contact'], gridDesktop:'1.05fr .95fr', responsive390:'hero text then room; fit cards stack; process and credentials single-column'}
      : null
  };
});
export const getLayoutDefinition = (slug,kind) => layoutDefinitions.find(d=>d.slug===slug&&d.kind===kind);
export const getAssemblyLayout = (slug,kind) => {
  const result=getLayoutDefinition(slug,kind);
  if(!result || !result.adapter || !['ready','in-progress'].includes(result.assemblyStatus))throw Error('Layout '+slug+' has no independent assembly adapter yet. Export the Site Brief instead.');
  return result;
};
