import { Hammer } from 'lucide-react';

interface PlaceholderWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PlaceholderWrapper({ children, className = '' }: PlaceholderWrapperProps) {
  return (
    <div className={`relative p-2 ${className}`}>
      {/* Skeleton content */}
      {children}

      {/* Working indicator overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600"
            style={{
              animation: 'spin 1s linear infinite'
            }}
          />
          <div className="bg-white/90 p-3 rounded-full shadow-lg">
            <Hammer className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

