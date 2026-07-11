// Pure React Server Component — retail shop section (Posh-style product grid).
// Scaffold: shows coming-soon when catalog is empty; ready for real SKUs later.

import { isDemoMode, demoProducts, type DemoProduct } from "@/lib/demo";
import { STUDIO } from "@/lib/studio";

type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  priceCents: number;
  imageUrl?: string;
  available: boolean;
  featured: boolean;
};

async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/products`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const products = (await res.json()) as Product[];
        return products;
      }
    } catch {
      // fall through
    }
  }
  if (isDemoMode()) return demoProducts as DemoProduct[];
  return [];
}

function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export default async function ProductsSection() {
  const products = await getProducts();
  const hasProducts = products.length > 0;

  return (
    <section className="products-section" id="shop">
      <style>{`
        .products-section {
          background: var(--color-bg);
          padding: 96px 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .products-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .products-eyebrow {
          margin: 0 0 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-accent);
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .products-title {
          margin: 0;
          font-family: var(--font-impact);
          font-weight: 400;
          font-size: clamp(48px, 6vw, 72px);
          line-height: 0.95;
          color: var(--color-text);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .products-subhead {
          margin: 16px 0 0;
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 15px;
          color: var(--color-muted);
        }
        .products-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px 24px;
        }
        .product-card {
          display: flex;
          flex-direction: column;
        }
        .product-media {
          position: relative;
          aspect-ratio: 1 / 1;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border);
          overflow: hidden;
        }
        .product-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: var(--color-surface);
          color: var(--color-text);
          padding: 6px 10px;
          border: 1px solid var(--color-border);
        }
        .product-brand {
          margin: 16px 0 0;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .product-name {
          margin: 8px 0 0;
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .product-price {
          margin: 10px 0 0;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-text);
        }
        .product-cta {
          margin-top: 14px;
          align-self: flex-start;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-muted);
          border: 1px solid var(--color-border);
          background: transparent;
          padding: 10px 18px;
          text-decoration: none;
          cursor: default;
        }
        .products-empty {
          max-width: 520px;
          margin: 0 auto;
          text-align: center;
          padding: 56px 24px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
        }
        .products-empty p {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 22px;
          line-height: 1.5;
          color: var(--color-text);
        }
        .products-empty a {
          display: inline-block;
          margin-top: 24px;
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
          text-decoration: none;
          border: 1px solid var(--color-accent);
          padding: 12px 28px;
        }
        .products-empty a:hover {
          background: rgba(201, 169, 110, 0.1);
        }
        @media (max-width: 900px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .products-section { padding: 64px 20px; }
          .products-title { font-size: 30px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: none; }
          .products-empty { padding: 40px 20px; }
          .products-empty p { font-size: 18px; }
        }
        @media (max-width: 420px) {
          .products-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; }
        }
      `}</style>

      <header className="products-head">
        <p className="products-eyebrow">Take the Glow Home</p>
        <h2 className="products-title">Studio Favorites</h2>
        <p className="products-subhead">
          Curated picks for your at-home brow ritual — drops coming soon.
        </p>
      </header>

      {hasProducts ? (
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.imageUrl} alt={product.name} />
                ) : null}
                {!product.available ? (
                  <span className="product-badge">Coming Soon</span>
                ) : null}
              </div>
              <p className="product-brand">{STUDIO.wordmark}</p>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{formatPrice(product.priceCents)}</p>
              <span className="product-cta">
                {product.available ? "Notify Me" : "Coming Soon"}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="products-empty">
          <p>
            Retail collection launching soon. Follow {STUDIO.instagramHandle}{" "}
            for drops.
          </p>
          <a
            href={STUDIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow {STUDIO.instagramHandle}
          </a>
        </div>
      )}
    </section>
  );
}
