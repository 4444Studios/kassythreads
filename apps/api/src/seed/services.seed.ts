/**
 * Booksy-aligned service seed data.
 * Run via: pnpm --filter api exec tsx src/seed/services.seed.ts
 * (requires DATABASE_URL / Postgres env vars).
 */
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "../mikro-orm.config";
import { Service } from "../entities/Service";

type SeedService = {
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
  category: string;
  featured?: boolean;
  priceVaries?: boolean;
  isAddOn?: boolean;
};

const SEED: SeedService[] = [
  {
    name: "New Client · Eyebrow Threading",
    slug: "eyebrow-threading-new",
    description:
      "Please select this option if this is your first time booking an eyebrow threading with me.",
    priceCents: 3500,
    durationMinutes: 25,
    category: "threading",
  },
  {
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
    name: "Full Face Threading",
    slug: "full-face-threading",
    description: "Eyebrows, sideburns, cheeks, upper lip, and chin.",
    priceCents: 6000,
    durationMinutes: 45,
    category: "threading",
  },
  {
    name: "Upper Lip Threading",
    slug: "upper-lip-threading",
    priceCents: 800,
    durationMinutes: 5,
    category: "threading",
  },
  {
    name: "Chin Threading",
    slug: "chin-threading",
    priceCents: 800,
    durationMinutes: 5,
    category: "threading",
  },
  {
    name: "Forehead Threading",
    slug: "forehead-threading",
    priceCents: 1000,
    durationMinutes: 5,
    category: "threading",
  },
  {
    name: "Cheek Threading",
    slug: "cheek-threading",
    priceCents: 1500,
    durationMinutes: 10,
    category: "threading",
  },
  {
    name: "Sideburn Threading",
    slug: "sideburn-threading",
    priceCents: 1500,
    durationMinutes: 10,
    category: "threading",
  },
  {
    name: "Upper Lip Wax",
    slug: "upper-lip-wax",
    priceCents: 800,
    durationMinutes: 5,
    category: "waxing",
  },
  {
    name: "Sideburn Wax",
    slug: "sideburn-wax",
    priceCents: 1500,
    durationMinutes: 10,
    category: "waxing",
  },
  {
    name: "Cheek Waxing",
    slug: "cheek-wax",
    priceCents: 1500,
    durationMinutes: 10,
    category: "waxing",
  },
  {
    name: "Chin Wax",
    slug: "chin-wax",
    priceCents: 800,
    durationMinutes: 5,
    category: "waxing",
  },
  {
    name: "Brow Tinting (includes threading)",
    slug: "brow-tinting",
    priceCents: 5000,
    durationMinutes: 55,
    category: "brow-treatments",
  },
  {
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
    name: "Cowlick Correction",
    slug: "cowlick-correction",
    priceCents: 2000,
    durationMinutes: 20,
    category: "brow-treatments",
  },
  {
    name: "Brow Tinting with Lamination",
    slug: "brow-tinting-lamination",
    priceCents: 13000,
    durationMinutes: 90,
    category: "brow-treatments",
  },
  {
    name: "Lash Lift",
    slug: "lash-lift",
    priceCents: 6000,
    durationMinutes: 70,
    category: "lashes",
    featured: true,
  },
  {
    name: "Lash Lift with Tint",
    slug: "lash-lift-tint",
    priceCents: 7000,
    durationMinutes: 75,
    category: "lashes",
  },
  {
    name: "Permanent Jewelry",
    slug: "permanent-jewelry",
    description: "Custom permanent jewelry — pricing varies by piece.",
    priceCents: 0,
    durationMinutes: 15,
    category: "permanent-jewelry",
    priceVaries: true,
  },
  {
    name: "Temple Massage",
    slug: "temple-massage",
    priceCents: 500,
    durationMinutes: 5,
    category: "add-ons",
    isAddOn: true,
  },
  {
    name: "Energizing Eye Mask",
    slug: "energizing-eye-mask",
    priceCents: 500,
    durationMinutes: 5,
    category: "add-ons",
    isAddOn: true,
  },
];

async function main() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  for (const row of SEED) {
    const existing = await em.findOne(Service, { slug: row.slug });
    if (existing) {
      existing.name = row.name;
      existing.description = row.description;
      existing.priceCents = row.priceCents;
      existing.durationMinutes = row.durationMinutes;
      existing.category = row.category;
      existing.featured = row.featured ?? false;
      existing.priceVaries = row.priceVaries ?? false;
      existing.isAddOn = row.isAddOn ?? false;
    } else {
      const service = new Service();
      service.name = row.name;
      service.slug = row.slug;
      service.description = row.description;
      service.priceCents = row.priceCents;
      service.durationMinutes = row.durationMinutes;
      service.category = row.category;
      service.featured = row.featured ?? false;
      service.priceVaries = row.priceVaries ?? false;
      service.isAddOn = row.isAddOn ?? false;
      em.persist(service);
    }
  }

  await em.flush();
  console.log(`Seeded ${SEED.length} services.`);
  await orm.close(true);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
