# Application design decisions

Keep product decisions outside installer-owned `.agents` and copied `design-system/` source. Read `design/MASTER.md` then a matching `design/pages/<route>.md`. A page exception overrides only the named visual/layout decision, never user requirements, API contracts or accessibility needs.

Use this compact structure when a record is warranted:

```markdown
# Product design

- Audience and primary task:
- Profile per surface:
- Framework and source/import root:
- Brand/theme and existing token mapping:
- Typography, density and content language:
- Navigation and repeated page structure:
- Components: source paths and relevant API constraints:
- Narrow/wide layout behavior:
- Data/form ownership and reachable states:
- Acceptance checks:
- Unresolved product decisions:
```

Record intentional choices, not a transcript or generated recommendations that have not been checked. Update an existing decision only within the requested scope. A page override lists differences and rationale rather than duplicating the master.
