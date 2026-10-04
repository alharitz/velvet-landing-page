"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type FaqItem = { question: string; answer: string };

const items: FaqItem[] = [
  {
    question: "How do I order from VELVET?",
    answer: `We offer two ways to order: 1) Chat with us on WhatsApp at ${siteConfig.whatsapp.display} (${siteConfig.whatsapp.hours}), or 2) Browse our official marketplace stores on Shopee, Tokopedia, Lazada, TikTok Shop, and Blibli. Our team will help you find the perfect pieces and confirm pricing and availability.`,
  },
  {
    question: "What are your sizing options?",
    answer: "We offer sizes XS to XL in most styles. For detailed measurements and fit guidance, please chat with us on WhatsApp. We can also help with custom adjustments for a perfect fit.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping times vary by location and selected method. Orders via WhatsApp can be arranged for pickup or courier delivery. Marketplace orders follow each platform's standard shipping timelines. We'll provide estimated delivery times when you order.",
  },
  {
    question: "Can I exchange or return items?",
    answer: "Yes! We stand behind every piece. Exchanges are available within 30 days of purchase. All our pieces also come with our 5-year repair program. Contact us on WhatsApp or via the marketplace platform to arrange an exchange.",
  },
  {
    question: "How do I care for my VELVET pieces?",
    answer: "Care instructions are included with every garment. In general: wash delicates in cool water, use mild detergent, and lay flat to dry. For specific fabrics like merino wool or cashmere, we provide detailed care guides. Feel free to ask us for specific recommendations.",
  },
  {
    question: "Are your pieces sustainable?",
    answer: "Sustainability is central to VELVET. We source from heritage mills, work with ethical manufacturers, use plastic‑free packaging, and offer lifetime repairs. Every purchase is an investment in quality that lasts—a more responsible approach to fashion.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="scroll-mt-24 bg-[var(--background)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Questions
            </small>
            <h2 className="text-4xl md:text-5xl font-600 mt-4">
              Frequently Asked
            </h2>
            <p className="mt-2 text-[var(--muted)]">Common queries from our customers.</p>
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const buttonId = `${baseId}-q-${idx}`;
              const panelId = `${baseId}-a-${idx}`;
              return (
                <li
                  key={item.question}
                  className={`border bg-[var(--background)] transition-colors duration-300 ${isOpen ? "border-[var(--accent)]" : "border-[var(--line)]"}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
                    >
                      <span className="text-xl font-serif">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[var(--accent)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-[var(--line)] px-6 py-5 text-[var(--muted)] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
