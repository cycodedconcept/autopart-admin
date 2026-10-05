import React, { useEffect, useRef, useState } from "react";
import { FileImage, ImagePlus, X } from "lucide-react";

interface SidebarCardProps {
  title: string;
  children: React.ReactNode;
}

interface ImageUploadZoneProps {
  initialImageUrl?: string;
  onImageChange?: (file: File | null) => void;
}

export const SidebarCard: React.FC<SidebarCardProps> = ({
  title,
  children,
}) => (
  <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm space-y-3">
    <h3 className="text-xs font-bold text-gray-700 border-b border-gray-50 pb-2">
      {title}
    </h3>
    {children}
  </div>
);

// Specific subcomponent implementation: Dropzone
export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ 
  initialImageUrl, 
  onImageChange 
}) => {
  // 1. Create a direct DOM reference pointer for the input node element
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);

  useEffect(() => {
    if (initialImageUrl) setPreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop any parent form layout actions
    e.stopPropagation(); // Prevent bubbling up to any wrapping interactive grids
    
    // 2. Programmatically fire the native browser click stream on the hidden input node
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      if (onImageChange) onImageChange(file);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the image picker window from popping up immediately after deleting
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onImageChange) onImageChange(null);
  };

  return (
    <div className="relative group w-full">
      {/* 3. Natively hidden upload element with direct reference handle pointer */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden"
        onClick={(e) => e.stopPropagation()} // Stop native input click recursive loops
      />

      {previewUrl ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
          <img 
            src={previewUrl} 
            alt="Featured banner preview" 
            className="w-full h-full object-cover"
          />
          {/* Ensure type="button" is explicitly declared here */}
          <button
            type="button"
            onClick={handleClearImage}
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white rounded-full transition-colors shadow z-10"
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
        /* Empty Interactive Drag / Click Upload Target State Card */
        <div 
          onClick={handleCardClick}
          className="border border-dashed border-gray-200 hover:border-orange-400 rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-gray-50/50 cursor-pointer transition-colors group select-none"
        >
          <div className="p-2 bg-white rounded-md shadow-sm border border-gray-100 text-gray-400 group-hover:text-orange-500 transition-colors">
            <ImagePlus size={18} />
          </div>
          <p className="text-[11px] font-medium text-gray-600 text-center">
            Click to choose file <br/>
            <span className="text-gray-400 font-normal">Aspect ratio 16:9 recommended</span>
          </p>
        </div>
      )}
    </div>
  );
};

