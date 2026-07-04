import PlaceholderWrapper from './PlaceholderWrapper';

export default function ServiceAreaPlaceholder() {
  return (
    <PlaceholderWrapper>
      <div className="animate-pulse space-y-6">
        {/* "We Serve:" heading */}
        <div className="h-8 w-32 bg-gray-300 rounded-lg" />
        
        {/* Location list items */}
        <ul className="space-y-3">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-3">
              {/* Icon skeleton */}
              <div className="h-6 w-6 bg-blue-200 rounded-full flex-shrink-0" />
              {/* Location text skeleton - varied widths */}
              <div className={`h-5 ${i === 1 ? 'w-48' : i === 2 ? 'w-40' : 'w-44'} bg-gray-200 rounded`} />
            </li>
          ))}
        </ul>

        {/* Note box skeleton */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-5 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </PlaceholderWrapper>
  );
}

