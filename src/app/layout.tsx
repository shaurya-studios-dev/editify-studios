import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DeviceModeProvider } from "@/components/DeviceModeProvider";
import Scene from "@/components/Scene";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Editify Studios | Premium Video Editing & Creative Production",
  description: "Top-tier video editing agency for YouTube creators and brands. We engineer engaging, cinematic experiences through advanced VFX, motion graphics, and narrative-driven cuts.",
  keywords: ["video editing agency", "youtube editor", "creative production", "VFX", "motion graphics", "high-end editing", "digital art", "Editify"],
  openGraph: {
    title: "Editify Studios | Premium Video Editing",
    description: "Engineering engaging, cinematic experiences for the top 1% of creators and brands.",
    url: "https://editify.shop",
    siteName: "Editify Studios",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editify Studios | Premium Video Editing",
    description: "Engineering engaging, cinematic experiences for the top 1% of creators and brands.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Editify Studios",
  "description": "Top-tier video editing agency for YouTube creators and brands.",
  "url": "https://editify.shop",
  "offers": [
    {
      "@type": "Offer",
      "name": "Standard Video Editing",
      "price": "40.00",
      "priceCurrency": "USD"
    },
    {
      "@type": "Offer",
      "name": "Premium Video Editing",
      "price": "100.00",
      "priceCurrency": "USD"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-black text-black dark:text-white selection:bg-yellow-600 selection:text-white overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <DeviceModeProvider>
            <Preloader />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CustomCursor />
            <Scene />
            <Header />
            <SmoothScroll>{children}</SmoothScroll>
          </DeviceModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
