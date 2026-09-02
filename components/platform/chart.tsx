import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// Interfaces
export interface GmvDataPoint {
  orderId: number;
  orderCode: string;
  sellerLabel: string;
  sellerCount: number;
  totalKobo: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

interface GmvChartCardProps {
  data: GmvDataPoint[];
  totalGmv?: string; // Pre-formatted string e.g., "₦142.8M"
  title: string;
  timeFrame?: boolean; // Pre-formatted string e.g., "₦142.8M"
  value?: boolean; // Pre-formatted string e.g., "₦142.8M"
  percentageGrowth?: number; // e.g., 12.4
  selectedFilter?: string;
  onFilterChange?: (range: string) => void;
}

export const GmvChart: React.FC<GmvChartCardProps> = ({
  data = [],
  totalGmv,
  percentageGrowth,
  title,
  timeFrame = false,
  value = false,
  selectedFilter = "30d",
  onFilterChange,
}) => {
  const generateDynamicTimeline = () => {
    const timeline = [];
    const now = new Date();

    if (selectedFilter === "12m") {
      // Generate a continuous 12-Month Timeline bucket mesh
      for (let i = 11; i >= 0; i--) {
        const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);

        // Key matching formatting: YYYY-MM
        const dateKey = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`;
        const displayLabel = targetDate.toLocaleDateString("en-NG", {
          month: "short",
          year: "2-digit",
        });

        timeline.push({ dateKey, displayLabel, totalKobo: 0, ordersCount: 0 });
      }
    } else {
      // Generate Days Timeline bucket mesh (7 days or 30 days window)
      const totalDays = selectedFilter === "30d" ? 30 : 7;

      for (let i = totalDays - 1; i >= 0; i--) {
        const targetDate = new Date();
        targetDate.setDate(now.getDate() - i);

        // Key matching formatting: YYYY-MM-DD
        const dateKey = targetDate.toISOString().split("T")[0];
        const displayLabel = targetDate.toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
        });

        timeline.push({ dateKey, displayLabel, totalKobo: 0, ordersCount: 0 });
      }
    }

    return timeline;
  };

  // --- 2. DATA AGGREGATION & FILTER MATCHING ENGINE ---
  const getChartData = () => {
    const timeline = generateDynamicTimeline();

    data.forEach((order) => {
      if (!order.createdAt) return;

      const orderDate = new Date(order.createdAt);
      let orderKey = "";

      if (selectedFilter === "12m") {
        // Extract YYYY-MM format signature
        orderKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, "0")}`;
      } else {
        // Extract YYYY-MM-DD format signature
        orderKey = order.createdAt.split("T")[0];
      }

      // Map dynamic context properties safely
      const matchingBucket = timeline.find(
        (bucket) => bucket.dateKey === orderKey,
      );
      if (matchingBucket) {
        matchingBucket.totalKobo += order.totalKobo;
        matchingBucket.ordersCount += 1;
      }
    });

    return timeline;
  };

  const chartData = getChartData();

  // Custom interactive tooltip structure for clean UI display
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded shadow-lg border border-slate-800 text-xs font-sans">
          <p className="text-slate-400 font-medium mb-0.5">
            {payload[0].payload.date}
          </p>
          <p className="font-bold text-sm text-orange-400">
            ₦{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white px-4 py-5 rounded-lg border border-lightborder h-full flex flex-col w-full">
      {/* Header Context Metrics Bar */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-sm font-medium text-dark block mb-1">
            {title}
          </span>
          {value && (
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                {totalGmv}
              </h2>
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  percentageGrowth && percentageGrowth >= 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {percentageGrowth && percentageGrowth >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(percentageGrowth ?? 0)}%
              </span>
            </div>
          )}
        </div>

        {/* Action Timeframe Filter */}
        {timeFrame && (
          <select
            onChange={(e) => onFilterChange?.(e.target.value)}
            className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 text-gray-600 cursor-pointer focus:outline-none focus:border-gray-300"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d" selected>
              Last 30 Days
            </option>
            <option value="12m">Last 12 Months</option>
          </select>
        )}
      </div>

      {/* Responsive Graph Container Area */}
      <div className="flex-1 min-h-0 w-11/12 m-auto text-[10px] font-medium text-gray-400 lineC">
      {chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-100 rounded-xl bg-gray-50/50">
            <p className="text-xs font-medium">
              No order metrics found within this timeframe.
            </p>
          </div>
        ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gmv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis
              dataKey="displayLabel"
             axisLine={{ stroke: "#666666" }}
              tickLine={{ stroke: "#666666", strokeWidth: 1 }} // Style of the pointer tick
              tickSize={6} // Length of the tick line pointing outward (in pixels)
              stroke="#94a3b8"
              dy={10}
            />
            <YAxis
              axisLine={{ stroke: "#666666" }}
              tickLine={{ stroke: "#666666", strokeWidth: 1 }}
              tickSize={6}
              dataKey="totalKobo"
              stroke="#94a3b8"
              tickFormatter={(v) =>
                `₦${v >= 1000000 ? (v / 1000000).toFixed(1) + "M" : v.toLocaleString()}`
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#f97316",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="totalKobo"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gmv)"
            />
          </AreaChart>
        </ResponsiveContainer>)}
      </div>
    </div>
  );
};
