import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SubpageSection, QA } from "@/components/landing/subpage";

const SITE_URL = "https://www.moneytreeleads.ca";
const PAGE_URL = `${SITE_URL}/how-it-works`;

export const metadata: Metadata = {
  title: "How It Works — AI Lead Qualification for Realtors | Money Tree Leads",
  description:
    "How Money Tree Leads qualifies real estate leads: 12,400 daily intent captures filtered, enriched with 23 signals, scored 0–100 by AI, and routed to one matched realtor in under 4 seconds.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Money Tree Leads Works — AI Lead Qualification",
    description:
      "Five stages between raw home-shopper intent and a warm lead in your dashboard: capture, filter, enrich, score, route.",
    url: PAGE_URL,
    siteName: "Money Tree Leads",
    locale: "en_CA",
    type: "article",
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
      name: "How Money Tree Leads Works — AI Lead Qualification for Realtors",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#software` },
      inLanguage: "en-CA",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "How It Works", item: PAGE_URL },
      ],
    },
  ],
};

const STAGES = [
  {
    k: "01 · INGEST",
    t: "Intent capture",
    metric: "12,400 / day",
    body: "Cross-platform ad campaigns and partner sites capture every active home shopper in your territory — roughly 12,400 raw intent signals per day across the network. This is the top of the funnel: anyone browsing listings, requesting valuations, or researching financing.",
  },
  {
    k: "02 · CLASSIFY",
    t: "Bot and spam filtering",
    metric: "89% kept",
    body: "A classification model instantly rejects fake submissions, duplicates, and more than 30 known low-intent patterns. Only genuine shopper activity — about 89% of submissions after the obvious noise is removed — moves to enrichment.",
  },
  {
    k: "03 · ENRICH",
    t: "Data enrichment",
    metric: "23 signals",
    body: "Each surviving lead is enriched with 23 signals: mortgage status, employer signal, listing history, household composition, and more. This is what separates a name on a form from a profile you can actually qualify.",
  },
  {
    k: "04 · SCORE",
    t: "MTL Score 0–100",
    metric: "70+ threshold",
    body: "The MTL Score model — trained on 4.1 million closed transactions — grades every lead from 0 to 100 on intent, financing readiness, and purchase timeline. Anything below 70 never reaches you.",
  },
  {
    k: "05 · ROUTE",
    t: "Realtor match",
    metric: "< 4 seconds",
    body: "Qualified leads are matched to one realtor by geography (FSA/ZIP territory), price band, and specialty, then delivered to your dashboard in under 4 seconds — with an AI-drafted opening message ready to send.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Subpage
        crumb="HOW IT WORKS"
        eyebrow="/how-it-works"
        title={
          <>
            Five stages between raw intent and{" "}
            <span className="text-mtl-accent">a warm lead.</span>
          </>
        }
        lede={
          <>
            Every lead is processed through five layers before it touches your inbox. By the time
            a lead appears in your dashboard, it has already beaten the form-fill noise that makes
            up most purchased real estate leads. Here is exactly what happens in between.
          </>
        }
      >
        <SubpageSection id="engine" heading="The five-stage engine">
          <ol className="m-0 grid list-none gap-0 overflow-hidden rounded-[18px] border border-mtl-line p-0">
            {STAGES.map((s, i) => (
              <li
                key={s.k}
                className={`grid gap-3 px-6 py-6 md:grid-cols-[200px_1fr_140px] md:gap-8 md:px-8 ${
                  i % 2 ? "bg-mtl-bg-2" : "bg-mtl-bg"
                } ${i === 0 ? "" : "border-t border-mtl-line"}`}
              >
                <div>
                  <div className="mtl-mono mb-2 text-[10px] tracking-[0.18em] text-mtl-accent">
                    {s.k}
                  </div>
                  <h3 className="mtl-display text-[20px] leading-[1.05] font-semibold tracking-[-0.02em]">
                    {s.t}
                  </h3>
                </div>
                <p className="m-0 max-w-[560px] text-[14px] leading-[1.6] text-mtl-fg-2">
                  {s.body}
                </p>
                <div className="mtl-num text-[18px] text-mtl-accent md:text-right">{s.metric}</div>
              </li>
            ))}
          </ol>
        </SubpageSection>

        <SubpageSection heading="What the MTL Score measures">
          <p className="mb-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            The MTL Score is a 0–100 grade of how likely a lead is to transact, built from three
            dimensions:
          </p>
          <ul className="m-0 mb-5 flex max-w-[680px] list-none flex-col gap-3 p-0">
            {[
              ["Intent", "How actively they are shopping — search behaviour, listing engagement, valuation requests."],
              ["Financing", "Mortgage status and employer signals: can they actually buy, and at what price band?"],
              ["Timeline", "How soon they are likely to transact, inferred from listing history and household signals."],
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
          <p className="max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            Leads scoring below 70 are never delivered. That threshold is why subscribers work a
            short list of warm conversations instead of a long list of dead numbers — and why the
            engine pairs naturally with{" "}
            <Link href="/pricing" className="text-mtl-accent underline-offset-4 hover:underline">
              tiered plans starting at $179/month
            </Link>
            .
          </p>
        </SubpageSection>

        <SubpageSection heading="What lands in your dashboard">
          <p className="mb-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            Each delivered lead arrives as a working file, not a bare phone number:
          </p>
          <ul className="m-0 grid max-w-[760px] list-none grid-cols-1 gap-x-8 gap-y-3 p-0 md:grid-cols-2">
            {[
              "Full lead profile with MTL Score and the signals behind it",
              "AI-drafted opening message tuned to the lead's situation",
              "Calendar with 1-tap booking",
              "FSA / ZIP-level territory match — leads in your patch",
              "iOS and Android dashboard",
              "Pipeline and analytics views",
            ].map((f) => (
              <li key={f} className="flex items-start gap-[10px] text-[14px] leading-[1.5] text-mtl-fg">
                <span className="mtl-mono mt-[2px] text-[12px] text-mtl-accent" aria-hidden>
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </SubpageSection>

        <SubpageSection heading="Common questions">
          <QA q="How does AI lead qualification work for real estate?">
            <p>
              An AI qualification system captures home-shopper intent at scale, filters out bots
              and duplicates, enriches each lead with financial and behavioural data, and scores
              the result. Money Tree Leads does this in five stages, scoring every lead 0–100 on
              intent, financing, and timeline, and only delivers leads scoring 70 or higher.
            </p>
          </QA>
          <QA q="What makes a lead “pre-qualified”?">
            <p>
              A pre-qualified lead has been verified as a real person, enriched with 23 signals
              including mortgage status and listing history, and scored against a model trained on
              4.1 million closed transactions — before any realtor sees it. A raw portal lead, by
              contrast, is an unverified form submission.
            </p>
          </QA>
          <QA q="How fast do leads arrive?">
            <p>
              Routing takes under 4 seconds from qualification to your dashboard, and new
              subscribers typically start receiving leads within 24 hours of signing up.
            </p>
          </QA>
          <QA q="Do other agents get the same lead?">
            <p>
              No — each qualified lead is routed to one realtor based on territory, price band,
              and specialty match. That exclusivity is a core difference from portal leads, which
              are commonly resold to several agents at once. See the full{" "}
              <Link
                href="/vs-portal-leads"
                className="text-mtl-accent underline-offset-4 hover:underline"
              >
                portal leads comparison
              </Link>
              .
            </p>
          </QA>
        </SubpageSection>
      </Subpage>
    </>
  );
}
