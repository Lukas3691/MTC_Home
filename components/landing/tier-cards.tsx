/**
 * Tier data mirrors the app's live pricing config (Money_Tree_Leads_V2's
 * src/lib/domain/tiers.ts) as of the four-tier launch. There is no shared
 * package between the two repos, so if prices or quotas change there, this
 * needs updating by hand to match.
 */

const SIGNUP_URL = "https://app.moneytreeleads.ca/sign-up";

export type Tier = {
  id: string;
  name: string;
  price: number;
  setupFee: number;
  popular?: boolean;
  highlights: string[];
};

export const TIERS: Tier[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: 179,
    setupFee: 0,
    highlights: [
      "Pay-per-lead access (flash offers & feed)",
      "Assistant usage billed from wallet",
      "Transcript & recording with every lead",
      "AI phone assistant on your own number",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 499,
    setupFee: 250,
    highlights: [
      "10 qualified leads / month",
      "50 min + 100 SMS included",
      "Transcript & recording with every lead",
      "AI phone assistant on your own number",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 699,
    setupFee: 200,
    popular: true,
    highlights: [
      "15 qualified leads / month",
      "100 min + 200 SMS included",
      "Transcript & recording with every lead",
      "AI phone assistant on your own number",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 1199,
    setupFee: 0,
    highlights: [
      "20 qualified leads / month",
      "Unlimited assistant talk & text",
      "Transcript & recording with every lead",
      "AI phone assistant included, free",
    ],
  },
];

/**
 * Static 4-up tier grid, shared by the home page's pricing section (wrapped
 * in its own GSAP reveal) and the dedicated /pricing page (rendered plain).
 * `compact` shows 2 highlights instead of 4, for tighter spaces.
 */
export function TierCards({ compact = false }: { compact?: boolean }) {
  return (
    <div data-tier-grid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TIERS.map((tier) => (
        <div
          key={tier.id}
          data-tier-card
          className={`mtl-card flex flex-col overflow-hidden ${
            tier.popular ? "border-mtl-accent" : ""
          }`}
        >
          <div
            className={`mtl-mono px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
              tier.popular
                ? "bg-mtl-accent text-mtl-accent-ink"
                : "bg-mtl-bg-3 text-mtl-fg-3"
            }`}
          >
            {tier.popular ? "▸ most popular" : tier.name}
          </div>
          <div className="flex flex-1 flex-col px-5 py-6">
            {tier.popular ? (
              <div className="mb-1 text-[13px] font-medium text-mtl-fg">{tier.name}</div>
            ) : null}
            <div className="mb-1 flex items-baseline gap-1.5">
              <div className="mtl-num text-[36px] leading-none">${tier.price}</div>
              <div className="mtl-mono text-[12px] text-mtl-fg-3">/mo USD</div>
            </div>
            <div className="mb-4 text-[11px] text-mtl-fg-3">
              {tier.setupFee > 0 ? `$${tier.setupFee} one-time setup` : "No setup fee"}
            </div>
            <ul className="m-0 mb-5 flex flex-1 list-none flex-col gap-2 p-0">
              {(compact ? tier.highlights.slice(0, 2) : tier.highlights).map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-mtl-fg-2">
                  <span className="mtl-mono mt-[1px] text-[11px] text-mtl-accent" aria-hidden>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={SIGNUP_URL}
              className={`mtl-btn w-full justify-center p-3 text-[13px] ${
                tier.popular ? "mtl-btn-primary" : "mtl-btn-ghost"
              }`}
            >
              Choose {tier.name}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
