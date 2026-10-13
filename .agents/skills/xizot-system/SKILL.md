---
name: xizot-system
description: Change Xizot shared component contracts, tokens, source installer or agent harness. Trace callers and consumer impact; validate packaging and guidance upgrades. Not needed for ordinary page composition.
---

# Shared system changes

1. Inspect source, callers, package files and installer before proposing a public contract. Read [system governance](references/system-governance.md).
2. State which layer owns the change: feature, app shared, primitive/composition, token or tooling. Keep domain behavior in the app. Preserve supported callers or identify the required migration.
3. For harness changes, each instruction has one owner: `AGENTS.md` routes; React rules define code constraints; core skill runs the workflow; conditional references provide contracts. Remove redundant routing and generic advice. Do not add a skill for each visual adjective.
4. For deleted guidance, inspect callers and links. Update installer migration data so unchanged retired files disappear in consumers while modified files are preserved and reported. Do not delete arbitrary user skills by a name prefix.
5. Test the changed contract. For installer/harness work run `python scripts/test-skill-tooling.py`, `node --test scripts/installer.test.cjs` and `npm pack --dry-run`; review package files. Structural checks are not behavioral proof that an agent follows the instructions.

The harness audit and realistic evaluation cases live in [harness evaluation](../xizot-design-system/references/harness-evaluation.md). Use those cases to evaluate future revisions, not to expand ordinary UI tasks.
