"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";

type Stage = {
  k: string;
  t: string;
  d: string;
  /** Rendered (final) number text — also the SSR fallback. */
  num: string;
  /** Static suffix after the counting number ("" when none). */
  suffix: string;
  /** Counter end value; null → no count (fades with the card). */
  end: number | null;
  format?: (v: number) => string;
};

const STAGES: Stage[] = [
  {
    k: "INGEST",
    t: "Intent capture",
    d: "Cross-platform ads + partner sites pull every active home shopper in your territory.",
    num: "12,400",
    suffix: " / day",
    end: 12400,
    format: (v) => Math.round(v).toLocaleString("en-CA"),
  },
  {
    k: "CLASSIFY",
    t: "Bot / spam filter",
    d: "Model rejects fake submissions, duplicates, and 30+ low-intent patterns instantly.",
    num: "89%",
    suffix: " kept",
    end: 89,
    format: (v) => `${Math.round(v)}%`,
  },
  {
    k: "ENRICH",
    t: "Data enrichment",
    d: "Mortgage status, employer signal, listing history, and household composition pulled.",
    num: "23",
    suffix: " signals",
    end: 23,
    format: (v) => `${Math.round(v)}`,
  },
  {
    k: "SCORE",
    t: "MTL Score 0–100",
    d: "Trained on 4.1M closed transactions. Anything below 70 never reaches you.",
    num: "70+",
    suffix: " threshold",
    end: 70,
    format: (v) => `${Math.round(v)}+`,
  },
  {
    k: "ROUTE",
    t: "Realtor match",
    d: "Geographic, price-band, and specialty match. You get the leads built for you.",
    num: "< 4 sec",
    suffix: "",
    end: null,
  },
];

/**
 * Internal 1px borders, replicating the prototype's borderLeft/borderTop logic:
 * - mobile (1 col): top border on every card after the first
 * - tablet (2 cols): top border on rows 2+ (i ≥ 2), no left borders
 * - desktop (5 cols): left border on every card after the first, no top borders
 */
function cardBorders(i: number): string {
  if (i === 0) return "";
  if (i === 1) return "border-t border-mtl-line md:border-t-0 lg:border-l";
  return "border-t border-mtl-line lg:border-t-0 lg:border-l";
}

export function Engine() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const eyebrow = eyebrowRef.current;
        const heading = headingRef.current;
        const para = paraRef.current;
        const grid = gridRef.current;
        if (!eyebrow || !heading || !para || !grid) return;

        // Eyebrow — terminal decode.
        gsap.to(eyebrow, {
          duration: 0.9,
          scrambleText: { text: "/engine", chars: SCRAMBLE_CHARS, speed: 0.4 },
          scrollTrigger: { trigger: eyebrow, start: "top 85%", once: true },
        } as gsap.TweenVars);

        // Heading — masked line reveal.
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

        // Right paragraph — fade up.
        gsap.from(para, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: para, start: "top 85%", once: true },
        });

        // Stage cards — staggered reveal.
        const cards = gsap.utils.toArray<HTMLElement>("[data-stage-card]", grid);
        gsap.from(cards, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });

        // Step index labels (01 · INGEST …) — scramble in, staggered.
        const labels = gsap.utils.toArray<HTMLElement>("[data-stage-index]", grid);
        labels.forEach((el, i) => {
          gsap.to(el, {
            duration: 0.9,
            delay: i * 0.08,
            scrambleText: { text: el.textContent ?? "", chars: SCRAMBLE_CHARS, speed: 0.4 },
            scrollTrigger: { trigger: grid, start: "top 85%", once: true },
          } as gsap.TweenVars);
        });

        // Bottom metrics — count up where numeric (suffix text stays static).
        const nums = gsap.utils.toArray<HTMLElement>("[data-stage-num]", grid);
        nums.forEach((el) => {
          const i = Number(el.dataset.stageNum);
          const stage = STAGES[i];
          if (!stage || stage.end === null || !stage.format) return;
          const { end, format } = stage;
          const proxy = { v: 0 };
          gsap.to(proxy, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: grid, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = format(proxy.v);
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
      id="engine"
      className="border-t border-mtl-line px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      {/* Header grid */}
      <div className="mb-9 grid gap-6 md:mb-16 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <div ref={eyebrowRef} className="mtl-eyebrow mb-[14px]">
            /engine
          </div>
          <h2
            ref={headingRef}
            className="mtl-display text-[40px] leading-[0.96] font-semibold tracking-[-0.03em] md:text-[52px] lg:text-[64px]"
          >
            Five stages.
            <br />
            One unfair
            <br />
            <span className="text-mtl-accent">advantage.</span>
          </h2>
        </div>
        <p
          ref={paraRef}
          className="max-w-[540px] text-[15px] leading-[1.55] text-mtl-fg-2 md:mt-auto md:text-[17px]"
        >
          Every lead is processed through five layers before it touches your inbox. The leads you
          see have already beaten 89% of competitors in your market.{" "}
          <span className="text-mtl-fg">That&apos;s the moat.</span>
        </p>
      </div>

      {/* Stage grid */}
      <ol
        ref={gridRef}
        className="grid overflow-hidden rounded-[18px] border border-mtl-line md:grid-cols-2 lg:grid-cols-5"
      >
        {STAGES.map((s, i) => (
          <li
            key={s.k}
            data-stage-card
            className={`flex flex-col px-[22px] py-6 md:min-h-[260px] ${
              i % 2 ? "bg-mtl-bg-2" : "bg-mtl-bg"
            } ${cardBorders(i)}`}
          >
            <div
              data-stage-index
              className="mtl-mono mb-4 text-[10px] tracking-[0.18em] text-mtl-accent"
            >
              {String(i + 1).padStart(2, "0")} · {s.k}
            </div>
            <h3 className="mtl-display mb-3 text-[22px] leading-[1.05] font-semibold tracking-[-0.02em]">
              {s.t}
            </h3>
            <p className="mb-5 text-[13px] leading-[1.5] text-mtl-fg-2">{s.d}</p>
            <div className="mt-auto border-t border-mtl-line pt-3">
              <div className="mtl-num text-[20px] text-mtl-accent">
                {s.end !== null ? (
                  <>
                    <span data-stage-num={i}>{s.num}</span>
                    {s.suffix}
                  </>
                ) : (
                  s.num
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
