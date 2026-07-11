import {
  isDemoMode,
  demoServices,
  SERVICE_CATEGORY_ORDER,
  type ServiceCategory,
  type DemoService,
} from "@/lib/demo";
import { ServicesMenu } from "@/components/client/ServicesMenu";

type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
  category?: ServiceCategory;
  priceVaries?: boolean;
};

async function getServices(): Promise<ServiceItem[]> {
  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/services`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const services = (await res.json()) as ServiceItem[];
        if (services.length > 0) return services;
      }
    } catch {
      // fall through to demo / empty
    }
  }
  if (isDemoMode()) return demoServices as DemoService[];
  return [];
}

function groupByCategory(
  services: ServiceItem[],
): { category: ServiceCategory; items: ServiceItem[] }[] {
  const map = new Map<ServiceCategory, ServiceItem[]>();
  for (const cat of SERVICE_CATEGORY_ORDER) map.set(cat, []);

  for (const service of services) {
    const cat = service.category ?? "threading";
    const list = map.get(cat) ?? [];
    list.push(service);
    map.set(cat, list);
  }

  return SERVICE_CATEGORY_ORDER
    .filter((cat) => (map.get(cat)?.length ?? 0) > 0)
    .map((category) => ({ category, items: map.get(category)! }));
}

export default async function ServicesGrid() {
  const services = await getServices();
  if (services.length === 0) return null;

  const groups = groupByCategory(services);

  return (
    <section className="services-grid" id="services">
      <style>{`
        .services-grid {
          background: var(--color-surface);
          padding: 96px 24px;
        }
        .services-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .services-eyebrow {
          margin: 0 0 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-accent);
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .services-title {
          margin: 0;
          font-family: var(--font-impact);
          font-weight: 400;
          font-size: clamp(44px, 6vw, 72px);
          line-height: 0.95;
          color: var(--color-text);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        @media (max-width: 767px) {
          .services-grid { padding: 64px 20px; }
          .services-head { margin-bottom: 32px; }
          .services-title { font-size: 52px; }
        }
        @media (max-width: 420px) {
          .services-grid { padding: 52px 16px; }
          .services-title { font-size: 44px; }
        }
      `}</style>

      <header className="services-head">
        <p className="services-eyebrow">What We Do</p>
        <h2 className="services-title">Services &amp; Pricing</h2>
      </header>

      <ServicesMenu groups={groups} />
    </section>
  );
}
