"use client";

import { motion } from "motion/react";

const craftItems = [
  {
    number: "01",
    title: "Premium Fabrics",
    description:
      "Sourced from heritage mills, our materials are selected for durability and aesthetic purity.",
    facts: ["12 partner mills", "100% traceable", "Fair trade certified"],
  },
  {
    number: "02",
    title: "Intentional Design",
    description:
      "Every silhouette is refined through careful consideration of proportion and construction.",
    facts: ["3-season design cycle", "Timeless silhouettes", "Zero fast fashion"],
  },
  {
    number: "03",
    title: "Sustainable Practices",
    description:
      "We partner with ethical manufacturers who prioritize fair labor and environmental responsibility.",
    facts: ["Plastic-free packaging", "Carbon-neutral shipping", "5-year repair program"],
  },
];

export default function Craft() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="craft"
      className="py-20 md:py-28"
      style={{
        backgroundColor: "var(--color-inverse-bg)",
        color: "var(--color-inverse-ink)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <small className="text-xs font-semibold uppercase tracking-widest opacity-70">
            Our Values
          </small>
          <h2 className="mt-4 text-4xl md:text-5xl font-600 leading-tight">
            Crafted Philosophy
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
        >
          {craftItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`py-12 md:py-16 px-0 ${
                idx !== craftItems.length - 1
                  ? "border-b md:border-b-0 md:border-r md:pl-8"
                  : ""
              }`}
              style={{
                borderColor: "rgba(236, 229, 218, 0.2)",
              }}
            >
              <div className="font-serif text-7xl md:text-8xl font-light opacity-40 mb-8 leading-none">
                {item.number}
              </div>
              <h3 className="text-2xl md:text-3xl font-600 mb-4">
                {item.title}
              </h3>
              <p className="opacity-80 leading-relaxed mb-6 max-w-xs">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.facts.map((fact, i) => (
                  <li key={i} className="text-sm opacity-70">
                    • {fact}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-12 border-t grid grid-cols-3 gap-8"
          style={{ borderColor: "rgba(236, 229, 218, 0.2)" }}
        >
          <div>
            <div className="text-2xl md:text-3xl font-600 mb-1">12</div>
            <p className="text-sm opacity-70">Heritage Mills</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-600 mb-1">100%</div>
            <p className="text-sm opacity-70">Traceable</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-600 mb-1">5-Year</div>
            <p className="text-sm opacity-70">Repair Program</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
