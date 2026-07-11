// VIDEO SPEC: H.264, CRF 28, 1080p max, target under 8MB
// Compress with Handbrake before uploading to MinIO
//
// Pure React Server Component — no 'use client', no framer-motion.
// All motion is CSS-only so this ships zero JS.

import { isDemoMode } from "@/lib/demo";
import { asset } from "@/lib/asset";

const DEMO = isDemoMode();

// In demo mode (or when infra isn't configured) use the bundled local poster
// and skip the MinIO video source — the poster carries the hero.
const POSTER =
  !DEMO && process.env.NEXT_PUBLIC_IMGPROXY_URL
    ? `${process.env.NEXT_PUBLIC_IMGPROXY_URL}/rs:fill:1920:1080/plain/s3://kassythreads/videos/hero-poster.jpg@webp`
    : asset("/demo/hero-poster.jpg");
const VIDEO_SRC =
  !DEMO && process.env.NEXT_PUBLIC_MINIO_URL
    ? `${process.env.NEXT_PUBLIC_MINIO_URL}/videos/hero.mp4`
    : undefined;

const GRADIENT =
  "linear-gradient(to bottom, rgba(10,10,8,0.15) 0%, rgba(10,10,8,0.55) 55%, rgba(10,10,8,0.97) 100%)";

const MARQUEE_TEXT = "THREADING · LASH LIFT · BROW SCULPTING · BROW TINT · ";

export default function VideoHero() {
  return (
    <section
      style={{ position: "relative", height: "100svh", overflow: "hidden" }}
    >
      <style>{`
        /* Hide the video for visitors who prefer reduced motion.
           Poster, gradient, and content still render. */
        @media (prefers-reduced-motion: reduce) {
          #hero-video { display: none; }
        }

        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .hero-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 15%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          z-index: 2;
        }

        .hero-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-gold);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin: 0;
        }

        .hero-headline {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 82px;
          color: var(--color-cream);
          letter-spacing: 0.08em;
          line-height: 1.1;
          margin: 18px 0 0;
        }

        .hero-subhead {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 15px;
          color: var(--color-muted);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 20px 0 0;
        }

        .hero-cta {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          color: var(--color-cream);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: 1px solid var(--color-gold);
          background: transparent;
          padding: 14px 36px;
          margin-top: 32px;
          text-decoration: none;
          display: inline-block;
          transition: background 300ms ease-out;
        }
        .hero-cta:hover {
          background: rgba(201, 169, 110, 0.08);
        }

        .hero-marquee {
          position: absolute;
          bottom: 4%;
          left: 0;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          z-index: 2;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
                  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        .hero-marquee span {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-gold-muted);
          letter-spacing: 0.3em;
          will-change: transform;
          animation: hero-marquee 18s linear infinite;
        }

        @media (max-width: 767px) {
          .hero-content {
            left: 20px;
            right: 20px;
            bottom: 13%;
            padding: 0;
          }
          .hero-eyebrow { font-size: 9px; letter-spacing: 0.22em; }
          .hero-headline { font-size: 44px; margin-top: 14px; }
          .hero-subhead { display: none; }
          .hero-cta {
            width: 100%;
            text-align: center;
            padding: 16px 24px;
            margin-top: 26px;
          }
          .hero-marquee { bottom: calc(3.5% + env(safe-area-inset-bottom, 0px)); }
          .hero-marquee span { font-size: 9px; letter-spacing: 0.25em; }
        }
        @media (max-width: 380px) {
          .hero-headline { font-size: 38px; }
          .hero-eyebrow { font-size: 8px; letter-spacing: 0.18em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee span { animation: none; }
        }
      `}</style>

      <video
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        {VIDEO_SRC ? <source src={VIDEO_SRC} type="video/mp4" /> : null}
      </video>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: GRADIENT,
          zIndex: 1,
        }}
      />

      <div className="hero-content">
        <p className="hero-eyebrow">THREADING · LASH LIFT · BROW DESIGN</p>
        <h1 className="hero-headline">
          <span>Precision is</span>
          <br />
          <span>the luxury.</span>
        </h1>
        <p className="hero-subhead">
          Studio threading and lash services in [City].
        </p>
        <a className="hero-cta" href="/book">
          Book Your Appointment
        </a>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <span>
          {MARQUEE_TEXT}
          {MARQUEE_TEXT}
        </span>
      </div>
    </section>
  );
}
