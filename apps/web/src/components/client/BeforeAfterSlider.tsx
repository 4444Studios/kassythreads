"use client";

// Before/after treatment reveal. Wraps react-compare-slider with a gold handle.
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export function BeforeAfterSlider({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
}: BeforeAfterSliderProps) {
  return (
    <ReactCompareSlider
      // Only the handle drags — lets users scroll past the slider on touch
      // without accidentally scrubbing it.
      onlyHandleDraggable
      handle={
        <ReactCompareSliderHandle
          buttonStyle={{
            backdropFilter: "none",
            background: "var(--color-gold)",
            border: 0,
            color: "var(--color-bg)",
            boxShadow: "0 0 0 1px rgba(201,169,110,0.5)",
          }}
          linesStyle={{ color: "var(--color-gold)", width: 2 }}
        />
      }
      itemOne={
        <ReactCompareSliderImage
          src={before}
          alt={beforeAlt}
          style={{ objectFit: "cover" }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={after}
          alt={afterAlt}
          style={{ objectFit: "cover" }}
        />
      }
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 2,
      }}
    />
  );
}
