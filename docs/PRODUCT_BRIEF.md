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
- D1 (decided): Product data is a typed TypeScript module at lib/products.ts, structured so it can later move to a CMS.
- D2 (decided): The WhatsApp number and other contact details are centralized in lib/site-config.ts. The number is read from the env variable NEXT_PUBLIC_WHATSAPP_NUMBER, with a clearly marked placeholder fallback. No business number exists yet.
- D3 (decided): Routes are /products (catalog) and /products/[slug] (detail), statically generated.
- D4 (proposed, confirm with owner): Site copy is in English. Prefilled WhatsApp messages are in Indonesian.
- D5 (open): Source of product photography. Check IMAGES_NEEDED.md before any task that depends on new images.

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
