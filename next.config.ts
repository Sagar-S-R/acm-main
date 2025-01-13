// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'acmrit.vercel.app', // Replace with your image host's domain
        pathname: '/**', 
      },
    ],
    domains: ['aceternity.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig;

