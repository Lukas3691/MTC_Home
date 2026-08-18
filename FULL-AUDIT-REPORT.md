# SEO Full Audit Report — Money Tree Leads

**Site:** https://www.moneytreeleads.ca (audited from local source, `/Users/lukaszapata/MTC_Home`)
**Date:** 2026-06-11
**Scope:** `/` (landing), `/privacy`, `/terms`
**Method:** LLM-first source-code audit of the Next.js 16 app, verified against the production build output and a live dev-server render. Network-based checks (PageSpeed/CWV field data, security headers, backlinks) were not run because the audit targeted local source — listed under Environment Limitations.

---

## Score Summary (post-fix)

| Category | Weight | Before | After |
|----------|--------|--------|-------|
| Technical SEO | 25% | 55 | 95 |
| Content Quality | 20% | 80 | 80 |
| On-Page SEO | 15% | 75 | 92 |
| Schema / Structured Data | 15% | 0 | 90 |
| Performance (CWV) | 10% | n/a (lab not run) | n/a |
| Image Optimization | 10% | 85 | 85 |
| AI Search Readiness (GEO) | 5% | 20 | 95 |
| **Weighted (excl. CWV)** | | **~52 — Needs Improvement** | **~89 — Good** |

---

## Findings

### 🔴 Critical (all fixed this session)

**1. No XML sitemap**
- Evidence: no `app/sitemap.ts` or `public/sitemap.xml`; build emitted no `/sitemap.xml` route.
- Impact: crawlers must discover pages by link-walking; no lastmod signals.
- Fix applied: [app/sitemap.ts](app/sitemap.ts) — all 3 routes with `lastModified`, `changeFrequency`, `priority`. Confidence: Confirmed.

**2. No robots.txt**
- Evidence: no `app/robots.ts` / `public/robots.txt`.
- Impact: no sitemap pointer; no explicit AI-crawler policy, leaving discoverability by AI answer engines to defaults.
- Fix applied: [app/robots.ts](app/robots.ts) — allow-all, plus explicit allow rules for 13 AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, meta-externalagent, Bytespider) and the sitemap URL. Confidence: Confirmed.

**3. Zero structured data**
- Evidence: no `application/ld+json` anywhere in the rendered HTML.
- Impact: no entity in the knowledge graph; search and AI engines must infer org/product/pricing from prose.
- Fix applied: `Organization` (with `legalName: Money Tree Conversions`, Edmonton address, `areaServed: Canada`) + `WebSite` graph in [app/layout.tsx](app/layout.tsx); `SoftwareApplication` with a `CAD 299/mo` `Offer` and audience targeting in [app/page.tsx](app/page.tsx), cross-referenced by `@id`. Confidence: Confirmed (validated by JSON.parse in the rendered page).

**4. No Open Graph / Twitter image**
- Evidence: `openGraph.images` absent; no `opengraph-image` file convention.
- Impact: bare-text link previews on X, LinkedIn, Slack, iMessage — measurably lower click-through.
- Fix applied: [app/opengraph-image.tsx](app/opengraph-image.tsx) — generated 1200×630 brand card (dark `#0a0a0a`, accent `#6dff52`, headline + $299/mo badge), statically rendered at build; `twitter:card = summary_large_image` added. Verified visually and in build HTML (`og:image` resolves to the absolute production URL). Confidence: Confirmed.

**5. No canonical URLs / no llms.txt**
- Evidence: no `alternates.canonical` on any page; no `public/llms.txt`.
- Impact: duplicate-URL dilution risk (www/non-www, query params); nothing for AI engines to ingest as a canonical product summary.
- Fix applied: self-referencing canonicals on all 3 pages; [public/llms.txt](public/llms.txt) with product facts, pricing, guarantee, differentiation, and page links. Confidence: Confirmed.

### ⚠️ Warnings (fixed)

**6. `<html lang="en">` → `en-CA`** — aligns with `og:locale en_CA` and the Canadian audience. Fixed in [app/layout.tsx](app/layout.tsx).
**7. No robots meta directives** — added `index, follow` + googlebot `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`.
**8. No web manifest / theme-color** — added [app/manifest.ts](app/manifest.ts) and `viewport.themeColor #0a0a0a`.

### ⚠️ Warnings (open — see ACTION-PLAN.md)

**9. H1 carries no target keywords.** "Cold leads are dead. Watch warm ones stream in." is great copy but keyword-free; the title tag compensates. Deliberate trade-off — do not stuff the H1; instead build supporting content (see plan). Confidence: Confirmed.
**10. Organization `logo` points to an SVG.** Google prefers a raster logo ≥112×112px. Low priority. Confidence: Confirmed.
**11. Testimonials/brokerage logos must be real.** E-E-A-T (and AI engines that cross-check claims) penalize unverifiable social proof. If any are placeholders, replace or remove before scale. Confidence: Hypothesis (cannot verify authenticity from code).
**12. Single-page site = thin topical footprint.** Rankings for "real estate leads Canada" et al. will be hard with one URL. Content expansion is the highest-leverage remaining lever. Confidence: Confirmed.

### ✅ Passes (pre-existing strengths)

- Single `h1`, ordered `h2`/`h3` hierarchy, semantic `<main>`/`<nav>`, strong aria labeling throughout `components/landing/*`.
- Fully static prerender (`○` all routes) — complete content in initial HTML, no JS required to read the page. This is the single most important property for AI-crawler ingestion, already in place.
- `metadataBase` set; title 64 chars with brand+keyword; meta description 192 chars (slightly long, acceptable — Google truncates ~160).
- Hero image sequence is decorative (canvas-driven), correctly excluded from semantic content.
- `prefers-reduced-motion` respected — UX/accessibility quality signal.

---

## Environment Limitations

- **Core Web Vitals:** lab/field data not collected (site audited locally; PageSpeed API needs the deployed URL). The heavy GSAP/ScrollSmoother + 16-frame JPEG sequence on the hero warrants an LCP/INP check after deploy. Confidence: Hypothesis.
- **Security headers, redirect chains (www vs apex, http→https), backlink profile:** require the live host; not assessed.
- **FAQPage schema deliberately omitted** — restricted to gov/health sites since Aug 2023. **HowTo** deprecated. Neither recommended.

## Verification Performed

- `npx tsc --noEmit` — clean. `npm run build` — all 9 routes static, including `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/manifest.webmanifest`.
- Live dev render: canonical, robots meta, og/twitter tags, theme-color, manifest link, both JSON-LD blocks parse; `/robots.txt`, `/sitemap.xml`, `/llms.txt` all return 200; OG image screenshot verified; zero console errors.
