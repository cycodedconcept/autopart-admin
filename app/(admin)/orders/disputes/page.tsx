"use client";

import MetricCard from "@/components/dashboard/metricCard";
import { SearchInput } from "@/components/atoms/searchInputs";
import { useState } from "react";
import { PlanProps } from "@/types/verification";
import { Pagination } from "@/components/atoms/pagination";
import { useDisputesQuery } from "@/lib/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateLabelYear } from "@/components/atoms/formatDate";
import { ActionsMenuOrder } from "@/components/order/actionMenu";
import { CountdownTimer } from "@/components/atoms/countdownTimer";
import DisputeDetails from "@/components/disputes/disputeDetails";
import { StatusBadge } from "@/components/atoms/statusBadge";

interface PlanBadgeProps {
  status: PlanProps;
}

export const PlanBadge: React.FC<PlanBadgeProps> = ({ status }) => {
  const styles = {
    Free: "bg-[#F5F7FA] text-[#525866] ",
    Pro: "bg-[#EDE9FE] text-[#5B21B6] ",
    Starter: "bg-[#E8EFF9] text-[#0C447C] ",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full  ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const Disputes = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "open" | "rejected" | "resolved"
  >("all");
  const [raisedBy, setRaisedBy] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDisputesQuery(page, activeTab, searchTerm, raisedBy);

 
  const searchParams = useSearchParams();
  const router = useRouter();
  const [timerValue, setTimerValue] = useState("");
  const selectedDisputeId = Number(searchParams.get("id"));
  const showProfile = Boolean(selectedDisputeId);

  const handleCloseProfile = () => {
    // Clears the query parameter to return back to the table view
    router.push("/orders/disputes", { shallow: true } as any);
  };

  const handleSearchChange = (newVal: string) => {
    setSearchTerm(newVal);
    setPage(1); // Reset page safely to index 1 if search query changes
  };

  const totalPagesCount = data?.data?.pagination?.totalPages || 1;

  const filteredDisputes = data?.data?.disputes?.filter((dispute) => {
    const matchesSearch = dispute?.buyer?.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      dispute?.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const handleAction = (id: number, action: string) => {
    if (action === "View details") {
      return router.push(`/orders/disputes?id=${id}`, {
        shallow: true,
      } as any);
    }
  };

  return showProfile ? (
    isLoading ? (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    ) : isError ? (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
        <AlertCircle size={16} />{" "}
        <span>{error?.message || "Failed to load lists"}</span>
      </div>
    ) : (
      <DisputeDetails
        disputeId={selectedDisputeId!}
        disputes={data?.data?.disputes || []}
        onClose={handleCloseProfile}
      />
    )
  ) : (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-medium text-dark">Disputes</h1>
        <p className="text-xs text-navgray mt-0.5">
          Review and resolve buyer-seller disputes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <MetricCard
          title="Open Disputes"
          value="87"
          valueStyle="text-dark text-xl font-bold"
          divStyle=""
        />
        <MetricCard
          title="Escalated"
          value="7"
          valueStyle="text-[#00A63E] text-xl font-bold"
          divStyle=""
        />
        <MetricCard
          title="Resolved This Month"
          value="7"
          valueStyle="text-[#E7000B] text-xl font-bold"
          divStyle=""
        />
      </div>

      <section className="">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-2 pb-2">
          {/* Search */}
          <SearchInput
            className="w-2/5"
            padd="py-3 px-4"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Tab Filters */}
          <div className="flex items-center gap-2">
            {(["all", "open", "rejected", "resolved"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full font-medium text-sm transition-all border cursor-pointer capitalize ${
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
        <div className="overflow-x-auto rounded-lg md:min-h-100 border border-lightborder">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gray-400" size={24} />
            </div>
          ) : isError ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />{" "}
              <span>{error?.message || "Failed to load lists"}</span>
            </div>
          ) : (
            <>
              <table className="min-w-200 md:min-w-auto w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F5F7FA] text-xs text-lighttext  uppercase">
                    <th className="py-3 font-medium pl-3">dispute id</th>
                    <th className="py-3 font-medium pl-3">order id</th>
                    <th className="py-3 font-medium">buyer</th>
                    <th className="py-3 font-medium">seller</th>
                    <th className="py-3 font-medium">reason</th>
                    <th className="py-3 font-medium">opened</th>
                    <th className="py-3  font-medium ">time left</th>
                    <th className="py-3 font-medium">status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs bg-white">
                  {filteredDisputes?.length === 0 ? (
                    <tr className="">
                      <td
                        colSpan={8}
                        className="py-8 text-center text-gray-400"
                      >
                        No seller found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredDisputes?.map((order) => {
                      return (
                        <tr
                          key={order.id}
                          className={`transition-colors group text-sm border-b border-[#F5F7FA] last:border-0 capitalize ${Number(timerValue) <= 5 ? "bg-[#FEF2F2]" : Number(timerValue) < 10 && Number(timerValue) > 5 ? "bg-[#FFFBEB]" : "bg-[#F5F7FA]"}`}
                        >
                          <td className="pl-3 py-3.5 text-dark font-medium">
                            {order?.id}
                          </td>
                          <td className="pl-3 py-3.5 text-dark font-medium">
                            {order?.orderId}
                          </td>
                          <td className="py-3.5 text-navgray">
                            {order?.buyer.fullName}
                          </td>
                          <td className="py-3.5 text-navgray">
                            {/* {order?.address} */}
                          </td>
                          <td className="py-3.5 text-navgray max-w-24 lg:max-w-16 truncate">
                            {order?.reason}
                          </td>

                          <td className="py-3.5 text-navgray">
                            {formatDateLabelYear(order?.createdAt)}
                          </td>
                          <td className="py-3.5 text-dark font-medium">
                            <CountdownTimer
                              createdAt={order?.createdAt}
                              onTimeChange={setTimerValue}
                            />
                          </td>
                          <td className="py-3.5">
                            <StatusBadge
                              width="block w-fit"
                              status={order?.status}
                            />
                          </td>

                          <td className="py-3.5">
                            <div className="">
                              <ActionsMenuOrder
                                isOpen={openMenuId === order?.id}
                                onToggle={() =>
                                  setOpenMenuId(
                                    openMenuId === order?.id ? null : order?.id,
                                  )
                                }
                                onAction={(action) =>
                                  handleAction(order?.id, action)
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </>
          )}
          <Pagination
            currentPage={page}
            totalPages={totalPagesCount}
            onPageChange={setPage}
          />
        </div>
      </section>
    </div>
  );
};

export default Disputes;
