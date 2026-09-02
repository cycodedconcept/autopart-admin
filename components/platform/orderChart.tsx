'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface OrderDataNode {
  orderId: number;
  orderCode: string;
  sellerLabel: string;
  sellerCount: number;
  totalKobo: number;
  status: string;
  paymentStatus: string;
  createdAt: string; 
  quantity: number; // 👈 Track item counts from backend payloads
}

interface OrdersBarChartProps {
  data: OrderDataNode[];
  title?: string;
  selectedFilter?: '8w' | '60d'; 
}

interface ProcessedWeekBucket {
  week: string;
  quantity: number; // 👈 Swapped out from orderCount
  revenue: string;
  rawNaira: number;
  startDate: Date;
  endDate: Date;
}

export const OrdersBarChart: React.FC<OrdersBarChartProps> = ({
  data = [],
  title = "Orders — Last 8 Weeks",
  selectedFilter = "8w"
}) => {

  const koboToNaira = (kobo: number) => kobo / 100;

  const formatNairaAbbreviation = (amount: number) => {
    if (amount === 0) return '₦0';
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1).replace('.0', '')}M`;
    if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
    return `₦${amount.toFixed(0)}`;
  };

  const getProcessedChartData = (): ProcessedWeekBucket[] => {
    const buckets: ProcessedWeekBucket[] = [];
    
    let anchorDate = new Date();
    if (data.length > 0) {
      const timestamps = data.map(d => new Date(d.createdAt).getTime()).filter(t => !isNaN(t));
      if (timestamps.length > 0) {
        anchorDate = new Date(Math.max(...timestamps));
      }
    }

    for (let i = 7; i >= 0; i--) {
      const endDate = new Date(anchorDate);
      endDate.setDate(anchorDate.getDate() - i * 7);
      
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      buckets.push({
        week: `Wk ${8 - i}`,
        quantity: 0, // 👈 Initialized at 0
        revenue: '₦0',
        rawNaira: 0,
        startDate,
        endDate,
      });
    }

    data.forEach((order) => {
      if (!order.createdAt) return;
      const orderDate = new Date(order.createdAt);

      const targetBucket = buckets.find(
        (b) => orderDate >= b.startDate && orderDate <= b.endDate
      );

      if (targetBucket) {
        // 👈 Accumulates quantity counts instead of order counts
        targetBucket.quantity += order.quantity || 0; 
        targetBucket.rawNaira += koboToNaira(order.totalKobo);
      }
    });

    return buckets.map((b) => ({
      ...b,
      revenue: formatNairaAbbreviation(b.rawNaira),
    }));
  };

  const chartData = getProcessedChartData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const currentData = payload.payload;
      const dateRangeStr = `${currentData.startDate.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })} - ${currentData.endDate.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}`;

      return (
        <div className="bg-gray-900 text-white p-2.5 rounded shadow-lg text-[10px] flex flex-col gap-1 border border-gray-800 text-left">
          <span className="font-bold text-gray-400 uppercase text-[8px] tracking-wider block">
            {currentData.week} ({dateRangeStr})
          </span>
          <span className="font-semibold text-white text-xs block">
            🔢 {currentData.quantity} Items Sold
          </span>
          <span className="text-emerald-400 font-semibold border-t border-gray-800 pt-1 mt-0.5 block">
            💰 {currentData.revenue} GMV Volume
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white px-4 py-5 rounded-lg border border-lightborder h-[320px] flex flex-col justify-between w-full font-sans">
      <div className="flex justify-between items-center mb-4 text-left">
        <h3 className="text-sm font-medium text-dark">
          {selectedFilter === '60d' ? "Orders — Last 60 Days" : title}
        </h3>
      </div>

      <div className="w-full flex-1 min-h-0 text-[10px] text-lighttext">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F0F0F0" />
            <XAxis
              dataKey="week"
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
              stroke="#99A0AE"
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 'auto']}
              stroke="#99A0AE"
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC", opacity: 0.5 }} />
            
            {/* 👈 FIXED: Pointed dataKey directly to item quantity values */}
            <Bar dataKey="quantity" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="fill-[#7ED321] hover:fill-[#6BB31E] transition-colors duration-200 cursor-pointer"
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
