# T14 performance and accessibility evidence

Status: closed by owner scope reduction, 2026-10-16. Performance targets waived for this sample; no further optimization requested. Do not claim targets achieved.

Release checks: `npm run lint` and `npm run build` passed (27 static pages). Production smoke checks on port 3024: homepage at 390x844 and Collection/detail/Journal/article at 1366x768; one h1 and no horizontal overflow. Default noindex restored. Independent code-review agent unavailable (provider overload). Owner confirms photos free to use; no independent licensing verification.

An already-running Lighthouse 13.5.0 current-state audit completed for five routes on port 3022 with indexing enabled. Reports remain local under `C:/Users/fatih.achmad/AppData/Local/Temp/opencode/t14-before-{0..4}.json`. These are not a pre-change baseline; no after comparison performed. Historical pending checklist below is superseded by owner scope reduction.

## Measurement protocol

- Routes: `/`, `/collection`, `/collection/essential-crew-neck`, `/journal`, `/journal/the-art-of-merino-a-journey-to-tasmania`.
- Baseline and after: production build with `NEXT_PUBLIC_ALLOW_INDEXING=true` and mobile Lighthouse against a production server. Record date, exact build/server/Lighthouse commands, Chrome version, Lighthouse version, localhost port, per-route report files, Performance / Accessibility / Best Practices scores and reasons for targets missed (90 / 95 / 95). Default indexing must be restored and verified afterward. No Lighthouse installer or scores assumed.
- Record build output route-size lines before and after from saved output, not estimates. Note build ID and mode so snapshots are comparable.

| Check | Before | After |
| --- | --- | --- |
| Build/date/command/indexing | NOT RUN — no saved comparable pre-change build in this document | NOT RUN — await Package A integration |
| Lighthouse/date/command/Chrome | NOT RUN — no measured baseline | NOT RUN |
| `/` P/A/BP | NOT RUN | NOT RUN |
| `/collection` P/A/BP | NOT RUN | NOT RUN |
| `/collection/essential-crew-neck` P/A/BP | NOT RUN | NOT RUN |
| `/journal` P/A/BP | NOT RUN | NOT RUN |
| `/journal/the-art-of-merino-a-journey-to-tasmania` P/A/BP | NOT RUN | NOT RUN |
| Five route sizes | NOT RECORDED | NOT RECORDED |
| Images bytes and oversized files | Historical pre-compression inventory in unverified `T14-baseline-report.md`; not a measured comparable snapshot here | 2026-10-14 inspection, while Package A pending: 27 files under `public/images`, 13,124,382 bytes including `collection-01.jpg.backup` (6,716,662 bytes). Also over 400KB: `8624035.png` (3,578,437 bytes). Recheck after integration and decide how to account for backup separately. |

## Scoped accessibility and stability inspection (source only, 2026-10-14)

- `app/layout.tsx:79` has skip link targeting `#main-content`; all five required route types expose `<main id="main-content">` (`app/page.tsx:45`, `app/collection/page.tsx:30`, `app/collection/[slug]/ProductDetailClient.tsx:75`, `app/journal/page.tsx:21`, `app/journal/[slug]/page.tsx:52`). Keyboard landing and focus visibility still need browser verification.
- `app/layout.tsx:11-22` uses `next/font/google` with `display: "swap"`; `components/DemoBanner.tsx:6` reserves a fixed 48px mobile / 32px desktop overlay height and `components/Navbar.tsx:36` starts below it. Browser CLS still unmeasured, including responsive wrapping and initial navigation animation.
- `app/globals.css:246-250` attempts to disable CSS animation and transitions for reduced motion, but `components/Hero.tsx:76-82` repeats a Motion transform and `components/Testimonials.tsx:33-38` auto-rotates every six seconds; neither explicitly checks reduced-motion preference. `components/ProductGallery.tsx:18-22` requests smooth scroll even under reduced motion (only relevant once multiple lawful photos exist). Verify actual computed motion and keyboard interaction at reduced-motion setting before claiming compliance.
- `components/Testimonials.tsx:108-120` renders carousel dot buttons without accessible names or active-state indication. Source finding; browser accessibility check pending. Avoid unrelated redesign.
- `components/Navbar.tsx:32-39` animates fixed navigation from `y: -100`; examine skip-link and focus target visibility at 390x844 and 1366x768 after hydration.

## Integration checks pending

1. After Package A completes, inspect its diff; re-inventory image references and bytes, search remaining `<img>` and hook warnings. Do not edit its owned files concurrently.
2. Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, `git diff --check` serially; save actual output and route-size evidence.
3. Production Playwright: five routes at 390x844 and 1366x768; reduced motion, keyboard skip link and controls, focus visibility, headings/landmarks, images/CLS, contrast, console/network errors. Browser findings determine smallest fixes.
4. If permitted and Chrome/Lighthouse available without installing dependencies, run exact production mobile Lighthouse before/after protocol above. If not, keep NOT RUN with concrete reason. Do not represent post-compression state as a pre-compression baseline.
