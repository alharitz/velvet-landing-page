"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface SmartImageProps {
  src: string;
  alt: string;
  label: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
}

export default function SmartImage({
  src,
  alt,
  label,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
  aspectRatio = "3/4",
}: SmartImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
    // Check for images that failed before hydration
    if (imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  const handleError = () => {
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className={`relative w-full bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8] flex items-end justify-start overflow-hidden ${className}`}
        style={{
          aspectRatio: aspectRatio,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.05) 2px,
              rgba(255, 255, 255, 0.05) 4px
            )
          `,
        }}
      >
        <p className="text-xs uppercase tracking-widest text-gray-400 p-2 font-light">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={handleError}
      />
    </div>
  );
}
