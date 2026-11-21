import type { NextConfig } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://uborkanavoi.uz").replace(/\/$/, "");

/** admin.uborkanavoi.uz (va sinov uchun admin.localhost) — admin panel subdomeni */
const adminHost = [{ type: "host" as const, value: "admin\\..+" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
  async redirects() {
    return [
      // Asosiy sayt: bosh sahifa o'zbekcha versiyaga
      { source: "/", missing: adminHost, destination: "/uz", permanent: false },
      // Admin subdomenida sayt sahifalari ochilsa, asosiy domenga yuboriladi
      { source: "/:locale(uz|ru)/:path*", has: adminHost, destination: `${SITE_URL}/:locale/:path*`, permanent: false },
    ];
  },
  async rewrites() {
    return {
      // admin.uborkanavoi.uz ochilganda admin panel ko'rsatiladi
      beforeFiles: [{ source: "/", has: adminHost, destination: "/admin" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/:path*", has: adminHost, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/admin", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
