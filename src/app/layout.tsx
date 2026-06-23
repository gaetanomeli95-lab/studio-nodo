import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studionodo.it"),
  title: {
    default: "Studio Nodo — Crescita digitale per attività locali",
    template: "%s — Studio Nodo"
  },
  description:
    "Studio Nodo di Gaetano Meli a Palermo: social media management, content strategy, web design, landing page, siti web e crescita digitale per attività locali.",
  keywords: [
    "Studio Nodo",
    "Gaetano Meli",
    "social media manager Palermo",
    "web design Palermo",
    "content strategy",
    "landing page Palermo",
    "siti web attività locali"
  ],
  authors: [{ name: "Gaetano Meli" }],
  creator: "Gaetano Meli",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://studionodo.it",
    siteName: "Studio Nodo",
    title: "Studio Nodo — Crescita digitale per attività locali",
    description:
      "Strategia, contenuti e siti web progettati per trasformare attenzione in clienti.",
    images: [
      {
        url: "/images/hero-studio-nodo.png",
        width: 1024,
        height: 576,
        alt: "Studio Nodo digital presence visual"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Nodo — Crescita digitale per attività locali",
    description:
      "Strategia, contenuti e siti web progettati per trasformare attenzione in clienti.",
    images: ["/images/hero-studio-nodo.png"]
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1E2229"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
