"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS } from "@/lib/gsap";

const SIGNUP_URL = "https://app.moneytreeleads.ca/sign-up";

const TRUST_BULLETS = [
  "Cancel anytime",
  "First-month refund if you don't close",
  "SOC-2 · PIPEDA compliant",
];

const FEATURES = [
  "Up to 80 pre-qualified leads / month",
  "MTL Score 0–100 on every lead",
  "AI-drafted opening message",
  "Calendar + 1-tap booking",
  "FSA / ZIP-level territory match",
  "iOS + Android dashboard",
  "Pipeline + analytics",
  "Email & priority support",
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const eyebrow = eyebrowRef.current;
        const heading = headingRef.current;
        const leftCol = leftColRef.current;
        const cardWrap = cardWrapRef.current;
        const glow = glowRef.current;
        const price = priceRef.current;
        const caret = caretRef.current;

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

        // Plan card: entrance → price count → features → banner caret nudge
        if (cardWrap && price && caret) {
          const features = cardWrap.querySelectorAll("[data-feature]");
          const proxy = { v: 0 };

          gsap.set(cardWrap, { y: 64, autoAlpha: 0 });
          gsap.set(features, { y: 28, autoAlpha: 0 });
          price.textContent = "$0";

          const tl = gsap.timeline({
            scrollTrigger: { trigger: cardWrap, start: "top 80%", once: true },
          });
          tl.to(cardWrap, { y: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out" }, 0)
            .to(
              proxy,
              {
                v: 299,
                duration: 0.9,
                ease: "power2.out",
                onUpdate: () => {
                  price.textContent = `$${Math.round(proxy.v)}`;
                },
              },
              0.35,
            )
            .to(
              features,
              { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.05 },
              0.45,
            )
            .fromTo(
              caret,
              { x: 0 },
              { x: 4, duration: 0.22, ease: "power2.inOut", yoyo: true, repeat: 1 },
              0.55,
            );
        }

        // Subtle glow breathing behind the card
        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0.5 },
            { opacity: 1, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 },
          );
        }

        return () => {
          if (price) price.textContent = "$299";
        };
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
        <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          {/* Left: pitch */}
          <div ref={leftColRef}>
            <div ref={eyebrowRef} className="mtl-eyebrow mb-[14px]">
              /pricing
            </div>
            <h2
              ref={headingRef}
              className="mtl-display mb-[18px] text-[44px] font-semibold leading-[0.96] tracking-[-0.03em] md:text-[72px]"
            >
              One plan.
              <br />
              <span className="text-mtl-accent">One price.</span>
            </h2>
            <p data-reveal className="mb-5 text-[15px] leading-[1.5] text-mtl-fg-2 md:text-[17px]">
              No tiers. No bait-and-switch. Just leads that close, for less than your monthly
              coffee budget.
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

          {/* Right: plan card */}
          <div ref={cardWrapRef} className="relative">
            {/* breathing accent glow behind the card */}
            <div
              ref={glowRef}
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[18px]"
              style={{
                boxShadow: "0 30px 80px color-mix(in oklab, var(--mtl-accent) 10%, transparent)",
              }}
            />
            <div className="mtl-card relative overflow-hidden border-mtl-accent">
              <div className="mtl-mono bg-mtl-accent px-[18px] py-3 text-mtl-accent-ink md:px-6 md:py-[14px]">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                  <span ref={caretRef} className="inline-block" aria-hidden>
                    ▸
                  </span>{" "}
                  grower plan · most popular
                </span>
              </div>
              <div className="px-6 py-7 md:px-9 md:py-10">
                <div className="mb-2 flex items-baseline gap-2">
                  <div ref={priceRef} className="mtl-num text-[64px] leading-none md:text-[88px]">
                    $299
                  </div>
                  <div className="mtl-mono text-[14px] text-mtl-fg-3">/mo CAD</div>
                </div>
                <div className="mb-5 text-[14px] text-mtl-fg-2">
                  ROI break-even at{" "}
                  <span className="text-mtl-accent">1 closed deal every 4 months.</span>
                </div>
                <a
                  href={SIGNUP_URL}
                  className="mtl-btn mtl-btn-primary w-full justify-center p-4 text-[14px] md:p-[18px] md:text-[16px]"
                >
                  <span className="md:hidden">Subscribe · receive leads in 24h →</span>
                  <span className="hidden md:inline">
                    Subscribe — start receiving leads in 24h →
                  </span>
                </a>
                <div className="my-5 h-px bg-mtl-line md:my-7" aria-hidden />
                <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-3 p-0 md:grid-cols-2">
                  {FEATURES.map((f) => (
                    <li
                      key={f}
                      data-feature
                      className="flex items-center gap-[10px] text-[13px] text-mtl-fg"
                    >
                      <span className="mtl-mono text-[12px] text-mtl-accent" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
