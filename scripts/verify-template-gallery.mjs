import sharp from 'sharp';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {layoutDefinitions} from '../src/data/layout-assembly/definitions.mjs';
const manifest=JSON.parse(readFileSync('docs/template-gallery/captured.json','utf8'));
const keys=new Set();
for(const d of layoutDefinitions)for(const mode of ['desktop','mobile']){
 const records=manifest.records.filter(r=>r.slug===d.slug&&r.mode===mode);
 if(records.length!==1)throw Error(`Missing/duplicate record ${d.slug} ${mode}`);
 const r=records[0];keys.add(r.slug+':'+mode);
 if('/'+r.filename!==d.screenshots[mode]||r.route!==d.sourcePrototype)throw Error('Wrong mapping '+d.slug);
 const bytes=readFileSync('public/'+r.filename);
 if(createHash('sha256').update(bytes).digest('hex')!==r.sha256)throw Error('Hash mismatch '+r.filename);
 const m=await sharp(bytes).metadata();await sharp(bytes).raw().toBuffer();
 if(m.format!=='webp'||m.width!==r.viewport.width||m.height<r.viewport.height)throw Error('Invalid image '+r.filename);
}
if(keys.size!==manifest.records.length)throw Error('Unexpected manifest records');
console.log(`${layoutDefinitions.length} layouts / ${keys.size} WebP files: decoded, SHA-256 and route/slug mapping verified`);
