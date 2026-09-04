# Typography

Use this for `typeset`, hierarchy, readability, labels, table scanning, and text density.

The system exposes a compact type scale tied to form sizes: `text-xs`, `text-sm`, `text-md`, `text-lg`, and `text-xl`. Use these deliberately; do not create viewport-scaled type.

## Hierarchy Order

1. Content priority.
2. Type size.
3. Weight.
4. Color contrast.
5. Spacing.
6. Decoration only if still needed.

## Product UI Type Defaults

- Page title: strong but not hero-sized.
- Section heading: compact, usually `text-sm` to `text-lg` depending on surface.
- Table cells and form controls: `text-sm` or system component default.
- Metadata: `text-muted-foreground`, but only when the information is secondary.
- Badges: short labels that fit at `text-xs`.

## Scanning

- Put the meaningful word first in labels and table headers.
- Keep action labels short.
- Avoid paragraphs inside dense dashboards unless they explain a decision.
- Use consistent casing and terminology.
- Truncate or wrap intentionally; do not let text accidentally resize containers.

## Forms

- Labels should be clear nouns, not instructions.
- Placeholder text is a hint, not a label replacement.
- Error text should say the problem and the correction.
- Required indicators should not be the only signal when the field is critical.

## Vietnamese UI Copy

- Prefer concise operational Vietnamese.
- Keep terms stable: `Tạo mới`, `Lưu`, `Hủy`, `Áp dụng`, `Xóa`, `Làm mới`, `Tìm kiếm`, `Không có dữ liệu`, `Đang tải...`.
- Avoid mixing English labels unless the surrounding product already does.
- Avoid long button labels; move explanation to helper text or tooltip.

## Anti-Patterns

- Hero-scale type inside app panels.
- Muted text used for primary data.
- Too many font weights in one region.
- Letter spacing tweaks by habit.
- Negative letter spacing.
- Text hidden by icons or squeezed into fixed buttons.
