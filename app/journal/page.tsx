import { getAllArticles, formatDate, getReadTime } from "@/lib/journal";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { journalArticleUrl } from "@/lib/routes";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Journal",
  description: "VELVET Journal: stories about our craft, materials, and commitment to quality.",
  authors: [{ name: "VELVET" }],
  creator: "VELVET",
  alternates: { canonical: "/journal" },
};

export default function JournalListPage() {
  const articles = getAllArticles();

  return (
    <>
      <main id="main-content" className="min-h-screen bg-background pt-36 md:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }]} />
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                JOURNAL
              </small>
              <h1 className="text-4xl md:text-5xl font-600 mt-4">
                Journal
              </h1>
              <p className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
                Discover our latest stories about craft, materials, and commitment to quality.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={journalArticleUrl(article.slug)}
                className="group flex flex-col h-full hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative aspect-video bg-gray-100 mb-6 overflow-hidden">
                  <SmartImage
                    src={article.cover.src}
                    alt={article.cover.alt}
                    label={article.title}
                    aspectRatio="16/9"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <small style={{ color: "var(--accent)" }} className="font-semibold uppercase tracking-wider mb-3">
                    {article.category}
                  </small>
                  <h3 className="text-lg font-600 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm mb-6 flex-1" style={{ color: "var(--muted)" }}>
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
                    <span>{formatDate(article.date)}</span>
                    <span>{getReadTime(article.body)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}