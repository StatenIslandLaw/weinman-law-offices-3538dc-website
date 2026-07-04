import React from 'react';
import { Metadata } from 'next';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Resources | Weinman Law Offices",
  description: "Useful links for Staten Island home buyers and sellers and New Jersey home buyers — deed searches, tax calculators, flood maps, permit checks, and more. Curated by Pete Weinman, Esq.",
  keywords: [
    "real estate resources",
    "Staten Island property records",
    "New Jersey home buying",
    "deed search",
    "flood maps",
    "permit checks",
    "tax calculators"
  ],
  openGraph: {
    title: "Resources | Staten Island Real Estate Attorney",
    description: "Useful links for Staten Island home buyers and sellers and New Jersey home buyers — deed searches, tax calculators, flood maps, permit checks, and more.",
    url: "https://www.statenislandlaw.com/resources",
    type: "website",
    siteName: "Pete Weinman, Esq., Real Estate Lawyer",
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/resources",
  },
};

export default function Resources() {
  return (
    <DesktopMarginWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Breadcrumbs items={[
              { name: 'Resources', url: 'https://www.statenislandlaw.com/resources' }
            ]} />

            <div className="max-w-4xl mx-auto text-center mt-8">
              {/* Badge */}
              <div className="mb-8 flex justify-center">
                <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-block">
                  <span className="text-amber-300 text-sm font-semibold tracking-wide">HELPFUL RESOURCES</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Resources
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed">
                Whether you are buying or selling a home on Staten Island, or purchasing in New Jersey, the resources below are ones I refer clients to regularly. Bookmark this page — you will likely come back to it more than once during your transaction.
              </p>

              {/* Quick Navigation */}
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <a
                  href="#staten-island-buyers"
                  className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-700/50 hover:border-amber-400/50 transition-all font-semibold"
                >
                  Staten Island Buyers
                </a>
                <a
                  href="#staten-island-sellers"
                  className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-700/50 hover:border-amber-400/50 transition-all font-semibold"
                >
                  Staten Island Sellers
                </a>
                <a
                  href="#new-jersey-buyers"
                  className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-700/50 hover:border-amber-400/50 transition-all font-semibold"
                >
                  New Jersey Buyers
                </a>
                <a
                  href="#general-resources"
                  className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-700/50 hover:border-amber-400/50 transition-all font-semibold"
                >
                  General Resources
                </a>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-b from-transparent to-slate-900/50"></div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">

            {/* For Staten Island Home Buyers */}
            <div id="staten-island-buyers" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 pb-3 border-b-2 border-amber-500/30">
                For Staten Island Home Buyers
              </h2>

              <div className="space-y-6">
                <ResourceItem
                  title="Richmond County Clerk — Deed and Mortgage Searches"
                  url="https://www.RichmondCountyClerk.com"
                  description="Staten Island is Richmond County, and all deed and mortgage records here are maintained by the Richmond County Clerk — not ACRIS, which covers the other four boroughs. Before closing on any Staten Island property, your attorney will search this database to confirm title is clear and that there are no recorded liens or open mortgages that must be satisfied at closing."
                />

                <ResourceItem
                  title="NYC Department of Finance — Property Tax and Assessment Records"
                  url="https://www.nyc.gov/finance/property-search"
                  description="Look up the current assessed value and annual property tax bill for any property you are considering. Keep in mind that assessed value and market value are not the same thing, and that some existing tax exemptions — such as the STAR exemption — do not automatically transfer to a new owner."
                />

                <ResourceItem
                  title="NYC Department of Buildings — Building Information System (BIS)"
                  url="https://a.b1.nyc.gov"
                  description="Search the permit and violation history for any property. Before making an offer, check whether there are open permits, unresolved violations, or certificate of occupancy issues. These can complicate a closing and in some cases must be resolved by the seller before title can transfer cleanly."
                />

                <ResourceItem
                  title="NYC311 — Open Violations portal"
                  url="https://portal.311.nyc.gov"
                  description="A second avenue for checking Department of Buildings complaints and violations. Useful as a cross-reference when you want to be thorough before committing to a purchase."
                />

                <ResourceItem
                  title="FEMA Flood Map Service Center"
                  url="https://msc.fema.gov"
                  description="Flood zone designation matters on Staten Island — particularly in low-lying areas near the waterfront. Properties in designated flood zones require flood insurance. Check the map before you make an offer, not after."
                />

                <ResourceItem
                  title="NYC Mansion Tax"
                  url="https://www.nyc.gov/finance"
                  description="In New York City, the buyer pays a mansion tax on any residential purchase of $1,000,000 or more. The rate starts at 1% and increases on a tiered scale for higher purchase prices. If you are buying at or above that threshold, factor this into your closing cost estimate well in advance."
                />

                <ResourceItem
                  title="NYC Mortgage Recording Tax"
                  url="https://www.nyc.gov/finance"
                  description="New York State and New York City impose a mortgage recording tax paid by the buyer at closing. The combined rate is 1.8% on loans under $500,000 and 1.925% on larger loans, with a small credit available on primary residences. This is one of the larger closing costs in a New York transaction and one that surprises many buyers who are not expecting it."
                />
              </div>
            </div>

            {/* For Staten Island Home Sellers */}
            <div id="staten-island-sellers" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 pb-3 border-b-2 border-amber-500/30">
                For Staten Island Home Sellers
              </h2>

              <div className="space-y-6">
                <ResourceItem
                  title="Richmond County Clerk — Deed and Mortgage Searches"
                  url="https://www.RichmondCountyClerk.com"
                  description="Your attorney will search the Richmond County Clerk's records to confirm that your deed is properly recorded, that any open mortgages are identified and can be satisfied at closing, and that there are no unexpected liens on the property. Again — ACRIS does not cover Staten Island."
                />

                <ResourceItem
                  title="NYC Department of Finance — Transfer and Mortgage Recording Tax"
                  url="https://www.nyc.gov/finance"
                  description="New York City imposes a transfer tax on residential sales, paid by the seller. The rate depends on the sale price. Review current rates here so you know what to expect when your attorney prepares your closing cost estimate."
                />

                <ResourceItem
                  title="NYC Property Tax and Assessment Records"
                  url="https://www.nyc.gov/finance/property-search"
                  description="Look up the current assessed value and tax bill for your property. Buyers and their attorneys will check this during due diligence, so it is worth reviewing before you list."
                />

                <ResourceItem
                  title="NYC311 — Open Permits and Violations"
                  url="https://portal.311.nyc.gov"
                  description="Before listing your property, check for any open Department of Buildings violations or unresolved permits. Buyers' attorneys routinely check this, and unresolved items discovered late in the process can delay or derail a closing."
                />
              </div>
            </div>

            {/* For New Jersey Home Buyers */}
            <div id="new-jersey-buyers" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 pb-3 border-b-2 border-amber-500/30">
                For New Jersey Home Buyers
              </h2>

              <div className="space-y-6">
                <ResourceItem
                  title="NJ Realty Transfer Fee Information"
                  url="https://www.njconsumeraffairs.gov"
                  description="The realty transfer fee is a deed transfer tax paid by the seller in New Jersey, calculated based on the sale price. Understanding this fee helps buyers evaluate the seller's net proceeds and anticipate how it may factor into price negotiations."
                />

                <ResourceItem
                  title="NJ Mansion Tax"
                  url="https://www.njleg.state.nj.us"
                  description="New Jersey imposes a 1% tax on residential purchases of $1,000,000 or more. Unlike most closing costs, this one is paid by the buyer. If your purchase price is at or near that threshold, plan for it in advance."
                />

                <ResourceItem
                  title="NJ Division of Consumer Affairs — Real Estate Commission"
                  url="https://www.njconsumeraffairs.gov/rec"
                  description="Look up the license status of any New Jersey real estate agent or broker. You can also file a complaint here if you believe a licensee has acted improperly."
                />

                <ResourceItem
                  title="FEMA Flood Map Service Center"
                  url="https://msc.fema.gov"
                  description="Before making an offer on any New Jersey property, check whether it falls within a designated flood zone. Properties in high-risk zones require flood insurance, which adds to your monthly carrying costs and should be factored into your budget."
                />

                <ResourceItem
                  title="NJ Housing and Mortgage Finance Agency"
                  url="https://www.njhousing.gov"
                  description="New Jersey offers down payment assistance and first-time buyer programs through this agency. If you are purchasing your first home in New Jersey, it is worth reviewing what may be available to you before you go under contract."
                />
              </div>
            </div>

            {/* General Real Estate Resources */}
            <div id="general-resources" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 pb-3 border-b-2 border-amber-500/30">
                General Real Estate Resources
              </h2>

              <div className="space-y-6">
                <ResourceItem
                  title="Consumer Financial Protection Bureau — Buying a Home"
                  url="https://www.consumerfinance.gov/owning-a-home"
                  description="A plain-language federal resource covering mortgage types, how to read a Loan Estimate, and what to expect on your Closing Disclosure. Particularly useful for first-time buyers who want to understand the financing side of the transaction before sitting down with a lender."
                />

                <ResourceItem
                  title="HUD-Approved Housing Counselors"
                  url="https://www.hud.gov/topics/buying_a_home"
                  description="The U.S. Department of Housing and Urban Development maintains a list of free or low-cost housing counselors approved to assist homebuyers. If you have questions about your mortgage, budget, or readiness to buy before committing to a purchase, this is a good starting point."
                />

                <ResourceItem
                  title="National Flood Insurance Program"
                  url="https://www.fema.gov/flood-insurance"
                  description="If a property you are buying is in a flood zone, or if you are selling a property that carries existing flood coverage, this is the authoritative source for understanding NFIP policies, rates, and transfer requirements."
                />

                <ResourceItem
                  title="NY State Bar Association — Lawyer Referral Service"
                  url="https://www.nysba.org/for-the-public/lawyer-referral-service"
                  description="If you need legal assistance on a matter outside the scope of a real estate transaction — estate planning, landlord-tenant, family law — this referral service can connect you with a licensed New York attorney in the appropriate practice area."
                />

                <ResourceItem
                  title="NJ State Bar Association — Lawyer Referral Service"
                  url="https://www.njsba.com/public-information/lawyer-referral-service"
                  description="The New Jersey equivalent. If you have a legal question after your NJ purchase closes and need a referral to a New Jersey attorney in a different practice area, start here."
                />
              </div>
            </div>

            {/* Recommended Listening */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-8 pb-3 border-b-2 border-amber-500/30">
                Recommended Listening
              </h2>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Tenant Law Podcast
                </h3>
                <p className="text-lg text-slate-300 mb-4 italic">
                  (also known as Learn to Live Better, a Housing Law Podcast)
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Hosted by Michelle Maratto Itkowitz, Esq. of Itkowitz PLLC in New York City, this podcast covers NYC landlord-tenant law in depth — sublet rights, roommate rules, co-op issues, short-term rentals, rent stabilization, and more. It is one of the most thorough and well-regarded resources on NYC housing law available to the public, and it has earned recognition on Spotify as a most-shared and most-discussed legal program. If you own or rent property in New York City and want to understand your rights, this is worth your time.
                </p>
                <p className="text-slate-300 mb-2">
                  Available on{' '}
                  <a
                    href="https://podcasts.apple.com/us/podcast/tenant-law-podcast/id1679427364"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    Apple Podcasts
                  </a>
                  ,{' '}
                  <a
                    href="https://open.spotify.com/show/25oWoJMKkV2Iv4sP3d7exu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    Spotify
                  </a>
                  , and{' '}
                  <a
                    href="https://www.youtube.com/playlist?list=PLitIxkgBBTpTqFE23u4ogFgXCim_wnsAo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    YouTube
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Footer Contact */}
            <div className="bg-slate-800/30 rounded-lg p-8 border border-slate-700/50 text-center">
              <p className="text-slate-300 mb-4 leading-relaxed">
                <strong className="text-white">Pete Weinman, Esq.</strong> is a residential real estate attorney licensed in New York and New Jersey, representing buyers and sellers in Staten Island and New Jersey transactions. For questions about your transaction, contact Weinman Law Offices at{' '}
                <a href="tel:718-442-2010" className="text-amber-400 hover:text-amber-300 transition-colors">
                  718-442-2010
                </a>
                {' '}or{' '}
                <a href="mailto:Weinman@StatenIslandLaw.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Weinman@StatenIslandLaw.com
                </a>
                .
              </p>
              <p className="text-slate-400 text-sm">
                260 Christopher Lane, Suite 201 | Staten Island, NY 10314
              </p>
            </div>

          </div>
        </section>
      </div>
    </DesktopMarginWrapper>
  );
}

// Resource Item Component
function ResourceItem({ title, url, description }: { title: string; url: string; description: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:bg-slate-700/50 hover:border-amber-400/50 transition-all">
      <h3 className="text-xl font-bold text-amber-400 mb-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-300 transition-colors"
        >
          {title}
        </a>
      </h3>
      <p className="text-sm text-slate-400 mb-3 font-mono">{url}</p>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}
