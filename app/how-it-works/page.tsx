import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SubpageSection, QA } from "@/components/landing/subpage";

const SITE_URL = "https://www.moneytreeleads.ca";
const PAGE_URL = `${SITE_URL}/how-it-works`;

export const metadata: Metadata = {
  title: "How It Works — AI Lead Qualification for Realtors | Money Tree Leads",
  description:
    "How Money Tree Leads qualifies real estate leads: enquiries from ads are checked, called by an AI assistant, scored 0–100 from the conversation, and sent to one matched realtor.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Money Tree Leads Works — AI Lead Qualification",
    description:
      "Five stages between an enquiry and a lead in your dashboard: intake, check, call, score, route.",
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
    k: "01 · INTAKE",
    t: "Enquiry",
    metric: "With consent",
    body: "People respond to our ad campaigns and enquiry forms, and agree to be contacted. An enquiry with no record of consent is never dialled.",
  },
  {
    k: "02 · CHECK",
    t: "Number check",
    metric: "Before dialling",
    body: "Each number is looked up, and disconnected numbers are rejected. Anyone on our do-not-contact list is removed before a call is placed.",
  },
  {
    k: "03 · CALL",
    t: "AI assistant calls",
    metric: "Call + text",
    body: "Our AI assistant phones during business hours in the lead's local time, tries up to 3 times over about two days, and may follow up by text. Calls are recorded.",
  },
  {
    k: "04 · SCORE",
    t: "Score 0–100",
    metric: "From the call",
    body: "Each conversation is scored 0–100 on timeline, budget, and motivation. People who decline an agent or already have one are screened out.",
  },
  {
    k: "05 · ROUTE",
    t: "One agent",
    metric: "1 agent per lead",
    body: "Each lead goes to one agent whose service area, price range, and languages match, with higher plans getting priority. If no plan with included leads matches, it may appear as a flash offer or in the lead feed.",
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
            Five stages between an enquiry and{" "}
            <span className="text-mtl-accent">a real conversation.</span>
          </>
        }
        lede={
          <>
            Every enquiry goes through the same five steps. By the time a qualified lead appears
            in your dashboard, our AI assistant has spoken with them, and you can read or hear what
            they said. Here is what happens in between.
          </>
        }
      >
        <SubpageSection id="engine" heading="The five stages">
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

        <SubpageSection heading="What the score measures">
          <p className="mb-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            The score is a 0–100 grade of the conversation, based on what the person told our
            assistant:
          </p>
          <ul className="m-0 mb-5 flex max-w-[680px] list-none flex-col gap-3 p-0">
            {[
              ["Timeline", "When they expect to buy or sell."],
              ["Budget", "The price range they mention, if they share one."],
              ["Motivation", "Why they are moving and how serious they sound."],
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
            A score of 70 or more is hot, 40 to 69 is warm, and under 40 is cool. The label tells
            you where to start. A lead nobody could reach is marked cold and only appears in the
            lead feed, at a lower price. See{" "}
            <Link href="/pricing" className="text-mtl-accent underline-offset-4 hover:underline">
              plans starting at $179/month USD
            </Link>
            .
          </p>
        </SubpageSection>

        <SubpageSection heading="What lands in your dashboard">
          <p className="mb-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            Each lead arrives with the conversation behind it, not just a phone number:
          </p>
          <ul className="m-0 grid max-w-[760px] list-none grid-cols-1 gap-x-8 gap-y-3 p-0 md:grid-cols-2">
            {[
              "Name, phone, email, language, and area",
              "Score and AI summary of timeline, budget, and motivation",
              "Call transcript and recording",
              "Any text conversation with the lead",
              "Calendar for your appointments",
              "AI phone assistant on your own number",
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
              An AI assistant phones the person who enquired, has a conversation, and the
              conversation is scored. Money Tree Leads does this in five stages, scoring each
              conversation 0–100 on timeline, budget, and motivation.
            </p>
          </QA>
          <QA q="What makes a lead “pre-qualified”?">
            <p>
              Our AI assistant has spoken with them about their plans before any realtor receives
              the lead, and you get the summary, transcript, and recording. A raw portal lead, by
              contrast, is usually just a form submission.
            </p>
          </QA>
          <QA q="How fast do leads arrive, and how many will I get?">
            <p>
              A lead is delivered after its conversation is scored and matched to you. We don&apos;t
              promise a set number per month or a date for your first lead, because both depend on
              the enquiries that come in for your area and preferences.
            </p>
          </QA>
          <QA q="Do other agents get the same lead?">
            <p>
              No. Each lead goes to one realtor, based on service area, price range, and language.
              That is a core difference from portal leads, which are often sold to several agents
              at once. See the full{" "}
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
