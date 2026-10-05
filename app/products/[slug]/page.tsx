import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import ProductDetailClient from "./ProductDetailClient";
import { generateProductJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const productUrl = `${siteConfig.siteUrl}/products/${slug}`;

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: productUrl },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      url: productUrl,
      images: product.images[0]
        ? [{ url: `${siteConfig.siteUrl}${product.images[0]}`, width: 1200, height: 1600, alt: `${product.name} - ${product.material}` }]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images[0] ? [`${siteConfig.siteUrl}${product.images[0]}`] : ["/opengraph-image"],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${siteConfig.siteUrl}/products/${slug}`;
  const jsonLd = generateProductJsonLd(product, productUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}