// Counts shown in public page copy. They are derived from the data that owns them,
// so adding a layout, recipe or theme never leaves a stale number on a page.
import directions from './layout-directions.json';
import handoff from '../../docs/art-direction/layout-handoff-registry.json';
import {themes, kinds} from '../data';

const recipeGroups = {
  heroes: import.meta.glob('../components/editorial-recipes/heroes/*.astro'),
  sections: import.meta.glob('../components/editorial-recipes/sections/*.astro'),
  lists: import.meta.glob('../components/editorial-recipes/lists/*.astro'),
  rhythm: import.meta.glob('../components/editorial-recipes/rhythm/*.astro'),
  'cta-trust': import.meta.glob('../components/editorial-recipes/cta-trust/*.astro'),
};

const items = handoff.items;
const extensions = items.filter((x) => x.origin !== 'main-12');
const byKind = (list: {kind: string}[], kind: string) => list.filter((x) => x.kind === kind).length;

export const layoutCounts = {
  total: items.length,
  base: directions.length,
  extensions: extensions.length,
  extensionsAdapter: extensions.filter((x) => x.origin === 'art-direction-adapter').length,
  extensionsPrototype: extensions.filter((x) => x.origin === 'expanded').length,
  knowledge: byKind(items, 'knowledge'),
  helper: byKind(items, 'helper'),
  extensionsKnowledge: byKind(extensions, 'knowledge'),
  extensionsHelper: byKind(extensions, 'helper'),
};

export const recipeCounts = {
  ...Object.fromEntries(Object.entries(recipeGroups).map(([k, v]) => [k, Object.keys(v).length])) as Record<keyof typeof recipeGroups, number>,
  total: Object.values(recipeGroups).reduce((n, v) => n + Object.keys(v).length, 0),
};

/** Complete demo sites = site kinds × visual themes. */
export const demoSiteCount = kinds.length * themes.length;
export const themeCount = themes.length;
