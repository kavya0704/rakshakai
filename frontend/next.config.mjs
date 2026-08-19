/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cartocdn.com", "basemaps.cartocdn.com"]
  }
};

export default nextConfig;
