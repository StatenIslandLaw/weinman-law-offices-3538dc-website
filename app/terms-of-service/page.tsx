import React from 'react';
import type { Metadata } from "next";
import { PROFESSIONAL_NAME, PROFESSIONAL_EMAIL, PROFESSIONAL_PHONE, PROFESSIONAL_ADDRESS } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';

export const metadata: Metadata = {
  title: "Terms of Service | Staten Island Real Estate Lawyer",
  description: "Terms of service for legal services provided by Weinman Law Offices, PC - Your Staten Island real estate lawyer.",
  openGraph: {
    siteName: "Pete Weinman, Esq.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/terms-of-service",
  },
};

export default function TermsOfService() {
  const lastUpdated = "January 1, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 w-full overflow-x-hidden pt-24 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-4xl w-full">
        <div className="bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-6">Weinman Law Offices, PC - Terms of Service</h1>
          <p className="text-gray-300 mb-8">Last updated: December 11, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing and using the services provided by {PROFESSIONAL_NAME}, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
              <p className="text-gray-300 mb-4">
                {PROFESSIONAL_NAME} provides professional services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="text-gray-300 mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 pl-4">
                <li>Provide accurate and complete information when requested</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Respect the intellectual property rights of {PROFESSIONAL_NAME}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Payment and Billing</h2>
              <p className="text-gray-300 mb-4">
                Payment terms will be agreed upon before services are rendered. All fees are due as specified in your service agreement. Late payments may be subject to additional charges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                {PROFESSIONAL_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Privacy</h2>
              <p className="text-gray-300 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
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