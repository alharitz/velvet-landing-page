"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ProductCard } from "../ProductsClient";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Send,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/Button";
import { formatIDR, type Product, type MarketplaceLink, getRelatedProducts, getAdjacentProducts } from "@/lib/products";
import { siteConfig, mapLink } from "@/lib/site-config";
import { buildProductOrderLink } from "@/lib/whatsapp";
import ProductGallery from "@/components/ProductGallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import { collectionUrl, homeUrl, productUrl } from "@/lib/routes";
import VisitDialog from "@/components/VisitDialog";

interface ProductDetailClientProps {
  product: Product | undefined;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [isVisitDialogOpen, setIsVisitDialogOpen] = useState(false);

  if (!product) {
    return (
      <div className="container-shared py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Button variant="primary" onClick={() => window.location.href = collectionUrl()}>Back to Collection</Button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug, 4);
  const [prevProduct, nextProduct] = getAdjacentProducts(product.slug);

  const getMarketplaceButtons = () => {
    // Always show five marketplaces from siteConfig.marketplaces
    return siteConfig.marketplaces.map((marketplace) => {
      const productLink = product.marketplaceLinks?.[marketplace.key as keyof MarketplaceLink];
      const url = productLink ?? marketplace.url;
      return (
        <a
          key={marketplace.key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 border border-ink/20 hover:bg-ink/5 transition-colors rounded-full text-sm font-medium"
        >
          <ShoppingBag size={16} />
          {marketplace.name} store
          <ExternalLink size={14} />
        </a>
      );
    });
  };

  const getWhatsAppOrderLink = () => {
    const productUrlValue = `${siteConfig.siteUrl}${productUrl(product.slug)}`;
    return siteConfig.whatsapp.number
      ? buildProductOrderLink(product, selectedSize, productUrlValue)
      : "#";
  };

  return (
    <>
      <main id="main-content" className="pt-36 md:pt-32 pb-20">
        {/* Gallery Section */}
        <section className="container-shared mb-12">
          <Breadcrumbs items={[
            { label: "Home", href: homeUrl },
            { label: "Collection", href: collectionUrl() },
            { label: product.name }
          ]} />
          <Link href={collectionUrl()} className="inline-block mt-4 text-sm underline">Back to collection</Link>
          <p className="mt-4 rounded-md border border-ink/10 p-4 text-sm text-muted">Portfolio demo — sample imagery and fictional content. Images are visual references, not verified product photos. Prices and sizes are examples; no real stock, material specifications, or marketplace availability is claimed.</p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-sm text-muted mb-4">
                  <span className="uppercase tracking-widest font-semibold">{product.category}</span>
                  <span>•</span>
                  <span className="capitalize">{product.material}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold mb-4">{product.name}</h1>

                <p className="text-3xl font-semibold mb-8" style={{ color: "var(--ink)" }}>
                  {formatIDR(product.price)}
                </p>

                <p className="text-muted mb-6">{product.shortDescription}</p>

                {/* Accordion Sections */}
                <div className="space-y-4">
                  {/* Description */}
                  <details className="border border-ink/10 rounded-md">
                    <summary className="flex items-center justify-between p-4 font-medium text-ink">
                      Description
                      <ChevronDown size={20} className="transition-transform duration-200" />
                    </summary>
                    <div className="p-4 text-base leading-relaxed text-muted">
                      {product.longDescription}
                    </div>
                  </details>

                  {/* Details */}
                  <details className="border border-ink/10 rounded-md">
                    <summary className="flex items-center justify-between p-4 font-medium text-ink">
                      Details
                      <ChevronDown size={20} className="transition-transform duration-200" />
                    </summary>
                    <div className="grid gap-4 p-4 text-sm text-muted">
                      {product.details.map((detail) => <div key={detail.label}><span className="font-medium">{detail.label}</span><p>{detail.value}</p></div>)}
                    </div>
                  </details>

                  {/* Care */}
                  <details className="border border-ink/10 rounded-md">
                    <summary className="flex items-center justify-between p-4 font-medium text-ink">
                      Care
                      <ChevronDown size={20} className="transition-transform duration-200" />
                    </summary>
                    <div className="p-4 text-base leading-relaxed text-muted">
                      {product.care}
                    </div>
                  </details>

                  {/* Shipping & Returns */}
                  <details className="border border-ink/10 rounded-md">
                    <summary className="flex items-center justify-between p-4 font-medium text-ink">
                      Shipping &amp; Returns
                      <ChevronDown size={20} className="transition-transform duration-200" />
                    </summary>
                    <div className="p-4 text-base leading-relaxed text-muted">
                      Sample shipping and returns section for this portfolio demo. No delivery, pickup, or exchange service is offered; a real brand must supply its own terms before launch.
                    </div>
                  </details>

                  {/* Visit the Store */}
                  <details className="border border-ink/10 rounded-md">
                    <summary className="flex items-center justify-between p-4 font-medium text-ink">
                      Visit the Store
                      <ChevronDown size={20} className="transition-transform duration-200" />
                    </summary>
                    <div className="space-y-4 p-4 text-sm text-muted">
                      <div>
                        <span className="font-medium">Address</span>
                        <p>
                          {siteConfig.address.line1}, {siteConfig.address.line2}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Hours</span>
                        <p>{siteConfig.storeHours}</p>
                      </div>
                      <a href={mapLink()} target="_blank" rel="noopener noreferrer" className="block underline">Get Directions</a>
                      <Button
                        variant="secondary"
                        onClick={() => setIsVisitDialogOpen(true)}
                      >
                        Book a Visit
                      </Button>
                    </div>
                  </details>
                </div>

                {/* Size Selector (if applicable) */}
                {product.sizes && product.sizes.length > 0 ? (
                  <fieldset className="mt-6">
                    <legend className="text-sm font-medium mb-2">Sample size</legend>
                  <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => <label key={size} className="cursor-pointer">
                        <input type="radio" name="size" value={size} checked={selectedSize === size} onChange={() => setSelectedSize(size)} className="peer sr-only" />
                        <span className="block border border-ink/20 px-4 py-2 peer-checked:bg-ink peer-checked:text-background peer-focus-visible:outline-2">{size}</span>
                      </label>)}
                    </div>
                  </fieldset>
                ) : null}

                {/* CTA Buttons */}
                <div className="mt-6 space-y-3">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      const link = getWhatsAppOrderLink();
                      if (link !== "#") {
                        window.open(link, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    <Send size={18} />
                    Order via WhatsApp
                  </Button>

                  <p className="text-sm text-muted">Marketplace demo store pages:</p>
                  <div className="flex flex-wrap gap-2">
                    {getMarketplaceButtons()}
                  </div>

                  <Button variant="secondary" className="w-full" onClick={() => setIsVisitDialogOpen(true)}>Book a Visit</Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open(mapLink(), "_blank", "noopener,noreferrer")}
                  >
                    <MapPin size={18} />
                    Get Directions
                  </Button>
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        <section className="container-shared mb-12">
          <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.slug} product={related} />
              ))}
            </div>
          ) : (
            <p className="text-muted">No related products found.</p>
          )}
        </section>

        {/* Adjacent Navigation */}
        <nav className="container-shared mb-12 flex flex-col items-center border-t border-ink/10 pt-8">
          <div className="flex space-x-6 text-sm font-medium">
            <a
              href={`/collection/${prevProduct!.slug}`}
              className="flex items-center gap-2 hover:text-ink"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </a>
            <a
              href={`/collection/${nextProduct!.slug}`}
              className="flex items-center gap-2 hover:text-ink"
            >
              <span>Next</span>
              <ChevronRight size={24} />
            </a>
          </div>
          <Link
            href="/collection"
            className="mt-4 text-sm text-muted hover:text-ink"
          >
            View all pieces
          </Link>
        </nav>
      </main>

      {/* Mobile Sticky Actions */}
      <div className="hidden md:block">
        {/* Desktop: we keep the existing floating button (not modified here) */}
      </div>
      <div className="md:hidden">
        <div data-product-actions className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg z-40">
          <div className="text-base font-semibold mb-2">
            {formatIDR(product.price)}
          </div>
          <div className="flex w-full gap-2">
            <Button
              variant="primary"
              className="flex-1 px-3 py-3 tracking-wide"
              onClick={() => {
                const link = getWhatsAppOrderLink();
                if (link !== "#") {
                  window.open(link, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <Send size={18} />
              Order via WhatsApp
            </Button>
            <Button
              variant="secondary"
              className="px-3 py-3 tracking-wide"
              onClick={() => setIsVisitDialogOpen(true)}
            >
              Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Visit Dialog */}
      <VisitDialog
        isOpen={isVisitDialogOpen}
        onRequestClose={() => setIsVisitDialogOpen(false)}
        product={product}
        siteConfig={siteConfig}
      />
    </>
  );
}
