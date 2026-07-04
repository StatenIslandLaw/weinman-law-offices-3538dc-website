import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import DesktopMarginWrapper from './components/DesktopMarginWrapper';
import StructuredData from './components/StructuredData';
import GoogleAnalytics from './components/GoogleAnalytics';
import ConsultationForm from './components/ConsultationForm';
import { PROFESSIONAL_PHONE, PROFESSIONAL_PHONE_ALT } from '../professionalConstants';
import { formatPhoneNumber } from './utils/phoneUtils';
import { getAllPosts } from './data/blogPosts';
import {
  generateLocalBusinessSchema,
  generateAttorneySchema,
  generateAllServiceSchemas,
  generateWebSiteSchema,
  generateHomepageLegalServiceSchema } from
'./utils/structuredData';

export const metadata: Metadata = {
  title: "Staten Island Real Estate Lawyer for Home Buyers & Sellers | Pete Weinman, Esq.",
  description: "Residential real estate closings in Staten Island and across NY & NJ. A quarter century representing home buyers and sellers. Free consultation. Call (718) 442-2010.",
  keywords: [
  "Staten Island real estate lawyer",
  "NY real estate attorney",
  "NJ real estate lawyer",
  "real estate closing attorney",
  "Pete Weinman",
  "residential real estate lawyer",
  "commercial real estate attorney",
  "property lawyer Staten Island",
  "real estate transaction attorney"],

  openGraph: {
    title: "Staten Island Real Estate Lawyer for Home Buyers & Sellers | Pete Weinman, Esq.",
    description: "Residential real estate closings in Staten Island and across NY & NJ. A quarter century representing home buyers and sellers. Free consultation.",
    url: "https://www.statenislandlaw.com",
    type: "website",
    siteName: "Pete Weinman, Esq.",
    images: [
    {
      url: "https://www.statenislandlaw.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Pete Weinman - Staten Island Real Estate Attorney for Home Buyers and Sellers"
    }]

  },
  twitter: {
    card: "summary_large_image",
    title: "Staten Island Real Estate Lawyer for Home Buyers & Sellers",
    description: "Residential real estate closings in Staten Island and across NY & NJ. A quarter century representing home buyers and sellers. Free consultation."
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com"
  }
};

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <DesktopMarginWrapper>
    <>
      <GoogleAnalytics measurementId="G-C9WLVZKQW4" />
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="w-full mx-auto">
            {/* Quarter Century Badge */}
            <div className="mb-8 flex justify-center">
              <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-flex items-center justify-center text-center">
                <span className="text-amber-300 text-sm font-semibold tracking-wide text-center">A QUARTER CENTURY OF LEGAL EXCELLENCE</span>
              </div>
            </div>

            {/* Main Content with Grid Layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Profile Photo */}
              <div className="flex flex-col items-center order-first lg:order-first lg:col-span-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-xl"></div>
                  <Image
                        src="https://breezy-sites.s3.amazonaws.com/site_images/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/0552d3074780f0802def15f029c6e855438464d908a52b154903abe398c8.jpg"
                        alt="Pete Weinman, Staten Island Real Estate Attorney"
                        width={300}
                        height={300}
                        priority
                        className="relative rounded-xl shadow-2xl border-4 border-amber-500/30 w-full max-w-[280px] h-auto object-cover" />

                </div>
                <p className="text-amber-300 font-semibold mt-4 text-center text-lg">Pete Weinman, Esq.</p>
                <p className="text-slate-300 text-sm text-center">Staten Island's Real Estate Attorney</p>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center lg:col-span-2 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white">
                  Your Trusted Real Estate Legal Partner in New York & New Jersey
                </h1>

                <h2 className="text-xl sm:text-2xl font-semibold text-amber-300 mb-6">
                  Focused on residential real estate closings for Staten Island home buyers and home sellers.
                </h2>

                <p className="text-lg sm:text-xl text-slate-200 mb-6 leading-relaxed">
                  Pete Weinman provides professional and competent legal representation in residential and commercial real estate transactions across Staten Island, New York, and New Jersey. With a quarter century of experience, Pete delivers prompt, courteous, and expert guidance you can rely on.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 w-full px-2">
                  <a
                        href={`tel:${PROFESSIONAL_PHONE}`}
                        aria-label={`Call Pete Weinman at ${formatPhoneNumber(PROFESSIONAL_PHONE)}`}
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full font-semibold transition-all duration-300 text-center border-2 border-amber-400/40 text-sm sm:text-base whitespace-normal break-words">
                    📞 Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
                  </a>
                  <a
                        href="#schedule-consultation"
                        aria-label="Schedule a free consultation with Pete Weinman"
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full font-semibold transition-all duration-300 text-center border-2 border-amber-400/40 text-sm sm:text-base whitespace-normal break-words">
                    Schedule Free Consultation
                  </a>
                </div>

                <p className="text-slate-300 text-sm">
                  Licensed in NY & NJ • Virtual Consultations Available • Free Initial Consultation
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-transparent to-slate-50"></div>
      </section>

      {/* For Home Buyers and Sellers Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* For Home Buyers */}
            <div className="bg-slate-800/50 rounded-2xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-5xl">🏡</div>
                <h2 className="text-3xl font-bold text-white">For Home Buyers</h2>
              </div>

              <p className="text-lg text-slate-200 mb-6 leading-relaxed">
                Buying a home is one of the biggest financial decisions you will ever make. As your real estate lawyer, I guide you from accepted offer to closing, reviewing and negotiating your contract, coordinating with your lender and title company, and making sure you understand every document you sign so there are no surprises on closing day.
              </p>

              <ul className="space-y-3 text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Review and negotiation of your purchase contract</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Coordination with your real estate agent, lender, and title company</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Explanation of your rights, obligations, and key contract deadlines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Identification and management of issues found during inspection or title review</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Representation at closing to help ensure the deal closes smoothly</span>
                </li>
              </ul>

              <div className="mt-8">
                <a
                      href="https://sites.google.com/statenislandlaw.com/buyer-seller-resources/home-buyer-resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                  📥 Free Buyer Resources →
                </a>
              </div>
            </div>

            {/* For Home Sellers */}
            <div className="bg-slate-800/50 rounded-2xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-5xl">🔑</div>
                <h2 className="text-3xl font-bold text-white">For Home Sellers</h2>
              </div>

              <p className="text-lg text-slate-200 mb-6 leading-relaxed">
                As a home seller, you need a lawyer who will protect your interests from contract through closing. I help you understand your obligations, negotiate contract terms, respond to buyer requests, and work to keep your sale on track so you can move on to your next chapter with confidence.
              </p>

              <ul className="space-y-3 text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Drafting and negotiation of your sale contract</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Guidance on your legal obligations and required disclosures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Handling issues that arise from inspections or buyer demands</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Coordination with the buyer's attorney, broker, and title company</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-xl mt-0.5">✓</span>
                  <span>Representation at closing to help ensure the transaction is completed properly</span>
                </li>
              </ul>

              <div className="mt-8">
                <a
                      href="https://sites.google.com/statenislandlaw.com/buyer-seller-resources/home-seller-resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                  📤 Free Seller Resources →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose Pete Weinman?
            </h2>
            <p className="text-xl text-slate-200 w-full mx-auto px-4">
              Prompt, courteous responses. Expert guidance. Results you can count on.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">25+ Years Experience</h3>
              <p className="text-slate-200 text-center">Since 2001, Pete has represented hundreds of buyers and sellers across New York and New Jersey.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Prompt Responses</h3>
              <p className="text-slate-200 text-center">Your calls are forwarded directly to Pete, who responds to all communications promptly—no waiting days for callbacks.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Dual State Licensing</h3>
              <p className="text-slate-200 text-center">Licensed in both New York and New Jersey for seamless cross-state transactions.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Virtual Services</h3>
              <p className="text-slate-200 text-center">Complete consultations via Google Meet or phone. E-sign documents from home when needed.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Free Consultation</h3>
              <p className="text-slate-200 text-center">No upfront fees. Discuss your needs and get a transparent estimate before committing.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-slate-700">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-amber-500 text-white font-bold text-2xl mb-6 mx-auto">✓</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Clear Communication</h3>
              <p className="text-slate-200 text-center">Pete speaks American English and is fluent in most NYC dialects, including Brooklyn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Comprehensive Legal Services
            </h2>
            <p className="text-xl text-slate-200 w-full mx-auto px-4">Experienced representation for all your real estate legal needs

                </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Purchase */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-slate-700 hover:border-amber-400">
              <div className="text-5xl mb-4 text-center">🏠</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Residential Purchase</h3>
              <p className="text-slate-200 mb-4 text-center">Complete representation for homebuyers from contract to title examination to closing.

                </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>✓ Title searches & examination</li>
                <li>✓ Contract negotiation</li>
                <li>✓ Financing coordination</li>
                <li>✓ Comprehensive closing</li>
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

            {/* Residential Sales */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-slate-700 hover:border-amber-400">
              <div className="text-5xl mb-4 text-center">🔑</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Residential Sales</h3>
              <p className="text-slate-200 mb-4 text-center">
                Expert representation for property sellers ensuring smooth transactions.
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>✓ Deed preparation</li>
                <li>✓ Title review & clearance</li>
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

            {/* Commercial Real Estate */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-slate-700 hover:border-amber-400">
              <div className="text-5xl mb-4 text-center">🏢</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Commercial Real Estate</h3>
              <p className="text-slate-200 mb-4 text-center">
                Sophisticated handling of commercial transactions and leases.
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>✓ Investment properties</li>
                <li>✓ Commercial leases</li>
                <li>✓ Due diligence review</li>
                <li>✓ Custom solutions</li>
              </ul>
            </div>

            {/* Condos & Co-ops */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-slate-700 hover:border-amber-400">
              <div className="text-5xl mb-4 text-center">🏗️</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Condos & Cooperatives</h3>
              <p className="text-slate-200 mb-4 text-center">Specialized experience with condo and co-op transactions.

                </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>✓ Board approval process</li>
                <li>✓ Proprietary lease review</li>
                <li>✓ Assessment & HOA matters</li>
                <li>✓ Financing considerations</li>
              </ul>
            </div>

            {/* Trusts & Estates */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-slate-700 hover:border-amber-400">
              <div className="text-5xl mb-4 text-center">📋</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Trusts & Guardianship</h3>
              <p className="text-slate-200 mb-4 text-center">Court-appointed guardian with specialized estate experience.

                </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>✓ Guardianship coordination</li>
                <li>✓ Trust property transfers</li>
                <li>✓ Probate assistance</li>
                <li>✓ Estate property issues</li>
              </ul>
            </div>

            {/* Refinances & Loans */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-slate-700 hover:border-amber-400">
              <div className="text-5xl mb-4 text-center">💰</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Refinances & Loans</h3>
              <p className="text-slate-200 mb-4 text-center">
                Complete refinancing and loan modification services.
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>✓ Refinance closing</li>
                <li>✓ Loan modification</li>
                <li>✓ Short sale assistance</li>
                <li>✓ Lender coordination</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
                  href="/services"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Services →
            </a>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What to Expect When You Work With Pete
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all text-center">
              <div className="text-6xl font-bold text-amber-400 mb-4">1</div>
              <h3 className="text-2xl font-bold text-white mb-4">Free Consultation</h3>
              <p className="text-slate-200 leading-relaxed">
                We begin with a free consultation to understand your purchase or sale, your goals, and any deadlines you are facing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all text-center">
              <div className="text-6xl font-bold text-amber-400 mb-4">2</div>
              <h3 className="text-2xl font-bold text-white mb-4">Contract Review and Guidance</h3>
              <p className="text-slate-200 leading-relaxed">
                I review and negotiate your contract, explain your rights and obligations in plain language, and coordinate with your agent, lender, and other professionals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all text-center">
              <div className="text-6xl font-bold text-amber-400 mb-4">3</div>
              <h3 className="text-2xl font-bold text-white mb-4">Smooth Closing</h3>
              <p className="text-slate-200 leading-relaxed">
                I work to identify and address issues before they become problems, help keep your deal on track, and represent you at closing so you can move forward with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Request Your Free Real Estate Consultation
            </h2>
            <p className="text-xl text-slate-200">
              Tell us a little about your situation and we will contact you promptly to discuss your purchase or sale.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-8 shadow-xl border-2 border-slate-700">
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What Clients Say About Their Closings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 - Home Buyer */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all">
              <div className="text-amber-400 text-4xl mb-4">"</div>
              <p className="text-slate-200 mb-6 italic leading-relaxed">
                As first-time home buyers, we were nervous about the process. Pete carefully explained every step, reviewed our contract, and caught several issues we would have missed. Our closing went smoothly and on time.
              </p>
              <div className="border-t-2 border-slate-700 pt-4">
                <p className="font-bold text-white">Maria S.</p>
                <p className="text-sm text-amber-400 font-semibold">Home Buyer</p>
              </div>
            </div>

            {/* Testimonial 2 - Home Seller */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all">
              <div className="text-amber-400 text-4xl mb-4">"</div>
              <p className="text-slate-200 mb-6 italic leading-relaxed">
                Pete handled the sale of our Staten Island home from contract to closing. He kept us informed, negotiated fair terms, and resolved inspection issues quickly. We felt protected at every stage.
              </p>
              <div className="border-t-2 border-slate-700 pt-4">
                <p className="font-bold text-white">John D.</p>
                <p className="text-sm text-amber-400 font-semibold">Home Seller</p>
              </div>
            </div>

            {/* Testimonial 3 - Repeat Client */}
            <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all">
              <div className="text-amber-400 text-4xl mb-4">"</div>
              <p className="text-slate-200 mb-6 italic leading-relaxed">
                We've used Pete for multiple real estate transactions in New York and New Jersey. He is responsive, thorough, and practical. We would not do a closing without him.
              </p>
              <div className="border-t-2 border-slate-700 pt-4">
                <p className="font-bold text-white">Karen L.</p>
                <p className="text-sm text-amber-400 font-semibold">Buyer and Seller</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
                  href="/reviews"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Read More Client Reviews →
            </a>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Latest from the Blog
            </h2>
            <p className="text-xl text-slate-200">
              Expert insights on Staten Island real estate law
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-slate-800/50 rounded-xl p-6 shadow-lg border-2 border-slate-700 hover:border-amber-400 transition-all group">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Visit the Blog →
            </Link>
          </div>
        </div>
      </section>

      {/* Schedule Consultation Section */}
      <section id="schedule-consultation" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400/30 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white p-8 text-center">
              <h3 className="text-3xl font-bold mb-2">Schedule Your Free Consultation</h3>
              <p className="text-slate-200 text-lg">Select a date and time that works best for you</p>
            </div>
            <iframe
                  src="https://app.getbreezy.app/schedule/3538dc64da8e6f3cab2a245299e0e3dd6655ba6606b507776332400b7f39/6a6f38d9e7643ca6d992a1e26156500fd8da272c07504ab79721a974d05d"
                  className="w-full"
                  style={{ minHeight: '600px', border: 'none' }}
                  title="Schedule a free consultation with Pete Weinman - Select date and time"
                  aria-label="Scheduling widget for booking a consultation"
                  allow="camera; microphone"
                  loading="lazy" />

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-6 inline-block px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full">
            <span className="text-amber-300 text-sm font-semibold tracking-wide">TRUSTED BY STATEN ISLAND FAMILIES FOR 25 YEARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Contact Pete Weinman today for your free consultation. Experience the difference of working with a dedicated real estate attorney.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
                  href={`tel:${PROFESSIONAL_PHONE}`}
                  aria-label={`Call Pete Weinman at ${formatPhoneNumber(PROFESSIONAL_PHONE)}`}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              📞 Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
            </a>
            <a
                  href={`sms:${PROFESSIONAL_PHONE_ALT}`}
                  aria-label={`Text Pete Weinman at ${formatPhoneNumber(PROFESSIONAL_PHONE_ALT)}`}
                  className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              💬 Text {formatPhoneNumber(PROFESSIONAL_PHONE_ALT)}
            </a>
          </div>
          <p className="text-slate-300 text-sm mt-8">
            Monday - Friday: 8AM - 5PM ET • Walk-ins Welcome (Please Call First)
          </p>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <StructuredData data={[
          generateWebSiteSchema(),
          generateHomepageLegalServiceSchema(),
          generateLocalBusinessSchema(),
          generateAttorneySchema(),
          ...generateAllServiceSchemas()]
          } />
    </div>
    </>
    </DesktopMarginWrapper>);

}