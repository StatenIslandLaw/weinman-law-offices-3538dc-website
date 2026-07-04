// SEO Helper Functions

export const generatePageTitle = (title: string, includeBrand: boolean = true): string => {
  return includeBrand ? `${title} | Weinman Law Offices` : title;
};

export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const generateKeywords = (primary: string[], secondary: string[] = []): string[] => {
  return [...primary, ...secondary];
};

// Local Business SEO data
export const LOCAL_SEO_DATA = {
  businessName: 'Weinman Law Offices',
  attorney: 'Peter J. Weinman, Esq.',
  address: {
    street: '260 Christopher Lane, Suite 201',
    city: 'Staten Island',
    state: 'NY',
    zip: '10314',
    country: 'US',
  },
  coordinates: {
    latitude: 40.6063,
    longitude: -74.1651,
  },
  phone: '+17184422010',
  email: 'Weinman@StatenIslandLaw.com',
  website: 'https://www.statenislandlaw.com',
  serviceAreas: [
    'Staten Island, NY',
    'Brooklyn, NY',
    'Manhattan, NY',
    'Queens, NY',
    'Bronx, NY',
    'Westchester County, NY',
    'Jersey City, NJ',
    'Newark, NJ',
    'New York',
    'New Jersey',
  ],
  services: [
    'Residential Real Estate',
    'Commercial Real Estate',
    'Real Estate Closings',
    'Title Examination',
    'Condos & Cooperatives',
    'Trusts & Guardianship',
    'Refinancing',
    'Property Transactions',
  ],
  hours: {
    monday: '09:00-17:00',
    tuesday: '09:00-17:00',
    wednesday: '09:00-17:00',
    thursday: '09:00-17:00',
    friday: '09:00-17:00',
    saturday: 'By Appointment',
    sunday: 'By Appointment',
  },
};

// Primary keywords for each page
export const PAGE_KEYWORDS = {
  home: [
    'Staten Island real estate lawyer',
    'Staten Island real estate attorney',
    'NY real estate lawyer',
    'NJ real estate attorney',
    'Pete Weinman attorney',
    'residential real estate closing',
    'commercial real estate lawyer',
    'property closing attorney',
  ],
  about: [
    'Pete Weinman attorney',
    'Peter Weinman lawyer',
    'Staten Island attorney biography',
    'real estate lawyer experience',
    'NY law school graduate',
    'Richmond County Bar Association',
  ],
  services: [
    'real estate legal services',
    'residential closing attorney',
    'commercial real estate services',
    'title examination lawyer',
    'condo lawyer Staten Island',
    'refinancing attorney',
    'property law services',
  ],
  areas: [
    'Staten Island real estate lawyer',
    'Brooklyn real estate attorney',
    'Manhattan property lawyer',
    'Queens real estate attorney',
    'Jersey City real estate lawyer',
    'NJ real estate attorney',
  ],
  faqs: [
    'real estate lawyer FAQ',
    'closing process questions',
    'real estate attorney fees',
    'consultation questions',
    'legal services FAQ',
  ],
  reviews: [
    'Pete Weinman reviews',
    'real estate attorney testimonials',
    'Staten Island lawyer reviews',
    'client testimonials',
    'attorney ratings',
  ],
};

// Generate FAQ Schema from FAQ items
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Generate Service Schema
export const generateServiceSchema = (
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: serviceName,
  provider: {
    '@type': 'LegalService',
    name: LOCAL_SEO_DATA.businessName,
    url: LOCAL_SEO_DATA.website,
  },
  description: serviceDescription,
  areaServed: LOCAL_SEO_DATA.serviceAreas.map((area) => ({
    '@type': 'Place',
    name: area,
  })),
  url: serviceUrl,
});

// Generate Review Schema
export const generateReviewSchema = (
  reviewAuthor: string,
  reviewRating: number,
  reviewText: string,
  reviewDate: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'LegalService',
    name: LOCAL_SEO_DATA.businessName,
  },
  author: {
    '@type': 'Person',
    name: reviewAuthor,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: reviewRating,
    bestRating: 5,
  },
  reviewBody: reviewText,
  datePublished: reviewDate,
});

// Generate Aggregate Rating Schema
export const generateAggregateRatingSchema = (
  ratingValue: number,
  reviewCount: number
) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: LOCAL_SEO_DATA.businessName,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: ratingValue,
    reviewCount: reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
});
