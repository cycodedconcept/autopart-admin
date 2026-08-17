import { useEffect, useRef, useState } from "react";
import { CardWrapper } from "../ui/cardWrapper";
import { Check, ChevronRight, CircleAlert, Ellipsis } from "lucide-react";
import CurrencyFormat from "../atoms/currencyFormat";

export type PayoutStatus = "Pending" | "Held";

export interface PayoutQueueItem {
  id: string;
  sellerName: string;
  amount: number;
  status: PayoutStatus;
}

interface PayoutQueueCardProps {
  data: PayoutQueueItem[];
  onViewAll?: () => void;
  onApprove?: (id: string) => void;
  onHoldAndFlag?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export const PayoutQueue: React.FC<PayoutQueueCardProps> = ({
  data,
  onViewAll,
  onApprove,
  onHoldAndFlag,
  onViewDetails,
}) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close active menu immediately if clicking anywhere outside the component boundary
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getStatusStyle = (status: PayoutStatus) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Held":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <CardWrapper
      title="Payout queue"
      actionLabel="View all"
      onActionClick={onViewAll}
    >
      <div className="overflow-x-auto" ref={dropdownRef}>
        <table className="w-full text-left border-collapse min-w-112.5">
          <thead>
            <tr className="text-[10px] uppercase font-medium text-lighttext border-b border-[#F5F7FA]">
              <th className="pb-3 font-medium">Seller</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="text-xs font-normal text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 relative">
                <td className="py-4 text-sm font-medium text-dark">
                  {item.sellerName}
                </td>
                <td className="py-4 text-sm text-navgray">
                  {CurrencyFormat().format(item.amount ?? 0)}
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-0.5 rounded-[20px] text-[10px] font-medium text-[#633806] bg-[#FEF3EB]`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-right relative">
                  <button
                    onClick={() =>
                      setActiveDropdownId(
                        activeDropdownId === item.id ? null : item.id,
                      )
                    }
                    className="text-lighttext hover:text-gray-700 font-bold px-2 cursor-pointer tracking-widest focus:outline-none"
                  >
                    <Ellipsis size={17} />
                  </button>

                  {/* Context Action Overlay Tab */}
                  {activeDropdownId === item.id && (
                    <div className="absolute right-0 top-10 w-44 bg-white rounded-lg border border-lightborder shadow-xl z-50 py-1 text-left">
                      <button
                        onClick={() => {
                          onApprove?.(item.id);
                          setActiveDropdownId(null);
                        }}
                        className="w-full px-4 py-2 text-dark hover:bg-gray-50 flex items-center gap-2 text-sm font-medium cursor-pointer"
                      >
                
                          <Check className="text-lighter-green" size={13} />
                          <span>Approve</span>
                        
                      </button>
                      <button
                        onClick={() => {
                          onHoldAndFlag?.(item.id);
                          setActiveDropdownId(null);
                        }}
                        className="w-full px-4 py-2 text-dark hover:bg-gray-50 flex items-center gap-2 text-sm font-medium cursor-pointer"
                      >
                        
                        <CircleAlert className="text-aorange" size={13} />
                          <span>
                        Hold & flag
                            </span>
                      </button>
                      <button
                        onClick={() => {
                          onViewDetails?.(item.id);
                          setActiveDropdownId(null);
                        }}
                        className="w-full px-4 py-2 text-dark  gap-2 hover:bg-gray-50 flex items-center  text-sm font-medium cursor-pointer"
                      >
                        <ChevronRight size={13} className="text-dark"/>
                        <span> View details</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardWrapper>
  );
};
