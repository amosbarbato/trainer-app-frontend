import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.ufs.sh" }],
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
