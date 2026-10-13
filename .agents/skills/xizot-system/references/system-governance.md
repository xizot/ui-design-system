# Shared contract decisions

- Keep one-off page UI local; repeated domain UI belongs in a feature/app layer. Repeated product-neutral interaction may belong in Xizot.
- A new variant must describe a reusable visual/state role and preserve existing callers. Inspect actual props rather than requiring universal names across components.
- Tokens encode semantic roles. Check all supported themes when changing one. Product branding may vary at the application theme layer; do not hardcode a new palette in individual controls.
- Layout classes may position a component. Use supported component size/variant props before overriding its internals. A required new behavior needs an intentional contract, not a cast or hidden selector.
- The installer copies source and guidance. Keep runtime guidance in `.agents` so it accompanies the components; product design records belong to the application.
- Verify consumer `AGENTS.md` describes consumer ownership and preserves content outside managed markers. Package contents must include the scripts, data and references used by the skills. Keep unrelated skills/rules intact.
