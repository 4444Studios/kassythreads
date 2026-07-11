"use client";

import { useState } from "react";
import { STUDIO } from "@/lib/studio";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#shop", label: "Shop" },
  { href: STUDIO.booksyUrl, label: "Book", external: true },
  { href: "#contact", label: "Contact" },
] as const;

const MARQUEE_TEXT =
  `${STUDIO.booksyRating} ★ · ${STUDIO.booksyReviewCount} Reviews · Eyebrow Threading · Brow Lamination · Lash Lift · El Monte, CA · `;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <style>{`
        /* ── Announcement bar — scrolling marquee ── */
        .site-announce {
          background: var(--color-text);
          color: var(--color-white);
          overflow: hidden;
          white-space: nowrap;
          padding: 9px 0;
        }
        @keyframes announce-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .site-announce-inner {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          animation: announce-scroll 28s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .site-announce-inner { animation: none; }
        }

        /* ── Brand bar ── */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }
        .site-brand-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 16px 28px;
          background: var(--color-bg);
        }
        .site-brand-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .site-menu-btn {
          display: none;
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          color: var(--color-text);
        }
        .site-wordmark {
          font-family: var(--font-impact);
          font-weight: 400;
          font-size: 22px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          text-align: center;
        }
        .site-brand-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
        }
        .site-ig {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-muted);
          text-decoration: none;
        }
        .site-ig:hover { color: var(--color-text); }
        .site-book-btn {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-white);
          background: var(--color-text);
          border: 1px solid var(--color-text);
          padding: 10px 20px;
          text-decoration: none;
          transition: background 200ms ease-out, border-color 200ms ease-out;
          white-space: nowrap;
        }
        .site-book-btn:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* ── Desktop nav ── */
        .site-nav {
          display: flex;
          justify-content: center;
          gap: 36px;
          padding: 11px 24px;
          border-top: 1px solid var(--color-border);
          background: var(--color-bg);
        }
        .site-nav a {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          transition: color 150ms ease-out;
        }
        .site-nav a:hover { color: var(--color-accent); }

        /* ── Mobile nav drawer ── */
        .site-mobile-nav {
          display: none;
          flex-direction: column;
          background: var(--color-bg);
        }
        .site-mobile-nav a {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          padding: 18px 24px;
          border-bottom: 1px solid var(--color-border);
          transition: color 150ms ease-out, background 150ms ease-out;
        }
        .site-mobile-nav a:hover {
          color: var(--color-accent);
          background: var(--color-surface);
        }
        .site-mobile-nav.is-open { display: flex; }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .site-brand-bar {
            grid-template-columns: auto 1fr auto;
            padding: 14px 16px;
            gap: 8px;
          }
          .site-menu-btn { display: inline-flex; }
          .site-wordmark { font-size: 18px; letter-spacing: 0.1em; text-align: left; }
          .site-ig { display: none; }
          .site-book-btn { padding: 9px 14px; font-size: 10px; }
          .site-nav { display: none; }
          .site-announce-inner { font-size: 9px; letter-spacing: 0.16em; }
        }
        @media (max-width: 380px) {
          .site-wordmark { font-size: 16px; }
          .site-book-btn { padding: 8px 12px; }
        }
      `}</style>

      <div className="site-announce" aria-label="Studio announcement">
        <span className="site-announce-inner" aria-hidden="true">
          {MARQUEE_TEXT}{MARQUEE_TEXT}
        </span>
      </div>

      <div className="site-brand-bar">
        <div className="site-brand-left">
          <button
            type="button"
            className="site-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                <path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <a className="site-wordmark" href="/">
          {STUDIO.wordmark}
        </a>

        <div className="site-brand-right">
          <a
            className="site-ig"
            href={STUDIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {STUDIO.instagramHandle}
          </a>
          <a
            className="site-book-btn"
            href={STUDIO.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </a>
        </div>
      </div>

      <nav className="site-nav" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...("external" in link && link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <nav
        className={`site-mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            {...("external" in link && link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </a>
        ))}
        <a
          href={STUDIO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          {STUDIO.instagramHandle}
        </a>
      </nav>
    </header>
  );
}
