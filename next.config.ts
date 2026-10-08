import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/collection',
        permanent: true,
      },
      {
        source: '/products/:slug',
        destination: '/collection/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
