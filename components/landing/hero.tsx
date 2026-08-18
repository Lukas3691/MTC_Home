"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS, scrollToAnchor } from "@/lib/gsap";

const SIGNUP_URL = "https://app.moneytreeleads.ca/sign-up";
const PILL_TEXT = "$ ./qualified --realtor";

/* ── neon money-tree image sequence ── */
const FRAME_COUNT = 160;
/** The first ~20 frames are a near-static stump — skip them so growth is visible on the very first scroll. */
const START_FRAME = 18;
const FRAME_W = 1280;
const FRAME_H = 720;
/** Frame shown as a static still for prefers-reduced-motion users. */
const REDUCED_MOTION_FRAME = 120;
/** Parallel image fetches while preloading the sequence. */
const PRELOAD_CONCURRENCY = 10;

const frameSrc = (i: number) =>
  `/money-tree-sequence/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const treeLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const statPanelRef = useRef<HTMLDivElement>(null);
  const statXRef = useRef<HTMLDivElement>(null);
  const statDRef = useRef<HTMLDivElement>(null);
  const statZeroRef = useRef<HTMLDivElement>(null);

  /** Latest frame index the scroll scrub wants on screen. */
  const targetFrameRef = useRef(START_FRAME);
  /** Canvas painter — assigned once the canvas effect boots. */
  const drawRef = useRef<(frame: number) => void>(() => {});

  /* ── canvas sizing + sequence preloading (plain effect; no GSAP) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = treeLayerRef.current;
    if (!canvas || !holder) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) targetFrameRef.current = REDUCED_MOTION_FRAME;

    const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let disposed = false;
    let lastDrawn = -1;

    /** Nearest decoded frame ≤ target, so scrubbing never blanks. */
    const nearestLoaded = (target: number) => {
      for (let i = Math.min(target, FRAME_COUNT - 1); i >= 0; i--) {
        if (loaded[i]) return i;
      }
      return -1;
    };

    const draw = (target: number) => {
      if (disposed) return;
      const idx = nearestLoaded(target);
      if (idx < 0 || idx === lastDrawn) return;
      const img = images[idx];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;
      lastDrawn = idx;
      // contain: image fully visible, centered (matches prototype objectFit: contain)
      const scale = Math.min(cw / FRAME_W, ch / FRAME_H);
      const dw = FRAME_W * scale;
      const dh = FRAME_H * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };
    drawRef.current = draw;

    const resize = () => {
      const rect = holder.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Cap the backing store near source resolution: the frames are only
      // 1280×720, so a full dpr-sized surface (~3400×3200 on desktop) costs
      // ~43MB and slows every scrubbed draw for zero added detail.
      const scale = Math.min(dpr, (FRAME_W * 1.5) / rect.width);
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      lastDrawn = -1;
      draw(targetFrameRef.current);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(holder);
    resize();

    // Priority preload queue: frame 0 first, then every 8th keyframe, then the rest.
    const queue: number[] = [];
    const seen = new Set<number>();
    const enqueue = (i: number) => {
      if (!seen.has(i)) {
        seen.add(i);
        queue.push(i);
      }
    };
    if (reduced) {
      enqueue(REDUCED_MOTION_FRAME); // static still only — skip the other 159
    } else {
      enqueue(START_FRAME);
      for (let i = 8; i < FRAME_COUNT; i += 8) enqueue(i);
      for (let i = 0; i < FRAME_COUNT; i++) enqueue(i);
    }

    let inFlight = 0;
    const pump = () => {
      while (!disposed && inFlight < PRELOAD_CONCURRENCY && queue.length) {
        const i = queue.shift() as number;
        const img = new Image();
        img.decoding = "async";
        inFlight++;
        img.onload = () => {
          inFlight--;
          images[i] = img;
          loaded[i] = true;
          draw(targetFrameRef.current); // upgrades the shown frame if this one is nearer
          pump();
        };
        img.onerror = () => {
          inFlight--;
          pump();
        };
        img.src = frameSrc(i);
      }
    };
    pump();

    return () => {
      disposed = true;
      ro.disconnect();
      drawRef.current = () => {};
    };
  }, []);

  /* ── GSAP: scroll scrub + load choreography ── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const glow = glowRef.current;
      const pill = pillRef.current;
      const heading = headingRef.current;
      const para = paraRef.current;
      const ctaRow = ctaRowRef.current;
      const panel = statPanelRef.current;
      const statX = statXRef.current;
      const statD = statDRef.current;
      const statZero = statZeroRef.current;
      if (
        !section || !canvas || !glow || !pill || !heading ||
        !para || !ctaRow || !panel || !statX || !statD || !statZero
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* tree growth — frame scrub across 2.5 viewports */
        const seq = { frame: START_FRAME };
        gsap.to(seq, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "+=250%", scrub: 0.4 },
          onUpdate: () => {
            const f = Math.round(seq.frame);
            if (f !== targetFrameRef.current) {
              targetFrameRef.current = f;
              drawRef.current(f);
            }
          },
        });

        /* slow parallax drift of the canvas itself */
        gsap.fromTo(
          canvas,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "+=250%", scrub: true },
          },
        );

        /* glow breathing under the canopy */
        gsap.fromTo(
          glow,
          { opacity: 0.75 },
          { opacity: 0.95, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );

        /* ── load choreography: pill → headline → strike → copy/CTAs → stats ── */
        gsap.set(pill, { autoAlpha: 0 });
        gsap.set([para, ctaRow, panel], { autoAlpha: 0, y: 28 });
        statX.textContent = "0.0×";
        statD.textContent = "0d";

        let headlinePlayed = false;
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            if (headlinePlayed) return;
            headlinePlayed = true;
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.1,
              delay: 0.35,
            });
          },
        });

        const tl = gsap.timeline();
        tl.to(pill, { autoAlpha: 1, duration: 0.4, ease: "power3.out" }, 0.3);
        tl.to(
          pill,
          { duration: 0.9, scrambleText: { text: PILL_TEXT, chars: SCRAMBLE_CHARS, speed: 0.4 } },
          0.3,
        );
        // The strike is drawn by toggling a class on the SECTION (see
        // globals.css .mtl-strike): SplitText autoSplit re-splits replace the
        // h1's children, so any state held on the span itself would be lost.
        tl.call(() => section.classList.add("mtl-strike-drawn"), [], 1.25);
        tl.to(
          [para, ctaRow],
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 },
          1.35,
        );
        tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, 1.55);

        const closeRate = { v: 0 };
        tl.to(
          closeRate,
          {
            v: 3.2,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              statX.textContent = `${closeRate.v.toFixed(1)}×`;
            },
          },
          1.7,
        );
        const days = { v: 0 };
        tl.to(
          days,
          {
            v: 28,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              statD.textContent = `${Math.round(days.v)}d`;
            },
          },
          1.7,
        );
        tl.to(
          statZero,
          { duration: 0.6, scrambleText: { text: "$0", chars: SCRAMBLE_CHARS, speed: 0.4 } },
          1.7,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="mtl-hero relative px-5 pt-[106px] pb-6 md:px-7 md:pt-[120px] md:pb-10 lg:min-h-[92vh] lg:px-10 lg:pt-[150px] lg:pb-[72px]"
    >
      {/* Scroll-grown money tree — bleeds past the hero into the next section */}
      <div
        ref={treeLayerRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[24%] z-[5] h-[120%] w-[170%] max-w-[1700px] -translate-x-1/2 md:left-[74%] md:top-[-8%] md:h-[160%] md:w-[115%] lg:left-[80%] lg:w-full"
        style={{ mixBlendMode: "screen" }}
      >
        {/* soft accent glow that follows the tree's center of mass */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[62%] h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-90 blur-[40px]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--mtl-accent) 26%, transparent), transparent 70%)",
          }}
        />
        {/* blend lives on the parent layer: this div is a stacking context
            (z-5), so blending here would stop at its own boundary and paint
            the canvas's black pixels opaque over the sections it bleeds into */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{
            filter: "saturate(1.15) contrast(1.08)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Hero content — sits on top of and weaves through the tree */}
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div ref={pillRef} className="mtl-pill mb-[18px] md:mb-7">
          {PILL_TEXT}
        </div>

        <h1
          ref={headingRef}
          className="mtl-display mb-6 text-[56px] leading-[0.9] font-semibold tracking-[-0.045em] md:text-[96px] lg:mb-9 lg:max-w-[1200px] lg:text-[clamp(128px,13.3vw,152px)]"
        >
          Cold leads are{" "}
          <span className="relative inline-block">
            dead.
            <span
              aria-hidden
              className="mtl-strike absolute top-[54%] right-0 left-0 h-[5px] bg-mtl-accent lg:h-[10px]"
            />
          </span>
          <br />
          Watch warm ones
          <br />
          <span className="text-mtl-accent">stream in.</span>
        </h1>

        <div className="grid max-w-[1200px] items-start gap-7 md:grid-cols-2 md:gap-14">
          <div>
            <p
              ref={paraRef}
              className="mb-7 text-[16px] leading-[1.5] text-mtl-fg-2 md:text-[19px]"
            >
              Money Tree Leads is an AI-powered lead engine for realtors. Pre-qualified buyers and
              sellers, scored 0–100 on intent, financing, and timeline — delivered to your
              dashboard the second they exist.
            </p>

            <div ref={ctaRowRef} className="mb-8 flex flex-wrap gap-3 md:mb-10">
              <a
                href={SIGNUP_URL}
                className="mtl-btn mtl-btn-primary px-5 py-[15px] text-[14px] md:px-6 md:py-[18px] md:text-[16px]"
              >
                $ start_trial — 299/mo
              </a>
              <a
                href="#feed"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor("#feed");
                }}
                className="mtl-btn mtl-btn-ghost px-[18px] py-[15px] text-[14px] md:px-[22px] md:py-[18px] md:text-[16px]"
              >
                Watch the feed →
              </a>
            </div>
          </div>

          <div
            ref={statPanelRef}
            className="grid grid-cols-3 self-stretch overflow-hidden rounded-[14px] border border-mtl-line bg-[color-mix(in_oklab,var(--mtl-bg)_70%,transparent)] backdrop-blur-[8px] md:self-end"
          >
            <div className="px-3 py-3.5 md:px-5 md:py-[18px]">
              <div ref={statXRef} className="mtl-num text-[24px] md:text-[36px]">
                3.2×
              </div>
              <div className="mtl-mono mt-1.5 text-[9px] tracking-[0.14em] text-mtl-fg-3 uppercase md:text-[10px]">
                close rate vs. portal
              </div>
            </div>
            <div className="border-l border-mtl-line px-3 py-3.5 md:px-5 md:py-[18px]">
              <div ref={statDRef} className="mtl-num text-[24px] md:text-[36px]">
                28d
              </div>
              <div className="mtl-mono mt-1.5 text-[9px] tracking-[0.14em] text-mtl-fg-3 uppercase md:text-[10px]">
                lead → signed
              </div>
            </div>
            <div className="border-l border-mtl-line px-3 py-3.5 md:px-5 md:py-[18px]">
              <div ref={statZeroRef} className="mtl-num text-[24px] md:text-[36px]">
                $0
              </div>
              <div className="mtl-mono mt-1.5 text-[9px] tracking-[0.14em] text-mtl-fg-3 uppercase md:text-[10px]">
                wasted spend
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
