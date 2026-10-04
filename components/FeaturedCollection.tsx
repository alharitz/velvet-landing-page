"use client";

import { motion } from "motion/react";
import SmartImage from "@/components/SmartImage";
import { products, formatIDR } from "@/lib/products";
import { imageRegistry } from "@/lib/images";
import { waLink } from "@/lib/site-config";
import { FaWhatsapp } from "react-icons/fa6";

export default function FeaturedCollection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="collection" className="py-20 md:py-28 bg-white scroll-mt-24">
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
            Featured
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">
            Current Collection
          </h2>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => {
            const img = imageRegistry.collection[
              product.imageKey as keyof typeof imageRegistry.collection
            ];
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="flex flex-col"
              >
                {/* Image */}
                <div className="relative mb-6 overflow-hidden bg-gray-100">
                  <SmartImage
                    src={img?.src || "/images/placeholder.jpg"}
                    alt={product.name}
                    label={product.name}
                    aspectRatio="3/4"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <h4 className="text-lg font-600 mb-2">{product.name}</h4>
                <p style={{ color: "var(--muted)" }} className="text-sm mb-4">
                  {product.fabricLine}
                </p>
                <p className="font-semibold mb-4">{formatIDR(product.price)}</p>

                {/* Color Swatches */}
                <div className="flex gap-2 mb-6">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-300 transition-transform hover:scale-125"
                      style={{ backgroundColor: color }}
                      title={`Color option ${i + 1}`}
                      aria-label={`Color ${i + 1}`}
                    />
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={waLink(product.name)}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm font-semibold transition-all"
                  style={{
                    backgroundColor: "var(--ink)",
                    color: "var(--background)",
                  }}
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={16} />
                  Ask on WhatsApp
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
