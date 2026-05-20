import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-27e6aaae47ec45618815ff1f7543c382.r2.dev",
      },
      {
        protocol: "https",
        hostname: "finance.skillsnaplearning.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"        },
          { key: "X-Frame-Options",           value: "DENY"           },
          { key: "X-XSS-Protection",          value: "1; mode=block"  },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;