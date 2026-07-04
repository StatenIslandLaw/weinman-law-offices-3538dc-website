import React from 'react';
import type { Metadata } from "next";
import { PROFESSIONAL_NAME, PROFESSIONAL_EMAIL, PROFESSIONAL_PHONE, PROFESSIONAL_ADDRESS } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';

export const metadata: Metadata = {
  title: "Privacy Policy | Staten Island Real Estate Lawyer",
  description: "Privacy policy for Weinman Law Offices, PC. Learn how your Staten Island real estate lawyer protects and handles your information.",
  openGraph: {
    siteName: "Pete Weinman, Esq.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 w-full overflow-x-hidden pt-24 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-4xl w-full">
        <div className="bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-6">Weinman Law Offices, PC - Privacy Policy</h1>
          <p className="text-gray-300 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                {PROFESSIONAL_NAME} collects information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 pl-4">
                <li>Fill out contact forms or request quotes</li>
                <li>Schedule appointments or consultations</li>
                <li>Communicate with us via phone, email, or chat</li>
                <li>Subscribe to our newsletter or updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 pl-4">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Schedule and confirm appointments</li>
                <li>Send you service updates and communications</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p className="text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 pl-4">
                <li>Service providers who assist us in operating our business</li>
                <li>Legal authorities when required by law</li>
                <li>Other parties with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-300 mb-4">
                Our website may use cookies and similar tracking technologies to enhance your experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 pl-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about how we use your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-300 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website with an updated &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                <p className="font-semibold text-white">{PROFESSIONAL_NAME}</p>
                <p className="text-gray-300">{PROFESSIONAL_ADDRESS}</p>
                <p className="text-gray-300">Phone: {formatPhoneNumber(PROFESSIONAL_PHONE)}</p>
                <p className="text-gray-300">Email: {PROFESSIONAL_EMAIL}</p>
              </div>
            </section>
          </div>
        </div>
        </div>
      </div>
    </div>);

}