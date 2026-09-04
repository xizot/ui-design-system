# UI Quality Gate

## Component Fit

- Existing Xizot primitives used first.
- No duplicated buttons, inputs, selects, dialogs, menus, badges, or tables.
- No direct third-party primitive imports when wrappers exist.
- `className` used for context, not full visual replacement.

## Color

- Semantic tokens used.
- Color has a job.
- Contrast works in light and dark mode.
- Status palette is limited and meaningful.
- Color is not the only state signal.

## Layout

- Primary workflow appears first.
- Related items are grouped by spacing/alignment.
- No nested cards for ordinary sections.
- Toolbar wraps on mobile.
- Long content cannot break the layout.

## Typography

- Clear hierarchy without oversized app text.
- Muted text is secondary.
- Button, badge, and table labels fit.
- Vietnamese copy is consistent when applicable.

## UX And States

- Loading, empty, no-results, error, selected, active filter, disabled, submitting, and destructive confirmation are present where relevant.
- Async actions show pending state and result feedback.
- Empty states guide the next action when one exists.

## Accessibility

- Keyboard flow works.
- Focus is visible.
- Icon-only actions have names.
- Forms have labels and inline errors.
- Dialogs and menus use system primitives.

## Wayfinding

- Current location, scope, active tab, active filters, and next action are clear.
- Navigation labels match page titles and empty states.

## Visual Polish

- Spacing contrast clearly separates items, groups, and sections.
- Shadow/elevation is restrained and purposeful.
- Borders, muted backgrounds, and shadows are not stacked without reason.
- Radius, icon sizing, alignment, and hover details are consistent.

## Motion

- Motion clarifies state or is omitted.
- Custom animation is subtle and reduced-motion aware.

## Responsible UX

- Destructive and permission-sensitive flows are honest, reversible where possible, and recoverable.
- No manipulative copy or hidden cancel/decline path.

## Verification

Run relevant checks for the repo. If lint/build failures are unrelated pre-existing issues, report them clearly without hiding them.
