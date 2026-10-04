"use client";

import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig, waLink } from "@/lib/site-config";

export default function WhereToBuy() {
  return (
    <section id="where-to-buy" className="py-20 md:py-28 scroll-mt-24" style={{ backgroundColor: "var(--inverse-bg)", color: "var(--inverse-ink)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <small className="text-xs font-semibold uppercase tracking-widest opacity-70">
            How to Order
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">Where to Buy</h2>
          <p className="text-lg opacity-80 mt-6 max-w-2xl">
            VELVET is a showcase collection. We take orders personally on WhatsApp, and our pieces are also available in our official marketplace stores.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left: WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between p-8 md:p-12 border"
            style={{ borderColor: "rgba(236, 229, 218, 0.2)" }}
          >
            <div>
              <FaWhatsapp size={40} className="mb-6" />
              <h3 className="text-2xl md:text-3xl font-600 mb-4">
                Chat on WhatsApp
              </h3>
              <p className="text-base opacity-80 mb-2">
                {siteConfig.whatsapp.display}
              </p>
              <p className="text-sm opacity-60 mb-8">
                {siteConfig.whatsapp.hours}
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-primary w-full text-center"
              >
                Start Conversation
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-dark-secondary w-full text-center"
              >
                Send an Email
              </a>
            </div>
          </motion.div>

          {/* Right: Marketplace Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {siteConfig.marketplaces.map((mp) => (
                <motion.a
                  key={mp.key}
                  href={mp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="p-6 md:p-8 border flex flex-col justify-between group"
                  style={{ borderColor: "rgba(236, 229, 218, 0.2)" }}
                >
                  <div>
                    <p className="text-sm opacity-60 mb-2">Official Store</p>
                    <h4 className="text-lg font-600">{mp.name}</h4>
                  </div>
                  <div className="text-lg opacity-0 group-hover:opacity-100 transition-opacity mt-4">
                    ↗
                  </div>
                </motion.a>
              ))}
            </div>

            <p className="text-xs opacity-60 mt-8">
              Prices and availability are confirmed on WhatsApp and in each store.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
