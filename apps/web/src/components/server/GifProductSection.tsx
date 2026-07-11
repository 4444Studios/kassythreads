import { isDemoMode, demoFeaturedServices } from "@/lib/demo";

type FeaturedService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
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
      // fall through
    }
  }
  if (isDemoMode()) return demoFeaturedServices;
  return [];
}

function GifPanel({ service }: { service: FeaturedService }) {
  const minio = process.env.NEXT_PUBLIC_MINIO_URL;
  const videoUrl =
    service.videoUrl ??
    (minio && !isDemoMode()
      ? `${minio}/content/service-${service.slug}.mp4`
      : undefined);

  return (
    <article className="gif-panel">
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={service.imageUrl}
          className="gif-panel-media"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : service.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={service.imageUrl} alt={service.name} className="gif-panel-media" />
      ) : null}

      <div className="gif-panel-overlay">
        <h3 className="gif-panel-name">{service.name}</h3>
        <a className="gif-panel-cta" href={`/services/${service.slug}`}>
          Learn More →
        </a>
      </div>
    </article>
  );
}

export default async function GifProductSection() {
  const services = await getFeaturedServices();
  if (services.length === 0) return null;

  return (
    <section className="gif-section">
      <style>{`
        .gif-section {
          background: var(--color-text);
          padding: 0;
        }

        .gif-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .gif-panel {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }

        .gif-panel-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          transition: transform 600ms var(--ease-luxury);
        }
        .gif-panel:hover .gif-panel-media {
          transform: scale(1.04);
        }

        .gif-panel-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 28px 24px 32px;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.85) 0%,
            rgba(10, 10, 10, 0.2) 55%,
            transparent 100%
          );
        }

        .gif-panel-name {
          margin: 0;
          font-family: var(--font-impact);
          font-weight: 400;
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--color-white);
        }

        .gif-panel-cta {
          margin-top: 10px;
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-accent);
          text-decoration: none;
          border-bottom: 1px solid rgba(201, 169, 110, 0.4);
          padding-bottom: 2px;
          transition: border-color 200ms ease-out, color 200ms ease-out;
        }
        .gif-panel-cta:hover {
          color: var(--color-white);
          border-color: var(--color-white);
        }

        /* Dividers between panels */
        .gif-panel + .gif-panel {
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* ── Tablet ── */
        @media (max-width: 768px) {
          .gif-strip {
            grid-template-columns: repeat(3, 1fr);
          }
          .gif-panel { aspect-ratio: 2 / 3; }
          .gif-panel-overlay { padding: 16px 14px 20px; }
          .gif-panel-name { font-size: clamp(16px, 3.5vw, 24px); }
          .gif-panel-cta { font-size: 9px; letter-spacing: 0.12em; }
        }

        /* ── Mobile ── */
        @media (max-width: 500px) {
          .gif-strip { grid-template-columns: 1fr; }
          .gif-panel { aspect-ratio: 4 / 3; }
          .gif-panel + .gif-panel { border-left: none; border-top: 1px solid rgba(255,255,255,0.08); }
          .gif-panel-overlay { padding: 20px 20px 24px; }
          .gif-panel-name { font-size: 28px; }
          .gif-panel-cta { font-size: 11px; }
        }
      `}</style>

      <div className="gif-strip">
        {services.map((service) => (
          <GifPanel key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
