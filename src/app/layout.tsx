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

const SITE = "Al Hadana Company Ltd — Integrated Facility Management";
const DESCRIPTION =
  "Al Hadana Company Ltd delivers integrated facility management, cleaning, pest control, maintenance, construction support, manpower supply, and industrial & environmental services. One accountable partner for every building you operate.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhadana.com"),
  title: {
    default: SITE,
    template: "%s | Al Hadana",
  },
  description: DESCRIPTION,
  keywords: [
    "facility management",
    "cleaning services",
    "pest control",
    "building maintenance",
    "manpower supply",
    "industrial services",
    "environmental solutions",
    "construction support",
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
  "@type": "Organization",
  name: "Al Hadana Company Ltd",
  description: DESCRIPTION,
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
