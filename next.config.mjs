/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "images.beta.cosmos.so",
      },
    ],
  },
};

export default nextConfig;
