import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Titillium_Web } from "next/font/google";
import Footer from "@/components/Footer";
import Ubutton from "@/components/Ubutton";
import Head from "next/head";

const titillium = Titillium_Web({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'ACM RIT',
  description: 'Official website of ACM RIT.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'ACM RIT',
    description: 'Official website of ACM RIT.',
    images: '/logo.png',
    url: 'https://acmrit.vercel.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACM RIT',
    description: 'Official website of ACM RIT.',
    images: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={titillium.className}>
        <Navbar />
        {children}
        <Footer />
        <Ubutton />
      </body>
    </html>
  );
}
