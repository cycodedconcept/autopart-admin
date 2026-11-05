import React from "react";
import { X } from "lucide-react"; // Assumed icon library based on your setup

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentUrl: string; // Add the raw path string here
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
  documentUrl,
}) => {
  if (!isOpen) return null;

  // 1. Convert the raw server path into a viewable browser URL
  const getCleanImageUrl = (path: string): string => {
    if (!path) return "";
    const startIndex = path.indexOf("autoparts");
    return startIndex !== -1 ? `https://${path.substring(startIndex)}` : path;
  };

  const formattedSrc = getCleanImageUrl(documentUrl);
console.log(formattedSrc)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-110 max-w-full relative z-10 flex flex-col items-stretch overflow-hidden animate-in zoom-in-95 duration-150 text-left">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900 tracking-tight">
            {documentTitle}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Document View Frame */}
        <div className="p-4 bg-gray-50 flex flex-col items-center justify-center border-b border-gray-100 min-h-55 max-h-100 overflow-y-auto">
          {formattedSrc ? (
            <img
              src={formattedSrc}
              alt={documentTitle}
              className="max-w-full h-auto rounded-lg object-contain shadow-sm border border-gray-200"
              onError={(e) => {
                // Fallback UI configuration if the image URL returns a 404
                // e.currentTarget.style.display = "none";
                console.error("Image failed to load:", formattedSrc);
                
              }}
            />
          ) : (
            <p className="text-xs font-semibold text-gray-400">
              No preview file path provided
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white flex items-center justify-center">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
