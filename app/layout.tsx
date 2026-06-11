import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://www.moneytreeleads.ca"),
  title: "Money Tree Leads — Pre-Qualified Real Estate Leads, Streaming In",
  description:
    "AI-powered lead engine for Canadian realtors. Pre-qualified buyers and sellers, scored 0–100 on intent, financing, and timeline — delivered to your dashboard the second they exist. $299/mo.",
  openGraph: {
    title: "Money Tree Leads — Watch Warm Leads Stream In",
    description:
      "Pre-qualified real estate leads for Canadian realtors, scored by AI. One plan, $299/mo.",
    url: "https://www.moneytreeleads.ca",
    siteName: "Money Tree Leads",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
