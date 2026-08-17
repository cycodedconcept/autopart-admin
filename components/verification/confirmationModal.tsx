import { ConfirmationModalProps } from "@/types/verification";
import { X } from "lucide-react";

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-in fade-in duration-150">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-100 max-w-full p-6 relative z-10 text-left animate-in zoom-in-95 duration-150">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
          <X size={16} />
        </button>
        <div className="mb-6">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">Flag for Review</h3>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            This seller will be flagged for further review.
          </p>
        </div>
        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-xs font-semibold text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-600 shadow-sm transition-colors"
          >
            Flag
          </button>
        </div>
      </div>
    </div>
  );
};
