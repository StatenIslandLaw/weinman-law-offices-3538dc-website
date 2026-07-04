'use client';

import Script from 'next/script';

interface StructuredDataProps {
  data: object | object[];
}

export default function StructuredData({ data }: StructuredDataProps) {
  const jsonData = Array.isArray(data) ? data : [data];

  // Combine multiple schemas into a single @graph structure for better semantic clarity
  const structuredData = jsonData.length > 1
    ? {
        "@context": "https://schema.org",
        "@graph": jsonData.map((schema: any) => {
          // Remove duplicate @context from individual schemas when combining into graph
          const { '@context': _, ...schemaWithoutContext } = schema;
          return schemaWithoutContext;
        })
      }
    : jsonData[0];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="beforeInteractive"
    />
  );
}
