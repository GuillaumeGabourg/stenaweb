import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static export served under /stenaweb (no server: plain images, demo contact form).
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? "/stenaweb" : "";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_BASE_PATH: basePath },
      turbopack: { resolveAlias: { "@/app/actions": "./lib/contact-static.ts" } },
    }
  : {
      images: { formats: ["image/avif", "image/webp"] },
    };

export default nextConfig;
