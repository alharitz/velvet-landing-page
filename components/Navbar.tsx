"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig, waLink } from "@/lib/site-config";
import { collectionUrl, homeUrl, storyAnchor, craftAnchor, journalAnchor, visitAnchor } from "@/lib/routes";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const navLinks = [
    { label: "Collection", href: collectionUrl() },
    { label: "Story", href: homeUrl === pathname ? storyAnchor : `/${storyAnchor}` },
    { label: "Craft", href: homeUrl === pathname ? craftAnchor : `/${craftAnchor}` },
    { label: "Journal", href: homeUrl === pathname ? journalAnchor : `/${journalAnchor}` },
    { label: "Visit", href: homeUrl === pathname ? visitAnchor : `/${visitAnchor}` },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-8 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide text-black"
          >
            VELVET
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.label === "Collection" && pathname?.startsWith("/collection");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-accent" : "text-black hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp size={16} />
              Where to Buy
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3 6h18M3 12h18M3 18h18"
                }
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white/95 border-t border-light py-4"
            >
              <div className="space-y-3 px-2">
                {navLinks.map((link) => {
                  const isActive = link.label === "Collection" && pathname?.startsWith("/collection");
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block text-sm font-medium py-2 ${
                        isActive ? "text-accent" : "text-black hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-light pt-3 mt-3 space-y-2">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block btn-primary text-center"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-xs text-text-secondary px-2">
                  {siteConfig.whatsapp.display}
                </p>
                <p className="text-xs text-text-secondary px-2">
                  {siteConfig.whatsapp.hours}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}