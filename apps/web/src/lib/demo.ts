// Demo content for client previews. When NEXT_PUBLIC_DEMO_MODE=1, the marketing
// surfaces render with bundled local assets (apps/web/public/demo/*) so the full
// homepage can be shown without the API, MinIO, or imgproxy running.
import type { InstagramPost } from "./instagram";
import { asset } from "./asset";

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "1";
}

export type ServiceCategory =
  | "threading"
  | "waxing"
  | "brow-treatments"
  | "lashes"
  | "permanent-jewelry"
  | "add-ons";

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  threading: "Threading",
  waxing: "Waxing",
  "brow-treatments": "Brow Treatments",
  lashes: "Lashes",
  "permanent-jewelry": "Permanent Jewelry",
  "add-ons": "Add-Ons",
};

export const SERVICE_CATEGORY_ORDER: ServiceCategory[] = [
  "threading",
  "waxing",
  "brow-treatments",
  "lashes",
  "permanent-jewelry",
  "add-ons",
];

export type DemoFeaturedService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
  imageUrl: string;
};

/** Featured 3 — Booksy popular services, Posh-style product cards. */
export const demoFeaturedServices: DemoFeaturedService[] = [
  {
    id: "demo-eyebrow-returning",
    name: "Returning Client · Eyebrow Threading",
    slug: "eyebrow-threading-returning",
    description: "Please select this service if you have booked with me before.",
    priceCents: 3000,
    durationMinutes: 25,
    imageUrl: asset("/demo/panel-threading.jpg"),
  },
  {
    id: "demo-brow-lamination",
    name: "Brow Lamination",
    slug: "brow-lamination",
    description:
      "An eyebrow perming treatment that sets hairs in place for fuller, uniform brows. Includes threading.",
    priceCents: 9000,
    durationMinutes: 75,
    imageUrl: asset("/demo/panel-brow-design.jpg"),
  },
  {
    id: "demo-lash-lift",
    name: "Lash Lift",
    slug: "lash-lift",
    description: "A lasting curl that opens up the eyes — no extensions.",
    priceCents: 6000,
    durationMinutes: 70,
    imageUrl: asset("/demo/panel-lash-lift.jpg"),
  },
];

export type DemoService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
  category: ServiceCategory;
  featured?: boolean;
  /** When true, price displays as "Varies" (e.g. permanent jewelry). */
  priceVaries?: boolean;
};

/** Full Booksy menu — prices and durations from the live Booksy listing. */
export const demoServices: DemoService[] = [
  // Threading
  {
    id: "svc-eyebrow-new",
    name: "New Client · Eyebrow Threading",
    slug: "eyebrow-threading-new",
    description:
      "Please select this option if this is your first time booking an eyebrow threading with me.",
    priceCents: 3500,
    durationMinutes: 25,
    category: "threading",
  },
  {
    id: "svc-eyebrow-returning",
    name: "Returning Client · Eyebrow Threading",
    slug: "eyebrow-threading-returning",
    description:
      "Please select this service if you have booked this service with me before.",
    priceCents: 3000,
    durationMinutes: 25,
    category: "threading",
    featured: true,
  },
  {
    id: "svc-full-face",
    name: "Full Face Threading",
    slug: "full-face-threading",
    description:
      "Eyebrows, sideburns, cheeks, upper lip, and chin.",
    priceCents: 6000,
    durationMinutes: 45,
    category: "threading",
  },
  {
    id: "svc-upper-lip",
    name: "Upper Lip Threading",
    slug: "upper-lip-threading",
    priceCents: 800,
    durationMinutes: 5,
    category: "threading",
  },
  {
    id: "svc-chin",
    name: "Chin Threading",
    slug: "chin-threading",
    priceCents: 800,
    durationMinutes: 5,
    category: "threading",
  },
  {
    id: "svc-forehead",
    name: "Forehead Threading",
    slug: "forehead-threading",
    priceCents: 1000,
    durationMinutes: 5,
    category: "threading",
  },
  {
    id: "svc-cheek",
    name: "Cheek Threading",
    slug: "cheek-threading",
    priceCents: 1500,
    durationMinutes: 10,
    category: "threading",
  },
  {
    id: "svc-sideburn",
    name: "Sideburn Threading",
    slug: "sideburn-threading",
    priceCents: 1500,
    durationMinutes: 10,
    category: "threading",
  },
  // Waxing
  {
    id: "svc-lip-wax",
    name: "Upper Lip Wax",
    slug: "upper-lip-wax",
    priceCents: 800,
    durationMinutes: 5,
    category: "waxing",
  },
  {
    id: "svc-sideburn-wax",
    name: "Sideburn Wax",
    slug: "sideburn-wax",
    priceCents: 1500,
    durationMinutes: 10,
    category: "waxing",
  },
  {
    id: "svc-cheek-wax",
    name: "Cheek Waxing",
    slug: "cheek-wax",
    priceCents: 1500,
    durationMinutes: 10,
    category: "waxing",
  },
  {
    id: "svc-chin-wax",
    name: "Chin Wax",
    slug: "chin-wax",
    priceCents: 800,
    durationMinutes: 5,
    category: "waxing",
  },
  // Brow Treatments
  {
    id: "svc-brow-tint",
    name: "Brow Tinting (includes threading)",
    slug: "brow-tinting",
    priceCents: 5000,
    durationMinutes: 55,
    category: "brow-treatments",
  },
  {
    id: "svc-brow-lamination",
    name: "Brow Lamination",
    slug: "brow-lamination",
    description:
      "An eyebrow perming treatment that corrects brow shape by setting hairs in place. Includes eyebrow threading. Results last approx. 4–6 weeks.",
    priceCents: 9000,
    durationMinutes: 75,
    category: "brow-treatments",
    featured: true,
  },
  {
    id: "svc-cowlick",
    name: "Cowlick Correction",
    slug: "cowlick-correction",
    priceCents: 2000,
    durationMinutes: 20,
    category: "brow-treatments",
  },
  {
    id: "svc-tint-lamination",
    name: "Brow Tinting with Lamination",
    slug: "brow-tinting-lamination",
    priceCents: 13000,
    durationMinutes: 90,
    category: "brow-treatments",
  },
  // Lashes
  {
    id: "svc-lash-lift",
    name: "Lash Lift",
    slug: "lash-lift",
    priceCents: 6000,
    durationMinutes: 70,
    category: "lashes",
    featured: true,
  },
  {
    id: "svc-lash-lift-tint",
    name: "Lash Lift with Tint",
    slug: "lash-lift-tint",
    priceCents: 7000,
    durationMinutes: 75,
    category: "lashes",
  },
  // Permanent Jewelry
  {
    id: "svc-permanent-jewelry",
    name: "Permanent Jewelry",
    slug: "permanent-jewelry",
    description: "Custom permanent jewelry — pricing varies by piece.",
    priceCents: 0,
    durationMinutes: 15,
    category: "permanent-jewelry",
    priceVaries: true,
  },
  // Add-Ons
  {
    id: "svc-temple-massage",
    name: "Temple Massage",
    slug: "temple-massage",
    priceCents: 500,
    durationMinutes: 5,
    category: "add-ons",
  },
  {
    id: "svc-eye-mask",
    name: "Energizing Eye Mask",
    slug: "energizing-eye-mask",
    priceCents: 500,
    durationMinutes: 5,
    category: "add-ons",
  },
];

export type DemoProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  imageUrl?: string;
  available: boolean;
  featured: boolean;
};

/** Retail scaffold — empty until client provides SKUs/photos. */
export const demoProducts: DemoProduct[] = [];

export type DemoTestimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
};

/** Real Booksy review snippets (5.0 ★ · 391 reviews). */
export const demoTestimonials: DemoTestimonial[] = [
  {
    id: "t1",
    quote:
      "Explain every step while performing them, makes you feel comfortable. Great playlist playing in the background.",
    author: "Evelyn",
    location: "Lash Lift with Tint",
  },
  {
    id: "t2",
    quote:
      "She is amazing at her profession. She is friendly, and paid great attention to detail. She took the time to shape my brows perfectly and made sure I was happy with the results.",
    author: "Melissa",
    location: "Returning Client · Eyebrow Threading",
  },
  {
    id: "t3",
    quote:
      "Truly the best!! Would not trust anybody else with my brows!",
    author: "Daisy",
    location: "Returning Client · Eyebrow Threading",
  },
  {
    id: "t4",
    quote:
      "Amazing as always. I don't even trust myself with my brows as much as I trust Kassey. She has a gift.",
    author: "Tara",
    location: "Brow Tinting",
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
      permalink: "https://www.instagram.com/kassythreads/",
      timestamp: new Date(Date.now() - n * 86_400_000).toISOString(),
      approved: true,
      featured: false,
    };
  },
);
