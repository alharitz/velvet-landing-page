import { siteConfig } from "./site-config";
import { type Product } from "./products";

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
  const imageUrls = product.images.map((img) => `${siteConfig.siteUrl}${img.src}`);

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
    url: productUrl,
  };
}