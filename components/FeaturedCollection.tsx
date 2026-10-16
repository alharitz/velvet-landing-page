"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SmartImage from "@/components/SmartImage";
import { getAllProducts, formatIDR } from "@/lib/products";
import { buildProductInquiryLink } from "@/lib/whatsapp";
import { ROUTES } from "@/lib/routes";
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

  const products = getAllProducts();

  return (
    <section id="collection" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */} 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Featured
            </small>
            <h2 className="text-4xl md:text-5xl font-600 mt-4">
              Current Collection
            </h2>
          </div>
          <Link href={ROUTES.collection} className="mt-6 md:mt-0 text-sm font-semibold text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors">
            Explore the Full Collection
          </Link>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.slug}
              variants={itemVariants}
              className="flex flex-col"
            >
              {/* Image */}
              <div className="relative mb-6 overflow-hidden bg-gray-100">
                <SmartImage
                  src={product.images[0]?.src || "/images/placeholder.jpg"}
                  alt={product.name}
                  label={product.name}
                  aspectRatio="3/4"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-600 mb-2">{product.name}</h3>
              <p style={{ color: "var(--muted)" }} className="text-sm mb-4">
                {product.material}
              </p>
              <p className="font-semibold mb-4">{formatIDR(product.price)}</p>

              {/* CTA Button */}
              <a
                href={buildProductInquiryLink(product.name)}
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
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href={ROUTES.collection} className="btn-primary inline-flex items-center gap-2">
            Explore the Full Collection &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}