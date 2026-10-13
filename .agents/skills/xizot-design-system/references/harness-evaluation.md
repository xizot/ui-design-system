# Harness revision and evaluation

## Audit evidence (2026-10-13)

- Sixteen skill entrypoints competed for related UI requests. Core and page-builder both routed to the same specializations, with repeated visual/quality checklists. Consolidated to five workflow owners; conditional interaction and website guidance is retrieved as needed.
- Consumer rules duplicated a large core workflow and imposed compact operational styling broadly. Consumer entrypoint now routes; explicit website profiles allow different page purposes.
- Installation guidance described compiled package exports and package mode, while current package.json has no exports and installer tests reject package flags. Guidance now documents source-copy and labels historical discovery compatibility.
- openai.yaml UI fields were top-level; corrected to the interface object.
- Installer previously copied new skill files without retiring deleted files. Hash-checked retirement removes only known unchanged files; modified/user-owned guidance is preserved and reported.

## Automated contract checks

Run `python scripts/test-skill-tooling.py`, `node --test scripts/installer.test.cjs`, and `npm pack --dry-run`. These test discovery, profile lookup, migration and packaging. They cannot prove agent compliance, visual quality or accessibility.

## Realistic agent evaluation cases

Run tasks in an isolated consumer when evaluating model behavior. Give only the task, harness and real source. Inspect resulting diffs and rendered behavior; do not grade keyword repetition.

| Request                        | Observable acceptance                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Fix a button label             | Local edit; no redesign, new theme or master record                                                          |
| Build orders page              | Correct DataTable contract; controlled query state; stale requests cannot overwrite current rows             |
| Build a spa landing page       | Marketing structure, responsive brand expression; no fabricated testimonials or dashboard shell              |
| Build product catalog and cart | Product cards/options, correct cart state and cost; no operational table forced on discovery                 |
| Build documentation article    | Readable article and navigable headings; code/table overflow contained                                       |
| Build portfolio                | Supplied work emphasized; working project/contact links; no invented client evidence                         |
| Edit numeric form              | Actual RHF contract, zero preserved, rejected save retains values, no mirrored local field state             |
| Upgrade an old consumer        | New guidance installed; unchanged retired files removed; modified and unrelated skills retained with warning |
| Work without Python/browser    | Source lookup fallback; runtime/visual gaps disclosed, no invented pass                                      |

Record model/runtime, task, changed paths, actual commands, observed behavior and failures. An unexecuted case is unverified. No behavioral agent evaluation is implied by the existence of this matrix.
