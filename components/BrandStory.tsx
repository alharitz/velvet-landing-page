"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { journalUrl } from "@/lib/routes";

export default function BrandStory() {
  return (
    <section id="story" className="section-space bg-background">
      <div className="container-shared">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images with overlap */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Main image */}
            <div className="absolute inset-0 w-3/4">
              <Image
                src="/images/story-main.jpg"
                alt="VELVET craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Secondary image - overlapping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-1/2 h-1/2"
            >
              <Image
                src="/images/story-detail.jpg"
                alt="VELVET fabric detail"
                fill
                className="object-cover border-4 border-background"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <small>Our Story</small>
            <h2 className="mt-4 mb-10">Crafted with Intention</h2>

            <p className="mb-8">
              VELVET exists for those who believe clothing should transcend trend. We create pieces designed to endure—in quality, in style, and in purpose.
            </p>

            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif italic text-lg text-muted border-l-2 border-accent pl-6 py-6 mb-10"
            >
              &ldquo;Simplicity is the ultimate sophistication. We design for those who know the difference.&rdquo;
            </motion.blockquote>

            <p className="text-muted mb-10">
              Founded on the principle that less is more, we focus on essential pieces constructed with uncompromising attention to detail. Every fabric is chosen for its integrity, every seam for its precision.
            </p>

            <Link
              href={journalUrl()}
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-ink border-b-2 border-transparent pb-1 cursor-default"
            >
              Explore the Journal
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
