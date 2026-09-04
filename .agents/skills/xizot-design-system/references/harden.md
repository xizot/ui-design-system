# Harden Command

Use for production-readiness work.

## State Coverage

Add or verify:

- loading
- empty
- no search results
- error
- disabled
- selected/active
- dirty form
- submitting
- optimistic or pending mutation when relevant
- destructive confirmation
- permission or unavailable states when present in domain logic

## Forms

- Use RHF wrappers where possible.
- Keep validation messages close to the field.
- Disable submit while pending.
- Preserve entered data when server errors occur.
- Use clear Vietnamese messages in Vietnamese screens.

## Layout And Overflow

- Long names, emails, phone numbers, codes, IDs, status labels, and action labels must not break the layout.
- Tables should preserve readable columns and pinned actions.
- Mobile toolbars should wrap predictably.
- Dialog/sheet content should scroll without losing footer actions.

## Do Not

- Add broad refactors unrelated to the hardening target.
- Replace component APIs to chase ideal architecture.
- Change guide pages unless documentation hardening is the explicit task.
