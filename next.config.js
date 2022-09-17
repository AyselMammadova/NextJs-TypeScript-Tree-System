/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: ""
  },
  basePath: "/NextJs-TypeScript-Tree-System",
  assetPrefix: "/NextJs-TypeScript-Tree-System"

}

module.exports = nextConfig
