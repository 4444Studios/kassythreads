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
          grid-template-columns: 55% 45%;
          min-height: min(78svh, 740px);
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }

        /* ── Media panel ── */
        .sig-hero-media {
          position: relative;
          overflow: hidden;
          background: var(--color-surface);
        }
        .sig-hero-media video,
        .sig-hero-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sig-hero-fallback { display: none; }
        @media (prefers-reduced-motion: reduce) {
          #sig-hero-video { display: none; }
          .sig-hero-fallback { display: block; }
        }

        /* ── Copy panel ── */
        .sig-hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px 48px 56px 52px;
          background: var(--color-bg);
        }

        .sig-hero-eyebrow {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-accent);
        }

        .sig-hero-headline {
          margin: 16px 0 0;
          font-family: var(--font-impact);
          font-weight: 400;
          font-size: clamp(52px, 6.5vw, 96px);
          line-height: 0.95;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color-text);
        }

        .sig-hero-tagline {
          margin: 20px 0 0;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(14px, 1.4vw, 18px);
          line-height: 1.55;
          color: var(--color-muted);
          max-width: 360px;
        }

        .sig-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .sig-hero-cta {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 15px 28px;
          transition: background 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out;
          white-space: nowrap;
        }
        .sig-hero-cta--primary {
          background: var(--color-text);
          color: var(--color-white);
          border: 1px solid var(--color-text);
        }
        .sig-hero-cta--primary:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
        }
        .sig-hero-cta--ghost {
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border);
        }
        .sig-hero-cta--ghost:hover {
          border-color: var(--color-text);
        }

        .sig-hero-social {
          margin-top: 36px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sig-hero-social-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-muted);
          text-decoration: none;
        }
        .sig-hero-social-label:hover { color: var(--color-text); }
        .sig-hero-social-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--color-border);
          flex-shrink: 0;
        }
        .sig-hero-rating {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--color-muted);
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .sig-hero {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .sig-hero-media {
            aspect-ratio: 16 / 9;
          }
          .sig-hero-copy {
            padding: 40px 28px 52px;
            text-align: center;
            align-items: center;
          }
          .sig-hero-tagline { max-width: none; }
          .sig-hero-actions { justify-content: center; }
          .sig-hero-social { justify-content: center; }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .sig-hero-media { aspect-ratio: 4 / 3; }
          .sig-hero-copy { padding: 32px 20px 44px; }
          .sig-hero-headline { font-size: clamp(48px, 13vw, 72px); }
          .sig-hero-tagline { font-size: 14px; }
          .sig-hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .sig-hero-cta {
            width: 100%;
            text-align: center;
            padding: 17px 24px;
          }
          .sig-hero-social { flex-wrap: wrap; gap: 8px; }
        }

        @media (max-width: 380px) {
          .sig-hero-headline { font-size: 44px; }
          .sig-hero-copy { padding: 28px 16px 40px; }
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
          alt="Eyebrow threading at Kassy Threads, El Monte CA"
        />
      </div>

      <div className="sig-hero-copy">
        <p className="sig-hero-eyebrow">
          El Monte, CA · Eyebrow Threading
        </p>

        <h1 className="sig-hero-headline">
          Brows<br />
          you&apos;ll<br />
          obsess<br />
          over.
        </h1>

        <p className="sig-hero-tagline">
          Precision threading, brow lamination &amp; lash lifts — by Kassey.
          Because when your brows are right, everything feels right.
        </p>

        <div className="sig-hero-actions">
          <a
            className="sig-hero-cta sig-hero-cta--primary"
            href={STUDIO.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Appointment
          </a>
          <a className="sig-hero-cta sig-hero-cta--ghost" href="#services">
            See All Services
          </a>
        </div>

        <div className="sig-hero-social">
          <a
            className="sig-hero-social-label"
            href={STUDIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {STUDIO.instagramHandle}
          </a>
          <span className="sig-hero-social-dot" aria-hidden="true" />
          <span className="sig-hero-rating">
            {STUDIO.booksyRating} ★ · {STUDIO.booksyReviewCount} reviews
          </span>
        </div>
      </div>
    </section>
  );
}
