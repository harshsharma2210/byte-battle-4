/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        images: {
          unoptimized: true,
        },
        trailingSlash: true,
      }
    : {}),
  reactStrictMode: true,
};

export default nextConfig;
