"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const ITEMS = [
  "LIVE — Toronto buyer · $1.2M · score 94",
  "LIVE — Cash investor · Vancouver · score 97",
  "LIVE — Pre-approved · Calgary · score 88",
  "LIVE — Seller · Montreal · listing Q1",
  "LIVE — Cash · Ottawa · score 91",
  "LIVE — Pre-approved · Halifax · score 83",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 gap-12 pr-12" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className="font-mono inline-flex items-center gap-3 text-[13px] tracking-[0.08em] whitespace-nowrap text-mtl-fg"
        >
          <span className="h-2 w-2 rounded-full bg-mtl-accent" />
          {item}
        </div>
      ))}
    </div>
  );
}

export function TickerBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(trackRef.current, {
          xPercent: -100 / 3,
          ease: "none",
          duration: 38,
          repeat: -1,
        });

        // WCAG 2.2.2: auto-moving content needs a full pause, reachable by
        // pointer, keyboard (the section is focusable), and touch (tap = focus).
        const pause = contextSafe!(() => {
          gsap.to(tween, { timeScale: 0, duration: 0.4, overwrite: "auto" });
        });
        const restore = contextSafe!(() => {
          gsap.to(tween, { timeScale: 1, duration: 0.4, overwrite: "auto" });
        });
        const el = sectionRef.current!;
        el.addEventListener("mouseenter", pause);
        el.addEventListener("mouseleave", restore);
        el.addEventListener("focusin", pause);
        el.addEventListener("focusout", restore);
        return () => {
          el.removeEventListener("mouseenter", pause);
          el.removeEventListener("mouseleave", restore);
          el.removeEventListener("focusin", pause);
          el.removeEventListener("focusout", restore);
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="relative z-[1] overflow-hidden border-y border-mtl-line bg-mtl-bg-2 py-[18px] focus-visible:outline-2 focus-visible:outline-mtl-accent"
      aria-label="Live lead activity ticker — focus or hover to pause"
    >
      <div ref={trackRef} className="flex w-max">
        <Row />
        <Row ariaHidden />
        <Row ariaHidden />
      </div>
    </section>
  );
}
