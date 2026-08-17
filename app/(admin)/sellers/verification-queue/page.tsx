"use client";
import { SellerDetailProfile } from "@/components/verification/sellerDetail";
import {
  ActionsMenuProps,
  SellerRequest,
  VerificationStatus,
} from "@/types/verification";
import { MoreVertical, Search } from "lucide-react";
import React, { useState } from "react";

const mockSellers: SellerRequest[] = [
  {
    id: "1",
    businessName: "Chukwuemeka Auto Parts",
    type: "Sole Proprietor",
    location: "Lagos",
    submittedDate: "2024-06-10",
    status: "Pending CAC",
  },
  {
    id: "2",
    businessName: "Adeyemi Motors Ltd",
    type: "Limited Company",
    location: "Ibadan",
    submittedDate: "2024-06-11",
    status: "Pending review",
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
    count: 7,
    label: "Pending",
    bgClass: "bg-[#FFFBEB]",
    borderClass: "border-[#FEE685]",
    textClass: "text-[#E17100]",
  },
  {
    count: 3,
    label: "Flagged",
    bgClass: "bg-[#FEF2F2]",
    borderClass: "border-[#FFC9C9]",
    textClass: "text-[#E7000B]",
  },
  {
    count: 2,
    label: "Approved today",
    bgClass: "bg-[#F0FDF4]",
    borderClass: "border-[#B9F8CF]",
    textClass: "text-[#00A63E]",
  },
];
export const SummaryStats: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {statusItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgClass} ${item.borderClass} ${item.textClass} border rounded-lg px-2 md:px-4 py-2 flex items-center gap-2`}
        >
          <span className="text-lg font-bold">{item.count}</span>
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
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<VerificationStatus, string> = {
    "Pending CAC": "bg-[#FEF3C6] text-[#BB4D00] ",
    "Pending review": "bg-[#DBEAFE] text-[#1447E6] ",
    Flagged: "bg-[#FFE2E2] text-[#C10007] ",
    Approved: "bg-[#DCFCE7] text-[#008236] ",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full  ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onAction,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-1 hover:bg-gray-100 rounded-md text-lighttext hover:text-gray-600 transition-colors cursor-pointer"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onToggle} />
          <div className="absolute right-0 mt-1 w-36 shadow-lg bg-white border border-lightborder rounded-lg z-20 py-1 text-sm text-dark font-medium">
            <button
              onClick={() => {
                onAction("Review");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
              Review
            </button>
            <button
              onClick={() => {
                onAction("Flag");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50  flex items-center gap-2 cursor-pointer"
            >
              Flag
            </button>
            <button
              onClick={() => {
                onAction("Reject");
                onToggle();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-[#E7000B] flex items-center gap-2 cursor-pointer"
            >
              Reject
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const VerificationQueue: React.FC = () => {
  // State management for the live data array
  const [sellers, setSellers] = useState<SellerRequest[]>(mockSellers);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "All" | "Pending CAC" | "Pending review" | "Flagged"
  >("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  // Action event handler that updates live application state dynamically
  const handleAction = (id: string, action: "Review" | "Flag" | "Reject") => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) => {
        if (seller.id !== id) return seller;

        switch (action) {
          case "Review":
            return { ...seller, status: "Approved" };
          case "Flag":
            return { ...seller, status: "Flagged" };
          case "Reject":
            return { ...seller, status: "Pending review" }; // Sends back to general pending queue
          default:
            return seller;
        }
      }),
    );
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch = seller.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || seller.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleEachSeller = () => {
    setOpenDetails(true);
  };
  return (
    <>
      {!openDetails ? (
        <div className="flex-1 ">
          {/* Title block */}

          <div className="mb-5">
            <h1 className="text-lg font-medium text-dark  tracking-tight">
              Verification Queue
            </h1>
            <p className="text-xs text-navgray mt-0.5">
              Review and action seller verification requests
            </p>
          </div>
          {/* Summary KPI Pills */}
          <SummaryStats />

          {/* Filters Toolbar */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2 border-b border-gray-100 pb-2">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-5 pr-3 py-2 text-xs border border-lightborder rounded-lg focus:outline-none focus:border-orange-400 transition-colors placeholder-dark/50 bg-white"
              />
            </div>

            {/* Tab Filters */}
            <div className="flex items-center gap-2">
              {(
                ["All", "Pending CAC", "Pending review", "Flagged"] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full font-medium text-sm transition-all border cursor-pointer ${
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
          <div className="overflow-x-auto  rounded-lg">
            <table className="min-w-200 md:min-w-auto w-full text-left border-collapse border border-lightborder">
              <thead>
                <tr className="border-b border-lightborder text-xs text-lighttext tracking-wider uppercase">
                  <th className="py-3 font-medium pl-3">Business Name</th>
                  <th className="py-3 font-medium">Type</th>
                  <th className="py-3 font-medium">Location</th>
                  <th className="py-3 font-medium">Submitted</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3  font-medium ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs bg-white">
                {filteredSellers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No verification items found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredSellers.map((seller) => (
                    <tr
                      key={seller.id}
                      className="hover:bg-gray-50/50 transition-colors group text-sm border-b border-[#F5F7FA] last:border-0 cursor-pointer"
                      onClick={handleEachSeller}
                    >
                      <td className="pl-3 py-3.5 text-dark font-medium">
                        {seller.businessName}
                      </td>
                      <td className="py-3.5 text-navgray">{seller.type}</td>
                      <td className="py-3.5 text-navgray">{seller.location}</td>
                      <td className="py-3.5 text-navgray">
                        {seller.submittedDate}
                      </td>
                      <td className="py-3.5">
                        <StatusBadge status={seller.status} />
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
                            isOpen={openMenuId === seller.id}
                            onToggle={() =>
                              setOpenMenuId(
                                openMenuId === seller.id ? null : seller.id,
                              )
                            }
                            onAction={(action) =>
                              handleAction(seller.id, action)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <SellerDetailProfile setOpen={setOpenDetails} />
      )}
    </>
  );
};

export default VerificationQueue;
