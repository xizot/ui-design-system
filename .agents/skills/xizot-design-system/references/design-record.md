# Application design decisions

Keep product decisions outside installer-owned `.agents` and copied `design-system/` source. Read `design/MASTER.md` then a matching `design/pages/<route>.md`. A page exception overrides only the named visual/layout decision, never user requirements, API contracts or accessibility needs.

Use this compact structure when a record is warranted:

```markdown
# Product design

- Audience and primary task:
- Profile and page pattern per surface, with rationale:
- Framework and source/import root:
- Inherited brand/theme or chosen recipe, with actual token mapping:
- Typography roles, actual font loading/fallback, density and content language:
- Shell/navigation, ordered regions and action priority:
- Components: source paths and relevant API constraints:
- Narrow/wide layout behavior:
- Data/form ownership and reachable states:
- Regions/controls omitted because they do not serve the task:
- Acceptance checks:
- Unresolved product decisions:
```

Record intentional choices, not a transcript or generated recommendations that have not been checked. Update an existing decision only within the requested scope. A page override lists differences and rationale rather than duplicating the master.

State evidence separately: source reviewed, rendered viewports/themes, interactions observed, and remaining unverified behavior. A selected recipe does not mean its palette or fonts have been tested in this application.
