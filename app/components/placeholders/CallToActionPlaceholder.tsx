import PlaceholderWrapper from './PlaceholderWrapper';

export default function CallToActionPlaceholder() {
  return (
    <PlaceholderWrapper>
      <section className="py-16 bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8 text-center">
            {/* Heading skeleton */}
            <div className="flex justify-center">
              <div className="h-10 w-3/4 md:w-2/3 bg-gray-200 rounded" />
            </div>

            {/* Description skeleton */}
            <div className="flex justify-center">
              <div className="h-6 w-5/6 md:w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-14 w-full sm:w-64 bg-gray-300 rounded-lg" />
              <div className="h-14 w-full sm:w-64 bg-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </PlaceholderWrapper>
  );
}

