"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-end overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="VELVET minimalist fashion hero"
        fill
        className="object-cover"
        priority
        quality={90}
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 container-shared pb-20 md:pb-32"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <small className="text-inverse">SS26 Collection</small>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-inverse mt-6 mb-6"
          >
            Minimalist Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-inverse max-w-lg mb-10"
          >
            Premium fabrics, intentional design, sustainable practices. Pieces crafted to endure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <Button variant="on-dark-primary">Explore Collection</Button>
            <Button variant="on-dark-secondary">Our Story</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20 text-inverse"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
