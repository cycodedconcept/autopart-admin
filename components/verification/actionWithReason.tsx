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
  const [reason, setReason] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  if (!isOpen) return null;

  const isButtonDisabled =
    (title === "Reject Seller" && !reason.trim()) ||
    (type === "orderstatus" && !reason) ||
    (type === "disputestatus" && !reason);

  const handleConfirmSubmit = () => {
    if (isButtonDisabled) return;
    onConfirm(reason, type, orderStatus);
    setReason(""); // Reset text field field layer
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-in fade-in duration-150">
      {/* Dimmed Background Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

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
        {type === "orderstatus" && (
          <div className="relative inline-block w-full mb-3">
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full appearance-none rounded-lg border border-lightborder bg-white px-4 py-2.5 pr-10 text-sm font-medium text-gray-700  transition-all  focus:outline-none focus:ring-2 focus:ring-aorange disabled:bg-gray-50"
            >
              <option value="cancelled">Cancelled</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
              <option value="disputed">Disputed</option>
              <option value="in_transit">In transit</option>
              <option value="pending_payment">Pending Payment</option>
              <option value="picked_up">Picked Up</option>
            </select>
            {/* Custom Dropdown Chevron Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        )}

        {(title === "Reject Seller" ||
          title === "Suspend Seller" ||
          title === "Update Order Status" ||
          type === "disputestatus") && (
          <div className="mb-6">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={placeholderText}
              rows={3}
              className="w-full p-3 text-sm bg-white border border-lightborder rounded-lg focus:outline-none focus:border-orange-400 transition-colors placeholder-dark/50 resize-none text-dark"
            />
          </div>
        )}

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
              isButtonDisabled
                ? "opacity-40 cursor-not-allowed shadow-none"
                : "hover:brightness-95 active:brightness-90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
