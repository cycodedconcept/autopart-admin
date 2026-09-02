"use client";

import MetricCard from "@/components/dashboard/metricCard";
import {
  mockSellers,
  StatusBadge,
} from "../../sellers/verification-queue/page";
import { SearchInput } from "@/components/atoms/searchInputs";
import { useState } from "react";
import { PlanProps, SellerRequest } from "@/types/verification";
import { ActionsMenu } from "@/components/atoms/actionMenu";
import { ActionsMenuSeller } from "@/components/atoms/actionMenuSeller";
import { Pagination } from "@/components/atoms/pagination";
import {
  useOrdersQuery,
  useSellersQuery,
  useSuspendSellerAccount,
} from "@/lib/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { SellerReviewItem } from "@/types/seller";
import { SellerProfile } from "@/components/seller/sellerProfile";
import { useRouter, useSearchParams } from "next/navigation";
import { status } from "@/types/order";
import { formatDateLabelYear } from "@/components/atoms/formatDate";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { ActionsMenuOrder } from "@/components/order/actionMenu";

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

const AllOrders = () => {
  const [page, setPage] = useState(1);
  const [sellers, setSellers] = useState<SellerReviewItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<status>("all");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { data, isLoading, isError, error } = useOrdersQuery(
    page,
    activeTab,
    searchTerm,
    paymentStatus,
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract the 'id' parameter from the URL query string (e.g., ?id=seller_123)
  const selectedSellerEmail = searchParams.get("email");
  const selectedSellerId = Number(searchParams.get("id"));
  const showProfile = Boolean(selectedSellerEmail);

  const handleCloseProfile = () => {
    // Clears the query parameter to return back to the table view
    router.push("/orders/all-orders", { shallow: true } as any);
  };

  const handleSearchChange = (newVal: string) => {
    setSearchTerm(newVal);
    setPage(1); // Reset page safely to index 1 if search query changes
  };

  const totalPagesCount = data?.data?.pagination?.totalPages || 1;
  console.log(data);
  const filteredOrders = data?.data?.orders?.filter((order) => {
    const matchesSearch = order?.buyer?.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      order?.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const totalOrder = data?.data?.orders.length
  const completed = data?.data?.orders?.filter(each => each.status === "delivered").length
  const disputed = data?.data?.orders?.filter(each => each.status === "disputed").length 
  
  const suspendSellerAccout = useSuspendSellerAccount();
  const handleAction = (email: string, id: number, action: string) => {
    if (action === "View profile") {
      return router.push(`/sellers/all-sellers?email=${email}&id=${id}`, {
        shallow: true,
      } as any);
    } else if (action === "Suspend") {
      suspendSellerAccout.mutate({
        id: id,
        status: "suspended",
      });
    }
  };

  return showProfile ? (
    /* If an ID is in the URL, replace the table completely with the profile */
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
      <SellerProfile
        sellerEmail={selectedSellerEmail!}
        sellerId={selectedSellerId!}
        onClose={handleCloseProfile}
      />
    )
  ) : (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-medium text-dark">All Orders</h1>
        <p className="text-xs text-navgray mt-0.5">
          Track and manage all marketplace orders
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <MetricCard
          title="Total Orders"
          value={totalOrder}
          valueStyle="text-dark text-xl font-bold"
          divStyle=""
        />
        <MetricCard
          title="Completed"
          value={completed}
          valueStyle="text-[#00A63E] text-xl font-bold"
          divStyle=""
        />
        <MetricCard
          title="Disputed"
          value={disputed}
          valueStyle="text-[#E7000B] text-xl font-bold"
          divStyle=""
        />
        <MetricCard
          title="Dispute Rate"
          value="7"
          valueStyle="text-[#E17100] text-xl font-bold"
          divStyle=""
        />
      </div>

      <section className="">
        <SearchInput
          className="w-full mb-4"
          padd="py-3 px-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex flex-col md:flex-row items-center gap-4 mb-2 pb-2">
          {/* Search */}

          {/* Tab Filters */}
          <div className="flex items-center gap-2">
            {(
              [
                "all",
                "cancelled",
                "confirmed",
                "delivered",
                "disputed",
                "in_transit",
                "pending_payment",
                "picked_up",
              ] as const
            ).map((tab) => (
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

          <select className="ml-auto">
            <option>Highest value</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-lg md:min-h-100">
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
              <table className="min-w-200 md:min-w-auto w-full text-left border-collapse border border-lightborder ">
                <thead>
                  <tr className="border-b border-[#F5F7FA] text-xs text-lighttext  uppercase">
                    <th className="py-3 font-medium pl-3">order id</th>
                    <th className="py-3 font-medium">buyer</th>
                    <th className="py-3 font-medium">seller</th>
                    <th className="py-3 font-medium">part</th>
                    <th className="py-3 font-medium">amount</th>
                    <th className="py-3  font-medium ">Status</th>
                    <th className="py-3 font-medium">date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs bg-white">
                  {filteredOrders?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-8 text-center text-gray-400"
                      >
                        No seller found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders?.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/50 transition-colors group text-sm border-b border-[#F5F7FA] last:border-0 capitalize"
                      >
                        <td className="pl-3 py-3.5 text-dark font-medium">
                          {order?.id}
                        </td>
                        <td className="py-3.5 text-navgray">
                          {order?.buyer.fullName}
                        </td>
                        <td className="py-3.5 text-navgray">
                          {/* {order?.address} */}
                        </td>
                        <td className="py-3.5 text-navgray">
                          {/* {order?.items} */}
                        </td>
                        <td className="py-3.5 text-dark font-medium">
                          {CurrencyFormat().format(order?.totalKobo ?? 0)}
                        </td>
                        <td className="py-3.5">
                          <StatusBadge
                            width="block w-fit"
                            status={order?.status}
                          />
                        </td>
                        <td className="py-3.5 text-navgray">
                          {formatDateLabelYear(order?.createdAt)}
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
                                handleAction(
                                  order?.buyer.email,
                                  order?.id,
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

export default AllOrders;
