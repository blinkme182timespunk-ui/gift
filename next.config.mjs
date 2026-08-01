/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/gift",
  assetPrefix: "/gift/",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;