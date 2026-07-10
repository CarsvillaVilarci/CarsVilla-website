import type { NextConfig } from "next";

// GitHub Pages serves this project repo under /<repo>/, so we need basePath.
// The workflow sets GITHUB_PAGES=true; local dev/build stays at root.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "CarsVilla-website";

const nextConfig: NextConfig = {
  // Static HTML export so it can be hosted on GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimizer — serve images as-is.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "officialpic.vilarci.in" }],
  },
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,
};

export default nextConfig;
