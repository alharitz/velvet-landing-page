"use client";
import { useState } from "react";

import Image from "next/image";
import { lookbookImages as generatedLookbook } from "@/lib/images.generated";
import { looks } from "@/lib/lookbook";
import { Pause, Play } from "lucide-react";

const lookbookImages = looks
  .map((l) => {
    const img = generatedLookbook.find((i) => i.key === l.key);
    return img ? { ...l, src: img.src } : null;
  })
  .filter((i): i is typeof i & { src: string } => i !== null);

export default function Lookbook() {
  const [paused, setPaused] = useState(false);
  const toggle = () => setPaused((p) => !p);

  const renderSet = (hidden: boolean) =>
    lookbookImages.map((img, idx) => (
      <div
        key={idx + (hidden ? "b" : "a")}
        className={`relative flex-shrink-0 overflow-hidden bg-[var(--surface)] h-[380px] md:h-[500px] ${idx % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}`}
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : undefined}
      >
        <Image
          src={img.src}
          alt={img.title}
          fill
          sizes={idx % 2 === 0 ? "(min-width: 768px) 375px, 285px" : "(min-width: 768px) 400px, 304px"}
          className="object-cover"
        />
        <div className="mt-2 text-sm uppercase">Look {(idx + 1).toString().padStart(2, "0")}</div>
        <div className="text-xs">{img.copy}</div>
      </div>
    ));

  return (
    <section className="section-space bg-background overflow-hidden">
      <div className="container-shared">
        <h2 className="mb-4">Seasonal Lookbook</h2>
        <button
          onClick={toggle}
          aria-label={paused ? "Play" : "Pause"}
          aria-pressed={paused}
          className="ml-auto"
        >
          {paused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
      <div
        className="carousel"
        data-paused={paused}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="track">
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
    </section>
  );
}
