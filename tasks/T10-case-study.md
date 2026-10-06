# T10: Case study page and services CTA

## Goal
Turn the project into a convincing portfolio piece: a case study that explains the work, and a clear call to action for prospective clients.

## Requirements
1. Config: add a studio object to lib/site-config.ts (name, email, whatsapp, repo URL) read from env vars (NEXT_PUBLIC_STUDIO_NAME, NEXT_PUBLIC_STUDIO_EMAIL, NEXT_PUBLIC_STUDIO_WHATSAPP, NEXT_PUBLIC_REPO_URL). No fake personal data and no hardcoded identity. Add hasStudioContact(). Update .env.example. List "provide studio details" under Owner actions in the log.
2. Route /case-study (static) with breadcrumbs, using the root layout's navbar and footer. Sections: Overview; The Problem (small brands sell through WhatsApp and marketplaces, and most templates assume a checkout); Goals; Approach and key decisions (WhatsApp-first conversion, no cart or checkout, typed data modules, one config for contact details, honest demo content); Features (filterable collection with shareable URLs, product pages with gallery and visit request, Journal, SEO and Open Graph, analytics, accessibility); Tech stack (read versions from package.json at build time, never hardcode); Results (numbers from docs/PERFORMANCE.md only; if it is missing, omit the section); What I would do next (CMS, real inventory, bilingual copy, inquiry list); Links (live demo, and the repo only if NEXT_PUBLIC_REPO_URL is set).
3. Content honesty: no invented client quotes, revenue, conversions, or traffic. State clearly that this is a demo project.
4. Services CTA: a "Need a site like this?" section on /case-study with what is offered (catalog and landing sites for small brands, WhatsApp-first order flow, typical deliverables) and contact buttons from studio. If no studio contact is configured, hide the buttons and render nothing misleading. Add a compact footer line "Built by {studio.name}" only when configured. Add a "See the case study" link to the DemoBanner.
5. Metadata, sitemap entry, and JSON-LD following the T06 patterns. Fire cta_services_click through lib/analytics.ts if T07 is Done.

## Out of scope
Pricing, booking, contact form backend, new dependencies.

## Acceptance criteria
- /case-study renders every section with real data; the stack versions match package.json; no section contains invented numbers.
- With no studio env vars, no empty buttons, "undefined" text, or fake contact appears; with them set (session env, rebuild), the CTA buttons render with correct links. Restore the default afterwards.
- The page appears in sitemap.xml and has correct metadata.
- The banner link and footer line behave as specified.
- Lint and build pass with no new warnings.