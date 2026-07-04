import PlaceholderWrapper from './PlaceholderWrapper';

export default function WhyChooseThisBusinessPlaceholder() {
  return (
    <PlaceholderWrapper className="space-y-8">
      <div className="space-y-8 animate-pulse">
        {/* Description skeleton */}
        <div>
          <div className="h-6 w-full bg-gray-200 rounded mb-2" />
          <div className="h-6 w-5/6 bg-gray-200 rounded" />
        </div>

        {/* Benefits list skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-lg" />
              <div className="ml-4 flex-1">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlaceholderWrapper>
  );
}