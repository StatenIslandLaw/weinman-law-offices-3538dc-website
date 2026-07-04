'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import { PROFESSIONAL_NAME, PROFESSIONAL_PHONE } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';
import StructuredData from '../components/StructuredData';
import { generateAggregateRatingSchema } from '../utils/seoHelpers';


interface Review {
  author: string;
  title: string;
  content: string;
  rating: number;
  serviceType: string;
  date?: string;
}

const reviews: Review[] = [
// Avvo Reviews
{
  author: "Michael R. - Avvo",
  title: "Extremely Knowledgeable and Efficient",
  content: "Peter is extremely knowledgeable and efficient. He made my closing seamless. He is very thorough and very responsive with communications.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Sarah B. - Avvo",
  title: "One of the Best at What He Does",
  content: "Peter is one of the best at what he does. I hired him to handle my real estate sale transaction and I was extremely happy with his representation. He is very personable, knowledgable and most of all, very responsive.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Jennifer M. - Avvo",
  title: "Best Real Estate Attorney in NYC",
  content: "Peter Weinman is the best real estate attorney in New York city. He explains so well and follows up. He never missed a beat and sometimes called me before I had the chance to follow up with him!",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "David L. - Avvo",
  title: "Excellent Job on Sale and Purchase",
  content: "I hired Peter J Weinman for both the sale of my home in Staten Island and the purchase of my new home in Westchester. He did an excellent job! He was extremely knowledgeable and always on top of things, quick to respond and gave great advice.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Robert T. - Avvo",
  title: "Expert, Straight Shooter, Prompt",
  content: "Peter is an expert in the field, a straight shooter, prompt to return all calls and inquiries, and always about your best interest. He made the entire closing process seamless and was always available for any questions.",
  rating: 5,
  serviceType: "Avvo Review"
},
// Google & Other Platform Reviews
{
  author: "Ali E. - Google",
  title: "Incredibly Responsive and Thorough",
  content: "You email anytime, chances are you'll hear back in a few hours, if not minutes. Very thorough and patient with all my detailed questions. I respect Pete's knowledge, personable manner and his professionalism in always responding to any questions or concerns.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Glenn - Google",
  title: "Honest and Professional",
  content: "Peter was very quick and responsive anytime I needed him. He was honest and professional throughout the entire process. He even sent us a nice refund check for unused fees, which shows his integrity and honesty.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Alexander L. - Google",
  title: "Saved Us From Major Title Issues",
  content: "As first-time homebuyers, we appreciated Peter's accessibility and attention to detail. He discovered a critical title issue that could have caused major problems. The higher service level was well worth the proportionately elevated fees.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Phyllis & Jennifer - Google",
  title: "Organized, Intelligent, and Thorough",
  content: "Peter was an organized, intelligent, and thorough lawyer who was beyond helpful during our unusual case. He was always available and made us feel comfortable throughout the process. Highly trustworthy and kind.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Max V. - Google",
  title: "Best Real Estate Attorney",
  content: "Peter Weinman is the best real estate attorney I've worked with. His fees are reasonable, his representation is careful and thorough, and he genuinely cares about his clients. A smart lawyer with an eye on details who guided us through our sale and purchase with ease.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Jason C. - Avvo",
  title: "Not Just Another Suit Cashing Your Check",
  content: "Peter is truly exceptional. He's not just another attorney collecting fees - he genuinely cares about his clients and their outcomes. His dedication to his clients' best interests is truly remarkable and refreshing.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Peter & Grace - Google",
  title: "Always Puts Clients First",
  content: "Peter made us feel comfortable throughout the entire process. He has a unique ability to build trust and always focuses on what's best for his clients. We felt supported every step of the way.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Michael & Renee - Avvo",
  title: "Competent, Honest, and Speedy",
  content: "We were impressed by Peter's competence and honesty throughout our transaction. The process moved quickly and smoothly, and we always felt we were in capable hands. Highly recommend!",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Karen S. - Google",
  title: "Timely Responses and Patience",
  content: "Peter was incredibly patient with all my questions and concerns. His responses were always timely and thorough. He made what could have been a stressful process feel manageable and straightforward.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Raj Rajpal - Avvo",
  title: "Detail-Oriented and Client-Focused",
  content: "Pete is a detail-oriented attorney who is great when customers need someone to hold their hand through the process. His attention to detail ensures nothing falls through the cracks.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "George A. - Google",
  title: "So Good You Can't Help But Become His Friend",
  content: "Peter is so helpful and genuinely caring that you can't help but consider him a friend by the end of your transaction. His warmth and professionalism are unmatched.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Josephine Lee - Avvo",
  title: "Thorough, Professional, and Reliable",
  content: "I have dealt with Peter both personally and professionally. With each and every real estate transaction he has been thorough, professional, and reliable. He's my go-to attorney for all real estate matters.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Darlene J. - Google",
  title: "Patient During Difficult Cases",
  content: "Peter showed incredible patience during my difficult case. He took the time to explain everything clearly and never made me feel rushed or unimportant. His compassion truly made a difference.",
  rating: 5,
  serviceType: "Google Review"
},
{
  author: "Jack Stern, Esq. - Avvo",
  title: "Competent, Ethical, and Pleasant",
  content: "In today's time, it is refreshing to meet someone that is competent, ethical, and pleasant to deal with. Peter exemplifies the best qualities of the legal profession.",
  rating: 5,
  serviceType: "Avvo Review"
},
{
  author: "Theresa A. Rafferty - Google",
  title: "Exacting, Honest, and Ethical",
  content: "Peter is definitely one of the most exacting, honest, and ethical people with whom I have ever worked. His integrity shines through in every interaction and transaction.",
  rating: 5,
  serviceType: "Google Review"
}];


const stats = [
{ label: "Years in Practice", value: "25+", icon: Users },
{ label: "Clients", value: "1,000+", icon: MessageSquare }];


export default function ReviewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const averageRating =
  reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Calculate Avvo-specific ratings for schema
  const avvoReviews = reviews.filter(review => review.serviceType === "Avvo Review");
  const avvoRating = avvoReviews.reduce((sum, review) => sum + review.rating, 0) / avvoReviews.length;
  const avvoCount = avvoReviews.length;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <DesktopMarginWrapper>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full overflow-x-hidden">
      {/* Aggregate Rating Schema for Avvo reviews */}
      <StructuredData data={generateAggregateRatingSchema(avvoRating, avvoCount)} />
        {/* Hero Section - Desktop: Side by Side, Mobile: Stacked */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-24">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
              {/* Badge */}
              <div className="mb-8 flex justify-center">
                <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-block">
                  <span className="text-amber-300 text-sm font-semibold tracking-wide">CLIENT TESTIMONIALS</span>
                </div>
              </div>

              {/* Desktop: Two Column Layout, Mobile: Stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Client Reviews & Testimonials
                  </h1>
                  <p className="text-lg text-slate-200 mb-4 leading-relaxed text-justify">
                    When choosing a real estate attorney for one of life's most important financial transactions, nothing speaks louder than the experiences of past clients. These authentic reviews come directly from homebuyers, sellers, and property owners who have worked with Pete Weinman throughout their real estate journey in New York and New Jersey.
                  </p>
                  <p className="text-base text-slate-300 mb-4 leading-relaxed text-justify">
                    Each testimonial reflects real experiences with our legal services, from initial consultations through final closings. Clients consistently praise Pete's prompt responsiveness, thorough attention to detail, and genuine care for their best interests. Whether handling residential purchases, property sales, co-op and condo transactions, refinancing, or commercial real estate deals, these reviews demonstrate a quarter century of commitment to exceptional legal representation.
                  </p>
                  <p className="text-base text-slate-300 mb-6 leading-relaxed text-justify">
                    Reviews are independently verified and sourced from trusted platforms including Google, Avvo, and Yelp. Read through these testimonials to understand why so many clients return to Pete Weinman for their ongoing real estate legal needs and enthusiastically recommend his services to family and friends.
                  </p>
                  <p className="text-slate-400 text-sm">
                    Reviews are sourced from Google, Avvo, and Yelp
                  </p>
                </div>

                {/* Right Column: Review Cards (scrollable on desktop) */}
                <div className="lg:max-h-[600px] lg:overflow-y-auto lg:pr-4 space-y-4">
                  {reviews.slice(0, 6).map((review, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-amber-500/50 transition-all">
                      {/* Stars */}
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>

                      {/* Title */}
                      <div className="text-lg font-bold text-white mb-2">
                        {review.title}
                      </div>

                      {/* Content */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">
                        &quot;{review.content}&quot;
                      </p>

                      {/* Author and Source */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                        <p className="font-semibold text-white text-sm">
                          {review.author}
                        </p>
                        <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                          {review.serviceType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Reviews Grid - Shows remaining reviews */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              More Client Testimonials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(6).map((review, index) => (
                <div key={index + 6} className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-amber-500/50 transition-all">
                  {/* Stars */}
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {review.title}
                  </h3>

                  {/* Content */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    &quot;{review.content}&quot;
                  </p>

                  {/* Author and Source */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <p className="font-semibold text-white text-sm">
                      {review.author}
                    </p>
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                      {review.serviceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/faqs"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                View Real Estate Attorney FAQs →
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid md:grid-cols-2 gap-8 text-center">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="bg-slate-800/50 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border-2 border-slate-700">
                    <div className="flex justify-center mb-4">
                      <div className="bg-amber-500/20 p-4 rounded-lg">
                        <IconComponent className="h-8 w-8 text-amber-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <p className="text-slate-200 font-medium">{stat.label}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Experience the Difference
              </h2>
              <p className="text-xl text-slate-200 mb-8 w-full mx-auto px-4">
                Join thousands of satisfied clients who have benefited from Pete Weinman&apos;s legal experience and dedication to service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${PROFESSIONAL_PHONE}`}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
                </a>
                <a
                  href="/faqs"
                  className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Consultation */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
                title="Schedule Consultation"
                allow="camera; microphone" />
            </div>
          </div>
        </section>
    </div>
    </DesktopMarginWrapper>);

}