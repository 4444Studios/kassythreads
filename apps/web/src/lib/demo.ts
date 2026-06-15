// Demo content for client previews. When NEXT_PUBLIC_DEMO_MODE=1, the marketing
// surfaces render with bundled local assets (apps/web/public/demo/*) so the full
// homepage can be shown without the API, MinIO, or imgproxy running.
import type { InstagramPost } from "./instagram";
import { asset } from "./asset";

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "1";
}

export type DemoFeaturedService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl: string;
};

export const demoFeaturedServices: DemoFeaturedService[] = [
  {
    id: "demo-threading",
    name: "Brow Threading",
    slug: "threading",
    description: "Precision hair-by-hair definition.",
    imageUrl: asset("/demo/panel-threading.jpg"),
  },
  {
    id: "demo-lash-lift",
    name: "Lash Lift",
    slug: "lash-lift",
    description: "Lifted, curled lashes for weeks.",
    imageUrl: asset("/demo/panel-lash-lift.jpg"),
  },
  {
    id: "demo-brow-design",
    name: "Brow Design",
    slug: "brow-design",
    description: "Mapped and sculpted to your face.",
    imageUrl: asset("/demo/panel-brow-design.jpg"),
  },
];

export type DemoService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
};

export const demoServices: DemoService[] = [
  {
    id: "svc-brow-threading",
    name: "Brow Threading",
    slug: "brow-threading",
    description: "Hair-by-hair shaping for clean, defined arches.",
    priceCents: 1800,
    durationMinutes: 15,
  },
  {
    id: "svc-brow-design",
    name: "Brow Design & Mapping",
    slug: "brow-design",
    description: "Custom-mapped to your bone structure and symmetry.",
    priceCents: 3500,
    durationMinutes: 30,
  },
  {
    id: "svc-full-face",
    name: "Full Face Threading",
    slug: "full-face-threading",
    description: "Brows, lip, chin, and cheeks in one smooth session.",
    priceCents: 4500,
    durationMinutes: 30,
  },
  {
    id: "svc-lip-threading",
    name: "Lip Threading",
    slug: "lip-threading",
    description: "Quick, precise upper-lip definition.",
    priceCents: 800,
    durationMinutes: 10,
  },
  {
    id: "svc-brow-tint",
    name: "Brow Tint",
    slug: "brow-tint",
    description: "Semi-permanent depth and richness for fuller-looking brows.",
    priceCents: 2000,
    durationMinutes: 20,
  },
  {
    id: "svc-brow-lamination",
    name: "Brow Lamination",
    slug: "brow-lamination",
    description: "Brushed-up, fluffy brows that stay set for weeks.",
    priceCents: 8500,
    durationMinutes: 45,
  },
  {
    id: "svc-lash-lift",
    name: "Lash Lift",
    slug: "lash-lift",
    description: "A lasting curl that opens up the eyes — no extensions.",
    priceCents: 7500,
    durationMinutes: 45,
  },
  {
    id: "svc-lash-lift-tint",
    name: "Lash Lift & Tint",
    slug: "lash-lift-tint",
    description: "Lift plus a deep tint for a mascara-free everyday look.",
    priceCents: 9500,
    durationMinutes: 60,
  },
];

export type DemoTestimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
};

export const demoTestimonials: DemoTestimonial[] = [
  {
    id: "t1",
    quote:
      "The most precise brow work I've ever had. I finally understand what my brows are supposed to look like.",
    author: "Marisa L.",
    location: "Returning client",
  },
  {
    id: "t2",
    quote:
      "My lash lift lasted nearly seven weeks. I wake up looking put together every single day.",
    author: "Priya N.",
    location: "Lash Lift & Tint",
  },
  {
    id: "t3",
    quote:
      "Calm, spotless studio and genuinely artful threading. It feels like a luxury, not a chore.",
    author: "Daniela R.",
    location: "Brow Design",
  },
  {
    id: "t4",
    quote:
      "Booking was effortless and the result was flawless. I've already sent three friends.",
    author: "Steph K.",
    location: "Full Face Threading",
  },
];

export const demoBeforeAfter = {
  before: asset("/demo/before.jpg"),
  after: asset("/demo/after.jpg"),
};

export const demoInstagramPosts: InstagramPost[] = Array.from(
  { length: 8 },
  (_, i) => {
    const n = i + 1;
    return {
      id: `demo-ig-${n}`,
      instagramId: `demo-ig-${n}`,
      mediaType: "IMAGE" as const,
      mediaUrl: asset(`/demo/ugc-${n}.jpg`),
      thumbnailUrl: asset(`/demo/ugc-${n}.jpg`),
      permalink: "https://instagram.com/kassythreads",
      timestamp: new Date(Date.now() - n * 86_400_000).toISOString(),
      approved: true,
      featured: false,
    };
  },
);
