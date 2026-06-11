import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FIFA World Cup 2026 Schedule",
    short_name: "WC 2026",
    description:
      "All FIFA World Cup 2026 matches with kickoff times in IST, venues, and stages.",
    start_url: "/",
    display: "standalone",
    background_color: "#070B14",
    theme_color: "#0B8457",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
