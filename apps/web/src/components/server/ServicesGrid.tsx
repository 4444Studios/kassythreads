// Pure React Server Component — full studio menu grouped by Booksy category.
import {
  isDemoMode,
  demoServices,
  SERVICE_CATEGORY_LABELS,
  SERVICE_CATEGORY_ORDER,
  type ServiceCategory,
  type DemoService,
} from "@/lib/demo";

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

function formatPrice(service: ServiceItem): string {
  if (service.priceVaries || service.priceCents === 0) return "Varies";
  const dollars = service.priceCents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
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

  return SERVICE_CATEGORY_ORDER.filter((cat) => (map.get(cat)?.length ?? 0) > 0).map(
    (category) => ({ category, items: map.get(category)! }),
  );
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
          margin-bottom: 56px;
        }
        .services-eyebrow {
          margin: 0 0 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-accent-dark);
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .services-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 44px;
          color: var(--color-text);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .services-groups {
          max-width: 920px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        .services-cat-title {
          margin: 0 0 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
        }
        .service-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: baseline;
          gap: 12px;
          padding: 22px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .service-name {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 22px;
          color: var(--color-text);
          letter-spacing: 0.03em;
        }
        .service-desc {
          margin: 6px 0 0;
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 13px;
          line-height: 1.6;
          color: var(--color-muted);
        }
        .service-meta {
          text-align: right;
          white-space: nowrap;
        }
        .service-price {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--color-accent-dark);
          letter-spacing: 0.05em;
        }
        .service-duration {
          margin-top: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-muted);
          letter-spacing: 0.1em;
        }
        .service-book {
          display: inline-block;
          margin-top: 8px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          border-bottom: 1px solid var(--color-accent);
        }
        .service-book:hover { color: var(--color-accent-dark); }
        @media (max-width: 767px) {
          .services-grid { padding: 64px 20px; }
          .services-head { margin-bottom: 36px; }
          .services-title { font-size: 30px; }
          .services-groups { gap: 36px; }
          .service-row { padding: 18px 0; gap: 16px; }
          .service-name { font-size: 20px; }
          .service-desc { font-size: 12.5px; margin-top: 5px; }
          .service-price { font-size: 15px; }
        }
      `}</style>

      <header className="services-head">
        <p className="services-eyebrow">Studio Menu</p>
        <h2 className="services-title">Services &amp; Pricing</h2>
      </header>

      <div className="services-groups">
        {groups.map(({ category, items }) => (
          <div key={category}>
            <h3 className="services-cat-title">
              {SERVICE_CATEGORY_LABELS[category]}
            </h3>
            {items.map((service) => (
              <div className="service-row" key={service.id}>
                <div>
                  <h4 className="service-name">{service.name}</h4>
                  {service.description ? (
                    <p className="service-desc">{service.description}</p>
                  ) : null}
                </div>
                <div className="service-meta">
                  <div className="service-price">{formatPrice(service)}</div>
                  <div className="service-duration">
                    {service.durationMinutes} MIN
                  </div>
                  <a
                    className="service-book"
                    href={`/book?service=${service.slug}`}
                  >
                    Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
