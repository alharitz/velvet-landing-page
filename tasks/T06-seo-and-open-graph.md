# T06: SEO and Open Graph Images

## Goal
Make every page correctly described to search engines and look good when shared (WhatsApp, Instagram, Slack, etc.), using Next.js built-in metadata features and no new dependencies.

## Requirements

1. **Site URL**. Add `siteUrl` to `lib/site-config.ts`, read from `NEXT_PUBLIC_SITE_URL` with the fallback `https://velvet-landing-page-seven.vercel.app`. Document it in `.env.example`. Set `metadataBase` in `app/layout.tsx` from it. All absolute URLs (canonical, OG, sitemap) derive from it.

2. **Root metadata (app/layout.tsx)**. Title template `"%s | VELVET"` with a default title, description, openGraph (type website, siteName, locale, default image), twitter card summary_large_image, and the existing theme color. Ensure `<html lang="en">` and that a favicon and apple touch icon exist (use the Next file conventions in `app/`; if no icon asset exists, generate a simple text-based icon with `ImageResponse` rather than inventing artwork).

3. **Page metadata**.
   - `/products`: title, description, canonical `/products`. Filtered views (any query params) must canonicalize to `/products`.
   - `/products/[slug]`: `generateMetadata` from product data (title = product name, description from product description, canonical = `/products/<slug>`, openGraph type website with the product image). Follow the params handling of the Next.js version in package.json.
   - Unknown slugs must call `notFound()`, and the not-found page must not be indexable.

4. **Open Graph images using the built-in opengraph-image file convention with ImageResponse from next/og**:
   - `app/opengraph-image.tsx`: default branded card (brand name, tagline, brand colors from the design tokens, e.g. the `#F6F2EC` background).
   - `app/products/[slug]/opengraph-image.tsx`: per-product card showing name, material, and formatted price. Include the product photo only if it can be done reliably at build time (for example by reading the file from `public/` as a data URI); otherwise make a clean typographic card. Record which you chose under "Assumptions made". Statically generate it via `generateStaticParams`. Size 1200x630 with alt text.

5. **Indexing control**. Create `app/robots.ts` and `app/sitemap.ts`. The sitemap lists `/`, `/products`, and every product URL. Indexing is controlled by `NEXT_PUBLIC_ALLOW_INDEXING`: default is NOT allowed. When not allowed, robots disallows all crawling and the root layout metadata sets robots noindex, nofollow. When "true", robots allows crawling and references the sitemap, and noindex is removed. Document the variable in `.env.example` and in `docs/PRODUCT_BRIEF.md` under Decisions as D6: "Site is noindex by default because it uses fictional brand and contact data; flip NEXT_PUBLIC_ALLOW_INDEXING to enable indexing."

6. **Structured data (JSON-LD, rendered in a script tag of type application/ld+json, with the output escaped safely)**.
   - Homepage: WebSite and Organization (name, url, logo if available, sameAs from social URLs in config). Do NOT include telephone or street address, because they are placeholders.
   - Product detail: Product with name, description, image URLs, brand, and offers (price, priceCurrency IDR, availability mapped from product status: available to InStock, preorder to PreOrder, sold-out to OutOfStock, and url).
   - Create a small typed helper in `lib/` to build these objects; do not inline large JSON in components.

7. **Semantic and accessibility sweep for SEO**. Each page has exactly one h1 and a logical heading order. Add meaningful alt text to informative images (product name plus material; decorative images get empty alt). Landmarks (header, main, footer) are present. Do not redesign anything; fix only what is wrong, and list unfixable items in the report.

## Out of scope
Analytics, redesign, image optimization or replacing `<img>` with next/image (planned as a separate performance task), Journal pages, backend, new dependencies.

## Acceptance criteria
- Built HTML for `/`, `/products`, and one product page contains the correct title, description, canonical, openGraph and twitter tags (verify by running next build and next start, then curl, and quote the relevant lines in the report).
- `/products?category=outerwear` canonicalizes to `/products`.
- OG images render at `/opengraph-image` and `/products/<slug>/opengraph-image` for all 8 products without build errors.
- With `NEXT_PUBLIC_ALLOW_INDEXING` unset, `/robots.txt` disallows everything and pages carry noindex. With it set to "true", `/robots.txt` allows crawling and lists the sitemap, and noindex is absent. Verify both and report the results.
- `/sitemap.xml` lists all expected URLs with absolute URLs.
- Product pages contain valid Product JSON-LD, and the homepage contains WebSite and Organization JSON-LD with no phone or address.
- An unknown slug returns a proper 404.
- Lint and build pass with no new warnings.

## Final report (all sections required)
Files changed; what was done; acceptance criteria with pass/fail for EACH criterion and the evidence; lint/build results; Assumptions made; Out-of-scope findings (noted, not fixed); Unfinished items; Commit info (base branch, hash, git show --stat).