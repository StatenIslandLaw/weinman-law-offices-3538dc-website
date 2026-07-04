import React from 'react';
import { Metadata } from 'next';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import StructuredData from '../components/StructuredData';
import Breadcrumbs from '../components/Breadcrumbs';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { generateFAQPageSchema } from '../utils/structuredData';
import { faqItems, getGroupedFAQs } from '../data/faqData';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: "FAQs | Staten Island Real Estate Attorney - Weinman Law Offices",
  description: "Frequently asked questions about real estate law, home buying, selling, closings, co-ops, condos, attorney fees, and more. Expert answers from Staten Island real estate lawyer.",
  openGraph: {
    siteName: "Pete Weinman, Esq.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.statenislandlaw.com/faqs",
  },
};

// Category icons mapping - using string names instead of components
const categoryIcons: Record<string, string> = {
  'Getting Started & Consultations': 'Calendar',
  'Attorney Fees & Costs': 'DollarSign',
  'Deposits & Earnest Money': 'DollarSign',
  'Buying a Home': 'Home',
  'Closing Timeline & Process': 'Clock',
  'Home Inspection': 'CheckCircle',
  'Selling a Home': 'Briefcase',
  'Property Condition Disclosure': 'FileText',
  'Co-ops & Condos': 'Home',
  'Wire Fraud Prevention': 'CheckCircle',
  'Title, Survey & Insurance': 'Scale',
  'Financing & Mortgages': 'DollarSign',
  'Taxes & Closing Costs': 'DollarSign',
  'Power of Attorney': 'FileText',
  'Post-Closing Matters': 'CheckCircle',
  'Investment Property & Landlord-Tenant': 'Briefcase',
  'Commercial & Mixed-Use Property': 'Briefcase',
  'Additional Questions': 'HelpCircle'
};

export default function FAQsPage() {
  const groupedFAQs = getGroupedFAQs();

  return (
    <DesktopMarginWrapper>
      <>
        <GoogleAnalytics measurementId="G-C9WLVZKQW4" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <Breadcrumbs items={[{ name: 'FAQs', url: '/faqs' }]} />
          </div>

          <FAQClient faqItems={faqItems} categoryIcons={categoryIcons} groupedFAQs={groupedFAQs} />

          {/* Structured Data for SEO */}
          <StructuredData
            data={generateFAQPageSchema(
              faqItems.map((item) => ({
                question: item.question,
                answer: item.answer,
              }))
            )}
          />
        </div>
      </>
    </DesktopMarginWrapper>
  );
}

/* OLD FAQ DATA - NOW MOVED TO /app/data/faqData.ts
const faqItems: FAQItem[] = [
// GETTING STARTED & CONSULTATIONS
{
  category: "Getting Started & Consultations",
  question: "What services do you offer?",
  answer: "I handle residential and commercial purchases and sales, vacant land transactions, condos, co-ops, contract drafting and negotiation, title review, lender coordination, and closings (in-person or virtual). I also help with LLC formation, lease reviews, deed transfers, and basic dispute guidance. If litigation is required, I'll refer you to the right person.",
  popular: true
},
{
  category: "Getting Started & Consultations",
  question: "How can I schedule a consultation?",
  answer: "Call my office at 718-442-2010 or submit a consultation request through my website. I can usually get you in same-day or next business day, and I'm happy to do phone or video consultations for your convenience.",
  popular: true
},
{
  category: "Getting Started & Consultations",
  question: "What should I bring to my initial consultation?",
  answer: "Bring your photo ID, any contract or offer letter you've received, your pre-approval or proof of funds, any title reports or surveys you have, recent utility and tax bills, and for condos/co-ops, the offering plan or house rules if you have them. If selling, bring a copy of your deed, title insurance policy, certificate of occupancy, and any plans/permits you may have obtained. Also bring a list of your questions and any important dates or deadlines."
},
{
  category: "Getting Started & Consultations",
  question: "What areas do you serve?",
  answer: "I'm based in Staten Island and primarily serve the greater NYC area, but I can assist anywhere in New York State. I'm also licensed in New Jersey, which comes in handy when transactions or parties have cross-state elements."
},
{
  category: "Getting Started & Consultations",
  question: "Are there any upfront fees for consultations?",
  answer: "No, initial consultations are free. If you decide to retain me, upon request, I'll give you a clear engagement letter with a flat fee or hourly structure depending on the matter. For matters under $3,500, the NYS Bar Association does not require an engagement letter.",
  popular: true
},

// ATTORNEY FEES & COSTS
{
  category: "Attorney Fees & Costs",
  question: "What do you charge to represent a buyer or seller?",
  answer: "<strong>[NY & NJ]</strong> My flat fee for buyer or seller representation for sale/purchase prices under $1,000,000 is usually $2,000. I collect $500 up front when you sign the contract, and the balance of $1,500 is paid at closing. If it's new construction, a condominium, a co-op, or if there's a trust or LLC involved, my fee is usually higher. If the deal falls through after I've negotiated the contract (for example, if the buyer backs out), I charge $350 for the contract work. My fee does not include post-closing work or litigation.",
  popular: true
},
{
  category: "Attorney Fees & Costs",
  question: "Do you charge a percentage or a flat fee?",
  answer: "For most residential transactions, I charge a flat fee of $2,000. For complex commercial transactions or high-value properties, my fee is typically one quarter of one percent of the purchase price."
},
{
  category: "Attorney Fees & Costs",
  question: "What is your fee for LLC formation?",
  answer: "<strong>[NY]</strong> My fee for LLC formation is $1,250. Please note that New York has a publishing requirement when forming an LLC, which can cost more than $1,000 on top of my fee. Connecticut does not have this requirement, so if you're considering a CT LLC that will operate in NY, I'd recommend discussing the pros and cons with your tax preparer first. There may be significant differences in the tax ramifications between the two states."
},

// DEPOSITS & EARNEST MONEY
{
  category: "Deposits & Earnest Money",
  question: "How much should I put down as a deposit?",
  answer: "I typically recommend 10% of the purchase price, though the amount is negotiable. Some buyers opt for smaller deposits (e.g., $10,000), which has the benefit of being litigated in Small Claims Court if there's ever a dispute over the deposit. The deposit shows the seller you're serious."
},
{
  category: "Deposits & Earnest Money",
  question: "Who holds the deposit?",
  answer: "<strong>[NY]</strong> The deposit is typically held in the seller's attorney's escrow account (called an IOLA) or in a title company's escrow account until closing. <strong>[NJ]</strong> In New Jersey, the buyer's attorney or the title company may hold it. Either way, the deposit is not released to the seller until the closing."
},
{
  category: "Deposits & Earnest Money",
  question: "Can I use my deposit from selling my house to pay the deposit on my new purchase?",
  answer: "No, you'll need to pay the deposit on your new purchase from your own funds. The deposit money from your buyer is not yours until your closing - typically about 60 days away. You should have separate funds available for your purchase deposit."
},
{
  category: "Deposits & Earnest Money",
  question: "What happens to my deposit if the deal falls through?",
  answer: "It depends on why it fell through. If it's due to a contingency in the contract (mortgage denial, failed inspection, co-op board rejection, etc.), your deposit is typically returned. If you back out without a valid contractual reason, you risk losing your deposit. If the seller backs out, you're entitled to your deposit back and may have additional legal remedies."
},

// BUYING A HOME
{
  category: "Buying a Home",
  question: "Do I need a real estate attorney to buy a home?",
  answer: "<strong>[NY]</strong> New York doesn't technically require you to hire an attorney, but it's customary and I strongly recommend it. I negotiate your contract, review title and building documents, address issues that come up, and represent you at closing. <strong>[NJ]</strong> In New Jersey, attorney involvement is also standard and recommended.",
  popular: true
},
{
  category: "Buying a Home",
  question: "What's the difference between pre-qualification and pre-approval?",
  answer: "Pre-qualification is a quick estimate based on information you provide verbally. Pre-approval is based on actual documentation and a credit review, so it carries much more weight with sellers. Get a pre-approval before you start serious house hunting."
},
{
  category: "Buying a Home",
  question: "How does the offer-to-contract process work?",
  answer: "<strong>[NY]</strong> After an offer is accepted, the seller's attorney sends over a draft contract. I negotiate the terms and add any necessary riders. You sign and deliver your deposit (usually 10% but negotiable). The seller countersigns, and then you have a binding contract. <strong>[NJ]</strong> In New Jersey, there's a three-day attorney review period after the initial contract is signed."
},
{
  category: "Buying a Home",
  question: "Is there an attorney review period?",
  answer: "<strong>[NY]</strong> No, there's no separate attorney review period in New York. I negotiate the contract terms before both sides sign and become bound. <strong>[NJ]</strong> New Jersey has a three-day attorney review period after the contract is signed, during which either attorney can disapprove or modify the contract."
},
{
  category: "Buying a Home",
  question: "What documents do I need as a buyer?",
  answer: "You'll need a pre-approval letter from your lender, proof of funds for your deposit, and valid photo ID for closing. Your lender will request additional financial documentation for underwriting."
},
{
  category: "Buying a Home",
  question: "Which contingencies are common for buyers?",
  answer: "Typical protections include mortgage/financing contingency, appraisal contingency, title clearance, and sometimes inspection or specific repair credits. I'll tailor the contingencies to your property and your risk tolerance."
},
{
  category: "Buying a Home",
  question: "Should I sign the offer to purchase form?",
  answer: "Yes, it's fine to sign. An offer to purchase form is typically a standard form that just memorializes the basic terms you've agreed to with the seller (price, contingencies, etc.). Essentially, it's an agreement to agree. The actual contract will come from the seller's attorney, and that's what I'll review and negotiate in detail. Just make sure the offer is \"contingent upon an inspection and attorney review.\""
},
{
  category: "Buying a Home",
  question: "My spouse won't be on the mortgage. Should they be on the contract?",
  answer: "It makes no difference if they're on the contract. If they won't be on the loan (the note) but will be going into title (the deed), they would still have to sign the mortgage. Being on the contract doesn't affect underwriting."
},
{
  category: "Buying a Home",
  question: "Are appliances, fixtures, and window treatments included?",
  answer: "Inclusions should be listed in the contract. By default, built-ins and fixtures usually stay; portable items may not. The final walk-through is when you confirm everything that's supposed to stay is actually there."
},

// CLOSING TIMELINE & PROCESS
{
  category: "Closing Timeline & Process",
  question: "What is the typical home-buying timeline?",
  answer: "<strong>[NY]</strong> Plan for 60-90 days from accepted offer to closing, depending on loan underwriting, title clearance, condo/co-op approvals, and how quickly everyone moves. <strong>[NJ]</strong> Similar timeframes, though the attorney review period adds a few days at the beginning.",
  popular: true
},
{
  category: "Closing Timeline & Process",
  question: "What does 'on or about' closing date mean?",
  answer: "<strong>[NY]</strong> An 'on or about' closing date (typically 60 days) provides flexibility for both parties. After day 60, either side can declare 'time of the essence,' giving the other party additional reasonable notice (typically 30 days in NY and 10 days in NJ) to close or be in default. This gives everyone reasonable time for mortgage approvals, title searches, and other contingencies."
},
{
  category: "Closing Timeline & Process",
  question: "How long does it take to get mortgage commitment?",
  answer: "Mortgage commitment is typically required within 45 days from contract execution. Your lender will need time to process your application, order an appraisal, and complete underwriting. Stay in close contact with your loan officer and get them any requested documents as quickly as possible."
},
{
  category: "Closing Timeline & Process",
  question: "How long does the actual closing take?",
  answer: "The closing itself typically takes 30-40 minutes if everyone is on time and all the documents are in order. However, it can extend if the bank needs signed documents before releasing funds or if there are last-minute issues to resolve. Some lenders will require their attorney/agent to email copies of the signed documents before authorizing the release of money. Plan to be available for at least 1-2 hours."
},
{
  category: "Closing Timeline & Process",
  question: "When should I wire my funds for closing?",
  answer: "If a wire was chosen/required, wire your funds the day before closing if possible. The wire needs to be received before we can close, and there's always a possibility of delays. Many title companies have cutoff times (often 4pm), so don't wait until closing day. Wire from a checking account (not savings), and be aware that some banks require you to come into the branch in person."
},
{
  category: "Closing Timeline & Process",
  question: "What happens at closing?",
  answer: "Everyone signs the final documents, funds are disbursed, keys are exchanged, and recording packages are finalized. You'll receive a closing statement and copies of all executed documents."
},
{
  category: "Closing Timeline & Process",
  question: "Who attends the closing?",
  answer: "Typically, buyers and sellers (or their attorneys), the lender's attorney, title agent/closer, and sometimes managing agent representatives for condos/co-ops."
},
{
  category: "Closing Timeline & Process",
  question: "Can I close remotely?",
  answer: "Often yes but not always. E-signing and remote notarization are available for many documents, and lenders frequently permit mail-away or hybrid e-closings. I'll confirm what's permitted for your transaction."
},
{
  category: "Closing Timeline & Process",
  question: "What is the final walk-through?",
  answer: "It's your last inspection shortly before closing to confirm the property's condition, any agreed repairs, and that everything that's supposed to stay is there. If you find any issues, raise them immediately so we can address them at the closing table."
},
{
  category: "Closing Timeline & Process",
  question: "When do I get the keys and possession?",
  answer: "Usually once funding is complete and the closing is done. If there's a post-closing occupancy arrangement, keys and possession follow the use-and-occupancy agreement."
},

// HOME INSPECTION
{
  category: "Home Inspection",
  question: "How do inspections work?",
  answer: "<strong>[NY]</strong> Inspections are typically completed before you sign the contract or during a negotiated inspection period. <strong>[NJ]</strong> Inspections are commonly done after the attorney review period. Either way, the inspector checks major systems, roof, structure, and environmental concerns, and the findings can inform our negotiations."
},
{
  category: "Home Inspection",
  question: "What issues does the inspection contingency cover?",
  answer: "The inspection contingency is typically limited to 'major structural, safety, environmental, or mechanical defects of the systems of the home.' This does not include cosmetic issues, minor repairs, or normal wear and tear. The inspector's recommendations for preventative maintenance are typically not covered either."
},
{
  category: "Home Inspection",
  question: "What happens if the inspection finds problems?",
  answer: "If the inspection reveals major defects, you have options: request that the seller make specific repairs before closing, request a credit at closing to cover repair costs, accept the property as-is, or cancel the contract if the defects are significant enough. I'll negotiate with the seller's attorney based on the inspection findings."
},
{
  category: "Home Inspection",
  question: "Can I request an extension of the inspection period to get contractor estimates?",
  answer: "Yes, I can request an extension if you need time to bring contractors in to evaluate specific issues and get cost estimates. This allows you to make informed, specific requests for repairs or credits rather than broad demands."
},
{
  category: "Home Inspection",
  question: "What if the seller offers a credit instead of making repairs?",
  answer: "A credit at closing is often preferable because you control the quality of the work, there are no follow-up inspections of seller-performed repairs, and you can use contractors you trust. If the seller offers a credit, understand that they will not perform repairs and you'll be responsible for all repairs after closing. Your lender must approve."
},
{
  category: "Home Inspection",
  question: "Am I required to fix inspection issues as a seller?",
  answer: "Not automatically. Repairs, credits, or price adjustments are all negotiable unless your contract says otherwise. I'll help you evaluate the cost, timing, and market leverage."
},

// SELLING A HOME
{
  category: "Selling a Home",
  question: "When should I hire a seller's attorney?",
  answer: "Ideally before you accept an offer. That way your contract and riders are properly negotiated from the start and we can set realistic timelines."
},
{
  category: "Selling a Home",
  question: "What documents do I need as a seller of a house?",
  answer: "Try to locate your deed, your owner's policy of title insurance from when you purchased, your survey, mortgage payoff information, and Certificate of Occupancy if available. Having these documents ready speeds up the contract preparation and closing process."
},
{
  category: "Selling a Home",
  question: "What documents do I need to sell a co-op?",
  answer: "<strong>[NY]</strong> For a co-op sale, you'll need the original stock certificate, the proprietary lease, and recent maintenance statements. The ORIGINAL documents are required at the day of closing - copies are not sufficient. If you can't locate the originals, replacement documents can be ordered but it may delay your closing. If you financed the unit, your lender is holding the stock certificate and proprietary lease as collateral (they're probably not lost)."
},
{
  category: "Selling a Home",
  question: "Why do you need my title insurance policy from when I purchased?",
  answer: "I like to see what was excepted from coverage when you purchased - things like encroachments, easements, or variations. Buyers may try to use these types of things as leverage for a discount or as an easy way out of a contract unless they're properly protected against or disclosed upfront. It's not absolutely necessary, but having it helps me draft a better contract."
},
{
  category: "Selling a Home",
  question: "What documents will a seller's attorney prepare?",
  answer: "I'll prepare the contract of sale, required disclosures, riders tailored to your property, and closing deliverables like the deed, transfer tax forms, and pay-off letters."
},
{
  category: "Selling a Home",
  question: "What are typical seller closing costs?",
  answer: "<strong>[NY]</strong> Sellers usually pay transfer taxes (approximately 1.4-2% of sale price in NYC), attorney fee, broker commissions, title company fees, document preparation fees, mortgage payoff, and any agreed credits or repairs. Additional costs may apply for condos and co-ops (HOA fees, flip tax, transfer agent fees). <strong>[NJ]</strong> Transfer taxes are typically paid by seller unless you negotiate otherwise."
},
{
  category: "Selling a Home",
  question: "Can I remain in the home after closing (use & occupancy)?",
  answer: "Possession after closing requires a written use-and-occupancy agreement with defined \"use and occupancy\" (it's not called rent), duration, and security. The buyer is entitled to vacant possession at closing, so if you need to stay, the agreement should include: payment for use and occupancy; adjustments for taxes, water, oil, mortgage interest, and homeowners insurance through the date of possession; substantial escrow; and a per diem penalty for overstaying. Many lenders restrict post-closing occupancy for buyers, so plan early."
},
{
  category: "Selling a Home",
  question: "What happens if the buyer defaults?",
  answer: "You may have the right to retain the contract deposit as liquidated damages or pursue other remedies, depending on the contract terms. I'll review your enforcement options with you."
},
{
  category: "Selling a Home",
  question: "Can I accept a backup offer?",
  answer: "Backup offers are permissible but need to be structured carefully to avoid breaching the primary contract. Your Realtor should be able to advise."
},

// PROPERTY CONDITION DISCLOSURE
{
  category: "Property Condition Disclosure",
  question: "Do I have to complete a Property Condition Disclosure Statement?",
  answer: "<strong>[NY]</strong> Yes, as of March 2024, sellers must complete the PCDS – despite anything you may have heard, the old $500 opt-out credit was eliminated. The PCDS is a questionnaire about the home's condition (structure, systems, environmental items, flood history/risk). It must be delivered before the buyer signs a binding contract. If you don't know the answer to a question, you must indicate 'unknown' - you cannot skip any questions. <strong>[NJ]</strong> New Jersey has separate seller disclosure requirements, which is very similar. There was never an option to \"opt out\" in New Jersey."
},
{
  category: "Property Condition Disclosure",
  question: "Are there any exceptions to the PCDS requirement?",
  answer: "<strong>[NY]</strong> Yes, the law carves out fiduciaries, including trusts. If the property is owned entirely by a trust, you don't need to complete one. However, if an LLC owns the property (or a portion of it), the LLC is required to provide a PCDS."
},
{
  category: "Property Condition Disclosure",
  question: "Do I need to disclose prior damage that was repaired?",
  answer: "Yes. Even if the damage was repaired with insurance money, buyers have a right to know about prior fires, floods, or other significant events. Any known issues that could affect the property's value or the buyer's decision should be disclosed. Failing to disclose known material defects can expose you to liability."
},

// CO-OPS & CONDOS
{
  category: "Co-ops & Condos",
  question: "What's different about buying a condo?",
  answer: "<strong>[NY]</strong> With a condo, you own the unit plus a share of common elements. Expect a condo application, fees, a possible right of first refusal, and I'll need to review the offering plan and financials. Mortgage recording tax applies to condo loans."
},
{
  category: "Co-ops & Condos",
  question: "What's different about buying a co-op?",
  answer: "<strong>[NY]</strong> You're buying shares in a corporation plus a proprietary lease - there's no deed. There's a board package, interview, and financial/policy review. The upside: no mortgage recording tax on co-op loans. The downsides: UCC filings and building transfer fees apply.",
  popular: true
},
{
  category: "Co-ops & Condos",
  question: "What is a board package and interview?",
  answer: "<strong>[NY]</strong> For co-ops, buyers submit a detailed financial and background package, and the board may conduct an interview. Strong, organized submissions with realistic debt-to-income ratios and sufficient liquidity help approvals."
},
{
  category: "Co-ops & Condos",
  question: "What financial standards do co-ops use?",
  answer: "<strong>[NY]</strong> Boards typically look at debt-to-income ratios, post-closing liquidity (how many months of maintenance and mortgage payments you'll have in reserves), credit history, and employment stability."
},
{
  category: "Co-ops & Condos",
  question: "How long does co-op board approval take?",
  answer: "<strong>[NY]</strong> It varies by building. Some boards meet weekly and can approve quickly, others meet monthly. You'll need to submit a complete application package and attend an interview. Build extra time into your closing target - timing ranges from a few weeks to over a month, plus interview scheduling."
},
{
  category: "Co-ops & Condos",
  question: "What happens if the co-op board rejects my buyer?",
  answer: "<strong>[NY]</strong> If the buyer is denied by the co-op board, the contract deposit is returned to the buyer. The contract is null and void, and neither party has any further claims or obligations. You can then look for a new buyer."
},
{
  category: "Co-ops & Condos",
  question: "What is a co-op or condo flip tax?",
  answer: "<strong>[NY]</strong> A flip tax (also called an option waiver fee) is charged by the co-op or condo when shares or units are transferred. It's typically 2-5% of the sale price and usually paid by the seller. The amount varies by building and is specified in the proprietary lease or offering plan."
},
{
  category: "Co-ops & Condos",
  question: "What is a condo's right of first refusal?",
  answer: "<strong>[NY]</strong> Many condos can either approve the purchaser or exercise a right to purchase the unit on the same terms. Most often they just issue a waiver, but you need to plan for the timing and any associated fees."
},
{
  category: "Co-ops & Condos",
  question: "Do condos have board interviews?",
  answer: "<strong>[NY]</strong> Not usually, though some condos may meet buyers informally. The main gatekeeping device for condos is the right of first refusal."
},
{
  category: "Co-ops & Condos",
  question: "Can I sublet my co-op?",
  answer: "<strong>[NY]</strong> Many co-ops restrict or limit subletting, requiring board approval, minimum owner-occupancy periods, or surcharges. Review the proprietary lease and policies before you buy if this matters to you."
},
{
  category: "Co-ops & Condos",
  question: "Are pets allowed?",
  answer: "Rules vary widely. Many condos and co-ops restrict size, breed, number, or require registration. Confirm the current house rules and any board-approval requirements before you buy. Service animals cannot be prohibited."
},
{
  category: "Co-ops & Condos",
  question: "What is an alteration agreement?",
  answer: "<strong>[NY]</strong> Before renovations, most condos/co-ops require an alteration application, licensed contractors, insurance, and deposits. Work hours, noise levels, and materials can all be regulated."
},
{
  category: "Co-ops & Condos",
  question: "What is a sponsor sale?",
  answer: "<strong>[NY]</strong> A unit sold by the original developer/sponsor. These often have different contract terms and limited representations."
},
{
  category: "Co-ops & Condos",
  question: "How do special assessments work?",
  answer: "Buildings can levy assessments for capital projects or deficits. I'll confirm any current or anticipated assessments and whether the seller or buyer is responsible at closing. Assessments result in extra payments for a fixed term until the HOA raises capital needed for a project."
},
{
  category: "Co-ops & Condos",
  question: "What is an offering plan and why does it matter?",
  answer: "<strong>[NY]</strong> The offering plan and amendments detail rights, restrictions, budgets, engineering reports, and sponsor obligations. I review these for risks and ongoing obligations."
},
{
  category: "Co-ops & Condos",
  question: "How do parking, storage, and amenities transfer?",
  answer: "Rights to parking or storage may be deeded, licensed, or assigned separately and can carry separate fees. I'll confirm whether these rights transfer automatically at closing."
},
{
  category: "Co-ops & Condos",
  question: "What insurance do I need in a condo or co-op?",
  answer: "<strong>[NY]</strong> Condo unit owners typically carry HO-6 coverage; co-op shareholders carry equivalent personal property/liability coverage (similar to \"renter's\" insurance for your property). The building's master policy covers the structure and common areas."
},

// WIRE FRAUD PREVENTION
{
  category: "Wire Fraud Prevention",
  question: "How do I protect myself from wire fraud?",
  answer: "ALWAYS call to verify wiring instructions before sending any money. Cyber criminals hack email accounts and send emails with fake wiring instructions - these emails can be very convincing. Before you initiate any wire transfer, call the title company or my office using a phone number you know is correct (not one from an email) to confirm the wire instructions are accurate.",
  popular: true
},
{
  category: "Wire Fraud Prevention",
  question: "How do I send a wire transfer?",
  answer: "Contact your bank - they'll ask for the routing number, account number, and account name from the wire instructions I provide. Most banks require you to wire from a checking account (not savings), and some banks require you to come into the branch in person. Before you initiate the wire, please call me to confirm the wire instructions are correct."
},

// TITLE, SURVEY & INSURANCE
{
  category: "Title, Survey & Insurance",
  question: "What is title insurance and why do I need it?",
  answer: "Title insurance protects against covered defects like unpaid liens, forged deeds, or recording errors. If you're getting a mortgage, your lender will require you to purchase a lender's policy. Owner's title insurance (which protects you personally) is optional but I strongly recommend it. The premium is a one-time payment at closing.",
  popular: true
},
{
  category: "Title, Survey & Insurance",
  question: "Who pays for title insurance?",
  answer: "Buyers typically pay for their title insurance. Premiums follow fixed rates based on purchase price and loan amount."
},
{
  category: "Title, Survey & Insurance",
  question: "I can't find my title insurance policy. What should I do?",
  answer: "Although it helps me draft a better contract, don't worry if you can't find it - it's not necessary for preparing a contract. It's only needed if the buyer's title company spots an open title issue that requires proof of your title insurance, which is uncommon. But if you find it at any point, please let me know."
},
{
  category: "Title, Survey & Insurance",
  question: "Who orders the title search?",
  answer: "If you're buying, I order the title search (or the title agent does) once contracts are signed. The title report identifies liens, judgments, encroachments, violations, and other issues to clear before closing."
},
{
  category: "Title, Survey & Insurance",
  question: "Do I need a survey?",
  answer: "For houses, a current survey or location drawing helps confirm boundaries, encroachments, and improvements. Condos typically don't need a new survey; co-ops don't involve a deed. Surveys typically cost $800-1,000. Even if your lender says you don't need one, in order for the title company to insure your purchase, unless a recent survey is available, you may need a new one."
},
{
  category: "Title, Survey & Insurance",
  question: "What are common title issues?",
  answer: "Old mortgages that weren't properly satisfied, judgments, mechanics' liens, boundary encroachments, missing releases, estate concerns, and municipal violations are all common. Most are solvable. They usually require time. The more information you provide, the easier the resolution."
},
{
  category: "Title, Survey & Insurance",
  question: "What if a fence or driveway crosses the lot line?",
  answer: "Encroachments can be resolved with boundary agreements, easements, or adjustments. Lenders and title companies may require documented solutions before closing."
},
{
  category: "Title, Survey & Insurance",
  question: "What are municipal searches?",
  answer: "These are searches for permits, certificates of occupancy, violations, and open permits. They help ensure the property's legal use matches its actual physical condition and that there are no issues with compliance."
},
{
  category: "Title, Survey & Insurance",
  question: "What homeowners insurance do I need?",
  answer: "Houses typically require HO-3 or similar; condos need HO-6; co-ops need comparable coverage. Lenders set minimums. Consider riders for valuables or flood coverage."
},
{
  category: "Title, Survey & Insurance",
  question: "Do I need flood insurance?",
  answer: "If the property is in a flood zone and your lender requires it, you must carry flood insurance. Even outside mandatory zones, coverage can be prudent given evolving weather risks."
},

// FINANCING & MORTGAGES
{
  category: "Financing & Mortgages",
  question: "When should I lock my interest rate and for how long?",
  answer: "Coordinate your lock with realistic contract and approval timelines. Typical locks range from 30-60 days with extension options for a fee. Do not lock in before you sign a contract."
},
{
  category: "Financing & Mortgages",
  question: "What is a mortgage commitment letter?",
  answer: "It's a written approval from your lender with stated conditions you must satisfy before closing (e.g., appraisal, income verification, condo/co-op documents). Essentially, it's a commitment to lend assuming everything in your application is true and you continue to cooperate and provide everything requested."
},
{
  category: "Financing & Mortgages",
  question: "What happens if the appraisal comes in low?",
  answer: "Your options include renegotiating the price, increasing your cash contribution, switching loan programs, or exercising an appraisal contingency if you have one. I'll coordinate with your lender and the seller's side."
},
{
  category: "Financing & Mortgages",
  question: "What is a CEMA and how can it save on taxes?",
  answer: "<strong>[NY]</strong> A Consolidation, Extension, and Modification Agreement can reduce your mortgage recording tax when refinancing or purchasing by assigning and consolidating existing debt. Whether it's viable depends on the lender and loan history. Essentially, what happens is a prior mortgage is assigned or extended into a new mortgage so that mortgage tax is only due on the \"new\" money (if any) added to the transaction."
},
{
  category: "Financing & Mortgages",
  question: "What is the mortgage recording tax in NYC?",
  answer: "<strong>[NY]</strong> Loans secured by real property (not co-ops) incur a mortgage recording tax. Rates are tiered and vary by property type and loan amount. I'll estimate the current amounts for you."
},
{
  category: "Financing & Mortgages",
  question: "Can I use gift funds for my down payment?",
  answer: "Often yes, but lenders require a gift letter and documentation of the source and transfer. Some programs have minimum borrower contributions, so check with your lender."
},
{
  category: "Financing & Mortgages",
  question: "What does the bank attorney do at closing?",
  answer: "The lender's attorney represents the bank, prepares the loan documents, confirms title insurance, and disburses funds. I'm there to protect your interests and explain your obligations. The lender's attorney protects the lender."
},
{
  category: "Financing & Mortgages",
  question: "Can I change lenders mid-deal?",
  answer: "It's possible but risky. You may face delays, fees, and re-appraisals. Talk to me about timing and contingencies before switching."
},
{
  category: "Financing & Mortgages",
  question: "What is private mortgage insurance (PMI)?",
  answer: "PMI may be required when your total down payment is below a certain threshold (often 20%). It can be removed or reduced after your equity increases, depending on program rules."
},

// TAXES & CLOSING COSTS
{
  category: "Taxes & Closing Costs",
  question: "What closing costs should I expect as a buyer in NY?",
  answer: "<strong>[NY]</strong> Typical buyer closing costs include: attorney fee ($2,000-$3,000); title insurance premium (based on purchase price); mortgage recording tax (for condos/houses, not co-ops); bank attorney fee; various searches and examinations; survey ($800-1,000); recording fees; mansion tax (if the purchase is $1 million or more); and prorated property taxes. For an $800,000 purchase, expect approximately $12,000-15,000 in closing costs."
},
{
  category: "Taxes & Closing Costs",
  question: "What transfer taxes apply to NYC residential sales?",
  answer: "<strong>[NY]</strong> New York State and New York City impose transfer taxes, paid primarily by the seller, at rates tied to price and property type (approximately 1.4-2% of sale price in NYC). Exact rates can change; I'll provide current estimates."
},
{
  category: "Taxes & Closing Costs",
  question: "What is the mansion tax?",
  answer: "<strong>[NY]</strong> A buyer-paid New York State tax that kicks in at $1 million on a graduated scale. I'll confirm the applicable bracket and amount for your purchase."
},
{
  category: "Taxes & Closing Costs",
  question: "How are property taxes and common charges prorated at closing?",
  answer: "Property taxes are prorated to the closing date so each party pays for their period of ownership. Assuming taxes are paid in advance, the seller receives a credit for the portion after closing. If taxes are paid in arrears, the seller gives a credit to the buyer for the portion before closing. Same goes for water, sewer, and common charges. Final bills may trigger small post-closing adjustments as account records update."
},
{
  category: "Taxes & Closing Costs",
  question: "Why did I receive water/tax bills after the sale?",
  answer: "Agencies sometimes post charges after closing. Your closing documents and prorations determine responsibility. I can help reconcile with the other party if needed."
},
{
  category: "Taxes & Closing Costs",
  question: "Can I do a 1031 exchange?",
  answer: "For qualifying investment property sales, a like-kind exchange may defer federal and state capital gains taxes if strict timelines and rules are met. Engage a qualified intermediary early - this is not something I handle, but I can coordinate with your exchange company or qualified intermediary."
},
{
  category: "Taxes & Closing Costs",
  question: "I'm a foreign seller - what is FIRPTA?",
  answer: "The Foreign Investment in Real Property Tax Act may require the buyer to withhold a portion of the proceeds at closing unless exemptions apply. Coordinate early with your tax advisors and me."
},

// POWER OF ATTORNEY
{
  category: "Power of Attorney",
  question: "Can someone else sign on my behalf if I can't attend closing?",
  answer: "Yes, if you have a valid Power of Attorney (POA). It must be an original document (not a copy), it must grant real estate powers, and the title company must approve it in advance. If the POA is used at closing, an Affidavit of Full Force & Effect will need to be signed and recorded with the deed."
},
{
  category: "Power of Attorney",
  question: "Can a Power of Attorney be challenged?",
  answer: "Yes, anyone can challenge a POA. Common grounds include: the principal's lack of capacity (their ability to understand what they signed), undue influence or coercion, and misuse or abuse of authority by the agent (self-dealing or decisions not in the principal's best interest)."
},

// POST-CLOSING MATTERS
{
  category: "Post-Closing Matters",
  question: "What should the seller bring to closing?",
  answer: "Bring your valid photo ID, all keys to the property, garage door openers and gate remotes, mailbox keys, any access codes or alarm codes, and for co-ops, the original stock certificate and proprietary lease. Before you leave the property, remove all personal belongings and debris, and leave any agreed-upon items and instruction manuals/warranties."
},
{
  category: "Post-Closing Matters",
  question: "What should I do about utility transfers?",
  answer: "As a seller, do NOT turn off gas or electric until after closing. Disconnect automatic utility payments and turn off automatic mortgage deductions before closing. Disregard any tax or water bills you receive before closing - they'll be adjusted at the closing table. As a buyer, contact utility companies to transfer service into your name effective the closing date. If you're not sure about a particular bill, just call me before paying it."
},
{
  category: "Post-Closing Matters",
  question: "I received a letter about ordering a certified copy of my deed. Should I order it?",
  answer: "No - throw that letter away. These are usually solicitations (scams) from third-party companies charging inflated fees for a service you don't need. I'll provide you with a copy of your recorded deed after closing. Even if the original is lost, it's unimportant."
},
{
  category: "Post-Closing Matters",
  question: "How long until the deed is recorded and the title policy arrives?",
  answer: "Recording can take days to weeks depending on county processing. In NY, you'll get your final title policy at closing; in NJ, final title policies are issued after deed recording. I track confirmation and will let you know when everything is complete."
},
{
  category: "Post-Closing Matters",
  question: "What should I keep after closing?",
  answer: "Keep your closing statement, loan documents, deed or stock certificate/lease, title policy, and any warranties or board approvals for future reference."
},
{
  category: "Post-Closing Matters",
  question: "How are open violations handled?",
  answer: "Open building or housing violations can delay closings and may need to be cured or escrowed. I coordinate with title and, for condos/co-ops, management to address them."
},

// INVESTMENT PROPERTY & LANDLORD-TENANT
{
  category: "Investment Property & Landlord-Tenant",
  question: "What does 'subject to' a tenant mean?",
  answer: "When a property is sold 'subject to' a tenant, the tenant stays in place. You become the new landlord and must honor the existing lease terms. The tenant's security deposit should be transferred to you at closing."
},
{
  category: "Investment Property & Landlord-Tenant",
  question: "Can I buy a property with tenants in place?",
  answer: "Yes, but review the leases, rent payment history, and any tenant protections or restrictions. Your contract should address delivery of possession and estoppels as needed."
},
{
  category: "Investment Property & Landlord-Tenant",
  question: "Is short-term renting (like nightly rentals) allowed?",
  answer: "<strong>[NY]</strong> NYC heavily restricts short-term rentals in many buildings and zones. Confirm legality and building rules before purchasing for this purpose."
},
{
  category: "Investment Property & Landlord-Tenant",
  question: "Should I buy in an LLC or my personal name?",
  answer: "There are liability, financing, transfer tax, and cost considerations. Coordinate with your tax advisor and your lender to choose the right structure for your situation."
},
{
  category: "Investment Property & Landlord-Tenant",
  question: "What due diligence is unique for investment property?",
  answer: "Beyond title and physical condition, analyze rent rolls, arrears, regulatory status, violations, certificates of occupancy, and expense trends."
},

// COMMERCIAL & MIXED-USE PROPERTY
{
  category: "Commercial & Mixed-Use Property",
  question: "How do commercial deals differ from residential?",
  answer: "Commercial contracts are more customized, due diligence is deeper, and lender requirements are often stricter. Timelines can be longer and costs much higher."
},
{
  category: "Commercial & Mixed-Use Property",
  question: "What is environmental due diligence (Phase I/II)?",
  answer: "A Phase I ESA screens for Recognized Environmental Conditions and may lead to Phase II testing. Findings affect financing, liability, and deal structure."
},
{
  category: "Commercial & Mixed-Use Property",
  question: "Why are zoning and certificates of occupancy critical?",
  answer: "Legal use must match intended use. I verify the C/O, legal units, parking, signage, and any non-conforming or grandfathered conditions before you waive contingencies."
},
{
  category: "Commercial & Mixed-Use Property",
  question: "What should I look for in a commercial lease?",
  answer: "Rent escalations, pass-throughs, repair responsibilities, exclusive uses, assignment/sublet rights, personal guarantees, and build-out provisions are key negotiation points with significant long-term impact."
},

// ADDITIONAL QUESTIONS
{
  category: "Additional Questions",
  question: "Can I assign or flip a contract?",
  answer: "Assignments are typically restricted in residential deals unless expressly allowed. If permitted, there may be approval requirements and fees. Always address this before you sign."
},
{
  category: "Additional Questions",
  question: "Do first-time homebuyer programs apply in Staten Island?",
  answer: "<strong>[NY]</strong> Several lender and government programs may help with rates or down-payment assistance, subject to eligibility and funding availability. Check current program rules - they change frequently."
},
{
  category: "Additional Questions",
  question: "What if title reveals an old lien or judgment?",
  answer: "Many encumbrances can be resolved with payoffs, satisfactions, or court orders. Complex issues may require more time or targeted curative work before closing, but most are solvable."
}];
*/