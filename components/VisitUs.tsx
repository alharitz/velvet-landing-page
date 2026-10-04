"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { siteConfig, waLink, mapLink, mapEmbedUrl } from "@/lib/site-config";

export default function VisitUs() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.message.trim()) {
      const msg = `Hi VELVET, from ${formData.name}: ${formData.message}`;
      window.open(waLink(msg), "_blank");
      setFormData({ name: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section id="visit" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Find Us
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">Visit Our Store</h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Contact Info & Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <MapPin size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold">{siteConfig.address.line1}</p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {siteConfig.address.line2}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <div>
                  <p className="font-semibold">Store Hours</p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {siteConfig.storeHours}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col"
                >
                  <p className="font-semibold hover:text-accent transition-colors">
                    {siteConfig.whatsapp.display}
                  </p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {siteConfig.whatsapp.hours}
                  </p>
                </a>
              </div>

              <div className="flex gap-4">
                <Mail size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-accent transition-colors"
                >
                  <p className="font-semibold">{siteConfig.email}</p>
                </a>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href={mapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block mb-12"
            >
              Get Directions
            </a>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-3 border"
                  style={{ borderColor: "var(--line)" }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 border"
                  style={{ borderColor: "var(--line)" }}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send via WhatsApp
              </button>
              {submitted && (
                <p className="text-sm text-green-600">
                  ✓ Message opened on WhatsApp
                </p>
              )}
            </form>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              width="100%"
              height="420"
              style={{
                border: `1px solid var(--line)`,
                filter: "grayscale(20%) sepia(5%)",
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl()}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
