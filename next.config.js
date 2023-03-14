/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // https://github.com/shikijs/shiki/issues/398#issuecomment-1384042174
    serverComponentsExternalPackages: [
      "vscode-oniguruma",
      "@wooorm/starry-night",
    ],
    outputFileTracingIncludes: {
      "/**": ["./node_modules/vscode-oniguruma/**/*"],
    },
  },
};

module.exports = nextConfig;
