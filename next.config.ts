import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'editify.shop',
      },
    ],
  },
};

export default nextConfig;
