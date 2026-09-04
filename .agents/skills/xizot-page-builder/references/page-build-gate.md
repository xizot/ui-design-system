# Page Build Gate

Use this as the final decision model before coding a page.

## 1. Workflow

- Who uses this page?
- What do they need to do first?
- What information must be scanned repeatedly?
- What actions are primary, secondary, rare, or dangerous?

## 2. Component Map

Choose Xizot components before custom UI:

- Actions: `Button`, `ButtonGroup`, `DropdownMenu`, `Tooltip`, `Command`
- Forms: `RHF*`, `Field*`, `Input`, `Select`, `Combobox`, `Checkbox`, `Switch`, date/time/number controls
- Data: `DataTable`, `Table`, `Pagination`, `Badge`, `Marker`, `Empty`, `Skeleton`, `Spinner`
- Navigation: `Sidebar`, `Breadcrumb`, `Tabs`, `NavigationMenu`
- Overlays: `DialogPanel`, `SheetPanel`, `DrawerPanel`, `PopoverPanel`, `AlertDialog`

## 3. Color

- What is the primary action?
- What statuses need semantic tone?
- What is selected or active?
- What is destructive?
- Are chart colors needed?
- Does it work in light and dark mode?

## 4. Layout

- Header, toolbar, content region, panel/dialog, and footer are clear.
- Related controls are close; unrelated regions are separated.
- The page works at mobile, tablet, and desktop widths.
- Text containers use `min-w-0` where needed.
- Tables preserve key identity and actions.

## 5. Typography

- Page title is clear but not oversized.
- Table/form text is dense and readable.
- Metadata is muted only when secondary.
- Button and badge text fits.
- Vietnamese copy is consistent when product context is Vietnamese.

## 6. UX States

Include relevant states:

- loading
- empty
- no results
- error
- selected
- active filter
- disabled
- submitting
- destructive confirmation
- permission/unavailable state when domain logic requires it

## 7. System Boundary

- One-off page code stays in the route/feature.
- Repeated domain UI becomes a feature/app component.
- Product-neutral repeated interaction becomes design-system material.
- Guide page refactor is separate unless explicitly requested.

## 8. Interaction

- One primary action per region when possible.
- Secondary and rare actions are grouped predictably.
- Destructive actions are named and confirmed when irreversible.
- Async actions show pending state and completion/failure feedback.

## 9. Accessibility

- Keyboard order follows the workflow.
- Focus remains visible.
- Icon-only buttons have accessible names.
- Forms have labels and inline errors.
- Dialogs, sheets, drawers, menus, and popovers use system primitives.

## 10. Quality Gate

Before final response, run the `xizot-quality` checklist mentally or explicitly. The page must be component-native, token-based, responsive, accessible, state-complete, and not overdecorated.

## 11. Wayfinding

- Current page, object scope, active tab, and active filters are clear.
- Sidebar, breadcrumb, title, tabs, and empty states use consistent naming.
- Search and filters appear before the data they affect.

## 12. Motion

- Motion has a job: feedback, continuity, attention, pending state, or spatial relationship.
- Custom motion is subtle and respects reduced-motion needs.
- Dense data regions are not animated in ways that hurt scanning.

## 13. Responsible UX

- Destructive actions name consequences and allow cancellation.
- Risky defaults are not preselected without reason.
- Permission and unavailable states explain scope and next step.
- Error recovery preserves user work where possible.

## 14. Visual Polish

- Spacing contrast distinguishes items, groups, and sections.
- Shadows are used for floating/elevated surfaces, not every card.
- Borders or muted backgrounds separate same-plane regions.
- Radius choices match Xizot controls and do not feel random.
- Detail alignment, icon sizes, table actions, and hover states are stable.
