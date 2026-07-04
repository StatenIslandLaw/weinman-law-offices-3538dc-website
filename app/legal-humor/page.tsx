import React from 'react';
import DesktopMarginWrapper from '../components/DesktopMarginWrapper';
import Breadcrumbs from '../components/Breadcrumbs';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

const videos: VideoItem[] = [
{
  id: '1hbW8FtSoj4',
  title: 'Title Issues',
  description: 'A humorous take on the complexities and common problems that arise with property title issues in real estate transactions.',
  url: 'https://www.youtube.com/watch?v=1hbW8FtSoj4&t=28s'
},
{
  id: 'ybXOEez-k0o',
  title: 'The Fee',
  description: 'An entertaining look at attorney fee discussions and client expectations in real estate transactions.',
  url: 'https://www.youtube.com/watch?v=ybXOEez-k0o'
},
{
  id: 'HiPFGGqhaj4',
  title: 'The Expiring Rate',
  description: 'A satirical cartoon about mortgage rate locks expiring and the pressure it puts on all parties in a transaction.',
  url: 'https://www.youtube.com/watch?v=HiPFGGqhaj4&t=21s'
},
{
  id: 'VSRadA8a4oA',
  title: "Seller's Concession",
  description: "A comedic exploration of seller concessions and how they're negotiated (or misunderstood) in real estate deals.",
  url: 'https://www.youtube.com/watch?v=VSRadA8a4oA'
},
{
  id: 'ouW6vtD8oIw',
  title: 'Victim of Mortgage Fraud',
  description: 'A serious topic presented with humor - understanding mortgage fraud and its consequences for all parties involved.',
  url: 'https://www.youtube.com/watch?v=ouW6vtD8oIw'
},
{
  id: '5tJrJfTkl4A',
  title: 'Creditor Claim',
  description: 'An amusing perspective on creditor claims and how they can complicate real estate transactions.',
  url: 'https://www.youtube.com/watch?v=5tJrJfTkl4A'
},
{
  id: '0ADB7aHybXA',
  title: 'The Loan Modification',
  description: 'A lighthearted look at the loan modification process and the challenges it presents in real estate law.',
  url: 'https://www.youtube.com/watch?v=0ADB7aHybXA'
},
{
  id: 'vXSYzFzWLUg',
  title: 'No Certificates of Occupancy Prior to 1938',
  description: 'A humorous examination of the challenges when dealing with older properties that lack proper documentation.',
  url: 'https://www.youtube.com/watch?v=vXSYzFzWLUg'
}];


export const metadata = {
  title: 'Legal Humor - Attorney Cartoons | Weinman Law',
  description: 'Entertaining and educational cartoons about real estate law, created by attorney Pete Weinman. Popular with attorneys and clients alike.',
  openGraph: {
    siteName: "Pete Weinman, Esq.",
  },
};

export default function LegalHumorPage() {
  return (
    <DesktopMarginWrapper>
      <>
        <GoogleAnalytics measurementId="G-C9WLVZKQW4" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <Breadcrumbs items={[{ name: 'Legal Humor', url: '/legal-humor' }]} />
          </div>

          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 sm:pt-20 md:pt-24">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 flex justify-center">
                  <div className="px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full inline-block">
                    <span className="text-amber-300 text-sm font-semibold tracking-wide flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      ATTORNEY CARTOONS
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Legal Humor Videos
                </h1>

                <p className="text-xl text-slate-200 mb-6 leading-relaxed">
                  Educational cartoons about real estate law that make complex legal concepts entertaining and memorable. Popular with attorneys and clients alike!
                </p>

                <p className="text-sm text-amber-300/90 italic">
                  All scripts written and cartoons created by Pete Weinman
                </p>
              </div>
            </div>
            <div className="h-8 bg-gradient-to-b from-transparent to-slate-900/50"></div>
          </section>

          {/* Videos Grid */}
          <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {videos.map((video) =>
                <div
                  key={video.id}
                  className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all shadow-lg hover:shadow-xl">

                    {/* Video Embed */}
                    <div className="relative aspect-video bg-slate-900">
                      <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full">
                    </iframe>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-amber-400 mb-3">{video.title}</h3>
                      <p className="text-slate-200 text-base leading-relaxed mb-4">
                        {video.description}
                      </p>
                      <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">

                        <Play className="h-4 w-4" />
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-6 inline-block px-6 py-2 bg-amber-500/20 border-2 border-amber-400/40 rounded-full">
                <span className="text-amber-300 text-sm font-semibold tracking-wide">
                  ENJOY THE VIDEOS?
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Share the Legal Humor
              </h2>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">If you enjoyed these cartoons, share them with friends, attorneys, or anyone navigating real estate transactions. For serious legal matters, we're here to help!

              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/faqs"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">

                  Browse FAQs
                </a>
                <a
                  href="/"
                  className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">

                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </>
    </DesktopMarginWrapper>);

}