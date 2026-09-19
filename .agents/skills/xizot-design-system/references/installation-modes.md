# Installation modes

Both CLI modes install the complete `.agents/skills` pack and `.agents/rules` into the application, and update only the marked design-system section of `AGENTS.md`. Read local skills and `.agents/rules/react.md` in either mode. Package mode copies guidance from the installed dependency revision; rerun its CLI after dependency upgrades to refresh guidance. Installer-owned guidance files are overwritten on setup; keep project-specific instructions outside those files and the marked AGENTS section. Unrelated skills and rules are preserved.

| Context | Component source to inspect | Application imports |
| --- | --- | --- |
| Source consumer | `design-system/components`, `hooks`, `lib`, `constants` | `@/design-system/components/ui/button` (adjust alias to project) |
| Package consumer | `node_modules/ui-design-system/components`, `hooks`, `lib`, `constants` | `ui-design-system/components/ui/button` |
| Library repository | `components`, `hooks`, `lib`, `constants` | Existing repository import conventions |

Paths in component references are relative to the resolved source root. Package runtime and declarations come from public exports backed by `dist/`; never import `node_modules/...`, package source files, or private `dist/...` paths in application code. RHF imports use `ui-design-system/components/rhf`; hooks, lib and constants use their public subpaths. Package CSS is `@import 'ui-design-system/styles.css';` in global CSS processed by Tailwind v4.

Run `python3 .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "input"`. Discovery reads the mode from the installer-marked AGENTS section. Without a marker it detects source or package; if both exist, pass `--mode source` or `--mode package` before `discover`. An explicitly selected missing mode fails instead of silently using another installation.

Source consumers may edit copied components when authorized. Package consumers must not edit or fork `node_modules`: compose public components in the app, or change the library repository and install a new revision. Moving between modes does not migrate imports, CSS or remove the previous installation. Follow the active mode even if older files remain.
