// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3e30231889d43e78ebd91787aec191be@o4504595109445632.ingest.us.sentry.io/4510105298534400",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Log all errors to console/server logs before sending to Sentry
  beforeSend(event, hint) {
    console.error('Sentry Error:', {
      message: event.message,
      exception: event.exception,
      level: event.level,
      contexts: event.contexts,
      tags: event.tags,
      extra: event.extra,
      user: event.user,
      timestamp: event.timestamp,
      originalException: hint.originalException,
    });
    return event;
  },
});
