# Choose the working structure

Choose **product → page pattern → inherited/selected visual recipe → components and states**. A profile such as operations does not determine every page. An order list is not automatically an analytics overview because the user called it a dashboard.

Retrieve one pattern using the core `ui-source.py pattern <id>` command; omit the ID to list choices. Without Python, read the matching entry in [page-patterns.json](../data/page-patterns.json). Entries own their regions, default recipe, responsive decisions, omissions and acceptance checks. They are defaults, not mandatory scaffolds. Remove regions without content or purpose.

## Pattern selection

| Primary user job                                           | Pattern              |
| ---------------------------------------------------------- | -------------------- |
| Understand performance and what needs attention            | `workspace-overview` |
| Find, compare and act on records                           | `management-list`    |
| Understand or act on one entity                            | `record-detail`      |
| Create/edit structured data                                | `editor-form`        |
| Change durable preferences                                 | `settings`           |
| Process a stream while retaining list context              | `master-detail`      |
| Understand an offer and take the next step                 | `service-landing`    |
| Compare cost and commitment                                | `pricing`            |
| Discover and narrow products                               | `product-catalog`    |
| Evaluate and purchase one product                          | `product-detail`     |
| Read/find information                                      | `reading`            |
| Assess someone's selected work                             | `portfolio`          |
| Complete login, recovery, checkout or another focused flow | `focused-task`       |

If none fits, derive regions from the actual job and record the reason; do not force a profile. A hybrid website shares brand decisions while using different shells for public marketing and signed-in work.

## Workspace navigation

A multi-module dashboard/admin/SaaS workspace defaults to **left sidebar + compact context topbar + main canvas**. A single-purpose screen or app with few destinations may use top navigation. Preserve an existing shell unless the task includes changing it.

- Compose `SidebarProvider`, `Sidebar`, `SidebarInset` and the needed menu/trigger primitives from their real modules. Sidebar/header/route composition stays app-owned; internal library demos are not consumer imports.
- Place brand/workspace identity at the top, meaningful module groups in the body and account/settings at the bottom only when these features exist. Group by user work, not database tables.
- Default expanded labels support discovery. An icon rail can recover canvas space for familiar repeated work; icons still need accessible names and explanatory tooltips where appropriate.
- Active navigation reflects routes. Topbar holds app-level context; page header holds the page's identity/actions. Do not repeat the title in sidebar, breadcrumb and a second heading without purpose.
- Do not invent a workspace switcher, global search, notifications, help destination, permission or unread count.
- Mobile navigation opens on demand and returns focus correctly. Do not leave a fixed desktop sidebar squeezing the content.

### Sidebar variant decision

| Source-supported choice | Prefer for                                               | Avoid when                                         |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------------- |
| `variant="sidebar"`     | Clear navigation/work boundary; dense operational canvas | The app does not need persistent module navigation |
| `variant="inset"`       | One clear working surface inside the app frame           | Card/surface nesting already creates excess chrome |
| `variant="floating"`    | A deliberately lighter, spacious composition             | Extra margins/radii reduce useful table space      |
| `collapsible="icon"`    | Familiar modules and a need for more canvas              | Icons are ambiguous or names cannot be accessed    |

The current source also supports offcanvas/none behavior. Inspect `components/ui/sidebar` for widths, breakpoints, open-state and mobile behavior; do not build another competing collapse controller around it. Match the application's persistence requirement rather than assuming cookie writes also restore state automatically.

## Region and navigation decisions

- Overview: choose metrics from decisions and source data. A metric row is optional; charts must answer a question. Put actionable exceptions first when the user came to process work.
- Lists: give search/filter/results the working area. Advanced filters may move behind a trigger, but applied state stays discoverable. Do not add KPI or hero regions by default.
- Detail: one column for linear content; main/context around 2:1 when responsibilities differ. Label-value rows need no card per property. Use a route for long work/deep links and a sheet for quick comparison.
- Forms: default to a readable single column; pair short related fields when useful. Steps require real stages or dependencies. Save scope and navigation remain with the use case.
- Settings: group by user concepts and save lifecycle; avoid mixing implicit immediate-save and explicit Save without clear semantics.
- Master-detail: support item switching, unsaved work and return-to-list context. Fewer columns on narrow screens is better than three unusable panes.
- Reading: documentation may need left document navigation and right local TOC; short articles need neither. Do not squeeze the reading column merely to retain both sidebars.
- Marketing: top navigation, content-led vertical rhythm and a real next step. A hero does not imply a required feature grid, pricing block, FAQ or testimonial section.

## Scope of decisions

Invariant: truthful content, real contracts, accessible operation and recoverable state. Default: shell/region/density suggestions. Option: art direction, media, inset shell or expressive type. Explain meaningful departures briefly; do not turn every visual choice into a permission request.
