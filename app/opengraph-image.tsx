import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 24 }}>
          VELVET
        </div>
        <div style={{ fontSize: 28, fontWeight: 400, opacity: 0.7, textAlign: "center", maxWidth: 800 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ marginTop: 48, fontSize: 20, opacity: 0.5, letterSpacing: "0.2em" }}>
          Minimalist Luxury
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}