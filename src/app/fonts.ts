import { Inter, JetBrains_Mono, Chakra_Petch } from "next/font/google";

// Home --> MainCell Font
export const homeDisplay = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-home-display",
});

// Home --> Hoverformulacell Font
export const formulaFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-formula",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});