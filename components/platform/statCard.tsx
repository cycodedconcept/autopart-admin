import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  description?: string;
  trendType: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, description, trendType }) => {
  const getTrendClass = () => {
    if (trendType === 'up') return 'text-green-600 bg-green-50';
    if (trendType === 'down') return 'text-blue-600 bg-blue-50';
    return 'text-gray-500 bg-gray-100';
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">{title}</p>
        <p className="text-2xl font-bold tracking-tight mb-2">{value}</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mt-auto">
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${getTrendClass()}`}>
          {trend}
        </span>
        {description && <span className="text-[10px] text-gray-400 font-medium">{description}</span>}
      </div>
    </div>
  );
};

export default StatCard;
