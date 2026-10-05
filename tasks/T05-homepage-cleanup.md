# Task T05: Homepage Cleanup (Dead Links, Placeholders, Lookbook, Map)

## Goal
Remove everything on the site that looks broken, fake, or unfinished, so a prospective client reviewing this portfolio piece sees a clean, honest, working site.

## Requirements

1. **Dead links**: Find every `href="#"` and placeholder destination across the whole site. Journal pages do not exist yet (T09). For each one, either point it to a real destination or render it as non-interactive text/remove it. No `href="#"` may remain, and nothing may look clickable without doing something.

2. **Navigation from non-home routes**: Header and footer anchor links (`#collection`, `#story`, `#craft`, `#journal`, `#visit`) must work from any page, including `/products` and `/products/[slug]`, by linking to `"/#section"` or equivalent. "Collection" in the header and the footer collection links (Outerwear, Knitwear, Trousers, Essentials) must go to `/products`, with category links going to `/products?category=<key>`. The logo links to "/".

3. **Map and directions**: The "Get Directions" link and the embedded map currently search for "Indomaret Kemang Raya". Change both to use the store address from `lib/site-config.ts` (centralize the map query there). Do not hardcode the address elsewhere.

4. **Lookbook**: The labels skip from Look 02 to Look 04 and the list appears twice. Check whether lookbook-03 exists in public/images. Renumber labels sequentially (Look 01 to Look 05) based on the images that actually exist. If the duplicate list is an intentional marquee/loop, keep the effect but mark the duplicate set `aria-hidden` so screen readers do not read it twice; otherwise remove the duplicate.

5. **Demo honesty** (see "Content honesty rules" in docs/PRODUCT_BRIEF.md):
   - Add a slim, non-dismissible banner at the top of every page: "Demo project. This is a portfolio showcase, not a real store. Content and contact details are samples." Keep it visually quiet and consistent with the design tokens, and make sure it does not break the sticky header or the floating WhatsApp button.
   - Testimonials: add a visible "Sample reviews" label, and remove or neutralize the "Trusted by 1000+ customers" claim.
   - Review other numeric claims and certifications (partner mills, traceability, fair trade, number of artisans, repair program). Do not delete the brand copy, but put the claims in one place that is clearly marked as sample content (for example a small note in the footer or the Craft section), rather than silently presenting them as verified facts.

6. **Newsletter**: If the form has no backend, it must not pretend to subscribe anyone. Keep client-side email validation and, on submit, show a clear message such as "Demo only. No email was saved." Do not add any backend or third-party service.

7. **Contact form ("Send via WhatsApp")**: Verify it builds its link through `lib/whatsapp.ts` and includes the entered name and message. Fix if it does not.

8. **Sweep**: Search the repo for leftover placeholder text (lorem, TODO, example, "coming soon") and for any remaining hardcoded phone numbers, wa.me URLs, or marketplace URLs outside `lib/`. Fix what is in scope, and list anything else in the report.

## Out of scope
New pages (Journal, case study), SEO and Open Graph, analytics, redesign, new dependencies, backend of any kind.

## Acceptance criteria
- No `href="#"` remains anywhere; every clickable-looking element has a working destination.
- From `/products` and a product detail page, every header and footer link lands on the correct place.
- "Get Directions" and the map use the configured store address.
- Lookbook labels are sequential, with no duplicate readout for screen readers.
- The demo banner appears on all routes and does not overlap the header or floating button on mobile or desktop.
- Testimonials are labeled as sample, and the 1000+ claim is gone.
- The newsletter never claims a subscription succeeded.
- Lint and build pass with no new warnings.