"use client";

import { useState } from "react";
import {
  SERVICE_CATEGORY_LABELS,
  type ServiceCategory,
} from "@/lib/demo";

type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  durationMinutes: number;
  category?: ServiceCategory;
  priceVaries?: boolean;
};

type ServiceGroup = {
  category: ServiceCategory;
  items: ServiceItem[];
};

function formatPrice(s: ServiceItem): string {
  if (s.priceVaries || s.priceCents === 0) return "Varies";
  const d = s.priceCents / 100;
  return Number.isInteger(d) ? `$${d}` : `$${d.toFixed(2)}`;
}

export function ServicesMenu({ groups }: { groups: ServiceGroup[] }) {
  const [active, setActive] = useState<ServiceCategory>(groups[0]?.category ?? "threading");
  const activeItems = groups.find((g) => g.category === active)?.items ?? [];

  return (
    <div className="svc-menu">
      <style>{`
        /* ── Category tabs ── */
        .svc-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
          margin-bottom: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .svc-tabs::-webkit-scrollbar { display: none; }

        .svc-tab {
          flex-shrink: 0;
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-muted);
          background: transparent;
          border: 1px solid var(--color-border);
          padding: 10px 20px;
          cursor: pointer;
          transition: color 150ms ease-out, background 150ms ease-out, border-color 150ms ease-out;
          white-space: nowrap;
        }
        .svc-tab:hover {
          color: var(--color-text);
          border-color: var(--color-text);
        }
        .svc-tab.is-active {
          background: var(--color-text);
          color: var(--color-white);
          border-color: var(--color-text);
        }

        /* ── Service rows ── */
        .svc-list {
          max-width: 840px;
          margin: 0 auto;
        }

        .svc-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: baseline;
          gap: 16px;
          padding: 22px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .svc-row:first-child {
          border-top: 1px solid var(--color-border);
        }

        .svc-name {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 22px;
          color: var(--color-text);
          letter-spacing: 0.02em;
        }
        .svc-desc {
          margin: 6px 0 0;
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 13px;
          line-height: 1.6;
          color: var(--color-muted);
          max-width: 520px;
        }

        .svc-meta {
          text-align: right;
          white-space: nowrap;
          align-self: start;
          padding-top: 4px;
        }
        .svc-price {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--color-accent-dark);
          letter-spacing: 0.05em;
        }
        .svc-duration {
          margin-top: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-muted);
          letter-spacing: 0.1em;
        }
        .svc-book {
          display: inline-block;
          margin-top: 8px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          border-bottom: 1px solid var(--color-accent);
          transition: color 150ms ease-out;
        }
        .svc-book:hover { color: var(--color-accent-dark); }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .svc-tabs {
            justify-content: flex-start;
            flex-wrap: nowrap;
            margin-bottom: 28px;
            gap: 6px;
          }
          .svc-tab { padding: 9px 14px; font-size: 10px; letter-spacing: 0.14em; }
          .svc-row { padding: 18px 0; gap: 14px; }
          .svc-name { font-size: 19px; }
          .svc-desc { font-size: 12px; margin-top: 4px; }
          .svc-price { font-size: 15px; }
          .svc-book { font-size: 10px; }
        }
        @media (max-width: 420px) {
          .svc-tab { padding: 8px 12px; }
          .svc-name { font-size: 17px; }
          .svc-duration { font-size: 10px; }
        }
      `}</style>

      <div className="svc-tabs" role="tablist" aria-label="Service categories">
        {groups.map(({ category }) => (
          <button
            key={category}
            role="tab"
            type="button"
            aria-selected={active === category}
            className={`svc-tab${active === category ? " is-active" : ""}`}
            onClick={() => setActive(category)}
          >
            {SERVICE_CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      <div className="svc-list" role="tabpanel">
        {activeItems.map((service) => (
          <div className="svc-row" key={service.id}>
            <div>
              <h3 className="svc-name">{service.name}</h3>
              {service.description ? (
                <p className="svc-desc">{service.description}</p>
              ) : null}
            </div>
            <div className="svc-meta">
              <div className="svc-price">{formatPrice(service)}</div>
              <div className="svc-duration">{service.durationMinutes} MIN</div>
              <a className="svc-book" href={`/book?service=${service.slug}`}>
                Book
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
