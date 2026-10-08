"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { siteConfig, waLink } from "@/lib/site-config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  type LinkItem = { label: string; href?: string; isText?: boolean };

  const links: Record<string, LinkItem[]> = {
    Collection: [
      { label: "Outerwear", href: "/collection?category=outerwear" },
      { label: "Knitwear", href: "/collection?category=knitwear" },
      { label: "Trousers", href: "/collection?category=trousers" },
      { label: "Essentials", href: "/collection?category=essentials" },
    ],
    Company: [
      { label: "Our Story", href: "/#story" },
      { label: "Craft", href: "/#craft" },
      { label: "Journal", href: "/#journal" },
      { label: "Visit Us", href: "/#visit" },
    ],
    "Where to Buy": [
      { label: "WhatsApp", href: waLink() },
      ...siteConfig.marketplaces.map((mp: { name: string; url: string }) => ({
        label: mp.name,
        href: mp.url,
      })),
    ],
    Contact: [
      { label: siteConfig.address.line1, href: undefined, isText: true },
      { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
      { label: siteConfig.whatsapp.display, href: waLink() },
    ],
  };

  return (
    <footer
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--inverse-bg)", color: "var(--inverse-ink)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Wordmark & Back to Top */}
        <div className="flex items-start justify-between mb-16 md:mb-24">
          <div className="font-serif text-5xl md:text-7xl font-light tracking-widest">
            VELVET
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity"
          >
            ↑ Back to Top
          </button>
        </div>

        {/* Brand Description */}
        <p className="max-w-md opacity-70 mb-16 md:mb-24">
          A curated showcase of minimalist luxury. Pieces designed to endure—in quality, in style, and in purpose.
        </p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 md:mb-24 pb-16 md:pb-24 border-t" style={{ borderColor: "rgba(236, 229, 218, 0.2)" }}>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.label}>
                    {link.isText ? (
                      <span className="text-sm opacity-60">{link.label}</span>
                    ) : (
                      <Link
                        href={link.href as string}
                        target={link.href?.startsWith("http") ? "_blank" : undefined}
                        rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6 mb-12 pb-12 border-b" style={{ borderColor: "rgba(236, 229, 218, 0.2)" }}>
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={siteConfig.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <FaTiktok size={20} />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs opacity-40">
          © {currentYear} {siteConfig.name}. Showcase site. Orders via WhatsApp and official stores.
        </p>
      </div>
    </footer>
  );
}
