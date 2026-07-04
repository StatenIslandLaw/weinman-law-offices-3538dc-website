'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PhotoCardProps {
  src: string;
  alt: string;
  initialCaption: string;
  onCaptionChange?: (newCaption: string) => void;
}

export default function PhotoCard({
  src,
  alt,
  initialCaption,
  onCaptionChange,
}: PhotoCardProps) {
  const [caption, setCaption] = useState(initialCaption);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);

  const handleEdit = () => {
    setIsEditing(true);
    setTempCaption(caption);
  };

  const handleSave = () => {
    setCaption(tempCaption);
    setIsEditing(false);
    onCaptionChange?.(tempCaption);
  };

  const handleCancel = () => {
    setTempCaption(caption);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={75}
          height={50}
          className="rounded-lg shadow-md object-cover"
        />
      </div>
      {isEditing ? (
        <div className="mt-4 w-full px-2">
          <textarea
            value={tempCaption}
            onChange={(e) => setTempCaption(e.target.value)}
            className="w-full text-sm bg-slate-700 text-gray-100 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:border-blue-400"
            rows={2}
          />
          <div className="flex gap-2 mt-2 justify-center">
            <button
              onClick={handleSave}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-xs bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleEdit}
          className="mt-4 text-sm text-gray-300 cursor-pointer hover:text-blue-300 hover:underline max-w-xs px-2 transition-colors"
          title="Click to edit caption"
        >
          {caption}
        </div>
      )}
    </div>
  );
}
