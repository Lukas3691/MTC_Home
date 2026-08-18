import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Money Tree Leads",
    short_name: "Money Tree",
    description:
      "AI-powered lead engine for Canadian realtors. Pre-qualified buyers and sellers, scored on intent, financing, and timeline.",
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
