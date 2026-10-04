"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const lookbookImages = [
  {
    src: "/images/lookbook-01.jpg",
    alt: "Minimalist editorial shot 1",
    width: 1,
  },
  {
    src: "/images/lookbook-02.jpg",
    alt: "Minimalist editorial shot 2",
    width: 1.2,
  },
  {
    src: "/images/lookbook-03.jpg",
    alt: "Minimalist editorial shot 3",
    width: 0.9,
  },
  {
    src: "/images/lookbook-04.jpg",
    alt: "Minimalist editorial shot 4",
    width: 1.1,
  },
  {
    src: "/images/lookbook-05.jpg",
    alt: "Minimalist editorial shot 5",
    width: 1,
  },
  {
    src: "/images/lookbook-06.jpg",
    alt: "Minimalist editorial shot 6",
    width: 1.15,
  },
];

export default function Lookbook() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="section-space bg-background overflow-hidden">
      <div className="container-shared">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <small>Editorial</small>
          <h2 className="mt-3">Seasonal Lookbook</h2>
        </motion.div>
      </div>

      {/* Scrollable Gallery */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("left")}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-background/90 p-3 hover:bg-ink hover:text-background transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("right")}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-background/90 p-3 hover:bg-ink hover:text-background transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        )}

        {/* Images Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 md:px-10 lg:px-16 pb-4 snap-x snap-mandatory"
        >
          {lookbookImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative flex-shrink-0 snap-start"
              style={{
                width: `${300 * image.width}px`,
                height: "500px",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:brightness-90 transition-all duration-500"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
