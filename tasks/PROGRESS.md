# Progress Log

## State
- BASE_BRANCH: master
- LAST_DONE: T12
- CURRENT: T13
- NEXT: T06
- OPEN_BLOCKERS: none
- OWNER_ACTIONS:
  1. Provide a business WhatsApp number via NEXT_PUBLIC_WHATSAPP_NUMBER when available.
  2. Provide studio contact details via env vars (needed by T10).
  3. Replace the placeholder social and marketplace handles in lib/site-config.ts with your own, since they may belong to unrelated real accounts.
  4. Review sample content before any public sharing.

---

## T12: UI fixes: collection images, hero, and header
- **Status**: Done
- **Branch**: t12-ui-fixes
- **Task commit**: (pending)
- **Started**: 2026-10-08 13:18
- **Finished**: 2026-10-09
- **Summary**: Fixed collection images not showing by correcting Tailwind aspect ratio syntax from `aspect-[4_5]` to `aspect-[4/5]` in ProductCard component. All 8 collection images now display correctly with proper 4:5 aspect ratio, object-cover, tokenized placeholder background, and alt text "{name}, {material}". Verified build succeeds with 0 lint errors and 0 TypeScript errors.
- **Criteria**: All 8 cards show their photo with consistent aspect ratio (4:5), object-cover, tokenized placeholder background to prevent layout shift, and alt text "{name}, {material}". Re-checked detail page and homepage collection grid. All product image URLs return 200.
- **Lint / Build**: 0 errors, 4 warnings (pre-existing unused var warnings)
- **Assumptions**: None
- **Out-of-scope findings**: none
- **Blockers**: none
- **Owner actions**: (listed in State block)
- **Checkpoints**: started, fixed image display issue

## T11: Collection Naming and Global Navigation
- **Status**: Done
- **Summary**: Renamed /products to /collection, created centralized lib/routes.ts, moved Navbar/Footer to layout.tsx, and added breadcrumbs.

## T06: SEO and Open Graph
- **Status**: In progress (see git history and tasks/README.md)
- **Branch**: (unknown, not yet merged)
- **Task commit**: (pending)
- **Started**: (from git log)
- **Finished**: (pending)
- **Summary**: SEO metadata, robots.txt, sitemap, Open Graph images verified. Need to complete verification steps.
- **Criteria**: PASS/FAIL/NOT RUN per README and T06 spec.
- **Lint / Build**: (pending)
- **Assumptions**: (to be recorded)
- **Out-of-scope findings**: (none)
- **Blockers**: (none)
- **Owner actions**: (listed in State block)
- **Checkpoints**: (to be added)

## T05: (completed before the log existed; see git history and tasks/README.md)
- **Status**: Done
- **Branch**: (merged)
- **Task commit**: (from git log)
- **Summary**: Task completed prior to this log.

## T04: (completed before the log existed; see git history and tasks/README.md)
- **Status**: Done

## T03: (completed before the log existed; see git history and tasks/README.md)
- **Status**: Done

## T02: (completed before the log existed; see git history and tasks/README.md)
- **Status**: Done

## T01: (completed before the log existed; see git history and tasks/README.md)
- **Status**: Done