"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";

type Stage = {
  k: string;
  t: string;
  d: string;
  /** Short plain-language tag at the foot of the card. */
  tag: string;
};

const STAGES: Stage[] = [
  {
    k: "INTAKE",
    t: "Enquiry",
    d: "People respond to our ad campaigns and enquiry forms, and agree to be contacted.",
    tag: "With consent",
  },
  {
    k: "CHECK",
    t: "Number check",
    d: "Disconnected numbers and anyone on our do-not-contact list are removed before a call is placed.",
    tag: "Before dialling",
  },
  {
    k: "CALL",
    t: "AI assistant calls",
    d: "The assistant calls during calling hours, tries again if nobody answers, and follows up by text.",
    tag: "Call + text",
  },
  {
    k: "SCORE",
    t: "Score 0–100",
    d: "Each conversation is scored on timeline, budget, and motivation. People who decline an agent or already have one are screened out.",
    tag: "From the call",
  },
  {
    k: "ROUTE",
    t: "One agent",
    d: "Each lead goes to one agent whose preferences match. Higher plans get priority.",
    tag: "1 agent per lead",
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
            One real
            <br />
            <span className="text-mtl-accent">conversation.</span>
          </h2>
        </div>
        <p
          ref={paraRef}
          className="max-w-[540px] text-[15px] leading-[1.55] text-mtl-fg-2 md:mt-auto md:text-[17px]"
        >
          Every lead goes through the same five steps before it reaches you.{" "}
          <span className="text-mtl-fg">
            By then someone has spoken with them, and you can read or hear exactly what they said.
          </span>
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
              <div className="mtl-num text-[20px] text-mtl-accent">{s.tag}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <Link
          href="/how-it-works"
          className="mtl-mono text-[12px] tracking-[0.08em] text-mtl-fg-2 transition-colors hover:text-mtl-fg"
        >
          Full breakdown: how the engine works <span className="text-mtl-accent">→</span>
        </Link>
      </div>
    </section>
  );
}
