"use client";

import React, { useState } from "react";
import {
  Clock,
  AlertTriangle,
  Ban,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/atoms/pagination";
import { ActionWithReasonModal } from "@/components/verification/actionWithReason";
import { ActionsSuspend } from "@/components/suspended&banned/actionModal";
import { useSellersQuery, useSuspendSellerAccount } from "@/lib/queries";
import { formatDateLabelYear } from "@/components/atoms/formatDate";

// --- TypeScript Interfaces ---
interface SellerRecord {
  id: number;
  name: string;
  type: "Individual" | "Business";
  location: string;
  reason: string;
  date: string;
  actionBy: string;
  status: "suspended" | "banned";
}

interface StatCardProps {
  value: string | number;
  label: string;
  Icon: React.ComponentType<{ size?: number | string; className?: string }>;
  iconBgColor: string;
  borderColor: string;
  iconColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  Icon,
  borderColor,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-lightborder flex items-center gap-4 w-full">
      {/* Dynamic Icon Container */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${borderColor} ${iconBgColor} ${iconColor}`}
      >
        <Icon size={20} />
      </div>

      {/* Metric Copy Details */}
      <div>
        <div className="text-xl font-bold text-dark">{value}</div>
        <div className="text-sm text-navgray">{label}</div>
      </div>
    </div>
  );
};

export default function SuspendedBannedDashboard() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "suspended" | "banned"
  >("all");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useSellersQuery(
    page,
    activeFilter,
    "",
    "",
  );

  const totalPagesCount = data?.data?.pagination?.totalPages || 1;

  // Filter logic for tabs
  const filteredSellers = data?.data?.users?.filter((seller) => {
    if (activeFilter === "all") {
      const restrictedStatuses = ["suspended", "banned"];
      return restrictedStatuses.includes(seller.accountStatus);
    }
    return seller.accountStatus.toLowerCase() === activeFilter.toLowerCase();
  });

  const suspendedTotal = data?.data?.users?.filter(each => each.accountStatus === "suspended")
  const bannedTotal = data?.data?.users?.filter(each => each.accountStatus === "banned")
  // Action Menu Controller
  const handleAction = (id: number, action: string) => {
    if (action === "View profile") {
      // Use dynamic search parameters to swap to profile view inline
      router.push(`/sellers/all-sellers?id=${id}`, { shallow: true } as any);
    } else {
      console.log(`Executing ${action} for Seller ID: ${id}`);
    }
  };

  return (
    <div className="w-full ">
      {/* --- Page Title Header --- */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-dark">
          Suspended & Banned Accounts
        </h1>
        <p className="text-xs text-navgray mt-0.5">
          Manage seller account restrictions and reinstatements
        </p>
      </div>

      {/* --- Stat Indicator Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Suspended Sellers Card */}
        <StatCard
          value={suspendedTotal?.length ?? 0}
          label="Suspended Sellers"
          Icon={Clock}
          iconBgColor="bg-[#FFFBEB]"
          borderColor="border-[#FEE685]"
          iconColor="text-[#FE9A00]"
        />

        {/* Banned Sellers Card */}
        <StatCard
          value={bannedTotal?.length ?? 0}
          label="Banned Sellers"
          Icon={Ban}
          iconBgColor="bg-[#FEF2F2]"
          borderColor="border-[#FFC9C9]"
          iconColor="text-[#FB2C36]"
        />

        {/* Flagged Activities Card */}
        <StatCard
          value={5}
          label="Actions This Month"
          Icon={AlertTriangle}
          iconBgColor="bg-[#FFF7ED]"
          borderColor="border-[#FFD6A8]"
          iconColor="text-aorange"
        />
      </div>

      {/* --- Tab Filter Buttons --- */}
      <div className="flex items-center gap-2 mb-4">
        {(["all", "suspended", "banned"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3 py-1.5 rounded-full font-medium text-sm transition-all border cursor-pointer capitalize ${
              activeFilter === tab
                ? "bg-dark border-dark text-white"
                : "hover:text-gray-900 text-navgray bg-white border-lightborder"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- Main Data Table Container --- */}
      <div className="bg-white border border-lightborder rounded-lg overflow-hidden ">
        <div className="overflow-x-auto min-h-80">
          <table className="w-full text-left border-collapse">
            <thead className="bg-background">
              <tr className="border-b border-lightborder text-xs text-lighttext font-bold uppercase">
                <th className="py-3 px-4 font-semibold">Seller</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Reason</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Action By</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm bg-white">
              {filteredSellers?.map((seller) => (
                <tr
                  key={seller.id}
                  className="hover:bg-gray-50/50 transition-colors text-navgray cursor-pointer capitalize border-b border-lightborder last:border-0"
                  onClick={() =>
                    router.push(`/sellers/all-sellers?id=${seller.id}`, {
                      shallow: true,
                    } as any)
                  }
                >
                  {/* Name with custom colored side indicator bars */}
                  <td className="py-3.5 px- pl-0 font-medium  text-dark flex items-center gap-3">
                    <div
                      className={`w-1 h-4 ${seller.accountStatus === "suspended" ? "bg-[#FFB900]" : "bg-[#FB2C36]"}`}
                    />
                    {seller.fullName}
                  </td>

                  <td className="py-3.5 px-4 ">{seller.role}</td>
                  <td className="py-3.5 px-4 ">{/* {seller.location} */}</td>
                  <td
                    className="py-3.5 px-4  max-w-40 truncate"
                    title={seller?.sellerProfile?.rejectionReason ?? ""}
                  >
                    {seller?.sellerProfile?.rejectionReason}
                  </td>
                  <td className="py-3.5 px-4 ">
                    {formatDateLabelYear(seller.createdAt)}
                  </td>
                  <td className="py-3.5 px-4  ">{/* {seller.actionBy} */}</td>

                  {/* Status Pills */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        seller.accountStatus === "suspended"
                          ? "bg-[#FEF3C6] border-[#FEE685] text-[#BB4D00]"
                          : "bg-[#FFE2E2] border-[#FFC9C9] text-[#C10007]"
                      }`}
                    >
                      {seller.accountStatus}
                    </span>
                  </td>

                  {/* Actions Column Wrapper to stop event bubbling */}
                  <td
                    className="py-3.5 px-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ActionsSuspend
                      isOpen={openMenuId === seller.id}
                      onToggle={() =>
                        setOpenMenuId(
                          openMenuId === seller.id ? null : seller.id,
                        )
                      }
                      id={seller.id}
                      businessName={seller.fullName}
                      onAction={(action) => handleAction(seller.id, action)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPagesCount}
        onPageChange={setPage}
      />
    </div>
  );
}
