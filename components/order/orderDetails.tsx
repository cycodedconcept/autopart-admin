"use client";

import { useOrderStatusQuery, useSingleOrderQuery } from "@/lib/queries";
import { ArrowLeft } from "lucide-react";
import { OrderInfoCard } from "./orderInfoCard";
import { OrderTimeline } from "./orderTimeline";
import { PaymentBreakdown } from "./paymentBreakdown";
import { ActionWithReasonModal } from "../verification/actionWithReason";
import { useState } from "react";

interface OrderProps {
  orderId: number;
  onClose: () => void;
}

const OrderDetails = ({ orderId, onClose }: OrderProps) => {
  const { data } = useSingleOrderQuery(orderId);
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
    if (type === "orderstatus") {
      setModalConfig({
        type: "orderstatus",
        title: "Update Order Status",
        description: ``,
        placeholder: "Enter reason...",
        color: "bg-[#FF7101] border-[#FF7101]",
        label: "Update",
      });
    }
  };
  const updateStatus = useOrderStatusQuery();
  const handleActionConfirmSubmit = (
    reasonText: string,
    type: string,
    status?: string,
  ) => {
    setModalConfig((prev) => ({ ...prev, type: null }));
    if (type === "orderstatus") {
      updateStatus.mutate({
        orderId: orderId,
        status: status || "",
        note: reasonText,
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Back Button Link Header */}
      <button
        className="inline-flex items-center gap-2 text-sm text-navgray hover:text-gray-800 font-medium mb-3 transition-colors cursor-pointer"
        onClick={onClose}
      >
        <ArrowLeft size={14} />
        <span>Back to orders</span>
      </button>

      {/* Main Multi-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Core Info & Pricing */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {data?.data && <OrderInfoCard order={data?.data} />}

          {data?.data && <PaymentBreakdown payment={data?.data?.items[0]} />}
        </div>

        {/* Center Column: Interactive Timeline Status Track */}
        <div className="lg:col-span-1">
          {data?.data && <OrderTimeline order={data?.data?.statusHistory} />}
        </div>

        {/* Right Column: Dynamic Action Operators */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-lightborder rounded-lg p-4 space-y-2">
            <span className="text-sm font-medium text-lighttext  block mb-4 uppercase">
              Actions
            </span>
            <button className="w-full py-2.5 px-4 border border-[#E7000B] text-white bg-[#E7000B] hover:bg-[#ce0505] cursor-pointer  rounded-lg text-sm font-medium transition-all">
              Cancel Order
            </button>
            <button className="w-full py-2.5 px-4 border border-lightborder text-navgray hover:bg-slate-50 rounded-lg text-sm cursor-pointer font-medium transition-all">
              Flag Order
            </button>
            <button
              className="w-full py-2.5 px-4 border border-aorange text-white bg-aorange hover:bg-[#e66604] rounded-lg text-sm cursor-pointer font-medium transition-all"
              onClick={() => openReasonModal("orderstatus")}
            >
              Change Status
            </button>
          </div>
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

export default OrderDetails;
