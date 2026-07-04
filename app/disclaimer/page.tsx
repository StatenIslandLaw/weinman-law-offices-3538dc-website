import React from 'react';
import type { Metadata } from "next";
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import { PROFESSIONAL_NAME, PROFESSIONAL_EMAIL, PROFESSIONAL_PHONE } from '../../professionalConstants';
import { formatPhoneNumber } from '../utils/phoneUtils';

export const metadata: Metadata = {
  title: "Legal Disclaimer | Staten Island Real Estate Lawyer",
  description: "Legal confidentiality notice and disclaimer for Weinman Law Offices, PC communications and website use.",
  openGraph: {
    siteName: "Pete Weinman, Esq.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/disclaimer",
  },
};

export default function Disclaimer() {
  const lastUpdated = "December 11, 2025";

  return (
    <DesktopMarginWrapper>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
            <div className="w-full mx-auto text-center">
              <div className="mb-6 inline-block px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full">
                <span className="text-amber-300 text-sm font-semibold tracking-wide">LEGAL NOTICE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Weinman Law Offices, PC - Disclaimer
              </h1>
              <p className="text-slate-200 text-lg">Last updated: {lastUpdated}</p>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-b from-transparent to-white"></div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-slate-50 rounded-xl p-8 md:p-12 shadow-lg border-2 border-slate-200 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">LEGAL CONFIDENTIALITY NOTICE</h2>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  The information contained within this website and/or electronic mail that referred you here (henceforth referred to as &ldquo;site,&rdquo; &ldquo;email,&rdquo; &ldquo;message,&rdquo; &ldquo;digital correspondence,&rdquo; or, for the adventurous, &ldquo;encrypted carrier pigeon&rdquo;) and any attachments linked thereto or herein—be it by an obvious paperclip icon or shrouded in a mystery we&apos;ve yet to decode—may contain confidential or privileged material. Such secrecy, dear recipient, is the occupational lifeblood of legal professionals everywhere, and we take this privilege very seriously (mostly).
                </p>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  Here&apos;s the crux of the matter: this message is intended exclusively for its designated recipient(s). If that&apos;s you? Fantastic. Carry on with purpose and confidence. If it&apos;s not? Well, things just got a bit awkward, didn&apos;t they? Kindly do the ethical (and frankly, best-for-your-luck) thing by refusing to continue. Stop reading. Shut your eyes. Yes, you! Place the blame on typos or your uncanny knack for stumbling into inboxes where you don&apos;t belong. But by all means, act as though this never happened—personally, legally, and spiritually.
                </p>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  Should you spectacularly fail to heed this notice and proceed further: you are, henceforth, unequivocally forbidden from copying, forwarding, posting, analyzing, interpreting, reenacting via shadow puppets, or transmitting—whether via smoke signal, telegraph, or avant-garde performance—any part of this message. If you have received this email in error, immediate actions must be taken:
                </p>

                <ul className="list-disc list-inside text-slate-700 mb-6 space-y-3 pl-4 leading-relaxed">
                  <li>Notify me posthaste to prevent cosmic imbalance (and my annoyance).</li>
                  <li>Erase the message from your devices, memory banks, and universe.</li>
                  <li>Continue your life as if absolutely nothing occurred. You were never here. I was never here. The squirrels, however, are always watching, so be cautious.</li>
                </ul>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  Failure to comply with these much-needed steps may result in minor inconveniences such as stepping on sharp Legos, scalding coffee spills, or prolonged existential questioning about why ducks are immune to hypnosis (fun fact: they are). Should you choose to respect this notice, however, serenity and gratitude will shower upon you.
                </p>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  Remember, rules exist for a reason—even if they sometimes feel like they&apos;ve dragged on as long as a four-hour directors&apos; cut of a movie about disclaimers. Don&apos;t be like the ill-fated Ted, who disregarded this very notice: Ted stubbed his toe, spilled coffee on his best suit, and encountered the misfortune of opening his fridge to find exactly zero snacks. Learn from him.
                </p>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  If you&apos;ve made it this far, consider yourself a victor of endurance. Treat yourself to a reward. Perhaps a banana before bed (great for sleep!) or a light chuckle at the law&apos;s absurd side. And, should the IRS, squirrel conspiracies, or cosmic forces come knocking upon breaching this contract… You&apos;ve been duly warned.
                </p>

                <p className="text-slate-700 mb-8 leading-relaxed">
                  Thank you for your cooperation. May your inbox be perpetually pristine.
                </p>

                <div className="border-t-2 border-amber-400 pt-6">
                  <p className="text-center text-slate-900 font-bold text-lg">
                    END LEGAL CONFIDENTIALITY NOTICE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-xl text-slate-600">For questions regarding this silly disclaimer, please contact:</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-amber-400/30">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 mb-4">{PROFESSIONAL_NAME}</p>
                <div className="space-y-2">
                  <p className="text-lg text-slate-700">
                    <span className="font-semibold">Phone:</span> {formatPhoneNumber(PROFESSIONAL_PHONE)}
                  </p>
                  <p className="text-lg text-slate-700">
                    <span className="font-semibold">Email:</span> {PROFESSIONAL_EMAIL}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesktopMarginWrapper>
  );
}