'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  images: string[];
  captions: string[];
}

export default function PhotoCarousel({ images, captions }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
    prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      {/* Main carousel */}
      <div className="relative bg-slate-800/50 rounded-xl overflow-hidden mb-8">
        {/* Image container */}
        <div className="relative w-full h-96 md:h-[500px] flex items-center justify-center bg-slate-900">
          <Image
            src={images[currentIndex]}
            alt={captions[currentIndex]}
            fill
            className="object-contain"
            priority />

        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Previous image">

          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Next image">

          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Caption */}
      <div className="bg-slate-800 rounded-lg p-6 mb-8 text-center">
        <p className="text-lg text-gray-200 font-medium"></p>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-3 overflow-x-auto pb-4 justify-center flex-wrap">
        {images.map((image, index) =>
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
          index === currentIndex ?
          'border-blue-500 scale-110' :
          'border-slate-600 hover:border-slate-400'}`
          }>

            <Image
            src={image}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-cover" />

          </button>
        )}
      </div>
    </div>);

}