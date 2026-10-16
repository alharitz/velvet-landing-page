"use client";

import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { getAllArticles, formatDate, getReadTime } from "@/lib/journal";
import { journalUrl, journalArticleUrl } from "@/lib/routes";

export default function Journal() {
  const articles = getAllArticles();

  return (
    <section id="journal" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              JOURNAL
            </small>
            <h2 className="text-4xl md:text-5xl font-600 mt-4">
              Journal
            </h2>
          </div>
          <Link
            href={journalUrl()}
            className="mt-6 md:mt-0 btn-text"
            style={{ color: "var(--muted)" }}
          >
            Read the Journal
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={journalArticleUrl(article.slug)}
              className="group flex flex-col h-full hover:no-underline"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gray-100 mb-6 overflow-hidden">
                <SmartImage
                  src={article.cover.src}
                  alt={article.cover.alt}
                  label={article.title}
                  aspectRatio="16/9"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
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

                {/* Meta */}
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
                  <span>{formatDate(article.date)}</span>
                  <span>{getReadTime(article.body)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}