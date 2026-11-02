"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";
import { TierCards } from "@/components/landing/tier-cards";

const TRUST_BULLETS = [
  "Cancel anytime",
  "Exclusive — one agent per lead",
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const eyebrow = eyebrowRef.current;
        const heading = headingRef.current;
        const leftCol = leftColRef.current;
        const gridWrap = gridWrapRef.current;
        const glow = glowRef.current;

        // Eyebrow: terminal decode
        if (eyebrow) {
          gsap.to(eyebrow, {
            duration: 0.9,
            scrambleText: { text: "/pricing", chars: SCRAMBLE_CHARS, speed: 0.4 },
            scrollTrigger: { trigger: eyebrow, start: "top 85%", once: true },
          });
        }

        // Heading: masked line reveal
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

        // Paragraph + trust bullets stagger-in
        if (leftCol) {
          gsap.from(leftCol.querySelectorAll("[data-reveal]"), {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: leftCol, start: "top 85%", once: true },
          });
        }

        // Tier grid: cards rise in with a stagger
        if (gridWrap) {
          const cards = gridWrap.querySelectorAll("[data-tier-card]");
          gsap.from(cards, {
            y: 48,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: gridWrap, start: "top 80%", once: true },
          });
        }

        // Subtle glow breathing behind the grid
        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0.5 },
            { opacity: 1, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 },
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="border-t border-mtl-line px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <div className="mx-auto max-w-[1100px]">
        <div ref={leftColRef} className="mb-10 max-w-[640px] md:mb-14">
          <div ref={eyebrowRef} className="mtl-eyebrow mb-[14px]">
            /pricing
          </div>
          <h2
            ref={headingRef}
            className="mtl-display mb-[18px] text-[44px] font-semibold leading-[0.96] tracking-[-0.03em] md:text-[64px]"
          >
            Four tiers.
            <br />
            <span className="text-mtl-accent">Pick where you start.</span>
          </h2>
          <p data-reveal className="mb-5 text-[15px] leading-[1.5] text-mtl-fg-2 md:text-[17px]">
            Each lead goes to one agent. Leads arrive as they are qualified and matched to you, so
            we don&apos;t promise a set number per month. Plans start at $179/mo USD.
          </p>
          <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
            {TRUST_BULLETS.map((x) => (
              <li
                key={x}
                data-reveal
                className="flex items-center gap-[10px] text-[14px] text-mtl-fg-2"
              >
                <span className="mtl-mono text-mtl-accent" aria-hidden>
                  ▸
                </span>
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/pricing"
              className="mtl-mono text-[12px] tracking-[0.08em] text-mtl-fg-2 transition-colors hover:text-mtl-fg"
            >
              Pricing details &amp; FAQ <span className="text-mtl-accent">→</span>
            </Link>
          </div>
        </div>

        <div ref={gridWrapRef} className="relative">
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[18px]"
            style={{
              boxShadow: "0 30px 80px color-mix(in oklab, var(--mtl-accent) 10%, transparent)",
            }}
          />
          <TierCards compact />
        </div>
      </div>
    </section>
  );
}
