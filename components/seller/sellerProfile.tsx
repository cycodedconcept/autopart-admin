"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ShieldAlert,
  Layers,
  MessageSquare,
  Loader2,
  AlertCircle,
  Dot,
} from "lucide-react";

import { SuspendSellerModal } from "./suspendSellerModal";
import { ChangePlanModal } from "./changePlanModal";
import { MessageSellerModal } from "./messageSellerModal";
import Overview from "./sellerOverview";
import SellerListings from "./sellerListings";
import { ActionWithReasonModal } from "../verification/actionWithReason";
import {
  useOrdersQuery,
  useSellersQuery,
  useSuspendSellerAccount,
} from "@/lib/queries";
import { StatusBadge } from "@/app/(admin)/sellers/verification-queue/page";

type TabType = "Overview" | "Listings" | "Orders" | "Disputes";
type ActiveModalType = "Suspend" | "Plan" | "Message" | null;

interface SellerProfileProps {
  sellerEmail: string;
  sellerId: number;
  onClose: () => void;
}

// const orders = [
//   {
//     id: 5,
//     status: "confirmed",
//     paymentMethod: "paystack",
//     paymentReference: "APT-5-1783080971814-6CB7A63D",
//     paymentStatus: "paid",
//     subtotalKobo: 15600000,
//     deliveryFeeKobo: 0,
//     totalKobo: 15600000,
//     totalItems: 3,
//     sellerLineItems: 1,
//     sellerTotalItems: 3,
//     sellerTotalKobo: 15600000,
//     deliveryAddress: {
//       id: 5,
//       label: "Workshop",
//       street: "12 Adeola Odeku Street",
//       city: "Ikeja",
//       state: "Lagos",
//       phone: "+2348012345678",
//     },
//     items: [
//       {
//         id: 7,
//         productId: 4007,
//         title: "oil filter",
//         partNumber: "FILTER-001",
//         condition: "used",
//         location: "Abuja",
//         quantity: 3,
//         unitPriceKobo: 5200000,
//         lineTotalKobo: 15600000,
//         itemStatus: "pending",
//         primaryImageUrl:
//           "uploads/product-images/product-image-1783071679206-2e07c87b-78d6-4a5e-98ed-470eabddd98e.jpg",
//         seller: {
//           id: 1,
//           businessName: "Prime Auto Hub",
//           rating: 0,
//         },
//       },
//     ],
//     createdAt: "2026-07-03T12:10:00.000Z",
//     updatedAt: "2026-07-03T12:20:02.000Z",
//   },
// ];
export const SellerProfile: React.FC<SellerProfileProps> = ({
  sellerEmail,
  sellerId,
  onClose,
}) => {
  // const sellerEmail = "kamal-motors-101";

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
  const [currentPlan, setCurrentPlan] = useState<string>("pro");
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const { data, isLoading, isError, error } = useSellersQuery(
    1,
    "",
    sellerEmail,
    "",
  );
  const { data: order } = useOrdersQuery(1, "", sellerEmail, "");
  const orders = order?.data?.orders;
  // Track which modal is currently rendered overlaying dashboard
  const [openModal, setOpenModal] = useState<ActiveModalType>(null);
  const user = data?.data?.users[0];
  const suspendSellerAccout = useSuspendSellerAccount();

  const businessName = user?.sellerProfile?.businessName;
  const openReasonModal = (type: string) => {
    if (type === "Suspend") {
      setModalConfig({
        type: "Suspend",
        title: "Suspend Seller",
        description: `Suspend ${businessName}? They will be unable to sell..`,
        placeholder: "Enter reason...",
        color: "bg-[#FB3636] border-[#FB3636]",
        label: "Suspend",
      });
    }
  };

  const handleActionConfirmSubmit = (reasonText: string, type: string) => {
    setModalConfig((prev) => ({ ...prev, type: null })); // Close reason handler sheet frame
    if (type === "Suspend") {
      suspendSellerAccout.mutate({
        id: sellerId,
        status: "suspended",
      });
    }
    if (type === "activate") {
      suspendSellerAccout.mutate({
        id: sellerId,
        status: "active",
      });
    }
  };

  const getSeller = user?.fullName.split(" ");
  let initials;
  if (getSeller) {
    if (getSeller.length > 1) {
      const first = getSeller[0][0];
      const second = getSeller[1][0];
      initials = first + second;
    } else {
      const first = getSeller[0][0];
      initials = first;
    }
  }

  const totalOrders = orders?.reduce((a, b) => {
    return a + b.totalItems;
  }, 0);
  return isLoading ? (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-gray-400" size={24} />
    </div>
  ) : isError ? (
    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
      <AlertCircle size={16} />{" "}
      <span>{error?.message || "Failed to load lists"}</span>
    </div>
  ) : (
    <div className="min-h-screen bg-[#F8F9FC] text-left antialiased relative">
      <button
        className="inline-flex items-center gap-2 text-sm text-navgray hover:text-gray-800 font-medium mb-3 transition-colors cursor-pointer"
        onClick={onClose}
      >
        <ChevronLeft size={12} />
        <span>Back to all sellers</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 xl:gap-5 items-start">
        <div className="lg:col-span-3">
          {/* Header Profile Context View banner */}
          <div className=" bg-white border border-lightborder rounded-lg p-3 md:p-5 mb-5 flex flex-col-reverse md:flex-row justify-between md:items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF4EE] flex items-center justify-center font-bold text-aorange text-md">
                {initials}
              </div>
              <div>
                <h1 className="text-[17px] font-bold text-dark">
                  {businessName}
                </h1>
                <p className="text-sm flex items-center text-navgray mt-0.5">
                  {user?.email}{" "}
                  <span className="text-navgray">
                    <Dot />
                  </span>{" "}
                  <span>{orders && orders[0]?.deliveryAddress.city}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <span className="bg-[#EDE9FE] text-[#5B21B6] font-medium px-2 py-0.5 rounded-[20px] text-[10px] border border-[#EDE9FE] capitalize">
                {currentPlan}
              </span>
              <span className="">
                <StatusBadge width="block" status={user?.accountStatus ?? ""} />
              </span>
            </div>
          </div>

          {/* Core Sub navigation Tabs mapping segments grid wrapper */}
          <div className="space-y-4 ">
            <div className="overflow-x-auto flex items-center gap-2 pb-1">
              {(
                ["Overview", "Listings", "Orders", "Disputes"] as TabType[]
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-[13px] font-medium rounded-lg border cursor-pointer transition-all ${activeTab === tab ? "bg-aorange text-white border-aorange" : "text-navgray bg-white border-lightborder hover:bg-gray-50"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-white border border-lightborder rounded-lg p-5 min-h-55">
              {activeTab === "Listings" && (
                <SellerListings user={user!} orders={orders!} />
              )}
              {activeTab === "Orders" && (
                <div className="text-gray-500">
                  {totalOrders} orders placed. Showing summary view.
                </div>
              )}
              {activeTab === "Overview" && (
                <Overview user={user!} orders={orders!} />
              )}
              {activeTab === "Disputes" && (
                <div className="text-gray-400 italic">
                  No historical entries found.
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sidebar Trigger controls panel wrapper */}
        <div className="lg:col-span-1 bg-white border border-lightborder rounded-lg p-5">
          <h2 className="text-[13px] font-medium text-dark mb-4">Actions</h2>
          <div className="flex flex-col gap-2.5 text-[13px] font-medium">
            {user?.accountStatus === "active" ? (
              <button
                onClick={() => openReasonModal("Suspend")}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFF1F1] hover:bg-red-100 text-[#FB3636] border border-[#FFC9C9] py-2 px-4 rounded-lg cursor-pointer"
              >
                Suspend seller
              </button>
            ) : (
              <button
                onClick={() => handleActionConfirmSubmit("", "activate")}
                className="w-full inline-flex items-center justify-center gap-2  bg-[#E8FFF4] text-[#085041] border border-[#085041] py-2 px-4 rounded-lg cursor-pointer"
              >
                Activate seller
              </button>
            )}
            <button
              onClick={() => setOpenModal("Plan")}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#E8EFF9] hover:bg-blue-100 text-[#0C447C] border border-[#B8D0EA] py-2 px-4 rounded-lg cursor-pointer"
            >
              Change plan
            </button>
            <button
              onClick={() => setOpenModal("Message")}
              className="w-full inline-flex items-center justify-center gap-2 bg-background hover:bg-gray-100 text-navgray border border-lightborder py-2 px-4 rounded-lg cursor-pointer"
            >
              Message seller
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          DYNAMIC MOUNTED MODAL CONTROLLERS RENDER
         ========================================== */}
      {openModal === "Suspend" && (
        <SuspendSellerModal
          sellerId={sellerId}
          businessName={businessName ?? ""}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === "Plan" && (
        <ChangePlanModal
          sellerId={sellerId}
          currentPlan={currentPlan}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === "Message" && (
        <MessageSellerModal
          sellerId={sellerId}
          businessName={businessName ?? ""}
          onClose={() => setOpenModal(null)}
        />
      )}
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
