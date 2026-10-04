"use client";

import { useEffect, useRef } from "react";

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 1;
      marquee.style.transform = `translateX(${position}px)`;

      if (Math.abs(position) > marquee.scrollWidth / 2) {
        position = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const text = "Premium Fabrics · Intentional Design · Sustainable Practices · Made to Last";

  return (
    <section className="section-space bg-background border-t border-b border-line overflow-hidden">
      <div className="relative flex whitespace-nowrap" ref={marqueeRef}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="marquee-text px-12 text-inverse-bg flex-shrink-0"
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
