# T14: Performance and accessibility pass

## Handoff — 2026-10-14
- Next approved task after T15 static-demo acceptance; planning only, implementation not started.
- First scoped task: production baseline Lighthouse/accessibility measurements for five required routes; record exact commands, indexing setting, scores, bytes, and build evidence before selecting fixes.
- Existing four lint warnings are baseline candidates, not fixed during T15. Preserve D12 demo labels and provenance limitations.
- Historical dependency cycle in task index does not imply T06/T07/T08/T10 completion; approval permits this T14 handoff only.

## Goal
Make the site fast and clean enough that its scores can be quoted in the case study.

## Requirements
1. Baseline: run Lighthouse with npx lighthouse (no dependency added; it needs Chrome, and if Chrome is unavailable mark NOT RUN and say so) against the production build, mobile emulation, for /, /collection, one /collection/<slug>, /journal, and one /journal/<slug>. Measure with NEXT_PUBLIC_ALLOW_INDEXING=true (noindex fails the SEO audit), then restore the default. Record the scores in docs/PERFORMANCE.md (before), with the exact command and date.
2. Replace every <img> with next/image (FabricLibrary, Lookbook, SmartImage, and any others found by search): width and height or fill plus sizes, priority only for the LCP image of each page, lazy elsewhere. Fix the SmartImage hook-dependency warning properly, without disabling the rule.
3. Fonts through next/font with display swap, only the used weights and subsets.
4. Images: list files in public/images above 400KB, then compress or downscale them (longest edge at most 1920px, quality about 80) with tooling already available. Read scripts/sync-images.mjs first and do not break the predev script. Do not remove any file referenced in code. Report total bytes before and after.
5. No layout shift from images, fonts, or the demo banner. Respect prefers-reduced-motion for marquee and animations.
6. Accessibility across the five page types: contrast, visible focus, labels, landmarks, heading order, alt text. Fix what is wrong and list what remains.
7. Report next build route sizes before and after. Remove "use client" only where it is clearly safe.
8. After: re-run Lighthouse and record the scores (after) in docs/PERFORMANCE.md.
Targets for the five pages on mobile: Performance at least 90, Accessibility at least 95, Best Practices at least 95. If a target is missed, document why.

## Out of scope
Redesign, new pages, new dependencies, hosting or CDN configuration.

## Acceptance criteria
- No <img> remains except documented exceptions; the no-img-element and SmartImage warnings are gone.
- Scores before and after are recorded (or marked NOT RUN with the reason).
- Image bytes before and after are reported; nothing referenced in code was removed.
- Lint and build pass; the default indexing mode is restored.