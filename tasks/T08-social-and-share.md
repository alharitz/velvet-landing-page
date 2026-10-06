# T08: Social links, Instagram grid, and share buttons

## Goal
Make the brand's social presence visible and make pieces and articles easy to share, without third-party widgets.

## Requirements
1. Socials in lib/site-config.ts (Instagram, TikTok), with a comment that the handles are placeholders. Footer shows labeled social links (icon plus text, accessible names, new tab with rel="noopener noreferrer"). Add a "Follow" row to the Visit/Contact area.
2. Homepage "On Instagram" section above the footer: a 6-tile grid using existing images in public/images (no hotlinking, no embeds, no third-party scripts). Each tile links to the profile URL from config, not to fake post URLs. The heading uses the handle from config. Include a quiet "Sample feed" label. Responsive (3 columns on mobile, 6 on desktop), lazy-loaded images, meaningful link labels.
3. Share on collection detail pages and journal articles: a Share control that uses navigator.share when available, plus fallbacks: WhatsApp share link (wa.me/?text=) and Copy link (Clipboard API with a fallback, and an aria-live "Link copied" confirmation). URLs are built from siteUrl and the route builders. No share SDKs.
4. If lib/analytics.ts exists (T07), fire share_click and social_click events through it.

## Out of scope
Embeds, API feeds, share counts, new dependencies.

## Acceptance criteria
- Footer and Follow row render the configured social links with correct attributes.
- The Instagram grid shows 6 local images, none external, each linking to the profile URL.
- Share works on product and article pages: Copy link produces the full absolute URL; the WhatsApp link contains the encoded URL and title; unsupported navigator.share falls back cleanly.
- No third-party scripts were added.
- Lint and build pass with no new warnings.