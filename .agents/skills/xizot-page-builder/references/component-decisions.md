# Choose the smallest useful interaction

Use this reference when deciding between controls, containers or feedback patterns. After choosing intent, inspect the [component catalog](../../xizot-design-system/references/component-catalog.md) and source for actual exports/props. A component name is not an API contract.

| User need                               | Starting choice                                        | Decision boundary                                                                                                            |
| --------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Navigate to a destination               | Link, using the component's supported composition      | Button for an action; do not fake navigation with a click handler unnecessarily                                              |
| Show application records or results     | DataTable                                              | Table only for a fixed, presentation-only comparison; follow the [core component choice](../../xizot-design-system/SKILL.md) |
| Explore products/projects               | Cards or content rows                                  | Table when comparing common attributes is the primary job                                                                    |
| Choose among a few visible options      | RadioGroup                                             | Select/Combobox when a long list or search changes the task                                                                  |
| Choose independent options for submit   | Checkbox group                                         | MultipleCombobox for a larger searchable list                                                                                |
| Toggle an immediate setting             | Switch                                                 | Checkbox for a choice committed with a form; define failure/rollback                                                         |
| Choose an entity                        | Local or lazy Combobox according to actual data source | Store the contract's selection value; preserve labels for loaded/edit defaults                                               |
| Switch alternative views in one context | Tabs                                                   | Route navigation for independent destinations/history when required                                                          |
| Hide optional supporting detail         | Accordion/Collapsible                                  | Keep decision-critical facts and errors visible                                                                              |
| Short focused task                      | DialogPanel                                            | Route for long work; sheet/split view for comparing with a list                                                              |
| Contextual detail beside work           | SheetPanel                                             | Persistent split view when repeated comparison and available width justify it                                                |
| Small anchored application panel        | PopoverPanel                                           | Low-level Popover primitives for embedded pickers/menus; DialogPanel for substantial focused work                            |
| Group an independent unit               | Card                                                   | Heading/spacing/rows for continuous content; avoid nested cards for decoration                                               |
| Communicate a short state               | Badge with meaningful text                             | Plain text if a badge adds no scanning value                                                                                 |
| Explain a field failure                 | Field-owned error                                      | Form/page-level feedback for wider failure; toast does not replace repair information                                        |
| Show loading                            | Region-shaped Skeleton or local Spinner                | Do not blank the whole page for an isolated refresh                                                                          |

## Remove unnecessary UX

For each region/control ask: **What does it help the user understand, decide or do? What content or behavior supports it?** Remove it if there is no answer.

- A management list needs no hero, KPI strip or chart unless these support prioritization.
- No search/sort/filter/menu/notification that looks functional but does nothing.
- One obvious action need not hide behind a dropdown. Prioritize actions within each context; this is not a global one-button-per-page rule.
- Do not create a wizard merely because a form has several fields, or a confirmation for a harmless reversible action without product reason.
- Do not use Tooltip to hide essential labels or warnings, or Accordion to hide purchase conditions.
- Feedback should appear where it changes the user's next action. Avoid redundant success toast + inline alert + modal for one event.
- Minimal UI still needs labels, errors, pending feedback, cancellation and recovery when the flow requires them.

## States belong to real flows

For each reachable interaction define loading/pending, success, empty/no-results and failure as applicable. Do not scaffold impossible states. Read [interaction checks](../../xizot-design-system/references/interaction-checks.md) for request-result and feedback ownership. Submitted forms route through [xizot-forms](../../xizot-forms/SKILL.md).

For a missing control capability, show the gap by reading source/callers. Keep one-off product behavior local; route a reusable product-neutral contract change through the system workflow. Do not invent an export, duplicate an existing wrapper or manufacture a permission requirement from a different project's rulebook.
