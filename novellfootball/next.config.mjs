/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
