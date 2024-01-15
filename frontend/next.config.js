/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['localhost/../public/cook.jpg'], // 画像を置いているドメイン
    },
    webpack: (config, context) => {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300
      }
      return config
    }
  }
  
  module.exports = nextConfig