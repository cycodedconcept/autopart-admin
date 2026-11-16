import React, { useState } from "react";
import { X, ShieldAlert, AlertTriangle, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SuspendSellerModalProps {
  sellerId: number;
  businessName: string;
  onClose: () => void;
}

export const SuspendSellerModal: React.FC<SuspendSellerModalProps> = ({
  sellerId,
  businessName,
  onClose,
}) => {

  const [reasonText, setReasonText] = useState("");
  const suspendMutation = useMutation({
    mutationFn: async (reason: string) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/sellers/${sellerId}/suspend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        },
      );
      if (!response.ok) throw new Error("Failed to suspend vendor account.");
      return response.json();
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["sellers"] });
      // queryClient.invalidateQueries({ queryKey: ["seller", sellerId] });
      onClose();
    },
    onError: (err: any) =>
      alert(err.message || "Error executing suspension request."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    suspendMutation.mutate(reasonText);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-lightborder rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left font-sans">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert size={16} className="text-red-500" />
            <span>Suspend {businessName}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-transparent border-none p-0 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex items-start gap-2.5 text-xs text-red-700">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p>
              Suspending this vendor hides all active inventory parts from
              public marketplace channels immediately.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              Reason for Suspension
            </label>
            <textarea
              required
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="Provide explicit justification text detailing why this merchant storefront is being suspended..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg p-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 resize-none bg-gray-50/50 text-gray-800"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              // disabled={suspendMutation.isPending}
              className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={suspendMutation.isPending}
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all flex items-center gap-2 min-w-32.5 justify-center cursor-pointer disabled:opacity-50"
            >
              {suspendMutation.isPending ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  <span>Suspending...</span>
                </>
              ) : (
                <span>Confirm Suspension</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
