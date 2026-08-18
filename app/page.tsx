import type { Metadata } from "next";
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

const SITE_URL = "https://www.moneytreeleads.ca";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Product entity for search engines and AI answer engines. References the
// Organization declared site-wide in app/layout.tsx via @id.
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Money Tree Leads",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered lead engine for Canadian realtors. Pre-qualified buyers and sellers, scored 0–100 on intent, financing, and timeline, delivered to your dashboard in real time.",
  offers: {
    "@type": "Offer",
    price: "299",
    priceCurrency: "CAD",
    url: "https://app.moneytreeleads.ca/sign-up",
    category: "Monthly subscription",
    description:
      "One plan. $299/month CAD. First-month refund if you don't close a deal. Cancel any time.",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
  audience: {
    "@type": "Audience",
    audienceType: "Real estate agents and realtors in Canada",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
