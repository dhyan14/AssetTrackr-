/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignore TypeScript errors in production builds
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors in production builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 