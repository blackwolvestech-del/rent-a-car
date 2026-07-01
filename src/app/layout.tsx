import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { site } from "@/lib/site";

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

const SITE = "Al Hadana Company Ltd — Car Rental";
const DESCRIPTION =
  "Rent premium and economy cars from Al Hadana — a clean, fully automatic fleet from €30/day. Instant online booking, insurance included, unlimited mileage, and free airport pickup.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhadana.com"),
  title: {
    default: SITE,
    template: "%s | Al Hadana",
  },
  description: DESCRIPTION,
  keywords: [
    "car rental",
    "rent a car",
    "automatic car hire",
    "airport car rental",
    "economy car rental",
    "SUV rental",
    "convertible rental",
    "cheap car hire",
  ],
  openGraph: {
    title: SITE,
    description: DESCRIPTION,
    type: "website",
    locale: "en",
    siteName: "Al Hadana Company Ltd",
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
  name: "Al Hadana Company Ltd",
  description: DESCRIPTION,
  priceRange: "€€",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: "CY",
  },
  areaServed: "Cyprus",
  hasMap: site.maps.link,
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
