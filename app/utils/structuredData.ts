import { PROFESSIONAL_NAME, PROFESSIONAL_PHONE, PROFESSIONAL_EMAIL, PROFESSIONAL_ADDRESS, PROFESSIONAL_IMAGES, SOCIAL_MEDIA } from '../../professionalConstants';

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LegalService", "Attorney"],
  "@id": "https://www.statenislandlaw.com/#organization",
  "name": PROFESSIONAL_NAME,
  "alternateName": "Pete Weinman, Staten Island Real Estate Lawyer",
  "description": "Experienced Staten Island real estate lawyer providing expert legal services for residential and commercial property transactions in New York and New Jersey. Serving Staten Island, Brooklyn, and surrounding areas for over 25 years.",
  "url": "https://www.statenislandlaw.com",
  "telephone": PROFESSIONAL_PHONE,
  "email": PROFESSIONAL_EMAIL,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "260 Christopher Lane, Suite 201",
    "addressLocality": "Staten Island",
    "addressRegion": "NY",
    "postalCode": "10314",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.6063",
    "longitude": "-74.1651"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Staten Island",
      "containedIn": {
        "@type": "State",
        "name": "New York"
      }
    },
    {
      "@type": "City",
      "name": "Brooklyn",
      "containedIn": {
        "@type": "State",
        "name": "New York"
      }
    },
    {
      "@type": "State",
      "name": "New York"
    },
    {
      "@type": "State",
      "name": "New Jersey"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "image": PROFESSIONAL_IMAGES[0],
  "logo": PROFESSIONAL_IMAGES[0],
  "founder": {
    "@type": "Person",
    "@id": "https://www.statenislandlaw.com/#attorney",
    "name": "Peter J. Weinman",
    "honorificSuffix": "Esq.",
    "jobTitle": "Staten Island Real Estate Lawyer",
    "description": "Licensed real estate lawyer serving Staten Island and the greater New York and New Jersey area"
  },
  "sameAs": [
    SOCIAL_MEDIA.facebook,
    SOCIAL_MEDIA.linkedin,
    SOCIAL_MEDIA.twitter,
    SOCIAL_MEDIA.instagram
  ],
  "knowsAbout": [
    "Real Estate Law",
    "Residential Real Estate",
    "Commercial Real Estate",
    "Property Transactions",
    "Title Examination",
    "Real Estate Closings",
    "Condominium Law",
    "Cooperative Law"
  ]
});

export const generateAttorneySchema = () => ({
  "@context": "https://schema.org",
  "@type": ["Person", "Attorney"],
  "@id": "https://www.statenislandlaw.com/#attorney",
  "name": "Peter J. Weinman",
  "alternateName": "Pete Weinman",
  "honorificSuffix": "Esq.",
  "jobTitle": "Staten Island Real Estate Lawyer",
  "description": "Experienced Staten Island real estate lawyer licensed in NY & NJ with 25+ years of practice. Specializes in residential and commercial property transactions, closings, title examination, and real estate law.",
  "url": "https://www.statenislandlaw.com",
  "worksFor": {
    "@id": "https://www.statenislandlaw.com/#organization"
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "New York Law School",
      "description": "Juris Doctor (J.D.), 2000"
    },
    {
      "@type": "EducationalOrganization",
      "name": "College of Staten Island",
      "description": "Bachelor of Arts in English, 1992"
    }
  ],
  "knowsAbout": [
    "Real Estate Law",
    "Residential Real Estate Transactions",
    "Commercial Real Estate Transactions",
    "Property Closings",
    "Title Examination",
    "Condominium and Cooperative Law",
    "Refinancing",
    "Trusts and Guardianship",
    "Real Estate Contracts",
    "Property Law"
  ],
  "memberOf": [
    {
      "@type": "Organization",
      "name": "Richmond County Bar Association",
      "description": "Former Director"
    },
    {
      "@type": "Organization",
      "name": "Staten Island Women's Bar Association",
      "description": "Former Director"
    },
    {
      "@type": "Organization",
      "name": "New York State Bar Association"
    },
    {
      "@type": "Organization",
      "name": "New Jersey State Bar Association"
    }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Juris Doctor",
      "credentialCategory": "degree",
      "educationalLevel": "Graduate Degree",
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "New York Law School"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "New York Bar License",
      "credentialCategory": "license",
      "recognizedBy": {
        "@type": "Organization",
        "name": "New York State Bar"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "New Jersey Bar License",
      "credentialCategory": "license",
      "recognizedBy": {
        "@type": "Organization",
        "name": "New Jersey State Bar"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "New York State Certified Real Estate Instructor",
      "credentialCategory": "certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "New York State"
      }
    }
  ],
  "areaServed": [
    {
      "@type": "State",
      "name": "New York"
    },
    {
      "@type": "State",
      "name": "New Jersey"
    },
    {
      "@type": "City",
      "name": "Staten Island",
      "containedIn": {
        "@type": "State",
        "name": "New York"
      }
    },
    {
      "@type": "City",
      "name": "Brooklyn",
      "containedIn": {
        "@type": "State",
        "name": "New York"
      }
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "260 Christopher Lane, Suite 201",
    "addressLocality": "Staten Island",
    "addressRegion": "NY",
    "postalCode": "10314",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": PROFESSIONAL_PHONE,
    "email": PROFESSIONAL_EMAIL,
    "contactType": "customer service",
    "availableLanguage": ["English"],
    "areaServed": ["US"]
  },
  "telephone": PROFESSIONAL_PHONE,
  "email": PROFESSIONAL_EMAIL,
  "image": PROFESSIONAL_IMAGES[0],
  "foundingDate": "2001",
  "yearsExperience": "25+"
});

// Helper function to strip HTML tags from text
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .trim();
}

export const generateFAQPageSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": stripHtmlTags(faq.question),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": stripHtmlTags(faq.answer)
    }
  }))
});

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => {
    // Ensure URL is absolute
    const absoluteUrl = item.url.startsWith('http')
      ? item.url
      : `https://www.statenislandlaw.com${item.url}`;

    // For the last item (current page), we can optionally omit the item field
    // but Google accepts it either way as long as the URL is valid
    const listItem: any = {
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name
    };

    // Always include item field with valid absolute URL
    listItem.item = absoluteUrl;

    return listItem;
  })
});

export const generateWebPageSchema = (
  pageName: string,
  pageDescription: string,
  pageUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": pageName,
  "description": pageDescription,
  "url": pageUrl,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Weinman Law Offices",
    "url": "https://www.statenislandlaw.com"
  },
  "author": {
    "@type": "Person",
    "name": "Peter J. Weinman",
    "jobTitle": "Real Estate Attorney"
  },
  "publisher": {
    "@type": "LegalService",
    "name": "Weinman Law Offices"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Weinman Law Offices",
  "alternateName": ["Pete Weinman Law", "Weinman Law", "Peter Weinman Attorney"],
  "url": "https://www.statenislandlaw.com",
  "logo": "https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg",
  "image": "https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg",
  "description": "Experienced Staten Island real estate attorney providing expert legal services for residential and commercial property transactions in New York and New Jersey since 2001.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "260 Christopher Lane, Suite 201",
    "addressLocality": "Staten Island",
    "addressRegion": "NY",
    "postalCode": "10314",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.6063",
    "longitude": "-74.1651"
  },
  "telephone": PROFESSIONAL_PHONE,
  "email": PROFESSIONAL_EMAIL,
  "priceRange": "$$",
  "areaServed": [
    "Staten Island, NY",
    "Brooklyn, NY",
    "Manhattan, NY",
    "Queens, NY",
    "Bronx, NY",
    "Westchester County, NY",
    "Jersey City, NJ",
    "Newark, NJ",
    "New York",
    "New Jersey"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/StatenIslandLaw",
    "https://www.linkedin.com/in/statenislandlaw",
    "https://twitter.com/StatenIslandLaw",
    "https://www.instagram.com/statenislandlaw"
  ]
});

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pete Weinman, Esq.",
  "alternateName": "Weinman Law Offices",
  "url": "https://www.statenislandlaw.com"
});

export const generateHomepageLegalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Pete Weinman, Esq.",
  "alternateName": "Weinman Law Offices",
  "url": "https://www.statenislandlaw.com",
  "telephone": "+17184422010",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "260 Christopher Lane, Suite 201",
    "addressLocality": "Staten Island",
    "addressRegion": "NY",
    "postalCode": "10314",
    "addressCountry": "US"
  },
  "areaServed": "Staten Island, NY",
  "description": "Real estate attorney Pete Weinman represents home buyers and sellers in Staten Island and New York City.",
  "priceRange": "$$"
});

// Generate individual LegalService schemas for specific services
export const generateLegalServiceSchema = (
  serviceName: string,
  serviceDescription: string,
  serviceType?: string,
  url?: string
) => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": serviceName,
  "description": serviceDescription,
  "serviceType": serviceType || "Real Estate Legal Services",
  "url": url || "https://www.statenislandlaw.com/services",
  "provider": {
    "@type": "LegalService",
    "@id": "https://www.statenislandlaw.com/#organization",
    "name": PROFESSIONAL_NAME,
    "telephone": PROFESSIONAL_PHONE,
    "email": PROFESSIONAL_EMAIL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "260 Christopher Lane, Suite 201",
      "addressLocality": "Staten Island",
      "addressRegion": "NY",
      "postalCode": "10314",
      "addressCountry": "US"
    }
  },
  "areaServed": [
    { "@type": "State", "name": "New York" },
    { "@type": "State", "name": "New Jersey" }
  ],
  "category": "Legal Services",
  "termsOfService": "https://www.statenislandlaw.com/terms-of-service"
});

// Specific service schemas
export const generateResidentialPurchaseSchema = () => generateLegalServiceSchema(
  "Residential Purchase Legal Services",
  "Complete buyer representation from contract negotiation to title examination to closing. Expert guidance through the entire home buying process in New York and New Jersey.",
  "Residential Real Estate Purchase",
  "https://www.statenislandlaw.com/services"
);

export const generateResidentialSaleSchema = () => generateLegalServiceSchema(
  "Residential Sale Legal Services",
  "Expert seller representation including deed preparation, title review and clearance, disclosure compliance, and closing coordination for residential property sales.",
  "Residential Real Estate Sale",
  "https://www.statenislandlaw.com/services"
);

export const generateCommercialRealEstateSchema = () => generateLegalServiceSchema(
  "Commercial Real Estate Legal Services",
  "Sophisticated handling of commercial transactions, investment properties, and commercial leases for investors, business owners, and corporate entities across NY and NJ.",
  "Commercial Real Estate",
  "https://www.statenislandlaw.com/services"
);

export const generateCondoCoopSchema = () => generateLegalServiceSchema(
  "Condominium & Cooperative Legal Services",
  "Specialized expertise in condo and co-op transactions including board approval process, proprietary lease review, assessment and HOA matters, and financing considerations.",
  "Condominium and Cooperative Law",
  "https://www.statenislandlaw.com/services"
);

export const generateTrustsGuardianshipSchema = () => generateLegalServiceSchema(
  "Trusts & Guardianship Legal Services",
  "Experience with trusts, guardianship matters, and probate issues involving real property. Court-appointed Article 81 guardian services in New York.",
  "Trusts and Estates",
  "https://www.statenislandlaw.com/services"
);

export const generateRefinanceSchema = () => generateLegalServiceSchema(
  "Refinancing & Loan Modification Services",
  "Complete refinancing and loan modification services including title work, lender coordination, closing representation, and short sale assistance.",
  "Real Estate Refinancing",
  "https://www.statenislandlaw.com/services"
);

// Generate all service schemas as an array
export const generateAllServiceSchemas = () => [
  generateResidentialPurchaseSchema(),
  generateResidentialSaleSchema(),
  generateCommercialRealEstateSchema(),
  generateCondoCoopSchema(),
  generateTrustsGuardianshipSchema(),
  generateRefinanceSchema()
];
