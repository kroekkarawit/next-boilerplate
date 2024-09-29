import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const ibmPlexSansThaiFont = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "700"], // Adjust weights as needed
  subsets: ["latin", "thai"],
  variable: "--font-ibm-plex-sans-thai",
});

// Combine the fonts
export const fontSans = {
  inter: interFont.variable,
  ibmPlexSansThaiFont: ibmPlexSansThaiFont.variable,
};
