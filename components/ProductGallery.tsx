"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProductGallery({ images, productName }: {
  images: { src: string; alt: string }[];
  productName: string;
}) {
  const [index, setIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const overflow = useRef("");
  const multiple = images.length > 1;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const select = (next: number) => {
    const value = (next + images.length) % images.length;
    setIndex(value);
    carousel.current?.scrollTo({ left: value * carousel.current.clientWidth, behavior: "smooth" });
  };
  const close = () => dialog.current?.close();
  const restore = () => {
    document.body.style.overflow = overflow.current;
    trigger.current?.focus();
  };
  useEffect(() => {
    return () => { document.body.style.overflow = overflow.current; };
  }, []);

  // Auto-advance carousel when not preferring reduced motion
  useEffect(() => {
    if (prefersReducedMotion || !multiple) return undefined;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion, multiple, images.length]);
  const open = () => {
    trigger.current = document.activeElement as HTMLElement;
    overflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${productName} photos`}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          select(index + (event.key === "ArrowLeft" ? -1 : 1));
        }
      }}>
      <div className="relative hidden md:block aspect-[4/5] bg-ink/5 overflow-hidden">
        <button onClick={open} className="relative block w-full h-full" aria-label={`View fullscreen image of ${productName}`}>
          <Image src={images[index].src} alt={images[index].alt} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </button>
        {multiple && <>
          <button onClick={() => select(index - 1)} className="absolute left-4 top-1/2 rounded-full bg-background/90 p-2" aria-label="Previous image"><ChevronLeft /></button>
          <button onClick={() => select(index + 1)} className="absolute right-4 top-1/2 rounded-full bg-background/90 p-2" aria-label="Next image"><ChevronRight /></button>
          <p className="absolute bottom-4 right-4 rounded bg-background/90 px-3 py-1" aria-live="polite">{index + 1} / {images.length}</p>
        </>}
      </div>
      <div ref={carousel} className="md:hidden flex overflow-x-auto snap-x snap-mandatory aspect-[4/5] bg-ink/5"
        onScroll={(event: React.UIEvent<HTMLDivElement>) => setIndex(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))}>
        {images.map((image, i) => <button key={image.src} onClick={open} className="relative block shrink-0 w-full h-full snap-center" aria-label={`View fullscreen image ${i + 1} of ${productName}`}>
          <Image src={image.src} alt={image.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
        </button>)}
      </div>
      {multiple && <>
        <div className="hidden md:flex gap-2 mt-3">
          {images.map((image, i) => <button key={image.src} onClick={() => select(i)} aria-label={`View image ${i + 1}`} aria-current={index === i ? "true" : undefined} className={`relative w-16 h-20 overflow-hidden border-2 ${index === i ? "border-ink" : "border-transparent"}`}>
            <Image src={image.src} alt={image.alt} fill sizes="64px" className="object-cover" />
          </button>)}
        </div>
        <div className="md:hidden flex justify-center mt-2">
          {images.map((image, i) => <button key={image.src} onClick={() => select(i)} aria-label={`Go to image ${i + 1}`} aria-current={index === i ? "true" : undefined} className="p-3"><span className={`block w-2 h-2 rounded-full ${index === i ? "bg-ink" : "bg-ink/20"}`} /></button>)}
        </div>
      </>}
      <dialog ref={dialog} onClose={restore} onKeyDown={(event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key !== "Tab") return;
        const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (document.activeElement === (event.shiftKey ? first : last)) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }} aria-label={`${productName} fullscreen photos`} className="fixed inset-0 m-auto max-w-none max-h-none w-screen h-dvh bg-black text-white backdrop:bg-black/80">
        <div className="relative flex h-full items-center justify-center p-12" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
          <button autoFocus onClick={close} aria-label="Close fullscreen view" className="absolute top-4 right-4 p-3"><X /></button>
          {multiple && <button onClick={() => select(index - 1)} aria-label="Previous image" className="absolute left-0 p-3"><ChevronLeft /></button>}
          <div className="relative w-full h-[80vh] pointer-events-none"><Image src={images[index].src} alt={images[index].alt} fill sizes="90vw" className="object-contain" /></div>
          {multiple && <><button onClick={() => select(index + 1)} aria-label="Next image" className="absolute right-0 p-3"><ChevronRight /></button><p className="absolute bottom-4" aria-live="polite">{index + 1} / {images.length}</p></>}
        </div>
      </dialog>
    </div>
  );
}
