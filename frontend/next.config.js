/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  env: {
    LOCAL_URL: process.env.LOCAL_URL,
    API_URL: process.env.API_URL,
    BUCKET_OBJECT_URL: process.env.BUCKET_OBJECT_URL,
  },
};

module.exports = nextConfig;
