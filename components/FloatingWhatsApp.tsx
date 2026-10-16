"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig, waLink } from "@/lib/site-config";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const isProduct = pathname.startsWith("/collection/");
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      className={`${isProduct ? "hidden md:flex" : "flex"} fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-14 h-14 rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}
      style={{
        backgroundColor: "var(--ink)",
        color: "var(--background)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Chat on WhatsApp"
      title={`Chat on WhatsApp: ${siteConfig.whatsapp.display}`}
    >
      <FaWhatsapp size={24} />
    </motion.a>
  );
}
