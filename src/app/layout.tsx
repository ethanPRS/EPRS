import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EPRS | Ethan Rivera",
  description: "Software Architect, Technology Consultant and Founder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${poppins.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-text selection:bg-cta-blue/30 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
