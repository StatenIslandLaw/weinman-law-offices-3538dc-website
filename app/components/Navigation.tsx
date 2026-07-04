'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LinkButton from './LinkButton';
import { Phone, MessageSquare } from 'lucide-react';
import { PROFESSIONAL_PHONE, PROFESSIONAL_PHONE_ALT, PROFESSIONAL_EMAIL } from '../../professionalConstants';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/blog', label: 'Blog' }];


  const contactItems = [
  { href: `mailto:${PROFESSIONAL_EMAIL}`, label: 'Email', sublabel: '' },
  { href: `tel:${PROFESSIONAL_PHONE}`, icon: Phone, sublabel: '718-442-2010' },
  { href: `sms:${PROFESSIONAL_PHONE_ALT}`, icon: MessageSquare, sublabel: '718-957-8121' }];


  return (
    <nav className={`bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg fixed top-0 left-0 right-0 z-50 border-b-2 border-amber-500/30 w-full ${className}`}>
      <div className="w-full px-2 sm:px-6 lg:px-8 mx-auto">
        {/* All Links in One Row - Wrapping on smaller screens */}
        <div className="flex justify-between items-start py-2">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Home - Weinman Law Offices">
            <Image
              src="/weinman-logo.png?v=4"
              alt="Weinman Law Offices logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:gap-x-4 lg:gap-x-6 max-w-full flex-1">
            {navItems.map((item, index) =>
            <React.Fragment key={item.href}>
                <LinkButton
                href={item.href}
                className="text-slate-100 text-[10px] sm:text-sm font-medium hover:text-amber-400 transition-all duration-300 whitespace-nowrap px-1 sm:px-1.5 py-0.5 rounded hover:bg-slate-700/50">
                  {item.label}
                </LinkButton>
                {index < navItems.length - 1 &&
              <span className="text-amber-500/40 text-sm hidden sm:inline">|</span>
              }
              </React.Fragment>
            )}
            {/* Separator between nav and contact */}
            <span className="text-amber-500/40 text-sm hidden sm:inline">|</span>
            {contactItems.map((item, index) =>
            <React.Fragment key={item.href}>
                <a
                href={item.href}
                aria-label={item.icon ? `${item.sublabel}` : item.label}
                className="text-slate-100 font-medium hover:text-amber-400 transition-all duration-300 whitespace-nowrap flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 rounded hover:bg-slate-700/50">
                  {item.icon ?
                <>
                      <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {item.sublabel &&
                  <span className="text-[9px] sm:text-[10px] lg:text-xs">{item.sublabel}</span>
                  }
                    </> :

                <>
                      <span className="text-xs sm:text-sm">{item.label}</span>
                      {item.sublabel &&
                  <span className="text-[9px] sm:text-[10px] lg:text-xs ml-1">{item.sublabel}</span>
                  }
                    </>
                }
                </a>
                {index < contactItems.length - 1 &&
              <span className="text-amber-500/40 text-sm hidden sm:inline">|</span>
              }
              </React.Fragment>
            )}
          </div>
        </div>
        {/* Subtitle text */}
        <div className="text-center pb-1">
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">Staten Island Real Estate Lawyer, Pete Weinman</p>
        </div>
      </div>
    </nav>);

}