import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface WeeklyData {
  week: string;
  orderCount: number;
  revenue: string;
}

const OrdersBarChart: React.FC = () => {
  const data: WeeklyData[] = [
    { week: "Wk 1", orderCount: 42, revenue: "₦652K" },
    { week: "Wk 2", orderCount: 56, revenue: "₦870K" },
    { week: "Wk 3", orderCount: 38, revenue: "₦590K" },
    { week: "Wk 4", orderCount: 74, revenue: "₦1.1M" },
    { week: "Wk 5", orderCount: 61, revenue: "₦920K" },
    { week: "Wk 6", orderCount: 89, revenue: "₦1.4M" },
    { week: "Wk 7", orderCount: 52, revenue: "₦810K" },
    { week: "Wk 8", orderCount: 45, revenue: "₦690K" },
  ];

  const totalOrders = data.reduce((sum, item) => sum + item.orderCount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const currentData = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white p-2 rounded shadow-lg text-[10px] flex flex-col gap-0.5 border border-gray-800">
          <span className="font-bold text-gray-400 uppercase text-[8px] tracking-wider">
            {currentData.week} Performance
          </span>
          <span className="font-bold text-white text-xs">
            📦 {currentData.orderCount} Orders
          </span>
          <span className="text-emerald-400 font-semibold border-t border-gray-700 pt-0.5 mt-0.5">
            💰 {currentData.revenue} GMV
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white px-4 py-5 rounded-lg border border-lightborder h-full p-5 flex flex-col justify-between  w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium text-dark">
            Orders — Last 8 Weeks
          </h3>
        </div>
        {/* <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
          Total: {totalOrders}
        </span> */}
      </div>

      <div className="w-full h-full text-[10px] text-lighttext">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis
              dataKey="week"
              axisLine={{ stroke: "#666666" }}
              tickLine={{ stroke: "#666666", strokeWidth: 1 }}
              
              stroke="#99A0AE"
            />

            <YAxis
              axisLine={{ stroke: "#666666" }}
              tickLine={{ stroke: "#666666", strokeWidth: 1 }}
              domain={[0, "auto"]}
              stroke="#99A0AE"

            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
            {/* FIXED: Added round radius values directly into the property array */}
            <Bar dataKey="orderCount" radius={[4, 4, 0, 0]} maxBarSize={50}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="fill-[#7ED321] hover:fill-[#518716] transition-colors duration-200 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersBarChart;
