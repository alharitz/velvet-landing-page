# T12: UI fixes: collection images, hero, and header

## Goal
Fix the broken collection images and polish the hero and header so the first impression is clean and elegant.

## Design guidance
Use the frontend-design / UI-UX skill if available. Keep the existing design tokens and serif/sans pairing. Verify at 390x844, 768, 1366x768, 1440x900, and 1920x1080.

## Requirements
1. Collection images (bug). On /collection the product cards show no photos. Find the ROOT CAUSE before changing code: build and run the production build, inspect the rendered HTML and image requests, and compare the image paths in lib/products.ts against public/images, the imageRegistry, and SmartImage. Fix at the source, not by patching individual cards, and state the root cause in one or two sentences in the report. All 8 cards must show their photo with a consistent aspect ratio (for example 4:5), object-cover, a tokenized placeholder background to prevent layout shift, and alt text "{name}, {material}". Re-check the detail page and the homepage collection grid. Prove every product image URL returns 200 (script or curl) and quote the result.
2. Hero headline. Replace "Minimalist Luxury" with "Made to Be Kept". Keep the "SS26 Collection" eyebrow. Subtext: "Merino, linen and cashmere essentials, cut with care and built to last." Put the hero copy in one place (a hero object in lib/site-config.ts). Search the whole repo (metadata titles, og:title, JSON-LD, OG image text if present, README) for "Minimalist Luxury" and replace it consistently, for example with "VELVET | Made to Be Kept" in titles.
3. Hero layout. The eyebrow and headline must be fully visible below the banner and header on short laptop viewports (1366x768, 1440x900), not clipped or hidden under the header. Size the hero from the visible viewport (svh minus banner and header height), keep safe padding, and clamp the headline to at most two lines at every tested width.
4. Hero CTAs. "Explore Collection" is the primary: a solid filled button with visible background and at least 4.5:1 text contrast, linking to /collection. "Our Story" is the secondary: an outlined button, readable on the photo. Add a subtle gradient overlay behind the text if needed for contrast.
5. Header. Remove the standalone WhatsApp icon-only button next to "Where to Buy" (desktop and mobile menu). Keep the "Where to Buy" button and the floating WhatsApp button. Rebalance the header spacing afterwards.
6. Floating WhatsApp button must not cover content on mobile: respect the safe-area inset, and give the footer enough bottom padding that its last links stay tappable at 390px.

## Out of scope
Journal pages, routes or naming (T11), analytics, a full performance pass (T14), new dependencies.

## Acceptance criteria
- All 8 cards on /collection show their photos; image URLs verified as 200; root cause stated.
- Detail page and homepage images are still correct.
- "Minimalist Luxury" no longer appears anywhere (grep evidence).
- Eyebrow, headline, and subtext are fully visible at 1366x768, 1440x900, 1920x1080, and 390x844 (or state clearly that visual verification was not possible).
- The primary CTA has a visible background and at least 4.5:1 contrast; the secondary is outlined.
- The header has no standalone WhatsApp icon and looks balanced.
- The floating button does not obstruct content or footer links at 390px.
- Lint and build pass with no new warnings.
