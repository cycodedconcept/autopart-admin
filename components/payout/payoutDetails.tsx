import { PaymentCard } from "./paymentCard";
import { OrderBreakdownTable } from "./orderTable";
import { PayoutActionPanel } from "./payoutAction";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SellerInfo } from "./sellerInfo";
import { DisputeCard } from "./disputeCard";
import { ActionWithReasonModal } from "../verification/actionWithReason";
import { useUpdatePayoutMutation } from "@/lib/queries";
import { PayoutRecord } from "@/types/payout";

interface PayoutCard {
  payout: PayoutRecord | null;
  onClose: () => void;
}
const PayoutDetails = ({ payout, onClose }: PayoutCard) => {
  const [isPending, setIspending] = useState(false);
  const handleApprove = () => {
    openReasonModal("approve payout");
  };

  const handleHold = () => {
    openReasonModal("hold");
  };
  const handleReject = () => {
    openReasonModal("reject payout");
  };

  const [modalConfig, setModalConfig] = useState<{
    type: string | null;
    title: string;
    description: string;
    placeholder?: string;
    color?: string;
    label: string;
  }>({
    type: null,
    title: "",
    description: "",
    placeholder: "",
    color: "",
    label: "",
  });

  const openReasonModal = (type: string) => {
    if (type === "approve payout") {
      setModalConfig({
        type: "approve payout",
        title: "Approve Payout Status",
        description: ``,
        placeholder: "Enter reason...",
        color: "bg-[#FF7101] border-[#FF7101]",
        label: "Approve",
      });
    } else if (type === "reject payout") {
      setModalConfig({
        type: "reject payout",
        title: "Reject Payment",
        description: `Are you sure you want to reject payment?`,
        placeholder: "Enter reason...",
        color: "bg-[#DC2626] border-[#DC2626]",
        label: "Reject",
      });
    }
  };
  const updateStatus = useUpdatePayoutMutation();
  const handleActionConfirmSubmit = (
    reasonText: string,
    type: string,
    status?: string,
  ) => {
    setModalConfig((prev) => ({ ...prev, type: null }));
    if (!payout?.id) {
      return;
    }

    if (type === "approve payout") {
      updateStatus.mutate({
        id: payout?.id,
        status: "approved",
        note: reasonText,
      });
    } else if (type === "reject payout") {
      updateStatus.mutate({
        id: payout?.id,
        status: "rejected",
        note: reasonText,
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-medium text-dark">Payout Approvals</h1>
        <p className="text-xs text-navgray mt-0.5">
          Review and approve seller payout requests
        </p>
      </div>
      <button
        className="inline-flex items-center gap-2 text-sm text-navgray hover:text-gray-800 font-medium mb-3 transition-colors cursor-pointer"
        onClick={onClose}
      >
        <ArrowLeft size={14} />
        <span>Back to payouts</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
        <div className=" space-y-4">
          {/* Seller Info panel & Payout Breakdown Card go here */}
          <SellerInfo info={payout} />

          <PaymentCard
            grossAmountKobo={payout?.grossAmountKobo || 0}
            commissionKobo={payout?.commissionAmountKobo || 0}
          />
        </div>
        <OrderBreakdownTable orders={payout?.items || []} />
        <div className="space-y-4">
          <DisputeCard dispute={[]} />

          <PayoutActionPanel
            isProcessing={isPending}
            onApprove={handleApprove}
            onHold={handleHold}
            onRejectConfirm={handleReject}
          />
        </div>
      </div>
      <ActionWithReasonModal
        isOpen={modalConfig.type !== null}
        onClose={() => setModalConfig((prev) => ({ ...prev, type: null }))}
        onConfirm={handleActionConfirmSubmit}
        title={modalConfig.title}
        type={modalConfig.type ?? ""}
        description={modalConfig.description}
        placeholderText={modalConfig?.placeholder ?? ""}
        confirmButtonColor={modalConfig?.color ?? ""}
        confirmLabel={modalConfig.label}
      />
    </div>
  );
};

export default PayoutDetails;
