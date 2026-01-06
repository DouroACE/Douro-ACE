import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

const siteUrl = "https://ace.pt";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-ACEGA4ID";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | ACE",
    default: "ACE — Curated stays, smart investments, personalised experiences"
  },
  description:
    "ACE curates premium stays, investment-grade properties, and intelligent concierge experiences across Portugal.",
  openGraph: {
    title: "ACE — Curated stays, smart investments, personalised experiences",
    description:
      "Premium stays in Portugal, curated investments with proof of performance, and an intelligent ACE concierge.",
    url: siteUrl,
    siteName: "ACE",
    locale: "en_PT",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ACE",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "ACE offers curated luxury stays, investment-grade properties, and personalised concierge powered by technology.",
  sameAs: ["https://www.instagram.com"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "Portugal"
  }
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "ACE Stays",
  url: `${siteUrl}/stays`,
  telephone: "+351000000000",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Portugal"
  },
  areaServed: ["Douro", "Porto", "Algarve", "Norte"],
  priceRange: "Premium",
  description: "Curated villas and residences with ACE concierge and technology."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-linen to-white text-charcoal">
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          id="ga-loader"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script id="ga-inline" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script id="json-ld-organization" type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="json-ld-lodging" type="application/ld+json">
          {JSON.stringify(lodgingJsonLd)}
        </Script>
      </body>
    </html>
  );
}
