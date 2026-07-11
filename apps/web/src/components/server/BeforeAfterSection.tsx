// Server component — frames the before/after reveal slider with copy + labels.
import { BeforeAfterSlider } from "@/components/client/BeforeAfterSlider";
import { demoBeforeAfter } from "@/lib/demo";

export default function BeforeAfterSection() {
  const { before, after } = demoBeforeAfter;

  return (
    <section className="ba-section">
      <style>{`
        .ba-section {
          background: var(--color-bg);
          padding: 96px 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .ba-head { text-align: center; margin-bottom: 48px; }
        .ba-eyebrow {
          margin: 0 0 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-accent);
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .ba-title {
          margin: 0;
          font-family: var(--font-impact);
          font-weight: 400;
          font-size: clamp(48px, 6vw, 72px);
          line-height: 0.95;
          color: var(--color-text);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .ba-frame {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          aspect-ratio: 3 / 2;
          border: 1px solid var(--color-border);
          overflow: hidden;
          background: var(--color-surface-elevated);
        }
        .ba-tag {
          position: absolute;
          top: 18px;
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-text);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--color-border);
          padding: 6px 12px;
          pointer-events: none;
        }
        .ba-tag--before { left: 18px; }
        .ba-tag--after { right: 18px; }
        @media (max-width: 767px) {
          .ba-section { padding: 64px 20px; }
          .ba-head { margin-bottom: 32px; }
          .ba-title { font-size: 30px; }
          .ba-frame { aspect-ratio: 4 / 5; }
          .ba-tag { top: 14px; font-size: 10px; padding: 5px 10px; }
          .ba-tag--before { left: 14px; }
          .ba-tag--after { right: 14px; }
        }
      `}</style>

      <header className="ba-head">
        <p className="ba-eyebrow">The Kassey Difference</p>
        <h2 className="ba-title">Before &amp; After</h2>
      </header>

      <div className="ba-frame">
        <span className="ba-tag ba-tag--before">Before</span>
        <span className="ba-tag ba-tag--after">After</span>
        <BeforeAfterSlider
          before={before}
          after={after}
          beforeAlt="Brows before threading"
          afterAlt="Brows after threading and design"
        />
      </div>
    </section>
  );
}
