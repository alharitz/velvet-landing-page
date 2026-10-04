"use client";

import { motion } from "motion/react";
import { fabricImages } from "@/lib/images.generated";
import FabricTexture from "./FabricTexture";

const fabrics = [
  {
    name: "Merino Wool",
    origin: "Tasmania, Australia",
    weight: "200gsm",
    feel: "Soft, breathable, temperature-regulating",
    care: "Gentle wash, lay flat to dry",
    color: "#9A6B4F",
  },
  {
    name: "Selvedge Denim",
    origin: "Okayama, Japan",
    weight: "13.5oz",
    feel: "Crisp, structured, develops character",
    care: "Cold wash, air dry",
    color: "#2C3E50",
  },
  {
    name: "Organic Cotton",
    origin: "India",
    weight: "140gsm",
    feel: "Lightweight, soft, breathable",
    care: "Warm wash, tumble dry",
    color: "#ECE5DA",
  },
  {
    name: "Cashmere Blend",
    origin: "Inner Mongolia",
    weight: "180gsm",
    feel: "Luxurious, warm, delicate",
    care: "Hand wash, dry flat",
    color: "#D4A574",
  },
];

export default function FabricLibrary() {
  return (
    <section className="py-20 md:py-28 bg-white">
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
            Materials
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">
            Fabric Library
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {fabrics.map((fabric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              {/* Swatch */}
{/* Swatch */}
                <div className="relative aspect-square overflow-hidden bg-[var(--surface)] group">
                  {fabricImages["fabric-"+fabric.name.toLowerCase().replace(/ /g,"-")] ? (
                    <img
                      // eslint-disable-next-line @next/next/no-img-element
                      src={fabricImages["fabric-"+fabric.name.toLowerCase().replace(/ /g,"-")] as string}
                      alt={`Close-up of ${fabric.name.toLowerCase()} texture`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      decoding="async"
                      onError={(e)=>{console.error('Fabric img error',e.currentTarget.src);}}
                    />
                  ) : (
                    <FabricTexture fabricKey={"fabric-"+fabric.name.toLowerCase().replace(/ /g,"-")} />
                  )}
                </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-2">{fabric.name}</h3>
              <div className="space-y-3 text-sm flex-1">
                <div>
                  <small style={{ color: "var(--muted)" }}>Origin</small>
                  <p className="text-xs">{fabric.origin}</p>
                </div>
                <div>
                  <small style={{ color: "var(--muted)" }}>Weight</small>
                  <p className="text-xs">{fabric.weight}</p>
                </div>
                <div>
                  <small style={{ color: "var(--muted)" }}>Feel</small>
                  <p className="text-xs">{fabric.feel}</p>
                </div>
                <div>
                  <small style={{ color: "var(--muted)" }}>Care</small>
                  <p className="text-xs">{fabric.care}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
