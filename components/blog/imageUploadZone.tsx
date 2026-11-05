'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ImagePlus, X, FileImage } from 'lucide-react';

interface ImageUploadZoneProps {
  initialImageUrl?: string;
  onImageChange?: (file: File | null) => void;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ 
  initialImageUrl, 
  onImageChange 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);

  // Sync with changes from parent initial data loads
  useEffect(() => {
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleCardClick = () => {
    // Programmatically open the hidden file input window
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 1. Create a local temporary blob URL string to render the preview
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // 2. Pass the raw file object back up to your parent form submission data tree
      if (onImageChange) onImageChange(file);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from triggering the file selector open again
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onImageChange) onImageChange(null);
  };

  return (
    <div className="relative group">
      {/* Hidden native system file picker */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {previewUrl ? (
        /* Image Preview State Layer Container */
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
          <img 
            src={previewUrl} 
            alt="Featured banner preview" 
            className="w-full h-full object-cover"
          />
          {/* Dismiss Revert Button */}
          <button
            type="button"
            onClick={handleClearImage}
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white rounded-full transition-colors shadow"
          >
            <X size={12} />
          </button>
          
          <div 
            onClick={handleCardClick}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 text-white text-xs font-semibold cursor-pointer transition-opacity"
          >
            <FileImage size={14} />
            <span>Change Image</span>
          </div>
        </div>
      ) : (
        /* Empty Interactive Drag / Click Upload Target State */
        <div 
          onClick={handleCardClick}
          className="border border-dashed border-gray-200 hover:border-orange-400 rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-gray-50/50 cursor-pointer transition-colors group"
        >
          <div className="p-2 bg-white rounded-md shadow-sm border border-gray-100 text-gray-400 group-hover:text-orange-500 transition-colors">
            <ImagePlus size={18} />
          </div>
          <p className="text-[11px] font-medium text-gray-600 text-center select-none">
            Click to choose file <br/>
            <span className="text-gray-400 font-normal">Aspect ratio 16:9 recommended</span>
          </p>
        </div>
      )}
    </div>
  );
};
