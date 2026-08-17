import React from "react";
import { CardWrapper } from "../ui/cardWrapper";

export interface RecentOrderItem {
  orderId: number;
  orderCode: string;
  sellerLabel: string;
  sellerCount: number;
  totalKobo: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}
export interface RecentOrdersCardProps {
  data: RecentOrderItem[];
}

const RecentOrders = ({ data = [] }: RecentOrdersCardProps) => {
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "pending_payment":
        return "bg-cyan-50 text-cyan-600 border-cyan-200";
      case "picked_up":
        return "bg-green-50 text-green-600 border-green-200";
      
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };
  return (
    <CardWrapper
      title="Recent orders"
      
      
    >
      <table className="w-full text-left border-collapse min-w-125">
        <thead>
          <tr className="text-[10px] uppercase font-medium text-lighttext border-b border-[#F5F7FA]">
            <th className="pb-3 font-medium">Order code</th>
            <th className="pb-3 font-medium">Part</th>
            
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-navgray">
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="border-b border-[#F5F7FA] last:border-0 hover:bg-gray-50/50"
            >
              <td className="py-3 font-medium text-dark">{item.orderCode}</td>
              <td className="py-3">{item.sellerLabel}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 w-full block rounded-[20px] text-[11px] capitalize font-medium ${getStatusStyle(item.status)}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardWrapper>
  );
};

export default RecentOrders;
