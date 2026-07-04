'use client';

import React from 'react';

interface DesktopMarginWrapperProps {
  children: React.ReactNode;
}

export default function DesktopMarginWrapper({ children }: DesktopMarginWrapperProps) {
  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          body {
            background: #0f172a !important;
          }
          body > div {
            background: #0f172a;
          }
        }

        /* Override floating chat button border and background */
        #breezy-chat-widget-button,
        [id*="chat-widget"],
        [class*="chat-widget"],
        [class*="chat-button"] {
          border-color: transparent !important;
          box-shadow: 0 0 25px 5px rgba(220, 38, 38, 0.8) !important;
          border-radius: 50% !important;
          background: transparent !important;
          backdrop-filter: none !important;
        }

        #breezy-chat-widget-button > *,
        [id*="chat-widget"] > *,
        [class*="chat-widget"] > * {
          background: transparent !important;
        }

        /* Add text shadow to chat button text for visibility */
        #breezy-chat-widget-button *,
        [id*="chat-widget"] *,
        [class*="chat-widget"] *,
        [class*="chat-button"] * {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8) !important;
        }

        /* Make chat button half size on mobile */
        @media (max-width: 767px) {
          #breezy-chat-widget-button,
          [id*="chat-widget"],
          [class*="chat-widget"],
          [class*="chat-button"] {
            transform: scale(0.5) !important;
            transform-origin: bottom right !important;
          }
        }

        /* Hide URL/address bar on mobile browsers */
        html {
          overflow: auto;
        }

        body {
          position: relative;
          min-height: 100vh;
        }

        /* Calendar widget iframe styling */
        iframe[src*="getbreezy.app/schedule"] {
          background: #1e293b !important;
          border-radius: 0 0 1rem 1rem !important;
        }

        /* Chrome-specific navigation spacing fix */
        @supports (-webkit-appearance:none) {
          section[class*="pt-16"] {
            padding-top: 5rem !important;
          }
          @media (min-width: 640px) {
            section[class*="pt-16"] {
              padding-top: 6rem !important;
            }
          }
          @media (min-width: 768px) {
            section[class*="pt-16"] {
              padding-top: 7.5rem !important;
            }
          }

          /* Chrome-specific horizontal padding */
          body {
            padding-left: 2% !important;
            padding-right: 2% !important;
          }
          @media (min-width: 1024px) {
            body {
              padding-left: 3% !important;
              padding-right: 3% !important;
            }
          }
        }
      `}</style>
      {children}
    </>
  );
}
