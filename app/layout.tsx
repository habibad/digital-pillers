import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/ui/MotionProvider";

export const metadata: Metadata = {
  title: "Digital Pillars — Growth that holds",
  description: "Digital Pillars is a growth marketing studio connecting performance, brand, web and strategy into one measurable system."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
