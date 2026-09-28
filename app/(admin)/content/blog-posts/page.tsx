"use client";

import MetricCard from "@/components/dashboard/metricCard";
import { SearchInput } from "@/components/atoms/searchInputs";
import { useState } from "react";
import { PlanProps } from "@/types/verification";

import { Pagination } from "@/components/atoms/pagination";
import { useOrdersQuery } from "@/lib/queries";
import { AlertCircle, Filter, ListFilter, Loader2, PlusIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { status } from "@/types/order";
import { formatDateLabelYear } from "@/components/atoms/formatDate";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { ActionsMenuOrder } from "@/components/order/actionMenu";
import OrderDetails from "@/components/order/orderDetails";
import { StatusBadge } from "@/components/atoms/statusBadge";

const BlogPosts = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
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
  const selectedSellerId = Number(searchParams.get("id"));
  const showProfile = Boolean(selectedSellerId);
  const handleCloseProfile = () => {
    // Clears the query parameter to return back to the table view
    router.push("/content/blog-posts", { shallow: true } as any);
  };

  const handleSearchChange = (newVal: string) => {
    setSearchTerm(newVal);
    setPage(1); // Reset page safely to index 1 if search query changes
  };

  const totalPagesCount = data?.data?.pagination?.totalPages || 1;
  const filteredOrders = data?.data?.orders?.filter((order) => {
    const matchesSearch = order?.buyer?.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      order?.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const totalOrder = data?.data?.orders.length;
  const completed = data?.data?.orders?.filter(
    (each) => each.status === "delivered",
  ).length;
  const disputed = data?.data?.orders?.filter(
    (each) => each.status === "disputed",
  ).length;

  const handleAction = (email: string, id: number, action: string) => {
    if (action === "View details") {
      return router.push(`/content/blog-posts?id=${id}`, {
        shallow: true,
      } as any);
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
      <OrderDetails orderId={selectedSellerId!} onClose={handleCloseProfile} />
    )
  ) : (
    <div>
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
        <div className="flex gap-4">
          <SearchInput
            className="w-2/4 mb-4"
            padd="py-3 px-4"
            value={searchTerm}
            placeholder="Search posts, authors, tags..."
            onChange={handleSearchChange}
          />
          <div className="w-full flex flex-row items-center gap-4 mb-2 pb-2 overflow-x-auto justify-between">
            {/* Tab Filters */}
            <div className="flex  items-center gap-2">
              {(["all", "published", "draft", "scheduled"] as const).map(
                (tab) => (
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
                ),
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border border-lightborder rounded-lg text-navgray text-sm  px-1 py-1.5 md:px-3 md:py-2">
                <ListFilter size={13} />
                <span>Filter</span>
              </div>
              <button
                className="flex items-center md:gap-1.5 bg-aorange hover:bg-gray-50 text-white px-1 py-1.5 md:px-3 md:py-2 rounded-lg text-xs md:text-sm transition"
                //   onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="w-5" />
                <span className="">New Post</span>
              </button>
            </div>
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
              <table className="min-w-200 md:min-w-auto w-full text-left border-collapse ">
                <thead>
                  <tr className="border-b border-[#F5F7FA] text-xs text-lighttext  uppercase">
                    <th className="py-3 font-medium pl-3">post</th>
                    <th className="py-3 font-medium">category</th>
                    <th className="py-3 font-medium">author</th>
                    <th className="py-3 font-medium">status</th>
                    <th className="py-3 font-medium">views</th>
                    <th className="py-3  font-medium ">published</th>
                   
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs bg-white">
                  
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

export default BlogPosts;
