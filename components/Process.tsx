"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Source",
    description: "We work with heritage mills and ethical suppliers to find the finest materials.",
  },
  {
    number: "02",
    title: "Weave",
    description: "Master craftspeople create our fabrics using time-honored techniques.",
  },
  {
    number: "03",
    title: "Cut & Sew",
    description: "Our atelier carefully constructs each piece with precision and care.",
  },
  {
    number: "04",
    title: "Finish",
    description: "Quality checks ensure every garment meets our exacting standards.",
  },
];

export default function Process() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            How We Work
          </small>
          <h2 className="text-4xl md:text-5xl font-600 mt-4">
            From Mill to Wardrobe
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ backgroundColor: "var(--line)" }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div
                    className="inline-block text-5xl md:text-6xl font-light opacity-20 mb-4"
                    style={{ color: "var(--ink)" }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-600 mb-4">{step.title}</h3>
                  <p style={{ color: "var(--muted)" }}>{step.description}</p>
                </div>

                {/* Dot */}
                <div className="hidden md:flex flex-1 justify-center">
                  <div
                    className="w-4 h-4 rounded-full mt-6"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
