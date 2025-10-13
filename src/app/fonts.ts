import { Inter, Noto_Sans_KR, Archivo_Black, Plus_Jakarta_Sans, JetBrains_Mono, Orbitron, Rajdhani, Chakra_Petch } from "next/font/google";

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

// Other Options
// Body (Latin)
// export const bodySans = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-sans",
// });

// // Korean fallback (used only when needed)
// export const bodyKR = Noto_Sans_KR({
//   subsets: ["latin"],
//   weight: ["400","700"],
//   display: "swap",
//   variable: "--font-kr",
// });

// export const displayArchivo = Archivo_Black({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
//   variable: "--font-display",
// });

// export const homeDisplay = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-home-display",
// });

// export const homeDisplay = Orbitron({
//   subsets: ["latin"],
//   weight: ["600"],
//   variable: "--font-home-display",
// });

// export const homeDisplay = Rajdhani({
//   subsets: ["latin"],
//   weight: ["700"],
//   variable: "--font-home-display",
// });