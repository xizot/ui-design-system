# Shared contract decisions

- Keep one-off page UI local; repeated domain UI belongs in a feature/app layer. Repeated product-neutral interaction may belong in Xizot.
- A new variant must describe a reusable visual/state role and preserve existing callers. Inspect actual props rather than requiring universal names across components.
- Tokens encode semantic roles. Check all supported themes when changing one. Product branding may vary at the application theme layer; do not hardcode a new palette in individual controls.
- Layout classes may position a component. Use supported component size/variant props before overriding its internals. A required new behavior needs an intentional contract, not a cast or hidden selector.
- The current installer copies source and guidance; check its code before describing installation modes. Keep guidance in `.agents` so it ships with consumers.
- Verify refresh preserves consumer `AGENTS.md` outside markers and unrelated skills/rules. Keep modified retired guidance with a warning. Package contents must include scripts, data and references used by the skill.
