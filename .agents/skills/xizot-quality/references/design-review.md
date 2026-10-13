# Review the rendered design

Use for a new page, redesign or requested visual audit. Compare with the real task, chosen page pattern and inherited/selected visual direction. Do not score an implementation from screenshots alone when interaction matters, or from source alone when rendering matters.

## Review in order

1. **Task hierarchy:** Can the user identify the page, main work area and next action? Does a dashboard need its sidebar? Does a list devote space to results rather than decorative analytics? Are regions supported by actual content?
2. **Flow and subtraction:** Walk the main task. Remove redundant steps, confirmations, nested overlays, fake controls and repeated feedback. Keep information needed to decide and recover.
3. **Reading:** Inspect font actually loaded, type hierarchy, labels, contrast, long text, Vietnamese diacritics, numbers/units and missing media. Compare computed styles rather than assuming class sizes.
4. **Interaction:** Exercise keyboard, focus, pending, failure, retry/cancel and repeat actions. Verify real result semantics. A selected component does not guarantee correct application composition.
5. **Responsive and theme:** Test narrow/wide sizes plus actual layout breakpoints, long content and supported themes. Inspect reflow, local overflow, sticky regions and mobile keyboard impact.
6. **Polish:** Fix alignment, spacing rhythm, density, radii and media crops after structural problems. Do not introduce a new visual direction just to repair one spacing issue.

Use a specific observation: **location → observed behavior → user impact → correction → evidence after correction**. Do not substitute adjectives such as clean, premium or modern for evidence.

## Non-negotiable failures

- Fabricated product claims, data, permissions, exports or interactions presented as real.
- A broken primary flow, lost edits, duplicate mutation or false success.
- Keyboard traps, inaccessible essential controls, required information hidden behind inaccessible interaction, or observed contrast/focus/reflow failures in the tested scope.
- A redesign outside the requested scope or consumer code depending on unavailable internal demos.

These failures cannot be averaged away by a high aesthetic score. WCAG [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) requires a focused component not be entirely hidden by author-created content; additionally aim to keep the full focused control visible. Base UI's [accessibility guidance](https://base-ui.com/react/overview/accessibility) does not remove the application's responsibility for labels, content and composition.

## Rubric for harness evaluation or a requested scored audit

Ordinary implementation needs findings and verification, not a score report. For comparable benchmark runs, use these weights:

| Dimension                          | Weight | Evidence                                                          |
| ---------------------------------- | ------ | ----------------------------------------------------------------- |
| Task fit, shell and page structure | 20     | Regions and navigation serve the job; pattern choice has a reason |
| Flow, recovery and useful UX       | 20     | Task completed; states and feedback make the next action clear    |
| Typography and readability         | 15     | Actual font/size/hierarchy, labels, long/localized content        |
| Color and visual hierarchy         | 15     | Semantic roles, measured pairs, supported states/themes           |
| Component consistency              | 10     | Real contracts, coherent density/geometry, no duplicate controls  |
| Responsive and accessibility       | 15     | Observed keyboard, focus, reflow, names and target behavior       |
| Restraint and content integrity    | 5      | No purposeless regions, fake claims or decorative complexity      |

Rate each dimension 0–4: 0 absent/broken; 1 major problems; 2 usable with significant defects; 3 coherent with minor defects; 4 strong evidence-backed result. Weighted score = sum(weight × rating / 4). An unobserved dimension is **unverified**, not 4 or 0; do not claim a passing total with unverified required dimensions.

Target for a fully observed benchmark: at least 85/100, no dimension below 3, no non-negotiable failure. This is a project acceptance policy, not an external certification. Record disagreements and supporting screenshots/flows. Automated checks cannot judge all of these dimensions.

## Completion evidence

Report task/pattern, changed surface, actual commands, tested viewport/theme/interaction, issues corrected and unresolved or unverified items. Keep raw evidence with an evaluation run when benchmarking. Missing browser access means visual/runtime unverified; it is not a reason to fabricate a pass or expand scope into unrelated setup.
