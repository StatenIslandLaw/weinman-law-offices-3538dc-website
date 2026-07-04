import PlaceholderWrapper from './PlaceholderWrapper';

export default function ValuesPlaceholder() {
  const titleWidths = ['w-4/5', 'w-3/4', 'w-5/6', 'w-2/3'];
  const descriptionLines = [3, 4, 3, 4];
  
  return (
    <PlaceholderWrapper>
      <div className="animate-pulse space-y-8">
        {/* Subtitle skeleton */}
        <div className="flex justify-center">
          <div className="h-6 w-1/2 md:w-1/3 bg-gray-200 rounded" />
        </div>
        
        {/* Cards with organic feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Icon skeleton with gradient */}
              <div className={`h-14 w-14 bg-gradient-to-br ${
                i % 2 === 0 ? 'from-blue-200 to-blue-100' : 'from-gray-300 to-gray-200'
              } rounded-full mb-4`} />
              
              {/* Title skeleton - varied widths */}
              <div className={`h-6 ${titleWidths[i]} bg-gray-300 rounded-lg mb-3`} />
              
              {/* Description skeleton - varied line counts */}
              <div className="space-y-2">
                {Array.from({ length: descriptionLines[i] }).map((_, lineIndex) => (
                  <div 
                    key={lineIndex} 
                    className={`h-4 bg-gray-200 rounded ${
                      lineIndex === descriptionLines[i] - 1 ? 'w-3/5' : 'w-full'
                    }`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlaceholderWrapper>
  );
}

