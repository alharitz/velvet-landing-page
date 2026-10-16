"use client";

import { motion } from "motion/react";
import { MessageCircle, Store, Scissors, Leaf } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "Personal Ordering",
    subtitle: "Chat with us on WhatsApp",
  },
  {
    icon: Store,
    title: "Official Stores",
    subtitle: "Also on Shopee, Tokopedia, Lazada",
  },
  {
    icon: Scissors,
    title: "Lifetime Repairs",
    subtitle: "We fix what we make",
  },
  {
    icon: Leaf,
    title: "Plastic-Free",
    subtitle: "100% sustainable packaging",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center md:text-left"
              >
                <Icon
                  size={32}
                  className="mb-4 mx-auto md:mx-0"
                  style={{ color: "var(--accent)" }}
                />
                <h2 className="mb-2" style={{ color: "var(--ink)" }}>
                  {benefit.title}
                </h2>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {benefit.subtitle}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}