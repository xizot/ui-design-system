# UX Decision Model

## Cognitive Load

- Reduce choices at the moment of action.
- Group related decisions together.
- Keep labels close to controls.
- Use visible state so users do not need memory.
- Keep advanced or rare actions out of the primary path.

## Wayfinding

Users should know:

- where they are
- what is selected
- what filters are active
- what changed
- what action is available next

Use page titles, breadcrumbs, tabs, sidebars, active states, and empty states to support this.

## Feedback

- Async actions need pending state.
- Mutations need success/failure feedback.
- Field errors need inline messages.
- Destructive actions need clear confirmation.
- Loading states should preserve layout when possible.

## Forms

- Ask only for needed information.
- Use controls that match data type.
- Preserve user input after errors.
- Show all relevant validation messages without forcing repeated submit attempts.
- Disable impossible actions.

## Error Prevention

Prevent mistakes before explaining them:

- disable invalid actions
- constrain input controls
- confirm destructive operations
- reveal unsaved changes
- make selected objects obvious
