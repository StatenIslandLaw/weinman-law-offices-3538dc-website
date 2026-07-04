import {withSentryConfig} from '@sentry/nextjs';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  // Enable standalone output for Docker deployments (but not for S3 export)
  ...(process.env.NODE_ENV === 'production' && !process.env.EXPORT_BUILD && {
    output: 'standalone',
  }),
  // Enable static export for S3 deployment
  ...(process.env.EXPORT_BUILD && {
    output: 'export',
  }),
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  // Enable React strict mode for better development warnings
  reactStrictMode: true,
  // Disable Next.js development indicators (the "N" menu in dev mode)
  devIndicators: false,
  // Custom webpack configuration for JSX source injection in dev mode
  webpack: (config: any, { dev }: any) => {
    if (dev) {
      // Add custom loader to inject source metadata into JSX (both server and client)
      config.module.rules.push({
        test: /\.(tsx|jsx)$/, 
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('./webpack-loaders/jsx-source-loader.js'),
          },
        ],
        enforce: 'pre', // Run before other loaders
      });
    }
    return config;
  },
  images: {
    unoptimized: process.env.EXPORT_BUILD === 'true',  // Disable optimization for static export
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',                                                                                                                                                                                 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'facebook.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // Add headers for PostHog and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://us-assets.i.posthog.com https://us.i.posthog.com https://app.getbreezy.app${process.env.NODE_ENV === 'development' ? ' http://localhost:3000' : ''}`,
              "connect-src 'self' https: wss: https://us.i.posthog.com https://us-assets.i.posthog.com https://app.getbreezy.app",
              "style-src 'self' 'unsafe-inline' https://app.getbreezy.app",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://app.getbreezy.app",
              "media-src 'self' blob: https:",
              "frame-src 'self' https://app.getbreezy.app",
              "worker-src 'self' blob:",
            ].join('; '),
          },
          // Allow embedding in iframes from any origin (important for Breezy sites)
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  // PostHog rewrites for ingestion and assets
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "socratic-systems",

  project: "breezy_sites",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});