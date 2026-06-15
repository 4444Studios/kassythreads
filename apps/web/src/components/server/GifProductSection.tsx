// Pure React Server Component — no 'use client'.
// 3-panel section directly below the hero. Each panel is a seamless short
// MP4 loop (treated like a GIF) stored in MinIO at content/service-{slug}.mp4.
// Data is fetched from the API at build time and revalidated hourly (ISR).
//
// VIDEO SPEC (panels): H.264, CRF 28, square-ish 1:1 or 4:5, target under 4MB
// Compress with Handbrake before uploading to MinIO.

import { isDemoMode, demoFeaturedServices } from "@/lib/demo";

type FeaturedService = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  // Optional explicit media (used by demo data / static fallback).
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
  // Demo fallback for client previews (NEXT_PUBLIC_DEMO_MODE=1).
  if (isDemoMode()) return demoFeaturedServices;
  return [];
}

function GifPanel({ service }: { service: FeaturedService }) {
  // Prefer an explicit video, then a MinIO video (when configured), else fall
  // back to a still image (demo / no-video services).
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
          className="gif-panel-video"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : service.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={service.imageUrl}
          alt={service.name}
          className="gif-panel-video"
        />
      ) : null}

      <div className="gif-panel-overlay">
        <h3 className="gif-panel-name">{service.name}</h3>
        <a className="gif-panel-cta" href={`/services/${service.slug}`}>
          Explore Service
        </a>
      </div>
    </article>
  );
}

export default async function GifProductSection() {
  const services = await getFeaturedServices();

  // Nothing to show (e.g. API down at build time) — render nothing rather than
  // an empty shell.
  if (services.length === 0) return null;

  return (
    <section className="gif-product-section">
      <style>{`
        .gif-product-section {
          background: var(--color-surface);
          padding: 0;
        }

        .gif-product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        .gif-panel {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 1px solid transparent;
          transition: border-color 180ms ease-out;
        }
        .gif-panel:hover {
          border-color: var(--color-gold);
        }

        .gif-panel-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .gif-panel-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          padding: 0 24px 48px;
          text-align: center;
          background: rgba(10, 10, 8, 0.45);
          transition: background 180ms ease-out;
        }
        .gif-panel:hover .gif-panel-overlay {
          background: rgba(10, 10, 8, 0.3);
        }

        .gif-panel-name {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 28px;
          color: var(--color-cream);
          letter-spacing: 0.04em;
        }

        .gif-panel-cta {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          color: var(--color-gold);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
        }
        .gif-panel-cta:hover {
          text-decoration: underline;
        }

        @media (max-width: 767px) {
          .gif-product-grid {
            grid-template-columns: 1fr;
          }
          /* Less towering when stacked; keep a tap-friendly, editorial frame. */
          .gif-panel { aspect-ratio: 3 / 4; }
          .gif-panel-overlay { padding: 0 20px 32px; gap: 10px; }
          .gif-panel-name { font-size: 26px; }
          /* Reveal the hover treatment on touch (no hover state on mobile). */
          .gif-panel { border-color: var(--color-border); }
          .gif-panel-overlay { background: rgba(10, 10, 8, 0.38); }
        }
      `}</style>

      <div className="gif-product-grid">
        {services.map((service) => (
          <GifPanel key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
