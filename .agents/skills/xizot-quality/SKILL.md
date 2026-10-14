---
name: xizot-quality
description: Verify a completed Xizot UI change or audit a requested surface using source, scoped checks and observed interactions. Report evidence and unverified behavior separately.
---

# Completion checks

Check only the changed surface and affected contracts. Prioritize correctness, keyboard/accessibility and recovery before visual decoration.

| Change               | Evidence to obtain                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| Any React code       | Read diff for ownership/types and React rules; run project type check and scoped lint                           |
| Interactive control  | Exercise success, disabled/pending, failure and repeat interaction when reachable                               |
| Form                 | Invalid and valid submit, pending duplicate prevention, rejected request preserving edits, reopen/entity switch |
| Data/search          | Empty vs no-results, error/retry, sorting/paging, rapid search and stale response handling                      |
| Overlay/navigation   | Keyboard opening, accessible name, focus movement/return, Escape/close, links/back behavior                     |
| Layout/visual        | Render narrow and wide viewports; long labels/content; focus visibility; supported themes; zoom/reflow          |
| Shared API/installer | Relevant callers, isolated consumer behavior and package contents                                               |

For a new application page, inspect its final route and feature tree against [feature architecture](../xizot-design-system/references/feature-structure.md). Confirm the route delegates composition to the use case; substantial header, filter, table, form and other meaningful regions have clear local owners; service calls and state are placed at their intended boundaries. Check imports and public exports. Do not require optional folders that the page does not need.

Use the project's commands and test tools; inspect `package.json` before selecting commands. Browser checks require an actual rendered application. If runtime access is unavailable, report that gap; do not replace it with a mental pass or a regex success.

For a new page, redesign or visual audit, follow [design review](references/design-review.md): assess the chosen pattern, task hierarchy, visual direction and unnecessary UX against the rendered result. A source/API pass cannot compensate for unreadable or unusable design. A label-only fix needs only its affected checks.

For an audit, record each issue as location + observed behavior + impact + proposed correction. For implementation, fix in-scope failures and report remaining unrelated failures. Do not claim complete accessibility compliance from spot checks.

Finish with what changed, actual commands/results, and what remains unverified. Avoid checklist dumps or claims that the harness guarantees agent compliance.
