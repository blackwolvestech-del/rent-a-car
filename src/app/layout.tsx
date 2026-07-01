import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE = "Al Hadana Company LTD — Luxury Car Rental";
const DESCRIPTION =
  "Choose from the world's finest luxury, sports, and executive vehicles with instant online booking. Airport pickup, fully insured, 24/7 concierge.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhadana.com"),
  title: {
    default: SITE,
    template: "%s | Al Hadana",
  },
  description: DESCRIPTION,
  keywords: [
    "luxury car rental",
    "sports car hire",
    "exotic car rental",
    "Ferrari rental",
    "Lamborghini rental",
    "chauffeur",
    "airport pickup",
  ],
  openGraph: {
    title: SITE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IE",
    siteName: "Al Hadana Company LTD",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "Al Hadana Company LTD",
  description: DESCRIPTION,
  priceRange: "€€€€",
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <CursorGlow />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
