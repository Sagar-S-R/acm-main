import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Titillium_Web } from "next/font/google";
import Footer from "@/components/Footer";
import Ubutton from "@/components/Ubutton";

const titillium = Titillium_Web({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACM - RIT",
  description: "ACM - RIT Student Chapter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={titillium.className}>
        <Navbar />
        {children}
        <Footer />
        <Ubutton /> 
      </body>
    </html>
  );
}
