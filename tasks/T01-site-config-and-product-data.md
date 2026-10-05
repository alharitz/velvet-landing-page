# T01: Site config and product data foundation

## Goal
Create a single source of truth for site-wide configuration and product data, and make the existing homepage read from it. This is the foundation for the catalog and product detail pages. No new routes in this task.

## Context
- Read docs/PRODUCT_BRIEF.md (decisions D1 and D2) first.
- The homepage currently shows 8 products and 4 category cards with hardcoded counts (12, 8, 6, 4) that do not match the actual products. The WhatsApp URL and contact details are likely repeated across components.
- If the codebase contradicts any assumption in this file, stop and report instead of improvising.

## Requirements

1. Create lib/site-config.ts exporting:
   - brand name, tagline, contact email, store address, and store hours (keep the current placeholder values, just centralize them)
   - WhatsApp number read from process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, falling back to the current placeholder number, with a comment marking it as a placeholder
   - default WhatsApp message (Indonesian)
   - marketplace store URLs (Shopee, Tokopedia, Lazada, TikTok Shop, Blibli) and social URLs (Instagram, TikTok)
2. Create lib/whatsapp.ts exporting a function that builds a wa.me URL from a message string using the configured number and proper URL encoding, plus a helper that builds the product inquiry message in Indonesian, for example "Halo VELVET, saya tertarik dengan {product name}. Apakah masih tersedia?"
3. Create .env.example documenting NEXT_PUBLIC_WHATSAPP_NUMBER. Make sure .env.local stays git-ignored.
4. Create lib/products.ts with:
   - a Product type: slug, name, category, material, price (integer, IDR), status (available, preorder, or sold-out), short description, images (array of paths under public/images), and optional marketplace links per marketplace
   - the 8 current products migrated from the homepage, keeping names, materials, prices, and existing image paths. Slugs are kebab-case of the name. All statuses start as available. Write short neutral descriptions without invented claims.
   - category assignment: Outerwear (Minimal Wool Coat, Structured Blazer), Knitwear (Cashmere Blend Sweater), Trousers (Tailored Wool Trousers, Selvedge Denim), Essentials (Essential Crew Neck, Relaxed Linen Shirt, Organic Cotton Basics Set)
   - helpers: get all products, get product by slug, get categories with computed product counts, and a price formatter that renders IDR as "Rp 590.000"
5. Refactor the homepage so the product grid, category cards, and every WhatsApp or contact link read from these modules. Categories are derived from the data. A category with zero products must not be displayed. Report which homepage category this affects (expected: Accessories).
6. Search the whole repo for remaining hardcoded phone numbers, wa.me URLs, and marketplace URLs outside lib/. Replace them with the config.

## Out of scope
New routes or pages, filters, SEO, analytics, visual redesign, new dependencies, and any change to copy other than what is required for the refactor.

## Acceptance criteria
- No hardcoded phone number or wa.me URL exists outside lib/.
- Homepage looks the same as before, except category cards now show real counts and zero-product categories are gone.
- Changing NEXT_PUBLIC_WHATSAPP_NUMBER changes every WhatsApp link on the page.
- Products can be fetched by slug, and the slug list is stable and unique.
- Lint and build pass with no new warnings.

## Report additionally
- The final list of categories and their counts.
- Any homepage data or links that could not be migrated, and why.
- Any decision you need from me before T02.

## Step 3: Final report
List created and modified files, summarize the AGENTS.md change, report any AGENTS.md/CLAUDE.md conflicts with your consolidation proposal, and then stop. Do not start T01.
