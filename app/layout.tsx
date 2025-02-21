import type { Metadata } from "next";

import dynamic from 'next/dynamic';
import localFont from "next/font/local";

import "./globals.css";
import { Providers } from "../providers/providers";

const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: false, // Disable server-side rendering for this component
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next-Boilerplate",
  description: "description",
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    title: "Next-Boilerplate",
    description: "description",
    url: "https://Next-Boilerplate.com",
    siteName: "Next-Boilerplate",
    images: [
      {
        url: "https://Next-Boilerplate.com/2.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Next-Boilerplate",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next-Boilerplate",
    description: "description.",
    images: ["https://Next-Boilerplate/2.jpg"], // Replace with your actual OG image URL
    site: "Next-Boilerplate", // Replace with your Twitter username
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/images/favicon.png" sizes="32x32" />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}