# Conditional interaction checks

Read only the relevant row and inspect the real component source.

| Surface              | Implementation decision                                                                                                       | Verify                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Data table           | Controlled sorting/filter/page state; supply the rows in the order/page the actual DataTable contract expects; stable row IDs | Change filter on a later page; zero results; failure/retry; selection semantics across pages |
| Remote search        | Existing query layer or abort/latest-request guard; debounce alone cannot stop an in-flight response                          | Older response cannot replace the current result                                             |
| Dialog/sheet         | Use Panel sizing, body and footer contracts; form owns submit, panel owns presentation                                        | Focus entry/return, Escape/cancel, overflow, pending close policy                            |
| Destructive mutation | Name the object and consequence; use existing confirmation/undo pattern proportional to irreversibility                       | Cancellation does nothing; failure remains recoverable                                       |
| Navigation           | Links for destinations, buttons for actions; use route/URL state for shareable tabs/filters when required                     | Back/forward, refresh, current location and active filter visibility                         |
| Status/chart         | Text/icon/labels accompany color; existing semantic and chart tokens                                                          | Meaning survives without color, loading/error and labels remain readable                     |
| Motion               | Preserve established motion; custom animation must serve feedback or continuity                                               | Reduced motion and repeated/interrupted actions                                              |

Use accessible component primitives, visible labels/focus and named icon actions. Check keyboard operation and actual rendered contrast for changed colors. Permission behavior comes from the product contract; do not invent authorization rules.
