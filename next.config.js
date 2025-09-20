/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'upload.wikimedia.org', 
      'images-na.ssl-images-amazon.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5001/graphql',
      },
    ];
  },
  reactStrictMode: true,
};
