import "./globals.css";
import type { Metadata } from "next";
import { homeDisplay, formulaFont, bodyFont } from "./fonts";
import NavGate from "@/components/NavGate";
import { Analytics } from "@vercel/analytics/react";


export const metadata: Metadata = {
  title: "Weongyu Jeon",
  description: "Weongyu Jeon - Data",
  metadataBase: new URL("https://weongyujeon.com"),
  icons: { icon: "/favicon.png" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={` ${bodyFont.variable} ${homeDisplay.variable} ${formulaFont.variable} bg-[#0B0F1E] text-[#E5E7EB]`}>
        <NavGate>{children}</NavGate>
        <Analytics />
        {/* DO NOT TOUCH THIS NAVGATE LINE (NAVGATE WILL DISAPPEAR) */}
      </body>
    </html>
  );
}