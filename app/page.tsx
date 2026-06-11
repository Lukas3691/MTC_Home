import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { TickerBand } from "@/components/landing/ticker";
import { FeedSection } from "@/components/landing/feed";
import { Engine } from "@/components/landing/engine";
import { ComparePanel } from "@/components/landing/compare";
import { ProofBand } from "@/components/landing/proof";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FooterCTA } from "@/components/landing/footer-cta";

export default function Home() {
  return (
    <>
      {/* fixed UI lives outside the ScrollSmoother-transformed content */}
      <Nav />
      <div className="mtl-noise" aria-hidden />
      <SmoothScroll>
        <main className="overflow-x-clip">
          <Hero />
          <TickerBand />
          <FeedSection />
          <Engine />
          <ComparePanel />
          <ProofBand />
          <Testimonials />
          <Pricing />
        </main>
        <FooterCTA />
      </SmoothScroll>
    </>
  );
}
