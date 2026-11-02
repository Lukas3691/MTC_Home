import Link from "next/link";

/**
 * Node-tree mark (logo direction 05 from the design exploration):
 * a network graph branching into a tree silhouette.
 */
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <span className="mtl-logo-mark" style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
        <g
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          style={{ color: "color-mix(in oklab, var(--mtl-accent) 70%, transparent)" }}
        >
          <path d="M32 50 L18 28" />
          <path d="M32 50 L46 28" />
          <path d="M32 50 L32 32" />
          <path d="M18 28 L11 14" />
          <path d="M18 28 L24 12" />
          <path d="M46 28 L40 12" />
          <path d="M46 28 L53 14" />
          <path d="M32 32 L32 16" />
        </g>
        <g fill="var(--mtl-accent)">
          <circle cx="11" cy="14" r="2.6" />
          <circle cx="24" cy="12" r="2" />
          <circle cx="32" cy="16" r="2.4" />
          <circle cx="40" cy="12" r="2" />
          <circle cx="53" cy="14" r="2.6" />
        </g>
        <g fill="var(--mtl-accent)">
          <circle cx="18" cy="28" r="3.2" />
          <circle cx="32" cy="32" r="2.6" />
          <circle cx="46" cy="28" r="3.2" />
        </g>
        <circle cx="32" cy="50" r="9" fill="none" stroke="var(--mtl-accent)" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="32" cy="50" r="4.2" fill="var(--mtl-accent)" />
      </svg>
    </span>
  );
}

export function Logo({
  size = "sm",
  markOnlyOnPhones = false,
}: {
  size?: "sm" | "lg";
  /** Below 420px show just the mark, for bars with no room for the wordmark. */
  markOnlyOnPhones?: boolean;
}) {
  const dim = size === "lg" ? 44 : 26;
  return (
    <Link href="/" className={`mtl-logo mtl-logo-${size}`} aria-label="Money Tree Leads — home">
      <LogoMark size={dim} />
      <span className={`mtl-logo-type${markOnlyOnPhones ? " max-[419px]:hidden" : ""}`}>
        MoneyTree<span className="dot">·</span>Leads
      </span>
    </Link>
  );
}
