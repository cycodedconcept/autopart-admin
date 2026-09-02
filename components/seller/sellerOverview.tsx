import { Order } from "@/types/order";
import CurrencyFormat from "../atoms/currencyFormat";
import { User } from "@/types/seller";

// Define structures for TypeScript safety
interface SummaryCardProps {
  label: string;
  value: string | number;
}

interface OrderItem {
  id: string;
  productName: string;
  status: "Delivered" | "Pending" | "Cancelled";
}

export default function Overview({
  user,
  orders,
}: {
  user: User;
  orders: Order[];
}) {
  const totalOrders = orders?.reduce((a, b) => {
    return a + b.totalItems;
  }, 0);
  const gmv = orders
    ?.flatMap((each) => each.items)
    .reduce((a, b) => {
      return a + b.unitPriceKobo;
    }, 0);
  const type = user?.role;
  // Mock data representing the top summary blocks
  const summaryData: SummaryCardProps[] = [
    { label: "GMV", value: CurrencyFormat().format(gmv) ?? 0 },
    { label: "Orders", value: totalOrders },
    { label: "Type", value: type },
    { label: "Plan", value: "Pro" },
  ];

  return (
    <div className="">
      {/* 1. Summary Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryData.map((card, index) => (
          <div
            key={index}
            className="bg-background p-4 rounded-lg flex flex-col justify-center h-16 "
          >
            <span className="text-[10px]  text-lighttext">{card.label}</span>
            <span className="text-[15px] font-bold text-dark">
              {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* 2. Section Heading */}
      <div className="mb-2">
        <h3 className="text-[13px] font-medium text-dark">Recent orders</h3>
      </div>

      {/* 3. Recent Orders Data List Layout */}
      <div className="divide-y divide-gray-100">
        {orders
          ?.flatMap((each) => each.items)
          .map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3.5 text-sm transition-colors font-normal text-dark hover:bg-gray-50/40 capitalize"
            >
              {/* Order Reference ID */}
              <div className="w-1/4 ">#{order.partNumber}</div>

              {/* Product / Line Item Details */}
              <div className="w-2/4 text-center sm:text-left ">
                {order.title}
              </div>

              {/* Status Pills */}
              <div className="w-1/4 flex justify-end">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                    order.itemStatus === "Delivered"
                      ? "bg-[#EAF3DE] text-[#27500A]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.itemStatus}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
