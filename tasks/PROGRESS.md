# Progress Log

## State
- BASE_BRANCH: master
- LAST_DONE: T15 (static portfolio demo only, final D12)
- CURRENT: Sample-site release (2026-10-16 owner requested GitHub/Vercel publication)
- NEXT: No further performance tuning; owner explicitly waived performance targets for this sample.
- OPEN_BLOCKERS: None owner-reported. Owner confirms photos are public/free to use; license provenance not independently verified.
- OWNER_ACTIONS:
  1. Provide a business WhatsApp number via NEXT_PUBLIC_WHATSAPP_NUMBER when available.
  2. Provide studio contact details via env vars (needed by T10).
  3. Replace the placeholder social and marketplace handles in lib/site-config.ts with your own, since they may belong to unrelated real accounts.
  4. Review sample content before any public sharing.

---

## T12: UI fixes: collection images, hero, and header
- **Status**: Done
- **Branch**: master
- **Task commit**: 2e1ff88 (merged via be5540b)
- **Started**: 2026-10-08 13:18
- **Finished**: 2026-10-09
- **Summary**: Fixed collection images not showing by correcting Tailwind aspect ratio syntax from `aspect-[4_5]` to `aspect-[4/5]` in ProductCard component. All 8 collection images now display correctly with proper 4:5 aspect ratio, object-cover, tokenized placeholder background, and alt text "{name}, {material}". Verified build succeeds with 0 lint errors and 0 TypeScript errors.
- **Criteria**: All 8 cards show their photo with consistent aspect ratio (4:5), object-cover, tokenized placeholder background to prevent layout shift, and alt text "{name}, {material}". Re-checked detail page and homepage collection grid. All product image URLs return 200.
- **Lint / Build**: Historical report: 0 errors, 4 warnings. Current checkout requires fresh verification.
- **Assumptions**: Commit 2e1ff88 is authoritative T12 work; owner must merge it into master before T13 acceptance.
- **Out-of-scope findings**: Missing Journal routes, stale task inventory, missing root icon/manifest assets, and missing placeholder fallback recorded for T13/T06/T14.
- **Blockers**: None.
- **Owner actions**: (listed in State block)
- **Checkpoints**: started, fixed image display issue

## T15: Product detail page v2
- **Status**: Done for static portfolio demo only, 2026-10-14 final D12 approval. Prior review blockers below are historical; public-release provenance/replacement limitation remains, and multi-image behavior is deferred until lawful assets exist.
- **Final policy verification (Master, 2026-10-14)**: Added visible sample imagery/fictional content notice; sample size label and shipping terms; removed marketplace availability trust claim and fictional Product JSON-LD offers/InStock. Existing Editorial Look names and Visual reference material data retained. No downloads, added photography 0 bytes.
- **Fresh checks**: `npx tsc --noEmit`, `npm run lint`, `npm run build`, `git diff --check` exit 0. Lint retains four existing warnings (FabricLibrary 2, Lookbook 1, SmartImage 1); build generated 27 pages. Playwright installed Chrome against port 3020 verified served BUILD_ID `kEDs3q7YsQ0VL7zPHo7zk`.
- **Fresh browser evidence**: Product flow passed at 390x844, 768x844, 1366x768, 1920x1080: lightbox keyboard/focus/scroll lock, hidden single-image controls, WhatsApp with/without size, five store links, related/adjacent navigation, visit date/time validation, accordions, footer clearance, rendered/raw image HTTP 200, unknown slug 404. Home → Collection → product passed at 390x768 and 1366x768; demo notice visible and JSON-LD offers absent. No console/page errors or unexpected HTTP failures; screenshots inspected at 390 and 1366.
- **Evidence**: `C:/Users/fatih.achmad/AppData/Local/Temp/opencode/d12-{tsc,lint,build,browser,home}.txt`, `d12-check.cjs`, `d12-home.cjs`, `d12-top-{390,1366}.png`, `d12-t15-{390,768,1366,1920}.png`.
- **Check failures resolved**: Initial auxiliary PowerShell quoting error before browser run; home test initially selected hidden mobile nav, corrected selector to visible existing Collection link. Nested Sarjana delegation unavailable at session depth limit; Master made explicitly assigned small fixes. No runtime defect found.
- **Release limits / next**: Source/author/license unknown for eight existing photos; no licensed-photography claim. Owner must supply lawful matching replacements/evidence before public use. Real multi-image arrows/thumbnails/counter/swipe remain unverified, not accepted. Next approved task T14 planning handoff only; no broad implementation. T06 remains In Progress.
- **Historical review evidence (superseded acceptance decision)**:
- **Verified by**: Master, 2026-10-13; direct checkout/diff inspection and installed Chrome via Playwright, not worker reports.
- **Fixes during review**: ProductGallery explicitly wraps Tab/Shift+Tab (native dialog let focus leave its element with one control); playwright-test.js uses dynamic imports to remove two lint errors; removed five unsupported 100% material claims from product details.
- **Checks**: `npx tsc --noEmit` exit 0; `npm run lint` exit 0, four existing warnings (FabricLibrary 2, Lookbook 1, SmartImage 1); `npm run build` exit 0, 27 static pages. Fresh production server on port 3016 matched `.next/BUILD_ID` `4ZQNZ3REgwUWKeKMwoeNX` in served HTML.
- **Browser evidence**: Passed 390x844, 768x844, 1366x768, 1920x1080: lightbox click/Enter/Escape/Tab/Shift+Tab/focus restore/scroll lock; single-image controls intentionally absent; size M and no-size WhatsApp payloads; five marketplace links with target/rel; related four excluding current and category priority; first Previous and last Next wrapping; accordions; VisitDialog accessible labels, empty-invalid then valid submission, Sunday/weekday slots, Jakarta min 2026-10-13/max 2026-12-12, native rejection outside bounds, booking message; sticky bar/footer link clearance and desktop floating button. Eight raw product image URLs and rendered image requests returned 200; unknown slug 404. No console/page errors or unexpected HTTP failures.
- **UI audit**: Screenshots inspected at 390 and 1366 (top, full page, visit dialog); spacing/typography/buttons/focus/nav/footer usable, no horizontal overflow at all four sizes. Existing demo photography visibly does not match several garment names; not replaced with invented photos/credits.
- **Evidence paths**: `C:/Users/fatih.achmad/AppData/Local/Temp/opencode/t15-master.cjs`, `t15-master-extra.cjs`, `t15-master-proof.txt`, `master-t15-{390,768,1366,1920}.png`, `master-top-{390,1366}.png`, `master-dialog-{390,1366}.png`.
- **Limitations / next task**: All eight products still have one existing image; added photography size 0 bytes; `docs/IMAGE_CREDITS.md` records unknown provenance and no source/license claim. D12 documents single-image fallback; IMAGES_NEEDED.md records missing consistent shots. Temporary multi-image fixture verification was attempted but local fixture server did not start, so arrows/thumbnails/counter/swipe remain unverified with two images. Related cards now reuse `ProductCard`. Owner must provide lawful matching photos and provenance before public use; T15 remains In Review, not accepted. Do not start T14 until decision.
- **2026-10-14 follow-up**: `lib/products.ts` now uses `{src,alt}[]` for all eight existing images; fictional names/material descriptions changed to generic editorial references, no new photos/credits added. Direct official Unsplash/Pexels fetch was reported HTTP 401; no source/license URLs verified. Local image dimensions/bytes checked: eight files, 800px max width, 25,072–151,056 bytes each. `npx tsc --noEmit` exit 0; `npm run lint` exit 0 with four existing warnings; `npm run build` exit 0. Fresh Playwright Chrome check: all eight raw images HTTP 200; visible main/related optimized requests HTTP 200 and decoded at 390x844 and 1366x768. First attempts failed because no old port-3016 server was running and because hidden lightbox/lazy images were included; visible-image check passed after scoping correctly. Evidence: `C:/Users/fatih.achmad/AppData/Local/Temp/opencode/t15-followup-browser.txt` and `t15-followup-visible.txt`. Wikimedia category API returned explicit license/author metadata, but candidates were not visually matched/downloaded; no replacement asset verified. Existing files remain unlicensed until owner proof arrives.

## T13: Journal: list page, three articles, homepage links
- **Status**: Done
- **Branch**: master working tree (T13 changes uncommitted)
- **Task commit**: pending
- **Started**: 2026-10-09
- **Finished**: 2026-10-12
- **Summary**: Added data-driven Journal list and static article routes, homepage Journal links, metadata, and sitemap entries.
- **Criteria**: PASS — three articles, 605/698/689 words; routes and unknown-slug 404 verified. PASS — shared navbar/footer, local images, computed read times, 2026 dates, collection CTA. PASS — lint/build/browser checks below.
- **Lint / Build**: lint 0 errors/4 existing warnings; build exit 0.
- **Assumptions**: T12 commit 2e1ff88 already merged in be5540b.
- **Out-of-scope findings**: Existing homepage horizontal overflow at 390px was traced to BrandStory's horizontal entrance transform; follow-up fix changed only that animation axis. Full T14 remains planned.
- **Blockers**: None.
- **Owner actions**: Listed in State block.
- **Checkpoints**: implementation and final verification complete.

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