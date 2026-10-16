# VELVET Landing Page: Product Brief

## Purpose
A portfolio project that demonstrates my ability to build a fast, polished, mobile-first catalog website for small brands. The fictional brand is VELVET, a minimalist fashion label based in Jakarta.

## Audience
- Primary: prospective web development clients (small brands and local businesses) and recruiters.
- Secondary: fictional shoppers, for the purpose of a realistic demo experience.

## Product model
- No cart, checkout, payments, or accounts.
- Flow: browse catalog, open product detail, then contact via WhatsApp, open the product on a marketplace, or visit the store.
- Success signals (once analytics exists): WhatsApp clicks, marketplace clicks, directions clicks, newsletter signups.

## Decisions
- D7 (decided): Terminology. "Collection" is the only user‑facing name for the area that lists all pieces (nav label, page title, H1, breadcrumbs, footer links, CTAs). "Journal" is the only name for the blog (nav label, titles, routes /journal and /journal/[slug]). The words "catalog", "products" (as a section name), "shop", "blog", and "stories" must not be used as section names in the UI. Counts use "pieces" (for example "8 pieces"). Code identifiers such as the Product type and lib/products.ts keep their names.
- D2 (decided): The WhatsApp number and other contact details are centralized in lib/site-config.ts. The number is read from the env variable NEXT_PUBLIC_WHATSAPP_NUMBER, with a clearly marked placeholder fallback. No business number exists yet.
- D3 (decided): Superseded by D7: routes are /collection and /collection/[slug]; /products redirects permanently.
- D4 (proposed, confirm with owner): Site copy is in English. Prefilled WhatsApp messages are in Indonesian.
- D5 (open): Source of product photography. Check IMAGES_NEEDED.md before any task that depends on new images.
- D10 (decided): The product page is e‑commerce style but has no cart or checkout. Visitor actions are: order via WhatsApp (prefilled with product, price, and optional size), visit a marketplace store, or request a store visit via WhatsApp (no booking backend). Marketplace buttons link to store pages unless a product‑specific URL exists in data; they must never present a store URL as a product page.
- D11 (decided): Photography is freely licensed (Unsplash, Pexels, Pixabay or equivalent), stored locally under public/images, never hotlinked, and credited in docs/IMAGE_CREDITS.md. Photos of one product must look like the same garment; fewer consistent photos beat more mismatched ones.
- D12 (final approved portfolio policy, 2026-10-14): Accept T15 as a static portfolio demo with one existing local visual-reference image per fictional piece, explicitly labeled sample imagery/content in product-detail UX. Sample prices/sizes are not real stock, material/certification, or marketplace availability claims; Product JSON-LD must not publish fictional offers. Existing image provenance is unknown, not verified or claimed licensed. This demo acceptance is not clearance for public release: owner must provide ownership/license evidence and genuine matching replacement assets before public use. Additional gallery views require lawful matching photos and fresh multi-image verification; single-image controls remain hidden.


## Release decision — 2026-10-16
- Owner requests publishing this sample site through existing GitHub/Vercel connection; no further performance tuning or feature expansion.
- Owner states existing photos are public/free to use and authorizes publication. This is owner confirmation, not independently verified license evidence; existing provenance notes remain historical evidence.

## Content honesty rules
- Demo content must not look like real facts. Testimonials, customer counts, and partner statistics must be labeled as sample content or replaced.
- Placeholder contact details must be centralized (D2) so they can be swapped in one place.

## Non-goals
Cart, checkout, payments, user accounts, real inventory management.

## Backlog (not scheduled)
- Business WhatsApp number whose prefilled message reads like "I saw the VELVET demo and want a similar site", to turn portfolio visitors into leads.
- Inquiry list: save several products, then send one WhatsApp message with all of them.
- Shop-the-look on lookbook images.
- Store fitting booking via WhatsApp.
- Back-in-stock notification.
- Catalog search.
- Bilingual (EN/ID) copy.
