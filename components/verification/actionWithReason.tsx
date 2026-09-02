import { ActionWithReasonModalProps } from "@/types/verification";
import { X } from "lucide-react";
import { useState } from "react";

export const ActionWithReasonModal: React.FC<ActionWithReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  type,
  description,
  placeholderText,
  confirmButtonColor,
  confirmLabel,
}) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const isButtonDisabled = (title === "Reject Seller" ) && !reason.trim();

  const handleConfirmSubmit = () => {
    if (isButtonDisabled) return;
    onConfirm(reason, type);
    setReason(''); // Reset text field field layer
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-in fade-in duration-150">
      {/* Dimmed Background Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-11/12 md:w-115 max-w-full p-6 relative z-10 text-left animate-in zoom-in-95 duration-150">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>

        {/* Text Headers Block */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-dark">{title}</h3>
          <p className="text-sm text-navgray mt-2">{description}</p>
        </div>

        {/* Reason Textarea Field Entry */}
       {(title === "Reject Seller" || title === "Suspend Seller"  )&& <div className="mb-6">
        
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={placeholderText}
            rows={3}
            className="w-full p-3 text-sm bg-white border border-lightborder rounded-lg focus:outline-none focus:border-orange-400 transition-colors placeholder-dark/50 resize-none text-dark"
          />
        </div>}

        {/* Action Controls Footer Button Bar */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-navgray bg-white border border-lightborder rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSubmit}
            disabled={isButtonDisabled}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg  transition-all ${confirmButtonColor} ${
              isButtonDisabled ? 'opacity-40 cursor-not-allowed shadow-none' : 'hover:brightness-95 active:brightness-90'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
