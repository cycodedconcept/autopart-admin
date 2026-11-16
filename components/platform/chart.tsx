'use client';

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

export interface GmvDataPoint {
  bucket: string;
  gmvKobo: number;
}

interface GmvChartCardProps {
  data: GmvDataPoint[];
  totalGmv?: string; // Pre-formatted string e.g., "₦142.8M"
  title: string;
  timeFrame?: boolean; 
  value?: boolean; 
  percentageGrowth?: number; // e.g., 12.4
  selectedFilter: string;
  onFilterChange?: (range: string) => void;
}

export const GmvChart: React.FC<GmvChartCardProps> = ({
  data = [],
  totalGmv,
  percentageGrowth,
  title,
  timeFrame = false,
  value = false,
  selectedFilter = "7d",
  onFilterChange,
}) => {

  const generateDynamicTimeline = () => {
    const timeline = [];
    
    // Fallback calculation: find the maximum date in the backend payload array, otherwise use current runtime
    let anchorDate = new Date();
    if (data.length > 0) {
      const timestamps = data.map(d => new Date(d.bucket).getTime()).filter(t => !isNaN(t));
      if (timestamps.length > 0) {
        anchorDate = new Date(Math.max(...timestamps));
      }
    }

    if (selectedFilter === "12m") {
      for (let i = 11; i >= 0; i--) {
        const targetDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth() - i, 1);
        const dateKey = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`;
        const displayLabel = targetDate.toLocaleDateString("en-NG", {
          month: "short",
          year: "2-digit",
        });

        timeline.push({ dateKey, displayLabel, gmvKobo: 0 });
      }
    } else {
      const totalDays = selectedFilter === "7d" ? 7 : 30;
      for (let i = totalDays - 1; i >= 0; i--) {
        const targetDate = new Date(anchorDate);
        targetDate.setDate(anchorDate.getDate() - i);
        
        const dateKey = targetDate.toISOString().split("T")[0];
        const displayLabel = targetDate.toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
        });

        timeline.push({ dateKey, displayLabel, gmvKobo: 0 });
      }
    }
    return timeline;
  };

  const getChartData = () => {
    const timeline = generateDynamicTimeline();

    data.forEach((order) => {
      if (!order.bucket) return;

      const orderDate = new Date(order.bucket);
      let orderKey = "";

      if (selectedFilter === "12m") {
        orderKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, "0")}`;
      } else {
        orderKey = order.bucket.split("T")[0];
      }

      const matchingBucket = timeline.find((bucket) => bucket.dateKey === orderKey);
      if (matchingBucket) {
        // Accumulate GMV Kobo value directly
        matchingBucket.gmvKobo += order.gmvKobo;
      }
    });

    return timeline;
  };

  const chartData = getChartData();
  const koboToNaira = (kobo: number) => kobo / 100;

  const formatNairaAbbreviation = (amount: number) => {
    if (amount === 0) return '₦0';
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1).replace('.0', '')}M`;
    if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
    return `₦${amount.toFixed(0)}`;
  };
 

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const currentData = payload[0].payload;
      const nairaAmount = koboToNaira(currentData.gmvKobo);
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded shadow-lg border border-slate-800 text-xs font-sans text-left">
          <p className="text-slate-400 font-medium mb-0.5">
            {currentData.displayLabel}
          </p>
          <p className="font-bold text-sm text-orange-400">
            ₦{nairaAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white px-4 py-5 rounded-lg border border-gray-200 h-80 flex flex-col w-full font-sans">
      <div className="flex justify-between items-start mb-6">
        <div>
         
          <h3 className="text-sm font-medium text-dark">
          {title}
        </h3>
          {value && (
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                {totalGmv}
              </h2>
              {percentageGrowth !== undefined && (
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                    percentageGrowth >= 0
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {percentageGrowth >= 0 ? "↑" : "↓"} {Math.abs(percentageGrowth)}%
                </span>
              )}
            </div>
          )}
        </div>

        {timeFrame && (
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange?.(e.target.value)}
            className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 text-gray-600 cursor-pointer focus:outline-none focus:border-gray-300"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="12m">Last 12 Months</option>
          </select>
        )}
      </div>

      <div className="flex-1 min-h-0 w-full text-[10px] font-medium text-gray-400">
        {chartData.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-100 rounded-xl bg-gray-50/50">
            <p className="text-xs font-medium">
              No order metrics found within this timeframe.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gmv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis
                dataKey="displayLabel"
                axisLine={{ stroke: "#E2E8F0" }}
                tickLine={false}
                stroke="#94a3b8"
                dy={10}
                interval={selectedFilter === '30d' ? 4 : 0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                dataKey="gmvKobo"
                stroke="#94a3b8"
                tickFormatter={(v) => formatNairaAbbreviation(koboToNaira(v))}
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
                dataKey="gmvKobo"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gmv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default GmvChart;
