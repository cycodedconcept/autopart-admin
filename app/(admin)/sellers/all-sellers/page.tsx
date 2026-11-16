"use client";

import MetricCard from "@/components/dashboard/metricCard";

import { SearchInput } from "@/components/atoms/searchInputs";
import { useState } from "react";
import { PlanProps } from "@/types/verification";

import { ActionsMenuSeller } from "@/components/atoms/actionMenuSeller";
import { Pagination } from "@/components/atoms/pagination";
import { useDashboardQuery, useSellersQuery, useSuspendSellerAccount } from "@/lib/queries";
import { AlertCircle, Loader2 } from "lucide-react";
import { SellerReviewItem } from "@/types/seller";
import { SellerProfile } from "@/components/seller/sellerProfile";
import { useRouter, useSearchParams } from "next/navigation";
import CurrencyFormat from "@/components/atoms/currencyFormat";
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

const AllSellers = () => {
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "banned" | "suspended"
  >("all");
  const [role, setRole] = useState("seller");


  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { data, isFetching, isError, error } = useSellersQuery(
    page,
    activeTab,
    searchTerm,
    role,
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract the 'id' parameter from the URL query string (e.g., ?id=seller_123)
  const selectedSellerEmail = searchParams.get("email");
  const selectedSellerId = Number(searchParams.get("id"));
  const showProfile = Boolean(selectedSellerEmail);

  const handleCloseProfile = () => {
    // Clears the query parameter to return back to the table view
    router.push("/sellers/all-sellers", { shallow: true } as any);
  };

  const active = data?.data?.users?.filter(each => each.accountStatus === "active").length
  const suspended = data?.data?.users?.filter(each => each.accountStatus === "suspended").length
  const banned = data?.data?.users?.filter(each => each.accountStatus === "banned").length

  const handleSearchChange = (newVal: string) => {
    setSearchTerm(newVal);
    setPage(1); // Reset page safely to index 1 if search query changes
  };

  const totalPagesCount = data?.data?.pagination?.totalPages || 1;

  const filteredSellers = data?.data?.users?.filter((seller) => {
    const matchesSearch = seller?.sellerProfile?.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" || seller?.accountStatus === activeTab;
      
    return matchesSearch && matchesTab;
  });

   const { data: dashboard } = useDashboardQuery()
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
    isFetching ? (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <MetricCard
          subTitle="Active Sellers"
          value={active}
          divStyle=""
        />
        <MetricCard subTitle="Suspended" value={suspended} divStyle="" />
        <MetricCard subTitle="Banned" value={banned} divStyle="" />
        <MetricCard
          subTitle="Total GMV"
          value={CurrencyFormat(dashboard?.data?.overviewCards?.platformGmv?.valueKobo ?? 0)}
          
          divStyle=""
        />
      </div>

      <section className="bg-white rounded-lg border border-lightborder p-4 ">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-2 pb-2">
          {/* Search */}
          <SearchInput
            className="w-full"
            padd="py-3 px-4"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Tab Filters */}
          <div className="flex items-center gap-2">
            {(["all", "active", "banned", "suspended"] as const).map((tab) => (
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
        <div className="overflow-x-auto rounded-lg md:min-h-100">
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
            <>
              <table className="min-w-150 md:min-w-auto w-full text-left ">
                <thead>
                  <tr className="border-b border-[#F5F7FA] text-xs text-lighttext tracking-wider uppercase">
                    <th className="py-3 font-medium pl-3">Name</th>
                    <th className="py-3 font-medium">Type</th>
                    <th className="py-3 font-medium">Location</th>
                    {/* <th className="py-3 font-medium">Plan</th>
                  <th className="py-3 font-medium">Gmv</th>
                  <th className="py-3 font-medium">Orders</th> */}
                    <th className="py-3  font-medium ">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs bg-white">
                  {filteredSellers?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-400"
                      >
                        No seller found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSellers?.map((seller) => (
                      <tr
                        key={seller.id}
                        className="hover:bg-gray-50/50 transition-colors group text-sm border-b border-[#F5F7FA] last:border-0 capitalize"
                      >
                        <td className="pl-3 py-3.5 text-dark font-medium">
                          {seller?.sellerProfile?.businessName}
                        </td>
                        <td className="py-3.5 text-navgray">{seller?.role}</td>
                        <td className="py-3.5 text-navgray">
                          {/* {seller?.sellerProfile?.address} */}
                        </td>
                        {/* <td className="py-3.5 text-navgray">
                        <PlanBadge status={seller?.plan ?? "Starter"} />
                      </td> */}
                        {/* <td className="py-3.5 text-dark font-medium">
                        {seller.gmv}
                      </td>
                      <td className="py-3.5 text-navgray">{seller.orders}</td> */}
                        <td className="py-3.5">
                          <StatusBadge
                            width="block w-4/5"
                            status={seller?.accountStatus}
                          />
                        </td>
                        <td className="py-3.5">
                          <div className="">
                            <ActionsMenuSeller
                              isOpen={openMenuId === seller?.id}
                              onToggle={() =>
                                setOpenMenuId(
                                  openMenuId === seller?.id ? null : seller?.id,
                                )
                              }
                              onAction={(action) =>
                                handleAction(seller?.email, seller?.id, action)
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

export default AllSellers;
