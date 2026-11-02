import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SubpageSection, QA } from "@/components/landing/subpage";

const SITE_URL = "https://www.moneytreeleads.ca";
const PAGE_URL = `${SITE_URL}/vs-portal-leads`;

export const metadata: Metadata = {
  title: "Portal Leads vs. Money Tree Leads — A Realtor's Comparison",
  description:
    "Buying real estate leads from listing portals vs. leads an AI assistant has already called: first contact, qualification, exclusivity, and what you receive, compared side by side.",
  alternates: { canonical: "/vs-portal-leads" },
  openGraph: {
    title: "Portal Leads vs. Money Tree Leads",
    description:
      "Shared form-fill inquiries vs. exclusive leads qualified by phone: the side-by-side comparison for Canadian realtors.",
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
      name: "Portal Leads vs. Money Tree Leads — A Realtor's Comparison",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#software` },
      inLanguage: "en-CA",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Vs. Portal Leads", item: PAGE_URL },
      ],
    },
  ],
};

const ROWS = [
  { label: "First contact", portal: "You chase the form", mtl: "AI assistant calls first" },
  { label: "Qualification", portal: "Form only", mtl: "Scored from a conversation" },
  { label: "Who gets the lead", portal: "Often several agents", mtl: "One agent" },
  { label: "What you receive", portal: "Name and number", mtl: "Summary, transcript, recording" },
  { label: "Follow-up", portal: "All on you", mtl: "Retries and text follow-up" },
];

export default function VsPortalLeadsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Subpage
        crumb="VS PORTAL LEADS"
        eyebrow="/compare"
        title={
          <>
            Portal leads vs. <span className="text-mtl-accent">Money Tree Leads.</span>
          </>
        }
        lede={
          <>
            &ldquo;Portal leads&rdquo; are the inquiries realtors buy from listing portals and
            aggregators — names captured by a form on someone else&apos;s site, often resold to
            several agents at once. Money Tree Leads takes the opposite approach: qualify first,
            deliver second, one realtor per lead. Here is the honest side-by-side.
          </>
        }
      >
        <SubpageSection heading="The comparison">
          <div className="overflow-hidden rounded-[18px] border border-mtl-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Feature comparison between portal leads and Money Tree Leads
              </caption>
              <thead>
                <tr className="mtl-mono bg-mtl-bg-3 text-[11px] uppercase tracking-[0.14em]">
                  <th scope="col" className="px-5 py-4 font-medium text-mtl-fg-3 md:px-8">
                    Comparison
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium text-mtl-fg-3 md:px-8">
                    Portal leads
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium text-mtl-accent md:px-8">
                    Money Tree Leads
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-mtl-line">
                    <th scope="row" className="px-5 py-4 font-medium text-mtl-fg-2 md:px-8">
                      {row.label}
                    </th>
                    <td className="mtl-mono px-5 py-4 text-mtl-fg-3 md:px-8">{row.portal}</td>
                    <td className="mtl-mono px-5 py-4 font-semibold text-mtl-fg md:px-8">
                      <span aria-hidden className="mr-2 text-mtl-accent">
                        ▸
                      </span>
                      {row.mtl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubpageSection>

        <SubpageSection heading="What changes when someone calls first">
          <div className="max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            <p className="mb-4">
              A portal lead is usually a form submission. Nobody has spoken with the person yet, and
              it may have gone to more than one agent, so the race is to be first on the phone with
              a stranger.
            </p>
            <p className="mb-4">
              Money Tree Leads works in a different order. Our AI assistant calls the person first,
              scores the conversation 0–100 on timeline, budget, and motivation, and screens out
              people who decline an agent or already have one. Each lead then goes to one agent
              whose service area, price range, and languages match. The full process is on the{" "}
              <Link
                href="/how-it-works"
                className="text-mtl-accent underline-offset-4 hover:underline"
              >
                how it works page
              </Link>
              .
            </p>
            <p>
              You start your call knowing what they said, because the summary, transcript, and
              recording come with the lead.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection heading="When portal leads still make sense">
          <div className="max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            <p className="mb-4">
              A fair comparison cuts both ways. Portals can make sense if you want volume and have
              a team built to work through it. They also offer brand visibility alongside the
              leads, which some teams value in itself. We don&apos;t promise a set number of leads
              per month, because delivery depends on the enquiries that come in for your area.
            </p>
            <p>
              If you are an individual agent or a small team and your time is the scarce resource,
              starting from a conversation may suit you better. Plans start at{" "}
              <Link href="/pricing" className="text-mtl-accent underline-offset-4 hover:underline">
                $179/month USD
              </Link>
              .
            </p>
          </div>
        </SubpageSection>

        <SubpageSection heading="Common questions">
          <QA q="Are Money Tree leads exclusive?">
            <p>
              Yes. Each lead goes to one realtor, based on service area, price range, and language.
              Portal leads, by contrast, are often distributed to several competing agents.
            </p>
          </QA>
          <QA q="What close rate should I expect?">
            <p>
              We don&apos;t publish a close-rate figure. Results depend on your market and your
              follow-up, and we won&apos;t quote a number we can&apos;t back up.
            </p>
          </QA>
          <QA q="Why are portal leads considered cold?">
            <p>
              Because qualification usually stops at the form. Often nobody has confirmed the
              person&apos;s timeline or that they want a call before the lead is sold, so that work
              falls to the agent after purchase.
            </p>
          </QA>
        </SubpageSection>
      </Subpage>
    </>
  );
}
