import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navigation from "./components/Navigation";
import FloatingChat from "./components/FloatingChat";
import Footer from "./components/Footer";
import ClickToSource from "./components/ClickToSource";
import UrlTracker from "./components/UrlTracker";
import { PostHogProvider } from "./components/PostHogProvider";
import { PROFESSIONAL_NAME } from "../professionalConstants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: PROFESSIONAL_NAME,
  description: PROFESSIONAL_NAME,
  keywords: ["professional services", "business", PROFESSIONAL_NAME.toLowerCase()],
  authors: [{ name: PROFESSIONAL_NAME }],
  openGraph: {
    title: PROFESSIONAL_NAME,
    description: PROFESSIONAL_NAME,
    type: "website",
  },
  icons: {
    icon: '/breezy-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <Suspense fallback={null}>
            <UrlTracker />
          </Suspense>
          <ClickToSource debug_mode={process.env.CLICK_TO_SOURCE_DEBUG || 'false'} />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
        </PostHogProvider>
      </body>
    </html>
  );
}
