/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
    skipWaiting: true,
    // sw: "service-worker.js",
  },
};

module.exports = withPWA(nextConfig);
