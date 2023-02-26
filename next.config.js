/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  i18n: {
    locales: ["en-GB"],
    defaultLocale: "en-GB",
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/v1/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/v1/robots",
      },
    ];
  },
};

module.exports = nextConfig;
