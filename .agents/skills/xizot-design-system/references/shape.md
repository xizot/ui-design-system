# Shape Command

Use for planning frontend UX/UI before implementation.

## Output

Keep the plan concrete enough to implement:

- surface mode
- user workflow
- information architecture
- component map
- state map
- color role
- layout and spacing model
- typography hierarchy
- responsive behavior
- system boundary
- files likely to change
- validation/check plan

## Component Map

Name the Xizot components expected for each region. Example:

- Header: `Breadcrumb`, `Button`, lucide action icon
- Filters: `InputGroup`, `SingleCombobox`, `DateRangePicker`, `ButtonGroup`
- Data: `DataTable`, `Badge`, pinned `actions` column
- Mutation: `DialogPanel` or `SheetPanel`, `RHFInput`, `RHFSingleCombobox`, `RHFTextarea`
- Feedback: `sonner`, `Empty`, `Skeleton`

## Design-Theory Map

- Color: semantic status, active states, destructive risk, chart roles, selected emphasis.
- Layout: page skeleton, toolbar grouping, content regions, responsive collapse.
- Typography: title scale, table density, form labels, metadata tone.
- UX: wayfinding, feedback, error prevention, cognitive load.
- System: token/component reuse, feature-local vs shared vs design-system boundary.

## Decision Rules

- If the user wants speed, shape briefly and proceed to implementation.
- If the UI touches shared navigation, data tables, forms, tokens, or reusable components, be more explicit before editing.
- If product details are missing but can be represented with placeholders/mocks, proceed and make the assumptions visible.
- Ask only when the missing answer changes component choice, workflow structure, or data model.
