# xizot implementation routing

For React/Next.js UI work, read [.agents/skills/xizot-design-system/SKILL.md](.agents/skills/xizot-design-system/SKILL.md) before editing. Read files directly when the agent client does not expose skills automatically.

| Task | Additional workflow |
| --- | --- |
| Create/edit a submitted form | [xizot-forms](.agents/skills/xizot-forms/SKILL.md) |
| Build a complete page | [xizot-page-builder](.agents/skills/xizot-page-builder/SKILL.md) |
| Change shared APIs or packaging | [xizot-system](.agents/skills/xizot-system/SKILL.md) |
| Finish a UI change | [xizot-quality](.agents/skills/xizot-quality/SKILL.md) |

Use the core skill's discovery script before inventing a component API. Submitted product forms use React Hook Form and existing RHF wrappers; search/filter controls may use local or URL state. Read the forms workflow for exceptions and actual prop contracts.

Keep domain logic in feature code and product-neutral UI in the design system. Follow the [code review contract](.agents/skills/xizot-design-system/references/code-contract.md). Do not create abstractions solely to claim SOLID compliance.

Run scoped checks and report actual results. A successful heuristic scan is not evidence of correct behavior or accessibility. Preserve unrelated edits and keep documentation demos outside a change unless requested.
