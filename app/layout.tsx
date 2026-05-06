import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export const metadata: Metadata = {
  title: "FirewingFab",
  description:
    "A student innovation platform for RC builders, drones, IoT, and robotics, inspired by APJ Abdul Kalam."
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
