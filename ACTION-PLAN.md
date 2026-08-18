# SEO Action Plan — Money Tree Leads

**Date:** 2026-06-11 · Companion to `FULL-AUDIT-REPORT.md`

## ✅ Done this session (shipped in code)

| # | Item | Where |
|---|------|-------|
| 1 | XML sitemap | `app/sitemap.ts` |
| 2 | robots.txt with explicit AI-crawler allowance + sitemap pointer | `app/robots.ts` |
| 3 | Organization + WebSite JSON-LD (site-wide) | `app/layout.tsx` |
| 4 | SoftwareApplication JSON-LD with $299 CAD offer | `app/page.tsx` |
| 5 | Generated 1200×630 OG/Twitter image | `app/opengraph-image.tsx` |
| 6 | Twitter card, robots directives, keywords, author/publisher meta | `app/layout.tsx` |
| 7 | Canonical URLs on all pages | `app/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx` |
| 8 | llms.txt for AI answer engines | `public/llms.txt` |
| 9 | `lang="en-CA"`, theme-color, web manifest | `app/layout.tsx`, `app/manifest.ts` |
| 10 | Content surface: `/how-it-works` (engine deep-dive + Q&A), `/pricing` (citable standalone pricing + cost-in-Canada context), `/vs-portal-leads` (semantic comparison table + balanced analysis) — each with canonical, full OG, WebPage + BreadcrumbList JSON-LD | `app/how-it-works/`, `app/pricing/`, `app/vs-portal-leads/`, `components/landing/subpage.tsx` |
| 11 | Internal-link mesh: contextual links from home sections to deep pages, footer page links, cross-page-safe nav anchors (`/#hash`), subpage breadcrumbs | `components/landing/{engine,compare,pricing,nav,footer-cta}.tsx` |
| 12 | Sitemap + llms.txt updated with the three new pages | `app/sitemap.ts`, `public/llms.txt` |

## 🔴 Do first (requires owner action, ~1 hour total)

1. **Verify the domain in Google Search Console + Bing Webmaster Tools**, submit `https://www.moneytreeleads.ca/sitemap.xml`. Bing matters double: it feeds ChatGPT search and Copilot.
2. **Confirm canonical host redirects** after deploy: `moneytreeleads.ca` → `https://www.moneytreeleads.ca` (301), http → https. One curl check each.
3. **Create the Google Business Profile** for Money Tree Conversions (Edmonton, AB) — local entity corroboration strengthens the Organization schema.
4. **Run PageSpeed Insights on the live URL** (mobile). The GSAP hero + frame sequence is the LCP/INP risk. If LCP > 2.5s, preload frame 1 and lazy-init ScrollSmoother.

## ⚠️ This month (highest remaining leverage)

5. ~~Ship 3–5 supporting pages~~ **Done 2026-06-11** — `/how-it-works`, `/pricing`, `/vs-portal-leads` shipped (see items 10–12 above). Remaining from this item:
   - City pages only if genuinely differentiated (Edmonton first). Hard cap below 30 — thin location pages get filtered.
6. **Real social proof** — named, verifiable testimonials (with brokerage permission). Once real reviews exist on a third-party platform (Google reviews), revisit `aggregateRating` in schema. Do not add ratings schema before then.
7. **Raster logo** (512×512 PNG) at `public/logo.png`; update the Organization `logo` field.
8. **Found-by-AI flywheel**: get listed where AI engines source recommendations — relevant directories (Capterra/G2 category for real estate lead gen), a launch post, and 2–3 guest/podcast mentions in Canadian real estate media. AI assistants recommend what the corpus corroborates; `llms.txt` + schema make the claims legible, citations make them credible.

## ℹ️ Later

9. Blog/guides cluster ("real estate lead generation in Canada" pillar + spokes) once core pages exist.
10. `llms-full.txt` with expanded product documentation when there's more to say.
11. Monitor AI-crawler hits in server logs (GPTBot, ClaudeBot, PerplexityBot) to confirm ingestion; re-run a full crawl audit quarterly.
