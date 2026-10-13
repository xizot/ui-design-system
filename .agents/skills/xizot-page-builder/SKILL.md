---
name: xizot-page-builder
description: Build a complete Xizot page or website, or revise its visual direction. Select a product profile and record layout, component, state and responsive decisions. Not needed for small component fixes.
---

# Page and site design

Use the core workflow for source discovery; this workflow owns only page-level decisions.

1. Read existing product decisions and nearby pages. Identify audience, primary task, content/data, language, framework and brand constraints. Missing business rules remain unresolved; do not invent them.
2. Select a profile using `python .agents/skills/xizot-design-system/scripts/ui-source.py profile commerce` (choices: `operations`, `marketing`, `commerce`, `content`, `portfolio`). The command works without an installed component tree. For hybrid products choose per surface: a SaaS landing page can be marketing while its dashboard is operations. Read [website profiles](../xizot-design-system/references/website-profiles.md) for adaptation.
3. For a new page or redesign, state a compact brief: primary task; ordered regions; chosen components and source paths; state ownership; theme/type/density; narrow-screen changes; reachable states and acceptance checks. A short commentary is enough. Do not pause for approval unless a material product decision is missing.
4. For a new multi-page site or requested design direction, persist the agreed decisions in application-owned `design/MASTER.md`; use `design/pages/<route>.md` only for real exceptions. Read existing files first and edit only the requested scope. Existing small changes need no new documentation. See [decision record](../xizot-design-system/references/design-record.md).
5. Build the static page using real typed data or explicitly labeled fixtures, then add interaction. Compose existing primitives. Inspect forms and data component contracts before wiring state. Preserve existing theme unless redesign is requested.
6. Execute the relevant checks in `xizot-quality`; compare the rendered page with the brief.

[UI UX Pro Max integration](../xizot-design-system/references/upstream-integration.md) explains optional broader design research. Its suggestions do not replace Xizot API inspection or introduce dependencies automatically.
