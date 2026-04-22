import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/logo_portfolio.png" }];
  },
};

export default nextConfig;
