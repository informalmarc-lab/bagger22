/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['*'],
  images: {
    // WebP encodes faster than AVIF on first request in self-hosted VPS setups.
    formats: ['image/webp'],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

module.exports = nextConfig
