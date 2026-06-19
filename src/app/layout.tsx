import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Editing Service",
  description: "Premium Digital Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f8f5ed] font-sans selection:bg-[#D4AF37] selection:text-black">
        {/* Ambient Glow Background mimicking the original */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08)_0%,transparent_40%)] -z-10 pointer-events-none animate-pulse" />
        {children}
      </body>
    </html>
  );
}
