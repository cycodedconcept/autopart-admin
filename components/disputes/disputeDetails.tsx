"use client";

import { useState } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import CurrencyFormat from "../atoms/currencyFormat";
import { CountdownTimer } from "../atoms/countdownTimer";
import { StatusBadge } from "../atoms/statusBadge";
import { useDisputeStatusQuery, useSingleDisputeQuery } from "@/lib/queries";
import { ActionWithReasonModal } from "../verification/actionWithReason";
import { Dispute } from "@/types/dispute";
import { formatDateLabelYear } from "../atoms/formatDate";
import { formatSlaTime } from "../atoms/formatSlaTime";

interface DisputeProps {
  disputeId: number;
  disputes: Dispute[];
  onClose: () => void;
}

export const DisputeDetails = ({
  disputeId,
  disputes,
  onClose,
}: DisputeProps) => {
  const [timerValue, setTimerValue] = useState("");
  const { data } = useSingleDisputeQuery(disputeId);
  const [modalConfig, setModalConfig] = useState<{
    type: string | null;
    title: string;
    description: string;
    placeholder?: string;
    status?: string;
    color?: string;
    label: string;
  }>({
    type: null,
    title: "",
    description: "",
    placeholder: "",
    status: "",
    color: "",
    label: "",
  });

  const openReasonModal = (type: string, status: string) => {
    if (type === "disputestatus" && status === "resolve") {
      setModalConfig({
        type: "disputestatus",
        title: "Resolve Dispute",
        description: ``,
        status: "resolved",
        placeholder: "Enter reason...",
        color: "bg-[#FF7101] border-[#FF7101]",
        label: "Resolve",
      });
    }
    if (type === "disputestatus" && status === "reject") {
      setModalConfig({
        type: "disputestatus",
        title: "Reject Dispute",
        status: "rejected",
        description: ``,
        placeholder: "Enter reason...",
        color: "bg-[#FB3636] border-[#FB3636]",
        label: "Reject",
      });
    }
  };
  const updateStatus = useDisputeStatusQuery();
  const handleActionConfirmSubmit = (
    reasonText: string,
    type: string,
    status?: string,
  ) => {
    if (type === "disputestatus") {
      updateStatus.mutate({
        disputeId: disputeId,
        status: modalConfig.status || "",
        note: reasonText,
      });
    }
    setModalConfig((prev) => ({ ...prev, type: null }));
  };

  // Local state for the dynamic radio group and checkbox form options
  const [rulingDecision, setRulingDecision] = useState("refund-buyer");
  const [requireReturn, setRequireReturn] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  const getDispute = disputes?.find((each) => each.id === disputeId);
  console.log(getDispute);
  const infoItems = [
    { label: "Order ID", value: getDispute?.id, isMono: true },
    { label: "Date", value: formatDateLabelYear(getDispute?.createdAt ?? "") },
    { label: "Buyer", value: getDispute?.buyer?.fullName },
    { label: "Seller", value: getDispute?.sellerBusinessName },
    { label: "Raised By", value: getDispute?.raisedBy },
    {
      label: "Delivery Status",
      value: <StatusBadge status={getDispute?.order?.status || ""} />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button Link Header */}
      <button
        className="inline-flex items-center gap-2 text-sm text-navgray hover:text-gray-800 font-medium mb-3 transition-colors cursor-pointer"
        onClick={onClose}
      >
        <ArrowLeft size={14} />
        <span>Back to disputes</span>
      </button>
      {/* Main Multi-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Left Column: Core Dispute Info & Order Value */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Dispute Information Card */}
          <div className="bg-white border border-lightborder rounded-lg p-4 relative">
            <div className="flex justify-between items-start mb-4 capitalize">
              <h2 className="text-sm font-medium text-dark pb-1">
                Dispute Information
              </h2>
              <StatusBadge status={getDispute?.status ?? ""} />
            </div>

            <div className="space-y-3 text-sm">
              {infoItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-lighttext">{item.label}</span>
                  <span className={`text-sm font-medium text-dark  capitalize`}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#EDF2F7]">
                <span className="text-xs text-lighttext block mb-1">
                  Description
                </span>
                <p className="text-sm text-navgray">{getDispute?.reason}</p>
              </div>
            </div>
          </div>

          {/* Order Details Summary Card */}
          <div className="bg-white border border-lightborder rounded-lg p-4 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-dark pb-2">
              Order Details
            </h3>

            <div className="flex justify-between items-center text-sm">
              <span className="text-navgray ">Payment Status</span>

              <span className=" text-dark capitalize"><StatusBadge status={getDispute?.order?.paymentStatus || ""}/></span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-navgray ">Order Value</span>
              <span className=" text-dark">
                {CurrencyFormat(getDispute?.order?.totalKobo)}
              </span>
            </div>
            <div className="">
              <CountdownTimer
                createdAt={getDispute?.order?.createdAt || ""}
                onTimeChange={setTimerValue}
                remaining={true}
              />
            </div>
          </div>
        </div>

        {/* Center Column: Textual Evidence Blocks & Ruling Workspace */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Evidence Repository Card */}
          <div className="bg-white border border-lightborder rounded-lg p-4  space-y-5">
            <h2 className="text-sm font-medium text-dark ">Evidence</h2>

            {/* Buyer Case Evidence */}
            <div className="text-navgray">
              <span className=" font-medium text-xs block uppercase mb-1">
                Buyer Evidence
              </span>
              <p className="text-sm mb-2 leading-relaxed">
                Photos showing worn brake pads, original order receipt, and
                comparison with product listing.
              </p>
              <button className="text-xs  border border-lightborder rounded-full px-3 py-1.5 hover:bg-slate-50 transition-colors cursor-pointer">
                View attachments
              </button>
            </div>

            {/* Seller Case Evidence */}
            <div className="pt-4 border-t border-[#F5F7FA] text-navgray">
              <span className="font-medium text-xs block uppercase mb-1">
                Seller Evidence
              </span>
              <p className="text-sm mb-2 leading-relaxed">
                Dispatch records showing item was packed new, CCTV footage from
                warehouse.
              </p>
              <button className="text-xs  border border-lightborder rounded-full px-3 py-1.5 hover:bg-slate-50 transition-colors cursor-pointer">
                View attachments
              </button>
            </div>
          </div>

          {/* Ruling Form Work Space */}
          {/* <div className="bg-white border border-lightborder rounded-lg p-4 space-y-1">
            <h2 className="text-sm font-medium text-dark">Issue Ruling</h2>

            {/* Admin Input Textarea *
            <div>
              <label className="text-xs text-lighttext block mb-1">
                Admin ruling notes
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Enter your ruling notes and reasoning..."
                className="w-full min-h-25 border border-lightborder rounded-lg p-3 text-xs focus:outline-none focus:border-orange-300 resize-none placeholder-dark/50"
              />
            </div>

            {/* Verdict Radio Operators Selection *
            <div className="space-y-2.5">
              <label className="text-xs font-medium text-lighttext block">
                Ruling decision
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-dark cursor-pointer">
                <input
                  type="radio"
                  name="ruling"
                  value="refund-buyer"
                  checked={rulingDecision === "refund-buyer"}
                  onChange={() => setRulingDecision("refund-buyer")}
                  className="accent-[#DD6B20] h-3.5 w-3.5"
                />
                <span>Refund buyer (full)</span>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-dark cursor-pointer">
                <input
                  type="radio"
                  name="ruling"
                  value="refund-seller"
                  checked={rulingDecision === "refund-seller"}
                  onChange={() => setRulingDecision("refund-seller")}
                  className="accent-[#DD6B20] h-3.5 w-3.5"
                />
                <span>Refund seller</span>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-dark cursor-pointer">
                <input
                  type="radio"
                  name="ruling"
                  value="partial-refund"
                  checked={rulingDecision === "partial-refund"}
                  onChange={() => setRulingDecision("partial-refund")}
                  className="accent-[#DD6B20] h-3.5 w-3.5"
                />
                <span>Partial refund</span>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-dark cursor-pointer">
                <input
                  type="radio"
                  name="ruling"
                  value="no-action"
                  checked={rulingDecision === "no-action"}
                  onChange={() => setRulingDecision("no-action")}
                  className="accent-[#DD6B20] h-3.5 w-3.5"
                />
                <span>No action</span>
              </label>
            </div>

            {/* Reverse Logistics Secondary Flag Modifier *
            <div className="pt-2 border-t border-[#EDF2F7]">
              <label className="flex items-center gap-2 text-sm font-medium text-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireReturn}
                  onChange={(e) => setRequireReturn(e.target.checked)}
                  className="accent-[#DD6B20] h-3.5 w-3.5 rounded"
                />
                <span>Require reverse logistics (return item)</span>
              </label>
            </div>
          </div> */}
        </div>

        {/* Right Column: Dynamic Action Operators & SLA Clock Alerts */}

        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Main Operators Command Panel */}
          <div className="bg-white border border-lightborder rounded-lg p-4 space-y-2">
            <span className="text-[11px] font-bold tracking-wider text-[#A0AEC0] block mb-3 uppercase">
              Actions
            </span>


            <button
              className="w-full py-2 px-4 bg-[#ED8936] text-white hover:bg-[#DD6B20] font-semibold text-xs rounded transition-all cursor-pointer"
              onClick={() => openReasonModal("disputestatus", "resolve")}
            >
              Resolve
            </button>

            <button
              className="w-full py-2 px-4 bg-[#E53E3E] text-white hover:bg-[#C53030] font-semibold text-xs rounded transition-all cursor-pointer"
              onClick={() => openReasonModal("disputestatus", "reject")}
            >
              Reject
            </button>
          </div>

          {/* Contextual System Warning Banner */}
          <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-lg p-4 flex gap-2.5 items-start">
            <AlertTriangle
              className="text-[#E53E3E] shrink-0 mt-0.5"
              size={16}
            />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#9B2C2C] block">
                Urgent
              </span>
              <span className="text-xs text-[#C53030] block">
                {formatSlaTime(getDispute?.slaRemainingMinutes ?? 0)} 
              
                <span> before SLA breach</span>
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
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

export default DisputeDetails;
