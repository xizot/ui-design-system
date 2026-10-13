# Component Catalog

Use this catalog to choose a component, then read its implementation before writing props. It covers every current `components/ui/*.tsx` module, every `components/rhf/rhf-*.tsx` wrapper, and the theme provider. Paths below are relative to the source root selected by [installation modes](installation-modes.md). The catalog describes public intent and the contracts most likely to be misused; the source file is authoritative for complete props and exports.

## How to use this catalog

1. Choose the row for the interaction and open its `components/...` file. Run `python .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "component-name"` if the file location or active installation is unclear.
2. In submitted forms, read [xizot-forms](../../xizot-forms/SKILL.md) and choose an `RHF*` wrapper when one exists. Search and filter controls may use local or URL state.
3. Import named exports from the specific module. Source consumers use their copied `design-system/components/...` path; package consumers use `ui-design-system/components/...`. Package CSS and source ownership are described in [installation modes](installation-modes.md).
4. If the row says _primitive_, compose its documented exports. If it says _panel_, use that composition for an application overlay. Do not assume shadcn examples use the same props as these files.

## Actions and selection

| Module                                     | Use and contract to check                                                                                                                                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/button.tsx`                 | `Button` for actions; choose `variant` and `size`. `loading` adds a spinner and `aria-busy`; also pass `disabled` while a request is pending if repeat activation must be prevented. Give icon-only actions an accessible name. |
| `components/ui/button-group.tsx`           | `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator` for related actions; use individual `Button` variants for priority.                                                                                                    |
| `components/ui/toggle.tsx`                 | `Toggle` for one pressed/unpressed action; check its pressed state contract and label.                                                                                                                                          |
| `components/ui/toggle-group.tsx`           | `ToggleGroup` and `ToggleGroupItem` for a compact set of toggle choices; check single/multiple behavior in source.                                                                                                              |
| `components/ui/checkbox.tsx`               | `Checkbox` for independent Boolean choices; supports integrated label/error layout. Use `RHFCheckbox` in submitted forms.                                                                                                       |
| `components/ui/switch.tsx`                 | `Switch` for an on/off setting; supports integrated label/error layout. Use `RHFSwitch` in submitted forms.                                                                                                                     |
| `components/ui/radio-group.tsx`            | `RadioGroup` and `RadioGroupItem` for one choice among visible options; use `RHFRadioGroup` in submitted forms.                                                                                                                 |
| `components/ui/slider.tsx`                 | `Slider` for a bounded range where dragging is useful; provide a readable value/label in the feature.                                                                                                                           |
| `components/ui/select.tsx`                 | `Select` and its trigger/content/item primitives for a fixed option list; read exports and controlled value API before composition.                                                                                             |
| `components/ui/native-select.tsx`          | `NativeSelect`, `NativeSelectOptGroup`, `NativeSelectOption` when a browser-native menu is appropriate; check its `size` and label props.                                                                                       |
| `components/ui/combobox.tsx`               | Low-level `Combobox*` primitives for a custom searchable control. Prefer the single/multiple compositions below for ordinary option selection.                                                                                  |
| `components/ui/single-combobox.tsx`        | `SingleCombobox` for local searchable options shaped `{ id, code, name }`; controlled `value` is an ID, and `onChange` receives ID plus option.                                                                                 |
| `components/ui/multiple-combobox.tsx`      | `MultipleCombobox` for several local options of the same shape; controlled `value` is an ID array, and `onChange` receives IDs plus options.                                                                                    |
| `components/ui/lazy-single-combobox.tsx`   | `LazySingleCombobox` for paged remote options; provide `fetchOptions`, optionally `mapResponse` and `backupOption` for an edit value absent from loaded pages.                                                                  |
| `components/ui/lazy-multiple-combobox.tsx` | `LazyMultipleCombobox` for several paged remote options; provide `fetchOptions`, optionally `mapResponse` and `backupOptions`.                                                                                                  |
| `components/ui/command.tsx`                | `Command*` primitives for search and keyboard-driven command lists; supply application action handling.                                                                                                                         |
| `components/ui/input-otp.tsx`              | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` for a fixed-length code; read value/length behavior before integrating validation.                                                                             |

## Text, date, and form structure

| Module                                 | Use and contract to check                                                                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/input.tsx`              | `Input` for ordinary text and non-submitted controls; has built-in label, required, size, and error composition. Use `RHFInput` in submitted forms.                                                                    |
| `components/ui/textarea.tsx`           | `Textarea` for longer text; use `RHFTextarea` in submitted forms.                                                                                                                                                      |
| `components/ui/number-input.tsx`       | `NumberInput` for formatted integers/decimals. It displays comma grouping and dot decimals; `onChange` receives a native event whose `target.value` is the unformatted numeric string. See the numeric contract below. |
| `components/ui/input-group.tsx`        | `InputGroup*` to place text, icons, buttons, or addons around `Input`/`Textarea`; use `InputGroupInput` or `InputGroupTextarea` rather than nesting an unrelated field shell.                                          |
| `components/ui/field.tsx`              | `Field*`, `FieldGroup`, `FieldSet`, and related exports for custom labels, descriptions, errors, and grouped controls. Keep actual validation in the form owner.                                                       |
| `components/ui/form-label.tsx`         | `FormLabel` for the library's label and required mark when composing a custom control.                                                                                                                                 |
| `components/ui/form-error-message.tsx` | `FormErrorMessage` for a supplied error string; it does not read React Hook Form state.                                                                                                                                |
| `components/ui/label.tsx`              | Low-level `Label` for a separate associated label; prefer a control's integrated label when available.                                                                                                                 |
| `components/ui/calendar.tsx`           | `Calendar` and `CalendarDayButton` for inline date selection or a custom picker; ordinary fields should use a picker composition.                                                                                      |
| `components/ui/date-picker.tsx`        | `DatePicker` for one date, date-time, time-only, or month mode. `onChange` returns `string                                                                                                                             | undefined`; `value`accepts`Date                     | string`. |
| `components/ui/date-range-picker.tsx`  | `DateRangePicker` for `{ from?: Date; to?: Date }`; supports presets and apply/cancel selection. Keep range state in one owner.                                                                                        |
| `components/ui/month-picker.tsx`       | `MonthPicker` for a month/year choice; controlled value and callback use `Date                                                                                                                                         | undefined`. `DatePicker`also exposes`mode="month"`. |
| `components/ui/time-picker.tsx`        | `TimePicker` for a controlled `TimeValue` with hour/minute/second strings. `TimePickerPanel` is its lower-level panel. The RHF wrapper stores a time string.                                                           |

## Application overlays and menus

| Module                            | Use and contract to check                                                                                                                                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/dialog-panel.tsx`  | `DialogPanelRoot`, `DialogPanelTrigger`, `DialogPanel`, `DialogPanelClose` for an application modal with header, scrollable body, and optional footer. Choose `size` and provide `title`; default confirm calls `onConfirm`. |
| `components/ui/sheet-panel.tsx`   | `SheetPanel*` for a side/top/bottom application panel. Choose `side` and `size`; supply `footer` or `onConfirm` as needed.                                                                                                   |
| `components/ui/drawer-panel.tsx`  | `DrawerPanel*` for a drawer flow with built-in header, body, and footer; inspect `size` and close behavior.                                                                                                                  |
| `components/ui/popover-panel.tsx` | `PopoverPanel*` for a compact application popover with optional header/footer/close button; choose `size`.                                                                                                                   |
| `components/ui/alert-dialog.tsx`  | `AlertDialog*` primitives for irreversible or high-impact confirmation; name the exact action and consequence.                                                                                                               |
| `components/ui/dialog.tsx`        | Low-level `Dialog*` primitives for custom reusable dialog structure; prefer `DialogPanel` for application content.                                                                                                           |
| `components/ui/sheet.tsx`         | Low-level `Sheet*` primitives; prefer `SheetPanel` for application content.                                                                                                                                                  |
| `components/ui/drawer.tsx`        | Low-level `Drawer*` primitives; prefer `DrawerPanel` for application content.                                                                                                                                                |
| `components/ui/popover.tsx`       | Low-level `Popover*` primitives for custom controls, such as date pickers; prefer `PopoverPanel` for application content.                                                                                                    |
| `components/ui/dropdown-menu.tsx` | `DropdownMenu*` primitives for infrequent actions. Keep destructive menu items explicit and confirm irreversible actions.                                                                                                    |
| `components/ui/context-menu.tsx`  | `ContextMenu*` primitives for pointer context actions; provide a discoverable alternative for keyboard and touch users.                                                                                                      |
| `components/ui/menubar.tsx`       | `Menubar*` primitives for a persistent menu bar with grouped commands.                                                                                                                                                       |
| `components/ui/hover-card.tsx`    | `HoverCard*` for supplementary preview content; do not hide essential actions or information behind hover only.                                                                                                              |
| `components/ui/tooltip.tsx`       | `Tooltip*` and `TooltipProvider` for short hints; icon-only controls still need an accessible name.                                                                                                                          |

## Navigation and layout

| Module                              | Use and contract to check                                                                                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/sidebar.tsx`         | `SidebarProvider`, `Sidebar`, `SidebarInset`, `SidebarTrigger`, and related exports for app navigation. The provider owns collapse/mobile state; inspect exports and the source-repo sidebar guide before composing advanced layouts. |
| `components/ui/navigation-menu.tsx` | `NavigationMenu*` primitives for hierarchical site/page navigation.                                                                                                                                                                   |
| `components/ui/breadcrumb.tsx`      | `Breadcrumb*` primitives for current location and ancestors; current page is text, ancestors are links.                                                                                                                               |
| `components/ui/tabs.tsx`            | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` for peer views; own the active tab state in the nearest coordinator when other content depends on it.                                                                                |
| `components/ui/pagination.tsx`      | `Pagination*` primitives for standalone page navigation; `DataTable` already composes pagination for tables.                                                                                                                          |
| `components/ui/accordion.tsx`       | `Accordion*` primitives for optional expandable sections; keep critical content visible when needed for the task.                                                                                                                     |
| `components/ui/collapsible.tsx`     | `Collapsible*` primitives for one disclosure area; decide open state ownership explicitly.                                                                                                                                            |
| `components/ui/card.tsx`            | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` for grouped content; use `size` (`xxs` to `xxl`, or legacy `default`) for coordinated density.                                        |
| `components/ui/item.tsx`            | `Item*` primitives for compact content/action rows; inspect slots before using as a list item.                                                                                                                                        |
| `components/ui/separator.tsx`       | `Separator` for a semantic or visual boundary between adjacent groups.                                                                                                                                                                |
| `components/ui/scroll-area.tsx`     | `ScrollArea`, `ScrollBar` when a bounded region needs a styled scroll surface; constrain height in the parent.                                                                                                                        |
| `components/ui/resizable.tsx`       | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` for user-resizable panes.                                                                                                                                                  |
| `components/ui/aspect-ratio.tsx`    | `AspectRatio` to reserve media proportions and avoid layout shift.                                                                                                                                                                    |
| `components/ui/carousel.tsx`        | `Carousel*` primitives for sequential slides; provide controls and meaningful slide order.                                                                                                                                            |
| `components/ui/direction.tsx`       | `DirectionProvider`, `useDirection` for directional context when a component tree needs RTL/LTR support.                                                                                                                              |

## Data display and feedback

| Module                                    | Use and contract to check                                                                                                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/table.tsx`                 | `Table*` primitives for a static semantic table; use `DataTable` when sorting, filtering, selection, expansion, or pagination is needed.                                          |
| `components/ui/data-table.tsx`            | `DataTable` and `DataColumnHeader` for operational lists. Supply controlled sorting, column filters, and pagination with matching callbacks; see the table contract below.        |
| `components/ui/chart.tsx`                 | `ChartContainer`, `ChartTooltip*`, `ChartLegend*` and config helpers around Recharts; provide a `ChartConfig` and a bounded chart region. Check current exports before composing. |
| `components/ui/progress.tsx`              | `Progress` plus optional `ProgressLabel`/`ProgressValue` for measured completion. `Progress` already renders a track and indicator.                                               |
| `components/ui/badge.tsx`                 | `Badge`, avatar/icon/dot/dismiss and group pieces for short status or removable tags; select semantic variants.                                                                   |
| `components/ui/marker.tsx`                | `Marker`, `MarkerIcon`, `MarkerContent` for a compact visual marker; do not use color as the only meaning.                                                                        |
| `components/ui/avatar.tsx`                | `Avatar`, `AvatarImage`, `AvatarFallback`, group/badge pieces for people or entities; supply useful fallback text.                                                                |
| `components/ui/alert.tsx`                 | `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` for inline status requiring attention or recovery.                                                                       |
| `components/ui/empty.tsx`                 | `Empty*` for a true empty/no-results state; describe what happened and the available next action.                                                                                 |
| `components/ui/skeleton.tsx`              | `Skeleton` for a loading placeholder that matches the eventual content footprint.                                                                                                 |
| `components/ui/spinner.tsx`               | `Spinner` for compact activity; pair it with a readable pending label or status when needed.                                                                                      |
| `components/ui/sonner.tsx`                | `Toaster` for app-level toast rendering; mount once under the theme provider, then use the project's toast call sites.                                                            |
| `components/ui/custom-toast.tsx`          | `CustomToast` for the repository's typed success/error/warning toast content; it requires `id`, `title`, and `type`.                                                              |
| `components/ui/bubble.tsx`                | `Bubble*` primitives for conversational content and reactions; inspect role/content structure before composing.                                                                   |
| `components/ui/message.tsx`               | `Message*` primitives for message threads with header/avatar/content/footer slots.                                                                                                |
| `components/ui/code-block.tsx`            | `CodeBlock` for displaying and copying a code string; both `code` and the copy-state key `id` are required.                                                                       |
| `components/ui/kbd.tsx`                   | `Kbd`, `KbdGroup` to show keyboard shortcuts beside actions, not as the only instruction.                                                                                         |
| `components/ui/typography.tsx`            | Typography exports for consistent prose/headings; inspect available names and retain semantic HTML hierarchy.                                                                     |
| `components/ui/theme-toggle.tsx`          | `ThemeToggle` switches between light and dark through `next-themes`; use with `ThemeProvider`.                                                                                    |
| `components/providers/theme-provider.tsx` | `ThemeProvider` adapts `next-themes`; mount at an app boundary when theme-aware components are used.                                                                              |

## React Hook Form wrappers

Import these named exports from `components/rhf` (package mode: `ui-design-system/components/rhf`). The exported wrapper list is in `components/rhf/index.ts`; shared `control`, `name`, and label/description types are in `components/rhf/types.ts`. Define complete form `defaultValues` using the value types below, and verify validation/error behavior at the form owner.

| Module / export                                              | Contract to check                                                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `rhf-input.tsx` / `RHFInput`                                 | Requires `register`, `control`, `name`; uses registration for the input and control for the error.                                    |
| `rhf-textarea.tsx` / `RHFTextarea`                           | Requires `register`, `control`, `name`; defaults to `maxLength=512`, `rows=5`, with a character badge unless `showMaxLength={false}`. |
| `rhf-number-input.tsx` / `RHFNumberInput`                    | Requires `control`, `name`; stores the unformatted numeric **string**, including `"0"`. Optional `callback` receives that string.     |
| `rhf-checkbox.tsx` / `RHFCheckbox`                           | Boolean value; `onBeforeChange(next, current, onNextAction)` may gate the change, while `callback` runs after it.                     |
| `rhf-switch.tsx` / `RHFSwitch`                               | Boolean setting with the same `onBeforeChange`/`callback` contract as checkbox.                                                       |
| `rhf-radio-group.tsx` / `RHFRadioGroup`                      | String value; `callback` receives the selected string. Compose its `RadioGroupItem` children.                                         |
| `rhf-single-combobox.tsx` / `RHFSingleCombobox`              | ID value (`string                                                                                                                     | number                                    | undefined`) and local `options`; `callback` receives ID and option. |
| `rhf-multiple-combobox.tsx` / `RHFMultipleCombobox`          | Array of IDs and local `options`; `callback` receives IDs and selected options.                                                       |
| `rhf-lazy-single-combobox.tsx` / `RHFLazySingleCombobox`     | Remote single selection; pass `fetchOptions`, `mapResponse` if needed, and `backupOption` for edit defaults.                          |
| `rhf-lazy-multiple-combobox.tsx` / `RHFLazyMultipleCombobox` | Remote multi-selection; pass `fetchOptions`, `mapResponse` if needed, and `backupOptions` for edit defaults.                          |
| `rhf-date-picker.tsx` / `RHFDatePicker`                      | Form value is `string                                                                                                                 | undefined`; `callback` receives the same. |
| `rhf-date-range-picker.tsx` / `RHFDateRangePicker`           | Form value is `{ from?: Date; to?: Date }                                                                                             | undefined`; `callback` receives the same. |
| `rhf-time-picker.tsx` / `RHFTimePicker`                      | Form value is an `HH:mm:ss` string by default, or `HH:mm` with `showSeconds={false}`; `callback` receives the string or `undefined`.  |
| `rhf-error-message.tsx` / `RHFErrorMessage`                  | Reads the field error from `control` and `name`; use when composing a field without a wrapper-owned error.                            |

## Contracts worth checking before implementation

### Numeric input

`NumberInput` accepts `format="integer" | "decimal"`, `max`, `allowNegative`, and `decimalMaxFractionDigits` (default from `lib/number.ts`). The visible string has grouping commas; the event value passed to callers is an unformatted numeric string. Intermediate edit states and caret restoration are owned by the component. Keep `0` distinct from empty, retain the event value as a string in RHF, and parse at a deliberate domain boundary. Check paste, blur, sign, precision, and max behavior in the actual consumer workflow.

### Combobox options and remote loading

Local and lazy comboboxes require options extending `ComboboxBaseOption` with `id`, `code`, and `name`. Store IDs, not copied option objects, as the selection source of truth. Lazy variants accept a `fetchOptions` function; the default expected response is `ListResponse<TOption>`, or supply `mapResponse` returning `{ totalPages, pageNumber, items }`. Check `searchKey`, `pageKey`, `pageSizeKey`, `dependencies`, and backup option behavior in the specific source file before using them. Read the RHF wrapper before assuming it forwards a callback or a prop.

### Table state

`DataTable` requires `data`, `columns`, `sorting`, `columnFilters`, `pagination`, and all three change callbacks. It sets `manualPagination` and `manualSorting` and has no local filtered row model: pass rows that already match the current page, sort, and filter state. Use `totalCount` for the full result count, `getRowId` for stable row identity, and controlled selection only when needed. `DataColumnHeader` can render sorting/filter controls when passed a column and optional filter options. Inspect `data-table.tsx` for pagination, empty, loading, expansion, and the pinned `actions` column before wiring it.

### Application panels

`DialogPanel`, `SheetPanel`, `DrawerPanel`, and `PopoverPanel` supply a scrollable body, header, and a default footer. Set `showFooter={false}` for read-only content, or provide `footer` when form submit needs `type="submit"`, pending state, or validation. The default confirm button only calls `onConfirm`; it does not own a form or async mutation. Use the matching `*Root`/`*Trigger` and a controlled `open` state when the surrounding workflow needs to open or close the panel programmatically.

### Date and time values

`DatePicker` emits a string; `DateRangePicker` emits a range of `Date` objects; `TimePicker` emits a `TimeValue` object, while `RHFTimePicker` stores a string. Pick one representation for the form/API boundary and convert there. Use `locale`, disabled-date rules, and clear behavior from the real picker contract rather than guessing from a calendar example.
