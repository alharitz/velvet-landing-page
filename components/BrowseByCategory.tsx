"use client";

import { motion } from "motion/react";
import SmartImage from "@/components/SmartImage";
import { imageRegistry } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";
import { getCategoriesWithCounts } from "@/lib/products";
import Link from "next/link";
import { collectionUrl } from "@/lib/routes";

export default function BrowseByCategory() {
  const categories = getCategoriesWithCounts();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Browse by Category
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">
            Browse the Collection
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]"
        >
          {categories.map((cat) => {
            const spanMap: Record<string, string> = {
              Outerwear: "lg:col-span-2 lg:row-span-2",
              Knitwear: "lg:col-span-1 lg:row-span-1",
              Trousers: "lg:col-span-1 lg:row-span-1",
              Essentials: "lg:col-span-2 lg:row-span-1",
            };
            const span = spanMap[cat.name] ?? "lg:col-span-1 lg:row-span-1";
            // Essentials uses existing accessories visual; no placeholder request or invented image.
            const imageKey = cat.name === "Essentials" ? "accessories" : cat.name.toLowerCase();
            const categoryImage = imageRegistry.category[
              imageKey as keyof typeof imageRegistry.category
            ];

            return (
              <Link
                key={cat.name}
                href={collectionUrl(cat.name.toLowerCase())}
                className={`group relative overflow-hidden bg-gray-100 ${span} block`}
              >
                <SmartImage
                  src={categoryImage?.src || "/images/placeholder.jpg"}
                  alt={cat.name}
                  label={cat.name}
                  className="group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-start justify-end p-6">
                  <h3 className="text-white text-xl md:text-2xl font-600 mb-2 text-left">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 text-left">
                    {cat.count} {cat.count === 1 ? "Piece" : "Pieces"}
                  </p>
                  <div className="inline-flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">Browse</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
