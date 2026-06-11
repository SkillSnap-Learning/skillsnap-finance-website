"use client";

import { ReactLenis } from "lenis/react";

/**
 * Site-wide momentum scrolling. Lenis drives native scrollTop, so CSS
 * scroll-driven animations (animation-timeline: view()) keep working.
 * Respects prefers-reduced-motion by disabling smoothing.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: !reduced,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
