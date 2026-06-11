"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Stat = {
  value: string;
  label: string;
  end: number;
  format: (v: number) => string;
};

const STATS: Stat[] = [
  {
    value: "$2.1B",
    label: "closed via MTL",
    end: 2.1,
    format: (v) => `$${v.toFixed(1)}B`,
  },
  {
    value: "18,400",
    label: "realtors active",
    end: 18400,
    format: (v) => Math.round(v).toLocaleString("en-CA"),
  },
  {
    value: "4.1M",
    label: "transactions trained",
    end: 4.1,
    format: (v) => `${v.toFixed(1)}M`,
  },
  {
    value: "28d",
    label: "median time-to-close",
    end: 28,
    format: (v) => `${Math.round(v)}d`,
  },
  {
    value: "97.4%",
    label: "lead match accuracy",
    end: 97.4,
    format: (v) => `${v.toFixed(1)}%`,
  },
];

export function ProofBand() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        if (!section) return;

        const cols = gsap.utils.toArray<HTMLElement>("[data-proof-col]", section);
        const nums = gsap.utils.toArray<HTMLElement>("[data-proof-num]", section);
        const labels = gsap.utils.toArray<HTMLElement>("[data-proof-label]", section);

        // Columns fade up, staggered.
        gsap.from(cols, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });

        // Labels arrive slightly after their number.
        gsap.from(labels, {
          y: 10,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.35,
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });

        // Counters — exact formatting, aligned with each column's reveal.
        nums.forEach((el, i) => {
          const stat = STATS[i];
          if (!stat) return;
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: stat.end,
            duration: 1.8,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
            onUpdate: () => {
              el.textContent = stat.format(proxy.v);
            },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="border-y border-mtl-line bg-mtl-bg-2 px-5 py-10 md:px-10 md:py-14"
    >
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-5 md:gap-8">
        {STATS.map(({ value, label }, i) => (
          <li
            key={label}
            data-proof-col
            className={i ? "md:border-l md:border-mtl-line md:pl-6" : undefined}
          >
            <div
              data-proof-num
              className="mtl-num text-[36px] leading-[0.95] md:text-[52px]"
            >
              {value}
            </div>
            <div
              data-proof-label
              className="mtl-mono mt-[10px] text-[11px] uppercase tracking-[0.14em] text-mtl-fg-3"
            >
              {label}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
