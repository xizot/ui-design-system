# 🎨 UI Design System

A reusable UI design system starter built on top of the shadcn ecosystem, Base UI primitives, Tailwind CSS v4, and React 19.

This repository serves two purposes:

- 🏗️ a source workspace for building and documenting components
- 📦 a CLI installer that copies editable source into React applications

## 📁 What This Project Includes

- 📦 `components/`
  Core UI components and RHF wrappers
- 🔢 `constants/`
  Shared constants used by the design system
- 🪝 `hooks/`
  Reusable hooks
- 🛠️ `lib/`
  Utilities and helper functions
- 📖 `app/components/...`
  Internal component usage guide pages
- ⚙️ `bin/install.cjs`
  CLI installer used by `npx github:xizot/ui-design-system`

## 🧱 Stack

- ▲ Next.js App Router
- ⚛️ React 19
- 🎨 Tailwind CSS v4
- 🧩 shadcn-based component structure
- 🔲 Base UI primitives
- 📋 React Hook Form
- 🛡️ Zod
- 📊 TanStack Table
- 🔗 Nuqs

## 🚀 Installation via CLI

The CLI copies editable components into `design-system/`.

For Create React App, the target is `src/design-system/` so the source stays inside CRA's compilation boundary. TypeScript projects receive TS/TSX; JavaScript projects receive JS/JSX.

### Supported projects

| Project | Requirements | Build integration | Consumer imports |
| --- | --- | --- | --- |
| Vite React | React 19, Tailwind 4 | Preserves Vite config and adds a specific alias; configures PostCSS | `@/design-system/...` |
| Next.js | Next 15.1 or 16.x, React 19, Tailwind 4 | Merges tsconfig/jsconfig paths and PostCSS configuration | `@/design-system/...` |
| Create React App | react-scripts 5, React 19, Tailwind 4 | Uses CRACO, keeps source under `src`, loads the PostCSS config | `design-system/...` with `baseUrl: "src"` |

Node 20.19+ is required. Existing React 18, Tailwind 3, incompatible dependency versions, unsupported configs and ambiguous package-manager lockfiles stop installation before source/config files are changed. Upgrade those dependencies explicitly before rerunning; the installer does not force major upgrades.

CRA TypeScript projects retain the TypeScript version required by react-scripts and install TypeScript 5.9 as `xizot-typescript` for the build checker and VS Code SDK. Select the workspace TypeScript SDK in VS Code. Existing CRA start/build/test command arguments and CRACO overrides are preserved.

The installer checks declared ranges and installed versions, installs missing packages with exact versions, and respects `package.json#packageManager` before lockfile detection. Vite/Next aliases use the specific `@/design-system/*` prefix, so existing `@/*` and other aliases keep their meaning. JSONC comments and unrelated settings are preserved.

After pushing this repository to GitHub as `xizot/ui-design-system`, consumers can install it with:

```bash
npx github:xizot/ui-design-system init --mode source
```

Shortcut:

```bash
npx github:xizot/ui-design-system
```

Show help:

```bash
npx github:xizot/ui-design-system help
```

The CLI installs the design system into a dedicated target folder:

```text
design-system/
  components/
  constants/
  hooks/
  lib/
AGENTS.md
```

### Source CLI behavior

The installer uses a guided flow:

1. 📂 Component files
   It checks for existing files inside `design-system/` and asks whether to overwrite, skip, or review conflicts one by one.
2. 📦 Dependencies
   It checks the target project's `package.json`, detects missing runtime dependencies, and asks whether they should be installed automatically.
3. 🤖 Agent rules
   It installs the complete `.agents/skills` pack and `.agents/rules` and creates or updates the target project's `AGENTS.md` with the rules from `.agents/skills/xizot-design-system/references/agent-rules.md`.
4. 🎨 Project files
   It merges framework configuration, stores the theme in the installed `styles.css`, and imports it from application CSS (or the app entry). Existing application CSS and customized installed theme files are retained.

For automation, `init --yes` installs missing packages and skips existing component files. Add `--overwrite` explicitly to refresh component source. Repeating setup does not duplicate config wrappers or CSS imports. `--mode source` is accepted for compatibility; package mode is not implemented by this CLI.

Supported package managers:

- `pnpm`
- `yarn`
- `bun`
- `npm`

### Source import path

The usage guides should document imports from the installed target path, for example:

```tsx
import { Button } from '@/design-system/components/ui/button';
```

This is the public consumption path after the CLI copies files into a project.

## Agent discovery

```bash
python3 .agents/skills/xizot-design-system/scripts/ui-source.py --root . discover "input"
```

Discovery uses the installer-marked `AGENTS.md` section and recognizes both `design-system/` and CRA's `src/design-system/`, including JS/JSX source. Component references are relative to the discovered source root. Rerun setup to refresh local installer-owned skills/rules; project-specific guidance belongs outside those files and the marked AGENTS section.

## 📖 Internal Docs App

This repository includes an internal docs shell under `app/components`.

The docs layout is structured as:

- 🔝 top header
- 📋 left sidebar
- 📄 center usage guide content
- 🗂️ right table of contents

Each component guide is a dedicated page, for example:

```text
app/components/button/page.tsx
app/components/input/page.tsx
app/components/select/page.tsx
```

There is no dynamic route requirement for component guides. Each page is authored explicitly.

## ✍️ Authoring a Component Guide

Use [`GUIDE_TEMPLATE.md`](./GUIDE_TEMPLATE.md) as the source template when creating a new component documentation page.

Current guide conventions:

- each component has its own page
- sections should be wrapped in `Card`
- usages should be grouped in `Tabs`
- each usage tab should include:
  - a preview
  - a matching code sample

For components with multiple important states or variants, the guide should document each one explicitly instead of showing a single generic example.

## 💻 Local Development

Run the docs app locally:

```bash
npm run dev
```

Run type-checking:

```bash
npx tsc --noEmit
```

## 🌐 GitHub Pages

This repository is configured to publish the internal docs app to GitHub Pages.

- 🔗 Repository URL: `https://github.com/xizot/ui-design-system`
- 🌍 Pages URL: `https://xizot.github.io/ui-design-system/`
- ⚙️ Workflow file: `.github/workflows/gh-pages.yml`

How it works:

- `next.config.ts` uses static export with `output: "export"`
- GitHub Actions builds the site and uploads the `out/` directory
- during the Pages build, the app is served under the repository base path `/ui-design-system`

To enable it:

1. Push this repository to GitHub.
2. Open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or run the workflow manually from the `Actions` tab.

Once deployed, the component docs will be available at:

```text
https://xizot.github.io/ui-design-system/components/
```

## 🔧 Maintaining the Design System

### ➕ Adding a new component

1. Add the source file under `components/`
2. If needed, add supporting code in `constants/`, `hooks/`, or `lib/`
3. Create or update the guide page under `app/components/<component-name>/page.tsx`
4. Commit and push

### 📦 Adding a new runtime dependency

When a new component depends on a new package, update both:

1. `package.json`
2. `bin/install.cjs` in the `runtimeDependencies` list

Without both updates, the CLI will not install that dependency for downstream consumers.

### 📂 Adding a new folder to be copied by the CLI

Update both:

1. `directoriesToCopy` inside [`bin/install.cjs`](./bin/install.cjs)
2. `files` inside [`package.json`](./package.json)

## 📝 Notes

- Copied components use relative internal imports and framework-specific consumer imports.
- Source component conflicts prompt before overwrite. Installer-owned skills/rules refresh on setup.
- The docs app is internal to this repository; installation includes the consumer skills and rules needed for downstream projects.

## Installer validation

Run `npm run test:installer` for isolated configuration/dependency tests. Run `node scripts/installer-smoke.cjs vite`, `node scripts/installer-smoke.cjs next`, or `node scripts/installer-smoke.cjs cra` for actual npm installation and production builds in a temporary directory. Add `js` to exercise JavaScript output. Smoke checks require network access and retain the fixture/build logs for inspection.
