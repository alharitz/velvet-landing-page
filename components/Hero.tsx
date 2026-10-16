"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { storyAnchor, collectionUrl } from "@/lib/routes";

export default function Hero() {
  const router = useRouter();
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
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
        className="relative z-10 container-shared pt-20 pb-20 md:pb-32"
      >
        <div className="max-w-2xl pt-[96px]">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
          >
            <small className="text-inverse">{siteConfig.hero.eyebrow}</small>
          </motion.div>
          
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.5 }}
            className="text-inverse mt-6 mb-6 [line-clamp:2] [display:-webkit-box] [-webkit-box-orient:vertical]"
          >
            {siteConfig.hero.title}
          </motion.h1>
          
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
            className="text-inverse max-w-lg mb-10"
          >
            {siteConfig.hero.subtext}
          </motion.p>
          
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <Button variant="on-dark-primary" onClick={() => router.push(collectionUrl())}>Explore Collection</Button>
            <Button variant="on-dark-secondary" onClick={() => router.push(storyAnchor)}>Our Story</Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20 text-inverse"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
