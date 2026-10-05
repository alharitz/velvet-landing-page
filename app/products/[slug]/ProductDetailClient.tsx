"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ExternalLink, MapPin, Clock, Send, ShoppingBag } from "lucide-react";
import { Button } from "@/components/Button";
import { formatIDR, type Product, type MarketplaceLink } from "@/lib/products";
import { siteConfig, waLink, mapLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product | undefined;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") setCurrentImageIndex((i) => (i - 1 + product.images.length) % product.images.length);
      if (e.key === "ArrowRight") setCurrentImageIndex((i) => (i + 1) % product.images.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, product]);

  if (!product) {
    return (
      <div className="container-shared py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Button variant="primary" onClick={() => window.history.back()}>Back to Catalog</Button>
      </div>
    );
  }

  const goToPrev = () => setCurrentImageIndex((i) => (i - 1 + product.images.length) % product.images.length);
  const goToNext = () => setCurrentImageIndex((i) => (i + 1) % product.images.length);

  const getMarketplaceButtons = (links: MarketplaceLink | undefined) => {
    if (!links) return null;
    const entries = Object.entries(links) as [keyof MarketplaceLink, string][];
    return entries.map(([key, url]) => {
      const marketplace = siteConfig.marketplaces.find((m: { key: string }) => m.key === key);
      return (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 border border-ink/20 hover:bg-ink/5 transition-colors rounded-full text-sm font-medium"
        >
          <ShoppingBag size={16} />
          {marketplace?.name ?? key}
          <ExternalLink size={14} />
        </a>
      );
    });
  };

  return (
    <article className="pt-12 pb-20">
      {/* Gallery Section */}
      <section className="container-shared mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[3/4] bg-gray-50 overflow-hidden"
          >
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-ink transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background text-ink transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={cn(
                      "w-16 h-12 rounded overflow-hidden border-2 transition-all",
                      i === currentImageIndex ? "border-ink" : "border-transparent hover:border-ink/30"
                    )}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === currentImageIndex ? "true" : "false"}
                  >
                    <Image
                      src={product.images[i]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between lg:sticky lg:top-24"
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

              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                {product.description}
              </p>

              {/* Details list */}
              <div className="space-y-3 mb-8 border-t border-ink/10 pt-6">
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
                  <MapPin size={16} className="flex-shrink-0" />
                  <span>Available at our Jakarta store</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
                  <Clock size={16} className="flex-shrink-0" />
                  <span>{siteConfig.storeHours}</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
                  <Send size={16} className="flex-shrink-0" />
                  <span>WhatsApp: {siteConfig.whatsapp.display} ({siteConfig.whatsapp.hours})</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => window.open(waLink(`Halo VELVET, saya tertarik dengan "${product.name}" (${formatIDR(product.price)}). Apakah masih tersedia?`), "_blank")}
                >
                  <Send size={18} />
                  Inquire via WhatsApp
                </Button>

                <div className="flex flex-wrap gap-2">
                  {getMarketplaceButtons(product.marketplaceLinks)}
                </div>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(mapLink(), "_blank")}
                >
                  <MapPin size={18} />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Social proof / trust signals */}
            <div className="mt-8 pt-8 border-t border-ink/10 flex items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
              <div className="flex items-center gap-1">
                <ShoppingBag size={14} />
                <span>Available on major marketplaces</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} - Image ${currentImageIndex + 1} of ${product.images.length}`}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[90vh] relative"
          >
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              width={1200}
              height={1600}
              className="object-contain"
              sizes="90vw"
            />
            <p className="text-white/60 text-center mt-4 text-sm">
              {currentImageIndex + 1} / {product.images.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </motion.div>
      )}

      {/* Click handler on main image to open modal */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const mainImage = document.querySelector('[data-product-main-image]');
              const openModal = () => window.dispatchEvent(new CustomEvent('open-product-modal'));
              if (mainImage) mainImage.addEventListener('click', openModal);
            })();
          `,
        }}
      />
    </article>
  );
}