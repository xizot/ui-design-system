# Source ownership and installation

The current `bin/install.cjs` supports source-copy installation only. `package.json` does not expose a compiled component package. Do not recommend `--package`, `--mode package`, `ui-design-system/styles.css` or runtime package imports for this revision.

| Context            | Inspect                                       | Import                                                                    |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------------- |
| Library repository | `components/`, `hooks/`, `lib/`, `constants/` | Follow existing repository aliases                                        |
| Next/Vite consumer | `design-system/`                              | Usually `@/design-system/components/ui/button`; confirm tsconfig/jsconfig |
| CRA consumer       | `src/design-system/`                          | Usually `design-system/components/ui/button`; confirm jsconfig/tsconfig   |

Both TypeScript and JavaScript consumers are supported; inspect `.tsx` or generated `.jsx` as installed. Advanced demos under `internal-components/` are not copied. Do not import those from a consumer.

The CLI installs local `.agents/skills`, `.agents/rules`, and a marked source-mode section in `AGENTS.md`. Re-run the CLI from the new revision to refresh guidance. Keep project-specific guidance outside installer-owned files/markers. Exact unchanged retired files are removed on upgrade; locally modified retired files are preserved with a warning and need manual reconciliation.

Discovery retains recognition of historical package-mode markers to inspect old consumers. If one is encountered, inspect that installed version's actual exports; it does not mean this revision can create/update that installation. Do not edit `node_modules`.

Source setup adds the copied folder to consumer lint/format ignores where supported. Type-check imported code in the consumer; check shared library edits here. Consumer theme decisions belong in application-owned files, not in installer-owned guidance.
