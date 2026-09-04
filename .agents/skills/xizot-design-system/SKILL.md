---
name: xizot-design-system
description: 'Use when the user wants to build, revise, audit, polish, harden, adapt, colorize, layout, typeset, systemize, extract, or document React/Next.js product UI with the Xizot design system. Applies to app shells, CRUD/list pages, dashboards, forms, filters, tables, dialogs, drawers, responsive layouts, color decisions, spacing, hierarchy, typography, Vietnamese product copy, and reusable component composition. Not for backend-only tasks or unrelated visual systems.'
metadata:
  version: 0.3.0
---

# Xizot Design System

This skill is the orchestrator for Xizot frontend work. It coordinates the local React component contracts with the specialized Xizot skills for page building, color, layout, typography, UX psychology, accessibility, interaction, forms, data UI, wayfinding, motion, responsible UX, visual polish, quality gates, and design-system governance.

Use it when creating, editing, reviewing, or polishing React/Next.js UI in:

- a consumer project where the design system is installed under `design-system/`
- this source repo, where the component source lives under `components/`

## Core Principles

- **Components first.** Use Xizot components, RHF wrappers, hooks, constants, and tokens before adding custom UI.
- **System before screen.** Every new surface should strengthen the system: consistent tokens, predictable component composition, reusable interaction patterns, and no local forks.
- **Product UI over decoration.** Prefer compact, scannable, workflow-first interfaces over marketing composition.
- **Hierarchy before ornament.** Use layout, spacing, type, weight, alignment, and state before adding color or effects.
- **Color has a job.** Use color for meaning, emphasis, grouping, status, and attention; do not paint the interface just to make it feel designed.
- **Local truth wins.** Inspect the actual component API and surrounding code before writing.
- **No parallel system.** Do not introduce another UI kit, color language, form wrapper layer, typography scale, spacing scale, or table abstraction unless the user explicitly requests it.

## Setup

Before substantial UI work, inspect the local project:

1. Locate whether this is the design-system source repo or a consumer project.
2. Read the relevant component files before using unfamiliar APIs.
3. Read nearby feature screens to match density, copy language, state handling, and patterns.
4. Read the command reference for the requested task.
5. Before editing UI, read [references/craft-floor.md](references/craft-floor.md).

For deeper design-theory decisions, invoke the matching specialized skill when available and load only the needed reference:

- Color, status, charts, palette, contrast: use `xizot-color`, or [references/color.md](references/color.md)
- Layout, grid, spacing, rhythm, density: use `xizot-layout`, or [references/layout.md](references/layout.md)
- Typography, labels, hierarchy, scanning: use `xizot-typography`, or [references/typography.md](references/typography.md)
- UX behavior, cognition, forms, wayfinding: use `xizot-ux`, or [references/ux-psychology.md](references/ux-psychology.md)
- Design-system rules, API boundaries, tokens, governance: use `xizot-system`, or [references/system.md](references/system.md)
- Forms and validation flows: use `xizot-forms`
- Data-heavy tables, dashboards, filters, status, charts: use `xizot-data-ui`
- Accessibility, focus, labels, aria, keyboard flow: use `xizot-accessibility`
- Interaction behavior, overlays, confirmations, action hierarchy: use `xizot-interaction`
- Wayfinding, navigation, IA, breadcrumbs, tabs, orientation: use `xizot-wayfinding`
- Motion, transitions, microinteractions, reduced motion: use `xizot-motion`
- Spacing contrast, shadow, elevation, border, radius, depth: use `xizot-visual-polish`
- Responsible UX, consent, destructive actions, dark-pattern avoidance: use `xizot-responsible-ux`
- Final quality gate before finishing UI: use `xizot-quality`
- Background theory source map for maintainers: [references/theory-sources.md](references/theory-sources.md)

Do not block on missing design docs. If no product/design brief exists, infer conservatively from code and ask only when a decision changes the outcome.

## Modes

Choose the mode from the requested surface:

- **Operate:** app UI, dashboards, admin, settings, internal tools, CRUD/list pages, editors. Optimize for task completion, scanning, state clarity, and repeat use.
- **Read:** docs, guides, changelogs, help, installation pages. Optimize for comprehension, navigation, examples, and copy rhythm.
- **Persuade:** landing pages, pricing, marketing, campaign pages. Use stronger brand expression only when explicitly requested.
- **Compose:** reusable component composition, feature components, extraction into the design system. Optimize for API clarity and reuse.
- **System:** tokens, component APIs, patterns, agent rules, and package/install behavior. Optimize for long-term consistency.

Most Xizot work defaults to **Operate**.

## Commands

The user may invoke this skill directly, for example `$xizot-design-system build orders page` or by asking naturally for the same work.

| Command                | Category | Description                                                                                                        | Reference                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `build [surface]`      | Create   | Implement a new product UI surface using existing components and design-theory checks                              | use `xizot-page-builder`, or [references/build.md](references/build.md) |
| `shape [surface]`      | Plan     | Plan UX structure, component map, hierarchy, states, color role, and layout before implementation                  | [references/shape.md](references/shape.md)                              |
| `audit [target]`       | Evaluate | Review UI for design-system fit, accessibility, responsive issues, hierarchy, color, spacing, and AI anti-patterns | [references/audit.md](references/audit.md)                              |
| `polish [target]`      | Refine   | Make an existing UI cleaner, tighter, more consistent, and production-ready                                        | [references/polish.md](references/polish.md)                            |
| `harden [target]`      | Refine   | Add edge states, validation, loading, errors, overflow handling, accessibility, and i18n-aware copy                | [references/harden.md](references/harden.md)                            |
| `colorize [target]`    | Enhance  | Choose or improve palette, contrast, semantic color, status tones, and chart color                                 | [references/color.md](references/color.md)                              |
| `layout [target]`      | Enhance  | Improve grid, spacing, rhythm, density, alignment, and responsive structure                                        | [references/layout.md](references/layout.md)                            |
| `typeset [target]`     | Enhance  | Improve typography hierarchy, readable density, labels, and scanning                                               | [references/typography.md](references/typography.md)                    |
| `ux [target]`          | Enhance  | Apply UX psychology to reduce cognitive load and improve discoverability                                           | [references/ux-psychology.md](references/ux-psychology.md)              |
| `systemize [target]`   | System   | Strengthen tokens, component contracts, variants, governance, and reusable patterns                                | [references/system.md](references/system.md)                            |
| `extract [target]`     | System   | Pull reusable UI composition into the app or design-system layer                                                   | [references/extract.md](references/extract.md)                          |
| `adapt [target]`       | Fix      | Improve mobile/tablet/desktop behavior without changing the product concept                                        | [references/adapt.md](references/adapt.md)                              |
| `clarify [target]`     | Fix      | Improve Vietnamese/English UX copy, labels, empty states, and action names                                         | [references/clarify.md](references/clarify.md)                          |
| `form [target]`        | Enhance  | Improve form structure, field choice, RHF wrappers, validation, and submit behavior                                | use `xizot-forms`                                                       |
| `data [target]`        | Enhance  | Improve tables, filters, dashboards, status badges, charts, and scan density                                       | use `xizot-data-ui`                                                     |
| `interact [target]`    | Enhance  | Improve action hierarchy, menus, overlays, confirmations, and feedback                                             | use `xizot-interaction`                                                 |
| `a11y [target]`        | Evaluate | Improve keyboard, focus, labels, contrast, aria, form, and overlay accessibility                                   | use `xizot-accessibility`                                               |
| `quality [target]`     | Evaluate | Run final UI quality gate before finishing                                                                         | use `xizot-quality`                                                     |
| `wayfind [target]`     | Enhance  | Improve navigation, IA, breadcrumbs, tabs, filters, and orientation                                                | use `xizot-wayfinding`                                                  |
| `motion [target]`      | Enhance  | Improve transitions, loading motion, hover/focus response, and reduced-motion behavior                             | use `xizot-motion`                                                      |
| `responsible [target]` | Evaluate | Check consent, destructive actions, recovery, dark-pattern risk, and safe defaults                                 | use `xizot-responsible-ux`                                              |
| `depth [target]`       | Enhance  | Improve spacing contrast, shadow/elevation, border, radius, surface layering, and detail polish                    | use `xizot-visual-polish`                                               |
| `document [target]`    | Docs     | Document component usage or design decisions when the user asks for docs                                           | [references/document.md](references/document.md)                        |

Routing:

- New complete page without a named command: use `xizot-page-builder`. New smaller UI/feature: use `build`.
- Planning, architecture, IA, UX flow, or "nen lam gi": use `shape`.
- Inconsistent, ugly, generic, cluttered, or "chua xin": use `audit`, then `polish` if edits are requested.
- "mau", "palette", "contrast", "status color", "chart color": use `colorize`.
- "layout", "bo cuc", "spacing", "grid", "alignment", "density": use `layout`.
- "typography", "type", "font", "hierarchy", "readability": use `typeset`.
- "UX", "cognitive load", "form flow", "wayfinding", "empty state", "onboarding": use `ux`.
- "design system", "tokens", "variants", "component API", "frontend skills": use `systemize` or `document`.
- Validation, edge cases, loading/error/empty, overflow, responsive bugs, production readiness: use `harden`, `adapt`, `xizot-accessibility`, and `xizot-quality` as relevant.
- Forms, field validation, submit flows: use `xizot-forms`.
- Tables, dashboards, filters, status, charts: use `xizot-data-ui`.
- Menus, dialogs, sheets, drawers, confirmations, action states: use `xizot-interaction`.
- Navigation, breadcrumbs, tabs, IA, search/filter orientation: use `xizot-wayfinding`.
- Motion, transitions, skeletons, spinner behavior, animation restraint: use `xizot-motion`.
- Spacing contrast, shadow/elevation, border treatment, radius, and surface depth: use `xizot-visual-polish`.
- Destructive actions, permission boundaries, consent, recovery, trust: use `xizot-responsible-ux`.
- Before final response for UI implementation: use `xizot-quality`.

## Default Component Map

Always read [references/component-usage.md](references/component-usage.md) before using non-trivial components.

- Actions: `Button`, `ButtonGroup`, `DropdownMenu`, `Tooltip`, `Command`
- Forms: `RHF*` wrappers, `Field*`, `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `Switch`, `RadioGroup`, date/time/number controls
- Lists: `DataTable`, `Table`, `Pagination`, `Badge`, `Marker`, `Empty`, `Skeleton`, `Spinner`
- Navigation: `Sidebar`, `Breadcrumb`, `Tabs`, `NavigationMenu`
- Overlays: `DialogPanel`, `SheetPanel`, `DrawerPanel`, `PopoverPanel`, `AlertDialog`
- Feedback: `sonner`, `CustomToast`, `Alert`, `FormErrorMessage`, `Empty`

## Source Repo Boundary

For now, do not refactor guide pages unless the user explicitly asks. While building the skill pack, guide pages are reference material only. When the user later asks to refactor guides, use the `Read` mode and the `document` command.
