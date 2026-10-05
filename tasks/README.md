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

| ID | Title | Phase | Depends on | Status |
|----|-------|-------|------------|--------|
| T01 | Site config and product data foundation | 1 | none | Done |
| T02 | Catalog page with filters and sorting | 1 | T01 | Done |
| T03 | Product detail page with WhatsApp and marketplace CTAs | 1 | T01 | Done |
| T04 | Floating WhatsApp button and demo banner | 1 | T01 | Done (FloatingWhatsApp exists) |
| T05 | Homepage cleanup (dead links, placeholders, lookbook, map) | 1 | T01 | In Progress (spec: tasks/T05-homepage-cleanup.md) |
| T06 | SEO and Open Graph images | 2 | T02, T03 | Planned (file not written yet) |
| T07 | Analytics event tracking | 2 | T03, T04 | Planned (file not written yet) |
| T08 | Social section and share buttons | 2 | T03 | Planned (file not written yet) |
| T09 | Minimal Journal pages | 2 | T01 | Planned (file not written yet) |
| T10 | Case study page and services CTA | 3 | T01 to T07 | Planned (file not written yet) |
