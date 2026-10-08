import Link from "next/link";
import { Metadata } from "next";
import { collectionUrl, homeUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4 py-20">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--muted)" }}
        >
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
          Page Not Found
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--muted)" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={homeUrl}
            className="btn-primary inline-flex items-center gap-2"
          >
            Back to Home
          </Link>
          <Link
            href={collectionUrl()}
            className="text-sm font-semibold text-ink border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors"
          >
            Browse the Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
