import fs from 'node:fs';
import path from 'node:path';

const eventPath = '.preview-incoming/event/event.json';
const info = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
if (!Number.isSafeInteger(info.number) || info.number < 1) {
  throw new Error('Invalid PR number');
}
if (!['opened', 'reopened', 'synchronize', 'closed'].includes(info.action)) {
  throw new Error('Invalid PR event action');
}

const root = path.resolve('dist');
const previewRoot = path.join(root, 'pr-preview');
const target = path.join(previewRoot, `pr-${info.number}`);
if (!target.startsWith(previewRoot + path.sep)) {
  throw new Error('Preview destination escaped its root');
}

fs.rmSync(target, { recursive: true, force: true });
if (info.action !== 'closed') {
  const source = path.resolve('.preview-incoming/site');
  if (!fs.existsSync(path.join(source, 'index.html'))) {
    throw new Error('PR artifact did not contain its index.html');
  }
  fs.mkdirSync(target, { recursive: true });
  fs.cpSync(source, target, { recursive: true, force: true });
  console.log(`Added preview for PR #${info.number}`);
} else {
  console.log(`Removed preview for PR #${info.number}`);
}
