---
name: xizot-page-builder
description: Build or redesign Xizot pages and websites. Choose concrete shells and page patterns, color/font/density recipes, components and necessary UX; render and refine. Use for dashboards, lists, forms, sites and content layouts; not small component fixes.
---

# Page and site design

Use the core workflow for source/API discovery. This skill owns design decisions: **product → page pattern → visual direction → components/states**. A profile alone is not a page design.

## 1. Identify the job and preserve existing decisions

Read nearby pages and the application's design record. Identify audience, task frequency, actual content/data, language, brand and requested scope. Keep the existing shell/theme/font for additions unless redesign is requested. Business gaps remain unresolved; missing stylistic preferences can use a reasoned default without asking the user to choose every detail.

## 2. Choose a concrete structure

Read [page patterns](references/page-patterns.md), then retrieve the matching entry:

```sh
python .agents/skills/xizot-design-system/scripts/ui-source.py pattern management-list
```

Omit the ID to list patterns. Multi-module dashboards default to a left sidebar, compact context topbar and main canvas. A record-management page starts with header → filters → results, not an automatic KPI/chart overview. Public landing pages default to top navigation and content-led sections; reading surfaces prioritize reading width. Each pattern includes exceptions, responsive behavior and what to omit.

Profiles still describe the product family; use the existing `profile` command or [website profiles](../xizot-design-system/references/website-profiles.md) when needed. Hybrid surfaces share brand but may use different shells. If no pattern fits, derive one from the task rather than forcing it.

For an application page, read [feature architecture](../xizot-design-system/references/feature-structure.md) before implementation. Name the route, feature and use case; assign the header, filters, table, form, state and API calls to their owners. List the meaningful page regions that deserve local components. Keep the route thin and the use-case entry responsible for composition. A visual region with its own behavior, state or substantial markup should be a named component; keep small coupled markup inline. Follow the consumer's actual source root and language.

## 3. Set the visual direction

For a new design or a requested foundation change, read [visual foundations](references/visual-foundations.md) and retrieve one recipe:

```sh
python .agents/skills/xizot-design-system/scripts/ui-source.py recipe workbench
```

Choices: `workbench`, `calm-business`, `editorial`, `product-led`, `technical`. A pattern's default recipe is a starting point, not an override of existing branding. The recipe specifies color roles, font candidates, type ranges, density, geometry and checks. Map to actual tokens and computed styles; do not assume font availability or utility sizes. Without Python, read only the selected entries in the linked JSON files.

## 4. Compose only useful UI

Use [component decisions](references/component-decisions.md) to resolve control/container choices and remove unnecessary UX. Each region/action must help the user understand, decide or do something supported by content/behavior. Do not invent KPIs, navigation features, permissions or social proof. Minimal composition still includes reachable error, pending and recovery states.

State a compact brief: task; selected pattern and rationale; shell/ordered regions/action priority; inherited or chosen visual direction; component contracts; feature/use-case and component ownership; state ownership; narrow-screen behavior and acceptance checks. A short commentary is enough; a material missing product decision only blocks the dependent work.

## 5. Build, render and refine

Build one representative page with real content or clearly labeled fixtures before repeating it across a site. Compose actual Xizot primitives, route submitted forms through the forms skill and wire reachable interactions.

Use [xizot-quality](../xizot-quality/SKILL.md) and its [design review](../xizot-quality/references/design-review.md). Inspect the rendered result in this order: task hierarchy → flow and unnecessary steps → readability → keyboard/state recovery → narrow-screen/theme behavior → spacing polish. Refine observed issues, not an unexplained wish to look more modern. Compilation is not visual evidence.

Persist reusable decisions in application-owned `design/MASTER.md` for a new multi-page site or intentional design direction. Use `design/pages/<route>.md` only for real exceptions. See [decision record](../xizot-design-system/references/design-record.md); small changes need no record.

[UI UX Pro Max integration](../xizot-design-system/references/upstream-integration.md) explains optional broader design research. Its suggestions do not replace Xizot API inspection or introduce dependencies automatically.
