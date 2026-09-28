"use client";

import CurrencyFormat from "@/components/atoms/currencyFormat";
import { formatDateLabel } from "@/components/atoms/formatDate";
import { Pagination } from "@/components/atoms/pagination";
import { SearchInput } from "@/components/atoms/searchInputs";
import { StatusBadge } from "@/components/atoms/statusBadge";
import MetricCard from "@/components/dashboard/metricCard";
import { ActionsMenuPayout } from "@/components/payout/actionMenu";
import { DisputeCard } from "@/components/payout/disputeCard";
import PayoutDetails from "@/components/payout/payoutDetails";

import { usePayoutsQuery } from "@/lib/queries";
import { PayoutRecord } from "@/types/payout";
import { SellerRequest } from "@/types/verification";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

export const mockSellers: SellerRequest[] = [
  {
    id: "1",
    businessName: "Chukwuemeka Auto Parts",
    type: "Sole Proprietor",
    location: "Lagos",
    submittedDate: "2024-06-10",
    status: "Pending CAC",
    plan: "Free",
    orders: 45,
    gmv: "30,00",
  },
  {
    id: "2",
    businessName: "Adeyemi Motors Ltd",
    type: "Limited Company",
    location: "Ibadan",
    submittedDate: "2024-06-11",
    status: "Pending review",
    plan: "Pro",
    orders: 45,
    gmv: "30,00",
  },
  {
    id: "3",
    businessName: "Nnamdi Spare Parts",
    type: "Sole Proprietor",
    location: "Enugu",
    submittedDate: "2024-06-12",
    status: "Flagged",
  },
  {
    id: "4",
    businessName: "Tunde & Sons Auto",
    type: "Partnership",
    location: "Abuja",
    submittedDate: "2024-06-13",
    status: "Pending CAC",
    plan: "Starter",
    orders: 45,
    gmv: "30,00",
  },
  {
    id: "5",
    businessName: "Kelechi Parts Hub",
    type: "Sole Proprietor",
    location: "Port Harcourt",
    submittedDate: "2024-06-14",
    status: "Pending review",
  },
  {
    id: "6",
    businessName: "Emeka Autozone",
    type: "Limited Company",
    location: "Owerri",
    submittedDate: "2024-06-15",
    status: "Approved",
  },
  {
    id: "7",
    businessName: "Bello Auto Supplies",
    type: "Sole Proprietor",
    location: "Kano",
    submittedDate: "2024-06-16",
    status: "Flagged",
  },
  {
    id: "8",
    businessName: "Okafor Automotives",
    type: "Partnership",
    location: "Onitsha",
    submittedDate: "2024-06-17",
    status: "Pending CAC",
  },
];

const statusItems = [
  {
    count: 0,
    label: "Pending",
    bgClass: "bg-[#FFFBEB]",
    borderClass: "border-[#FEE685]",
    textClass: "text-[#E17100]",
  },
  {
    count: 0,
    label: "Rejected",
    bgClass: "bg-[#FEF2F2]",
    borderClass: "border-[#FFC9C9]",
    textClass: "text-[#E7000B]",
  },
  {
    count: 0,
    label: "Verified today",
    bgClass: "bg-[#F0FDF4]",
    borderClass: "border-[#B9F8CF]",
    textClass: "text-[#00A63E]",
  },
];
export const SummaryStats: React.FC<{
  pending: number;
  verified: number;
  rejected: number;
}> = ({ pending, verified, rejected }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {statusItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgClass} ${item.borderClass} ${item.textClass} border rounded-lg px-2 md:px-4 py-2 flex items-center gap-2`}
        >
          <span className="text-lg font-bold">
            {item.label === "Pending"
              ? pending
              : item.label === "Verified today"
                ? verified
                : item.label === "Rejected"
                  ? rejected
                  : item.count}
          </span>
          <span className="text-sm font-medium truncate md:whitespace-normal">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const payoutApprovals: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [payeeType, setPayeeType] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "approved" | "paid" | "requested" | "rejected"
  >("all");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const { data, isFetching, isError, error } = usePayoutsQuery(
    page,
    activeTab,
    payeeType,
    searchTerm,
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPagesCount = data?.data?.pagination?.totalPages || 1;
  const selectedPayoutId = Number(searchParams.get("id"));
  const openDetails = Boolean(selectedPayoutId);

  const handleCloseProfile = () => {
    // Clears the query parameter to return back to the table view
    router.push("/finance/payout-approvals", { shallow: true } as any);
  };

  const handleAction = (id: number, action: string) => {
    if (action.toLowerCase() === "view details") {
      return router.push(`/finance/payout-approvals?&id=${id}`, {
        shallow: true,
      } as any);
    }
  };
const realData = data?.data?.payouts
  const getData = useCallback(() => {
    return realData?.find((each: PayoutRecord) => each.id === selectedPayoutId);
  }, [selectedPayoutId]);

  const filteredPayouts = realData?.filter((each: PayoutRecord) => {
    const matchesSearch = each.logisticsCompany.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || each.status === activeTab;
    return matchesSearch && matchesTab;
  });
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n, id, arr) => {
        return arr.length === 1 ? n[0] + n[1] : n[0];
      })
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const pending =
    realData?.filter((b:PayoutRecord) => b.status === "pending").length || 0;

  const approved =
    realData?.filter((b:PayoutRecord) => b.status === "approved").length || 0;

  const requested =
    realData?.filter((b:PayoutRecord) => b.status === "requested").length || 0;

  const rejected =
    realData?.filter((b: PayoutRecord) => b.status === "rejected").length || 0;

  return (
    <>
      {!openDetails ? (
        <div className="flex-1 ">
          {/* Title block */}

          <div className="mb-5">
            <h1 className="text-xl font-medium text-dark">Payout Approvals</h1>
            <p className="text-xs text-navgray mt-0.5">
              Review and approve seller payout requests
            </p>
          </div>
          {/* Summary KPI Pills */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <MetricCard subTitle="Pending" value={pending} divStyle="" />
            <MetricCard subTitle="Approved" value={approved} divStyle="" />
            <MetricCard subTitle="Requested" value={requested} divStyle="" />
            <MetricCard subTitle="Rejected" value={rejected} divStyle="" />
          </div>

          {/* Filters Toolbar */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2 pb-2">
            {/* Search */}
            <SearchInput value={searchTerm} onChange={setSearchTerm} />

            {/* Tab Filters */}
            <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-2">
              {(
                ["all", "approved", "paid", "requested", "rejected"] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full font-medium text-sm transition-a border cursor-pointer capitalize ${
                    activeTab === tab
                      ? "bg-aorange text-white border-aorange"
                      : "hover:text-gray-900 text-navgray bg-white border-lightborder"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto min-h-56 md:min-h-100  ">
            {isFetching ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-gray-400" size={24} />
              </div>
            ) : isError ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                <AlertCircle size={16} />{" "}
                <span>{error?.message || "Failed to load lists"}</span>
              </div>
            ) : (
              <div>
                {filteredPayouts?.length > 0 ? (
                  filteredPayouts?.map((payout: PayoutRecord) => {
                    return (
                      <div
                        key={payout.id}
                        className="w-full bg-white border border-lightborder rounded-lg p-4 flex flex-col md:flex-row  gap-2 md:gap-0 md:items-center justify-between hover:shadow-sm mb-2"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 bg-[#FFF4EE] rounded-full flex items-center justify-center text-aorange font-bold text-sm tracking-wider shrink-0 select-none">
                            {getInitials(payout?.logisticsCompany?.name)}
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <h3 className="text-sm font-medium text-dark">
                              {payout?.logisticsCompany?.name}
                            </h3>
                            <p className="text-xs text-navgray">
                              {payout?.bankAccountRef}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 capitalize justify-between md:justify-start">
                          <div className="md:text-right space-y-0.5">
                            <div className="text-base font-bold text-dark tracking-tight">
                              {CurrencyFormat(payout?.amountKobo)}
                            </div>
                            <div className="text-[11px] text-lighttext ">
                              <span className="pr-1">Requested</span>
                              {formatDateLabel(payout?.createdAt)}
                            </div>
                          </div>

                          {/* Dynamic Status Pill */}
                          <StatusBadge status={payout?.status} />

                          {/* Action Button */}
                          
                          <ActionsMenuPayout
                            isOpen={openMenuId === payout.id}
                            onToggle={() =>
                              setOpenMenuId(
                                openMenuId === payout.id ? null : payout.id,
                              )
                            }
                            onAction={(action) =>
                              handleAction(payout.id, action)
                            }
                          />
                          
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-navgray pt-5">
                    No payout available!
                  </p>
                )}
              </div>
            )}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPagesCount}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <PayoutDetails payout={getData() || null} onClose={handleCloseProfile} />
      )}
    </>
  );
};

export default payoutApprovals;
