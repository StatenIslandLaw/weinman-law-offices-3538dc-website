import PlaceholderWrapper from './PlaceholderWrapper';

interface TextPlaceholderProps {
  lines?: number;
  paragraphs?: number;
  className?: string;
}

export default function TextPlaceholder({ lines = 2, paragraphs = 1, className = '' }: TextPlaceholderProps) {
  const linesPerParagraph = Math.ceil(lines / paragraphs);
  
  return (
    <PlaceholderWrapper className={className}>
      <div className={`animate-pulse ${paragraphs > 1 ? 'space-y-4' : 'space-y-2'}`}>
        {Array.from({ length: paragraphs }).map((_, pIndex) => (
          <div key={pIndex} className="space-y-2">
            {Array.from({ length: linesPerParagraph }).map((_, lIndex) => {
              const isLastLineInParagraph = lIndex === linesPerParagraph - 1;
              return (
                <div 
                  key={lIndex} 
                  className={`h-6 bg-gray-200 rounded ${
                    isLastLineInParagraph ? 'w-5/6' : 'w-full'
                  }`} 
                />
              );
            })}
          </div>
        ))}
      </div>
    </PlaceholderWrapper>
  );
}

