import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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

export const metadata: Metadata = {
  title: "VELVET — Minimalist Luxury",
  description: "Premium minimalist clothing designed with intention. Premium fabrics, intentional design, sustainable practices.",
  openGraph: {
    title: "VELVET — Minimalist Luxury",
    description: "Premium minimalist clothing designed with intention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F6F2EC" />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

