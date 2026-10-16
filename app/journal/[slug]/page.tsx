import { getArticleBySlug, getOtherArticles, formatDate, getReadTime, getAllArticles } from "@/lib/journal";
import { journalUrl, journalArticleUrl } from "@/lib/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import SmartImage from "@/components/SmartImage";

export const generateStaticParams = async () => {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Not Found | VELVET",
      description: "Page not found",
    };
  }

  const articleAbsoluteUrl = `${journalUrl()}/${article.slug}`;

  return {
    title: {
      default: article.title,
    },
    description: article.excerpt,
    authors: [{ name: "VELVET" }],
    creator: "VELVET",
    alternates: { canonical: articleAbsoluteUrl },
  };
};

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <main id="main-content" className="min-h-screen bg-background pt-36 md:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: article.title, href: journalArticleUrl(article.slug) }]} />
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <small className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                JOURNAL{' '}{' '}
              </small>
              <span className="ml-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Sample article</span>
              <h1 className="text-5xl md:text-6xl font-600 mb-4">
                {article.title}
              </h1>
            </div>
            <Link
              href={journalUrl()}
              className="mt-6 md:mt-0 btn-text"
              style={{ color: "var(--muted)" }}
            >
              Back to Journal
            </Link>
          </div>

          <div className="prose prose-lg mx-auto py-8">
            {/* Cover Image */}
            <div className="mb-8">
              <SmartImage
                src={article.cover.src}
                alt={article.cover.alt}
                label={article.title}
                aspectRatio="16/9"
                className="object-cover w-full h-[400px] md:h-[500px] rounded-lg"
              />
            </div>

            {/* Meta */}
            <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 items-center justify-between text-sm" style={{ color: "var(--muted)" }}>
              <span>{article.category}</span>
              <span>{formatDate(article.date)}</span>
              <span>{getReadTime(article.body)}</span>
              <span>By VELVET Editorial</span>
            </div>

            {/* Body */}
            <div>
              {article.body.map((block, index) => {
                switch (block.type) {
                  case "heading":
                    return (
                      <h2 key={index} className="mb-6 mt-4 text-3xl font-600">
                        {block.content}
                      </h2>
                    );
                  case "paragraph":
                    return (
                      <p key={index} className="mb-6">
                        {block.content}
                      </p>
                    );
                  case "quote":
                    return (
                      <blockquote key={index} className="my-6 pl-4 border-l-4 border-accent italic">
                        {block.content}
                      </blockquote>
                    );
                  case "image":
                    return (
                      <div key={index} className="my-6">
                        <SmartImage
                          src={block.content}
                          alt={block.alt || block.caption || article.title}
                           label={block.caption || article.title}
                          className="object-cover w-full h-[400px] md:h-[500px] rounded-lg"
                        />
                        {block.caption && (
                          <p className="mt-2 text-center text-sm" style={{ color: "var(--muted)" }}>
                            {block.caption}
                          </p>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* More from the Journal */}
            <div className="mt-12">
              <h3 className="text-2xl font-600 mb-6">More from the Journal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getOtherArticles(article.slug).map((other) => (
                  <Link
                    key={other.slug}
                    href={journalArticleUrl(other.slug)}
                    className="group flex flex-col h-full hover:no-underline"
                  >
                    <div className="relative aspect-video bg-gray-100 mb-4 overflow-hidden">
                      <SmartImage
                        src={other.cover.src}
                        alt={other.cover.alt}
                         label={other.title}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <small style={{ color: "var(--accent)" }} className="font-semibold uppercase tracking-wider mb-2">
                        {other.category}
                      </small>
                      <h4 className="text-lg font-600 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {other.title}
                      </h4>
                      <p className="text-sm flex-1" style={{ color: "var(--muted)" }}>
                        {other.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
                        <span>{formatDate(other.date)}</span>
                        <span>{getReadTime(other.body)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Journal and CTA */}
            <div className="mt-12 flex items-center justify-between">
              <Link
                href={journalUrl()}
                className="mt-6 md:mt-0 btn-text"
                style={{ color: "var(--muted)" }}
              >
                Back to Journal
              </Link>
              <Link
                href="/collection"
                className="btn-primary"
              >
                Explore the Full Collection
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}