"use client";

// Reusable luxury carousel for testimonials and service cards.
// Embla + autoplay, loop, custom gold prev/next controls (never Embla defaults).

import { Children, useCallback, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type EmblaCarouselProps = {
  children: ReactNode;
  /** Optional className for each slide (controls slide width via flex-basis). */
  slideClassName?: string;
};

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: direction === "next" ? "rotate(180deg)" : undefined,
      }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function EmblaCarousel({
  children,
  slideClassName,
}: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slides = Children.toArray(children);

  return (
    <div className="embla">
      <style>{`
        .embla { position: relative; }
        .embla__viewport { overflow: hidden; }
        .embla__container { display: flex; }
        .embla__slide {
          position: relative;
          flex: 0 0 100%;
          min-width: 0;
          padding: 0 16px;
        }
        .embla__controls {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 36px;
        }
        .embla__btn {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          background: transparent;
          border: 1px solid var(--color-gold);
          border-radius: 50%;
          cursor: pointer;
          transition: background 200ms ease-out;
        }
        .embla__btn:hover { background: rgba(201, 169, 110, 0.1); }
        @media (max-width: 767px) {
          .embla__slide { padding: 0 6px; }
          .embla__controls { margin-top: 28px; gap: 20px; }
          .embla__btn { width: 48px; height: 48px; }
        }
      `}</style>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, i) => (
            <div className={`embla__slide ${slideClassName ?? ""}`} key={i}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <button
          className="embla__btn"
          onClick={scrollPrev}
          aria-label="Previous"
          type="button"
        >
          <Arrow direction="prev" />
        </button>
        <button
          className="embla__btn"
          onClick={scrollNext}
          aria-label="Next"
          type="button"
        >
          <Arrow direction="next" />
        </button>
      </div>
    </div>
  );
}
