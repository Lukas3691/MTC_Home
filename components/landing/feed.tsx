"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";

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

const INITIAL_FEED: Lead[] = [
  { id: 0, time: "14:02:14", area: "TORONTO · M5V", type: "BUYER", budget: "$1.0–1.4M", score: 94, status: "PRE-APPROVED", name: "Daniela R." },
  { id: 1, time: "14:01:58", area: "CALGARY · T2P", type: "SELLER", budget: "$410k", score: 81, status: "LISTING Q1", name: "Kara N." },
  { id: 2, time: "14:01:31", area: "OTTAWA · K1Y", type: "BUYER", budget: "$880k", score: 88, status: "CLOSING 14d", name: "Priya & Sam" },
  { id: 3, time: "14:00:47", area: "VANCOUVER · V6B", type: "BUYER", budget: "$2.4M", score: 97, status: "CASH", name: "Marcus T." },
  { id: 4, time: "14:00:12", area: "MONTREAL · H3A", type: "BUYER", budget: "$640k", score: 86, status: "PRE-APPROVED", name: "Élise B." },
  { id: 5, time: "13:59:38", area: "TORONTO · M4E", type: "SELLER", budget: "$1.8M", score: 79, status: "EVAL", name: "Owen W." },
  { id: 6, time: "13:59:02", area: "HAMILTON · L8P", type: "BUYER", budget: "$520k", score: 84, status: "PRE-APPROVED", name: "Jenny F." },
  { id: 7, time: "13:58:11", area: "EDMONTON · T5J", type: "BUYER", budget: "$390k", score: 73, status: "PRE-QUAL", name: "Tom L." },
];

/** Extra realistic Canadian leads rotated into the feed while the section is live. */
const LEAD_POOL: Omit<Lead, "id" | "time">[] = [
  { area: "WINNIPEG · R3C", type: "BUYER", budget: "$340k", score: 77, status: "PRE-QUAL", name: "Noah B." },
  { area: "MISSISSAUGA · L5B", type: "BUYER", budget: "$910k", score: 91, status: "PRE-APPROVED", name: "Fatima A." },
  { area: "VICTORIA · V8W", type: "SELLER", budget: "$1.1M", score: 83, status: "LISTING Q1", name: "Gord & May" },
  { area: "QUÉBEC · G1R", type: "BUYER", budget: "$450k", score: 86, status: "PRE-APPROVED", name: "Camille D." },
  { area: "SASKATOON · S7K", type: "BUYER", budget: "$380k", score: 71, status: "EVAL", name: "Ryan K." },
  { area: "LONDON · N6A", type: "BUYER", budget: "$620k", score: 88, status: "CLOSING 14d", name: "Aisha & Dev" },
  { area: "HALIFAX · B3J", type: "BUYER", budget: "$540k", score: 92, status: "CASH", name: "Marie C." },
  { area: "KITCHENER · N2G", type: "SELLER", budget: "$760k", score: 79, status: "EVAL", name: "Stefan H." },
];

const TABS = ["Feed", "Pipeline", "Scoring", "Settings"];

function tierFor(score: number): string {
  return score >= 90 ? "A+" : score >= 85 ? "A" : score >= 80 ? "B" : "C";
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function FeedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLUListElement>(null);

  const [feed, setFeed] = useState<Lead[]>(INITIAL_FEED);
  const [countdown, setCountdown] = useState(58);
  const [active, setActive] = useState(false);
  const [docVisible, setDocVisible] = useState(true);
  const poolIndexRef = useRef(0);
  const idRef = useRef(INITIAL_FEED.length);

  /* ── entrance choreography ───────────────────────────────────── */
  useGSAP(
    () => {
      // Activity gate for the live feed — outside the reduced-motion guard:
      // rows still rotate with reduced motion (content change is fine).
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => setActive(self.isActive),
        });
      }

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

  /* ── tab visibility gate ─────────────────────────────────────── */
  useEffect(() => {
    const onVisibility = () => setDocVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ── live rotation + batch countdown (only in-view & tab visible) ── */
  useEffect(() => {
    if (!active || !docVisible) return;

    const rotate = window.setInterval(() => {
      const src = LEAD_POOL[poolIndexRef.current % LEAD_POOL.length];
      poolIndexRef.current += 1;
      const now = new Date();
      const next: Lead = {
        ...src,
        id: idRef.current++,
        time: `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`,
      };
      // unshift the new lead, drop the last — 8 rows always, height never shifts
      setFeed((prev) => [next, ...prev.slice(0, prev.length - 1)]);
    }, 3500);

    const tick = window.setInterval(() => {
      setCountdown((c) => (c <= 0 ? 58 : c - 1));
    }, 1000);

    return () => {
      window.clearInterval(rotate);
      window.clearInterval(tick);
    };
  }, [active, docVisible]);

  /* ── animate a freshly inserted row ──────────────────────────── */
  const latestId = feed[0].id;
  useEffect(() => {
    if (latestId < INITIAL_FEED.length) return; // initial rows are handled by the entrance timeline
    const rowEl = rowsRef.current?.firstElementChild;
    if (!(rowEl instanceof HTMLElement)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.killTweensOf(rowEl);
    gsap.from(rowEl, { autoAlpha: 0, x: -24, duration: 0.5, ease: "power3.out" });
    // accent highlight flash (prototype's isNew state: accent 8% → transparent)
    gsap.fromTo(
      rowEl,
      { backgroundColor: "rgba(109, 255, 82, 0.08)" },
      { backgroundColor: "rgba(109, 255, 82, 0)", duration: 1.2, ease: "power2.out", clearProps: "backgroundColor" },
    );
  }, [latestId]);

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
            Watch warm
            <br />
            leads <span className="text-mtl-accent">land.</span>
          </h2>
        </div>
        <p ref={paraRef} className="max-w-[520px] text-[15px] leading-[1.55] text-mtl-fg-2 md:text-[17px]">
          This is your live dashboard. Pre-qualified buyers and sellers stream in, tagged with an MTL
          Score, financing status, and timeline. Claim, pass, or book — one tap.
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
              mtl://realtor/jordan.v — live feed
            </span>
          </div>
          <span className="mtl-status">streaming</span>
        </div>

        {/* tabs */}
        <div className="flex gap-4 overflow-x-auto border-b border-mtl-line px-4 font-mono text-[11px] uppercase tracking-[0.08em] md:gap-6">
          {TABS.map((tab, i) => (
            <div
              key={tab}
              className={`-mb-px whitespace-nowrap border-b-2 py-3 ${
                i === 0 ? "border-mtl-accent text-mtl-accent" : "border-transparent text-mtl-fg-3"
              }`}
            >
              {tab} {i === 0 && <span className="font-semibold">· 8</span>}
            </div>
          ))}
        </div>

        {/* feed rows */}
        <ul ref={rowsRef} aria-live="off" aria-label="Live lead feed" className="m-0 list-none p-0">
          {feed.map((row) => {
            const tier = tierFor(row.score);
            return (
              <li
                key={row.id}
                className="grid grid-cols-[54px_1fr_56px] items-center gap-[10px] border-b border-mtl-line px-3 py-3 font-mono text-[12px] last:border-b-0 md:grid-cols-[74px_1.1fr_0.7fr_0.9fr_60px] md:gap-4 md:px-4 md:py-[14px] lg:grid-cols-[88px_1.1fr_0.7fr_0.7fr_0.9fr_64px]"
              >
                <div className="text-[10px] text-mtl-fg-3 md:text-[12px]">{row.time}</div>
                <div>
                  <div className="text-[13px] font-semibold text-mtl-fg md:text-[12px]">{row.name}</div>
                  <div className="mt-0.5 text-[10px] tracking-[0.08em] text-mtl-fg-3">
                    {row.area}
                    <span className="md:hidden"> · {row.budget}</span>
                  </div>
                  <div
                    className={`mt-0.5 text-[9px] tracking-[0.08em] md:hidden ${
                      row.status === "CASH" ? "text-mtl-accent" : "text-mtl-fg-3"
                    }`}
                  >
                    {row.type} · {row.status}
                  </div>
                </div>
                <div className="hidden text-mtl-fg-2 lg:block">{row.type}</div>
                <div className="hidden text-mtl-fg md:block">{row.budget}</div>
                <div
                  className={`hidden text-[10px] tracking-[0.08em] md:block ${
                    row.status === "CASH" ? "text-mtl-accent" : "text-mtl-fg-2"
                  }`}
                >
                  {row.status}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={`rounded-[4px] bg-mtl-accent px-1.5 py-0.5 text-[10px] font-bold text-mtl-accent-ink ${
                      tier.startsWith("A") ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {tier}
                  </span>
                  <span className={`font-semibold ${row.score >= 85 ? "text-mtl-accent" : "text-mtl-fg-2"}`}>
                    {row.score}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* footer */}
        <div className="flex flex-wrap justify-between gap-2 border-t border-mtl-line px-3 py-[10px] font-mono text-[10px] tracking-[0.1em] text-mtl-fg-3 md:px-4 md:py-3">
          <span>AVG SCORE 85.3 · A-TIER 62%</span>
          <span>NEXT BATCH: 00:00:{pad2(countdown)}</span>
        </div>
      </div>
    </section>
  );
}
