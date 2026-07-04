import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/ingest/', '/monitoring'],
      },
    ],
    sitemap: 'https://www.statenislandlaw.com/sitemap.xml',
  }
}
