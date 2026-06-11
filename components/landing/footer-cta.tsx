"use client";

import { useRef } from "react";
import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { gsap, useGSAP, SplitText, SCRAMBLE_CHARS, scrollToAnchor } from "@/lib/gsap";

const ANCHOR_LINKS = [
  { label: "FEED", hash: "#feed" },
  { label: "ENGINE", hash: "#engine" },
  { label: "PRICING", hash: "#pricing" },
] as const;

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panel = panelRef.current;
        const pill = pillRef.current;
        const heading = headingRef.current;
        const bar = barRef.current;
        if (!panel || !pill || !heading || !bar) return;

        // CTA panel — rises in as one piece.
        gsap.from(panel, {
          y: 64,
          autoAlpha: 0,
          scale: 0.99,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: panel, start: "top 80%", once: true },
        });

        // Pill — terminal decode.
        gsap.to(pill, {
          duration: 0.9,
          scrambleText: { text: "$ ./start", chars: SCRAMBLE_CHARS, speed: 0.4 },
          scrollTrigger: { trigger: pill, start: "top 85%", once: true },
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

        // Bottom bar — single quiet fade.
        gsap.from(bar, {
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 95%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden border-t border-mtl-line pt-[72px] px-5 pb-8 md:pt-[120px] md:px-10 md:pb-14"
    >
      {/* ── big CTA panel ── */}
      <div
        ref={panelRef}
        className="relative max-w-[1100px] mx-auto overflow-hidden border border-mtl-line-2 rounded-[18px] lg:rounded-[24px] bg-mtl-bg-2 px-6 py-10 md:px-14 md:py-16"
      >
        {/* radial accent glow — drifts slowly against scroll via ScrollSmoother */}
        <div
          aria-hidden
          data-speed="0.9"
          className="pointer-events-none absolute inset-x-0 -top-[150px] -bottom-[150px]"
          style={{
            background:
              "radial-gradient(circle at 100% 150px, color-mix(in oklab, var(--mtl-accent) 18%, transparent), transparent 60%)",
          }}
        />

        <div className="relative">
          <div ref={pillRef} className="mtl-pill mb-5">
            $ ./start
          </div>

          <h2
            ref={headingRef}
            className="mtl-display font-semibold text-[48px] md:text-[88px] leading-[0.92] tracking-[-0.04em] max-w-[820px] mb-5"
          >
            Plug into the feed.
            <br />
            Watch your
            <br />
            <span className="text-mtl-accent">pipeline grow.</span>
          </h2>

          <p className="text-[16px] md:text-[19px] text-mtl-fg-2 leading-[1.4] max-w-[560px] mb-7 md:mb-9">
            $299/month. First-month refund if you don&apos;t close a deal. Cancel any time.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://app.moneytreeleads.ca/signup"
              className="mtl-btn mtl-btn-primary px-[22px] py-4 text-[15px] md:px-[30px] md:py-5 md:text-[17px]"
            >
              $ subscribe
            </a>
            <a
              href="mailto:adminmtree@gmail.com?subject=Demo%20request"
              className="mtl-btn mtl-btn-ghost px-5 py-4 text-[15px] md:px-6 md:py-5 md:text-[17px]"
            >
              Book a 15-min demo
            </a>
          </div>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div
        ref={barRef}
        className="mt-10 md:mt-14 pt-6 border-t border-mtl-line flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 font-mono text-[11px] text-mtl-fg-3 tracking-[0.14em]"
      >
        <Logo size="sm" />

        <nav aria-label="Footer" className="flex flex-wrap gap-4 md:gap-8">
          {ANCHOR_LINKS.map(({ label, hash }) => (
            <a
              key={hash}
              href={hash}
              onClick={(e) => {
                e.preventDefault();
                scrollToAnchor(hash);
              }}
              className="hover:text-mtl-fg transition-colors"
            >
              {label}
            </a>
          ))}
          <Link href="/privacy" className="hover:text-mtl-fg transition-colors">
            PRIVACY
          </Link>
          <Link href="/terms" className="hover:text-mtl-fg transition-colors">
            TERMS
          </Link>
          <a href="mailto:adminmtree@gmail.com" className="hover:text-mtl-fg transition-colors">
            CONTACT
          </a>
        </nav>

        <div>© 2026 MONEY TREE LEADS · MADE IN CANADA</div>
      </div>
    </footer>
  );
}
