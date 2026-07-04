import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Staten Island Real Estate Lawyer Pete Weinman",
  description: "Stay informed with the latest updates, tips, and insights on real estate law in New York and New Jersey from Pete Weinman, Staten Island's trusted real estate attorney.",
  keywords: [
    "staten island real estate lawyer blog",
    "real estate law blog staten island",
    "pete weinman blog",
    "real estate legal insights",
    "new york real estate law blog"
  ],
  authors: [{ name: 'Pete Weinman', url: 'https://www.statenislandlaw.com/about' }],
  creator: 'Weinman Law Offices',
  publisher: 'Weinman Law Offices',
  applicationName: 'Weinman Law Offices',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://www.statenislandlaw.com'),
  openGraph: {
    title: "Blog | Staten Island Real Estate Lawyer Pete Weinman",
    description: "Stay informed with the latest updates, tips, and insights on real estate law in New York and New Jersey from Pete Weinman, Staten Island's trusted real estate attorney.",
    url: "https://www.statenislandlaw.com/blog",
    siteName: "Pete Weinman, Esq., Real Estate Lawyer",
    images: [
      {
        url: "https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg",
        width: 1200,
        height: 630,
        alt: "Pete Weinman - Staten Island Real Estate Lawyer"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Staten Island Real Estate Lawyer Pete Weinman",
    description: "Stay informed with the latest updates, tips, and insights on real estate law in New York and New Jersey from Pete Weinman, Staten Island's trusted real estate attorney.",
    images: ["https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg"],
    site: "@StatenIslandLaw",
    creator: "@StatenIslandLaw",
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/blog",
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
    'og:description': "Stay informed with the latest updates, tips, and insights on real estate law in New York and New Jersey from Pete Weinman, Staten Island's trusted real estate attorney.",
    'twitter:description': "Stay informed with the latest updates, tips, and insights on real estate law in New York and New Jersey from Pete Weinman, Staten Island's trusted real estate attorney.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
