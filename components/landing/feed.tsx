"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";

interface Lead {
  id: number;
  time: string;
  area: string;
  type: string;
  budget: string;
  score: number;
  status: string;
  name: string;
}

/** Invented examples of the fields a lead carries. Not real people or live data. */
const SAMPLE_LEADS: Lead[] = [
  { id: 0, time: "MON 10:14", area: "EDMONTON, AB", type: "BUYER", budget: "$450–500k", score: 88, status: "WITHIN 3 MONTHS", name: "Sample A." },
  { id: 1, time: "MON 11:32", area: "CALGARY, AB", type: "SELLER", budget: "$600k", score: 74, status: "THIS SPRING", name: "Sample B." },
  { id: 2, time: "MON 15:47", area: "TORONTO, ON", type: "BUYER", budget: "$800–900k", score: 62, status: "WITHIN 6 MONTHS", name: "Sample C." },
  { id: 3, time: "TUE 09:21", area: "VANCOUVER, BC", type: "BUYER", budget: "$1.1M", score: 45, status: "NEXT YEAR", name: "Sample D." },
  { id: 4, time: "TUE 13:05", area: "OTTAWA, ON", type: "SELLER", budget: "NOT SHARED", score: 31, status: "UNDECIDED", name: "Sample E." },
];

function temperatureFor(score: number): string {
  return score >= 70 ? "HOT" : score >= 40 ? "WARM" : "COOL";
}

export function FeedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLUListElement>(null);

  /* ── entrance choreography ───────────────────────────────────── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const eyebrow = eyebrowRef.current;
        const heading = headingRef.current;
        const paragraph = paraRef.current;
        const card = cardRef.current;
        const rows = rowsRef.current ? Array.from(rowsRef.current.children) : [];

        // /feed — terminal decode
        if (eyebrow) {
          gsap.to(eyebrow, {
            duration: 0.9,
            scrambleText: { text: "/feed", chars: SCRAMBLE_CHARS, speed: 0.4 },
            scrollTrigger: { trigger: eyebrow, start: "top 85%", once: true },
          } as gsap.TweenVars);
        }

        // Masked line reveal on the display heading
        if (heading) {
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
        }

        // Right paragraph fade-up
        if (paragraph) {
          gsap.from(paragraph, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: paragraph, start: "top 85%", once: true },
          });
        }

        // Terminal card lift, then rows cascade in
        if (card) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 80%", once: true },
          });
          tl.from(card, { y: 60, autoAlpha: 0, scale: 0.98, duration: 1.2, ease: "expo.out" });
          if (rows.length) {
            tl.from(
              rows,
              {
                x: -16,
                autoAlpha: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.06,
                immediateRender: true,
              },
              "-=0.8",
            );
          }
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="feed"
      ref={sectionRef}
      className="relative z-[1] border-t border-mtl-line px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      {/* header */}
      <div className="mb-7 grid grid-cols-1 items-end gap-7 md:mb-12 md:grid-cols-[0.6fr_1.4fr] md:gap-12">
        <div>
          <div ref={eyebrowRef} className="mtl-eyebrow mb-3.5">
            /feed
          </div>
          <h2
            ref={headingRef}
            className="mtl-display text-[40px] font-semibold leading-[0.96] tracking-[-0.03em] md:text-[52px] lg:text-[64px]"
          >
            Inside
            <br />
            <span className="text-mtl-accent">a lead.</span>
          </h2>
        </div>
        <p ref={paraRef} className="max-w-[520px] text-[15px] leading-[1.55] text-mtl-fg-2 md:text-[17px]">
          This is a sample with invented data, not real people or live activity. Each lead shows
          its score, budget, and timeline, along with the AI summary, transcript, and recording of
          the call.
        </p>
      </div>

      {/* terminal card */}
      <div
        ref={cardRef}
        className="overflow-hidden rounded-[18px] border border-mtl-line-2 bg-mtl-bg-2 shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
      >
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-mtl-line bg-mtl-bg-3 px-3 py-[10px] md:px-4 md:py-3">
          <div className="flex items-center gap-2">
            <span aria-hidden className="flex items-center gap-2">
              <span className="h-[10px] w-[10px] rounded-full bg-[#FF6B5C]" />
              <span className="h-[10px] w-[10px] rounded-full bg-[#F2C94C]" />
              <span className="h-[10px] w-[10px] rounded-full bg-mtl-accent" />
            </span>
            <span className="ml-4 hidden font-mono text-[11px] tracking-[0.1em] text-mtl-fg-2 md:inline">
              sample dashboard — invented data
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mtl-fg-3">sample</span>
        </div>

        {/* feed rows */}
        <ul ref={rowsRef} aria-live="off" aria-label="Sample leads with invented data" className="m-0 list-none p-0">
          {SAMPLE_LEADS.map((row) => {
            const temperature = temperatureFor(row.score);
            return (
              <li
                key={row.id}
                className="grid grid-cols-[64px_1fr_72px] items-center gap-[10px] border-b border-mtl-line px-3 py-3 font-mono text-[12px] last:border-b-0 md:grid-cols-[80px_1.1fr_0.7fr_0.9fr_84px] md:gap-4 md:px-4 md:py-[14px] lg:grid-cols-[88px_1.1fr_0.7fr_0.7fr_0.9fr_84px]"
              >
                <div className="text-[10px] text-mtl-fg-3 md:text-[12px]">{row.time}</div>
                <div>
                  <div className="text-[13px] font-semibold text-mtl-fg md:text-[12px]">{row.name}</div>
                  <div className="mt-0.5 text-[10px] tracking-[0.08em] text-mtl-fg-3">
                    {row.area}
                    <span className="md:hidden"> · {row.budget}</span>
                  </div>
                  <div className="mt-0.5 text-[9px] tracking-[0.08em] text-mtl-fg-3 md:hidden">
                    {row.type} · {row.status}
                  </div>
                </div>
                <div className="hidden text-mtl-fg-2 lg:block">{row.type}</div>
                <div className="hidden text-mtl-fg md:block">{row.budget}</div>
                <div className="hidden text-[10px] tracking-[0.08em] text-mtl-fg-2 md:block">
                  {row.status}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={`rounded-[4px] bg-mtl-accent px-1.5 py-0.5 text-[10px] font-bold text-mtl-accent-ink ${
                      temperature === "HOT" ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {temperature}
                  </span>
                  <span className={`font-semibold ${row.score >= 70 ? "text-mtl-accent" : "text-mtl-fg-2"}`}>
                    {row.score}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* footer */}
        <div className="flex flex-wrap justify-between gap-2 border-t border-mtl-line px-3 py-[10px] font-mono text-[10px] tracking-[0.1em] text-mtl-fg-3 md:px-4 md:py-3">
          <span>SAMPLE DATA · NOT REAL LEADS</span>
        </div>
      </div>
    </section>
  );
}
