import type { NextConfig } from "next";
import path from "node:path";

// Two build targets share this config:
//
//  - VPS production (default): a `standalone` server build that runs in the
//    Docker image behind Cloudflare Tunnel, with images served through the
//    imgproxy sidecar via the custom loader.
//
//  - GitHub Pages demo (NEXT_STATIC_EXPORT=1): a fully static `export` with no
//    server, no API, and no imgproxy. Demo assets are bundled in /public and
//    NEXT_PUBLIC_BASE_PATH points at the repo subpath (e.g. /kassythreads).
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const exportConfig: NextConfig = {
  output: "export",
  // No imgproxy in the static demo — emit plain <img> tags with bundled assets.
  images: { unoptimized: true },
  // Serve correctly from a repo subpath on GitHub Pages.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Emit /route/index.html so GitHub Pages resolves directory URLs.
  trailingSlash: true,
};

const serverConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    // All images are served through the imgproxy sidecar.
    // See ./src/lib/imgproxy-loader.ts
    loader: "custom",
    loaderFile: "./src/lib/imgproxy-loader.ts",
  },
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? exportConfig : serverConfig),
};

export default nextConfig;
