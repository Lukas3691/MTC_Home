import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SubpageSection, QA } from "@/components/landing/subpage";

const SITE_URL = "https://www.moneytreeleads.ca";
const PAGE_URL = `${SITE_URL}/vs-portal-leads`;

export const metadata: Metadata = {
  title: "Portal Leads vs. Money Tree Leads — A Realtor's Comparison",
  description:
    "Buying real estate leads from listing portals vs. an AI qualification engine: cost ($600+ vs $299/mo), close rates (4–6% vs 18–22%), exclusivity, and qualification, compared side by side.",
  alternates: { canonical: "/vs-portal-leads" },
  openGraph: {
    title: "Portal Leads vs. Money Tree Leads",
    description:
      "Shared form-fill inquiries vs. exclusive AI-qualified leads — the full side-by-side comparison for Canadian realtors.",
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
  { label: "Lead source", portal: "Cold portal scrape", mtl: "AI-driven intent capture" },
  { label: "Qualification", portal: "Form-only", mtl: "23-signal MTL Score" },
  { label: "Bot/fake filter", portal: "Manual", mtl: "Model auto-rejects" },
  { label: "Outreach", portal: "You write it", mtl: "AI-drafted opener" },
  { label: "Avg. close rate", portal: "4–6%", mtl: "18–22%" },
  { label: "Monthly cost", portal: "$600+", mtl: "$299" },
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

        <SubpageSection heading="Why the close rates differ">
          <div className="max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            <p className="mb-4">
              The 4–6% close rate typical of portal leads isn&apos;t a sales-skill problem — it&apos;s
              structural. A portal lead is a form submission: unverified, unenriched, and usually
              sold to more than one agent, so the race is to be first on the phone with a stranger
              who may not be able to transact at all.
            </p>
            <p className="mb-4">
              Money Tree Leads inverts that structure. Before a lead reaches a realtor it has been
              bot-filtered, enriched with 23 signals (mortgage status, employer signal, listing
              history, household composition), and scored against a model trained on 4.1 million
              closed transactions. Leads under a 70/100 score are discarded, and each qualified
              lead is routed to exactly one realtor by territory, price band, and specialty. The
              full pipeline is documented on the{" "}
              <Link
                href="/how-it-works"
                className="text-mtl-accent underline-offset-4 hover:underline"
              >
                how it works page
              </Link>
              .
            </p>
            <p>
              Warmer lead, no shared inbox race, and an AI-drafted opener to start the
              conversation — that combination is what moves close rates into the 18–22% range.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection heading="When portal leads still make sense">
          <div className="max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            <p className="mb-4">
              A fair comparison cuts both ways. Portal leads can be reasonable if you want maximum
              raw volume and have a team built to grind through it — high-capacity inside sales
              agents who can call hundreds of numbers and tolerate single-digit conversion. The
              portals also offer brand visibility alongside the leads, which some teams value in
              itself.
            </p>
            <p>
              If you are an individual agent or a small team whose time is the scarce resource,
              paying more per month for colder, shared inquiries is hard to justify — that is the
              realtor Money Tree Leads is built for, at a flat{" "}
              <Link href="/pricing" className="text-mtl-accent underline-offset-4 hover:underline">
                $299/month
              </Link>
              .
            </p>
          </div>
        </SubpageSection>

        <SubpageSection heading="Common questions">
          <QA q="Are Money Tree leads exclusive?">
            <p>
              Yes. Each qualified lead is routed to one realtor based on FSA/ZIP territory, price
              band, and specialty match. Portal leads, by contrast, are commonly distributed to
              multiple competing agents.
            </p>
          </QA>
          <QA q="What is a good close rate for purchased real estate leads?">
            <p>
              Industry-typical close rates for shared portal leads sit around 4–6%. Pre-qualified,
              exclusive leads convert substantially better — Money Tree Leads subscribers typically
              see 18–22%.
            </p>
          </QA>
          <QA q="Why are portal leads considered cold?">
            <p>
              Because qualification stops at the form. Nothing verifies the person&apos;s financing,
              timeline, or even that they are human before the lead is sold — the verification work
              is pushed onto the agent after purchase.
            </p>
          </QA>
        </SubpageSection>
      </Subpage>
    </>
  );
}
