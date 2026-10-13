# Website profiles

Run `python .agents/skills/xizot-design-system/scripts/ui-source.py profile <name>` to retrieve only the relevant structure and checks. Requires Python 3.10+ and standard library only. If Python is unavailable, read the matching entry in [website-profiles.json](../data/website-profiles.json).

| Profile    | Choose for                                                   |
| ---------- | ------------------------------------------------------------ |
| operations | Admin, dashboards, repeat-use SaaS workflows, internal tools |
| marketing  | Landing, pricing, campaigns, service-business acquisition    |
| commerce   | Product discovery, product details, cart, checkout           |
| content    | Documentation, help, editorial, learning                     |
| portfolio  | Personal/studio identity and selected work                   |

Profiles are starting points, not mandatory section templates. Remove irrelevant regions and use user content. Hybrid websites select a profile per surface and share the same brand/theme. Other product types should be derived from audience and task, not forced into operations.

Preserve existing tokens and font choices for ordinary page additions. For a requested new visual direction, define brand roles at the application theme layer, verify supported light/dark behavior and map controls to those roles. A marketing headline can be expressive; a dense data table needs different type and spacing. Do not enforce one density on every website.
