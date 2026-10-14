---
name: xizot-design-system
description: Build or revise React UI using Xizot components. Resolve component contracts, select the website profile, implement scoped changes and verify behavior. Use for Xizot consumer apps and this library; exclude backend-only work.
---

# Xizot UI workflow

## 1. Establish the local contract

Read [React rules](../../rules/react.md). Inspect the requested files and a nearby caller. Identify the actual framework, language, source/import root, existing theme and state/data layer. Use [source ownership](references/source-ownership.md) when the installed location or import boundary is unclear. Do not assume Next.js for a Vite/CRA consumer.

For each unfamiliar control, run from the application root:

```sh
python .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "combobox"
```

Use the [component catalog](references/component-catalog.md) to narrow the choice, then read the matched implementation and caller. Discovery returns candidates, not prop contracts. If Python is unavailable, use `rg --files` and read the corresponding files. Never invent exports from shadcn familiarity.

## 2. Route once

| Task                                  | Read next                                                        | Concrete output before implementation                        |
| ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| Small component/interaction fix       | Relevant source and [code contract](references/code-contract.md) | Changed behavior and its owner                               |
| New page, site, or visual redesign    | [xizot-page-builder](../xizot-page-builder/SKILL.md)             | Page pattern, shell, feature ownership and component plan    |
| Submitted form                        | [xizot-forms](../xizot-forms/SKILL.md)                           | Values/defaults, validation, submit/reset ownership          |
| Shared API, theme, installer, harness | [xizot-system](../xizot-system/SKILL.md)                         | Consumer impact and verification scope                       |
| Requested audit                       | [xizot-quality](../xizot-quality/SKILL.md)                       | Findings with file/behavior evidence; edit only if requested |

Combine rows only when the task crosses those boundaries. Do not load all references. A small fix does not require a site brief, new theme or rewritten page.

For new/relocated application feature files, read [feature architecture](references/feature-structure.md) before creating the page. Keep library primitives in their existing owners.

## 3. Implement from evidence

Use existing components and semantic tokens. For page/section headings and prose, inspect `components/ui/typography.tsx` and use its matching `Typography*` export when no owning component already provides that text role. Preserve semantic heading order. Application dialogs, sheets, drawers, and popovers use their respective `*Panel` root with `*PanelContent`; place a `*PanelFooter` directly inside the content for custom actions. Follow each component's supported size and close API; reusable controls may need lower-level content primitives. Inspect the actual API. Use `DataTable` for controlled operational tables, simple `Table` for static comparisons, and cards/lists when the content is not tabular.

Keep business rules in features. Implement loading, empty/no-results, error and pending states only where the flow can reach them. Do not fabricate API fields, permissions, testimonials, metrics or product claims. Read [interaction checks](references/interaction-checks.md) for data, overlays, async actions or navigation changes.

## 4. Verify the result

Follow [xizot-quality](../xizot-quality/SKILL.md). Optional diagnostic:

```sh
python .agents/skills/xizot-design-system/scripts/ui-source.py --root . review path/to/changed.tsx
```

It reports text matches only. Resolve relevant findings using source/callers and run real checks. In the final response state the change, commands/results and any unverified runtime/visual behavior.
