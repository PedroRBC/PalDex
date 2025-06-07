import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paldex-api.pedrorbc.com',
      },
    ],
  },
};

export default nextConfig;
