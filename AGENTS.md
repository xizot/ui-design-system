# Xizot agent entrypoint

For Xizot code work, start at [.agents/AGENTS.md](.agents/AGENTS.md). Read its five skill entry points and [React rules](.agents/rules/react.md) before the first code change in each task. Then follow the relevant skill's routing. Read files directly if the client does not discover skills.

For shared API, installer or harness changes also read [.agents/skills/xizot-system/SKILL.md](.agents/skills/xizot-system/SKILL.md).

This is the library repository: component source is under `components/`. The current CLI installs copied source into consumer projects. Resolve imports through [source ownership](.agents/skills/xizot-design-system/references/source-ownership.md).

[React rules](.agents/rules/react.md) own implementation constraints. The core skill owns workflow; references own conditional detail. User requirements and verified source contracts take precedence over design suggestions. Preserve unrelated edits and keep documentation demos outside a change unless requested.
