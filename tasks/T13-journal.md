# T13: Journal: list page, three articles, and homepage links (supersedes T09)

## Goal
Turn the Journal into real pages: a list page and three full sample articles, linked from the homepage, with navigation and footer everywhere.

## Design guidance
Use the frontend-design / UI-UX skill if available. Editorial feel: generous whitespace, serif headings, a readable measure of about 65ch for body text. Check 390px and 1366x768. Read decisions D7 to D9 in docs/PRODUCT_BRIEF.md first.

## Requirements
1. Data in lib/journal.ts. Type JournalArticle: slug, title, category, excerpt, date (ISO), author ("VELVET Editorial"), cover { src, alt }, body as an array of blocks (heading, paragraph, quote, image { src, alt, caption? }). Helpers: getAllArticles (newest first), getArticleBySlug, getOtherArticles(slug), readTime computed from the body (200 wpm, rounded up), and a date formatter ("Oct 1, 2026"). No new dependencies (no MDX, no markdown parser).
2. Three articles, using the titles, categories, and excerpts of the current homepage cards:
   - "The Art of Merino: A Journey to Tasmania" (Fabric), Oct 1, 2026
   - "Our 5-Year Repair Commitment" (Sustainability), Sep 17, 2026
   - "Meet the Artisans" (Behind the Scenes), Sep 3, 2026
   Each body is about 700 to 900 words: an intro paragraph, 3 to 4 headings with realistic short phrases, paragraphs (lorem ipsum allowed), one pull quote, and at least one inline image where a suitable existing image is available. Do not invent new statistics or certifications beyond what the site already states. Show a quiet "Sample article" label on article pages.
3. List page /journal: breadcrumbs (Home / Journal), H1 "Journal", a one-line intro, a responsive grid with the 3 cards (cover, category, title, excerpt, date and read time). Each whole card is one link with clear hover and focus states and consistent image aspect ratios.
4. Article page /journal/[slug], statically generated: breadcrumbs (Home / Journal / Title), category, a single H1, meta (date, read time, author), cover image, body with H2 headings and a styled pull quote, then a "More from the Journal" block with the other two articles, a "Back to Journal" link, and a closing CTA "Explore the Full Collection" linking to /collection. Unknown slugs call notFound().
5. Navbar and footer come from the root layout (T11). Point the navbar "Journal" link and the footer Journal link to /journal, with the active state on /journal*.
6. Homepage Journal section: read from lib/journal.ts; eyebrow "JOURNAL" (not "Stories"); each card links to its article; the "Read All Stories" link becomes "Read the Journal" and links to /journal. Cover images must visually fit each topic: use only images that already exist in public/images (fabric, atelier, knitwear or lookbook, collection shots). Never hotlink external images. The current cards show unrelated photos (confetti, cactus); replace them. If nothing suitable exists, use the closest neutral fabric or lookbook image and add the ideal photo for each article to IMAGES_NEEDED.md.
7. Our Story section: the "Read Our Full Story" link becomes "Explore the Journal" and links to /journal.
8. Metadata: generateMetadata for the list and each article (title, description, canonical, following the existing pattern). If T06 outputs already exist (sitemap, OG, JSON-LD helpers), add the journal URLs to the sitemap and reuse the existing patterns; otherwise leave SEO to T06.

## Out of scope
Comments, search, tags, pagination, share buttons (T08), CMS, RSS, newsletter backend.

## Acceptance criteria
- /journal lists 3 cards, each linking to its article.
- /journal/<slug> works for all 3 and returns 404 for an unknown slug.
- Each article has at least 600 words (report the counts), a heading structure, a pull quote, breadcrumbs, a back link, "More from the Journal", and the collection CTA.
- Navbar and footer appear on all journal pages.
- Homepage Journal cards read from lib/journal.ts, link to the articles, and use topic-appropriate covers; "Read the Journal" and "Explore the Journal" both go to /journal.
- No external image URLs; every image request returns 200.
- Dates are in 2026 and read times are computed.
- Lint and build pass with no new warnings.

## Final report
List created and modified files, summarize the README, PRODUCT_BRIEF, and AGENTS.md changes, state whether T06 was already Done, and then stop. Do not start T11.
