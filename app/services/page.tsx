'use client';

import React from 'react';
import { MapPin, MapPinned } from 'lucide-react';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { PROFESSIONAL_PHONE, PROFESSIONAL_PHONE_ALT } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';
import { generateServiceSchema } from '../utils/seoHelpers';

export default function Services() {
  const serviceAreas = [
  {
    region: "New York",
    icon: MapPin,
    neighborhoods: [
    "Staten Island",
    "Brooklyn",
    "Manhattan",
    "Queens",
    "Bronx",
    "Westchester County"]

  },
  {
    region: "New Jersey",
    icon: MapPinned,
    neighborhoods: [
    "Jersey City",
    "Newark",
    "Trenton",
    "North Jersey",
    "Central Jersey",
    "South Jersey"]

  }];


  const servicesSchema = [
    generateServiceSchema(
      'Residential Real Estate',
      'Complete buyer and seller representation including title examination, contract negotiation, financing coordination, and comprehensive closing service.',
      'https://www.statenislandlaw.com/services'
    ),
    generateServiceSchema(
      'Commercial Real Estate',
      'Sophisticated handling of commercial transactions for investors, business owners, and corporate entities including investment property sales and commercial leases.',
      'https://www.statenislandlaw.com/services'
    ),
  ];

  return (
    <DesktopMarginWrapper>
    <>
      <GoogleAnalytics measurementId="G-C9WLVZKQW4" />
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={[{ name: 'Services', url: '/services' }]} />
      </div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mx-auto">
            {/* Badge */}
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-block">
                <span className="text-amber-300 text-sm font-semibold tracking-wide">SERVICES AND COVERAGE AREAS</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Real Estate Legal Services in NY & NJ
            </h1>
            <p className="text-xl text-slate-200 w-full mx-auto px-4">
              Comprehensive legal services for buyers, sellers, and investors across New York and New Jersey
            </p>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-transparent to-slate-900/50"></div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-24">
            {/* Residential Services */}
            <div>
              <div className="mb-8 text-center lg:text-left">
                <div className="text-5xl mb-4">🏠</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Residential Real Estate</h2>
                <p className="text-lg text-slate-200 mb-6">
                  Whether you&apos;re buying your first home, selling a property, or managing a residential investment, Pete provides comprehensive legal representation.
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-800/50 rounded-xl p-8 border-2 border-slate-700 shadow-2xl hover:shadow-amber-500/10 transition-all">
                  <h3 className="text-xl font-bold text-white mb-4">Residential Purchase</h3>
                  <p className="text-slate-200 mb-5 leading-relaxed">
                    Complete buyer representation including title examination, contract negotiation, financing coordination, and comprehensive closing service.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>✓ Title searches and examination</li>
                    <li>✓ Contract negotiation and review</li>
                    <li>✓ Mortgage coordination</li>
                    <li>✓ Closing representation</li>
                  </ul>
                  <div className="mt-6 text-center">
                    <a
                      href="https://sites.google.com/statenislandlaw.com/buyer-seller-resources/home-buyer-resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      📥 Free Buyer Resources →
                    </a>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-8 border-2 border-slate-700 shadow-2xl hover:shadow-amber-500/10 transition-all">
                  <h3 className="text-xl font-bold text-white mb-4">Residential Sale</h3>
                  <p className="text-slate-200 mb-5 leading-relaxed">
                    Complete seller representation including deed preparation, title review and clearance, disclosure compliance, and closing coordination.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>✓ Deed preparation</li>
                    <li>✓ Title review and clearance</li>
                    <li>✓ Disclosure compliance</li>
                    <li>✓ Closing coordination</li>
                  </ul>
                  <div className="mt-6 text-center">
                    <a
                      href="https://sites.google.com/statenislandlaw.com/buyer-seller-resources/home-seller-resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                      📤 Free Seller Resources →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Services */}
            <div>
              <div className="mb-8 text-center lg:text-left">
                <div className="text-5xl mb-4">🏢</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Commercial Real Estate</h2>
                <p className="text-lg text-slate-200 mb-6">
                  Sophisticated handling of commercial transactions for investors, business owners, and corporate entities across New York and New Jersey.
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-800/50 rounded-xl p-8 border-2 border-slate-700 shadow-2xl hover:shadow-amber-500/10 transition-all">
                  <h3 className="text-xl font-bold text-white mb-4">Investment Property Sales</h3>
                  <p className="text-slate-200 mb-5 leading-relaxed">
                    Comprehensive legal representation for investment property transactions including due diligence, contract negotiation, and closing coordination.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>✓ Investment analysis support</li>
                    <li>✓ Contract drafting and negotiation</li>
                    <li>✓ Due diligence coordination</li>
                    <li>✓ Closing representation</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-8 border-2 border-slate-700 shadow-2xl hover:shadow-amber-500/10 transition-all">
                  <h3 className="text-xl font-bold text-white mb-4">Commercial Leases & Agreements</h3>
                  <p className="text-slate-200 mb-5 leading-relaxed">
                    Negotiation and review of commercial lease agreements and other business real estate contracts. Landlords and Tenants.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>✓ Lease negotiation</li>
                    <li>✓ Lease review and analysis</li>
                    <li>✓ Agreement drafting</li>
                    <li>✓ Dispute resolution support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Specialized Services */}
          <div className="mt-24">
            <div className="text-center mb-16 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Additional Legal Services</h2>
              <p className="text-xl text-slate-200 w-full mx-auto px-4">Beyond standard transactions, Pete brings years of experience to complex real estate matters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              <div className="bg-slate-800/50 rounded-xl p-10 shadow-2xl hover:shadow-amber-500/20 transition-all border-2 border-slate-700 hover:border-amber-400">
                <div className="text-4xl mb-6 text-center">🏗️</div>
                <h3 className="text-2xl font-bold text-white mb-5 text-center">Condos & Cooperatives</h3>
                <p className="text-slate-200 mb-6 text-center leading-relaxed">
                  Specialized expertise in condo and co-op transactions with unique legal considerations and board approval processes.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li>✓ Board application process</li>
                  <li>✓ Proprietary lease review</li>
                  <li>✓ Assessment and HOA matters</li>
                  <li>✓ Financing considerations</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-10 shadow-2xl hover:shadow-amber-500/20 transition-all border-2 border-slate-700 hover:border-amber-400">
                <div className="text-4xl mb-6 text-center">📋</div>
                <h3 className="text-2xl font-bold text-white mb-5 text-center">Trusts & Guardianship</h3>
                <p className="text-slate-200 mb-6 text-center leading-relaxed">Experience with trusts, guardianship matters, and probate issues involving real property. Pete is an Article 81 court-appointed guardian in New York.

                  </p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li>✓ Guardianship coordination</li>
                  <li>✓ Trust property transfers</li>
                  <li>✓ Probate assistance</li>
                  <li>✓ Estate real property issues</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-10 shadow-2xl hover:shadow-amber-500/20 transition-all border-2 border-slate-700 hover:border-amber-400">
                <div className="text-4xl mb-6 text-center">💰</div>
                <h3 className="text-2xl font-bold text-white mb-5 text-center">Refinances & Loan Modifications</h3>
                <p className="text-slate-200 mb-6 text-center leading-relaxed">
                  Refinancing and loan modification services with title work, lender coordination, and closing representation.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li>✓ Refinance closing service</li>
                  <li>✓ Loan modification</li>
                  <li>✓ Short sale assistance</li>
                  <li>✓ Lender coordination</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-10 shadow-2xl hover:shadow-amber-500/20 transition-all border-2 border-slate-700 hover:border-amber-400">
                <div className="text-4xl mb-6 text-center">🌟</div>
                <h3 className="text-2xl font-bold text-white mb-5 text-center">First-Time Homebuyers</h3>
                <p className="text-slate-200 mb-6 text-center leading-relaxed">
                  Tailored guidance for first-time buyers. We demystify the process and explain every step clearly.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li>✓ Process explanation</li>
                  <li>✓ Document clarification</li>
                  <li>✓ Timeline management</li>
                  <li>✓ Question support</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-10 shadow-2xl hover:shadow-amber-500/20 transition-all border-2 border-slate-700 hover:border-amber-400">
                <div className="text-4xl mb-6 text-center">💻</div>
                <h3 className="text-2xl font-bold text-white mb-5 text-center">Virtual Consultations & E-Signing</h3>
                <p className="text-slate-200 mb-6 text-center leading-relaxed">
                  Remote consultation and document signing options for clients who prefer or require flexible meeting arrangements.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li>✓ Google Meet consultations</li>
                  <li>✓ Phone consultations</li>
                  <li>✓ E-signing capabilities</li>
                  <li>✓ Flexible scheduling</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-10 shadow-2xl hover:shadow-amber-500/20 transition-all border-2 border-slate-700 hover:border-amber-400">
                <div className="text-4xl mb-6 text-center">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-5 text-center">Cross-State Transactions</h3>
                <p className="text-slate-200 mb-6 text-center leading-relaxed">
                  Licensed in both New York and New Jersey. Seamlessly coordinate transactions involving both states.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  <li>✓ NY to NJ coordination</li>
                  <li>✓ Dual-state expertise</li>
                  <li>✓ Unified representation</li>
                  <li>✓ Streamlined process</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
                href="/about"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Learn More About Pete →
            </a>
          </div>
        </div>
      </section>

      {/* Geographic Coverage Areas */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Geographic Coverage Areas
            </h2>
            <p className="text-xl text-slate-200">
              Serving clients across New York and New Jersey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {serviceAreas.map((area) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={area.region}
                    className="bg-slate-800/50 rounded-xl shadow-md p-8 border-2 border-slate-700">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-amber-500 p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{area.region}</h3>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-4 text-center">
                      Primary Coverage Areas
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {area.neighborhoods.map((neighborhood) =>
                        <span
                          key={neighborhood}
                          className="inline-block bg-amber-500/10 text-slate-200 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/20">
                          {neighborhood}
                        </span>
                        )}
                    </div>
                  </div>
                </div>);

              })}
          </div>

          {/* Base Location Info */}
          <div className="bg-slate-800/50 rounded-xl p-8 border-2 border-amber-400/30 text-center shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-500 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Centrally Located Office
              </h3>
              <p className="text-slate-200 mb-2">
                <strong>
                  <a href="https://maps.google.com/?q=260+Christopher+Lane,+Staten+Island,+NY+10314" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                    260 Christopher Lane, Suite 201, Staten Island, NY 10314
                  </a>
                </strong>
              </p>
              <p className="text-slate-200 text-sm mb-3">
                Located directly behind the Esplanade Luxury Senior Residences (formerly the Staten Island Hotel), across from Stop & Shop and Buffalo Wild Wings.
              </p>
              <p className="text-slate-200 font-medium">
                <strong>Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM ET | Weekends & Holidays by Appointment
              </p>
              <p className="text-lg text-slate-200 font-semibold mb-2 mt-6">
                <a href="https://maps.google.com/?q=25+Hyatt+Street,+Staten+Island,+NY+10301" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  25 Hyatt Street, Staten Island, NY 10301
                </a>
              </p>
              <p className="text-sm text-slate-200">
                (Satellite office, by appointment only)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose Weinman Law Offices?
            </h2>
            <p className="text-xl text-slate-200 w-full mx-auto px-4">
              When you work with Pete, you get experience and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">24+ Years of Experience</h3>
              <p className="text-slate-200 text-center">
                Since 2001, representing thousands of buyers and sellers in real estate transactions.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Prompt Responses</h3>
              <p className="text-slate-200 text-center">Calls get forwarded directly to Pete. Prompt responses to all communications, every time.

                </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Licensed in Both States</h3>
              <p className="text-slate-200 text-center">
                Dual licensure in New York and New Jersey for seamless cross-state transactions.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Free Consultation</h3>
              <p className="text-slate-200 text-center">
                No upfront fees. Discuss your needs and get a transparent estimate before committing.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Virtual Options</h3>
              <p className="text-slate-200 text-center">
                Google Meet consultations, phone meetings, and e-signing available for convenience.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Transparent Pricing</h3>
              <p className="text-slate-200 text-center">
                Clear fees. No hidden costs. You know exactly what to expect from the start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-200 mb-8">Schedule your free consultation with Pete Weinman today. He&apos;ll discuss your real estate needs and provide a transparent estimate.

                </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                    href={`tel:${PROFESSIONAL_PHONE}`}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center">
                  📞 Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
                </a>
                <a
                    href={`sms:${PROFESSIONAL_PHONE_ALT}`}
                    className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center">
                  💬 Text {formatPhoneNumber(PROFESSIONAL_PHONE_ALT)}
                </a>
              </div>
              <p className="text-slate-300 text-sm mt-8">
                Monday - Friday: 8AM - 5PM ET • Walk-ins Welcome (Please Call First)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white p-6 text-center">
                <h3 className="text-2xl font-bold">Schedule Your Free Consultation</h3>
                <p className="text-slate-200 text-sm mt-2">Select a date and time that work best for you</p>
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

      {/* Structured Data for Services */}
      <StructuredData data={servicesSchema} />
    </div>
    </>
    </DesktopMarginWrapper>);

}