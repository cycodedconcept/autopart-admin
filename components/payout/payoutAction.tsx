"use client";

import { useState } from "react";

interface PayoutActionPanelProps {
  isProcessing: boolean;
  onApprove: () => void;
  onHold: () => void;
  onRejectConfirm: () => void;
}

export function PayoutActionPanel({
  isProcessing,
  onApprove,
  onHold,
  onRejectConfirm,
}: PayoutActionPanelProps) {
  const [activeView, setActiveView] = useState<"menu" | "reject">("menu");
  const [reason, setReason] = useState("");

  if (activeView === "reject") {
    return (
      <div className="w-full bg-white border border-neutral-200/60 rounded-xl p-5 shadow-sm space-y-4 transition-all">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Reason for rejection
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isProcessing}
            placeholder="Provide clarity on missing delivery logs or discrepancies..."
            className="w-full min-h-22.5 px-3 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={!reason.trim() || isProcessing}
            // onClick={() => onRejectConfirm(reason)}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Confirm reject
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => {
              setActiveView("menu");
              setReason("");
            }}
            className="w-full py-2 text-xs font-medium text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-lightborder rounded-lg p-4 flex flex-col gap-3">
      <h4 className="text-xl font-medium text-dark select-none mb-1">
        Actions
      </h4>
      {/* Approve Payout button wrapper */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={onApprove}
        className="w-full py-2.5 px-4 bg-[#E8FFF4] hover:bg-emerald-100/80 text-[#085041] font-medium text-sm rounded-lg transition-colors cursor-pointer"
      >
        Approve payout
      </button>

      {/* Hold & Flag button wrapper */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={onHold}
        className="w-full py-2.5 px-4 bg-[#FEF9C3] hover:bg-amber-100/80 text-[#713F12] font-medium text-sm rounded-lg  transition-colors cursor-pointer"
      >
        Hold & flag
      </button>

      {/* Slide open reject text area menu trigger */}
      <button
        type="button"
        disabled={isProcessing}
        // onClick={() => setActiveView("reject")}
        onClick={onRejectConfirm}
        className="w-full py-2.5 px-4 bg-[#FFF1F1] hover:bg-rose-100/80 text-[#791F1F] font-medium text-sm rounded-lg transition-colors cursor-pointer"
      >
        Reject
      </button>
    </div>
  );
}
