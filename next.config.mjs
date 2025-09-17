/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eshopapp.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net", // يدعم أي cloudfront
      },
    ],
  },
};

export default nextConfig;
