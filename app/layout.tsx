import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  metadataBase: new URL("https://worldcup2026-schedule.example.com"),
  title: {
    default: "FIFA World Cup 2026 Schedule (IST) | All 104 Matches",
    template: "%s | FIFA World Cup 2026 Schedule",
  },
  description:
    "Complete FIFA World Cup 2026 match schedule with kickoff times converted to Indian Standard Time (IST). Group stage, knockout rounds, venues, and a live countdown to every match.",
  keywords: [
    "FIFA World Cup 2026",
    "World Cup 2026 schedule",
    "World Cup IST timings",
    "World Cup fixtures India",
    "World Cup 2026 group stage",
    "World Cup 2026 venues",
  ],
  openGraph: {
    title: "FIFA World Cup 2026 Schedule (IST)",
    description:
      "All 104 FIFA World Cup 2026 matches with kickoff times in IST, venues, and stages.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026 Schedule (IST)",
    description:
      "All 104 FIFA World Cup 2026 matches with kickoff times in IST, venues, and stages.",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B8457" },
    { media: "(prefers-color-scheme: dark)", color: "#070B14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
