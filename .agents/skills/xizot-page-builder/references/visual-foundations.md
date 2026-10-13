# Establish a coherent visual direction

Read for a new visual direction, theme, typography or density decision. For a page added to an existing app, inherit its design record and actual styles first; do not run a redesign just to use this reference.

Retrieve `ui-source.py recipe <id>` for `workbench`, `calm-business`, `editorial`, `product-led` or `technical`. Without Python, read the selected entry in [visual-recipes.json](../data/visual-recipes.json). The entry owns its numeric starting ranges and visual intent. Those ranges are not universal rules or permission to rewrite shared tokens.

## Philosophy expressed as decisions

Design around the user's work. Establish reading order, grouped information and action priority before decoration. Choose density per surface: a marketing page and its operational console may share a brand while needing different spacing and typography. Keep one consistent visual grammar across related pages; a real exception needs a task/content reason.

Use spacing and alignment to group continuous content. A Card represents an independent unit or surface; it is not the default wrapper for every section. Border divides; shadow conveys elevation. Avoid adding border, strong shadow, tinted fill and rounded corners to every nested region.

## Color roles

| Role                       | Use                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------- |
| Canvas and surfaces        | Establish background and working/overlay layers without competing with content      |
| Primary and secondary text | Readable content hierarchy, including helper/metadata text                          |
| Brand/action               | Main actions, links or selection according to the app's pattern                     |
| Status                     | Success/warning/error/info only when meaning warrants it; pair color with text/icon |
| Focus                      | Clearly visible keyboard location on each surface                                   |
| Data series                | Stable distinctions for data, separate from good/bad status semantics               |

1. Inherit brand and palette when present. Otherwise choose a recipe and one main accent family, then a compatible neutral family. Industry stereotypes are not evidence for a color.
2. Map roles to actual CSS tokens. Define palette values at the theme owner, not separately in each page/control.
3. Pair foreground/background for default, hover, selected, focus and invalid states. Do not assume opacity variants preserve contrast.
4. Design supported dark roles intentionally; do not invert colors or assume every technical tool is dark-only.
5. Render chosen roles on real Button, Input, Badge, Card, DataTable, panels and chart surfaces as applicable. Measure contrast after alpha compositing.

Text contrast targets are 4.5:1 for normal text and 3:1 for qualifying large text, with the standard's exceptions. Do not round a failing value up. See [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Essential control/graphic distinctions have separate requirements; decorative borders do not all need the same threshold. See [non-text contrast](https://www.w3.org/WAI/WCAG22/understanding/non-text-contrast.html).

**Current Xizot caveat:** Badge success/warning/info use explicit color classes, not a complete shared semantic-status token family. A new page must use supported component contracts. A change to shared status/theme behavior belongs to `xizot-system`; do not pretend an absent CSS variable already works. Library preset demos are not automatically shipped/validated consumer palettes.

## Typography roles and font choice

- Preserve an existing working font. An unbranded app can begin with a tested system sans. Inter/Geist already appear in the library website, but their loader configuration is not automatically present in consumers.
- Choose fonts for language coverage, readability, tone, needed weights, loading cost and fallback. A second family needs a separate role such as editorial headings or code. Do not load multiple families solely because they appear in an example.
- Possible editorial/technical candidates are [Source Serif](https://github.com/adobe-fonts/source-serif) and [IBM Plex](https://github.com/IBM/plex). These are candidates to evaluate, not required dependencies or a claim that any specific font file covers the app's language.
- Define body, page title, section title, label, metadata, data value and code roles. Semantic heading levels follow document structure, independently of font size.
- Map role sizes to actual computed CSS, not assumed utility defaults. Current library CSS overrides `text-lg` and `text-xl`; do not infer their rendered size from Tailwind familiarity.
- Use tabular numerals for comparable numeric columns when supported. Align numeric values for scanning; reserve mono for code/IDs that benefit from it.
- Check Vietnamese diacritics, long names/addresses, mixed-language strings and ambiguous ID characters. Avoid excessive uppercase/tracking in prose.
- Test fallback and final font load: no missing glyphs, clipped diacritics, unusable wrapping or disruptive layout shift. Verify the actual loaded subset/weights.

Article measure around 60–75ch and readable line-height are starting points, not a universal width cap on every page. Tables can use the canvas; forms should not stretch short fields across a wide screen.

## Density, geometry and responsive behavior

- Compact: repeated data work. Comfortable: forms/settings/mixed work. Spacious: content/brand-led sections. Choose per surface and use existing size props before internal overrides.
- The gap between groups should exceed the gap within a group. Keep label, control and helper/error visually related.
- Choose a consistent control/card/overlay radius relationship. Pill is a role, not a rule for every input. Shared changes require caller review.
- Derive columns from content width: main/context can start at 2:1; product grids need usable card widths; prose needs a reading measure.
- Stack by task/reading priority. Wrap toolbars; keep wide table/code overflow local. Do not replace a comparison table with mobile cards if it defeats the task.
- Sticky navigation/actions must earn their space. Check cumulative sticky height, focus visibility and mobile keyboard access. Each nested scroll region needs a reason and a usable keyboard path.

Check real layout transitions plus narrow/wide viewports. Reflow at the equivalent of 320 CSS px has specific exceptions for content requiring two-dimensional layout; that is not permission for page-wide overflow. See [WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

For pointer targets, consider size and spacing together. WCAG 2.5.8 specifies 24 by 24 CSS px with exceptions; primary touch controls often benefit from a larger starting hit area around 40–44px. Do not shrink targets merely to fit a density. See [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## Icons, imagery, charts and motion

- Reuse the app's icon set, size and stroke logic; icon-only actions need names. Remove repeated icons that add no recognition or meaning.
- Real product/work media can establish identity. Use stable aspect ratios, meaningful crops and alternatives. Avoid stock decoration in operational work areas.
- Choose charts by question: line for time trend, bar for category comparison, stacked bar for composition; donut only when few parts remain legible. A lookup task may need a table instead.
- Supply units, periods and readable series names. Missing data is not zero; increase is not automatically good. Tooltip must not be the only path to essential information.
- Preserve component motion. Custom motion must communicate feedback/state/continuity; respect reduced motion and interrupted/repeated actions. Do not delay task access or animate every operational row.
