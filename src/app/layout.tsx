import type { Metadata, Viewport } from "next";
import { Syne, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Pillars — Elite Growth Architecture & Performance Framework",
  description:
    "We architect unshakeable digital growth. Built on three foundational pillars: Performance Ads, Social Presence, and Strategic Growth Roadmaps.",
  keywords: [
    "Digital Pillars",
    "Digital Growth Agency",
    "Performance Marketing",
    "Meta Ads",
    "Brand Strategy",
    "Influencer Talent",
    "London Growth Studio",
  ],
  authors: [{ name: "Digital Pillars Studio" }],
  openGraph: {
    title: "Digital Pillars — Elite Growth Architecture",
    description:
      "We architect unshakeable digital growth. Built on three foundational pillars: Performance Ads, Social Presence, and Strategic Growth Roadmaps.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${geistSans.variable} ${geistMono.variable} dark antialiased bg-[#030303] text-[#f4f4f6] selection:bg-blue-600/40 selection:text-white`}
    >
      <body className="relative min-h-screen bg-[#030303] text-[#f4f4f6] font-sans antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
        <SmoothScrollProvider>
          <AmbientGlow />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
