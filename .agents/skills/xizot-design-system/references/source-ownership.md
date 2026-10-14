# Source ownership

Use the source present in the project. Confirm aliases and component contracts before writing imports.

| Context            | Inspect                                       | Import                                                                    |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------------- |
| Library repository | `components/`, `hooks/`, `lib/`, `constants/` | Follow existing repository aliases                                        |
| Next/Vite consumer | `design-system/`                              | Usually `@/design-system/components/ui/button`; confirm tsconfig/jsconfig |
| CRA consumer       | `src/design-system/`                          | Usually `design-system/components/ui/button`; confirm jsconfig/tsconfig   |

Both TypeScript and JavaScript consumers are supported; inspect `.tsx` or generated `.jsx` as installed. Advanced demos under `internal-components/` are not copied. Do not import those from a consumer.

Project-specific guidance belongs outside installer-owned files/markers. Product theme/font decisions belong in application-owned files. Website font loaders, theme preset pickers and application providers must not be assumed to accompany copied controls.

Consumer projects own their lint and formatting configuration; the installer does not extend it. Type-check imported code in the consumer; check shared library edits here. Consumer theme decisions belong in application-owned files, not in installer-owned guidance.
