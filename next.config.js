/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts:true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'bit.ly', 'firebasestorage.googleapis.com'],
    minimumCacheTTL: 3600,
  },
}

module.exports = nextConfig
