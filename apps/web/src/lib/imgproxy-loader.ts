// Custom next/image loader. All images on the site are transformed on the fly by
// the imgproxy sidecar (WebP, resize, crop) instead of Next's built-in optimizer.
// Registered via next.config.ts -> images.loaderFile.
export default function imgproxyLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Local/public, data, and blob assets bypass imgproxy (static assets + demo).
  if (
    src.startsWith("/") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  const base = process.env.NEXT_PUBLIC_IMGPROXY_URL;
  return `${base}/rs:fill:${width}/q:${quality ?? 82}/plain/${src}@webp`;
}
