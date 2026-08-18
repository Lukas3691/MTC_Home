import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { FooterCTA } from "@/components/landing/footer-cta";

/**
 * Server-rendered shell for content pages (/how-it-works, /pricing, …).
 * No ScrollSmoother here — content pages scroll natively so every word is
 * plain static HTML; Nav and FooterCTA degrade gracefully without it.
 */
export function Subpage({
  crumb,
  eyebrow,
  title,
  lede,
  children,
}: {
  /** Visible breadcrumb label, e.g. "HOW IT WORKS" — mirror it in BreadcrumbList JSON-LD. */
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="mtl-noise" aria-hidden />
      <main className="overflow-x-clip px-5 pt-[110px] pb-[72px] md:px-10 md:pt-[150px] md:pb-[120px]">
        <div className="mx-auto max-w-[960px]">
          <nav
            aria-label="Breadcrumb"
            className="mtl-mono mb-8 text-[11px] tracking-[0.14em] text-mtl-fg-3"
          >
            <Link href="/" className="transition-colors hover:text-mtl-fg">
              HOME
            </Link>
            <span aria-hidden> / </span>
            <span className="text-mtl-fg-2">{crumb}</span>
          </nav>

          <div className="mtl-eyebrow mb-[14px]">{eyebrow}</div>
          <h1 className="mtl-display mb-[18px] max-w-[820px] text-[40px] leading-[0.96] font-semibold tracking-[-0.03em] md:text-[64px]">
            {title}
          </h1>
          <p className="mb-12 max-w-[640px] text-[15px] leading-[1.55] text-mtl-fg-2 md:mb-16 md:text-[18px]">
            {lede}
          </p>

          {children}
        </div>
      </main>
      <FooterCTA />
    </>
  );
}

/** Section wrapper: consistent spacing + h2 styling for content pages. */
export function SubpageSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-12 border-t border-mtl-line pt-10 md:mb-16 md:pt-12">
      <h2 className="mtl-display mb-6 text-[28px] leading-[1.02] font-semibold tracking-[-0.02em] md:text-[36px]">
        {heading}
      </h2>
      {children}
    </section>
  );
}

/** Question + concise answer block, sized for featured-snippet extraction. */
export function QA({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div className="mb-7">
      <h3 className="mb-2 text-[17px] font-semibold text-mtl-fg md:text-[19px]">{q}</h3>
      <div className="max-w-[680px] text-[14px] leading-[1.6] text-mtl-fg-2 md:text-[15px]">
        {children}
      </div>
    </div>
  );
}
