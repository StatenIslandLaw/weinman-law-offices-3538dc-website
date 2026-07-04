// Metadata is defined in metadata.ts to avoid duplication
import React from 'react';
import { MapPin, MapPinned, Building2, Home } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { PROFESSIONAL_NAME, PROFESSIONAL_PHONE, PROFESSIONAL_PHONE_ALT, PROFESSIONAL_EMAIL } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';
export { metadata } from './metadata';

export default function AreasPage() {
  const serviceAreas = [
  {
    region: "New York",
    icon: MapPin,
    services: ["Residential Real Estate", "Commercial Real Estate", "Wills & Trusts", "Litigation"],
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
    services: ["Residential Real Estate", "Commercial Real Estate"],
    neighborhoods: [
    "Jersey City",
    "Newark",
    "Trenton",
    "North Jersey",
    "Central Jersey",
    "South Jersey"]

  }];


  const specializations = [
  {
    title: "Residential Real Estate",
    icon: Home,
    description: "We represent both buyers and sellers in residential transactions, including new construction, resales, and condominiums."
  },
  {
    title: "Commercial Real Estate",
    icon: Building2,
    description: "Our team handles complex commercial transactions, investment properties, and commercial leases across NY and NJ."
  },
  {
    title: "Specialized Services",
    icon: MapPin,
    description: "Beyond real estate, we offer wills, trusts, litigation, and comprehensive legal guidance for property owners."
  }];


  return (
    <DesktopMarginWrapper>
    <>
      <GoogleAnalytics measurementId="G-C9WLVZKQW4" />
    <main className="flex-grow bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full overflow-x-hidden pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-5">
          <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Areas of Practice
              </h1>
              <p className="text-xl text-slate-200 mb-6 w-full">
                Pete Weinman provides comprehensive legal services across New York and New Jersey, with a strong presence in Staten Island and the surrounding areas.
              </p>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="py-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden flex justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {specializations.map((spec) => {
                  const IconComponent = spec.icon;
                  return (
                    <div
                      key={spec.title}
                      className="bg-slate-800/50 rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-slate-700">

                    <div className="flex justify-center mb-6">
                      <div className="bg-amber-500 p-4 rounded-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">
                      {spec.title}
                    </h2>
                    <p className="text-slate-200 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>);

                })}
            </div>
            </div>
          </div>
        </section>

        {/* Service Areas Grid */}
        <section className="py-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden flex justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">
                Our Coverage Areas
              </h2>

            <div className="grid md:grid-cols-2 gap-10 mb-12 text-center">
              {serviceAreas.map((area) => {
                  const IconComponent = area.icon;
                  return (
                    <div
                      key={area.region}
                      className="bg-slate-800/50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-700">

                    <div className="flex items-center mb-6">
                      <div className="bg-amber-500 p-3 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{area.region}</h3>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-slate-200 mb-4">
                        Services Offered
                      </h4>
                      <ul className="space-y-3">
                        {area.services.map((service) =>
                          <li key={service} className="flex items-start">
                            <span className="text-amber-400 mr-3 font-bold">✓</span>
                            <span className="text-slate-200">{service}</span>
                          </li>
                          )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-slate-200 mb-4">
                        Primary Coverage Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {area.neighborhoods.map((neighborhood) =>
                          <span
                            key={neighborhood}
                            className="inline-block bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-medium border border-amber-400/40">

                            {neighborhood}
                          </span>
                          )}
                      </div>
                    </div>
                  </div>);

                })}
            </div>

            {/* Base Location Info */}
            <div className="bg-slate-800/50 rounded-xl p-8 mb-12 text-center border border-slate-700">
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
                    <a href="https://maps.google.com/?q=260+Christopher+Lane,+Staten+Island,+NY+10314" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 hover:underline transition-colors">260 Christopher Lane, Suite 201, Staten Island, NY 10314

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
                  <a href="https://maps.google.com/?q=25+Hyatt+Street,+Staten+Island,+NY+10301" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 hover:underline transition-colors">
                    25 Hyatt Street, Staten Island, NY 10301
                  </a>
                </p>
                <p className="text-sm text-slate-200">
                  (Satellite office, by appointment only)
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden flex justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">
              Why Choose Weinman Law Offices
            </h2>

            <div className="grid md:grid-cols-2 gap-10 mb-12 text-center">
              <div className="bg-slate-800/50 rounded-xl shadow-md p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  Dual Licensing
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  Pete Weinman is licensed to practice in both New York and New Jersey, allowing us to seamlessly handle cross-state transactions and provide coordinated legal services.
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl shadow-md p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  25+ Years of Experience
                </h3>
                <p className="text-slate-200 leading-relaxed">In practice since 2001, we bring extensive knowledge and expertise to every real estate transaction and legal matter.

              </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl shadow-md p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  Local Expertise
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  Based in Staten Island with deep roots in the local community, we understand the unique real estate landscape and market conditions.
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl shadow-md p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  Comprehensive Services
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  From residential to commercial, wills to trusts, we provide a full range of legal services to meet all your property needs.
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden flex justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-200 mb-8">
              Contact our office today for a free consultation. We serve clients throughout New York and New Jersey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                  href={`tel:${PROFESSIONAL_PHONE}`}
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors">

                Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
              </a>
              <a
                  href="mailto:Weinman@StatenIslandLaw.com"
                  className="inline-block bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors">

                Email Us
              </a>
            </div>
            </div>
          </div>
        </section>

        {/* Schedule Consultation */}
        <section id="contact" className="py-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden flex justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full">
              <div className="bg-slate-800/50 rounded-xl shadow-lg w-full overflow-hidden border border-slate-700">
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
    </main>
    </>
    </DesktopMarginWrapper>);

}