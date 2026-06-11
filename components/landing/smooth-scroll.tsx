"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollSmoother } from "@/lib/gsap";

/**
 * ScrollSmoother wrapper. Fixed-position UI (nav, noise overlay) must live
 * OUTSIDE this component — transformed content breaks position: fixed.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.1,
        effects: true,
        smoothTouch: false,
      });
      return () => smoother.kill();
    });
  });

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
