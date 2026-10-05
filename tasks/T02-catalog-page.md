# T02: Catalog page with filters and sorting

## Phase
1

## Depends on
T01

## Status
In Progress

## Specifications

### Route and rendering
- Route: `/products` (NOT `/catalog`) — per decision D3 in docs/PRODUCT_BRIEF.md
- Page shell: statically generated
- Filtering and sorting: client-side over data from `lib/products.ts`, reading state from URL via `useSearchParams` inside a Suspense boundary
- Do NOT make the route dynamic just to read query params

### Filter UI
- Desktop (lg and up): sidebar
- Mobile: drawer opened by "Filters" button showing count of active filters
- No new dependencies; build drawer with accessible primitives:
  - Focus trap
  - Escape to close
  - Scroll lock
  - Restore focus to trigger
- Filters:
  - Category: multi-select checkboxes, using label map from T01 and counts computed from data
  - Material: multi-select checkboxes, values derived from data
  - Price: single-select preset ranges (e.g., under Rp 1.000.000, Rp 1.000.000 to 2.000.000, over Rp 2.000.000) — NOT a slider
  - Status: render group ONLY if data contains more than one distinct status. Currently all products are "available", so it will be hidden (expected)
- Also add:
  - Result count
  - Removable chips for active filters
  - "Clear all" action
  - Empty state with clear-filters button

### Sorting
- Options: Featured (default, original data order), Price low to high, Price high to low, Name A to Z, Name Z to A
- Do NOT add "Newest": data has no date field
- Native select, styled consistently

### URL state
- Query params: `category`, `material`, `price`, `status`, `sort`
- Multi-select values: comma-separated (e.g., `?category=outerwear,knitwear&sort=price-asc`), using stable lowercase keys
- Omit params that equal the default
- Use `router.replace` (not push) so filter changes don't flood browser history
- Ignore unknown/invalid values silently; never throw on malformed URL
- Filtered URL must render correctly when opened directly, no flash of unfiltered content beyond static shell

### Pagination
- None: only 8 products, show all
- Infinite scroll would hurt accessibility, keyboard users' access to footer
- Revisit only when catalog exceeds ~24 products

### Product cards
- Image (next/image, existing paths), name, material, formatted price, status badge only when not "available"
- Link to `/products/[slug]` — detail route built in T03, links will 404 until then; do NOT create stub page

### Homepage updates
- Category cards and "Explore Collection" / collection links point to `/products`
- Category cards link to `/products?category=<key>`

### Product count
- In filter UI and catalog header: from data, never hardcoded

### Accessibility/Design
- Mobile-first, keyboard accessible, visible focus states
- Consistent with existing design tokens and typography

### Out of scope
- Search
- Analytics
- SEO/OG
- Detail page (T03)
- WhatsApp CTAs on cards
- New dependencies
- Any change to product data other than what filtering strictly requires

## Acceptance Criteria
1. `/products` renders all 8 products
2. Each filter and each sort works and combines correctly
3. URL updates and reloading/sharing restores exact view
4. Invalid params do not break the page
5. Mobile drawer is keyboard and screen-reader usable
6. Empty state works
7. Homepage links point to right filtered views
8. Lint and build pass with no new warnings