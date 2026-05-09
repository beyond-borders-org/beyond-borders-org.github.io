import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",    
  //basePath: "/beyond-borders-org",
  //assetPrefix: "/beyond-borders-org/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;