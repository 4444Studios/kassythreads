// Pure React Server Component — Posh-style horizontal product cards for
// signature services. Fetches featured services from the API (or demo data).

import { EmblaCarousel } from "@/components/client/EmblaCarousel";
import { isDemoMode, demoFeaturedServices } from "@/lib/demo";
import { STUDIO } from "@/lib/studio";

type FeaturedService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents?: number;
  durationMinutes?: number;
  imageUrl?: string;
  videoUrl?: string;
};

async function getFeaturedServices(): Promise<FeaturedService[]> {
  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/services/featured`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const services = (await res.json()) as FeaturedService[];
        if (services.length > 0) return services;
      }
    } catch {
      // fall through to demo / empty
    }
  }
  if (isDemoMode()) return demoFeaturedServices;
  return [];
}

function formatPrice(cents?: number): string {
  if (cents == null) return "";
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

function FeaturedCard({ service }: { service: FeaturedService }) {
  return (
    <article className="feat-card">
      <div className="feat-card-media">
        {service.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={service.imageUrl} alt={service.name} />
        ) : (
          <div className="feat-card-placeholder" aria-hidden="true" />
        )}
      </div>
      <p className="feat-card-brand">{STUDIO.wordmark}</p>
      <h3 className="feat-card-name">{service.name}</h3>
      {service.priceCents != null ? (
        <p className="feat-card-price">{formatPrice(service.priceCents)}</p>
      ) : null}
      <a className="feat-card-cta" href={`/book?service=${service.slug}`}>
        Book Now →
      </a>
    </article>
  );
}

export default async function FeaturedCarousel() {
  const services = await getFeaturedServices();
  if (services.length === 0) return null;

  return (
    <section className="feat-carousel" aria-labelledby="feat-title">
      <style>{`
        .feat-carousel {
          background: var(--color-bg);
          padding: 72px 24px 80px;
          border-bottom: 1px solid var(--color-border);
        }
        .feat-head {
          text-align: center;
          margin-bottom: 40px;
        }
        .feat-eyebrow {
          margin: 0 0 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
        }
        .feat-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 40px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .feat-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .feat-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--color-bg);
        }
        .feat-card-media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
        }
        .feat-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .feat-card-placeholder {
          width: 100%;
          height: 100%;
          background: var(--color-surface);
        }
        .feat-card-brand {
          margin: 18px 0 0;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .feat-card-name {
          margin: 8px 0 0;
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
          line-height: 1.4;
        }
        .feat-card-price {
          margin: 10px 0 0;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-text);
        }
        .feat-card-cta {
          margin-top: 14px;
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
          text-decoration: none;
        }
        .feat-card-cta:hover { text-decoration: underline; }
        @media (max-width: 767px) {
          .feat-carousel { padding: 56px 16px 64px; }
          .feat-title { font-size: 28px; }
          .feat-head { margin-bottom: 28px; }
          .feat-card-name { font-size: 13px; }
          .feat-card-price { font-size: 14px; }
        }
        @media (max-width: 420px) {
          .feat-carousel { padding: 48px 12px 56px; }
          .feat-title { font-size: 24px; }
        }
      `}</style>

      <header className="feat-head">
        <p className="feat-eyebrow">Client Favorites</p>
        <h2 className="feat-title" id="feat-title">
          Most Loved
        </h2>
      </header>

      <div className="feat-inner">
        <EmblaCarousel slideClassName="feat-slide">
          {services.map((service) => (
            <FeaturedCard key={service.id} service={service} />
          ))}
        </EmblaCarousel>
      </div>

      <style>{`
        .feat-slide {
          flex: 0 0 33.333% !important;
          padding: 0 12px !important;
        }
        @media (max-width: 900px) {
          .feat-slide {
            flex: 0 0 50% !important;
          }
        }
        @media (max-width: 560px) {
          .feat-slide {
            flex: 0 0 85% !important;
          }
        }
      `}</style>
    </section>
  );
}
