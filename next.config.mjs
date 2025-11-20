/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const nextConfig = {
  transpilePackages: ["@refinedev/antd"],

  images: {
    domains: [NEXT_PUBLIC_BASE_URL],
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/campaigns",
        permanent: false,
      },
      {
        source: "/exploration/en",
        destination: "/exploration",
        permanent: false,
      },
      {
        source: "/exploration/vi",
        destination: "/exploration",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
