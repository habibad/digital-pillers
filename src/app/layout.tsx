import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  title: "Digital Pillars — Elite Growth Architecture",
  description:
    "Architecting unshakeable digital growth. Built on three foundational pillars: Performance Ads, Social Presence, and Growth Strategy.",
  metadataBase: new URL("https://digitalpillars.co"),
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-[#050505] text-[#f4f4f6] font-sans antialiased overflow-x-hidden selection:bg-[#0055ff]/40 selection:text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
