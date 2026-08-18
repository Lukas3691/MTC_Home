"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";

type CompareRow = {
  label: string;
  portal: string;
  mtl: string;
};

const ROWS: CompareRow[] = [
  { label: "Lead source", portal: "Cold portal scrape", mtl: "AI-driven intent capture" },
  { label: "Qualification", portal: "Form-only", mtl: "23-signal MTL Score" },
  { label: "Bot/fake filter", portal: "Manual", mtl: "Model auto-rejects" },
  { label: "Outreach", portal: "You write it", mtl: "AI-drafted opener" },
  { label: "Avg. close rate", portal: "4–6%", mtl: "18–22%" },
  { label: "Monthly cost", portal: "$600+", mtl: "From $179" },
];

export function ComparePanel() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // md+ table: card reveal → rows stagger → MTL values decode + portal strikes draw.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const card = desktopCardRef.current;
        if (!card) return;

        const rows = gsap.utils.toArray<HTMLElement>("[data-compare-row]", card);
        const values = gsap.utils.toArray<HTMLElement>("[data-mtl-value]", card);
        const strikes = gsap.utils.toArray<HTMLElement>("[data-strike-bar]", card);

        gsap.set(strikes, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });

        tl.from(card, { y: 48, autoAlpha: 0, duration: 1, ease: "expo.out" }).from(
          rows,
          { y: 24, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 },
          "-=0.6",
        );

        // MTL column values scramble in just as their row lands.
        values.forEach((el, i) => {
          tl.to(
            el,
            {
              duration: 0.8,
              scrambleText: { text: el.textContent ?? "", chars: SCRAMBLE_CHARS, speed: 0.4 },
            } as gsap.TweenVars,
            0.55 + i * 0.08,
          );
        });

        // Portal column line-through draws left → right, staggered down the rows.
        tl.to(strikes, { scaleX: 1, duration: 0.5, ease: "power4.inOut", stagger: 0.08 }, 0.7);
      });

      // Below md — stacked variant: eyebrow decode, masked heading, card + rows reveal.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const eyebrow = eyebrowRef.current;
        const heading = headingRef.current;
        const card = mobileCardRef.current;
        if (!eyebrow || !heading || !card) return;

        gsap.to(eyebrow, {
          duration: 0.9,
          scrambleText: { text: "/compare", chars: SCRAMBLE_CHARS, speed: 0.4 },
          scrollTrigger: { trigger: eyebrow, start: "top 85%", once: true },
        } as gsap.TweenVars);

        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: heading, start: "top 82%", once: true },
            }),
        });

        const rows = gsap.utils.toArray<HTMLElement>("[data-compare-row-m]", card);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
        tl.from(card, { y: 48, autoAlpha: 0, duration: 1, ease: "expo.out" }).from(
          rows,
          { y: 24, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 },
          "-=0.6",
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Portal leads vs. Money Tree comparison"
      className="border-t border-mtl-line px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      {/* ── md+: 3-column comparison table (ARIA roles: divs carry no table
             semantics, and display:grid would strip them from real <table> tags) ── */}
      <div
        ref={desktopCardRef}
        role="table"
        aria-label="Portal leads compared with Money Tree Leads"
        className="mtl-card hidden overflow-hidden md:block"
      >
        <div role="row" className="grid grid-cols-3 border-b border-mtl-line bg-mtl-bg-3 px-8 py-6">
          <div role="columnheader" className="mtl-mono text-[11px] uppercase tracking-[0.16em] text-mtl-fg-3">
            COMPARISON
          </div>
          <div role="columnheader" className="mtl-mono text-[11px] uppercase tracking-[0.16em] text-mtl-fg-3">
            PORTAL LEADS
          </div>
          <div role="columnheader" className="mtl-mono text-[11px] uppercase tracking-[0.16em] text-mtl-accent">
            MONEY TREE LEADS
          </div>
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            role="row"
            data-compare-row
            className={`grid grid-cols-3 items-center px-8 py-[18px] transition-colors hover:bg-mtl-bg-3/60 ${
              i === ROWS.length - 1 ? "" : "border-b border-mtl-line"
            }`}
          >
            <div role="rowheader" className="text-[15px] font-medium text-mtl-fg-2">
              {row.label}
            </div>
            <div role="cell" className="mtl-mono text-[14px] text-mtl-fg-3">
              <span className="relative inline-block">
                {row.portal}
                <span
                  data-strike-bar
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-[52%] h-px bg-mtl-fg-3"
                />
              </span>
            </div>
            <div role="cell" className="mtl-mono text-[14px] font-semibold text-mtl-fg">
              <span aria-hidden="true" className="mr-2 text-mtl-accent">
                ▸
              </span>
              <span data-mtl-value>{row.mtl}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Below md: stacked card variant ── */}
      <div className="md:hidden">
        <div ref={eyebrowRef} className="mtl-eyebrow mb-[14px]">
          /compare
        </div>
        <h2
          ref={headingRef}
          className="mtl-display mb-7 text-[38px] font-semibold leading-[0.96] tracking-[-0.03em]"
        >
          Portal leads vs.
          <br />
          <span className="text-mtl-accent">Money Tree.</span>
        </h2>
        <div ref={mobileCardRef} className="mtl-card overflow-hidden">
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              data-compare-row-m
              className={`p-[18px] ${i === ROWS.length - 1 ? "" : "border-b border-mtl-line"}`}
            >
              <div className="mtl-mono mb-[10px] text-[10px] uppercase tracking-[0.16em] text-mtl-fg-3">
                {row.label}
              </div>
              <div className="mtl-mono flex justify-between gap-3 text-[12px]">
                <div className="flex-1 text-mtl-fg-3 line-through">{row.portal}</div>
                <div className="flex-1 text-right font-semibold text-mtl-fg">
                  <span aria-hidden="true" className="mr-[6px] text-mtl-accent">
                    ▸
                  </span>
                  {row.mtl}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/vs-portal-leads"
          className="mtl-mono text-[12px] tracking-[0.08em] text-mtl-fg-2 transition-colors hover:text-mtl-fg"
        >
          Full comparison: portal leads vs. Money Tree <span className="text-mtl-accent">→</span>
        </Link>
      </div>
    </section>
  );
}
