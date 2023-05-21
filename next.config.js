/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mystickermania.com",
      },
    ],
  },
};

module.exports = nextConfig;
