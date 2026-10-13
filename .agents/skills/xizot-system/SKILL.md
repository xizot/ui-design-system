---
name: xizot-system
description: Change Xizot shared component contracts, tokens, source installer or agent harness. Trace callers and consumer impact; validate packaging and guidance upgrades. Not needed for ordinary page composition.
---

# Shared system changes

1. Inspect source, callers, package files and installer before proposing a public contract. Read [system governance](references/system-governance.md).
2. State which layer owns the change: feature, app shared, primitive/composition, token or tooling. Keep domain behavior in the app. Preserve supported callers or identify the required migration.
3. For harness changes, each instruction has one owner: `AGENTS.md` routes; React rules define code constraints; core skill runs the workflow; conditional references provide contracts. Remove redundant routing and generic advice. Do not add a skill for each visual adjective.
4. When changing guidance, update current callers/links and package references together. Keep consumer-owned instructions outside managed files/markers. Do not delete unrelated user skills or infer ownership from a name prefix.
5. Verify the changed contract using available project commands and an isolated consumer where relevant. For guidance, exercise discovery/design lookup from copied files, check links/metadata and inspect `npm pack --dry-run`. For executable changes, check syntax and run the affected path. Follow the user's policy on retained verification artifacts; this repository does not retain test files. Structural checks do not prove agent or visual behavior.

Use [design review](../xizot-quality/references/design-review.md) when evaluating a generated page. Record current evidence and unresolved behavior without loading historical audit logs into ordinary UI tasks.
