import { ImageResponse } from "next/og";
import { getAllProducts, formatIDR } from "@/lib/products";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const products = getAllProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F6F2EC",
            fontFamily: "serif",
            color: "#1A1A1A",
            padding: "60px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 600, marginBottom: 16 }}>
            Product Not Found
          </div>
          <div style={{ fontSize: 24, opacity: 0.7 }}>
            {slug}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F2EC",
          fontFamily: "serif",
          color: "#1A1A1A",
          padding: "60px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.5, marginBottom: 16, letterSpacing: "0.2em" }}>
          {product.category}
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, textAlign: "center", marginBottom: 16, maxWidth: 900, lineHeight: 1.1 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 28, opacity: 0.7, marginBottom: 24 }}>
          {product.material}
        </div>
        <div style={{ fontSize: 48, fontWeight: 600, marginBottom: 8 }}>
          {formatIDR(product.price)}
        </div>
        <div style={{ marginTop: 40, fontSize: 20, opacity: 0.5, letterSpacing: "0.2em" }}>
          VELVET
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}