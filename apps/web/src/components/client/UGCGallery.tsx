"use client";

// Client shell for the Instagram social wall. Data is fetched in the RSC parent
// (see (marketing)/page.tsx) and passed in as props — never fetched here, to
// keep the wall in the static render instead of a client-side waterfall.

import Image from "next/image";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
  type InstagramPost,
} from "@/lib/instagram";

function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function UGCCell({ post }: { post: InstagramPost }) {
  const isVideo = post.mediaType === "VIDEO";

  return (
    <a
      className="ugc-cell"
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={post.thumbnailUrl}
          className="ugc-media"
        >
          <source src={post.mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={post.mediaUrl}
          alt=""
          fill
          sizes="(max-width: 767px) 50vw, 25vw"
          // Local/public assets (demo) bypass the imgproxy loader.
          unoptimized={post.mediaUrl.startsWith("/")}
          className="ugc-media"
        />
      )}

      <div className="ugc-hover">
        <InstagramIcon />
        <span className="ugc-hover-label">View Post</span>
      </div>
    </a>
  );
}

export function UGCGallery({ posts }: { posts: InstagramPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="ugc-gallery">
      <style>{`
        .ugc-gallery {
          background: var(--color-bg);
          padding: 96px 24px;
        }

        .ugc-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .ugc-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 40px;
          color: var(--color-cream);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ugc-subhead {
          margin: 14px 0 0;
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 13px;
          color: var(--color-muted);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .ugc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ugc-cell {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          display: block;
        }

        .ugc-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ugc-hover {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--color-bg);
          background: rgba(201, 169, 110, 0);
          opacity: 0;
          transition: opacity 200ms ease-out, background 200ms ease-out;
        }
        .ugc-cell:hover .ugc-hover {
          opacity: 1;
          background: rgba(201, 169, 110, 0.85);
        }
        .ugc-hover-label {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .ugc-follow {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }
        .ugc-follow-btn {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          color: var(--color-cream);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: 1px solid var(--color-gold);
          background: transparent;
          padding: 14px 36px;
          text-decoration: none;
          transition: background 300ms ease-out;
        }
        .ugc-follow-btn:hover {
          background: rgba(201, 169, 110, 0.08);
        }

        @media (max-width: 767px) {
          .ugc-grid { grid-template-columns: repeat(2, 1fr); }
          .ugc-title { font-size: 30px; }
        }
      `}</style>

      <header className="ugc-header">
        <h2 className="ugc-title">As Seen On Our Clients</h2>
        <p className="ugc-subhead">Tag #kassythreads to be featured</p>
      </header>

      <div className="ugc-grid">
        {posts.map((post) => (
          <UGCCell key={post.id} post={post} />
        ))}
      </div>

      <div className="ugc-follow">
        <a
          className="ugc-follow-btn"
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow Us {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
