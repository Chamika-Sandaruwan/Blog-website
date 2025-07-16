/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'camo.githubusercontent.com',
      'images.unsplash.com',
      'www.iim.fr',
      'githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig