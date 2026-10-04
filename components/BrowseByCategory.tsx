"use client";

import { motion } from "motion/react";
import SmartImage from "@/components/SmartImage";
import { imageRegistry } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Outerwear",
    count: "12 Pieces",
    imageKey: "outerwear",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Knitwear",
    count: "8 Pieces",
    imageKey: "knitwear",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Trousers",
    count: "6 Pieces",
    imageKey: "trousers",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Accessories",
    count: "4 Pieces",
    imageKey: "accessories",
    span: "lg:col-span-2 lg:row-span-1",
  },
];

export default function BrowseByCategory() {
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
            Shop by Category
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
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden bg-gray-100 ${cat.span}`}
            >
              <SmartImage
                src={
                  imageRegistry.category[
                    cat.imageKey as keyof typeof imageRegistry.category
                  ]?.src || "/images/placeholder.jpg"
                }
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
                  {cat.count}
                </p>
                <div className="inline-flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold">Browse</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
