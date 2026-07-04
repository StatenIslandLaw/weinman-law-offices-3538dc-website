'use client';

import { useEffect, useState, useRef } from 'react';

interface ImageEditDialogProps {
  isOpen: boolean;
  currentSrc: string;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

interface SiteImage {
  id: number;
  full_url: string;
  thumbnail_url: string | null;
  filename: string;
  description: string | null;
}

// Helper to make postMessage calls to parent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callParentApi = <T,>(type: string, payload?: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    const messageId = Date.now() + Math.random();
    
    const handleResponse = (event: MessageEvent) => {
      if (event.data.messageId === messageId && event.data.type === `${type}Response`) {
        window.removeEventListener('message', handleResponse);
        
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else {
          resolve(event.data.payload);
        }
      }
    };
    
    window.addEventListener('message', handleResponse);
    
    // Timeout after 30 seconds
    setTimeout(() => {
      window.removeEventListener('message', handleResponse);
      reject(new Error('Request timeout'));
    }, 30000);
    
    window.parent.postMessage({
      type,
      messageId,
      payload
    }, '*');
  });
};

export default function ImageEditDialog({ isOpen, currentSrc, onClose, onSelect }: ImageEditDialogProps) {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch images when dialog opens
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await callParentApi<{ site_images: SiteImage[] }>('listSiteImages', {
          page: 1,
          perPage: 100
        });
        setImages(response.site_images);
      } catch (err) {
        console.error('Failed to fetch images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, [isOpen]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      for (const file of Array.from(files)) {
        // Convert file to base64 data URL
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const newImage = await callParentApi<SiteImage>('uploadImage', {
          file: base64
        });

        setImages(prev => [newImage, ...prev]);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Select Image</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading images...</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {/* Upload Button */}
              <div className="relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="aspect-square w-full bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg transition-all flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                      <span className="text-xs text-gray-500">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-xs text-gray-500">Upload Image</span>
                    </>
                  )}
                </button>
              </div>

              {/* Image Items */}
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:border-blue-400"
                  onClick={() => onSelect(image.full_url)}
                >
                  <div className="aspect-square bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.thumbnail_url || image.full_url}
                      alt={image.description || image.filename}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Current image indicator */}
                  {currentSrc === image.full_url && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm bg-blue-500 px-3 py-1 rounded">Select</span>
                  </div>
                  
                  {/* Filename tooltip */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">{image.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
