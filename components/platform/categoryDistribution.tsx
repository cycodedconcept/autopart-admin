import { useCategoryQuery } from "@/lib/queries";
import React, { useState } from "react";

interface CategoryData {
  name: string;
  value: number;
  colorClass: string;
  strokeColor: string;
}

const CategoryDistribution: React.FC = () => {
  // 1. Put the array into React State so changes trigger a re-render
  const {data: category} = useCategoryQuery("all")
  const [data, setData] = useState<CategoryData[]>([
    {
      name: "Brake parts",
      value: 340,
      colorClass: "bg-aorange",
      strokeColor: "#FF7101",
    },
    {
      name: "Engine parts",
      value: 280,
      colorClass: "bg-[#7ED321]",
      strokeColor: "#7ED321",
    },
    {
      name: "Electrical",
      value: 190,
      colorClass: "bg-[#10B981]",
      strokeColor: "#10B981",
    },
    {
      name: "Body parts",
      value: 110,
      colorClass: "bg-purple-500",
      strokeColor: "#a855f7",
    },
    {
      name: "Other",
      value: 80,
      colorClass: "bg-[#A78BFA]",
      strokeColor: "#A78BFA",
    },
  ]);

  // 2. Interactive function to test updates in real-time
  const simulateOrder = (categoryName: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.name === categoryName ? { ...item, value: item.value + 50 } : item,
      ),
    );
  };

  // 3. Dynamic layout math calculations
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  let accumulatedPercentage = 0;
  const processedCategories = data.map((item) => {
    // Calculate exact percentage share against the changing total
    const percentage =
      totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;

    const strokeDashoffset = -accumulatedPercentage;
    accumulatedPercentage += percentage;

    return {
      ...item,
      percentage,
      strokeDasharray: `${percentage} ${100 - percentage}`,
      strokeDashoffset: String(strokeDashoffset),
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4 w-full">
      {/* Main Dashboard Widget Display Grid */}
      {/* <div className=" "> */}

      {/* Left Column: Horizontal Progress Bars */}
      <div className="md:col-span-2 flex flex-col justify-between space-y-4 bg-white px-4 py-5 rounded-lg border border-lightborder w-full">
        <div>
          <h3 className="text-sm font-medium text-dark">Category Breakdown</h3>
        </div>

        <div className="space-y-3.5 pr-2">
          {processedCategories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm ">
                <span className="flex items-center text-navgray gap-1.5">
                  {cat.name}
                </span>
                <span className="text-dark font-medium">{cat.percentage}%</span>
              </div>
              <div className="w-full bg-[#F5F7FA] h-2 rounded-full overflow-hidden">
                {/* Tailwind transitions handle smooth bar width animations */}
                <div
                  className={`h-full ${cat.colorClass} rounded-full transition-all duration-300 ease-out`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Dynamic Circular Donut SVG Chart */}
      <div className="bg-white px-4 py-5 rounded-lg border border-lightborder w-full flex flex-col items-center justify-between min-h-50">
        <h3 className="text-dark font-medium text-sm self-start w-full">
          Revenue by Category
        </h3>

        <div className="relative w-32 h-32 flex items-center justify-center my-auto">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            {/* Grey Track Ring */}
            <circle
              cx="18"
              cy="18"
              r="14.5"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="7"
            />

            {/* Dynamic Slices */}
            {processedCategories.map((cat, idx) => (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="14.5"
                fill="none"
                stroke={cat.strokeColor}
                strokeWidth="7"
                strokeDasharray={cat.strokeDasharray}
                strokeDashoffset={cat.strokeDashoffset}
                className="transition-all duration-300 ease-out"
              />
            ))}
          </svg>
        </div>

        {/* Dynamic Legends Grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 w-full text-[9px] text-navgray text-xs tracking-tight mt-2">
          {processedCategories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${cat.colorClass}`} />
              <span className="truncate">
                {cat.name} ({cat.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDistribution;
