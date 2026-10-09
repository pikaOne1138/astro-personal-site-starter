/**
 * Trusted GitHub Pages publisher: reconcile previews to the *current* open PR heads.
 *
 * This runs only in the main-branch deployment workflow, after the existing snapshot
 * was restored (and optionally after one workflow_run artifact was overlaid).
 * Never execute PR-authored scripts with privileged credentials.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const token = process.env.GH_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repository || '')) {
  throw new Error('GH_TOKEN and GITHUB_REPOSITORY are required');
}

async function api(route) {
  const response = await fetch(`https://api.github.com/repos/${repository}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${route}`);
  return response.json();
}

const root = path.resolve('dist/pr-preview');
fs.mkdirSync(root, { recursive: true });
const open = [];
for (let page = 1; page <= 20; page++) {
  const batch = await api(`/pulls?state=open&per_page=100&page=${page}`);
  open.push(...batch);
  if (batch.length < 100) break;
  if (page === 20) throw new Error('Too many PRs to reconcile safely');
}
const allowed = new Set(open.map(pr => `pr-${pr.number}`));
for (const name of fs.readdirSync(root)) {
  if (/^pr-\d+$/.test(name) && !allowed.has(name)) {
    fs.rmSync(path.join(root, name), { recursive: true, force: true });
    console.log(`Removed closed PR preview ${name}`);
  }
}

for (const pr of open) {
  const target = path.join(root, `pr-${pr.number}`);
  // Snapshot contents are not trusted for freshness. Replace only with a
  // successful build artifact whose run SHA equals the current PR head SHA.
  if (pr.head.repo?.full_name !== repository) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`Skipped fork PR #${pr.number}`);
    continue;
  }
  const runs = await api(
    `/actions/workflows/pr-preview.yml/runs?event=pull_request&status=success&head_sha=${encodeURIComponent(pr.head.sha)}&per_page=100`
  );
  const run = runs.workflow_runs?.find(r =>
    r.head_sha === pr.head.sha && r.event === 'pull_request' &&
    r.conclusion === 'success' && r.head_repository?.full_name === repository
  );
  if (!run) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`No successful build for current head of PR #${pr.number}; removed stale preview`);
    continue;
  }

  const incoming = path.resolve(`.preview-reconcile/pr-${pr.number}`);
  fs.rmSync(incoming, { recursive: true, force: true });
  fs.mkdirSync(incoming, { recursive: true });
  try {
    execFileSync('gh', ['run', 'download', String(run.id), '--name', 'preview-event', '--dir', path.join(incoming, 'event')], { stdio: 'pipe', env: process.env });
    const event = JSON.parse(fs.readFileSync(path.join(incoming, 'event/event.json'), 'utf8'));
    if (event.number !== pr.number || event.action === 'closed') throw new Error('Preview event metadata does not match PR');
    execFileSync('gh', ['run', 'download', String(run.id), '--name', 'preview-site', '--dir', path.join(incoming, 'site')], { stdio: 'pipe', env: process.env });
    const source = path.join(incoming, 'site');
    if (!fs.statSync(path.join(source, 'index.html')).isFile()) throw new Error('Missing preview index.html');
    // Copy to a sibling before replacing so partial downloads never leak.
    const stage = path.join(root, `.pr-${pr.number}-staging`);
    fs.rmSync(stage, { recursive: true, force: true });
    fs.cpSync(source, stage, { recursive: true });
    fs.rmSync(target, { recursive: true, force: true });
    fs.renameSync(stage, target);
    fs.writeFileSync(path.join(target, '.preview-head.json'), JSON.stringify({ sha: pr.head.sha, runId: run.id, pr: pr.number }) + '\n');
    console.log(`Refreshed PR #${pr.number} from current head ${pr.head.sha.slice(0, 12)} (run ${run.id})`);
  } catch (error) {
    // Fail the entire publication: never publish stale preview as if it were current.
    throw new Error(`Cannot reconcile PR #${pr.number}: ${error.message}`);
  } finally {
    fs.rmSync(incoming, { recursive: true, force: true });
  }
}
