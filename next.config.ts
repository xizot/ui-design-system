import type { NextConfig } from 'next';

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const repoBasePath = '/ui-design-system';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild
    ? {
        basePath: repoBasePath,
        assetPrefix: repoBasePath,
      }
    : {}),
};

export default nextConfig;
