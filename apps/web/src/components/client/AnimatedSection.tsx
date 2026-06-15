"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Luxury motion signature — unhurried cubic-bezier, never spring, never bounce.
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const LUXURY_DURATION = 0.85;

// Re-export motion so other client components share one Framer Motion instance
// and never import it directly inside a server component.
export { motion };

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE },
  },
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  /** Stagger child entrances when children use the shared variants. */
  stagger?: boolean;
  as?: "section" | "div" | "article" | "header" | "footer";
};

/**
 * Wraps content in a standard luxury entrance animation:
 * fades + lifts into view once, respecting `whileInView` + `viewport once`.
 */
export function AnimatedSection({
  children,
  className,
  stagger = false,
  as = "section",
}: AnimatedSectionProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={
        stagger
          ? {
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }
          : defaultVariants
      }
    >
      {children}
    </MotionTag>
  );
}
