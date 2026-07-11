"use client";

import { useState } from "react";
import Link from "next/link";
import { ANNOUNCEMENT, STUDIO } from "@/lib/studio";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#shop", label: "Shop" },
  { href: "/book", label: "Book" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--color-bg);
        }
        .site-announce {
          background: var(--color-surface);
          text-align: center;
          padding: 10px 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .site-brand-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 18px 28px;
          border-bottom: 1px solid var(--color-border);
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
          padding: 8px;
          cursor: pointer;
          color: var(--color-text);
        }
        .site-wordmark {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 18px;
          letter-spacing: 0.28em;
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
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-muted);
          text-decoration: none;
        }
        .site-ig:hover { color: var(--color-text); }
        .site-book-btn {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text);
          border: 1px solid var(--color-accent);
          background: transparent;
          padding: 10px 20px;
          text-decoration: none;
          transition: background 200ms ease-out, color 200ms ease-out;
        }
        .site-book-btn:hover {
          background: var(--color-accent);
          color: var(--color-white);
        }
        .site-nav {
          background: var(--color-surface);
          display: flex;
          justify-content: center;
          gap: 36px;
          padding: 12px 24px;
        }
        .site-nav a {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
        }
        .site-nav a:hover { color: var(--color-accent-dark); }
        .site-mobile-nav {
          display: none;
          flex-direction: column;
          gap: 0;
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }
        .site-mobile-nav a {
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          padding: 16px 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .site-mobile-nav.is-open { display: flex; }
        @media (max-width: 767px) {
          .site-brand-bar {
            grid-template-columns: auto 1fr auto;
            padding: 14px 16px;
          }
          .site-menu-btn { display: inline-flex; }
          .site-wordmark { font-size: 14px; letter-spacing: 0.18em; }
          .site-ig { display: none; }
          .site-book-btn { padding: 8px 14px; font-size: 10px; }
          .site-nav { display: none; }
          .site-announce { font-size: 10px; letter-spacing: 0.12em; padding: 8px 12px; }
        }
      `}</style>

      <div className="site-announce">{ANNOUNCEMENT}</div>

      <div className="site-brand-bar">
        <div className="site-brand-left">
          <button
            type="button"
            className="site-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
              <path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        <Link className="site-wordmark" href="/">
          {STUDIO.wordmark}
        </Link>

        <div className="site-brand-right">
          <a
            className="site-ig"
            href={STUDIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {STUDIO.instagramHandle}
          </a>
          <a className="site-book-btn" href="/book">
            Book Now
          </a>
        </div>
      </div>

      <nav className="site-nav" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <nav
        className={`site-mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
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
