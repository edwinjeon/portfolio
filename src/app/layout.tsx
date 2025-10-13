import "./globals.css";
import type { Metadata } from "next";
import { homeDisplay, formulaFont, bodyFont } from "./fonts";
import NavGate from "@/components/NavGate";

export const metadata: Metadata = {
  title: "Weongyu Jeon",
  description: "Weongyu Jeon - Data",
  metadataBase: new URL("https://edwinjeon.vercel.app"),
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={` ${bodyFont.variable} ${homeDisplay.variable} ${formulaFont.variable} bg-[#0B0F1E] text-[#E5E7EB]`}>
        <NavGate>{children}</NavGate>
        {/* DO NOT TOUCH THIS NAVGATE LINE (NAVGATE WILL DISAPPEAR) */}
      </body>
    </html>
  );
}