import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SubpageSection, QA } from "@/components/landing/subpage";

const SITE_URL = "https://www.moneytreeleads.ca";
const PAGE_URL = `${SITE_URL}/pricing`;
const SIGNUP_URL = "https://app.moneytreeleads.ca/sign-up";

export const metadata: Metadata = {
  title: "Pricing — $299/mo CAD for Pre-Qualified Real Estate Leads | Money Tree Leads",
  description:
    "Money Tree Leads pricing: one plan at $299/month CAD for up to 80 pre-qualified real estate leads. No tiers, no contracts, first-month refund if you don't close a deal.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Money Tree Leads Pricing — One Plan, $299/mo CAD",
    description:
      "Up to 80 pre-qualified leads per month, AI-scored 0–100. Cancel anytime. First-month refund if you don't close.",
    url: PAGE_URL,
    siteName: "Money Tree Leads",
    locale: "en_CA",
    type: "website",
    // Page-level openGraph replaces the inherited object, which would drop
    // the root file-based image — re-attach it explicitly.
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: "Money Tree Leads Pricing — One Plan, $299/month CAD",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#software` },
      inLanguage: "en-CA",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Pricing", item: PAGE_URL },
      ],
    },
  ],
};

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

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Subpage
        crumb="PRICING"
        eyebrow="/pricing"
        title={
          <>
            One plan. One price.{" "}
            <span className="text-mtl-accent">$299/month.</span>
          </>
        }
        lede={
          <>
            No tiers, no per-lead fees, no annual contract. Every Money Tree Leads subscription is
            the same flat $299/month CAD, includes everything, and can be cancelled any time. If
            you don&apos;t close a deal in your first month, the first month is refunded.
          </>
        }
      >
        <SubpageSection heading="What $299/month includes">
          <div className="mtl-card max-w-[760px] overflow-hidden border-mtl-accent">
            <div className="mtl-mono bg-mtl-accent px-[18px] py-3 text-mtl-accent-ink md:px-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                ▸ grower plan · the only plan
              </span>
            </div>
            <div className="px-6 py-7 md:px-9 md:py-9">
              <div className="mb-2 flex items-baseline gap-2">
                <div className="mtl-num text-[56px] leading-none md:text-[72px]">$299</div>
                <div className="mtl-mono text-[14px] text-mtl-fg-3">/mo CAD</div>
              </div>
              <div className="mb-6 text-[14px] text-mtl-fg-2">
                ROI break-even at <span className="text-mtl-accent">1 closed deal every 4 months.</span>
              </div>
              <ul className="m-0 mb-7 grid list-none grid-cols-1 gap-x-6 gap-y-3 p-0 md:grid-cols-2">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-[10px] text-[13px] text-mtl-fg">
                    <span className="mtl-mono text-[12px] text-mtl-accent" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                className="mtl-btn mtl-btn-primary w-full justify-center p-4 text-[14px] md:text-[15px]"
              >
                Subscribe — start receiving leads in 24h →
              </a>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection heading="What real estate leads cost in Canada">
          <p className="mb-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            Most Canadian realtors who buy portal leads pay <strong className="text-mtl-fg">$600 or
            more per month</strong> for form-fill inquiries that are typically shared between
            agents and close at around 4–6%. Money Tree Leads is a flat{" "}
            <strong className="text-mtl-fg">$299/month</strong> for up to 80 leads that are
            pre-qualified before delivery — subscribers typically see close rates of 18–22%.
          </p>
          <div className="max-w-[680px] overflow-hidden rounded-[18px] border border-mtl-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Cost and conversion comparison: portal leads versus Money Tree Leads
              </caption>
              <thead>
                <tr className="mtl-mono bg-mtl-bg-3 text-[11px] uppercase tracking-[0.14em]">
                  <th scope="col" className="px-5 py-4 font-medium text-mtl-fg-3"></th>
                  <th scope="col" className="px-5 py-4 font-medium text-mtl-fg-3">
                    Portal leads
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium text-mtl-accent">
                    Money Tree Leads
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                <tr className="border-t border-mtl-line">
                  <th scope="row" className="px-5 py-4 font-medium text-mtl-fg-2">
                    Monthly cost
                  </th>
                  <td className="mtl-mono px-5 py-4 text-mtl-fg-3">$600+</td>
                  <td className="mtl-mono px-5 py-4 font-semibold text-mtl-fg">$299 flat</td>
                </tr>
                <tr className="border-t border-mtl-line">
                  <th scope="row" className="px-5 py-4 font-medium text-mtl-fg-2">
                    Avg. close rate
                  </th>
                  <td className="mtl-mono px-5 py-4 text-mtl-fg-3">4–6%</td>
                  <td className="mtl-mono px-5 py-4 font-semibold text-mtl-fg">18–22%</td>
                </tr>
                <tr className="border-t border-mtl-line">
                  <th scope="row" className="px-5 py-4 font-medium text-mtl-fg-2">
                    Qualification
                  </th>
                  <td className="mtl-mono px-5 py-4 text-mtl-fg-3">Form-only</td>
                  <td className="mtl-mono px-5 py-4 font-semibold text-mtl-fg">23-signal MTL Score</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            The full feature-by-feature breakdown lives on the{" "}
            <Link
              href="/vs-portal-leads"
              className="text-mtl-accent underline-offset-4 hover:underline"
            >
              portal leads comparison page
            </Link>
            , and the qualification pipeline behind the close-rate difference is explained in{" "}
            <Link
              href="/how-it-works"
              className="text-mtl-accent underline-offset-4 hover:underline"
            >
              how it works
            </Link>
            .
          </p>
        </SubpageSection>

        <SubpageSection heading="Guarantee and terms">
          <ul className="m-0 flex max-w-[680px] list-none flex-col gap-3 p-0">
            {[
              ["First-month refund", "If you don't close a deal in your first month, you get the month refunded."],
              ["Cancel anytime", "Month-to-month billing. No annual contract, no cancellation fee."],
              ["SOC-2 · PIPEDA compliant", "Lead data is handled to Canadian privacy standards — details in the privacy policy."],
            ].map(([label, desc]) => (
              <li key={label} className="flex gap-3 text-[14px] leading-[1.6] text-mtl-fg-2">
                <span className="mtl-mono mt-[2px] text-mtl-accent" aria-hidden>
                  ▸
                </span>
                <span>
                  <strong className="text-mtl-fg">{label}.</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </SubpageSection>

        <SubpageSection heading="Pricing questions">
          <QA q="How much do real estate leads cost in Canada?">
            <p>
              Purchased portal leads commonly run $600+ per month for shared inquiries. Money Tree
              Leads charges a flat $299/month CAD for up to 80 exclusive, pre-qualified leads —
              there are no tiers, per-lead fees, or setup costs.
            </p>
          </QA>
          <QA q="Is there a contract or minimum term?">
            <p>
              No. The subscription is month-to-month and you can cancel any time from the
              dashboard.
            </p>
          </QA>
          <QA q="What if I don't close a deal?">
            <p>
              If you don&apos;t close a deal in your first month, the first month is refunded. The
              plan is designed to break even at one closed deal every four months.
            </p>
          </QA>
          <QA q="Is $299 the full price?">
            <p>
              Yes — $299/month CAD is the complete price. Every feature, including the MTL Score,
              AI-drafted openers, territory matching, and the mobile dashboard, is included in the
              single plan.
            </p>
          </QA>
        </SubpageSection>
      </Subpage>
    </>
  );
}
