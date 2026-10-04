"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    quote: "VELVET pieces are designed with intention. They're the foundation of my wardrobe.",
    author: "Sarah M.",
    role: "Stylist",
  },
  {
    quote: "Finally, a brand that understands quality transcends trends.",
    author: "James L.",
    role: "Creative Director",
  },
  {
    quote: "The craftsmanship is evident in every detail. These are pieces I'll own for years.",
    author: "Elena R.",
    role: "Architect",
  },
];

const supportingQuotes = [
  "Exceptional quality and attention to detail.",
  "Timeless design that doesn't go out of style.",
  "Worth the investment.",
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Testimonials
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">What People Say</h2>
        </motion.div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl" style={{ color: "var(--accent)" }}>
                ★
              </span>
            ))}
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Trusted by 1000+ customers
          </p>
        </motion.div>

        {/* Rotating Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <blockquote className="font-serif italic text-2xl md:text-3xl mb-8 leading-relaxed">
              "{testimonials[current].quote}"
            </blockquote>
            <div>
              <p className="font-semibold">{testimonials[current].author}</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {testimonials[current].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 my-12"
        >
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all ${
                idx === current ? "w-6 h-2" : "w-2 h-2"
              }`}
              style={{
                backgroundColor:
                  idx === current ? "var(--ink)" : "var(--line)",
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* Supporting Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-12 border-t grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          style={{ borderColor: "var(--line)" }}
        >
          {supportingQuotes.map((quote, idx) => (
            <p key={idx} className="text-sm italic" style={{ color: "var(--muted)" }}>
              "{quote}"
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
