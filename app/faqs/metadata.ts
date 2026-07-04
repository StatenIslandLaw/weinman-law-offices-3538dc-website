import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate Attorney FAQs | Staten Island | Weinman Law',
  description: 'Get expert answers to your real estate law questions. Learn about home buying, closings, attorney fees, co-ops, condos, title insurance & more. Free consultations available. NYC & NJ.',
  keywords: [
    'real estate lawyer FAQ',
    'real estate attorney questions',
    'home buying attorney FAQ',
    'real estate closing questions',
    'real estate attorney fees NY',
    'Staten Island real estate lawyer questions',
    'co-op attorney FAQ',
    'condo lawyer questions',
    'title insurance FAQ',
    'real estate closing process',
    'buyer attorney questions',
    'seller attorney FAQ',
  ],
  authors: [{ name: 'Pete Weinman', url: 'https://www.statenislandlaw.com/about' }],
  creator: 'Weinman Law Offices',
  publisher: 'Weinman Law Offices',
  applicationName: 'Weinman Law Offices',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://www.statenislandlaw.com'),
  openGraph: {
    title: 'Real Estate Attorney FAQs | Staten Island Lawyer Q&A',
    description: 'Expert answers to common real estate legal questions. Home buying, closings, fees, co-ops, condos & more. Serving NYC & NJ.',
    url: 'https://www.statenislandlaw.com/faqs',
    type: 'website',
    siteName: 'Pete Weinman, Esq.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Attorney FAQs | Staten Island Lawyer Q&A',
    description: 'Expert answers to common real estate legal questions. Home buying, closings, fees, co-ops, condos & more. Serving NYC & NJ.',
    site: '@StatenIslandLaw',
    creator: '@StatenIslandLaw',
  },
  alternates: {
    canonical: 'https://www.statenislandlaw.com/faqs',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Force explicit metadata to override any platform defaults
  other: {
    'og:description': 'Expert answers to common real estate legal questions. Home buying, closings, fees, co-ops, condos & more. Serving NYC & NJ.',
    'twitter:description': 'Expert answers to common real estate legal questions. Home buying, closings, fees, co-ops, condos & more. Serving NYC & NJ.',
  },
}
