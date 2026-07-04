"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_AxCyUDne4sR75tw2N27Y3wQXkBUZ90mdx4oU6FeG82X", {
      api_host: "/ingest", // Use reverse proxy to avoid ad blockers
      ui_host: "https://us.posthog.com", // No proxy needed - this is just for UI links
      capture_pageview: true,
      capture_pageleave: true,
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
      session_recording: {
        recordCrossOriginIframes: true,
        maskAllInputs: false, // Unmask all inputs
        maskInputOptions: {
          password: true, // Keep passwords masked
        },
      },
    })
    
    // Identify this as the iframe/child app
    posthog.register({
      app_context: "iframe_child",
      app_name: "breezy_sites_base",
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}

