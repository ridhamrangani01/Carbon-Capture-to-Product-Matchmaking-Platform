import type { Metadata } from "next";
import { Barlow_Condensed, Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontCarbonDisplay = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-carbon-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UpCarb. — Turn Captured Carbon Into Valuable Products",
  description:
    "Carbon Capture-to-Product Matchmaking Platform connecting carbon emitters with industrial utilizers, researchers, and circular economy pathways.",
  keywords: [
    "Carbon Capture",
    "Carbon Utilization",
    "CCU",
    "E-Methanol",
    "Concrete Curing",
    "Circular Economy",
    "Decarbonization",
    "CO2 Matchmaking",
  ],
  authors: [{ name: "UpCarb. Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${fontCarbonDisplay.variable} ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body className="bg-[#083324] text-slate-100 antialiased font-sans selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
