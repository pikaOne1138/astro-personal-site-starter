// Somatic-only regression guard: no additional CSS override generations.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../../src/data/layout-assembly/somatic/Home.astro', import.meta.url), 'utf8');
const style = source.split('<style>')[1]?.split('</style>')[0] ?? '';
assert.ok(style, 'Somatic stylesheet exists');
assert.equal((source.match(/<style>/g) ?? []).length, 1);
for (const token of ['--somatic-page','--somatic-hero','--somatic-section','--somatic-on-dark','--somatic-line']) assert.ok(style.includes(token));
for (const hardcoded of ['#394938','#3e4b37','#223e30','#f4f0e6','#283128;grid-column']) assert.ok(!style.includes(hardcoded), 'No fixed prototype palette: '+hardcoded);
assert.ok(!style.includes('overflow-wrap:anywhere'), 'CJK headings must not fragment anywhere');
assert.ok(style.includes('line-break: strict'));
assert.ok(style.includes('@media (max-width: 800px)'));
assert.ok(style.includes('@media (max-width: 480px)'));
console.log('Somatic scoped tokens, cascade and CJK source guards passed.');
