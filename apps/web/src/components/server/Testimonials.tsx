// Server component — renders testimonial cards into the client EmblaCarousel.
// Data is static demo content here; swap for an API fetch when reviews are live.
import { EmblaCarousel } from "@/components/client/EmblaCarousel";
import { demoTestimonials, type DemoTestimonial } from "@/lib/demo";

const testimonials: DemoTestimonial[] = demoTestimonials;

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials">
      <style>{`
        .testimonials {
          background: var(--color-surface);
          padding: 96px 24px;
        }
        .testimonials-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .testimonials-eyebrow {
          margin: 0 0 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-gold);
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .testimonials-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 44px;
          color: var(--color-cream);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .testimonials-inner { max-width: 820px; margin: 0 auto; }
        .testimonial-card {
          text-align: center;
          padding: 0 8px;
        }
        .testimonial-quote {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 28px;
          line-height: 1.4;
          color: var(--color-cream);
          letter-spacing: 0.02em;
        }
        .testimonial-author {
          margin: 28px 0 0;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--color-gold);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .testimonial-location {
          margin: 6px 0 0;
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--color-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        @media (max-width: 767px) {
          .testimonials { padding: 64px 20px; }
          .testimonials-head { margin-bottom: 36px; }
          .testimonials-title { font-size: 30px; }
          .testimonial-quote { font-size: 21px; line-height: 1.45; }
          .testimonial-card { padding: 0; }
        }
      `}</style>

      <header className="testimonials-head">
        <p className="testimonials-eyebrow">Kind Words</p>
        <h2 className="testimonials-title">Loved by Our Clients</h2>
      </header>

      <div className="testimonials-inner">
        <EmblaCarousel>
          {testimonials.map((t) => (
            <figure className="testimonial-card" key={t.id}>
              <blockquote className="testimonial-quote">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="testimonial-author">{t.author}</p>
                <p className="testimonial-location">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
}
