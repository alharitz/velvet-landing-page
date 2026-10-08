import { Suspense } from "react";
import { Metadata } from "next";
import { ProductsClient } from "./ProductsClient";
import { siteConfig } from "@/lib/site-config";
import { collectionUrl } from "@/lib/routes";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection",
  description: "Browse our full collection of premium apparel.",
  alternates: { canonical: `${siteConfig.siteUrl}${collectionUrl()}` },
  openGraph: {
    title: "Collection — VELVET",
    description: "Browse our full collection of premium apparel.",
    type: "website",
    url: `${siteConfig.siteUrl}${collectionUrl()}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collection — VELVET",
    description: "Browse our full collection of premium apparel.",
    images: ["/opengraph-image"],
  },
};

export default function CollectionPage() {
  const pieceCount = getAllProducts().length;
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Suspense fallback={<CollectionSkeleton />}>
        <ProductsClient pieceCount={pieceCount} />
      </Suspense>
    </main>
  );
}

function CollectionSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
      <div className="flex gap-8 lg:gap-12">
        <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 animate-pulse rounded" />
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <div className="h-12 bg-gray-100 animate-pulse rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100 animate-pulse rounded" />
                <div className="h-6 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
                <div className="h-6 bg-gray-100 animate-pulse rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
