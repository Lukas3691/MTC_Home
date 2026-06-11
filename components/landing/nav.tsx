"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, scrollToAnchor } from "@/lib/gsap";
import { Logo } from "@/components/landing/logo";

const NAV_LINKS = [
  { hash: "#feed", label: "/feed" },
  { hash: "#engine", label: "/engine" },
  { hash: "#proof", label: "/proof" },
  { hash: "#pricing", label: "/pricing" },
] as const;

const SIGNUP_URL = "https://app.moneytreeleads.ca/signup";
const LOGIN_URL = "https://app.moneytreeleads.ca/login";

export function Nav() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Entrance: slide the nav contents down once on mount.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(innerRef.current, {
          y: -16,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      });
    },
    { scope: sectionRef },
  );

  // Mobile menu open: stagger the links in.
  useGSAP(
    () => {
      if (!open || !menuRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(menuRef.current!.querySelectorAll<HTMLAnchorElement>("a"), {
          y: -8,
          autoAlpha: 0,
          duration: 0.35,
          ease: "power3.out",
          stagger: 0.06,
        });
      });
    },
    { scope: sectionRef, dependencies: [open] },
  );

  const onAnchorClick = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    scrollToAnchor(hash);
  };

  return (
    <nav
      ref={sectionRef}
      className="fixed top-0 inset-x-0 z-50 font-mono border-b border-mtl-line bg-[rgba(10,10,10,0.85)] backdrop-blur-[14px]"
    >
      <div
        ref={innerRef}
        className="flex items-center justify-between px-5 py-3.5 md:px-10 md:py-[18px]"
      >
        {/* left: logo + version chip */}
        <div className="flex items-center gap-3 md:gap-5">
          <Logo size="sm" />
          <span className="hidden md:inline-block border-l border-mtl-line pl-3.5 text-[11px] tracking-[0.16em] text-mtl-fg-3">
            v4.2 · LIVE
          </span>
        </div>

        {/* center: section anchors (desktop only) */}
        <div className="hidden lg:flex gap-6 text-[12px] uppercase tracking-[0.06em] text-mtl-fg-2">
          {NAV_LINKS.map(({ hash, label }) => (
            <a
              key={hash}
              href={hash}
              onClick={onAnchorClick(hash)}
              className="relative no-underline text-inherit transition-colors duration-200 hover:text-mtl-fg after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-mtl-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </div>

        {/* right: status + login + CTA (+ hamburger on mobile) */}
        <div className="flex items-center gap-2 md:gap-2.5">
          <span className="mtl-status mr-2 hidden lg:inline-flex">147 leads today</span>
          <a
            href={LOGIN_URL}
            className="hidden md:inline-block mr-1.5 text-[12px] lowercase tracking-[0.06em] text-mtl-fg-2 transition-colors duration-200 hover:text-mtl-fg"
          >
            login
          </a>
          <a
            href={SIGNUP_URL}
            className="mtl-btn mtl-btn-primary hidden md:inline-flex px-[18px] py-3 text-[13px]"
          >
            $ subscribe
          </a>
          <a
            href={SIGNUP_URL}
            className="mtl-btn mtl-btn-primary md:hidden px-3.5 py-[9px] text-[12px]"
          >
            $ start
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
            aria-expanded={open}
            aria-controls="mtl-mobile-menu"
            className="md:hidden flex h-[38px] w-[38px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border border-mtl-line-2 bg-transparent text-mtl-fg"
          >
            <span
              className={`block h-[1.5px] w-4 bg-mtl-fg transition-transform duration-300 ${
                open ? "translate-y-[2.75px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-mtl-fg transition-transform duration-300 ${
                open ? "-translate-y-[2.75px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile menu panel */}
      {open && (
        <div
          ref={menuRef}
          id="mtl-mobile-menu"
          className="md:hidden absolute top-full inset-x-0 flex flex-col border-b border-mtl-line bg-mtl-bg px-5 pt-2 pb-4"
        >
          {NAV_LINKS.map(({ hash, label }) => (
            <a
              key={hash}
              href={hash}
              onClick={onAnchorClick(hash)}
              className="border-b border-mtl-line py-3.5 text-[13px] uppercase tracking-[0.08em] text-mtl-fg no-underline"
            >
              {label}
            </a>
          ))}
          <a
            href={LOGIN_URL}
            className="py-3.5 text-[13px] lowercase tracking-[0.08em] text-mtl-fg-2 no-underline transition-colors duration-200 hover:text-mtl-fg"
          >
            login
          </a>
        </div>
      )}
    </nav>
  );
}
