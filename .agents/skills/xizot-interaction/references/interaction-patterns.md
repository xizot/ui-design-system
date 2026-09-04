# Interaction Patterns

## Action Hierarchy

- One primary action per region when possible.
- Secondary actions use outline/ghost/secondary variants.
- Rare or administrative actions can move into `DropdownMenu`.
- Destructive actions should be visually distinct but not accidentally dominant.

## Toolbars

- Put search and filters before the data region they affect.
- Active filters should be visible or easy to clear.
- Keep refresh/export/import near data actions.
- Toolbars should wrap on mobile without hiding the primary action.

## Overlays

- Use `DialogPanel` for focused decisions or forms.
- Use `SheetPanel` or `DrawerPanel` for contextual edit/detail flows.
- Use `PopoverPanel` for lightweight local controls.
- Use confirmation dialogs for irreversible destructive actions.

## Feedback

- Buttons with async behavior use `loading` when available.
- Mutations produce success/failure feedback.
- Validation errors stay near fields.
- Region-level errors stay in the affected region.

## States

Represent hover, focus, active, disabled, selected, pending, empty, and error states through system components and tokens.
