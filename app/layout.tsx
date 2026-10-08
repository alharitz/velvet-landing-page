import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import DemoBanner from "@/components/DemoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadataBase = new URL(siteConfig.siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "VELVET — Made to Be Kept",
    template: "%s | VELVET",
  },
  description: "Premium minimalist clothing designed with intention. Premium fabrics, intentional design, sustainable practices.",
  keywords: ["fashion", "minimalist", "luxury", "clothing", "Jakarta", "VELVET"],
  authors: [{ name: "VELVET" }],
  creator: "VELVET",
  publisher: "VELVET",
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: siteConfig.siteUrl,
    siteName: "VELVET",
    title: "VELVET — Minimalist Luxury",
    description: "Premium minimalist clothing designed with intention.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VELVET — Made to Be Kept",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELVET — Minimalist Luxury",
    description: "Premium minimalist clothing designed with intention.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        { !siteConfig.allowIndexing && <meta name="robots" content="noindex, nofollow" /> }
        <meta name="viewport" content="width=device-width, initial-scale=0.8" />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-black">
          Skip to content
        </a>
        <SmoothScroll />
        <DemoBanner />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}