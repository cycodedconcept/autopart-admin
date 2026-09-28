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
  weekLabel: string; // e.g., "2026-07-20"
  orderCount: number;
}

interface OrdersBarChartProps {
  data?: OrderDataNode[];
  title: string;
  selectedFilter: string;
}

const BAR_COLOR = '#7ED321';
const BAR_HOVER_COLOR = '#6BB31E';

export const OrdersBarChart: React.FC<OrdersBarChartProps> = ({
  data = [
  ],
  title,
  selectedFilter 
}) => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const getProcessedChartData = () => {
    return data.map((item, index) => {
      const date = new Date(item.weekLabel);
      let label = item.weekLabel;

      if (!isNaN(date.getTime())) {
        if (selectedFilter === '7d' || selectedFilter === '30d') {
          label = date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' });
        } else if (selectedFilter === '1y') {
          label = date.toLocaleDateString('en-NG', { month: 'short', year: '2-digit' });
        } else {
          label = `Wk ${index + 1}`;
        }
      }

      return {
        ...item,
        displayLabel: label,
        formattedRange: !isNaN(date.getTime())
          ? date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
          : item.weekLabel
      };
    });
  };

  const chartData = getProcessedChartData();

  

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const currentData = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white p-2.5 rounded shadow-lg text-[10px] flex flex-col gap-1 border border-gray-800 text-left">
          <span className="font-bold text-gray-400 uppercase text-[8px] tracking-wider block">
            {currentData.displayLabel} ({currentData.formattedRange})
          </span>
          <span className="font-semibold text-white text-xs block">
            {currentData.orderCount} Orders Placed
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="bg-white px-4 py-5 rounded-lg border border-gray-200 h-80 flex flex-col justify-between w-full font-sans"
    >
      <div className="flex justify-between items-center mb-4 text-left">
        <h3 className="text-sm font-medium text-dark">
          {title}
        </h3>
      </div>
      {data.length === 0 ? <p>No data to show</p> :
      <div className="w-full flex-1 min-h-0 text-[10px] text-gray-500">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F0F0F0" />
            <XAxis
              dataKey="displayLabel"
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
              stroke="#99A0AE"
              dy={5}
              interval={0}
            />
            <YAxis axisLine={false} tickLine={false} domain={[0, 'auto']} stroke="#99A0AE" allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC", opacity: 0.5 }} />
            <Bar dataKey="orderCount" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoverIndex === index ? BAR_HOVER_COLOR : BAR_COLOR}
                  style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>}
    </div>
  );
};

export default OrdersBarChart;
