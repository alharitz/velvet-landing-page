"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const faqItems = [
  {
    question: "How do I order from VELVET?",
    answer: `We offer two ways to order: 1) Chat with us on WhatsApp at ${siteConfig.whatsapp.display} (${siteConfig.whatsapp.hours}), or 2) Browse our official marketplace stores on Shopee, Tokopedia, Lazada, TikTok Shop, and Blibli. Our team will help you find the perfect pieces and confirm pricing and availability.`,
  },
  {
    question: "What are your sizing options?",
    answer:
      "We offer sizes XS to XL in most styles. For detailed measurements and fit guidance, please chat with us on WhatsApp. We can also help with custom adjustments for a perfect fit.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary by location and selected method. Orders via WhatsApp can be arranged for pickup or courier delivery. Marketplace orders follow each platform's standard shipping timelines. We'll provide estimated delivery times when you order.",
  },
  {
    question: "Can I exchange or return items?",
    answer:
      "Yes! We stand behind every piece. Exchanges are available within 30 days of purchase. All our pieces also come with our 5-year repair program. Contact us on WhatsApp or via the marketplace platform to arrange an exchange.",
  },
  {
    question: "How do I care for my VELVET pieces?",
    answer:
      "Care instructions are included with every garment. In general: wash delicates in cool water, use mild detergent, and lay flat to dry. For specific fabrics like merino wool or cashmere, we provide detailed care guides. Feel free to ask us for specific recommendations.",
  },
  {
    question: "Are your pieces sustainable?",
    answer:
      "Sustainability is central to VELVET. We source from heritage mills, work with ethical manufacturers, use plastic-free packaging, and offer lifetime repairs. Every purchase is an investment in quality that lasts—a more responsible approach to fashion.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Questions
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">
            Frequently Asked
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          {faqItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="w-full flex items-center justify-between p-4 md:p-6 border border-b-2 transition-colors hover:bg-gray-50"
                style={{
                  borderColor:
                    openIndex === idx ? "var(--accent)" : "var(--line)",
                  borderBottomColor: "var(--line)",
                }}
              >
                <h3 className="text-left font-semibold text-lg">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} style={{ color: "var(--accent)" }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border border-t-0 border-b-2 p-4 md:p-6"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <p style={{ color: "var(--muted)" }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
