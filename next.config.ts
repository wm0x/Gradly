import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}
  },
  output: "standalone",
};

export default nextConfig;
