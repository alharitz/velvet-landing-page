export default function Marquee() {
  const text = "Premium Fabrics · Intentional Design · Sustainable Practices · Made to Last";

  return (
    <section className="section-space bg-background border-t border-b border-line overflow-hidden" aria-label="VELVET principles">
      <div className="track whitespace-nowrap" aria-live="off">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="marquee-text px-12 text-inverse-bg flex-shrink-0"
            aria-hidden={i > 0}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
