import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin, useGSAP);
}

/** Characters used by mono/terminal scramble effects across the site. */
export const SCRAMBLE_CHARS = "01$#/<>+-_";

/**
 * Scroll to an in-page anchor, routing through ScrollSmoother when active
 * (native anchor jumps don't sync with the smoothed scroll position).
 */
export function scrollToAnchor(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, "top 80px");
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText };
