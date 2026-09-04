# Document Command

Use only when the user asks to document usage, create frontend skills, write agent rules, or update guide/docs surfaces.

## Skill And Agent Docs

When documenting for AI agents:

- Put stable, reusable rules in skill references.
- Put downstream always-on rules in `references/agent-rules.md`, which the installer injects into `AGENTS.md`.
- Keep component API guidance grounded in actual source files.
- Avoid huge copied examples unless they clarify a non-obvious pattern.
- Prefer routing references so agents load only what they need.

## Human Guide Pages

Guide pages under `app/components/...` are documentation surfaces, not required side effects of building skills. Refactor or expand them only when the user asks for guide work.

When guide work is requested later:

- show real variants and states
- include preview plus matching code
- keep examples importable by consumer projects
- document edge states and RHF usage where relevant
