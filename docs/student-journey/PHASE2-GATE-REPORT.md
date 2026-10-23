# PR #67 | Phase 2 Gate Report

> **IMPORT FAILED — latest Ledger/metrics are stale and MUST NOT be presented as current.**

Failed import commit: `75db45a567b81155a9501ec973f92e74c10f32b5`

## Import error (captured from actual runner)

```text
file:///home/runner/work/astro-personal-site-starter/astro-personal-site-starter/scripts/phase2-canonical-ledger.mjs:907
  if(row.canonicalId)throw Error('Deployment B2 already canonicalized: '+id);
                           ^

Error: Deployment B2 already canonicalized: B9C-DEP36-01
    at file:///home/runner/work/astro-personal-site-starter/astro-personal-site-starter/scripts/phase2-canonical-ledger.mjs:907:28
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.21.0

```
