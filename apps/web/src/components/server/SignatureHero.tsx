// VIDEO SPEC: H.264, CRF 28, 1080p max, target under 8MB
// Compress with Handbrake before uploading to MinIO
//
// Pure React Server Component — Posh-style 50/50 split hero.
// Bright, product-first above the fold. Replaces the dark full-bleed VideoHero.

import { isDemoMode } from "@/lib/demo";
import { asset } from "@/lib/asset";
import { STUDIO } from "@/lib/studio";

const DEMO = isDemoMode();

const POSTER =
  !DEMO && process.env.NEXT_PUBLIC_IMGPROXY_URL
    ? `${process.env.NEXT_PUBLIC_IMGPROXY_URL}/rs:fill:1920:1080/plain/s3://kassythreads/videos/hero-poster.jpg@webp`
    : asset("/demo/hero-poster.jpg");
const VIDEO_SRC =
  !DEMO && process.env.NEXT_PUBLIC_MINIO_URL
    ? `${process.env.NEXT_PUBLIC_MINIO_URL}/videos/hero.mp4`
    : undefined;

export default function SignatureHero() {
  return (
    <section className="sig-hero">
      <style>{`
        .sig-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: min(72svh, 680px);
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }
        .sig-hero-media {
          position: relative;
          overflow: hidden;
          background: var(--color-surface);
          min-height: 360px;
        }
        .sig-hero-media video,
        .sig-hero-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sig-hero-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(247, 244, 239, 0.2) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
        .sig-hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 56px;
          background: var(--color-bg);
        }
        .sig-hero-eyebrow {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
        }
        .sig-hero-headline {
          margin: 20px 0 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1.12;
          letter-spacing: 0.02em;
          color: var(--color-text);
        }
        .sig-hero-subhead {
          margin: 22px 0 0;
          max-width: 420px;
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 15px;
          line-height: 1.7;
          color: var(--color-muted);
        }
        .sig-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 36px;
        }
        .sig-hero-cta {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 28px;
          border: 1px solid var(--color-accent);
          transition: background 200ms ease-out, color 200ms ease-out;
        }
        .sig-hero-cta--primary {
          background: var(--color-accent);
          color: var(--color-white);
        }
        .sig-hero-cta--primary:hover {
          background: var(--color-accent-dark);
          border-color: var(--color-accent-dark);
        }
        .sig-hero-cta--ghost {
          background: transparent;
          color: var(--color-text);
        }
        .sig-hero-cta--ghost:hover {
          background: rgba(201, 169, 110, 0.1);
        }
        .sig-hero-tagline {
          margin: 40px 0 0;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: 15px;
          letter-spacing: 0.04em;
          color: var(--color-muted);
        }
        .sig-hero-fallback { display: none; }
        @media (prefers-reduced-motion: reduce) {
          #sig-hero-video { display: none; }
          .sig-hero-fallback { display: block; }
        }
        @media (max-width: 900px) {
          .sig-hero {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .sig-hero-media {
            aspect-ratio: 16 / 9;
            min-height: unset;
          }
          .sig-hero-copy {
            padding: 36px 24px 48px;
            text-align: center;
            align-items: center;
          }
          .sig-hero-subhead { max-width: none; }
          .sig-hero-actions { justify-content: center; width: 100%; }
          .sig-hero-cta { flex: 1 1 auto; text-align: center; min-height: 48px; display: flex; align-items: center; justify-content: center; }
        }
        @media (max-width: 480px) {
          .sig-hero-headline { font-size: clamp(32px, 9vw, 48px); }
          .sig-hero-copy { padding: 28px 20px 40px; }
          .sig-hero-actions { flex-direction: column; }
          .sig-hero-cta { width: 100%; }
        }
      `}</style>

      <div className="sig-hero-media">
        {VIDEO_SRC ? (
          <video
            id="sig-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={VIDEO_SRC ? "sig-hero-fallback" : undefined}
          src={POSTER}
          alt="Precision eyebrow threading at Kassy Threads"
        />
        <div className="sig-hero-veil" />
      </div>

      <div className="sig-hero-copy">
        <p className="sig-hero-eyebrow">
          {STUDIO.city.toUpperCase()} · EYEBROW THREADING
        </p>
        <h1 className="sig-hero-headline">Your brows, perfected.</h1>
        <p className="sig-hero-subhead">
          Precision eyebrow threading, brow lamination &amp; lash lifts — calm
          studio care in {STUDIO.city}, {STUDIO.state}.
        </p>
        <div className="sig-hero-actions">
          <a
            className="sig-hero-cta sig-hero-cta--primary"
            href="/book?service=eyebrow-threading-returning"
          >
            Book Eyebrow Threading
          </a>
          <a className="sig-hero-cta sig-hero-cta--ghost" href="#services">
            View All Services
          </a>
        </div>
        <p className="sig-hero-tagline">
          Stronger than it looks. Smoother than it feels.
        </p>
      </div>
    </section>
  );
}
