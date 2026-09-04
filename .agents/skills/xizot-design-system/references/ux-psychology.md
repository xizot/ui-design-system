# UX Psychology

Use this for `ux`, forms, wayfinding, onboarding, cognitive load, discoverability, feedback, and interaction quality.

The goal is to make the interface easier to understand and safer to operate, not just prettier.

## Cognitive Load

- Reduce choices at the moment of action.
- Put advanced or destructive actions behind menus or confirmation when they are not primary.
- Group related decisions together.
- Keep labels close to controls.
- Prefer recognition over recall: visible selected filters, active tabs, breadcrumbs, and clear current state.

## Wayfinding

- Users should know where they are, what is selected, what changed, and what they can do next.
- Use `Breadcrumb`, `Tabs`, `Sidebar`, active states, and page titles consistently.
- Empty states should provide direction, not just announce absence.
- Dialogs/sheets should have explicit titles and close/cancel paths.

## Feedback

- Every async action needs visible pending state.
- Every mutation needs success or failure feedback.
- Validation should happen close to the field.
- Destructive actions need confirmation when data loss is likely.
- Loading states should preserve layout when possible.

## Forms

- Ask only for information needed now.
- Put high-confidence defaults where the domain allows.
- Use input types and controls that match the data: date picker for date, combobox for searchable options, switch for boolean, radio for few mutually exclusive choices.
- Avoid making users fix multiple errors without seeing all relevant messages.
- Preserve user input after errors.

## Decision Speed

- Primary action must be visually and spatially clear.
- Secondary actions should not compete with primary actions.
- Dangerous actions should be recognizable but not visually dominant until confirmed.
- Search/filter tools should appear before the data they affect.

## Error Prevention

- Disable impossible actions.
- Confirm irreversible actions.
- Use constraints in controls before relying on error messages.
- Make selected rows, active filters, and unsaved changes visible.

## Anti-Patterns

- Empty states with no next step.
- Hidden primary action on mobile.
- Form labels that require domain memory.
- Multiple equally strong buttons in one footer.
- Toast-only errors for field-level problems.
- Color-only state indication.
