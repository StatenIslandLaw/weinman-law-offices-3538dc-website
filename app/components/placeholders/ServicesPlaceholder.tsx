import PlaceholderWrapper from './PlaceholderWrapper';

export default function ServicesPlaceholder() {
  const cardWidths = ['w-3/4', 'w-2/3', 'w-4/5', 'w-5/6', 'w-3/4', 'w-4/6'];
  const iconSizes = ['h-12 w-12', 'h-14 w-14', 'h-10 w-10', 'h-12 w-12', 'h-11 w-11', 'h-13 w-13'];
  
  return (
    <PlaceholderWrapper>
      <div className="animate-pulse space-y-8">
        {/* Subtitle skeleton */}
        <div className="flex justify-center">
          <div className="h-6 w-2/3 md:w-1/2 bg-gray-200 rounded" />
        </div>
        
        {/* Cards with varied layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                i % 3 === 0 ? 'md:col-span-1' : ''
              }`}
            >
              {/* Icon skeleton - varied sizes */}
              <div className={`${iconSizes[i]} bg-gradient-to-br from-gray-300 to-gray-200 rounded-2xl mb-4`} />
              {/* Title skeleton - varied widths */}
              <div className={`h-6 ${cardWidths[i]} bg-gray-300 rounded-lg mb-3`} />
              {/* Description skeleton - varied lengths */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className={`h-4 ${i % 2 === 0 ? 'w-4/5' : 'w-3/4'} bg-gray-200 rounded`} />
                {i % 3 === 0 && <div className="h-4 w-2/3 bg-gray-200 rounded" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlaceholderWrapper>
  );
}

