"use client";

import { motion } from "motion/react";
import SmartImage from "@/components/SmartImage";
import { imageRegistry } from "@/lib/images";

const articles = [
  {
    category: "Fabric",
    title: "The Art of Merino: A Journey to Tasmania",
    excerpt: "Exploring the heritage mills where our signature fabric originates and the craftspeople who preserve traditional weaving techniques.",
    date: "Oct 15, 2024",
    readTime: "5 min read",
    imageKey: "01",
  },
  {
    category: "Sustainability",
    title: "Our 5-Year Repair Commitment",
    excerpt: "How we're building a more responsible fashion future by standing behind every piece we create for the lifetime of its wearer.",
    date: "Oct 8, 2024",
    readTime: "4 min read",
    imageKey: "02",
  },
  {
    category: "Behind the Scenes",
    title: "Meet the Artisans",
    excerpt: "Stories from the 14 craftspeople and atelier teams who bring VELVET pieces to life with precision and dedication.",
    date: "Sep 30, 2024",
    readTime: "6 min read",
    imageKey: "03",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="py-20 md:py-28 bg-white scroll-mt-24">
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
              Stories
            </small>
            <h2 className="text-4xl md:text-5xl font-600 mt-4">
              From Our Journal
            </h2>
          </div>
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            className="mt-6 md:mt-0 btn-text"
            rel="noopener noreferrer"
          >
            Read All Stories →
          </motion.a>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col h-full"
              rel="noopener noreferrer"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gray-100 mb-6 overflow-hidden">
                <SmartImage
                  src={
                    imageRegistry.journal[
                      article.imageKey as keyof typeof imageRegistry.journal
                    ]?.src || "/images/placeholder.jpg"
                  }
                  alt={article.title}
                  label={article.category}
                  aspectRatio="16/9"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <small style={{ color: "var(--accent)" }} className="font-semibold uppercase tracking-wider mb-3">
                {article.category}
              </small>
              <h3 className="text-lg font-600 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm mb-6 flex-1" style={{ color: "var(--muted)" }}>
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
