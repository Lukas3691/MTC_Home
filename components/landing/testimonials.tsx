"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger, SplitText } from "@/lib/gsap";

type Stat = {
  /** Final on-screen string, e.g. "+$184k" — also the SSR / reduced-motion text. */
  display: string;
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  stat: Stat;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I closed 3 deals my first month. Leads come pre-warmed — I just had to show up and not screw it up.",
    name: "Jordan Velasquez",
    role: "Solo · GTA · 8 yrs",
    stat: { display: "+$184k", prefix: "+$", value: 184, suffix: "k", decimals: 0, label: "GCI / 90d" },
  },
  {
    quote:
      "I cancelled my Zillow Premier. MTL closes at almost 3x the rate for half the price. Not even close.",
    name: "Theresa N.",
    role: "Team lead · Maple Realty",
    stat: { display: "2.8×", prefix: "", value: 2.8, suffix: "×", decimals: 1, label: "close rate" },
  },
  {
    quote:
      "The scoring is wild. If a lead is below 80, I trust the system and skip — saves me hours every week.",
    name: "Amir Khoury",
    role: "Solo · Ottawa · 4 yrs",
    stat: { display: "11h", prefix: "", value: 11, suffix: "h", decimals: 0, label: "saved / week" },
  },
  {
    quote: "My pipeline went from chaos to a queue. I literally just work the top of the list.",
    name: "Sasha O.",
    role: "Solo · Vancouver · 12 yrs",
    stat: { display: "4.2×", prefix: "", value: 4.2, suffix: "×", decimals: 1, label: "pipeline value" },
  },
];

const BROKERAGES = [
  "ROYAL · LEPAGE",
  "RE/MAX FOREST",
  "SUTTON CO.",
  "CENTURY HOMES",
  "EXP REALTY",
  "KELLER MAPLE",
  "CONDO COLLECTIVE",
  "ENGEL · WEST",
];

const STARS = "★★★★★";
const STAR_CHARS = "★✦+";

function formatStat(stat: Stat, value: number): string {
  return `${stat.prefix}${value.toFixed(stat.decimals)}${stat.suffix}`;
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reviewsRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const grid = gridRef.current;
      const strip = stripRef.current;
      if (!section || !heading || !grid || !strip) return;

      const mm = gsap.matchMedia();

      // Desktop only: alternate column scroll speeds for a slight parallax
      // offset between the two card columns. Effects are registered explicitly:
      // ScrollSmoother only scans data-speed attributes once at creation, so
      // attributes set from a matchMedia handler would be inert when the
      // viewport crosses the breakpoint after load. Deferred a tick because
      // this child effect runs before <SmoothScroll> creates the smoother.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        let triggers: ScrollTrigger[] | undefined;
        const deferred = gsap.delayedCall(0, () => {
          const smoother = ScrollSmoother.get();
          if (!smoother) return;
          const offsetCards = gsap.utils
            .toArray<HTMLElement>("[data-quote-card]", section)
            .filter((_, i) => i % 2 === 1);
          triggers = smoother.effects(offsetCards, { speed: 0.96 });
        });
        return () => {
          deferred.kill();
          triggers?.forEach((t) => t.kill());
        };
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // h2 — masked line reveal (house pattern).
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

        // Right mono review count — quiet secondary fade.
        if (reviewsRef.current) {
          gsap.from(reviewsRef.current, {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.25,
            scrollTrigger: { trigger: heading, start: "top 82%", once: true },
          });
        }

        // Cards: reveal + per-card star scramble + stat counters, one timeline.
        const cards = gsap.utils.toArray<HTMLElement>("[data-quote-card]", section);
        const counters: { el: HTMLElement; stat: Stat }[] = [];

        const tl = gsap.timeline({
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });

        tl.from(cards, { y: 36, autoAlpha: 0, duration: 1, ease: "expo.out", stagger: 0.12 }, 0);

        cards.forEach((card, i) => {
          const at = i * 0.12; // card i's reveal start within the timeline

          const stars = card.querySelector<HTMLElement>("[data-stars]");
          if (stars) {
            tl.to(
              stars,
              {
                duration: 0.6,
                scrambleText: { text: STARS, chars: STAR_CHARS, speed: 0.4 },
              } as gsap.TweenVars,
              at + 0.15,
            );
          }

          const num = card.querySelector<HTMLElement>("[data-stat-num]");
          const stat = TESTIMONIALS[i]?.stat;
          if (num && stat) {
            counters.push({ el: num, stat });
            num.textContent = formatStat(stat, 0); // card is hidden at this point
            const proxy = { v: 0 };
            tl.to(
              proxy,
              {
                v: stat.value,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                  num.textContent = formatStat(stat, proxy.v);
                },
              },
              at + 0.25,
            );
          }
        });

        // Brokerage strip — gentle fade-in cascade.
        gsap.from(gsap.utils.toArray<HTMLElement>("[data-brokerage]", strip), {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: strip, start: "top 88%", once: true },
        });

        return () => {
          counters.forEach(({ el, stat }) => {
            el.textContent = stat.display;
          });
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="px-5 py-[72px] md:px-10 md:py-[120px]">
      {/* header row */}
      <div className="mb-7 flex flex-col items-start justify-between gap-3 md:mb-14 md:flex-row md:items-end md:gap-6">
        <h2
          ref={headingRef}
          className="mtl-display max-w-[720px] text-[40px] leading-[0.96] font-semibold tracking-[-0.03em] md:text-[64px]"
        >
          The realtors
          <br />
          who stopped chasing.
        </h2>
        <p ref={reviewsRef} className="mtl-mono text-[12px] tracking-[0.14em] text-mtl-fg-3">
          AVG 4.8 / 5 · 1,283 REVIEWS
        </p>
      </div>

      {/* quote cards */}
      <div ref={gridRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            data-quote-card
            className="mtl-card flex flex-col gap-[18px] p-7 transition-[translate,border-color] duration-200 hover:-translate-y-1 hover:border-mtl-line-2 md:gap-6 md:p-9"
          >
            <div
              data-stars
              role="img"
              aria-label="Rated 5 out of 5 stars"
              className="mtl-mono text-[10px] tracking-[0.18em] text-mtl-accent"
            >
              {STARS}
            </div>
            <blockquote className="mtl-display text-[20px] leading-[1.3] font-medium tracking-[-0.015em] md:text-[26px]">
              &quot;{t.quote}&quot;
            </blockquote>
            <figcaption className="mt-auto flex items-center justify-between border-t border-mtl-line pt-[18px]">
              <div>
                <div className="text-[14px] font-semibold">{t.name}</div>
                <div className="mtl-mono mt-[2px] text-[11px] text-mtl-fg-3">{t.role}</div>
              </div>
              <div className="text-right">
                <div data-stat-num className="mtl-num text-[22px] text-mtl-accent md:text-[26px]">
                  {t.stat.display}
                </div>
                <div className="mtl-mono text-[10px] tracking-[0.12em] uppercase text-mtl-fg-3">
                  {t.stat.label}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* brokerage strip */}
      <ul
        ref={stripRef}
        aria-label="Brokerages whose realtors use Money Tree Leads"
        className="mt-10 flex list-none flex-wrap justify-center gap-x-10 gap-y-[18px] border-t border-mtl-line pt-6 md:mt-14 md:pt-8"
      >
        {BROKERAGES.map((b) => (
          <li
            key={b}
            data-brokerage
            className="mtl-mono text-[11px] font-medium tracking-[0.2em] text-mtl-fg-3 md:text-[13px]"
          >
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}
