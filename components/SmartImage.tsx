"use client";

import { useRef, useState } from "react";
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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  const handleError = () => {
    setFailedSrc(src);
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[SmartImage] failed (onError):', src);
    }
  };

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
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
        key={src}
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
