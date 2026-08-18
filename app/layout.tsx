import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://www.moneytreeleads.ca";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Money Tree Leads — Pre-Qualified Real Estate Leads, Streaming In",
  description:
    "AI-powered lead engine for Canadian realtors. Pre-qualified buyers and sellers, scored 0–100 on intent, financing, and timeline — delivered to your dashboard the second they exist. Plans from $179/mo USD.",
  applicationName: "Money Tree Leads",
  category: "Real Estate Lead Generation",
  keywords: [
    "real estate leads Canada",
    "pre-qualified real estate leads",
    "realtor lead generation",
    "AI lead scoring real estate",
    "buyer leads for realtors",
    "seller leads for realtors",
    "real estate leads Edmonton",
  ],
  authors: [{ name: "Money Tree Conversions" }],
  creator: "Money Tree Conversions",
  publisher: "Money Tree Conversions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Money Tree Leads — Watch Warm Leads Stream In",
    description:
      "Pre-qualified real estate leads for Canadian realtors, scored by AI. Plans from $179/mo USD.",
    url: SITE_URL,
    siteName: "Money Tree Leads",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Tree Leads — Watch Warm Leads Stream In",
    description:
      "Pre-qualified real estate leads for Canadian realtors, scored by AI. Plans from $179/mo USD.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// Site-wide entity graph: who we are (Organization) and what this site is
// (WebSite). The product itself (SoftwareApplication) is declared on the
// home page, which is its canonical entity page.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Money Tree Leads",
      legalName: "Money Tree Conversions",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "2207 90B St",
        addressLocality: "Edmonton",
        addressRegion: "AB",
        addressCountry: "CA",
      },
      areaServed: { "@type": "Country", name: "Canada" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Money Tree Leads",
      inLanguage: "en-CA",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
