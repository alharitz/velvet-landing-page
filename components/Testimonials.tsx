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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Testimonials
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">What People Say</h2>
        </motion.div>

        {/* Rating Summary */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl" style={{ color: "var(--accent)" }}>
                ★
              </span>
            ))}
          </div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Sample reviews
          </p>
        </motion.div>

        {/* Rotating Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
            className="mb-12"
          >
            <blockquote className="font-serif italic text-2xl md:text-3xl mb-8 leading-relaxed">
              &ldquo;{testimonials[current].quote}&rdquo;
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
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0, delay: 0 } : { duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 my-12"
        >
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              aria-current={idx === current ? "true" : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-full"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-all ${idx === current ? "h-2 w-6" : "h-2 w-2"}`}
                style={{ backgroundColor: idx === current ? "var(--ink)" : "var(--line)" }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Supporting Quotes */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0, delay: 0 } : { duration: 0.6, delay: 0.2 }}
          className="pt-12 border-t grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          style={{ borderColor: "var(--line)" }}
        >
          {supportingQuotes.map((quote, idx) => (
            <p key={idx} className="text-sm italic" style={{ color: "var(--muted)" }}>
              &ldquo;{quote}&rdquo;
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
