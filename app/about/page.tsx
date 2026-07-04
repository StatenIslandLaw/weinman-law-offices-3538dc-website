'use client';

import React from 'react';
import Image from 'next/image';
import PhotoCarousel from '../components/PhotoCarousel';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import Breadcrumbs from '../components/Breadcrumbs';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { PROFESSIONAL_IMAGES, PROFESSIONAL_PHONE, PROFESSIONAL_PHONE_ALT } from '../../professionalConstants';
import { PHOTO_CAPTIONS } from '../utils/captions';
import { formatPhoneNumber } from '../utils/phoneUtils';

export default function About() {
  // Person structured data for SEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pete Weinman',
    jobTitle: 'Real Estate Attorney',
    description: 'Staten Island real estate lawyer with 25+ years of experience serving NY & NJ clients',
    url: 'https://www.statenislandlaw.com/about',
    image: 'https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg',
    telephone: PROFESSIONAL_PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Staten Island',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'New York Law School',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'College of Staten Island',
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Richmond County Bar Association',
    },
    knowsAbout: [
      'Real Estate Law',
      'Property Closings',
      'Title Insurance',
      'Residential Real Estate',
      'Commercial Real Estate',
    ],
  };

  return (
    <DesktopMarginWrapper>
    <>
      <GoogleAnalytics measurementId="G-C9WLVZKQW4" />
      {/* Person Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumbs items={[{ name: 'About', url: '/about' }]} />
      </div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="w-full mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-block">
                <span className="text-amber-300 text-sm font-semibold tracking-wide">ABOUT PETE WEINMAN</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pete Weinman, Esq. - Real Estate Attorney
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 mb-4 w-full mx-auto px-4 leading-relaxed">A quarter century of legal excellence in real estate transactions across New York and New Jersey.<br />Prompt, courteous responses. That&apos;s what you get with Pete Weinman.</p>
            <p className="text-slate-300 text-sm">
              Licensed in NY & NJ • Serving thousands of satisfied clients since 2001
            </p>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-transparent to-white"></div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
            <div className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">Background</h2>
              <div className="space-y-6 text-slate-200">
                <p className="text-lg leading-relaxed">Since 2001, Pete Weinman, Esq. has been a trusted name in Staten Island real estate law, representing homebuyers, sellers, and property owners with integrity and personalized service. Pete has built a reputation as a top residential real estate attorney known for providing clear guidance, practical solutions, and trusted counsel throughout every stage of the real estate process.</p>
                <p className="text-lg leading-relaxed">Pete earned his Juris Doctor from New York Law School in 2000 and a Bachelor of Arts in English from the College of Staten Island in 1992. He is licensed to practice law in both New York and New Jersey, serving clients primarily across Staten Island, Brooklyn, Queens, Bronx, and all counties of New Jersey.</p>
                <p className="text-lg leading-relaxed">Before founding his private real estate law practice in 2010, Pete sharpened his skills at respected Staten Island firms including Lee & Amtzis, LLP, Corash & Hollender, P.C., and Gaines & Fishler, LLP. His early career work with Project Hospitality reflected his deep community roots, helping some of Staten Island&apos;s most vulnerable residents.</p>
                <p className="text-lg leading-relaxed">A respected leader in the legal community, Pete has served four 3-year terms as Director of the Richmond County Bar Association, Director of the Staten Island Women's Bar Association, and is a New York State Certified Real Estate Instructor. He is also a founding board member of New World Preparatory Charter School and a former Volunteer Arbitrator for the Richmond County Civil Court.</p>
                <p className="text-lg leading-relaxed">When not advising clients on closings, contracts, or title matters, Pete can often be found running—he&apos;s proudly completed every New York City Marathon since 2000. A lifelong Staten Islander, he enjoys motorcycling, vegetarian living, and spending time with his wife, Darlene, and their four children.</p>
                <p className="text-lg leading-relaxed">If you&apos;re looking for a real estate lawyer you can trust for your next home purchase, sale, or closing, contact Pete Weinman, Esq. for experienced legal guidance focused on protecting your property and your peace of mind.</p>
              </div>
            </div>
            <div className="relative lg:col-span-1">
              <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-2xl"></div>
              <Image
                    src={PROFESSIONAL_IMAGES[0]}
                    alt="Pete Weinman in his office"
                    width={300}
                    height={200}
                    className="rounded-2xl shadow-2xl border-4 border-amber-500/30 relative z-10 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              The Weinman Law Offices Promise
            </h2>
            <p className="text-xl text-slate-200 w-full mx-auto px-4">Experience, expertise, and exceptional service define how Pete Works</p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Prompt Service */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Prompt Service</h3>
              <p className="text-slate-200 text-center">Your calls get forwarded directly to Pete. Prompt responses to every phone call, email, and text. No days of waiting. That&apos;s our standard.

                </p>
            </div>

            {/* Deep Experience */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">🏆</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Deep Experience</h3>
              <p className="text-slate-200 text-center">Over 25 years and thousands of transactions. Pete has handled every scenario, from straightforward residential sales to complex commercial matters.

                </p>
            </div>

            {/* Transparency */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Transparency</h3>
              <p className="text-slate-200 text-center">
                Clear fees. Clear communication. Honest counsel. Free initial consultation. You know what you&apos;re getting and what it costs before moving forward.
              </p>
            </div>

            {/* Professional Excellence */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">📋</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Professional Excellence</h3>
              <p className="text-slate-200 text-center">Meticulous attention to detail on every transaction. Thorough legal work. Licensed in NY & NJ. Pete does things right, every time.

                </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
                  href="/reviews"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Read Client Reviews →
            </a>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Conveniently Located. Widely Serving.
            </h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Based in Staten Island with clients throughout New York and New Jersey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Service Area Info */}
            <div className="space-y-8">
              <div className="bg-slate-800/50 rounded-xl p-8 shadow-md border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Office Location</h3>
                <p className="text-lg text-slate-200 font-semibold mb-2 text-center">
                  <a href="https://maps.google.com/?q=260+Christopher+Lane,+Staten+Island,+NY+10314" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 hover:underline transition-colors">
                    260 Christopher Lane
                  </a>
                </p>
                <p className="text-slate-200 mb-4 text-center">
                  <a href="https://maps.google.com/?q=260+Christopher+Lane,+Staten+Island,+NY+10314" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 hover:underline transition-colors">
                    Staten Island, New York 10314
                  </a>
                </p>
                <p className="text-sm text-slate-200 text-center">
                  <strong>Directly behind Esplanade Luxury Senior Residences</strong> (formerly Staten Island Hotel & Holiday Inn)
                </p>
                <p className="text-sm text-slate-200 text-center">
                  Across from Stop & Shop and Buffalo Wild Wings
                </p>
                <p className="text-lg text-slate-200 font-semibold mb-2 mt-6 text-center">
                  <a href="https://maps.google.com/?q=25+Hyatt+Street,+Staten+Island,+NY+10301" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 hover:underline transition-colors">
                    25 Hyatt Street, Staten Island, NY 10301
                  </a>
                </p>
                <p className="text-sm text-slate-200 text-center">
                  (Satellite office, by appointment only)
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 shadow-md border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Where We Practice</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-white mb-2 text-center">New York</p>
                    <p className="text-slate-200 text-center">
                      Staten Island, Brooklyn, and throughout New York City. Residential and commercial real estate transactions statewide.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2 text-center">New Jersey</p>
                    <p className="text-slate-200 text-center">
                      All of New Jersey for real estate transactions. Hudson County, Bergen County, Essex County, and beyond. Licensed in both states.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 shadow-md border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Office Hours</h3>
                <div className="space-y-4 text-slate-200">
                  <p className="text-center"><span className="font-semibold">Monday - Friday:</span> 8:00 AM - 5:00 PM ET</p>
                  <p className="text-center"><span className="font-semibold">Weekends & Holidays:</span> By appointment only</p>
                  <div className="pt-4 space-y-2 text-sm text-slate-200">
                    <p className="text-center">Walk-ins are welcome, but please call first to ensure Pete is available:</p>
                    <div className="space-y-1 text-center">
                      <p>
                        <a href={`tel:${PROFESSIONAL_PHONE}`} className="text-amber-400 hover:text-amber-300 font-semibold">
                          📞 Call: {formatPhoneNumber(PROFESSIONAL_PHONE)}
                        </a>
                      </p>
                      <p>
                        <a href={`sms:${PROFESSIONAL_PHONE_ALT}`} className="text-amber-400 hover:text-amber-300 font-semibold">
                          💬 Text: {formatPhoneNumber(PROFESSIONAL_PHONE_ALT)}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/20 border-2 border-amber-400/40 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-3 text-center">Cross-State Experience</h3>
                <p className="text-slate-200 text-center">Licensed in both New York and New Jersey. Perfect if you&apos;re selling in one state and buying in another (typically selling in Staten Island and buying in New Jersey).  Pete seamlessly coordinates both transactions.

                  </p>
              </div>
            </div>

            {/* Schedule Consultation */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400/30 overflow-hidden">
              <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white p-8 text-center">
                <h3 className="text-3xl font-bold mb-2">Schedule Your Free Consultation</h3>
                <p className="text-slate-200 text-lg">Select a date and time that work best for you</p>
              </div>
              <iframe
                    src="https://app.getbreezy.app/schedule/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/6a6f38d9e7643ca6d992a1e26156500fd8da272c07504ab79721a974d05d"
                    className="w-full"
                    style={{ minHeight: '600px', border: 'none' }}
                    title="Schedule Consultation"
                    allow="camera; microphone" />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Photo Gallery
          </h2>
          <PhotoCarousel images={PROFESSIONAL_IMAGES} captions={PHOTO_CAPTIONS} />
        </div>
      </section>

    </div>
    </>
    </DesktopMarginWrapper>);

}