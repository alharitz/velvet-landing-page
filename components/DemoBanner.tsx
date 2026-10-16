"use client";

export default function DemoBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-[var(--ink)] text-[var(--inverse-ink)] text-xs font-medium text-center h-12 md:h-8 flex items-center justify-center px-4"
      style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
      role="status"
      aria-live="polite"
    >
      Demo project. This is a portfolio showcase, not a real store. Content and contact details are samples.
    </div>
  );
}