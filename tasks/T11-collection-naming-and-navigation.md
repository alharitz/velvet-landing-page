# T11: Collection naming, global navigation, and breadcrumbs

## Goal
Make the site coherent: one name per area, navigation and footer on every page, and a clear path from the homepage into the collection.

## Context
Owner review found: the homepage says "Collection" but the browse page is titled "Catalog" and lives at /products; the browse and detail pages have no way back and no footer; the homepage "Current Collection" section has no link to the full collection. Read decisions D7 and D8 in docs/PRODUCT_BRIEF.md first.

## Design guidance
Use the frontend-design / UI-UX skill if available. Keep existing design tokens, typography, and spacing. Check 390px mobile and 1366x768 laptop.

## Requirements
1. Terminology (D7). Search all UI strings, metadata titles and descriptions, aria-labels, and alt text for "Catalog", "Catalogue", "Products" (as a section name), and "Shop", and fix them. The browse page H1 is "Collection" with a one-line intro and a piece count computed from data ("8 pieces"). Document title: "Collection | VELVET" (follow the existing metadata pattern).
2. Route rename. Move app/products to app/collection (list page and [slug] detail). Update every internal link, generateStaticParams, and URL builder (centralize URL building in lib/routes.ts if it is not already centralized). Add permanent redirects in next.config.ts: /products to /collection and /products/:slug to /collection/:slug. Verify query strings survive (for example /products?category=outerwear goes to /collection?category=outerwear). Homepage category cards link to /collection?category=<key>.
3. If T06 outputs already exist in the repo (sitemap, canonical URLs, JSON-LD URLs, OG image routes, metadataBase), update them to the new routes. If they do not exist, skip this.
4. Global layout (D8). Move Navbar and Footer into app/layout.tsx so every route has them (home, collection, detail, 404). Remove the duplicates from app/page.tsx. Keep DemoBanner. Navbar active state: "Collection" is highlighted on /collection and /collection/*, with aria-current="page". Add a "Skip to content" link and an id on main. The sticky navbar must sit below the demo banner without overlap on every route. Create app/not-found.tsx if absent: short message with links to Home and Collection.
5. Mobile navigation works on every route at 390px: the menu opens, links navigate and close it, Escape closes it, and focus is handled sensibly.
6. Breadcrumbs. Create components/Breadcrumbs.tsx: nav with aria-label="Breadcrumb", an ordered list, aria-current="page" on the last item, graceful truncation of long names on mobile. Use it on /collection (Home / Collection) and /collection/[slug] (Home / Collection / Product name). Add a visible "Back to collection" link on the detail page.
7. Homepage "Current Collection": add a clear "Explore the Full Collection" CTA with an arrow below the grid, and a text link on the right side of the section header, both linking to /collection.
8. Do NOT link to /journal yet; T13 does that.

## Out of scope
Collection image bug, hero and header polish (T12), Journal pages (T13), analytics, performance work, new dependencies.

## Acceptance criteria
- No UI string uses "Catalog" or "Products" as a section name (include grep evidence).
- /collection and /collection/<slug> work for all 8 pieces; /products and /products/<slug> redirect permanently and keep query strings (verify with curl against a production build).
- Navbar and footer appear on /, /collection, /collection/<slug>, and an unknown URL (404), with no duplicates on the homepage.
- Active nav state is correct; the skip link works; the sticky header does not overlap the banner.
- Breadcrumbs are correct on the collection and detail pages; the detail page has "Back to collection".
- The mobile menu works on every route at 390px.
- The homepage Current Collection section has the CTA to /collection.
- Lint and build pass with no new warnings.
