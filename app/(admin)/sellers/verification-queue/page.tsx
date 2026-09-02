"use client";
import { ActionsMenu } from "@/components/atoms/actionMenu";
import { formatDateLabelYear } from "@/components/atoms/formatDate";
import { Pagination } from "@/components/atoms/pagination";
import { SearchInput } from "@/components/atoms/searchInputs";
import MetricCard from "@/components/dashboard/metricCard";
import { SellerDetailProfile } from "@/components/verification/sellerDetail";
import { useSuspendSellerAccount, useVerificationQuery } from "@/lib/queries";
import {
  ActionsMenuProps,
  SellerRequest,
  VerificationStatus,
} from "@/types/verification";
import { AlertCircle, Loader2, MoreVertical, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

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
export const SummaryStats: React.FC<{pending: number, verified: number, rejected: number}> = ({pending, verified, rejected}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {statusItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgClass} ${item.borderClass} ${item.textClass} border rounded-lg px-2 md:px-4 py-2 flex items-center gap-2`}
        >
          <span className="text-lg font-bold">{item.label === "Pending" ? pending : item.label === "Verified today" ? verified : item.label === "Rejected"? rejected : item.count}</span>
          <span className="text-sm font-medium truncate md:whitespace-normal">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- STATUS BADGE COMPONENT ---
interface StatusBadgeProps {
  status: VerificationStatus;
  width?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, width }) => {
  const styles: Record<VerificationStatus, string> = {
    "Pending CAC": "bg-[#FEF3C6] text-[#BB4D00] ",
    "Pending review": "bg-[#DBEAFE] text-[#1447E6] ",
    Flagged: "bg-[#FFE2E2] text-[#C10007] ",
    Approved: "bg-[#DCFCE7] text-[#008236] ",
    active: "bg-[#E8FFF4] text-[#085041] ",
    banned: "bg-[#FFF1F1] text-[#791F1F] ",
    pending: "bg-[#FEF3EB] text-[#633806] ",
    delivered: "bg-[#DCFCE7] text-[#008236] ",
    verified: "bg-[#DCFCE7] text-[#008236] ",
    resolved: "bg-[#DCFCE7] text-[#008236] ",
    confirmed: "bg-[#DBEAFE] text-[#1447E6] ",
    "in review": "bg-[#DBEAFE] text-[#1447E6] ",
    "in transit": "bg-[#FEF3C6] text-[#BB4D00] ",
    suspended: "bg-[#FEF3C6] text-[#BB4D00] ",
    "escalated": "bg-[#FEF3C6] text-[#BB4D00] ",
    disputed: "bg-[#FFE2E2] text-[#C10007] ",
    rejected: "bg-[#FFE2E2] text-[#C10007] ",
    open: "bg-[#FFE2E2] text-[#C10007] ",
    cancelled: "bg-[#F3F4F6] text-[#4A5565] ",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${width}  ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const VerificationQueue: React.FC = () => {
  // State management for the live data array
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "verified" | "rejected"
  >("all");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const { data, isFetching, isError, error } = useVerificationQuery(
    page,
    activeTab,
  );
  const {data:pending} = useVerificationQuery(page ,"pending")
  const {data:verified} = useVerificationQuery(page ,"verified")
  const {data:rejected} = useVerificationQuery(page ,"rejected")
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPagesCount = data?.data?.pagination?.totalPages || 1;
  const selectedSellerId = Number(searchParams.get("id"));
  const selectedSellerEmail = searchParams.get("email");
  const openDetails = Boolean(selectedSellerEmail);
  // Action event handler that updates live application state dynamically
 
  const handleCloseProfile = () => {
    // Clears the query parameter to return back to the table view
    router.push("/sellers/verification-queue", { shallow: true } as any);
  };

  
  const handleAction = (id: number, email: string, action: string) => {
    if (action.toLowerCase() === "review") {
      return router.push(
        `/sellers/verification-queue?email=${email}&id=${id}`,
        {
          shallow: true,
        } as any,
      );
    }
  };

  const filteredSellers = data?.data?.sellers?.filter((seller) => {
    const matchesSearch = seller.sellerProfile.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      seller.sellerProfile.verificationStatus === activeTab;
    return matchesSearch && matchesTab;
  });
console.log(data)
  return (
    <>
      {!openDetails ? (
        <div className="flex-1 ">
          {/* Title block */}

          <div className="mb-5">
            <h1 className="text-xl font-medium text-dark">
              Verification Queue
            </h1>
            <p className="text-xs text-navgray mt-0.5">
              Review and action seller verification requests
            </p>
          </div>
          {/* Summary KPI Pills */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <MetricCard
                    subTitle="Pending"
                    value={pending?.data?.sellers?.length ?? 0}
                   
                    divStyle=""
                  />
                  <MetricCard subTitle="Verified verification" value={verified?.data?.sellers?.length ?? 0} divStyle="" />
                  <MetricCard subTitle="Rejected" value={rejected?.data?.sellers?.length ?? 0} divStyle="" />
                  
                </div>
          {/* <SummaryStats
           pending={pending?.data?.sellers?.length ?? 0}
           verified={verified?.data?.sellers?.length ?? 0}
           rejected={rejected?.data?.sellers?.length ?? 0}
           /> */}

          {/* Filters Toolbar */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2 pb-2">
            {/* Search */}
            <SearchInput value={searchTerm} onChange={setSearchTerm} />

            {/* Tab Filters */}
            <div className="flex items-center gap-2">
              {(["all", "pending", "verified", "rejected"] as const).map(
                (tab) => (
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
                ),
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto md:min-h-100  rounded-lg">
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
              <table className="min-w-200 md:min-w-auto w-full text-left border-collapse border border-lightborder">
                <thead className="">
                  <tr className="border-b border-lightborder text-xs text-lighttext uppercase">
                    <th className="py-3 font-medium pl-3">Business Name</th>
                    <th className="py-3 font-medium">Type</th>
                    <th className="py-3 font-medium">Location</th>
                    <th className="py-3 font-medium">Submitted</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3  font-medium ">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs bg-white">
                  {filteredSellers?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-400"
                      >
                        No verification items found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSellers?.map((seller) => (
                      <tr
                        key={seller.user.id}
                        className="hover:bg-gray-50/50 transition-colors group text-sm border-b border-[#F5F7FA] last:border-0 cursor-pointer capitalize"
                      >
                        <td className="pl-3 py-3.5 text-dark font-medium">
                          {seller.sellerProfile.businessName}
                        </td>
                        <td className="py-3.5 text-navgray">
                          {seller.user.role}
                        </td>
                        <td className="py-3.5 text-navgray">
                          {seller.sellerProfile.address}
                        </td>
                        <td className="py-3.5 text-navgray">
                          {formatDateLabelYear(seller.sellerProfile.createdAt)}
                        </td>
                        <td className="py-3.5">
                          <StatusBadge
                            status={seller.sellerProfile.verificationStatus}
                          />
                        </td>
                        <td className="py-3.5  pr-4 relative">
                          <div className="inline-flex items-center gap-2">
                            <button
                              // onClick={() => handleAction(seller.id, 'Review')}
                              className=" px-2.5 py-1 text-xs font-medium border border-lightborder bg-[#F5F7FA] rounded-full hover:bg-white transition-all text-navgray"
                            >
                              Review
                            </button>
                            <ActionsMenu
                              isOpen={openMenuId === seller.user.id}
                              onToggle={() =>
                                setOpenMenuId(
                                  openMenuId === seller.user.id
                                    ? null
                                    : seller.user.id,
                                )
                              }
                              onAction={(action) =>
                                handleAction(
                                  seller.sellerProfile.id,
                                  seller?.user?.email,
                                  action,
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPagesCount}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <SellerDetailProfile
          sellerEmail={selectedSellerEmail!}
          sellerId={selectedSellerId!}
          onClose={handleCloseProfile}
        />
      )}
    </>
  );
};

export default VerificationQueue;
