import { DocumentPreviewModalProps } from "@/types/verification";
import { FileText, X } from "lucide-react";

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ isOpen, onClose, documentTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-in fade-in duration-150">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-110 max-w-full relative z-10 flex flex-col items-stretch overflow-hidden animate-in zoom-in-95 duration-150 text-left">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900 tracking-tight">{documentTitle}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-12 bg-gray-50 flex flex-col items-center justify-center gap-2 border-b border-gray-100 min-h-55">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-gray-400">
            <FileText size={24} />
          </div>
          <p className="text-xs font-semibold text-gray-400 mt-2 tracking-wide">Document preview</p>
          <p className="text-[10px] text-gray-400">placeholder</p>
        </div>
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
  )}