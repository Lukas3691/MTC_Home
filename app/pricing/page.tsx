import type { Metadata } from "next";
import Link from "next/link";
import { Subpage, SubpageSection, QA } from "@/components/landing/subpage";
import { TierCards } from "@/components/landing/tier-cards";

const SITE_URL = "https://www.moneytreeleads.ca";
const PAGE_URL = `${SITE_URL}/pricing`;

export const metadata: Metadata = {
  title: "Pricing — Plans from $179/mo USD for Pre-Qualified Real Estate Leads | Money Tree Leads",
  description:
    "Money Tree Leads pricing: four tiers from $179 to $1,199/month USD for phone-verified, AI-qualified real estate leads. No annual contract, cancel anytime.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Money Tree Leads Pricing — Plans From $179/mo USD",
    description:
      "Phone-verified, AI-qualified leads, exclusive to you. Four tiers, no annual contract, cancel anytime.",
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
      name: "Money Tree Leads Pricing — Plans From $179/month USD",
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
            Four tiers. <span className="text-mtl-accent">Pick where you start.</span>
          </>
        }
        lede={
          <>
            No annual contract. Every Money Tree Leads tier is billed monthly in USD and can be
            cancelled any time. Each lead goes to one agent. We don&apos;t promise a set number of
            leads per month, because they arrive as they are qualified and matched to you.
          </>
        }
      >
        <SubpageSection heading="Plans">
          <TierCards />
          <p className="mt-6 max-w-[680px] text-[13px] leading-[1.6] text-mtl-fg-3">
            Extra leads, flash offers and assistant usage beyond what a tier includes are paid
            from a prepaid credit wallet. All prices in USD.
          </p>
        </SubpageSection>

        <SubpageSection heading="What you get compared with portal leads">
          <p className="mb-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            Portal leads are typically form-fill inquiries, often shared between agents. Money Tree
            Leads starts at <strong className="text-mtl-fg">$179/month USD</strong>, and our AI
            assistant speaks with each qualified lead before you receive it.
          </p>
          <div className="max-w-[680px] overflow-hidden rounded-[18px] border border-mtl-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparison: portal leads versus Money Tree Leads
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
                    Qualification
                  </th>
                  <td className="mtl-mono px-5 py-4 text-mtl-fg-3">Form only</td>
                  <td className="mtl-mono px-5 py-4 font-semibold text-mtl-fg">
                    Scored from a conversation
                  </td>
                </tr>
                <tr className="border-t border-mtl-line">
                  <th scope="row" className="px-5 py-4 font-medium text-mtl-fg-2">
                    Who gets the lead
                  </th>
                  <td className="mtl-mono px-5 py-4 text-mtl-fg-3">Often several agents</td>
                  <td className="mtl-mono px-5 py-4 font-semibold text-mtl-fg">One agent</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
            The full breakdown lives on the{" "}
            <Link
              href="/vs-portal-leads"
              className="text-mtl-accent underline-offset-4 hover:underline"
            >
              portal leads comparison page
            </Link>
            , and the qualification process is explained in{" "}
            <Link
              href="/how-it-works"
              className="text-mtl-accent underline-offset-4 hover:underline"
            >
              how it works
            </Link>
            .
          </p>
        </SubpageSection>

        <SubpageSection heading="Terms in plain language">
          <ul className="m-0 flex max-w-[680px] list-none flex-col gap-3 p-0">
            {[
              ["Exclusive leads", "Each lead goes to one realtor."],
              ["No set lead count", "Leads depend on the enquiries that come in for your area, so we don't promise a monthly number."],
              ["Cancel anytime", "Month-to-month billing. No annual contract, no cancellation fee."],
              ["Your data", "How we handle personal information is set out in our privacy policy."],
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
          <QA q="How much does Money Tree Leads cost?">
            <p>
              Plans run from $179/month USD to $1,199/month USD. Bronze is pay-per-lead. Silver,
              Gold, and Platinum include leads as they become available, with higher plans getting
              priority. Platinum also includes unlimited assistant talk &amp; text.
            </p>
          </QA>
          <QA q="How many leads will I get?">
            <p>
              We don&apos;t promise a set number per month. Leads depend on the enquiries that come
              in, the conversations our assistant has with them, and how well they match your
              service area, price range, and languages.
            </p>
          </QA>
          <QA q="Is there a contract or minimum term?">
            <p>
              No. Every tier is month-to-month and you can cancel any time from the
              dashboard.
            </p>
          </QA>
          <QA q="Do all tiers have a setup fee?">
            <p>
              No. Bronze and Platinum have no setup fee. Silver ($250) and Gold ($200) carry a
              one-time setup fee charged with the first payment.
            </p>
          </QA>
        </SubpageSection>
      </Subpage>
    </>
  );
}
