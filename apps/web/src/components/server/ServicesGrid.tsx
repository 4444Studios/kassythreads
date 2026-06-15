// Pure React Server Component — no 'use client'.
// The full services menu with pricing. Fetches all services from the API and
// falls back to demo data for client previews.
import { isDemoMode, demoServices } from "@/lib/demo";

type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
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
  if (isDemoMode()) return demoServices;
  return [];
}

function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export default async function ServicesGrid() {
  const services = await getServices();
  if (services.length === 0) return null;

  return (
    <section className="services-grid">
      <style>{`
        .services-grid {
          background: var(--color-bg);
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
          color: var(--color-gold);
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .services-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 44px;
          color: var(--color-cream);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .services-list {
          max-width: 920px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px 48px;
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
          color: var(--color-cream);
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
          color: var(--color-gold);
          letter-spacing: 0.05em;
        }
        .service-duration {
          margin-top: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-muted);
          letter-spacing: 0.1em;
        }
        @media (max-width: 767px) {
          .services-grid { padding: 64px 20px; }
          .services-head { margin-bottom: 36px; }
          .services-title { font-size: 30px; }
          .services-list { grid-template-columns: 1fr; gap: 0; }
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

      <div className="services-list">
        {services.map((service) => (
          <div className="service-row" key={service.id}>
            <div>
              <h3 className="service-name">{service.name}</h3>
              {service.description ? (
                <p className="service-desc">{service.description}</p>
              ) : null}
            </div>
            <div className="service-meta">
              <div className="service-price">
                {formatPrice(service.priceCents)}
              </div>
              <div className="service-duration">
                {service.durationMinutes} MIN
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
