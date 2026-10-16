# Tasks

## How to work
- One task per session, in order. Do not start a task whose dependencies are not done.
- Read docs/PRODUCT_BRIEF.md and the task file before changing anything.
- Stay within the task's scope. Record out-of-scope findings in the report instead of fixing them.
- Follow existing conventions. Ask before adding dependencies.
- Run lint and build before reporting.
- Final report must contain: files changed, what was done, lint/build results, unfinished items, and decisions needed from the owner.
- After finishing, update the Status column below for that task.

## Task index

> Route rename: from T11 onward the browse routes are /collection and /collection/[slug]. Task files T01 to T05 still say /products; leave them as historical records.


| ID | Title | Phase | Depends on | Status |
|----|-------|-------|------------|--------|
| T01 | Site config and product data foundation | 1 | none | Done |
| T02 | Catalog page with filters and sorting | 1 | T01 | Done |
| T03 | Product detail page with WhatsApp and marketplace CTAs | 1 | T01 | Done |
| T04 | Floating WhatsApp button and demo banner | 1 | T01 | Done (FloatingWhatsApp + DemoBanner implemented) |
| T05 | Homepage cleanup (dead links, placeholders, lookbook, map) | 1 | T01 | Done (spec: tasks/T05-homepage-cleanup.md) |
| T06 | SEO and Open Graph images | 2 | T02, T03, T11, T13 | In Progress (spec: tasks/T06-seo-and-open-graph.md) |
| T07 | Analytics event tracking | 2 | T03, T04, T11 | Planned (spec: tasks/T07-analytics-events.md) |
| T08 | Social section and share buttons | 2 | T03 | Planned (spec: tasks/T08-social-and-share.md) |
| T09 | Minimal Journal pages | n/a | n/a | Superseded by T13 |
| T10 | Case study page and services CTA | 3 | T01 to T07, T11 to T14 | Planned (spec: tasks/T10-case-study.md) |
| T11 | Collection naming, global navigation, and breadcrumbs | 1 | T01 to T05 | Done |
| T12 | UI fixes: collection images, hero, header | 1 | T11 | Done (merged in master) |
| T13 | Journal: list page, three articles, homepage links | 1 | T11, T12 | Done |
| T14 | Performance and accessibility pass | 2 | T06, T07, T08, T10, T13, T15 | Closed by owner scope reduction (2026-10-16): basic image/accessibility fixes shipped; performance targets waived, not claimed achieved |
| T15 | Product detail page v2 (gallery, actions, visit request, related pieces) | 1 | T11, T12 | Done — static portfolio demo only (D12; provenance/replacement release limitation) |

Next approved handoff (2026-10-14): T14 performance/accessibility planning after T15 static-demo acceptance. Owner approval overrides historical run order/dependency cycle for this handoff only; T06, T07, T08, and T10 are not thereby marked Done. No broad T14 work was implemented during T15 closure.

T06 is NOT Done; T06 must target /collection, /collection/[slug], /journal and /journal/[slug], and run after T13.
