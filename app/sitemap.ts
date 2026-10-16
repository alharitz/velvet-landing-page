import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const products = getAllProducts();

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...products.map((product) => ({
      url: `${baseUrl}/collection/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/journal/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return urls;
}
