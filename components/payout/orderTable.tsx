"use client";

import { PayoutItemBreakdown } from "@/types/payout";
import CurrencyFormat from "../atoms/currencyFormat";
import { formatDateLabel } from "../atoms/formatDate";
import { StatusBadge } from "../atoms/statusBadge";

export interface OrderItemRow {
  id: string;
  dateString: string;
  amountKobo: number;
  status: string;
}

interface OrderBreakdownTableProps {
  orders: PayoutItemBreakdown[];
}

export function OrderBreakdownTable({ orders = [] }: OrderBreakdownTableProps) {
  return (
    <div className="w-full bg-white border border-lightborder rounded-lg p-4 flex flex-col h-full">
      <h3 className="text-lg font-medium text-dark mb-4">
        Order Breakdown
      </h3>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-background border-b border-lightborder text-navgray font-medium text-xs">
              <th className="py-2.5 px-4">Order ID</th>
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Amount</th>
              <th className="py-2.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lightborder text-dark text-sm">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-neutral-50/30 transition-colors"
              >
                <td className="py-3.5 px-4 font-medium">
                  {order.id}
                </td>
                <td className="py-3.5 px-4 text-navgray ">
                  {formatDateLabel(order?.createdAt)}
                </td>
                <td className="py-3.5 px-4">
                  {CurrencyFormat(order?.netAmountKobo)}
                </td>
                <td className="py-3.5 px-4 ">
                  <StatusBadge status={order?.orderStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
