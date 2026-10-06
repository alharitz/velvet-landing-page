# T07: Analytics event tracking

## Goal
Measure the actions this site exists for (WhatsApp, marketplace, directions, visit requests, newsletter) through a provider-neutral layer, so the case study can cite real numbers later. Nothing is tracked unless configured.

## Context
Read "Success signals" in docs/PRODUCT_BRIEF.md. Routes are /collection and /journal (after T11 and T13). The Book a Visit dialog exists after T15.

## Requirements
1. lib/analytics.ts with typed event names and props, and track(name, props): no-op on the server, no-op when the browser sends Do Not Track or Global Privacy Control, and console.debug of each event in development.
2. Provider by env: NEXT_PUBLIC_ANALYTICS_PROVIDER = none (default) | plausible | ga4, plus NEXT_PUBLIC_ANALYTICS_ID. Provider scripts load through next/script only when a provider is configured; with the default there must be zero analytics scripts and zero external requests. No new dependencies (do not install @vercel/analytics).
3. Events (each fired from exactly one call site or one shared component): cta_whatsapp_click {location, product?}, marketplace_click {marketplace, product?}, directions_click {location}, visit_request_submit {product?}, newsletter_submit {} (never the email), collection_filter_change {filter, value}, collection_sort_change {sort}, product_view {slug}, lightbox_open {slug}, journal_article_view {slug}, social_click {network}, share_click {method, slug?} (only if the share buttons from T08 exist).
4. Wire events with small helpers or minimal onClick handlers; do not rewrite components wholesale. Event names live in one typed constant.
5. Privacy: never send names, emails, phone numbers, message text, or any free text; only enumerated values and slugs.
6. docs/ANALYTICS.md: events table, env vars, how to enable and verify. Update .env.example.

## Out of scope
Consent banner, server-side tracking, dashboards, new dependencies.

## Acceptance criteria
- Default configuration: the production HTML for /, /collection, and one product page contains no analytics script tag.
- With NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible and an id set in the session (rebuild), the HTML contains exactly one provider script. Restore the default afterwards.
- Each event in the table has exactly one call site (list them from a search).
- No track() call can include personal or free-text data (search evidence).
- DNT and GPC handling exists (cite the code lines). Click behavior is NOT RUN unless browser tooling exists.
- Lint and build pass with no new warnings.