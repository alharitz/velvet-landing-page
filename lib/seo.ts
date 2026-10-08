import { siteConfig } from "./site-config";
import { type Product } from "./products";

/**
 * Maps product status to Schema.org availability.
 */
function mapAvailability(status: Product["status"]): string {
  switch (status) {
    case "available":
      return "https://schema.org/InStock";
    case "preorder":
      return "https://schema.org/PreOrder";
    case "sold-out":
      return "https://schema.org/OutOfStock";
    default:
      return "https://schema.org/InStock";
  }
}

/**
 * Generates WebSite structured data for the homepage.
 */
export function generateWebsiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/collection?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates Organization structured data for the homepage.
 */
export function generateOrganizationJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/apple-touch-icon.png`,
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.tiktok,
    ],
  };
}

/**
 * Generates Product structured data for product detail pages.
 */
export function generateProductJsonLd(product: Product, productUrl: string): object {
  const imageUrls = product.images.map((img) => `${siteConfig.siteUrl}${img}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrls,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IDR",
      price: product.price,
      availability: mapAvailability(product.status),
      validFrom: new Date().toISOString().split("T")[0],
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}