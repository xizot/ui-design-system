# xizot implementation routing

Both source and package consumers use local `.agents/skills` and `.agents/rules`. Follow the installer-marked mode in consumer `AGENTS.md`; see [installation modes](.agents/skills/xizot-design-system/references/installation-modes.md). In this library repository, inspect `components/` directly.

Read [.agents/rules/react.md](.agents/rules/react.md) for the complete React implementation policy.

For React/Next.js UI work, read [.agents/skills/xizot-design-system/SKILL.md](.agents/skills/xizot-design-system/SKILL.md) before editing. Read files directly when the agent client does not expose skills automatically.

| Task                            | Additional workflow                                              |
| ------------------------------- | ---------------------------------------------------------------- |
| Create/edit a submitted form    | [xizot-forms](.agents/skills/xizot-forms/SKILL.md)               |
| Build a complete page           | [xizot-page-builder](.agents/skills/xizot-page-builder/SKILL.md) |
| Change shared APIs or packaging | [xizot-system](.agents/skills/xizot-system/SKILL.md)             |
| Finish a UI change              | [xizot-quality](.agents/skills/xizot-quality/SKILL.md)           |

Use the core skill's discovery script before inventing a component API. Submitted product forms use React Hook Form and existing RHF wrappers; search/filter controls may use local or URL state. Read the forms workflow for exceptions and actual prop contracts.

Keep domain logic in feature code and product-neutral UI in the design system. Follow the [code review contract](.agents/skills/xizot-design-system/references/code-contract.md). Do not create abstractions solely to claim SOLID compliance.

Run scoped checks and report actual results. A successful heuristic scan is not evidence of correct behavior or accessibility. Preserve unrelated edits and keep documentation demos outside a change unless requested.

## React code rules

- Model the UI first: define the component hierarchy, visual states, one-way data flow, and one responsibility per component. Build the static render before adding interaction state.
- Keep state minimal and owned by the closest common parent that coordinates it. Derive filtered lists, labels, counts, and other display values during render instead of duplicating them in state.
- Use Effects only to synchronize with external systems. Do not use an Effect to derive render data, handle user events, or synchronously mirror props/state into another state value. Add correct dependencies and cleanup when needed.
- When a component has two or more props, define a named props type or interface near the component. Do not declare the props object type inline in the parameter list.
- Do not export a renamed type alias such as `export type NewName = ExistingName`. Reuse the original type or define a real, intentional public contract.
- Do not guess fields with optional chaining such as `?.name`, `?.Name`, or `?.Names`. Read the source type/API contract first; use fallbacks only for documented missing data with an explicit domain default.
