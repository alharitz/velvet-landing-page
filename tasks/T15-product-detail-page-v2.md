# T15: Product detail page v2 (gallery, actions, visit request, related pieces)

## Goal
Upgrade the product page into a complete, e‑commerce‑style page: swipeable photo gallery, price, description and details, clear actions (WhatsApp, marketplace, visit request with address), navigation, and suggestions for other pieces. There is still no cart or checkout.

## Context
- T03 built a first version of this page: gallery with prev/next, thumbnails, a fullscreen modal, product info, and WhatsApp, marketplace, and Directions buttons. After T11 the route is /collection/[slug]. Products currently have one image each, there are no related pieces, no visit request, and no detail sections.
- Improve the existing implementation. Reuse and refactor what is sound (for example the accessible modal logic); do not rewrite for its own sake.
- Read decisions D7, D8, D10, and D11 in docs/PRODUCT_BRIEF.md first.

## Design guidance
Use the frontend‑design / UI‑UX skill if available. Keep existing design tokens and typography. Mobile‑first. Verify at 390×844, 768, 1366×768, and 1920×1080 and say explicitly if visual verification was not possible.

## Requirements
### 1. Product data (lib/products.ts)
- Extend each product with `images: {src:string,alt:string}[]` (3‑4 per product; keep existing image as first). Add `shortDescription`, `longDescription` (≤2 paragraphs), `details` (label/value pairs, e.g. Material, Category, Sizes), `sizes` (XS‑XL), and `care` (text from Fabric Library or generic FAQ). Preserve slugs, keys, and exports.
- Helpers: `getRelatedProducts(slug, limit)`, `getAdjacentProducts(slug)` – previous/next in data order, wrap around.

### 2. Photography (D11)
- Find freely licensed photos (Unsplash/Pexels/Pixabay). Store under `public/images/products/<slug>/01.jpg`, `02.jpg`, …; keep existing image as first.
- Resize ≤ 1600 px edge, ≤ 300 KB, JPG/WebP. No new deps. Report total added size.
- Record each in `docs/IMAGE_CREDITS.md` (file, source URL, author, license) and add alt text.
- If no internet, list ideal shots per product in `IMAGES_NEEDED.md` and keep current image.

### 3. Gallery (components/ProductGallery.tsx)
- Desktop: main image, thumbnail strip, prev/next arrows, counter “2 / 4”, keyboard ArrowLeft/Right. Click opens fullscreen lightbox (reuse accessible modal: focus trap, Escape, scroll lock, restore).
- Mobile: swipeable carousel using CSS scroll‑snap, dot indicators.
- Fixed aspect ratio (e.g. 4:5) with placeholder background to avoid layout shift. First image high‑priority, rest lazy. Use `next/image`.
- Hide controls when only one image.
- Accessible: labeled controls, carousel role, alt on every image.

### 4. Info panel
- Category eyebrow, H1 name, formatted price, optional status badge.
- Short description, optional size selector (radio chips). No size → “ask for size availability” in WhatsApp message.
- Accordion sections (native `<details>/<summary>` acceptable): Description, Details, Care, Shipping & Returns (FAQ text), Visit the Store (address, hours, Get Directions).

### 5. Actions (D10)
- Primary “Order via WhatsApp”: use `lib/whatsapp.ts` to send Indonesian message with product name, price, selected size (if any), and page URL (`siteConfig.siteUrl` + `/collection/${slug}`).
- “Buy on marketplace”: list five marketplaces; link to `product.marketplaceLinks[market]` if present, else to generic store URL from `siteConfig.marketplaces[market]`. Open new tab `rel="noopener noreferrer"`.
- “Book a Visit”: accessible dialog showing store name, address, hours, and form (name optional, date `<input type="date">` min today max +60 days, time slot generated from store hours). Validate inline. On submit, open WhatsApp with message: “Halo VELVET, saya ingin booking kunjungan ke toko pada {date} pukul {time} untuk melihat {product}. Nama: {name}.” Dialog notes it’s a demo only.
- Refactor store hours in `site-config.ts` to a structured object (Mon‑Sat 10:00‑20:00, Sun 11:00‑18:00) and derive display string.
- Replace floating WhatsApp button on this page type with a sticky bottom bar (price, Order‑WhatsApp, Visit) on mobile; add bottom padding so footer links remain tappable. Desktop keeps floating button.

### 6. Related pieces & navigation
- “You May Also Like”: 4 cards (2 cols mobile, 4 cols desktop) – same‑category first, then others, exclude current. Reuse collection card component.
- Below: Prev/Next links (wrap around) and “View all pieces” → `/collection`.
- Breadcrumbs (Home / Collection / Name) and “Back to collection” link present (from T11).

### 7. Metadata
- Keep `generateMetadata`/`generateStaticParams` functional, using the first image. Unknown slugs → 404.
- If T06 outputs exist (JSON‑LD, OG), include all product images in the Product JSON‑LD `image` array; otherwise skip.

## Out of scope
Cart, checkout, real booking backend, reviews, wishlist, analytics (T07), SEO/OG (T06), performance pass (T14), new deps.

## Acceptance criteria
- Gallery works: desktop arrows, thumbnails, counter, keyboard; mobile swipe at 390 px (or note if not verified). Single‑image products show no broken controls; lightbox keyboard‑accessible.
- Every image URL returns 200, images are local, no external URLs; total added size reported; `IMAGE_CREDITS.md` complete.
- WhatsApp order message contains product, price, size (if any), page URL.
- Marketplace buttons never masquerade as product pages; open new tab with `rel="noopener noreferrer"`.
- Book a Visit validates date/time against structured store hours, shows address/hours, opens prefilled WhatsApp message, and is keyboard/screen‑reader usable.
- Accordions display correct content; no invented numbers or certifications.
- “You May Also Like” shows 4 pieces, excludes current; Prev/Next wrap correctly; breadcrumbs, back link, navbar, footer present.
- Mobile sticky bar does not overlap content/footer; floating button remains on desktop.
- Lint and build pass with no new warnings.

## Final report
List created/modified files, summarize README, PRODUCT_BRIEF, and AGENTS changes, note T06 status, and stop. Do not start T15.
