/**
 * Centralized URL builder for all internal routes.
 * Every link in the app should use these helpers instead of hardcoding paths.
 */


// ---------------------------------------------------------------------------
// Collection (browse + detail)
// ---------------------------------------------------------------------------

/** Browse page: /collection, optionally filtered by category */
export function collectionUrl(category?: string): string {
  if (category) {
    return `/collection?category=${encodeURIComponent(category.toLowerCase())}`;
  }
  return "/collection";
}

/** Product detail page: /collection/<slug> */
export function productUrl(slug: string): string {
  return `/collection/${slug}`;
}

// ---------------------------------------------------------------------------
// Journal (placeholder — T13 will add actual pages)
// ---------------------------------------------------------------------------

/** Journal list page */
export function journalUrl(): string {
  return "/journal";
}

/** Journal article page */
export function journalArticleUrl(slug: string): string {
  return `/journal/${slug}`;
}

// ---------------------------------------------------------------------------
// Homepage anchors
// ---------------------------------------------------------------------------

export const homeUrl = "/";
export const storyAnchor = "/#story";
export const craftAnchor = "/#craft";
export const journalAnchor = "/#journal";
export const visitAnchor = "/#visit";

// ---------------------------------------------------------------------------
// ROUTES object for backward compatibility
// ---------------------------------------------------------------------------

export const ROUTES = {
  collection: "/collection",
  home: "/",
  story: "/#story",
  craft: "/#craft",
  journal: "/#journal",
  visit: "/#visit",
} as const;